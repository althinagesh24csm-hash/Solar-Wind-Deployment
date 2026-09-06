import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionalMap from "../components/RegionalMap";

function Suitability() {
  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLatestAnalysis();
  }, []);

  const loadLatestAnalysis = async () => {
    try {
      setLoading(true);
      setError("");

      // Use the same analysis stored by Dashboard
      const savedLatest =
        localStorage.getItem("latestAnalysis");

      if (savedLatest) {
        const parsed = JSON.parse(savedLatest);

        setAnalysis(parsed);

        const selectedRegion =
          parsed.region ||
          localStorage.getItem("selectedRegion") ||
          "";

        setRegion(selectedRegion);

        if (selectedRegion) {
          await loadRegionalMap(selectedRegion);
        }

        return;
      }

      // Fallback for older saved data
      const savedResult =
        localStorage.getItem("analysisResult");

      if (savedResult) {
        const parsed = JSON.parse(savedResult);

        setAnalysis(parsed);

        const selectedRegion =
          parsed.region ||
          localStorage.getItem("selectedRegion") ||
          "";

        setRegion(selectedRegion);

        // Synchronize old storage with latest storage
        localStorage.setItem(
          "latestAnalysis",
          JSON.stringify(parsed)
        );

        if (selectedRegion) {
          await loadRegionalMap(selectedRegion);
        }

        return;
      }

      setError(
        "No analysis is available. Please start a new analysis."
      );
    } catch (err) {
      console.error(
        "Unable to load latest analysis:",
        err
      );

      setError("Unable to load latest analysis.");
    } finally {
      setLoading(false);
    }
  };

  const loadRegionalMap = async (selectedRegion) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/regional-map/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: selectedRegion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Regional map request failed"
        );
      }

      const data = await response.json();

      setMapData(data);
    } catch (err) {
      console.error(
        "Regional map error:",
        err
      );

      setError(
        "Unable to load regional map."
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const changeRegion = () => {
    navigate("/analysis");
  };

  if (loading && !analysis) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <button
          onClick={goBack}
          style={{
            position: "absolute",
            left: "25px",
            top: "25px",
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

        <h2>🔄 Loading Regional Analysis...</h2>

        <p>
          Loading latest suitability information.
        </p>
      </div>
    );
  }

  if (error && !analysis) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          background: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <button
          onClick={goBack}
          style={{
            position: "absolute",
            left: "25px",
            top: "25px",
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

        <h2>⚠️ {error}</h2>

        <button
          onClick={changeRegion}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🚀 Start New Analysis
        </button>
      </div>
    );
  }

  const suitability =
    analysis?.suitability || {};

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
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
          gap: "15px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <button
            onClick={goBack}
            style={{
              padding: "10px 18px",
              background: "#475569",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              marginBottom: "15px",
            }}
          >
            ← Back
          </button>

          <h1
            style={{
              margin: 0,
              color: "#0F172A",
            }}
          >
            🌍 Regional Suitability Analysis
          </h1>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Latest renewable-energy suitability
            analysis.
          </p>
        </div>

        <button
          onClick={changeRegion}
          style={{
            padding: "12px 20px",
            background: "#0F766E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          🔄 New Analysis
        </button>
      </div>

      {/* SELECTED REGION */}

      <div
        style={{
          marginBottom: "20px",
          padding: "18px 20px",
          background: "#E0F2FE",
          borderRadius: "10px",
          borderLeft: "5px solid #0284C7",
        }}
      >
        <strong>
          📍 Current Analysis Region:
        </strong>{" "}
        {region || "Unknown Region"}
      </div>

      {/* SUITABILITY */}

      {analysis && (
        <div
          style={{
            marginBottom: "24px",
            padding: "22px",
            borderRadius: "12px",
            background: "#F8FAFC",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              color: "#0F172A",
            }}
          >
            {analysis.region || region}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                padding: "18px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <strong>
                Overall Suitability
              </strong>

              <h2
                style={{
                  color: "#0F766E",
                }}
              >
                {suitability.overall_score ??
                  "N/A"}
                %
              </h2>
            </div>

            <div
              style={{
                padding: "18px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <strong>
                Solar Score
              </strong>

              <h2>
                {suitability.solar_score ??
                  "N/A"}
                %
              </h2>
            </div>

            <div
              style={{
                padding: "18px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <strong>
                Wind Score
              </strong>

              <h2>
                {suitability.wind_score ??
                  "N/A"}
                %
              </h2>
            </div>

            <div
              style={{
                padding: "18px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <strong>
                Recommendation
              </strong>

              <h2>
                🏆{" "}
                {suitability.recommendation ||
                  "N/A"}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* REGIONAL MAP */}

      {mapData && (
        <>
          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <h2>📍 Regional Suitability Map</h2>

            <p
              style={{
                color: "#475569",
              }}
            >
              Green areas indicate stronger
              renewable-energy suitability,
              while orange and red areas
              indicate lower suitability.
            </p>

            {mapData.best_location && (
              <p>
                ⭐{" "}
                <strong>
                  Best Location:
                </strong>{" "}
                {
                  mapData.best_location
                    .latitude
                }
                ,{" "}
                {
                  mapData.best_location
                    .longitude
                }{" "}
                —{" "}
                {
                  mapData.best_location
                    .score
                }
                %
              </p>
            )}
          </div>

          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 4px 16px rgba(0,0,0,0.12)",
            }}
          >
            <RegionalMap
              latitude={
                mapData.center.latitude
              }
              longitude={
                mapData.center.longitude
              }
              score={
                suitability.overall_score || 0
              }
              locations={
                mapData.locations || []
              }
            />
          </div>
        </>
      )}

      {loading && (
        <p
          style={{
            marginTop: "15px",
            color: "#64748B",
          }}
        >
          🔄 Updating regional map...
        </p>
      )}

      {error && analysis && (
        <p
          style={{
            marginTop: "15px",
            color: "#DC2626",
          }}
        >
          ⚠️ {error}
        </p>
      )}

      {/* BOTTOM BACK BUTTON */}

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <button
          onClick={goBack}
          style={{
            padding: "12px 30px",
            background: "#475569",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Suitability;