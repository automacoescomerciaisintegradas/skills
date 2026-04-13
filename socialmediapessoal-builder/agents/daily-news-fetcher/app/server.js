const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3847;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- NewsAPI proxy (avoids CORS issues) ---
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

// In-memory cache to avoid hammering the API
let cache = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// Memory / history store
const MEMORY_FILE = path.join(__dirname, 'memory.json');

function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
    }
  } catch { /* ignore */ }
  return { fetches: [], aggregations: {} };
}

function saveMemory(mem) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2));
}

// --- Fallback: scrape Google News RSS when no API key ---
function httpsGetFollowRedirects(url, opts, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const doRequest = (requestUrl, remaining) => {
      https.get(requestUrl, opts, (res) => {
        if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) && res.headers.location && remaining > 0) {
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, requestUrl).href;
          res.resume();
          return doRequest(next, remaining - 1);
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      }).on('error', reject);
    };
    doRequest(url, maxRedirects);
  });
}

function fetchGoogleNewsRSS(category, maxArticles) {
  return new Promise(async (resolve, reject) => {
    const topicMap = {
      general: '',
      technology: 'TECHNOLOGY',
      business: 'BUSINESS',
      science: 'SCIENCE',
      health: 'HEALTH',
      entertainment: 'ENTERTAINMENT',
      sports: 'SPORTS',
    };

    const searchTermMap = {
      technology: 'tecnologia',
      business: 'negócios economia',
      science: 'ciência',
      health: 'saúde',
      entertainment: 'entretenimento',
      sports: 'esportes futebol',
    };

    const topic = topicMap[category] || '';
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } };

    // Try multiple URL strategies
    const urls = [];
    if (!topic) {
      urls.push(`https://news.google.com/rss?hl=pt-BR&gl=BR&ceid=BR:pt-419`);
    } else {
      // Strategy 1: Topic URL
      urls.push(`https://news.google.com/rss/headlines/section/topic/${topic}?hl=pt-BR&gl=BR&ceid=BR:pt-419`);
      // Strategy 2: Search query fallback
      const searchTerm = searchTermMap[category] || category;
      urls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(searchTerm)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`);
    }

    for (const url of urls) {
      try {
        const data = await httpsGetFollowRedirects(url, opts);
        const items = parseRSSItems(data, maxArticles);
        if (items.length > 0) {
          return resolve(items);
        }
      } catch (e) {
        console.error(`RSS fetch failed for ${url}:`, e.message);
      }
    }

    resolve([]); // No articles found from any source
  });
}

function parseRSSItems(data, maxArticles) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(data)) !== null && items.length < maxArticles) {
    const xml = match[1];
    const title = (xml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || xml.match(/<title>(.*?)<\/title>/) || [])[1] || 'No Title';
    // Google News RSS uses: <link/>URL\n or <link>URL</link>
    const link = (xml.match(/<link\s*\/>\s*(https?:\/\/[^\s<]+)/) || xml.match(/<link>(.*?)<\/link>/) || [])[1] || '';
    const pubDate = (xml.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
    const source = (xml.match(/<source[^>]*>(.*?)<\/source>/) || [])[1] || 'Google News';
    const description = (xml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || xml.match(/<description>(.*?)<\/description>/) || [])[1] || '';

    items.push({
      title: decodeHTMLEntities(title).replace(/ - [^-]+$/, ''),
      url: link.trim(),
      publishedAt: pubDate,
      source: { name: decodeHTMLEntities(source) },
      description: stripHTML(decodeHTMLEntities(description)).replace(/\s+/g, ' ').trim().substring(0, 250),
    });
  }
  return items;
}

function decodeHTMLEntities(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function stripHTML(html) {
  return (html || '').replace(/<[^>]*>/g, '');
}

// --- NewsAPI fetch ---
function fetchNewsAPI(category, maxArticles) {
  return new Promise((resolve, reject) => {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${maxArticles}&language=pt&apiKey=${NEWS_API_KEY}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.status === 'ok') {
            resolve(
              parsed.articles.map((a) => ({
                title: a.title,
                url: a.url,
                publishedAt: a.publishedAt,
                source: a.source,
                description: a.description || '',
                urlToImage: a.urlToImage || null,
              }))
            );
          } else {
            reject(new Error(parsed.message || 'NewsAPI error'));
          }
        } catch (e) {
          reject(e);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// --- API endpoint ---
app.get('/api/news', async (req, res) => {
  const category = req.query.category || 'general';
  const maxArticles = Math.min(Math.max(parseInt(req.query.max) || 10, 1), 50);
  const cacheKey = `${category}_${maxArticles}`;

  // Check cache
  if (cache[cacheKey] && Date.now() - cache[cacheKey].ts < CACHE_TTL) {
    return res.json({ articles: cache[cacheKey].data, cached: true, source: cache[cacheKey].source });
  }

  try {
    let articles;
    let source;

    if (NEWS_API_KEY) {
      articles = await fetchNewsAPI(category, maxArticles);
      source = 'NewsAPI';
    } else {
      articles = await fetchGoogleNewsRSS(category, maxArticles);
      source = 'Google News RSS';
    }

    cache[cacheKey] = { data: articles, ts: Date.now(), source };

    // Persist to memory
    const mem = loadMemory();
    mem.fetches.push({
      category,
      max_articles: maxArticles,
      articles_fetched: articles.length,
      fetch_timestamp: new Date().toISOString(),
    });
    // Keep last 100 entries only
    if (mem.fetches.length > 100) mem.fetches = mem.fetches.slice(-100);
    saveMemory(mem);

    res.json({ articles, cached: false, source });
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Memory/stats endpoint
app.get('/api/stats', (req, res) => {
  const mem = loadMemory();
  const byCategory = {};
  for (const f of mem.fetches) {
    if (!byCategory[f.category]) byCategory[f.category] = { count: 0, total_articles: 0 };
    byCategory[f.category].count++;
    byCategory[f.category].total_articles += f.articles_fetched;
  }
  res.json({
    total_fetches: mem.fetches.length,
    by_category: byCategory,
    last_fetch: mem.fetches[mem.fetches.length - 1] || null,
  });
});

app.listen(PORT, () => {
  console.log(`\n  ┌─────────────────────────────────────────┐`);
  console.log(`  │  📰 Daily Top News Fetcher              │`);
  console.log(`  │  ───────────────────────────────────     │`);
  console.log(`  │  Running at http://localhost:${PORT}      │`);
  console.log(`  │  API Key: ${NEWS_API_KEY ? '✅ Configured' : '⚠️  Not set (using Google News RSS)'}   │`);
  console.log(`  └─────────────────────────────────────────┘\n`);
});
