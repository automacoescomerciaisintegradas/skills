name: Claude Code System Prompts Mirror
slug: claude-code-system-prompts
version: 1.0.0
owner: Automações Comerciais Integradas
description: Espelho versionado dos prompts de sistema do Claude Code (upstream Piebald-AI), com foco em consulta, estudo e adaptação para engenharia de agentes.
language: pt-BR

commands:
  - command: /prompts-index
    description: Lista categorias e principais arquivos do espelho local de prompts.
    parameters:
      - name: categoria
        type: string
        required: false
        description: Filtra por categoria (agent-prompt, data, system-prompt, system-reminder, tool-description, skill).

  - command: /prompt-open
    description: Abre um prompt específico pelo nome de arquivo para análise e adaptação.
    parameters:
      - name: arquivo
        type: string
        description: Nome do arquivo dentro de upstream/system-prompts.

# Claude Code System Prompts Mirror

## Objetivo
Disponibilizar no seu repositório de skills um espelho rastreável do conteúdo de `Piebald-AI/claude-code-system-prompts` para uso operacional em:
- análise de arquitetura de prompts,
- engenharia reversa de comportamento de agentes,
- criação de variações internas compatíveis com seus fluxos.

## Conteúdo incluído
- `upstream/system-prompts/*.md` (snapshot completo)
- `upstream/README.md`
- `upstream/CHANGELOG.md`
- `upstream/CLAUDE.md`
- `upstream/LICENSE` (MIT)

## Regras de uso
1. Tratar `upstream/` como fonte espelhada (não autoria local).
2. Preservar licença e atribuição do upstream em redistribuições.
3. Criar adaptações em arquivos separados para evitar perda de rastreabilidade.

## Navegação rápida
- Prompts de agentes: `upstream/system-prompts/agent-prompt-*.md`
- Dados embutidos: `upstream/system-prompts/data-*.md`
- Prompt principal do sistema: `upstream/system-prompts/system-prompt-*.md`
- Lembretes de sistema: `upstream/system-prompts/system-reminder-*.md`
- Descrições de ferramentas: `upstream/system-prompts/tool-description-*.md`
- Skills embutidas: `upstream/system-prompts/skill-*.md`
