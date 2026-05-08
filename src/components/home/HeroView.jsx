import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    tag: "01",
    shortTag: "Product",
    label: "Product & Digital Solutions",
    tagline: "Built for performance.",
    wide: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop",
  },
  {
    tag: "02",
    shortTag: "Marketing",
    label: "Marketing & Communication",
    tagline: "Reach the right people.",
    wide: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=85&auto=format&fit=crop",
  },
  {
    tag: "03",
    shortTag: "Brand",
    label: "Brand & Design Systems",
    tagline: "Identity that speaks first.",
    wide: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=85&auto=format&fit=crop",
    top: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=85&auto=format&fit=crop",
  },
];

const SECTION_COPY = {
  eyebrow: "What We Do",
  header: "We help businesses become better than they were yesterday.",
  supporting:
    "MAD is a product, marketing, and design firm focused on collaborating with the brightest minds in business to create smarter systems, stronger brands, and better digital experiences.",
  core: "We create the conditions for growth by helping organizations balance business (value), design (usability) and technology (feasibility).",
  cta: "Work With Us Today",
};

const HERO_DURATION = 5500;

// ─── AZURE token (matches tailwind config azure-500) ─────────────────────────
const AZURE = "#1980c2";

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function HeroProgressBar({ duration, running, onComplete }) {
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.transition = "none";
    el.style.width = "0%";
    if (!running) return;
    startRef.current = null;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(((ts - startRef.current) / duration) * 100, 100);
      el.style.width = `${p}%`;
      if (p < 100) rafRef.current = requestAnimationFrame(step);
      else onComplete();
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, running, onComplete]);

  return (
    <div className="w-full h-px rounded bg-black/10">
      <div ref={fillRef} className="h-full rounded w-0" style={{ background: AZURE }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO VIEW — bg continuity with Hero section (azure-50)
// ════════════════════════════════════════════════════════════════
export default function HeroView() {
  const { dark } = useTheme();
  const [heroCur, setHeroCur] = useState(0);
  const [paused, setPaused] = useState(false);

  const heroNext = useCallback(() => setHeroCur((c) => (c + 1) % SERVICES.length), []);
  const heroPrev = useCallback(() => setHeroCur((c) => (c - 1 + SERVICES.length) % SERVICES.length), []);
  const svc = SERVICES[heroCur];

  const textPrimary = dark ? "#f0f6fc" : "#0a1628";
  const textSecondary = dark ? "rgba(240,246,252,.55)" : "rgba(10,22,40,.58)";
  const eyebrowColor = dark ? "rgba(240,246,252,.38)" : "rgba(10,22,40,.45)";
  const cardBg = dark ? "#1c2333" : "#ffffff";
  const cardBg2 = dark
    ? "linear-gradient(145deg,#1c2333,#162340 80%,#0d1e35)"
    : "linear-gradient(145deg,#ffffff,#dbeeff 80%,#b3d8f5)";
  const cardBorder = dark ? "rgba(56,86,138,.4)" : "#b3cbf0";
  const borderColor = dark ? "rgba(255,255,255,.1)" : "#d4dff0";
  const overlay = dark ? "rgba(0,0,0,.65)" : "rgba(0,0,0,.4)";
  const navPast = dark ? "#4a6a9a" : "#7090b8";
  const navFuture = dark ? "rgba(255,255,255,.1)" : "#d4dff0";

  return (
    <section
      id="heroview"
      className="relative"
      style={{ paddingBottom: 0 }}
    >
      {/* Subtle azure glow top-left */}
      <div
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{
          width: "55vw",
          height: "55vw",
          background: dark
            ? "radial-gradient(ellipse at 0% 0%, rgba(25,128,194,.09) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 0% 0%, rgba(25,128,194,.07) 0%, transparent 65%)",
        }}
      />
      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: dark ? 0.04 : 0.018,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div
        className="relative z-10 flex flex-col"
        style={{ minHeight: "82vh", padding: "0 4px 4px" }}
      >
        {/* ── Text header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: "clamp(48px,8vw,80px) clamp(16px,4vw,24px) 20px" }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: "clamp(8px,1.2vw,9px)",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: eyebrowColor,
              margin: "0 0 8px",
            }}
          >
            {SECTION_COPY.eyebrow}
          </p>
          <h2
            style={{
              fontSize: "clamp(20px,3.5vw,42px)",
              color: textPrimary,
              lineHeight: 1.05,
              margin: "0 0 12px",
              maxWidth: "16em",
            }}
          >
            We help businesses become{" "}
            <span style={{ color: "#1980c2" }}>better</span>{" "}
            than they were{" "}
            <span style={{ color: "#F26522" }}>yesterday.</span>
          </h2>
        </motion.div>

        {/* ── Responsive Grid ── */}
        <HeroGrid
          svc={svc}
          heroCur={heroCur}
          setHeroCur={setHeroCur}
          paused={paused}
          setPaused={setPaused}
          heroNext={heroNext}
          heroPrev={heroPrev}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          cardBg={cardBg}
          cardBg2={cardBg2}
          cardBorder={cardBorder}
          borderColor={borderColor}
          overlay={overlay}
          navPast={navPast}
          navFuture={navFuture}
        />
      </div>

      {/* Fade-out at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{
          height: 120,
          background: `linear-gradient(to bottom, transparent 0%, transparent 100%)`,
        }}
      />
    </section>
  );
}

// ─── RESPONSIVE GRID ──────────────────────────────────────────────────────────
function HeroGrid({
  svc, heroCur, setHeroCur, paused, setPaused, heroNext, heroPrev,
  textPrimary, textSecondary, cardBg, cardBg2, cardBorder, borderColor, overlay, navPast, navFuture,
}) {
  return (
    <>
      <style>{`
        .hv-grid {
          flex: 1;
          display: grid;
          gap: 4px;
          padding: 0 4px;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 0.67fr;
        }
        .hv-left { grid-row: 1 / 3; }
        .hv-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          border-radius: 6px;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .hv-grid { display: flex; flex-direction: column; gap: 8px; padding: 0 8px; }
          .hv-left { height: 52vw; min-height: 220px; max-height: 380px; }
          .hv-top-right { height: 38vw; min-height: 140px; max-height: 240px; }
          .hv-bottom { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) { .hv-bottom { grid-template-columns: 1fr; } }
      `}</style>

      <div className="hv-grid">
        {/* ── Large left image ── */}
        <div className="hv-left" style={{ position: "relative", overflow: "hidden", borderRadius: 6 }}>
          {SERVICES.map((s, i) => (
            <img key={i} src={s.wide} alt="" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: i === heroCur ? 1 : 0, transition: "opacity 1s",
            }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.38) 52%,rgba(0,0,0,.08) 100%)" }} />
          <div style={{ position: "absolute", bottom: "clamp(12px,3vw,24px)", left: 0, right: 0, padding: "0 clamp(12px,2.5vw,20px)" }}>
            <div style={{ marginBottom: 8 }}>
              <p style={{ color: "rgba(255,255,255,.9)", fontSize: "clamp(16px,2.2vw,26px)", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                {svc.label}
              </p>
              <p style={{ color: "rgba(255,255,255,.55)", fontSize: "clamp(10px,1.3vw,13px)", margin: 0 }}>
                {svc.tagline}
              </p>
            </div>
            <button style={{ color: "#fff", borderRadius: 9999, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", padding: "clamp(6px,1vw,8px) clamp(14px,2vw,20px)", border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", fontSize: "clamp(8px,1vw,9px)" }}>
              {SECTION_COPY.cta}
            </button>
          </div>
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <span className="font-mono" style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 9999, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(6px,0.85vw,7px)", letterSpacing: "0.28em", background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.5)", backdropFilter: "blur(6px)" }}>
              {svc.tag} / 0{SERVICES.length}
            </span>
          </div>
        </div>

        {/* ── Top right image ── */}
        <div className="hv-top-right" style={{ position: "relative", overflow: "hidden", borderRadius: 6 }}>
          {SERVICES.map((s, i) => (
            <img key={i} src={s.top} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: i === heroCur ? 1 : 0, transition: "opacity 1s" }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: overlay, transition: "background 0.3s" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1.5vw,12px)" }}>
              <span style={{ color: "#fff", fontSize: "clamp(18px,3vw,28px)", fontWeight: 700, letterSpacing: "-0.04em" }}>MAD</span>
              <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 300, fontSize: "clamp(14px,2.2vw,20px)" }}>×</span>
              <span style={{ color: "#fff", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "clamp(12px,2vw,18px)" }}>{svc.shortTag}</span>
            </div>
          </div>
          <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 5 }}>
            {SERVICES.map((_, i) => (
              <button key={i} onClick={() => setHeroCur(i)} aria-label={`Go to slide ${i + 1}`} style={{ borderRadius: "50%", cursor: "pointer", width: "clamp(14px,2vw,20px)", height: "clamp(14px,2vw,20px)", border: `1.5px solid ${i === heroCur ? "#fff" : "rgba(255,255,255,.28)"}`, background: i === heroCur ? "#fff" : "transparent", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        {/* ── Bottom right ── */}
        <div className="hv-bottom">
          {/* Core value card */}
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 6, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(12px,2vw,16px)", background: cardBg2, border: `1px solid ${cardBorder}`, transition: "background 0.3s, border-color 0.3s" }}>
            <div>
              <p className="font-mono" style={{ fontSize: "clamp(6px,0.85vw,6px)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8, color: AZURE }}>
                Core Value
              </p>
              <h3 style={{ lineHeight: 1.3, marginBottom: 8, fontSize: "clamp(12px,1.5vw,14px)", color: textPrimary, transition: "color 0.3s" }}>
                Growth needs balance.
              </h3>
              <p style={{ fontSize: "clamp(8px,1vw,9px)", lineHeight: 1.6, color: textSecondary, margin: 0, transition: "color 0.3s" }}>
                {SECTION_COPY.core}
              </p>
            </div>
            <button style={{ alignSelf: "flex-start", marginTop: 8, padding: "6px 16px", borderRadius: 9999, fontSize: "clamp(7px,1vw,7px)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: AZURE, border: "none", cursor: "pointer" }}>
              {SECTION_COPY.cta} →
            </button>
          </div>

          {/* Nav card */}
          <div style={{ borderRadius: 6, padding: "clamp(10px,1.5vw,12px)", display: "flex", flexDirection: "column", justifyContent: "space-between", background: cardBg, border: `1px solid ${borderColor}`, transition: "background 0.3s, border-color 0.3s" }}>
            <div>
              <div style={{ border: `2px solid ${textPrimary}`, borderRadius: 4, padding: 8, marginBottom: 8, transition: "border-color 0.3s" }}>
                <div style={{ fontWeight: 900, fontSize: "clamp(9px,1.1vw,10px)", color: textPrimary, lineHeight: 1.3, transition: "color 0.3s" }}>
                  {svc.label}
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                {SERVICES.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="font-mono" style={{ fontSize: "clamp(5px,0.8vw,5px)", fontWeight: 700, width: 12, flexShrink: 0, color: i === heroCur ? AZURE : "rgba(160,180,208,.6)" }}>
                      {s.tag}
                    </span>
                    <div style={{ flex: 1 }}>
                      {i === heroCur ? (
                        <HeroProgressBar duration={HERO_DURATION} running={!paused} onComplete={heroNext} key={`progress-${heroCur}`} />
                      ) : (
                        <div style={{ height: 1, borderRadius: 1, background: i < heroCur ? navPast : navFuture, transition: "background 0.3s" }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { fn: heroPrev, d: "M14 6L8 12l6 6", label: "Previous" },
                  { fn: heroNext, d: "M10 6l6 6-6 6", label: "Next" },
                ].map(({ fn, d, label }, i) => (
                  <button key={i} onClick={fn} aria-label={label} style={{ width: "clamp(20px,2.5vw,24px)", height: "clamp(20px,2.5vw,24px)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${borderColor}`, transition: "border-color 0.3s" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d={d} stroke={textSecondary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
                <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"} style={{ width: "clamp(20px,2.5vw,24px)", height: "clamp(20px,2.5vw,24px)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${borderColor}`, color: textSecondary, fontSize: "clamp(8px,1vw,10px)", transition: "border-color 0.3s, color 0.3s" }}>
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
