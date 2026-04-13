---
name: aci-design-system
description: >
  Aplica, ajusta e padroniza o design system da ACI em arquivos HTML, CSS e JS de qualquer
  projeto. Use SEMPRE que o usuário mencionar "design system", "ajustar cores", "aplicar
  variáveis CSS", "padronizar estilos", "atualizar tema", "refatorar CSS", "aplicar identidade
  visual", ou quando colar arquivos HTML/CSS pedindo ajustes visuais. A skill conhece o design
  system completo da ACI (cores, tipografia, gradientes, superfícies) e sabe aplicá-lo de forma
  consistente em qualquer arquivo do projeto.
version: 1.0.0
author: Automações Comerciais Integradas
---

# ACI Design System — Aplicador Automático

Lê arquivos HTML/CSS/JS de um projeto e aplica o design system oficial da ACI,
substituindo valores hardcoded por variáveis CSS e garantindo consistência visual.

---

## Design System da ACI

### Variáveis CSS — colar no `:root` de todo projeto

```css
:root {
  /* === BACKGROUNDS === */
  --bg-darkest: #02030a;
  --bg-dark: #05070c;
  --bg-space: #1a0f1f;
  --bg-card: rgba(15, 22, 41, 0.75);
  --bg-card-hover: rgba(20, 30, 55, 0.85);

  /* === SURFACES === */
  --surface-glass: rgba(255, 255, 255, 0.05);
  --surface-border: rgba(91, 124, 255, 0.2);
  --surface-border-hover: rgba(91, 124, 255, 0.4);

  /* === TEXT === */
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --text-accent: #5B7CFF;
  --text-brand: #ef4444;

  /* === GRADIENTS === */
  --gradient-bg: radial-gradient(1200px circle at 10% 10%, #1a0f1f 0%, #05070c 40%, #02030a 100%);
  --gradient-avatar: linear-gradient(135deg, #5B7CFF, #8B5CF6);
  --gradient-cta: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  --gradient-nordeste: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #ef4444 100%);
  --gradient-card: linear-gradient(135deg, rgba(91, 124, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);

  /* === TYPOGRAPHY === */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Outfit', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* === TYPE SCALE === */
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-lg:   18px;
  --text-xl:   20px;
  --text-2xl:  24px;
  --text-3xl:  30px;
  --text-4xl:  36px;
  --text-5xl:  48px;

  /* === SPACING === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;

  /* === BORDERS === */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* === SHADOWS === */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 30px rgba(91, 124, 255, 0.15);
  --shadow-cta:  0 4px 20px rgba(239, 68, 68, 0.3);
}
```

### Google Fonts — importar no `<head>` de todo arquivo HTML

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Background padrão — aplicar no `body`

```css
body {
  background: var(--bg-dark);
  background-image: var(--gradient-bg);
  background-attachment: fixed;
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: 1.6;
  min-height: 100vh;
}
```

---

## Fluxo de aplicação ao receber arquivos

1. **Receber os arquivos** — o usuário cola ou envia HTML/CSS/JS
2. **Auditar** — listar todos os valores hardcoded que deveriam ser variáveis
3. **Confirmar** — mostrar o resumo das substituições antes de aplicar
4. **Aplicar** — reescrever os arquivos com as variáveis corretas
5. **Garantir o `:root`** — verificar se o bloco de variáveis está presente; adicionar se faltar
6. **Garantir as fontes** — verificar se o `<link>` do Google Fonts está no `<head>`
7. **Entregar** — devolver os arquivos corrigidos prontos para uso

---

## checklist de conformidade — aplicar em todo arquivo

- [ ] `:root` com todas as variáveis CSS presente
- [ ] `<link>` do Google Fonts no `<head>` (Outfit + Inter + JetBrains Mono)
- [ ] `body` usando `var(--bg-dark)` e `var(--gradient-bg)`
- [ ] Nenhum valor de cor hardcoded que tenha variável equivalente
- [ ] Cards usando `.card` ou `var(--bg-card)` + `var(--surface-border)`
- [ ] Fontes referenciadas via `var(--font-primary)` / `var(--font-display)` / `var(--font-mono)`
- [ ] Tamanhos de texto via `var(--text-*)` onde aplicável
- [ ] Botões primários usando `var(--gradient-cta)` ou classe `.btn-cta`
- [ ] Textos de destaque usando `var(--text-accent)` (#5B7CFF)
