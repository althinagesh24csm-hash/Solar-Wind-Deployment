import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Investment() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("analysisResult");

    console.log("Investment page storage:", savedResult);

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);

        console.log("Investment loaded:", parsedResult);

        setResult(parsedResult);
      } catch (error) {
        console.error(
          "Unable to parse saved analysis:",
          error
        );
      }
    }
  }, []);

  if (!result) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2>No analysis result found.</h2>

        <p style={{ color: "#64748B" }}>
          Please run a regional analysis first.
        </p>

        <button
          onClick={() => navigate("/analysis")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Start New Analysis
        </button>
      </div>
    );
  }

  const investment = result.investment || {};

  const solar = investment.solar || {};

  const wind = investment.wind || {};

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "auto",
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
          marginBottom: "25px",
        }}
      >
        <div>
          <h1 style={{ color: "#0F172A" }}>
            💰 Investment Intelligence
          </h1>

          <p style={{ color: "#64748B" }}>
            Financial analysis for{" "}
            <strong>{result.region}</strong>
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 18px",
            background: "#475569",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      {/* RECOMMENDATION */}

      <div
        style={{
          padding: "20px",
          background: "#DCFCE7",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2>
          🏆 Recommended Technology:{" "}
          {investment.recommendation || "N/A"}
        </h2>
      </div>

      {/* INVESTMENT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* SOLAR */}

        <div
          style={{
            padding: "25px",
            background: "#FEF3C7",
            borderRadius: "12px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.06)",
          }}
        >
          <h2>☀️ Solar Investment</h2>

          <p>
            <strong>Capacity:</strong>{" "}
            {solar.capacity_mw ?? "N/A"} MW
          </p>

          <p>
            <strong>Investment:</strong>{" "}
            ₹{solar.investment_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual Revenue:</strong>{" "}
            ₹{solar.annual_revenue_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual O&amp;M:</strong>{" "}
            ₹{solar.annual_om_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual Profit:</strong>{" "}
            ₹{solar.annual_profit_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Payback:</strong>{" "}
            {solar.payback_years ?? "N/A"} Years
          </p>

          <p>
            <strong>ROI:</strong>{" "}
            {solar.roi_percent ?? "N/A"}%
          </p>
        </div>

        {/* WIND */}

        <div
          style={{
            padding: "25px",
            background: "#DBEAFE",
            borderRadius: "12px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.06)",
          }}
        >
          <h2>💨 Wind Investment</h2>

          <p>
            <strong>Capacity:</strong>{" "}
            {wind.capacity_mw ?? "N/A"} MW
          </p>

          <p>
            <strong>Investment:</strong>{" "}
            ₹{wind.investment_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual Revenue:</strong>{" "}
            ₹{wind.annual_revenue_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual O&amp;M:</strong>{" "}
            ₹{wind.annual_om_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Annual Profit:</strong>{" "}
            ₹{wind.annual_profit_crore ?? "N/A"} Cr
          </p>

          <p>
            <strong>Payback:</strong>{" "}
            {wind.payback_years ?? "N/A"} Years
          </p>

          <p>
            <strong>ROI:</strong>{" "}
            {wind.roi_percent ?? "N/A"}%
          </p>
        </div>
      </div>

      {/* ASSUMPTIONS */}

      {investment.assumptions && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "white",
            borderRadius: "12px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.06)",
          }}
        >
          <h2>📋 Financial Assumptions</h2>

          <p>
            Solar Cost: ₹
            {
              investment.assumptions
                .solar_cost_per_mw_crore
            } Cr/MW
          </p>

          <p>
            Wind Cost: ₹
            {
              investment.assumptions
                .wind_cost_per_mw_crore
            } Cr/MW
          </p>

          <p>
            Solar Tariff: ₹
            {
              investment.assumptions
                .solar_tariff_per_kwh
            }/kWh
          </p>

          <p>
            Wind Tariff: ₹
            {
              investment.assumptions
                .wind_tariff_per_kwh
            }/kWh
          </p>

          <p>
            Solar O&amp;M:{" "}
            {
              investment.assumptions
                .solar_om_percent
            }%
          </p>

          <p>
            Wind O&amp;M:{" "}
            {
              investment.assumptions
                .wind_om_percent
            }%
          </p>
        </div>
      )}

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() =>
            navigate("/report")
          }
          style={{
            flex: 1,
            padding: "14px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📊 View Report
        </button>

        <button
          onClick={() =>
            navigate("/forecast")
          }
          style={{
            flex: 1,
            padding: "14px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⚡ View Forecast
        </button>
      </div>
    </div>
  );
}

export default Investment;
