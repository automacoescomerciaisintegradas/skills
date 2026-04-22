---
title: "Configuração do Cloudflare Tunnel"
type: source
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["infrastructure", "cloudflare", "networking"]
source_files:
  - raw/sources/cloudflared-config.yml
related_pages:
  - ../entities/social-flow-tunnel.md
---

# Configuração do Cloudflare Tunnel

## Resumo

Este arquivo define a configuração do túnel Cloudflare para o projeto Social Flow. Ele mapeia nomes de domínio (hostnames) para serviços locais rodando em diferentes portas, permitindo o acesso externo seguro ao sistema principal, dashboard de automação e worker de IA.

## Pontos-Chave

- Identificação do túnel: `37e85eaf-9d4d-4962-a919-93ae19899854`.
- Arquivo de credenciais localizado em `.cloudflared/`.
- Mapeamento de 3 hostnames específicos para serviços locais.

## Afirmações/Observações Principais

- **Hostname `app.automacoescomerciais.com`**: Direcionado para o sistema principal Next.js em `http://localhost:3000`.
- **Hostname `dash.automacoescomerciais.com`**: Direcionado para o `instagram-worker` em `http://localhost:8788`.
- **Hostname `auto.automacoescomerciais.com`**: Direcionado para o `my-worker` (IA) em `http://localhost:8787`.
- **Regra Padrão**: Qualquer outro acesso retorna status HTTP 404.

## Notas de Evidência

- Seção `tunnel` e `credentials-file` para autenticação.
- Lista `ingress` para regras de roteamento.

## Impacto na Wiki Existente

- Define a estrutura de rede da entidade `Social Flow`.
- Estabelece os pontos de entrada para os sistemas de `IA` e `Automação`.

## Questões Não Resolvidas

- Verificar se as portas locais (3000, 8788, 8787) são fixas ou dependem do ambiente.
- Documentar o processo de atualização do `credentials-file`.

## Páginas Relacionadas

- [Social Flow Tunnel](../entities/social-flow-tunnel.md)
