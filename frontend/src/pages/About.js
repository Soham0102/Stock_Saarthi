export default function About() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 1000 }}>
        <h1 style={{ marginTop: 0 }}>About StockSarthi</h1>
        <p className="muted">Your AI-powered investing companion blending deep learning with human-first design.</p>

        <div className="cards" style={{ marginTop: 20 }}>
          <div className="card">
            <h3>Our Mission</h3>
            <p className="muted">Democratize sophisticated trading intelligence for everyone — from first-time investors to market veterans — with clarity, confidence, and care.</p>
          </div>
          <div className="card">
            <h3>How We Help</h3>
            <ul>
              <li>Smart Stock Predictions — AI-driven trends and price forecasts.</li>
              <li>Guided Decisions — simple Hinglish playbooks and explainers.</li>
              <li>Personalized Plans — tailored to budget and risk levels.</li>
              <li>Real-Time Alerts — act quickly when the market moves.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Values</h3>
            <p className="muted">Transparency, Safety, and Long-term Wealth Creation. Tools that respect risk and teach discipline.</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, alignItems: "center" }}>
          <div style={{ width: 96, height: 96, borderRadius: 16, background: "url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop') center/cover" }} />
          <div>
            <h3 style={{ margin: 0 }}>Soham Tawari</h3>
            <p className="muted" style={{ margin: 0 }}>Founder & Chief Visionary</p>
            <p className="muted" style={{ marginTop: 8 }}>On a mission to make wealth creation accessible through responsible AI. Believes in risk-first investing, disciplined execution, and empowering every investor with actionable clarity.</p>
          </div>
        </div>
      </div>
    </main>
  );
}


