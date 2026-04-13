# Services Rules

Regras aplicáveis exclusivamente aos arquivos no diretório `**/services/**` ou arquivos com sufixo `.service.ts`.

- **Lógica de Negócio**: Toda a inteligência da aplicação e regras de domínio devem residir nos Services.
- **Isolamento**: O Service deve ser agnóstico à interface (HTTP/CLI/etc). Não utilize objetos de requisição/resposta das frameworks web aqui.
- **Orquestração**: Services podem chamar outros Services ou Repositories para compor funcionalidades complexas.
- **Tratamento de Erros**: Lance exceções de domínio que possam ser capturadas por middlewares ou pelos controllers para conversão em erros HTTP.
