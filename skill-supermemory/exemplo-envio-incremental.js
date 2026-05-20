import Supermemory from "supermemory";

// Exemplo: envio incremental de conversa (Supermemory detecta apenas o novo)
async function exemploEnvioIncremental() {
  const client = new Supermemory();
  const conversa = [
    "user: Hi, I'm Sarah.",
    "assistant: Nice to meet you!",
    "user: What's the weather?",
    "assistant: It's sunny today."
  ].join("\n");

  const resultado = await client.add({
    content: conversa,
    customId: "conv_123",
    containerTag: "user_sarah"
  });

  console.log("Resultado do envio incremental:", resultado);
}

exemploEnvioIncremental();
