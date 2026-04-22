---
name: ckm:ui-styling
description: "UI builder: shadcn/ui (Radix), Tailwind CSS, Canvas design. Actions: build UIs, forms, tables, responsive layouts, dark mode, design systems."
---

# UI Styling

Build accessible, beautiful UIs with shadcn/ui + Tailwind.

## Setup & Commands
- **Initialize**: `npx shadcn@latest init`
- **Add Components**: `npx shadcn@latest add [comps...]` (button, card, dialog, form, etc.)
- **Tailwind (Vite)**: `npm i -D tailwindcss @tailwindcss/vite` + config plugin.
- **Automation**: `python scripts/shadcn_add.py [comps...]`; `python scripts/tailwind_config_gen.py`.

## Core Logic
- **shadcn/ui**: Copy-paste accessible primitives (Radix UI). TypeScript-first.
- **Tailwind**: Utility-first, mobile-first, build-time CSS.
- **Canvas**: High-impact visual compositions, minimal text, systematic aesthetics.

## Rules
- **A11y**: Use Radix primitives, focus states, semantic HTML, ARIA roles.
- **Responsive**: Mobile-first breakpoints (`sm`, `md`, `lg`, `xl`). Container queries.
- **Theming**: next-themes for dark mode. Use CSS variables for design tokens.
- **Composition**: Small primitives -> Complex UIs. Extract only for true DRY.
- **Perf**: Zero runtime overhead. Avoid dynamic class name interpolation.

## Reference Navigation
- **Components**: `shadcn-components.md`, `shadcn-theming.md`, `shadcn-accessibility.md`.
- **Styling**: `tailwind-utilities.md`, `tailwind-responsive.md`, `tailwind-customization.md`.
- **Design**: `canvas-design-system.md` (Philosophy/Workflow).

## Docs
- [shadcn/ui](https://ui.shadcn.com) | [Tailwind](https://tailwindcss.com) | [Radix](https://radix-ui.com) | [v0](https://v0.dev)
