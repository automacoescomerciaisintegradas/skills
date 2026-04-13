# Daily Top News Fetcher

## Goal
Fetch and summarize the top news articles by category, delivered every morning with titles, summaries, and sources.

## Inputs
- **category** (select, optional, default: `general`): News category to fetch — General, Technology, Business, Science, Health, Entertainment, Sports
- **max_articles** (integer, optional, default: `10`): Number of top articles to retrieve (1-50)

## Procedure
1. Search for top news using NewsAPI or web search with the selected category
2. Sort articles by relevance and recency
3. Extract top N articles (`max_articles`)
4. Format each article with: title, summary, source, publication date, and URL
5. Present as a clean markdown summary

## Output
Formatted markdown list of top news articles with:
- Article title
- Source and publication date
- Brief summary (1-2 sentences)
- Direct link to full article
- Count of articles fetched

## Schedule
Recommend scheduling daily at 8:00 AM in your timezone to receive morning briefing.

## Example Output

```markdown
# 📰 Daily News Briefing — 2026-04-11
**Category:** Technology | **Articles:** 10

---

### 1. AI Advances in Healthcare Diagnostics
**Source:** Reuters | **Date:** 2026-04-11
> New AI models are demonstrating 98% accuracy in early cancer detection...
🔗 [Read full article](https://example.com/article-1)

---

### 2. SpaceX Announces Mars Colony Timeline
**Source:** BBC News | **Date:** 2026-04-11
> Elon Musk reveals updated timeline for permanent Mars settlement...
🔗 [Read full article](https://example.com/article-2)
```
