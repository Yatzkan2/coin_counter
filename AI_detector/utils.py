import ultralytics
from ultralytics import YOLO
import cv2
from fastapi import UploadFile
import numpy as np
from config import settings

async def predict_image(file: UploadFile, model: YOLO):
    # Read the file content
    file_content = await file.read()
    nd_arr = np.frombuffer(file_content, dtype=np.uint8)
    image = cv2.imdecode(nd_arr, cv2.IMREAD_COLOR)

    # Perform prediction
    results = model.predict(image, conf=settings.CONFIDENCE_THRESHOLD)

    # Extract predictions
    predictions = []
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls)
            predictions.append({
                "class": {"id": class_id, "name": model.names[class_id]},  
                "confidence": float(box.conf)
            })

    return predictions
