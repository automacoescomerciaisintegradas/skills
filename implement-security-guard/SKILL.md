---
name: implement-security-guard
description: Implementa o Protocolo de Defesa Preditiva (Security Guard) em um projeto Python. Copia o core/security_guard.py para o workspace para proteger contra vazamentos e execuções destrutivas (rm -rf, DROP TABLE, vazamentos de token).
---

# Implementar Security Guard (Protocolo de Defesa Preditiva)

## Objetivo
Instalar o sentinela de segurança `SecurityGuard` para validar e bloquear comandos perigosos, comandos de manipulação de banco de dados e vazamentos de credenciais no projeto alvo.

## Instruções de Execução

1. **Criar Estrutura:** Crie o diretório `core/` na raiz do projeto alvo (caso não exista).
2. **Copiar Recurso:** Leia o arquivo `resources/security_guard.py` e crie um arquivo com o mesmo conteúdo no projeto em `core/security_guard.py`. O script possui um bloco `try-except` que lida graciosamente caso não haja o `config_manager.py` da aplicação.
3. **Validar Importação:** Assegure-se de que no arquivo principal do projeto ou de execução (`main.py`, `app.py`, etc.), há uma recomendação de usar a sintaxe do wrapper `security_guard.execute(command, sua_funcao)` ao invés de rodar funções shell expostas livremente.
4. **Arquivos de Ignorados (Opcional):** Para prevenir vazamentos via repositório, certifique-se de instruir ou gerar `.gitignore`, `.npmignore` e `.claudeignore` garantindo que:
   - `*.map`
   - `.env` e `.venv`
   - Diretórios `secrets/` e `credentials/` 
   Fiquem permanentemente ignorados em novas implantações.
