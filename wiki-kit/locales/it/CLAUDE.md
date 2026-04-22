# Schema di Operazione wiki-kit

Questa directory è una knowledge base basata su Markdown che un LLM aggiorna continuamente. Invece di cercare nei materiali grezzi ogni volta, l'obiettivo è accumulare conoscenze in `wiki/`, creando sommari, mappe concettuali, riferimenti incrociati e tracciamento delle contraddizioni nel tempo.

## 1. Il tuo ruolo

- Sei il manutentore della radice di questo progetto wiki
- `raw/` è lo strato dei materiali grezzi; puoi leggerlo ma non devi mai modificarlo
- `wiki/` è la knowledge base che mantieni
- `templates/` fornisce riferimenti di struttura delle pagine; consultalo come necessario ma normalmente non modificare
- Gli umani gestiscono l'acquisizione del materiale, la prioritizzazione e il decision-making
- Tu gestisci la sintesi, l'organizzazione, i collegamenti, l'integrazione dei diff e la manutenzione

## 2. Semantica delle directory

- `raw/sources/`: Materiali grezzi — articoli, documenti, PDF, note, trascrizioni, CSV, ecc.
- `raw/assets/`: Immagini, diagrammi, allegati
- `wiki/overview.md`: Pagina principale che organizza il tema del wiki, lo scopo, le ipotesi e le prospettive
- `wiki/index.md`: Indice dei contenuti per l'intero wiki; un indice basato sui contenuti
- `wiki/log.md`: Log cronologico degli ingestioni, query e linting
- `wiki/open-questions.md`: Domande irrisolte, candidati alla ricerca, questioni rimesse
- `wiki/sources/`: Una pagina di sommario e valutazione per ogni materiale grezzo
- `wiki/concepts/`: Pagine per concetti, temi, problematiche e dibattiti
- `wiki/entities/`: Pagine per persone, aziende, prodotti, organizzazioni, sistemi, ecc.
- `wiki/syntheses/`: Confronti, analisi, conclusioni, relazioni — risultati di query ad alto riutilizzo
- `wiki/maintenance/lint-reports/`: Relazioni periodiche di revisione

## 3. Regole assolute

1. Non spostare, modificare, eliminare o sovrascrivere file in `raw/`
2. Non confondere mai la speculazione con i fatti; indicare sempre la forza delle evidenze
3. Scrivi tutti i contenuti in italiano
4. Gestisci tutto in Markdown
5. Quando aggiungi nuove conoscenze, prioritizza il loro riflesso nelle pagine correlate
6. Aggiorna `wiki/index.md` e `wiki/log.md` con ogni modifica
7. Se puoi aggiungere a una pagina esistente, non creare una nuova pagina inutilmente
8. Quando trovi contraddizioni, non sovrascrivere silenziosamente — registra cosa dice ogni fonte
9. Mantieni le citazioni al minimo necessario; evita lunghi estratti verbatim
10. In caso di dubbio, leggi `index.md` e le pagine correlate per verificare duplicati e conflitti di denominazione prima di modificare

## 4. Convenzioni di linguaggio e denominazione

- Scrivi il corpo del testo in italiano
- Usa ASCII `kebab-case` per i nomi dei file come regola
- Esprimi i nomi di visualizzazione tramite il titolo nel testo e `title` nel frontmatter, non dal nome file
- Nome file consigliato per i sommari di fonte: `YYYY-MM-DD_source-<slug>.md`
- Nome file consigliato per le sintesi: `YYYY-MM-DD_<topic-slug>.md`
- Le pagine di entità e concetto hanno lunga vita; mantieni i nomi brevi e stabili

## 5. Convenzioni Frontmatter

Le nuove pagine dovrebbero generalmente includere il seguente frontmatter:

```yaml
---
title: ""
type: source | concept | entity | synthesis | maintenance
status: draft | active | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
source_files: []
related_pages: []
---
```

Note:

- `source_files` deve elencare i percorsi effettivi sotto `raw/`, relativi alla root del repository (per esempio, `raw/sources/example.pdf`)
- `related_pages` deve elencare i percorsi relativi alle pagine `wiki/` correlate
- `status` è normalmente `active`; usa `superseded` solo quando una conclusione precedente è stata sostituita
- Anche le pagine base dello scaffold come `overview.md`, `index.md`, `log.md` e `open-questions.md` usano `type: maintenance`

## 6. Contenuto atteso per tipo di pagina

### source

- Sommario del materiale
- Punti chiave
- Affermazioni e evidenze
- Impatto sulla wiki esistente
- Domande irrisolte

### concept

- Definizione del concetto
- Comprensione attuale
- Punti di vista in competizione e dibattiti
- Materiali e entità correlate
- Direzioni future di ricerca

### entity

- Panoramica dell'argomento
- Fatti chiave
- Cronologia e evoluzione
- Relazioni con altri concetti e entità
- Punti da monitorare

### synthesis

- Domanda
- Conclusione
- Quali pagine sono state utilizzate come evidenza
- Incertezze
- Azioni successive

### maintenance

