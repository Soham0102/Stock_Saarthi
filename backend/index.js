// backend/index.js

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import pathModule from "path";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const phoneToOtp = new Map();
const usersByPhone = new Map();

// ====== AUTH APIs ======

// Send OTP (Twilio if configured, else mock)
app.post("/api/auth/send-otp", async (req, res) => {
  const { phone, name } = req.body || {};
  if (!phone) return res.status(400).json({ error: "Phone is required" });
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  phoneToOtp.set(phone, { otp, name: name || null, createdAt: Date.now() });

  try {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;

    if (sid && token && from) {
      const twilio = await import("twilio");
      const client = twilio.default(sid, token);
      const msg = await client.messages.create({
        to: phone,
        from,
        body: `Your StockSarthi OTP is ${otp}. Valid for 5 minutes.`,
      });
      return res.json({ success: true, message: "OTP sent via SMS", sid: msg.sid });
    }
  } catch (e) {
    console.error("Twilio error:", e.message);
  }

  res.json({ success: true, message: "OTP sent (mock)", otp });
});

// Verify OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body || {};
  if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP are required" });
  const record = phoneToOtp.get(phone);
  if (!record) return res.status(400).json({ error: "No OTP requested for this phone" });
  const isValid = record.otp === otp && Date.now() - record.createdAt < 5 * 60 * 1000;
  if (!isValid) return res.status(400).json({ error: "Invalid or expired OTP" });
  const token = Buffer.from(`${phone}:${Date.now()}`).toString("base64");
  return res.json({ success: true, token, user: { phone, name: record.name || "User" } });
});

// Password Sign Up
app.post("/api/auth/signup", async (req, res) => {
  const { phone, name, password } = req.body || {};
  if (!phone || !password || !name) return res.status(400).json({ error: "name, phone, password required" });
  if (usersByPhone.has(phone)) return res.status(400).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  usersByPhone.set(phone, { name, phone, passwordHash });
  const token = Buffer.from(`${phone}:${Date.now()}`).toString("base64");

  res.json({ success: true, token, user: { phone, name } });
});

