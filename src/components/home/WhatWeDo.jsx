import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const AZURE = "#1980c2";
const AZURE_DARK = "#0f4f7a";
const AZURE_LIGHT = "#3da0e4";
const INK = "#181817";

const N = {
  50: "#f5f5f5",
  100: "#e0e0e0",
  200: "#c2c2c2",
  300: "#a3a3a3",
  600: "#4d4d4d",
  800: "#2a2a28",
  900: "#181817",
};

// ─── SERVICES (for HeroView) ──────────────────────────────────────────────────
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
  closing:
    "We don't just deliver projects, we create systems that help organizations grow stronger, operate better, and perform over time.",
  cta: "Work With Us Today",
};

// ─── STAGE TIMINGS ────────────────────────────────────────────────────────────
const S1_DUR = 3200;
const S2_DUR = 2000;
const S3_DUR = 6000;
const S4_DUR = 120000;
const LOADING_DUR = S1_DUR + S2_DUR + S3_DUR;
const TOTAL_DUR = LOADING_DUR + S4_DUR;
const LOOP_PAUSE = 900;

// ─── BLINK KEYFRAMES ──────────────────────────────────────────────────────────
const BLINK_CSS = `
@keyframes _madBlink{0%,100%{opacity:.18}50%{opacity:.85}}
._mb{animation:_madBlink 1.1s ease-in-out infinite}
._mb:nth-child(2){animation-delay:.22s}
._mb:nth-child(3){animation-delay:.44s}
`;
function injectBlink() {
  if (
    typeof document === "undefined" ||
    document.getElementById("_mad-blink-lm")
  )
    return;
  const s = document.createElement("style");
  s.id = "_mad-blink-lm";
  s.textContent = BLINK_CSS;
  document.head.appendChild(s);
}

