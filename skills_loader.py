import os
import json
from pathlib import Path

def load_skill(skill_name, base_path=None):
    """
    Loads a skill's content based on its name.
    Supports .md, .json, and .txt as requested.
    """
    if base_path is None:
        # Default to current workspace directory
        base_path = Path("c:/Users/fcaqd/Downloads/skills").resolve()
    else:
        base_path = Path(base_path).resolve()

    # The skill directory is expected to be named exactly as skill_name
    skill_dir = base_path / skill_name
    
    # Extensions as per user request (cleaned up spaces)
    possible_extensions = ['.md', '.json', '.txt']
    
    # 1. Try direct path with extensions
    for ext in possible_extensions:
        # Check inside directory: skill_name/SKILL.md
        skill_file = skill_dir / f"SKILL{ext}"
        if skill_file.exists():
            with open(skill_file, 'r', encoding='utf-8') as f:
                return f.read()
        
        # Check direct file: skill_name.md
        skill_file_direct = base_path / f"{skill_name}{ext}"
        if skill_file_direct.exists():
            with open(skill_file_direct, 'r', encoding='utf-8') as f:
                return f.read()

    # 2. Fallback: check if the name is an ID in skills_index.json
    index_path = base_path / "skills_index.json"
    if index_path.exists():
        with open(index_path, 'r', encoding='utf-8') as f:
            index = json.load(f)
            for entry in index:
                if entry['id'] == skill_name or entry['name'].lower() == skill_name.lower():
                    # Check for SKILL.md in the indexed path
                    target_dir = base_path / entry['path']
                    for ext in possible_extensions:
                        target_file = target_dir / f"SKILL{ext}"
                        if target_file.exists():
                            with open(target_file, 'r', encoding='utf-8') as f:
                                return f.read()

    return f"Error: Skill '{skill_name}' not found in {base_path} or in index."

if __name__ == "__main__":
    # Example usage:
    # print(load_skill("software-engineer"))
    pass
