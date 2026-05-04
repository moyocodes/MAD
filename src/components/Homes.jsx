import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
const ThemeCtx = React.createContext({ dark: false, toggle: () => {} });
function useTheme() {
  return React.useContext(ThemeCtx);
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────
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

// ─── CHROME DOTS ──────────────────────────────────────────────────────────────
const ChromeDots = ({ scale = 1 }) => (
  <div className="flex items-center" style={{ gap: 4 * scale }}>
    {["#ff5f57", "#febc2e", "#28ca41"].map((c) => (
      <div
        key={c}
        style={{
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: "50%",
          background: c,
          flexShrink: 0,
        }}
      />
    ))}
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const y = useScrollY();
  const { dark, toggle } = useTheme();
  const scrolled = y > 20;

  return (
    <div className="fixed left-0 right-0 top-2 z-[300] px-2 sm:top-3 sm:px-4">
      <nav
        className={`flex h-14 items-center justify-between rounded-2xl border border-azure-200 bg-azure-100 px-4 shadow-[0_10px_30px_rgba(24,24,23,.12)] backdrop-blur-xl transition-all duration-300 dark:border-white/[.08] dark:bg-dark-800 sm:h-[60px] sm:px-8 ${
          scrolled
            ? dark
              ? "shadow-[0_1px_0_rgba(255,255,255,.06),0_14px_34px_rgba(0,0,0,.25)]"
              : "shadow-[0_1px_0_rgba(0,0,0,.08),0_14px_34px_rgba(24,24,23,.16)]"
            : dark
              ? "shadow-[0_12px_30px_rgba(0,0,0,.22)]"
              : "shadow-[0_10px_30px_rgba(24,24,23,.12)]"
        }`}
      >
        <div
          className={`text-sm font-black tracking-widest ${dark ? "text-white/90" : "text-dark-900"}`}
        >
          <img src="ma.png" alt="ma logo" className="h-20 w-20 sm:h-32 sm:w-32" />
        </div>
        <ul className="mad-nav-ul flex gap-8 list-none m-0 p-0">
          {["Work", "Services", "About"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`text-[10px] font-bold uppercase tracking-[.2em] no-underline opacity-70 transition-opacity duration-200 hover:opacity-100 ${
                  dark ? "text-white/70" : "text-dark-900"
                }`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className={`relative h-5 w-9 cursor-pointer rounded-full border p-0 transition-colors duration-300 ${
              dark ? "border-azure-500 bg-azure-500" : "border-dark-100 bg-dark-100"
            }`}
          >
            <div
              className="absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] shadow-sm transition-all duration-300"
              style={{ left: dark ? 18 : 2 }}
            />
          </button>
          <span
            className={`hidden cursor-pointer text-[10px] font-semibold tracking-wide sm:inline ${
              dark ? "text-white/65" : "text-dark-900/65"
            }`}
          >
            Contact
          </span>
          <button
            className="hidden cursor-pointer rounded-full border-none bg-azure-500 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_2px_16px_rgba(25,128,194,.25)] transition-all duration-200 hover:bg-azure-600 sm:block"
          >
            Work With Us
          </button>
        </div>
      </nav>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
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

const THUMB_FINAL = [
  { x: -50, y: -30, w: 260, h: 182, r: -2.5 },
  { x: -20, y: -33, w: 274, h: 192, r: 1.5 },
  { x: +20, y: -29, w: 256, h: 180, r: -1 },
  { x: +50, y: -34, w: 266, h: 186, r: 2 },
  { x: -48, y: +30, w: 262, h: 184, r: 2.5 },
  { x: -18, y: +33, w: 270, h: 190, r: -1.5 },
  { x: +18, y: +30, w: 258, h: 182, r: 1 },
  { x: +48, y: +34, w: 264, h: 186, r: -2 },
];

function HeroLogoRail({ dark }) {
  return (
    <div
      className="mad-hero-logo-rail absolute left-0 right-0 bottom-0 z-40 pointer-events-none"
      style={{
        padding: "10px 40px 14px",
        background: dark
          ? "linear-gradient(to top, rgba(14,14,13,.88), rgba(14,14,13,0))"
          : "linear-gradient(to top, rgba(24,24,23,.88), rgba(24,24,23,0))",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-10 overflow-hidden">
        <span className="shrink-0 text-[8px] font-bold uppercase tracking-[.25em] text-white/55">
          Trusted by
        </span>
        {LOGOS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Client logo ${i + 1}`}
            className="h-6 max-w-[110px] object-contain opacity-85 transition-opacity duration-300 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

function PhoneNotif({ show, msg, sub }) {
  return (
    <div
      className="absolute z-40 right-6 pointer-events-none"
      style={{
        top: 88,
        width: 230,
        background: "rgba(24,24,23,0.93)",
        backdropFilter: "blur(18px)",
        borderRadius: 12,
        padding: 12,
        border: "1px solid rgba(255,255,255,.1)",
        transform: show
          ? "translateY(0) scale(1)"
          : "translateY(-56px) scale(.88)",
        opacity: show ? 1 : 0,
        transition:
          "transform .5s cubic-bezier(.22,1,.36,1), opacity .35s ease",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        
        >
          <img src="mawhit.png" alt="ma logo" className="w-16 h-16" />
        </div>
        <div>
          <div className="text-[8px] font-bold text-white/40 tracking-[.2em] uppercase"></div>
          <div className="text-[11px] font-medium text-white/85 leading-snug">
            {msg}
          </div>
        </div>
      </div>
      {sub && (
        <div className="text-[8px] text-white/50 mt-1 leading-relaxed">
          {sub}
        </div>
      )}
    </div>
  );
}

function PantoneCard({ data, opacity, translateY }) {
  return (
    <div
      className="absolute bg-white rounded-lg overflow-hidden"
      style={{
        transform: `translate(-50%, calc(-50% + ${translateY}px))`,
        width: "100%",
        opacity,
        boxShadow: "0 24px 64px rgba(0,0,0,.32)",
      }}
    >
      <img
        src={data.cardImg}
        alt=""
        className="w-full h-44 object-cover block"
      />
      <div className="p-4">
        <div className="text-base font-black tracking-tight text-[#181817] mb-3 leading-tight">
          {data.card}
        </div>
        <div className="text-[7px] font-bold tracking-[.2em] uppercase text-neutral-400 mb-0.5">
          Service crafted by
        </div>
        <div className="text-xs font-black tracking-wider uppercase text-[#181817]">
          MAD™
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const [rawPct, setRawPct] = useState(0);
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);
  const [slide, setSlide] = useState(0);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRef = useRef({ slide: 0, prog: 0, paused: false });
  const rafRef = useRef(null);
  const lastTs = useRef(null);
  const [notif, setNotif] = useState(false);
  const [notifData, setNotifData] = useState({ msg: "", sub: "" });
  const prevPhase = useRef(-1);
  const notifTimer = useRef(null);
  const NOTIFS = [
    { msg: "New inquiry from Kova Group", sub: "Brand & Design · 2 min ago" },
    { msg: "TruBilling shipped ✓", sub: "Product launch confirmed" },
    { msg: "Meridian went live today", sub: "Marketing campaign active" },
  ];

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
  const phase1visible = Math.min(1, Math.max(0, (rawPct * 3 - 1) * 2.5));
  const cardOut = Math.max(0, (pct - 0.7) / 0.3);
  const collapseT = Math.min(1, Math.max(0, (rawPct * 3 - 2) * 2.5));

  return (
    <div ref={wrapRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 flex h-screen overflow-hidden bg-azure-100 dark:bg-dark-900"
      >
        <div
          className="absolute inset-0 z-0 bg-white/70 dark:bg-azure-500/20"
          style={{ opacity: collapseT }}
        />

        {/* Main screen */}
        <div
          className="absolute z-20 overflow-hidden"
          style={{
            left: `${collapseT * 43}%`,
            right: `${collapseT * 43}%`,
            top: `${collapseT * 11}%`,
            bottom: `${collapseT * 72}%`,
            borderRadius: collapseT * 8,
            boxShadow: `0 ${collapseT * 16}px ${collapseT * 40}px rgba(0,0,0,${collapseT * 0.14})`,
            outline:
              collapseT > 0.05
                ? `${collapseT * 1.5}px solid rgba(0,0,0,.08)`
                : "none",
          }}
        >
          {/* Macbook bar */}
          <div
            className="absolute top-0 left-0 right-0 z-30 flex items-center overflow-hidden"
            style={{
              height: `${collapseT * 18}px`,
              background: "rgba(22,22,24,0.96)",
              opacity: collapseT,
              padding: `0 ${collapseT * 8}px`,
              gap: collapseT * 4,
            }}
          >
            <ChromeDots scale={collapseT} />
          </div>
          <div
            className="absolute left-0 right-0 bottom-0 flex"
            style={{ top: `${collapseT * 18}px` }}
          >
            {/* Left panel */}
            <div className="mad-hero-left relative w-[42%] flex-shrink-0 overflow-hidden">
              {HERO_SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.left}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity:
                      i === slide
                        ? 1 - cardOut
                        : i === (slide + 1) % HERO_SLIDES.length
                          ? cardOut
                          : 0,
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-black/25" />
              <div
                className="absolute top-1/2 left-1/2 z-10"
                style={{
                  width: "min(260px,80%)",
                  opacity: Math.max(0, 1 - phase1visible * 2),
                }}
              >
                <PantoneCard
                  data={s}
                  opacity={1 - cardOut}
                  translateY={cardOut * -24}
                />
                <PantoneCard
                  data={ns}
                  opacity={cardOut}
                  translateY={(1 - cardOut) * 24}
                />
              </div>
              <div
                className="absolute bottom-6 left-6 flex flex-col gap-2"
                style={{ opacity: Math.max(0, 1 - phase1visible * 2) }}
              >
                {HERO_SLIDES.map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="rounded-sm transition-all duration-300"
                      style={{
                        height: 1.5,
                        width: i === slide ? 22 : 10,
                        background:
                          i === slide ? "#fff" : "rgba(255,255,255,.3)",
                      }}
                    />
                    <span
                      className="text-[8px] font-bold tracking-wider"
                      style={{
                        color:
                          i === slide
                            ? "rgba(255,255,255,.8)"
                            : "rgba(255,255,255,.28)",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right panel */}
            <div className="relative flex-1 overflow-hidden">
              {HERO_SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.right}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity:
                      i === slide
                        ? 1 - cardOut
                        : i === (slide + 1) % HERO_SLIDES.length
                          ? cardOut
                          : 0,
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.1) 50%, transparent 100%)",
                }}
              />
              <PhoneNotif
                show={notif}
                msg={notifData.msg}
                sub={notifData.sub}
              />
              <div
                className="absolute bottom-8 left-6 right-6 max-w-[480px] text-left sm:bottom-12 sm:left-auto sm:right-11 sm:text-right"
                style={{ opacity: Math.max(0, 1 - phase1visible * 2) }}
              >
                <h1
                  className="text-white mb-4"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(24px,6vw,52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-.02em",
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 24px rgba(0,0,0,.35)",
                  }}
                >
                  {s.h1}
                </h1>
                <p className="mb-6 text-[11px] font-medium leading-relaxed tracking-wide text-white/60">
                  {s.sub}
                </p>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button
                    className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase border-none cursor-pointer"
                    style={{ background: "#fff", color: "#181817" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = ".85")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Work With Us
                  </button>
                  <button className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer bg-transparent text-white border border-white/50">
                    View Our Work
                  </button>
                </div>
              </div>
              <div
                className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3 z-10"
                style={{ opacity: Math.max(0, 1 - phase1visible * 2) }}
              >
                <div
                  className="h-0.5 rounded-sm overflow-hidden"
                  style={{
                    width: "clamp(80px,10vw,140px)",
                    background: "rgba(255,255,255,.22)",
                  }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${prog}%`,
                      background: `linear-gradient(90deg, ${"#8cc3ef"}, #fff)`,
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    slideRef.current.paused = !slideRef.current.paused;
                    setPaused((p) => !p);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white text-[9px] border border-white/55 bg-black/25"
                  style={{ backdropFilter: "blur(6px)" }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail grid */}
        {THUMB_IMGS.map((src, i) => {
          const tf = THUMB_FINAL[i];
          const startX = tf.x * 3;
          const startY = tf.y * 3;
          const cx = startX + (tf.x - startX) * collapseT;
          const cy = startY + (tf.y - startY) * collapseT;
          const sc = 0.1 + collapseT * 0.9;
          return (
            <div
              key={i}
              className="pointer-events-none absolute z-[15] h-[186px] w-[266px] overflow-hidden"
              style={{
                left: `calc(50% + ${cx}%)`,
                top: `calc(50% + ${cy}%)`,
                transform: `translate(-50%, -50%) rotate(${tf.r}deg) scale(${sc})`,
                opacity: Math.max(0, collapseT * 1.3 - 0.1 - i * 0.01),
                borderRadius: 8,
                boxShadow: `0 ${8 * collapseT}px ${24 * collapseT}px rgba(0,0,0,.16)`,
                border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 z-[5] flex items-center"
                style={{
                  height: 12,
                  background: "#16161a",
                  padding: "0 6px",
                  gap: 3.5,
                }}
              >
                <ChromeDots scale={0.83} />
              </div>
              <img
                src={src}
                alt=""
                className="absolute left-0 right-0 bottom-0 w-full object-cover block"
                style={{ top: 12, height: "calc(100% - 12px)" }}
              />
            </div>
          );
        })}

        {/* CTA overlay */}
        <div
          className="absolute z-30 text-center"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${(1 - collapseT) * 20}px)`,
            pointerEvents: collapseT > 0.82 ? "all" : "none",
            opacity: Math.max(0, collapseT * 3 - 2),
            width: "min(560px, 80vw)",
          }}
        >
          <p className="text-[8px] font-bold tracking-[.25em] uppercase text-neutral-400 mb-3">
            Making A Difference
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px,4.4vw,56px)",
              lineHeight: 1.1,
              letterSpacing: "-.02em",
              color: dark ? "#f0ede8" : "#181817",
            }}
          >
            Ready to build
            <br />
            something real?
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase text-white border-none cursor-pointer"
              style={{ background: "#1980c2", boxShadow: `0 4px 24px ${"#1980c2"}50` }}
            >
              Start a Project →
            </button>
            <button
              className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer border"
              style={{
                background: dark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(24,24,23,.06)",
                color: dark ? "#f0ede8" : "#181817",
                borderColor: dark
                  ? "rgba(255,255,255,.15)"
                  : "rgba(24,24,23,.12)",
              }}
            >
              View Our Work
            </button>
          </div>
        </div>
        <TrustedBy inHero />
      </div>
    </div>
  );
}

// ─── TRUSTED BY ───────────────────────────────────────────────────────────────
const LOGOS = [
  "/log1.png",
  "/log2.png",
  "/log3.png",
  "/log4.png",
  "/log5.png",
  "/log6.png",
  "/log7.png",
];

function TrustedBy({ inHero = false }) {
  // duplicate for seamless loop
  const loopLogos = [...LOGOS, ...LOGOS];

  return (
    <div
      className={`mad-trusted overflow-hidden border-y border-dark-100 bg-gradient-to-b from-dark-900 via-azure-100 to-white-soft dark:border-white/[.08] dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 ${
        inHero
          ? "absolute bottom-0 left-0 right-0 z-50 px-4 py-5 sm:py-7"
          : "relative py-14"
      }`}
    >
      <p
        className={`text-center font-bold uppercase tracking-[.25em] text-white/70 dark:text-white/55 ${
          inHero ? "mb-4 text-[8px] sm:mb-5 sm:text-[9px]" : "mb-9 text-[10px]"
        }`}
      >
        Trusted by growing businesses, institutions & mission-driven organizations
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          className={`flex w-max animate-marquee ${
            inHero ? "gap-10 px-8 sm:gap-14 sm:px-12" : "gap-20 px-14"
          }`}
        >
          {loopLogos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Client logo ${i}`}
              className={`object-contain opacity-90 transition duration-300 hover:opacity-100 ${
                inHero ? "h-8 sm:h-10" : "h-12"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WHAT WE DO ───────────────────────────────────────────────────────────────
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
      className="w-full h-0.5 rounded-sm"
      style={{ background: "rgba(0,0,0,.08)" }}
    >
      <div
        className="h-full rounded-sm"
        style={{ width: `${w}%`, background: "#1980c2" }}
      />
    </div>
  );
}

function WhatWeDo() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const idleTimerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportW, setViewportW] = useState(1200);
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const DURATION = 5500;
  const CARD_W = 340;
  const TOTAL = FILM_FRAMES.length;

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      clearTimeout(idleTimerRef.current);
      setViewportW(window.innerWidth);
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = Math.min(1, Math.max(0, scrolled / total));
      setScrollProgress(raw);
      if (raw > 0.58) {
        idleTimerRef.current = setTimeout(() => {
          setScrollProgress(0);
          setCur(0);
        }, 3200);
      }
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      clearTimeout(idleTimerRef.current);
      window.removeEventListener("scroll", fn);
    };
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (idx !== cur) setCur(idx);
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
  const reelT = Math.min(1, Math.max(0, (scrollProgress - 0.34) / 0.36));
  const serviceT = 1 - Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.3));
  const maxReelTravel = Math.max(0, TOTAL * CARD_W - viewportW + CARD_W * 0.35);
  const translateX = reelT * maxReelTravel;
  const activeIndex = Math.round(reelT * (TOTAL - 1));

  return (
    <section
      ref={wrapRef}
      id="services"
      className={`relative transition-colors duration-300 ${dark ? "bg-[#252523]" : "bg-neutral-50"}`}
      style={{ height: `${TOTAL * 52}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background: dark
            ? `linear-gradient(180deg, ${"#181817"} 0%, #0f0f0e 52%, #111110 100%)`
            : "linear-gradient(180deg, #f8f8f7 0%, #f1eee9 44%, #e8edf0 100%)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none z-30"
          style={{
            background: dark
              ? "linear-gradient(to bottom, #0f0f0e, rgba(37,37,35,0))"
              : "linear-gradient(to bottom, #0f0f0e, rgba(250,250,250,0))",
          }}
        />
        <div
          className="absolute inset-0 z-10 grid p-[22px_4px_4px]"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "360px 240px",
            gap: 4,
            opacity: serviceT,
            transform: `scale(${0.94 + serviceT * 0.06}) translateY(${(1 - serviceT) * -28}px)`,
            pointerEvents: serviceT > 0.2 ? "auto" : "none",
            transition: "opacity .15s linear, transform .15s linear",
          }}
        >
        {/* Left large image */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{ gridRow: "1 / 3" }}
        >
          {SERVICES.map((s, i) => (
            <img
              key={i}
              src={s.wide}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === cur ? 1 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.1) 55%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-8 left-0 right-0 text-center px-6">
            <p
              className="text-white mb-4"
              style={{
                fontFamily: "Georgia,serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(22px,2.8vw,34px)",
                lineHeight: 1.15,
              }}
            >
              {svc.tagline}
            </p>
            <button
              className="text-white rounded-full text-[7.5px] font-bold tracking-wider uppercase cursor-pointer px-5 py-2 border border-white/30"
              style={{
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              Start a Project
            </button>
          </div>
          <div className="absolute top-5 left-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[8px] font-bold tracking-[.28em] uppercase"
              style={{
                background: "rgba(0,0,0,.3)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "rgba(255,255,255,.5)",
                backdropFilter: "blur(6px)",
              }}
            >
              {svc.tag} / 0{SERVICES.length}
            </span>
          </div>
        </div>

        {/* Top right */}
        <div className="relative overflow-hidden rounded-sm">
          {SERVICES.map((s, i) => (
            <img
              key={i}
              src={s.top}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-1000"
              style={{ opacity: i === cur ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <span
                className="text-white"
                style={{
                  fontFamily: "Georgia,serif",
                  fontStyle: "italic",
                  fontSize: "clamp(24px,3vw,38px)",
                }}
              >
                MAD
              </span>
              <span className="text-white/40 font-light text-xl">×</span>
              <span
                className="text-white font-black tracking-wider uppercase"
                style={{ fontSize: "clamp(16px,2.2vw,26px)" }}
              >
                {svc.shortTag}
              </span>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-1">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-6 h-6 rounded-full cursor-pointer transition-all duration-300"
                style={{
                  border: `1.5px solid ${i === cur ? "#fff" : "rgba(255,255,255,.28)"}`,
                  background: i === cur ? "#fff" : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom right */}
        <div
          className="grid rounded-sm overflow-hidden"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 4 }}
        >
          <div
            className="relative overflow-hidden rounded-sm flex flex-col justify-between p-5"
            style={{
              background: dark
                ? `linear-gradient(145deg, ${"#181817"}, #102535 58%, rgba(25,128,194,.72))`
                : `linear-gradient(145deg, #ffffff, ${"#eef7fd"} 58%, rgba(242,101,34,.16))`,
              border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`,
            }}
          >
            <div>
              <p className="text-[7px] font-bold tracking-[.25em] uppercase text-neutral-400 mb-3">
                Start a Project
              </p>
              <h3
                className="leading-tight"
                style={{
                  fontFamily: "Georgia,serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px,2.4vw,32px)",
                  color: dark ? "#f0ede8" : "#181817",
                }}
              >
                Work With MAD
              </h3>
            </div>
            <button
              className="self-start px-5 py-2.5 rounded-full text-[8px] font-bold tracking-widest uppercase text-white border-none cursor-pointer transition-all duration-200"
              style={{
                background: dark ? "#1980c2" : "#181817",
                boxShadow: dark
                  ? `0 4px 20px ${"#1980c2"}35`
                  : "0 4px 16px rgba(0,0,0,.18)",
              }}
            >
              Let's Talk →
            </button>
          </div>
          <div
            className={`rounded-sm p-5 flex flex-col justify-between transition-colors duration-300 ${dark ? "bg-[#1e1e1c]" : "bg-white"}`}
          >
            <div
              className={`border-2 rounded-sm p-3 mb-3 ${dark ? "border-white/90" : "border-[#181817]"}`}
            >
              <div
                className={`font-black leading-tight tracking-tight ${dark ? "text-white/90" : "text-[#181817]"}`}
                style={{ fontSize: "clamp(13px,1.4vw,17px)" }}
              >
                {svc.label}
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-1 mb-3">
                {SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="text-[6px] font-bold w-[13px] flex-shrink-0"
                      style={{ color: i === cur ? "#4a4a48" : "#d0d0ce" }}
                    >
                      {s.tag}
                    </span>
                    <div className="flex-1">
                      {i === cur ? (
                        <ProgressBar
                          duration={DURATION}
                          running={!paused}
                          onComplete={next}
                        />
                      ) : (
                        <div
                          className="h-[1.5px] rounded-sm"
                          style={{
                            background: i < cur ? "#b0b0ac" : "#e8e8e6",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {[
                  { fn: prev, d: "M14 6L8 12l6 6" },
                  { fn: next, d: "M10 6l6 6-6 6" },
                ].map(({ fn, d }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="w-[26px] h-[26px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                    style={{
                      border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`,
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1980c2";
                      e.currentTarget.style.borderColor = "#1980c2";
                      e.currentTarget.querySelector("path").style.stroke =
                        "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = dark
                        ? "rgba(255,255,255,.08)"
                        : "#e8e8e6";
                      e.currentTarget.querySelector("path").style.stroke = dark
                        ? "rgba(240,237,232,.65)"
                        : "#6b6b68";
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d={d}
                        stroke={dark ? "rgba(240,237,232,.65)" : "#6b6b68"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="w-[26px] h-[26px] rounded-full text-[11px] cursor-pointer transition-all duration-200"
                  style={{
                    border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`,
                    background: "transparent",
                    color: dark ? "rgba(240,237,232,.65)" : "#6b6b68",
                  }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div
          className="absolute inset-0 z-20 flex flex-col overflow-hidden"
          style={{
            opacity: reelT,
            transform: `translateY(${(1 - reelT) * 42}px) scale(${0.96 + reelT * 0.04})`,
            pointerEvents: reelT > 0.2 ? "auto" : "none",
            transition: "opacity .15s linear, transform .15s linear",
          }}
        >
          <div
            className="absolute left-0 right-0 bottom-0 h-36 z-10 pointer-events-none"
            style={{
              background: dark
                ? "linear-gradient(to top, #252523, rgba(37,37,35,0))"
                : "linear-gradient(to top, #fafafa, rgba(250,250,250,0))",
            }}
          />
          <div className="flex-shrink-0 px-10 pt-8 pb-4 flex justify-between z-20 relative">
            <div>
              <p className={`text-[8px] font-bold tracking-[.25em] uppercase mb-2 ${dark ? "text-white/35" : "text-dark-900/40"}`}>
                Our Work Reel
              </p>
              <h2 className={`font-serif text-[clamp(28px,4vw,56px)] italic leading-none ${dark ? "text-white" : "text-dark-900"}`}>
                Services in motion.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {FILM_FRAMES.map((f, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 26 : 7,
                    background:
                      i === activeIndex
                        ? f.accent
                        : dark
                          ? "rgba(255,255,255,.18)"
                          : "rgba(24,24,23,.16)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative flex-1 flex flex-col overflow-hidden">
            <div
              className="flex-shrink-0 flex items-center py-2"
              style={{
                background: dark ? "rgba(0,0,0,.6)" : "rgba(255,255,255,.72)",
                borderTop: dark
                  ? "2px solid rgba(255,255,255,.06)"
                  : "2px solid rgba(0,0,0,.07)",
                borderBottom: dark
                  ? "2px solid rgba(255,255,255,.06)"
                  : "2px solid rgba(0,0,0,.07)",
              }}
            >
              <Sprockets count={16} dark={dark} />
            </div>
            <div
              className="flex-1 relative overflow-hidden"
              style={{ background: dark ? "black" : "#f6f3ee" }}
            >
              <div
                className="absolute top-0 left-0 h-full flex"
                style={{
                  width: `${TOTAL * CARD_W}px`,
                  transform: `translateX(-${translateX}px)`,
                  transition: "transform 0.05s linear",
                }}
              >
                {FILM_FRAMES.map((frame, i) => {
                  const dist = Math.abs(i - activeIndex);
                  return (
                    <div
                      key={frame.tag}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: CARD_W,
                        height: "100%",
                        filter:
                          dist === 0
                            ? "none"
                            : dark
                              ? `brightness(${Math.max(0.55, 1 - dist * 0.18)})`
                              : `brightness(${Math.max(0.9, 1 - dist * 0.04)})`,
                        transition: "filter .4s ease",
                        borderLeft: dark
                          ? "2px solid rgba(255,255,255,.04)"
                          : "2px solid rgba(0,0,0,.06)",
                        borderRight: dark
                          ? "2px solid rgba(255,255,255,.04)"
                          : "2px solid rgba(0,0,0,.06)",
                      }}
                    >
                      <img
                        src={frame.img}
                        alt={frame.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
                          backgroundSize: "128px 128px",
                          mixBlendMode: "overlay",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: dark
                            ? "linear-gradient(to top, rgba(0,0,0,.28) 0%, rgba(0,0,0,.03) 52%, rgba(0,0,0,.14) 100%)"
                            : "linear-gradient(to top, rgba(255,255,255,.08), rgba(255,255,255,0) 45%, rgba(255,255,255,.05))",
                        }}
                      />
                      <div className="absolute top-0 left-0 right-0 flex justify-between px-1 pt-0.5">
                        {Array.from({ length: 20 }).map((_, ti) => (
                          <div
                            key={ti}
                            className={dark ? "w-px bg-white/10" : "w-px bg-black/10"}
                            style={{ height: ti % 5 === 0 ? 8 : 4 }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
                style={{
                  background: dark
                    ? "linear-gradient(to right, rgba(0,0,0,.68), transparent)"
                    : "linear-gradient(to right, rgba(246,243,238,.86), transparent)",
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
                style={{
                  background: dark
                    ? "linear-gradient(to left, rgba(0,0,0,.68), transparent)"
                    : "linear-gradient(to left, rgba(246,243,238,.86), transparent)",
                }}
              />
            </div>
            <div
              className="flex-shrink-0 flex items-center py-2"
              style={{
                background: dark ? "rgba(0,0,0,.6)" : "rgba(255,255,255,.72)",
                borderTop: dark
                  ? "2px solid rgba(255,255,255,.06)"
                  : "2px solid rgba(0,0,0,.07)",
                borderBottom: dark
                  ? "2px solid rgba(255,255,255,.06)"
                  : "2px solid rgba(0,0,0,.07)",
              }}
            >
              <Sprockets count={16} dark={dark} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FILM TAPE SERVICES ───────────────────────────────────────────────────────
const FILM_FRAMES = [
  {
    tag: "01",
    label: "Product & Digital",
    tagline: "Built for performance.",
    desc: "Websites, apps, and platforms engineered to scale with your ambitions.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop",
    accent: "#1980c2",
  },
  {
    tag: "02",
    label: "Marketing & Growth",
    tagline: "Reach the right people.",
    desc: "Campaigns, content, and strategy that put your brand in front of audiences who convert.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=85&auto=format&fit=crop",
    accent: "#5aa7e6",
  },
  {
    tag: "03",
    label: "Brand & Identity",
    tagline: "Identity that speaks first.",
    desc: "Visual systems, logos, and brand language that communicate before a word is read.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85&auto=format&fit=crop",
    accent: "#7c3aed",
  },
  {
    tag: "04",
    label: "Strategy",
    tagline: "Direction before action.",
    desc: "Frameworks, roadmaps, and competitive analysis that keep you moving with intention.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&auto=format&fit=crop",
    accent: "#0ea5e9",
  },
  {
    tag: "05",
    label: "Content & Copy",
    tagline: "Words that convert.",
    desc: "Copy that sounds like you, sells like proven formulas, and earns trust every read.",
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=85&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    tag: "06",
    label: "Analytics & Data",
    tagline: "Data that directs.",
    desc: "Dashboards, tracking setups, and reporting that turn raw numbers into clear growth levers.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop",
    accent: "#22c55e",
  },
  {
    tag: "07",
    label: "Launch",
    tagline: "Launch with momentum.",
    desc: "Rollouts that make the first impression count.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85&auto=format&fit=crop",
    accent: "#ef4444",
  },
  {
    tag: "08",
    label: "Collaboration",
    tagline: "Teams in motion.",
    desc: "Shared systems for focused creative execution.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85&auto=format&fit=crop",
    accent: "#14b8a6",
  },
  {
    tag: "09",
    label: "Research",
    tagline: "Insight before output.",
    desc: "Audience research that sharpens every decision.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85&auto=format&fit=crop",
    accent: "#a855f7",
  },
  {
    tag: "10",
    label: "Commerce",
    tagline: "Built to convert.",
    desc: "Digital storefronts and flows shaped around revenue.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85&auto=format&fit=crop",
    accent: "#f97316",
  },
];

function Sprockets({ count = 14, dark }) {
  return (
    <div className="flex items-center justify-around w-full px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-3.5 rounded-sm flex-shrink-0"
          style={{
            background: dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)",
            boxShadow: dark
              ? "none"
              : "inset 0 0 0 1px rgba(0,0,0,.08)",
          }}
        />
      ))}
    </div>
  );
}

function FilmTapeServices() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const maxProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const CARD_W = 340;
  const TOTAL = FILM_FRAMES.length;

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const raw = Math.min(1, Math.max(0, scrolled / total));
      maxProgressRef.current = Math.max(maxProgressRef.current, raw);
      setProgress(maxProgressRef.current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const translateX = progress * (TOTAL - 1) * CARD_W;
  const activeIndex = Math.round(progress * (TOTAL - 1));

  return (
    <div
      ref={wrapRef}
      id="services-tape"
      style={{ height: `${TOTAL * 52}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
        style={{
          background: dark
            ? `linear-gradient(180deg, ${"#181817"} 0%, #0f0f0e 52%, #111110 100%)`
            : "linear-gradient(180deg, #f8f8f7 0%, #f1eee9 44%, #e8edf0 100%)",
        }}
      >
        <div
          className="absolute left-0 right-0 top-0 h-32 z-10 pointer-events-none"
          style={{
            background: dark
              ? `linear-gradient(to bottom, ${"#181817"}, rgba(24,24,23,0))`
              : "linear-gradient(to bottom, #f8f8f7, rgba(248,248,247,0))",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-36 z-10 pointer-events-none"
          style={{
            background: dark
              ? "linear-gradient(to top, #252523, rgba(37,37,35,0))"
              : "linear-gradient(to top, #fafafa, rgba(250,250,250,0))",
          }}
        />
        <div className="flex-shrink-0 px-10 pt-8 pb-4 flex justify-end z-20 relative">
          <div className="flex items-center gap-2">
            {FILM_FRAMES.map((f, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? 26 : 7,
                  background:
                    i === activeIndex
                      ? f.accent
                      : dark
                        ? "rgba(255,255,255,.18)"
                        : "rgba(24,24,23,.16)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Film strip body */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Top sprocket bar */}
          <div
            className="flex-shrink-0 flex items-center py-2"
            style={{
              background: dark ? "rgba(0,0,0,.6)" : "rgba(255,255,255,.72)",
              borderTop: dark
                ? "2px solid rgba(255,255,255,.06)"
                : "2px solid rgba(0,0,0,.07)",
              borderBottom: dark
                ? "2px solid rgba(255,255,255,.06)"
                : "2px solid rgba(0,0,0,.07)",
            }}
          >
            <Sprockets count={16} dark={dark} />
          </div>

          {/* Frames container */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{ background: dark ? "black" : "#f6f3ee" }}
          >
            {/* Film frame strip */}
            <div
              className="absolute top-0 left-0 h-full flex"
              style={{
                width: `${TOTAL * CARD_W}px`,
                transform: `translateX(-${translateX}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              {FILM_FRAMES.map((frame, i) => {
                const dist = Math.abs(i - activeIndex);
                return (
                  <div
                    key={frame.tag}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{
                      width: CARD_W,
                      height: "100%",
                      filter:
                        dist === 0
                          ? "none"
                          : dark
                            ? `brightness(${Math.max(0.55, 1 - dist * 0.18)})`
                            : `brightness(${Math.max(0.9, 1 - dist * 0.04)})`,
                      transition: "filter .4s ease",
                      borderLeft: dark
                        ? "2px solid rgba(255,255,255,.04)"
                        : "2px solid rgba(0,0,0,.06)",
                      borderRight: dark
                        ? "2px solid rgba(255,255,255,.04)"
                        : "2px solid rgba(0,0,0,.06)",
                    }}
                  >
                    <img
                      src={frame.img}
                      alt={frame.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Grain overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
                        backgroundSize: "128px 128px",
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: dark
                          ? "linear-gradient(to top, rgba(0,0,0,.28) 0%, rgba(0,0,0,.03) 52%, rgba(0,0,0,.14) 100%)"
                          : "linear-gradient(to top, rgba(255,255,255,.08), rgba(255,255,255,0) 45%, rgba(255,255,255,.05))",
                      }}
                    />
                    {/* Tick marks */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between px-1 pt-0.5">
                      {Array.from({ length: 20 }).map((_, ti) => (
                        <div
                          key={ti}
                          className={dark ? "w-px bg-white/10" : "w-px bg-black/10"}
                          style={{ height: ti % 5 === 0 ? 8 : 4 }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vignette edges */}
            <div
              className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
              style={{
                background: dark
                  ? "linear-gradient(to right, rgba(0,0,0,.68), transparent)"
                  : "linear-gradient(to right, rgba(246,243,238,.86), transparent)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
              style={{
                background: dark
                  ? "linear-gradient(to left, rgba(0,0,0,.68), transparent)"
                  : "linear-gradient(to left, rgba(246,243,238,.86), transparent)",
              }}
            />
          </div>

          {/* Bottom sprocket bar */}
          <div
            className="flex-shrink-0 flex items-center py-2"
            style={{
              background: dark ? "rgba(0,0,0,.6)" : "rgba(255,255,255,.72)",
              borderTop: dark
                ? "2px solid rgba(255,255,255,.06)"
                : "2px solid rgba(0,0,0,.07)",
              borderBottom: dark
                ? "2px solid rgba(255,255,255,.06)"
                : "2px solid rgba(0,0,0,.07)",
            }}
          >
            <Sprockets count={16} dark={dark} />
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="flex-shrink-0 flex items-center justify-center gap-4 py-4">
          <div
            className="h-0.5 rounded-sm overflow-hidden"
            style={{
              width: 200,
              background: dark ? "rgba(255,255,255,.1)" : "rgba(24,24,23,.12)",
            }}
          >
            <div
              className="h-full rounded-sm transition-all"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${FILM_FRAMES[activeIndex]?.accent || "#1980c2"}, rgba(255,255,255,.5))`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ scale = 1 }) {
  const s = (v) => `${Math.round(v * scale)}px`;
  const bars = [40, 65, 45, 80, 55, 90, 70];
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const stats = [
    ["Invoices Sent", "24", "+4 this month", "#F26522"],
    ["Pending", "$12,480", "6 outstanding", "#ea580c"],
    ["Collected", "$38,920", "+22% vs last mo.", "#16a34a"],
  ];
  const inv = [
    ["Vertex Corp", "INV-041", "$3,200", "Paid", "#16a34a", "#f0fdf4"],
    ["GreenPath Ltd", "INV-040", "$1,850", "Pending", "#F26522", "#fff3ee"],
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
              background: "#F26522",
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
            Tru<span style={{ color: "#F26522" }}>Billing</span>
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
                color: i === 0 ? "#F26522" : "#9ca3af",
                background: i === 0 ? `${"#F26522"}14` : "transparent",
                borderLeft: `2px solid ${i === 0 ? "#F26522" : "transparent"}`,
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
              background: "#F26522",
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
                  background: i === 5 ? "#F26522" : `${"#F26522"}26`,
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
                  color: i === 5 ? "#F26522" : "#d1d5db",
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
            <span style={{ fontSize: s(6), fontWeight: 600, color: "#F26522" }}>
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
            padding: "5px 8px",
            transform: showNotif
              ? "translateY(0) scale(1)"
              : "translateY(-50px) scale(.85)",
            opacity: showNotif ? 1 : 0,
            transition: `transform .5s cubic-bezier(.22,1,.36,1), opacity .3s ease`,
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: "#F26522",
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
              <div style={{ fontSize: 7, fontWeight: 700, color: "#fff" }}>
                TruBilling
              </div>
              <div style={{ fontSize: 6, color: "rgba(255,255,255,.6)" }}>
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
          <span style={{ fontSize: 11, fontWeight: 900, color: "#0f172a" }}>
            Tru<span style={{ color: "#F26522" }}>Billing</span>
          </span>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `${"#F26522"}1a`,
              border: `1px solid ${"#F26522"}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: "#F26522",
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
          <div style={{ borderRadius: 8, padding: 10, background: "#F26522" }}>
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
            ["Invoices Sent", "24", "#F26522"],
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
                borderRadius: 4,
                padding: "6px 8px",
              }}
            >
              <span style={{ fontSize: 8, fontWeight: 600, color: "#64748b" }}>
                {l}
              </span>
              <span style={{ fontSize: 12, fontWeight: 900, color: c }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EXPERIENCE (TRUBILLING CASE STUDY) ──────────────────────────────────────
const EXP_STEPS = [
  {
    tag: "The Need",
    num: "01",
    icon: "⚡",
    color: "#e53e3e",
    bg: "#fff5f5",
    darkBg: "#2a1515",
    points: [
      "Unstructured billing across teams",
      "No real-time financial visibility",
      "Fragmented manual tools",
      "No confidence in financial data",
    ],
  },
  {
    tag: "Our Approach",
    num: "02",
    icon: "🧭",
    color: "#1980c2",
    bg: "#eef7fd",
    darkBg: "#0e2235",
    points: [
      "System design, not just software",
      "Simplified financial workflows",
      "Clean, intuitive UX at every step",
      "Business value + tech in balance",
    ],
  },
  {
    tag: "The Solution",
    num: "03",
    icon: "✦",
    color: "#38a169",
    bg: "#f0fff4",
    darkBg: "#0e2218",
    points: [
      "Create & manage invoices with ease",
      "Track payments in real time",
      "Organized, clear financial records",
      "Reduced friction across operations",
    ],
  },
  {
    tag: "Outcome",
    num: "04",
    icon: "◆",
    color: "#F26522",
    bg: "#fff8f3",
    darkBg: "#2a1a0e",
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

function AnimatedStat({ value, label, color, delay, visible }) {
  const [displayed, setDisplayed] = useState("0");
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 900;
  useEffect(() => {
    if (!visible) return;
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
      className="text-center transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="text-[38px] font-black leading-none tracking-tight"
        style={{ color }}
      >
        {displayed}
      </div>
      <p className="text-[8px] font-bold tracking-[.25em] uppercase text-neutral-400 mt-1">
        {label}
      </p>
    </div>
  );
}

function Experience() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const [step, setStep] = useState(0);
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
      setStep(s);
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

  const bgColor = dark
    ? `radial-gradient(circle at 18% 18%, ${"#eef7fd"} 0%, rgba(238,247,253,0) 34%), radial-gradient(circle at 82% 72%, rgba(242,101,34,.22) 0%, rgba(242,101,34,0) 36%), linear-gradient(135deg, #fffaf3 0%, ${"#f5f1eb"} 48%, #e7f2f9 100%)`
    : `radial-gradient(circle at 16% 18%, rgba(25,128,194,.34) 0%, rgba(25,128,194,0) 36%), radial-gradient(circle at 84% 70%, rgba(242,101,34,.26) 0%, rgba(242,101,34,0) 34%), linear-gradient(135deg, #0b0b0a 0%, ${"#181817"} 45%, #102535 100%)`;

  return (
    <div
      ref={wrapRef}
      id="work"
      style={{ height: "500vh", position: "relative" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col transition-colors duration-300"
        style={{ background: bgColor }}
      >
        <div className="px-10 pt-6 flex-shrink-0">
          <div className="flex items-end justify-between">
            <div>
              <p
                className={`text-[8px] font-bold tracking-[.25em] uppercase mb-2 ${dark ? "text-[#181817]/50" : "text-white/30"}`}
              >
                Case Study · Product Development
              </p>
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#F26522",
                    boxShadow: `0 4px 16px ${"#F26522"}40`,
                  }}
                >
                  <span className="text-[11px] font-black text-white">TB</span>
                </div>
                <h2
                  className={`font-black leading-none tracking-tight m-0 ${dark ? "text-[#181817]" : "text-white"}`}
                  style={{ fontSize: "clamp(22px,2.8vw,36px)" }}
                >
                  TruBilling{" "}
                  <span
                    style={{
                      color: "#1980c2",
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
            <div className="flex gap-1.5 pb-1.5">
              {EXP_STEPS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300"
                  style={{
                    background:
                      i === step
                        ? dark
                          ? `${s.color}20`
                          : s.bg
                        : "transparent",
                    borderColor:
                      i === step
                        ? `${s.color}40`
                        : dark
                          ? "rgba(0,0,0,.15)"
                          : "rgba(255,255,255,.1)",
                  }}
                >
                  <div
                    className="w-[7px] h-[7px] rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background:
                        i === step
                          ? s.color
                          : dark
                            ? "rgba(0,0,0,.2)"
                            : "rgba(255,255,255,.2)",
                    }}
                  />
                  <span
                    className="text-[8px] font-black tracking-wide"
                    style={{
                      color:
                        i === step
                          ? dark
                            ? "#181817"
                            : "#fff"
                          : dark
                            ? "rgba(0,0,0,.3)"
                            : "rgba(255,255,255,.3)",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`mt-3 h-0.5 rounded-sm overflow-hidden ${dark ? "bg-black/10" : "bg-white/10"}`}
          >
            <div
              className="h-full rounded-sm"
              style={{
                width: `${totalPct * 100}%`,
                background: `linear-gradient(90deg, ${"#1980c2"}, ${"#8cc3ef"})`,
                transition: "width .05s linear",
              }}
            />
          </div>
        </div>

        <div className="flex-1 relative px-10 pb-8 pt-5 min-h-0">
          {/* Device mockups background */}
          <div className="mad-exp-devices absolute inset-0 px-10 pb-8 pt-5 z-[1]">
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-[62%] z-[5]"
              style={{ filter: "drop-shadow(0 20px 48px rgba(0,0,0,.38))" }}
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
                  background: "linear-gradient(to bottom,#bdc9d3,#adb9c3)",
                }}
              />
              <div
                style={{
                  height: 18,
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
                    background: "#c0ccd5",
                  }}
                />
              </div>
            </div>
            <div
              className="absolute bottom-2 left-[5%] z-[6]"
              style={{ filter: "drop-shadow(0 18px 40px rgba(0,0,0,.38))" }}
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
            <div
              className="absolute bottom-2 right-[6%] z-[6]"
              style={{ filter: "drop-shadow(0 18px 40px rgba(0,0,0,.38))" }}
            >
              <TruBillingPhone
                showNotif={phoneNotif}
                notifMsg={phoneNotifMsg}
              />
            </div>
            <div
              className="absolute inset-0 z-[8] rounded-xl"
              style={{
                background: dark
                  ? "rgba(245,241,235,0.45)"
                  : "rgba(20,20,19,0.5)",
              }}
            />
          </div>

          {/* Step cards */}
          <div className="relative z-10 h-full pointer-events-none">
            {EXP_STEPS.map((card, i) => {
              const positions = [
                { top: "8%", left: "2%", width: "40%" },
                { top: "8%", right: "2%", width: "40%" },
                { bottom: "10%", left: "2%", width: "40%" },
                { bottom: "10%", right: "2%", width: "38%" },
              ];
              const pos = positions[i];
              const isActive = i === step;
              const isPast = i < step;
              return (
                <div
                  key={i}
                  className="absolute pointer-events-auto transition-all duration-500"
                  style={{
                    ...pos,
                    opacity: isActive ? 1 : isPast ? 0.38 : 0.18,
                    transform: isActive
                      ? "scale(1) translateY(0)"
                      : isPast
                        ? "scale(0.96) translateY(4px)"
                        : "scale(0.92) translateY(12px)",
                  }}
                >
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      borderRadius: 14,
                      border: `1.5px solid ${isActive ? card.color + "30" : dark ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"}`,
                      background: isActive
                        ? dark
                          ? card.bg
                          : "#1e1e1c"
                        : dark
                          ? "rgba(245,241,235,.5)"
                          : "rgba(255,255,255,.05)",
                      boxShadow: isActive
                        ? `0 16px 48px rgba(0,0,0,.14), 0 0 0 1px ${card.color}18`
                        : "none",
                    }}
                  >
                    <div
                      className="flex items-center gap-2.5 px-4 py-3 border-b"
                      style={{
                        background: isActive
                          ? dark
                            ? card.bg
                            : `${card.color}15`
                          : "transparent",
                        borderColor: isActive
                          ? `${card.color}18`
                          : dark
                            ? "rgba(0,0,0,.08)"
                            : "rgba(255,255,255,.08)",
                      }}
                    >
                      <div
                        className="w-[30px] h-[30px] rounded-xl flex items-center justify-center text-sm flex-shrink-0 border"
                        style={{
                          background: isActive
                            ? dark
                              ? "#fff"
                              : `${card.color}20`
                            : "transparent",
                          borderColor: isActive
                            ? `${card.color}28`
                            : dark
                              ? "rgba(0,0,0,.1)"
                              : "rgba(255,255,255,.1)",
                        }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <p
                          className="text-[8px] font-bold tracking-[.2em] uppercase mb-0.5"
                          style={{
                            color: isActive
                              ? card.color
                              : dark
                                ? "rgba(0,0,0,.35)"
                                : "rgba(255,255,255,.3)",
                          }}
                        >
                          {card.num} / 04
                        </p>
                        <div
                          className="text-[15px] font-black tracking-tight leading-none"
                          style={{
                            color: dark
                              ? isActive
                                ? "#181817"
                                : "rgba(0,0,0,.4)"
                              : isActive
                                ? "#fff"
                                : "rgba(255,255,255,.3)",
                          }}
                        >
                          {card.tag}
                        </div>
                      </div>
                      {isActive && (
                        <div
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{
                            background: card.color,
                            boxShadow: `0 0 0 3px ${card.color}28`,
                            animation: "pulseGlow 2s infinite",
                          }}
                        />
                      )}
                    </div>
                    <div className="px-4 py-3 flex flex-col gap-2">
                      {card.points.map((p, pi) => (
                        <div
                          key={p}
                          className="flex items-start gap-2 transition-all duration-300"
                          style={{
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? "none" : "translateX(-4px)",
                            transitionDelay: `${pi * 70}ms`,
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 border"
                            style={{
                              background: isActive
                                ? `${card.color}15`
                                : "transparent",
                              borderColor: isActive
                                ? `${card.color}22`
                                : dark
                                  ? "rgba(0,0,0,.1)"
                                  : "rgba(255,255,255,.1)",
                            }}
                          >
                            <span
                              className="text-[8px] font-black"
                              style={{
                                color: isActive
                                  ? card.color
                                  : dark
                                    ? "rgba(0,0,0,.3)"
                                    : "rgba(255,255,255,.3)",
                              }}
                            >
                              {pi + 1}
                            </span>
                          </div>
                          <span
                            className="text-[11px] leading-relaxed"
                            style={{
                              color: dark
                                ? isActive
                                  ? "#4a4a48"
                                  : "rgba(0,0,0,.3)"
                                : isActive
                                  ? "rgba(255,255,255,.65)"
                                  : "rgba(255,255,255,.25)",
                            }}
                          >
                            {p}
                          </span>
                        </div>
                      ))}
                      {card.outcome && isActive && (
                        <div
                          className="mt-2 pt-2 grid grid-cols-2 gap-2 border-t"
                          style={{
                            borderColor: dark
                              ? "rgba(0,0,0,.08)"
                              : "rgba(255,255,255,.1)",
                          }}
                        >
                          {card.outcome.map(([val, lbl], si) => (
                            <AnimatedStat
                              key={lbl}
                              value={val}
                              label={lbl}
                              color={si % 2 === 0 ? "#F26522" : "#1980c2"}
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
      </div>
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function BeyondProjects() {
  const { dark } = useTheme();
  const [ref, vis] = useInView(0.05);

  return (
    <section
      ref={ref}
      className={`transition-colors duration-300 ${dark ? "bg-[#141413]" : "bg-[#f5f1eb]"}`}
      style={{
        background: dark
          ? `linear-gradient(180deg, #141413 0%, #1e1e1c 100%)`
          : `linear-gradient(180deg, #f5f1eb 0%, #fff 100%)`,
      }}
    >
      <div
        className="px-20 py-24 text-center transition-all duration-700"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(24px)",
        }}
      >
        <p className="text-[8px] font-bold tracking-[.25em] uppercase text-neutral-400 mb-3">
          Start a Project
        </p>
        <h2
          className="mb-5"
          style={{
            fontFamily: "Georgia,serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px,3.2vw,42px)",
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            color: dark ? "#f0ede8" : "#181817",
          }}
        >
          Work With MAD
        </h2>
        <p
          className={`text-sm leading-relaxed max-w-md mx-auto mb-8 ${dark ? "text-white/50" : "text-neutral-500"}`}
        >
          Strategy, design, and delivery — all under one roof.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            className="px-8 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase text-white border-none cursor-pointer transition-all duration-200"
            style={{
              background: dark ? "#1980c2" : "#181817",
              boxShadow: dark
                ? `0 4px 20px ${"#1980c2"}40`
                : "0 4px 16px rgba(0,0,0,.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1980c2";
              e.currentTarget.style.boxShadow = `0 6px 28px ${"#1980c2"}50`;
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = dark ? "#1980c2" : "#181817";
              e.currentTarget.style.boxShadow = dark
                ? `0 4px 20px ${"#1980c2"}40`
                : "0 4px 16px rgba(0,0,0,.25)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Let's Talk →
          </button>
          <button
            className="px-8 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer border transition-all duration-200"
            style={{
              background: "transparent",
              color: dark ? "#f0ede8" : "#181817",
              borderColor: dark
                ? "rgba(255,255,255,.15)"
                : "rgba(24,24,23,.12)",
            }}
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}

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
function Contact() {
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

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MADLanding() {
  const [dark, setDark] = useState(false);
  const toggle = useCallback(() => setDark((d) => !d), []);

  useEffect(() => {
    const key = "mad:homes:scroll";
    const originalRestoration = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const saved = sessionStorage.getItem(key);
    const savedY = saved ? Number(saved) : 0;
    const restoreY = Number.isFinite(savedY) && savedY > 0 ? savedY : 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, restoreY));
    });

    let ticking = false;
    const remember = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    };

    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("pagehide", remember);

    return () => {
      window.removeEventListener("scroll", remember);
      window.removeEventListener("pagehide", remember);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = originalRestoration;
      }
    };
  }, []);

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={dark ? "dark" : ""}>
        <div
          className="font-sans transition-colors duration-300"
          style={{ background: dark ? "#141413" : "#f5f1eb" }}
        >
          <style>{`
            @keyframes pulseGlow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
            @keyframes dotPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
            @media (max-width: 767px) {
              .mad-hero-left { width: 100% !important; height: 44vw !important; min-height: 200px !important; }
              .mad-exp-devices { display: none !important; }
              .mad-contact-grid { grid-template-columns: 1fr !important; }
              .mad-contact-grid > div:first-child { border-right: none !important; padding: 40px 24px !important; }
              .mad-contact-grid > div:last-child { padding: 40px 24px 64px !important; min-height: 500px !important; }
              .mad-nav-ul { display: none !important; }
              .mad-trusted { padding: 28px 20px !important; }
            }
            input::placeholder, textarea::placeholder { color: rgba(24,24,23,0.28) !important; }
            * { box-sizing: border-box; }
          `}</style>
          <Nav />
          <div className="h-[60px]" />
          <Hero />
          <WhatWeDo />
          <Experience />
          <Contact />
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
