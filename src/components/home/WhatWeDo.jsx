import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ─── FONTS ───────────────────────────────────────────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

const F = {
  serif: "'DM Serif Display', Georgia, serif",
  syne: "'Syne', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

// ─── LOCAL IMAGES ─────────────────────────────────────────────────────────────
const IMG = {
  i1: "/flier/image.png",
  i2: "/flier/image2.png",
  i3: "/flier/image3.png",
  i4: "/flier/image4.png",
  i5: "/flier/image5.png",
  i6: "/flier/image6.png",
  i7: "/flier/image7.png",
  i8: "/flier/image8.png",
  i9: "/flier/image9.png",
};

// ─── BRAND PALETTE ───────────────────────────────────────────────────────────
const AZURE = {
  200: "#b3d8f5",
  300: "#8cc3ef",
  400: "#5aa7e6",
  500: "#1980c2",
  600: "#1468a0",
};
const TANG = "#F26522";

// ─── SERVICES (Hero section) ─────────────────────────────────────────────────
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

const HOLD = 2800;

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
        style={{ background: AZURE[500] }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO SECTION (View 1) — heading/subheading ABOVE the image grid
// ════════════════════════════════════════════════════════════════
function HeroView({ dark }) {
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
      {/* ── HEADING ABOVE GRID ── */}
      <div className="px-6 pt-20 pb-5 shrink-0">
        <p
          className="text-[9px] font-bold tracking-[0.28em] uppercase mb-2 m-0"
          style={{
            color: dark ? "rgba(255,255,255,.35)" : "rgba(10,22,40,.45)",
            fontFamily: F.mono,
          }}
        >
          {SECTION_COPY.eyebrow}
        </p>
        <h2
          className="leading-none m-0 mb-3"
          style={{
            fontFamily: F.serif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 3vw, 42px)",
            color: dark ? "#f0ede8" : "#0a1628",
          }}
        >
          {SECTION_COPY.header}
        </h2>
        <p
          className="text-xs leading-relaxed m-0 max-w-2xl"
          style={{
            color: dark ? "rgba(255,255,255,.5)" : "rgba(10,22,40,.58)",
            fontFamily: F.syne,
          }}
        >
          {SECTION_COPY.supporting}
        </p>
      </div>

      {/* ── IMAGE GRID ── */}
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
        {/* Large left image */}
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
              className="text-white rounded-full font-bold tracking-wider uppercase cursor-pointer px-5 py-2 border border-white/30 text-[9px]"
              style={{
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(8px)",
                fontFamily: F.syne,
              }}
            >
              {SECTION_COPY.cta}
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full font-bold uppercase text-[7px] tracking-[0.28em]"
              style={{
                background: "rgba(0,0,0,.3)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "rgba(255,255,255,.5)",
                backdropFilter: "blur(6px)",
                fontFamily: F.mono,
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
              <span
                className="text-white text-2xl md:text-3xl"
                style={{ fontFamily: F.serif, fontStyle: "italic" }}
              >
                MAD
              </span>
              <span className="text-white/40 font-light text-xl">×</span>
              <span
                className="text-white font-black tracking-wider uppercase text-lg md:text-xl"
                style={{ fontFamily: F.syne }}
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

        {/* Bottom right cards */}
        <div
          className="grid rounded-sm overflow-hidden"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 4 }}
        >
          {/* Core value card */}
          <div
            className="relative overflow-hidden rounded-sm flex flex-col justify-between p-4"
            style={{
              background: dark
                ? "linear-gradient(145deg,#181817,#102535 58%,rgba(25,128,194,.72))"
                : "linear-gradient(145deg,#ffffff,#dbeeff 80%,#b3d8f5)",
              border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#b3cbf0"}`,
            }}
          >
            <div>
              <p
                className="text-[6px] tracking-[0.25em] uppercase mb-2 m-0"
                style={{
                  color: dark ? "#888" : AZURE[500],
                  fontFamily: F.mono,
                }}
              >
                Core Value
              </p>
              <h3
                className="leading-tight mb-2 text-base"
                style={{
                  fontFamily: F.serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: dark ? "#f0ede8" : "#0a1e40",
                }}
              >
                Growth needs balance.
              </h3>
              <p
                className="text-[8px] leading-relaxed m-0"
                style={{
                  color: dark ? "rgba(240,237,232,.58)" : "rgba(10,30,64,.62)",
                  fontFamily: F.syne,
                }}
              >
                {SECTION_COPY.core}
              </p>
            </div>
            <button
              className="self-start mt-2 px-4 py-1.5 rounded-full text-[7px] font-bold tracking-widest uppercase text-white border-none cursor-pointer"
              style={{ background: AZURE[500], fontFamily: F.syne }}
            >
              {SECTION_COPY.cta} →
            </button>
          </div>

          {/* Service info card */}
          <div
            className="rounded-sm p-3 flex flex-col justify-between"
            style={{
              background: dark ? "#1e1e1c" : "#ffffff",
              border: `1px solid ${dark ? "rgba(255,255,255,.06)" : "#d4dff0"}`,
            }}
          >
            <div>
              <div
                className="rounded-sm p-2 mb-2"
                style={{
                  border: `2px solid ${dark ? "rgba(255,255,255,.9)" : "#0a1e40"}`,
                }}
              >
                <div
                  className="font-black leading-tight tracking-tight text-xs"
                  style={{
                    color: dark ? "rgba(255,255,255,.9)" : "#0a1e40",
                    fontFamily: F.syne,
                  }}
                >
                  {svc.label}
                </div>
              </div>
              <p
                className="text-[8px] leading-relaxed mb-2"
                style={{
                  color: dark ? "rgba(255,255,255,.46)" : "rgba(10,30,64,.58)",
                  fontFamily: F.syne,
                }}
              >
                {svc.description}
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-1.5 mb-2">
                {SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="text-[5px] font-bold w-3 shrink-0"
                      style={{
                        color:
                          i === heroCur
                            ? dark
                              ? AZURE[300]
                              : AZURE[500]
                            : dark
                              ? "#d0d0ce"
                              : "#a0b4d0",
                        fontFamily: F.mono,
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
                            background:
                              i < heroCur
                                ? dark
                                  ? "#b0b0ac"
                                  : "#7090b8"
                                : dark
                                  ? "#e8e8e6"
                                  : "#d4dff0",
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
                    style={{
                      border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#c0cedf"}`,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d={d}
                        stroke={dark ? "rgba(240,237,232,.65)" : "#4a6080"}
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
                  style={{
                    border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#c0cedf"}`,
                    color: dark ? "rgba(240,237,232,.65)" : "#4a6080",
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
  );
}

// ════════════════════════════════════════════════════════════════
// SERVICES IN MOTION — JSX port of the HTML carousel
// ════════════════════════════════════════════════════════════════

const SIM_CARDS = [
  {
    color: "#1e1240",
    textColor: "#c4b8f0",
    label: "Product & Digital",
    sub: "Websites, apps, and digital platforms built to perform and scale.",
    stages: [
      {
        type: "browser",
        url: "luxe-studio.co",
        title: "LUXE STUDIO",
        sub: "SS 2025 Collection",
      },
      {
        type: "tweet",
        img: IMG.i4,
        text: "Our SS25 collection is live. Every piece designed to outlast the season.",
        handle: "@luxestudio",
        likes: "2.4K",
      },
    ],
  },
  {
    color: "#0d2b18",
    textColor: "#86d4a4",
    label: "Marketing & Comms",
    sub: "Campaigns and content systems that connect brands with the right audience.",
    stages: [
      { type: "ig", handle: "luxe.studio", followers: "48.2K", posts: "184" },
      {
        type: "tweet",
        img: IMG.i2,
        text: "Great brands don't shout. They show up — consistently, clearly, with intention.",
        handle: "@madagency",
        likes: "5.1K",
      },
    ],
  },
  {
    color: "#1a1a2e",
    textColor: "#a8b4e8",
    label: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity to every touchpoint.",
    stages: [{ type: "brand" }, { type: "palette" }],
  },
  {
    color: "#2a1200",
    textColor: "#e8a870",
    label: "E-Commerce",
    sub: "Shopify and Next.js stores optimised to convert from day one.",
    stages: [
      {
        type: "browser",
        url: "sole-store.co",
        title: "SOLE.",
        sub: "Spring Drop 2025",
      },
      {
        type: "tweet",
        img: IMG.i8,
        text: "Spring Drop is here. Free shipping on all orders this week.",
        handle: "@solestore",
        likes: "3.7K",
      },
    ],
  },
  {
    color: "#0a2828",
    textColor: "#7ad4d4",
    label: "Campaign Analytics",
    sub: "Live dashboards, KPI benchmarks, and weekly insight reports.",
    stages: [
      { type: "dashboard" },
      {
        type: "tweet",
        img: IMG.i6,
        text: "6.4× ROAS. 84K reach. $4.20 CPA. That's what a well-structured campaign looks like.",
        handle: "@madagency",
        likes: "4.2K",
      },
    ],
  },
  {
    color: "#280a1e",
    textColor: "#e89fd4",
    label: "Illustration",
    sub: "Editorial illustration, comics, and icon systems for campaigns.",
    stages: [{ type: "comic" }, { type: "chat" }],
  },
];

// ── Stage sub-components ─────────────────────────────────────────

function SimBrowserStage({ stage }) {
  return (
    <div
      style={{
        background: "#f8f6ff",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: F.syne,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#e8e8e8",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 4,
            padding: "2px 8px",
            fontFamily: F.mono,
            fontSize: 8,
            color: "#666",
            textAlign: "center",
          }}
        >
          {stage.url}
        </div>
      </div>
      {/* Hero banner */}
      <div
        style={{
          background: "#111",
          height: 90,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={IMG.i1}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
            position: "absolute",
            inset: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "12px 14px" }}>
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.5)",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              marginBottom: 4,
              fontFamily: F.mono,
            }}
          >
            New Arrivals
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {stage.title}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.55)",
              marginTop: 2,
            }}
          >
            {stage.sub}
          </div>
        </div>
      </div>
      {/* Product grid */}
      <div
        style={{
          padding: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 6,
        }}
      >
        {[
          { img: IMG.i8, name: "Silk Blazer", price: "$420" },
          { img: IMG.i9, name: "Trench Coat", price: "$510" },
          { img: IMG.i1, name: "Mini Dress", price: "$280" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#f0f0f0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{ height: 55, background: "#e0e0e0", overflow: "hidden" }}
            >
              <img
                src={item.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "5px 6px" }}>
              <div style={{ fontSize: 7, color: "#666" }}>{item.name}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#111" }}>
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimTweetStage({ stage }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <img
        src={stage.img}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(.42)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 55%)",
        }}
      />
      <div style={{ position: "absolute", bottom: 16, left: 14, right: 14 }}>
        <div
          style={{
            background: "rgba(0,0,0,.45)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "#fff",
                fontFamily: F.syne,
              }}
            >
              {stage.handle.charAt(1).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: F.syne,
                  lineHeight: 1,
                }}
              >
                {stage.handle.replace("@", "").toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,.38)",
                  fontFamily: F.mono,
                }}
              >
                {stage.handle}
              </div>
            </div>
            <svg
              style={{ marginLeft: "auto" }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,.3)"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </div>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.88)",
              lineHeight: 1.55,
              margin: "0 0 10px",
              fontFamily: F.syne,
            }}
          >
            {stage.text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,.08)",
              paddingTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.28)",
                fontFamily: F.mono,
              }}
            >
              9:41 AM · 2025
            </span>
            <span
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.38)",
                fontFamily: F.mono,
              }}
            >
              ♥ {stage.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimIgStage() {
  const gridImgs = [IMG.i1, IMG.i2, IMG.i3, IMG.i4, IMG.i5, IMG.i6];
  return (
    <div
      style={{
        background: "#fff",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: F.syne,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderBottom: "1px solid #eee",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>
          luxe.studio
        </span>
        <span style={{ fontSize: 16 }}>≡</span>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(45deg,#f09433,#dc2743,#bc1888)",
              padding: 2,
              flexShrink: 0,
            }}
          >
            <img
              src={IMG.i1}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              ["184", "posts"],
              ["48.2K", "followers"],
              ["312", "following"],
            ].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>
                  {v}
                </div>
                <div style={{ fontSize: 8, color: "#666" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "#000",
            marginBottom: 2,
          }}
        >
          LUXE STUDIO
        </div>
        <div
          style={{
            fontSize: 8,
            color: "#444",
            lineHeight: 1.4,
            marginBottom: 8,
          }}
        >
          Premium editorial fashion. SS25 collection live now.
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: 5,
              borderRadius: 8,
              background: AZURE[500],
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Follow
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: 5,
              borderRadius: 8,
              background: "#f0f0f0",
              fontSize: 9,
              fontWeight: 700,
              color: "#000",
            }}
          >
            Message
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1.5,
          flex: 1,
        }}
      >
        {gridImgs.map((src, i) => (
          <div
            key={i}
            style={{ aspectRatio: "1", overflow: "hidden", background: "#eee" }}
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SimBrandStage() {
  return (
    <div
      style={{
        background: "#0d1117",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: F.syne,
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "rgba(255,255,255,.25)",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontFamily: F.mono,
        }}
      >
        Brand Identity System
      </div>
      <div
        style={{
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 10,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
            <polygon
              points="11,1 21,7 21,15 11,21 1,15 1,7"
              fill="rgba(255,255,255,.9)"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: ".05em",
            }}
          >
            MAD
          </div>
          <div
            style={{
              fontSize: 6,
              color: "rgba(255,255,255,.28)",
              letterSpacing: ".35em",
              fontFamily: F.mono,
            }}
          >
            AGENCY
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[
          ["#0d1117", "#fff", "1px solid rgba(255,255,255,.15)"],
          ["#fff", "#111", "none"],
          [
            "rgba(255,255,255,.08)",
            "rgba(255,255,255,.7)",
            "1px solid rgba(255,255,255,.15)",
          ],
        ].map(([bg, c, b], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 28,
              borderRadius: 6,
              background: bg,
              border: b,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 800,
              color: c,
            }}
          >
            MAD
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            fontSize: 7,
            color: "rgba(255,255,255,.25)",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 8,
            fontFamily: F.mono,
          }}
        >
          Typefaces
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "#fff",
                fontWeight: 400,
              }}
            >
              DM Serif Display
            </span>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.25)",
                fontFamily: F.mono,
              }}
            >
              Headlines
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,.8)",
              }}
            >
              Syne Bold
            </span>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.25)",
                fontFamily: F.mono,
              }}
            >
              UI / Body
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 9,
                color: "rgba(255,255,255,.45)",
              }}
            >
              JetBrains Mono
            </span>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.25)",
                fontFamily: F.mono,
              }}
            >
              Captions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimPaletteStage() {
  const swatches = [
    ["#0a0a0a", "Ink"],
    ["#2d2d2d", "Dark"],
    ["#6b6b6b", "Mid"],
    ["#b4b4b4", "Light"],
    ["#f5f5f5", "Paper"],
  ];
  return (
    <div
      style={{
        background: "#fafafa",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        border: "1px solid rgba(0,0,0,.06)",
        fontFamily: F.syne,
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "#888",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontFamily: F.mono,
        }}
      >
        Colour Palette
      </div>
      <div style={{ display: "flex", gap: 8, flex: 1, alignItems: "center" }}>
        {swatches.map(([hex, lbl]) => (
          <div
            key={hex}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                flex: 1,
                minHeight: 60,
                borderRadius: 10,
                background: hex,
                border: hex === "#f5f5f5" ? "1px solid #ddd" : "none",
              }}
            />
            <span style={{ fontSize: 7, color: "#888", fontFamily: F.mono }}>
              {lbl}
            </span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 12 }}>
        <div
          style={{
            fontSize: 7,
            color: "#888",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 8,
            fontFamily: F.mono,
          }}
        >
          Usage
        </div>
        {[
          ["Primary", "#0a0a0a", "#fff"],
          ["Surface", "#fafafa", "#0a0a0a"],
          ["Muted", "#f0f0f0", "#666"],
        ].map(([nm, bg, c], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 8px",
              borderRadius: 6,
              background: bg,
              border: bg === "#fafafa" ? "1px solid #e8e8e8" : "none",
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 9, color: c }}>{nm}</span>
            <span
              style={{
                fontSize: 7,
                color: c === "#fff" ? "rgba(255,255,255,.5)" : "#aaa",
                fontFamily: F.mono,
              }}
            >
              {bg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimDashStage() {
  return (
    <div
      style={{
        background: "#0e0e0c",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontFamily: F.syne,
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
          <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
            Campaign Dashboard
          </div>
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.3)",
              fontFamily: F.mono,
            }}
          >
            Q4 2025 · Live
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,.5)",
            }}
          />
          <span
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.45)",
              fontFamily: F.mono,
            }}
          >
            LIVE
          </span>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 6,
        }}
      >
        {[
          ["84K", "Reach", "+32%"],
          ["3.2K", "Conv.", "+18%"],
          ["$4.20", "CPA", "-12%"],
          ["6.4×", "ROAS", "+8%"],
        ].map(([v, l, d], i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 8,
              padding: 8,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {v}
            </div>
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.3)",
                margin: "2px 0",
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "rgba(255,255,255,.65)",
                fontFamily: F.mono,
              }}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
      <svg
        viewBox="0 0 260 70"
        style={{ width: "100%", flex: 1, minHeight: 60 }}
      >
        <defs>
          <linearGradient id="simGr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {[0, 65, 130, 195, 260].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="0"
            x2={x}
            y2="70"
            stroke="rgba(255,255,255,.05)"
            strokeWidth=".5"
          />
        ))}
        <polyline
          points="0,60 35,48 70,35 105,40 140,20 175,12 210,7 260,3"
          fill="none"
          stroke="rgba(255,255,255,.65)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,60 35,48 70,35 105,40 140,20 175,12 210,7 260,3 260,70 0,70"
          fill="url(#simGr)"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          ["Instagram", 88],
          ["LinkedIn", 64],
          ["Email", 76],
          ["Paid", 52],
        ].map(([nm, pct], i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                fontSize: 7,
                width: 48,
                color: "rgba(255,255,255,.38)",
                flexShrink: 0,
                fontFamily: F.mono,
              }}
            >
              {nm}
            </span>
            <div
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,.07)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 2,
                  background: "rgba(255,255,255,.55)",
                  width: `${pct}%`,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.45)",
                fontFamily: F.mono,
              }}
            >
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimComicStage() {
  const panels = [
    { img: IMG.i1, bubble: "Idea!", label: "Chapter 1" },
    { img: IMG.i2, bubble: "POW!", label: "Rise" },
    { img: IMG.i3, bubble: "Plot!", label: "Strategy" },
    { img: IMG.i4, bubble: "WIN!", label: "Launch" },
  ];
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 3,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {panels.map((p, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={p.img}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "#fff",
              color: "#111",
              fontSize: 9,
              fontWeight: 800,
              padding: "2px 7px",
              borderRadius: "6px 6px 0 6px",
              fontFamily: F.syne,
            }}
          >
            {p.bubble}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 7,
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              fontStyle: "italic",
              fontFamily: "'DM Serif Display',serif",
            }}
          >
            {p.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function SimChatStage() {
  const msgs = [
    { from: "client", text: "4-panel comic for our product launch." },
    {
      from: "studio",
      text: "Bold outlines, halftone dots, speech bubbles. Style ref?",
    },
    { from: "client", text: "Roy Lichtenstein meets streetwear." },
    { from: "studio", text: "PNG @ 300dpi + PDF. Figma source included ✓" },
  ];
  return (
    <div
      style={{
        background: "#08090c",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: F.syne,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 800,
            color: "#000",
          }}
        >
          M
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>
            MAD Studio
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.3)",
                fontFamily: F.mono,
              }}
            >
              online
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          justifyContent: "flex-end",
        }}
      >
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.2 }}
            style={{
              display: "flex",
              justifyContent: m.from === "client" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "78%",
                padding: "8px 11px",
                fontSize: 9,
                lineHeight: 1.5,
                borderRadius:
                  m.from === "client"
                    ? "11px 11px 2px 11px"
                    : "11px 11px 11px 2px",
                background:
                  m.from === "client"
                    ? "rgba(255,255,255,.75)"
                    : "rgba(255,255,255,.08)",
                color: m.from === "client" ? "#111" : "rgba(255,255,255,.78)",
              }}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 7,
          alignItems: "center",
          padding: "8px 10px",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 100,
            padding: "6px 10px",
            background: "rgba(255,255,255,.07)",
            fontSize: 7,
            color: "rgba(255,255,255,.18)",
            fontFamily: F.mono,
          }}
        >
          Message...
        </div>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M7 2l5 5-5 5"
              stroke="#111"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function renderSimStage(stage) {
  switch (stage.type) {
    case "browser":
      return <SimBrowserStage stage={stage} />;
    case "tweet":
      return <SimTweetStage stage={stage} />;
    case "ig":
      return <SimIgStage />;
    case "brand":
      return <SimBrandStage />;
    case "palette":
      return <SimPaletteStage />;
    case "dashboard":
      return <SimDashStage />;
    case "comic":
      return <SimComicStage />;
    case "chat":
      return <SimChatStage />;
    default:
      return null;
  }
}

