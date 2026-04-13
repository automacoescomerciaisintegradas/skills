# Testing Rules

Regras aplicáveis a todos os arquivos de teste (`**/tests/**`, `*.spec.ts`, `*.test.ts`).

## 🧪 Estratégia de Testes

### 1. Testes de Unidade
- **Mocks**: Obrigatório o uso de mocks para dependências externas (Banco de Dados, Chamadas HTTP/APIs, Sistemas de Arquivos).
- **Foco**: Validar lógica interna, cálculos e ramificações de código.
- **Independência**: Qualquer estrutura que não seja uma dependência externa pesada pode ser declarada/instanciada diretamente.

### 2. Testes de Integração (`*.int.spec.ts`)
- **Sufixo**: Devem obrigatoriamente utilizar o sufixo `.int.spec.ts`.
- **Objetivo**: Validar a comunicação entre diferentes artefatos e dependências externas reais (ou containers de teste).
- **Complementaridade**: Pode haver testes de unidade e integração para o mesmo artefato: a unidade testa a lógica básica e a integração testa a conexão real.

### 3. Testes End-to-End (E2E)
- **Fluxo Completo**: Testam o sistema de ponta a ponta, simulando a jornada do usuário.
- **Preparação de Dados**: Deve-se preparar o estado do banco antes dos testes.
- **Validação**: Avaliar resposta HTTP completa (Body, Status Code, Headers).

## 💡 Filosofia de Teste
- **Segregação**: Cada teste deve validar apenas **um cenário por vez**. Evite testes lineares gigantescos.
- **Descoberta**: O objetivo não é apenas "passar o teste", mas descobrir bugs, validar comportamentos, servir como documentação viva e encontrar edge cases.
- **Qualidade**: Priorize a clareza do cenário de teste sobre a economia de linhas de código.
