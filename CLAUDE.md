---
name: antigravity-rules-planner
description: "Governance & Planning. Refactor CLAUDE rules, expand PRDs into phase plans, action plans, checklists. Trigger: rule refactoring, global planning."
---

# Rules Planner

Governance and strategic planning hub.

## Classification
- `rules-refactor`: Split/improve `CLAUDE.md` and `.claude/rules/*.md`.
- `planning-expansion`: PRD/High-level-plan -> Action plans/checklists.

## Rule Refactor
- **Root `CLAUDE.md`**: Global arch, REST, Testing, TS strict, SecurityGuard.
- **Scoped Rules** (`.claude/rules/`):
  - `controllers.md`: Request/DTO, auth, HTTP semantics.
  - `services.md`: Logic, orchestration, transactions.
  - `testing.md`: Strategy, mocks, naming, scenarios.
- **References**: `rule-splitting.md`, `testing-rules.md`.

## Planning Expansion
- **Source**: `docs/PRD.md` (intent), `docs/high-Level-plan.md` (sequence).
- **High-level**: Phases, milestones, parallel tracks, dependencies.
- **Low-level**: Capabilities checklist, validation, delivery points.
- **Logic**: Surface contradictions; explicit assumptions.
- **Ref**: `planning-artifacts.md`.

## Decision Log
State global vs scoped decisions. Preserve language & naming conventions.
