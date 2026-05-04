import React, { useState, useEffect, useRef, useCallback } from "react";

const AZ = "#1980c2";
const DARK = "#181817";
const CREAM = "#f5f1eb";
const TB = "#F26522";
const GRAY1 = "#f4f4f3";
const GRAY2 = "#e8e8e6";
const GRAY3 = "#b0b0ac";
const GRAY4 = "#6b6b68";
const BASE_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO_FONT = "'Montserrat', 'Helvetica Neue', Helvetica, sans-serif";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const y = useScrollY();
  return (
    <div
      style={{
        padding: "10px 20px",
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        fontFamily: BASE_FONT,
      }}
    >
      <nav
        style={{
          background:
            y > 10 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 50,
          padding: "0 2rem",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow:
            y > 10 ? "0 4px 24px rgba(0,0,0,.10)" : "0 1px 8px rgba(0,0,0,.07)",
          transition: "box-shadow .3s, background .3s",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: ".06em" }}>
          M<span style={{ color: AZ }}>A</span>D
        </div>
        <ul
          className="mad-nav-ul"
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {["Work", "Services", "About"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: DARK,
                  textDecoration: "none",
                  opacity: 0.55,
                  transition: "opacity .2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.55)}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".05em",
              opacity: 0.55,
              cursor: "pointer",
            }}
          >
            Contact
          </span>
          <button
            style={{
              background: AZ,
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "8px 20px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: BASE_FONT,
            }}
          >
            Work With Us
          </button>
        </div>
      </nav>
    </div>
  );
}
// ─── HERO ────────────────────────────────────────────────────────────────────
// Phase 0: Slide carousel (play/pause)
// Phase 1: Split before/after slider
// Phase 2: Page collapses into a floating "browser window" card,
//          8 thumbnail cards cluster around it, CTA in center

const HERO_SLIDES = [
  {
    left: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&auto=format&fit=crop",
    cardImg:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop",
    card: "Product & Digital",
    h1: "Structure changes\neverything.",
    sub: "Websites, apps & platforms built to scale.",
  },
  {
    left: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&auto=format&fit=crop",
    cardImg:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80&auto=format&fit=crop",
    card: "Marketing & Comms",
    h1: "Communication\nthat connects.",
    sub: "Campaigns and content that reach the right people.",
  },
  {
    left: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=85&auto=format&fit=crop",
    cardImg:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80&auto=format&fit=crop",
    card: "Brand & Design",
    h1: "Identities built\nfor clarity.",
    sub: "Brand systems that speak before you do.",
  },
];

// 8 thumbnail images that scatter around the collapsed screen
const THUMB_IMGS = [
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&q=75&auto=format&fit=crop",
];

// Final clustered positions (as % from center, so 0=center)
// Tight orbit around the central screen card
const THUMB_FINAL = [
  { x: -50, y: -30, w: 260, h: 182, r: -2.5 }, // top: far-left
  { x: -20, y: -33, w: 274, h: 192, r: 1.5 }, // top: inner-left
  { x: +20, y: -29, w: 256, h: 180, r: -1 }, // top: inner-right
  { x: +50, y: -34, w: 266, h: 186, r: 2 }, // top: far-right
  { x: -48, y: +30, w: 262, h: 184, r: 2.5 }, // bot: far-left
  { x: -18, y: +33, w: 270, h: 190, r: -1.5 }, // bot: inner-left
  { x: +18, y: +30, w: 258, h: 182, r: 1 }, // bot: inner-right
  { x: +48, y: +34, w: 264, h: 186, r: -2 }, // bot: far-right
];

