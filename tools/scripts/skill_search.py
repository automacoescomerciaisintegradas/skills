#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skill Search CLI - Fast keyword search for Antigravity Skills
"""

import json
import sys
import os
from pathlib import Path

# Paths
ROOT = Path(__file__).parent.parent.parent
INDEX_PATH = ROOT / "skills_index.json"

def search_skills(query_terms):
    if not INDEX_PATH.exists():
        print(f"❌ Erro: Índice não encontrado em {INDEX_PATH}")
        return

    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        skills = json.load(f)

    results = []
    query_terms = [q.lower() for q in query_terms]

    for skill in skills:
        # Concatenate searchable fields
        search_blob = f"{skill.get('name', '')} {skill.get('id', '')} {skill.get('description', '')} {skill.get('category', '')}".lower()
        
        # All terms must be in the blob (AND logic)
        if all(term in search_blob for term in query_terms):
            results.append(skill)

    if not results:
        print(f"SEARCH: Nenhuma skill encontrada para: {' '.join(query_terms)}")
    else:
        print(f"OK: Encontradas {len(results)} skills:\n")
        print(f"{'ID':<40} | {'CATEGORIA':<15} | {'NOME'}")
        print("-" * 80)
        for s in results:
            # Handle possible missing keys
            sid = s.get('id', 'N/A')
            cat = s.get('category', 'N/A')
            name = s.get('name', sid)
            print(f"{sid:<40} | {cat:<15} | {name}")
        
        print(f"\nINFO: Use 'load_skill(\"ID\")' no seu agente para ativar.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python skill_search.py <termo1> <termo2> ...")
        sys.exit(1)
    
    search_skills(sys.argv[1:])
