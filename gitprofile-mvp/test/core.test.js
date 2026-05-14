import test from 'node:test';
import assert from 'node:assert/strict';

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
} from '../src/core.js';

test('extractUsername handles plain username', () => {
  assert.equal(extractUsername('octocat'), 'octocat');
});

test('extractUsername handles github URL', () => {
  assert.equal(extractUsername('https://github.com/octocat'), 'octocat');
  assert.equal(extractUsername('github.com/octocat/'), 'octocat');
});

test('compactNumber formats thousands and millions', () => {
  assert.equal(compactNumber(999), '999');
  assert.equal(compactNumber(1200), '1.2K');
  assert.equal(compactNumber(2500000), '2.5M');
});

test('languageSummary aggregates language bytes', () => {
  const repos = [
    { language: 'TypeScript', stargazers_count: 3, forks_count: 1 },
    { language: 'TypeScript', stargazers_count: 8, forks_count: 2 },
    { language: 'Python', stargazers_count: 2, forks_count: 0 },
    { language: null, stargazers_count: 4, forks_count: 1 },
  ];

  assert.deepEqual(languageSummary(repos), [
    { name: 'TypeScript', count: 2 },
    { name: 'Python', count: 1 },
    { name: 'Other', count: 1 },
  ]);
});

test('topRepositories ranks by stars then forks', () => {
  const repos = [
    { name: 'a', stargazers_count: 1, forks_count: 100 },
    { name: 'b', stargazers_count: 10, forks_count: 0 },
    { name: 'c', stargazers_count: 10, forks_count: 5 },
  ];

  assert.deepEqual(topRepositories(repos, 2).map((r) => r.name), ['c', 'b']);
});

test('computeProfileScore returns bounded score and tier', () => {
  const user = { followers: 1200, public_repos: 84 };
  const repos = [
    { stargazers_count: 5000, forks_count: 400, watchers_count: 1000 },
    { stargazers_count: 3000, forks_count: 200, watchers_count: 800 },
  ];

  const result = computeProfileScore(user, repos);
  assert.equal(typeof result.score, 'number');
  assert.equal(result.score >= 0 && result.score <= 100, true);
  assert.equal(['Starter', 'Builder', 'Pro', 'Legend'].includes(result.tier), true);
});

test('relativeDate handles invalid and valid inputs', () => {
  assert.equal(relativeDate(null), 'Data indisponivel');
  assert.equal(relativeDate('not-a-date'), 'Data invalida');
  const nowIso = new Date().toISOString();
  assert.equal(relativeDate(nowIso).includes('atras'), true);
});

test('collectRepoSignals aggregates repository indicators', () => {
  const repos = [
    { stargazers_count: 2, forks_count: 1, watchers_count: 3, archived: false, fork: false, updated_at: new Date().toISOString() },
    { stargazers_count: 5, forks_count: 0, watchers_count: 1, archived: true, fork: true, updated_at: '2020-01-01T00:00:00Z' },
  ];
  const m = collectRepoSignals(repos);
  assert.equal(m.total, 2);
  assert.equal(m.stars, 7);
  assert.equal(m.archived, 1);
  assert.equal(m.forkRepos, 1);
});

test('computeBenchmark returns bounded percentile and cohort', () => {
  const low = computeBenchmark(10);
  const high = computeBenchmark(95);
  assert.equal(low.percentile >= 1 && low.percentile <= 99, true);
  assert.equal(high.percentile >= low.percentile, true);
  assert.equal(typeof high.cohort, 'string');
});

test('deriveBadges and buildInsights return non-empty arrays', () => {
  const user = { followers: 10, public_repos: 12, bio: '', blog: '' };
  const repos = Array.from({ length: 12 }, (_, i) => ({
    language: i % 2 === 0 ? 'TypeScript' : 'Python',
    stargazers_count: 1,
    forks_count: 0,
    watchers_count: 0,
    archived: false,
    fork: false,
    updated_at: '2020-01-01T00:00:00Z',
  }));

  const badges = deriveBadges(user, repos);
  const insights = buildInsights(user, repos);
  assert.equal(Array.isArray(badges), true);
  assert.equal(Array.isArray(insights), true);
  assert.equal(badges.length > 0, true);
  assert.equal(insights.length > 0, true);
});
