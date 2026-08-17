def estimate_wind_energy(
    wind_speed,
    turbine_capacity_mw=1.0,
    capacity_factor=0.3
):
    daily_energy_mwh = round(
        turbine_capacity_mw
        * capacity_factor
        * 24,
        2
    )

    annual_energy_mwh = round(
        daily_energy_mwh * 365,
        2
    )

    return {
        "turbine_capacity_mw": turbine_capacity_mw,
        "capacity_factor": capacity_factor,
        "daily_energy_mwh": daily_energy_mwh,
        "annual_energy_mwh": annual_energy_mwh,
        "unit": "MWh"
    }
