export default function Services() {
  return (
    <main className="section">
      <div className="container">
        <h1>Services</h1>
        <p className="muted">A complete suite to help you invest smarter.</p>
        <div className="cards" style={{ marginTop: 16 }}>
          <a href="/live" className="card">
            <h3>Live Market</h3>
            <p className="muted">Real-time quotes from Yahoo Finance.</p>
          </a>
          <a href="/stoxo" className="card">
            <h3>Stoxo AI</h3>
            <p className="muted">Budget & risk-based ideas and learning prompts.</p>
          </a>
          <div className="card">
            <h3>Trading Signals</h3>
            <p className="muted">Buy/Sell/Neutral tags from ML model (integration-ready).</p>
          </div>
          <div className="card">
            <h3>Mutual Fund Advice</h3>
            <p className="muted">Goal-based MF baskets for SIP and lumpsum.</p>
          </div>
          <div className="card">
            <h3>Risk Profiler</h3>
            <p className="muted">Calibrate your appetite; get a personalized plan.</p>
          </div>
          <div className="card">
            <h3>Education</h3>
            <p className="muted">Short Hinglish explainers on market concepts.</p>
          </div>
        </div>
      </div>
    </main>
  );
}


