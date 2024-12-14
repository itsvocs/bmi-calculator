from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "Hello, World!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Remplace "*" par l'URL de ton frontend si tu veux restreindre l'accès
    allow_credentials=True,
    allow_methods=["*"],  # Permet toutes les méthodes HTTP
    allow_headers=["*"],  # Permet tous les headers
)

class BMICalculatorRequest(BaseModel):
    weight: float
    height: float

@app.post("/calculate-bmi")

def calculate_bmi(data: BMICalculatorRequest):
    height_in_meters = data.height / 100
    bmi = data.weight / (height_in_meters ** 2)
    if bmi < 18.5:
        status = "Vous êtes en sous-poids."
    elif 18.5 <= bmi < 24.9:
        status = "Vous avez un poids normal."
    elif 25 <= bmi < 29.9:
        status = "Vous êtes en surpoids."
    else:
        status = "Vous êtes obèse."
    return {"bmi": round(bmi, 2), "status": status}