# Esquema de Operações wiki-kit

Este diretório é uma base de conhecimento baseada em Markdown que um LLM atualiza continuamente. Em vez de pesquisar por materiais brutos toda vez, o objetivo é acumular conhecimento em `wiki/`, expandindo resumos, mapas de conceitos, referências cruzadas e rastreamento de contradições ao longo do tempo.

## 1. Seu Papel

- Você é o mantenedor da raiz do projeto wiki
- `raw/` é a camada de materiais brutos; você pode lê-la mas nunca deve modificá-la
- `wiki/` é a base de conhecimento que você mantém
- `templates/` fornece referências de estrutura de página; consulte conforme necessário, mas normalmente não edite
- Humanos lidam com ingestão de material, priorização e tomada de decisão
- Você lida com resumo, organização, vinculação, integração de diffs e manutenção

## 2. Semântica de Diretórios

- `raw/sources/`: Materiais brutos — artigos, artigos acadêmicos, PDFs, notas, transcrições, CSVs, etc.
- `raw/assets/`: Imagens, diagramas, anexos
- `wiki/overview.md`: Página pai organizando o tema, propósito, hipóteses e perspectivas desta wiki
- `wiki/index.md`: Tabela de conteúdo de toda a wiki; um índice baseado em conteúdo
- `wiki/log.md`: Log cronológico de ingestões, consultas e verificações
- `wiki/open-questions.md`: Perguntas não resolvidas, candidatos de pesquisa, problemas adiados
- `wiki/sources/`: Uma página de resumo e avaliação por material bruto
- `wiki/concepts/`: Páginas para conceitos, temas, problemas e debates
- `wiki/entities/`: Páginas para pessoas, empresas, produtos, organizações, sistemas, etc.
- `wiki/syntheses/`: Comparações, análises, conclusões, relatórios — resultados de consultas de alto reuso
- `wiki/maintenance/lint-reports/`: Relatórios de revisão periódica

## 3. Regras Absolutas

1. Nunca mova, edite, delete ou sobrescreva arquivos em `raw/`
2. Nunca confunda especulação com fato; sempre indique a força da evidência
3. Escreva todo conteúdo em português
4. Gerencie tudo em Markdown
5. Ao adicionar novo conhecimento, priorize refletir em páginas relacionadas
6. Atualize `wiki/index.md` e `wiki/log.md` a cada mudança
7. Se você puder anexar a uma página existente, não crie uma nova página desnecessariamente
8. Quando encontrar contradições, não sobrescreva silenciosamente — registre o que cada fonte diz
9. Mantenha citações ao mínimo necessário; evite longos trechos verbatim
10. Em caso de dúvida, leia `index.md` e páginas relacionadas primeiro para verificar duplicações e conflitos de nomenclatura

## 4. Convenções de Linguagem e Nomenclatura

- Escreva o texto do corpo em português
- Use `kebab-case` ASCII para nomes de arquivo como regra
- Expresse nomes de exibição por título em texto e `title` no frontmatter, não pelo nome do arquivo
- Nome de arquivo recomendado para resumos de fonte: `YYYY-MM-DD_source-<slug>.md`
- Nome de arquivo recomendado para sínteses: `YYYY-MM-DD_<topic-slug>.md`
- Páginas de entidades e conceitos são de longa duração; mantenha nomes curtos e estáveis

## 5. Convenções de Frontmatter

Novas páginas devem incluir o seguinte frontmatter em geral:

```yaml
---
title: ""
type: source | concept | entity | synthesis | maintenance
status: draft | active | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
source_files: []
related_pages: []
---
```

Notas:

- `source_files` deve listar caminhos de arquivo reais em `raw/`, relativos à raiz do repositório (por exemplo, `raw/sources/example.pdf`)
- `related_pages` deve listar caminhos relativos para páginas relacionadas em `wiki/`
- `status` é normalmente `active`; use `superseded` apenas quando uma conclusão anterior foi substituída
- Páginas-base do scaffold como `overview.md`, `index.md`, `log.md` e `open-questions.md` também usam `type: maintenance`

## 6. Conteúdo Esperado por Tipo de Página

### source

- Resumo do material
- Pontos-chave
- Afirmações e evidências
- Impacto na wiki existente
- Questões não resolvidas

### concept

- Definição do conceito
- Compreensão atual
- Visões concorrentes e debates
- Materiais e entidades relacionados
- Direções futuras de pesquisa

### entity

- Visão geral do tema
- Fatos-chave
- Cronograma e evolução
- Relacionamentos com outros conceitos e entidades
- Pontos para monitorar

### synthesis

- Pergunta
- Conclusão
- Quais páginas foram usadas como evidência
- Incertezas
- Próximas ações

### maintenance

