---
name: deploy-estatico-html-css-js
description: "Padrao de deploy estatico para projetos HTML/CSS/JS puro, com build local por ambiente (dev/prod), publicacao Git sem Actions e promocao de branch entre ambientes."
---

# Skill: Deploy Estatico (HTML/CSS/JS)

Skill para preparar e publicar projetos estaticos com fluxo simples, confiavel e sem pipeline CI obrigatoria.

## Objetivo

Entregar deploy reproduzivel para hospedagens que leem branch Git ou upload manual (painel/FTP), separando claramente DEV e PROD.

## Escopo

- Projeto com codigo puro: HTML/CSS/JS
- Geracao de pacote local automatica para cada ambiente
- Publicacao em branches de deploy sem GitHub Actions
- Promocao de branch DEV para PROD

## Convencao recomendada

- Branch de desenvolvimento da app: `main` (ou sua branch de trabalho)
- Branch de deploy DEV: `deploy/dev`
- Branch de deploy PROD: `deploy/prod`
- Pasta de saida local:
  - `deploy/dev`
  - `deploy/prod`

## Regras de operacao

1. Nao publicar arquivos de build manualmente misturados na raiz do projeto.
2. Sempre gerar pacote local antes do push para branch de deploy.
3. Validar no browser o build DEV antes de promover para PROD.
4. Promocao para PROD deve copiar exatamente o conteudo aprovado de DEV.

## Arquivo de Prompt

Use `skills/deploy-estatico-html-css-js/prompt.md` para aplicar esse fluxo em qualquer repositorio.
