import requests


def get_coordinates(region):
    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": region,
        "format": "json",
        "limit": 1
    }

    headers = {
        "User-Agent": "Solar-Wind-Deployment-Intelligence"
    }

    response = requests.get(
        url,
        params=params,
        headers=headers,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    if not data:
        raise ValueError(
            f"Location not found: {region}"
        )

    return {
        "latitude": float(data[0]["lat"]),
        "longitude": float(data[0]["lon"]),
        "display_name": data[0]["display_name"]
    }
