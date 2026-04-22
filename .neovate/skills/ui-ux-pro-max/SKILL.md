---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50+ styles, 161 palettes, 57 fonts, 161 products, 99 UX rules, 25 charts across 10 stacks. Actions: plan, build, design, review, fix, optimize UI/UX. Includes shadcn/ui integration."
---

# UI/UX Pro Max - Intelligence

Guide for web/mobile UI/UX. Use for structure, visual decisions, interactions, or quality control.

## Priorities
| P | Category | Check | Avoid |
|---|----------|-------|-------|
| 1 | A11y | Contrast 4.5:1, Alt, ARIA | No focus rings, Icon-only |
| 2 | Touch | 44px min, 8px gap, Feedback | Hover-only, Instant state |
| 3 | Perf | WebP, Lazy, CLS < 0.1 | Layout shift, Heavy bundle |
| 4 | Style | Match product, SVG only | Mix styles, Emoji icons |
| 5 | Layout| Mobile-first, Systematic | Horizontal scroll, Fixed px |

## Quick Reference (Rules)
- **A11y**: Contrast 4.5:1; Focus rings (2-4px); Alt-text; ARIA labels; Tab order; Hierarchical H1-H6; Color-not-only; Dynamic Type; Reduced motion; VoiceOver order; Modal cancel.
- **Touch**: 44x44pt min; 8pt gap; Tap > Hover; Async loading feedback; Cursor-pointer; Ripple/Highlight feedback; Haptics (confirm); Safe-area awareness; Swipe affordance.
- **Perf**: WebP/AVIF; Lazy load; aspect-ratio (no CLS); font-display: swap; Bundle split; Virtualize 50+ items; Frame < 16ms; Skeleton screens; Input latency < 100ms.
- **Style**: Match industry; Consistent SVG; Platform idioms (HIG/MD); State clarity; Systematic elevation; Light/Dark pairing; Primary CTA only; Blur for dismissal.
- **Layout**: Viewport meta; Mobile-first; Readable 16px; 4pt/8dp grid; z-index scale; min-h-dvh; Visual hierarchy; Content priority; Adaptive gutters.
- **Typo/Color**: Line-height 1.5; 65-75ch limit; Semantic tokens (MD); Tabular numbers; Whitespace balance; Logical type roles (display/headline/body/label).
- **Motion**: 150-300ms duration; transform/opacity only; Ease-out/in; Shared elements; Spring physics; Exit faster than enter; Interruptible; Directional logic.
- **Forms**: Labels per input; Error below field; Success/Error toasts (3-5s); Undo destructive; Input types (tel/email); Progressive disclosure; Auto-focus error.
- **Nav**: Bottom-nav ≤ 5; Predictable back; Deep-links; Active highlight; Breadcrumbs (Web); State preservation (scroll); Adaptive sidebar (≥1024px); Persistent nav.
- **Charts**: Match type (trend=line, comp=bar); Legend near; Tooltips; Simplify for mobile; Aggregation (1000+ pts); Direct label small sets; Keyboard reachable.

## Usage
### 1. Design System (REQUIRED)
```bash
# Get reasoning + matches. Use --persist for MASTER.md + overrides.
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project"] [--persist] [--page "name"]
```

### 2. Domain Search
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max>]
# Domains: product, style, typography, color, landing, chart, ux, google-fonts, react, web, prompt.
```

### 3. Stack Guidance
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react-native
```

## Professional Standards
- **Visual**: SVG only (no emoji); Consistent icon family/stroke; hitSlop for small icons; Official brand assets; Stable press states (no layout shift); Semantic tokens.
- **Interaction**: Clear pressed feedback (80-150ms); Platform-native easing; Semantic roles; No gesture conflicts; Preferred native primitives (Pressable/Button).
- **Theming**: Card/Background separation; Dark mode text contrast >=4.5:1; Divider visibility; Modal scrim (40-60% black); Token-driven; Test both themes.
- **Layout**: Safe-areas (notch/home); Scroll insets; Consistent width per class; 8dp rhythm; Vertical tiers (16/24/32/48); Tablet/Landscape adaptive gutters.

## Pre-Delivery Checklist
- [ ] No emoji icons; All SVG consistent. [ ] Touch targets ≥44pt. [ ] Micro-motion 150-300ms. [ ] Primary contrast ≥4.5:1 (both themes). [ ] Safe-areas respected. [ ] Scroll not hidden. [ ] Verified Tablet/Landscape. [ ] 8dp grid followed. [ ] A11y labels present. [ ] Reduced motion support.