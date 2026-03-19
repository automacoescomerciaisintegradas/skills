import os
import json
import re
import sys
import yaml
import datetime
from pathlib import Path
# Adjust import path since script is in tools/scripts/
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from _project_paths import find_repo_root

# Ensure UTF-8 output for Windows compatibility
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

CATEGORY_KEYWORDS = {
    "backend": [
        "nodejs", "node.js", "express", "fastapi", "django", "flask", "spring", 
        "java", "python", "golang", "rust", "server", "api", "rest", "graphql", 
        "database", "sql", "mongodb"
    ],
    "web-development": [
        "react", "vue", "angular", "html", "css", "javascript", "typescript", 
        "frontend", "tailwind", "bootstrap", "webpack", "vite", "pwa", 
        "responsive", "seo"
    ],
    "database": [
        "database", "sql", "postgres", "mysql", "mongodb", "firestore", 
        "redis", "orm", "schema"
    ],
    "ai-ml": [
        "ai", "machine learning", "ml", "tensorflow", "pytorch", "nlp", 
        "llm", "gpt", "transformer", "embedding", "training"
    ],
    "devops": [
        "docker", "kubernetes", "ci/cd", "git", "jenkins", "terraform", 
        "ansible", "deploy", "container", "monitoring"
    ],
    "cloud": [
        "aws", "azure", "gcp", "serverless", "lambda", "storage", "cdn"
    ],
    "security": [
        "encryption", "cryptography", "jwt", "oauth", "authentication", 
        "authorization", "vulnerability"
    ],
    "testing": [
        "test", "jest", "mocha", "pytest", "cypress", "selenium", 
        "unit test", "e2e"
    ],
    "mobile": [
        "mobile", "react native", "flutter", "ios", "android", "swift", "kotlin"
    ],
    "automation": [
        "automation", "workflow", "scripting", "robot", "trigger", "integration"
    ],
    "game-development": [
        "game", "unity", "unreal", "godot", "threejs", "2d", "3d", "physics"
    ],
    "data-science": [
        "data", "analytics", "pandas", "numpy", "statistics", "visualization"
    ],
    "content": [
        "documentation", "seo", "writing", "blog", "article", "content"
    ]
}

STOPWORD_TOKENS = {
    "skill", "skills", "tool", "tools", "builder", "expert", "guide", "workflow",
    "workflows", "system", "systems", "analysis", "integration", "development",
    "testing", "management", "engineer", "engineering", "automation", "framework",
    "advanced", "modern", "official", "pro", "expert", "starter", "setup", "patterns",
    "using", "with", "for", "and", "the", "a", "an", "v2", "v3", "ts", "py", "dotnet",
}

def normalize_category(value):
    """Normalize category values to lowercase kebab-case."""
    if value is None:
        return None
    text = str(value).strip().lower()
    if not text:
        return None
    text = text.replace("_", "-")
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"[^a-z0-9-]", "", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text or None

def infer_dynamic_category(skill_id):
    """Infer a category dynamically from skill id tokens."""
    raw_tokens = [
        token for token in re.split(r"[^a-z0-9]+", skill_id.lower()) if token
    ]
    tokens = [token for token in raw_tokens if token not in STOPWORD_TOKENS and len(token) >= 3]

    if len(tokens) >= 2 and tokens[0] in {
        "azure", "aws", "google", "github", "gitlab", "slack", "discord", "shopify",
        "wordpress", "odoo", "notion", "expo", "react", "nextjs", "kubernetes",
    }:
        category = normalize_category(f"{tokens[0]}-{tokens[1]}")
        if category:
            return category, 0.42, f"derived-from-id-prefix:{tokens[0]}-{tokens[1]}"

    if tokens:
        category = normalize_category(tokens[-1])
        if category:
            return category, 0.34, f"derived-from-id-token:{tokens[-1]}"

    return "general", 0.20, "fallback:general"

def infer_category(skill_info, metadata, body_text):
    """Infer category, confidence, and reason with deterministic priority rules."""
    explicit_category = normalize_category(metadata.get("category"))
    parent_category = normalize_category(skill_info.get("category"))

    if explicit_category and explicit_category != "uncategorized":
        return explicit_category, 1.0, "frontmatter:category"

    if parent_category and parent_category != "uncategorized":
        return parent_category, 0.95, "path:folder"

    combined_text = " ".join(
        [
            str(skill_info.get("id", "")),
            str(skill_info.get("name", "")),
            str(skill_info.get("description", "")),
            body_text,
        ]
    ).lower()

    best_category = None
    best_score = 0
    best_hits = []

    for category, keywords in CATEGORY_KEYWORDS.items():
        score = 0
        hits = []
        for keyword in keywords:
            if re.search(r"\b" + re.escape(keyword) + r"\b", combined_text):
                score += 3
                hits.append(keyword)
            elif len(keyword) >= 5 and keyword in combined_text:
                score += 1
                hits.append(keyword)

        if score > best_score:
            best_category = category
            best_score = score
            best_hits = hits

    if best_category and best_score > 0:
        confidence = min(0.92, 0.45 + (0.05 * best_score))
        reason_hits = ",".join(best_hits[:3]) if best_hits else "keyword-match"
        return best_category, round(confidence, 2), f"keyword-match:{reason_hits}"

    return infer_dynamic_category(str(skill_info.get("id", "")))

