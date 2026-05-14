import {
  extractUsername,
  compactNumber,
  languageSummary,
  topRepositories,
  computeProfileScore,
  relativeDate,
  collectRepoSignals,
  computeBenchmark,
  deriveBadges,
  buildInsights,
} from './src/core.js';

const els = {
  form: document.getElementById('searchForm'),
  input: document.getElementById('usernameInput'),
  status: document.getElementById('status'),
  portfolio: document.getElementById('portfolio'),
  hero: document.getElementById('heroCard'),
  score: document.getElementById('scoreCard'),
  benchmark: document.getElementById('benchmarkCard'),
  badges: document.getElementById('badgesCard'),
  stats: document.getElementById('statsCard'),
  languages: document.getElementById('languagesCard'),
  repos: document.getElementById('reposCard'),
  activity: document.getElementById('activityCard'),
  insights: document.getElementById('insightsCard'),
  copyLinkBtn: document.getElementById('copyLinkBtn'),
  exportBtn: document.getElementById('exportBtn'),
  openGitHubBtn: document.getElementById('openGitHubBtn'),
  themeSelect: document.getElementById('themeSelect'),
};

const apiHeaders = {
  Accept: 'application/vnd.github+json',
};

const state = {
  username: '',
  user: null,
  repos: [],
  events: [],
  repoSort: 'stars',
  languageFilter: 'all',
};

function setStatus(message, type = '') {
  els.status.textContent = message;
  els.status.className = `status ${type}`.trim();
}

