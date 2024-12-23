import pytest
from fastapi.testclient import TestClient
from app import app
import os

client = TestClient(app)



def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AI Coin Detector API!"}

def test_invalid_file_type():
    response = client.post(
        "/predict/",
        files={"file": ("test.txt", b"fake content", "text/plain")}
    )
    assert response.status_code == 400
    assert response.json()["error"] == "Only image/jpeg, image/png images are allowed"

def test_predict_image():
    image_path = os.path.join(os.path.dirname(__file__), "IMG_1455.JPG")

    with open(image_path, "rb") as img:
        response = client.post(
            "/predict/",
            files={"file": ("IMG_1455.JPG", img, "image/jpeg")}
        )

    assert response.status_code == 200
    response_data = response.json()
    
    assert "predictions" in response_data
    assert isinstance(response_data["predictions"], list)  # Ensure it's a list
    if response_data["predictions"]:  # If there are predictions, validate their structure
        for pred in response_data["predictions"]:
            assert "confidence" in pred
            assert "class_id" in pred
            assert "class_name" in pred
            assert isinstance(pred["confidence"], float)
            assert isinstance(pred["class_id"], int)
            assert isinstance(pred["class_name"], str)
            assert pred["class_id"] == 4
            assert pred["class_name"] == "5_NIS"
