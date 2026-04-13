nome: Botão WhatsApp Floating
descricao: Skill para gerar e integrar botões flutuantes do WhatsApp com design premium, animação de pulso e link direto para chat.
autor: Antigravity
comandos:

comando: /gerar-botao-whatsapp
descricao: Gera o código HTML/CSS completo para um botão flutuante personalizável.
parametros:
  - nome: numero
    tipo: string
    descricao: Número do WhatsApp com DDI e DDD (ex: 5588921567214).
  - nome: mensagem
    tipo: string
    descricao: Mensagem inicial pré-preenchida para o chat.

comando: /configurar-whatsapp-wp
descricao: Gera o código PHP para integração segura via functions.php no WordPress.
parametros:
  - nome: numero
    tipo: string
    descricao: Número do WhatsApp que receberá os contatos.

# Documentação: Botão WhatsApp Floating

O **Botão WhatsApp Floating** é uma solução de alta performance para conversão.

## 🚀 Exemplos
- `/gerar-botao-whatsapp numero="5511987654321" mensagem="Olá!"`
- `/configurar-whatsapp-wp numero="5511987654321"`

## 🎨 Especificações
- **Animações**: Efeito Pulse (keyframe).
- **SEO**: Links amigáveis e SVGs inline.
- **WP**: Compatível com hook `wp_footer`.
