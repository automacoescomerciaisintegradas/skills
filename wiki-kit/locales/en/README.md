# wiki-kit

A Markdown-based knowledge base template designed to be maintained by an LLM.

Rather than searching through raw materials for every question, the LLM accumulates summaries, cross-references, and analyses in `wiki/`, building a persistent knowledge layer over time.

This template instantiates the pattern described in karpathy's "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" gist.

## Quick Start

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Then:

1. Describe what you want to research in `wiki/overview.md`
2. Drop source materials into `raw/sources/`
3. Ask the LLM to read `CLAUDE.md` and ingest them

## What the LLM Does

Once pointed at `CLAUDE.md`, the LLM follows a defined workflow:

- **Ingest**: Read a raw source, create a summary in `wiki/sources/`, update related concept and entity pages, and log the work in `index.md` and `log.md`.
- **Query**: Consult the wiki first (not conversation history), answer with evidence and page citations, and save reusable analyses to `wiki/syntheses/`.
- **Lint**: Periodically review the wiki for contradictions, stale content, orphan pages, and unpromoted concepts.

## Directory Structure

After scaffolding, the generated project looks like this:

```text
my-wiki/
├── CLAUDE.md              # Operation rules for the LLM
├── AGENTS.md              # Points other agents to CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Articles, PDFs, notes, transcripts, etc.
│   └── assets/            # Images, diagrams, attachments
├── wiki/
│   ├── overview.md        # Theme, purpose, hypotheses
│   ├── index.md           # Content-based index (entry point for queries)
│   ├── log.md             # Chronological record of all operations
│   ├── open-questions.md  # Unresolved questions and research candidates
│   ├── sources/           # One summary page per raw material
│   ├── concepts/          # Recurring themes, debates, terminology
│   ├── entities/          # People, companies, products, organizations
│   ├── syntheses/         # Comparisons, analyses, reusable conclusions
│   └── maintenance/
│       └── lint-reports/  # Periodic review reports
└── templates/             # Page-structure references for the LLM
```

## Locales

This template ships with 14 locale packs. The `--locale` option selects the language for `CLAUDE.md`, templates, wiki scaffolding, and all README files. The default is `en`.
This repository-level `README.md` documents the template itself. Generated projects should receive the selected locale pack's README, such as `locales/en/README.md` or `locales/ja/README.md`.

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

To add a new locale, create `locales/<code>/` in the template repository with translated versions of all 22 files.

## Example Prompts

### Initialization

```text
Read CLAUDE.md and understand the purpose and operation rules of this wiki.
Then check wiki/overview.md and prepare minimal questions to fill any gaps.
```

### Ingestion

```text
Following CLAUDE.md, process one un-ingested material from raw/sources/.
Create a source summary, update concepts / entities / overview as needed,
then update index.md and log.md.
```

### Query

```text
Read wiki/index.md first, then consult related pages in wiki/.
Summarize the three main arguments on this topic, noting where evidence is weak.
Cite the relevant wiki pages you used. If the result has reuse value, save it to syntheses.
```

### Lint

```text
Following CLAUDE.md, lint the entire wiki.
Identify contradictions, stale content, orphan pages, unpromoted key concepts,
and research candidates. Create a report in wiki/maintenance/lint-reports/,
then update index.md and log.md.
```

## Core Principles

- `raw/` is read-only for the LLM — humans put materials in, the LLM never modifies them
- `wiki/` is the knowledge layer the LLM grows — summaries and cross-references accumulate here
- `index.md` and `log.md` are updated with every operation
- High-value query results are saved to `syntheses/` rather than left in conversation
- Periodic lints catch contradictions and gaps before they compound

## Using with Other Agents

The operation rules are defined in `CLAUDE.md`. For agents that read `AGENTS.md` (such as Codex), that file redirects to `CLAUDE.md`. Copy the content into the agent's own config format if needed.
