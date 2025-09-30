import { useState } from "react";

export default function Stoxo() {
  const [budget, setBudget] = useState("");
  const [risk, setRisk] = useState("moderate");
  const [suggestion, setSuggestion] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const b = Number(budget || 0);
    const plan = [
      "Capital split: 60% core, 30% satellite, 10% cash buffer.",
      "Core: index ETF + top large-caps; Satellite: momentum/sector bets.",
      "Risk rules: 2% max risk per trade, 1:2 R:R, trailing stops.",
      "Execution: weekly rebalancing; avoid overtrading.",
      "Review: quarterly fundamentals; track earnings and macro." 
    ];
    const flavor = risk === "low" ?
      "Conservative allocation with higher ETF weight and dividend stability." :
      risk === "moderate" ? "Balanced mix of large/mid; add trend-following only when signal confirms." :
      "High-beta opportunities with strict stop-losses and position sizing discipline.";
    setSuggestion({
      headline: "Your structured gameplan (demo)",
      details: `Budget ₹${b.toLocaleString()} | Risk: ${risk.toUpperCase()}
Guidance: ${flavor}
1) ${plan[0]}
2) ${plan[1]}
3) ${plan[2]}
4) ${plan[3]}
5) ${plan[4]}`,
    });
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Meet Stoxo — Your AI Bot</h1>
        <p className="muted">Tell Stoxo your budget and risk appetite, and it will guide you to suitable stock ideas. This is a demo placeholder; we can connect to your ML models later.</p>
        <form onSubmit={handleSubmit} className="card" style={{ display: "grid", gap: 12 }}>
          <label>
            Budget (₹)
            <input className="input" value={budget} onChange={(e) => setBudget(e.target.value)} type="number" min="0" placeholder="e.g. 50000" />
          </label>
          <label>
            Risk Level
            <select className="input" value={risk} onChange={(e) => setRisk(e.target.value)}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
          <div>
            <button className="btn" type="submit">Get Suggestions</button>
          </div>
        </form>

        {suggestion && (
          <div className="card" style={{ marginTop: 16 }}>
            <h3>{suggestion.headline}</h3>
            <p className="muted">{suggestion.details}</p>
          </div>
        )}
      </div>
    </main>
  );
}


