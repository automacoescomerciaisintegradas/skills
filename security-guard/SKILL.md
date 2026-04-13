nome: Security Guard
descricao: Módulo sentinela para proteção contra comandos destrutivos e blindagem de segurança de missão crítica.
autor: Antigravity
comandos:

comando: /check-safety
descricao: Valida um comando contra a lista negra de padrões perigosos.
parametros:
  - nome: command
    tipo: string
    descricao: O comando a ser validado.

comando: /add-safety-pattern
descricao: Adiciona um novo padrão de Regex à lista de bloqueio dinâmico.
parametros:
  - nome: pattern
    tipo: string
    descricao: Regex do padrão perigoso.

# Security Guard: Protocolo Missão Crítica

O `SecurityGuard` atua como uma barreira proativa para evitar desastres operacionais acidentais ou maliciosos.

## 🛡️ Defesas Ativas
- **SQL Injection**: Bloqueio de `DROP`, `TRUNCATE` e `DELETE` desprotegidos.
- **File System**: Blindagem contra `rm` recursivo em diretórios raiz ou sensíveis.
- **Scripts**: Filtragem de execuções de scripts `sh/ps1` não homologados.

## ⚙️ Configuração (config.yaml)
```yaml
dangerousCommandBlocking:
  enabled: true
  customPatterns:
    - "^my-dangerous-script"
    - "DROP TABLE"
```
