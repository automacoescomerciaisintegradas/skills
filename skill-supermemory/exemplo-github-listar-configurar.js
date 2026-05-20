import Supermemory from "supermemory";

// Exemplo: listar repositórios disponíveis para o usuário após conexão GitHub
async function listarRepositorios(connectionId) {
  const client = new Supermemory({
    apiKey: process.env.SUPERMEMORY_API_KEY
  });

  const repositories = await client.connections.github.listRepositories(connectionId, {
    page: 1,
    perPage: 100
  });

  repositories.forEach(repo => {
    console.log(`${repo.full_name} - ${repo.description}`);
    console.log(`Private: ${repo.private}`);
    console.log(`Default branch: ${repo.default_branch}`);
    console.log(`Last updated: ${repo.updated_at}`);
    console.log('---');
  });
}

// Exemplo: configurar seleção de repositórios para sincronização
async function configurarRepositorios(connectionId, reposSelecionados) {
  const client = new Supermemory({
    apiKey: process.env.SUPERMEMORY_API_KEY
  });

  await client.connections.github.configure(connectionId, {
    repositories: reposSelecionados.map(repo => ({
      id: repo.id,
      name: repo.full_name,
      defaultBranch: repo.default_branch
    }))
  });

  console.log('Sincronização dos repositórios iniciada');
}

// Exemplo: monitorar status dos webhooks e sincronização
async function statusWebhooks(connectionId) {
  const client = new Supermemory({
    apiKey: process.env.SUPERMEMORY_API_KEY
  });

  const connection = await client.connections.get(connectionId);
  console.log('Webhooks configurados:', connection.metadata.webhooks?.length);
  console.log('Última sincronização:', connection.metadata.lastSyncedAt);
  console.log('Repositórios:', connection.metadata.repositories);
}

// Integração com frontend: exibir lista de repositórios e permitir seleção
// (Exemplo simplificado para Node.js/CLI, adapte para React/Vue/Next.js conforme necessário)
async function fluxoCompleto(connectionId) {
  // 1. Listar repositórios
  const client = new Supermemory({
    apiKey: process.env.SUPERMEMORY_API_KEY
  });
  const repositories = await client.connections.github.listRepositories(connectionId, { page: 1, perPage: 100 });

  // 2. Simular seleção do usuário (exemplo: selecionar os 2 primeiros)
  const selecionados = repositories.slice(0, 2);

  // 3. Configurar seleção
  await configurarRepositorios(connectionId, selecionados);

  // 4. Monitorar status
  await statusWebhooks(connectionId);
}

// Para rodar: forneça o connectionId válido após autenticação OAuth
// fluxoCompleto('SEU_CONNECTION_ID_AQUI');
