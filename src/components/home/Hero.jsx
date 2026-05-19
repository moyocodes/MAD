import { useState, useRef, useEffect } from "react";
import { homeCms } from "@/data/homeCms";

const { brand, hero } = homeCms;
const SLIDES = hero.slides;
const THUMBS = hero.thumbs;

export default function Hero() {
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const lastTs = useRef(null);
  const slideRef = useRef({ slide: 0, prog: 0, paused: false });
  const [slide, setSlide] = useState(0);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rawPct, setRawPct] = useState(0);
  const [notif, setNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const prevPhaseRef = useRef(-1);
  const notifRevealTimerRef = useRef(null);
  const notifTimerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const NOTIFS = hero.notifications;

  // Slide auto-play
  useEffect(() => {
    const DUR = 3000;
    const tick = (ts) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;
      if (!slideRef.current.paused) {
        const np = slideRef.current.prog + (dt / DUR) * 100;
        if (np >= 100) {
          const ns = (slideRef.current.slide + 1) % SLIDES.length;
          slideRef.current = { ...slideRef.current, slide: ns, prog: 0 };
          setSlide(ns);
          setProg(0);
        } else {
          slideRef.current.prog = np;
          setProg(np);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const raw = Math.min(1, Math.max(0, -rect.top / total));
      setRawPct(raw);
      const phase = Math.min(2, Math.floor(raw * 3));
      if (phase !== prevPhaseRef.current) {
        prevPhaseRef.current = phase;
        clearTimeout(notifRevealTimerRef.current);
        clearTimeout(notifTimerRef.current);
        setNotif(false);
        notifRevealTimerRef.current = setTimeout(() => {
          setNotifMsg(NOTIFS[Math.min(phase, NOTIFS.length - 1)]);
          setNotif(true);
          notifTimerRef.current = setTimeout(() => setNotif(false), 5500);
        }, 120);
      }
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      clearTimeout(notifRevealTimerRef.current);
      clearTimeout(notifTimerRef.current);
      window.removeEventListener("scroll", fn);
    };
  }, []);

  const pf = rawPct * 3;
  const phase = Math.min(2, Math.floor(pf));
  const pct = pf - phase;
  const collapseT = Math.min(1, Math.max(0, rawPct * 3));
  const phase1v = Math.min(1, Math.max(0, rawPct * 3));
  const cardOut = Math.max(0, (pct - 0.7) / 0.3);
  const s = SLIDES[slide];
  const ns = SLIDES[(slide + 1) % SLIDES.length];
  const frameToPanelT = Math.min(1, Math.max(0, (collapseT - 0.78) / 0.22));

  const collapsePanels = THUMBS.map((thumb) => ({
    src: thumb.src,
    fit: "contain",
  })).slice(0, 10);

  // ── easing helper
  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  return (
    <div
      ref={wrapRef}
      style={{
        height: "180vh",
        position: "relative",
        background: "transparent",
      }}
    >
      <style>{`
        @keyframes notifIn {
          from { opacity: 0; transform: translateY(-12px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.5); opacity: .6; }
        }
        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        {/* ── Collapse background — clean white-to-azure-50 ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "linear-gradient(160deg, #f0f8ff 0%, #e4f3fc 60%, #d4ecf7 100%)",
            opacity: collapseT,
          }}
        />

        {/* ── Subtle grid texture (appears with collapse) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: collapseT * 0.35,
            backgroundImage:
              "linear-gradient(rgba(25,128,194,.08) 1px,transparent 1px), linear-gradient(90deg,rgba(25,128,194,.08) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* ── Spotlight ── */}
        <div
          style={{
            position: "absolute",
            top: "-8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 560,
            height: 560,
            zIndex: 2,
            background:
              "radial-gradient(ellipse 55% 55% at 50% 0%, rgba(25,128,194,.15) 0%, transparent 70%)",
            opacity: collapseT,
            pointerEvents: "none",
            transition: "opacity .6s",
          }}
        />

        {/* ════════════════════════════════════════════════════
            MAIN VIEWPORT FRAME
        ════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            overflow: "hidden",
            left: `${collapseT * 43}%`,
            right: `${collapseT * 43}%`,
            top: `${collapseT * 11}%`,
            bottom: `${collapseT * 72}%`,
            borderRadius: collapseT * 14,
            opacity: 1 - frameToPanelT,
            boxShadow:
              collapseT > 0.02
                ? `0 ${8 + collapseT * 24}px ${32 + collapseT * 80}px rgba(5,28,46,${0.08 + collapseT * 0.14}), 0 0 0 1px rgba(25,128,194,${collapseT * 0.12})`
                : "none",
            transition: "box-shadow .3s",
          }}
        >
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>
            {/* ── LEFT PANEL ── */}
            <div
              style={{
                width: "42%",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.left}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity:
                      i === slide
                        ? 1 - cardOut
                        : i === (slide + 1) % SLIDES.length
                          ? cardOut
                          : 0,
                    transition: "opacity .05s",
                  }}
                />
              ))}
              {/* Refined left scrim — narrower, more luminous */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(5,28,46,.22) 0%, transparent 55%), linear-gradient(to bottom, rgba(5,28,46,.08) 0%, rgba(5,28,46,.42) 100%)",
                }}
              />

              {/* ── Pantone card ── */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "min(276px,86%)",
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                {[
                  { data: s, op: 1 - cardOut, ty: cardOut * -20 },
                  { data: ns, op: cardOut, ty: (1 - cardOut) * 20 },
                ].map(({ data, op, ty }, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      background: "#fff",
                      borderRadius: 10,
                      overflow: "hidden",
                      transform: `translate(-50%, calc(-50% + ${ty}px))`,
                      opacity: op,
                      width: "100%",
                      boxShadow:
                        "0 20px 60px rgba(5,28,46,.28), 0 4px 12px rgba(5,28,46,.12), 0 0 0 0.5px rgba(255,255,255,.18)",
                    }}
                  >
                    <img
                      src={data.cardImg}
                      alt=""
                      style={{
                        width: "100%",
                        height: 175,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Thin shimmer stripe on image */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 175,
                        overflow: "hidden",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
                          animation: "shimmerSlide 3.2s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <div style={{ padding: "14px 16px 16px" }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          marginBottom: 6,
                          letterSpacing: -0.3,
                          color: "#0f1a2e",
                        }}
                      >
                        {data.card}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          paddingTop: 8,
                          borderTop: "0.5px solid rgba(25,128,194,.12)",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#1980c2",
                            animation: "dotPulse 2.4s ease-in-out infinite",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: 6.5,
                              fontWeight: 700,
                              color: "#aaa",
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              marginBottom: 1,
                            }}
                          >
                            {brand.serviceByLabel}
                          </div>
                          <div
                            style={{
                              fontSize: 9.5,
                              fontWeight: 900,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#0f1a2e",
                            }}
                          >
                            {brand.name}™
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Slide indicators — refined ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: 22,
                  left: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                {SLIDES.map((_, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div
                      style={{
                        height: 1.5,
                        width: i === slide ? 22 : 8,
                        borderRadius: 1,
                        background:
                          i === slide ? "#ffffff" : "rgba(255,255,255,.28)",
                        transition: "width .35s cubic-bezier(.22,1,.36,1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                        color:
                          i === slide
                            ? "rgba(255,255,255,.82)"
                            : "rgba(255,255,255,.22)",
                        transition: "color .35s",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              {SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.right}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity:
                      i === slide
                        ? 1 - cardOut
                        : i === (slide + 1) % SLIDES.length
                          ? cardOut
                          : 0,
                    transition: "opacity .05s",
                  }}
                />
              ))}
              {/* Richer directional scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(5,28,46,.72) 0%, rgba(5,28,46,.18) 48%, transparent 72%), linear-gradient(to left, transparent 60%, rgba(5,28,46,.14) 100%)",
                }}
              />

              {/* ── Notification toast — sharper ── */}
              <div
                style={{
                  position: "absolute",
                  top: 82,
                  right: 24,
                  width: "min(300px, calc(58vw - 20px))",
                  zIndex: 80,
                  background: "rgba(238,247,253,.92)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 12,
                  border: "0.5px solid rgba(25,128,194,.18)",
                  padding: "12px 14px",
                  transform: notif
                    ? "translateY(0) scale(1)"
                    : "translateY(-16px) scale(.96)",
                  opacity: notif ? 1 : 0,
                  transition:
                    "transform .4s cubic-bezier(.22,1,.36,1), opacity .28s",
                  pointerEvents: "none",
                  boxShadow:
                    "0 8px 32px rgba(5,28,46,.12), 0 1px 0 rgba(255,255,255,.6) inset",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      background: "#1980c2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(25,128,194,.35)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 6.5,
                        fontWeight: 900,
                        letterSpacing: 0.5,
                        color: "#fff",
                      }}
                    >
                      {brand.name}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 7,
                        fontWeight: 700,
                        color: "#1468a0",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      New update
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#0c447c",
                        lineHeight: 1.45,
                      }}
                    >
                      {notifMsg}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Hero copy — refined spacing & type ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? 138 : 44,
                  right: 28,
                  left: 24,
                  maxWidth: 480,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                {/* Eyebrow */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 1.5,
                      background: "rgba(93,167,230,.85)",
                      borderRadius: 1,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.52)",
                      fontFamily: "monospace",
                    }}
                  >
                    {brand.name}
                  </span>
                </div>

                <h1
                  style={{
                    color: "#fff",
                    fontSize: isMobile ? 22 : "clamp(28px,3.8vw,46px)",
                    lineHeight: 1.04,
                    letterSpacing: "-.03em",
                    fontWeight: 800,
                    whiteSpace: "pre-line",
                    marginBottom: 14,
                  }}
                >
                  {s.h1}
                </h1>
                <p
                  style={{
                    color: "rgba(255,255,255,.52)",
                    fontSize: isMobile ? 9 : 11,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    lineHeight: 1.65,
                    marginBottom: 24,
                    maxWidth: 340,
                  }}
                >
                  {s.sub}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button
                    style={{
                      background: "#fff",
                      border: "none",
                      padding: isMobile ? "8px 20px" : "10px 26px",
                      fontWeight: 700,
                      fontSize: isMobile ? 7 : 8.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      borderRadius: 99,
                      color: "#0f1a2e",
                      cursor: "pointer",
                    }}
                  >
                    {hero.cta}
                  </button>
                  <button
                    style={{
                      background: "rgba(255,255,255,.07)",
                      border: "0.5px solid rgba(255,255,255,.32)",
                      padding: isMobile ? "8px 20px" : "10px 26px",
                      fontWeight: 700,
                      fontSize: isMobile ? 7 : 8.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      borderRadius: 99,
                      color: "rgba(255,255,255,.82)",
                      cursor: "pointer",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    View Our Work
                  </button>
                </div>
              </div>

              {/* ── Progress bar — refined ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? 108 : 18,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                <div
                  style={{
                    height: 1.5,
                    width: isMobile ? 70 : 120,
                    borderRadius: 1,
                    background: "rgba(255,255,255,.15)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${prog}%`,
                      background: "linear-gradient(to right, #5aa7e6, #3da0e4)",
                      transition: "width .1s linear",
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    slideRef.current.paused = !slideRef.current.paused;
                    setPaused((p) => !p);
                  }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "0.5px solid rgba(255,255,255,.3)",
                    color: "rgba(255,255,255,.7)",
                    fontSize: 7.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color .2s, color .2s",
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>

          {/* ── Thin border ring on the frame ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: collapseT * 14,
              border: `0.5px solid rgba(255,255,255,${collapseT * 0.15})`,
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════
            COLLAPSED THUMBNAIL PANELS
        ════════════════════════════════════════════════════ */}
        {collapsePanels.map((t, i) => {
          const rowIndex = i % 5;
          const centerOffset = rowIndex - 2;
          const isTopRow = i < 5;
          const panelGap = isMobile ? 86 : 225;
          const startScale = 0.1;
          const endScale = isMobile ? 0.68 : 0.86;
          const sc = startScale + collapseT * (endScale - startScale);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                zIndex: 22,
                pointerEvents: "none",
                width: isMobile ? 120 : 185,
                height: isMobile ? 104 : 160,
                left: `calc(50% + ${centerOffset * panelGap}px)`,
                top: isTopRow ? "24%" : "72%",
                transform: `translate(-50%,-50%) scale(${sc})`,
                opacity: Math.max(
                  0,
                  Math.min(1, collapseT * 1.45 - 0.18 - i * 0.015),
                ),
                borderRadius: 10,
                overflow: "hidden",
                mixBlendMode: "multiply",
                boxShadow: "0 4px 20px rgba(5,28,46,.10)",
              }}
            >
              <img
                src={t.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: t.fit,
                  display: "block",
                }}
              />
            </div>
          );
        })}

        {/* ════════════════════════════════════════════════════
            FINAL CTA OVERLAY
        ════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            zIndex: 30,
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) translateY(${(1 - collapseT) * 18}px)`,
            opacity: Math.max(0, collapseT * 3 - 2),
            pointerEvents: collapseT > 0.85 ? "all" : "none",
            textAlign: "center",
            width: "96vw",
            maxWidth: 1180,
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(20,104,160,.5)",
              marginBottom: 14,
            }}
          >
            Making A Difference
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,5vw,58px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-.04em",
              color: "#0c447c",
              marginBottom: 32,
            }}
          >
            Structure changes{" "}
            <span style={{ color: "#1980c2" }}>everything.</span>
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <button
              style={{
                background: "#1980c2",
                border: "none",
                padding: "12px 32px",
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderRadius: 99,
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(25,128,194,.32)",
              }}
            >
              {hero.cta}
            </button>
            <button
              style={{
                background: "rgba(255,255,255,.6)",
                border: "0.5px solid rgba(15,79,122,.16)",
                padding: "12px 32px",
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderRadius: 99,
                color: "#1468a0",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            TRUSTED BY — marquee
        ════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 70,
            pointerEvents: "none",
            padding: "40px 32px 22px",
            opacity: Math.min(
              1,
              Math.max(0, 1 - phase1v * 2.5) + Math.max(0, collapseT * 3 - 2),
            ),
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
              color: "#1468a0",
            }}
          >
            Trusted by
          </p>
          <div style={{ overflow: "hidden", width: "min(560px, 85vw)" }}>
            <div
              className="animate-marquee"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
                width: "max-content",
              }}
            >
              {[
                "/log1.png",
                "/log2.png",
                "/log3.png",
                "/log4.png",
                "/log5.png",
                "/log1.png",
                "/log2.png",
                "/log3.png",
                "/log4.png",
                "/log5.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{
                    height: 52,
                    width: "auto",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
