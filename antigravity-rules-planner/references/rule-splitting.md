# Rule Splitting Guide

## Goal

Split one overloaded `CLAUDE.md` into a small root file plus scoped rule files that only affect the relevant part of the codebase.

## Placement Rules

- Keep root `CLAUDE.md` limited to project-wide guidance.
- Create `.claude/rules/controllers.md` for controller-only concerns.
- Create `.claude/rules/services.md` for service-only concerns.
- Create `.claude/rules/testing.md` for test-only concerns.
- Add other scoped files only when a distinct area has enough rules to justify its own document.

## What stays global

- The project is a REST API and should follow REST best practices.
- Every functional change must be tested.
- TypeScript must stay in strict mode.
- Shared architectural boundaries, naming constraints, and repo-wide quality bars.

## What moves to `controllers.md`

- Handle transport-layer behavior.
- Validate input and output contracts.
- Keep controllers thin.
- Map HTTP errors and status codes consistently.
- Avoid embedding business rules that belong in services.

## What moves to `services.md`

- Centralize business rules and orchestration.
- Manage transactions and side effects in the correct layer.
- Isolate integrations with repositories, queues, HTTP providers, or storage.
- Avoid coupling service guidance to controller-specific HTTP details.

## What moves to `testing.md`

- Test taxonomy and suffixes.
- Mock boundaries.
- Data setup strategy.
- Assertions and scenario segmentation.
- Coverage expectations by test type.

## Writing Pattern

When the repository has no established rule-file format, use this structure:

```md
# Testing Rules

## Scope
Apply only to test files.

## Rules
- Write one scenario per test.
- ...
```

When the repository already has a frontmatter or metadata convention, preserve it instead of introducing a new format.
