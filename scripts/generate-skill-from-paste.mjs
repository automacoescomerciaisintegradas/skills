#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const REPO_ROOT = process.cwd();

function usage() {
  console.log(`
Usage:
  node scripts/generate-skill-from-paste.mjs --name <skill-slug> --input <file>

Optional:
  --title <display title>
  --description <short description>
  --keywords <comma,separated,keywords>
  --max-sources <n>   (default: 5)
`);
}

function parseArgs(argv) {
  const map = new Map();
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : 'true';
    map.set(key, value);
    if (value !== 'true') i += 1;
  }
  return map;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractUrls(text) {
  const matches = text.match(/https?:\/\/[^\s)>"']+/g) || [];
  return [...new Set(matches)];
}

function toRawGithubUrl(url) {
  // https://github.com/<owner>/<repo>/blob/<branch>/<path>
  const blobPattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i;
  const m = url.match(blobPattern);
  if (!m) return url;
  const [, owner, repo, branch, filePath] = m;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

function summarizeContent(raw) {
  const compact = raw
    .replace(/\r/g, '')
    .replace(/\t/g, '  ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return compact.slice(0, 3500);
}

async function fetchSource(url) {
  const normalizedUrl = toRawGithubUrl(url);
  const res = await fetch(normalizedUrl, {
    headers: {
      'User-Agent': 'skills-generator/1.0',
      Accept: '*/*',
    },
  });

  if (!res.ok) {
    return {
      url,
      normalizedUrl,
      ok: false,
      status: res.status,
      content: `Failed to fetch source (HTTP ${res.status})`,
    };
  }

  const text = await res.text();
  return {
    url,
    normalizedUrl,
    ok: true,
    status: res.status,
    content: summarizeContent(text),
  };
}

function buildManifest({ name, description, keywords }) {
  return {
    version: '1.0.0',
    name,
    mcp: {
      tools: [],
      transport: 'stdio',
    },
    repository: {
      type: 'git',
      url: 'https://github.com/automacoescomerciaisintegradas/skills',
    },
    description,
    keywords,
    license: '© Automações Comerciais Integradas! 2026',
  };
}

function buildSkillMarkdown({ name, title, description, keywords, sourceLinks }) {
  const refs = sourceLinks.map((s, i) => `- Fonte ${i + 1}: ${s}`).join('\n');
  const tags = keywords.map((k) => `\`${k}\``).join(', ');
  return `---
name: ${name}
description: ${description}
version: 1.0.0
author: Francisco Queiroz | Automações Comerciais Integradas
---

# ${title}

## Objetivo
Transformar dados/links colados em diretrizes práticas para execução no fluxo de desenvolvimento.

## Fontes de referência
${refs}

## Tags
${tags}

## Fluxo recomendado
1. Coletar contexto do material colado (código, CSS, docs, buscas GitHub).
2. Extrair padrões reutilizáveis (estrutura, estilo, naming, arquitetura).
3. Gerar plano de implementação com tarefas pequenas e verificáveis.
4. Aplicar no projeto alvo mantendo consistência de padrão visual e técnico.
5. Validar com testes e checklist de qualidade antes de publicar.

## Checklist de execução
- [ ] Fontes acessíveis e relevantes
- [ ] Padrões extraídos e documentados
- [ ] Plano de ação objetivo definido
- [ ] Implementação aplicada no projeto
- [ ] Testes/validação concluídos

## Notas
- Esta skill foi gerada automaticamente a partir de dados colados.
- Ajuste esta documentação para o contexto específico do seu projeto.
`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, `${JSON.stringify(obj, null, 2)}\n`, 'utf8');
}

async function main() {
  const args = parseArgs(process.argv);
  const nameArg = args.get('name');
  const inputPathArg = args.get('input');

  if (!nameArg || !inputPathArg) {
    usage();
    process.exit(1);
  }

  const skillName = slugify(nameArg);
  const title = args.get('title') || `Skill: ${skillName}`;
  const description =
    args.get('description') ||
    'Skill gerada a partir de dados colados para orientar implementação e padronização.';
  const keywords = (args.get('keywords') || 'skill,automation,reference')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 12);
  const maxSources = Math.max(1, Number(args.get('max-sources') || 5));

  const inputPath = path.resolve(REPO_ROOT, inputPathArg);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const inputText = fs.readFileSync(inputPath, 'utf8');
  const urls = extractUrls(inputText).slice(0, maxSources);

  const skillDir = path.join(REPO_ROOT, skillName);
  const refsDir = path.join(skillDir, 'references');

  if (fs.existsSync(skillDir)) {
    throw new Error(`Skill directory already exists: ${skillDir}`);
  }

  ensureDir(refsDir);

  const fetched = [];
  for (const url of urls) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const source = await fetchSource(url);
      fetched.push(source);
    } catch (err) {
      fetched.push({
        url,
        normalizedUrl: url,
        ok: false,
        status: 0,
        content: `Fetch error: ${err.message}`,
      });
    }
  }

  const sourceLinks = fetched.map((s) => s.url);
  const skillMd = buildSkillMarkdown({
    name: skillName,
    title,
    description,
    keywords,
    sourceLinks,
  });
  const manifest = buildManifest({
    name: skillName,
    description,
    keywords,
  });

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd, 'utf8');
  writeJson(path.join(skillDir, 'manifest.json'), manifest);

  const hash = crypto.createHash('sha256').update(inputText, 'utf8').digest('hex');
  fs.writeFileSync(
    path.join(refsDir, '_input.txt'),
    `# Original pasted input\n\nSHA256: ${hash}\n\n${inputText}\n`,
    'utf8',
  );

  fetched.forEach((source, idx) => {
    const file = path.join(refsDir, `source-${String(idx + 1).padStart(2, '0')}.md`);
    const body = `# Source ${idx + 1}\n\n- Original URL: ${source.url}\n- Fetched URL: ${
      source.normalizedUrl
    }\n- Status: ${source.status}\n- OK: ${source.ok}\n\n## Content excerpt\n\n\`\`\`\n${
      source.content
    }\n\`\`\`\n`;
    fs.writeFileSync(file, body, 'utf8');
  });

  console.log(`✅ Skill generated: ${skillDir}`);
  console.log(`- URLs processed: ${fetched.length}`);
  console.log(`- Manifest: ${path.join(skillDir, 'manifest.json')}`);
  console.log(`- SKILL.md: ${path.join(skillDir, 'SKILL.md')}`);
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});

