import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { safeFetch } from "../lib/api";

export default function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  async function doSignup() {
    try {
      setLoading(true); setMessage("");
      const json = await safeFetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, password })
      });
      if (!json.success) throw new Error(json.error || "Signup failed");
      setToken(json.token);
      localStorage.setItem("stocksarthi_token", json.token);
      setMessage("Account created. Redirecting...");
      setTimeout(() => navigate("/dashboard"), 400);
    } catch (e) {
      setMessage(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function doLogin() {
    try {
      setLoading(true); setMessage("");
      const json = await safeFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });
      if (!json.success) throw new Error(json.error || "Login failed");
      setToken(json.token);
      localStorage.setItem("stocksarthi_token", json.token);
      setMessage("Authenticated successfully. Redirecting...");
      setTimeout(() => navigate("/dashboard"), 400);
    } catch (e) {
      setMessage(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ display: "flex" }}>
            <button className="btn" style={{ flex: 1, borderRadius: 0, background: tab === "signin" ? "var(--primary)" : "transparent", color: tab === "signin" ? "#052e2b" : "var(--text)", borderBottom: tab === "signin" ? "none" : "1px solid var(--border)" }} onClick={() => { setTab("signin"); }}>Sign In</button>
            <button className="btn" style={{ flex: 1, borderRadius: 0, background: tab === "signup" ? "var(--primary)" : "transparent", color: tab === "signup" ? "#052e2b" : "var(--text)", borderBottom: tab === "signup" ? "none" : "1px solid var(--border)" }} onClick={() => { setTab("signup"); }}>Sign Up</button>
          </div>

          <div style={{ padding: 20, display: "grid", gap: 12 }}>
            {tab === "signup" && (
              <label>
                Full Name
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </label>
            )}
            <label>
              Phone Number
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 9371246146" />
            </label>
            <label>
              Password
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </label>

            {!token ? (
              tab === "signup" ? (
                <button className="btn" onClick={doSignup} disabled={loading || !phone || !password || !name}>{loading ? "Creating..." : "Create Account"}</button>
              ) : (
                <button className="btn" onClick={doLogin} disabled={loading || !phone || !password}>{loading ? "Signing in..." : "Sign In"}</button>
              )
            ) : (
              <div className="card">
                <div>Signed in. Token stored in memory (demo).</div>
              </div>
            )}

            {message && <div className="muted">{message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}


