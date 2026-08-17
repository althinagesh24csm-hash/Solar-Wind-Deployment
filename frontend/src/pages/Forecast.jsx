import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { predictSolar, predictWind } from "../api/forecastApi";

const BASE_URL = "http://127.0.0.1:8000";

function Forecast() {
  const location = useLocation();
  const navigate = useNavigate();

  const region = location.state?.region || "Hyderabad";

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const [solarResult, setSolarResult] = useState(null);
  const [windResult, setWindResult] = useState(null);

  const [solarLoading, setSolarLoading] = useState(false);
  const [windLoading, setWindLoading] = useState(false);

  // ---------------------------------------
  // Load analysis automatically
  // ---------------------------------------

  useEffect(() => {
    loadAnalysis();
  }, [region]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/analysis/`,
        {
          region: region,
        }
      );

      console.log("Forecast Analysis:", response.data);

      setAnalysis(response.data);

      // Existing forecast from backend
      setSolarResult(response.data.forecast?.solar || null);
      setWindResult(response.data.forecast?.wind || null);

    } catch (error) {
      console.error("Forecast analysis error:", error);
      alert("Unable to load forecast data.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Solar prediction
  // ---------------------------------------

  const handleSolarPredict = async () => {
    if (!analysis) return;

    try {
      setSolarLoading(true);

      const result = await predictSolar({
        solar_irradiance:
          Number(
            analysis.solar_data?.average_solar_irradiance
          ) || 0,

        temperature:
          Number(
            analysis.solar_data?.average_temperature
          ) || 0,

        panel_efficiency: 0.8,
      });

      setSolarResult(result);

    } catch (error) {
      console.error("Solar prediction error:", error);
      alert("Solar Prediction Failed");
    } finally {
      setSolarLoading(false);
    }
  };

  // ---------------------------------------
  // Wind prediction
  // ---------------------------------------

  const handleWindPredict = async () => {
    if (!analysis) return;

    try {
      setWindLoading(true);

      const result = await predictWind({
        wind_speed:
          Number(
            analysis.wind_data?.average_wind_speed
          ) || 0,

        air_density: 1.225,

        turbine_efficiency: 0.3,
      });

      setWindResult(result);

    } catch (error) {
      console.error("Wind prediction error:", error);
      alert("Wind Prediction Failed");
    } finally {
      setWindLoading(false);
    }
  };

  // ---------------------------------------
  // Styles
  // ---------------------------------------

  const buttonStyle = {
    background: "#0F766E",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
  };

  const secondaryButtonStyle = {
    background: "#475569",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------

  if (loading) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
        }}
      >
        <h2>🔄 Loading Forecast...</h2>
        <p>Preparing renewable energy forecast for {region}</p>
      </div>
    );
  }

  // ---------------------------------------
  // Main UI
  // ---------------------------------------

  return (
    <div
      style={{
        padding: "30px",
        background: "#F4F7FB",
        minHeight: "100vh",
      }}
    >

      {/* Header */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >

        <div>
          <h1
            style={{
              marginBottom: "8px",
              color: "#0F172A",
            }}
          >
            ☀️ Solar & 🌬️ Wind Forecast
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748B",
            }}
          >
            Automatic renewable energy forecast for{" "}
            <strong>{region}</strong>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <button
            onClick={() => navigate(-1)}
            style={secondaryButtonStyle}
          >
            ← Back
          </button>

          <button
            onClick={() => navigate("/analysis")}
            style={{
              ...buttonStyle,
              width: "auto",
              padding: "12px 20px",
            }}
          >
            + New Analysis
          </button>

        </div>

      </div>


      {/* Selected Region */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          background: "#ECFDF5",
          border: "1px solid #10B981",
          borderRadius: "12px",
          padding: "20px",
        }}
      >

        <h2
          style={{
            color: "#065F46",
            marginTop: 0,
          }}
        >
          📍 Selected Region
        </h2>

        <p>
          <strong>Region:</strong> {analysis?.region || region}
        </p>

        <p>
          <strong>Latitude:</strong>{" "}
          {analysis?.location?.latitude ?? "N/A"}
        </p>

        <p>
          <strong>Longitude:</strong>{" "}
          {analysis?.location?.longitude ?? "N/A"}
        </p>

        <p>
          <strong>Suitability:</strong>{" "}
          {analysis?.suitability?.overall_score ?? "N/A"}%
        </p>

      </div>


      {/* Forecast Cards */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >

        {/* -----------------------------------
            SOLAR
        ----------------------------------- */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              color: "#92400E",
            }}
          >
            ☀️ Solar Forecast
          </h2>

          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "#FEF3C7",
              borderRadius: "10px",
            }}
          >

            <p>
              <strong>Solar Irradiance:</strong>{" "}
              {analysis?.solar_data?.average_solar_irradiance ?? "N/A"}
              {" "}
              kWh/m²/day
            </p>

            <p>
              <strong>Temperature:</strong>{" "}
              {analysis?.solar_data?.average_temperature ?? "N/A"}
              {" "}°C
            </p>

            <p>
              <strong>Panel Efficiency:</strong> 80%
            </p>

          </div>

          <button
            style={{
              ...buttonStyle,
              marginTop: "20px",
            }}
            onClick={handleSolarPredict}
            disabled={solarLoading}
          >
            {solarLoading
              ? "Calculating..."
              : "☀️ Predict Solar"}
          </button>


          {solarResult && (
            <div
              style={{
                marginTop: "20px",
                background: "#E6FFFA",
                padding: "18px",
                borderRadius: "10px",
              }}
            >

              <h3>⚡ Solar Prediction Result</h3>

              <p>
                <strong>Peak Sun Hours:</strong>{" "}
                {solarResult.peak_sun_hours ?? "N/A"}
              </p>

              <p>
                <strong>Energy Output:</strong>{" "}
                {solarResult.expected_energy_output ??
                  solarResult.daily_energy_mwh ??
                  "N/A"}
              </p>

              <p>
                <strong>Performance Ratio:</strong>{" "}
                {solarResult.performance_ratio ??
                  analysis?.forecast?.solar?.performance_ratio ??
                  "N/A"}
              </p>

              <hr />

              <p>
                <strong>Annual Energy:</strong>{" "}
                {analysis?.forecast?.solar?.annual_energy_mwh ??
                  "N/A"}{" "}
                MWh
              </p>

            </div>
          )}

        </div>


        {/* -----------------------------------
            WIND
        ----------------------------------- */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              color: "#1E3A8A",
            }}
          >
            🌬️ Wind Forecast
          </h2>


          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "#DBEAFE",
              borderRadius: "10px",
            }}
          >

            <p>
              <strong>Wind Speed:</strong>{" "}
              {analysis?.wind_data?.average_wind_speed ?? "N/A"}
              {" "}m/s
            </p>

            <p>
              <strong>Air Density:</strong> 1.225 kg/m³
            </p>

            <p>
              <strong>Turbine Efficiency:</strong> 30%
            </p>

          </div>


          <button
            style={{
              ...buttonStyle,
              marginTop: "20px",
            }}
            onClick={handleWindPredict}
            disabled={windLoading}
          >
            {windLoading
              ? "Calculating..."
              : "🌬️ Predict Wind"}
          </button>


          {windResult && (
            <div
              style={{
                marginTop: "20px",
                background: "#E6FFFA",
                padding: "18px",
                borderRadius: "10px",
              }}
            >

              <h3>⚡ Wind Prediction Result</h3>

              <p>
                <strong>Wind Power Density:</strong>{" "}
                {windResult.wind_power_density ??
                  analysis?.wind_data?.wind_power_density ??
                  "N/A"}
              </p>

              <p>
                <strong>Energy Output:</strong>{" "}
                {windResult.expected_energy_output ??
                  windResult.daily_energy_mwh ??
                  "N/A"}
              </p>

              <p>
                <strong>Capacity Factor:</strong>{" "}
                {windResult.capacity_factor ??
                  analysis?.forecast?.wind?.capacity_factor ??
                  "N/A"}
              </p>

              <hr />

              <p>
                <strong>Annual Energy:</strong>{" "}
                {analysis?.forecast?.wind?.annual_energy_mwh ??
                  "N/A"}{" "}
                MWh
              </p>

            </div>
          )}

        </div>

      </div>


      {/* Overall Summary */}

      {analysis && (
        <div
          style={{
            maxWidth: "1100px",
            margin: "30px auto 0",
            background: "#0F172A",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >

          <h2>📊 Forecast Summary</h2>

          <p>
            <strong>Region:</strong> {analysis.region}
          </p>

          <p>
            <strong>Solar Annual Energy:</strong>{" "}
            {analysis.forecast?.solar?.annual_energy_mwh ?? "N/A"}
            {" "}MWh
          </p>

          <p>
            <strong>Wind Annual Energy:</strong>{" "}
            {analysis.forecast?.wind?.annual_energy_mwh ?? "N/A"}
            {" "}MWh
          </p>

          <p>
            <strong>Overall Suitability:</strong>{" "}
            {analysis.suitability?.overall_score ?? "N/A"}%
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {analysis.suitability?.recommendation ?? "N/A"}
          </p>

        </div>
      )}

    </div>
  );
}

export default Forecast;
