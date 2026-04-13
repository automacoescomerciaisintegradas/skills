---
name: parallax-hero
description: Componente cinematográfico premium com efeitos parallax, suporte a vídeo e design system moderno para landing pages de alto impacto.
version: 1.0.0
author: Francisco Queiroz | Automações Comerciais Integradas
---

# 🎬 ParallaxHero Component
## Design System Moderno, Cinematográfico e Premium

**Versão:** 1.0.0  
**Status:** Production Ready ✅  
**Última Atualização:** 2026-04-06  

---

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Características](#características)
3. [Especificação de Implementação](#especificação-de-implementação)
4. [Props & API](#props--api)
5. [Ejemplos de Uso](#ejemplos-de-uso)
6. [Temas & Customização](#temas--customização)
7. [Performance](#performance)
8. [Acessibilidade](#acessibilidade)
9. [Changelog](#changelog)

---

## 🎯 Visão Geral

**ParallexHero** é um componente cinematográfico premium projetado para capturar a atenção em landing pages de alto impacto. Combina efeitos parallax sofisticados, animações fluidas e tipografia impactante para criar uma experiência imersiva.

### Contexto de Uso
- Landing pages de produtos premium
- Portfólios de design/fotografia
- Campañas de marketing de alto impacto
- Websites corporativos modernos
- Apresentações de serviços premium

---

## ✨ Características

### Core Features
- ✅ **Parallax Dinâmico** - Profundidade visual 3D com controle de velocidade
- ✅ **Tipografia Cinematográfica** - Escalas responsivas com suporte a múltiplos idiomas
- ✅ **Animações de Entrada** - Transições suaves com timing customizável
- ✅ **Overlay Gradiente** - Gradientes dinâmicos com blend modes
- ✅ **Video Background** - Suporte a vídeos com fallback para imagem
- ✅ **CTA Interativo** - Buttons com micro-interações
- ✅ **Responsivo Total** - Mobile-first, quebras adaptativas
- ✅ **Dark/Light Mode** - Suporte automático a temas
- ✅ **Performance Otimizada** - Lazy loading, GPU acceleration
- ✅ **Acessibilidade WCAG AA** - Contraste, keyboard navigation, ARIA labels

---

## 🏗️ Especificação de Implementação

### Stack Tecnológico Recomendado

```typescript
// React + TypeScript + Tailwind CSS + Framer Motion
// NextJS 14+ (App Router)
// GSAP 3.12+ (Animações avançadas)
// Intersection Observer API
```

### Arquitetura de Componentes

```
ParallaxHero/
├── ParallaxHero.tsx (Componente Principal)
├── ParallaxHero.module.css (Estilos)
├── types.ts (TypeScript Interfaces)
├── hooks/
│   ├── useParallax.ts (Lógica de parallax)
│   ├── useIntersection.ts (Viewport detection)
│   └── useResponsive.ts (Breakpoints)
├── utils/
│   ├── calculateOffset.ts (Cálculos parallax)
│   ├── animationTimings.ts (Timing functions)
│   └── colorUtils.ts (Gradientes dinâmicos)
└── variants/
    ├── defaultVariant.ts
    ├── cinematicVariant.ts
    └── minimalVariant.ts
```

### TypeScript Interface

```typescript
interface ParallaxHeroProps {
  // Conteúdo
  title: string;
  subtitle?: string;
  description?: string;
  
  // Mídia
  backgroundImage: string;
  backgroundVideo?: string;
  fallbackImage?: string;
  
  // Parallax
  parallaxSpeed?: number; // 0 - 1 (default: 0.5)
  parallaxDirection?: 'up' | 'down'; // default: 'up'
  
  // Animações
  animationType?: 'fade' | 'slideUp' | 'zoom' | 'rotate';
  animationDuration?: number; // ms (default: 1200)
  animationDelay?: number; // ms (default: 0)
  
  // CTA
  primaryCTA?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
    icon?: React.ReactNode;
  };
  secondaryCTA?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  
  // Tipografia
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  titleWeight?: 300 | 400 | 500 | 600 | 700 | 800;
  titleCase?: 'uppercase' | 'lowercase' | 'capitalize';
  
  // Overlay
  overlayColor?: string; // hex ou rgba
  overlayOpacity?: number; // 0 - 1 (default: 0.3)
  overlayBlendMode?: 'multiply' | 'screen' | 'overlay' | 'darken';
  
  // Layout
  height?: 'screen' | 'screen-90' | 'auto'; // default: 'screen'
  minHeight?: string; // px ou vh
  maxHeight?: string;
  
  // Tema
  theme?: 'light' | 'dark' | 'auto';
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'custom';
  
  // Accessibility
  ariaLabel?: string;
  role?: 'banner' | 'region';
  
  // Callbacks
  onCTAClick?: (ctaType: 'primary' | 'secondary') => void;
  onAnimationComplete?: () => void;
  
  // Customização avançada
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'cinematic' | 'minimal' | 'bold';
}
```

---

## 🎮 Props & API

### Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | - | Título principal (obrigatório) |
| `backgroundImage` | `string` | - | URL da imagem de fundo |
| `parallaxSpeed` | `number` | `0.5` | Velocidade do parallax (0-1) |
| `height` | `string` | `'screen'` | Altura do componente |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Tema de cores |
| `animationType` | `string` | `'fade'` | Tipo de animação de entrada |
| `overlayOpacity` | `number` | `0.3` | Opacidade do overlay |

### Métodos Públicos (useImperativeHandle)

```typescript
interface ParallaxHeroRef {
  scrollToSection: (elementId: string) => void;
  triggerAnimation: (name: string) => void;
  updateParallaxSpeed: (speed: number) => void;
  resetAnimation: () => void;
}
```

---

## 💻 Ejemplos de Uso

### Básico

```typescript
import { ParallaxHero } from '@/components/ParallaxHero';

export default function HomePage() {
  return (
    <ParallaxHero
      title="Bem-vindo ao Futuro"
      subtitle="Criação de conteúdo com IA"
      backgroundImage="/images/hero-bg.jpg"
      primaryCTA={{
        label: 'Começar Agora',
        href: '#features',
        variant: 'primary'
      }}
    />
  );
}
```

### Cinematográfico Premium

```typescript
<ParallaxHero
  title="Automações Comerciais Integradas"
  subtitle="Tecnologia que Transforma Negócios"
  description="Sistema exclusivo de gerenciamento e automação"
  backgroundVideo="/videos/hero-cinematic.mp4"
  fallbackImage="/images/hero-fallback.jpg"
  
  parallaxSpeed={0.7}
  parallaxDirection="up"
  
  animationType="slideUp"
  animationDuration={1500}
  
  titleSize="2xl"
  titleWeight={700}
  titleCase="uppercase"
  
  overlayColor="rgba(0, 0, 0, 0.4)"
  overlayOpacity={0.4}
  overlayBlendMode="multiply"
  
  variant="cinematic"
  theme="dark"
  
  primaryCTA={{
    label: 'Explorar Solução',
    href: '/platform',
    variant: 'primary',
    icon: <ArrowRight />
  }}
  
  secondaryCTA={{
    label: 'Ver Demo',
    href: '/demo',
    variant: 'secondary'
  }}
  
  onCTAClick={(ctaType) => console.log(`${ctaType} clicked`)}
  onAnimationComplete={() => console.log('Animation done')}
/>
```

---

## 📊 Suporte & Contribuição

### Desenvolvido por
**Automações Comerciais Integradas**  
© 2026 ⚙️ Todos os direitos reservados.

📧 **Email:** contato@automacoescomerciais.com.br  
📱 **WhatsApp:** [https://wa.me/558894227586](https://wa.me/558894227586)  
👤 **Desenvolvedor:** Francisco Queiroz  

---

**Bem-vindo(a) ao Futuro da Criação de Conteúdo! 🤖✨**