def parse_frontmatter(content):
    """Parses YAML frontmatter, sanitizing unquoted values containing @."""
    fm_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not fm_match:
        return {}
    
    yaml_text = fm_match.group(1)
    sanitized_lines = []
    for line in yaml_text.splitlines():
        match = re.match(r'^(\s*[\w-]+):\s*(.*)$', line)
        if match:
            key, val = match.groups()
            val_s = val.strip()
            if '@' in val_s and not (val_s.startswith('"') or val_s.startswith("'")):
                safe_val = val_s.replace('"', '\\"')
                line = f'{key}: "{safe_val}"'
        sanitized_lines.append(line)
    
    sanitized_yaml = '\n'.join(sanitized_lines)
    try:
        return yaml.safe_load(sanitized_yaml) or {}
    except yaml.YAMLError as e:
        print(f"⚠️ YAML parsing error: {e}")
        return {}

def generate_index(skills_dir, output_file):
    print(f"🏗️ Generating index from: {skills_dir}")
    skills = []

    for root, dirs, files in os.walk(skills_dir):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        if "SKILL.md" in files:
            skill_path = os.path.join(root, "SKILL.md")
            dir_name = os.path.basename(root)
            parent_dir = os.path.basename(os.path.dirname(root))
            
            rel_path = os.path.relpath(root, skills_dir)
            skill_info = {
                "id": dir_name,
                "path": rel_path.replace(os.sep, '/'),
                "category": parent_dir if parent_dir != os.path.basename(skills_dir) else None,
                "category_confidence": None,
                "category_reason": None,
                "name": dir_name.replace("-", " ").title(),
                "description": "",
                "risk": "unknown",
                "source": "unknown",
                "date_added": None
            }
            
            try:
                with open(skill_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"⚠️ Error reading {skill_path}: {e}")
                continue

            metadata = parse_frontmatter(content)
            body = content
            fm_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
            if fm_match:
                body = content[fm_match.end():].strip()
            
            if "name" in metadata: skill_info["name"] = metadata["name"]
            if "description" in metadata: skill_info["description"] = metadata["description"]
            if "risk" in metadata: skill_info["risk"] = metadata["risk"]
            if "source" in metadata: skill_info["source"] = metadata["source"]
            if "date_added" in metadata: skill_info["date_added"] = metadata["date_added"]
            
            inferred_category, confidence, reason = infer_category(skill_info, metadata, body)
            skill_info["category"] = inferred_category or "uncategorized"
            skill_info["category_confidence"] = confidence
            skill_info["category_reason"] = reason
            
            if not skill_info["description"]:
                lines = body.split('\n')
                desc_lines = []
                for line in lines:
                    if line.startswith('#') or not line.strip():
                        if desc_lines: break
                        continue
                    desc_lines.append(line.strip())
                if desc_lines:
                    skill_info["description"] = " ".join(desc_lines)[:250].strip()

            skills.append(skill_info)

    # Helper for JSON serialization of date objects
    def datetime_handler(x):
        if isinstance(x, (datetime.date, datetime.datetime)):
            return x.isoformat()
        raise TypeError("Unknown type")

    # Generate JSON index
    with open(output_file, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(skills, f, indent=2, default=datetime_handler)
    
    # Generate TXT index as requested by user
    txt_output = output_file.replace(".json", ".txt")
    with open(txt_output, 'w', encoding='utf-8', newline='\n') as f:
        f.write("=== ANTIGRAVITY SKILLS INDEX ===\n")
        f.write("© Automações Comerciais Integradas! 2026\n\n")
        for s in skills:
            f.write(f"ID: {s['id']}\n")
            f.write(f"Name: {s['name']}\n")
            f.write(f"Category: {s['category']}\n")
            f.write(f"Description: {s['description'][:100]}...\n")
            f.write("-" * 30 + "\n")

    print(f"✅ Generated rich index with {len(skills)} skills at: {output_file}")
    print(f"📄 Generated text index at: {txt_output}")
    return skills

if __name__ == "__main__":
    base_dir = str(find_repo_root(__file__))
    # Adjust paths based on new script location
    skills_path = base_dir
    output_path = os.path.join(base_dir, "skills_index.json")
    generate_index(skills_path, output_path)
