# raw

Este diretório armazena materiais brutos.

## Princípios

- Arquivos colocados aqui são tratados como imutáveis
- O LLM pode lê-los mas nunca deve editá-los, movê-los ou deletá-los
- Preserve arquivos originais como estão

## Subdiretórios

- `sources/`: Artigos, PDFs, notas, transcrições de reuniões, CSVs, etc.
- `assets/`: Diagramas, imagens, anexos

Depois de adicionar materiais, peça ao LLM para ingeri-los para que o conhecimento seja refletido em `wiki/`.
