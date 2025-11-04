import os
from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    app_name: str = "Bug Tracker API"
    app_description: str = "A bug tracking API made with FastAPI"
    database_url: str = os.getenv("DB_URL", "")

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
