import express from "express";
import { searchHybrid, searchMemoriesOnly } from "./skill.js";

const app = express();
app.use(express.json());

// Endpoint REST: busca híbrida
app.post("/api/busca-hibrida", async (req, res) => {
  const { userId, query } = req.body;
  try {
    const resultado = await searchHybrid(query, userId);
    res.json({ success: true, resultado });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Endpoint REST: busca só memórias
app.post("/api/busca-memorias", async (req, res) => {
  const { userId, query } = req.body;
  try {
    const resultado = await searchMemoriesOnly(query, userId);
    res.json({ success: true, resultado });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log("API de busca Supermemory rodando na porta 3000");
});
