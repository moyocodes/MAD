import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import ChromeDots from "./ChromeDots";
import TrustedBy from "./TrustedBy";

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
  "/flier/image.png",
  "/flier/image2.png",
  "/flier/image3.png",
  "/flier/image4.png",
  "/flier/image5.png",
  "/flier/image6.png",
  "/flier/image7.png",
  "/flier/image8.png",
];

const THUMB_W = 266;
const THUMB_H = 186;

const THUMB_FINAL = [
  { x: -50, y: -30, r: -2.5 },
  { x: -20, y: -33, r: 1.5 },
  { x: +20, y: -29, r: -1 },
  { x: +50, y: -34, r: 2 },
  { x: -48, y: +30, r: 2.5 },
  { x: -18, y: +33, r: -1.5 },
  { x: +18, y: +30, r: 1 },
  { x: +48, y: +34, r: -2 },
];

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
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
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

export default function Hero() {
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
    <div
      ref={wrapRef}
      className="relative h-[400vh] "
    >
      <div
        className="sticky top-[60px] flex overflow-hidden "
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div
          className="absolute inset-0 z-0  dark:bg-azure-500/20"
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
                width: THUMB_W,
                height: THUMB_H,
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
                className="absolute left-0 right-0 bottom-0 w-full object-contain block"
                style={{
                  top: 12,
                  height: "calc(100% - 12px)",
                  background: "#f4f4f2",
                }}
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
              style={{
                background: "#1980c2",
                boxShadow: `0 4px 24px ${"#1980c2"}50`,
              }}
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
