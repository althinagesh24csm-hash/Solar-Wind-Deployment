import { useEffect, useState } from "react";
import { getProjects } from "../api/projectsApi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const region =
    localStorage.getItem("selectedRegion") || "";

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      // Keep only projects for the selected region
      const filteredProjects = data.filter((project) => {
        if (!region) return true;

        return (
          project.location &&
          project.location.toLowerCase().trim() ===
            region.toLowerCase().trim()
        );
      });

      setProjects(filteredProjects);
    } catch (err) {
      console.error("Projects error:", err);
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#0F172A" }}>
        📁 Projects
      </h1>

      <p style={{ color: "#64748B" }}>
        Renewable energy projects for{" "}
        <strong>{region || "Current Region"}</strong>
      </p>

      <div
        style={{
          background: "#ECFDF5",
          color: "#065F46",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        📍 Current Region:{" "}
        <strong>{region || "N/A"}</strong>
      </div>

      {loading && <h2>⏳ Loading projects...</h2>}

      {!loading && error && (
        <div
          style={{
            background: "#FEF2F2",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>⚠️ {error}</h2>

          <button
            onClick={loadProjects}
            style={{
              padding: "10px 20px",
              background: "#0F766E",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "50px" }}>📂</div>

          <h2>No Projects Found</h2>

          <p style={{ color: "#64748B" }}>
            No projects are available for{" "}
            <strong>{region || "this region"}</strong>.
          </p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            overflowX: "auto",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>📋 Project List</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0F766E",
                  color: "white",
                }}
              >
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>
                  Project Name
                </th>
                <th style={{ padding: "12px" }}>
                  Description
                </th>
                <th style={{ padding: "12px" }}>
                  Location
                </th>
                <th style={{ padding: "12px" }}>
                  Created By
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  style={{
                    borderBottom:
                      "1px solid #E2E8F0",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    #{project.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <strong>
                      {project.project_name}
                    </strong>
                  </td>

                  <td style={{ padding: "12px" }}>
                    {project.description ||
                      "No description"}
                  </td>

                  <td style={{ padding: "12px" }}>
                    📍 {project.location || "N/A"}
                  </td>

                  <td style={{ padding: "12px" }}>
                    User #{project.created_by}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Projects;