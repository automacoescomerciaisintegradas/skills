import { searchSupermemory } from "./skill.js";

// Exemplo de uso da skill Supermemory
async function exemploUso() {
  const userMessage = "Qual foi minha última preferência alimentar?";
  const containerTag = "meu-container";

  const context = await searchSupermemory(userMessage, containerTag);
  console.log(context);
}

exemploUso();
