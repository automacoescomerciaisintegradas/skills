---
title: "Agentes de IA"
type: concept
status: active
created: 2026-04-19
updated: 2026-04-19
tags: ["concept", "ai-agents", "autonomy", "vibe-coding"]
source_files:
  - raw/sources/generative-ai-for-beginners
related_pages:
  - ../sources/2026-04-19_source-ms-ai-beginners.md
  - ../concepts/prompt-engineering.md
---

# Agentes de IA

## Definição

Agentes de IA são sistemas de software que utilizam Modelos de Linguagem de Larga Escala (LLMs) como seu "cérebro" para realizar tarefas de forma autônoma, utilizando ferramentas, acessando bases de conhecimento e mantendo memória de longo prazo para alcançar objetivos complexos.

## Compreensão Atual

- **Loop de Raciocínio (ReAct)**: O agente observa o ambiente, pensa sobre a próxima ação, executa uma ferramenta e observa o resultado, repetindo o ciclo até concluir o objetivo.
- **Uso de Ferramentas (Tool Use)**: A habilidade de chamar APIs, executar scripts ou consultar bancos de dados de forma dinâmica através de definições de funções (function calling).
- **Memória e Contexto**: Uso de memória de trabalho (context window) e memória de longo prazo (RAG/Bancos Vetoriais) para manter a continuidade das tarefas.
- **Fluxos Agenticos (Agentic Workflows)**: Em vez de uma única chamada de prompt, o sistema executa múltiplos passos:
    1. **Planejamento**: Decompor uma tarefa complexa em subtarefas menores.
    2. **Execução**: Realizar as subtarefas usando ferramentas.
    3. **Reflexão/Crítica**: O modelo revisa seu próprio trabalho antes de finalizar.

## Visões Concorrentes e Debates

- **Agentes Autônomos vs. Assistentes**: O debate sobre se a IA deve agir sozinha (Agent) ou apenas sugerir ações para um humano (Copilot/Human-in-the-loop).
- **Vibe Coding em Agentes**: A filosofia de "vibe coding" aplicada a agentes sugere que o agente deve entender o "espírito" do projeto (a intenção do desenvolvedor) e tomar decisões baseadas na intenção, e não apenas em regras rígidas de IF/ELSE.
- **Software 3.0 (Karpathy)**: A ideia de que o código não é mais apenas escrito linha por linha por humanos, mas sim "curado" e "escolhido" através de otimização de pesos (Software 2.0) e agora orquestrado por agentes que escrevem e executam seu próprio código (Software 3.0).

## Materiais e Entidades Relacionados

- **Fontes**: Microsoft GenAI Lesson 17, Karpathy's "Intro to Large Language Models".
- **Frameworks**: LangChain, CrewAI, AutoGPT, Microsoft Semantic Kernel.
- **Filosofia**: Andrej Karpathy (Large Language Models as an Operating System).

## Direções Futuras de Pesquisa

- **Multi-Agent Systems (MAS)**: Enxames de agentes especializados (Ex: um copywriter, um gestor de tráfego, um analista de dados) colaborando.
- **Auto-Melhoria**: Agentes que podem modificar seu próprio código ou prompts para se tornarem mais eficientes em tarefas específicas.
- **Agentes Locais**: Execução de agentes potentes em hardware local usando técnicas de quantização e modelos otimizados.

