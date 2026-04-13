# Security Rules (SecurityGuard)

Regras aplicáveis a qualquer execução de comandos, scripts ou manipulação de banco de dados.

## 🛡️ Protocolo de Defesa Preditiva
- **Bloqueio de Comandos**: Nenhum comando deve ser executado sem antes passar pelo filtro de Regex do `SecurityGuard`.
- **Padrões Proibidos**: Por padrão, expressões como `rm -rf`, `DROP TABLE`, `DELETE FROM` (sem WHERE em produção) e scripts não autorizados são bloqueados.
- **Configuração de Usuário**: Sempre respeite os padrões definidos em `dangerousCommandBlocking.customPatterns` no `config.yaml`.

## ⚙️ Diretrizes de Implementação
- **Sentinela**: O módulo `core/security_guard.py` é o ponto único de verdade para validação de comandos.
- **Logs**: Todas as tentativas de execução de comandos bloqueados devem ser logadas com nível `CRITICAL`.
- **Fail-Safe**: Em caso de dúvida sobre a periculosidade de um comando, a execução deve ser abortada e submetida à aprovação do usuário.
