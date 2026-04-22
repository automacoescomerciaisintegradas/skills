---
title: "MicroGPT: A 200-line GPT Implementation (Karpathy)"
type: source
status: active
created: 2026-04-22
updated: 2026-04-22
tags: ["karpathy", "microgpt", "llm-essentials", "python", "neural-networks"]
source_files: ["https://karpathy.github.io/2026/02/12/microgpt/"]
related_pages:
  - ../index.md
  - ../log.md
  - ../entities/andrej-karpathy.md
---

# Fonte: MicroGPT - Andrej Karpathy

Guia resumido sobre o projeto "MicroGPT", uma implementação de GPT em arquivo único de 200 linhas de Python puro.

## O que é o MicroGPT?
Um projeto de "arte técnica" que destila um LLM aos seus componentes fundamentais, sem dependências externas (como PyTorch ou NumPy).

### Componentes Incluídos (em 200 linhas):
- **Dataset**: Exemplo com 32.000 nomes.
- **Tokenizer**: Mapeamento simples de caracteres para IDs inteiros.
- **Autograd Engine**: Implementação da classe `Value` para backpropagation.
- **Arquitetura GPT**: Estilo GPT-2 com RMSNorm e ReLU.
- **Otimizador**: Adam implementado do zero.
- **Loops**: Treinamento e inferência (geração).

## Pontos Filosóficos
- **Simplicidade Barebones**: O projeto é a culminação de esforços anteriores (micrograd, nanogpt) para simplificar o entendimento de LLMs.
- **Educação**: Serve como o "Lego" fundamental para quem quer entender como a matemática se transforma em "alucinação" (geração de texto).
- **Sem Magia**: Karpathy reforça que o modelo é apenas uma função matemática ajustada por um otimizador para capturar regularidades estatísticas.

## Diferenças para LLMs de Produção
- **Escala**: MicroGPT tem ~4.000 parâmetros; GPT-4 tem centenas de bilhões.
- **Eficiência**: MicroGPT processa escalares em Python puro (lento); produção usa tensores em GPUs (rápido).
- **Dados**: Nomes vs. trilhões de tokens da internet.
- **Pós-treinamento**: MicroGPT é um completador de documentos; modelos como ChatGPT passam por SFT e RLHF para se tornarem assistentes.

## Recursos
- **Gist**: [microgpt.py](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95)
- **Store**: [karpathy.art](https://karpathy.art) (Triptych do código).
