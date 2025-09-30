export default function Home() {
  const heroUrl = "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2400&auto=format&fit=crop";
  return (
    <main>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1 className="hero-title">Trade Smarter with StockSarthi</h1>
          <p className="hero-sub">AI + ML predictions, risk-aware guidance, and real‑time alerts — designed to help you act confidently in fast-moving markets.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn" href="/auth">Get Started</a>
            <a className="btn btn-outline" href="/live">View Live Market</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 40% at 20% 0%, rgba(97,228,168,.12), transparent)", pointerEvents: "none" }} />
        <div className="container reveal">
          <div className="cards">
            <div className="card">
              <h3>AI Stock Predictions</h3>
              <p className="muted">Market trend insights, price movement forecasts, and opportunity detection powered by ML.</p>
            </div>
            <div className="card">
              <h3>Risk-first Guidance</h3>
              <p className="muted">Tell us your budget and risk profile; we curate safer, smarter options for you.</p>
            </div>
            <div className="card">
              <h3>Real-time Alerts</h3>
              <p className="muted">Stay updated with timely notifications on key market moves so you never miss out.</p>
            </div>
            <div className="card">
              <h3>Simple Hinglish</h3>
              <p className="muted">Easy explanations so beginners and pros alike can act with clarity and speed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal">
          <h2 style={{ marginTop: 0 }}>How it works</h2>
          <div className="cards">
            <div className="card"><h3>1. Tell us your goal</h3><p className="muted">Budget, risk, and time horizon.</p></div>
            <div className="card"><h3>2. Get signals & ideas</h3><p className="muted">AI predictions plus human-friendly guidance.</p></div>
            <div className="card"><h3>3. Act with confidence</h3><p className="muted">Track, alert, and iterate.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal">
          <h2 style={{ marginTop: 0 }}>Trusted by learners and pros</h2>
          <div className="cards">
            <div className="card"><h3>4.9/5</h3><p className="muted">User satisfaction</p></div>
            <div className="card"><h3>10k+</h3><p className="muted">Signals generated</p></div>
            <div className="card"><h3>24x7</h3><p className="muted">Market monitoring</p></div>
            <div className="card"><h3>99.9%</h3><p className="muted">Uptime</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}


