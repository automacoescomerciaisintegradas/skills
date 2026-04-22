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
        self.ai_worker_url = "https://my-worker.automacoescomerciais-62e.workers.dev/generate-copy" # Produção Cloudflare

    def ai_generate_copy(self, context_data, tone="professional", max_variations=1):
        """
        Gera copy otimizada chamando o AI Worker real na Cloudflare.
        Endpoint: POST /generate-copy em auto.automacoescomerciais.com
        Fallback: geração local se o worker estiver offline.
        """
        print(f"[AI AGENT] Solicitando copy ao Worker: {self.ai_worker_url}")
        print(f"[CONTEXT] {context_data[:80]}...")
        
        payload = {
            "context": context_data,
            "tone": tone,
            "platform": "meta_ads",
            "language": "pt-BR",
            "max_variations": max_variations
        }
        
        try:
            response = requests.post(
                self.ai_worker_url,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                copies = data.get("copies", [])
                reasoning = data.get("reasoning", "")
                latency = data.get("latency_ms", 0)
                
                print(f"[AI OK] {len(copies)} variação(ões) gerada(s) em {latency}ms")
                print(f"[REASONING] {reasoning[:120]}...")
                
                if copies:
                    return copies[0]  # Retorna a primeira variação
            
            print(f"[AI WARN] Worker retornou status {response.status_code}. Usando fallback.")
                
        except requests.exceptions.ConnectionError:
            print(f"[AI OFFLINE] Worker indisponível. Usando fallback local.")
        except requests.exceptions.Timeout:
            print(f"[AI TIMEOUT] Worker não respondeu em 30s. Usando fallback local.")
        except Exception as e:
            print(f"[AI ERROR] {e}. Usando fallback local.")
        
        # Fallback local (nunca quebra o fluxo)
        return {
            "primary_text": f"🚀 {context_data} — Transforme seu negócio com automação inteligente.",
            "headline": "Escale com IA",
            "description": "Automações Comerciais Integradas."
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
        print(f"[CAMPAIGN] Criando campanha: {name}")
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
        campaign_id = data.get('id')
        if campaign_id:
            print(f"[OK] Campanha criada: {campaign_id}")
        else:
            print(f"[ERRO] Falha ao criar campanha: {data}")
        return campaign_id

    def create_ad_set(self, campaign_id, name, daily_budget=1000):
        print(f"[ADSET] Criando conjunto de anuncios: {name}")
        url = f"{self.base_url}/{self.ad_account_id}/adsets"
        payload = {
            'name': name,
            'campaign_id': campaign_id,
            'billing_event': 'IMPRESSIONS',
            'optimization_goal': 'REACH',
            'daily_budget': daily_budget,
            'bid_strategy': 'LOWEST_COST_WITHOUT_CAP',
            'targeting': json.dumps({'geo_locations': {'countries': ['BR']}}),
            'status': 'PAUSED',
            'access_token': self.access_token
        }
        response = requests.post(url, data=payload)
        data = response.json()
        adset_id = data.get('id')
        if adset_id:
            print(f"[OK] Conjunto criado: {adset_id}")
        else:
            print(f"[ERRO] Falha ao criar conjunto: {data}")
        return adset_id

    def create_ad_creative(self, name, image_hash, copy_data, link):
        print(f"[CREATIVE] Criando criativo: {name}")
        url = f"{self.base_url}/{self.ad_account_id}/adcreatives"
        object_story_spec = {
            'page_id': os.getenv('META_PAGE_ID', '77494829152'), # Página padrão do .env
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
        creative_id = data.get('id')
        if creative_id:
            print(f"[OK] Criativo criado: {creative_id}")
        else:
            print(f"[ERRO] Falha ao criar criativo: {data}")
        return creative_id

    def create_ad(self, adset_id, name, creative_id):
        print(f"[AD] Criando anuncio: {name}")
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
        ad_id = data.get('id')
        if ad_id:
            print(f"[OK] Anuncio criado: {ad_id}")
        else:
            print(f"[ERRO] Falha ao criar anuncio: {data}")
        return ad_id

def main():
    print("--- Meta Ads Agentic Creator ---")
    
    TOKEN = os.getenv('META_ACCESS_TOKEN')
    ACCOUNT_ID = os.getenv('META_AD_ACCOUNT_ID')
    
    print(f"[DEBUG] TOKEN: {'Encontrado' if TOKEN else 'NÃO ENCONTRADO'}")
    print(f"[DEBUG] ACCOUNT_ID: {'Encontrado' if ACCOUNT_ID else 'NÃO ENCONTRADO'}")
    
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
