from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Bug Tracker API"
    app_description: str = "A bug tracking API made with FastAPI"

    # Pydantic will map DB_URL → database_url automatically
    database_url: str

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache()
def get_settings() -> Settings:
    return Settings()
