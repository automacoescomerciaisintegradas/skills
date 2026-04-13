nome: UI Styling Pro
descricao: Skill especializada em gerar estilos visuais modernos e premiuns (Glassmorphism, Gradientes Dinâmicos, Neumorphism) para componentes web.
autor: Antigravity
comandos:

comando: /generate-glassmorphism
descricao: Gera o código CSS completo para um efeito de vidro fosco (frosted glass).
parametros:
  - nome: opacidade
    tipo: number
    descricao: Nível de transparência do fundo (0.1 a 0.9).
  - nome: blur
    tipo: number
    descricao: Intensidade do desfoque (px).

comando: /generate-premium-gradient
descricao: Cria um gradiente harmônico baseado em uma cor primária.
parametros:
  - nome: cor_hex
    tipo: string
    descricao: Cor base em hexadecimal (ex: #ff6b6b).
  - nome: direcao
    tipo: string
    descricao: Direção do gradiente (ex: 45deg, to right).

# UI Styling Pro: Guia de Design

Esta skill foi criada para garantir que todas as interfaces do Cleudocode mantenham o padrão "WOW" de estética visual.

## 💎 Princípios
- **Profundidade**: Use sombras suaves e bordas semi-transparentes.
- **Harmonia**: As cores devem seguir proporções balanceadas (60-30-10).
- **Modernidade**: Evite gradientes lineares simples; prefira gradientes com múltiplos stops de cores próximas.

## 🚀 Exemplos
### /generate-glassmorphism
**Entrada:** `/generate-glassmorphism opacidade=0.2 blur=10`
**Saída:** Bloco de CSS com `backdrop-filter: blur(10px)` e `background: rgba(255, 255, 255, 0.2)`.
