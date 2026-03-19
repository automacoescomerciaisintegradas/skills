---
name: token-optimizer
description: Strategies and tools for optimizing token usage in LLM prompts. Use this
  skill when the user wants to reduce costs or fit more information into the context
  window.
category: ai-ml
---

# Token Optimizer Skill

This skill focuses on maximizing information density while minimizing token consumption.

## Optimization Strategies

1. **Context Compression**: Removing redundant information.
2. **Selective Loading**: Only loading what is necessary (using the skills.index protocol).
3. **Structured Formatting**: Using lean formats like JSON or custom shorthand.

## Procedural Protocol

- Analyze current token usage.
- Identify "heavy" sections of the prompt.
- Propose compression or removal.