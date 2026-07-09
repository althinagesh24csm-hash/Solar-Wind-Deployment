from fastapi import FastAPI
from app.database.database import engine, Base
from app.models.user import User
from app.api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform",
    version="1.0.0"
)

app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Solar & Wind Deployment Intelligence Platform"
    }

@app.get("/health")
def health():
    return {
        "status": "Backend is running successfully"
    }