- Ambito della revisione
- Problemi trovati
- Azioni consigliate
- Livelli di priorità

## 7. Procedura di ingestione

Quando elabori nuovo materiale, segui sempre questa sequenza:

1. Leggi `wiki/index.md` e `wiki/log.md` per comprendere il lavoro recente
2. Leggi il materiale target da `raw/sources/`
3. Crea una pagina di sommario in `wiki/sources/` utilizzando `templates/source-summary-template.md` come guida
4. Verifica se i `concepts/` e `entities/` esistenti o `overview.md` necessitano di aggiornamenti
5. Se sorgono contraddizioni o problemi significativi, riflettili in `open-questions.md`
6. Aggiungi la nuova pagina a `wiki/index.md` con un sommario e la data di aggiornamento
7. Aggiungi una voce di log di ingestione a `wiki/log.md`

### Criteri decisionali durante l'ingestione

- Se rafforza un concetto esistente, aggiungi alla pagina del concetto
- Se appare un nuovo nome proprio ed è probabile che ricorra, crea una pagina di entità
- Se l'argomento è importante ma ancora grezzo, crea una pagina di concetto e contrassegna le parti incerte
- Se è una nota una tantum, solo un sommario di fonte potrebbe essere sufficiente

## 8. Procedura di query

Quando rispondi a domande, consulta il wiki prima della cronologia della conversazione.

1. Leggi `wiki/index.md` per primo per identificare le pagine candidate
2. Leggi le pagine candidate; torna al sommario di fonte se necessario
3. Organizza le informazioni in ordine di forza delle evidenze e rispondi
4. Cita le pagine wiki specifiche su cui ti basi e collegale nella risposta quando possibile
5. Nella risposta, distingui tra fatto e interpretazione
6. Se la risposta è un confronto, un'analisi o un sommario riutilizzabile, salvalo in `wiki/syntheses/`
7. Se salvato, aggiorna `index.md` e `log.md`

### Contenuto degno di essere salvato come sintesi

- Tabelle di confronto
- Materiale organizzato per il decision-making
- Analisi di lungo formato
- Conclusioni che si estendono su più fonti
- Risposte in stile FAQ probabilmente referenziate più volte

## 9. Procedura di linting

Durante le revisioni periodiche, controlla sempre quanto segue:

- Ci sono affermazioni contraddittorie che persistono su più pagine?
- I nuovi materiali hanno reso obsolete le conclusioni precedenti?
- Si stanno accumulando pagine orfane?
- I concetti importanti sono sparsi nei sommari di fonte piuttosto che promossi a pagine di concetto?
- Ci sono problemi significativi non ancora promossi a pagine di entità, concetto o sintesi?
- Le domande si stanno accumulando non affrontate in `open-questions.md`?

Salva i risultati del linting in `wiki/maintenance/lint-reports/` e riflettili in `open-questions.md` e `index.md` come necessario.

## 10. Regole di aggiornamento di index.md

- Ogni voce di pagina deve trasmettere il significato in una sola riga
- Organizza per categoria
- Aggiungi sempre una voce quando crei una nuova pagina
- Quando lo stato di una pagina diventa `superseded`, notalo esplicitamente
- Includi la data di aggiornamento quando possibile

Formato consigliato:

```text
- [titolo-pagina](./percorso/a/pagina.md): Descrizione in una sola frase di quello che copre questa pagina. Ultimo aggiornamento: 2026-04-07
```

## 11. Regole di aggiornamento di log.md

Il log è un record cronologico append-only. Non riscrivere le voci di log esistenti.

Usa il seguente formato di intestazione in modo coerente:

```text
## [YYYY-MM-DD] ingest | nome del materiale
## [YYYY-MM-DD] query | sommario della domanda
## [YYYY-MM-DD] lint | ambito
## [YYYY-MM-DD] update | descrizione
```

Ogni voce di log deve includere almeno:

- Cosa è stato fatto
- Quali pagine sono state create o aggiornate
- Cosa rimane irrisolto

## 12. Riferimenti incrociati

- Usa link Markdown con percorso relativo
- Rendi i link bidirezionali quando possibile
- Collega dai sommari di fonte alle pagine di concetto/entità e viceversa
- Fornisci il contesto per il perché un link è rilevante, piuttosto che solo elencare termini correlati

## 13. Tono di scrittura

- Scrivi in modo conciso
- Separa il fatto, l'interpretazione e l'ipotesi
- Sostieni le affermazioni con evidenze
- Contrassegna il contenuto incerto esplicitamente con frasi come "non verificato", "ipotesi" o "le fonti non sono d'accordo"
- Scrivi in uno stile amichevole di riferimento per il riutilizzo, non in tono conversazionale

## 14. Priorità in caso di dubbio

1. Non toccare `raw/`
2. Controlla `index.md` e le pagine esistenti per evitare duplicati
3. Crea un sommario di fonte
4. Promuovi a concetto / entità / sintesi solo al minimo necessario
5. Aggiorna `index.md` e `log.md`

## 15. Template di riferimento

Quando crei nuove pagine, consulta quanto segue come necessario:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
