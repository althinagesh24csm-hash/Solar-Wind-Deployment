from fastapi import FastAPI

from app.database.database import engine, Base
from app.models.user import User
from app.models.project import Project

from app.api.auth import router as auth_router
from app.api.project import router as project_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform",
    version="1.0.0"
)

# Include routers
app.include_router(auth_router)
app.include_router(project_router)


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