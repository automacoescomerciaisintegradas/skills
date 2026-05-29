name: GSD Codex Adapter
slug: gsd-codex-adapter
version: 1.0.0
owner: Automações Comerciais Integradas
description: Conjunto de agentes GSD em TOML para setup Codex, convertido de projetos Claude.
language: pt-BR

commands:
  - command: /gsd-codex-bootstrap
    description: Cria estrutura inicial de adapter Codex para projetos com origem Claude.
    parameters:
      - name: project_root
        type: string
        required: false
        description: Caminho raiz do projeto alvo.

  - command: /gsd-codex-sync-agents
    description: Sincroniza agentes GSD de .claude/agents para .codex/agents em formato TOML.
    parameters:
      - name: source_dir
        type: string
        required: false
        description: Pasta de origem dos agentes Claude.
      - name: target_dir
        type: string
        required: false
        description: Pasta de destino dos agentes Codex.

# GSD Codex Adapter

## Objetivo
Fornecer adaptadores de agentes GSD para o ecossistema Codex com instruções preservadas em `developer_instructions`.

## Conteúdo
- `agents/*.toml` com 11 agentes GSD convertidos.
- Mapeamento preservado do `source_md` para rastreabilidade.

## Política de uso
1. Manter conhecimento do projeto em `docs/`, `references/` e `templates/`.
2. Tratar `AGENTS.md` como adapter Codex do repositório.
3. Não incluir segredos em TOML ou instruções.

## Agentes incluídos
- gsd-codebase-mapper
- gsd-debugger
- gsd-executor
- gsd-integration-checker
- gsd-phase-researcher
- gsd-plan-checker
- gsd-planner
- gsd-project-researcher
- gsd-research-synthesizer
- gsd-roadmapper
- gsd-verifier
