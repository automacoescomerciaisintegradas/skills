# 🌌 Antigravity Skills

**Antigravity Skills** é um repositório e CLI instalador do GitHub para playbooks reutilizáveis. Em vez de coletar prompts aleatórios, você recebe uma biblioteca de habilidades pesquisável e instalável para planejamento, programação, depuração, testes, revisão de segurança, trabalho de infraestrutura, fluxos de trabalho de produtos e tarefas de crescimento entre os principais assistentes de programação através de arquivos `SKILL.md`.

---

## 🚀 O que é uma Skill?

Uma **Skill** é um conjunto estruturado de instruções, ferramentas e contexto que transforma seu assistente de IA (Claude, Gemini, Cursor) em um especialista instantâneo em uma tecnologia ou fluxo de trabalho específico.

- **Pesquisável**: Use o `skills_index.json` ou `skills_index.txt` para encontrar a ferramenta certa.
- **Instalável**: Ative bundles de habilidades usando nossos scripts de automação.
- **Eficiente**: Economize tokens carregando apenas o contexto necessário via `load_skill()`.

## 📁 Estrutura do Repositório

- `skills/`: Biblioteca com **1.291+** habilidades prontas para uso.
- `tools/scripts/`: Utilitários para indexação, auto-categorização e gerenciamento.
- `skills_index.json`: Catálogo completo em formato de dados.
- `skills_index.txt`: Lista legível para consulta rápida do agente.

## ⚙️ Como Usar
Para usar essas skills em **qualquer projeto no seu PC**, siga o nosso [Guia de Uso Global](docs/GLOBAL_USAGE.md).

1. **Instalação Local**:
   Execute `tools/activate_skills.bat` para configurar seu ambiente.

2. **Integração no Agente**:
   O agente deve sempre consultar o índice e executar `load_skill("nome_da_skill")` antes de responder.

## 📖 Documentação de Integração

- [Guia Jetski/Cortex + Gemini](docs/integrations/jetski-cortex-gemini.md): Como evitar context overflow usando lazy loading com 1.200+ skills.
- [Exemplo de Implementação TS](docs/integrations/jetski-gemini-loader/): Código TypeScript para carregar skills on-demand.

## 🏛️ Arquitetura do Sistema

- [Agent Flow Architecture](docs/architecture/agent-flow.md): Blueprint de fluxos de trabalho, classificação de pedidos e orquestração de agentes.

## 🛠️ Ferramentas UI/UX Pro Max

- **Global Skill Search**: Ferramenta CLI para encontrar qualquer uma das 1.291 skills por palavra-chave.
  - Exemplo: `python tools/scripts/skill_search.py "segurança owasp"`

- **UI/UX Query Engine**: Localizado em `tools/scripts/ui_ux_query.py`.
  - Use para buscar inspirações de design, paletas de cores e boas práticas por stack.
  - Exemplo: `python tools/scripts/ui_ux_query.py "fintech dark mode"`

---
...

### 🛡️ Automações Comerciais Integradas! 2026 ⚙️
**Desenvolvido para Máxima Performance e Economia de Tokens.**

📧 Contato: [contato@automacoescomerciais.com.br](mailto:contato@automacoescomerciais.com.br)
🌐 [github.com/automacoescomerciaisintegradas/skills](https://github.com/automacoescomerciaisintegradas/skills)

*© 2026 Automações Comerciais Integradas. Todos os direitos reservados.*
