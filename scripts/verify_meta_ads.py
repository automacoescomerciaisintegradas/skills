import os
import requests
import json
import logging
import sys
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"))

# Adicionar o diretório de scripts ao path para importar utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scripts.utils.meta_logger import logger as meta_logger

def verify_meta_connection(access_token, ad_account_id):
    """
    Diagnostica a conexão com a Meta Ads API.
    """
    # Adicionar prefixo act_ se necessário
    if not ad_account_id.startswith('act_'):
        print(f"[AVISO] Formatando ID {ad_account_id} para act_{ad_account_id}")
        ad_account_id = f"act_{ad_account_id}"
    
    base_url = f"https://graph.facebook.com/v19.0/{ad_account_id}"
    params = {
        'access_token': access_token,
        'fields': 'name,account_status,currency,timezone_name'
    }

    print(f"[REQUISICAO] Iniciando diagnostico para a conta: {ad_account_id}...")
    
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        
        # Logar a chamada via utilitário SAMA
        meta_logger.log_api_call("GET", base_url, params=params, response=response)

        if response.status_code == 200:
            print("[OK] Conexao bem-sucedida!")
            print(f"--- Conta: {data.get('name')}")
            print(f"--- Moeda: {data.get('currency')}")
            print(f"--- Fuso Horario: {data.get('timezone_name')}")
            print(f"--- Status da Conta: {data.get('account_status')} (1=Ativa, 2=Desativada)")

        else:
            error = data.get('error', {})
            print("[ERRO] Falha na conexao!")
            print(f"!!! Mensagem: {error.get('message')}")
            print(f"!!! Codigo: {error.get('code')} Sub-codigo: {error.get('error_subcode')}")
            
            if error.get('code') == 100 and error.get('error_subcode') == 33:
                print("\n[DICA] Sugestao de Fix: Este erro ocorre comumente quando o endpoint esta incorreto ou o ID nao tem o prefixo 'act_'.")
                print("Verifique se voce esta tentando fazer um POST em um endpoint que aceita apenas GET, ou vice-versa.")

    except Exception as e:
        print(f"!!! Erro inesperado: {str(e)}")

if __name__ == "__main__":
    # Tenta ler do ambiente ou solicita input
    TOKEN = os.getenv('META_ACCESS_TOKEN')
    ACCOUNT_ID = os.getenv('META_AD_ACCOUNT_ID')

    if not TOKEN or not ACCOUNT_ID:
        print("[INFO] Credenciais nao encontradas no ambiente.")
        TOKEN = input("Insira seu Meta Access Token: ")
        ACCOUNT_ID = input("Insira seu Meta Ad Account ID (ex: 123456789): ")

    verify_meta_connection(TOKEN, ACCOUNT_ID)
