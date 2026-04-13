---
name: openapi-generator
description: Generates OpenAPI 3.0 specifications from TypeScript interfaces
version: 1.0.0
author: Claude Skills Creator
mcp:
  transport: stdio
tools:
  generate-from-file:
    description: Generate OpenAPI spec from TypeScript file
    parameters:
      filePath:
        type: string
        description: Path to TypeScript file containing interfaces
        required: true
      includeExamples:
        type: boolean
        description: Include example values in schema
        default: true
  generate-from-code:
    description: Generate OpenAPI spec from raw TypeScript code
    parameters:
      code:
        type: string
        description: TypeScript interface definitions as string
        required: true
      title:
        type: string
        description: API title for the OpenAPI spec
        default: "Generated API"
---

# OpenAPI Generator Skill

This skill transforms TypeScript interfaces into OpenAPI 3.0 specifications.

## Usage Examples

### From File
```typescript
// Input: ~/project/src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// Claude: Use openapi-generator with filePath "~/project/src/types.ts"
// Output: OpenAPI spec with User schema
```

### Do Código
// Claude: Use openapi-generator with code "export interface Product {...}" and title "Product API"

## Formato de Retorno
A ferramenta retorna uma string YAML contendo:
- openapi: "3.0.0"
- info: Título, versão, descrição
- paths: Caminhos CRUD gerados automaticamente
- components.schemas: Interfaces TypeScript como esquemas
