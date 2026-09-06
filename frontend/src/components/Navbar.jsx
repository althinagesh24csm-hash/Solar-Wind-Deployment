import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove saved login token (if any)
    localStorage.removeItem("token");

    // Redirect to Login page
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      }}
    >
      <h2
        style={{
          color: "#0F172A",
          fontSize: "28px",
          margin: 0,
        }}
      >
        ⚡ Solar & Wind Deployment Intelligence Platform
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: "#0F766E",
            fontSize: "18px",
          }}
        >
          👤 Admin
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;