const SIM_HOLD = 2800;

// ── Single Card ───────────────────────────────────────────────────
function SimCard({ card, isActive, offset, onActivate }) {
  const [cur, setCur] = useState(0);
  const total = card.stages.length;
  const fillRef = useRef(null);
  const timerRef = useRef(null);

  const advance = useCallback(() => setCur((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const dur = card.stages[cur]?.holdMs ?? SIM_HOLD;
    el.style.transition = "none";
    el.style.width = "0%";
    const rAF = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = `width ${dur}ms linear`;
        el.style.width = "100%";
        timerRef.current = setTimeout(advance, dur);
      }),
    );
    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timerRef.current);
    };
  }, [cur, card.stages, advance]);

  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;
  const SPREAD = 340;
  const DEPTH = 220;
  const ROTY = 38;
  const SCALE = Math.pow(0.78, abs);
  const x = sign * Math.min(abs, 2) * SPREAD * (1 - abs * 0.1);
  const z = -(abs * DEPTH);
  const ry = -sign * Math.min(abs, 2) * ROTY;
  const opacity = abs <= 2 ? Math.max(0.2, 1 - abs * 0.38) : 0;

  return (
    <div
      onClick={() => !isActive && onActivate()}
      style={{
        position: "absolute",
        width: "clamp(260px,26vw,320px)",
        height: "clamp(380px,55vh,440px)",
        left: "50%",
        top: "50%",
        marginLeft: "calc(clamp(260px,26vw,320px) / -2)",
        marginTop: "calc(clamp(380px,55vh,440px) / -2)",
        borderRadius: 18,
        overflow: "hidden",
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${SCALE})`,
        opacity,
        zIndex: 10 - abs,
        pointerEvents: abs <= 2 ? "auto" : "none",
        transition:
          "transform .65s cubic-bezier(.23,1,.32,1), opacity .65s ease",
        boxShadow: isActive
          ? "0 4px 24px rgba(0,0,0,.14), 0 20px 60px rgba(0,0,0,.22)"
          : "0 2px 8px rgba(0,0,0,.1), 0 8px 32px rgba(0,0,0,.12)",
        cursor: isActive ? "default" : "pointer",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Card background */}
      <div style={{ position: "absolute", inset: 0, background: card.color }} />

      {/* Stages */}
      {card.stages.map((stage, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            padding: "54px 14px 18px",
            display: "flex",
            flexDirection: "column",
            opacity: i === cur ? 1 : 0,
            transition: "opacity .4s ease",
            pointerEvents: i === cur ? "auto" : "none",
          }}
        >
          {renderSimStage(stage)}
        </div>
      ))}

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px 28px",
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.45) 0%,transparent 100%)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "5px 12px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,.25)",
            background: "rgba(255,255,255,.12)",
            backdropFilter: "blur(8px)",
            fontFamily: F.mono,
            fontSize: 9,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.8)",
          }}
        >
          {card.label}
        </span>
        {total > 1 && (
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {card.stages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCur(i);
                }}
                style={{
                  height: 5,
                  width: i === cur ? 16 : 5,
                  borderRadius: 3,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    i === cur
                      ? "rgba(255,255,255,.9)"
                      : "rgba(255,255,255,.35)",
                  transition: "all .3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(255,255,255,.15)",
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: "100%",
            width: "0%",
            background: "rgba(255,255,255,.7)",
            transition: "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Services In Motion View ───────────────────────────────────────
function ServicesInMotion({ dark }) {
  const [active, setActive] = useState(0);

  const goTo = (i) => setActive(Math.max(0, Math.min(i, SIM_CARDS.length - 1)));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-10 pt-16 pb-4 flex items-end justify-between shrink-0">
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2 m-0"
            style={{
              color: dark ? "rgba(255,255,255,.3)" : "rgba(10,22,40,.42)",
              fontFamily: F.mono,
            }}
          >
            Services in motion &nbsp;·&nbsp; {active + 1} / {SIM_CARDS.length}
          </p>
          <h2
            className="leading-none m-0"
            style={{
              fontFamily: F.serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(24px,3vw,38px)",
              color: dark ? "#f0ede8" : "#0f0f0f",
            }}
          >
            Systems for growth.
          </h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => goTo(active - 1)}
            className="flex items-center justify-center cursor-pointer bg-transparent"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dark ? "#ccc" : "#333"}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M14 6L8 12l6 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(active + 1)}
            className="flex items-center justify-center cursor-pointer bg-transparent"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,.15)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dark ? "#ccc" : "#333"}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M10 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3D scene */}
      <div
        className="relative flex-1"
        style={{
          perspective: "1400px",
          perspectiveOrigin: "50% 38%",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {SIM_CARDS.map((card, i) => (
            <SimCard
              key={card.label}
              card={card}
              isActive={i === active}
              offset={i - active}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        {/* Dot nav */}
        <div
          className="absolute z-30 flex gap-2"
          style={{ bottom: 16, left: "50%", transform: "translateX(-50%)" }}
        >
          {SIM_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                background:
                  i === active
                    ? dark
                      ? "rgba(255,255,255,.75)"
                      : "rgba(10,22,40,.65)"
                    : dark
                      ? "rgba(255,255,255,.2)"
                      : "rgba(10,22,40,.18)",
                transition: "all .35s cubic-bezier(.23,1,.32,1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Below-card label */}
      <div className="flex justify-center pb-6 pt-3 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div
              style={{
                fontFamily: F.serif,
                fontStyle: "italic",
                fontSize: 20,
                color: dark ? "#f0ede8" : "#0f0f0f",
                marginBottom: 5,
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {SIM_CARDS[active].label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: dark ? "rgba(255,255,255,.45)" : "#888",
                lineHeight: 1.65,
                fontFamily: F.syne,
                maxWidth: 300,
              }}
            >
              {SIM_CARDS[active].sub}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT — two sticky views bound by scroll
// ════════════════════════════════════════════════════════════════
export default function WhatWeDo() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setScrollProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // View 1: Hero — visible from 0 → 0.45, fades out 0.38 → 0.48
  const heroOpacity = Math.min(
    1,
    Math.max(0, 1 - (scrollProgress - 0.38) / 0.1),
  );
  const heroScale = 0.93 + heroOpacity * 0.07;
  const heroY = (1 - heroOpacity) * -40;
  const heroVisible = heroOpacity > 0.01;

  // View 2: Services in Motion — fades in 0.42 → 0.52
  const simOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.42) / 0.1));
  const simY = (1 - simOpacity) * 50;
  const simVisible = simOpacity > 0.01;

  const sectionBg = dark ? "#181817" : "#d9ecfa";
  const stickyBg = dark
    ? "linear-gradient(180deg,#181817 0%,#111110 100%)"
    : "linear-gradient(180deg,#d9ecfa 0%,#c4dbf2 100%)";

  return (
    <section
      ref={wrapRef}
      id="services"
      className="relative"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Top vignette */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-30"
          style={{ height: 100 }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── VIEW 1: HERO GRID ── */}
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
            <HeroView dark={dark} />
          </div>
        )}

        {/* ── VIEW 2: SERVICES IN MOTION ── */}
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
            <ServicesInMotion dark={dark} />
          </div>
        )}

        {/* ── SCROLL CUE (end of section) ── */}
        <AnimatePresence>
          {scrollProgress > 0.93 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
            >
              <span
                className="text-[8px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,.32)", fontFamily: F.mono }}
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
                    stroke="rgba(255,255,255,.28)"
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
