import os
import requests
from dotenv import load_dotenv
import sys

# Adicionar o diretório de scripts ao path para importar utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.utils.meta_logger import logger as meta_logger

def publish_facebook_post():
    load_dotenv("c:/antigravity/skills/.env")
    
    # Detalhes da Pagina ACI
    page_id = "683438541527720"
    token = "EAA0ZCSdRLI3EBRObS3HlWivEH9YCLGuqTHab9hIdw7PLlPH8oDsJMuVfurtissOmvQsDzF851ZCsd6O19Iu1cgZAqPH82QJ54gNZBqWybSS4PYS3Wm3upQlVTmCgvAYBtkZCSKxTvX6pl29MU1jAhKeS5zNkCkfE8nBibZBKUq0ZCsPJaVwSqTZAxG7mmyWZC4ZAgI4h5U"
    image_path = r"C:\Users\autom\.gemini\antigravity\brain\2d4ce09f-3970-428f-8a24-f5b0879baf35\antigravity_vs_claudecode_hero_1776126015588.png"
    
    # Conteúdo extraído do rascunho aprovado
    message = (
        "🚀 O FIM DOS PLACEHOLDERS: Por que o Antigravity é a Elite do Coding?\n\n"
        "Você já se sentiu como um 'copiador e colador' de luxo enquanto usa IAs tradicionais? 😴\n\n"
        "A maioria das ferramentas é incrível para sugerir código. Mas quem acaba tendo que lidar com o erro no terminal? VOCÊ.\n\n"
        "O Antigravity é diferente. Ele assume o controle:\n"
        "1. Executa comandos reais no seu sistema.\n"
        "2. Debuga falhas em tempo real.\n"
        "3. Cria ativos reais em vez de placeholders.\n"
        "4. Aplica Design Cinematográfico (ACI) nativamente.\n"
        "5. Orquestra workflows complexos de ponta a ponta.\n\n"
        "Quer ver o Antigravity construir o seu próximo projeto do zero? Comente 'ELITE' abaixo.\n\n"
        "#Antigravity #Cleudocode #AIInnovation #SoftwareArchitecture"
    )

    url = f"https://graph.facebook.com/v19.0/{page_id}/photos"
    
    params = {
        'access_token': token,
        'caption': message
    }
    
    files = {
        'source': open(image_path, 'rb')
    }

    print(f"[FACEBOOK] Publicando imagem e legenda na página {page_id}...")
    
    try:
        response = requests.post(url, params=params, files=files)
        meta_logger.log_api_call("POST (FB PHOTO)", url, params=params, response=response)
        
        if response.status_code == 200:
            print("[OK] Post publicado com sucesso no Facebook!")
            print(f"--- Post ID: {response.json().get('id')}")
        else:
            print(f"[ERRO] Falha ao publicar: {response.json()}")
            
    except Exception as e:
        print(f"!!! Erro no deploy: {str(e)}")

if __name__ == "__main__":
    publish_facebook_post()
