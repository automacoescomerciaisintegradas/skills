nome: Meta Ads Automation (SAMA)
descricao: Sistema avançado para análise de performance e deploy automatizado de campanhas no Meta Ads.
autor: Antigravity
comandos:

comando: /meta-ads-diagnostic
descricao: Executa o check-meta-env.py para validar conexão, tokens e permissões da conta de anúncios.

comando: /meta-ads-insight
descricao: Realiza a consulta massiva de métricas históricas (Wins vs Losses) e gera relatórios de performance.

comando: /meta-ads-creator
descricao: Sobe criativos da pasta anuncios/ e gera a estrutura completa de Campanha -> Conjunto -> Criativo -> Anúncio.

comando: /social-post-deploy
descricao: Automatiza a postagem orgânica em múltiplas redes (FB, X) com geração de imagem AI e copywriting PAS.

# Meta Ads Automation (SAMA): Guia de Operação

O SAMA é o cérebro executor da sua estratégia de tráfego pago e orgânico.

## 📋 Pré-requisitos
- **META_ACCESS_TOKEN**: Token de longo prazo atualizado.
- **META_AD_ACCOUNT_ID**: ID da conta com o prefixo `act_`.
- **Pasta anuncios/**: Onde os arquivos brutos devem ser depositados.

## 🚀 Como usar
Para validar se o seu ambiente está pronto após uma troca de token:
`/meta-ads-diagnostic`

Para criar uma campanha de teste:
`/meta-ads-creator`
