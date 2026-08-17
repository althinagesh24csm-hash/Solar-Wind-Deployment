import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F766E,#2563EB)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "900px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "20px",
          }}
        >
          ⚡ Solar & Wind Deployment Intelligence Platform
        </h1>

        <p
          style={{
            fontSize: "22px",
            marginBottom: "40px",
            lineHeight: "35px",
          }}
        >
          AI-powered Renewable Energy Planning System for
          Solar, Wind and Hybrid Projects.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "15px 35px",
                background: "#ffffff",
                color: "#0F766E",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "15px 35px",
                background: "#F59E0B",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;