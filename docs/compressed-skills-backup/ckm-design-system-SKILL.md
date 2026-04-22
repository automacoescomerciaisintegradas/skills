---
name: ckm:design-system
description: "Token arch (Primitive→Semantic→Component), CSS vars, and slide builder. Actions: manage tokens, build brand-compliant presentations."
---

# Design System

Token architecture and systematic slide generation.

## Token Arch
- **Structure**: Primitive (raw) -> Semantic (purpose) -> Component (specific).
- **Rule**: NEVER use raw hex/values. Use `var(--token)`.
- **Sync**: Primitives from `ckm:brand` -> CSS variables -> Tailwind config.

## Slide System
- **Flow**: Goal/Context -> Search strategies (BM25) -> Layout/Type/Color logic -> Generate HTML -> Validate.
- **Rules**: Import `design-tokens.css`; use `var()` exclusively; Chart.js (not CSS bars); navigation (arrows/progress); Persuasion focus.
- **Breaking Pattern**: Duarte Sparkline (What Is / What Could Be).
- **Commands**:
  ```bash
  python scripts/search-slides.py "<query>" [--context --position X --total Y]
  python scripts/slide-token-validator.py <file>
  node scripts/generate-tokens.cjs --config tokens.json -o tokens.css
  node scripts/validate-tokens.cjs --dir src/
  ```

## Reference Index
- **Tokens**: `token-architecture.md`, `primitive-tokens.md`, `semantic-tokens.md`, `component-tokens.md`.
- **Specs**: `component-specs.md`, `states-and-variants.md`, `tailwind-integration.md`.
- **Data**: `slide-strategies.csv`, `slide-layouts.csv`, `slide-copy.csv`, `slide-charts.csv`.

## Chart.js
Use `chart.umd.min.js`. Map brand colors to `borderColor` / `backgroundColor`.

## Best Practices
- HSL format for opacity.
- Document token purpose.
- Center align slide content.
- Staggered reveals for motion.
