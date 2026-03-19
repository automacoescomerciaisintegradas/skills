# Smart Auto-Categorization Guide

## Overview

The skill collection now uses intelligent auto-categorization to eliminate "uncategorized" and organize skills into meaningful categories based on their content.

`tools/scripts/generate_index.py` now classifies skills at index-build time and writes two explainability fields to every record in `skills_index.json`:
- `category_confidence` (numeric confidence score)
- `category_reason` (how the category was selected)

## Current Status

✅ Current repository indexed through the generated catalog
- Most skills are in meaningful categories
- A smaller tail still needs manual review or better keyword coverage
- 13 primary categories
- Categories sorted by skill count (most first)

## Category Distribution (Target)

| Category | Count | Examples |
|----------|-------|----------|
| Backend | 164 | Node.js, Django, Express, FastAPI |
| Web Development | 107 | React, Vue, Tailwind, CSS |
| Automation | 103 | Workflow, Scripting, RPA |
| DevOps | 83 | Docker, Kubernetes, CI/CD, Git |
| AI/ML | 79 | TensorFlow, PyTorch, NLP, LLM |
| Content | 47 | Documentation, SEO, Writing |
| Database | 44 | SQL, MongoDB, PostgreSQL |
| Testing | 38 | Jest, Cypress, Unit Testing |
| Security | 36 | Encryption, Authentication |
| Cloud | 33 | AWS, Azure, GCP |
| Mobile | 21 | React Native, Flutter, iOS |
| Game Dev | 15 | Unity, WebGL, 3D |
| Data Science | 14 | Pandas, NumPy, Analytics |

## How It Works

### 1. **Keyword-Based Analysis**
The system analyzes skill names and descriptions for keywords defined in `tools/scripts/generate_index.py`.

### 2. **Priority System**
Frontmatter category > Detected Keywords > Fallback (uncategorized)

### 3. **Scope-Based Matching**
- Exact phrase matches weighted higher.
- Uses word boundaries to avoid false positives.

## Utility Scripts

### Run on Uncategorized Skills
This script updates the `SKILL.md` files directly.
```bash
python tools/scripts/auto_categorize_skills.py
```

### Build index with explainable auto-categorization
```bash
python tools/scripts/generate_index.py
```

### Preview Changes First (Dry Run)
```bash
python tools/scripts/auto_categorize_skills.py --dry-run
```

---

**Result**: Much cleaner category filter with smart, meaningful organization! 🎉
