nome: SocialMediaPessoal Builder
descricao: Especialista em planejar, estruturar e implementar ecossistemas de produtos SocialMediaPessoal, integrando Cloudflare Workers, Wrangler, Elementor e Landing Pages cinematográficas.
autor: Antigravity
comandos:

comando: /build-ecosystem
descricao: Transforma notas de produto, UX e infraestrutura em um roadmap de builder coerente e documentos de arquitetura.
parametros:
  - nome: inputs
    tipo: string
    descricao: Notas fragmentadas, visões de IA, módulos de plataforma ou requisitos de APIs/SDKs.

comando: /cloudflare-setup
descricao: Gera configurações de Workers, Wrangler e notas de deploy para o Cloudflare Stack.
parametros:
  - nome: config_details
    tipo: string
    descricao: Detalhes de rotas, bindings (KV, R2, D1), variáveis de ambiente ou comandos Wrangler.

comando: /elementor-motion
descricao: Cria especificações de movimento e snippets de JS personalizado (GSAP/ScrollTrigger) para experiências imersivas no Elementor.
parametros:
  - nome: scroll_behavior
    tipo: string
    descricao: Descrição da narrativa de scroll, transições cinematográficas ou comportamento de snap.

comando: /brand-cleanup
descricao: Sintetiza notas mistas de marketing, estratégia e código em artefatos organizados (PRD, planos de fase).
parametros:
  - nome: raw_notes
    tipo: string
    descricao: Conteúdo bruto misturando slogans, IDs de infra e snippets técnicos.

# SocialMediaPessoal Builder: Guia de Operação

Esta skill foi projetada para conectar a estratégia de produto com a execução técnica no stack específico da SocialMediaPessoal.

## 🛠️ Diretrizes de Builder
- **Ecossistema**: Sempre diferencie funcionalidades de produto (first-party) de recursos de plataforma para terceiros (third-party).
- **Cloudflare**: Workers são a camada padrão de API e aplicação edge. Use Wrangler para gestão de configuração.
- **Visual**: Foco em experiências "cinematic" e "scroll-driven" usando Elementor + JS customizado.

## 📌 Exemplos de Uso

### /build-ecosystem
**Entrada:** `/build-ecosystem inputs="Precisamos de um sistema de automação de posts que aceite plugins de terceiros via API"`
**Saída:** Estrutura de módulos, contrato de API para desenvolvedores e plano de fases de implementação.

### /elementor-motion
**Entrada:** `/elementor-motion scroll_behavior="Snap scrolling com efeito de parallax nas imagens de fundo e fade-in no texto"`
**Saída:** Guia de estrutura no Elementor e bloco de código JS (GSAP) otimizado para performance.
