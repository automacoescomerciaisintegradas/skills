#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skill Search CLI v4 - Robust Search
Split multi-word query terms, normalized matching, and translation support
"""

import json
import sys
import re
from pathlib import Path

# Paths
ROOT = Path(__file__).parent.parent.parent
INDEX_PATH = ROOT / "skills_index.json"

# Simple mapping for common PT/ES -> EN terms
TRANSLATIONS = {
    "seguranca": "security",
    "segurança": "security",
    "seguridad": "security",
    "programador": "engineer",
    "desenvolvedor": "developer",
    "padroes": "patterns",
    "padrões": "patterns",
    "banco": "database",
    "dados": "data",
    "redes": "network",
    "testes": "test",
    "teste": "test",
    "ferramenta": "tool",
    "ia": "ai"
}

def normalize(text):
    """Lowercases, removes accents, and removes non-alphanumeric chars"""
    text = str(text).lower()
    text = text.replace('ç', 'c').replace('ã', 'a').replace('õ', 'o').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
    # Remove chars that aren't letters, numbers or space
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    return text

def translate_terms(terms):
    translated = []
    for t in terms:
        translated.append(t)
        if t in TRANSLATIONS:
            translated.append(TRANSLATIONS[t])
    return list(set(translated))

def get_query_terms(argv_list):
    """Splits all arguments into a single list of query terms by spaces"""
    full_string = " ".join(argv_list)
    normalized_string = normalize(full_string)
    return normalized_string.split()

def search_skills(raw_input):
    if not INDEX_PATH.exists():
        print(f"ERROR: Index not found at {INDEX_PATH}")
        return

    try:
        with open(INDEX_PATH, 'r', encoding='utf-8') as f:
            skills = json.load(f)
    except Exception as e:
        print(f"ERROR: Failed to read index: {e}")
        return

    # Prepare terms (original normalized inputs)
    query_terms = get_query_terms(raw_input)
    if not query_terms:
        print("Usage: python skill_search.py <term1> <term2> ...")
        return
        
    search_terms = translate_terms(query_terms)

    results = []
    for skill in skills:
        # Build normalized search blob
        skill_blob = f"{skill.get('name', '')} {skill.get('id', '')} {skill.get('description', '')} {skill.get('category', '')}"
        normalized_blob = normalize(skill_blob)
        
        # Scoring: how many query terms (or their translations) matched?
        matched_terms = [t for t in search_terms if t in normalized_blob]
        score = len(matched_terms)
        
        if score > 0:
            # Check if all original query terms are satisfied (either by themselves or their translations)
            satisfied = []
            for q in query_terms:
                if q in normalized_blob or (q in TRANSLATIONS and TRANSLATIONS[q] in normalized_blob):
                    satisfied.append(True)
                else:
                    satisfied.append(False)
            
            is_full_match = all(satisfied)
            results.append({
                "skill": skill,
                "score": score,
                "is_full_match": is_full_match
            })

    # Sort results
    results.sort(key=lambda x: (x['is_full_match'], x['score']), reverse=True)

    if not results:
        print(f"SEARCH: No skills found for: {' '.join(query_terms)}")
    else:
        full_matches = [r for r in results if r['is_full_match']]
        partial_matches = [r for r in results if not r['is_full_match']][:20]

        if full_matches:
            print(f"OK: Found {len(full_matches)} exact matches (satisfied all terms):\n")
            _print_table(full_matches)
        elif partial_matches:
            print(f"INFO: No skill matches ALL your terms.")
            print(f"Showing the {len(partial_matches)} most relevant partial results:\n")
            _print_table(partial_matches)
        
        print(f"\nINFO: To activate, use 'load_skill(\"ID\")' in your agent.")

def _print_table(results_list):
    print(f"{'ID':<40} | {'CATEGORY':<15} | {'NAME'}")
    print("-" * 80)
    for res in results_list:
        s = res['skill']
        sid = s.get('id', 'N/A')
        cat = s.get('category', 'N/A')
        name = s.get('name', sid)
        if len(name) > 30:
            name = name[:27] + "..."
        print(f"{sid:<40} | {cat:<15} | {name}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python skill_search.py <term1> <term2> ...")
        sys.exit(1)
    
    search_skills(sys.argv[1:])
