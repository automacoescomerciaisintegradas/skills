# raw

Ce répertoire stocke les matériaux bruts.

## Principes

- Les fichiers placés ici sont traités comme immuables
- Le LLM peut les lire mais ne doit jamais les éditer, les déplacer ou les supprimer
- Préservez les fichiers d'origine tels quels

## Sous-répertoires

- `sources/` : Articles, PDF, notes, transcriptions de réunions, CSV, etc.
- `assets/` : Diagrammes, images, pièces jointes

Après avoir ajouté des matériaux, demandez au LLM de les ingérer pour que les connaissances soient reflétées dans `wiki/`.
