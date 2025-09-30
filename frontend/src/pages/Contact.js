export default function Contact() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Contact Us</h1>
        <p className="muted">We'd love to hear from you. Fill the form below or reach us directly.</p>

        <div className="cards" style={{ marginTop: 16 }}>
          <div className="card" style={{ gridColumn: "span 2" }}>
            <form style={{ display: "grid", gap: 12 }}>
              <label>
                Name
                <input className="input" placeholder="Your full name" />
              </label>
              <label>
                Email
                <input className="input" placeholder="you@example.com" />
              </label>
              <label>
                Message
                <textarea className="input" rows="5" placeholder="How can we help?" />
              </label>
              <div>
                <button className="btn" type="button">Send Message</button>
              </div>
            </form>
          </div>
          <div className="card">
            <h3>Reach us</h3>
            <p className="muted">Phone: 9371246146<br/>Email: sohamtawari1@gmail.com<br/>Location: India</p>
            <div style={{ height: 180, borderRadius: 12, background: "linear-gradient(135deg, rgba(97,228,168,.2), rgba(47,212,154,.05))" }} />
          </div>
        </div>
      </div>
    </main>
  );
}


