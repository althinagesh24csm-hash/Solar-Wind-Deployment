import { useEffect, useState } from "react";
import { getAssets } from "../api/assetsApi";
import { getSites } from "../api/sitesApi";
import { getProjects } from "../api/projectsApi";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const region =
    localStorage.getItem("selectedRegion") || "";

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        allAssets,
        allSites,
        allProjects,
      ] = await Promise.all([
        getAssets(),
        getSites(),
        getProjects(),
      ]);

      const regionProjects =
        allProjects.filter((project) => {
          if (!region) return true;

          return (
            project.location &&
            project.location.toLowerCase().trim() ===
              region.toLowerCase().trim()
          );
        });

      const projectIds =
        regionProjects.map(
          (project) => project.id
        );

      const regionSites =
        allSites.filter(
          (site) =>
            site.project_id != null &&
            projectIds.includes(site.project_id)
        );

      const siteIds =
        regionSites.map(
          (site) => site.id
        );

      const regionAssets =
        allAssets.filter(
          (asset) =>
            asset.site_id != null &&
            siteIds.includes(asset.site_id)
        );

      setAssets(regionAssets);
    } catch (err) {
      console.error("Assets error:", err);
      setError("Unable to load assets.");
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
        ⚙️ Assets
      </h1>

      <p style={{ color: "#64748B" }}>
        Renewable energy assets for{" "}
        <strong>{region || "Current Region"}</strong>
      </p>

      <div
        style={{
          background: "#F0FDF4",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        📍 Current Region:{" "}
        <strong>{region || "N/A"}</strong>
      </div>

      {loading && <h2>⏳ Loading assets...</h2>}

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
            onClick={loadAssets}
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

      {!loading && !error && assets.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "50px" }}>⚙️</div>

          <h2>No Assets Found</h2>

          <p style={{ color: "#64748B" }}>
            No assets are linked to{" "}
            <strong>{region || "this region"}</strong>.
          </p>
        </div>
      )}

      {!loading && !error && assets.length > 0 && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            overflowX: "auto",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2>📋 Asset List</h2>

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
                  Asset Name
                </th>
                <th style={{ padding: "12px" }}>
                  Type
                </th>
                <th style={{ padding: "12px" }}>
                  Manufacturer
                </th>
                <th style={{ padding: "12px" }}>
                  Capacity
                </th>
                <th style={{ padding: "12px" }}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  style={{
                    borderBottom:
                      "1px solid #E2E8F0",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    #{asset.id}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <strong>
                      {asset.asset_name}
                    </strong>
                  </td>

                  <td style={{ padding: "12px" }}>
                    {asset.asset_type}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {asset.manufacturer}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {asset.capacity}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {asset.status}
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

export default Assets;