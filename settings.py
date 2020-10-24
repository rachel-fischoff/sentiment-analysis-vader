from dotenv import load_dotenv
from pathlib import Path  # Python 3.6+ only
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
TOKEN_SECRET = os.getenv("TOKEN_SECRET")
