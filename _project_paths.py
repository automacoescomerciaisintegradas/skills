import os
from pathlib import Path

def find_repo_root(start_path):
    """
    Find the repository root by looking for a marker file/folder (e.g., .git or SKILL.md at the root).
    """
    current_path = Path(start_path).resolve()
    for parent in [current_path] + list(current_path.parents):
        if (parent / ".git").exists() or (parent / "SKILL.md").exists():
            return parent
    return current_path
