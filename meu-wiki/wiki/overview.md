---
title: "Visão Geral: Pesquisa sobre Padrão LLM Wiki"
type: maintenance
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["overview"]
source_files: []
related_pages:
  - ./index.md
  - ./open-questions.md
---

# Visão Geral: Pesquisa sobre Padrão LLM Wiki

Esta wiki investiga a implementação, eficácia e escalabilidade do **Padrão LLM Wiki** para gerenciamento de conhecimento pessoal e corporativo.

## Tema

Implementação de bases de conhecimento persistentes e interconectadas em Markdown, mantidas de forma autônoma por agentes de IA, como uma alternativa às arquiteturas RAG tradicionais.

## Propósito

Documentar as melhores práticas, desafios técnicos e benefícios do acúmulo de conhecimento estruturado via LLMs em comparação com a recuperação simples de documentos brutos.

## Escopo

- Arquitetura de camadas (Raw/Wiki/Schema).
- Fluxos de trabalho de ingestão, consulta e manutenção (linting).
- Ferramentas de suporte (Obsidian, CLI tools, MCP nodes).
- Estudos de caso de uso pessoal e organizacional.

## Fora do Escopo

- Implementação detalhada de modelos de linguagem específicos (ex. treinamento de pesos).
- Armazenamento em bancos de dados SQL/NoSQL tradicionais (foco em Markdown).

## Hipóteses Atuais

- Bases de conhecimento persistentes facilitam a descoberta de conexões entre documentos que o RAG puro ignora.
- O custo de manutenção das referências cruzadas é reduzido a quase zero quando delegado ao LLM.
- A "compilação" do conhecimento em Markdown torna a base de conhecimento agnóstica de plataforma e fácil de versionar.

## Perspectivas a Explorar

- **Ponto de Inflexão**: Identificar quando uma wiki markdown cresce demais e exige busca vetorial híbrida.
- **Conflitos de Verdade**: Como o sistema lida com informações contraditórias vindas de múltiplas fontes.

## Tipos de Material Preferidos

- Gists técnicos e artigos de arquitetura de IA.
- Documentação de ferramentas de visualização de grafos (Obsidian).
- Relatórios de benchmarks de modelos de raciocínio.

## Entregáveis Almejados

- Uma wiki estruturada servindo como demonstração do padrão.
- Um conjunto de regras de operação (Esquema) refinado no `CLAUDE.md`.

## Páginas Relacionadas

- [index.md](./index.md): Índice completo da wiki
- [open-questions.md](./open-questions.md): Lista de questões não resolvidas
- [Conceito: Padrão LLM Wiki](./concepts/llm-wiki-pattern.md)

