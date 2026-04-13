nome: Skill Creator
descricao: Ferramenta de automação para criar, documentar e padronizar novas skills no ecossistema Cleudocode.
autor: Antigravity
comandos:

comando: /create-skill
descricao: Gera a estrutura inicial de uma nova skill seguindo o template oficial.
parametros:
  - nome: nome
    tipo: string
    descricao: Nome da skill (ex: instagram-agent).
  - nome: descricao
    tipo: string
    descricao: Breve resumo do que a skill faz.

comando: /add-command
descricao: Adiciona um novo comando estruturado a uma skill existente.
parametros:
  - nome: skill_path
    tipo: string
    descricao: Caminho para o SKILL.md de destino.
  - nome: comando_nome
    tipo: string
    descricao: Nome do comando (com /).

# Skill Creator: Manual de Automação

Esta skill é o "meta-automatizador" do sistema. Use-a para expandir rapidamente as capacidades do seu agente.

## 📋 Template Base que esta Skill Segue:
```markdown
nome:
descricao: 
autor: 
comandos:

comando: /nome-do-comando
descricao: 
parametros:
  - nome: 
    tipo: string
    descricao:
```

## 🚀 Como usar
Para criar uma nova skill de pesquisa, você usaria:
`/create-skill nome="Web Searcher" descricao="Busca informações em tempo real na web"`

A skill criará automaticamente o diretório e o arquivo base pronto para edição.
