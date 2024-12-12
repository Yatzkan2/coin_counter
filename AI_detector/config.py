from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Model configuration
    MODEL_WEIGHTS_PATH: str = "/Users/yairyatzkan/coin_counter/AI_detector/best.pt"
    ALLOWED_IMAGE_TYPES: list[str] = ["image/jpeg", "image/png"]
    
    # API Configuration
    API_TITLE: str = "AI Coin Detector API"
    API_VERSION: str = "1.0.0"
    
    # Prediction settings
    CONFIDENCE_THRESHOLD: float = 0.5
    
    # Optional: Load configuration from .env file
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8",
        extra="ignore"  # Ignore extra environment variables
    )

# Create a singleton instance of settings
settings = Settings()