#!/usr/bin/env python3
"""Build marketplace artifacts from Claude Code system prompts snapshot."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROMPTS_DIR = ROOT / "system-prompts"
MARKETPLACE_DIR = ROOT / "marketplace"
JSON_OUT = MARKETPLACE_DIR / "prompts.json"
MD_OUT = MARKETPLACE_DIR / "all-prompts.md"


CATEGORY_PREFIXES = (
    "agent-prompt-",
    "data-",
    "system-prompt-",
    "system-reminder-",
    "tool-description-",
    "tool-parameter-",
    "skill-",
)


def detect_category(name: str) -> str:
    for prefix in CATEGORY_PREFIXES:
        if name.startswith(prefix):
            return prefix.rstrip("-")
    return "other"


def to_title(name: str) -> str:
    stem = name.rsplit(".", 1)[0]
    for prefix in CATEGORY_PREFIXES:
        if stem.startswith(prefix):
            stem = stem[len(prefix) :]
            break
    return stem.replace("-", " ").strip().title()


def token_count_from_content(text: str) -> int | None:
    # Optional heuristic when source embeds "(123 tks)" text.
    match = re.search(r"\((\d+)\s*tks?\)", text, flags=re.IGNORECASE)
    return int(match.group(1)) if match else None


def main() -> None:
    if not PROMPTS_DIR.exists():
        raise SystemExit(f"Missing prompts directory: {PROMPTS_DIR}")

    MARKETPLACE_DIR.mkdir(parents=True, exist_ok=True)

    prompts = []
    for file_path in sorted(PROMPTS_DIR.glob("*.md")):
        content = file_path.read_text(encoding="utf-8")
        rel = file_path.relative_to(ROOT).as_posix()
        prompts.append(
            {
                "file": file_path.name,
                "title": to_title(file_path.name),
                "category": detect_category(file_path.name),
                "tokens": token_count_from_content(content),
                "path": rel,
                "size_bytes": file_path.stat().st_size,
            }
        )

    categories = {}
    for item in prompts:
        categories[item["category"]] = categories.get(item["category"], 0) + 1

    payload = {
        "name": "claude-code-system-prompts",
        "source": "Piebald-AI/claude-code-system-prompts",
        "generated_at": __import__("datetime").datetime.utcnow()
        .replace(microsecond=0)
        .isoformat()
        + "Z",
        "total_prompts": len(prompts),
        "categories": categories,
        "prompts": prompts,
    }
    JSON_OUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    lines = [
        "# Claude Code System Prompts - Concatenado",
        "",
        f"Total de prompts: **{len(prompts)}**",
        "",
        "Fonte: `Piebald-AI/claude-code-system-prompts`",
        "",
    ]
    for item in prompts:
        file_path = ROOT / item["path"]
        content = file_path.read_text(encoding="utf-8").strip()
        lines.append(f"## {item['file']}")
        lines.append("")
        lines.append(f"- Categoria: `{item['category']}`")
        lines.append(f"- Caminho: `{item['path']}`")
        lines.append("")
        lines.append("```text")
        lines.append(content)
        lines.append("```")
        lines.append("")
    MD_OUT.write_text("\n".join(lines), encoding="utf-8")

    print(
        f"Generated {JSON_OUT.relative_to(ROOT)} and {MD_OUT.relative_to(ROOT)} "
        f"with {len(prompts)} prompts."
    )


if __name__ == "__main__":
    main()

