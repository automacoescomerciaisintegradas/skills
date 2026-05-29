# Claude Code System Prompts (Mirror)

Snapshot importado de:
- Upstream: https://github.com/Piebald-AI/claude-code-system-prompts
- Licença upstream: MIT
- Data de snapshot: 2026-05-29

## Estrutura
- `upstream/system-prompts/` -> prompts e descrições extraídos do Claude Code
- `upstream/README.md` -> documentação original
- `upstream/CHANGELOG.md` -> histórico de versões
- `upstream/LICENSE` -> termos de licença
- `system-prompts/` -> acesso direto aos prompts (espelho navegável)
- `marketplace/index.html` -> catálogo web com busca e filtros
- `marketplace/prompts.json` -> índice concatenado para consumo web
- `marketplace/all-prompts.md` -> concatenação integral dos prompts em um único arquivo

## Estatísticas deste snapshot
- Arquivos em `upstream/system-prompts`: 319

## Observação
Este pacote é um espelho para consulta e adaptação. Para customizações internas, crie arquivos derivados fora de `upstream/`.

- system-prompts/ (acesso direto) -> mesma coleção de prompts para navegação rápida

## Abrir servidor web do marketplace
Na raiz do repositório `skills`:

```bash
python -m http.server 8090
```

Depois abra:

```text
http://localhost:8090/claude-code-system-prompts/marketplace/
```

