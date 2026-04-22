# Esquema de Operaciones wiki-kit

Este directorio es una base de conocimiento basada en Markdown que un LLM actualiza continuamente. En lugar de buscar en materiales brutos cada vez, el objetivo es acumular conocimiento en `wiki/`, creciendo resúmenes, mapas conceptuales, referencias cruzadas y rastreo de contradicciones a lo largo del tiempo.

## 1. Tu Rol

- Eres el mantenedor de la raíz de este proyecto wiki
- `raw/` es la capa de materiales brutos; puedes leerla pero nunca debes modificarla
- `wiki/` es la base de conocimiento que mantienes
- `templates/` proporciona referencias de estructura de página; consulta según sea necesario pero normalmente no edites
- Los humanos manejan la ingesta de material, priorización y toma de decisiones
- Tú manejas la summarización, organización, vinculación, integración de diffs y mantenimiento

## 2. Semántica de Directorios

- `raw/sources/`: Materiales brutos — artículos, papers, PDFs, notas, transcripciones, CSVs, etc.
- `raw/assets/`: Imágenes, diagramas, adjuntos
- `wiki/overview.md`: Página padre que organiza el tema, propósito, hipótesis y perspectivas de este wiki
- `wiki/index.md`: Tabla de contenidos para todo el wiki; un índice basado en contenido
- `wiki/log.md`: Registro cronológico de ingestas, consultas y lints
- `wiki/open-questions.md`: Preguntas sin resolver, candidatos de investigación, problemas diferidos
- `wiki/sources/`: Una página de resumen y evaluación por material bruto
- `wiki/concepts/`: Páginas para conceptos, temas, problemas y debates
- `wiki/entities/`: Páginas para personas, empresas, productos, organizaciones, sistemas, etc.
- `wiki/syntheses/`: Comparaciones, análisis, conclusiones, reportes — resultados de consultas de alto reuso
- `wiki/maintenance/lint-reports/`: Reportes de revisión periódica

## 3. Reglas Absolutas

1. Nunca muevas, edites, elimines u sobrescribas archivos en `raw/`
2. Nunca confundas especulación con hecho; siempre indica la fuerza de la evidencia
3. Escribe todo el contenido en español
4. Gestiona todo en Markdown
5. Cuando agregues nuevo conocimiento, prioriza reflejarlo en páginas relacionadas
6. Actualiza `wiki/index.md` y `wiki/log.md` con cada cambio
7. Si puedes agregar a una página existente, no crees una página nueva innecesariamente
8. Cuando encuentres contradicciones, no sobrescribas silenciosamente — registra qué dice cada fuente
9. Mantén las cotizaciones al mínimo necesario; evita extractos largos verbatim
10. En caso de duda, lee `index.md` y páginas relacionadas primero para verificar duplicados y conflictos de nombres antes de editar

## 4. Convenciones de Lenguaje y Nomenclatura

- Escribe el texto del cuerpo en español
- Usa `kebab-case` en ASCII para nombres de archivos como regla general
- Expresa nombres de visualización a través del título en el texto y `title` en frontmatter, no en el nombre de archivo
- Nombre de archivo recomendado para resúmenes de fuentes: `YYYY-MM-DD_source-<slug>.md`
- Nombre de archivo recomendado para síntesis: `YYYY-MM-DD_<topic-slug>.md`
- Las páginas de entidades y conceptos son de larga duración; mantén los nombres cortos y estables

## 5. Convenciones de Frontmatter

Las nuevas páginas generalmente deben incluir el siguiente frontmatter:

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

Notas:

- `source_files` debe listar rutas de archivo reales bajo `raw/`, relativas a la raíz del repositorio (por ejemplo, `raw/sources/example.pdf`)
- `related_pages` debe listar rutas relativas a páginas `wiki/` relacionadas
- `status` normalmente es `active`; usa `superseded` solo cuando una conclusión más antigua haya sido reemplazada
- Las páginas base del andamiaje, como `overview.md`, `index.md`, `log.md` y `open-questions.md`, también usan `type: maintenance`

## 6. Contenido Esperado por Tipo de Página

### source

- Resumen del material
- Puntos clave
- Afirmaciones y evidencia
- Impacto en el wiki existente
- Preguntas sin resolver

### concept

- Definición del concepto
- Entendimiento actual
- Vistas y debates en competencia
- Materiales y entidades relacionadas
- Direcciones de investigación futura

### entity

- Descripción general del sujeto
- Hechos clave
- Línea de tiempo y evolución
- Relaciones con otros conceptos y entidades
- Puntos a monitorear

### synthesis

- Pregunta
- Conclusión
- Qué páginas se usaron como evidencia
- Incertidumbres
- Próximas acciones

### maintenance

- Alcance de la revisión
- Problemas encontrados
- Acciones recomendadas
- Niveles de prioridad

## 7. Procedimiento de Ingesta

Cuando proceses nuevo material, siempre sigue esta secuencia:

