# Plano de Alto Nível: Sistema de Automação Meta Ads (SAMA)

## Fase 1: Diagnóstico e Calibração de Conexão (Semana 1)
- [ ] Implementar script de validação de ambiente (`check-meta-env.py`).
- [ ] Resolver o erro "Unsupported post request" (verificar Act Account ID e Endpoints).
- [ ] Criar logger de requisições para facilitar o debug de chamadas à API da Meta.
- **Marcos**: Conexão estável e permissões confirmadas.

## Fase 2: O Cérebro Analítico (SAMA-Insight) (Semana 1-2)
- [ ] Desenvolver serviço de consulta massiva de Insights (2026+).
- [ ] Criar algoritmos de classificação de performance (Wins vs Losses).
- [ ] Gerar artefatos de relatório com visualizações ricas (HTML/CSS/Chart.js).
- **Marcos**: Primeira análise profunda de conta gerada com sucesso.

## Fase 3: O Braço Executor (SAMA-Creator) (Semana 2-3)
- [ ] Implementar módulo de upload de ativos (Video/Image).
- [ ] Desenvolver lógica de "Asset Customization" para múltiplos formatos.
- [ ] Criar o comando `/meta-ads-deploy` para criação de Campanha -> Conjunto -> Anúncios.
- **Marcos**: Campanha criada automaticamente via script a partir da pasta `anuncios/`.

## Fase 4: Refinamento e UX Premium (Semana 3+)
- [ ] Refinar mensagens de feedback para o usuário (UX Cinematográfica).
- [ ] Implementar sistema de aprovação via terminal/UI.
- [ ] Criar documentação completa da Skill `meta-ads`.
- **Marcos**: Sistema operando em modo "Done-For-You".

## Dependências
- Meta Ads Graph API (v19.0+)
- Tokens de Acesso Válidos
- Pasta `anuncios/` com criativos padronizados.