// Password Login
app.post("/api/auth/login", async (req, res) => {
  const { phone, password } = req.body || {};
  if (!phone || !password) return res.status(400).json({ error: "phone, password required" });
  const user = usersByPhone.get(phone);
  if (!user) return res.status(400).json({ error: "User not found" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = Buffer.from(`${phone}:${Date.now()}`).toString("base64");
  res.json({ success: true, token, user: { phone, name: user.name } });
});

// ====== STOCK APIs ======

app.get("/api/quotes", async (req, res) => {
  try {
    const { symbols } = req.query;
    if (!symbols) return res.status(400).json({ error: "symbols query is required" });

    const baseHosts = ["https://query1.finance.yahoo.com", "https://query2.finance.yahoo.com"];
    let lastErr;

    for (const host of baseHosts) {
      const url = `${host}/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json, text/plain, */*",
          },
        });
        if (!response.ok) {
          lastErr = new Error(`Upstream ${response.status}`);
          continue;
        }
        const data = await response.json();
        return res.json(data);
      } catch (e) {
        lastErr = e;
        continue;
      }
    }

    return res.status(502).json({ error: "Upstream error", details: lastErr?.message || String(lastErr) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes", details: err.message });
  }
});

// Prediction endpoint
app.get("/api/predict", async (req, res) => {
  try {
    const { symbol = "AAPL", years = "1" } = req.query;
    const periodYears = Math.min(Math.max(parseInt(years, 10) || 1, 1), 5);
    const now = Math.floor(Date.now() / 1000);
    const from = now - 60 * 60 * 24 * 365 * 5;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${from}&period2=${now}&interval=1d&includeAdjustedClose=true`;

    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) return res.status(502).json({ error: "Upstream error" });

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    const closes = result?.indicators?.adjclose?.[0]?.adjclose || result?.indicators?.quote?.[0]?.close || [];
    if (!closes.length) return res.status(400).json({ error: "No historical data" });

    const window = 20;
    const recent = closes.slice(-60);
    const drift = (recent[recent.length - 1] - recent[0]) / Math.max(recent.length - 1, 1);
    const last = closes[closes.length - 1];

    const forecastDays = Math.round(252 * periodYears);
    const forecast = [];
    let cur = last;

    for (let i = 0; i < forecastDays; i++) {
      const tail = closes.slice(-window + Math.min(i, window - 1)).concat(
        forecast.slice(Math.max(0, i - (window - 1))).map(f => f.price)
      );
      const ma = tail.length ? tail.reduce((a, b) => a + b, 0) / tail.length : cur;
      cur = (cur + ma) / 2 + drift * 0.5;
      forecast.push({ dayIndex: i + 1, price: Number(cur.toFixed(2)) });
    }

    res.json({ symbol, last, forecast });
  } catch (e) {
    res.status(500).json({ error: "Failed to predict", details: e.message });
  }
});

// History endpoint
app.get("/api/history", async (req, res) => {
  try {
    const { symbol = "AAPL", range = "5y" } = req.query;
    const now = Math.floor(Date.now() / 1000);
    const years = range.endsWith("y") ? parseInt(range) : 5;
    const from = now - 60 * 60 * 24 * 365 * Math.min(Math.max(years || 5, 1), 10);

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${from}&period2=${now}&interval=1d&includeAdjustedClose=true`;
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) return res.status(502).json({ error: "Upstream error" });

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    if (!result) return res.status(400).json({ error: "No data" });

    const ts = result?.timestamp || [];
    const q = result?.indicators?.quote?.[0] || {};
    const o = q.open || [], h = q.high || [], l = q.low || [], c = q.close || [];

    res.json({ symbol, timestamp: ts, open: o, high: h, low: l, close: c });
  } catch (e) {
    res.status(500).json({ error: "Failed to load history", details: e.message });
  }
});

// Signals endpoint
app.get("/api/signals", async (req, res) => {
  try {
    const { symbol = "AAPL", short = "20", long = "50" } = req.query;
    const s = Math.max(parseInt(short, 10) || 20, 2);
    const l = Math.max(parseInt(long, 10) || 50, s + 1);
    const now = Math.floor(Date.now() / 1000);
    const from = now - 60 * 60 * 24 * 365 * 3;

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${from}&period2=${now}&interval=1d&includeAdjustedClose=true`;
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) return res.status(502).json({ error: "Upstream error" });

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    const close = result?.indicators?.adjclose?.[0]?.adjclose || result?.indicators?.quote?.[0]?.close || [];
    const ts = result?.timestamp || [];
    if (close.length < l + 5) return res.status(400).json({ error: "Insufficient data" });

    function sma(arr, win) {
      const out = new Array(arr.length).fill(null);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (i >= win) sum -= arr[i - win];
        if (i >= win - 1) out[i] = sum / win;
      }
      return out;
    }

    const sArr = sma(close, s);
    const lArr = sma(close, l);
    const signals = [];

    for (let i = 1; i < close.length; i++) {
      if (sArr[i - 1] != null && lArr[i - 1] != null && sArr[i] != null && lArr[i] != null) {
        const prevDiff = sArr[i - 1] - lArr[i - 1];
        const curDiff = sArr[i] - lArr[i];
        if (prevDiff <= 0 && curDiff > 0) {
          signals.push({ type: "BUY", timestamp: ts[i], price: close[i] });
        } else if (prevDiff >= 0 && curDiff < 0) {
          signals.push({ type: "SELL", timestamp: ts[i], price: close[i] });
        }
      }
    }

    const lastPrice = close[close.length - 1];
    const lastS = sArr[sArr.length - 1];
    const lastL = lArr[lArr.length - 1];
    let action = "HOLD";
    if (lastS != null && lastL != null) action = lastS > lastL ? "BUY_BIAS" : "SELL_BIAS";

    const guidance =
      action === "BUY_BIAS"
        ? { stopLoss: Number((lastPrice * 0.95).toFixed(2)), target: Number((lastPrice * 1.1).toFixed(2)) }
        : { stopLoss: Number((lastPrice * 1.05).toFixed(2)), target: Number((lastPrice * 0.9).toFixed(2)) };

    res.json({ symbol, lastPrice, short: s, long: l, action, guidance, signalsCount: signals.length, signals });
  } catch (e) {
    res.status(500).json({ error: "Failed to compute signals", details: e.message });
  }
});

// ====== SERVE REACT FRONTEND (important for Render) ======
const __dirname = pathModule.dirname(fileURLToPath(import.meta.url));
app.use(express.static(pathModule.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(pathModule.join(__dirname, "build", "index.html"));
});

// ====== START SERVER ======
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
