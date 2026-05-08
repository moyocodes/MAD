import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are MAD AI, a sharp strategic thinking partner for a consultancy. Help visitors clarify their project, understand their challenges, and take next steps. Keep replies to 1-3 sentences. Be direct, smart, and energetic. Never fluffy.`;

export default function Contact() {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "Hey, I'm MAD AI — your strategic thinking partner. What are you working on?",
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
    const next = [...msgs, { role: "user", content: text }];
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
          messages: next,
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.find((b) => b.type === "text")?.text ||
        "Let's dig into that.";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: "Something went sideways — but let's keep going.",
        },
      ]);
    }
    setLoading(false);
  }

  const inputStyle = {
    background: "rgb(255 255 255 / 7%)",
    border: "1px solid rgb(255 255 255 / 14%)",
    color: "#ffffff",
    padding: "10px 14px",
    fontSize: 13,
    borderRadius: 8,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <section
      className="bg-azure-500"
      style={{ paddingTop: 0, paddingBottom: "72px" }}
    >
      <style>{`
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
        @keyframes ringOut{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .mad-scroll::-webkit-scrollbar{display:none}
        .mad-input::placeholder{color:rgba(255,255,255,.22)}
        .mad-finput::placeholder{color:rgba(255,255,255,.3)}
        .mad-finput:focus{border-color:rgba(255,255,255,.35)!important}
      `}</style>

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* LEFT — copy + form — second on mobile, first on md+ */}
        <div className="order-2 md:order-1 pt-10 md:pt-16">
          {/* shadcn-inspired form card on mobile */}
          <div className="md:contents">
            <div className="md:hidden bg-white/[8%] rounded-2xl border border-white/[12%] p-6 mb-8">
              <p className="text-white/[38%] text-[9px] tracking-[0.28em] uppercase font-bold mb-3">
                Get In Touch
              </p>
              <h2
                className="text-white font-bold mb-3"
                style={{
                  fontSize: "clamp(20px,5vw,28px)",
                  lineHeight: 1.15,
                  letterSpacing: -0.4,
                }}
              >
                Not sure what comes next?
                <br />
                Talk to MAD.
              </h2>
              <p
                className="text-white/[52%] mb-5"
                style={{ fontSize: 13, lineHeight: 1.65 }}
              >
                Whether you have a clear brief or just an idea, we'll help you
                shape it.
              </p>
            </div>
          </div>
          <p
            className="text-white/[38%]"
            style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(22px,2.8vw,34px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -0.4,
              marginBottom: 14,
            }}
            className="text-white"
          >
            Not sure what comes next?
            <br />
            Talk to MAD.
          </h2>
          <p
            className="text-white/[52%]"
            style={{
              fontSize: 14,
              lineHeight: 1.72,
              marginBottom: 36,
            }}
          >
            Whether you have a clear brief or just an idea, we'll help you shape
            it into something structured and actionable.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {[
              ["First Name", "Alex"],
              ["Last Name", "Johnson"],
            ].map(([l, ph]) => (
              <div
                key={l}
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <label
                  className="text-white/40"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {l}
                </label>
                <input
                  className="mad-finput"
                  type="text"
                  placeholder={ph}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              marginBottom: 12,
            }}
          >
            <label
              className="text-white/40"
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Email Address
            </label>
            <input
              className="mad-finput"
              type="email"
              placeholder="alex@company.com"
              style={inputStyle}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              marginBottom: 20,
            }}
          >
            <label
              className="text-white/40"
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              What are you working on?
            </label>
            <textarea
              className="mad-finput"
              placeholder="Tell us about your project..."
              style={{ ...inputStyle, height: 90, resize: "none" }}
            />
          </div>
          <button
            className="bg-white text-azure-500"
            style={{
              border: "none",
              padding: "13px 28px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              width: "100%",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </div>

        {/* RIGHT — phone as AI chat */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span
              className="text-white/50"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Or chat directly with MAD AI
            </span>
          </div>

          {/* Phone frame */}
          <div
            style={{
              width: "100%",
              maxWidth: 320,
              background: "#080808",
              borderRadius: 44,
              padding: 10,
              border: "1px solid rgba(255,255,255,.08)",
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
                display: "flex",
                flexDirection: "column",
                height: 480,
              }}
            >
              {/* Status bar */}
              <div
                className="flex justify-between items-center text-white/40"
                style={{
                  padding: "5px 18px",
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                <span>9:41</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="fill-white/40"
                >
                  <rect x="0" y="4" width="2" height="6" rx=".5" />
                  <rect x="3" y="2" width="2" height="8" rx=".5" />
                  <rect x="6" y="0" width="2" height="10" rx=".5" />
                </svg>
              </div>

              {/* Chat header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: "#161616",
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "1px solid rgba(25,128,194,.5)",
                      animation: "ringOut 2s ease-out infinite",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "1px solid rgba(25,128,194,.4)",
                      animation: "ringOut 2s ease-out .75s infinite",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "#1980c2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}
                    >
                      M
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    MAD AI
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#34d399",
                      }}
                    />
                    <span
                      className="text-white/[38%]"
                      style={{
                        fontSize: 9,
                        fontWeight: 500,
                      }}
                    >
                      Strategic Partner · Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="mad-scroll"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      justifyContent:
                        m.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {m.role === "assistant" && (
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 8,
                          background: "#1980c2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 8,
                            fontWeight: 900,
                            color: "#fff",
                          }}
                        >
                          M
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        background: m.role === "user" ? "#1980c2" : "#1e1e1e",
                        borderRadius:
                          m.role === "user"
                            ? "14px 14px 4px 14px"
                            : "14px 14px 14px 4px",
                        padding: "9px 12px",
                        fontSize: 12,
                        color: "#fff",
                        lineHeight: 1.55,
                        maxWidth: "80%",
                      }}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div
                    style={{ display: "flex", alignItems: "flex-end", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 8,
                        background: "#1980c2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{ fontSize: 8, fontWeight: 900, color: "#fff" }}
                      >
                        M
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#1e1e1e",
                        borderRadius: "14px 14px 14px 4px",
                        padding: "9px 12px",
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      {[0, 0.22, 0.44].map((d, i) => (
                        <div
                          key={i}
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
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
              <div
                style={{
                  padding: "8px 12px 14px",
                  background: "#161616",
                  borderTop: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#222",
                    borderRadius: 24,
                    padding: "6px 6px 6px 14px",
                  }}
                >
                  <input
                    className="mad-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask MAD anything..."
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      fontSize: 11,
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    onClick={send}
                    disabled={loading}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: loading ? "#333" : "#1980c2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      padding: 0,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </button>
                </div>
                <p
                  className="text-white/[15%] text-center"
                  style={{
                    fontSize: 9,
                    margin: "6px 0 0",
                  }}
                >
                  Powered by MAD Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
