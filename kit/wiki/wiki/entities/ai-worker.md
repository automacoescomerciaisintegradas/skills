---
title: "AI Worker (my-worker)"
type: entity
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["entity", "cloudflare-worker", "ai"]
source_files:
  - raw/sources/my-worker/wrangler.toml
related_pages:
  - ../entities/social-flow-tunnel.md
  - ../concepts/rag-and-vector-databases.md
---

# AI Worker (my-worker)

## Visão Geral

O **AI Worker (my-worker)** é o cérebro computacional baseado em Cloudflare Workers da plataforma Social Flow. Ele é responsável por processar requisições de IA, orquestrar bots e executar lógica de automação inteligente na borda (Edge).

## Fatos-Chave

- **Plataforma**: Cloudflare Workers + Hono Framework.
- **Framework**: Hono v4 (consistente com o `instagram-worker`).
- **Bindings**: `AI` → Cloudflare Workers AI (Llama 3.1 8B Instruct).
- **Domínio**: `auto.automacoescomerciais.com`.
- **Endpoints**:
    - `POST /generate-copy` — Gera copy para Meta Ads, Instagram, WhatsApp ou Email.
    - `POST /analyze-campaign` — Analisa métricas e sugere otimizações.
    - `GET /api/health` — Health check com status do binding AI.
    - `GET /` — Informações do serviço e lista de endpoints.

## Cronograma e Evolução

- **2026-04-19 (v1)**: Mapeamento inicial com demo de piadas (Llama 3 8B).
- **2026-04-19 (v2)**: Reescrita completa com Hono, Prompt Engineering estruturado, parsing robusto e endpoints de produção.

## Relacionamentos

- **Social Flow Tunnel**: Exposto via `auto.automacoescomerciais.com` (porta 8787).
- **Meta Ads Agent**: O script `meta_ads_agent.py` chama `POST /generate-copy` para obter copys geradas por IA.
- **Instagram Worker**: O `instagram-worker` consome o endpoint `POST /chat` para fornecer respostas automáticas inteligentes aos usuários.
- **Arquitetura "Brain"**: O `my-worker` agora serve como o núcleo de inteligência centralizado para todos os serviços da organização.

## Pontos para Monitorar

- Limites de execução do Workers AI (requests/dia no plano gratuito).
- Qualidade das copys geradas pelo Llama 3.1 8B vs. modelos maiores.
- Latência da inferência na borda (target < 3s por request).
- CORS configurado para permitir chamadas do `app` e `dash`.
