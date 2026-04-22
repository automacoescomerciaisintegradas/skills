---
title: "Padrão LLM Wiki de Andrej Karpathy"
type: source
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["llm-wiki", "knowledge-management", "rag", "karpathy"]
source_files:
  - raw/sources/2026-04-19_source-karpathy-llm-wiki-gist.md
related_pages:
  - ../concepts/llm-wiki-pattern.md
  - ../entities/andrej-karpathy.md
  - ../overview.md
---

# Padrão LLM Wiki de Andrej Karpathy

## Resumo

Este documento descreve uma proposta de Andrej Karpathy para substituir ou complementar sistemas RAG tradicionais por uma base de conhecimento persistente gerenciada por LLMs. O "LLM Wiki" é uma coleção estruturada de arquivos Markdown onde o agente AI atua como o principal mantenedor, destilando informações de fontes brutas em sínteses cross-referenciadas que se acumulam ao longo do tempo.

## Pontos-Chave

- **Persistência sobre Recuperação**: O conhecimento é compilado uma vez e mantido atualizado, em vez de ser re-descoberto a cada consulta.
- **Camadas de Estrutura**: Fontes brutas (imutáveis), Wiki (gerenciada por LLM) e Esquema (regras de operação).
- **IA como Bibliotecário**: O LLM realiza o trabalho pesado de resumo, referenciamento cruzado e manutenção, enquanto humanos curam as fontes.

## Afirmações/Observações Principais

- **Limitações do RAG**: RAGs tradicionais forçam o LLM a "redescobrir o conhecimento do zero" a cada nova pergunta.
- **Wiki como Código**: A Wiki deve ser tratada como uma base de código onde Obsidian é a IDE, o LLM é o programador e a Wiki é o sistema resultante.
- **Compounding Artifact**: A utilidade da base de conhecimento cresce exponencialmente à medida que novas fontes são integradas.

## Notas de Evidência

- Referência ao Gist original de Karpathy datado de abril de 2026.
- Termos específicos como "compounding artifact" e analogia com o Memex de Vannevar Bush (1945).

## Impacto na Wiki Existente

- **Visão Geral**: Define a estrutura fundamental deste repositório `wiki-kit`.
- **Conceitos**: Introduz o conceito de "LLM-managed Wiki".
- **Entidades**: Identifica Andrej Karpathy como o proponente original.

## Questões Não Resolvidas

- Escalabilidade para volumes massivos de dados (Karpathy admite que o índice simples funciona para escala moderada).
- Necessidade de ferramentas CLI adicionais para busca conforme a wiki cresce.

## Páginas Relacionadas

- [Conceito: Padrão LLM Wiki](../concepts/llm-wiki-pattern.md)
- [Entidade: Andrej Karpathy](../entities/andrej-karpathy.md)
- [Visão Geral](../overview.md)
