import { useEffect, useState } from "react";

export default function Dashboard() {
  const [token] = useState(() => localStorage.getItem("stocksarthi_token"));

  useEffect(() => {
    // Here you can validate token or fetch profile
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1>Welcome to your Dashboard</h1>
        <p className="muted">Choose a service to continue.</p>

        <div className="cards" style={{ marginTop: 16 }}>
          <a href="/live" className="card">
            <h3>Live Market</h3>
            <p className="muted">Real-time quotes and trends from Yahoo Finance.</p>
          </a>
          <a href="/stoxo" className="card">
            <h3>Stoxo — AI Suggestions</h3>
            <p className="muted">Get ideas based on your budget and risk appetite.</p>
          </a>
          <div className="card">
            <h3>Trading Signals (Demo)</h3>
            <p className="muted">Buy/Sell checks from your ML model (API placeholder).</p>
            <button className="btn" disabled>Coming Soon</button>
          </div>
          <div className="card">
            <h3>Mutual Fund Advice</h3>
            <p className="muted">Curated MF ideas by risk category and time horizon.</p>
            <button className="btn" disabled>Coming Soon</button>
          </div>
        </div>

        {token ? (
          <div className="muted" style={{ marginTop: 12 }}>Signed in (demo token stored locally).</div>
        ) : (
          <div className="muted" style={{ marginTop: 12 }}>Not signed in.</div>
        )}
      </div>
    </main>
  );
}


