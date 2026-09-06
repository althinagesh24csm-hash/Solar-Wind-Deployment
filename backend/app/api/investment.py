from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.analysis import Analysis
from app.services.investment_service import calculate_investment


router = APIRouter(
    prefix="/investment",
    tags=["Investment Analysis"]
)


@router.get("/")
def get_investment(
    db: Session = Depends(get_db)
):
    # Get the latest completed analysis
    analysis = (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="No analysis available. Run a regional analysis first."
        )

    # Calculate investment using latest analysis
    investment = calculate_investment(
        solar_annual_energy_mwh=analysis.solar_annual_energy,
        wind_annual_energy_mwh=analysis.wind_annual_energy
    )

    return {
        "analysis_id": analysis.id,
        "region": analysis.region,
        "solar_annual_energy_mwh": analysis.solar_annual_energy,
        "wind_annual_energy_mwh": analysis.wind_annual_energy,
        "investment": investment
    }
