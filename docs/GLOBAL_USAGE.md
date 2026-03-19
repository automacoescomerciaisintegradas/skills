# 🌍 Guia de Uso Global: Antigravity Skills

Este guia explica como utilizar o poder das suas **1.291+ skills** em qualquer pasta ou projeto no seu computador.

---

## 1. Configurar o Windows (Acesso Rápido)

Para rodar os comandos de busca e instalação de qualquer lugar (ex: dentro da pasta do seu novo projeto em React), siga estes passos:

1.  Abra o menu iniciar e digite **"Variáveis de Ambiente"**.
2.  Clique em **"Editar as variáveis de ambiente do sistema"**.
3.  Vá em **"Variáveis de Ambiente"** > **"Path"** (na seção de Variáveis do Usuário) > **"Editar"**.
4.  Clique em **"Novo"** e cole o caminho completo para a pasta de scripts:
    `C:\Users\fcaqd\Downloads\skills\tools\scripts`
5.  **Reinicie seu terminal** (PowerShell ou CMD).

Agora você pode digitar `skill_search.py "security"` de qualquer diretório!

---

## 2. Como "Instalar" uma Skill em um Novo Projeto

Se você está trabalhando em um projeto fora desta pasta e quer usar uma skill específica:

1.  Navegue até a pasta do seu projeto.
2.  Rode o instalador (usando o caminho absoluto ou o PATH configurado):
    ```powershell
    python tools/scripts/skill_installer.py software-engineer
    ```
3.  **Resultado**: Uma pasta `.agent/skills/software-engineer/` será criada no seu projeto atual.
4.  **Uso**: Aponte seu assistente de IA para ler as instruções daquele diretório local.

---

## 3. Variável de Ambiente Central

Recomendamos definir uma variável global para que seus scripts automatizados saibam onde encontrar a "fonte da verdade":

- **Nome**: `ANTIGRAVITY_SKILLS_PATH`
- **Valor**: `C:\Users\fcaqd\Downloads\skills`

Isso permite que loaders inteligentes busquem skills dinamicamente sem precisar copiar arquivos.

---

## 4. MCP (Model Context Protocol) - O Próximo Nível

O Claude Desktop e o Cursor suportam MCP. Você pode configurar um **Filesystem MCP Server** apontando para sua pasta `skills/`.
Isso fará com que o **Claude saiba de todas as 1.291 skills nativamente**, sem que você precise copiar nada!

Consulte [modelcontextprotocol.io](https://modelcontextprotocol.io) para configurar o servidor de arquivos oficial.

---

### 🛡️ Automações Comerciais Integradas! 2026 ⚙️
**Escalabilidade e Portabilidade para Agentes de Elite.**
