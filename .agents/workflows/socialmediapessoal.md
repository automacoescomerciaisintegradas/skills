---
description: socialmediapessoal
---

---
name: socialmediapessoal-builder
description: Plan, structure, and implement SocialMediaPessoal builder experiences and product ecosystems that combine Cloudflare Workers, Wrangler, Elementor, scroll-driven landing pages, and mixed product notes. Use when Codex needs to turn slogans, JS snippets, Cloudflare setup details, Elementor motion ideas, or platform ambitions into organized docs, architecture notes, phased plans, landing-page behavior specs, or builder-focused implementation guidance.
---

# SocialMediaPessoal Builder

## Overview

Turn fragmented product, UX, infrastructure, and marketing notes into a coherent builder roadmap. Keep product strategy, Cloudflare delivery, and Elementor behavior connected without mixing everything into one unstructured output.

## Classify the request first

- `product-ecosystem`: builder vision, AI actions, platform modules, third-party developer support, APIs, SDKs, docs
- `cloudflare-stack`: Workers, Wrangler, routes, bindings, environments, deployment notes
- `elementor-experience`: custom JS, scroll-driven sections, cinematic transitions, landing-page storytelling
- `brand-and-copy`: hero text, positioning lines, supporting copy, page narrative
- `mixed-input-cleanup`: notes that combine strategy, code snippets, commands, infra IDs, and marketing copy

## Use this workflow

1. Read [references/project-framing.md](references/project-framing.md) to separate product vision from implementation noise.
2. Read [references/cloudflare-stack.md](references/cloudflare-stack.md) when the request mentions Workers, Wrangler, routes, or account settings.
3. Read [references/elementor-scroll-experience.md](references/elementor-scroll-experience.md) when the request mentions Elementor, fullpage behavior, GSAP, or scroll-triggered transitions.
4. Decide the output artifact before writing: PRD section, architecture note, phase plan, implementation checklist, landing spec, or integration snippet.
5. Keep brand copy, technical constraints, and operational steps in separate sections when the input mixes them.

## Builder ecosystem guidance

- Define the builder core clearly: project creation, templates, automation, integrations, AI capabilities, and admin controls.
- Separate first-party product features from third-party platform features.
- When the user asks for an ecosystem for developers, always cover APIs, SDKs, authentication, documentation, examples, environments, limits, and observability.
- Keep the phrase `The AI that actually does things.` and other positioning lines as brand input, not as technical requirements.

## Cloudflare guidance

- Treat Cloudflare Workers as the edge application and API layer unless the user states a different runtime.
- Prefer Wrangler-managed configuration, environment separation, bindings, and repeatable deployment steps.
- Never hardcode secrets into skill output.
- If the project provides an `account_id`, use it as a project note and wire it through config instead of scattering it across docs.
- If the user gives an OS-specific install snippet, preserve it as context but adapt it to the current environment before treating it as executable guidance.

## Elementor guidance

- Clarify whether the experience uses `fullPage.js`, `GSAP ScrollTrigger`, or plain custom JS. Do not merge those approaches accidentally.
- For snap-on-scroll pages, define section boundaries, animation ownership, mobile fallback, reduced-motion behavior, and performance constraints.
- Wrap custom JS so it waits for DOM readiness and fails safely if the required library is missing.
- Keep Elementor snippets concise and pair them with notes about where they should be inserted.

## Output rules

- Prefer one primary artifact per response, plus optional appendices for snippets or infra notes.
- State assumptions when the source material is contradictory or incomplete.
- Keep the final output opinionated and organized, not just a cleaned-up dump of the prompt.
- If the request is mainly about Claude rules or generic project planning, prefer `$antigravity-rules-planner`.
