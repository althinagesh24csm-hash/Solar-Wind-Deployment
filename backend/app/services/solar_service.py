import requests


def get_solar_data(latitude, longitude):
    url = "https://archive-api.open-meteo.com/v1/archive"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": "2025-01-01",
        "end_date": "2025-12-31",
        "daily": "shortwave_radiation_sum,temperature_2m_mean",
        "timezone": "auto"
    }

    response = requests.get(
        url,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    daily = data.get("daily", {})

    radiation = daily.get(
        "shortwave_radiation_sum",
        []
    )

    temperatures = daily.get(
        "temperature_2m_mean",
        []
    )

    valid_radiation = [
        value for value in radiation
        if value is not None
    ]

    valid_temperatures = [
        value for value in temperatures
        if value is not None
    ]

    if not valid_radiation:
        raise ValueError(
            "No solar radiation data available"
        )

    average_solar_irradiance = (
        sum(valid_radiation) /
        len(valid_radiation)
    )

    average_temperature = (
        sum(valid_temperatures) /
        len(valid_temperatures)
        if valid_temperatures
        else 0
    )

    return {
        "average_solar_irradiance": round(
            average_solar_irradiance,
            2
        ),
        "average_temperature": round(
            average_temperature,
            2
        ),
        "unit_solar": "kWh/m²/day",
        "unit_temperature": "°C"
    }
