import os
import requests
import json
import time
import sys
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env na raiz
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))

# Adicionar o diretório de scripts ao path para importar utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.utils.meta_logger import logger as meta_logger

class MetaAdsManager:
    def __init__(self, access_token, ad_account_id):
        self.access_token = access_token
        self.ad_account_id = ad_account_id if ad_account_id.startswith('act_') else f"act_{ad_account_id}"
        self.base_url = "https://graph.facebook.com/v19.0"
        self.ai_worker_url = "https://auto.automacoescomerciais.com/generate-copy" # Referência do Wiki

    def ai_generate_copy(self, context_data):
        """
        Gera copy otimizada utilizando princípios de Prompt Engineering e Ollama Local.
        """
        model = os.getenv('MODEL_NAME', 'gemma4:e2b')
        url = f"{os.getenv('ANTHROPIC_BASE_URL', 'http://localhost:11434')}/api/chat"
        
        system_instruction = "Você é um Copywriter Sênior especializado em Meta Ads. Gere uma resposta estritamente em JSON."
        prompt = f"Gere uma copy para Meta Ads sobre: {context_data}. Público: Empreendedores. Retorne no formato JSON: {{\"primary_text\": \"...\", \"headline\": \"...\", \"description\": \"...\", \"reasoning\": \"...\"}}"

        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": prompt}
            ],
            "stream": False,
            "format": "json"
        }

        print(f"[AI AGENT] Solicitando copy local ao modelo {model}...")
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            # O Ollama retorna a resposta em ['message']['content']
            content = result['message']['content']
            return json.loads(content)
        except Exception as e:
            print(f"[AVISO] Falha na IA local: {e}. Usando fallback.")
            return {
                "primary_text": f"🚀 Escala de {context_data} via Social Flow.",
                "headline": "Escale com Automação",
                "description": "Soluções personalizadas agora.",
                "reasoning": "Fallback devido a erro na API local."
            }

    def upload_image(self, file_path):
        """Faz upload de uma imagem e retorna o hash."""
        if not os.path.exists(file_path):
            print(f"[AVISO] Arquivo {file_path} não encontrado. Usando imagem padrão.")
            return "IMAGE_HASH_PLACEHOLDER"
            
        url = f"{self.base_url}/{self.ad_account_id}/adimages"
        with open(file_path, 'rb') as f:
            files = {'filename': f}
            params = {'access_token': self.access_token}
            
            print(f"[UPLOAD] Enviando imagem: {file_path}")
            response = requests.post(url, params=params, files=files)
            meta_logger.log_api_call("POST (UPLOAD)", url, params=params, response=response)
            data = response.json()
            
            if 'images' in data:
                image_hash = list(data['images'].values())[0]['hash']
                print(f"[OK] Imagem carregada: {image_hash}")
                return image_hash
            else:
                print(f"[ERRO] Falha no upload: {data}")
                return None

    def create_campaign(self, name, objective='OUTCOME_TRAFFIC', status='PAUSED'):
        url = f"{self.base_url}/{self.ad_account_id}/campaigns"
        payload = {
            'name': name,
            'objective': objective,
            'status': status,
            'special_ad_categories': '[]',
            'access_token': self.access_token
        }
        response = requests.post(url, data=payload)
        data = response.json()
        return data.get('id')

    def create_ad_set(self, campaign_id, name, daily_budget=1000):
        url = f"{self.base_url}/{self.ad_account_id}/adsets"
        payload = {
            'name': name,
            'campaign_id': campaign_id,
            'billing_event': 'IMPRESSIONS',
            'optimization_goal': 'REACH',
            'daily_budget': daily_budget,
            'targeting': json.dumps({'geo_locations': {'countries': ['BR']}}),
            'status': 'PAUSED',
            'access_token': self.access_token
        }
        response = requests.post(url, data=payload)
        data = response.json()
        return data.get('id')

    def create_ad_creative(self, name, image_hash, copy_data, link):
        url = f"{self.base_url}/{self.ad_account_id}/adcreatives"
        object_story_spec = {
            'page_id': os.getenv('META_PAGE_ID', 'placeholder_page_id'),
            'link_data': {
                'image_hash': image_hash,
                'link': link,
                'message': copy_data['primary_text'],
                'call_to_action': {'type': 'LEARN_MORE'},
                'name': copy_data['headline'],
                'description': copy_data['description']
            }
        }
        payload = {
            'name': name,
            'object_story_spec': json.dumps(object_story_spec),
            'access_token': self.access_token
        }
        response = requests.post(url, data=payload)
        data = response.json()
        return data.get('id')

    def create_ad(self, adset_id, name, creative_id):
        url = f"{self.base_url}/{self.ad_account_id}/ads"
        payload = {
            'name': name,
            'adset_id': adset_id,
            'creative': json.dumps({'creative_id': creative_id}),
            'status': 'PAUSED',
            'access_token': self.access_token
        }
        response = requests.post(url, data=payload)
        data = response.json()
        return data.get('id')

def main():
    print("--- Meta Ads Agentic Creator ---")
    
    TOKEN = os.getenv('META_ACCESS_TOKEN')
    ACCOUNT_ID = os.getenv('META_AD_ACCOUNT_ID')
    
    if not TOKEN or not ACCOUNT_ID:
        print("[ERRO] Credenciais META_ACCESS_TOKEN e META_AD_ACCOUNT_ID não encontradas.")
        return

    # 1. Carregar Configuração do Vibe
    config_path = "anuncios/deploy.json"
    if not os.path.exists(config_path):
        print(f"[ERRO] Configuração {config_path} não encontrada.")
        return
        
    with open(config_path, 'r', encoding='utf-8') as f:
        config = json.load(f)

    manager = MetaAdsManager(TOKEN, ACCOUNT_ID)
    
    # 2. Execução Agentica
    campaign_id = manager.create_campaign(config['campaignName'], config['objective'])
    if not campaign_id: return
    
    adset_id = manager.create_ad_set(campaign_id, config['adSetName'], config['dailyBudget'])
    if not adset_id: return

    # 3. Geração de Copy via IA (Conceito do Wiki)
    ai_copy = manager.ai_generate_copy(config['primaryText'])
    
    # 4. Upload e Criação de Criativo
    # Supondo 3 imagens padrão para o teste
    for i in range(1, 4):
        img_name = f"anuncio_{i}.jpg"
        img_path = os.path.join(config['sourceDir'], img_name)
        
        image_hash = manager.upload_image(img_path)
        if image_hash:
            creative_id = manager.create_ad_creative(
                f"Creative {img_name}", 
                image_hash, 
                ai_copy, 
                config['destinationUrl']
            )
            if creative_id:
                manager.create_ad(adset_id, f"Ad {img_name}", creative_id)

    print("\n[FINISH] Campanha e anúncios criados em modo RASCUNHO (PAUSED).")

if __name__ == "__main__":
    main()
