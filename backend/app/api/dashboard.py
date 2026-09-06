from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db

from app.models.project import Project
from app.models.site import Site
from app.models.asset import Asset
from app.models.analysis import Analysis


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db)
):

    # ---------------------------------
    # Basic counts
    # ---------------------------------

    total_projects = db.query(Project).count()

    total_sites = db.query(Site).count()

    total_assets = db.query(Asset).count()


    # ---------------------------------
    # Analysis count
    # ---------------------------------

    total_analyses = db.query(Analysis).count()


    # ---------------------------------
    # Solar energy
    # ---------------------------------

    total_solar_energy = (
        db.query(
            func.coalesce(
                func.sum(Analysis.solar_annual_energy),
                0
            )
        ).scalar()
    )


    # ---------------------------------
    # Wind energy
    # ---------------------------------

    total_wind_energy = (
        db.query(
            func.coalesce(
                func.sum(Analysis.wind_annual_energy),
                0
            )
        ).scalar()
    )


    # ---------------------------------
    # Total renewable energy
    # ---------------------------------

    total_forecast_energy = (
        float(total_solar_energy)
        + float(total_wind_energy)
    )


    # ---------------------------------
    # Average suitability
    # ---------------------------------

    average_suitability_score = (
        db.query(
            func.coalesce(
                func.avg(Analysis.overall_score),
                0
            )
        ).scalar()
    )


    # ---------------------------------
    # Latest analysis
    # ---------------------------------

    latest_analysis = (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .first()
    )


    # ---------------------------------
    # Recent analyses
    # ---------------------------------

    recent_analyses = (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .limit(5)
        .all()
    )


    recent_data = []

    for analysis in recent_analyses:

        recent_data.append({
            "id": analysis.id,
            "region": analysis.region,
            "overall_score": analysis.overall_score,
            "recommendation": analysis.recommendation,
            "created_at": analysis.created_at
        })


    # ---------------------------------
    # Latest recommendation
    # ---------------------------------

    latest_data = None

    if latest_analysis:

        latest_data = {
            "id": latest_analysis.id,
            "region": latest_analysis.region,
            "overall_score": latest_analysis.overall_score,
            "recommendation": latest_analysis.recommendation,
            "solar_annual_energy": latest_analysis.solar_annual_energy,
            "wind_annual_energy": latest_analysis.wind_annual_energy
        }


    # ---------------------------------
    # Return dashboard
    # ---------------------------------

    return {

        "total_projects": total_projects,

        "total_sites": total_sites,

        "total_assets": total_assets,

        "total_analyses": total_analyses,

        "total_solar_energy": round(
            total_solar_energy,
            2
        ),

        "total_wind_energy": round(
            total_wind_energy,
            2
        ),

        "total_forecast_energy": round(
            total_forecast_energy,
            2
        ),

        "total_investment": 0,

        "average_suitability_score": round(
            average_suitability_score,
            2
        ),

        "latest_analysis": latest_data,

        "recent_analyses": recent_data
    }
