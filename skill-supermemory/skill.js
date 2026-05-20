/**
 * @typedef {Object} ProfileResponse
 * @property {{ static: string[], dynamic: string[] }} profile - Perfil do usuário (fatos e contexto).
 * @property {{ results: any[], total: number, timing: number }} [searchResults] - Resultados de busca (se q fornecido).
 */
/**
 * Injeta perfil do usuário no prompt do sistema para LLMs.
 * @param {string} userId - Identificador do usuário/container.
 * @param {string} message - Mensagem do usuário.
 * @param {object} llm - Instância do LLM com método chat({ messages }).
 * @param {object} [clientInstance] - Instância opcional do Supermemory.
 * @returns {Promise<any>} Resposta do LLM.
 */
export async function chatWithProfile(userId, message, llm, clientInstance) {
  const SupermemoryLib = clientInstance ? null : (await import("supermemory")).default;
  const client = clientInstance || new SupermemoryLib();
  const { profile } = await client.profile({ containerTag: userId });

  const systemPrompt = `You are assisting a user.\n\nABOUT THE USER:\n${Array.isArray(profile.static) ? profile.static.join('\n') : (profile.static || 'No profile yet.')}\n\nCURRENT CONTEXT:\n${Array.isArray(profile.dynamic) ? profile.dynamic.join('\n') : (profile.dynamic || 'No recent activity.')}\n\nPersonalize responses to their expertise and preferences.`;

  return llm.chat({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });
}
/**
 * Busca perfil do usuário e resultados de busca juntos (profile + searchResults).
 * @param {string} containerTag - Tag do usuário/container.
 * @param {string} [query] - Consulta opcional para buscar memórias relacionadas.
 * @param {object} [clientInstance] - Instância opcional do Supermemory.
 * @returns {Promise<{facts: any, context: any, memories: any[]}>} Perfil e memórias.
 */
export async function getProfileWithQuery(containerTag, query, clientInstance) {
  const SupermemoryLib = clientInstance ? null : (await import("supermemory")).default;
  const client = clientInstance || new SupermemoryLib();
  const result = await client.profile({
    containerTag,
    ...(query ? { q: query } : {})
  });
  const { static: facts, dynamic: context } = result.profile;
  const memories = result.searchResults?.results || [];
  return { facts, context, memories };
}
/**
 * Busca o perfil do usuário no Supermemory (fatos de longo prazo e contexto recente).
 * @param {string} containerTag - Tag do usuário/container.
 * @param {object} [clientInstance] - Instância opcional do Supermemory.
 * @returns {Promise<{static: any, dynamic: any}>} Perfil do usuário.
 */
export async function getProfile(containerTag, clientInstance) {
  const SupermemoryLib = clientInstance ? null : (await import("supermemory")).default;
  const client = clientInstance || new SupermemoryLib();
  const { profile } = await client.profile({ containerTag });
  return profile;
}
/**
 * Busca contexto ideal para IA conversacional.
 * @param {string} userId - Identificador do usuário/container.
 * @param {string} message - Mensagem do usuário.
 * @param {object} [clientInstance] - Instância opcional do Supermemory.
 * @returns {Promise<string>} Contexto formatado.
 */
export async function getContext(userId, message, clientInstance) {
  const SupermemoryLib = clientInstance ? null : (await import("supermemory")).default;
  const client = clientInstance || new SupermemoryLib();
  const results = await client.search.memories({
    q: message,
    containerTag: userId,
    searchMode: "hybrid",
    threshold: 0.6,
    limit: 5
  });
  return results.results
    .map(r => r.memory || r.chunk)
    .join('\n\n');
}
/**
 * Busca híbrida: memórias + chunks de documentos.
 * @param {string} query - Consulta do usuário.
 * @param {string} containerTag - Tag do container.
 * @returns {Promise<any>} Resultado da busca.
 */
export async function searchHybrid(query, containerTag) {
  const Supermemory = (await import("supermemory")).default;
  const client = new Supermemory();
  return client.search.memories({
    q: query,
    containerTag,
    searchMode: "hybrid"
  });
}

/**
 * Busca apenas memórias (fatos extraídos).
 * @param {string} query - Consulta do usuário.
 * @param {string} containerTag - Tag do container.
 * @returns {Promise<any>} Resultado da busca.
 */
export async function searchMemoriesOnly(query, containerTag) {
  const Supermemory = (await import("supermemory")).default;
  const client = new Supermemory();
  return client.search.memories({
    q: query,
    containerTag,
    searchMode: "memories"
  });
}
/**
 * Formata resultados do Supermemory para exibição amigável.
 * @param {object} response - Resposta do Supermemory (com array results).
 * @returns {string} Texto formatado.
 */
export function formatSupermemoryResults(response) {
  return response.results.map(item => {
    if (item.memory) {
      return `Memória: ${item.memory}\nSimilaridade: ${item.similarity}\nTópico: ${item.metadata?.topic || "-"}\nAtualizado em: ${item.updatedAt}`;
    }
    if (item.chunk) {
      return `Chunk: ${item.chunk}\nSimilaridade: ${item.similarity}\nFonte: ${item.metadata?.source || "-"}\nAtualizado em: ${item.updatedAt}`;
    }
    return JSON.stringify(item);
  }).join('\n\n');
}
import Supermemory from "supermemory";

/**
 * Skill Supermemory: busca e organiza memórias contextuais.
 * @param {string} userMessage - Mensagem ou consulta do usuário.
 * @param {string} containerTag - Tag do container Supermemory.
 * @returns {Promise<any>} Contexto formatado das memórias.
 */
export async function searchSupermemory(userMessage, containerTag) {
  const client = new Supermemory();

  // Busca perfil (opcional, pode ser usado para personalização)
  const { profile } = await client.profile({ containerTag });

  // Busca memórias
  const { results } = await client.search.memories({
    q: userMessage,
    containerTag,
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

  // Formata o contexto conforme necessidade
  return formatMemories(results);
}

// Função utilitária para formatar as memórias (implemente conforme seu caso)
function formatMemories(results) {
  // Exemplo simples: retorna só os textos das memórias
  return results.map(mem => mem.text || mem.summary || "");
}

/**
 * Upload em lote de documentos para o Supermemory.
 * @param {Array<{id: string, content: string}>} documents - Lista de documentos para upload.
 * @param {object} [clientInstance] - Instância opcional do Supermemory (para reuso em testes).
 * @returns {Promise<Array<{id: string, success: boolean, docId?: string, error?: any}>>}
 */
export async function batchUpload(documents, clientInstance) {
  const SupermemoryLib = clientInstance ? null : (await import("supermemory")).default;
  const client = clientInstance || new SupermemoryLib();
  const results = [];

  for (const doc of documents) {
    try {
      const result = await client.add({
        content: doc.content,
        customId: doc.id,
        containerTag: "batch_import"
      });
      results.push({ id: doc.id, success: true, docId: result.id });
    } catch (error) {
      results.push({ id: doc.id, success: false, error });
    }
    // Rate limit: 1 segundo entre requests
    await new Promise(r => setTimeout(r, 1000));
  }
  return results;
}
