---
title: "Social Flow Tunnel"
type: entity
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["entity", "system", "infrastructure"]
source_files:
  - raw/sources/cloudflared-config.yml
related_pages:
  - ../sources/2026-04-19_source-cloudflared-config.md
---

# Social Flow Tunnel

## Visão Geral

O **Social Flow Tunnel** é o componente de infraestrutura responsável por expor de forma segura os serviços internos da rede local para a internet via Cloudflare. Ele atua como o gateway principal para todas as interações externas com a plataforma Social Flow.

## Fatos-Chave

- **ID do Túnel**: `37e85eaf-9d4d-4962-a919-93ae19899854`.
- **Provedor**: Cloudflare (via `cloudflared`).
- **Endpoints Expostos**:
    - App Principal: `app.automacoescomerciais.com`
    - Dashboard: `dash.automacoescomerciais.com`
    - IA/Automation: `auto.automacoescomerciais.com`

## Cronograma e Evolução

- **2026-04-19**: Configuração atual capturada no branch principal, mapeando o sistema Next.js, Worker de Instagram e Worker de IA.

## Relacionamentos

- **Sistema Principal**: Conecta-se ao serviço em `http://localhost:3000`.
- **Instagram Worker**: Conecta-se ao serviço em `http://localhost:8788`.
- **AI Worker (`my-worker`)**: Conecta-se ao serviço em `http://localhost:8787`.

## Pontos para Monitorar

- Propagação correta dos registros DNS no painel da Cloudflare.
- Latência de conexão entre o túnel local e os servidores da borda.
- Renovação automática das credenciais JSON.