// ════════════════════════════════════════════════════════════════
// HERO PROGRESS BAR
// ════════════════════════════════════════════════════════════════
function HeroProgressBar({ duration, running, onComplete }) {
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.width = "0%";
    if (!running) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(((ts - start) / duration) * 100, 100);
      el.style.width = `${p}%`;
      if (p < 100) rafRef.current = requestAnimationFrame(step);
      else onComplete();
    };
    const id = requestAnimationFrame(() => {
      el.style.transition = `width ${duration}ms linear`;
      rafRef.current = requestAnimationFrame(step);
    });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(rafRef.current);
    };
  }, [running, duration, onComplete]);

  return (
    <div
      className="w-full h-px rounded"
      style={{ background: "rgba(0,0,0,.1)" }}
    >
      <div
        ref={fillRef}
        className="h-full rounded w-0"
        style={{ background: AZURE }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO VIEW — preserved exactly from original
// ════════════════════════════════════════════════════════════════
function HeroView() {
  const [heroCur, setHeroCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const HERO_DURATION = 5500;
  const heroNext = useCallback(
    () => setHeroCur((c) => (c + 1) % SERVICES.length),
    [],
  );
  const heroPrev = useCallback(
    () => setHeroCur((c) => (c - 1 + SERVICES.length) % SERVICES.length),
    [],
  );
  const svc = SERVICES[heroCur];

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ padding: "0 4px 4px" }}
    >
      <div className="px-6 pt-20 pb-5 shrink-0">
        <p
          className="text-[9px] font-bold tracking-[0.28em] uppercase mb-2 m-0 font-mono"
          style={{ color: "rgba(10,22,40,.45)" }}
        >
          {SECTION_COPY.eyebrow}
        </p>
        <h2
          className="leading-none m-0 mb-3 font-display"
          style={{
            fontSize: "clamp(24px,3vw,42px)",
            color: "#0a1628",
          }}
        >
          {SECTION_COPY.header}
        </h2>
        <p
          className="text-xs leading-relaxed m-0 max-w-2xl font-sans"
          style={{ color: "rgba(10,22,40,.58)" }}
        >
          {SECTION_COPY.supporting}
        </p>
      </div>

      <div
        className="flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 0.67fr",
          gap: 4,
          padding: "0 4px 4px",
        }}
      >
        {/* Large left */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{ gridRow: "1/3" }}
        >
          {SERVICES.map((s, i) => (
            <img
              key={i}
              src={s.wide}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === heroCur ? 1 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.38) 52%,rgba(0,0,0,.08) 100%)",
            }}
          />
          <div className="absolute bottom-6 left-0 right-0 px-5">
            <button
              className="text-white font-sans rounded-full font-bold tracking-wider uppercase cursor-pointer px-5 py-2 border border-white/30 text-[9px]"
              style={{
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {SECTION_COPY.cta}
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex font-mono items-center px-2.5 py-1 rounded-full font-bold uppercase text-[7px] tracking-[0.28em]"
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
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{
                opacity: i === heroCur ? 1 : 0,
                objectPosition: "center 40%",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl md:text-3xl font-display font-bold tracking-[-0.04em]">
                MAD
              </span>
              <span className="text-white/40 font-light text-xl">×</span>
              <span
                className="text-white font-black tracking-wider uppercase text-lg md:text-xl font-sans"
                style={{}}
              >
                {svc.shortTag}
              </span>
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-1.5">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroCur(i)}
                className="rounded-full cursor-pointer transition-all duration-300 w-5 h-5"
                style={{
                  border: `1.5px solid ${i === heroCur ? "#fff" : "rgba(255,255,255,.28)"}`,
                  background: i === heroCur ? "#fff" : "transparent",
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
            className="relative overflow-hidden rounded-sm flex flex-col justify-between p-4"
            style={{
              background: "linear-gradient(145deg,#ffffff,#dbeeff 80%,#b3d8f5)",
              border: `1px solid #b3cbf0`,
            }}
          >
            <div>
              <p
                className="text-[6px] tracking-[0.25em] uppercase mb-2 m-0 font-mono"
                style={{ color: AZURE }}
              >
                Core Value
              </p>
              <h3
                className="leading-tight mb-2 text-base"
                style={{
                  color: "#0a1e40",
                }}
              >
                Growth needs balance.
              </h3>
              <p
                className="text-[8px] leading-relaxed m-0 font-sans"
                style={{ color: "rgba(10,30,64,.62)" }}
              >
                {SECTION_COPY.core}
              </p>
            </div>
            <button
              className="self-start mt-2 px-4 py-1.5  font-sans rounded-full text-[7px] font-bold tracking-widest uppercase text-white border-none cursor-pointer"
              style={{ background: AZURE }}
            >
              {SECTION_COPY.cta} →
            </button>
          </div>

          <div
            className="rounded-sm p-3 flex flex-col justify-between"
            style={{ background: "#ffffff", border: `1px solid #d4dff0` }}
          >
            <div>
              <div
                className="rounded-sm p-2 mb-2"
                style={{ border: `2px solid #0a1e40` }}
              >
                <div
                  className="font-black leading-tight tracking-tight text-xs font-sans"
                  style={{ color: "#0a1e40" }}
                >
                  {svc.label}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-1.5 mb-2">
                {SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="text-[5px] font-bold w-3 shrink-0 font-mono"
                      style={{
                        color: i === heroCur ? AZURE : "#a0b4d0",
                      }}
                    >
                      {s.tag}
                    </span>
                    <div className="flex-1">
                      {i === heroCur ? (
                        <HeroProgressBar
                          duration={HERO_DURATION}
                          running={!paused}
                          onComplete={heroNext}
                        />
                      ) : (
                        <div
                          className="h-px rounded"
                          style={{
                            background: i < heroCur ? "#7090b8" : "#d4dff0",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                {[
                  { fn: heroPrev, d: "M14 6L8 12l6 6" },
                  { fn: heroNext, d: "M10 6l6 6-6 6" },
                ].map(({ fn, d }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center bg-transparent"
                    style={{ border: `1px solid #c0cedf` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d={d}
                        stroke="#4a6080"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center bg-transparent text-[10px]"
                  style={{ border: `1px solid #c0cedf`, color: "#4a6080" }}
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SHARED ATOMS (light-mode)
// ════════════════════════════════════════════════════════════════

function Chip({ label }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 px-4 pt-3.5 pb-8"
      style={{
        background:
          "linear-gradient(to bottom,rgba(245,245,245,0.97) 0%,transparent 100%)",
      }}
    >
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono"
        style={{
          fontSize: 9,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: N[600],
          border: `1px solid ${N[100]}`,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="inline-block rounded-full"
          style={{ width: 5, height: 5, background: AZURE }}
        />
        {label}
      </span>
    </div>
  );
}

function DeliveredBadge({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-4 right-4"
      style={{
        bottom: 22,
        background: "rgba(255,255,255,0.13)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.28)",
        borderRadius: 14,
        padding: "13px 16px",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,.52)",

          letterSpacing: ".18em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {eyebrow}
      </div>
      <div className="font-sans" style={{ fontSize: 15, color: "#fff" }}>
        {title}
      </div>
    </motion.div>
  );
}

function CoverImage({ src, alt, children }) {
  return (
    <>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
            "linear-gradient(to top,rgba(0,0,0,.76) 0%,rgba(0,0,0,.1) 52%,transparent 100%)",
        }}
      />
      {children}
    </>
  );
}

function WFBrowser({ children }) {
  return (
    <div
      className="absolute top-7 left-4 right-4 bottom-0 overflow-hidden rounded-t-xl"
      style={{ background: "#f8f8f6", border: "1px solid rgba(0,0,0,.12)" }}
    >
      <div
        className="h-7 flex items-center px-2.5 gap-1.5"
        style={{
          background: "#e8e8e6",
          borderBottom: "1px solid rgba(0,0,0,.08)",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            className="w-2 h-2 rounded-full"
            style={{ background: c }}
          />
        ))}
        <div
          className="flex-1 h-3.5 rounded mx-2"
          style={{ background: "#d8d8d6" }}
        />
      </div>
      {children}
    </div>
  );
}

function Shimmer({ delay = 0, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "linear-gradient(135deg,#dbeeff,#c0d8f0)" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.8, repeat: Infinity, delay, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
        }}
      />
    </div>
  );
}

function RequestBubble({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "54px 20px 24px",
        gap: 7,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: -8, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 60,
          left: 18,
          width: 118,
          height: 76,
          borderRadius: 10,
          background: "#fff",
          border: `1px solid ${N[100]}`,
          boxShadow: "0 4px 18px rgba(0,0,0,.07)",
          padding: "10px 12px",
          overflow: "hidden",
        }}
      >
        {[28, 14, 20, 10].map((w, i) => (
          <div
            key={i}
            style={{
              height: 5,
              width: `${w}%`,
              borderRadius: 2,
              background: i === 0 ? N[200] : N[100],
              marginBottom: 5,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans"
        style={{
          background: "rgba(26,26,24,.93)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "18px 18px 4px 18px",
          padding: "15px 17px",
          maxWidth: 255,
          fontSize: 13,
          lineHeight: 1.65,
          color: "#f0ede8",
          boxShadow: "0 2px 20px rgba(0,0,0,.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {text}
      </motion.div>
      <span
        className="font-mono"
        style={{
          fontSize: 9.5,

          color: "rgba(255,255,255,.35)",
          letterSpacing: ".05em",
        }}
      >
        you · just now
      </span>
    </div>
  );
}

function ProcessingStage({ icon, label, chipLabel }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "#f5f5f3",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: 16, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 56,
          right: 16,
          width: 94,
          borderRadius: 10,
          background: "#fff",
          border: `1px solid ${N[100]}`,
          padding: "9px 11px",
          boxShadow: "0 3px 14px rgba(0,0,0,.06)",
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 7,
            color: N[300],

            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 7,
          }}
        >
          Status
        </div>
        {["Layout", "Assets", "Copy"].map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: i === 0 ? AZURE : i === 1 ? N[200] : N[100],
              }}
            />
            <span className="font-sans" style={{ fontSize: 8, color: N[300] }}>
              {l}
            </span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: N[100],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          position: "relative",
          zIndex: 2,
        }}
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        style={{ textAlign: "center", position: "relative", zIndex: 2 }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 10.5,
            color: N[300],

            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {label}
        </div>
        <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="_mb"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: AZURE,
                opacity: 0.6,
                animationDelay: `${i * 0.22}s`,
              }}
            />
          ))}
        </div>
      </motion.div>
      <Chip label={chipLabel} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PER-CARD STAGE CONTENT
// ════════════════════════════════════════════════════════════════

// ── CARD 1 — Product & Digital ────────────────────────────────────
function C1S1() {
  return (
    <div className="absolute inset-0">
      <WFBrowser>
        <div className="p-1.5">
          <Shimmer delay={0} className="h-28 rounded-md relative">
            <div className="absolute inset-0 flex flex-col justify-center p-3.5">
              <div
                className="h-2.5 rounded w-3/5 mb-1.5"
                style={{ background: AZURE, opacity: 0.7 }}
              />
              <div
                className="h-1.5 rounded w-2/5 mb-2.5"
                style={{ background: "rgba(25,128,194,.4)" }}
              />
              <div
                className="h-5 w-16 rounded"
                style={{ background: AZURE, opacity: 0.8 }}
              />
            </div>
          </Shimmer>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-2">
          {[0, 0.4, 0.8].map((d, i) => (
            <div
              key={i}
              className="rounded-md overflow-hidden"
              style={{ background: "#fff", border: `0.5px solid ${N[100]}` }}
            >
              <Shimmer delay={d} className="h-11" />
              <div className="p-1.5">
                <div
                  className="h-1.5 rounded mb-1"
                  style={{ background: N[100], width: "80%" }}
                />
                <div
                  className="h-1.5 rounded w-2/5"
                  style={{ background: AZURE, opacity: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </WFBrowser>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="Product & Digital" />
      <RequestBubble text="Build us a clean e-commerce storefront with a hero carousel and product grid." />
    </div>
  );
}
function C1S3() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#fff" }}
    >
      <div
        className="h-8 flex items-center px-2.5 justify-between"
        style={{ borderBottom: `0.5px solid #e8e8e6` }}
      >
        <span className="font-sans" style={{ fontSize: 11, color: INK }}>
          STRKT
        </span>
        <div className="flex gap-2">
          {["Shop", "Drops", "About"].map((n) => (
            <span
              key={n}
              className="font-sans"
              style={{ fontSize: 7.5, color: "#aaa" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <div
        className="flex items-center px-3.5 gap-2.5 relative overflow-hidden"
        style={{
          height: 112,
          background: "linear-gradient(135deg,#0f1a2c,#1a3050)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: -20,
            right: -20,
            width: 112,
            height: 112,
            background:
              "radial-gradient(circle,rgba(25,128,194,.3),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="flex-1">
          <div
            className="font-sans"
            style={{
              fontSize: 12,

              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 4,
            }}
          >
            Wear what
            <br />
            you mean.
          </div>
          <div
            style={{
              fontSize: 8,
              color: "rgba(255,255,255,.5)",
              marginBottom: 8,
            }}
          >
            Limited drops, weekly.
          </div>
          <div
            style={{
              display: "inline-block",
              fontSize: 7,

              padding: "4px 10px",
              borderRadius: 4,
              background: AZURE,
              color: "#fff",
            }}
          >
            Shop now →
          </div>
        </div>
        <div
          className="rounded-md flex-shrink-0"
          style={{
            width: 56,
            height: 80,
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.15)",
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {[
          ["Cargo Tee", "$48", "👕", "#0f2a4a,#1a3a5c"],
          ["Wide Hoodie", "$90", "🧥", "#1a2030,#253040"],
          ["Track Pant", "$72", "👖", "#0a1520,#152030"],
        ].map(([nm, pr, ic, gr]) => (
          <div
            key={nm}
            className="rounded-md overflow-hidden"
            style={{ background: "#f8f8f6", border: `0.5px solid #e8e8e6` }}
          >
            <div
              className="flex items-center justify-center text-lg"
              style={{
                height: 52,
                background: `linear-gradient(135deg,${gr})`,
              }}
            >
              {ic}
            </div>
            <div className="p-1.5">
              <div style={{ fontSize: 7, color: "#aaa" }}>{nm}</div>
              <div style={{ fontSize: 9, color: AZURE }}>{pr}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex gap-6 justify-center"
        style={{
          paddingTop: 6,
          paddingBottom: 6,
          borderTop: "0.5px solid #f0f0f0",
        }}
      >
        {[
          ["98", "Perf"],
          ["1.2s", "Load"],
          ["4.9★", "Rating"],
        ].map(([v, l]) => (
          <div key={l} className="text-center">
            <div style={{ fontSize: 13, color: AZURE }}>{v}</div>
            <div style={{ fontSize: 7, color: "#aaa" }}>{l}</div>
          </div>
        ))}
      </div>
      <div
        className="absolute flex items-center gap-1.5 rounded-full"
        style={{
          bottom: 18,
          right: 14,
          padding: "5px 12px",
          background: INK,
          color: "#fff",
          fontSize: 8.5,
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 6, height: 6, background: AZURE }}
        />
        Live &amp; converting
      </div>
      <Chip label="Product & Digital" />
    </div>
  );
}
function C1S4() {
  return (
    <CoverImage src="/flier/image6.png" alt="Product & Digital">
      <Chip label="Product & Digital" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Product &amp; Digital
          </div>
          <div
            lassName="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ── CARD 2 — Marketing & Comms ────────────────────────────────────
function C2S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: "#fff" }}>
        <div
          className="flex items-center px-3.5 gap-2"
          style={{ height: 44, borderBottom: "0.5px solid #dbdbdb" }}
        >
          <span
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 15,

              color: "#262626",
              flex: 1,
            }}
          >
            Instagram
          </span>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 3,
                background: "#dbdbdb",
              }}
            />
          ))}
        </div>
        <div
          className="flex items-center px-3.5 py-3 gap-2.5"
          style={{ borderBottom: "0.5px solid #f0f0f0" }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center text-sm font-black text-white rounded-full"
            style={{
              width: 44,
              height: 44,
              background:
                "linear-gradient(135deg,#f09433,#e65e25,#dc2743,#cc2366,#bc1888)",
            }}
          >
            M
          </div>
          <div className="flex-1">
            <div style={{ fontSize: 11, color: "#262626" }}>mad.studio</div>
            <div style={{ fontSize: 9.5, color: "#8e8e8e" }}>
              @mad.studio · Creative Agency
            </div>
          </div>
          <div
            style={{
              fontSize: 9,

              padding: "5px 14px",
              borderRadius: 6,
              background: AZURE,
              color: "#fff",
            }}
          >
            Follow
          </div>
        </div>
        <div className="flex" style={{ borderBottom: "0.5px solid #f0f0f0" }}>
          {[
            ["48", "posts"],
            ["24.8K", "followers"],
            ["4.2%", "eng."],
          ].map(([n, l]) => (
            <div key={l} className="flex-1 text-center py-2">
              <div style={{ fontSize: 12, color: "#262626" }}>{n}</div>
              <div style={{ fontSize: 8, color: "#8e8e8e" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {[
            [AZURE, "Brand"],
            [INK, "Launch"],
            [AZURE_LIGHT, "Web"],
            ["#f0f0ee", "MAD"],
            [AZURE_DARK, "Identity"],
            ["#e8e8e4", "Campaign"],
          ].map(([bg, lbl], i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center text-[8px] font-extrabold"
              style={{ background: bg, color: "#fff" }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="Marketing & Comms" />
      <RequestBubble text="Create a social media content calendar for our spring product launch." />
    </div>
  );
}
function C2S3() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#fff" }}
    >
      <div
        className="flex items-center px-3"
        style={{
          height: 40,
          borderBottom: "0.5px solid #dbdbdb",
          background: "#fafafa",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 14,

            color: "#262626",
            flex: 1,
          }}
        >
          Instagram
        </span>
      </div>
      <div style={{ borderBottom: "0.5px solid #f0f0f0" }}>
        <div className="flex items-center px-3 py-2 gap-2">
          <div
            className="rounded-full flex-shrink-0"
            style={{
              width: 26,
              height: 26,
              background: "linear-gradient(135deg,#f09433,#dc2743)",
            }}
          />
          <span style={{ fontSize: 10, color: "#262626", flex: 1 }}>
            mad.studio
          </span>
        </div>
        <div
          className="flex items-center justify-center relative overflow-hidden"
          style={{
            height: 160,
            background: `linear-gradient(135deg,${AZURE},${AZURE_DARK})`,
          }}
        >
          <div
            className="font-sans"
            style={{
              fontSize: 18,

              color: "#fff",
              textAlign: "center",
              lineHeight: 1.1,
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
          className="px-3 py-1.5"
          style={{ fontSize: 8.5, color: "#262626", lineHeight: 1.5 }}
        >
          <strong>mad.studio</strong> Campaigns that connect — content built to
          reach the right people at the right time.
        </div>
        <div className="px-3 pb-2 flex gap-1 flex-wrap">
          {["#branding", "#marketing", "#springdrop", "#growth"].map((t) => (
            <span key={t} style={{ fontSize: 8, color: AZURE }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-3">
        {[
          ["Total Reach", "248K", "+38%"],
          ["Conv.", "3.2K", "+52%"],
        ].map(([l, v, d]) => (
          <div
            key={l}
            className="flex-1 rounded-md p-2"
            style={{ background: N[50] }}
          >
            <div style={{ fontSize: 7, color: "#aaa" }}>{l}</div>
            <div style={{ fontSize: 14, color: INK }}>{v}</div>
            <div style={{ fontSize: 8, color: "#22a05a" }}>↑ {d}</div>
          </div>
        ))}
      </div>
      <div
        className="absolute flex items-center gap-1.5 rounded-full"
        style={{
          bottom: 16,
          right: 12,
          padding: "5px 12px",
          background: "rgba(0,0,0,.75)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          fontSize: 8,
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 6, height: 6, background: AZURE }}
        />
        Campaign live
      </div>
      <Chip label="Marketing & Comms" />
    </div>
  );
}
function C2S4() {
  return (
    <CoverImage src="/flier/image4.png" alt="Marketing & Comms">
      <Chip label="Marketing & Comms" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Marketing &amp; Comms
          </div>
          <div
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ── CARD 3 — Brand & Identity ─────────────────────────────────────
function C3S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: "#f8f7f5" }}>
        <div
          className="flex items-center px-3 gap-2"
          style={{
            height: 36,
            background: "#fff",
            borderBottom: `0.5px solid ${N[100]}`,
          }}
        >
          <span style={{ fontSize: 11, color: INK }}>
            M<span style={{ color: AZURE }}>A</span>D Brand Studio
          </span>
        </div>
        <div
          className="flex"
          style={{
            height: 28,
            background: "#fff",
            borderBottom: `1px solid ${N[100]}`,
          }}
        >
          {["Colours", "Typography", "Components"].map((t, i) => (
            <div
              key={t}
              className="flex items-center px-3"
              style={{
                fontSize: 8,

                color: i === 0 ? AZURE : "#aaa",
                borderBottom:
                  i === 0 ? `2px solid ${AZURE}` : "2px solid transparent",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="p-2.5">
          <div
            className="flex rounded-lg overflow-hidden mb-2"
            style={{ height: 64, boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}
          >
            {[
              [AZURE, "Azure", "rgba(255,255,255,.7)"],
              [INK, "Onyx", "rgba(255,255,255,.7)"],
              ["#fff", "White", "#aaa"],
              [AZURE_DARK, "Deep", "rgba(255,255,255,.7)"],
              [AZURE_LIGHT, "Sky", "rgba(255,255,255,.7)"],
            ].map(([bg, l, c]) => (
              <div
                key={l}
                className="flex-1 flex items-end justify-center pb-1.5"
                style={{ background: bg }}
              >
                <span style={{ fontSize: 6, color: c }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="Brand & Identity" />
      <RequestBubble text="Design a bold brand identity system with logo, type, and a colour palette." />
    </div>
  );
}
function C3S3() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div
        className="flex flex-col items-center justify-center gap-2.5 relative overflow-hidden"
        style={{
          height: "55%",
          background:
            "linear-gradient(160deg,#0a1628,#0f2a4a 60%,rgba(25,128,194,.5) 100%)",
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: -30,
            right: -30,
            width: 160,
            height: 160,
            background:
              "radial-gradient(circle,rgba(25,128,194,.25),transparent 65%)",
          }}
        />
        <div className="flex items-center gap-2.5 relative z-10">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{ width: 40, height: 40, background: AZURE }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <polygon
                points="11,1 21,7 21,15 11,21 1,15 1,7"
                fill="white"
                opacity=".9"
              />
            </svg>
          </div>
          <span
            className="font-sans"
            style={{
              fontSize: 28,

              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            M<span style={{ color: AZURE_LIGHT }}>AD</span>
          </span>
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: 9,
            letterSpacing: ".2em",
            textTransform: "uppercase",

            color: "rgba(255,255,255,.4)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Identity System · 2025
        </div>
        <div
          className="flex rounded-lg overflow-hidden relative z-10"
          style={{ width: 200 }}
        >
          {[
            [AZURE, "#fff", "MAD"],
            ["#fff", INK, "MAD"],
            [INK, "#fff", "MAD"],
          ].map(([bg, color, lbl], i) => (
            <div
              key={i}
              className="flex-1 flex items-center justify-center py-1.5 font-sans"
              style={{
                background: bg,
                color,

                fontSize: 10,
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex-1 flex flex-col gap-2 p-3"
        style={{ background: "#fff" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[AZURE, INK, "#fff", AZURE_DARK, AZURE_LIGHT].map((c, i) => (
              <div
                key={i}
                className="rounded-md"
                style={{
                  width: 20,
                  height: 20,
                  background: c,
                  boxShadow: "0 1px 4px rgba(0,0,0,.12)",
                  border: c === "#fff" ? `0.5px solid ${N[100]}` : "none",
                }}
              />
            ))}
          </div>
          <div style={{ marginLeft: 8 }}>
            <div style={{ fontSize: 8, color: INK }}>Azure Blue</div>
            <div className="font-mono" style={{ fontSize: 7, color: "#aaa" }}>
              #1980c2 · Primary
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute flex items-center gap-1.5 rounded-full z-10"
        style={{
          bottom: 16,
          right: 12,
          padding: "5px 12px",
          background: INK,
          color: "#fff",
          fontSize: 8,
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 6, height: 6, background: AZURE }}
        />
        Brand system complete
      </div>
      <Chip label="Brand & Identity" />
    </div>
  );
}
function C3S4() {
  return (
    <CoverImage src="/flier/image10.png" alt="Brand & Identity">
      <Chip label="Brand & Identity" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Brand &amp; Identity
          </div>
          <div
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ── CARD 4 — E-Commerce ───────────────────────────────────────────
function C4S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: "#f8f8f6" }}>
        <WFBrowser>
          <div />
        </WFBrowser>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="E-Commerce" />
      <RequestBubble text="Set up a Shopify store with custom checkout and Spring drop landing pages." />
    </div>
  );
}
function C4S3() {
  return (
    <div className="absolute inset-0 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg,${AZURE_DARK},${AZURE})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.18) 52%,rgba(0,0,0,.05) 100%)",
        }}
      />
      <DeliveredBadge eyebrow="Delivered" title="Store live · converting" />
      <Chip label="E-Commerce" />
    </div>
  );
}
function C4S4() {
  return (
    <CoverImage src="/flier/image6.png" alt="E-Commerce">
      <Chip label="E-Commerce" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            E-Commerce
          </div>
          <div
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ── CARD 5 — Campaign Analytics ───────────────────────────────────
function C5S1() {
  return (
    <div className="absolute inset-0" style={{ background: "#0d1117" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="Campaign Analytics" />
      <RequestBubble text="Build a real-time dashboard showing ROAS, reach, CPA, and conversions." />
    </div>
  );
}
function C5S3() {
  return (
    <div
      className="absolute inset-0 flex flex-col p-3.5"
      style={{ background: "#0d1117" }}
    >
      <div className="flex justify-between items-center mb-3 font-sans">
        <span
          style={{
            fontSize: 12,

            color: "#fff",
          }}
        >
          Live Dashboard
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 8,
            color: "rgba(255,255,255,.3)",
          }}
        >
          Real-time · May 2025
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        {[
          ["ROAS", "6.4×", "↑ Strong"],
          ["Reach", "248K", "↑ +38%"],
          ["Conv.", "3.2K", "↑ +52%"],
        ].map(([l, v, d]) => (
          <div
            key={l}
            className="rounded-lg p-2"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "0.5px solid rgba(255,255,255,.07)",
            }}
          >
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.35)",
                marginBottom: 2,
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 15,

                color: "#fff",
                lineHeight: 1,
              }}
            >
              {v}
            </div>
            <div style={{ fontSize: 8, color: "#22a05a" }}>{d}</div>
          </div>
        ))}
      </div>
      <div
        className="rounded-lg flex items-center justify-between p-2.5"
        style={{
          background: `rgba(25,128,194,.15)`,
          border: `0.5px solid rgba(25,128,194,.3)`,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,.5)",

            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}
        >
          ROAS · Campaign total
        </div>
        <div
          className="font-sans"
          style={{
            fontSize: 22,

            color: AZURE,
          }}
        >
          6.4×
        </div>
      </div>
      <Chip label="Campaign Analytics" />
    </div>
  );
}
function C5S4() {
  return (
    <CoverImage src="/flier/image5.png" alt="Campaign Analytics">
      <Chip label="Campaign Analytics" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Campaign Analytics
          </div>
          <div
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ── CARD 6 — Illustration ─────────────────────────────────────────
function C6S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: "#1a1a18" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(15,15,14,.25) 0%,rgba(15,15,14,.6) 60%,rgba(15,15,14,.85) 100%)",
        }}
      />
      <Chip label="Illustration" />
      <RequestBubble text="Create a 4-panel editorial comic for our product launch announcement." />
    </div>
  );
}
function C6S3() {
  return (
    <div
      className="absolute inset-0 relative overflow-hidden"
      style={{ background: "#1a1a18" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.18) 52%,rgba(0,0,0,.05) 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-1.5 p-6" style={{ width: "88%" }}>
          {["✏️", "🎨", "🖼️", "✨"].map((icon, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "0.5px solid rgba(255,255,255,.1)",
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      <DeliveredBadge eyebrow="Delivered" title="Illustration pack ready" />
      <Chip label="Illustration" />
    </div>
  );
}
function C6S4() {
  return (
    <CoverImage src="/flier/image8.png" alt="Illustration">
      <Chip label="Illustration" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute flex items-end justify-between"
        style={{ bottom: 22, left: 18, right: 18 }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.38)",

              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            Illustration
          </div>
          <div
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: 22,

              color: "rgba(255,255,255,.88)",

              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
        <div
          className="rounded-full"
          style={{ width: 8, height: 8, background: AZURE, marginBottom: 4 }}
        />
      </motion.div>
    </CoverImage>
  );
}

// ─── CARD CONFIG ──────────────────────────────────────────────────────────────
const CARD_CONFIGS = [
  {
    id: "c1",
    title: "Product & Digital",
    sub: "Websites, apps, and digital platforms built to perform and scale.",
    icon: "🖥️",
    procLabel: "Generating layout & components",
    chipLabel: "Product & Digital",
    S1: C1S1,
    S3: C1S3,
    S4: C1S4,
  },
  {
    id: "c2",
    title: "Marketing & Comms",
    sub: "Campaigns and content systems that connect brands with the right audience.",
    icon: "📣",
    procLabel: "Planning campaign structure",
    chipLabel: "Marketing & Comms",
    S1: C2S1,
    S3: C2S3,
    S4: C2S4,
  },
  {
    id: "c3",
    title: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity to every touchpoint.",
    icon: "🎨",
    procLabel: "Building identity system",
    chipLabel: "Brand & Identity",
    S1: C3S1,
    S3: C3S3,
    S4: C3S4,
  },
  {
    id: "c4",
    title: "E-Commerce",
    sub: "Shopify and Next.js stores optimised to convert from day one.",
    icon: "🛍️",
    procLabel: "Configuring store & flows",
    chipLabel: "E-Commerce",
    S1: C4S1,
    S3: C4S3,
    S4: C4S4,
  },
  {
    id: "c5",
    title: "Campaign Analytics",
    sub: "Live dashboards, KPI benchmarks, and weekly insight reports.",
    icon: "📊",
    procLabel: "Wiring up live data feeds",
    chipLabel: "Campaign Analytics",
    S1: C5S1,
    S3: C5S3,
    S4: C5S4,
  },
  {
    id: "c6",
    title: "Illustration",
    sub: "Editorial illustration, comics, and icon systems for campaigns and brand.",
    icon: "✏️",
    procLabel: "Rendering illustrations",
    chipLabel: "Illustration",
    S1: C6S1,
    S3: C6S3,
    S4: C6S4,
  },
];

// ════════════════════════════════════════════════════════════════
// SERVICE CARD — 4-stage rAF cycle
// ════════════════════════════════════════════════════════════════
function ServiceCard({ config, startDelay, isActive }) {
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
    let startTs = null;

    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const el = ts - startTs;
      const pct = Math.min(100, (el / LOADING_DUR) * 100);
      if (pf) pf.style.width = `${pct}%`;

      if (el < S1_DUR) setStage(0);
      else if (el < S1_DUR + S2_DUR) setStage(1);
      else if (el < LOADING_DUR) setStage(2);
      else setStage(3);

      if (el < TOTAL_DUR) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(runCycle, LOOP_PAUSE);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    injectBlink();
    const t = setTimeout(runCycle, startDelay);
    return () => {
      clearTimeout(t);
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [runCycle, startDelay]);

  const { S1, S3, S4, icon, procLabel, chipLabel, title, sub } = config;

  return (
    <div
      className="flex-shrink-0 flex flex-col gap-3.5 relative"
      style={{ width: 340, paddingBottom: 10, paddingRight: 10 }}
    >
      {/* Depth stack — light-mode surfaces */}
      <div
        className="absolute rounded-[22px]"
        style={{
          top: 12,
          left: 12,
          right: 0,
          height: 490,
          background: "rgba(0,0,0,0.04)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute rounded-[22px]"
        style={{
          top: 6,
          left: 6,
          right: -6,
          height: 490,
          background: "rgba(0,0,0,0.03)",
          border: `1px solid ${N[100]}`,
          zIndex: 1,
        }}
      />

      {/* Main card */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: 490,
          borderRadius: 22,
          zIndex: 2,
          background: "#f5f5f3",
          border: `1px solid ${N[100]}`,
          boxShadow: isActive
            ? "0 16px 48px rgba(0,0,0,.13), 0 2px 8px rgba(0,0,0,.06)"
            : "0 4px 16px rgba(0,0,0,.07)",
          transition: "box-shadow .5s ease",
        }}
      >
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="s1"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            >
              <S1 />
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div
              key="s2"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProcessingStage
                icon={icon}
                label={procLabel}
                chipLabel={chipLabel}
              />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="s3"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <S3 />
            </motion.div>
          )}
          {stage === 3 && (
            <motion.div
              key="s4"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <S4 />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play button */}
        <div
          className="absolute z-40 pointer-events-none"
          style={{ top: 58, right: 16 }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,.18)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,.3)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.25)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              style={{ marginLeft: 2 }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Stage dots */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex gap-1.5 z-30"
          style={{ bottom: 16 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                width: i === stage ? 14 : 5,
                background:
                  i === stage
                    ? "rgba(255,255,255,.85)"
                    : "rgba(255,255,255,.22)",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 6, borderRadius: 3 }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30"
          style={{ height: 3, background: "rgba(0,0,0,.06)" }}
        >
          <div
            ref={fillRef}
            style={{
              height: "100%",
              width: "0%",
              background: AZURE,
              opacity: 0.75,
              transition: "none",
            }}
          />
        </div>
      </div>

      {/* Meta label */}
      <div
        className="px-1"
        style={{
          opacity: isActive ? 1 : 0.45,
          transform: isActive ? "translateY(0)" : "translateY(4px)",
          transition: "opacity .45s ease,transform .45s ease",
        }}
      >
        <div
          lassName="font-display font-bold tracking-[-0.04em]"
          style={{
            fontSize: 19,
            color: "#0f172a",
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          className="font-sans"
          style={{
            fontSize: 11.5,
            color: "rgba(15,23,42,.55)",
            lineHeight: 1.65,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SERVICES IN MOTION — light mode, scroll-driven strip
// ════════════════════════════════════════════════════════════════
function ServicesInMotion({ scrollProgress }) {
  const CARD_W = 340;
  const CARD_GAP = 24;
  const VISIBLE = 3.2;
  const STEP = CARD_W + CARD_GAP;

  const simProgress = Math.min(1, Math.max(0, (scrollProgress - 0.52) / 0.48));
  const maxScroll = (CARD_CONFIGS.length - VISIBLE) * STEP;
  const translateX = -(simProgress * maxScroll);
  const activeIndex = Math.round(
    simProgress / (1 / (CARD_CONFIGS.length - Math.floor(VISIBLE))),
  );

  const [active, setActive] = useState(0);
  const wheelAcc = useRef(0);

  const maxOff = (CARD_CONFIGS.length - VISIBLE) * STEP;
  const manualOffset = Math.min(active * STEP, maxOff);
  const finalTranslateX = translateX !== 0 ? translateX : -manualOffset;
  const finalActive = translateX !== 0 ? activeIndex : active;

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    wheelAcc.current += e.deltaY;
    if (wheelAcc.current > 80) {
      setActive((a) => Math.min(CARD_CONFIGS.length - 1, a + 1));
      wheelAcc.current = 0;
    } else if (wheelAcc.current < -80) {
      setActive((a) => Math.max(0, a - 1));
      wheelAcc.current = 0;
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header — light mode text */}
      <div
        style={{
          padding: "90px 48px 40px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <p
            className="font-mono"
            style={{
              margin: "0 0 8px",

              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(15,23,42,.42)",
            }}
          >
            Services in motion &nbsp;·&nbsp; scroll to explore
          </p>
          <h2
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              margin: 0,

              fontSize: "clamp(28px,3vw,38px)",
              color: "#020617",
              lineHeight: 1.05,
            }}
          >
            Systems for growth.
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
              fn: () =>
                setActive((a) => Math.min(CARD_CONFIGS.length - 1, a + 1)),
            },
          ].map(({ d, fn }, i) => (
            <button
              key={i}
              onClick={fn}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "transparent",
                border: "1px solid rgba(15,23,42,.14)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(15,23,42,.5)"
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
        style={{ flex: 1, overflow: "hidden", paddingLeft: 48 }}
        onWheel={handleWheel}
      >
        <motion.div
          style={{
            display: "flex",
            gap: CARD_GAP,
            height: "100%",
            alignItems: "flex-start",
            paddingTop: 6,
            paddingBottom: 4,
          }}
          animate={{ x: finalTranslateX }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {CARD_CONFIGS.map((cfg, i) => (
            <ServiceCard
              key={cfg.id}
              config={cfg}
              isActive={i === finalActive}
              startDelay={i * 650}
            />
          ))}
        </motion.div>
      </div>

      {/* Progress dots — light mode */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 20,
          paddingTop: 10,
          gap: 8,
          flexShrink: 0,
        }}
      >
        {CARD_CONFIGS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{
              width: i === finalActive ? 18 : 6,
              background:
                i === finalActive ? "rgba(15,23,42,.55)" : "rgba(15,23,42,.18)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: 6,
              borderRadius: 3,
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
export default function WhatWeDo() {
  const wrapRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      setScrollProgress(Math.min(1, Math.max(0, -rect.top / total)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Hero fades out and scales down as user scrolls
  const heroOpacity = Math.min(
    1,
    Math.max(0, 1 - (scrollProgress - 0.38) / 0.1),
  );
  const heroScale = 0.93 + heroOpacity * 0.07;
  const heroY = (1 - heroOpacity) * -40;
  const heroVisible = heroOpacity > 0.01;

  // ServicesInMotion fades up as Hero fades out
  const simOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.42) / 0.1));
  const simY = (1 - simOpacity) * 50;
  const simVisible = simOpacity > 0.01;

  // Background stays light (eef7fd) throughout — no dark mode shift
  const bgColor = "#eef7fd";

  return (
    <section
      ref={wrapRef}
      id="services"
      className="relative"
      style={{ height: "420vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: bgColor }}
      >
        {/* Subtle grain */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* VIEW 1: HERO — always light mode */}
        {heroVisible && (
          <div
            className="absolute inset-0 z-10"
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale}) translateY(${heroY}px)`,
              transition: "none",
              pointerEvents: heroOpacity > 0.2 ? "auto" : "none",
            }}
          >
            <HeroView />
          </div>
        )}

        {/* VIEW 2: SERVICES IN MOTION — light mode */}
        {simVisible && (
          <div
            className="absolute inset-0 z-20"
            style={{
              opacity: simOpacity,
              transform: `translateY(${simY}px)`,
              transition: "none",
              pointerEvents: simOpacity > 0.2 ? "auto" : "none",
            }}
          >
            <ServicesInMotion scrollProgress={scrollProgress} />
          </div>
        )}

        {/* Scroll cue */}
        <AnimatePresence>
          {scrollProgress > 0.93 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
            >
              <span
                className="text-[8px] tracking-widest uppercase font-mono"
                style={{ color: "rgba(15,23,42,.32)" }}
              >
                Continue scrolling
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.3 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    stroke="rgba(15,23,42,.28)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
