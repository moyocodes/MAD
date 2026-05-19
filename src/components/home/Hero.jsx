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

  return (
    <div
      ref={wrapRef}
      style={{
        height: "180vh",
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
        {/* Collapse bg — azure-50 so thumbnails blend into the azure ground */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "#eef7fd",
            opacity: collapseT,
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
            opacity: 1 - frameToPanelT,
          }}
        >
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>

            {/* Left panel */}
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
                      className="bg-white"
                      style={{
                        position: "absolute",
                        borderRadius: 8,
                        overflow: "hidden",
                        transform: `translate(-50%,calc(-50% + ${ty}px))`,
                        opacity: op,
                        width: "100%",
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
                          {brand.serviceByLabel}
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
                          {brand.name}™
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

            {/* Right panel */}
            <div
              style={{
                flex: 1,
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
                    "linear-gradient(to top,rgba(5,28,46,.58),rgba(5,28,46,.08) 55%,transparent)",
                }}
              />

              {/* Notification — azure-50 bg, azure-800 text */}
              <div
                style={{
                  position: "absolute",
                  top: 82,
                  right: 24,
                  width: "min(300px, calc(58vw - 20px))",
                  zIndex: 80,
                  background: "rgba(238,247,253,.94)",
                  backdropFilter: "blur(18px)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  transform: notif
                    ? "translateY(0) scale(1)"
                    : "translateY(-28px) scale(.94)",
                  opacity: notif ? 1 : 0,
                  transition:
                    "transform .45s cubic-bezier(.22,1,.36,1), opacity .3s",
                  pointerEvents: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div
                    className="bg-azure-500"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
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
                      {brand.name}
                    </span>
                  </div>
                  <span
                    className="text-azure-800 leading-[1.4] text-[9px] md:text-xs"
                    style={{ fontWeight: 700 }}
                  >
                    {notifMsg}
                  </span>
                </div>
              </div>

              {/* Hero copy */}
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? 138 : 36,
                  right: 28,
                  left: 20,
                  maxWidth: 460,
                  opacity: Math.max(0, 1 - phase1v * 2),
                }}
              >
                <h1
                  className="text-white text-sm md:text-4xl"
                  style={{
                    lineHeight: 1.05,
                    letterSpacing: "-.02em",
                    whiteSpace: "pre-line",
                    marginBottom: 12,
                  }}
                >
                  {s.h1}
                </h1>
                <p
                  className="text-white/60 text-[8px] md:text-[11px]"
                  style={{
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    marginBottom: 20,
                  }}
                >
                  {s.sub}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button
                    className="bg-white text-dark-900 text-[7px] md:text-[9px]"
                    style={{
                      border: "none",
                      padding: "9px 22px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      borderRadius: 99,
                    }}
                  >
                    {hero.cta}
                  </button>
                  <button
                    className="text-white text-[7px] md:text-[9px]"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,.45)",
                      padding: "9px 22px",
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
                  bottom: isMobile ? 108 : 16,
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
                  className="bg-white/20 overflow-hidden w-[70px] md:w-[120px]"
                  style={{
                    height: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${prog}%`,
                      background: "#5aa7e6",
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    slideRef.current.paused = !slideRef.current.paused;
                    setPaused((p) => !p);
                  }}
                  className="text-white flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,.35)",
                    fontSize: 8,
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed panels — mixBlendMode multiply so azure-50 bg bleeds through */}
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
                top: isTopRow
                  ? isMobile ? "24%" : "24%"
                  : isMobile ? "72%" : "72%",
                transform: `translate(-50%,-50%) scale(${sc})`,
                opacity: Math.max(
                  0,
                  Math.min(1, collapseT * 1.45 - 0.18 - i * 0.015),
                ),
                borderRadius: 9,
                overflow: "hidden",
                mixBlendMode: "multiply",
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

        {/* Final CTA overlay */}
        <div
          className="w-[96vw] max-w-[1180px] text-center"
          style={{
            position: "absolute",
            zIndex: 30,
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) translateY(${(1 - collapseT) * 20}px)`,
            opacity: Math.max(0, collapseT * 3 - 2),
            pointerEvents: collapseT > 0.85 ? "all" : "none",
          }}
        >
          <p className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-azure-700/55">
            Making A Difference
          </p>
          <h2 className="mb-7 font-display font-black leading-none tracking-tight text-azure-800 text-2xl md:text-5xl">
            Structure changes{" "}
            <span className="text-azure-500">everything.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="rounded-full border-none bg-azure-500 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white">
              {hero.cta}
            </button>
            <button
              className="rounded-full px-7 py-3 text-xs font-bold uppercase tracking-widest text-azure-700"
              style={{
                background: "rgba(255,255,255,.55)",
                border: "1px solid rgba(15,79,122,.18)",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Trusted by */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 70,
            pointerEvents: "none",
            padding: "48px 32px 20px",
            background: "transparent",
            opacity: Math.max(0, 1 - phase1v * 2.5),
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
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
                "/log1.png", "/log2.png", "/log3.png", "/log4.png", "/log5.png",
                "/log1.png", "/log2.png", "/log3.png", "/log4.png", "/log5.png",
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