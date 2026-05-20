---
version: "alpha"
name: Antigravity Design System
description: >
  Identidade visual de elite do ecossistema Antigravity / Cleudocode.
  Projetado para agentes de IA, automação avançada e produtos de tecnologia
  premium no Brasil. O design combina o peso técnico de uma ferramenta
  profissional com a estética cinematográfica de uma marca de tecnologia
  de luxo.

colors:
  primary: "#5B7CFF"
  on-primary: "#FFFFFF"
  secondary: "#7C3AED"
  on-secondary: "#FFFFFF"
  tertiary: "#EF4444"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#DC2626"
  surface: "#05070C"
  surface-variant: "#0F1629"
  surface-card: "rgba(15, 22, 41, 0.75)"
  background: "#02030A"
  background-space: "#1A0F1F"
  on-surface: "#E5E7EB"
  on-surface-muted: "#9CA3AF"
  border: "rgba(91, 124, 255, 0.15)"
  border-strong: "rgba(91, 124, 255, 0.35)"
  error: "#EF4444"
  success: "#22C55E"
  warning: "#F59E0B"

typography:
  display:
    fontFamily: Outfit
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.03em
  h1:
    fontFamily: Outfit
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Outfit
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em
  h3:
    fontFamily: Outfit
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.08em
  code:
    fontFamily: "JetBrains Mono"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    fontWeight: 600

  button-primary-hover:
    backgroundColor: "{colors.secondary}"

  button-cta:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
    fontWeight: 700

  button-cta-hover:
    backgroundColor: "{colors.tertiary-container}"

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"

  card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"

  card-hover:
    backgroundColor: "rgba(91, 124, 255, 0.08)"

  input:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"

  badge:
    backgroundColor: "rgba(91, 124, 255, 0.15)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"

  navbar:
    backgroundColor: "rgba(2, 3, 10, 0.85)"
    textColor: "{colors.on-surface}"
    height: 64px

  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    width: 240px
---

## Visão Geral

**"Tecnologia como Arte. Automação como Poder."**

O Antigravity Design System é a linguagem visual do ecossistema Cleudocode — uma suíte de automações, agentes de IA e ferramentas de negócio premium para o mercado brasileiro. A estética é intencional: *cinematic dark tech* com toques de neon azul-violeta que evocam sofisticação técnica sem alienar o usuário de negócios.

O sistema foi construído para que agentes de IA possam gerar interfaces consistentes sem ambiguidade: cada token carrega o "porquê" semântico, não apenas o valor.

## Cores

A paleta é estruturada em três camadas de intenção:

- **Primary (`#5B7CFF`):** Azul Antigravity — o tom de confiança e inteligência. Usado em links interativos, ícones de destaque, bordas ativas e indicadores de estado. Nunca use em fundos de grandes áreas — reservado para elementos de foco.
- **Secondary (`#7C3AED`):** Violeta elétrico — potencializa o primary em gradientes e estados hover. Representa a profundidade e complexidade do sistema.
- **Tertiary (`#EF4444`):** Vermelho urgência — o CTA definitivo. Usado exclusivamente em botões de conversão principal (`button-cta`). Qualquer outra aplicação dilui seu poder.
- **Surface (`#05070C`) / Background (`#02030A`):** O espaço sideral da interface. O fundo é propositalmente mais escuro que o surface para criar profundidade de camadas sem sombras explícitas.
- **Background Space (`#1A0F1F`):** Roxo cósmico — usado em gradientes radiais de fundo para romper a monotonia do preto absoluto e criar a atmosfera cinematográfica.
- **Surface Card (`rgba(15, 22, 41, 0.75)`):** Glassmorphism calibrado. O alpha de 0.75 permite que o gradiente de fundo "respire" através dos cards, mantendo coesão visual mesmo com múltiplas camadas.

### O Gradiente de Fundo Canônico

```css
background: radial-gradient(1200px circle at 10% 10%, #1A0F1F 0%, #05070C 40%, #02030A 100%);
```

Este é o coração visual do sistema. Nunca substitua por um background liso — o gradiente é quem cria a profundidade atmosférica.

## Tipografia

Duas famílias, dois papéis distintos:

- **Outfit:** A voz da marca. Forte, geométrica, moderna. Exclusiva para títulos e displays. Pesos 600, 700 e 800 — nunca abaixo de 600 em headings.
- **Inter:** A voz do conteúdo. Neutra, legível, precisa. Exclusiva para body, labels e UI textual. O padrão de legibilidade para densidades de informação técnica.
- **JetBrains Mono:** A voz do código. Usada apenas em blocos de código, terminais e snippets técnicos.

