import { useState, useRef, useEffect } from "react";

const SLIDES = [
  {
    left: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
    card: "Product & Digital",
    cardImg:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=75&auto=format&fit=crop",
    h1: "Structure changes\neverything.",
    sub: "We design and build systems that drive focus.",
  },
  {
    left: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop",
    card: "Marketing & Comms",
    cardImg:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=75&auto=format&fit=crop",
    h1: "Communication\nthat connects.",
    sub: "Campaigns that reach the right people.",
  },
  {
    left: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop",
    card: "Brand & Design",
    cardImg:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=75&auto=format&fit=crop",
    h1: "Identities built\nfor clarity.",
    sub: "Brand systems that speak before you do.",
  },
];

const THUMBS = [
  {
    src: "/flier/image.png",
    x: -38,
    y: -28,
    r: -2.5,
  },
  {
     src: "/flier/image2.png",  x: -18,
    y: -32,
    r: 1.5,
  },
  {
    src: "/flier/image3.png",   x: +40,
    y: +20,
    r: -2,
  },
  {
    src: "/flier/image4.png",
    x: +34,
    y: -32,
    r: 2,
  },
  {
  src: "/flier/image5.png",    x: -36,
    y: +18,
    r: 2.5,
  },
  {
    src: "/flier/image6.png",
    x: -16,
    y: +19,
    r: -1.5,
  },
  {
    src: "/flier/image7.png",
    x: +17,
    y: +18,
    r: 1,
  },
  {
    src: "/flier/image8.png",
    x: -36,
    y: +18,
    r: 2.5,
  },
];

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
  const notifTimerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const NOTIFS = [
    "New inquiry from Kova Group",
    "TruBilling shipped ✓ — Product launch confirmed",
    "Meridian campaign went live today",
  ];

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
        clearTimeout(notifTimerRef.current);
        setNotif(false);
        setTimeout(() => {
          setNotifMsg(NOTIFS[Math.min(phase, NOTIFS.length - 1)]);
          setNotif(true);
          notifTimerRef.current = setTimeout(() => setNotif(false), 3500);
        }, 300);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pf = rawPct * 3;
  const phase = Math.min(2, Math.floor(pf));
  const pct = pf - phase;
  const collapseT = Math.min(1, Math.max(0, rawPct * 3));
  const phase1v = Math.min(1, Math.max(0, rawPct * 3));
  const cardOut = Math.max(0, (pct - 0.7) / 0.3);
  const s = SLIDES[slide];
  const ns = SLIDES[(slide + 1) % SLIDES.length];

  return (
    <div
      ref={wrapRef}
      style={{
        height: "300vh",
        position: "relative",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        {/* Collapse bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: collapseT,
            background:
              "linear-gradient(160deg, #edf5fa 0%, #dce9f4 25%, #e6eef8 50%, #d8e6f2 75%, #e2ecf8 100%)",
          }}
        />

        {/* Main viewport frame */}
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            overflow: "hidden",
            left: `${collapseT * 43}%`,
            right: `${collapseT * 43}%`,
            top: `${collapseT * 11}%`,
            bottom: `${collapseT * 72}%`,
            borderRadius: collapseT * 8,
            boxShadow: `0 ${collapseT * 16}px ${collapseT * 40}px rgba(0,0,0,${collapseT * 0.2})`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>
            {/* Left panel */}
            {!isMobile && (
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
                <div className="absolute inset-0 bg-azure-900/[8%]" />
                {/* Pantone card */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "min(240px,75%)",
                    opacity: Math.max(0, 1 - phase1v * 2),
                  }}
                >
                  {[
                    { data: s, op: 1 - cardOut, ty: cardOut * -20 },
                    { data: ns, op: cardOut, ty: (1 - cardOut) * 20 },
                  ].map(({ data, op, ty }, i) => (
                    <div
                      key={i}
                      className="bg-white"
                      style={{
                        position: "absolute",
                        borderRadius: 8,
                        overflow: "hidden",
                        transform: `translate(-50%,calc(-50% + ${ty}px))`,
                        opacity: op,
                        width: "100%",
                        boxShadow: "0 16px 48px rgba(0,0,0,.3)",
                      }}
                    >
                      <img
                        src={data.cardImg}
                        alt=""
                        style={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div style={{ padding: "12px 14px" }}>
                        <div
                          className="text-dark-900"
                          style={{
                            fontSize: 13,
                            fontWeight: 900,
                            marginBottom: 6,
                            letterSpacing: -0.2,
                          }}
                        >
                          {data.card}
                        </div>
                        <div
                          style={{
                            fontSize: 7,
                            fontWeight: 700,
                            color: "#aaa",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            marginBottom: 2,
                          }}
                        >
                          Service by
                        </div>
                        <div
                          className="text-dark-900"
                          style={{
                            fontSize: 10,
                            fontWeight: 900,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          MAD™
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Slide indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    opacity: Math.max(0, 1 - phase1v * 2),
                  }}
                >
                  {SLIDES.map((_, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <div
                        style={{
                          height: 1.5,
                          width: i === slide ? 20 : 8,
                          background:
                            i === slide ? "#ffffff" : "rgba(255,255,255,.3)",
                          transition: "width .3s",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 7,
                          fontWeight: 700,
                          color:
                            i === slide
                              ? "rgba(255,255,255,.75)"
                              : "rgba(255,255,255,.25)",
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right panel */}
            <div
              style={{
                flex: isMobile ? undefined : 1,
                width: isMobile ? "100%" : undefined,
                position: "relative",
                overflow: "hidden",
              }}
            >
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
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(8,42,80,.58),rgba(8,42,80,.08) 55%,transparent)",
                }}
              />

              {/* Mobile Pantone card — shown instead of left panel */}
              {isMobile && (
                <div
                  className="bg-white"
                  style={{
                    position: "absolute",
                    top: 72,
                    left: 16,
                    width: 130,
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 12px 32px rgba(0,0,0,.28)",
                    opacity: Math.max(0, 1 - phase1v * 2),
                    zIndex: 30,
                    pointerEvents: "none",
                  }}
                >
                  <img
                    src={s.cardImg}
                    alt=""
                    style={{
                      width: "100%",
                      height: 80,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "8px 10px" }}>
                    <div
                      className="text-dark-900"
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        marginBottom: 4,
                        letterSpacing: -0.2,
                      }}
                    >
                      {s.card}
                    </div>
                    <div
                      style={{
                        fontSize: 6.5,
                        fontWeight: 700,
                        color: "#aaa",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      Service by
                    </div>
                    <div
                      className="text-dark-900"
                      style={{
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      MAD™
                    </div>
                  </div>
                </div>
              )}

              {/* Notification */}
              <div
                className="bg-dark-900/[92%]"
                style={{
                  position: "absolute",
                  top: 72,
                  right: 20,
                  width: 220,
                  zIndex: 40,
                  backdropFilter: "blur(16px)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  border: "1px solid rgba(255,255,255,.1)",
                  transform: notif
                    ? "translateY(0) scale(1)"
                    : "translateY(-40px) scale(.9)",
                  opacity: notif ? 1 : 0,
                  transition:
                    "transform .45s cubic-bezier(.22,1,.36,1), opacity .3s",
                  pointerEvents: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    className="bg-azure-500"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="text-white"
                      style={{
                        fontSize: 7,
                        fontWeight: 900,
                        letterSpacing: 0.5,
                      }}
                    >
                      MAD
                    </span>
                  </div>
                  <span
                    className="text-white/85 leading-[1.4]"
                    style={{ fontSize: 10.5 }}
                  >
                    {notifMsg}
                  </span>
                </div>
              </div>

              {/* Hero copy */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? 96 : 36,
                  right: 28,
                  left: 20,
                  maxWidth: 460,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                <h1
                  className="text-white"
                  style={{
                    fontSize: "clamp(22px,5.5vw,48px)",
                    lineHeight: 1.05,
                    letterSpacing: "-.02em",
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 20px rgba(0,0,0,.3)",
                    marginBottom: 12,
                  }}
                >
                  {s.h1}
                </h1>
                <p
                  className="text-white/60"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    marginBottom: 20,
                  }}
                >
                  {s.sub}
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="bg-white text-dark-900"
                    style={{
                      border: "none",
                      padding: "9px 22px",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      borderRadius: 99,
                    }}
                  >
                    Work With Us
                  </button>
                  <button
                    className="text-white"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,.45)",
                      padding: "9px 22px",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      borderRadius: 99,
                    }}
                  >
                    View Our Work
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? 175 : 16,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                <div
                  className="bg-white/20 overflow-hidden"
                  style={{
                    width: "clamp(70px,8vw,120px)",
                    height: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${prog}%`,
                      background: "linear-gradient(90deg,#1980c2,#ffffff)",
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    slideRef.current.paused = !slideRef.current.paused;
                    setPaused((p) => !p);
                  }}
                  className="text-white bg-black/25 flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.45)",
                    fontSize: 8,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scattered thumbnails */}
        {THUMBS.map((t, i) => {
          const sc = 0.1 + collapseT * 0.9;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                zIndex: 15,
                pointerEvents: "none",
                width: 170,
                height: 148,
                left: `calc(50% + ${t.x}%)`,
                top: `calc(50% + ${t.y}%)`,
                transform: `translate(-50%,-50%) rotate(${t.r}deg) scale(${sc})`,
                opacity: Math.max(0, collapseT * 1.4 - 0.1 - i * 0.01),
                borderRadius: 9,
                overflow: "hidden",
                boxShadow: `0 ${10 * collapseT}px ${28 * collapseT}px rgba(0,0,0,${collapseT * 0.35})`,
                border: `1px solid rgba(15,79,122,${collapseT * 0.12})`,
              }}
            >
              <img
                src={t.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "transparent",
                }}
              />
            </div>
          );
        })}

        {/* Final CTA overlay */}
        <div
          style={{
            position: "absolute",
            zIndex: 30,
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) translateY(${(1 - collapseT) * 20}px)`,
            opacity: Math.max(0, collapseT * 3 - 2),
            pointerEvents: collapseT > 0.85 ? "all" : "none",
            width: "min(580px,85vw)",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: 14,
              color: "rgba(15,79,122,0.55)",
            }}
          >
            Making A Difference
          </p>
          <h2
            style={{
              fontSize: "clamp(32px,5vw,68px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-.03em",
              color: "#0f2a45",
              marginBottom: 28,
            }}
          >
            Structure changes
            <br />
            <span className="text-azure-500">everything.</span>
          </h2>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="bg-azure-500 text-white"
              style={{
                border: "none",
                padding: "11px 28px",
                borderRadius: 99,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Work With Us
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.55)",
                color: "#0f2a45",
                border: "1px solid rgba(15,79,122,.18)",
                padding: "11px 28px",
                borderRadius: 99,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Trusted by — left-aligned rotating image marquee */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 70,
            pointerEvents: "none",
            padding: "48px 32px 20px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(244,244,242,0.82) 45%, rgba(244,244,242,0.96) 100%)",
          }}
        >
          <p
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
              color: "rgba(15,79,122,0.65)",
              textShadow: "0 0 16px rgba(255,255,255,.9)",
            }}
          >
            Trusted by 
          </p>
          <div style={{ overflow: "hidden", width: "min(560px, 85vw)" }}>
            <div
              className="mq"
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
                    height: 36,
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
