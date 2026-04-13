---
name: social-flow-meta
description: Plano de controle para operações Meta (Facebook, Instagram, WhatsApp). Gerencia tokens, limites de taxa e execução de comandos via Social Flow CLI.
version: 1.0.0
author: Antigravity Agent
---

# Social Flow Meta Skill

Esta skill atua como uma interface de controle para o **Social Flow**, facilitando a execução de operações determinísticas nas APIs do Facebook, Instagram e WhatsApp.

## 🛠️ Comandos Principais

### Autenticação e Status
- `/social-auth-login api=<api> token=<token>`: Realiza o login em uma API específica (facebook, instagram, whatsapp).
- `/social-auth-status`: Verifica o estado atual das credenciais conectadas.
- `/social-auth-app id=<app_id> secret=<app_secret>`: Configura as credenciais globais do App Meta.

### Consultas e Monitoramento
- `/social-query-me api=<api>`: Retorna informações do perfil conectado.
- `/social-query-pages`: Lista todas as páginas do Facebook gerenciadas pelo usuário.
- `/social-limits-check`: Verifica o uso atual do Rate Limit da Meta para evitar bloqueios.
- `/social-query-media limit=<n>`: Busca as últimas mídias do Instagram.

### Operações Customizadas
- `/social-custom-call path=<path> api=<api> params=<json_params>`: Executa uma chamada direta ao Graph API via Social Flow.

## 💡 Exemplos de Uso

### Postar em uma Página (via Custom Call)
```bash
/social-custom-call path="/v19.0/{page-id}/feed" api="facebook" params='{"message": "Hello World", "link": "https://example.com"}'
```

### Gerar Relatório de Engajamento
1. Verifique os limites com `/social-limits-check`.
2. Busque as mídias com `/social-query-media limit=50`.
3. Analise os resultados JSON para métricas de likes e comentários.

## 🛡️ Diretrizes de Segurança
- **Sempre** verifique `/social-limits-check` antes de operações em massa.
- Use a confirmação do usuário para chamadas que envolvam gastos (Ads Manager) ou deleção de conteúdo.
- Armazene tokens de forma segura no ambiente conforme as regras do repositório.
