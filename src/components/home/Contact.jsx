import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useInView } from "../../hooks/homeHooks";

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
      className="w-[260px] flex-shrink-0"
      style={{
        background: "#080808",
        borderRadius: 40,
        padding: 10,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.07), 0 60px 120px rgba(0,0,0,.6)",
      }}
    >
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
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        />
      </div>
      <div
        style={{
          background: "#101010",
          borderRadius: 32,
          overflow: "hidden",
          height: 520,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar */}
        <div
          className="flex justify-between items-center px-4 py-1.5 text-[9px] font-bold"
          style={{ color: "rgba(255,255,255,.7)" }}
        >
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="rgba(255,255,255,.7)"
            >
              <rect x="0" y="4" width="2" height="6" rx=".5" />
              <rect x="3" y="2" width="2" height="8" rx=".5" />
              <rect x="6" y="0" width="2" height="10" rx=".5" />
            </svg>
          </div>
        </div>
        {/* Chat header */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5"
          style={{ background: "#151515" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${"#1980c2"},#0c4d82)` }}
          >
            <span className="text-[10px] font-black text-white">M</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">MAD AI</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-[5px] h-[5px] rounded-full bg-green-500" />
              <span className="text-[7px] text-white/38 font-medium">
                Online · Strategic Partner
              </span>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
          style={{ scrollbarWidth: "none" }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div
                  className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mr-1.5 self-end"
                  style={{
                    background: `linear-gradient(135deg,${"#1980c2"},#0c4d82)`,
                  }}
                >
                  <span className="text-[6px] font-black text-white">M</span>
                </div>
              )}
              <div
                className="max-w-[78%] text-white leading-relaxed"
                style={{
                  background: m.role === "user" ? "#1980c2" : "#1e1e1e",
                  borderRadius:
                    m.role === "user"
                      ? "14px 14px 4px 14px"
                      : "14px 14px 14px 4px",
                  padding: "7px 10px",
                  fontSize: 11,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-1.5">
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg,${"#1980c2"},#0c4d82)`,
                }}
              >
                <span className="text-[6px] font-black text-white">M</span>
              </div>
              <div
                className="rounded-[14px_14px_14px_4px] flex gap-1 items-center px-3 py-2"
                style={{ background: "#1e1e1e" }}
              >
                {[0, 0.2, 0.4].map((d, i) => (
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
        <div className="px-3 pb-4 pt-2" style={{ background: "#151515" }}>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "#222" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask MAD anything..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[10px]"
              style={{ fontFamily: "inherit" }}
            />
            <button
              onClick={send}
              disabled={loading}
              className="w-[26px] h-[26px] rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0"
              style={{
                background: loading
                  ? "#333"
                  : `linear-gradient(135deg, ${"#1980c2"}, ${"#5aa7e6"})`,
                boxShadow: loading ? "none" : `0 2px 12px ${"#1980c2"}60`,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[7px] text-white/18 mt-1.5">
            Powered by MAD Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT (with MADPhone on right) ─────────────────────────────────────────
export default function Contact() {
  const { dark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [ref, vis] = useInView(0.05);

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`,
    color: dark ? "#f0ede8" : "#181817",
    fontSize: 14,
    fontFamily: "inherit",
    padding: "12px 0",
    outline: "none",
  };

  return (
    <section
      className={`transition-colors duration-300 relative z-10 ${dark ? "bg-[#1e1e1c]" : "bg-white"}`}
    >
      <div
        ref={ref}
        className="mad-contact-grid grid"
        style={{ gridTemplateColumns: "1fr 1fr", minHeight: 620 }}
      >
        {/* Left: form */}
        <div
          className={`p-10 flex flex-col justify-center border-r transition-colors duration-300 ${dark ? "border-white/[.08]" : "border-[#e8e8e6]"}`}
        >
          <p className="text-[8px] font-bold tracking-[.25em] uppercase text-neutral-400 mb-5">
            Get In Touch
          </p>
          <h2
            className="mb-5 leading-tight"
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-.02em",
              color: dark ? "#f0ede8" : "#181817",
            }}
          >
            Not sure what
            <br />
            comes next?
            <br />
            <em style={{ fontStyle: "normal", color: "#1980c2" }}>Talk to MAD.</em>
          </h2>
          <p
            className={`text-sm leading-relaxed mb-10 max-w-[380px] ${dark ? "text-white/50" : "text-neutral-500"}`}
          >
            Whether you have a clear brief or just an idea, we'll help you shape
            it into something structured and actionable.
          </p>

          {sent ? (
            <div>
              <div className="text-4xl mb-4">✓</div>
              <div
                className={`text-xl font-bold mb-2.5 ${dark ? "text-white/90" : "text-[#181817]"}`}
              >
                Got it.
              </div>
              <p
                className={`text-sm leading-relaxed ${dark ? "text-white/50" : "text-neutral-500"}`}
              >
                We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {[
                ["name", "Your Name", "text"],
                ["email", "Email Address", "email"],
              ].map(([k, l, t]) => (
                <div key={k}>
                  <label className="text-[7px] font-bold tracking-[.2em] uppercase text-neutral-400 block mb-1">
                    {l}
                  </label>
                  <input
                    type={t}
                    value={form[k]}
                    onChange={(e) =>
                      setForm((x) => ({ ...x, [k]: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#1980c2")}
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = dark
                        ? "rgba(255,255,255,.08)"
                        : "#e8e8e6")
                    }
                  />
                </div>
              ))}
              <div>
                <label className="text-[7px] font-bold tracking-[.2em] uppercase text-neutral-400 block mb-1">
                  What are you working on?
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((x) => ({ ...x, message: e.target.value }))
                  }
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#1980c2")}
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = dark
                      ? "rgba(255,255,255,.08)"
                      : "#e8e8e6")
                  }
                />
              </div>
              <button
                onClick={() => {
                  if (form.name && form.email) setSent(true);
                }}
                className="self-start px-8 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase text-white border-none cursor-pointer transition-all duration-200"
                style={{
                  background: "#1980c2",
                  boxShadow: `0 4px 20px ${"#1980c2"}35`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1468a0";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1980c2";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Send Message →
              </button>
            </div>
          )}

          {/* Contact info */}
          <div className="mt-12 flex flex-col gap-4">
            {[
              ["Email", "hello@madagency.co"],
              ["WhatsApp", "+1 (800) MAD-GROW"],
              ["Based in", "Global · Remote-first"],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-4 items-baseline">
                <span className="text-[7px] font-bold tracking-[.2em] uppercase text-neutral-400 w-[70px] flex-shrink-0">
                  {l}
                </span>
                <span
                  className={`text-[13px] ${dark ? "text-white/90" : "text-[#181817]"}`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: MADPhone */}
        <div
          className="flex items-center justify-center relative overflow-hidden"
          style={{ background: dark ? "#181817" : "#0e0e0d" }}
        >
          {/* Subtle background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${"#1980c2"}15 0%, transparent 70%)`,
            }}
          />
          <div
            className="transition-all duration-700"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(32px) scale(0.95)",
            }}
          >
            <MADPhone />
          </div>
        </div>
      </div>

      <div
        className={`border-t px-10 py-6 flex justify-between items-center transition-colors duration-300 ${dark ? "border-white/[.08]" : "border-[#e8e8e6]"}`}
      >
        <div
          className={`text-sm font-black tracking-wide ${dark ? "text-white/90" : "text-[#181817]"}`}
        >
          M<span style={{ color: "#1980c2" }}>A</span>D
        </div>
        <div className="text-[8px] tracking-wide text-neutral-400">
          © 2025 MAD — Making A Difference. All rights reserved.
        </div>
        <div className="flex gap-5">
          {["Privacy", "Terms", "LinkedIn"].map((l) => (
            <span
              key={l}
              className="text-[8px] text-neutral-400 cursor-pointer hover:text-neutral-700 transition-colors duration-200"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
