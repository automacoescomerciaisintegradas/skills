# Schéma opérationnel wiki-kit

Ce répertoire est une base de connaissances basée sur Markdown que le LLM met à jour continuellement. Au lieu de rechercher des matériaux bruts à chaque fois, l'objectif est d'accumuler des connaissances dans `wiki/`, en développant des résumés, des cartes conceptuelles, des références croisées et le suivi des contradictions au fil du temps.

## 1. Votre rôle

- Vous êtes l'administrateur de cette racine de projet wiki
- `raw/` est la couche des matériaux bruts ; vous pouvez la lire mais ne devez jamais la modifier
- `wiki/` est la base de connaissances que vous maintenez
- `templates/` fournit des références de structure de page ; consultez-la selon les besoins mais ne l'éditez normalement pas
- Les humains gèrent l'entrée de matériaux, la priorisation et la prise de décision
- Vous gérée la résumé, l'organisation, la liaison, l'intégration des diffs et la maintenance

## 2. Sémantique des répertoires

- `raw/sources/` : Matériaux bruts — articles, documents, PDF, notes, transcriptions, CSV, etc.
- `raw/assets/` : Images, diagrammes, pièces jointes
- `wiki/overview.md` : Page parente organisant le thème, le but, les hypothèses et les perspectives de ce wiki
- `wiki/index.md` : Table des matières de l'ensemble du wiki ; un index basé sur le contenu
- `wiki/log.md` : Journal chronologique des ingestions, requêtes et lints
- `wiki/open-questions.md` : Questions non résolues, candidats de recherche, problèmes reportés
- `wiki/sources/` : Une page de résumé et d'évaluation par matériau brut
- `wiki/concepts/` : Pages pour les concepts, thèmes, problèmes et débats
- `wiki/entities/` : Pages pour les personnes, les entreprises, les produits, les organisations, les systèmes, etc.
- `wiki/syntheses/` : Comparaisons, analyses, conclusions, rapports — résultats de requêtes à fort taux de réutilisation
- `wiki/maintenance/lint-reports/` : Rapports d'examen périodiques

## 3. Règles absolues

1. Ne déplacez jamais, n'éditez jamais, ne supprimez jamais et ne remplacez jamais les fichiers dans `raw/`
2. Ne confondez jamais la spéculation avec un fait ; indiquez toujours la force de la preuve
3. Écrivez tout le contenu en français
4. Gérez tout en Markdown
5. Lors de l'ajout de nouvelles connaissances, privilégiez leur reflection sur les pages connexes
6. Mettez à jour `wiki/index.md` et `wiki/log.md` à chaque modification
7. Si vous pouvez ajouter à une page existante, ne créez pas une nouvelle page inutilement
8. Lorsque vous trouvez des contradictions, ne les remplacez pas silencieusement — enregistrez ce que dit chaque source
9. Limitez les citations au minimum nécessaire ; évitez les longs extraits verbatims
10. En cas de doute, lisez d'abord `index.md` et les pages connexes pour vérifier les doublons et les conflits de dénomination avant d'éditer

## 4. Conventions de langue et de dénomination

- Écrivez le texte du corps en français
- Utilisez `kebab-case` en ASCII pour les noms de fichiers comme règle
- Exprimez les noms d'affichage via le titre en texte et `title` en front-matter, et non le nom de fichier
- Nom de fichier recommandé pour les résumés sources : `YYYY-MM-DD_source-<slug>.md`
- Nom de fichier recommandé pour les synthèses : `YYYY-MM-DD_<topic-slug>.md`
- Les pages d'entités et de concepts sont durables ; conservez les noms courts et stables

## 5. Conventions de front-matter

Les nouvelles pages doivent généralement inclure le front-matter suivant :

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

Notes :

- `source_files` doit lister les chemins de fichiers réels sous `raw/`, relatifs à la racine du dépôt (par exemple, `raw/sources/example.pdf`)
- `related_pages` doit lister les chemins relatifs vers les pages `wiki/` connexes
- `status` est normalement `active` ; utilisez `superseded` uniquement quand une conclusion plus ancienne a été remplacée
- Les pages de structure principales comme `overview.md`, `index.md`, `log.md` et `open-questions.md` utilisent aussi `type: maintenance`

## 6. Contenu attendu par type de page

### source

- Résumé du matériau
- Points clés
- Réclamations et preuves
- Impact sur le wiki existant
- Questions non résolues

### concept

- Définition du concept
- Compréhension actuelle
- Vues en concurrence et débats
- Matériaux et entités connexes
- Directions de recherche futures

### entity

- Aperçu du sujet
- Faits clés
- Chronologie et évolution
- Relations avec d'autres concepts et entités
- Points à surveiller

### synthesis

- Question
- Conclusion
- Quelles pages ont été utilisées comme preuves
- Incertitudes
- Prochaines actions

### maintenance

- Portée de l'examen
- Problèmes trouvés
- Actions recommandées
- Niveaux de priorité

## 7. Procédure d'ingestion

Lors du traitement de nouveau matériau, suivez toujours cette séquence :

