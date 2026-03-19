# Skills Indexing System

Este projeto implementa uma nova modalidade de economizar tokens através da indexação de "skills". Em vez de carregar todas as definições de uma vez, o sistema permite consultar um índice e carregar apenas o que é necessário.

## Componentes

- `skills_index.json`: Índice gerado automaticamente com metadados e categorias de cada skill.
- `generate_index.py`: Script para rastrear o diretório de skills e atualizar o índice.
- `skills_loader.py`: Utilitário para carregar dinamicamente o conteúdo de uma skill.
- `_project_paths.py`: Auxiliar para localização da raiz do repositório.

## Como Usar

### Consultar o Índice

Sempre consulte `skills_index.json` (ou use um utilitário de busca) para encontrar a ferramenta que resolve o problema do usuário.

### Carregar uma Skill

Antes de responder ao usuário usando os comandos de uma skill, você deve carregá-la:

```python
from skills_loader import load_skill

content = load_skill("software-engineer")
# Agora você tem as instruções reais da skill no contexto
```

## Geração do Índice

Para atualizar o índice após adicionar novas skills:

```bash
python tools/scripts/generate_index.py
```

---

**Desenvolvido por**
"© Automações Comerciais Integradas! 2026 ⚙️ Todos os direitos reservados.
contato@automacoescomerciais.com.br
