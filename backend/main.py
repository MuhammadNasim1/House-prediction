from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd


app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0"
)

# React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained ML model
model = joblib.load("model.pkl")


# Request data structure
class HouseData(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int


# Test route
@app.get("/")
def home():
    return {
        "message": "House Price Prediction API is running"
    }


# Prediction route
@app.post("/predict")
def predict(data: HouseData):

    input_data = pd.DataFrame([
        {
            "area": data.area,
            "bedrooms": data.bedrooms,
            "bathrooms": data.bathrooms
        }
    ])

    prediction = model.predict(input_data)

    return {
        "predicted_price": float(prediction[0])
    }