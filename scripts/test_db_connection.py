import os
import psycopg2
from dotenv import load_dotenv

# Carregar do .env se existir
load_dotenv()

def test_connection():
    # String de conexão baseada no seu mcp-config.json
    # Usando 'PAGIA' como a senha provável do Postgres
    conn_str = "postgresql://postgres:PAGIA@db.udzptgbcgzcibhbipnur.supabase.co:5432/postgres"
    
    print(f"--- Testando Conexão Supabase ---")
    try:
        conn = psycopg2.connect(conn_str)
        cur = conn.cursor()
        
        # Consultar tabelas existentes
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        
        tables = cur.fetchall()
        
        if tables:
            print(f"[SUCESSO] Conectado! Tabelas encontradas:")
            for table in tables:
                print(f" - {table[0]}")
        else:
            print("[OK] Conectado, mas nenhuma tabela pública foi encontrada.")
            
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"[ERRO] Falha ao conectar: {e}")
        print("\nDica: Verifique se a senha 'PAGIA' está correta ou se o acesso externo está habilitado no painel da Supabase.")

if __name__ == "__main__":
    test_connection()