1. Lisez `wiki/index.md` et `wiki/log.md` pour comprendre les travaux récents
2. Lisez le matériau cible depuis `raw/sources/`
3. Créez une page de résumé dans `wiki/sources/` en utilisant `templates/source-summary-template.md` comme guide
4. Vérifiez si les `concepts/`, `entities/` ou `overview.md` existants ont besoin de mises à jour
5. Si des contradictions significatives ou de nouveaux problèmes surgissent, reflétez-les dans `open-questions.md`
6. Ajoutez la nouvelle page à `wiki/index.md` avec un résumé et une date de mise à jour
7. Ajoutez une entrée de journal d'ingestion à `wiki/log.md`

### Critères de décision lors de l'ingestion

- Si cela renforce un concept existant, ajoutez au concept
- Si un nom propre nouveau apparaît et est susceptible de réapparaître, créez une page d'entité
- Si le sujet est important mais encore brut, créez une page de concept et laissez les parties incertaines marquées
- Si c'est une note ponctuelle, un résumé source seul peut suffire

## 8. Procédure de requête

Lors de la réponse aux questions, consultez le wiki avant l'historique de la conversation.

1. Lisez d'abord `wiki/index.md` pour identifier les pages candidates
2. Lisez les pages candidates ; retournez au résumé source si nécessaire
3. Organisez les informations par ordre de force de preuve et répondez
4. Citez les pages précises du wiki sur lesquelles vous vous appuyez et liez-les dans la réponse lorsque possible
5. Dans la réponse, distinguez le fait de l'interprétation
6. Si la réponse a une valeur de réutilisation, enregistrez-la dans `wiki/syntheses/`
7. Si enregistrée, mettez à jour `index.md` et `log.md`

### Contenu à enregistrer en tant que synthèse

- Tableaux de comparaison
- Matériau organisé pour la prise de décision
- Analyses de long terme
- Conclusions s'étendant sur plusieurs sources
- Réponses de style FAQ susceptibles d'être réutilisées

## 9. Procédure de lint

Lors des examen périodiques, vérifiez toujours les éléments suivants :

- Y a-t-il des déclarations contradictoires persistent sur plusieurs pages ?
- Les nouveaux matériaux ont-ils rendu les conclusions plus anciennes obsolètes ?
- Les pages orphelines s'accumulent-elles ?
- Les concepts importants sont-ils dispersés dans les résumés sources plutôt que promus en pages de concept ?
- Y a-t-il des problèmes importants qui n'ont pas encore été promus en pages d'entité, de concept ou de synthèse ?
- Les questions s'accumulent-elles sans réponse dans `open-questions.md` ?

Enregistrez les résultats du lint dans `wiki/maintenance/lint-reports/` et reflétez-les dans `open-questions.md` et `index.md` selon les besoins.

## 10. Règles de mise à jour de index.md

- Chaque entrée de page doit transmettre l'essentiel en une seule ligne
- Organisez par catégorie
- Ajoutez toujours une entrée lors de la création d'une nouvelle page
- Quand le statut d'une page devient `superseded`, notez-le explicitement
- Incluez la date de mise à jour si possible

Format recommandé :

```text
- [titre-page](./chemin/vers/page.md) : Description d'une phrase de ce que couvre cette page. Dernière mise à jour : 2026-04-07
```

## 11. Règles de mise à jour de log.md

Le journal est un enregistrement chronologique en ajout seul. Ne réécrivez jamais les entrées existantes du journal.

Utilisez le format de titre suivant de manière cohérente :

```text
## [YYYY-MM-DD] ingest | nom du matériau
## [YYYY-MM-DD] query | résumé de la question
## [YYYY-MM-DD] lint | portée
## [YYYY-MM-DD] update | description
```

Chaque entrée de journal doit inclure au minimum :

- Ce qui a été fait
- Quelles pages ont été créées ou mises à jour
- Ce qui reste non résolu

## 12. Références croisées

- Utilisez des liens Markdown avec chemin relatif
- Rendez les liens bidirectionnels dans la mesure du possible
- Liez les résumés sources aux pages concept/entité, et vice versa
- Fournissez le contexte pour pourquoi un lien est pertinent, plutôt que de simplement lister les termes connexes

## 13. Ton de rédaction

- Écrivez de manière concise
- Séparez le fait, l'interprétation et l'hypothèse
- Soutenez les assertions avec des preuves
- Marquez explicitement le contenu incertain avec des phrases comme "non vérifié", "hypothèse" ou "les sources désaccord"
- Écrivez dans un style convivial pour la réutilisation, pas un ton conversationnel

## 14. Priorité en cas de doute

1. Ne touchez pas à `raw/`
2. Vérifiez `index.md` et les pages existantes pour éviter les doublons
3. Créez un résumé source
4. Promouvez en concept / entité / synthèse seulement selon les besoins minimaux
5. Mettez à jour `index.md` et `log.md`

## 15. Modèles de référence

Lors de la création de nouvelles pages, consultez les éléments suivants selon les besoins :

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
