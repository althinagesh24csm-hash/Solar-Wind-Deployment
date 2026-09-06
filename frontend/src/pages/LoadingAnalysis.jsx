import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoadingAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  useEffect(() => {
    if (!result) {
      navigate("/analysis");
      return;
    }

    const timer = setTimeout(() => {
      navigate("/report", {
        state: result,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [result, navigate]);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          border: "7px solid #E2E8F0",
          borderTop: "7px solid #0F766E",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <h1 style={{ marginTop: "30px", color: "#0F172A" }}>
        🔄 Running Complete Analysis
      </h1>

      <p style={{ color: "#64748B" }}>
        Analyzing renewable energy potential...
      </p>

      <p style={{ color: "#64748B" }}>
        Please wait...
      </p>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingAnalysis;