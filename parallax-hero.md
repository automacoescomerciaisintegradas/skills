# Skill: Parallax Hero (Cinematic)

Componente de primeira dobra (Hero) com efeito parallax ultra-realista para landing pages de alta conversão.

## 🛠️ Requisitos
- **Framework**: React / Next.js
- **Animador**: Framer Motion
- **Design System**: ACI (Cores e Espaçamento)

## 🚀 Estrutura Base
```tsx
<div className="relative h-screen overflow-hidden">
  <motion.div 
    style={{ y: scrollYTransformer }}
    className="absolute inset-0 bg-gradient-bg"
  >
     {/* Elementos em camadas para o efeito Parallax */}
  </motion.div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
     <h1 className="glow-title text-5xl">Futuro no Comando</h1>
     <button className="btn-cta mt-8">Iniciar Protocolo</button>
  </div>
</div>
```

## 🎥 Estética
Use gradientes profundos e camadas translúcidas que se movem em velocidades diferentes para criar a sensação de profundidade 3D (Z-space).
