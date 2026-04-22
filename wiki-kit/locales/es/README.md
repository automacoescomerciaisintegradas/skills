# wiki-kit

Una plantilla de base de conocimiento basada en Markdown diseñada para ser mantenida por un LLM.

En lugar de volver a buscar entre los materiales brutos para cada pregunta, el LLM acumula resúmenes, referencias cruzadas y análisis en `wiki/`, construyendo con el tiempo una capa de conocimiento persistente.

Esta plantilla implementa el flujo de trabajo propuesto en el gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" de karpathy.

## Inicio Rápido

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Luego:

1. Describe lo que quieres investigar en `wiki/overview.md`
2. Coloca los materiales fuente en `raw/sources/`
3. Pídele al LLM que lea `CLAUDE.md` y los ingiera

## Qué Hace el LLM

Una vez que se le indica `CLAUDE.md`, el LLM sigue un flujo de trabajo definido:

- **Ingesta**: Lee una fuente bruta, crea un resumen en `wiki/sources/`, actualiza las páginas relacionadas de conceptos y entidades, y registra el trabajo en `index.md` y `log.md`.
- **Consulta**: Consulta primero el wiki, responde con evidencia y guarda los análisis reutilizables en `wiki/syntheses/`.
- **Lint**: Revisa periódicamente el wiki en busca de contradicciones, contenido obsoleto, páginas huérfanas y conceptos clave aún no promovidos.

## Estructura de Directorios

Después del scaffolding, el proyecto generado se ve así:

```text
my-wiki/
├── CLAUDE.md              # Reglas de operación para el LLM
├── AGENTS.md              # Redirige a otros agentes hacia CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Artículos, PDF, notas, transcripciones, etc.
│   └── assets/            # Imágenes, diagramas, adjuntos
├── wiki/
│   ├── overview.md        # Tema, propósito, hipótesis
│   ├── index.md           # Índice basado en contenido
│   ├── log.md             # Registro cronológico de todas las operaciones
│   ├── open-questions.md  # Preguntas no resueltas y candidatos de investigación
│   ├── sources/           # Una página de resumen por material bruto
│   ├── concepts/          # Temas recurrentes, debates, terminología
│   ├── entities/          # Personas, empresas, productos, organizaciones
│   ├── syntheses/         # Comparaciones, análisis, conclusiones reutilizables
│   └── maintenance/
│       └── lint-reports/  # Informes de revisión periódica
└── templates/             # Referencias de estructura de página para el LLM
```

## Locales

Esta plantilla incluye 14 paquetes de idioma. La opción `--locale` selecciona el idioma de `CLAUDE.md`, las plantillas, el scaffolding del wiki y todos los archivos README. El valor predeterminado es `en`.
Este `README.md` en la raíz del repositorio documenta la plantilla en sí. Los proyectos generados deben recibir el README del locale seleccionado, como `locales/en/README.md` o `locales/ja/README.md`.

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

Para añadir un nuevo locale, crea `locales/<code>/` en el repositorio de la plantilla con versiones traducidas de los 22 archivos.

## Prompts de Ejemplo

### Inicialización

```text
Lee CLAUDE.md y entiende el propósito y las reglas de operación de este wiki.
Luego revisa wiki/overview.md y prepara las preguntas mínimas necesarias para cubrir cualquier vacío.
```

### Ingesta

```text
Siguiendo CLAUDE.md, procesa un material aún no ingerido de raw/sources/.
Crea un resumen de fuente, actualiza concepts / entities / overview según sea necesario,
y luego actualiza index.md y log.md.
```

### Consulta

```text
Lee primero wiki/index.md y luego consulta las páginas relacionadas en el wiki.
Resume los tres argumentos principales sobre este tema, indicando dónde la evidencia es débil.
Si el resultado tiene valor de reutilización, guárdalo en syntheses.
```

### Lint

```text
Siguiendo CLAUDE.md, aplica lint a todo el wiki.
Identifica contradicciones, contenido obsoleto, páginas huérfanas, conceptos clave no promovidos
y candidatos de investigación. Crea un informe en wiki/maintenance/lint-reports/
y luego actualiza index.md y log.md.
```

## Principios Básicos

- `raw/` es de solo lectura para el LLM; los humanos colocan materiales y el LLM nunca los modifica
- `wiki/` es la capa de conocimiento que el LLM hace crecer; allí se acumulan resúmenes y referencias cruzadas
- `index.md` y `log.md` se actualizan con cada operación
- Los resultados de consulta de alto valor se guardan en `syntheses/` en lugar de quedar en la conversación
- Los lints periódicos detectan contradicciones y vacíos antes de que se acumulen

## Uso con Otros Agentes

Las reglas de operación están definidas en `CLAUDE.md`. Para los agentes que leen `AGENTS.md` (como Codex), ese archivo redirige a `CLAUDE.md`. Copia el contenido al formato de configuración del agente si lo necesitas.
