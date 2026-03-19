---
name: Padrões de Commits (Semantic Commits)
description: Diretrizes detalhadas para mensagens de commit semânticas, garantindo legibilidade e versionamento automatizado.
category: development
risk: safe
source: personal
---

# 🦄 Padrões de Commits Semânticos

O commit semântico possui os elementos estruturais abaixo (tipos), que informam a intenção do seu commit ao utilizador(a) de seu código.

### Tipos Principais

- **feat**: Indica inclusão de um novo recurso (corresponde a MINOR no versionamento semântico).
- **fix**: Soluciona um problema/bug (corresponde a PATCH no versionamento semântico).
- **docs**: Mudanças apenas na documentação (ex: README).
- **test**: Alterações em testes (criação, alteração ou exclusão).
- **build**: Modificações em arquivos de build e dependências.
- **perf**: Alterações de código relacionadas a performance.
- **style**: Formatações, semicolons, lint (sem alteração de lógica).
- **refactor**: Mudanças de código que não alteram funcionalidade.
- **chore**: Atualizações de tarefas de build, configurações (.gitignore, etc).
- **ci**: Mudanças em arquivos de integração contínua.
- **raw**: Arquivos de configuração, dados, parâmetros.
- **cleanup**: Remoção de código comentado ou limpeza.
- **remove**: Exclusão de arquivos ou funcionalidades obsoletas.

---

### Exemplos de Uso

```
feat: Adiciona motor de busca UI/UX
```

```
fix: Corrige erro de encoding no Windows
```

```
docs: Atualiza guia de integração global
```

### 🛡️ Automações Comerciais Integradas! 2026 ⚙️
