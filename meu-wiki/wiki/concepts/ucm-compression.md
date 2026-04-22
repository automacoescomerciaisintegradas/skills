---
title: "Ultra-Condensed Markdown (UCM)"
type: concept
status: active
created: 2026-04-22
updated: 2026-04-22
tags: ["optimization", "tokens", "markdown", "architecture"]
source_files:
  - ../sources/2026-04-22_source-token-reduction-report.md
related_pages:
  - ../index.md
---

# Conceito: Ultra-Condensed Markdown (UCM)

**Ultra-Condensed Markdown (UCM)** é uma técnica de estruturação de documentos markdown projetada especificamente para otimizar o consumo de tokens por agentes de IA. 

## Princípios
1. **Densidade de Informação**: Substitui listas longas e descritivas por listas compactas separadas por vírgulas ou ponto-e-vírgula.
2. **Abreviação Semântica**: Utiliza cabeçalhos curtos (ex: `## Setup` em vez de `## Como configurar este ambiente`).
3. **Foco Operacional**: Prioriza comandos executáveis e parâmetros técnicos em detrimento de explicações teóricas.
4. **Remoção de Redundância**: Consolida múltiplos checklists em um único bloco de validação final.
5. **Otimização de Tabelas**: Remove colunas de "Descrição" ou "Notas" quando a informação pode ser inferida do nome ou do comando.

## Aplicação no Projeto Antigravity
No projeto Antigravity, o UCM foi aplicado às `skills` para garantir que o assistente tenha a maior janela de contexto possível para execução de tarefas, sem perder as regras de design e comandos essenciais.

## Resultados
A aplicação resultou em uma redução média de 70-90% no tamanho dos arquivos de skill, mantendo a integridade funcional do sistema.
