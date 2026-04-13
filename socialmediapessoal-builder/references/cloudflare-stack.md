# Cloudflare Stack Reference

## Working assumptions

Use this reference when the project is centered on Cloudflare delivery.

- Workers are the default compute surface.
- Wrangler is the default local and deployment tool.
- Bindings and environment variables should carry configuration.
- Secrets should never be embedded in docs or source examples.

## Project-specific notes

- Known account id: `62e8a90b2b0a16b3b8c4098924d1a273`
- Existing install snippet is Linux-specific:

```bash
curl -sL https://github.com/cloudflare/workers-sdk/releases/latest/download/wrangler-linux-amd64 -o /tmp/wrangler && chmod +x /tmp/wrangler && sudo mv /tmp/wrangler /usr/local/bin/wrangler
```

Treat that snippet as a project note, not a universal installation method. Adapt it to the current OS before recommending execution.

## Architecture prompts

When drafting architecture or plans, cover these points when relevant:

- Worker responsibilities
- Public routes and internal routes
- Auth and session strategy
- Data storage choices such as D1, KV, R2, or external services
- Queue or async processing needs
- Environment separation for dev, staging, and production
- Deployment and rollback flow
- Logging, analytics, and observability

## Output pattern

Prefer this structure for Cloudflare sections:

```md
## Runtime
## Config and bindings
## Data services
## Deployment flow
## Operational risks
```
