import Supermemory from "supermemory";

// Exemplo: substituição total do conteúdo de um documento
async function exemploReplaceDocumento() {
  const client = new Supermemory();
  const docId = "doc_id_123";
  const novoConteudo = "Completely new content replacing everything";
  const metadata = { version: 2 };

  const resultado = await client.documents.update(docId, {
    content: novoConteudo,
    metadata
  });

  console.log("Documento atualizado:", resultado);
}

exemploReplaceDocumento();
