import sys

BUNDLES = {
    "Essentials": [
        "api-security-best-practices", "auth-implementation-patterns", "backend-security-coder",
        "frontend-security-coder", "cc-skill-security-review", "pci-compliance",
        "frontend-design", "react-best-practices", "react-patterns",
        "nextjs-best-practices", "tailwind-patterns", "form-cro",
        "seo-audit", "ui-ux-pro-max", "3d-web-experience",
        "canvas-design", "mobile-design", "scroll-experience",
        "senior-fullstack", "frontend-developer", "backend-dev-guidelines",
        "api-patterns", "database-design", "stripe-integration",
        "agent-evaluation", "langgraph", "mcp-builder",
        "prompt-engineering", "ai-agents-architect", "rag-engineer",
        "llm-app-patterns", "rag-implementation", "prompt-caching",
        "context-window-management", "langfuse", "software-engineer",
        "skill-creator", "software-architecture", "design-principles"
    ],
    "Security": [
        "api-security-best-practices", "auth-implementation-patterns", "backend-security-coder",
        "frontend-security-coder", "cc-skill-security-review", "pci-compliance"
    ],
    "Frontend": [
        "frontend-design", "react-best-practices", "react-patterns",
        "nextjs-best-practices", "tailwind-patterns", "form-cro",
        "seo-audit", "ui-ux-pro-max"
    ]
}

def get_bundle_skills(args):
    if not args:
        # Default to Essentials
        args = ["Essentials"]
        
    result_skills = set()
    for arg in args:
        if arg in BUNDLES:
            result_skills.update(BUNDLES[arg])
        else:
            # Assume it's a direct skill ID if not a bundle name
            result_skills.add(arg)
            
    for skill in sorted(result_skills):
        print(skill)

if __name__ == "__main__":
    get_bundle_skills(sys.argv[1:])
