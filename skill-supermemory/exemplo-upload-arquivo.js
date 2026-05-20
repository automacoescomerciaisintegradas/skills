import fs from "fs";
import Supermemory from "supermemory";

// Exemplo: upload de arquivo PDF para a Supermemory
async function exemploUploadArquivo() {
  const client = new Supermemory();
  const fileStream = fs.createReadStream("document.pdf");

  const resultado = await client.documents.uploadFile({
    file: fileStream,
    containerTags: "user_123"
  });

  console.log("Resultado do upload:", resultado);
}

exemploUploadArquivo();