function PhoneNotif({ show, msg, sub }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        right: 28,
        zIndex: 40,
        width: 230,
        background: "rgba(24,24,23,0.93)",
        backdropFilter: "blur(18px)",
        borderRadius: 14,
        padding: "11px 13px",
        border: "1px solid rgba(255,255,255,.1)",
        transform: show
          ? "translateY(0) scale(1)"
          : "translateY(-56px) scale(.88)",
        opacity: show ? 1 : 0,
        transition:
          "transform .5s cubic-bezier(.34,1.56,.64,1), opacity .35s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: `linear-gradient(135deg,${AZ},#0c4d82)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              fontFamily: BASE_FONT,
            }}
          >
            M
          </span>
        </div>
        <div>
          <div
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              color: "rgba(255,255,255,.4)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              fontFamily: BASE_FONT,
            }}
          >
            MAD
          </div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: "#fff",
              fontFamily: BASE_FONT,
              lineHeight: 1.3,
            }}
          >
            {msg}
          </div>
        </div>
      </div>
      {sub && (
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,.4)",
            marginTop: 5,
            fontFamily: BASE_FONT,
            lineHeight: 1.5,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Hero() {
  const wrapRef = useRef(null);
  const [rawPct, setRawPct] = useState(0);
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);

  // Slideshow
  const [slide, setSlide] = useState(0);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRef = useRef({ slide: 0, prog: 0, paused: false });
  const rafRef = useRef(null);
  const lastTs = useRef(null);

  // Notifications
  const [notif, setNotif] = useState(false);
  const [notifData, setNotifData] = useState({ msg: "", sub: "" });
  const prevPhase = useRef(-1);
  const notifTimer = useRef(null);
  const NOTIFS = [
    { msg: "New inquiry from Kova Group", sub: "Brand & Design · 2 min ago" },
    { msg: "TruBilling shipped ✓", sub: "Product launch confirmed" },
    { msg: "Meridian went live today", sub: "Marketing campaign active" },
  ];

  // Slideshow RAF
  useEffect(() => {
    const DURATION = 5000;
    const step = (ts) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;
      if (!slideRef.current.paused) {
        const np = slideRef.current.prog + (dt / DURATION) * 100;
        if (np >= 100) {
          const ns = (slideRef.current.slide + 1) % HERO_SLIDES.length;
          slideRef.current = { ...slideRef.current, slide: ns, prog: 0 };
          setSlide(ns);
          setProg(0);
        } else {
          slideRef.current.prog = np;
          setProg(np);
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const togglePause = () => {
    slideRef.current.paused = !slideRef.current.paused;
    setPaused((p) => !p);
  };

  // Scroll → phase
  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = Math.min(1, Math.max(0, scrolled / total));
      setRawPct(raw);
      const phaseF = raw * 3;
      const p = Math.min(2, Math.floor(phaseF));
      setPct(phaseF - p);
      setPhase(p);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Notifications
  useEffect(() => {
    if (phase === prevPhase.current) return;
    prevPhase.current = phase;
    clearTimeout(notifTimer.current);
    setNotif(false);
    setTimeout(() => {
      setNotifData(NOTIFS[Math.min(phase, NOTIFS.length - 1)]);
      setNotif(true);
      notifTimer.current = setTimeout(() => setNotif(false), 3800);
    }, 350);
  }, [phase]);

  const s = HERO_SLIDES[slide];
  const ns = HERO_SLIDES[(slide + 1) % HERO_SLIDES.length];

  // Phase helpers
  const phase1visible = Math.min(1, Math.max(0, (rawPct * 3 - 1) * 2.5));
  const phase2visible = Math.min(1, Math.max(0, (rawPct * 3 - 2) * 2.5));
  const cardOut = Math.max(0, (pct - 0.7) / 0.3);

  // ── COLLAPSE: browser window shrinks from full-screen to a card ──
  // collapseT: 0 = full screen, 1 = fully collapsed card
  const collapseT = phase2visible;
  // Screen dimensions interpolation
  const screenW = `${100 - collapseT * 48}%`; // 100% → 52%
  const screenH = `${100 - collapseT * 40}%`; // 100% → 60%
  const screenBR = collapseT * 8; // matches thumbnail card radius
  const screenX = `${collapseT * 0}%`; // stays centered
  // Shadow builds as it collapses
  const screenShadow = `0 ${collapseT * 16}px ${collapseT * 40}px rgba(0,0,0,${collapseT * 0.14})`;
  // Browser chrome bar opacity
  const chromeOpacity = collapseT;

  return (
    <div ref={wrapRef} style={{ height: "400vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          fontFamily: BASE_FONT,
          background: DARK,
        }}
      >
        {/* ── DARK BG that shows as screen collapses ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: `radial-gradient(ellipse at 40% 50%, #ede8e2 0%, #e2ddd8 100%)`,
            opacity: collapseT,
          }}
        />

        {/* ── THE COLLAPSING SCREEN (wraps left+right panels) ── */}
        <div
          style={{
            position: "absolute",
            // Center it, collapse inward symmetrically
            left: `${collapseT * 43}%`,
            right: `${collapseT * 43}%`,
            top: `${collapseT * 11}%`,
            bottom: `${collapseT * 72}%`,
            zIndex: 20,
            borderRadius: screenBR,
            overflow: "hidden",
            boxShadow: screenShadow,
            transition: "none",
            // Browser chrome border
            outline:
              collapseT > 0.05
                ? `${collapseT * 1.5}px solid rgba(0,0,0,.08)`
                : "none",
          }}
        >
          {/* Minimal chrome bar — traffic lights only */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: `${collapseT * 18}px`,
              background: "rgba(22,22,24,0.96)",
              zIndex: 30,
              opacity: collapseT,
              display: "flex",
              alignItems: "center",
              padding: `0 ${collapseT * 8}px`,
              gap: collapseT * 4,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: collapseT * 4, flexShrink: 0 }}>
              {["#ff5f57", "#ffbd2e", "#28ca41"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: collapseT * 6,
                    height: collapseT * 6,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content shifted down by chrome bar */}
          <div
            style={{
              position: "absolute",
              top: `${collapseT * 18}px`,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
            }}
          >
            {/* LEFT PANEL */}
            <div
              className="mad-hero-left"
              style={{
                position: "relative",
                width: "42%",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {HERO_SLIDES.map((sl, i) => (
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
                        : i === (slide + 1) % HERO_SLIDES.length
                          ? cardOut
                          : 0,
                    transition: "none",
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,.26)",
                }}
              />

              {/* Pantone card — fades out in phase 1+ */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "min(260px,80%)",
                  zIndex: 10,
                  opacity: Math.max(0, 1 - phase1visible * 2),
                  transition: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    transform: `translate(-50%, calc(-50% + ${cardOut * -24}px))`,
                    width: "100%",
                    opacity: 1 - cardOut,
                    background: "#fff",
                    boxShadow: "0 24px 64px rgba(0,0,0,.32)",
                  }}
                >
                  <img
                    src={s.cardImg}
                    alt=""
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "16px 18px 20px" }}>
                    <div
                      style={{
                        fontSize: "clamp(14px,1.6vw,20px)",
                        fontWeight: 800,
                        letterSpacing: "-.02em",
                        color: DARK,
                        marginBottom: 12,
                        lineHeight: 1.1,
                      }}
                    >
                      {s.card}
                    </div>
                    <div
                      style={{
                        fontSize: 7.5,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: GRAY3,
                        marginBottom: 3,
                      }}
                    >
                      Service crafted by
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: DARK,
                      }}
                    >
                      MAD™
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    transform: `translate(-50%, calc(-50% + ${(1 - cardOut) * 24}px))`,
                    width: "100%",
                    opacity: cardOut,
                    background: "#fff",
                    boxShadow: "0 24px 64px rgba(0,0,0,.32)",
                  }}
                >
                  <img
                    src={ns.cardImg}
                    alt=""
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "16px 18px 20px" }}>
                    <div
                      style={{
                        fontSize: "clamp(14px,1.6vw,20px)",
                        fontWeight: 800,
                        letterSpacing: "-.02em",
                        color: DARK,
                        marginBottom: 12,
                        lineHeight: 1.1,
                      }}
                    >
                      {ns.card}
                    </div>
                    <div
                      style={{
                        fontSize: 7.5,
                        fontWeight: 700,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: GRAY3,
                        marginBottom: 3,
                      }}
                    >
                      Service crafted by
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: DARK,
                      }}
                    >
                      MAD™
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide index */}
              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  opacity: Math.max(0, 1 - phase1visible * 2),
                }}
              >
                {HERO_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div
                      style={{
                        height: 1.5,
                        width: i === slide ? 22 : 10,
                        background:
                          i === slide ? "#fff" : "rgba(255,255,255,.3)",
                        borderRadius: 1,
                        transition: "width .4s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        color:
                          i === slide
                            ? "rgba(255,255,255,.8)"
                            : "rgba(255,255,255,.28)",
                        letterSpacing: ".12em",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              {HERO_SLIDES.map((sl, i) => (
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
                        : i === (slide + 1) % HERO_SLIDES.length
                          ? cardOut
                          : 0,
                    transition: "none",
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.1) 50%, transparent 100%)",
                }}
              />

              <PhoneNotif
                show={notif}
                msg={notifData.msg}
                sub={notifData.sub}
              />

              {/* Phase indicator */}
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-end",
                  opacity: Math.max(0, 1 - phase1visible * 2),
                }}
              >
                {HERO_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: i === slide ? 36 : 14,
                      width: 2,
                      background:
                        i === slide ? "#fff" : "rgba(255,255,255,.22)",
                      borderRadius: 1,
                      transition: "height .4s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                ))}
              </div>

              {/* Headline */}
              <div
                style={{
                  position: "absolute",
                  bottom: 52,
                  right: 44,
                  maxWidth: 480,
                  textAlign: "right",
                  opacity: Math.max(0, 1 - phase1visible * 2),
                  transition: "none",
                }}
              >
                <h1
                  style={{
                    fontFamily: 'Georgia,"Times New Roman",serif',
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(26px,3.6vw,52px)",
                    lineHeight: 1.1,
                    color: "#fff",
                    letterSpacing: "-.01em",
                    marginBottom: 18,
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 24px rgba(0,0,0,.35)",
                  }}
                >
                  {s.h1}
                </h1>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(255,255,255,.6)",
                    letterSpacing: ".04em",
                    lineHeight: 1.7,
                    marginBottom: 24,
                    fontFamily: BASE_FONT,
                  }}
                >
                  {s.sub}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      background: "#fff",
                      color: DARK,
                      border: "none",
                      borderRadius: 50,
                      padding: "12px 26px",
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontFamily: BASE_FONT,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = ".85")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Work With Us
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "1.5px solid rgba(255,255,255,.5)",
                      borderRadius: 50,
                      padding: "12px 26px",
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontFamily: BASE_FONT,
                    }}
                  >
                    View Our Work
                  </button>
                </div>
              </div>

              {/* Progress + pause */}
              <div
                style={{
                  position: "absolute",
                  bottom: 22,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  zIndex: 10,
                  opacity: Math.max(0, 1 - phase1visible * 2),
                }}
              >
                <div
                  style={{
                    width: "clamp(80px,10vw,140px)",
                    height: 2,
                    background: "rgba(255,255,255,.22)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${prog}%`,
                      background: "#fff",
                      transition: "none",
                    }}
                  />
                </div>
                <button
                  onClick={togglePause}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,.55)",
                    background: "rgba(0,0,0,.25)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: BASE_FONT,
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>

              {/* Scroll cue */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: Math.max(0, 1 - rawPct * 3 * 6),
                  transition: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.38)",
                    fontFamily: BASE_FONT,
                  }}
                >
                  Scroll
                </span>
                <div
                  style={{
                    width: 1.5,
                    height: 28,
                    background: "rgba(255,255,255,.22)",
                    borderRadius: 1,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background: "rgba(255,255,255,.7)",
                      borderRadius: 1,
                      animation: "scrollDot 1.6s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PHASE 2: 8 thumbnail cards orbit the collapsed screen ── */}
        {THUMB_IMGS.map((src, i) => {
          const tf = THUMB_FINAL[i];
          // Start position: scattered far from center (off-screen edges)
          const startX = tf.x * 3;
          const startY = tf.y * 3;
          // Interpolate from start → final tight position
          const cx = startX + (tf.x - startX) * collapseT;
          const cy = startY + (tf.y - startY) * collapseT;
          // Scale: tiny at 0, full at 1
          const sc = 0.1 + collapseT * 0.9;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                // Position relative to center of viewport
                left: `calc(50% + ${cx}%)`,
                top: `calc(50% + ${cy}%)`,
                transform: `translate(-50%, -50%) rotate(${tf.r}deg) scale(${sc})`,
                width: tf.w,
                height: tf.h,
                opacity: Math.max(0, collapseT * 1.3 - 0.1 - i * 0.01),
                zIndex: 15,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: `0 ${8 * collapseT}px ${24 * collapseT}px rgba(0,0,0,.16)`,
                border: "1.5px solid rgba(0,0,0,.09)",
                transition: "none",
                pointerEvents: "none",
              }}
            >
              {/* Laptop chrome */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 12,
                  background: "#16161a",
                  zIndex: 5,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 7px",
                  gap: 3.5,
                  flexShrink: 0,
                }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: c,
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <img
                src={src}
                alt=""
                style={{
                  position: "absolute",
                  top: 12,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "calc(100% - 12px)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,.14)",
                }}
              />
            </div>
          );
        })}

        {/* ── PHASE 2: CTA floats in the centre gap between the two card rows ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${(1 - collapseT) * 20}px)`,
            zIndex: 30,
            pointerEvents: collapseT > 0.82 ? "all" : "none",
            textAlign: "center",
            opacity: Math.max(0, collapseT * 3 - 2),
            transition: "none",
            width: "min(560px, 80vw)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "#9a9a96",
              marginBottom: 12,
              fontFamily: BASE_FONT,
            }}
          >
            Making A Difference
          </div>
          <h2
            style={{
              fontFamily: "Georgia,serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px,4.4vw,56px)",
              lineHeight: 1.1,
              color: "#181817",
              marginBottom: 24,
              letterSpacing: "-.02em",
            }}
          >
            Ready to build
            <br />
            something real?
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
              style={{
                background: "#1980c2",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "13px 28px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: BASE_FONT,
                boxShadow: "0 4px 20px rgba(25,128,194,.35)",
              }}
            >
              Start a Project →
            </button>
            <button
              style={{
                background: "rgba(24,24,23,.06)",
                color: "#181817",
                border: "1px solid rgba(24,24,23,.12)",
                borderRadius: 50,
                padding: "13px 28px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: BASE_FONT,
              }}
            >
              View Our Work
            </button>
          </div>
        </div>

        <style>{`
          @keyframes scrollDot { 0%{transform:translateY(-100%)} 100%{transform:translateY(280%)} }
        `}</style>
      </div>
    </div>
  );
}

// ─── TRUSTED BY ────────────────────────────────────────────────────────────
const CLIENTS = [
  "Nexora",
  "Arclight",
  "Verdant Co.",
  "Stratum",
  "Kova Group",
  "Lumen Labs",
  "Meridian",
  "Obsidian",
];

function TrustedBy() {
  return (
    <div
      className="mad-trusted"
      style={{
        padding: "40px 48px 36px",
        background: "#fff",
        borderTop: `1px solid ${GRAY2}`,
        borderBottom: `1px solid ${GRAY2}`,
        fontFamily: BASE_FONT,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: GRAY3,
          marginBottom: 24,
        }}
      >
        Trusted by growing businesses, institutions & mission-driven
        organizations
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {CLIENTS.map((c, i) => (
          <div key={c} style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: DARK,
                opacity: 0.24,
                fontStyle: "italic",
                padding: "8px 24px",
                cursor: "default",
                transition: "opacity .2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.65)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.24)}
            >
              {c}
            </span>
            {i < CLIENTS.length - 1 && (
              <div
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: GRAY2,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WHAT WE DO ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    tag: "01",
    shortTag: "Product",
    label: "Product & Digital Solutions",
    tagline: "Built for performance.",
    wide: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop",
    accent:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80&auto=format&fit=crop",
  },
  {
    tag: "02",
    shortTag: "Marketing",
    label: "Marketing & Communication",
    tagline: "Reach the right people.",
    wide: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=85&auto=format&fit=crop",
    accent:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&auto=format&fit=crop",
  },
  {
    tag: "03",
    shortTag: "Brand",
    label: "Brand & Design Systems",
    tagline: "Identity that speaks first.",
    wide: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=85&auto=format&fit=crop",
    accent:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop",
  },
];

function ProgressBar({ duration, running, onComplete }) {
  const [w, setW] = useState(0);
  const raf = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    setW(0);
    if (!running) return;
    startRef.current = null;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(((ts - startRef.current) / duration) * 100, 100);
      setW(p);
      if (p < 100) raf.current = requestAnimationFrame(step);
      else onComplete();
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [running, duration]);
  return (
    <div
      style={{ width: "100%", height: 2, background: GRAY2, borderRadius: 1 }}
    >
      <div
        style={{
          height: "100%",
          width: `${w}%`,
          background: DARK,
          borderRadius: 1,
        }}
      />
    </div>
  );
}

function WhatWeDo() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [entering, setEntering] = useState(false);
  const DURATION = 5500;

  const goTo = useCallback(
    (idx) => {
      if (idx === cur) return;
      setEntering(true);
      setCur(idx);
      setTimeout(() => setEntering(false), 700);
    },
    [cur],
  );

  const next = useCallback(
    () => goTo((cur + 1) % SERVICES.length),
    [cur, goTo],
  );
  const prev = useCallback(
    () => goTo((cur - 1 + SERVICES.length) % SERVICES.length),
    [cur, goTo],
  );
  const svc = SERVICES[cur];

  return (
    <section
      id="services"
      style={{ background: GRAY1, fontFamily: BASE_FONT, padding: 4 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "360px 240px",
          gap: 4,
        }}
      >
        <div
          style={{
            gridRow: "1 / 3",
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          {SERVICES.map((s, i) => (
            <img
              key={i}
              src={s.wide}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === cur ? 1 : 0,
                transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.1) 55%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 0,
              right: 0,
              textAlign: "center",
              padding: "0 28px",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia,serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(22px,2.8vw,34px)",
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              {svc.tagline}
            </p>
            <button
              style={{
                background: "rgba(255,255,255,.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "#fff",
                borderRadius: 50,
                padding: "9px 22px",
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: BASE_FONT,
              }}
            >
              Start a Project
            </button>
          </div>
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <span
              style={{
                fontSize: 7.5,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.5)",
                background: "rgba(0,0,0,.3)",
                backdropFilter: "blur(6px)",
                padding: "5px 10px",
                borderRadius: 50,
              }}
            >
              {svc.tag} / 0{SERVICES.length}
            </span>
          </div>
        </div>
        <div
          style={{ position: "relative", overflow: "hidden", borderRadius: 6 }}
        >
          {SERVICES.map((s, i) => (
            <img
              key={i}
              src={s.top}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 40%",
                opacity: i === cur ? 1 : 0,
                transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.40)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(24px,3vw,38px)",
                  color: "#fff",
                }}
              >
                MAD
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: "rgba(255,255,255,.4)",
                  fontWeight: 300,
                }}
              >
                ×
              </span>
              <span
                style={{
                  fontFamily: BASE_FONT,
                  fontWeight: 800,
                  fontSize: "clamp(16px,2.2vw,26px)",
                  color: "#fff",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                {svc.shortTag}
              </span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              display: "flex",
              gap: 5,
            }}
          >
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `1.5px solid ${i === cur ? "#fff" : "rgba(255,255,255,.28)"}`,
                  background: i === cur ? "#fff" : "transparent",
                  cursor: "pointer",
                  transition: "all .3s",
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 4,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 6,
            }}
          >
            {SERVICES.map((s, i) => (
              <img
                key={i}
                src={s.accent}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === cur ? 1 : 0,
                  transition: "opacity 1s ease",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,.12)",
              }}
            />
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 6,
              padding: "22px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                border: `2px solid ${DARK}`,
                borderRadius: 3,
                padding: "10px 12px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(13px,1.4vw,17px)",
                  fontWeight: 900,
                  color: DARK,
                  letterSpacing: "-.02em",
                  lineHeight: 1.1,
                }}
              >
                {svc.label}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 7.5,
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: GRAY3,
                  marginBottom: 14,
                }}
              >
                Service crafted by
                <br />
                <span style={{ fontSize: 9.5, fontWeight: 800, color: DARK }}>
                  MAD™
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  marginBottom: 12,
                }}
              >
                {SERVICES.map((s, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <span
                      style={{
                        fontSize: 6.5,
                        fontWeight: 700,
                        color: i === cur ? GRAY4 : GRAY2,
                        width: 13,
                        flexShrink: 0,
                      }}
                    >
                      {s.tag}
                    </span>
                    <div style={{ flex: 1 }}>
                      {i === cur ? (
                        <ProgressBar
                          duration={DURATION}
                          running={!paused}
                          onComplete={next}
                        />
                      ) : (
                        <div
                          style={{
                            height: 1.5,
                            background: i < cur ? GRAY3 : GRAY2,
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[
                  { fn: prev, d: "M14 6L8 12l6 6" },
                  { fn: next, d: "M10 6l6 6-6 6" },
                ].map(({ fn, d }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: `1px solid ${GRAY2}`,
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = DARK;
                      e.currentTarget.querySelector("path").style.stroke =
                        "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.querySelector("path").style.stroke = DARK;
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d={d}
                        stroke={DARK}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => setPaused((p) => !p)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: `1px solid ${GRAY2}`,
                    background: "transparent",
                    fontSize: 8,
                    color: DARK,
                    cursor: "pointer",
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCards() {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastTs = useRef(null);
  const DURATION = 5200;
  const NSTAGES = 3;

  useEffect(() => {
    if (paused) {
      lastTs.current = null;
      return;
    }
    const id = setInterval(() => {
      const now = Date.now();
      if (lastTs.current === null) lastTs.current = now;
      const delta = now - lastTs.current;
      lastTs.current = now;
      setElapsed((e) => e + delta);
    }, 40);
    return () => clearInterval(id);
  }, [paused]);

  const cycle = elapsed % (DURATION * NSTAGES);
  const stage = Math.min(NSTAGES - 1, Math.floor(cycle / DURATION));
  const pct = ((cycle % DURATION) / DURATION) * 100;

  const tag = (txt) => (
    <p
      style={{
        fontFamily: MONO_FONT,
        fontSize: 8,
        fontWeight: 700,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.3)",
        padding: "12px 12px 4px",
        margin: 0,
      }}
    >
      {txt}
    </p>
  );

  const Bar = ({ color }) => (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ height: "100%", background: color, width: `${pct}%` }} />
    </div>
  );

  const Dots = ({ color }) => (
    <div
      style={{
        position: "absolute",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 4,
        zIndex: 10,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            transition: "background .3s",
            background: i === stage ? color : "rgba(0,0,0,0.12)",
          }}
        />
      ))}
    </div>
  );

  const cardWrap = (content, accent) => (
    <div
      style={{
        borderRadius: 16,
        height: 300,
        position: "relative",
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.09)",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {content}
      <Dots color={accent} />
      <Bar color={accent} />
    </div>
  );

  // ── CARD A: Product & Digital ────────────────────────────────────────
  const cardA = [
    /* stage 0 */
    <div
      key="a0"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {tag("Product & Digital")}
      <div
        style={{
          height: 108,
          background: "linear-gradient(135deg,#e8f4fd,#d0e8f7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <p
          style={{
            fontFamily: MONO_FONT,
            fontSize: 11,
            fontWeight: 900,
            color: AZ,
            margin: 0,
          }}
        >
          Digital Products
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            ["98", "Perf"],
            ["1.2s", "Load"],
            ["4.9★", "Rating"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 12,
                  fontWeight: 900,
                  color: AZ,
                }}
              >
                {v}
              </div>
              <div
                style={{ fontFamily: BASE_FONT, fontSize: 7, color: "#bbb" }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 4,
          padding: "8px 10px",
        }}
      >
        {[
          ["Design", "UX/UI web & mobile.", AZ],
          ["Build", "Fast, scalable code.", "#0f4f7a"],
          ["Scale", "Systems that grow.", "#3da0e4"],
        ].map(([t, d, c]) => (
          <div
            key={t}
            style={{
              background: "#f0f7fd",
              borderRadius: 5,
              padding: 6,
              border: "0.5px solid rgba(25,128,194,.15)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: c,
                marginBottom: 3,
              }}
            />
            <div
              style={{
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                color: DARK,
              }}
            >
              {t}
            </div>
            <div
              style={{
                fontFamily: BASE_FONT,
                fontSize: 6,
                color: "#aaa",
                lineHeight: 1.4,
              }}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "0 12px 8px",
          fontFamily: BASE_FONT,
          fontSize: 9.5,
          color: "#666",
          lineHeight: 1.5,
        }}
      >
        <strong
          style={{
            fontFamily: MONO_FONT,
            fontSize: 11,
            fontWeight: 800,
            color: DARK,
            display: "block",
            marginBottom: 1,
          }}
        >
          Websites & platforms.
        </strong>
        Products that help organisations work smarter.
      </div>
    </div>,
    /* stage 1 */
    <div
      key="a1"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#f8f8f6",
      }}
    >
      {tag("Product & Digital")}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 10px 10px",
          gap: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            paddingBottom: 7,
            borderBottom: "0.5px solid rgba(0,0,0,.07)",
          }}
        >
          <div
            style={{ width: 7, height: 7, background: AZ, borderRadius: "50%" }}
          />
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 8,
              fontWeight: 700,
              color: "#999",
              letterSpacing: ".08em",
            }}
          >
            MAD SITE BUILDER
          </span>
        </div>
        {[
          ["Hi! What kind of site are we building today?", "ai"],
          ["E-commerce — streetwear, dark aesthetic.", "us"],
          [
            "Generating layout — dark hero, product grid, bold type. Ready!",
            "ai",
          ],
        ].map(([msg, who]) => (
          <div
            key={msg}
            style={{
              padding: "7px 9px",
              fontSize: 8.5,
              lineHeight: 1.5,
              alignSelf: who === "us" ? "flex-end" : "flex-start",
              maxWidth: "92%",
              background: who === "us" ? AZ : "#fff",
              color: who === "us" ? "#fff" : "#555",
              borderRadius:
                who === "us" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
              border: who === "us" ? "none" : "0.5px solid rgba(0,0,0,.08)",
            }}
          >
            {msg}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            background: "#fff",
            borderRadius: 7,
            padding: "5px 8px",
            marginTop: 4,
            border: "0.5px solid rgba(0,0,0,.1)",
          }}
        >
          <span
            style={{
              fontFamily: BASE_FONT,
              fontSize: 8,
              color: "#ccc",
              flex: 1,
            }}
          >
            Continue building…
          </span>
          <div
            style={{
              width: 16,
              height: 16,
              background: AZ,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 7L7 4L1 1V7Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>,
    /* stage 2 */
    <div
      key="a2"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 10px 5px",
          borderBottom: "0.5px solid rgba(0,0,0,.06)",
        }}
      >
        <span
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fontWeight: 900,
            color: AZ,
          }}
        >
          STRKT
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {["Shop", "Lookbook", "About"].map((n) => (
            <span
              key={n}
              style={{ fontFamily: BASE_FONT, fontSize: 7, color: "#bbb" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          height: 72,
          background: "#e8f4fd",
          margin: "6px 10px",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 9,
              fontWeight: 900,
              color: DARK,
            }}
          >
            Wear what you mean.
          </div>
          <div
            style={{
              fontFamily: BASE_FONT,
              fontSize: 6.5,
              color: "#aaa",
              lineHeight: 1.4,
            }}
          >
            Limited drops, every week.
          </div>
        </div>
        <div
          style={{
            background: AZ,
            color: "#fff",
            fontFamily: MONO_FONT,
            fontSize: 6.5,
            fontWeight: 700,
            padding: "3px 7px",
            borderRadius: 3,
          }}
        >
          Shop now
        </div>
        <div
          style={{
            width: 44,
            height: 54,
            background: "rgba(25,128,194,.1)",
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 4,
          padding: "6px 10px",
        }}
      >
        {[
          ["Cargo Tee", "$48"],
          ["Wide Hoodie", "$90"],
          ["Cap", "$32"],
        ].map(([n, p]) => (
          <div
            key={n}
            style={{
              background: "#f8f8f6",
              borderRadius: 4,
              padding: 5,
              border: "0.5px solid rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                height: 24,
                background: "#dbeeff",
                borderRadius: 2,
                marginBottom: 2,
              }}
            />
            <div
              style={{
                fontFamily: BASE_FONT,
                fontSize: 6,
                color: "#aaa",
                marginBottom: 1,
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 800,
                color: AZ,
              }}
            >
              {p}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 10,
          background: DARK,
          color: "#fff",
          fontFamily: MONO_FONT,
          fontSize: 8,
          fontWeight: 700,
          padding: "4px 9px",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{ width: 5, height: 5, background: AZ, borderRadius: "50%" }}
        />
        Live in 2 weeks
      </div>
    </div>,
  ];

  // ── CARD B: Marketing & Growth ────────────────────────────────────────
  const cardB = [
    /* stage 0 */
    <div
      key="b0"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {tag("Marketing & Growth")}
      <div
        style={{
          margin: "0 10px",
          borderRadius: 8,
          overflow: "hidden",
          border: "0.5px solid rgba(0,0,0,.08)",
          flex: 1,
        }}
      >
        <div
          style={{
            background: DARK,
            padding: "7px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#f09433,#dc2743)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 900,
              color: "#fff",
              fontFamily: MONO_FONT,
            }}
          >
            M
          </div>
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
              flex: 1,
            }}
          >
            madstudio
          </span>
          <span
            style={{
              background: AZ,
              color: "#fff",
              fontFamily: MONO_FONT,
              fontSize: 7,
              fontWeight: 700,
              padding: "3px 7px",
              borderRadius: 4,
            }}
          >
            Promote
          </span>
        </div>
        <div
          style={{
            height: 88,
            background: `linear-gradient(135deg,${AZ},#0f4f7a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 13,
              fontWeight: 900,
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.15,
              padding: 10,
            }}
          >
            We don&apos;t just
            <br />
            run ads. We run
            <br />
            results.
          </div>
        </div>
        <div
          style={{
            padding: "7px 10px",
            fontFamily: BASE_FONT,
            fontSize: 7.5,
            color: "#666",
            lineHeight: 1.5,
            background: "#fff",
          }}
        >
          New case study: 3× ROAS in 60 days for a D2C brand.
        </div>
        <div
          style={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            padding: "0 10px 7px",
            background: "#fff",
          }}
        >
          {["#growth", "#performance", "#madstudio"].map((t) => (
            <span
              key={t}
              style={{
                background: "#e8f4fd",
                color: AZ,
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: 10,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>,
    /* stage 1 */
    <div
      key="b1"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      {tag("Marketing & Growth")}
      <div
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}
        >
          {[
            ["ROAS", "3.2×", "+18%"],
            ["CAC", "$14.20", "−22%"],
          ].map(([l, v, d]) => (
            <div
              key={l}
              style={{
                background: "#f5f5f3",
                borderRadius: 8,
                padding: "8px 10px",
                border: "0.5px solid rgba(0,0,0,.07)",
              }}
            >
              <div
                style={{
                  fontFamily: BASE_FONT,
                  fontSize: 7,
                  color: "#aaa",
                  marginBottom: 2,
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 17,
                  fontWeight: 900,
                  color: DARK,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#22a05a",
                }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            ["Paid Social", 78],
            ["Email", 61],
            ["SEO", 45],
            ["Referral", 32],
          ].map(([n, v]) => (
            <div
              key={n}
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <span
                style={{
                  fontFamily: BASE_FONT,
                  fontSize: 7.5,
                  color: "#aaa",
                  width: 56,
                  flexShrink: 0,
                }}
              >
                {n}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: "#eee",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background: AZ,
                    width: `${v}%`,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 7.5,
                  fontWeight: 700,
                  color: AZ,
                  width: 22,
                  textAlign: "right",
                }}
              >
                {v}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    /* stage 2 */
    <div
      key="b2"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: "9px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "0.5px solid #eee",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f09433,#dc2743)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO_FONT,
            fontSize: 11,
            fontWeight: 900,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          M
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 10,
              fontWeight: 800,
              color: "#111",
            }}
          >
            madstudio.hq
          </div>
          <div style={{ fontFamily: BASE_FONT, fontSize: 7.5, color: "#aaa" }}>
            @madstudio
          </div>
        </div>
        <button
          style={{
            background: AZ,
            color: "#fff",
            fontFamily: MONO_FONT,
            fontSize: 7.5,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
          }}
        >
          Follow
        </button>
      </div>
      <div style={{ display: "flex", borderBottom: "0.5px solid #eee" }}>
        {[
          ["12.4K", "Posts"],
          ["89K", "Followers"],
          ["4.1K", "Following"],
        ].map(([n, l]) => (
          <div
            key={l}
            style={{
              flex: 1,
              padding: 6,
              textAlign: "center",
              borderRight: "0.5px solid #eee",
            }}
          >
            <div
              style={{
                fontFamily: MONO_FONT,
                fontSize: 11,
                fontWeight: 900,
                color: AZ,
              }}
            >
              {n}
            </div>
            <div
              style={{ fontFamily: BASE_FONT, fontSize: 6.5, color: "#bbb" }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
          padding: 2,
        }}
      >
        {[
          [AZ, "#0f4f7a"],
          ["#e8f4fd", "#d0e8f7"],
          [DARK, "#2a2a28"],
          ["#3da0e4", AZ],
          ["#e8f4fd", AZ],
          ["#0f4f7a", DARK],
        ].map(([c1, c2], i) => (
          <div
            key={i}
            style={{
              height: 52,
              background: `linear-gradient(135deg,${c1},${c2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: MONO_FONT,
                fontSize: 6,
                fontWeight: 700,
                color: "rgba(255,255,255,.7)",
              }}
            >
              MAD
            </span>
          </div>
        ))}
      </div>
    </div>,
  ];

  // ── CARD C: Brand & Identity ───────────────────────────────────────────
  const PURPLE = "#7c3aed";
  const cardC = [
    /* stage 0: logo construction */
    <div
      key="c0"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {tag("Brand & Identity")}
      <div
        style={{
          margin: "0 12px",
          background: "#f0f7fd",
          borderRadius: 8,
          height: 108,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          border: "0.5px solid rgba(25,128,194,.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: AZ,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon points="8,2 14,12 2,12" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 18,
              fontWeight: 900,
              color: DARK,
            }}
          >
            Brand<span style={{ color: AZ }}>Co</span>
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, padding: "8px 12px 4px" }}>
        {[
          ["Primary", AZ, "#fff"],
          ["Dark", DARK, "#fff"],
          ["Light", "#f0f0ee", DARK],
        ].map(([l, bg, c]) => (
          <div
            key={l}
            style={{
              flex: 1,
              borderRadius: 5,
              height: 26,
              background: bg,
              color: c,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO_FONT,
              fontSize: 8.5,
              fontWeight: 800,
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          padding: "4px 12px",
        }}
      >
        {[AZ, DARK, "#3da0e4", "#e8f4fd", "#0f4f7a"].map((c) => (
          <div
            key={c}
            style={{ width: 18, height: 18, borderRadius: 4, background: c }}
          />
        ))}
        <span style={{ fontFamily: "monospace", fontSize: 7.5, color: "#aaa" }}>
          #1980c2
        </span>
      </div>
      <div
        style={{
          padding: "4px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {[
          ["H1", "Montserrat 900", 14],
          ["Body", "Helvetica Neue", 11],
          ["Label", "MONTSERRAT 700", 9],
        ].map(([l, t, s]) => (
          <div
            key={l}
            style={{ display: "flex", alignItems: "baseline", gap: 7 }}
          >
            <span
              style={{
                fontFamily: BASE_FONT,
                fontSize: 7,
                color: "#ccc",
                width: 30,
                flexShrink: 0,
              }}
            >
              {l}
            </span>
            <span style={{ fontFamily: BASE_FONT, fontSize: s, color: DARK }}>
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>,
    /* stage 1: before / after */
    <div
      key="c1"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {tag("Brand & Identity")}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          flex: 1,
          margin: "0 0 28px",
        }}
      >
        <div
          style={{
            background: "#f0f0ee",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#bbb",
            }}
          >
            Before
          </span>
          <div
            style={{
              background: "#ddd",
              borderRadius: 3,
              padding: "4px 8px",
              alignSelf: "flex-start",
              fontFamily: BASE_FONT,
              fontSize: 10,
              fontWeight: 700,
              color: "#888",
            }}
          >
            oldcorp
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {["#aaa", "#bbb", "#ccc"].map((c) => (
              <div
                key={c}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 3,
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: BASE_FONT,
              fontSize: 10,
              fontWeight: 400,
              color: "#999",
            }}
          >
            Arial, 400
          </div>
          <div
            style={{
              background: "#ddd",
              borderRadius: 4,
              flex: 1,
              padding: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 3,
            }}
          >
            {[1, 0.6, 0.4].map((o, i) => (
              <div
                key={i}
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: `rgba(0,0,0,${o * 0.1})`,
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            background: "#0f1a2c",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: AZ,
            }}
          >
            After
          </span>
          <div
            style={{
              background: DARK,
              borderRadius: 5,
              padding: "4px 8px",
              alignSelf: "flex-start",
              fontFamily: MONO_FONT,
              fontSize: 10,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            NEWBRAND
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {[AZ, DARK, "#3da0e4"].map((c) => (
              <div
                key={c}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 3,
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Montserrat 800
          </div>
          <div
            style={{
              background: "#1a2a3e",
              borderRadius: 6,
              flex: 1,
              padding: 6,
              border: "0.5px solid rgba(25,128,194,.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 3,
            }}
          >
            {[1, 0.6, 0.4].map((o, i) => (
              <div
                key={i}
                style={{
                  height: 3,
                  borderRadius: 2,
                  background: `rgba(255,255,255,${o * 0.08})`,
                }}
              />
            ))}
            <div
              style={{
                height: 2,
                borderRadius: 1,
                background: AZ,
                width: "38%",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    /* stage 2: component kit */
    <div
      key="c2"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      {tag("Brand & Identity")}
      <div
        style={{
          padding: "6px 12px 4px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 8,
              fontWeight: 700,
              color: "#aaa",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            Colour Palette
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[AZ, DARK, "#3da0e4", "#e8f4fd", "#f8f8f6"].map((c) => (
              <div key={c}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 5,
                    background: c,
                    border: c === "#f8f8f6" ? "0.5px solid #eee" : "none",
                  }}
                />
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 6,
                    color: "#bbb",
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {c}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "0.5px solid #eee", paddingTop: 7 }}>
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 8,
              fontWeight: 700,
              color: "#aaa",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            Components
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <button
              style={{
                background: AZ,
                color: "#fff",
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              Primary
            </button>
            <button
              style={{
                background: "transparent",
                color: AZ,
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 4,
                border: `1px solid ${AZ}`,
                cursor: "pointer",
              }}
            >
              Outline
            </button>
            <button
              style={{
                background: "#f5f5f3",
                color: DARK,
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                padding: "4px 8px",
                borderRadius: 4,
                border: "1px solid rgba(0,0,0,.1)",
                cursor: "pointer",
              }}
            >
              Ghost
            </button>
          </div>
        </div>
        <div
          style={{
            borderTop: "0.5px solid #eee",
            paddingTop: 7,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {[
            ["H1", "Montserrat Bold", 18, DARK],
            ["Body", "Helvetica Neue", 13, "#666"],
            ["Caption", "Montserrat 600", 10, "#aaa"],
          ].map(([l, f, s, c]) => (
            <div
              key={l}
              style={{ display: "flex", alignItems: "baseline", gap: 8 }}
            >
              <span
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 7,
                  color: "#ccc",
                  width: 36,
                  flexShrink: 0,
                }}
              >
                {l}
              </span>
              <span style={{ fontFamily: BASE_FONT, fontSize: s, color: c }}>
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "#f0f0ee",
          border: "0.5px solid rgba(0,0,0,.1)",
          borderRadius: 4,
          padding: "2px 7px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#a259ff",
          }}
        />
        <span style={{ fontFamily: BASE_FONT, fontSize: 7.5, color: "#888" }}>
          Figma
        </span>
      </div>
    </div>,
  ];

  // ── CARD D: Strategy ───────────────────────────────────────────────────
  const cardD = [
    /* stage 0: steps */
    <div
      key="d0"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {tag("Strategy")}
      <div
        style={{
          margin: "0 12px",
          background: "#f8f4ff",
          borderRadius: 8,
          height: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          border: "0.5px solid rgba(100,60,200,.1)",
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[
            ["Discover", "#7c3aed"],
            ["Define", "#6d28d9"],
            ["Deliver", "#5b21b6"],
          ].map(([l, c], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ color: "#ccc", fontSize: 10 }}>→</span>}
              <div
                style={{
                  width: 52,
                  height: 28,
                  borderRadius: 6,
                  background: c,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO_FONT,
                  fontSize: 7,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {l}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          flex: 1,
        }}
      >
        {[
          ["01", "Map the current state", "Research"],
          ["02", "Identify growth levers", "Strategy"],
          ["03", "Build the roadmap", "Planning"],
        ].map(([n, t, b]) => (
          <div
            key={n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 8px",
              background: "#f8f4ff",
              borderRadius: 6,
              border: "0.5px solid rgba(100,60,200,.1)",
            }}
          >
            <span
              style={{
                fontFamily: MONO_FONT,
                fontSize: 9,
                fontWeight: 900,
                color: PURPLE,
                width: 14,
              }}
            >
              {n}
            </span>
            <span
              style={{
                fontFamily: BASE_FONT,
                fontSize: 8,
                color: "#555",
                flex: 1,
              }}
            >
              {t}
            </span>
            <span
              style={{
                fontFamily: MONO_FONT,
                fontSize: 7,
                fontWeight: 700,
                color: PURPLE,
                background: "#f0e8ff",
                padding: "2px 6px",
                borderRadius: 8,
              }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>
    </div>,
    /* stage 1: workshop checklist */
    <div
      key="d1"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      {tag("Strategy")}
      <div
        style={{
          margin: "0 12px",
          background: "#f0faf5",
          borderRadius: 8,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          border: "0.5px solid rgba(0,160,90,.1)",
        }}
      >
        {[
          ["🎯", "Goals"],
          ["👥", "Users"],
          ["📊", "Metrics"],
          ["🗺️", "Roadmap"],
        ].map(([e, l]) => (
          <div
            key={l}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{ fontSize: 16 }}>{e}</span>
            <span
              style={{ fontFamily: MONO_FONT, fontSize: 6.5, color: "#aaa" }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          flex: 1,
        }}
      >
        {[
          ["Define north star metric", true],
          ["Audit existing assets", true],
          ["Map competitor landscape", true],
          ["Draft 90-day plan", false],
          ["Align stakeholders", false],
        ].map(([t, done]) => (
          <div
            key={t}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 8,
              color: "#555",
              fontFamily: BASE_FONT,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                flexShrink: 0,
                background: done ? "#22a05a" : "#f5f5f3",
                border: done ? "none" : "0.5px solid rgba(0,0,0,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3.5 6L6.5 2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <span
              style={{
                textDecoration: done ? "line-through" : "none",
                opacity: done ? 0.5 : 1,
              }}
            >
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>,
    /* stage 2: roadmap */
    <div
      key="d2"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#fff",
      }}
    >
      {tag("Strategy")}
      <div
        style={{
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        {[
          [
            "Q1",
            [
              [AZ, "Discovery", 45],
              ["#3da0e4", "Design", 35],
            ],
          ],
          [
            "Q2",
            [
              ["#22a05a", "Build", 55],
              ["#7c3aed", "Launch", 25],
            ],
          ],
          ["Q3", [["#f59e0b", "Grow", 65]]],
          ["Q4", [["#dc2626", "Scale", 80]]],
        ].map(([q, segs]) => (
          <div
            key={q}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                fontFamily: MONO_FONT,
                fontSize: 8,
                fontWeight: 700,
                color: "#aaa",
                width: 20,
                flexShrink: 0,
              }}
            >
              {q}
            </span>
            <div
              style={{
                flex: 1,
                height: 18,
                borderRadius: 4,
                background: "#f5f5f3",
                border: "0.5px solid rgba(0,0,0,.07)",
                overflow: "hidden",
                display: "flex",
              }}
            >
              {segs.map(([c, l, w]) => (
                <div
                  key={l}
                  style={{
                    width: `${w}%`,
                    height: "100%",
                    background: c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MONO_FONT,
                    fontSize: 6.5,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{
            marginTop: 8,
            padding: "8px 10px",
            background: "#f8f4ff",
            borderRadius: 6,
            border: "0.5px solid rgba(100,60,200,.1)",
          }}
        >
          <p
            style={{
              fontFamily: MONO_FONT,
              fontSize: 8,
              fontWeight: 700,
              color: PURPLE,
              margin: "0 0 2px",
            }}
          >
            On track
          </p>
          <p
            style={{
              fontFamily: BASE_FONT,
              fontSize: 9,
              color: "#555",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Q1–Q2 complete. Launch milestone on schedule for Q2 close.
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <section
      id="services"
      style={{
        background: "#f8f8f6",
        fontFamily: BASE_FONT,
        padding: "56px 64px 48px",
      }}
    >
      <p
        style={{
          fontFamily: MONO_FONT,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".2em",
          color: AZ,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Services, Continued
      </p>
      <h2
        style={{
          fontFamily: MONO_FONT,
          fontSize: 28,
          fontWeight: 900,
          color: DARK,
          marginBottom: 32,
          margin: "0 0 32px",
        }}
      >
        What we do for you
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 18,
        }}
      >
        {cardWrap(cardA[stage], AZ)}
        {cardWrap(cardB[stage], AZ)}
        {cardWrap(cardC[stage], "#a259ff")}
        {cardWrap(cardD[stage], PURPLE)}
      </div>
    </section>
  );
}
function Dashboard({ scale = 1 }) {
  const s = (v) => `${Math.round(v * scale)}px`;
  const bars = [40, 65, 45, 80, 55, 90, 70];
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const stats = [
    ["Invoices Sent", "24", "+4 this month", TB],
    ["Pending", "$12,480", "6 outstanding", "#ea580c"],
    ["Collected", "$38,920", "+22% vs last mo.", "#16a34a"],
  ];
  const inv = [
    ["Vertex Corp", "INV-041", "$3,200", "Paid", "#16a34a", "#f0fdf4"],
    ["GreenPath Ltd", "INV-040", "$1,850", "Pending", TB, "#fff3ee"],
    ["Nova Studio", "INV-039", "$5,400", "Paid", "#16a34a", "#f0fdf4"],
  ];
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: s(108),
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          padding: `${s(14)} 0`,
          gap: s(2),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: s(5),
            padding: `0 ${s(12)} ${s(12)}`,
            marginBottom: s(6),
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: s(9),
              height: s(9),
              background: TB,
              borderRadius: s(2),
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontWeight: 900,
              fontSize: s(10),
              letterSpacing: "-.02em",
              color: "#0f172a",
            }}
          >
            Tru<span style={{ color: TB }}>Billing</span>
          </span>
        </div>
        {["Dashboard", "Invoices", "Payments", "Clients", "Reports"].map(
          (item, i) => (
            <div
              key={item}
              style={{
                padding: `${s(6)} ${s(12)}`,
                fontSize: s(7.5),
                fontWeight: 600,
                color: i === 0 ? TB : "#9ca3af",
                background: i === 0 ? "rgba(242,101,34,.08)" : "transparent",
                borderLeft: `2px solid ${i === 0 ? TB : "transparent"}`,
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: s(14),
          gap: s(10),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: s(10), color: "#0f172a" }}>
              Dashboard
            </div>
            <div style={{ fontWeight: 500, fontSize: s(6), color: "#94a3b8" }}>
              April 2026
            </div>
          </div>
          <div
            style={{
              background: TB,
              color: "#fff",
              fontSize: s(6),
              fontWeight: 700,
              letterSpacing: ".1em",
              padding: `${s(4)} ${s(8)}`,
              borderRadius: s(3),
            }}
          >
            + New Invoice
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: s(6),
          }}
        >
          {stats.map(([l, v, sub, col]) => (
            <div
              key={l}
              style={{
                background: "#fff",
                border: "1px solid #f1f5f9",
                borderRadius: s(4),
                padding: s(8),
              }}
            >
              <div
                style={{
                  fontSize: s(5.5),
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  marginBottom: s(3),
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontSize: s(13),
                  fontWeight: 900,
                  letterSpacing: "-.02em",
                  color: "#0f172a",
                  marginBottom: s(2),
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: s(5.5), fontWeight: 600, color: col }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #f1f5f9",
            borderRadius: s(4),
            padding: s(8),
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: s(7),
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: s(8),
            }}
          >
            Revenue Overview
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: s(4),
              height: s(40),
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 5 ? TB : "rgba(242,101,34,.15)",
                  borderRadius: `${s(2)} ${s(2)} 0 0`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: s(3),
            }}
          >
            {months.map((m, i) => (
              <span
                key={m}
                style={{
                  fontSize: s(5),
                  fontWeight: 600,
                  color: i === 5 ? TB : "#d1d5db",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #f1f5f9",
            borderRadius: s(4),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #f8fafc",
              padding: `${s(6)} ${s(10)}`,
            }}
          >
            <span style={{ fontSize: s(7), fontWeight: 700, color: "#0f172a" }}>
              Recent Invoices
            </span>
            <span style={{ fontSize: s(6), fontWeight: 600, color: TB }}>
              View all
            </span>
          </div>
          {inv.map(([c, id, amt, st, sc, sbg]) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #f8fafc",
                padding: `${s(5)} ${s(10)}`,
                gap: s(6),
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: s(6.5),
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {c}
                </div>
                <div style={{ fontSize: s(5.5), color: "#94a3b8" }}>{id}</div>
              </div>
              <div
                style={{ fontSize: s(6.5), fontWeight: 700, color: "#334155" }}
              >
                {amt}
              </div>
              <div
                style={{
                  fontSize: s(5.5),
                  fontWeight: 700,
                  padding: `${s(2)} ${s(5)}`,
                  borderRadius: s(2),
                  background: sbg,
                  color: sc,
                }}
              >
                {st}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TRUBILLING PHONE ────────────────────────────────────────────────────────
function TruBillingPhone({ showNotif, notifMsg }) {
  return (
    <div
      style={{
        width: 112,
        height: 220,
        background: "#1a1a2e",
        borderRadius: 22,
        border: "2px solid #2d2d44",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 36,
          height: 12,
          background: "#1a1a2e",
          borderRadius: "0 0 8px 8px",
          zIndex: 10,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 4,
            right: 4,
            zIndex: 20,
            background: "rgba(15,15,15,0.92)",
            borderRadius: 10,
            padding: "7px 8px",
            transform: showNotif
              ? "translateY(0) scale(1)"
              : "translateY(-50px) scale(.85)",
            opacity: showNotif ? 1 : 0,
            transition:
              "transform .5s cubic-bezier(.34,1.56,.64,1), opacity .3s ease",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: TB,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 6, color: "#fff", fontWeight: 900 }}>
                TB
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: BASE_FONT,
                }}
              >
                TruBilling
              </div>
              <div
                style={{
                  fontSize: 6.5,
                  color: "rgba(255,255,255,.6)",
                  fontFamily: BASE_FONT,
                }}
              >
                {notifMsg}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 10px 6px",
            background: "#fff",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 900, color: "#0f172a" }}>
            Tru<span style={{ color: TB }}>Billing</span>
          </span>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(242,101,34,.1)",
              border: "1px solid rgba(242,101,34,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: TB,
            }}
          >
            JD
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ borderRadius: 8, padding: 10, background: TB }}>
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.75)",
                marginBottom: 4,
              }}
            >
              Total Collected
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-.02em",
              }}
            >
              $38,920
            </div>
            <div
              style={{
                fontSize: 6,
                color: "rgba(255,255,255,.65)",
                marginTop: 2,
              }}
            >
              +22% this month
            </div>
          </div>
          {[
            ["Invoices Sent", "24", TB],
            ["Pending", "6", "#ea580c"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fff",
                border: "1px solid #f1f5f9",
                borderRadius: 6,
                padding: "6px 8px",
              }}
            >
              <span style={{ fontSize: 8, fontWeight: 600, color: "#64748b" }}>
                {l}
              </span>
              <span style={{ fontSize: 13, fontWeight: 900, color: c }}>
                {v}
              </span>
            </div>
          ))}
          <div
            style={{
              flex: 1,
              background: "#fff",
              border: "1px solid #f1f5f9",
              borderRadius: 6,
              padding: 7,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 7.5,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 5,
              }}
            >
              Recent
            </div>
            {[
              ["Vertex Corp", "$3,200", "#16a34a"],
              ["GreenPath", "$1,850", TB],
              ["Nova Studio", "$5,400", "#16a34a"],
            ].map(([c, a, col], i) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0",
                  borderBottom: i < 2 ? "1px solid #f8fafc" : "none",
                }}
              >
                <span
                  style={{ fontSize: 7, fontWeight: 600, color: "#334155" }}
                >
                  {c}
                </span>
                <span style={{ fontSize: 7, fontWeight: 700, color: col }}>
                  {a}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EXPERIENCE — sticky scroll, cards animate in with outcome stats ─────────
const EXP_STEPS = [
  {
    tag: "The Need",
    num: "01",
    icon: "⚡",
    color: "#e53e3e",
    bg: "#fff5f5",
    points: [
      "Unstructured billing across teams",
      "No real-time financial visibility",
      "Fragmented manual tools",
      "No confidence in financial data",
    ],
    outcome: null,
  },
  {
    tag: "Our Approach",
    num: "02",
    icon: "🧭",
    color: AZ,
    bg: "#ebf5fb",
    points: [
      "System design, not just software",
      "Simplified financial workflows",
      "Clean, intuitive UX at every step",
      "Business value + tech in balance",
    ],
    outcome: null,
  },
  {
    tag: "The Solution",
    num: "03",
    icon: "✦",
    color: "#38a169",
    bg: "#f0fff4",
    points: [
      "Create & manage invoices with ease",
      "Track payments in real time",
      "Organized, clear financial records",
      "Reduced friction across operations",
    ],
    outcome: null,
  },
  {
    tag: "Outcome",
    num: "04",
    icon: "◆",
    color: TB,
    bg: "#fff8f3",
    points: [
      "Structured billing from day one",
      "Improved financial clarity",
      "Scalable architecture for growth",
      "Less admin, more focus",
    ],
    outcome: [
      ["60%", "Less admin time"],
      ["22%", "Revenue increase"],
      ["3×", "Faster invoicing"],
      ["∞", "Scalability"],
    ],
  },
];

// Animated stat number on scroll reveal
function AnimatedStat({ value, label, color, delay, visible }) {
  const [displayed, setDisplayed] = useState("0");
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 900;

  useEffect(() => {
    if (!visible) return;
    const isNum = /^[\d.]+$/.test(
      value.replace("%", "").replace("×", "").replace("∞", ""),
    );
    if (value === "∞") {
      setDisplayed("∞");
      return;
    }
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    const target = parseFloat(value.replace("%", "").replace("×", ""));
    const suffix = value.includes("%") ? "%" : value.includes("×") ? "×" : "";
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current - delay;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased * 10) / 10;
      setDisplayed(current % 1 === 0 ? current + suffix : current + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, value, delay]);

  return (
    <div
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .5s ${delay}ms, transform .5s ${delay}ms cubic-bezier(.22,1,.36,1)`,
      }}
    >
      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: "-.03em",
          color,
          lineHeight: 1,
          fontFamily: BASE_FONT,
        }}
      >
        {displayed}
      </div>
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: GRAY3,
          marginTop: 6,
          fontFamily: BASE_FONT,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function StepCard({ card, visible }) {
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    if (visible && card.outcome) {
      const t = setTimeout(() => setStatsVisible(true), 300);
      return () => clearTimeout(t);
    } else {
      setStatsVisible(false);
    }
  }, [visible, card.outcome]);

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${GRAY2}`,
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          background: card.bg,
          borderBottom: `1px solid ${card.color}20`,
          padding: "22px 28px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#fff",
              border: `1.5px solid ${card.color}28`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {card.icon}
          </div>
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: card.color,
                marginBottom: 2,
                fontFamily: BASE_FONT,
              }}
            >
              {card.num} / 04
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: DARK,
                letterSpacing: "-.02em",
                lineHeight: 1,
                fontFamily: BASE_FONT,
              }}
            >
              {card.tag}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
        }}
      >
        {card.points.map((p, i) => (
          <div
            key={p}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-10px)",
              transition: `opacity .45s ${i * 80}ms, transform .45s ${i * 80}ms cubic-bezier(.22,1,.36,1)`,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: `${card.color}12`,
                border: `1px solid ${card.color}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: card.color,
                  fontFamily: BASE_FONT,
                }}
              >
                {i + 1}
              </span>
            </div>
            <span
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: GRAY4,
                fontFamily: BASE_FONT,
              }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
      {/* Outcome stats — animate in on last card */}
      {card.outcome && (
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ height: 1, background: GRAY2, marginBottom: 22 }} />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {card.outcome.map(([val, lbl], i) => (
              <AnimatedStat
                key={lbl}
                value={val}
                label={lbl}
                color={i % 2 === 0 ? TB : AZ}
                delay={i * 120}
                visible={statsVisible}
              />
            ))}
          </div>
          <div
            style={{ marginTop: 24, display: "flex", justifyContent: "center" }}
          >
            <a
              href="https://trubillingsystems.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "9px 20px",
                borderRadius: 2,
                border: `1.5px solid ${AZ}`,
                color: AZ,
                textDecoration: "none",
                fontFamily: BASE_FONT,
              }}
            >
              View live product ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Experience() {
  const wrapRef = useRef(null);
  const [step, setStep] = useState(0);
  const [stepPct, setStepPct] = useState(0);
  const [totalPct, setTotalPct] = useState(0);
  const [phoneNotif, setPhoneNotif] = useState(false);
  const [phoneNotifMsg, setPhoneNotifMsg] = useState("");
  const notifQueue = [
    "Invoice paid · $3,200",
    "New client added",
    "Report generated ✓",
    "System live ✓",
  ];
  const prevStep = useRef(-1);
  const notifTimer = useRef(null);

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = Math.min(1, Math.max(0, scrolled / total));
      setTotalPct(raw);
      const phaseF = raw * EXP_STEPS.length;
      const s = Math.min(EXP_STEPS.length - 1, Math.floor(phaseF));
      const within = phaseF - s;
      setStep(s);
      setStepPct(within);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (step === prevStep.current) return;
    prevStep.current = step;
    clearTimeout(notifTimer.current);
    setPhoneNotif(false);
    setTimeout(() => {
      setPhoneNotifMsg(notifQueue[step % notifQueue.length]);
      setPhoneNotif(true);
      notifTimer.current = setTimeout(() => setPhoneNotif(false), 2800);
    }, 400);
  }, [step]);

  const cur = EXP_STEPS[step];
  const next = EXP_STEPS[Math.min(EXP_STEPS.length - 1, step + 1)];
  const fadeOut = Math.max(0, (stepPct - 0.65) / 0.35);

  return (
    <div
      ref={wrapRef}
      id="work"
      style={{ height: "500vh", position: "relative", fontFamily: BASE_FONT }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#fafaf9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "28px 60px 0", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: GRAY3,
                  marginBottom: 8,
                  fontFamily: BASE_FONT,
                }}
              >
                Case Study · Product Development
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: TB,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      color: "#fff",
                      fontFamily: BASE_FONT,
                      letterSpacing: ".02em",
                    }}
                  >
                    TB
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(22px,2.8vw,36px)",
                    fontWeight: 900,
                    color: DARK,
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    fontFamily: BASE_FONT,
                  }}
                >
                  TruBilling{" "}
                  <span
                    style={{
                      color: AZ,
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontFamily: "Georgia,serif",
                    }}
                  >
                    — built by MAD
                  </span>
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, paddingBottom: 6 }}>
              {EXP_STEPS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px 6px 8px",
                    borderRadius: 50,
                    background: i === step ? "#fff" : "transparent",
                    border: `1.5px solid ${i === step ? s.color + "40" : GRAY2}`,
                    boxShadow:
                      i === step ? `0 2px 12px rgba(0,0,0,.06)` : "none",
                    transition: "all .4s cubic-bezier(.22,1,.36,1)",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: i === step ? s.color : GRAY2,
                      flexShrink: 0,
                      transition: "background .4s",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: i === step ? DARK : GRAY3,
                      letterSpacing: ".06em",
                      fontFamily: BASE_FONT,
                      transition: "color .4s",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 2,
              background: GRAY2,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${totalPct * 100}%`,
                background: AZ,
                borderRadius: 1,
                transition: "width .05s linear",
              }}
            />
          </div>
        </div>

        {/* Main: full-width devices with floating cards */}
        <div
          style={{
            flex: 1,
            position: "relative",
            padding: "20px 60px 36px",
            minHeight: 0,
          }}
        >
          {/* Devices — full width background */}
          <div
            className="mad-exp-devices"
            style={{ position: "absolute", inset: "20px 60px 36px", zIndex: 1 }}
          >
            {/* Laptop */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: "62%",
                zIndex: 5,
                filter: "drop-shadow(0 20px 48px rgba(0,0,0,.38))",
              }}
            >
              <div
                style={{
                  borderRadius: "12px 12px 0 0",
                  border: "1.5px solid rgba(255,255,255,.18)",
                  padding: "10px 10px 0",
                  background: "#cfd8e0",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,.1)",
                    margin: "0 auto 8px",
                    background: "#b8c6cf",
                  }}
                />
                <div
                  style={{
                    borderRadius: "6px 6px 0 0",
                    overflow: "hidden",
                    aspectRatio: "16/10",
                  }}
                >
                  <Dashboard scale={1} />
                </div>
              </div>
              <div
                style={{
                  height: 10,
                  border: "1px solid rgba(0,0,0,.06)",
                  borderTop: "none",
                  borderRadius: "0 0 2px 2px",
                  background: "linear-gradient(to bottom,#bdc9d3,#adb9c3)",
                }}
              />
              <div
                style={{
                  height: 18,
                  border: "1px solid rgba(0,0,0,.06)",
                  borderTop: "none",
                  borderRadius: "0 0 10px 10px",
                  background: "linear-gradient(to bottom,#b5c1cb,#a5b1bb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 8,
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,.06)",
                    background: "#c0ccd5",
                  }}
                />
              </div>
            </div>
            {/* Tablet — bottom left */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "5%",
                zIndex: 6,
                filter: "drop-shadow(0 18px 40px rgba(0,0,0,.38))",
              }}
            >
              <div
                style={{
                  width: 130,
                  height: 175,
                  background: "#2a2a35",
                  borderRadius: 14,
                  border: "2px solid #3a3a4a",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 12,
                    background: "#222230",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 3,
                      borderRadius: 2,
                      background: "#3a3a4a",
                    }}
                  />
                </div>
                <div style={{ width: "100%", height: "calc(100% - 12px)" }}>
                  <Dashboard scale={0.55} />
                </div>
              </div>
            </div>
            {/* Phone — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: "6%",
                zIndex: 6,
                filter: "drop-shadow(0 18px 40px rgba(0,0,0,.38))",
              }}
            >
              <TruBillingPhone
                showNotif={phoneNotif}
                notifMsg={phoneNotifMsg}
              />
            </div>
            {/* Dim overlay so cards pop */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(249,249,248,0.45)",
                zIndex: 8,
                borderRadius: 12,
              }}
            />
            {/* TruBilling link */}
            <div
              style={{
                position: "absolute",
                bottom: -28,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                zIndex: 20,
              }}
            >
              <a
                href="https://trubillingsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 50,
                  textDecoration: "none",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: ".12em",
                  color: AZ,
                  background: `rgba(25,128,194,.07)`,
                  border: `.5px solid rgba(25,128,194,.22)`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: AZ,
                    display: "inline-block",
                  }}
                />
                trubillingsystems.com ↗
              </a>
            </div>
          </div>

          {/* Step cards — float over devices, positioned per step */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {EXP_STEPS.map((card, i) => {
              // Each card floats to a different corner/position
              const positions = [
                { top: "8%", left: "4%", width: "42%" }, // Need — top left
                { top: "8%", right: "4%", width: "42%" }, // Approach — top right
                { bottom: "12%", left: "4%", width: "42%" }, // Solution — bottom left
                { bottom: "12%", right: "4%", width: "40%" }, // Outcome — bottom right
              ];
              const pos = positions[i];
              const isActive = i === step;
              const isPast = i < step;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    ...pos,
                    pointerEvents: "all",
                    opacity: isActive ? 1 : isPast ? 0.38 : 0.18,
                    transform: isActive
                      ? "scale(1) translateY(0)"
                      : isPast
                        ? "scale(0.96) translateY(4px)"
                        : "scale(0.92) translateY(12px)",
                    transition:
                      "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)",
                    filter: isActive ? "none" : "grayscale(0.4)",
                  }}
                >
                  <div
                    style={{
                      background: isActive ? "#fff" : "rgba(255,255,255,0.88)",
                      borderRadius: 14,
                      border: isActive
                        ? `1.5px solid ${card.color}28`
                        : `1px solid ${GRAY2}`,
                      boxShadow: isActive
                        ? `0 16px 48px rgba(0,0,0,.14), 0 0 0 1px ${card.color}18`
                        : "0 4px 16px rgba(0,0,0,.06)",
                      overflow: "hidden",
                      backdropFilter: "blur(12px)",
                      transition: "box-shadow .6s ease, border .6s ease",
                    }}
                  >
                    {/* Card header */}
                    <div
                      style={{
                        background: isActive ? card.bg : GRAY1,
                        borderBottom: `1px solid ${isActive ? card.color + "18" : GRAY2}`,
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        transition: "background .5s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: isActive ? "#fff" : GRAY1,
                          border: `1.5px solid ${isActive ? card.color + "28" : GRAY2}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 7.5,
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            color: isActive ? card.color : GRAY3,
                            marginBottom: 1,
                            fontFamily: BASE_FONT,
                            transition: "color .5s",
                          }}
                        >
                          {card.num} / 04
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 900,
                            color: DARK,
                            letterSpacing: "-.02em",
                            lineHeight: 1,
                            fontFamily: BASE_FONT,
                          }}
                        >
                          {card.tag}
                        </div>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            marginLeft: "auto",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: card.color,
                            boxShadow: `0 0 0 3px ${card.color}28`,
                            animation: "pulse 2s infinite",
                          }}
                        />
                      )}
                    </div>
                    {/* Points */}
                    <div
                      style={{
                        padding: "12px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {card.points.map((p, pi) => (
                        <div
                          key={p}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? "none" : "translateX(-4px)",
                            transition: `opacity .45s ${pi * 70}ms, transform .45s ${pi * 70}ms cubic-bezier(.22,1,.36,1)`,
                          }}
                        >
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              background: isActive ? `${card.color}12` : GRAY1,
                              border: `1px solid ${isActive ? card.color + "22" : GRAY2}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 8,
                                fontWeight: 800,
                                color: isActive ? card.color : GRAY3,
                                fontFamily: BASE_FONT,
                              }}
                            >
                              {pi + 1}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              lineHeight: 1.55,
                              color: isActive ? GRAY4 : GRAY3,
                              fontFamily: BASE_FONT,
                            }}
                          >
                            {p}
                          </span>
                        </div>
                      ))}
                      {/* Outcome stats inline */}
                      {card.outcome && isActive && (
                        <div
                          style={{
                            marginTop: 8,
                            paddingTop: 10,
                            borderTop: `1px solid ${GRAY2}`,
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 10,
                          }}
                        >
                          {card.outcome.map(([val, lbl], si) => (
                            <AnimatedStat
                              key={lbl}
                              value={val}
                              label={lbl}
                              color={si % 2 === 0 ? TB : AZ}
                              delay={si * 100}
                              visible={isActive}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll nudge */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: step < 3 ? 0.4 : 0,
            transition: "opacity .5s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 7.5,
              fontWeight: 700,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: GRAY3,
              fontFamily: BASE_FONT,
            }}
          >
            Scroll to read through
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MAD AI PHONE ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the MAD AI assistant — a sharp, strategic, and direct digital assistant for MAD (Making A Difference), a product, marketing, and design firm.
MAD's services: Product & Digital Solutions, Marketing & Communication, Brand & Design Systems.
Keep replies SHORT — 2-4 sentences max. Be direct. End with a focused question or sharp observation. If someone seems like a potential client, gently guide toward booking a call.`;

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
        width: 240,
        flexShrink: 0,
        background: "#080808",
        borderRadius: 40,
        padding: 10,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.07), 0 60px 120px rgba(0,0,0,.8)",
        transform: "rotate(-3deg)",
        zIndex: 3,
        fontFamily: BASE_FONT,
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
          height: 480,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 14px 4px",
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,.7)",
          }}
        >
          <span>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <rect
                x="0"
                y="1"
                width="11"
                height="8"
                rx="1.5"
                stroke="rgba(255,255,255,.6)"
                strokeWidth=".8"
              />
              <rect
                x="1"
                y="2.5"
                width="7"
                height="5"
                rx=".5"
                fill="rgba(255,255,255,.7)"
              />
              <rect
                x="11.5"
                y="3"
                width="2"
                height="4"
                rx=".5"
                fill="rgba(255,255,255,.35)"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            background: "#151515",
            padding: "8px 14px 10px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg,${AZ},#0c4d82)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>
              M
            </span>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>
              MAD AI
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 2,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: 7,
                  color: "rgba(255,255,255,.38)",
                  fontWeight: 500,
                }}
              >
                Online · Strategic Partner
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            scrollbarWidth: "none",
          }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {m.role === "assistant" && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: `linear-gradient(135deg,${AZ},#0c4d82)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginRight: 6,
                    alignSelf: "flex-end",
                  }}
                >
                  <span style={{ fontSize: 7, fontWeight: 800, color: "#fff" }}>
                    M
                  </span>
                </div>
              )}
              <div
                style={{
                  maxWidth: "78%",
                  background: m.role === "user" ? AZ : "#1e1e1e",
                  color: "#fff",
                  borderRadius:
                    m.role === "user"
                      ? "14px 14px 4px 14px"
                      : "14px 14px 14px 4px",
                  padding: "7px 10px",
                  fontSize: 9.5,
                  lineHeight: 1.6,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: `linear-gradient(135deg,${AZ},#0c4d82)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 7, fontWeight: 800, color: "#fff" }}>
                  M
                </span>
              </div>
              <div
                style={{
                  background: "#1e1e1e",
                  borderRadius: "14px 14px 14px 4px",
                  padding: "8px 12px",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {[0, 0.2, 0.4].map((d, i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: AZ,
                      animation: `pulse 1.2s ${d}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: "8px 10px 12px", background: "#151515" }}>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              background: "#222",
              borderRadius: 20,
              padding: "6px 6px 6px 12px",
            }}
          >
            <input
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
                fontSize: 9,
                fontFamily: BASE_FONT,
              }}
            />
            <button
              onClick={send}
              disabled={loading}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: loading ? "#333" : AZ,
                border: "none",
                cursor: loading ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 7,
              color: "rgba(255,255,255,.18)",
              marginTop: 6,
              letterSpacing: ".05em",
            }}
          >
            Powered by MAD Intelligence
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

// ─── BEYOND PROJECTS ─────────────────────────────────────────────────────────
function BeyondProjects() {
  const [ref, vis] = useInView(0.05);
  const SERVICE_OPTS = [
    { bg: AZ, label: "Product & Digital", abbr: "PD", sub: "MAD Service" },
    { bg: AZ, label: "Marketing & Comms", abbr: "MC", sub: "MAD Service" },
    { bg: DARK, label: "Brand & Design", abbr: "BD", sub: "MAD Service" },
    { bg: GRAY4, label: "Email Us", abbr: "EM", sub: "Direct Contact" },
    { bg: AZ, label: "Schedule a Call", abbr: "SC", sub: "Book a Meeting" },
  ];
  const platBtn = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textAlign: "left",
    background: "#fff",
    border: `1.5px solid ${GRAY2}`,
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
    fontFamily: BASE_FONT,
    transition: "border-color .18s, box-shadow .18s, transform .18s",
    width: "100%",
  };

  return (
    <section ref={ref} style={{ fontFamily: BASE_FONT, overflow: "hidden" }}>
      <div style={{ position: "relative", height: 240 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&auto=format&fit=crop"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(10,8,4,.52)",
              }}
            />
          </div>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 40%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(180,110,70,.28)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            background: "linear-gradient(to bottom, transparent, #fff)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
      <div
        style={{
          background: "#fff",
          position: "relative",
          padding: "0 60px 72px",
        }}
      >
        <div
          className="mad-bp-phone"
          style={{
            position: "absolute",
            top: -160,
            left: 80,
            zIndex: 20,
            opacity: vis ? 1 : 0,
            transition: "opacity .9s .1s",
          }}
        >
          <MADPhone />
        </div>
        <div
          className="mad-bp-content"
          style={{
            paddingLeft: 280,
            paddingTop: 30,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(28px)",
            transition: "opacity .7s .2s, transform .7s .2s",
          }}
        >
          <div
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: ".26em",
              textTransform: "uppercase",
              color: GRAY3,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Start a Project
          </div>
          <h2
            style={{
              fontFamily: 'Georgia,"Times New Roman",serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(26px,3.2vw,42px)",
              color: DARK,
              textAlign: "center",
              lineHeight: 1.14,
              letterSpacing: "-.01em",
              marginBottom: 18,
            }}
          >
            Work With MAD
          </h2>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.85,
              color: GRAY4,
              textAlign: "center",
              maxWidth: 480,
              margin: "0 auto 24px",
            }}
          >
            Strategy, design, and delivery — all under one roof.
          </p>
          <div
            style={{
              textAlign: "center",
              fontFamily: "Georgia,serif",
              fontStyle: "italic",
              fontSize: 13,
              color: GRAY3,
              marginBottom: 16,
            }}
          >
            What we can do for you:
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {SERVICE_OPTS.slice(0, 3).map(({ bg, label, abbr, sub }) => (
              <button
                key={label}
                style={platBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = DARK;
                  e.currentTarget.style.boxShadow =
                    "0 2px 14px rgba(0,0,0,.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = GRAY2;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#fff",
                    fontSize: 8.5,
                    fontWeight: 700,
                  }}
                >
                  {abbr}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 8,
                      color: GRAY3,
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                      marginBottom: 1,
                    }}
                  >
                    {sub}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: DARK,
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              maxWidth: "66%",
              margin: "0 auto 32px",
            }}
          >
            {SERVICE_OPTS.slice(3).map(({ bg, label, abbr, sub }) => (
              <button
                key={label}
                style={platBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = DARK;
                  e.currentTarget.style.boxShadow =
                    "0 2px 14px rgba(0,0,0,.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = GRAY2;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#fff",
                    fontSize: 8.5,
                    fontWeight: 700,
                  }}
                >
                  {abbr}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 8,
                      color: GRAY3,
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                      marginBottom: 1,
                    }}
                  >
                    {sub}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: DARK,
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                background: DARK,
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "13px 36px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: BASE_FONT,
                transition: "background .2s, transform .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = AZ;
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = DARK;
                e.currentTarget.style.transform = "none";
              }}
            >
              Let's Talk →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${GRAY2}`,
    color: DARK,
    fontSize: 14,
    fontFamily: BASE_FONT,
    padding: "12px 0",
    outline: "none",
  };

  return (
    <section
      style={{
        background: "#fff",
        color: DARK,
        fontFamily: BASE_FONT,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="mad-contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 580,
        }}
      >
        <div
          style={{
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: `1px solid ${GRAY2}`,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GRAY3,
              marginBottom: 20,
            }}
          >
            Get In Touch
          </div>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-.025em",
              marginBottom: 20,
            }}
          >
            Not sure what
            <br />
            comes next?
            <br />
            <em style={{ fontStyle: "normal", color: AZ }}>Talk to MAD.</em>
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: GRAY4,
              marginBottom: 12,
              maxWidth: 380,
            }}
          >
            Whether you have a clear brief or just an idea, we'll help you shape
            it into something structured and actionable.
          </p>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              ["Email", "hello@madagency.co"],
              ["WhatsApp", "+1 (800) MAD-GROW"],
              ["Based in", "Global · Remote-first"],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{ display: "flex", gap: 16, alignItems: "baseline" }}
              >
                <span
                  style={{
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: GRAY3,
                    width: 70,
                    flexShrink: 0,
                  }}
                >
                  {l}
                </span>
                <span style={{ fontSize: 13, color: DARK }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: "80px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {sent ? (
            <div>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
                Got it.
              </div>
              <p style={{ fontSize: 14, color: GRAY4, lineHeight: 1.8 }}>
                We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                ["name", "Your Name", "text"],
                ["email", "Email Address", "email"],
              ].map(([k, l, t]) => (
                <div key={k}>
                  <label
                    style={{
                      fontSize: 8.5,
                      fontWeight: 700,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: GRAY3,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {l}
                  </label>
                  <input
                    type={t}
                    value={form[k]}
                    onChange={(e) =>
                      setForm((x) => ({ ...x, [k]: e.target.value }))
                    }
                    style={inp}
                    onFocus={(e) => (e.target.style.borderBottomColor = AZ)}
                    onBlur={(e) => (e.target.style.borderBottomColor = GRAY2)}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: GRAY3,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  What are you working on?
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((x) => ({ ...x, message: e.target.value }))
                  }
                  rows={4}
                  style={{ ...inp, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderBottomColor = AZ)}
                  onBlur={(e) => (e.target.style.borderBottomColor = GRAY2)}
                />
              </div>
              <button
                onClick={() => {
                  if (form.name && form.email) setSent(true);
                }}
                style={{
                  background: AZ,
                  color: "#fff",
                  border: "none",
                  borderRadius: 50,
                  padding: "14px 32px",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: BASE_FONT,
                  alignSelf: "flex-start",
                  transition: "background .2s, transform .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1565a0";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = AZ;
                  e.currentTarget.style.transform = "none";
                }}
              >
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${GRAY2}`,
          padding: "24px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: ".06em",
            color: DARK,
          }}
        >
          M<span style={{ color: AZ }}>A</span>D
        </div>
        <div style={{ fontSize: 10, color: GRAY3, letterSpacing: ".06em" }}>
          © 2025 MAD — Making A Difference. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "LinkedIn"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 10,
                color: GRAY3,
                cursor: "pointer",
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = DARK)}
              onMouseLeave={(e) => (e.target.style.color = GRAY3)}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MADLanding() {
  return (
    <div style={{ fontFamily: BASE_FONT, background: CREAM }}>
      <style>{`
        @media (max-width: 767px) {
          .mad-hero-left { width: 100% !important; height: 44vw !important; min-height: 200px !important; }
          .mad-exp-grid { grid-template-columns: 1fr !important; }
          .mad-exp-devices { display: none !important; }
          .mad-bp-phone { left: 50% !important; transform: translateX(-50%) scale(0.78) !important; transform-origin: top center !important; }
          .mad-bp-content { padding-left: 20px !important; padding-right: 20px !important; padding-top: 280px !important; }
          .mad-contact-grid { grid-template-columns: 1fr !important; }
          .mad-contact-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(24,24,23,.08) !important; padding: 48px 24px !important; }
          .mad-contact-grid > div:last-child { padding: 40px 24px 64px !important; }
          .mad-nav-ul { display: none !important; }
          .mad-trusted { padding: 28px 20px !important; }
        }
        @media (max-width: 480px) {
          .mad-bp-phone { left: 50% !important; transform: translateX(-50%) scale(0.68) !important; }
          .mad-bp-content { padding-top: 250px !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(24,24,23,0.28) !important; }
      `}</style>
      <Nav />
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <Experience />
      <ServiceCards />
      <BeyondProjects />
      <Contact />
    </div>
  );
}
