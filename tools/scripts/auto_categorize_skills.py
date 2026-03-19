import os
import re
import sys
import yaml
# Adjust import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from _project_paths import find_repo_root
from tools.scripts.generate_index import infer_category, parse_frontmatter

def auto_categorize_skills(skills_dir, dry_run=False):
    print(f"🔍 Auto-categorizing skills in: {skills_dir}")
    categorized = 0
    already_categorized = 0
    failed = 0
    total = 0

    for root, dirs, files in os.walk(skills_dir):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        if "SKILL.md" in files:
            total += 1
            skill_path = os.path.join(root, "SKILL.md")
            
            try:
                with open(skill_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"⚠️ Error reading {skill_path}: {e}")
                continue

            metadata = parse_frontmatter(content)
            
            if metadata.get("category") and metadata.get("category") != "uncategorized":
                already_categorized += 1
                continue

            # Inferred category
            dir_name = os.path.basename(root)
            parent_dir = os.path.basename(os.path.dirname(root))
            skill_info = {
                "id": dir_name,
                "category": parent_dir if parent_dir != os.path.basename(skills_dir) else None,
                "name": metadata.get("name", dir_name),
                "description": metadata.get("description", "")
            }
            
            body = content
            fm_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
            if fm_match:
                body = content[fm_match.end():].strip()
            
            inferred_category, confidence, reason = infer_category(skill_info, metadata, body)

            if inferred_category and inferred_category != "uncategorized" and confidence >= 0.3:
                categorized += 1
                if dry_run:
                    print(f"• {dir_name}: [DRY RUN] Would categorize as '{inferred_category}' ({reason})")
                else:
                    print(f"• {dir_name}: Categorized as '{inferred_category}' ({reason})")
                    # Update metadata and write back to file
                    metadata['category'] = inferred_category
                    
                    # Reconstruction of file content with updated frontmatter
                    yaml_content = yaml.dump(metadata, sort_keys=False, allow_unicode=True).strip()
                    new_content = f"---\n{yaml_content}\n---\n\n{body}"
                    
                    with open(skill_path, 'w', encoding='utf-8', newline='\n') as f:
                        f.write(new_content)
            else:
                failed += 1

    print("\n" + "="*70)
    print("AUTO-CATEGORIZATION REPORT")
    print("="*70)
    print(f"Summary:")
    print(f"   ✅ Categorized: {categorized}")
    print(f"   ⏭️  Already categorized: {already_categorized}")
    print(f"   ❌ Failed to categorize: {failed}")
    print(f"   📈 Total processed: {total}")

if __name__ == "__main__":
    base_dir = str(find_repo_root(__file__))
    dry_run = "--dry-run" in sys.argv
    auto_categorize_skills(base_dir, dry_run=dry_run)
