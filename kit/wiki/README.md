# wiki-kit

Um modelo de base de conhecimento em Markdown projetado para ser mantido por um LLM.

Em vez de pesquisar os materiais brutos novamente a cada pergunta, o LLM acumula resumos, referências cruzadas e análises em `wiki/`, construindo ao longo do tempo uma camada de conhecimento persistente.

Este modelo implementa o fluxo de trabalho proposto no gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" de karpathy.

## Início Rápido

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Depois:

1. Descreva o que você quer pesquisar em `wiki/overview.md`
2. Coloque os materiais-fonte em `raw/sources/`
3. Peça ao LLM para ler `CLAUDE.md` e fazer a ingestão

## O que o LLM Faz

Quando recebe `CLAUDE.md`, o LLM segue um fluxo de trabalho definido:

- **Ingestão**: Lê uma fonte bruta, cria um resumo em `wiki/sources/`, atualiza páginas relacionadas de conceitos e entidades e registra o trabalho em `index.md` e `log.md`.
- **Consulta**: Consulta o wiki primeiro, responde com evidências e salva análises reutilizáveis em `wiki/syntheses/`.
- **Lint**: Revisa o wiki periodicamente em busca de contradições, conteúdo obsoleto, páginas órfãs e conceitos importantes ainda não promovidos.

## Estrutura de Diretórios

Após o scaffolding, o projeto gerado fica assim:

```text
my-wiki/
├── CLAUDE.md              # Regras de operação para o LLM
├── AGENTS.md              # Aponta outros agentes para o CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Artigos, PDFs, notas, transcrições etc.
│   └── assets/            # Imagens, diagramas, anexos
├── wiki/
│   ├── overview.md        # Tema, propósito, hipóteses
│   ├── index.md           # Índice baseado em conteúdo
│   ├── log.md             # Registro cronológico de todas as operações
│   ├── open-questions.md  # Questões não resolvidas e candidatos de pesquisa
│   ├── sources/           # Uma página de resumo por material bruto
│   ├── concepts/          # Temas recorrentes, debates, terminologia
│   ├── entities/          # Pessoas, empresas, produtos, organizações
│   ├── syntheses/         # Comparações, análises, conclusões reutilizáveis
│   └── maintenance/
│       └── lint-reports/  # Relatórios de revisão periódica
└── templates/             # Referências de estrutura de página para o LLM
```

## Locales

Este modelo vem com 14 pacotes de locale. A opção `--locale` seleciona o idioma de `CLAUDE.md`, dos templates, do scaffolding do wiki e de todos os arquivos README. O padrão é `en`.
Este `README.md` na raiz do repositório documenta o próprio modelo. Os projetos gerados devem receber o README do locale selecionado, como `locales/en/README.md` ou `locales/ja/README.md`.

| Code | Language    | Code | Language    |
|------|-------------|------|-------------|
| `de` | German      | `ko` | Korean      |
| `en` | English     | `pt` | Portuguese  |
| `es` | Spanish     | `ru` | Russian     |
| `fr` | French      | `th` | Thai        |
| `id` | Indonesian  | `tr` | Turkish     |
| `it` | Italian     | `vi` | Vietnamese  |
| `ja` | Japanese    | `zh` | Chinese     |

```bash
npx create-wiki-kit my-wiki --locale ja
```

Para adicionar um novo locale, crie `locales/<code>/` no repositório do modelo com versões traduzidas de todos os 22 arquivos.

## Prompts de Exemplo

### Inicialização

```text
Leia CLAUDE.md e entenda o propósito e as regras de operação deste wiki.
Depois verifique wiki/overview.md e prepare o mínimo de perguntas necessárias para preencher qualquer lacuna.
```

### Ingestão

```text
Seguindo CLAUDE.md, processe um material ainda não ingerido de raw/sources/.
Crie um resumo da fonte, atualize concepts / entities / overview conforme necessário,
e depois atualize index.md e log.md.
```

### Consulta

```text
Leia primeiro wiki/index.md e depois consulte as páginas relacionadas no wiki.
Resuma os três principais argumentos sobre este tema, indicando onde a evidência é fraca.
Se o resultado tiver valor de reutilização, salve em syntheses.
```

### Lint

```text
Seguindo CLAUDE.md, execute lint em todo o wiki.
Identifique contradições, conteúdo obsoleto, páginas órfãs, conceitos-chave não promovidos
e candidatos de pesquisa. Crie um relatório em wiki/maintenance/lint-reports/,
e depois atualize index.md e log.md.
```

## Princípios Básicos

- `raw/` é somente leitura para o LLM; humanos colocam materiais ali e o LLM nunca os modifica
- `wiki/` é a camada de conhecimento que o LLM faz crescer; resumos e referências cruzadas se acumulam ali
- `index.md` e `log.md` são atualizados a cada operação
- Resultados de consulta de alto valor são salvos em `syntheses/` em vez de ficarem apenas na conversa
- Lints periódicos detectam contradições e lacunas antes que se acumulem

## Uso com Outros Agentes

As regras de operação estão definidas em `CLAUDE.md`. Para agentes que leem `AGENTS.md` (como Codex), esse arquivo redireciona para `CLAUDE.md`. Copie o conteúdo para o formato de configuração do agente, se necessário.
