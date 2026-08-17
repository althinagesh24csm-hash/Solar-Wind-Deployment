from fastapi import APIRouter, HTTPException

from app.services.location_service import get_coordinates
from app.services.solar_service import get_solar_data
from app.services.wind_service import get_wind_data

router = APIRouter(
    prefix="/regional-map",
    tags=["Regional Suitability Map"]
)


def calculate_scores(solar_irradiance, temperature, wind_speed):
    solar_score = min(
        round((solar_irradiance / 6) * 100, 2),
        100
    )

    temperature_score = max(
        0,
        min(
            round(100 - abs(temperature - 25) * 4, 2),
            100
        )
    )

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

    overall_score = round(
        (solar_score + temperature_score + wind_score) / 3,
        2
    )

    if overall_score >= 80:
        status = "Excellent"
    elif overall_score >= 70:
        status = "Highly Suitable"
    elif overall_score >= 60:
        status = "Moderately Suitable"
    elif overall_score >= 50:
        status = "Low Suitability"
    else:
        status = "Unsuitable"

    return solar_score, temperature_score, wind_score, overall_score, status


@router.post("/")
def regional_map(data: dict):
    region = data.get("region")

    if not region:
        raise HTTPException(
            status_code=400,
            detail="Region is required"
        )

    try:
        location = get_coordinates(region)

        latitude = location["latitude"]
        longitude = location["longitude"]

        offsets = [
            (0.08, -0.08),
            (0.08, 0.08),
            (0, 0),
            (-0.08, -0.08),
            (-0.08, 0.08),
            (0.12, 0),
            (-0.12, 0),
            (0, 0.12),
            (0, -0.12),
        ]

        locations = []

        for index, (lat_offset, lon_offset) in enumerate(offsets):
            point_latitude = round(latitude + lat_offset, 6)
            point_longitude = round(longitude + lon_offset, 6)

            solar = get_solar_data(
                point_latitude,
                point_longitude
            )

            wind = get_wind_data(
                point_latitude,
                point_longitude
            )

            solar_irradiance = solar["average_solar_irradiance"]
            temperature = solar["average_temperature"]
            wind_speed = wind["average_wind_speed"]

            (
                solar_score,
                temperature_score,
                wind_score,
                overall_score,
                status
            ) = calculate_scores(
                solar_irradiance,
                temperature,
                wind_speed
            )

            locations.append({
                "id": index + 1,
                "latitude": point_latitude,
                "longitude": point_longitude,
                "score": overall_score,
                "status": status,
                "solar_score": solar_score,
                "temperature_score": temperature_score,
                "wind_score": wind_score,
                "solar_irradiance": solar_irradiance,
                "temperature": temperature,
                "wind_speed": wind_speed,
            })

        locations.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return {
            "region": region,
            "center": {
                "latitude": latitude,
                "longitude": longitude,
            },
            "locations": locations,
            "best_location": locations[0],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Regional analysis failed: {str(e)}"
        )