function withFallback(value, fallback = 'N/A') {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

function repoEngagement(repo) {
  return (repo.stargazers_count || 0) * 3 + (repo.forks_count || 0) * 2 + (repo.watchers_count || 0);
}

function filterAndSortRepos(repos) {
  let list = [...repos];
  if (state.languageFilter !== 'all') {
    list = list.filter((r) => (r.language || 'Other') === state.languageFilter);
  }

  const sorters = {
    stars: (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0),
    updated: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
    engagement: (a, b) => repoEngagement(b) - repoEngagement(a),
  };

  return list.sort(sorters[state.repoSort] || sorters.stars);
}

function renderHero(user, repos) {
  const pinnedLike = topRepositories(repos, 3);

  els.hero.innerHTML = `
    <div class="hero-top">
      <img class="avatar" src="${user.avatar_url}" alt="Avatar de ${user.login}" />
      <div class="meta">
        <h2>${withFallback(user.name, user.login)}</h2>
        <div class="handle">@${user.login}</div>
        <div class="bio">${withFallback(user.bio, 'Sem bio publica.')}</div>
      </div>
    </div>
    <div class="pills">
      <span class="pill">${withFallback(user.location, 'Local nao informado')}</span>
      <span class="pill">Conta criada em ${new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
      <span class="pill">${withFallback(user.company, 'Sem empresa')}</span>
      <span class="pill">${withFallback(user.blog, 'Sem site')}</span>
    </div>
    <div class="hero-highlight">
      <h3>Top highlights</h3>
      <div class="highlight-grid">
        ${pinnedLike
          .map(
            (r) => `
            <a class="highlight-item" href="${r.html_url}" target="_blank" rel="noopener noreferrer">
              <strong>${r.name}</strong>
              <span>★ ${compactNumber(r.stargazers_count || 0)} · ${withFallback(r.language, 'Other')}</span>
            </a>
          `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderScore(user, repos) {
  const { score, tier } = computeProfileScore(user, repos);
  const quality = score >= 80 ? 'Elite' : score >= 60 ? 'Alto' : score >= 40 ? 'Medio' : 'Inicial';

  els.score.innerHTML = `
    <div class="score-wrap">
      <span class="score-label">Creator Score</span>
      <strong>${score}</strong>
      <span class="tier">${tier} · ${quality}</span>
    </div>
  `;
}

function renderBenchmark(user, repos) {
  const { score } = computeProfileScore(user, repos);
  const { percentile, cohort } = computeBenchmark(score);
  const metrics = collectRepoSignals(repos);
  const freshness = metrics.total ? Math.round((metrics.updated90d / metrics.total) * 100) : 0;

  els.benchmark.innerHTML = `
    <h3>Benchmark</h3>
    <div class="benchmark-grid">
      <div class="metric"><span class="label">Percentil estimado</span><strong>P${percentile}</strong></div>
      <div class="metric"><span class="label">Coorte</span><strong>${cohort}</strong></div>
      <div class="metric"><span class="label">Freshness</span><strong>${freshness}%</strong></div>
      <div class="metric"><span class="label">Projetos ativos</span><strong>${metrics.activeOriginal}</strong></div>
    </div>
  `;
}

function renderBadges(user, repos) {
  const badges = deriveBadges(user, repos);
  els.badges.innerHTML = `
    <h3>Badges</h3>
    <div class="badge-list">
      ${badges.map((b) => `<span class="badge">${b.label}</span>`).join('')}
    </div>
  `;
}

function renderStats(user, repos) {
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const totalWatchers = repos.reduce((sum, r) => sum + (r.watchers_count || 0), 0);

  els.stats.innerHTML = `
    <h3>Resumo</h3>
    <div class="stat-grid">
      <div class="metric"><span class="label">Repos publicos</span><strong>${compactNumber(user.public_repos)}</strong></div>
      <div class="metric"><span class="label">Seguidores</span><strong>${compactNumber(user.followers)}</strong></div>
      <div class="metric"><span class="label">Seguindo</span><strong>${compactNumber(user.following)}</strong></div>
      <div class="metric"><span class="label">Stars totais</span><strong>${compactNumber(totalStars)}</strong></div>
      <div class="metric"><span class="label">Forks totais</span><strong>${compactNumber(totalForks)}</strong></div>
      <div class="metric"><span class="label">Watchers</span><strong>${compactNumber(totalWatchers)}</strong></div>
    </div>
  `;
}

function renderLanguages(repos) {
  const langs = languageSummary(repos).slice(0, 8);

  els.languages.innerHTML = `
    <h3>Linguagens</h3>
    <div class="lang-list">
      ${langs.map((l) => `<div class="lang-item"><span>${l.name}</span><strong>${l.count}</strong></div>`).join('')}
    </div>
  `;
}

function buildRepoFilters(repos) {
  const languages = [...new Set(repos.map((r) => r.language || 'Other'))].sort((a, b) => a.localeCompare(b));
  return [
    '<option value="all">Todas linguagens</option>',
    ...languages.map((l) => `<option value="${l}">${l}</option>`),
  ].join('');
}

function renderRepos(repos) {
  const list = filterAndSortRepos(repos).slice(0, 24);
  const filters = buildRepoFilters(repos);

  els.repos.innerHTML = `
    <div class="repos-head">
      <h3>Projetos</h3>
      <div class="repo-controls">
        <select id="repoSort">
          <option value="stars" ${state.repoSort === 'stars' ? 'selected' : ''}>Mais stars</option>
          <option value="updated" ${state.repoSort === 'updated' ? 'selected' : ''}>Mais recentes</option>
          <option value="engagement" ${state.repoSort === 'engagement' ? 'selected' : ''}>Mais engajados</option>
        </select>
        <select id="langFilter">${filters}</select>
      </div>
    </div>

    <div class="repo-cards">
      ${list
        .map(
          (r) => `
          <article class="repo-card">
            <div class="repo-card-top">
              <a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a>
              <span>${relativeDate(r.updated_at)}</span>
            </div>
            <p>${withFallback(r.description, 'Sem descricao publica.')}</p>
            <div class="repo-tags">
              <span class="tag">${withFallback(r.language, 'Other')}</span>
              <span class="tag">★ ${compactNumber(r.stargazers_count || 0)}</span>
              <span class="tag">Forks ${compactNumber(r.forks_count || 0)}</span>
            </div>
          </article>
        `,
        )
        .join('')}
    </div>
  `;

  const repoSortEl = document.getElementById('repoSort');
  const langFilterEl = document.getElementById('langFilter');
  if (langFilterEl) {
    langFilterEl.value = state.languageFilter;
  }

  repoSortEl?.addEventListener('change', (e) => {
    state.repoSort = e.target.value;
    renderRepos(state.repos);
  });

  langFilterEl?.addEventListener('change', (e) => {
    state.languageFilter = e.target.value;
    renderRepos(state.repos);
  });
}

function renderActivity(events) {
  const safeEvents = (events || []).slice(0, 12);

  els.activity.innerHTML = `
    <h3>Atividade recente</h3>
    <div class="activity-list">
      ${safeEvents.length
        ? safeEvents
            .map(
              (ev) => `
          <div class="activity-item">
            <div>
              <strong>${ev.type.replace('Event', '')}</strong>
              <span>${ev.repo?.name || 'repo/unknown'}</span>
            </div>
            <time>${relativeDate(ev.created_at)}</time>
          </div>
        `,
            )
            .join('')
        : '<p class="empty">Sem eventos publicos recentes.</p>'}
    </div>
  `;
}

function renderInsights(user, repos) {
  const insights = buildInsights(user, repos);
  els.insights.innerHTML = `
    <h3>Insights acionaveis</h3>
    <ul class="insight-list">
      ${insights.map((i) => `<li>${i}</li>`).join('')}
    </ul>
  `;
}

function renderAll() {
  renderHero(state.user, state.repos);
  renderScore(state.user, state.repos);
  renderBenchmark(state.user, state.repos);
  renderBadges(state.user, state.repos);
  renderStats(state.user, state.repos);
  renderLanguages(state.repos);
  renderRepos(state.repos);
  renderActivity(state.events);
  renderInsights(state.user, state.repos);
}

async function fetchGitHubProfile(username) {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: apiHeaders }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers: apiHeaders }),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers: apiHeaders }),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error('Perfil nao encontrado no GitHub.');
    throw new Error(`Erro ao buscar perfil (${userRes.status}).`);
  }

  if (!reposRes.ok) {
    throw new Error(`Erro ao buscar repositorios (${reposRes.status}).`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();
  const events = eventsRes.ok ? await eventsRes.json() : [];

  return { user, repos, events };
}

async function handleSubmit(event) {
  event.preventDefault();

  const username = extractUsername(els.input.value);
  if (!username) {
    setStatus('Informe um username valido.', 'error');
    return;
  }

  setStatus('Buscando dados no GitHub...');
  els.portfolio.classList.add('hidden');
  state.languageFilter = 'all';
  state.repoSort = 'stars';

  try {
    const { user, repos, events } = await fetchGitHubProfile(username);

    state.username = username;
    state.user = user;
    state.repos = repos;
    state.events = events;

    renderAll();
    els.portfolio.classList.remove('hidden');

    const url = new URL(window.location.href);
    url.searchParams.set('u', username);
    history.replaceState({}, '', url);

    els.openGitHubBtn.disabled = false;

    setStatus(`Portfolio de @${username} gerado com sucesso.`, 'ok');
  } catch (error) {
    setStatus(error.message || 'Falha ao gerar portfolio.', 'error');
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    setStatus('Link copiado para a area de transferencia.', 'ok');
  } catch {
    setStatus('Nao foi possivel copiar o link.', 'error');
  }
}

function openGitHubProfile() {
  if (!state.username) return;
  window.open(`https://github.com/${state.username}`, '_blank', 'noopener,noreferrer');
}

async function exportPng() {
  if (els.portfolio.classList.contains('hidden')) {
    setStatus('Gere um portfolio antes de exportar.', 'error');
    return;
  }

  const node = els.portfolio;
  const canvas = await window.html2canvas(node, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  const link = document.createElement('a');
  link.download = `repo-canvas-${state.username || 'profile'}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  setStatus('Exportacao concluida.', 'ok');
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('repo-canvas-theme', theme);
}

function loadFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('u');
  if (fromQuery) {
    els.input.value = fromQuery;
    els.form.requestSubmit();
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('repo-canvas-theme') || 'bento';
  els.themeSelect.value = savedTheme;
  applyTheme(savedTheme);
}

els.form.addEventListener('submit', handleSubmit);
els.copyLinkBtn.addEventListener('click', copyLink);
els.exportBtn.addEventListener('click', exportPng);
els.openGitHubBtn.addEventListener('click', openGitHubProfile);
els.themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));

initTheme();
loadFromQuery();
