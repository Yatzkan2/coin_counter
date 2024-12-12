from pydantic import BaseModel
from typing import List, Dict

# Response model for individual predictions
class Prediction(BaseModel):
    class_id: int
    class_name: str
    confidence: float

# Response model for the API
class PredictionResponse(BaseModel):
    predictions: List[Prediction]
