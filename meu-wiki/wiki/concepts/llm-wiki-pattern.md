---
title: "Conceito: Padrão LLM Wiki"
type: concept
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["architecture", "ai", "personal-knowledge-management"]
source_files:
  - raw/sources/2026-04-19_source-karpathy-llm-wiki-gist.md
related_pages:
  - ../sources/2026-04-19_source-llm-wiki-pattern.md
  - ../entities/andrej-karpathy.md
  - ../overview.md
---

# Padrão LLM Wiki

## Definição do Conceito

O Padrão LLM Wiki é uma arquitetura de gerenciamento de conhecimento onde um LLM atua como o principal editor e curador de uma base de conhecimento em Markdown. Ao contrário do RAG (Retrieval-Augmented Generation) puro, onde pedaços de texto são recuperados em tempo real, este padrão foca na **compilação incremental** de informações em uma estrutura legível e interconectada que evolui com o tempo.

## Compreensão Atual

O padrão consiste em tratar a base de conhecimento como um artefato vivo. O fluxo de trabalho principal envolve:
1. **Ingestão**: O LLM lê uma nova fonte e atualiza múltiplas páginas da wiki simultaneamente.
2. **Síntese**: O LLM cria novas páginas que conectam diferentes fontes e conceitos.
3. **Manutenção (Linting)**: O LLM revisa a wiki em busca de lacunas ou contradições.

## Visões Concorrentes e Debates

- **RAG vs. Wiki**: O debate principal é se a "compilação" manual de markdown pelo LLM é mais eficaz que a busca vetorial automática sobre documentos brutos.
- **Escalabilidade**: Há dúvidas se um arquivo de índice (`index.md`) consegue gerenciar milhares de fontes sem ferramentas de busca dedicada.

## Materiais e Entidades Relacionados

- **[Andrej Karpathy](../entities/andrej-karpathy.md)**: Proponente do conceito.
- **Obsidian**: A ferramenta de interface recomendada para visualização (Graph View).
- **Memex**: Inspiração histórica de Vannevar Bush.

## Direções Futuras de Pesquisa

- Automação total do pipeline de "linting" para garantir integridade.
- Integração de buscas híbridas (BM25 + Vetorial) integradas à CLI da wiki.
