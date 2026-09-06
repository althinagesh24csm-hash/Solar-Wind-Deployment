def calculate_investment(
    solar_annual_energy_mwh,
    wind_annual_energy_mwh,
):
    # ---------------------------------
    # Reference assumptions
    # ---------------------------------

    SOLAR_CAPACITY_MW = 1
    WIND_CAPACITY_MW = 1

    SOLAR_COST_PER_MW_CRORE = 5
    WIND_COST_PER_MW_CRORE = 7

    SOLAR_TARIFF_PER_KWH = 5
    WIND_TARIFF_PER_KWH = 6

    SOLAR_OM_PERCENT = 1.5
    WIND_OM_PERCENT = 2.0

    # ---------------------------------
    # Convert MWh to kWh
    # ---------------------------------

    solar_energy_kwh = solar_annual_energy_mwh * 1000
    wind_energy_kwh = wind_annual_energy_mwh * 1000

    # ---------------------------------
    # Investment
    # ---------------------------------

    solar_investment_crore = (
        SOLAR_CAPACITY_MW *
        SOLAR_COST_PER_MW_CRORE
    )

    wind_investment_crore = (
        WIND_CAPACITY_MW *
        WIND_COST_PER_MW_CRORE
    )

    # ---------------------------------
    # Annual revenue
    # ---------------------------------

    solar_revenue_crore = (
        solar_energy_kwh *
        SOLAR_TARIFF_PER_KWH
    ) / 10000000

    wind_revenue_crore = (
        wind_energy_kwh *
        WIND_TARIFF_PER_KWH
    ) / 10000000

    # ---------------------------------
    # Annual O&M
    # ---------------------------------

    solar_om_crore = (
        solar_investment_crore *
        SOLAR_OM_PERCENT
    ) / 100

    wind_om_crore = (
        wind_investment_crore *
        WIND_OM_PERCENT
    ) / 100

    # ---------------------------------
    # Annual profit
    # ---------------------------------

    solar_profit_crore = (
        solar_revenue_crore -
        solar_om_crore
    )

    wind_profit_crore = (
        wind_revenue_crore -
        wind_om_crore
    )

    # ---------------------------------
    # Payback
    # ---------------------------------

    solar_payback_years = (
        solar_investment_crore /
        solar_profit_crore
        if solar_profit_crore > 0
        else None
    )

    wind_payback_years = (
        wind_investment_crore /
        wind_profit_crore
        if wind_profit_crore > 0
        else None
    )

    # ---------------------------------
    # ROI
    # ---------------------------------

    solar_roi = (
        solar_profit_crore /
        solar_investment_crore
    ) * 100

    wind_roi = (
        wind_profit_crore /
        wind_investment_crore
    ) * 100

    # ---------------------------------
    # Recommendation
    # ---------------------------------

    if solar_roi > wind_roi:
        recommendation = "Solar"
    elif wind_roi > solar_roi:
        recommendation = "Wind"
    else:
        recommendation = "Solar and Wind are equally attractive"

    return {
        "solar": {
            "capacity_mw": SOLAR_CAPACITY_MW,
            "investment_crore": round(
                solar_investment_crore, 2
            ),
            "annual_revenue_crore": round(
                solar_revenue_crore, 2
            ),
            "annual_om_crore": round(
                solar_om_crore, 2
            ),
            "annual_profit_crore": round(
                solar_profit_crore, 2
            ),
            "payback_years": round(
                solar_payback_years, 2
            ) if solar_payback_years else None,
            "roi_percent": round(
                solar_roi, 2
            ),
        },

        "wind": {
            "capacity_mw": WIND_CAPACITY_MW,
            "investment_crore": round(
                wind_investment_crore, 2
            ),
            "annual_revenue_crore": round(
                wind_revenue_crore, 2
            ),
            "annual_om_crore": round(
                wind_om_crore, 2
            ),
            "annual_profit_crore": round(
                wind_profit_crore, 2
            ),
            "payback_years": round(
                wind_payback_years, 2
            ) if wind_payback_years else None,
            "roi_percent": round(
                wind_roi, 2
            ),
        },

        "recommendation": recommendation,

        "assumptions": {
            "solar_cost_per_mw_crore": SOLAR_COST_PER_MW_CRORE,
            "wind_cost_per_mw_crore": WIND_COST_PER_MW_CRORE,
            "solar_tariff_per_kwh": SOLAR_TARIFF_PER_KWH,
            "wind_tariff_per_kwh": WIND_TARIFF_PER_KWH,
            "solar_om_percent": SOLAR_OM_PERCENT,
            "wind_om_percent": WIND_OM_PERCENT,
        },
    }
