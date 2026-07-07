import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useCms } from "../context/CmsContext";

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("_mad"))
    return;
  const s = document.createElement("style");
  s.id = "_mad";
  s.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#ffffff;color:#181817;overflow-x:hidden}
    @keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
    .sh{animation:shimmer 1.8s linear infinite}
    @keyframes fadeup{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeup .6s cubic-bezier(.22,1,.36,1) both}
    @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .mq{animation:marqueeScroll 18s linear infinite}
    input,textarea{outline:none;font-family:inherit}
    button{font-family:inherit;cursor:pointer}
    a{text-decoration:none}
  `;
  document.head.appendChild(s);
}

/* ── NAV ── */
function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSolid(y > 20);
      setHidden(y > window.innerHeight * 0.9 && y < window.innerHeight * 3.6);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const isPill = solid && !hidden;
  const { cmsData } = useCms();
  const links = cmsData.nav.links;

  const Hamburger = ({ light, open }) => (
    <button
      className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border-none"
      style={{
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
      }}
      onClick={() => setMenuOpen((o) => !o)}
      aria-label="Menu"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        style={{
          display: "block",
          height: 1.5,
          width: 22,
          borderRadius: 2,
          background: light ? "rgba(15,79,122,.7)" : "rgba(255,255,255,.8)",
          transformOrigin: "center",
        }}
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
        style={{
          display: "block",
          height: 1.5,
          width: 22,
          borderRadius: 2,
          background: light ? "rgba(15,79,122,.7)" : "rgba(255,255,255,.8)",
        }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        style={{
          display: "block",
          height: 1.5,
          width: 22,
          borderRadius: 2,
          background: light ? "rgba(15,79,122,.7)" : "rgba(255,255,255,.8)",
          transformOrigin: "center",
        }}
      />
    </button>
  );

  const inner = (light) => (
    <>
      <img src={cmsData.brand.logo} alt={cmsData.brand.name} className="h-40 w-36" />
      <div className="hidden md:flex gap-7">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="text-[11px] tracking-[0.14em] uppercase font-semibold"
            style={{
              color: light ? "rgba(15,79,122,.65)" : "rgba(255,255,255,.55)",
              transition: "color .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = light ? "#0f4f7a" : "#fff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = light
                ? "rgba(15,79,122,.65)"
                : "rgba(255,255,255,.55)")
            }
          >
            {l}
          </a>
        ))}
      </div>
      <button
        className="hidden md:block text-[11px] font-bold tracking-[0.12em] uppercase border-none rounded-full px-5 py-2"
        style={{ background: "#1980c2", color: "#fff" }}
      >
        {cmsData.nav.cta}
      </button>
      <Hamburger light={light} open={menuOpen} />
    </>
  );

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {hidden ? null : isPill ? (
          <motion.nav
            key="pill"
            initial={{ scaleY: 0.4, opacity: 0, y: -12 }}
            animate={{ scaleY: 1, opacity: 1, y: 0 }}
            exit={{ scaleY: 0.4, opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 16,
              left: 0,
              right: 0,
              margin: "0 auto",
              width: "fit-content",
              minWidth: "min(92vw, 540px)",
              maxWidth: 720,
              borderRadius: 50,
              backdropFilter: "blur(16px)",
              background: "#d9ecfa",
              border: "1px solid rgba(25,128,194,.18)",
              padding: "0 20px",
              zIndex: 300,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              boxShadow:
                "0 4px 24px rgba(25,128,194,.14), 0 1px 4px rgba(0,0,0,.06)",
              transformOrigin: "top center",
            }}
          >
            {inner(true)}
          </motion.nav>
        ) : (
          <motion.nav
            key="flat"
            initial={false}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 300,
              height: 56,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            {inner(false)}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.45)",
                zIndex: 290,
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              key="drawer"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 295,
                background: "#0d1117",
                borderRadius: "0 0 20px 20px",
                padding: "80px 28px 36px",
                boxShadow: "0 16px 48px rgba(0,0,0,.4)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l}
                    href="#"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,.75)",
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: -0.3,
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,.06)",
                      textDecoration: "none",
                    }}
                  >
                    {l}
                  </motion.a>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                style={{
                  marginTop: 28,
                  background: "#1980c2",
                  color: "#fff",
                  border: "none",
                  padding: "14px 32px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: 8,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Work With Us
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── HERO (sticky scroll-collapse) ── */
const SLIDES = [
  {
    left: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    right:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
    card: "Product & Digital",
    cardImg:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=75&auto=format&fit=crop",
    h1: "Structure changes\neverything.",
    sub: "Websites, apps & platforms built to scale.",
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
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=240&q=60&auto=format&fit=crop",
    x: -38,
    y: -28,
    r: -2.5,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=240&q=60&auto=format&fit=crop",
    x: -18,
    y: -32,
    r: 1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=240&q=60&auto=format&fit=crop",
    x: +40,
    y: +20,
    r: -2,
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=240&q=60&auto=format&fit=crop",
    x: +34,
    y: -32,
    r: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=240&q=60&auto=format&fit=crop",
    x: -36,
    y: +18,
    r: 2.5,
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=240&q=60&auto=format&fit=crop",
    x: -16,
    y: +19,
    r: -1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=240&q=60&auto=format&fit=crop",
    x: +17,
    y: +18,
    r: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=240&q=60&auto=format&fit=crop",
    x: -36,
    y: +18,
    r: 2.5,
  },
];

function Hero() {
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
    const DUR = 5000;
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
      const raw = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
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
    <div ref={wrapRef} style={{ height: "100dvh", position: "relative" }}>
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
              "linear-gradient(160deg,rgba(13,15,20,0.82) 0%,rgba(24,24,23,0.78) 55%,rgba(15,28,46,0.80) 100%)",
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
                <div className="absolute inset-0 bg-black/[22%]" />
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
                    "linear-gradient(to top,rgba(0,0,0,.75),rgba(0,0,0,.08) 55%,transparent)",
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
                border: `1px solid rgba(255,255,255,${collapseT * 0.1})`,
              }}
            >
              <img
                src={t.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
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
            className="text-white/35"
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: 14,
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
              color: "#f0ede8",
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
              Start a Project →
            </button>
            <button
              className="bg-white/[8%]"
              style={{
                color: "#f0ede8",
                border: "1px solid rgba(255,255,255,.18)",
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
            bottom: 20,
            left: 32,
            right: 0,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <p
            className="text-white/30"
            style={{
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Trusted by growing businesses
          </p>
          <div style={{ overflow: "hidden", width: "min(480px, 80vw)" }}>
            <div
              className="mq"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
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
                    height: 24,
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.75,
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

/* ── WHAT WE DO ── */
const WWD = [
  {
    tag: "01",
    label: "Product & Digital Solutions",
    tagline: "Built for performance.",
    wide: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "02",
    label: "Marketing & Communication",
    tagline: "Reach the right people.",
    wide: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "03",
    label: "Brand & Design Systems",
    tagline: "Identity that speaks first.",
    wide: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80&auto=format&fit=crop",
  },
];

function ProgressBar({ duration, running, onComplete }) {
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.width = "0%";
    if (!running) return;
    startRef.current = null;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(((ts - startRef.current) / duration) * 100, 100);
      el.style.width = `${p}%`;
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
      else onComplete();
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, running, onComplete]);
  return (
    <div className="w-full bg-black/10" style={{ height: 1 }}>
      <div
        ref={fillRef}
        className="bg-azure-500"
        style={{ height: "100%", width: "0%" }}
      />
    </div>
  );
}

function WhatWeDo() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setCur((c) => (c + 1) % WWD.length), []);
  const svc = WWD[cur];

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg,#eaf4fb 0%,#f4f9ff 40%,#f0f4fa 100%)",
        paddingTop: 72,
      }}
    >
      {/* Intro row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12 px-4 sm:px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-azure-500"
            style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            What We Do
          </p>
          <h2
            className="text-dark-900"
            style={{
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -0.4,
            }}
          >
            We help businesses become{" "}
            <span className="text-azure-500">better</span> than they were{" "}
            <span style={{ color: "#F26522" }}>yesterday.</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.72,
              marginBottom: 16,
            }}
          >
            MAD is a product, marketing, and design firm collaborating with the
            brightest minds in business to create smarter systems, stronger
            brands, and better digital experiences.
          </p>
          <div
            className="border-l-2 border-azure-500 bg-azure-50 text-azure-700"
            style={{
              padding: "12px 16px",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            We create the conditions for growth by helping organizations balance
            business, design, and technology.
          </div>
        </motion.div>
      </div>

      {/* Image grid */}
      <div className="max-w-[1100px] mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Big left */}
          <div
            className="md:row-span-2 relative overflow-hidden"
            style={{ minHeight: 320 }}
          >
            {WWD.map((sv, i) => (
              <img
                key={i}
                src={sv.wide}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === cur ? 1 : 0,
                  transition: "opacity .9s",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.28) 55%,transparent)",
              }}
            />
            <div
              style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}
            >
              <p
                className="text-white/90"
                style={{
                  fontSize: "clamp(14px,2vw,22px)",
                  fontWeight: 700,
                  letterSpacing: -0.3,
                  marginBottom: 4,
                }}
              >
                {svc.label}
              </p>
              <p
                className="text-white/50"
                style={{
                  fontSize: 12,
                  marginBottom: 16,
                }}
              >
                {svc.tagline}
              </p>
              <button
                className="text-white bg-white/[12%]"
                style={{
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.3)",
                  padding: "7px 18px",
                  borderRadius: 99,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Work With Us →
              </button>
            </div>
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <span
                className="bg-black/30 text-white/50"
                style={{
                  fontFamily: "monospace",
                  fontSize: 7,
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,.3)",
                  padding: "4px 10px",
                  borderRadius: 99,
                  backdropFilter: "blur(6px)",
                }}
              >
                {svc.tag} / 03
              </span>
            </div>
          </div>

          {/* Top right */}
          <div className="relative overflow-hidden" style={{ minHeight: 160 }}>
            {WWD.map((sv, i) => (
              <img
                key={i}
                src={sv.top}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  opacity: i === cur ? 1 : 0,
                  transition: "opacity .9s",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/[38%]" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span
                className="text-white"
                style={{
                  fontSize: "clamp(16px,2.5vw,24px)",
                  fontWeight: 700,
                  letterSpacing: -0.4,
                }}
              >
                MAD
              </span>
              <span
                className="text-white/35"
                style={{
                  fontSize: "clamp(12px,2vw,18px)",
                  fontWeight: 300,
                }}
              >
                ×
              </span>
              <span
                className="text-white"
                style={{
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontSize: "clamp(11px,1.8vw,16px)",
                }}
              >
                {svc.label.split(" ")[0]}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                gap: 5,
              }}
            >
              {WWD.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: `1.5px solid ${i === cur ? "#ffffff" : "rgba(255,255,255,.28)"}`,
                    background: i === cur ? "#ffffff" : "transparent",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom right: 2 cards */}
          <div className="grid grid-cols-2 gap-1">
            {/* Core value */}
            <div
              className="bg-white"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #d4dff0",
              }}
            >
              <div>
                <p
                  className="text-azure-500"
                  style={{
                    fontFamily: "monospace",
                    fontSize: 7,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Core Value
                </p>
                <h3
                  className="text-dark-900"
                  style={{
                    fontSize: "clamp(12px,1.4vw,14px)",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  Growth needs balance.
                </h3>
                <p
                  style={{
                    fontSize: "clamp(9px,1vw,11px)",
                    color: "#666",
                    lineHeight: 1.6,
                  }}
                >
                  Business value, design usability, and technology feasibility —
                  aligned.
                </p>
              </div>
              <button
                className="text-white bg-azure-500"
                style={{
                  alignSelf: "flex-start",
                  marginTop: 12,
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                }}
              >
                Work With Us →
              </button>
            </div>
            {/* Nav */}
            <div
              className="bg-white"
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  border: "2px solid #181817",
                  padding: "8px 10px",
                  marginBottom: 12,
                }}
              >
                <div
                  className="text-dark-900"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(8px,1vw,10px)",
                    lineHeight: 1.3,
                  }}
                >
                  {svc.label}
                </div>
              </div>
              <div>
                {WWD.map((sv, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 7,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 7,
                        fontWeight: 700,
                        color: i === cur ? "#1980c2" : "rgba(160,180,208,.6)",
                        minWidth: 14,
                      }}
                    >
                      {sv.tag}
                    </span>
                    <div style={{ flex: 1 }}>
                      {i === cur ? (
                        <ProgressBar
                          duration={5500}
                          running={!paused}
                          onComplete={next}
                          key={`pb-${cur}`}
                        />
                      ) : (
                        <div
                          style={{
                            height: 1,
                            background: i < cur ? "#7090b8" : "#d8e0ec",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  {[
                    {
                      fn: () =>
                        setCur((c) => (c - 1 + WWD.length) % WWD.length),
                      d: "M14 6L8 12l6 6",
                    },
                    {
                      fn: () => setCur((c) => (c + 1) % WWD.length),
                      d: "M10 6l6 6-6 6",
                    },
                  ].map(({ fn, d }, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "transparent",
                        border: "1px solid #d4dff0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                        <path
                          d={d}
                          stroke="rgba(10,22,40,.5)"
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
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1px solid #d4dff0",
                      color: "#555",
                      fontSize: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {paused ? "▶" : "⏸"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES IN MOTION (sticky scroll) ── */
function Chip({ label }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: "10px 14px 28px",
        background:
          "linear-gradient(to bottom,rgba(244,244,242,.95),transparent)",
      }}
    >
      <span
        className="bg-white/90 inline-flex items-center gap-[5px]"
        style={{
          padding: "3px 10px",
          borderRadius: 99,
          fontFamily: "monospace",
          fontSize: 8,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#666",
          border: "1px solid #ddd",
          backdropFilter: "blur(6px)",
        }}
      >
        <span
          className="bg-azure-500"
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            display: "inline-block",
          }}
        />
        {label}
      </span>
    </div>
  );
}

function Shimmer({ delay = 0, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg,#dbeeff,#c0d8f0)",
        ...style,
      }}
    >
      <div
        className="sh"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

function Browser({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 12,
        right: 12,
        bottom: 0,
        background: "#f8f8f6",
        border: "1px solid rgb(0 0 0 / 9%)",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 24,
          background: "#e8e8e6",
          borderBottom: "1px solid rgb(0 0 0 / 7%)",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 5,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 7, height: 7, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 12,
            borderRadius: 3,
            background: "#d8d8d6",
            margin: "0 6px",
          }}
        />
      </div>
      {children}
    </div>
  );
}

function ReqBubble({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "48px 16px 18px",
        gap: 5,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "rgba(26,26,24,.93)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "16px 16px 3px 16px",
          padding: "12px 14px",
          maxWidth: 240,
          fontSize: 12,
          lineHeight: 1.55,
          color: "#f0ede8",
        }}
      >
        {text}
      </motion.div>
      <span
        className="text-white/30"
        style={{
          fontFamily: "monospace",
          fontSize: 8.5,
        }}
      >
        you · just now
      </span>
    </div>
  );
}

function C1S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Browser>
        <div style={{ padding: 6 }}>
          <Shimmer
            style={{ height: 100, borderRadius: 5, position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <div
                className="bg-azure-500/70"
                style={{
                  height: 10,
                  width: "55%",
                  borderRadius: 2,
                  marginBottom: 6,
                }}
              />
              <div
                className="bg-azure-500/40"
                style={{
                  height: 7,
                  width: "35%",
                  borderRadius: 2,
                  marginBottom: 10,
                }}
              />
              <div
                className="bg-azure-500/80"
                style={{
                  height: 20,
                  width: 56,
                  borderRadius: 3,
                }}
              />
            </div>
          </Shimmer>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 5,
            padding: "0 6px",
          }}
        >
          {[0, 0.35, 0.7].map((d, i) => (
            <div
              key={i}
              className="bg-white"
              style={{
                borderRadius: 5,
                overflow: "hidden",
                border: "1px solid rgba(240,240,240,.6)",
              }}
            >
              <Shimmer delay={d} style={{ height: 40 }} />
              <div style={{ padding: 5 }}>
                <div
                  style={{
                    height: 5,
                    width: "80%",
                    borderRadius: 2,
                    background: "#f0f0f0",
                    marginBottom: 4,
                  }}
                />
                <div
                  className="bg-azure-500/50"
                  style={{
                    height: 5,
                    width: "40%",
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Browser>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Product & Digital" />
      <ReqBubble text="Build a clean e-commerce storefront with hero carousel and product grid." />
    </div>
  );
}

function C1S2() {
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(229,229,229,.5)",
        }}
      >
        <span
          className="text-dark-900"
          style={{ fontSize: 10, fontWeight: 700 }}
        >
          STRKT
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {["Shop", "Drops", "About"].map((n) => (
            <span key={n} style={{ fontSize: 7, color: "#aaa" }}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          height: 100,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 10,
          background: "linear-gradient(135deg,#0f1a2c,#1a3050)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            className="text-white"
            style={{
              fontSize: 11,
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            Wear what
            <br />
            you mean.
          </div>
          <div
            className="text-white/50"
            style={{
              fontSize: 7,
              marginBottom: 7,
            }}
          >
            Limited drops, weekly.
          </div>
          <div
            className="bg-azure-500 text-white"
            style={{
              display: "inline-block",
              fontSize: 7,
              padding: "3px 9px",
              borderRadius: 3,
            }}
          >
            Shop now →
          </div>
        </div>
        <div
          className="bg-white/10 flex-shrink-0"
          style={{
            width: 48,
            height: 68,
            borderRadius: 5,
            border: "1px solid rgba(255,255,255,.15)",
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 5,
          padding: 8,
        }}
      >
        {[
          ["Cargo Tee", "$48", "#0f2a4a", "#1a3a5c"],
          ["Wide Hoodie", "$90", "#1a2030", "#253040"],
          ["Track Pant", "$72", "#0a1520", "#152030"],
        ].map(([nm, pr, f, t]) => (
          <div
            key={nm}
            style={{
              borderRadius: 5,
              overflow: "hidden",
              background: "#f8f8f8",
              border: "1px solid rgba(229,229,229,.5)",
            }}
          >
            <div
              style={{
                height: 38,
                background: `linear-gradient(135deg,${f},${t})`,
              }}
            />
            <div style={{ padding: 5 }}>
              <div style={{ fontSize: 6.5, color: "#aaa" }}>{nm}</div>
              <div
                className="text-azure-500"
                style={{ fontSize: 8, fontWeight: 700 }}
              >
                {pr}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          padding: "6px 0",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        {[
          ["98", "Perf"],
          ["1.2s", "Load"],
          ["4.9★", "Rating"],
        ].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div
              className="text-azure-500"
              style={{ fontSize: 12, fontWeight: 700 }}
            >
              {v}
            </div>
            <div style={{ fontSize: 6.5, color: "#aaa" }}>{l}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 7.5,
          padding: "4px 10px",
          borderRadius: 99,
        }}
        className="bg-dark-900 text-white"
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        Live &amp; converting
      </div>
      <Chip label="Product & Digital" />
    </div>
  );
}

function C1S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=75&auto=format&fit=crop"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)",
        }}
      />
      <Chip label="Product & Digital" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Product &amp; Digital
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#38bdf8",
            marginBottom: 3,
          }}
        />
      </motion.div>
    </div>
  );
}

function C2S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div className="bg-white" style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            height: 38,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
            borderBottom: "1px solid rgba(229,229,229,.5)",
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#262626",
              flex: 1,
              fontFamily: "serif",
            }}
          >
            Instagram
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 12px",
            gap: 10,
            borderBottom: "1px solid #f5f5f5",
          }}
        >
          <div
            className="text-white"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fb923c,#db2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            M
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#262626" }}>mad.studio</div>
            <div style={{ fontSize: 8.5, color: "#8e8e8e" }}>
              @mad.studio · Creative Agency
            </div>
          </div>
          <div
            className="bg-azure-500 text-white"
            style={{
              fontSize: 8,
              padding: "4px 12px",
              borderRadius: 5,
            }}
          >
            Follow
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 1,
            padding: 1,
          }}
        >
          {[
            ["#1980c2", "Brand"],
            ["#181817", "Launch"],
            ["#3da0e4", "Web"],
            ["#f0f0ee", "MAD"],
            ["#0f4f7a", "Identity"],
            ["#e8e8e4", "Campaign"],
          ].map(([bg, lbl], i) => (
            <div
              key={i}
              style={{
                background: bg,
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  bg === "#f0f0ee" || bg === "#e8e8e4" ? "#181817" : "#ffffff",
                fontSize: 7.5,
                fontWeight: 900,
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Marketing & Comms" />
      <ReqBubble text="Create a social media content calendar for our spring product launch." />
    </div>
  );
}

function C2S2() {
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          borderBottom: "1px solid rgba(229,229,229,.5)",
          background: "#f8f8f8",
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#262626",
            flex: 1,
            fontFamily: "serif",
          }}
        >
          Instagram
        </span>
      </div>
      <div style={{ borderBottom: "1px solid #f5f5f5" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fb923c,#db2777)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 9, color: "#262626", flex: 1 }}>
            mad.studio
          </span>
        </div>
        <div
          style={{
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#1980c2,#0f4f7a)",
            position: "relative",
          }}
        >
          <div
            className="text-white"
            style={{
              fontSize: 17,
              textAlign: "center",
              lineHeight: 1.25,
              padding: "0 10px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Your brand,
            <br />
            everywhere.
          </div>
        </div>
        <div
          style={{
            padding: "5px 12px 3px",
            fontSize: 8,
            color: "#262626",
            lineHeight: 1.55,
          }}
        >
          <strong>mad.studio</strong> Campaigns that connect — content built to
          reach the right people.
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            padding: "0 12px 8px",
          }}
        >
          {["#branding", "#marketing", "#springdrop", "#growth"].map((t) => (
            <span key={t} className="text-azure-500" style={{ fontSize: 7.5 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "8px 12px" }}>
        {[
          ["Total Reach", "248K", "+38%"],
          ["Conv.", "3.2K", "+52%"],
        ].map(([l, v, d]) => (
          <div
            key={l}
            style={{
              flex: 1,
              borderRadius: 5,
              padding: 8,
              background: "#f8f8f8",
            }}
          >
            <div style={{ fontSize: 6.5, color: "#aaa" }}>{l}</div>
            <div
              className="text-dark-900"
              style={{ fontSize: 13, fontWeight: 700 }}
            >
              {v}
            </div>
            <div style={{ fontSize: 7.5, color: "#22c55e" }}>↑ {d}</div>
          </div>
        ))}
      </div>
      <div
        className="text-white bg-black/75 flex items-center gap-[5px]"
        style={{
          position: "absolute",
          bottom: 14,
          right: 12,
          backdropFilter: "blur(8px)",
          fontSize: 7.5,
          padding: "4px 10px",
          borderRadius: 99,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        Campaign live
      </div>
      <Chip label="Marketing & Comms" />
    </div>
  );
}

function C2S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=75&auto=format&fit=crop"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)",
        }}
      />
      <Chip label="Marketing & Comms" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Marketing &amp; Comms
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#38bdf8",
            marginBottom: 3,
          }}
        />
      </motion.div>
    </div>
  );
}

function C3S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#f8f7f5" }}>
        <div
          className="bg-white"
          style={{
            height: 32,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <span className="text-dark-900" style={{ fontSize: 10 }}>
            M<span className="text-azure-500">A</span>D Brand Studio
          </span>
        </div>
        <div
          className="bg-white"
          style={{
            height: 24,
            display: "flex",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {["Colours", "Typography", "Components"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 7.5,
                borderBottom: `2px solid ${i === 0 ? "#1980c2" : "transparent"}`,
                color: i === 0 ? "#1980c2" : "#aaa",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "flex",
              borderRadius: 6,
              overflow: "hidden",
              height: 52,
              marginBottom: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            {[
              ["#1980c2", "Azure", "rgba(255,255,255,.7)"],
              ["#181817", "Onyx", "rgba(255,255,255,.7)"],
              ["#ffffff", "White", "#aaa"],
              ["#0f4f7a", "Deep", "rgba(255,255,255,.7)"],
              ["#3da0e4", "Sky", "rgba(255,255,255,.7)"],
            ].map(([bg, l, c]) => (
              <div
                key={l}
                style={{
                  background: bg,
                  color: c,
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontSize: 5.5,
                  fontWeight: 700,
                }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Brand & Identity" />
      <ReqBubble text="Design a bold brand identity system with logo, type, and a colour palette." />
    </div>
  );
}

function C3S2() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "52%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background:
            "linear-gradient(135deg,#0a1628,#0f2a4a,rgba(25,128,194,.4))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="bg-azure-500"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <polygon
                points="11,1 21,7 21,15 11,21 1,15 1,7"
                fill="white"
                opacity=".9"
              />
            </svg>
          </div>
          <span
            className="text-white"
            style={{
              fontSize: 26,
              lineHeight: 1,
              letterSpacing: -0.4,
            }}
          >
            M<span style={{ color: "#7dd3fc" }}>AD</span>
          </span>
        </div>
        <div
          className="text-white/40"
          style={{
            fontFamily: "monospace",
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
          }}
        >
          Identity System · 2025
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: 6,
            overflow: "hidden",
            width: 176,
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            ["#1980c2", "#ffffff", "MAD"],
            ["#ffffff", "#181817", "MAD"],
            ["#181817", "#ffffff", "MAD"],
          ].map(([bg, col, lbl], i) => (
            <div
              key={i}
              style={{
                background: bg,
                color: col,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px 0",
                fontSize: 9,
                fontWeight: 900,
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
      <div
        className="bg-white"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {["#1980c2", "#181817", "#ffffff", "#0f4f7a", "#3da0e4"].map(
              (c, i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 3,
                    background: c,
                    border: c === "#ffffff" ? "1px solid #eee" : "none",
                  }}
                />
              ),
            )}
          </div>
          <div>
            <div className="text-dark-900" style={{ fontSize: 7.5 }}>
              Azure Blue
            </div>
            <div
              style={{ fontFamily: "monospace", fontSize: 6.5, color: "#aaa" }}
            >
              #1980c2 · Primary
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-dark-900 text-white"
        style={{
          position: "absolute",
          bottom: 14,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 7.5,
          padding: "4px 10px",
          borderRadius: 99,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        Brand system complete
      </div>
      <Chip label="Brand & Identity" />
    </div>
  );
}

function C3S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&q=75&auto=format&fit=crop"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)",
        }}
      />
      <Chip label="Brand & Identity" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Brand &amp; Identity
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#38bdf8",
            marginBottom: 3,
          }}
        />
      </motion.div>
    </div>
  );
}

const CARDS = [
  {
    id: "c1",
    title: "Product & Digital",
    sub: "Websites, apps & platforms built to perform.",
    stages: [C1S1, C1S2, C1S3],
  },
  {
    id: "c2",
    title: "Marketing & Comms",
    sub: "Campaigns and content that reach the right audience.",
    stages: [C2S1, C2S2, C2S3],
  },
  {
    id: "c3",
    title: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity.",
    stages: [C3S1, C3S2, C3S3],
  },
  {
    id: "c4",
    title: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity.",
    stages: [C3S1, C3S2, C3S3],
  },
  {
    id: "c5",
    title: "Marketing & Comms",
    sub: "Campaigns and content that reach the right audience.",
    stages: [C2S1, C2S2, C2S3],
  },
  {
    id: "c6",
    title: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity.",
    stages: [C3S1, C3S2, C3S3],
  },
];

const S1 = 3000,
  S2 = 3500,
  S3 = 90000;
const LOOP = S1 + S2 + S3;

function SvcCard({ config, startDelay, isActive, compact }) {
  const [stage, setStage] = useState(0);
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const runCycle = useCallback(() => {
    const pf = fillRef.current;
    if (pf) {
      pf.style.transition = "none";
      pf.style.width = "0%";
    }
    setStage(0);
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const el = ts - t0;
      if (pf) pf.style.width = `${Math.min(100, (el / (S1 + S2)) * 100)}%`;
      if (el < S1) setStage(0);
      else if (el < S1 + S2) setStage(1);
      else setStage(2);
      if (el < LOOP) rafRef.current = requestAnimationFrame(tick);
      else timerRef.current = setTimeout(runCycle, 600);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const t = setTimeout(runCycle, startDelay);
    return () => {
      clearTimeout(t);
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [runCycle, startDelay]);

  const { stages, title, sub } = config;
  const [S1c, S2c, S3c] = stages;

  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        width: compact ? "100%" : "min(310px,calc(100vw - 48px))",
        paddingBottom: compact ? 0 : 8,
        paddingRight: compact ? 0 : 8,
        opacity: compact ? (isActive ? 1 : 0.55) : 1,
        transition: compact ? "opacity .4s" : "none",
      }}
    >
      {!compact && (
        <>
          <div
            className="bg-azure-500/[7%]"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              right: 0,
              height: 460,
              borderRadius: 18,
              zIndex: 0,
            }}
          />
          <div
            className="bg-azure-500/10"
            style={{
              position: "absolute",
              top: 5,
              left: 5,
              right: -5,
              height: 460,
              border: "1px solid rgba(25,128,194,.18)",
              borderRadius: 18,
              zIndex: 1,
            }}
          />
        </>
      )}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: compact ? 280 : 460,
          borderRadius: compact ? 14 : 18,
          overflow: "hidden",
          zIndex: 2,
          border: compact
            ? isActive
              ? "2px solid #1980c2"
              : "1px solid rgba(24,24,23,.08)"
            : "1px solid rgba(25,128,194,.25)",
          boxShadow: compact
            ? isActive
              ? "0 8px 32px rgba(25,128,194,.18)"
              : "0 2px 12px rgba(0,0,0,.06)"
            : isActive
              ? "0 20px 56px rgba(25,128,194,.14)"
              : "0 6px 20px rgba(0,0,0,.07)",
          transition: "box-shadow .5s, border .4s",
        }}
      >
        <AnimatePresence>
          {stage === 0 && (
            <motion.div
              key="s1"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <S1c />
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div
              key="s2"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <S2c />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="s3"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
            >
              <S3c />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Stage dots */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 5,
            zIndex: 30,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                width: i === stage ? 12 : 4,
                background:
                  i === stage
                    ? "rgba(255,255,255,.85)"
                    : "rgba(255,255,255,.22)",
              }}
              transition={{ duration: 0.2 }}
              style={{ height: 5, borderRadius: 2.5 }}
            />
          ))}
        </div>
        {/* Progress bar */}
        <div
          className="bg-black/[6%]"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2.5,
            zIndex: 30,
          }}
        >
          <div
            ref={fillRef}
            className="bg-azure-500/75"
            style={{
              height: "100%",
              width: "0%",
            }}
          />
        </div>
      </div>
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 3 }}
        transition={{ duration: 0.3 }}
        style={{ paddingLeft: 2 }}
      >
        <div
          className="text-dark-900"
          style={{
            fontSize: 17,
            lineHeight: 1.2,
            marginBottom: 3,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          className="text-dark-900/[52%]"
          style={{
            fontSize: 11,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </div>
      </motion.div>
    </div>
  );
}

function ServicesInMotion() {
  const wrapRef = useRef(null);
  const gridWrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [gridActive, setGridActive] = useState(-1);
  const [viewMode, setViewMode] = useState("scroll");
  const W = 310,
    G = 20,
    STEP = W + G;
  const max = CARDS.length - 1;

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current || window.innerWidth < 640) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setActive(Math.min(max, Math.max(0, Math.round(p * max))));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [max]);

  useEffect(() => {
    const fn = () => {
      if (!gridWrapRef.current || viewMode !== "grid") return;
      const rect = gridWrapRef.current.getBoundingClientRect();
      const total = gridWrapRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setGridActive(Math.min(CARDS.length - 1, Math.floor(p * CARDS.length)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [viewMode]);

  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40)
      setActive((a) => (dx > 0 ? Math.min(max, a + 1) : Math.max(0, a - 1)));
    touchX.current = null;
  };

  const wAcc = useRef(0);
  const onWheel = (e) => {
    e.preventDefault();
    wAcc.current += e.deltaY;
    if (wAcc.current > 60) {
      setActive((a) => Math.min(max, a + 1));
      wAcc.current = 0;
    } else if (wAcc.current < -60) {
      setActive((a) => Math.max(0, a - 1));
      wAcc.current = 0;
    }
  };

  return (
    <section
      style={{
        position: "relative",
        background: "#f3f3f1",
      }}
    >
      {/* Layout toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "12px 32px 0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(24,24,23,.06)",
            borderRadius: 99,
            padding: 3,
            gap: 2,
            border: "1px solid rgba(24,24,23,.08)",
          }}
        >
          {["scroll", "grid"].map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              style={{
                padding: "5px 14px",
                borderRadius: 99,
                border: "none",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                background: viewMode === m ? "#181817" : "transparent",
                color: viewMode === m ? "#fff" : "rgba(24,24,23,.45)",
                transition: "all .2s",
              }}
            >
              {m === "scroll" ? "Motion" : "Grid"}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "grid" && (
        <div
          ref={gridWrapRef}
          style={{
            position: "relative",
            height: `calc(100vh + ${CARDS.length * 180}px)`,
            background: "#f3f3f1",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "#f3f3f1",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "64px 32px 20px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <p
                  className="text-azure-500"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Services In Motion
                </p>
                <h2
                  className="text-dark-900/80"
                  style={{
                    fontSize: "clamp(20px,2.8vw,34px)",
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: -0.4,
                  }}
                >
                  What we do, at a glance.
                </h2>
              </div>
              {/* Progress indicator */}
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {CARDS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === gridActive ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background:
                        i <= gridActive ? "#1980c2" : "rgba(24,24,23,.15)",
                      transition: "all .3s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Grid — same SvcCard content, 3-col layout */}
            <div
              style={{ flex: 1, overflow: "hidden", padding: "0 28px 20px" }}
            >
              <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 h-full"
                style={{ alignContent: "start" }}
              >
                {CARDS.map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <SvcCard
                      config={c}
                      startDelay={i * 280}
                      isActive={gridActive === i}
                      compact
                    />
                    <div style={{ paddingLeft: 2 }}>
                      <div
                        className="text-dark-900/75"
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: -0.2,
                          marginBottom: 2,
                        }}
                      >
                        {c.title}
                      </div>
                      <div
                        className="text-dark-400/50"
                        style={{ fontSize: 10, lineHeight: 1.55 }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {viewMode === "scroll" && (
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            height: `calc(100vh + ${CARDS.length * 160}px)`,
            background: "#f3f3f1",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "#f3f3f1",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "72px 32px 8px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <p
                  className="text-azure-500"
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  Services in motion · scroll to explore
                </p>
                <h2
                  className="text-dark-900"
                  style={{
                    fontSize: "clamp(26px,3.8vw,44px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-.04em",
                  }}
                >
                  Systems for <span className="text-azure-500">growth.</span>
                </h2>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  {
                    d: "M14 6L8 12l6 6",
                    fn: () => setActive((a) => Math.max(0, a - 1)),
                  },
                  {
                    d: "M10 6l6 6-6 6",
                    fn: () => setActive((a) => Math.min(max, a + 1)),
                  },
                ].map(({ d, fn }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="bg-transparent flex items-center justify-center"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: "1px solid rgba(24,24,23,.14)",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(15,23,42,.45)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d={d} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Strip */}
            <div
              className="pl-4 sm:pl-8"
              style={{ flex: 1, overflow: "hidden" }}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <motion.div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "flex-start",
                  paddingTop: 24,
                  gap: G,
                }}
                animate={{ x: -active * STEP }}
                transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
              >
                {CARDS.map((c, i) => (
                  <SvcCard
                    key={c.id}
                    config={c}
                    isActive={i === active}
                    startDelay={i * 600}
                  />
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                padding: "10px 0 18px",
                flexShrink: 0,
              }}
            >
              {CARDS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  animate={{
                    width: i === active ? 16 : 5,
                    background:
                      i === active
                        ? "rgba(15,23,42,.52)"
                        : "rgba(15,23,42,.16)",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    height: 5,
                    borderRadius: 2.5,
                    border: "none",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── EXPERIENCE ── */

const ease = [0.22, 1, 0.36, 1];

const NEEDS = [
  "Unstructured billing processes",
  "Difficulty tracking payments and invoices",
  "Lack of financial visibility in real time",
  "Over-reliance on manual and fragmented tools",
];

const APPROACH = [
  "Simplified financial workflows",
  "Clean, intuitive user experience",
  "Built for scalability from day one",
  "Business, design & tech aligned",
];

const SOLUTIONS = [
  "Create & manage invoices easily",
  "Track payments in real time",
  "Maintain clear financial records",
  "Improved daily financial visibility",
];

// ─── Left panel: Need + Approach ─────────────────────────────────────────────
function LeftPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className="hidden xl:flex absolute top-[10%] -left-[160px] xl:-left-[180px] w-[220px] xl:w-[240px] z-20 flex-col gap-3 pointer-events-none"
    >
      {/* Need card */}
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i
              className="ti ti-alert-circle text-white"
              style={{ fontSize: 12 }}
            />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
            The Need
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
          {NEEDS.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-azure-500">
                —
              </span>
              {n}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Approach card */}
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i className="ti ti-bulb text-white" style={{ fontSize: 12 }} />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
            Our Approach
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
          {APPROACH.map((a, i) => (
            <motion.li
              key={a}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-tangerine-500">
                —
              </span>
              {a}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Right panel: Solution + Outcome ─────────────────────────────────────────
function RightPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      className="hidden xl:block absolute top-[10%] -right-[160px] xl:-right-[180px] w-[220px] xl:w-[240px] z-20 pointer-events-none"
    >
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i className="ti ti-check text-white" style={{ fontSize: 12 }} />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-tangerine-500">
            The Solution
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5 mb-4">
          {SOLUTIONS.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-tangerine-500">
                —
              </span>
              {s}
            </motion.li>
          ))}
        </ul>
        {/* Outcome box */}
        <div
          className="p-3 rounded-xl bg-tangerine-500/[6%]"
          style={{
            border: "1px solid rgba(242,101,34,.25)",
          }}
        >
          <span className="text-[9px] font-bold tracking-[.2em] uppercase text-tangerine-500">
            Outcome
          </span>
          <p className="text-[11px] font-semibold mt-1 leading-snug m-0 text-dark-900">
            A more structured, efficient, and scalable approach to business
            billing.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Laptop frame ─────────────────────────────────────────────────────────────
function LaptopFrame({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative z-10"
    >
      {/* lid */}
      <div
        style={{
          background: "#e8e8e8",
          borderRadius: "18px 18px 0 0",
          padding: "10px 12px 0",
          border: "2.5px solid #c8c8c8",
          borderBottom: "none",
        }}
      >
        {/* browser chrome */}
        <div
          style={{
            background: "#f2f2f2",
            borderRadius: "8px 8px 0 0",
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* traffic lights */}
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57", "#ffbd2e", "#27c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          {/* URL bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 280,
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: 6,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: "1px solid #e0e0e0",
            }}
          >
            <i
              className="ti ti-lock text-dark-900/30"
              style={{ fontSize: 10 }}
            />
            <span
              className="text-dark-900/45"
              style={{
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              trubilling.com/dashboard
            </span>
          </div>
          {/* publish btn */}
          <div
            className="bg-tangerine-500 text-white"
            style={{
              borderRadius: 6,
              padding: "4px 11px",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Publish
          </div>
        </div>

        {/* screen */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
        >
          <img
            src="/image.png"
            alt="TruBilling"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(255,248,240,.88) 0%, rgba(255,248,240,.15) 45%, transparent 100%)",
            }}
          />

          {/* MAD badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.8, y: -8 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="bg-dark-900/85 flex items-center gap-[6px]"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(255,255,255,.12)",
              borderRadius: 99,
              padding: "5px 10px 5px 6px",
            }}
          >
            <div
              className="bg-tangerine-500"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                M
              </span>
            </div>
            <span
              className="text-white/75"
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Built by MAD
            </span>
          </motion.div>

          {/* product label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            style={{ position: "absolute", bottom: 24, left: 24 }}
          >
            <div
              className="text-tangerine-500"
              style={{
                fontSize: 9,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Product Development
            </div>
            <div
              className="text-dark-900"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 900,
                letterSpacing: -0.6,
                lineHeight: 1,
              }}
            >
              TruBilling
            </div>
          </motion.div>

          {/* stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              display: "flex",
              gap: 8,
            }}
          >
            {[
              ["24", "Paid"],
              ["7", "Pending"],
              ["2", "Overdue"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="bg-white/80 text-center"
                style={{
                  borderRadius: 10,
                  padding: "8px 12px",
                  border: "0.5px solid rgba(24,24,23,.12)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="text-dark-900"
                  style={{
                    fontSize: "clamp(14px, 2vw, 18px)",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-dark-900/50"
                  style={{
                    fontSize: 9,
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* hinge */}
      <div
        style={{
          background: "#d8d8d8",
          height: 12,
          borderRadius: "0 0 4px 4px",
          border: "2.5px solid #c0c0c0",
          borderTop: "1.5px solid #cccccc",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 72,
            height: 5,
            background: "#cacaca",
            borderRadius: "0 0 6px 6px",
          }}
        />
      </div>

      {/* base */}
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          height: 8,
          background: "#e0e0e0",
          borderRadius: "0 0 10px 10px",
          border: "2.5px solid #c8c8c8",
          borderTop: "none",
        }}
      />
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="pb-24 font-sans overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg,#eaf4fb 0%,#f4f9ff 8%,#fff8f2 30%,#fef3ea 65%,#fdeee2 100%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
        {/* header */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease, delay: 0 }}
          className="text-[9px] tracking-[.28em] uppercase font-bold pt-12 lg:pt-16 mb-2 text-tangerine-500"
        >
          Our Experience · Product Development
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease, delay: 0.04 }}
          className="text-[13px] text-dark-900/45 italic mb-3 max-w-[480px]"
        >
          Struggling to track where your money goes? Tired of chasing unpaid
          invoices?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
          className="font-extrabold leading-[1.05] tracking-tight mb-5 text-dark-900"
          style={{ fontSize: "clamp(26px, 3.5vw, 46px)" }}
        >
          <span
            className="text-tangerine-500"
            style={{ textShadow: "0 2px 18px rgba(242,101,34,.35)" }}
          >
            tru
          </span>
          <span
            className="text-dark-900"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,.18)" }}
          >
            billing
          </span>
          <span className="text-dark-900">.</span>
        </motion.h2>

        {/* intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease, delay: 0.16 }}
          className="mb-12 lg:mb-16 max-w-[620px]"
          style={{
            fontSize: 15,
            color: "rgba(24,24,23,.55)",
            lineHeight: 1.72,
          }}
        >
          A financial management platform designed to help small and growing
          businesses manage billing, track payments, and maintain financial
          clarity in one structured system — built to simplify operations
          without overwhelming complexity.
        </motion.p>

        {/* device + floating panels */}
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: 780 }}>
            <LeftPanel inView={inView} />
            <RightPanel inView={inView} />
            <LaptopFrame inView={inView} />
          </div>
        </div>

        {/* Mobile cards: Need / Approach / Outcome — hidden on xl+ where floating panels show */}
        <div className="xl:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Need */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.4 }}
            className="bg-white rounded-2xl p-4"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i
                  className="ti ti-alert-circle text-white"
                  style={{ fontSize: 12 }}
                />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
                The Need
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              {NEEDS.map((n) => (
                <li
                  key={n}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.5 }}
            className="bg-white rounded-2xl p-4"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i className="ti ti-bulb text-white" style={{ fontSize: 12 }} />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
                Our Approach
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              {APPROACH.map((a) => (
                <li
                  key={a}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution + Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.6 }}
            className="bg-white rounded-2xl p-4 sm:col-span-2"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i
                  className="ti ti-check text-white"
                  style={{ fontSize: 12 }}
                />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-tangerine-500">
                The Solution
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5 mb-4 sm:columns-2">
              {SOLUTIONS.map((s) => (
                <li
                  key={s}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <div
              className="p-3 rounded-xl bg-tangerine-500/[6%]"
              style={{ border: "1px solid rgba(242,101,34,.25)" }}
            >
              <span className="text-[9px] font-bold tracking-[.2em] uppercase text-tangerine-500">
                Outcome
              </span>
              <p className="text-[11px] font-semibold mt-1 leading-snug m-0 text-dark-900">
                A more structured, efficient, and scalable approach to business
                billing.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
          className="flex justify-center mt-14"
        >
          <button
            className="bg-tangerine-500 text-white border-none rounded-full text-[11px] font-bold tracking-[.12em] uppercase cursor-pointer"
            style={{ padding: "13px 32px" }}
          >
            Work With Us Today →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ── BEYOND PROJECTS ── */
const BEYOND_IMGS = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&q=80",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80",
];

const BEYOND_STATS = [
  { n: "32+", label: "Retainer clients" },
  { n: "98%", label: "Renewal rate" },
  { n: "4×", label: "Average growth" },
];

function Beyond() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg,#f7f5f0 0%,#f2ede6 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0 88px",
      }}
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
        {/* ── Left: two stacked images — hidden on mobile ── */}
        <div
          className="hidden md:flex"
          style={{
            flex: "0 0 38%",
            flexDirection: "column",
            gap: 10,
            minWidth: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.05,
            }}
            style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3" }}
          >
            <img
              src={BEYOND_IMGS[0]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2].map((idx, i) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + i * 0.07,
                }}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: "1/1",
                }}
              >
                <img
                  src={BEYOND_IMGS[idx]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{ flex: 1, minWidth: 0 }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#1980c2",
              marginBottom: 16,
            }}
          >
            Beyond Projects
          </p>
          <h2
            style={{
              fontSize: "clamp(26px,3.5vw,46px)",
              fontWeight: 800,
              lineHeight: 1.07,
              color: "#181817",
              marginBottom: 18,
              letterSpacing: -0.6,
            }}
          >
            We don't just
            <br />
            deliver work.
            <br />
            <span style={{ color: "#F26522" }}>We stay in it.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(24,24,23,.5)",
              lineHeight: 1.75,
              marginBottom: 32,
              maxWidth: 380,
            }}
          >
            Retainer partnerships that embed a dedicated product, brand, and
            marketing team into your growth — strategy to execution, month after
            month.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginBottom: 36,
              flexWrap: "wrap",
            }}
          >
            {BEYOND_STATS.map(({ n, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#181817",
                    letterSpacing: -0.8,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(24,24,23,.38)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{
                background: "#F26522",
                color: "#fff",
                border: "none",
                padding: "12px 26px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Compare Plans
            </button>
            <button
              style={{
                background: "rgba(24,24,23,.07)",
                color: "rgba(24,24,23,.65)",
                border: "1px solid rgba(24,24,23,.12)",
                padding: "12px 26px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Talk with us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SYSTEM_PROMPT = `You are MAD AI, a sharp strategic thinking partner for a consultancy. Help visitors clarify their project, understand their challenges, and take next steps. Keep replies to 1-3 sentences. Be direct, smart, and energetic. Never fluffy.`;

function Contact() {
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
      className="bg-azure-500 overflow-visible"
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
        {/* LEFT — phone — first on both mobile and desktop */}
        <div className="order-1 pt-10 md:pt-16">
          {/* Heading — desktop only (mobile version lives above phone) */}
          <div className="hidden md:block">
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
              className="text-white"
              style={{
                fontSize: "clamp(22px,2.8vw,34px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -0.4,
                marginBottom: 14,
              }}
            >
              Not sure what comes next?
              <br />
              Talk to MAD.
            </h2>
            <p
              className="text-white/[52%]"
              style={{ fontSize: 14, lineHeight: 1.72, marginBottom: 36 }}
            >
              Whether you have a clear brief or just an idea, we'll help you
              shape it into something structured and actionable.
            </p>
          </div>

          {/* shadcn-inspired form card wraps all inputs on mobile */}
          <div className="bg-white/[8%] md:bg-transparent rounded-2xl md:rounded-none border border-white/[12%] md:border-0 p-5 md:p-0">
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
          {/* end form card */}
        </div>

        {/* RIGHT — phone as AI chat — first on mobile, second on md+ */}
        <div
          className="order-1 md:order-2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "translateY(0)",
          }}
          ref={(el) => {
            if (el) {
              const mq = window.matchMedia("(min-width:768px)");
              const apply = () => {
                el.style.transform = mq.matches ? "translateY(-72px)" : "none";
              };
              apply();
              mq.addEventListener("change", apply);
            }
          }}
        >
          {/* Mobile heading card — only on small screens */}
          <div className="md:hidden w-full mb-5 bg-white/[8%] rounded-2xl border border-white/[12%] p-5">
            <p className="text-white/[38%] text-[9px] tracking-[0.28em] uppercase font-bold mb-2">
              Get In Touch
            </p>
            <h2
              className="text-white font-bold mb-2"
              style={{
                fontSize: "clamp(18px,5vw,24px)",
                lineHeight: 1.15,
                letterSpacing: -0.4,
              }}
            >
              Not sure what comes next?
              <br />
              Talk to MAD.
            </h2>
            <p
              className="text-white/[52%]"
              style={{ fontSize: 12, lineHeight: 1.65 }}
            >
              Whether you have a clear brief or just an idea, we'll help you
              shape it.
            </p>
          </div>

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
              maxWidth: 260,
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
                height: 400,
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

/* ── FOOTER ── */
function Footer() {
  const { cmsData } = useCms();
  const { footer, brand } = cmsData;
  return (
    <footer
      style={{
        background: "#f7f7f5",
        padding: "56px 32px 36px",
        borderTop: "1px solid rgba(24,24,23,.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 52,
          marginBottom: 48,
        }}
        className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      >
        <div>
          <img
            src={brand.logo}
            alt={brand.name}
            style={{ height: 80, width: "auto", opacity: 0.9 }}
          />
          <p
            className="text-dark-500/60"
            style={{
              fontSize: 12,
              marginTop: 16,
              lineHeight: 1.72,
              maxWidth: 260,
            }}
          >
            {footer.description}
          </p>
        </div>
        {footer.columns.map(({ title, links }) => (
          <div key={title}>
            <h5
              className="text-dark-400/50"
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              {title}
            </h5>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href || "#"}
                className="text-dark-500/55"
                style={{
                  display: "block",
                  fontSize: 12,
                  marginBottom: 10,
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#181817")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(24,24,23,.07)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <p className="text-dark-400/40" style={{ fontSize: 11 }}>
          {footer.copyright}
        </p>
        <p className="text-dark-400/35 italic" style={{ fontSize: 11 }}>
          Structure changes everything.
        </p>
      </div>
    </footer>
  );
}

/* ── ROOT ── */
export default function MADLandingPage() {
  useEffect(() => {
    injectCSS();
  }, []);
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Nav />
      <Hero />
      <WhatWeDo />
      <ServicesInMotion />
      <Experience />
      <Beyond />
      <Contact />
      <Footer />
    </div>
  );
}
