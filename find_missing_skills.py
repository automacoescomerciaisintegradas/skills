import json
import os
from pathlib import Path

root = Path(r"c:\Users\fcaqd\Downloads\skills")
index_path = root / "skills_index.json"

with open(index_path, 'r', encoding='utf-8') as f:
    index = json.load(f)

indexed_dirs = set(skill['id'] for skill in index['skills'])

# Find folders with SKILL.md
all_skill_dirs = []
for item in root.iterdir():
    if item.is_dir() and (item / "SKILL.md").exists():
        all_skill_dirs.append(item.name)

new_skills = [d for d in all_skill_dirs if d not in indexed_dirs]
print(f"Total directories with SKILL.md: {len(all_skill_dirs)}")
print(f"Total indexed skills: {len(indexed_dirs)}")
print(f"New skills found: {new_skills}")
