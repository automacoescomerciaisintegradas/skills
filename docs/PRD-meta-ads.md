# PRD: Sistema de Automação Meta Ads (SAMA)

## 1. Visão Geral
O **SAMA** é um sistema de automação para contas de anúncios da Meta (Facebook/Instagram), integrando capacidades de diagnóstico, análise de dados e execução de campanhas. O sistema opera em dois modos:
- **Feito-Você (Done-With-You)**: O agente atua como consultor, analisando métricas e sugerindo melhorias.
- **Feito para Você (Done-For-You)**: O agente executa operações diretamente na conta (criação de campanhas, upload de criativos, otimização automática).

## 2. Objetivos
- Resolver problemas de conexão e permissões com a Meta Business API.
- Automatizar a análise profunda de performance histórica (2026+).
- Facilitar a criação de campanhas complexas usando múltiplos formatos de ativos (Vertical, Horizontal, Quadrado).
- Implementar um fluxo de trabalho seguro com aprovação do usuário para gastos.

## 3. Público-Alvo
- Gestores de tráfego que buscam escala.
- Donos de negócios D2C e Infoprodutores.
- Agências que precisam de automação para relatórios e setup.

## 4. Requisitos Funcionais

### RF1: Conectividade e Segurança (Setup Inicial)
- O sistema deve validar `ad_account_id` (incluindo o prefixo `act_`).
- O sistema deve verificar permissões do `access_token` antes de operações de escrita.
- O sistema deve gerenciar limites de taxa (Rate Limit) da Meta.

### RF2: Agente Analítico
- Realizar análise profunda de campanhas desde 01/01/2026.
- Identificar pontos positivos (Criativos vencedores, CTR alto, CPC baixo).
- Identificar pontos negativos (fadiga de anúncio, ROAS baixo).
- Gerar recomendações acionáveis.

### RF3: Agente de Execução (Meta Ads Creator)
- Criar campanhas com objetivos configuráveis (Conversão, Mensagens, Engajamento).
- Criar Conjuntos de Anúncios com segmentação específica.
- Realizar upload de ativos em múltiplos formatos (Asset Customization).
- Nomeação automática baseada em padrões definidos.

### RF4: Gestão de Ativos
- Ler a pasta local `anuncios/` e organizar criativos por formato.
- Garantir que cada anúncio seja enviado na posição correta (Story/Reels vs Feed).

## 5. Requisitos Não Funcionais
- **UX Premium**: Respostas claras, dashboards gerados via artefatos e visualizações ricas.
- **Confiabilidade**: Logs detalhados de erros para depuração de chamadas API.
- **Segurança**: Nunca salvar tokens em texto claro no repositório (usar `.env` ou sistema de assets).

## 6. Critérios de Sucesso
- Execução bem-sucedida de um "/meta-ads-create" sem erros de endpoint.
- Relatório de análise aprovado pelo usuário com insights não óbvios.
- Redução do tempo de setup de campanha de 20min para <2min.
