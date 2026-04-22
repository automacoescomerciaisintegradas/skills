# raw

Questa directory memorizza i materiali grezzi.

## Principi

- I file inseriti qui sono considerati immutabili
- L'LLM può leggerli ma non deve mai modificarli, spostarli o eliminarli
- Preserva i file originali così come sono

## Sottodirectory

- `sources/`: Articoli, PDF, note, trascrizioni di riunioni, CSV, ecc.
- `assets/`: Diagrammi, immagini, allegati

Dopo aver aggiunto i materiali, chiedi all'LLM di ingerirli in modo che la conoscenza sia riflessa in `wiki/`.
