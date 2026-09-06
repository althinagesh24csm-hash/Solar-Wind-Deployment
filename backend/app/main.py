from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base

# ---------------------------------
# Models
# ---------------------------------

from app.models.user import User
from app.models.project import Project
from app.models.asset import Asset
from app.models.environmental import EnvironmentalData
from app.models.site import Site
from app.models.analysis import Analysis

# ---------------------------------
# API routers
# ---------------------------------

from app.api.auth import router as auth_router
from app.api.project import router as project_router
from app.api.site import router as site_router
from app.api.asset import router as asset_router
from app.api.environmental import router as environmental_router
from app.api.prediction import router as prediction_router
from app.api.assessment import router as assessment_router
from app.api.analysis import router as analysis_router
from app.api.dashboard import router as dashboard_router
from app.api.regional_map import router as regional_map_router
from app.api.investment import router as investment_router

# ---------------------------------
# Create database tables
# ---------------------------------

Base.metadata.create_all(bind=engine)

# ---------------------------------
# Create FastAPI app
# ---------------------------------

app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform",
    version="1.0.0"
)

# ---------------------------------
# CORS
# ---------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Include routers
# ---------------------------------

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(site_router)
app.include_router(asset_router)
app.include_router(environmental_router)
app.include_router(prediction_router)
app.include_router(assessment_router)
app.include_router(analysis_router)
app.include_router(dashboard_router)
app.include_router(regional_map_router)
app.include_router(investment_router)

# ---------------------------------
# Root endpoint
# ---------------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to Solar & Wind Deployment Intelligence Platform"
    }

# ---------------------------------
# Health endpoint
# ---------------------------------

@app.get("/health")
def health():
    return {
        "status": "Backend is running successfully"
    }