# Controllers Rules

Regras aplicáveis exclusivamente aos arquivos no diretório `**/controllers/**` ou arquivos com sufixo `.controller.ts`.

- **Responsabilidade Única**: O controller deve apenas gerenciar o fluxo de entrada e saída HTTP.
- **Validação**: Realize o parsing e a validação de DTOs/payloads nesta camada.
- **Abstração**: Nunca implemente lógica de negócio diretamente. Chame os métodos apropriados dos Services.
- **Semântica HTTP**: Garanta o uso correto de verbos (GET, POST, PUT, DELETE) e status codes (200, 201, 204, 400, 401, 403, 404, 500).
