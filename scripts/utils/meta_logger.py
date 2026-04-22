import os
import json
import logging
from datetime import datetime

class MetaLogger:
    def __init__(self, log_name="meta_api", log_dir="c:/antigravity/skills/logs"):
        self.log_dir = log_dir
        os.makedirs(self.log_dir, exist_ok=True)
        
        self.logger = logging.getLogger(log_name)
        self.logger.setLevel(logging.INFO)
        
        # Evitar duplicidade de handlers
        if not self.logger.handlers:
            log_file = os.path.join(self.log_dir, f"{log_name}.log")
            file_handler = logging.FileHandler(log_file)
            formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
            
            # Handler para console (opcional, mas bom para debug)
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)

    def log_api_call(self, method, url, params=None, payload=None, response=None):
        """
        Loga uma chamada à API de forma estruturada.
        """
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "method": method,
            "url": url,
            "params": params,
            "payload": payload,
        }
        
        if response is not None:
            log_entry["status_code"] = response.status_code
            try:
                log_entry["response"] = response.json()
            except:
                log_entry["response"] = response.text

        self.logger.info(">>> API CALL STARTED <<<")
        self.logger.info(json.dumps(log_entry, indent=2))
        self.logger.info(">>> API CALL ENDED <<<\n")

# Singleton para uso fácil
logger = MetaLogger()
