# raw

Este directorio almacena materiales brutos.

## Principios

- Los archivos colocados aquí se tratan como inmutables
- El LLM puede leerlos pero nunca debe editarlos, moverlos o eliminarlos
- Preserva archivos originales tal como están

## Subdirectorios

- `sources/`: Artículos, PDFs, notas, transcripciones de reuniones, CSVs, etc.
- `assets/`: Diagramas, imágenes, adjuntos

Después de agregar materiales, pide al LLM que los ingiera para que el conocimiento se refleje en `wiki/`.