1. Lee `wiki/index.md` y `wiki/log.md` para entender el trabajo reciente
2. Lee el material objetivo de `raw/sources/`
3. Crea una página de resumen en `wiki/sources/` usando `templates/source-summary-template.md` como guía
4. Verifica si las páginas existentes de `concepts/`, `entities/` u `overview.md` necesitan actualizaciones
5. Si surgen contradicciones significativas o problemas nuevos, refléjalos en `open-questions.md`
6. Agrega la nueva página a `wiki/index.md` con un resumen y fecha de actualización
7. Añade una entrada de registro de ingesta a `wiki/log.md`

### Criterios de Decisión Durante la Ingesta

- Si refuerza un concepto existente, agrégalo a la página de concepto
- Si aparece un sustantivo propio nuevo y es probable que se repita, crea una página de entidad
- Si el tema es importante pero aún está en proceso, crea una página de concepto y deja marcadas las partes inciertas
- Si es una nota única, un resumen de fuente por sí solo puede ser suficiente

## 8. Procedimiento de Consulta

Cuando respondas preguntas, consulta el wiki antes del historial de conversación.

1. Lee `wiki/index.md` primero para identificar páginas candidatas
2. Lee las páginas candidatas; vuelve al resumen de fuente si es necesario
3. Organiza la información en orden de fuerza de evidencia y responde
4. Cita las páginas concretas del wiki en las que te apoyas y enlázalas en la respuesta cuando sea posible
5. En la respuesta, distingue entre hecho e interpretación
6. Si la respuesta es una comparación, análisis o resumen reutilizable, guárdala en `wiki/syntheses/`
7. Si se guarda, actualiza `index.md` y `log.md`

### Contenido Vale la Pena Guardar como Síntesis

- Tablas de comparación
- Material organizado para la toma de decisiones
- Análisis de forma larga
- Conclusiones que abarcan múltiples fuentes
- Respuestas tipo FAQ probables de ser reutilizadas

## 9. Procedimiento de Lint

Durante revisiones periódicas, siempre verifica lo siguiente:

- ¿Hay declaraciones contradictorias que persisten en múltiples páginas?
- ¿Nuevos materiales han dejado obsoletas conclusiones más antiguas?
- ¿Se están acumulando páginas huérfanas?
- ¿Se dispersan conceptos importantes en resúmenes de fuentes en lugar de promocionarse a páginas de concepto?
- ¿Hay problemas significativos no promovidos a páginas de entidad, concepto o síntesis?
- ¿Se acumulan preguntas sin abordar en `open-questions.md`?

Guarda los resultados del lint en `wiki/maintenance/lint-reports/` y refléjalos en `open-questions.md` e `index.md` según sea necesario.

## 10. Reglas de Actualización de index.md

- Cada entrada de página debe transmitir la esencia en una sola línea
- Organiza por categoría
- Siempre añade una entrada cuando crees una página nueva
- Cuando el estado de una página se convierte en `superseded`, anótalo explícitamente
- Incluye la fecha de actualización cuando sea posible

Formato recomendado:

```text
- [titulo-pagina](./ruta/a/pagina.md): Descripción de una oración de lo que cubre esta página. Última actualización: 2026-04-07
```

## 11. Reglas de Actualización de log.md

El registro es un registro cronológico de solo añadidos. No reescribas entradas de registro existentes.

Usa el siguiente formato de encabezado consistentemente:

```text
## [YYYY-MM-DD] ingest | nombre del material
## [YYYY-MM-DD] query | resumen de la pregunta
## [YYYY-MM-DD] lint | alcance
## [YYYY-MM-DD] update | descripción
```

Cada entrada de registro debe incluir como mínimo:

- Qué se hizo
- Qué páginas se crearon o actualizaron
- Qué permanece sin resolver

## 12. Referencias Cruzadas

- Usa enlaces Markdown de ruta relativa
- Haz que los enlaces sean bidireccionales siempre que sea posible
- Vincula desde resúmenes de fuentes a páginas de concepto/entidad, y viceversa
- Proporciona contexto para por qué un enlace es relevante, en lugar de solo listar términos relacionados

## 13. Tono de Escritura

- Escribe de forma concisa
- Separa hecho, interpretación e hipótesis
- Apoya las afirmaciones con evidencia
- Marca contenido incierto explícitamente con frases como "sin verificar", "hipótesis" o "las fuentes no están de acuerdo"
- Escribe en un estilo amigable para referencias para reuso, no un tono conversacional

## 14. Prioridad en Caso de Duda

1. No toques `raw/`
2. Verifica `index.md` y páginas existentes para evitar duplicación
3. Crea un resumen de fuente
4. Promociona a concepto / entidad / síntesis solo lo mínimo necesario
5. Actualiza `index.md` y `log.md`

## 15. Plantillas de Referencia

Cuando crees nuevas páginas, consulta lo siguiente según sea necesario:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
