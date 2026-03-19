import json
import os
from skills_loader import load_skill

def run_agent(query):
    """
    Main agent orchestration flow:
    1. Receive query
    2. Identify relevant skill from index
    3. Load skill instructions into context
    4. Respond using the in-context skill
    """
    print(f"DEBUG: Processing query: '{query}'")
    
    # Load index
    try:
        with open('skills_index.json', 'r', encoding='utf-8') as f:
            skills_index = json.load(f)
    except FileNotFoundError:
        print("ERROR: skills_index.json not found. Run generate_index.py first.")
        return

    # Precise identification logic
    matched_skill = None
    query_words = set(query_lower.split())
    
    for skill in skills_index:
        # Check if ID or Name precisely contains any of the query's important words
        search_terms = set(re.split(r'[^a-zA-Z0-9]+', (f"{skill['id']} {skill['name']}").lower()))
        if query_words & search_terms:
            matched_skill = skill['id']
            break
            
    if matched_skill:
        print(f"OK: Skill '{matched_skill}' identified.")
        # Load instruction set
        instructions = load_skill(matched_skill)
        print(f"SYSTEM: Instructions loaded ({len(instructions)} chars). Ready to execute.")
        
        # In a real scenario, these instructions would be passed to the LLM system prompt.
        # For this demonstration, we just return a success message.
        return {
            "status": "success",
            "skill_used": matched_skill,
            "instruction_summary": instructions[:100] + "..."
        }
    else:
        print("WARN: No specific skill matched the query.")
        return {"status": "fallback", "message": "Proceeding with general knowledge."}

if __name__ == "__main__":
    # Example 1: Commit standards
    print("\n--- TEST 1: Commit Standards ---")
    result = run_agent("Como devo formatar minhas mensagens de commit?")
    print(json.dumps(result, indent=2))

    # Example 2: Token optimization
    print("\n--- TEST 2: Token Optimization ---")
    result = run_agent("Me ajude a economizar tokens nas chamadas de API")
    print(json.dumps(result, indent=2))
