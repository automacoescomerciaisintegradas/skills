# wiki-kit Operations Schema

This directory is a Markdown-based knowledge base that an LLM continuously updates. Instead of searching through raw materials every time, the goal is to accumulate knowledge in `wiki/`, growing summaries, concept maps, cross-references, and contradiction tracking over time.

## 1. Your Role

- You are the maintainer of this wiki project root
- `raw/` is the raw-materials layer; you may read it but must never modify it
- `wiki/` is the knowledge base you maintain
- `templates/` provides page-structure references; consult as needed but normally do not edit
- Humans handle material intake, prioritization, and decision-making
- You handle summarization, organization, linking, diff integration, and maintenance

## 2. Directory Semantics

- `raw/sources/`: Raw materials — articles, papers, PDFs, notes, transcripts, CSVs, etc.
- `raw/assets/`: Images, diagrams, attachments
- `wiki/overview.md`: Parent page organizing this wiki's theme, purpose, hypotheses, and perspectives
- `wiki/index.md`: Table of contents for the entire wiki; a content-based index
- `wiki/log.md`: Chronological log of ingestions, queries, and lints
- `wiki/open-questions.md`: Unresolved questions, research candidates, deferred issues
- `wiki/sources/`: One summary-and-evaluation page per raw material
- `wiki/concepts/`: Pages for concepts, themes, issues, and debates
- `wiki/entities/`: Pages for people, companies, products, organizations, systems, etc.
- `wiki/syntheses/`: Comparisons, analyses, conclusions, reports — high-reuse query results
- `wiki/maintenance/lint-reports/`: Periodic review reports

## 3. Absolute Rules

1. Never move, edit, delete, or overwrite files in `raw/`
2. Never conflate speculation with fact; always indicate the strength of evidence
3. Write all content in English
4. Manage everything in Markdown
5. When adding new knowledge, prioritize reflecting it in related pages
6. Update `wiki/index.md` and `wiki/log.md` with every change
7. If you can append to an existing page, do not create a new page unnecessarily
8. When you find contradictions, do not silently overwrite — record which source says what
9. Keep quotations to the minimum necessary; avoid long verbatim excerpts
10. When in doubt, read `index.md` and related pages first to check for duplicates and naming conflicts before editing

## 4. Language and Naming Conventions

- Write body text in English
- Use ASCII `kebab-case` for file names as a rule
- Express display names via the in-text title and `title` in frontmatter, not the filename
- Recommended filename for source summaries: `YYYY-MM-DD_source-<slug>.md`
- Recommended filename for syntheses: `YYYY-MM-DD_<topic-slug>.md`
- Entity and concept pages are long-lived; keep names short and stable

## 5. Frontmatter Conventions

New pages should generally include the following frontmatter:

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

Notes:

- `source_files` should list actual file paths under `raw/`, relative to the repository root (for example, `raw/sources/example.pdf`)
- `related_pages` should list relative paths to related `wiki/` pages
- `status` is normally `active`; use `superseded` only when an older conclusion has been replaced
- Core scaffold pages such as `overview.md`, `index.md`, `log.md`, and `open-questions.md` also use `type: maintenance`

## 6. Expected Content by Page Type

### source

- Summary of the material
- Key points
- Claims and evidence
- Impact on the existing wiki
- Unresolved questions

### concept

- Definition of the concept
- Current understanding
- Competing views and debates
- Related materials and entities
- Future research directions

### entity

- Overview of the subject
- Key facts
- Timeline and evolution
- Relationships with other concepts and entities
- Points to monitor

### synthesis

- Question
- Conclusion
- Which pages were used as evidence
- Uncertainties
- Next actions

### maintenance

- Scope of the review
- Issues found
- Recommended actions
- Priority levels

## 7. Ingestion Procedure

When processing new material, always follow this sequence:

1. Read `wiki/index.md` and `wiki/log.md` to understand recent work
2. Read the target material from `raw/sources/`
3. Create a summary page in `wiki/sources/` using `templates/source-summary-template.md` as a guide
4. Check whether existing `concepts/`, `entities/`, or `overview.md` need updates
5. If significant contradictions or new issues arise, reflect them in `open-questions.md`
6. Add the new page to `wiki/index.md` with a summary and update date
7. Append an ingestion log entry to `wiki/log.md`

### Decision Criteria During Ingestion

- If it reinforces an existing concept, append to the concept page
- If a new proper noun appears and is likely to recur, create an entity page
- If the topic is important but still rough, create a concept page and leave uncertain parts marked
- If it is a one-off note, a source summary alone may suffice

## 8. Query Procedure

When answering questions, consult the wiki before conversation history.

1. Read `wiki/index.md` first to identify candidate pages
2. Read candidate pages; go back to the source summary if needed
3. Organize information in order of evidence strength and respond
4. Cite the specific wiki pages you relied on, and link them in the response when possible
5. In the response, distinguish between fact and interpretation
6. If the response is a reusable comparison, analysis, or summary, save it to `wiki/syntheses/`
7. If saved, update `index.md` and `log.md`

### Content Worth Saving as a Synthesis

- Comparison tables
- Organized material for decision-making
- Long-form analyses
- Conclusions spanning multiple sources
- FAQ-style answers likely to be reused

## 9. Lint Procedure

During periodic reviews, always check the following:

- Are there contradictory statements persisting across multiple pages?
- Have new materials rendered older conclusions obsolete?
- Are orphan pages accumulating?
- Are important concepts scattered across source summaries rather than promoted to concept pages?
- Are there significant issues not yet promoted to entity, concept, or synthesis pages?
- Are questions piling up unaddressed in `open-questions.md`?

Save lint results to `wiki/maintenance/lint-reports/` and reflect them in `open-questions.md` and `index.md` as needed.

## 10. index.md Update Rules

- Each page entry should convey the gist in a single line
- Organize by category
- Always add an entry when creating a new page
- When a page status becomes `superseded`, note that explicitly
- Include the update date when possible

Recommended format:

```text
- [page-title](./path/to/page.md): One-sentence description of what this page covers. Last updated: 2026-04-07
```

## 11. log.md Update Rules

The log is an append-only chronological record. Do not rewrite existing log entries.

Use the following heading format consistently:

```text
## [YYYY-MM-DD] ingest | material name
## [YYYY-MM-DD] query | summary of the question
## [YYYY-MM-DD] lint | scope
## [YYYY-MM-DD] update | description
```

Each log entry should include at minimum:

- What was done
- Which pages were created or updated
- What remains unresolved

## 12. Cross-Referencing

- Use relative-path Markdown links
- Make links bidirectional whenever possible
- Link from source summaries to concept/entity pages, and vice versa
- Provide context for why a link is relevant, rather than just listing related terms

## 13. Writing Tone

- Write concisely
- Separate fact, interpretation, and hypothesis
- Support assertions with evidence
- Mark uncertain content explicitly with phrases like "unverified," "hypothesis," or "sources disagree"
- Write in a reference-friendly style for reuse, not a conversational tone

## 14. Priority When in Doubt

1. Do not touch `raw/`
2. Check `index.md` and existing pages to avoid duplication
3. Create a source summary
4. Promote to concept / entity / synthesis only as minimally needed
5. Update `index.md` and `log.md`

## 15. Reference Templates

When creating new pages, consult the following as needed:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
