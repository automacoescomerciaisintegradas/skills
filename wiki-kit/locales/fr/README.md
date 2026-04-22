# wiki-kit

Un modèle de base de connaissances basé sur Markdown conçu pour être maintenu par un LLM.

Au lieu de rechercher à nouveau dans les matériaux bruts pour chaque question, le LLM accumule des résumés, des références croisées et des analyses dans `wiki/`, créant au fil du temps une couche de connaissances persistante.

Ce modèle implémente le flux de travail proposé dans le gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" de karpathy.

## Démarrage Rapide

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Ensuite :

1. Décrivez ce que vous souhaitez étudier dans `wiki/overview.md`
2. Déposez les sources dans `raw/sources/`
3. Demandez au LLM de lire `CLAUDE.md` et de les ingérer

## Ce que fait le LLM

Une fois orienté vers `CLAUDE.md`, le LLM suit un flux de travail défini :

- **Ingestion** : Lire une source brute, créer un résumé dans `wiki/sources/`, mettre à jour les pages de concepts et d'entités liées, puis consigner le travail dans `index.md` et `log.md`.
- **Requête** : Consulter d'abord le wiki, répondre avec des éléments probants et enregistrer les analyses réutilisables dans `wiki/syntheses/`.
- **Lint** : Examiner régulièrement le wiki pour repérer les contradictions, les contenus obsolètes, les pages orphelines et les concepts clés non promus.

## Structure des Répertoires

Après la génération, le projet ressemble à ceci :

```text
my-wiki/
├── CLAUDE.md              # Règles de fonctionnement pour le LLM
├── AGENTS.md              # Redirige les autres agents vers CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Articles, PDF, notes, transcriptions, etc.
│   └── assets/            # Images, diagrammes, pièces jointes
├── wiki/
│   ├── overview.md        # Thème, objectif, hypothèses
│   ├── index.md           # Index basé sur le contenu
│   ├── log.md             # Journal chronologique de toutes les opérations
│   ├── open-questions.md  # Questions non résolues et pistes de recherche
│   ├── sources/           # Une page de résumé par matériau brut
│   ├── concepts/          # Thèmes récurrents, débats, terminologie
│   ├── entities/          # Personnes, entreprises, produits, organisations
│   ├── syntheses/         # Comparaisons, analyses, conclusions réutilisables
│   └── maintenance/
│       └── lint-reports/  # Rapports de revue périodique
└── templates/             # Références de structure de page pour le LLM
```

## Locales

Ce modèle inclut 14 packs de langue. L'option `--locale` sélectionne la langue de `CLAUDE.md`, des templates, du squelette du wiki et de tous les fichiers README. La valeur par défaut est `en`.
Ce `README.md` à la racine du dépôt documente le modèle lui-même. Les projets générés doivent recevoir le README du pack de langue sélectionné, comme `locales/en/README.md` ou `locales/ja/README.md`.

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

Pour ajouter une nouvelle langue, créez `locales/<code>/` dans le dépôt du modèle avec des versions traduites des 22 fichiers.

## Exemples de Prompts

### Initialisation

```text
Lis CLAUDE.md et comprends l'objectif et les règles de fonctionnement de ce wiki.
Ensuite, vérifie wiki/overview.md et prépare les questions minimales nécessaires pour combler les lacunes.
```

### Ingestion

```text
En suivant CLAUDE.md, traite un matériau non encore ingéré depuis raw/sources/.
Crée un résumé de source, mets à jour concepts / entities / overview si nécessaire,
puis mets à jour index.md et log.md.
```

### Requête

```text
Lis d'abord wiki/index.md, puis consulte les pages liées dans le wiki.
Résume les trois principaux arguments sur ce sujet en indiquant où les preuves sont faibles.
Si le résultat a une valeur de réutilisation, enregistre-le dans syntheses.
```

### Lint

```text
En suivant CLAUDE.md, lance un lint sur l'ensemble du wiki.
Identifie les contradictions, les contenus obsolètes, les pages orphelines, les concepts clés non promus
et les pistes de recherche. Crée un rapport dans wiki/maintenance/lint-reports/,
puis mets à jour index.md et log.md.
```

## Principes Fondamentaux

- `raw/` est en lecture seule pour le LLM ; les humains y déposent les matériaux et le LLM ne les modifie jamais
- `wiki/` est la couche de connaissances que le LLM enrichit ; les résumés et références croisées s'y accumulent
- `index.md` et `log.md` sont mis à jour à chaque opération
- Les résultats de requête à forte valeur sont enregistrés dans `syntheses/` au lieu de rester dans la conversation
- Les lints périodiques détectent les contradictions et les lacunes avant qu'elles ne s'accumulent

## Utilisation avec d'Autres Agents

Les règles de fonctionnement sont définies dans `CLAUDE.md`. Pour les agents qui lisent `AGENTS.md` (comme Codex), ce fichier redirige vers `CLAUDE.md`. Copiez le contenu dans le format de configuration propre à l'agent si nécessaire.
