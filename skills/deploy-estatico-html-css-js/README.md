# deploy-estatico-html-css-js

Skill para padronizar deploy de projetos estaticos (HTML/CSS/JS) com dois ambientes e sem GitHub Actions.

## O que esta skill entrega

- Estrutura de build local por ambiente:
  - `deploy/dev`
  - `deploy/prod`
- Fluxo de publicacao via branches de deploy:
  - `deploy/dev`
  - `deploy/prod`
- Promocao DEV -> PROD com artefato validado
- Alternativa para hospedagens sem integracao Git (upload via painel/FTP)

## Arquivos

- `SKILL.md`: definicao da skill e regras operacionais
- `prompt.md`: prompt reutilizavel para aplicar o fluxo em qualquer repositorio

## Quando usar

- Landing pages e sites institucionais em HTML/CSS/JS
- Projetos sem backend renderizado
- Times que querem deploy simples e rastreavel sem pipeline CI

## Resultado esperado

Processo de deploy reproduzivel, com separacao clara entre DEV e PROD, e baixo risco de erro manual.
