import os
import requests
import json
from dotenv import load_dotenv
import logging

# Garantir que o diretório de logs existe
LOG_DIR = "c:/antigravity/skills/logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Configuração do Logger de Requisições
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOG_DIR, "meta_requests.log")),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("SAMA-Diagnostic")

def log_request(method, url, params=None, data=None, response=None):
    """Loga detalhes da requisição e resposta."""
    logger.info(f"--- NOVA REQUISICAO ---")
    logger.info(f"Method: {method}")
    logger.info(f"URL: {url}")
    if params: logger.info(f"Params: {json.dumps(params, indent=2)}")
    if data: logger.info(f"Data: {json.dumps(data, indent=2)}")
    
    if response is not None:
        logger.info(f"Status Code: {response.status_code}")
        try:
            logger.info(f"Response: {json.dumps(response.json(), indent=2)}")
        except:
            logger.info(f"Response: {response.text}")
    logger.info(f"-----------------------")

def check_meta_environment():
    load_dotenv("c:/antigravity/skills/.env")
    
    token = os.getenv('META_ACCESS_TOKEN')
    if not token:
        logger.error("META_ACCESS_TOKEN nao encontrado no .env")
        return

    logger.info("Iniciando Verificacao de Ambiente Meta...")

    # 1. Verificar quem sou eu (Debug Token / Me)
    base_url = "https://graph.facebook.com/v19.0/me"
    params = {'access_token': token, 'fields': 'id,name'}
    
    logger.info("Passo 1: Verificando validacao do Token (/me)...")
    res = requests.get(base_url, params=params)
    log_request("GET", base_url, params=params, response=res)
    
    if res.status_code != 200:
        logger.error("Falha ao validar token. Verifique se o token expirou.")
        return
    
    user_info = res.json()
    logger.info(f"Token Valido! Usuario: {user_info.get('name')} (ID: {user_info.get('id')})")

    # 2. Listar Contas de Anuncios disponiveis
    accounts_url = f"https://graph.facebook.com/v19.0/me/adaccounts"
    params = {'access_token': token, 'fields': 'name,account_id,account_status'}
    
    # Passo 2: Listar Paginas
    print("\n[PASSO 2] Listando Paginas do Facebook...")
    url_pages = f"https://graph.facebook.com/v19.0/me/accounts"
    res_pages = requests.get(url_pages, params={'access_token': token})
    data_pages = res_pages.json()
    
    if 'data' in data_pages:
        for page in data_pages['data']:
            print(f"--- Pagina: {page.get('name')} (ID: {page.get('id')})")
            print(f"--- FULL_TOKEN: {page.get('access_token')}")
    else:
        print("[ERRO] Nao foi possivel listar paginas.")

    # Passo 3: Listando Ad Accounts disponiveis...
    res = requests.get(accounts_url, params=params)
    log_request("GET", accounts_url, params=params, response=res)
    
    if res.status_code == 200:
        accounts = res.json().get('data', [])
        if not accounts:
            logger.warning("Nenhuma Ad Account encontrada para este token.")
        else:
            logger.info(f"Encontradas {len(accounts)} contas:")
            for acc in accounts:
                logger.info(f"  - {acc.get('name')} (ID: act_{acc.get('account_id')}) [Status: {acc.get('account_status')}]")
                logger.info("DICA: Use o ID acima no seu .env como META_AD_ACCOUNT_ID")
    else:
        logger.error("Erro ao listar ad accounts.")

if __name__ == "__main__":
    # Garantir que o diretório de logs existe
    os.makedirs("c:/antigravity/skills/logs", exist_ok=True)
    check_meta_environment()
