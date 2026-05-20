import Supermemory from "supermemory";

// Exemplo: consulta de status de processamento de documento
async function exemploStatusDocumento() {
  const client = new Supermemory();
  const docId = "abc123";

  const doc = await client.documents.get(docId);
  console.log("Status do documento:", doc.status); // "queued" | "processing" | "done"
}

exemploStatusDocumento();
