import { useState, useEffect, useRef } from "react";

// Phase 1: notification banner (lock-screen style)
// Phase 2: full chat UI plays out
const NOTIF_SHOW = 600;
const NOTIF_HIDE = 3000;

const SCRIPT = [
  { role: "mad",  text: "Hi 👋 We're MAD — a product, brand & marketing firm. Tell us what you're building.", delay: 3600 },
  { role: "user", text: "We're launching a SaaS. Need a full brand + landing page.", delay: 6000 },
  { role: "mad",  text: "Perfect scope — that's exactly our wheelhouse. What's your timeline and budget?", delay: 8400 },
  { role: "user", text: "6 weeks from now, budget around $25–30k.", delay: 10600 },
  { role: "mad",  text: "Totally doable. Let's get on a call, scope it properly and kick things off.", delay: 12800 },
  { role: "cta",  text: "📅 Book a Call →", delay: 14600 },
];

function PhoneScreen({ inView }) {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const [notifIn, setNotifIn] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setVisible([]);
    setTyping(false);
    setNotifIn(false);
    if (!inView) return;

    // Phase 1: notification banner
    const t0 = setTimeout(() => setNotifIn(true), NOTIF_SHOW);
    const t1 = setTimeout(() => setNotifIn(false), NOTIF_HIDE);

    // Phase 2: scripted chat
    const chatTimers = SCRIPT.map((item, i) => {
      let typingTimer;
      if (item.role === "mad") {
        typingTimer = setTimeout(() => setTyping(true), item.delay - 1200);
      }
      const t = setTimeout(() => {
        setTyping(false);
        setVisible((v) => [...v, i]);
      }, item.delay);
      return [t, typingTimer];
    });

    return () => {
      clearTimeout(t0); clearTimeout(t1);
      chatTimers.flat().forEach((t) => t && clearTimeout(t));
    };
  }, [inView]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible, typing]);

  const MadAvatar = () => (
    <div style={{ width: 22, height: 22, borderRadius: 8, background: "#1980c2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 8, fontWeight: 900, color: "#fff" }}>M</span>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>

      {/* Lock-screen notification banner */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          right: 8,
          zIndex: 50,
          background: "rgba(28,28,30,0.94)",
          backdropFilter: "blur(18px)",
          borderRadius: 14,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transform: notifIn ? "translateY(0)" : "translateY(-96px)",
          opacity: notifIn ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: 30, height: 30, borderRadius: 9, background: "#1980c2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "#fff" }}>M</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>MAD</span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)" }}>now</span>
          </div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.72)", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Hi 👋 Ready to build something real?
          </div>
        </div>
      </div>

      {/* Chat header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#161616", borderBottom: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
        <div style={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%", borderRadius: "50%", border: "1px solid rgba(25,128,194,.5)", animation: "ringOut 2s ease-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 30, height: 30, borderRadius: "50%", background: "#1980c2", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#fff" }}>M</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 3 }}>MAD AI</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.38)", fontWeight: 500 }}>Strategic Partner · Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px", display: "flex", flexDirection: "column", gap: 9 }}
           className="mad-scroll">
        {SCRIPT.map((item, i) => {
          if (!visible.includes(i)) return null;
          if (item.role === "cta") {
            return (
              <div key={i} style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <button
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  style={{ background: "#1980c2", color: "#fff", border: "none", borderRadius: 20, padding: "9px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", boxShadow: "0 4px 16px rgba(25,128,194,.4)" }}
                >
                  {item.text}
                </button>
              </div>
            );
          }
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 6, justifyContent: item.role === "user" ? "flex-end" : "flex-start" }}>
              {item.role === "mad" && <MadAvatar />}
              <div style={{ background: item.role === "user" ? "#1980c2" : "#1e1e1e", borderRadius: item.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "9px 12px", fontSize: 11.5, color: "#fff", lineHeight: 1.55, maxWidth: "80%" }}>
                {item.text}
              </div>
            </div>
          );
        })}

        {/* Typing dots */}
        {typing && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            <MadAvatar />
            <div style={{ background: "#1e1e1e", borderRadius: "14px 14px 14px 4px", padding: "9px 14px", display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.22, 0.44].map((d, i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#1980c2", animation: `dotPulse 1.2s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar (decorative) */}
      <div style={{ padding: "7px 12px 12px", background: "#161616", borderTop: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#222", borderRadius: 24, padding: "6px 6px 6px 14px" }}>
          <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,.2)" }}>Reply to MAD AI…</span>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1980c2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const inputBase = {
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    color: "#fff",
    padding: "11px 14px",
    fontSize: 13,
    borderRadius: 8,
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
  };

  return (
    <section
      ref={sectionRef}
      className="pt-16 sm:pt-20"
      style={{ paddingBottom: 0, background: "linear-gradient(180deg, #1980c2 0%, #1468a0 60%, #0f4f7a 100%)" }}
    >
      <style>{`
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
        @keyframes ringOut{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .mad-scroll::-webkit-scrollbar{display:none}
        .c-input::placeholder{color:rgba(255,255,255,.25)}
        .c-input:focus{border-color:rgba(255,255,255,.32)!important}
      `}</style>

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-8 pb-0">
        {/* Top eyebrow */}
        <p
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.38)",
            marginBottom: 12,
          }}
        >
          Work With Us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* LEFT — copy + form */}
          <div className="order-2 md:order-1 pb-16 md:pb-20 px-0">
            <h2
              style={{
                fontSize: "clamp(28px,3.4vw,48px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -0.8,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Start something
              <br />
              that matters.
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.72,
                color: "rgba(255,255,255,.52)",
                marginBottom: 32,
                maxWidth: 400,
              }}
            >
              Whether you have a polished brief or just a raw idea, we'll help
              you turn it into a product, brand, or campaign that actually moves
              the needle.
            </p>

            {/* Promise list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                ["01", "Strategy first", "We align on what success looks like before touching a pixel."],
                ["02", "Design that converts", "Every decision is made with your audience and your goal in mind."],
                ["03", "Ship, then improve", "We launch fast and iterate based on real data."],
              ].map(([num, title, sub]) => (
                <div key={num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 8,
                      fontWeight: 700,
                      color: "rgba(255,255,255,.28)",
                      paddingTop: 3,
                      minWidth: 18,
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.42)", lineHeight: 1.5 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            {sent ? (
              <div
                style={{
                  background: "rgba(52,211,153,.1)",
                  border: "1px solid rgba(52,211,153,.25)",
                  borderRadius: 12,
                  padding: "24px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>✓</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Message received</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>We'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <div id="contact-form" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="c-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputBase}
                  />
                  <input
                    className="c-input"
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputBase}
                  />
                </div>
                <textarea
                  className="c-input"
                  placeholder="What are you working on?"
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  style={{ ...inputBase, height: 100, resize: "none" }}
                />
                <button
                  onClick={() => form.name && form.email && setSent(true)}
                  style={{
                    background: "#fff",
                    color: "#1980c2",
                    border: "none",
                    borderRadius: 8,
                    padding: "13px 28px",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Send Message →
                </button>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.28)", textAlign: "center" }}>
                  Or email us directly at{" "}
                  <a href="mailto:hello@mad.studio" style={{ color: "rgba(255,255,255,.55)" }}>
                    hello@mad.studio
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* RIGHT — phone pop-out on all sizes */}
          <div
            className="order-1 md:order-2 flex flex-col items-center relative z-10 -mb-[90px]"
            style={{ paddingTop: "clamp(0px,2vw,24px)" }}
          >
            <div
              style={{
                width: "min(300px, calc(100vw - 48px))",
                background: "#080808",
                borderRadius: 44,
                padding: 10,
                border: "1px solid rgba(255,255,255,.08)",
                boxShadow:
                  "0 40px 80px rgba(0,0,0,.55), 0 16px 40px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.04)",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  width: 90,
                  height: 26,
                  background: "#080808",
                  borderRadius: "0 0 18px 18px",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 4,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#181818",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                />
              </div>

              {/* Screen */}
              <div
                style={{
                  background: "#111",
                  borderRadius: 36,
                  overflow: "hidden",
                  height: "clamp(420px,54vh,560px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Status bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 18px",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.4)",
                    flexShrink: 0,
                  }}
                >
                  <span>9:41</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.4)">
                    <rect x="0" y="4" width="2" height="6" rx=".5" />
                    <rect x="3" y="2" width="2" height="8" rx=".5" />
                    <rect x="6" y="0" width="2" height="10" rx=".5" />
                  </svg>
                </div>

                {/* App content */}
                <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <PhoneScreen inView={inView} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
