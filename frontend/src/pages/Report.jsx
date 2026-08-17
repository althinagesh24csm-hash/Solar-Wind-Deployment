import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  let result = location.state;

  // If page was refreshed/opened directly,
  // recover the latest analysis from localStorage.
  if (!result) {
    const savedAnalysis =
      localStorage.getItem("latestAnalysis");

    if (savedAnalysis) {
      try {
        result = JSON.parse(savedAnalysis);
      } catch (error) {
        console.error(
          "Unable to read saved analysis:",
          error
        );
      }
    }
  }

  if (!result) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>
          No analysis result found.
        </h2>

        <button
          onClick={() =>
            navigate("/analysis")
          }
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Start New Analysis
        </button>
      </div>
    );
  }

  const solar =
    result.solar_data || {};

  const wind =
    result.wind_data || {};

  const forecast =
    result.forecast || {};

  const solarForecast =
    forecast.solar || {};

  const windForecast =
    forecast.wind || {};

  const suitability =
    result.suitability || {};

  const investment =
    result.investment || {};

  const solarInvestment =
    investment.solar || {};

  const windInvestment =
    investment.wind || {};

  // =====================================================
  // PDF
  // =====================================================

  const downloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const margin = 20;

    let y = 20;

    const addLine = (
      text,
      bold = false
    ) => {
      doc.setFont(
        "helvetica",
        bold
          ? "bold"
          : "normal"
      );

      doc.setFontSize(10);

      doc.setTextColor(
        30,
        41,
        59
      );

      const lines =
        doc.splitTextToSize(
          String(text),
          pageWidth -
            margin * 2
        );

      doc.text(
        lines,
        margin,
        y
      );

      y +=
        lines.length * 6 +
        2;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    const addSection = (
      title
    ) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      y += 5;

      doc.setFillColor(
        15,
        118,
        110
      );

      doc.rect(
        margin,
        y - 6,
        pageWidth -
          margin * 2,
        9,
        "F"
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(12);

      doc.setTextColor(
        255,
        255,
        255
      );

      doc.text(
        title,
        margin + 3,
        y
      );

      y += 10;
    };

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(20);

    doc.setTextColor(
      15,
      23,
      42
    );

    doc.text(
      "Renewable Energy Analysis Report",
      margin,
      y
    );

    y += 10;

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(12);

    doc.text(
      `Region: ${
        result.region || "N/A"
      }`,
      margin,
      y
    );

    y += 12;

    addLine(
      `Analysis ID: ${
        result.analysis_id ||
        "N/A"
      }`
    );

    addSection(
      "Location Information"
    );

    addLine(
      `Location: ${
        result.location
          ?.display_name ||
        "N/A"
      }`
    );

    addLine(
      `Latitude: ${
        result.location
          ?.latitude ??
        "N/A"
      }`
    );

    addLine(
      `Longitude: ${
        result.location
          ?.longitude ??
        "N/A"
      }`
    );

    addSection(
      "Renewable Resource Assessment"
    );

    addLine(
      `Solar Irradiance: ${
        solar.average_solar_irradiance ??
        "N/A"
      } ${
        solar.unit_solar ||
        "kWh/m²/day"
      }`
    );

    addLine(
      `Average Temperature: ${
        solar.average_temperature ??
        "N/A"
      } °C`
    );

    addLine(
      `Average Wind Speed: ${
        wind.average_wind_speed ??
        "N/A"
      } ${
        wind.unit_speed ||
        "m/s"
      }`
    );

    addLine(
      `Wind Power Density: ${
        wind.wind_power_density ??
        "N/A"
      } ${
        wind.unit_power_density ||
        "W/m²"
      }`
    );

    addSection(
      "Energy Forecast"
    );

    addLine(
      `Solar Annual Energy: ${
        solarForecast.annual_energy_mwh ??
        "N/A"
      } MWh`
    );

    addLine(
      `Wind Annual Energy: ${
        windForecast.annual_energy_mwh ??
        "N/A"
      } MWh`
    );

    addSection(
      "Site Suitability Assessment"
    );

    addLine(
      `Overall Suitability: ${
        suitability.overall_score ??
        "N/A"
      }%`,
      true
    );

    addLine(
      `Solar Score: ${
        suitability.solar_score ??
        "N/A"
      }%`
    );

    addLine(
      `Temperature Score: ${
        suitability.temperature_score ??
        "N/A"
      }%`
    );

    addLine(
      `Wind Score: ${
        suitability.wind_score ??
        "N/A"
      }%`
    );

    addLine(
      `Recommendation: ${
        suitability.recommendation ||
        "N/A"
      }`,
      true
    );

    addSection(
      "Investment Analysis"
    );

    addLine(
      "SOLAR INVESTMENT",
      true
    );

    addLine(
      `Investment: ${
        solarInvestment.investment_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual Revenue: ${
        solarInvestment.annual_revenue_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual O&M: ${
        solarInvestment.annual_om_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual Profit: ${
        solarInvestment.annual_profit_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Payback: ${
        solarInvestment.payback_years ??
        "N/A"
      } years`
    );

    addLine(
      `ROI: ${
        solarInvestment.roi_percent ??
        "N/A"
      }%`
    );

    addLine(
      "WIND INVESTMENT",
      true
    );

    addLine(
      `Investment: ${
        windInvestment.investment_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual Revenue: ${
        windInvestment.annual_revenue_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual O&M: ${
        windInvestment.annual_om_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Annual Profit: ${
        windInvestment.annual_profit_crore ??
        "N/A"
      } Crore`
    );

    addLine(
      `Payback: ${
        windInvestment.payback_years ??
        "N/A"
      } years`
    );

    addLine(
      `ROI: ${
        windInvestment.roi_percent ??
        "N/A"
      }%`
    );

    addLine(
      `Recommended Investment: ${
        investment.recommendation ||
        "N/A"
      }`,
      true
    );

    addSection(
      "Analysis Summary"
    );

    addLine(
      `Region: ${
        result.region ||
        "N/A"
      }`,
      true
    );

    addLine(
      `Overall Suitability: ${
        suitability.overall_score ??
        "N/A"
      }%`
    );

    addLine(
      `Solar Annual Generation: ${
        solarForecast.annual_energy_mwh ??
        "N/A"
      } MWh`
    );

    addLine(
      `Wind Annual Generation: ${
        windForecast.annual_energy_mwh ??
        "N/A"
      } MWh`
    );

    addLine(
      `Technology Recommendation: ${
        suitability.recommendation ||
        "N/A"
      }`
    );

    addLine(
      `Investment Recommendation: ${
        investment.recommendation ||
        "N/A"
      }`
    );

    const pageCount =
      doc.internal.getNumberOfPages();

    for (
      let i = 1;
      i <= pageCount;
      i++
    ) {
      doc.setPage(i);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        `Solar & Wind Deployment Intelligence Platform | Page ${i} of ${pageCount}`,
        margin,
        290
      );
    }

    doc.save(
      `Renewable_Energy_Report_${
        result.region ||
        "Analysis"
      }.pdf`
    );
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "auto",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h1>
          📊 Renewable Energy Analysis Report
        </h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "18px",
          }}
        >
          Complete renewable energy
          assessment for{" "}
          <strong>
            {result.region}
          </strong>
        </p>
      </div>

      <h2
        style={{
          marginTop: "35px",
        }}
      >
        📍 Location Information
      </h2>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <p>
          <strong>
            Location:
          </strong>{" "}
          {result.location
            ?.display_name ||
            "N/A"}
        </p>

        <p>
          <strong>
            Latitude:
          </strong>{" "}
          {result.location
            ?.latitude ??
            "N/A"}
        </p>

        <p>
          <strong>
            Longitude:
          </strong>{" "}
          {result.location
            ?.longitude ??
            "N/A"}
        </p>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        ☀️ Solar & 💨 Wind Resources
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "25px",
            background:
              "#FEF3C7",
            borderRadius: "12px",
          }}
        >
          <h2>
            ☀️ Solar Resource
          </h2>

          <p>
            Irradiance:{" "}
            <strong>
              {
                solar.average_solar_irradiance ??
                "N/A"
              }
            </strong>{" "}
            kWh/m²/day
          </p>

          <p>
            Temperature:{" "}
            <strong>
              {
                solar.average_temperature ??
                "N/A"
              }
            </strong>{" "}
            °C
          </p>
        </div>

        <div
          style={{
            padding: "25px",
            background:
              "#DBEAFE",
            borderRadius: "12px",
          }}
        >
          <h2>
            💨 Wind Resource
          </h2>

          <p>
            Wind Speed:{" "}
            <strong>
              {
                wind.average_wind_speed ??
                "N/A"
              }
            </strong>{" "}
            m/s
          </p>

          <p>
            Power Density:{" "}
            <strong>
              {
                wind.wind_power_density ??
                "N/A"
              }
            </strong>{" "}
            W/m²
          </p>
        </div>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        ⚡ Energy Forecast
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "25px",
            background:
              "#DCFCE7",
            borderRadius: "12px",
          }}
        >
          <h2>
            ☀️ Solar Energy
          </h2>

          <p>
            Daily:{" "}
            <strong>
              {
                solarForecast.daily_energy_mwh ??
                "N/A"
              }{" "}
              MWh
            </strong>
          </p>

          <p>
            Annual:{" "}
            <strong>
              {
                solarForecast.annual_energy_mwh ??
                "N/A"
              }{" "}
              MWh
            </strong>
          </p>
        </div>

        <div
          style={{
            padding: "25px",
            background:
              "#E0F2FE",
            borderRadius: "12px",
          }}
        >
          <h2>
            💨 Wind Energy
          </h2>

          <p>
            Daily:{" "}
            <strong>
              {
                windForecast.daily_energy_mwh ??
                "N/A"
              }{" "}
              MWh
            </strong>
          </p>

          <p>
            Annual:{" "}
            <strong>
              {
                windForecast.annual_energy_mwh ??
                "N/A"
              }{" "}
              MWh
            </strong>
          </p>
        </div>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        🎯 Site Suitability
      </h2>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h2>
          Overall Score:{" "}
          <span
            style={{
              color: "#0F766E",
            }}
          >
            {
              suitability.overall_score ??
              "N/A"
            }%
          </span>
        </h2>

        <p>
          Solar:{" "}
          {suitability.solar_score ??
            "N/A"}%
        </p>

        <p>
          Temperature:{" "}
          {suitability.temperature_score ??
            "N/A"}%
        </p>

        <p>
          Wind:{" "}
          {suitability.wind_score ??
            "N/A"}%
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background:
              "#DCFCE7",
            borderRadius: "10px",
          }}
        >
          <h2>
            🏆 Recommendation:{" "}
            {
              suitability.recommendation ||
              "N/A"
            }
          </h2>
        </div>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        💰 Investment Analysis
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "25px",
            background:
              "#FEF3C7",
            borderRadius: "12px",
          }}
        >
          <h2>
            ☀️ Solar Investment
          </h2>

          <p>
            Investment:{" "}
            {solarInvestment.investment_crore ??
              "N/A"} Crore
          </p>

          <p>
            Revenue:{" "}
            {solarInvestment.annual_revenue_crore ??
              "N/A"} Crore
          </p>

          <p>
            Profit:{" "}
            {solarInvestment.annual_profit_crore ??
              "N/A"} Crore
          </p>

          <p>
            Payback:{" "}
            {solarInvestment.payback_years ??
              "N/A"} years
          </p>

          <p>
            ROI:{" "}
            {solarInvestment.roi_percent ??
              "N/A"}%
          </p>
        </div>

        <div
          style={{
            padding: "25px",
            background:
              "#DBEAFE",
            borderRadius: "12px",
          }}
        >
          <h2>
            💨 Wind Investment
          </h2>

          <p>
            Investment:{" "}
            {windInvestment.investment_crore ??
              "N/A"} Crore
          </p>

          <p>
            Revenue:{" "}
            {windInvestment.annual_revenue_crore ??
              "N/A"} Crore
          </p>

          <p>
            Profit:{" "}
            {windInvestment.annual_profit_crore ??
              "N/A"} Crore
          </p>

          <p>
            Payback:{" "}
            {windInvestment.payback_years ??
              "N/A"} years
          </p>

          <p>
            ROI:{" "}
            {windInvestment.roi_percent ??
              "N/A"}%
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background:
            "#DCFCE7",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h2>
          🏆 Recommended Investment:{" "}
          {
            investment.recommendation ||
            "N/A"
          }
        </h2>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        📌 Analysis Summary
      </h2>

      <div
        style={{
          padding: "25px",
          background:
            "#0F172A",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <p>
          Analysis for{" "}
          <strong>
            {result.region}
          </strong>
          .
        </p>

        <p>
          Overall suitability:{" "}
          <strong>
            {
              suitability.overall_score ??
              "N/A"
            }%
          </strong>
        </p>

        <p>
          Technology recommendation:{" "}
          <strong>
            {
              suitability.recommendation ||
              "N/A"
            }
          </strong>
        </p>

        <p>
          Investment recommendation:{" "}
          <strong>
            {
              investment.recommendation ||
              "N/A"
            }
          </strong>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "12px",
          marginTop: "40px",
        }}
      >
        <button
          onClick={downloadPDF}
          style={{
            padding: "14px",
            background:
              "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📄 Download PDF
        </button>

        <button
          onClick={() =>
            navigate(-1)
          }
          style={{
            padding: "14px",
            background:
              "#64748B",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <button
          onClick={() =>
            navigate("/analysis")
          }
          style={{
            padding: "14px",
            background:
              "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 New Analysis
        </button>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            padding: "14px",
            background:
              "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📊 Dashboard
        </button>
      </div>
    </div>
  );
}

export default Report;
