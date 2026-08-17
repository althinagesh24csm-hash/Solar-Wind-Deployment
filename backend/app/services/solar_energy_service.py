def estimate_solar_energy(
    solar_irradiance,
    plant_capacity_mw=1.0,
    performance_ratio=0.8
):
    daily_energy_mwh = round(
        solar_irradiance
        * plant_capacity_mw
        * performance_ratio,
        2
    )

    annual_energy_mwh = round(
        daily_energy_mwh * 365,
        2
    )

    return {
        "plant_capacity_mw": plant_capacity_mw,
        "performance_ratio": performance_ratio,
        "daily_energy_mwh": daily_energy_mwh,
        "annual_energy_mwh": annual_energy_mwh,
        "unit": "MWh"
    }
