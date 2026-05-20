nome: Granola Meeting Ingest
descricao: Ingere, processa e estrutura notas de reunião exportadas do Granola (app de IA para reuniões), transformando transcrições em contexto acionável para o agente — tarefas, decisões, próximos passos e memória persistente.
autor: Antigravity
versao: 1.0.0
tags: [meeting, granola, ingest, notes, memory, productivity]

comando: /ingest-granola
descricao: Processa o conteúdo de uma reunião exportada do Granola (texto, JSON ou markdown) e extrai structured output.
parametros:
  - nome: input
    tipo: string
    descricao: Conteúdo bruto da reunião (pode ser colado diretamente ou path de arquivo).
  - nome: format
    tipo: string
    descricao: "Formato de entrada: 'text', 'markdown' ou 'json'. Default: 'text'."
  - nome: save_memory
    tipo: boolean
    descricao: "Se true, persiste o resumo na memória do agente via skill-supermemory. Default: true."

comando: /extract-action-items
descricao: Extrai apenas os itens de ação (tarefas, responsáveis, prazos) de uma reunião já ingerida.
parametros:
  - nome: meeting_id
    tipo: string
    descricao: ID da reunião previamente ingerida (retornado por /ingest-granola).

comando: /meeting-summary
descricao: Gera um resumo executivo da reunião em formato estruturado (PT-BR), pronto para enviar via WhatsApp ou Telegram.
parametros:
  - nome: meeting_id
    tipo: string
    descricao: ID da reunião a resumir.
  - nome: channel
    tipo: string
    descricao: "Canal de entrega do resumo: 'whatsapp', 'telegram', 'markdown' ou 'clipboard'. Default: 'markdown'."

comando: /search-meetings
descricao: Busca nas reuniões ingeridas por palavra-chave, participante ou intervalo de datas.
parametros:
  - nome: query
    tipo: string
    descricao: Termo de busca livre ou nome de participante.
  - nome: date_from
    tipo: string
    descricao: "Data inicial no formato YYYY-MM-DD (opcional)."
  - nome: date_to
    tipo: string
    descricao: "Data final no formato YYYY-MM-DD (opcional)."

---

# Granola Meeting Ingest: Guia Operacional

## 🎯 Propósito

Esta skill fecha o gap entre **reuniões capturadas pelo Granola** e o **ecossistema de automação ACI**. O Granola gera transcrições e notas enriquecidas com IA — esta skill extrai o valor dessas notas e os transforma em contexto acionável para os agentes.

## 🏗️ Fluxo de Processamento

```
Granola Export (text/md/json)
        │
        ▼
  /ingest-granola
        │
        ├─── Metadados (título, data, participantes, duração)
        ├─── Decisões tomadas
        ├─── Action Items (tarefa + responsável + prazo)
        ├─── Contexto / discussão principal
        └─── Memória persistente → skill-supermemory
```

## 📦 Structured Output Padrão

Cada reunião ingerida retorna:

```json
{
  "meeting_id": "uuid-gerado",
  "title": "Título da reunião",
  "date": "YYYY-MM-DD",
  "participants": ["Nome 1", "Nome 2"],
  "duration_min": 45,
  "decisions": ["Decisão 1", "Decisão 2"],
  "action_items": [
    {
      "task": "Tarefa a fazer",
      "owner": "Responsável",
      "due_date": "YYYY-MM-DD ou null"
    }
  ],
  "summary": "Resumo narrativo em PT-BR",
  "raw_notes": "Conteúdo original preservado",
  "tags": ["projeto", "cliente", "tema"]
}
```

## 🔗 Integrações Suportadas

| Integração | Como usar |
|---|---|
| **skill-supermemory** | `save_memory: true` persiste automaticamente |
| **whatsapp-button** | `channel: 'whatsapp'` no `/meeting-summary` |
| **Telegram Bot** | `channel: 'telegram'` no `/meeting-summary` |
| **wiki-kit** | Exportar `/meeting-summary` como página wiki |

## 📥 Como Exportar do Granola

1. Abrir a reunião no Granola
2. Clicar em **Share** → **Copy notes** (ou **Export as Markdown**)
3. Colar diretamente no parâmetro `input` do comando `/ingest-granola`

## ⚙️ Extração de Action Items

A skill identifica automaticamente padrões de tarefas como:
- `@nome fará X até Y`
- `Responsável: X | Tarefa: Y`
- Listas com checkbox `[ ]`
- Frases iniciando com verbos de ação no infinitivo

## 🧠 Memória e Busca

Quando `save_memory: true` (padrão), a skill salva:
- Título + data como chave primária
- Participantes para busca por pessoa
- Tags extraídas automaticamente do contexto
- Action items como tarefas pendentes rastreáveis

Use `/search-meetings` para recuperar reuniões passadas por contexto.

## 🔒 Dados Sensíveis

Conteúdo de reuniões pode conter informações confidenciais. A skill:
- **Não** envia dados para APIs externas sem consentimento explícito
- Armazena apenas em memória local (skill-supermemory)
- Suporta modo `save_memory: false` para processamento efêmero
