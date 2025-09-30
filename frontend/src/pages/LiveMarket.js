import { useEffect, useMemo, useState } from "react";
import { safeFetch } from "../lib/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LiveMarket() {
  const [symbols, setSymbols] = useState("AAPL,MSFT,GOOGL,TSLA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [years, setYears] = useState(1);
  const [prediction, setPrediction] = useState(null);

  async function load() {
    try {
      setLoading(true); setError("");
      const json = await safeFetch(`/api/quotes?symbols=${encodeURIComponent(symbols)}`);
      const results = json?.quoteResponse?.result || [];
      setData(results);
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function predictMain() {
    try {
      setError("");
      const primary = (symbols.split(",")[0] || "AAPL").trim();
      const json = await safeFetch(`/api/predict?symbol=${encodeURIComponent(primary)}&years=${years}`);
      setPrediction(json);
    } catch (e) {
      setError(String(e?.message || e));
    }
  }

  const chartData = useMemo(() => {
    if (!prediction?.forecast?.length) return null;
    return {
      labels: prediction.forecast.map(f => f.dayIndex),
      datasets: [
        {
          label: `${prediction.symbol} forecast`,
          data: prediction.forecast.map(f => f.price),
          borderColor: "#61e4a8",
          backgroundColor: "rgba(97,228,168,.2)",
          pointRadius: 0,
        },
      ],
    };
  }, [prediction]);

  return (
    <main className="section">
      <div className="container">
        <h1>Live Market</h1>
        <div className="card" style={{ margin: "12px 0", display: "grid", gap: 12 }}>
          <label>
            Symbols (comma separated)
            <input className="input" value={symbols} onChange={(e) => setSymbols(e.target.value)} placeholder="e.g. AAPL,MSFT,GOOGL" />
          </label>
          <div>
            <button className="btn" onClick={load} disabled={loading}>{loading ? "Loading..." : "Fetch"}</button>
          </div>
        </div>

        <div className="card" style={{ margin: "12px 0", display: "grid", gap: 12 }}>
          <label>
            Prediction duration (years)
            <select className="input" value={years} onChange={(e) => setYears(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
          <div>
            <button className="btn" onClick={predictMain}>Predict</button>
          </div>
          {chartData && (
            <div style={{ height: 360 }}>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "#a3b2c7" } }, tooltip: { intersect: false } }, scales: { x: { ticks: { color: "#a3b2c7" } }, y: { ticks: { color: "#a3b2c7" } } } }} />
            </div>
          )}
        </div>

        {error && <div className="card" style={{ borderColor: "#ef4444", color: "#fecaca" }}>Error: {error}</div>}

        <div className="cards">
          {data.map((q) => (
            <div className="card" key={q.symbol}>
              <h3>{q.shortName || q.symbol}</h3>
              <p className="muted">{q.symbol} · {q.exchange}</p>
              <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>
                  {q.regularMarketPrice}
                </div>
                <div style={{ color: q.regularMarketChange >= 0 ? "#22c55e" : "#ef4444" }}>
                  {q.regularMarketChange?.toFixed(2)} ({q.regularMarketChangePercent?.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


