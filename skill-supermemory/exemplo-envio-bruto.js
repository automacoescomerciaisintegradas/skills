import { batchUpload } from "./skill.js";

// Exemplo: envio de conteúdos brutos para a Supermemory
async function exemploEnvioConteudoBruto() {
  const documentos = [
    { id: "doc1", content: "Esta é uma conversa importante sobre onboarding de clientes." },
    { id: "doc2", content: "https://meusite.com/manual.pdf" },
    { id: "doc3", content: "Arquivo: relatório de vendas Q1.docx" },
    { id: "doc4", content: "Usuário relatou erro 500 ao acessar o checkout." }
  ];

  const resultados = await batchUpload(documentos);
  console.log("Resultados do envio:", resultados);
}

exemploEnvioConteudoBruto();
