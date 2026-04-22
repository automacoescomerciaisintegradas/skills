---
title: "Políticas de Coleta: Instagram Robots.txt"
type: source
status: active
created: 2026-04-22
updated: 2026-04-22
tags: ["instagram", "robots-txt", "automation-limits", "scraping", "compliance"]
source_files: ["https://www.instagram.com/robots.txt"]
related_pages:
  - ../index.md
  - ../log.md
---

# Fonte: Instagram Robots.txt (Abril 2026)

Documento técnico que define as permissões de acesso para rastreadores e ferramentas de automação na plataforma Instagram.

## Resumo das Restrições
- **Proibição Geral**: A coleta de dados por meios automatizados é proibida sem permissão expressa por escrito do Instagram.
- **Bloqueio Total (`Disallow: /`)**: Aplicado a user-agents de IA proeminentes, incluindo:
    - `ClaudeBot`
    - `GPTBot`
    - `PerplexityBot`
    - `Applebot-Extended`
    - `Google-Extended`
- **Exceções Limitadas**: Alguns diretórios como `/places/c/` são permitidos para bots de busca tradicionais (Googlebot, Bingbot), mas com restrições severas em áreas de login, comentários e curtidas.

## Desafio Técnico Encontrado
Durante a tentativa de automação de postagem via Antigravity (Browser Subagent), o sistema foi detectado e redirecionado para esta página de termos, impedindo o fluxo programático.

## Implicações para o Antigravity
1. **Necessidade de Intervenção Humana**: Postagens em redes do grupo Meta (Instagram/Facebook) exigem execução manual ou via APIs oficiais (Graph API) para evitar banimentos de IP ou contas.
2. **Estratégia de Marketing**: Focar na geração de assets (imagens/legendas) localmente e facilitar o upload manual ("Human-in-the-loop").
