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
