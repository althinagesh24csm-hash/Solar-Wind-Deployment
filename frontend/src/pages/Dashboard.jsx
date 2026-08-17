import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedAnalysis =
      localStorage.getItem("latestAnalysis");

    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis));
      } catch (error) {
        console.error(
          "Unable to load latest analysis:",
          error
        );
      }
    }
  }, []);

  if (!analysis) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#F8FAFC",
          padding: "30px",
        }}
      >
        <h1 style={{ color: "#0F172A" }}>
          📊 Deployment Intelligence Dashboard
        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "17px",
            textAlign: "center",
          }}
        >
          No analysis is available yet.
          <br />
          Start a regional analysis to see your
          renewable-energy intelligence here.
        </p>

        <button
          onClick={() => navigate("/analysis")}
          style={{
            marginTop: "20px",
            padding: "14px 25px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚀 Start New Analysis
        </button>
      </div>
    );
  }

  const solar = analysis.solar_data || {};
  const wind = analysis.wind_data || {};

  const forecast = analysis.forecast || {};
  const solarForecast = forecast.solar || {};
  const windForecast = forecast.wind || {};

  const suitability =
    analysis.suitability || {};

  const investment =
    analysis.investment || {};

  const solarInvestment =
    investment.solar || {};

  const windInvestment =
    investment.wind || {};

  const cardStyle = {
    background: "white",
    padding: "24px",
    borderRadius: "14px",
    boxShadow:
      "0 5px 18px rgba(15,23,42,0.08)",
  };

  const valueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: "8px",
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0F172A",
            }}
          >
            📊 Deployment Intelligence Dashboard
          </h1>

          <p
            style={{
              color: "#64748B",
              marginTop: "8px",
            }}
          >
            Latest renewable-energy analysis
            overview.
          </p>
        </div>

        <button
          onClick={() => navigate("/analysis")}
          style={{
            padding: "12px 20px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ➕ New Analysis
        </button>
      </div>

      {/* REGION */}

      <div
        style={{
          ...cardStyle,
          marginBottom: "25px",
          background: "#ECFDF5",
          border:
            "1px solid #A7F3D0",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748B",
          }}
        >
          CURRENT ANALYSIS
        </p>

        <h2
          style={{
            marginTop: "8px",
            marginBottom: "5px",
            color: "#065F46",
          }}
        >
          📍 {analysis.region || "Unknown Region"}
        </h2>

        <p
          style={{
            margin: 0,
            color: "#475569",
          }}
        >
          {analysis.location?.display_name ||
            "Location information unavailable"}
        </p>

        <p
          style={{
            marginTop: "10px",
            color: "#64748B",
          }}
        >
          Analysis ID:{" "}
          <strong>
            {analysis.analysis_id || "N/A"}
          </strong>
        </p>
      </div>

      {/* KEY METRICS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div style={cardStyle}>
          <p>🎯 Overall Suitability</p>

          <div style={valueStyle}>
            {suitability.overall_score ?? "N/A"}%
          </div>

          <p
            style={{
              color: "#0F766E",
              fontWeight: "bold",
            }}
          >
            {suitability.recommendation ||
              "No recommendation"}
          </p>
        </div>

        <div style={cardStyle}>
          <p>☀️ Solar Score</p>

          <div style={valueStyle}>
            {suitability.solar_score ?? "N/A"}%
          </div>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Solar resource suitability
          </p>
        </div>

        <div style={cardStyle}>
          <p>🌬️ Wind Score</p>

          <div style={valueStyle}>
            {suitability.wind_score ?? "N/A"}%
          </div>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Wind resource suitability
          </p>
        </div>

        <div style={cardStyle}>
          <p>🌡️ Temperature Score</p>

          <div style={valueStyle}>
            {suitability.temperature_score ?? "N/A"}%
          </div>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Environmental suitability
          </p>
        </div>

      </div>

      {/* RESOURCE DATA */}

      <h2 style={{ color: "#0F172A" }}>
        🌍 Renewable Resource Assessment
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        {/* SOLAR */}

        <div
          style={{
            ...cardStyle,
            background: "#FFFBEB",
          }}
        >
          <h2>☀️ Solar Resource</h2>

          <p>
            Average Irradiance
          </p>

          <h3>
            {solar.average_solar_irradiance ??
              "N/A"}{" "}
            {solar.unit_solar ||
              "kWh/m²/day"}
          </h3>

          <p>
            Average Temperature
          </p>

          <h3>
            {solar.average_temperature ??
              "N/A"}{" "}
            °C
          </h3>
        </div>

        {/* WIND */}

        <div
          style={{
            ...cardStyle,
            background: "#EFF6FF",
          }}
        >
          <h2>🌬️ Wind Resource</h2>

          <p>
            Average Wind Speed
          </p>

          <h3>
            {wind.average_wind_speed ??
              "N/A"}{" "}
            {wind.unit_speed || "m/s"}
          </h3>

          <p>
            Wind Power Density
          </p>

          <h3>
            {wind.wind_power_density ??
              "N/A"}{" "}
            {wind.unit_power_density ||
              "W/m²"}
          </h3>
        </div>

      </div>

      {/* ENERGY GENERATION */}

      <h2 style={{ color: "#0F172A" }}>
        ⚡ Energy Generation Forecast
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            ...cardStyle,
            background: "#F0FDF4",
          }}
        >
          <h2>☀️ Solar Energy</h2>

          <p>Daily Generation</p>

          <h3>
            {solarForecast.daily_energy_mwh ??
              "N/A"}{" "}
            MWh
          </h3>

          <p>Annual Generation</p>

          <h3>
            {solarForecast.annual_energy_mwh ??
              "N/A"}{" "}
            MWh
          </h3>

          <p>
            Plant Capacity:{" "}
            <strong>
              {solarForecast.plant_capacity_mw ??
                "N/A"}{" "}
              MW
            </strong>
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            background: "#F0F9FF",
          }}
        >
          <h2>🌬️ Wind Energy</h2>

          <p>Daily Generation</p>

          <h3>
            {windForecast.daily_energy_mwh ??
              "N/A"}{" "}
            MWh
          </h3>

          <p>Annual Generation</p>

          <h3>
            {windForecast.annual_energy_mwh ??
              "N/A"}{" "}
            MWh
          </h3>

          <p>
            Turbine Capacity:{" "}
            <strong>
              {windForecast.turbine_capacity_mw ??
                "N/A"}{" "}
              MW
            </strong>
          </p>
        </div>

      </div>

      {/* INVESTMENT */}

      <h2 style={{ color: "#0F172A" }}>
        💰 Investment Intelligence
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >

        <div
          style={{
            ...cardStyle,
            background: "#FFFBEB",
          }}
        >
          <h2>☀️ Solar Investment</h2>

          <p>
            Investment:{" "}
            <strong>
              {solarInvestment.investment_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Annual Revenue:{" "}
            <strong>
              {solarInvestment.annual_revenue_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Annual Profit:{" "}
            <strong>
              {solarInvestment.annual_profit_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Payback:{" "}
            <strong>
              {solarInvestment.payback_years ??
                "N/A"} years
            </strong>
          </p>

          <p>
            ROI:{" "}
            <strong>
              {solarInvestment.roi_percent ??
                "N/A"}%
            </strong>
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            background: "#EFF6FF",
          }}
        >
          <h2>🌬️ Wind Investment</h2>

          <p>
            Investment:{" "}
            <strong>
              {windInvestment.investment_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Annual Revenue:{" "}
            <strong>
              {windInvestment.annual_revenue_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Annual Profit:{" "}
            <strong>
              {windInvestment.annual_profit_crore ??
                "N/A"} Crore
            </strong>
          </p>

          <p>
            Payback:{" "}
            <strong>
              {windInvestment.payback_years ??
                "N/A"} years
            </strong>
          </p>

          <p>
            ROI:{" "}
            <strong>
              {windInvestment.roi_percent ??
                "N/A"}%
            </strong>
          </p>
        </div>

      </div>

      {/* RECOMMENDATION */}

      <div
        style={{
          ...cardStyle,
          background: "#DCFCE7",
          border:
            "1px solid #86EFAC",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <p
          style={{
            color: "#166534",
            margin: 0,
          }}
        >
          RECOMMENDED INVESTMENT
        </p>

        <h1
          style={{
            color: "#166534",
            margin: "10px 0",
          }}
        >
          🏆{" "}
          {investment.recommendation ||
            "N/A"}
        </h1>

        <p>
          Technology suitability:{" "}
          <strong>
            {suitability.recommendation ||
              "N/A"}
          </strong>
        </p>
      </div>

      {/* ACTIONS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >

        <button
          onClick={() => navigate("/report")}
          style={{
            padding: "14px",
            background: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📄 View Report
        </button>

        <button
          onClick={() => navigate("/investment")}
          style={{
            padding: "14px",
            background: "#EA580C",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          💰 Investment
        </button>

        <button
          onClick={() => navigate("/forecast")}
          style={{
            padding: "14px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⚡ Forecast
        </button>

        <button
          onClick={() => navigate("/suitability")}
          style={{
            padding: "14px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🎯 Suitability
        </button>

        <button
          onClick={() => navigate("/analysis")}
          style={{
            padding: "14px",
            background: "#475569",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🔄 New Analysis
        </button>

      </div>

    </div>
  );
}

export default Dashboard;
