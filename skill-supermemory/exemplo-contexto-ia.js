import { getContext } from "./skill.js";

// Exemplo de uso da configuração ideal para IA conversacional
async function exemploContextoConversacional() {
  const userId = "user_123";
  const message = "Quais são minhas preferências de produto?";

  const contexto = await getContext(userId, message);
  console.log("Contexto retornado:\n", contexto);
}

exemploContextoConversacional();
