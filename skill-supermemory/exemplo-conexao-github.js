import Supermemory from "supermemory";

// Exemplo: criar conexão GitHub para sincronizar documentação via Supermemory
async function criarConexaoGithub() {
  const client = new Supermemory({
    apiKey: process.env.SUPERMEMORY_API_KEY
  });

  const connection = await client.connections.create('github', {
    redirectUrl: 'https://yourapp.com/auth/github/callback',
    containerTags: ['user-123', 'github-sync'],
    documentLimit: 5000,
    metadata: {
      source: 'github',
      team: 'engineering'
    }
  });

  // Redireciona usuário para o OAuth do GitHub
  console.log('Redirecione o usuário para:', connection.authLink);
  console.log('Auth expira em (segundos):', connection.expiresIn);
}

criarConexaoGithub();
