from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.analysis import Analysis
from app.models.project import Project
from app.models.site import Site
from app.models.asset import Asset
from app.models.user import User

from app.services.location_service import get_coordinates


router = APIRouter(
    prefix="/analysis",
    tags=["Complete Analysis"]
)


# =========================================================
# COMPLETE ANALYSIS
# =========================================================

@router.post("/")
def run_analysis(
    data: dict,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # 1. REGION
    # -----------------------------------------------------

    region = data.get("region")

    if not region:
        raise HTTPException(
            status_code=400,
            detail="Region is required"
        )

    region = str(region).strip()

    if not region:
        raise HTTPException(
            status_code=400,
            detail="Region cannot be empty"
        )

    # -----------------------------------------------------
    # 2. GET USER
    # -----------------------------------------------------

    user = db.query(User).first()

    if not user:
        raise HTTPException(
            status_code=400,
            detail="No user found. Please register a user first."
        )

    user_id = user.id

    # -----------------------------------------------------
    # 3. GET LOCATION
    # -----------------------------------------------------

    try:

        location = get_coordinates(region)

        latitude = float(location["latitude"])
        longitude = float(location["longitude"])

        display_name = location.get(
            "display_name",
            region
        )

    except Exception as e:

        print("Location service failed:", e)

        # Safe demo fallback
        latitude = 0.0
        longitude = 0.0
        display_name = region

        location = {
            "latitude": latitude,
            "longitude": longitude,
            "display_name": display_name
        }

    # -----------------------------------------------------
    # 4. DEMO SOLAR DATA
    # -----------------------------------------------------

    solar_irradiance = 5.2
    temperature = 25.0

    # -----------------------------------------------------
    # 5. DEMO WIND DATA
    # -----------------------------------------------------

    wind_speed = 5.5

    # -----------------------------------------------------
    # 6. WIND POWER DENSITY
    # -----------------------------------------------------

    air_density = 1.225

    wind_power_density = round(
        0.5 * air_density * (wind_speed ** 3),
        2
    )

    # -----------------------------------------------------
    # 7. SOLAR ENERGY
    # -----------------------------------------------------

    solar_daily_energy = round(
        solar_irradiance * 20,
        2
    )

    solar_annual_energy = round(
        solar_daily_energy * 365,
        2
    )

    # -----------------------------------------------------
    # 8. WIND ENERGY
    # -----------------------------------------------------

    wind_daily_energy = round(
        wind_speed * 10,
        2
    )

    wind_annual_energy = round(
        wind_daily_energy * 365,
        2
    )

    # -----------------------------------------------------
    # 9. SOLAR SCORE
    # -----------------------------------------------------

    solar_score = min(
        round(
            (solar_irradiance / 6) * 100,
            2
        ),
        100
    )

    # -----------------------------------------------------
    # 10. TEMPERATURE SCORE
    # -----------------------------------------------------

    temperature_score = max(
        0,
        min(
            round(
                100 - abs(temperature - 25) * 4,
                2
            ),
            100
        )
    )

    # -----------------------------------------------------
    # 11. WIND SCORE
    # -----------------------------------------------------

    if wind_speed >= 7:
        wind_score = 100

    elif wind_speed >= 6:
        wind_score = 90

    elif wind_speed >= 5:
        wind_score = 80

    elif wind_speed >= 4:
        wind_score = 65

    elif wind_speed >= 3:
        wind_score = 50

    else:
        wind_score = 30

    # -----------------------------------------------------
    # 12. OVERALL SCORE
    # -----------------------------------------------------

    overall_score = round(
        (
            solar_score
            + temperature_score
            + wind_score
        ) / 3,
        2
    )

    # -----------------------------------------------------
    # 13. RECOMMENDATION
    # -----------------------------------------------------

    if overall_score >= 80:
        recommendation = "Excellent"

    elif overall_score >= 70:
        recommendation = "Highly Suitable"

    elif overall_score >= 60:
        recommendation = "Moderately Suitable"

    elif overall_score >= 50:
        recommendation = "Low Suitability"

    else:
        recommendation = "Unsuitable"

    # =====================================================
    # 14. SAVE ANALYSIS
    # =====================================================

    try:

        analysis = Analysis(
            region=region,

            latitude=latitude,
            longitude=longitude,

            solar_irradiance=solar_irradiance,
            temperature=temperature,

            wind_speed=wind_speed,
            wind_power_density=wind_power_density,

            solar_daily_energy=solar_daily_energy,
            solar_annual_energy=solar_annual_energy,

            wind_daily_energy=wind_daily_energy,
            wind_annual_energy=wind_annual_energy,

            solar_score=solar_score,
            temperature_score=temperature_score,
            wind_score=wind_score,

            overall_score=overall_score,

            recommendation=recommendation
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

    except Exception as e:

        db.rollback()

        print("ANALYSIS DATABASE ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to save analysis: {str(e)}"
        )

    # =====================================================
    # 15. CREATE / GET PROJECT
    # =====================================================

    try:

        project = (
            db.query(Project)
            .filter(
                Project.location.ilike(region)
            )
            .first()
        )

        project_created = False

        if not project:

            project = Project(
                project_name=f"{region} Renewable Energy Project",

                description=(
                    f"Renewable energy deployment "
                    f"project for {region}."
                ),

                location=region,

                created_by=user_id
            )

            db.add(project)
            db.commit()
            db.refresh(project)

            project_created = True

    except Exception as e:

        db.rollback()

        print("PROJECT ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to create project: {str(e)}"
        )

    # =====================================================
    # 16. CREATE / GET SITE
    # =====================================================

    try:

        site = (
            db.query(Site)
            .filter(
                Site.project_id == project.id
            )
            .first()
        )

        site_created = False

        if not site:

            site = Site(

                site_name=(
                    f"{region} Renewable Site"
                ),

                latitude=latitude,

                longitude=longitude,

                capacity_mw=100.0,

                site_type="Hybrid Renewable",

                status="Recommended",

                project_id=project.id,

                created_by=user_id
            )

            db.add(site)
            db.commit()
            db.refresh(site)

            site_created = True

    except Exception as e:

        db.rollback()

        print("SITE ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to create site: {str(e)}"
        )

    # =====================================================
    # 17. CREATE SOLAR ASSET
    # =====================================================

    try:

        solar_asset = (
            db.query(Asset)
            .filter(
                Asset.site_id == site.id,
                Asset.asset_type == "Solar"
            )
            .first()
        )

        solar_asset_created = False

        if not solar_asset:

            solar_asset = Asset(

                asset_name=(
                    f"{region} Solar Plant"
                ),

                asset_type="Solar",

                manufacturer=(
                    "Renewable Energy System"
                ),

                capacity=50.0,

                status="Recommended",

                site_id=site.id,

                created_by=user_id
            )

            db.add(solar_asset)

            solar_asset_created = True

    except Exception as e:

        db.rollback()

        print("SOLAR ASSET ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to create solar asset: {str(e)}"
        )

    # =====================================================
    # 18. CREATE WIND ASSET
    # =====================================================

    try:

        wind_asset = (
            db.query(Asset)
            .filter(
                Asset.site_id == site.id,
                Asset.asset_type == "Wind"
            )
            .first()
        )

        wind_asset_created = False

        if not wind_asset:

            wind_asset = Asset(

                asset_name=(
                    f"{region} Wind Farm"
                ),

                asset_type="Wind",

                manufacturer=(
                    "Renewable Energy System"
                ),

                capacity=50.0,

                status="Recommended",

                site_id=site.id,

                created_by=user_id
            )

            db.add(wind_asset)

            wind_asset_created = True

    except Exception as e:

        db.rollback()

        print("WIND ASSET ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to create wind asset: {str(e)}"
        )

    # -----------------------------------------------------
    # COMMIT ASSETS
    # -----------------------------------------------------

    try:

        db.commit()

    except Exception as e:

        db.rollback()

        print("DEPLOYMENT COMMIT ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Unable to save deployment data: {str(e)}"
        )

    # =====================================================
    # 19. RETURN COMPLETE RESULT
    # =====================================================

    return {

        "success": True,

        "message": (
            "Analysis completed successfully "
            "and deployment data was created."
        ),

        "analysis_id": analysis.id,

        "project_id": project.id,

        "site_id": site.id,

        "region": region,

        "location": {

            "latitude": latitude,

            "longitude": longitude,

            "display_name": display_name
        },

        "solar_data": {

            "average_solar_irradiance":
                solar_irradiance,

            "average_temperature":
                temperature,

            "unit_solar":
                "kWh/m²/day",

            "unit_temperature":
                "°C"
        },

        "wind_data": {

            "average_wind_speed":
                wind_speed,

            "wind_power_density":
                wind_power_density,

            "unit_speed":
                "m/s",

            "unit_power_density":
                "W/m²"
        },

        "forecast": {

            "solar": {

                "daily_energy_mwh":
                    solar_daily_energy,

                "annual_energy_mwh":
                    solar_annual_energy
            },

            "wind": {

                "daily_energy_mwh":
                    wind_daily_energy,

                "annual_energy_mwh":
                    wind_annual_energy
            }
        },

        "suitability": {

            "solar_score":
                solar_score,

            "temperature_score":
                temperature_score,

            "wind_score":
                wind_score,

            "overall_score":
                overall_score,

            "recommendation":
                recommendation
        },

        "investment": {

            "status":
                "Estimated",

            "solar_annual_energy_mwh":
                solar_annual_energy,

            "wind_annual_energy_mwh":
                wind_annual_energy
        },

        "deployment": {

            "project_created":
                project_created,

            "site_created":
                site_created,

            "solar_asset_created":
                solar_asset_created,

            "wind_asset_created":
                wind_asset_created
        }
    }


# =========================================================
# ANALYSIS HISTORY
# =========================================================

@router.get("/history")
def get_analysis_history(
    db: Session = Depends(get_db)
):

    analyses = (
        db.query(Analysis)
        .order_by(
            Analysis.created_at.desc()
        )
        .all()
    )

    return [

        {
            "analysis_id":
                a.id,

            "region":
                a.region,

            "latitude":
                a.latitude,

            "longitude":
                a.longitude,

            "solar_irradiance":
                a.solar_irradiance,

            "temperature":
                a.temperature,

            "wind_speed":
                a.wind_speed,

            "wind_power_density":
                a.wind_power_density,

            "solar_daily_energy":
                a.solar_daily_energy,

            "solar_annual_energy":
                a.solar_annual_energy,

            "wind_daily_energy":
                a.wind_daily_energy,

            "wind_annual_energy":
                a.wind_annual_energy,

            "solar_score":
                a.solar_score,

            "temperature_score":
                a.temperature_score,

            "wind_score":
                a.wind_score,

            "overall_score":
                a.overall_score,

            "recommendation":
                a.recommendation,

            "created_at":
                a.created_at
        }

        for a in analyses
    ]