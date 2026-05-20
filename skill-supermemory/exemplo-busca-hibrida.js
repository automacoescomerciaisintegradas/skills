import { searchHybrid, searchMemoriesOnly } from "./skill.js";

// Exemplo: Busca híbrida (memórias + chunks de documentos)
async function exemploBuscaHibrida() {
  const query = "erros de deploy";
  const containerTag = "user_123";
  const resultado = await searchHybrid(query, containerTag);
  console.log("Resultado busca híbrida:", resultado);
}

// Exemplo: Busca apenas memórias (fatos extraídos)
async function exemploBuscaMemorias() {
  const query = "preferências do usuário";
  const containerTag = "user_123";
  const resultado = await searchMemoriesOnly(query, containerTag);
  console.log("Resultado busca só memórias:", resultado);
}

// Chame as funções de exemplo conforme necessário	exemploBuscaHibrida();	exemploBuscaMemorias();
