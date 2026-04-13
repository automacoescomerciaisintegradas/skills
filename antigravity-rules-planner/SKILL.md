---
name: antigravity-rules-planner
description: Create or update AI-assistant governance and planning documents for software projects. Use when Codex needs to split a monolithic `CLAUDE.md` into scoped `.claude/rules/*.md` files such as `controllers.md`, `services.md`, and `testing.md`; improve testing guidance for TypeScript REST APIs; or transform messy product notes, `docs/PRD.md`, and `docs/high-Level-plan.md` into phase-based action plans, low-level phase checklists, or other planning artifacts. Trigger on requests such as `separar regras do CLAUDE`, `melhorar testing.md`, `planejamento global por fases`, and `todo list por funcionalidade`.
---

# Antigravity Rules Planner

## Overview

Organize project rules and delivery plans without collapsing everything into one generic document. Keep root guidance global, move scoped guidance into the right rule file, and expand product documents into planning artifacts that stay strategic instead of turning into premature coding checklists.

If the request is mainly about Cloudflare, Elementor, landing-page motion, or a builder product stack, prefer `$socialmediapessoal-builder` instead of this skill.

## Classify the request first

- Treat the request as one or both of these modes:
- `rules-refactor`: split or improve `CLAUDE.md` and `.claude/rules/*.md`
- `planning-expansion`: derive planning artifacts from product notes, `docs/PRD.md`, or `docs/high-Level-plan.md`
- Preserve the user's language in the generated docs.
- Preserve the repository's existing naming, frontmatter, and folder conventions when they already exist.
- Prefer the smallest document set that solves the request.

## Refactor `CLAUDE` rules

- Keep only cross-cutting guidance in root `CLAUDE.md`.
- Move scoped guidance into `.claude/rules/` files that match the target area.
- Read [references/rule-splitting.md](references/rule-splitting.md) before reorganizing rules.
- Read [references/testing-rules.md](references/testing-rules.md) before editing any test-related rule file.
- Avoid duplicating the same instruction in multiple files unless it is genuinely global.

### Keep these topics in root `CLAUDE.md`

- Project-wide architecture and quality rules
- REST API best practices
- Mandatory testing expectations
- TypeScript strict mode and other repo-wide language constraints

### Place these topics in scoped rule files

- `controllers.md`: request parsing, DTO validation, auth and guard boundaries, HTTP semantics, status codes, response contracts
- `services.md`: business logic, orchestration, transactions, provider integration, domain rules, side-effect coordination
- `testing.md`: unit, integration, and e2e strategy, naming conventions, data setup, mock boundaries, scenario design

## Expand planning artifacts

- Read [references/planning-artifacts.md](references/planning-artifacts.md) before writing plans.
- Normalize messy notes into goals, constraints, dependencies, assets, and open questions.
- Use `docs/PRD.md` as the source of intent, outcomes, and success criteria.
- Use `docs/high-Level-plan.md` as the source of workstreams, sequencing hints, and phase boundaries.
- Keep planning docs implementation-aware but not code-level unless the user explicitly asks for technical tasks.

### Produce a high-level phase plan when asked for a global action plan

- Focus on phases, milestones, dependencies, independent tracks, and phase exit criteria.
- Highlight what depends on earlier phases and what can run in parallel.
- Call out infrastructure, external integrations, developer platform work, and documentation needs explicitly.

### Produce a low-level phase plan when asked for a detailed action plan

- Expand each phase or functionality into a checklist of capabilities, validations, and delivery points.
- Group by business capability or product slice instead of by file or implementation detail.
- Include readiness checks, test expectations, operational prerequisites, and documentation work.

## Make decisions explicit

- State what remains global, what becomes scoped, and what is intentionally deferred.
- Surface contradictions in the source material instead of silently reconciling them.
- Summarize assumptions when the input mixes product vision, code snippets, infrastructure notes, and marketing copy.

## Use these references

- Use [references/rule-splitting.md](references/rule-splitting.md) for rule placement and scoping.
- Use [references/testing-rules.md](references/testing-rules.md) for test policy details.
- Use [references/planning-artifacts.md](references/planning-artifacts.md) for output shapes and normalization guidance.
