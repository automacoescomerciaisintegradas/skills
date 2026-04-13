# Planejamento Detalhado: Todo-List por Funcionalidade

## 🚀 Fase 1: Fundamentos das Skills
- [ ] **Skill Creator**
  - [ ] Implementar comando `/create-skill`.
  - [ ] Implementar comando `/add-command`.
  - [ ] Validar saída contra o template `nome/descricao/autor`.
- [ ] **Governança (.claude/rules)**
  - [ ] Configurar `controllers.md` (separação de responsabilidade).
  - [ ] Configurar `services.md` (lógica de negócio isolada).
  - [ ] Configurar `testing.md` (segmentação unidade/int/e2e).

## 💻 Fase 2: Base de Desenvolvimento Software
- [ ] **Configuração Geral**
  - [ ] Ativar `strict mode` no `tsconfig.json`.
  - [ ] Configurar padrões de API REST (status codes, verbos).
- [ ] **Implementação de Testes**
  - [ ] Criar estrutura de mocks para dependências externas.
  - [ ] Padronizar sufixo `*.int.spec.ts` para integração.
  - [ ] Segmentar testes por cenário (evitar testes lineares).

## 🎨 Fase 3: Skills Visuais e UI
- [ ] **UI Styling Pro**
  - [ ] Finalizar gerador de Glassmorphism.
  - [ ] Finalizar gerador de Gradientes Premiuns.
- [ ] **Componentes Rápidos**
  - [ ] Validar botão flutuante WhatsApp com animação pulse.

## 📦 Fase 4: Operações Git
- [ ] Inicializar repositório local em `skills/`.
- [ ] Adicionar remote `automacoescomerciaisintegradas/skills`.
- [ ] Realizar primeiro push com `skill-creator` e novas habilidades.
