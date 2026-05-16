# Deploy estatico (HTML/CSS/JS)

## Estrutura

Projeto com codigo puro para hospedagem estatica:
- HTML
- CSS
- JavaScript

Pacote local gerado automaticamente por ambiente:
- `deploy/dev`
- `deploy/prod`

## Build local por ambiente

Use este prompt para o agente gerar o script de build/deploy:

```md
Crie um fluxo de deploy estatico para HTML/CSS/JS puro com dois ambientes (DEV e PROD).

Requisitos:
1. Gerar pacote local por ambiente:
   - deploy/dev
   - deploy/prod
2. Incluir script para limpar e copiar somente arquivos necessarios da aplicacao.
3. Excluir arquivos de desenvolvimento no pacote final (ex.: .git, node_modules, docs internas, testes).
4. Permitir validar localmente antes de publicar.
5. Nao usar GitHub Actions.

Entregue:
1. Script de build local por ambiente.
2. Comandos de publicacao para branches deploy/dev e deploy/prod.
3. Fluxo de promocao DEV -> PROD.
4. Checklist final de validacao.
```

Isso gera as pastas:
- `deploy/dev`
- `deploy/prod`

## Publicacao Git sem Actions (100% funcional)

Deploy direto para branches de publicacao:

```bash
# Publicar DEV
git checkout deploy/dev
git rm -r . 2>/dev/null || true
cp -r deploy/dev/* .
git add .
git commit -m "deploy: atualizar ambiente DEV"
git push origin deploy/dev

# Publicar PROD
git checkout deploy/prod
git rm -r . 2>/dev/null || true
cp -r deploy/prod/* .
git add .
git commit -m "deploy: atualizar ambiente PROD"
git push origin deploy/prod
```

## Promocao de branches da plataforma

Fluxo automatico:
1. Build e validacao em `deploy/dev`
2. Publicacao da branch `deploy/dev`
3. Aprovacao funcional/visual
4. Promocao para `deploy/prod` com o mesmo artefato
5. Publicacao da branch `deploy/prod`

Observacoes:
- Se usar Windows PowerShell, troque `cp -r` por `Copy-Item -Recurse -Force`.
- Se a branch de deploy nao existir, crie com `git checkout --orphan deploy/dev` (ou `deploy/prod`) na primeira vez.
- Mantenha commit de deploy pequeno e rastreavel.

## Como usar na hospedagem

1. Configure o ambiente DEV para ler a branch `deploy/dev`.
2. Configure o ambiente PROD para ler a branch `deploy/prod`.

Se a hospedagem nao conecta Git direto, use o conteudo de `deploy/dev` ou `deploy/prod` e envie via painel/FTP.
