export function extractUsername(input) {
  const value = String(input || '').trim();
  if (!value) return '';

  const noProtocol = value.replace(/^https?:\/\//i, '');
  const noDomain = noProtocol.replace(/^www\./i, '');

  if (noDomain.toLowerCase().startsWith('github.com/')) {
    return noDomain.slice('github.com/'.length).split('/')[0].replace(/^@/, '');
  }

  return noDomain.split('/')[0].replace(/^@/, '');
}

export function compactNumber(value) {
  const n = Number(value || 0);
  if (n < 1000) return String(Math.round(n));
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
}

export function languageSummary(repos) {
  const counter = new Map();

  for (const repo of repos || []) {
    const name = repo?.language || 'Other';
    counter.set(name, (counter.get(name) || 0) + 1);
  }

  return [...counter.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function topRepositories(repos, limit = 6) {
  return [...(repos || [])]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (b.forks_count || 0) - (a.forks_count || 0);
    })
    .slice(0, limit);
}

export function computeProfileScore(user, repos) {
  const profile = user || {};
  const list = repos || [];

  const stars = list.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const forks = list.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const watchers = list.reduce((sum, r) => sum + (r.watchers_count || 0), 0);
  const reposCount = profile.public_repos || list.length || 0;
  const followers = profile.followers || 0;

  const raw =
    Math.log1p(stars) * 22 +
    Math.log1p(forks) * 14 +
    Math.log1p(watchers) * 8 +
    Math.log1p(followers) * 20 +
    Math.log1p(reposCount) * 18;

  const score = Math.max(0, Math.min(100, Math.round(raw)));

  let tier = 'Starter';
  if (score >= 80) tier = 'Legend';
  else if (score >= 65) tier = 'Pro';
  else if (score >= 45) tier = 'Builder';

  return { score, tier };
}

export function relativeDate(input) {
  if (!input) return 'Data indisponivel';
  const target = new Date(input).getTime();
  if (Number.isNaN(target)) return 'Data invalida';
  const now = Date.now();
  const deltaMs = now - target;
  const minutes = Math.max(1, Math.floor(deltaMs / 60000));
  if (minutes < 60) return `${minutes}m atras`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atras`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d atras`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mes atras`;
  const years = Math.floor(months / 12);
  return `${years}a atras`;
}

export function collectRepoSignals(repos) {
  const list = repos || [];
  return list.reduce(
    (acc, repo) => {
      acc.total += 1;
      acc.stars += repo.stargazers_count || 0;
      acc.forks += repo.forks_count || 0;
      acc.watchers += repo.watchers_count || 0;
      if (repo.archived) acc.archived += 1;
      if (repo.fork) acc.forkRepos += 1;
      if (!repo.fork && !repo.archived) acc.activeOriginal += 1;
      if (repo.updated_at) {
        const days = (Date.now() - new Date(repo.updated_at).getTime()) / 86400000;
        if (days <= 90) acc.updated90d += 1;
      }
      return acc;
    },
    {
      total: 0,
      stars: 0,
      forks: 0,
      watchers: 0,
      archived: 0,
      forkRepos: 0,
      activeOriginal: 0,
      updated90d: 0,
    },
  );
}

export function computeBenchmark(score) {
  const s = Math.max(0, Math.min(100, Number(score || 0)));
  let percentile = Math.round(s * 0.92 + 4);
  percentile = Math.max(1, Math.min(99, percentile));

  let cohort = 'Emerging';
  if (percentile >= 92) cohort = 'Top Builder';
  else if (percentile >= 80) cohort = 'Advanced';
  else if (percentile >= 60) cohort = 'Growing';

  return { percentile, cohort };
}

export function deriveBadges(user, repos) {
  const profile = user || {};
  const metrics = collectRepoSignals(repos);
  const badges = [];

  if ((profile.followers || 0) >= 500) badges.push({ key: 'audience', label: 'Community Pull' });
  if (metrics.stars >= 250) badges.push({ key: 'impact', label: 'Open Source Impact' });
  if (metrics.updated90d >= 8) badges.push({ key: 'momentum', label: 'Shipping Momentum' });
  if (metrics.activeOriginal >= 6) badges.push({ key: 'craft', label: 'Product Crafter' });
  if (languageSummary(repos).filter((l) => l.name !== 'Other').length >= 4) {
    badges.push({ key: 'polyglot', label: 'Polyglot Engineer' });
  }
  if ((profile.public_repos || 0) >= 40) badges.push({ key: 'catalog', label: 'Deep Catalog' });
  if (badges.length === 0) badges.push({ key: 'starter', label: 'Rising Builder' });

  return badges.slice(0, 5);
}

export function buildInsights(user, repos) {
  const profile = user || {};
  const metrics = collectRepoSignals(repos);
  const insights = [];

  if ((profile.bio || '').trim().length < 20) {
    insights.push('Bio curta: adicionar stack, foco e tipo de projeto aumenta conversao do perfil.');
  }
  if ((profile.blog || '').trim().length === 0) {
    insights.push('Sem link de portfolio/site: conecte um site para captar oportunidades fora do GitHub.');
  }
  if (metrics.updated90d < 4) {
    insights.push('Baixa atividade recente: publicar 1-2 updates semanais melhora tracao de descoberta.');
  }
  if (metrics.forkRepos > metrics.activeOriginal) {
    insights.push('Maioria dos repos sao forks: destaque mais projetos autorais para reforcar autoridade.');
  }
  if (metrics.stars < 50 && metrics.total >= 10) {
    insights.push('Stars abaixo do potencial: melhore READMEs e demos para aumentar distribuicao organica.');
  }
  if (insights.length === 0) {
    insights.push('Perfil consistente: manter ritmo de publicacao e melhorar casos de uso pode elevar seu score.');
  }

  return insights.slice(0, 4);
}
