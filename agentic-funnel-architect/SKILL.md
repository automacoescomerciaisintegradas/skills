---
name: agentic-funnel-architect
description: Orquestrador de funis de vendas de alta conversão. Integra Landing Pages, Botões de WhatsApp, Pixel de Rastreamento e Automação Meta.
version: 1.0.0
author: Antigravity Architect
---

# Agentic Funnel Architect Skill

Esta skill atua como o cérebro estratégico do ecossistema, conectando habilidades de design, desenvolvimento e marketing em um único fluxo de conversão.

## 🏗️ Comandos de Orquestração

### Geração de Estruturas
- `/funnel-init name=<nome> type=<leads|direct-sales|app-install>`: Inicializa a arquitetura de um novo funil, criando o mapa de páginas e eventos.
- `/funnel-stitch-wa endpoint=<url> phone=<number> message=<text>`: Conecta automaticamente um botão de WhatsApp (via skill `whatsapp-button`) à Landing Page alvo.
- `/funnel-inject-tracking provider=<meta|google|tiktok> id=<pixel_id>`: Insere scripts de rastreamento em todas as páginas do funil.

### Otimização e Copy
- `/funnel-viral-copy niche=<nicho> target=<persona>`: Gera headlines e CTAs baseados em padrões de alta conversão (ex: Youtube Viral Titles).
- `/funnel-a11y-audit`: Executa uma auditoria completa de acessibilidade e performance (via workflow `/accessibility-review`).

## 🔗 Integrações Nativas
- **Design**: Usa `ui-styling-pro` para estética premium.
- **Execução**: Usa `social-flow-meta` para preparar a estrutura de anúncios.
- **Segurança**: Usa `security-guard` para proteger os endpoints de captura.

## 💡 Fluxo de Trabalho Recomendado

1. **Definição**: `/funnel-init name="Black Friday 2026" type="leads"`
2. **Design**: Solicite a criação da LP usando o workflow `/lp`.
3. **Ponte**: `/funnel-stitch-wa endpoint="./index.html" phone="55..."`
4. **Deploy**: Peça ao Claude para realizar o deploy e configurar o rastreamento com `/funnel-inject-tracking`.

## 🛡️ Governança
- Todos os funis gerados devem seguir o **Strict Mode** de design (Dark/Vibrant/Premium).
- O consentimento de dados (LGPD/GDPR) deve ser incluído automaticamente se solicitado.
