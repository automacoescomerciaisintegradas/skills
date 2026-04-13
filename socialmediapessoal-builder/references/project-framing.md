# Project Framing Reference

## Normalize mixed notes before planning

When the source material mixes product vision, site copy, JS snippets, CLI commands, account IDs, and platform ideas, classify each note before writing anything else.

- `vision`: what the builder is, who it serves, why it matters
- `product capability`: templates, AI actions, automation, workspace logic, integrations
- `developer platform`: APIs, SDKs, docs, auth, usage examples, extension points
- `landing experience`: hero copy, page flow, scroll behavior, visual transitions, CTA structure
- `infrastructure`: Workers, Wrangler, routes, KV, D1, R2, queues, environments
- `raw implementation note`: snippets, shell commands, package choices, account IDs

## Recommended output split

Use separate sections when the request contains more than one layer.

```md
## Product direction
## Builder capabilities
## Developer platform
## Cloudflare architecture
## Elementor experience
## Open questions
```

## Builder ecosystem checklist

- Define the user journey from idea to published project.
- Define what AI automates versus what users configure manually.
- Define what third-party developers can build inside the platform.
- Define documentation, examples, and SDK expectations early.
- Define observability and account management before opening the ecosystem to third parties.
