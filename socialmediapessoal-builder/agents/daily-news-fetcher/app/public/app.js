/* ========================================
   Daily Top News Fetcher — Client JS
   ======================================== */

(function () {
  'use strict';

  const DOM = {
    categorySelect: document.getElementById('categorySelect'),
    maxArticles: document.getElementById('maxArticles'),
    fetchBtn: document.getElementById('fetchBtn'),
    fetchInfo: document.getElementById('fetchInfo'),
    newsFeed: document.getElementById('newsFeed'),
    emptyState: document.getElementById('emptyState'),
    statFetches: document.querySelector('#statFetches .stat-pill__val'),
    statSource: document.querySelector('#statSource .stat-pill__val'),
    footerTime: document.getElementById('footerTime'),
  };

  const CATEGORY_LABELS = {
    general: '🌍 Geral',
    technology: '💻 Tecnologia',
    business: '💼 Negócios',
    science: '🔬 Ciência',
    health: '🏥 Saúde',
    entertainment: '🎬 Entretenimento',
    sports: '⚽ Esportes',
  };

  // Update footer clock
  function updateClock() {
    const now = new Date();
    DOM.footerTime.textContent = now.toLocaleString('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Load stats
  async function loadStats() {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      DOM.statFetches.textContent = data.total_fetches || 0;
    } catch {
      DOM.statFetches.textContent = '—';
    }
  }
  loadStats();

  // Format date
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  }

  // Render articles
  function renderArticles(articles, source, cached) {
    // Clear
    DOM.newsFeed.innerHTML = '';

    // Info badge
    const badgeClass = cached ? 'badge--cached' : 'badge--live';
    const badgeText = cached ? '⚡ Cache' : '🟢 Ao vivo';
    const category = DOM.categorySelect.value;
    DOM.fetchInfo.innerHTML = `
      <span class="badge ${badgeClass}">${badgeText}</span>
      ${articles.length} artigos de <strong>${CATEGORY_LABELS[category] || category}</strong>
      via ${source} — ${new Date().toLocaleTimeString('pt-BR')}
    `;

    DOM.statSource.textContent = source;

    if (articles.length === 0) {
      DOM.newsFeed.innerHTML = `
        <div class="feed__empty">
          <div class="feed__empty-icon">😕</div>
          <p>Nenhum artigo encontrado para esta categoria. Tente outra!</p>
        </div>
      `;
      return;
    }

    articles.forEach((article, i) => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.style.animationDelay = `${i * 0.06}s`;

      const sourceName = article.source?.name || 'Fonte desconhecida';
      const desc = article.description || 'Sem descrição disponível.';
      const date = formatDate(article.publishedAt);

      card.innerHTML = `
        <div class="article-card__rank">${i + 1}</div>
        <h2 class="article-card__title">
          <a href="${escapeHTML(article.url)}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(article.title)}
          </a>
        </h2>
        <div class="article-card__meta">
          <span class="article-card__source">📡 ${escapeHTML(sourceName)}</span>
          ${date ? `<span>📅 ${date}</span>` : ''}
        </div>
        <p class="article-card__desc">${escapeHTML(desc)}</p>
        <a class="article-card__link" href="${escapeHTML(article.url)}" target="_blank" rel="noopener noreferrer">
          Ler artigo completo →
        </a>
      `;

      DOM.newsFeed.appendChild(card);
    });
  }

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Render error
  function renderError(msg) {
    DOM.newsFeed.innerHTML = `
      <div class="feed__error">
        <div class="feed__error-icon">⚠️</div>
        <p><strong>Erro ao buscar notícias</strong></p>
        <p>${escapeHTML(msg)}</p>
      </div>
    `;
    DOM.fetchInfo.textContent = '';
  }

  // Fetch news
  async function fetchNews() {
    const category = DOM.categorySelect.value;
    const max = DOM.maxArticles.value || 10;

    DOM.fetchBtn.classList.add('loading');
    DOM.fetchBtn.disabled = true;

    try {
      const res = await fetch(`/api/news?category=${category}&max=${max}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Erro desconhecido');
      }

      const data = await res.json();
      renderArticles(data.articles, data.source, data.cached);
      loadStats();
    } catch (err) {
      renderError(err.message);
    } finally {
      DOM.fetchBtn.classList.remove('loading');
      DOM.fetchBtn.disabled = false;
    }
  }

  // Events
  DOM.fetchBtn.addEventListener('click', fetchNews);

  // Keyboard shortcut: Enter to fetch
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !DOM.fetchBtn.disabled) {
      fetchNews();
    }
  });

  // Auto-fetch on load
  fetchNews();
})();
