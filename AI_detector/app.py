from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import numpy as np
import cv2
import utils
import schemas

# Import the new settings
from config import settings

app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION
)

# Load YOLO model using settings
model = YOLO(settings.MODEL_WEIGHTS_PATH)

@app.get("/")
async def read_root():
    return {"message": f"Welcome to {settings.API_TITLE}!"}

@app.post("/predict/", response_model=schemas.PredictionResponse)
async def upload_image(file: UploadFile = File(...)):
    # Check allowed image types from settings
    if file.content_type not in settings.ALLOWED_IMAGE_TYPES:
        return JSONResponse({
            "error": f"Only {', '.join(settings.ALLOWED_IMAGE_TYPES)} images are allowed"
        }, status_code=400)
    
    # Your existing image prediction logic
    predictions = await utils.predict_image(file, model)

    structured_predictions = [
        schemas.Prediction(
            class_id=pred["class"]["id"],
            class_name=pred["class"]["name"],
            confidence=pred["confidence"]
        ) for pred in predictions
    ]

    return schemas.PredictionResponse(predictions=structured_predictions)
