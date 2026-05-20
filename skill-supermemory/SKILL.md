# Skill: Supermemory

## Descrição

Skill de memória inteligente baseada no Supermemory.ai. Permite buscar, inferir e organizar memórias contextuais a partir de textos, arquivos e chats, utilizando o SDK oficial.

## Funcionalidades

- Busca híbrida e semântica de memórias.
- Indexação automática de textos, arquivos e chats.
- Suporte a perfis, containers e filtros avançados.
- Retorno de memórias relacionadas, documentos, chunks, resumos e memórias esquecidas.

## Como usar

1. Configure o containerTag do seu projeto Supermemory.
2. Use os métodos `profile` e `search.memories` para buscar e organizar memórias.
3. Adapte o formato de retorno conforme a necessidade do seu agente ou aplicação.

## Exemplo de uso

```js
import Supermemory from "supermemory";
const client = new Supermemory();

const { profile } = await client.profile({
  containerTag: "<container-tag>",
});

const { results } = await client.search.memories({
  q: userMessage,
  containerTag: "<container-tag>",
  searchMode: "hybrid",
  limit: 10,
  threshold: 0.4,
  rerank: true,
  rewriteQuery: true,
  aggregate: true,
  include: {
    relatedMemories: true,
    documents: true,
    chunks: true,
    summaries: true,
    forgottenMemories: true,
  },
});

const context = formatMemories(results);
```

## Referências

- [Documentação oficial Supermemory](https://supermemory.ai/docs/intro)
- [Repositório de skills](https://github.com/automacoescomerciaisintegradas/skills)