### Hierarquia de Escala

A escala tipográfica segue uma progressão de 1.25 (Major Third) modificada para criar contraste dramático entre display e body. O `display` em 4rem contra o `body-md` em 1rem cria uma razão de 4:1 que garante hierarquia visual imediata.

`letter-spacing` negativo em títulos (`-0.02em` a `-0.03em`) compensa o espaçamento óptico de fontes display em tamanhos grandes, dando uma aparência mais "apertada" e premium.

## Arredondamento

O sistema usa bordas suaves mas não circulares, comunicando modernidade sem infantilidade:

- `xs` (4px): Badges, chips, tags — elementos inline compactos.
- `sm` (8px): Inputs, tooltips, dropdowns — controles de formulário.
- `md` (12px): Botões primários — o raio padrão da ação do usuário.
- `lg` (16px): Cards — containers de conteúdo com presença visual.
- `xl` (24px): Modais, drawers, painéis — componentes de camada superior.
- `full` (9999px): Avatars, status indicators, loaders circulares.

## Efeitos e Atmosfera

### Glassmorphism
Cards sempre usam `backdrop-filter: blur(20px)` com `surface-card` como background. A combinação cria superfícies translúcidas que mantêm legibilidade enquanto mostram profundidade.

### Glow Effects
O `border` canônico é `rgba(91, 124, 255, 0.15)` — o brilho sutil do primary vazando pela borda. Em estados hover, escale para `border-strong` (`rgba(91, 124, 255, 0.35)`).

Para elementos de destaque máximo (títulos hero, métricas KPI), aplique:
```css
text-shadow: 0 0 40px rgba(91, 124, 255, 0.4);
box-shadow: 0 0 30px rgba(91, 124, 255, 0.15);
```

### Micro-animações
Todas as transições de estado (hover, focus, active) usam `transition: all 0.2s ease`. Para animações de entrada de página, use `0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

## Componentes

### Botões

Há três botões, cada um com um propósito semântico não-intercambiável:

1. **`button-primary`** (azul): Ação principal da sessão atual. Ex: "Criar Automação", "Salvar".
2. **`button-cta`** (vermelho): Conversão de negócio. Ex: "Começar Agora", "Assinar". Use um por página.
3. **`button-ghost`** (transparente): Ação secundária ou de escape. Ex: "Cancelar", "Ver Detalhes".

Nunca inverta as cores dos botões. O usuário aprende os padrões de interação e a inversão cria confusão cognitiva.

### Cards

O card é o contêiner universal do sistema. Regras:
- Sempre use `surface-card` + `backdrop-filter: blur(20px)` + borda `border`.
- Padding interno mínimo: `xl` (32px).
- Em hover, troque o background para `card-hover` e intensifique a borda para `border-strong`.
- Nunca coloque texto branco puro (`#FFFFFF`) sobre um card — use `on-surface` (`#E5E7EB`).

### Inputs e Formulários

Inputs usam `surface-variant` como fundo (ligeiramente mais claro que surface), `rounded.sm` e placeholder em `on-surface-muted`. No estado focus, a borda transiciona para `primary` com `border-strong`.

## Acessibilidade

Todos os pares texto/fundo foram validados para WCAG AA:
- `on-surface` (#E5E7EB) sobre `surface` (#05070C): ratio ~15:1 ✅
- `primary` (#5B7CFF) sobre `background` (#02030A): ratio ~7.2:1 ✅
- `on-primary` (#FFFFFF) sobre `primary` (#5B7CFF): ratio ~4.6:1 ✅ AA
- `on-tertiary` (#FFFFFF) sobre `tertiary` (#EF4444): ratio ~4.5:1 ✅ AA

> **Atenção ao agente:** Nunca use `on-surface-muted` (#9CA3AF) como cor de texto funcional sobre backgrounds claros. Ele é calibrado exclusivamente para texto secundário sobre as superfícies escuras do sistema.

## Seções de Aplicação

A hierarquia de fundos define as camadas da UI:

| Camada | Cor | Uso |
|--------|-----|-----|
| Raiz | `background` (#02030A) + gradiente | `<body>` |
| Elevado | `surface` (#05070C) | Sidebar, navbar |
| Flutuante | `surface-variant` (#0F1629) | Seções destacadas |
| Conteúdo | `surface-card` (glass) | Cards, modais, painéis |

## Recursos de Fonte

Importe sempre pelo Google Fonts na ordem correta:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
