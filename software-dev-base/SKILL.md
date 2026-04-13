nome: Software Development Base
descricao: Skill base para padronização de desenvolvimento, arquitetura REST e estratégias de testes automatizados.
autor: Antigravity
comandos:

comando: /init-dev-structure
descricao: Cria a estrutura de pastas seguindo as boas práticas (src/controllers, src/services, tests/unit, etc).

comando: /gen-standard-test
descricao: Gera um arquivo de teste seguindo as segmentação (unit, int, e2e).
parametros:
  - nome: tipo
    tipo: string
    descricao: unit, int ou e2e.
  - nome: modulo
    tipo: string
    descricao: Nome do arquivo/módulo a testar.

# Software Development Base: Padrões de Engenharia

Esta skill garante a consistência técnica em APIs REST desenvolvidas com Typescript e modo Strict.

## 🏛️ Arquitetura
- **Controllers**: Lida apenas com entrada/saída HTTP.
- **Services**: Contém a lógica de negócio e orquestração.
- **Tests**: Segmentados por responsabilidade para máxima cobertura e descoberta de edge cases.

## ✅ Boas Práticas
- Use sempre tipos fortes (TypeScript Strict).
- Testes de integração devem usar o sufixo `*.int.spec.ts`.
- Mockar dependências externas em testes unitários.
