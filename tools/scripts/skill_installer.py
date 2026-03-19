#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skill Installer CLI - Deploy skills to any project
Usage: python skill_installer.py <skill_id> [target_dir]
"""

import os
import sys
import shutil
import json
from pathlib import Path

# Paths
SKILLS_ROOT = Path(__file__).parent.parent.parent
INDEX_PATH = SKILLS_ROOT / "skills_index.json"

def install_skill(skill_id, target_path="."):
    if not INDEX_PATH.exists():
        print(f"ERROR: Skill index not found at {INDEX_PATH}")
        return

    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        skills = json.load(f)

    # Find the skill
    skill_data = next((s for s in skills if s['id'] == skill_id), None)
    
    if not skill_data:
        print(f"ERROR: Skill '{skill_id}' not found in the index.")
        print("TIP: Use 'python skill_search.py <keyword>' to find the correct ID.")
        return

    src_dir = SKILLS_ROOT / skill_data['path']
    if not src_dir.exists():
        print(f"ERROR: Skill source directory not found: {src_dir}")
        return

    # Define target
    target_base = Path(target_path) / ".agent" / "skills" / skill_id
    
    try:
        if target_base.exists():
            print(f"WARN: Skill '{skill_id}' already exists at {target_base}. Overwriting...")
            shutil.rmtree(target_base)
        
        os.makedirs(target_base.parent, exist_ok=True)
        shutil.copytree(src_dir, target_base)
        
        print(f"OK: Skill '{skill_id}' installed successfully!")
        print(f"LOCATION: {target_base.absolute()}")
        print(f"INFO: You can now point your agent to this local .agent/skills folder.")
        
    except Exception as e:
        print(f"ERROR: Failed to install skill: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python skill_installer.py <skill_id> [target_dir]")
        sys.exit(1)
    
    sid = sys.argv[1]
    tdir = sys.argv[2] if len(sys.argv) > 2 else "."
    install_skill(sid, tdir)
