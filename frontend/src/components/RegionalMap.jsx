import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapBounds({ points }) {
  const map = useMap();

  if (points.length > 1) {
    const bounds = points.map((point) => [
      point.latitude,
      point.longitude,
    ]);

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }

  return null;
}

function RegionalMap({ latitude, longitude, score, locations = [] }) {
  const getColor = (value) => {
    if (value >= 80) return "green";
    if (value >= 60) return "orange";
    return "red";
  };

  const points =
    locations.length > 0
      ? locations
      : [
          {
            latitude,
            longitude,
            score,
            label: "Regional Suitability",
          },
        ];

  const bestScore = Math.max(
    ...points.map((point) => Number(point.score) || 0)
  );

  return (
    <div style={{ width: "100%", height: "550px", position: "relative" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBounds points={points} />

        {points.map((point, index) => {
          const isBest =
            Number(point.score) === bestScore && points.length > 1;

          const color = isBest ? "#f59e0b" : getColor(point.score);

          return (
            <CircleMarker
              key={point.id || index}
              center={[point.latitude, point.longitude]}
              radius={isBest ? 17 : 13}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: isBest ? 4 : 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: "190px" }}>
                  <h3 style={{ marginTop: 0 }}>
                    {isBest ? "⭐ Best Location" : "📍 Location"}
                  </h3>

                  <p>
                    <strong>Suitability:</strong> {point.score}%
                  </p>

                  <p>
                    <strong>Status:</strong> {point.status}
                  </p>

                  <p>
                    <strong>Latitude:</strong> {point.latitude}
                    <br />
                    <strong>Longitude:</strong> {point.longitude}
                  </p>

                  {point.solar_score !== undefined && (
                    <p>☀️ <strong>Solar:</strong> {point.solar_score}%</p>
                  )}

                  {point.wind_score !== undefined && (
                    <p>🌬️ <strong>Wind:</strong> {point.wind_score}%</p>
                  )}

                  {point.temperature_score !== undefined && (
                    <p>
                      🌡️ <strong>Temperature:</strong>{" "}
                      {point.temperature_score}%
                    </p>
                  )}

                  {point.solar_irradiance !== undefined && (
                    <p>
                      Solar Irradiance: {point.solar_irradiance} kWh/m²/day
                    </p>
                  )}

                  {point.wind_speed !== undefined && (
                    <p>Wind Speed: {point.wind_speed} m/s</p>
                  )}

                  {point.temperature !== undefined && (
                    <p>Temperature: {point.temperature} °C</p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: "white",
          padding: "14px 16px",
          borderRadius: "10px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.25)",
          fontSize: "14px",
        }}
      >
        <strong>Suitability</strong>

        <div>
          <span style={{ color: "green", fontSize: "20px" }}>●</span>
          {" "}Excellent (80–100%)
        </div>

        <div>
          <span style={{ color: "orange", fontSize: "20px" }}>●</span>
          {" "}Moderate (60–79%)
        </div>

        <div>
          <span style={{ color: "red", fontSize: "20px" }}>●</span>
          {" "}Poor (&lt;60%)
        </div>

        <div>
          <span style={{ color: "#f59e0b", fontSize: "20px" }}>★</span>
          {" "}Best Location
        </div>
      </div>
    </div>
  );
}

export default RegionalMap;
