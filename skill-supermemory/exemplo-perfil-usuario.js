import { getProfile } from "./skill.js";

// Exemplo de uso da função getProfile para buscar perfil do usuário
async function exemploPerfilUsuario() {
  const containerTag = "user_123";
  const profile = await getProfile(containerTag);

  console.log("Fatos de longo prazo:", profile.static);
  console.log("Contexto recente:", profile.dynamic);
}

exemploPerfilUsuario();
