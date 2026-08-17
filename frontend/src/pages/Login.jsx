import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      console.log("LOGIN RESPONSE:", data);

      if (!data?.access_token) {
        throw new Error(
          "No access token received"
        );
      }

      // Make absolutely sure token exists
      localStorage.setItem(
        "token",
        data.access_token
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      // Store basic login information
      localStorage.setItem(
        "loggedIn",
        "true"
      );

      alert("Login Successful");

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      if (error.response) {
        console.error(
          "STATUS:",
          error.response.status
        );

        console.error(
          "DATA:",
          error.response.data
        );

        alert(
          error.response.data?.detail ||
          "Invalid Email or Password"
        );
      } else {
        alert(
          "Cannot connect to backend. Make sure FastAPI is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F1F5F9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          maxWidth: "100%",
          background: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0F172A",
            marginBottom: "10px",
          }}
        >
          ⚡ Solar & Wind Platform
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "30px",
          }}
        >
          Welcome Back
        </p>

        <form onSubmit={handleLogin}>
          <label
            style={{
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "8px",
              border:
                "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <div
            style={{
              height: "20px",
            }}
          />

          <label
            style={{
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "8px",
              border:
                "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "25px",
              background: loading
                ? "#94A3B8"
                : "#0F766E",
              color: "white",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;