import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/neo/feed";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        // sort by highest risk score
        const sorted = res.data.sort(
          (a, b) => b.riskScore - a.riskScore
        );
        setAsteroids(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load asteroid data");
        setLoading(false);
      });
  }, []);

  const riskColor = (level) => {
    if (level === "HIGH") return "#ff4d4f";
    if (level === "MEDIUM") return "#faad14";
    return "#52c41a";
  };

  if (loading) return <h2>🌌 Loading asteroid data...</h2>;
  if (error) return <h2>❌ {error}</h2>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>☄️ Cosmic Watch</h1>
      <p style={styles.subtitle}>
        Near-Earth Object Risk Monitoring Dashboard
      </p>

      <div style={styles.grid}>
        {asteroids.map((neo) => {
          const approach = neo.close_approach_data?.[0];

          return (
            <div key={neo.id} style={styles.card}>
              <h3>{neo.name}</h3>

              <span
                style={{
                  ...styles.badge,
                  backgroundColor: riskColor(neo.riskLevel),
                }}
              >
                {neo.riskLevel}
              </span>

              <p><b>Risk Score:</b> {neo.riskScore}</p>
              <p>
                <b>Hazardous:</b>{" "}
                {neo.is_potentially_hazardous_asteroid ? "Yes ⚠️" : "No"}
              </p>

              {approach && (
                <>
                  <p>
                    <b>Miss Distance:</b>{" "}
                    {Number(approach.miss_distance.kilometers).toLocaleString()} km
                  </p>
                  <p>
                    <b>Velocity:</b>{" "}
                    {Number(
                      approach.relative_velocity.kilometers_per_hour
                    ).toLocaleString()} km/h
                  </p>
                </>
              )}

              <ul>
                {neo.riskExplanation?.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0b1026, #000)",
    color: "#fff",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "1.2rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
};

export default App;
