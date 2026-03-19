import json
from skills_loader import load_skill

def agent_flow(user_query):
    print(f"User: {user_query}")
    
    # Step 1: Search the index for a matching skill
    with open('skills_index.json', 'r', encoding='utf-8') as f:
        index = json.load(f)
    
    matched_skill = None
    # Simple keyword match for demonstration
    for skill in index:
        if any(keyword in user_query.lower() for keyword in skill['id'].split('-')):
            matched_skill = skill['id']
            break
            
    if matched_skill:
        print(f"System: Identified skill '{matched_skill}'. Loading instructions...")
        # Step 2: MANDATORY load_skill before responding
        instructions = load_skill(matched_skill)
        print(f"--- Instructions Loaded (Length: {len(instructions)}) ---")
        # Proceed with response using loaded instructions...
        return f"Respondi ao usuário usando a skill '{matched_skill}' carregada."
    else:
        return "Nenhuma skill específica encontrada para este pedido."

if __name__ == "__main__":
    # Example usage
    query = "Como posso melhorar a qualidade do meu código TypeScript?"
    response = agent_flow(query)
    print(response)
