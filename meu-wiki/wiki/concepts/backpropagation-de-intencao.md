---
title: "Conceito: Backpropagation de Intenção"
type: concept
status: experimental
created: 2026-04-22
updated: 2026-04-22
tags: ["agentic-design", "microgpt", "feedback-loops", "autograd", "orchestration"]
source_files:
  - ../sources/2026-04-22_source-karpathy-microgpt.md
related_pages:
  - ../index.md
  - ../log.md
---

# Backpropagation de Intenção

O conceito de **Backpropagation de Intenção** (ou *Intent Backprop*) é uma técnica de orquestração de agentes de IA inspirada no funcionamento dos motores de Autograd (como o do MicroGPT).

## Analogia com Redes Neurais
Em uma rede neural, o erro flui da saída para os pesos para ajustá-los. No **Intent Backprop**, a "falha" de uma tarefa flui do resultado final para as instruções dos agentes antecessores para refiná-las em tempo de execução.

### Mapeamento de Componentes:
- **`.data` (Resultado)**: O output atual da tarefa/skill.
- **`.grad` (Desvio de Intenção)**: A métrica de quão longe o resultado está do objetivo do usuário.
- **`._children` (Grafo de Agentes)**: A sequência de agentes/tools que foram chamados para chegar ao resultado.

## Como Funciona no Antigravity

1. **Forward Pass (Execução)**:
   - O usuário dá uma missão.
   - O orquestrador quebra em sub-tasks e chama os agentes.
   - Cada agente gera um artefato.

2. **Cálculo da "Loss" (Avaliação)**:
   - O sistema (ou um agente crítico) avalia se o artefato atende à intenção original.
   - Se houver discrepância, uma "perda" (loss) é calculada.

3. **Backward Pass (Refinamento)**:
   - O sistema identifica qual elo da cadeia (prompt, ferramenta ou contexto) introduziu o erro.
   - O gradiente de correção é enviado de volta ao agente responsável na forma de um "System Hint" ou "Refinement Prompt".
   - A sub-task é re-executada com o peso (instrução) ajustado.

## Benefícios
- **Auto-correção em Sessão**: Reduz a necessidade de o usuário intervir manualmente para corrigir erros triviais.
- **Aprendizado de Contexto**: O orquestrador "aprende" quais skills são mais eficazes para certos tipos de intenção dentro da mesma conversa.
- **Redução de Alucinação**: Ao forçar um loop de verificação vs. intenção, o sistema se torna mais rigoroso.

## Próximos Passos Experimentais
- Implementar um `eval_skill` que atua como a função de perda (Loss Function).
- Testar a reinjeção de contexto em loops de geração de código complexos.
