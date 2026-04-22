---
title: "RAG e Bancos de Dados Vetoriais"
type: concept
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["concept", "rag", "vector-db", "retrieval"]
source_files:
  - raw/sources/generative-ai-for-beginners
related_pages:
  - ../sources/2026-04-19_source-ms-ai-beginners.md
---

# RAG e Bancos de Dados Vetoriais

## Definição

**RAG (Retrieval-Augmented Generation)** é uma arquitetura que otimiza a saída de um LLM recuperando informações de uma base de conhecimento externa antes de gerar a resposta. **Bancos de Dados Vetoriais** são o motor dessa arquitetura, armazenando informações como "embeddings" (vetores numéricos) para permitir busca por similaridade semântica.

## Compreensão Atual

- **Solução ao Alucinamento**: O RAG reduz drasticamente as alucinações ao forçar o modelo a se basear em fontes citadas.
- **Eficiência de Custo**: É mais barato e escalável do que fazer fine-tuning de modelos para conhecimento privado.
- **Pipeline**: O fluxo típico envolve Fragmentação (Chunking) -> Embeddings -> Armazenamento Vetorial -> Recuperação -> Geração.

## Visões Concorrentes e Debates

- **Busca Vetorial vs. Busca Híbrida**: O uso exclusivo de vetores versus a combinação com busca por palavras-chave (BM25) para maior precisão em termos técnicos.
- **Context Window Expansion**: Se janelas de contexto gigantescas (como 1M+ tokens do Gemini) tornarão o RAG obsoleto (debate atual).

## Materiais e Entidades Relacionados

- **Fontes**: Microsoft GenAI Lesson 15.
- **Tecnologias**: Pinecone, ChromaDB, Weaviate, pgvector.

## Direções Futuras de Pesquisa

- **GraphRAG**: Uso de grafos de conhecimento para melhorar a recuperação em tópicos altamente interconectados.
- **RAG Local**: Execução de pipelines de RAG inteiramente locais para privacidade total de dados.
