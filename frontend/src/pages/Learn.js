export default function Learn() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Learn & FAQs</h1>
        <p className="muted">Short Hinglish explainers to level up your market knowledge.</p>
        <div className="cards" style={{ marginTop: 16 }}>
          <div className="card"><h3>What is SIP?</h3><p className="muted">Systematic Investment Plan — thoda-thoda invest karte raho, market timing ke stress se bachoge.</p></div>
          <div className="card"><h3>Stop-loss kyun?</h3><p className="muted">Risk control — losses ko small rakho so profits compound ho sake.</p></div>
          <div className="card"><h3>Index fund kya hota hai?</h3><p className="muted">Passive fund that mirrors an index like NIFTY — low fees, broad exposure.</p></div>
          <div className="card"><h3>What is P/E ratio?</h3><p className="muted">Price-to-Earnings — kitna price aap company ke per-share earnings ke multiple par pay kar rahe ho. High P/E may imply high growth expectations.</p></div>
          <div className="card"><h3>Large/Mid/Small cap?</h3><p className="muted">Market-cap buckets: Large cap = stable, Mid = growth potential with risk, Small = high risk/high reward. Portfolio mix depends on risk profile.</p></div>
          <div className="card"><h3>Diversification</h3><p className="muted">Alag-alag sectors/assets me invest karo to single bet risk kam ho. Don’t keep all eggs in one basket.</p></div>
          <div className="card"><h3>Asset Allocation</h3><p className="muted">Equity, Debt, Gold — risk aur goals ke hisaab se mix decide karo. Rebalance periodically.</p></div>
          <div className="card"><h3>Intraday vs Investing</h3><p className="muted">Intraday = same-day trades, high risk. Investing = long-term wealth creation via business ownership.</p></div>
          <div className="card"><h3>Taxes basics</h3><p className="muted">Equity STCG/LTCG rules, indexation in debt funds — returns ko post-tax samjho for true comparison.</p></div>
          <div className="card"><h3>Technical indicators</h3><p className="muted">Moving Averages, RSI, MACD — signals ko blindly follow nahi, context ke saath use karo.</p></div>
          <div className="card"><h3>Fundamentals</h3><p className="muted">Revenue growth, margins, ROE, debt levels — business quality judge karne ke base metrics.</p></div>
          <div className="card"><h3>Position sizing</h3><p className="muted">Per-trade risk ko cap karo (e.g., 1–2%). Bada drawdown avoid hoga.</p></div>
          <div className="card"><h3>Journaling</h3><p className="muted">Har trade/invest decision note karo — learnings accelerate hoti hain.</p></div>
        </div>
      </div>
    </main>
  );
}


