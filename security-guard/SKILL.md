name: Security Guard
slug: security-guard
version: 2.0.0
owner: Automações Comerciais Integradas
description: Protocolo de Defesa Preditiva para bloquear ações destrutivas, reduzir risco operacional e padronizar resposta a incidentes.
language: pt-BR

commands:
  - command: /check-safety
    description: Analisa um comando, script ou plano de execução e classifica o risco antes da execução.
    parameters:
      - name: input
        type: string
        description: Comando shell, trecho de script, SQL ou plano operacional.
      - name: context
        type: string
        required: false
        description: Contexto opcional (ambiente, branch, pasta alvo, objetivo).

  - command: /add-safety-pattern
    description: Adiciona padrão de bloqueio customizado por regex para a sua operação.
    parameters:
      - name: pattern
        type: string
        description: Regex a ser bloqueada.
      - name: reason
        type: string
        required: false
        description: Motivo do bloqueio.

  - command: /defense-protocol
    description: Executa checklist completo de defesa preditiva para tarefas críticas.
    parameters:
      - name: task
        type: string
        description: Tarefa crítica (deploy, migração, limpeza, rollback, etc.).

# Security Guard - Protocolo de Defesa Preditiva

## Missão
Evitar perda de dados, interrupções e ações irreversíveis por erro humano, automação inadequada ou comando malicioso.

## Princípios
1. Segurança antes da velocidade.
2. Operações irreversíveis exigem dupla validação.
3. Menor privilégio por padrão.
4. Tudo que for crítico deve ser auditável.
5. Falha segura: na dúvida, bloquear e pedir confirmação explícita.

## Classificação de Risco
- `LOW`: leitura, inspeção, lint, testes sem escrita destrutiva.
- `MEDIUM`: escrita reversível (edição de código, build local, ajustes de config).
- `HIGH`: alterações de infraestrutura, banco, permissões, deploy de produção.
- `CRITICAL`: deleção recursiva, reset/force push, truncates/drops, segredos expostos.

## Regras de Bloqueio Obrigatórias
Bloquear automaticamente quando detectar:
- Remoção recursiva perigosa (`rm -rf /`, curingas amplos, raiz de projeto sem escopo).
- SQL destrutivo sem filtro/backup (`DROP`, `TRUNCATE`, `DELETE` sem `WHERE`).
- Git destrutivo sem aprovação (`reset --hard`, `push --force` em branch protegida).
- Exposição de credenciais em texto puro (tokens, chaves, secrets).
- Execução de script não homologado em ambiente sensível.

## Checklist de Execução Segura
1. Identificar ambiente alvo (`dev`, `staging`, `prod`).
2. Confirmar branch e diretório corretos.
3. Validar escopo da operação (arquivos/tabelas/serviços afetados).
4. Definir plano de rollback.
5. Garantir backup/snapshot quando aplicável.
6. Executar com menor privilégio possível.
7. Registrar evidências (logs, saída, hash/commit).
8. Verificar resultado pós-execução.

## Protocolo para Missão Crítica
Quando a tarefa for `HIGH` ou `CRITICAL`:
- Exigir confirmação explícita do operador.
- Exibir impacto potencial em linguagem objetiva.
- Sugerir alternativa segura (dry-run, branch temporária, ambiente isolado).
- Executar em etapas pequenas e verificáveis.

## Exemplos de Uso
```text
/check-safety input="git reset --hard"
/check-safety input="DELETE FROM payments" context="prod"
/add-safety-pattern pattern="^terraform destroy" reason="Bloquear destruição acidental"
/defense-protocol task="deploy em produção"
```

## Configuração Recomendada (config.yaml)
```yaml
securityGuard:
  enabled: true
  blockOnHighRisk: false
  blockOnCriticalRisk: true
  requireExplicitConfirmation:
    high: true
    critical: true
  scanSecrets:
    enabled: true
  dangerousCommandBlocking:
    enabled: true
    customPatterns:
      - "^rm\\s+-rf\\s+/"
      - "DROP\\s+TABLE"
      - "TRUNCATE\\s+TABLE"
      - "git\\s+reset\\s+--hard"
      - "git\\s+push\\s+--force"
```

## Resultado Esperado
- Menos incidentes por comando destrutivo.
- Mais previsibilidade em deploy e manutenção.
- Operação auditável, segura e replicável.