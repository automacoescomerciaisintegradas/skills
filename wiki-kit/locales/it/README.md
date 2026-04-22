# wiki-kit

Un template di knowledge base basato su Markdown progettato per essere mantenuto da un LLM.

Invece di cercare ogni volta nei materiali grezzi per ogni domanda, l'LLM accumula riassunti, riferimenti incrociati e analisi in `wiki/`, costruendo nel tempo un livello di conoscenza persistente.

Questo template implementa il flusso di lavoro proposto nel gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" di karpathy.

## Avvio Rapido

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Poi:

1. Descrivi ciò che vuoi studiare in `wiki/overview.md`
2. Inserisci i materiali sorgente in `raw/sources/`
3. Chiedi all'LLM di leggere `CLAUDE.md` e ingerirli

## Cosa Fa l'LLM

Una volta indirizzato a `CLAUDE.md`, l'LLM segue un flusso di lavoro definito:

- **Ingest**: Legge una fonte grezza, crea un riassunto in `wiki/sources/`, aggiorna le pagine di concetti ed entità correlate e registra il lavoro in `index.md` e `log.md`.
- **Query**: Consulta prima il wiki, risponde con evidenze e salva le analisi riutilizzabili in `wiki/syntheses/`.
- **Lint**: Rivede periodicamente il wiki per individuare contraddizioni, contenuti obsoleti, pagine orfane e concetti importanti non ancora promossi.

## Struttura della Directory

Dopo lo scaffolding, il progetto generato appare così:

```text
my-wiki/
├── CLAUDE.md              # Regole operative per l'LLM
├── AGENTS.md              # Indirizza altri agenti a CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Articoli, PDF, note, trascrizioni, ecc.
│   └── assets/            # Immagini, diagrammi, allegati
├── wiki/
│   ├── overview.md        # Tema, scopo, ipotesi
│   ├── index.md           # Indice basato sui contenuti
│   ├── log.md             # Registro cronologico di tutte le operazioni
│   ├── open-questions.md  # Domande irrisolte e candidati di ricerca
│   ├── sources/           # Una pagina di riassunto per ogni materiale grezzo
│   ├── concepts/          # Temi ricorrenti, dibattiti, terminologia
│   ├── entities/          # Persone, aziende, prodotti, organizzazioni
│   ├── syntheses/         # Confronti, analisi, conclusioni riutilizzabili
│   └── maintenance/
│       └── lint-reports/  # Report di revisione periodica
└── templates/             # Riferimenti di struttura pagina per l'LLM
```

## Localizzazioni

Questo template include 14 pacchetti locale. L'opzione `--locale` seleziona la lingua per `CLAUDE.md`, template, scaffolding del wiki e tutti i file README. Il valore predefinito è `en`.
Questo `README.md` a livello di repository documenta il template stesso. I progetti generati dovrebbero ricevere il README del locale selezionato, come `locales/en/README.md` o `locales/ja/README.md`.

| Code | Language    | Code | Language    |
|------|-------------|------|-------------|
| `de` | German      | `ko` | Korean      |
| `en` | English     | `pt` | Portuguese  |
| `es` | Spanish     | `ru` | Russian     |
| `fr` | French      | `th` | Thai        |
| `id` | Indonesian  | `tr` | Turkish     |
| `it` | Italian     | `vi` | Vietnamese  |
| `ja` | Japanese    | `zh` | Chinese     |

```bash
npx create-wiki-kit my-wiki --locale ja
```

Per aggiungere un nuovo locale, crea `locales/<code>/` nel repository del template con versioni tradotte di tutti i 22 file.

## Prompt di Esempio

### Inizializzazione

```text
Leggi CLAUDE.md e comprendi lo scopo e le regole operative di questo wiki.
Poi controlla wiki/overview.md e prepara le domande minime necessarie per colmare eventuali lacune.
```

### Ingest

```text
Seguendo CLAUDE.md, elabora un materiale non ancora ingerito da raw/sources/.
Crea un riassunto della fonte, aggiorna concepts / entities / overview se necessario,
poi aggiorna index.md e log.md.
```

### Query

```text
Leggi prima wiki/index.md, poi consulta le pagine correlate nel wiki.
Riassumi i tre argomenti principali su questo tema, indicando dove le evidenze sono deboli.
Se il risultato ha valore di riuso, salvalo in syntheses.
```

### Lint

```text
Seguendo CLAUDE.md, esegui il lint dell'intero wiki.
Identifica contraddizioni, contenuti obsoleti, pagine orfane, concetti chiave non promossi
e candidati di ricerca. Crea un report in wiki/maintenance/lint-reports/,
poi aggiorna index.md e log.md.
```

## Principi Fondamentali

- `raw/` è in sola lettura per l'LLM; i materiali vengono aggiunti dagli esseri umani e l'LLM non li modifica mai
- `wiki/` è il livello di conoscenza che l'LLM fa crescere; qui si accumulano riassunti e riferimenti incrociati
- `index.md` e `log.md` vengono aggiornati a ogni operazione
- I risultati di query di alto valore vengono salvati in `syntheses/` invece di restare nella conversazione
- I lint periodici intercettano contraddizioni e lacune prima che si accumulino

## Uso con Altri Agenti

Le regole operative sono definite in `CLAUDE.md`. Per gli agenti che leggono `AGENTS.md` (come Codex), quel file reindirizza a `CLAUDE.md`. Copia il contenuto nel formato di configurazione dell'agente, se necessario.
