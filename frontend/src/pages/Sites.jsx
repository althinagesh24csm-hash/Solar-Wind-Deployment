import { useEffect, useState } from "react";
import { getSites } from "../api/sitesApi";
import { getProjects } from "../api/projectsApi";

function Sites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const region =
    localStorage.getItem("selectedRegion") || "";

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setLoading(true);
      setError("");

      const [allSites, allProjects] =
        await Promise.all([
          getSites(),
          getProjects(),
        ]);

      const regionProjects = allProjects.filter(
        (project) => {
          if (!region) return true;

          return (
            project.location &&
            project.location.toLowerCase().trim() ===
              region.toLowerCase().trim()
          );
        }
      );

      const projectIds = regionProjects.map(
        (project) => project.id
      );

      const filteredSites = allSites.filter(
        (site) =>
          site.project_id != null &&
          projectIds.includes(site.project_id)
      );

      setSites(filteredSites);
    } catch (err) {
      console.error("Sites error:", err);
      setError("Unable to load sites.");
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
        📍 Sites
      </h1>

      <p style={{ color: "#64748B" }}>
        Renewable energy sites for{" "}
        <strong>{region || "Current Region"}</strong>
      </p>

      <div
        style={{
          background: "#E0F2FE",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        📍 Current Region:{" "}
        <strong>{region || "N/A"}</strong>
      </div>

      {loading && <h2>⏳ Loading sites...</h2>}

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
            onClick={loadSites}
            style={{
              padding: "10px 20px",
              background: "#0F766E",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {!loading && !error && sites.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "50px" }}>📍</div>

          <h2>No Sites Found</h2>

          <p style={{ color: "#64748B" }}>
            No sites are linked to{" "}
            <strong>{region || "this region"}</strong>.
          </p>
        </div>
      )}

      {!loading && !error && sites.length > 0 && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            overflowX: "auto",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>📋 Site List</h2>

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
                  Site Name
                </th>
                <th style={{ padding: "12px" }}>
                  Latitude
                </th>
                <th style={{ padding: "12px" }}>
                  Longitude
                </th>
                <th style={{ padding: "12px" }}>
                  Capacity
                </th>
                <th style={{ padding: "12px" }}>
                  Type
                </th>
                <th style={{ padding: "12px" }}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {sites.map((site) => (
                <tr
                  key={site.id}
                  style={{
                    borderBottom:
                      "1px solid #E2E8F0",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    #{site.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <strong>
                      {site.site_name}
                    </strong>
                  </td>

                  <td style={{ padding: "12px" }}>
                    {site.latitude}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {site.longitude}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {site.capacity_mw} MW
                  </td>

                  <td style={{ padding: "12px" }}>
                    {site.site_type}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {site.status}
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

export default Sites;