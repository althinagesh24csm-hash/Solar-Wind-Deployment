import requests


def get_wind_data(latitude, longitude):
    url = "https://archive-api.open-meteo.com/v1/archive"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": "2025-01-01",
        "end_date": "2025-12-31",
        "daily": "wind_speed_10m_max",
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

    speeds = daily.get(
        "wind_speed_10m_max",
        []
    )

    valid_speeds = [
        value for value in speeds
        if value is not None
    ]

    if not valid_speeds:
        raise ValueError(
            "No wind data available"
        )

    average_wind_speed = (
        sum(valid_speeds) /
        len(valid_speeds)
    )

    # Convert km/h to m/s if necessary.
    average_wind_speed = average_wind_speed / 3.6

    wind_power_density = (
        0.5 *
        1.225 *
        (average_wind_speed ** 3)
    )

    return {
        "average_wind_speed": round(
            average_wind_speed,
            2
        ),
        "wind_power_density": round(
            wind_power_density,
            2
        ),
        "unit_speed": "m/s",
        "unit_power_density": "W/m²"
    }
