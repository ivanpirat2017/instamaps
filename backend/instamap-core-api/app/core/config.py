from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field, validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "Instamaps API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 дней
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:8080", "http://localhost:3000"]
    
    # Database
    POSTGRES_SERVER: str = "postgres"
    POSTGRES_USER: str = "instamaps"
    POSTGRES_PASSWORD: str = "instamaps"
    POSTGRES_DB: str = "instamaps"
    SQLALCHEMY_DATABASE_URI: str = Field(default="")

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict) -> str:
        if isinstance(v, str) and v != "":
            return v
        return (
            f"postgresql://{values.get('POSTGRES_USER')}:{values.get('POSTGRES_PASSWORD')}"
            f"@{values.get('POSTGRES_SERVER')}/{values.get('POSTGRES_DB')}"
        )

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()