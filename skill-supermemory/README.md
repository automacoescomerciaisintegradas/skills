# Skill Supermemory

Skill de memória inteligente baseada no Supermemory.ai.

## Instalação

```bash
npm install supermemory
```

## Uso

```js
import { searchSupermemory } from "./skill.js";

const userMessage = "Qual foi minha última preferência alimentar?";
const containerTag = "meu-container";

searchSupermemory(userMessage, containerTag).then(context => {
  console.log(context);
});
```

## Configuração
- Defina o `containerTag` do seu projeto Supermemory.
- Consulte a documentação oficial para mais opções de configuração.

## Links úteis
- [Documentação Supermemory](https://supermemory.ai/docs/intro)
- [Repositório de skills](https://github.com/automacoescomerciaisintegradas/skills)
