import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProfile,
  updateProfile,
} from "../api/authApi";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();

      setUser(data);
      setFullName(data.full_name);
      setEmail(data.email);
    } catch (error) {
      console.error("Profile loading error:", error);

      // Token is invalid/expired
      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!fullName || !email) {
      alert("Name and Email are required");
      return;
    }

    try {
      const updatedUser =
        await updateProfile({
          full_name: fullName,
          email: email,
        });

      setUser(updatedUser);
      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Unable to update profile"
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F1F5F9",
        }}
      >
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F1F5F9",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Unable to load profile</h2>

          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "15px",
              padding: "12px 25px",
              background: "#0F766E",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0F172A",
          marginBottom: "30px",
        }}
      >
        👤 User Profile
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          borderRadius: "15px",
          padding: "35px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        {/* PROFILE ICON */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              background: "#0F766E",
              color: "white",
              fontSize: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            👤
          </div>

          <h2 style={{ marginTop: "20px" }}>
            {user.full_name}
          </h2>

          <p
            style={{
              color: "#64748B",
            }}
          >
            Renewable Energy Administrator
          </p>
        </div>

        {/* USER DETAILS */}

        {!editing ? (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                fontSize: "18px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Name
                  </td>

                  <td>
                    {user.full_name}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Email
                  </td>

                  <td>
                    {user.email}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Role
                  </td>

                  <td>
                    {user.role}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Status
                  </td>

                  <td
                    style={{
                      color: "green",
                    }}
                  >
                    ● Active
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "15px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Last Login
                  </td>

                  <td>
                    Today
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                textAlign: "center",
                marginTop: "35px",
              }}
            >
              <button
                onClick={() =>
                  setEditing(true)
                }
                style={{
                  background:
                    "#0F766E",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 30px",
                  borderRadius:
                    "8px",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </>
        ) : (
          /* EDIT FORM */
          <div>
            <h2>
              ✏️ Edit Profile
            </h2>

            <label
              style={{
                display: "block",
                marginTop: "20px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                marginTop: "20px",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #CBD5E1",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing:
                  "border-box",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              <button
                onClick={
                  handleUpdate
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  background:
                    "#0F766E",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                💾 Save Changes
              </button>

              <button
                onClick={() =>
                  setEditing(false)
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  background:
                    "#64748B",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight:
                    "bold",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;