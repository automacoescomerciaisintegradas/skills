# raw

This directory stores raw materials.

## Principles

- Files placed here are treated as immutable
- The LLM may read them but must never edit, move, or delete them
- Preserve original files as-is

## Subdirectories

- `sources/`: Articles, PDFs, notes, meeting transcripts, CSVs, etc.
- `assets/`: Diagrams, images, attachments

After adding materials, ask the LLM to ingest them so knowledge is reflected in `wiki/`.
