import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Stoxo from "./pages/Stoxo";
import LiveMarket from "./pages/LiveMarket";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Learn from "./pages/Learn";
import Careers from "./pages/Careers";
import Dashboard from "./pages/Dashboard";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-badge" />
          StockSarthi
        </Link>
        <div className="nav-links" style={{ position: "relative" }}>
          <NavLink to="/about">About</NavLink>
          <div style={{ position: "relative" }}>
            <NavLink to="/services">Services</NavLink>
            <div className="card reveal" style={{ position: "absolute", top: 36, left: -120, width: 560, display: "none", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div>
                <h4>Core</h4>
                <div className="muted"><a href="/live">Live Market</a><br/><a href="/stoxo">Stoxo AI</a></div>
              </div>
              <div>
                <h4>Signals</h4>
                <div className="muted">Trading Signals<br/>Risk Profiler</div>
              </div>
              <div>
                <h4>Learn</h4>
                <div className="muted"><a href="/learn">FAQs</a><br/><a href="/careers">Careers</a></div>
              </div>
            </div>
          </div>
          <NavLink to="/stoxo">Stoxo</NavLink>
          <NavLink to="/live">Live Market</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/auth" className="btn">Sign In</NavLink>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 24 }}>
        <div>
          <div className="nav-brand" style={{ marginBottom: 8 }}>
            <span className="nav-brand-badge" />
            <strong>StockSarthi</strong>
          </div>
          <p className="muted">AI-powered investing companion. Smarter insights. Safer decisions.</p>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <a href="/" className="btn btn-outline">Get Started</a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div className="muted"><a href="/about">About</a><br/><a href="/services">Services</a><br/><a href="/contact">Contact</a></div>
        </div>
        <div>
          <h4>Products</h4>
          <div className="muted"><a href="/live">Live Market</a><br/><a href="/stoxo">Stoxo AI</a><br/>Trading Signals</div>
        </div>
        <div>
          <h4>Stay Updated</h4>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Your email" style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "#0b1324", color: "var(--text)" }} />
            <button className="btn">Subscribe</button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>Founder: Soham Tawari · 9371246146 · <a href="mailto:sohamtawari1@gmail.com">sohamtawari1@gmail.com</a></p>
        </div>
      </div>
      <div className="container" style={{ marginTop: 16, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>© {new Date().getFullYear()} StockSarthi — All Rights Reserved</div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stoxo" element={<Stoxo />} />
        <Route path="/live" element={<LiveMarket />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
