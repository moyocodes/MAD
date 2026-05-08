import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useInView } from "../../hooks/homeHooks";
import { motion } from "framer-motion";

// ─── MAD AI PHONE ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the MAD AI assistant — a sharp, strategic, and direct digital assistant for MAD (Making A Difference), a product, marketing, and design firm. MAD's services: Product & Digital Solutions, Marketing & Communication, Brand & Design Systems. Keep replies SHORT — 2-4 sentences max. Be direct. End with a focused question or sharp observation. If someone seems like a potential client, gently guide toward booking a call.`;

function MADPhone() {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      text: "Hey, I'm MAD AI — your strategic thinking partner. What are you working on?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.find((b) => b.type === "text")?.text ||
        "Let's dig into that.";
      setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: "Something went sideways — but let's keep going.",
        },
      ]);
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        width: 280,
        background: "#080808",
        borderRadius: 44,
        padding: 10,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.07), 0 70px 140px rgba(0,0,0,.45), 0 20px 40px rgba(0,0,0,.25)",
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 96,
          height: 28,
          background: "#080808",
          borderRadius: "0 0 20px 20px",
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
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        />
      </div>

      {/* Screen */}
      <div
        style={{
          background: "#101010",
          borderRadius: 36,
          overflow: "hidden",
          height: 560,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar */}
        <div
          className="flex justify-between items-center px-5 py-1.5 text-[9px] font-bold"
          style={{ color: "rgba(255,255,255,.65)" }}
        >
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.65)">
              <rect x="0" y="4" width="2" height="6" rx=".5" />
              <rect x="3" y="2" width="2" height="8" rx=".5" />
              <rect x="6" y="0" width="2" height="10" rx=".5" />
            </svg>
          </div>
        </div>

        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ background: "#151515", borderBottom: "1px solid rgba(255,255,255,.04)" }}
        >
          <div
            className="w-9 h-9 rounded-[14px] flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#1980c2,#0c4d82)" }}
          >
            <span className="text-[11px] font-black text-white">M</span>
          </div>
          <div>
            <div className="text-[12px] font-bold text-white leading-none mb-1">MAD AI</div>
            <div className="flex items-center gap-1.5">
              <div className="w-[5px] h-[5px] rounded-full bg-emerald-400" />
              <span className="text-[8px] text-white/35 font-medium">Strategic Partner · Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5"
          style={{ scrollbarWidth: "none" }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div
                  className="w-[22px] h-[22px] rounded-lg flex items-center justify-center flex-shrink-0 mr-2 self-end"
                  style={{ background: "linear-gradient(135deg,#1980c2,#0c4d82)" }}
                >
                  <span className="text-[7px] font-black text-white">M</span>
                </div>
              )}
              <div
                className="max-w-[78%] text-white leading-relaxed"
                style={{
                  background: m.role === "user" ? "#1980c2" : "#1e1e1e",
                  borderRadius:
                    m.role === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  padding: "8px 12px",
                  fontSize: 11.5,
                  lineHeight: 1.55,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-2">
              <div
                className="w-[22px] h-[22px] rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#1980c2,#0c4d82)" }}
              >
                <span className="text-[7px] font-black text-white">M</span>
              </div>
              <div
                className="rounded-[16px_16px_16px_4px] flex gap-1.5 items-center px-3.5 py-2.5"
                style={{ background: "#1e1e1e" }}
              >
                {[0, 0.22, 0.44].map((d, i) => (
                  <div
                    key={i}
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      background: "#1980c2",
                      animation: `dotPulse 1.2s ${d}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-5 pt-2" style={{ background: "#151515", borderTop: "1px solid rgba(255,255,255,.04)" }}>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "#222" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask MAD anything..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[11px] placeholder:text-white/25"
              style={{ fontFamily: "inherit" }}
            />
            <button
              onClick={send}
              disabled={loading}
              className="w-[28px] h-[28px] rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0 transition-all"
              style={{
                background: loading
                  ? "#333"
                  : "linear-gradient(135deg,#1980c2,#5aa7e6)",
                boxShadow: loading ? "none" : "0 2px 14px #1980c260",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[7px] text-white/18 mt-2">
            Powered by MAD Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const { dark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [ref, vis] = useInView(0.05);

  const textPrimary = dark ? "#f0ede8" : "#181817";
  const textMuted = dark ? "rgba(240,237,232,.45)" : "rgba(24,24,23,.42)";
  const borderBase = dark ? "rgba(255,255,255,.07)" : "rgba(24,24,23,.08)";

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${borderBase}`,
    color: textPrimary,
    fontSize: 14,
    fontFamily: "inherit",
    padding: "12px 0",
    outline: "none",
    transition: "border-color .2s",
  };

  return (
    <section className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-32 md:py-44">
      {/* Subtle ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle,rgba(25,128,194,.06) 0%,transparent 70%)", transform: "translate(30%,30%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle,rgba(242,101,34,.04) 0%,transparent 70%)", transform: "translate(-20%,-20%)" }}
      />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto">

        {/* ── Section eyebrow ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 uppercase tracking-[.26em] font-mono text-[10px]"
          style={{ color: textMuted }}
        >
          Get In Touch
        </motion.p>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="mb-4 leading-[1.0] tracking-[-0.04em] font-semibold"
              style={{ fontSize: "clamp(36px,4.5vw,68px)", color: textPrimary }}
            >
              Not sure what
              <br />
              comes next?
              <br />
              <em style={{ fontStyle: "normal", color: "#1980c2" }}>Talk to MAD.</em>
            </h2>

            <p
              className="mb-10 text-[14px] leading-relaxed max-w-[360px]"
              style={{ color: textMuted }}
            >
              Whether you have a clear brief or just an idea, we'll help shape it into something actionable.
            </p>

            {sent ? (
              <div>
                <div className="text-4xl mb-4" style={{ color: "#1980c2" }}>✓</div>
                <div className="text-xl font-semibold mb-2" style={{ color: textPrimary }}>
                  Got it.
                </div>
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                  We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                {[
                  ["name", "Your Name", "text"],
                  ["email", "Email Address", "email"],
                ].map(([k, l, t]) => (
                  <div key={k}>
                    <label
                      className="block mb-1 text-[8px] font-bold tracking-[.22em] uppercase"
                      style={{ color: textMuted }}
                    >
                      {l}
                    </label>
                    <input
                      type={t}
                      value={form[k]}
                      onChange={(e) => setForm((x) => ({ ...x, [k]: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderBottomColor = "#1980c2")}
                      onBlur={(e) => (e.target.style.borderBottomColor = borderBase)}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block mb-1 text-[8px] font-bold tracking-[.22em] uppercase"
                    style={{ color: textMuted }}
                  >
                    What are you working on?
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((x) => ({ ...x, message: e.target.value }))}
                    rows={4}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#1980c2")}
                    onBlur={(e) => (e.target.style.borderBottomColor = borderBase)}
                  />
                </div>
                <button
                  onClick={() => { if (form.name && form.email) setSent(true); }}
                  className="self-start px-8 py-3.5 rounded-full text-[9px] font-bold tracking-widest uppercase text-white border-none cursor-pointer transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-[.98]"
                  style={{ background: "#1980c2", boxShadow: "0 4px 24px #1980c230" }}
                >
                  Send Message →
                </button>
              </div>
            )}

            {/* Contact details */}
            <div className="mt-14 flex flex-col gap-4 pt-10" style={{ borderTop: `1px solid ${borderBase}` }}>
              {[
                ["Email", "hello@madagency.co"],
                ["WhatsApp", "+1 (800) MAD-GROW"],
                ["Based in", "Global · Remote-first"],
              ].map(([l, v]) => (
                <div key={l} className="flex gap-5 items-baseline">
                  <span
                    className="text-[7px] font-bold tracking-[.22em] uppercase w-[68px] flex-shrink-0"
                    style={{ color: textMuted }}
                  >
                    {l}
                  </span>
                  <span className="text-[13px]" style={{ color: textPrimary }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup */}
          <div className="flex items-start justify-center lg:justify-end pt-4 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={vis ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.18, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Ambient glow behind phone */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none rounded-[44px] blur-[60px] opacity-30"
                style={{ background: "radial-gradient(circle at 50% 60%, #1980c2 0%, transparent 70%)", transform: "scale(1.3)" }}
              />
              <MADPhone />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 mt-24 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ borderTop: `1px solid ${borderBase}`, maxWidth: 1200, margin: "96px auto 0" }}
      >
        <div
          className="text-sm font-black tracking-wide"
          style={{ color: textPrimary }}
        >
          M<span style={{ color: "#1980c2" }}>A</span>D
        </div>
        <div className="text-[8px] tracking-wide" style={{ color: textMuted }}>
          © 2025 MAD — Making A Difference. All rights reserved.
        </div>
        <div className="flex gap-5">
          {["Privacy", "Terms", "LinkedIn"].map((l) => (
            <span
              key={l}
              className="text-[8px] cursor-pointer transition-colors duration-200 hover:opacity-70"
              style={{ color: textMuted }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