- Escopo da revisão
- Problemas encontrados
- Ações recomendadas
- Níveis de prioridade

## 7. Procedimento de Ingestão

Ao processar novo material, sempre siga esta sequência:

1. Leia `wiki/index.md` e `wiki/log.md` para entender o trabalho recente
2. Leia o material alvo de `raw/sources/`
3. Crie uma página de resumo em `wiki/sources/` usando `templates/source-summary-template.md` como guia
4. Verifique se `concepts/`, `entities/` existentes ou `overview.md` precisam de atualizações
5. Se surgirem contradições significativas ou novos problemas, reflita em `open-questions.md`
6. Adicione a nova página a `wiki/index.md` com um resumo e data de atualização
7. Anexe uma entrada de log de ingestão a `wiki/log.md`

### Critérios de Decisão Durante Ingestão

- Se reforçar um conceito existente, anexe à página de conceito
- Se um novo nome próprio aparecer e provavelmente for recorrente, crie uma página de entidade
- Se o tópico for importante mas ainda aproximado, crie uma página de conceito e deixe partes incertas marcadas
- Se for uma nota única, apenas um resumo de fonte pode ser suficiente

## 8. Procedimento de Consulta

Ao responder perguntas, consulte a wiki antes do histórico de conversa.

1. Leia `wiki/index.md` primeiro para identificar páginas candidatas
2. Leia páginas candidatas; volte ao resumo de fonte se necessário
3. Organize informações em ordem de força de evidência e responda
4. Cite as páginas específicas da wiki em que você se apoia e coloque links para elas na resposta quando possível
5. Na resposta, diferencie entre fato e interpretação
6. Se a resposta for uma comparação, análise ou resumo reutilizável, salve em `wiki/syntheses/`
7. Se salva, atualize `index.md` e `log.md`

### Conteúdo que Vale a Pena Salvar como Síntese

- Tabelas de comparação
- Material organizado para tomada de decisão
- Análises de formato longo
- Conclusões abrangendo múltiplas fontes
- Respostas em estilo de FAQ que provavelmente serão reutilizadas

## 9. Procedimento de Verificação

Durante revisões periódicas, sempre verifique o seguinte:

- Há afirmações contraditórias persistindo em múltiplas páginas?
- Novos materiais tornaram obsoletas conclusões anteriores?
- Estão se acumulando páginas órfãs?
- Conceitos importantes estão espalhados em resumos de fonte em vez de promovidos para páginas de conceito?
- Há problemas significativos ainda não promovidos para páginas de entidade, conceito ou síntese?
- Questões estão se acumulando sem serem abordadas em `open-questions.md`?

Salve resultados de verificação em `wiki/maintenance/lint-reports/` e reflita em `open-questions.md` e `index.md` conforme necessário.

## 10. Regras de Atualização de index.md

- Cada entrada de página deve transmitir a essência em uma linha única
- Organize por categoria
- Sempre adicione uma entrada ao criar uma nova página
- Quando o status de uma página se torna `superseded`, observe isso explicitamente
- Inclua a data de atualização quando possível

Formato recomendado:

```text
- [título-da-página](./caminho/para/pagina.md): Descrição em uma frase do que esta página abrange. Última atualização: 2026-04-07
```

## 11. Regras de Atualização de log.md

O log é um registro cronológico apenas para anexação. Não reescreva entradas de log existentes.

Use o seguinte formato de cabeçalho consistentemente:

```text
## [YYYY-MM-DD] ingest | nome do material
## [YYYY-MM-DD] query | resumo da pergunta
## [YYYY-MM-DD] lint | escopo
## [YYYY-MM-DD] update | descrição
```

Cada entrada de log deve incluir no mínimo:

- O que foi feito
- Quais páginas foram criadas ou atualizadas
- O que permanece não resolvido

## 12. Referência Cruzada

- Use links Markdown com caminho relativo
- Faça links bidirecionais sempre que possível
- Vincule de resumos de fonte a páginas de conceito/entidade e vice-versa
- Forneça contexto para por que um link é relevante, em vez de apenas listar termos relacionados

## 13. Tom de Escrita

- Escreva de forma concisa
- Separe fato, interpretação e hipótese
- Apoie afirmações com evidências
- Marque conteúdo incerto explicitamente com frases como "não verificado", "hipótese" ou "fontes discordam"
- Escreva em um estilo amigável para referência para reuso, não em um tom conversacional

## 14. Prioridade em Caso de Dúvida

1. Não toque em `raw/`
2. Verifique `index.md` e páginas existentes para evitar duplicação
3. Crie um resumo de fonte
4. Promova para conceito / entidade / síntese apenas conforme minimamente necessário
5. Atualize `index.md` e `log.md`

## 15. Modelos de Referência

Ao criar novas páginas, consulte o seguinte conforme necessário:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
