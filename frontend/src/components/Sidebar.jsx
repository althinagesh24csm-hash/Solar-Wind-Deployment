import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#1E293B",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          borderBottom: "1px solid #475569",
          paddingBottom: "15px",
        }}
      >
        ⚡ Menu
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          🏠 Home
        </Link>

        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/projects"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          📁 Projects
        </Link>

        <Link
          to="/sites"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          📍 Sites
        </Link>

        <Link
          to="/assets"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          ⚙️ Assets
        </Link>

        <Link
          to="/forecast"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          ☀️ Forecast
        </Link>

        <Link
          to="/investment"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          💰 Investment
        </Link>
 
        <Link
          to="/suitability"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          🌍 Suitability
        </Link>

        <Link
          to="/report"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          📄 Report
        </Link>

        <Link
          to="/profile"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          👤 Profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;