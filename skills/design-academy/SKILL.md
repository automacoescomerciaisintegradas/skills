---
name: design-academy
description: "Skill de direção de arte inspirada no visual de /paz-bem.html: editorial premium, tipografia serif/sans, paleta quente (gesso/terracota/carvão), texturas, grid assimétrica e microinterações com GSAP."
---

# Skill: Design Academy

Esta skill preserva e reaplica o estilo visual da página `frontend/public/paz-bem.html` em novos projetos.

## Objetivo

Gerar interfaces com estética editorial premium, linguagem clássica e atmosfera artesanal, mantendo legibilidade, performance e responsividade.

## Assinatura Visual (não perder)

- Paleta base:
  - `--gesso: #EAE6DF`
  - `--museu: #F4F1EB`
  - `--carvao: #1C1B1A`
  - `--taupe: #827C75`
  - `--terracota: #A84B2B`
- Tipografia:
  - Títulos: `Instrument Serif` (com itálico estratégico)
  - Corpo/UI: `Manrope`
- Fundo e textura:
  - Noise overlay sutil
  - Grid linear de baixa opacidade
  - Textura fotográfica com `mix-blend-mode: multiply`
  - Tipografia gigante de fundo em opacidade baixa
- Layout:
  - Grid de 12 colunas
  - Composição assimétrica (blocos altos, recortes orgânicos, sobreposições)
- Interação:
  - Header com blur ao scroll
  - Hover com deslocamento leve e mudança de cor
  - Botões com personalidade (estilo cápsula)
  - Animações de entrada/reveal com GSAP

## Regras de Implementação

1. Não usar aparência genérica de template.
2. Evitar cores frias padrão; priorizar tons terrosos/quentes.
3. Garantir mobile-first: desabilitar efeitos pesados em touch quando necessário.
4. Preservar contraste e legibilidade em textos longos.
5. Manter animações suaves, sem exagero.

## Arquivo de Prompt

Use o guia em `skills/design-academy/prompt.md` para aplicar esse estilo em qualquer contexto (landing page, dashboard, app institucional, etc.).
