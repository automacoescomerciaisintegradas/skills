# 📜 Padrões de Commit

Este repositório segue os padrões de **Conventional Commits** da **Automações Comerciais Integradas**. Todas as mensagens de commit devem seguir a estrutura abaixo para manter um histórico limpo e organizado.

---

## 🦄 Estrutura da Mensagem

A mensagem de commit deve seguir este formato:
`[:emoji:] <tipo>(<escopo opcional>): <descrição>`

### 🚀 Tipos Permitidos

- **feat**: Novo recurso.
- **fix**: Correção de bug.
- **docs**: Alterações na documentação.
- **test**: Adição ou atualização de testes.
- **build**: Arquivos de build ou dependências.
- **perf**: Melhorias de performance.
- **style**: Formatação de código e lint.
- **refactor**: Refatoração que não altera comportamento.
- **chore**: Tarefas administrativas ou configurações.
- **ci**: Scripts e configurações de CI.
- **raw**: Dados, feature flags ou arquivos de configuração brutos.
- **cleanup**: Limpeza de código morto ou comentários.
- **remove**: Exclusão de arquivos ou funcionalidades obsoletas.

### 💈 Emojis Sugeridos

| Emoji | Tipo | Descrição |
| :--- | :--- | :--- |
| :sparkles: | `feat` | Novas funcionalidades |
| :bug: | `fix` | Correção de bugs |
| :books: | `docs` | Documentação |
| :test_tube: | `test` | Testes |
| :package: | `build` | Build e dependências |
| :zap: | `perf` | Performance |
| :recycle: | `refactor` | Refatoração |
| :wrench: | `chore` | Configurações |
| :bricks: | `ci` | Integração contínua |
| :broom: | `cleanup` | Limpeza de código |
| :wastebasket: | `remove` | Remoção de arquivos |

---

## 💻 Exemplos

```bash
git commit -m ":sparkles: feat: adiciona sistema de busca"
git commit -m ":bug: fix(api): corrige timeout na busca"
git commit -m ":books: docs: atualiza guia de instalação"
```

## 🛠️ Validação Automática

O repositório possui um git hook instalado em `.git/hooks/commit-msg` que valida automaticamente sua mensagem no momento do commit. Se a mensagem não seguir o padrão, o commit será rejeitado.

---
© **Automações Comerciais Integradas! 2026** ⚙️
