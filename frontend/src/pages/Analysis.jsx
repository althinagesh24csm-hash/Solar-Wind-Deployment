import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { runAnalysis } from "../api/analysisApi";

function Analysis() {
  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const startAnalysis = async () => {
    if (!region.trim()) {
      alert("Please enter a region.");
      return;
    }

    try {
      setLoading(true);

      console.log("Starting analysis for:", region);

      const result = await runAnalysis(region.trim());

      console.log("Analysis Result:", result);

      // -----------------------------------------
      // SAVE COMPLETE ANALYSIS
      // -----------------------------------------

      localStorage.setItem(
        "latestAnalysis",
        JSON.stringify(result)
      );

      // Also save the selected region
      localStorage.setItem(
        "selectedRegion",
        region.trim()
      );

      console.log(
        "Latest analysis saved to localStorage."
      );

      // -----------------------------------------
      // GO TO LOADING PAGE
      // -----------------------------------------

      navigate("/loading", {
        state: result,
      });

    } catch (error) {
      console.error(
        "Analysis failed:",
        error
      );

      if (error.response) {
        console.log(
          "Status:",
          error.response.status
        );

        console.log(
          "Data:",
          error.response.data
        );
      }

      alert("Analysis Failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "40px auto",
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,.1)",
      }}
    >

      <h1
        style={{
          color: "#0F172A",
        }}
      >
        🌍 New Site Analysis
      </h1>

      <p
        style={{
          color: "#64748B",
        }}
      >
        Enter a region to automatically generate
        the complete renewable energy analysis.
      </p>

      <br />

      <label>
        <strong>Region</strong>
      </label>

      <input
        type="text"
        placeholder="Example: Hyderabad"
        value={region}
        onChange={(e) =>
          setRegion(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !loading
          ) {
            startAnalysis();
          }
        }}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          marginBottom: "25px",
          borderRadius: "8px",
          border:
            "1px solid #CBD5E1",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={startAnalysis}
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px",
          background:
            loading
              ? "#94A3B8"
              : "#0F766E",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: loading
            ? "not-allowed"
            : "pointer",
        }}
      >
        {loading
          ? "🔄 Running Analysis..."
          : "🚀 Start Analysis"}
      </button>

    </div>
  );
}

export default Analysis;
