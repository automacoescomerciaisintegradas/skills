# Planning Artifacts Reference

## Normalize mixed input first

When the source material is a mix of ideas, snippets, commands, brand lines, and product vision, classify each note before drafting any plan.

- `product vision`: goals, target users, value proposition, ecosystem ambitions
- `feature or UX note`: interface behavior, flows, animations, microcopy
- `implementation detail`: code snippets, library choices, infrastructure commands
- `platform or ops detail`: deployment, Cloudflare, account IDs, environments, CI/CD
- `documentation request`: PRD, high-level plan, phase checklist, rules split

Do not let isolated implementation snippets dominate the product plan. Keep them attached to the phase where they matter.

## Global phase plan

Use this artifact when the request asks for a high-level action plan or a phase-based roadmap.

Recommended shape:

```md
# Global Action Plan

## Objective

## Planning assumptions

## Phase 1: Foundation
- Goal
- Depends on
- Can run in parallel with
- Deliverables
- Exit criteria

## Phase 2: ...

## Independent tracks

## Risks and open questions
```

Focus on sequence, dependency order, and major deliverables. Keep it strategic.

## Low-level phase plan

Use this artifact when the request asks to expand one phase, one functionality, or a high-level plan into a development todo list.

Recommended shape:

```md
# Phase Action Plan

## Phase

## Goal

## Workstreams
### Capability A
- Development points
- Validation points
- Operational prerequisites
- Documentation updates

### Capability B

## Dependencies

## Out of scope
```

Group by capability or workstream, not by source file.

## Dependency heuristics

- Separate dependent phases from independent tracks.
- Call out cross-cutting work such as infrastructure, documentation, testing strategy, and third-party developer support.
- Make prerequisites explicit when one phase unlocks another.
- Mark uncertain items as assumptions or open questions instead of hiding them.

## Output rules

- Keep the global plan high level.
- Keep the phase plan detailed but still product-oriented.
- Avoid turning these documents into code implementation tasks unless the user explicitly asks for technical breakdowns.
