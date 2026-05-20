import { useState, useRef, useEffect } from "react";
import { useCms } from "@/context/CmsContext";

export default function Hero() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const { brand, hero } = cmsData;
  const SLIDES = hero.slides;
  const THUMBS = hero.thumbs;
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
  const [isSmall, setIsSmall] = useState(false);
  const prevPhaseRef = useRef(-1);
  const notifRevealTimerRef = useRef(null);
  const notifTimerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const NOTIFS = hero.notifications;

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

  const collapsePanels = THUMBS.map((thumb) => ({ src: thumb.src, fit: "contain" })).slice(0, 10);
  const panelGap = isSmall ? 86 : 225;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div id="hero" ref={wrapRef} className="relative bg-transparent h-[180vh]">
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

      <div className="sticky top-0 overflow-hidden h-[100dvh]">
        {isEditMode && (
          <button onClick={() => openPanel("hero")} style={{ position: "absolute", top: 12, right: 12, zIndex: 200, background: "#0b457b", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 9, fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
            ✏ Edit
          </button>
        )}

        {/* Collapse background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(160deg, #f0f8ff 0%, #e4f3fc 60%, #d4ecf7 100%)",
            opacity: collapseT,
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            opacity: collapseT * 0.35,
            backgroundImage:
              "linear-gradient(rgba(25,128,194,.08) 1px,transparent 1px), linear-gradient(90deg,rgba(25,128,194,.08) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Spotlight */}
        <div
          className="absolute -translate-x-1/2 w-[560px] h-[560px] z-[2] pointer-events-none transition-opacity duration-500"
          style={{
            top: "-8%",
            left: "50%",
            background: "radial-gradient(ellipse 55% 55% at 50% 0%, rgba(25,128,194,.15) 0%, transparent 70%)",
            opacity: collapseT,
          }}
        />

        {/* ── Main viewport frame ── */}
        <div
          className="absolute z-20 overflow-hidden transition-shadow duration-300"
          style={{
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
          }}
        >
          <div className="absolute inset-0 flex">

            {/* ── Left panel ── */}
            <div className="relative overflow-hidden shrink-0" style={{ width: "42%" }}>
              {SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.left}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity:
                      i === slide ? 1 - cardOut
                        : i === (slide + 1) % SLIDES.length ? cardOut : 0,
                    transition: "opacity .05s",
                  }}
                />
              ))}

              {/* Left scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(5,28,46,.22) 0%, transparent 55%), linear-gradient(to bottom, rgba(5,28,46,.08) 0%, rgba(5,28,46,.42) 100%)",
                }}
              />

              {/* Pantone card */}
              <div
                className="absolute"
                style={{
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
                    className="absolute bg-white rounded-[10px] overflow-hidden w-full"
                    style={{
                      transform: `translate(-50%, calc(-50% + ${ty}px))`,
                      opacity: op,
                      boxShadow:
                        "0 20px 60px rgba(5,28,46,.28), 0 4px 12px rgba(5,28,46,.12), 0 0 0 0.5px rgba(255,255,255,.18)",
                    }}
                  >
                    <img src={data.cardImg} alt="" className="w-full h-[175px] object-cover block" />
                    <div className="absolute top-0 left-0 right-0 h-[175px] overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
                          animation: "shimmerSlide 3.2s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <div className="px-4 pt-[14px] pb-4">
                      <div className="text-[13px] font-black mb-[6px] tracking-[-0.3px] text-[#0f1a2e]">
                        {data.card}
                      </div>
                      <div className="flex items-center gap-[6px] pt-2 border-t-[0.5px] border-azure-500/[12%]">
                        <div
                          className="w-[6px] h-[6px] rounded-full bg-azure-500 shrink-0"
                          style={{ animation: "dotPulse 2.4s ease-in-out infinite" }}
                        />
                        <div>
                          <div className="text-[6.5px] font-bold text-[#aaa] tracking-[0.22em] uppercase mb-[1px]">
                            {brand.serviceByLabel}
                          </div>
                          <div className="text-[9.5px] font-black tracking-[0.1em] uppercase text-[#0f1a2e]">
                            {brand.name}™
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide indicators */}
              <div
                className="absolute bottom-[22px] left-[22px] flex flex-col gap-[7px]"
                style={{ opacity: Math.max(0, 1 - phase1v * 2) }}
              >
                {SLIDES.map((_, i) => (
                  <div key={i} className="flex items-center gap-[7px]">
                    <div
                      className="h-[1.5px] rounded-[1px]"
                      style={{
                        width: i === slide ? 22 : 8,
                        background: i === slide ? "#ffffff" : "rgba(255,255,255,.28)",
                        transition: "width .35s cubic-bezier(.22,1,.36,1)",
                      }}
                    />
                    <span
                      className="font-mono font-bold text-[7px] tracking-[0.05em]"
                      style={{
                        color: i === slide ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.22)",
                        transition: "color .35s",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="flex-1 relative overflow-hidden">
              {SLIDES.map((sl, i) => (
                <img
                  key={i}
                  src={sl.right}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity:
                      i === slide ? 1 - cardOut
                        : i === (slide + 1) % SLIDES.length ? cardOut : 0,
                    transition: "opacity .05s",
                  }}
                />
              ))}

              {/* Right scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,28,46,.72) 0%, rgba(5,28,46,.18) 48%, transparent 72%), linear-gradient(to left, transparent 60%, rgba(5,28,46,.14) 100%)",
                }}
              />

              {/* Notification toast */}
              <div
                className="absolute z-[80] pointer-events-none backdrop-blur-[20px] rounded-xl top-[82px] right-6 bg-[rgba(238,247,253,.92)] border-[0.5px] border-azure-500/[18%] px-[14px] py-3"
                style={{
                  width: "min(300px, calc(58vw - 20px))",
                  transform: notif ? "translateY(0) scale(1)" : "translateY(-16px) scale(.96)",
                  opacity: notif ? 1 : 0,
                  transition: "transform .4s cubic-bezier(.22,1,.36,1), opacity .28s",
                  boxShadow: "0 8px 32px rgba(5,28,46,.12), 0 1px 0 rgba(255,255,255,.6) inset",
                }}
              >
                <div className="flex items-center gap-[10px]">
                  <div className="w-[30px] h-[30px] rounded-[7px] bg-azure-500 flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(25,128,194,.35)]">
                    <span className="text-[6.5px] font-black tracking-[0.5px] text-white">
                      {brand.name}
                    </span>
                  </div>
                  <div>
                    <div className="text-[7px] font-bold text-[#1468a0] tracking-[0.14em] uppercase mb-[2px]">
                      New update
                    </div>
                    <span className="text-[11px] font-semibold text-[#0c447c] leading-[1.45]">
                      {notifMsg}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero copy */}
              <div
                className="absolute right-7 left-6 max-w-[480px] bottom-[138px] sm:bottom-11"
                style={{ opacity: Math.max(0, 1 - phase1v * 2) }}
              >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-[7px] mb-[14px]">
                  <div className="w-[18px] h-[1.5px] bg-[rgba(93,167,230,.85)] rounded-[1px]" />
                  <span className="text-[8px] font-bold tracking-[0.28em] uppercase text-white/50 font-mono">
                    {brand.name}
                  </span>
                </div>

                <h1 className="text-white font-extrabold leading-[1.04] tracking-[-0.03em] whitespace-pre-line mb-[14px] text-[22px] sm:text-[30px] md:text-[38px] xl:text-[46px]">
                  {s.h1}
                </h1>
                <p className="text-white/50 font-medium tracking-[0.04em] leading-[1.65] mb-6 max-w-[340px] text-[9px] sm:text-[11px]">
                  {s.sub}
                </p>

                <div className="flex flex-wrap gap-[10px]">
                  <button onClick={() => scrollTo("contact")} className="bg-white border-none font-bold text-[7px] sm:text-[8.5px] tracking-[0.16em] uppercase rounded-full text-[#0f1a2e] cursor-pointer py-2 px-5 sm:py-[10px] sm:px-[26px]">
                    {hero.cta}
                  </button>
                  <button onClick={() => scrollTo("work")} className="bg-white/[7%] border-[0.5px] border-white/30 font-bold text-[7px] sm:text-[8.5px] tracking-[0.16em] uppercase rounded-full text-white/80 cursor-pointer py-2 px-5 sm:py-[10px] sm:px-[26px] backdrop-blur-sm">
                    View Our Work
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="absolute left-0 right-0 flex items-center justify-center gap-3 bottom-[108px] sm:bottom-[18px]"
                style={{ opacity: Math.max(0, 1 - phase1v * 2) }}
              >
                <div className="h-[1.5px] rounded-[1px] bg-white/[15%] overflow-hidden w-[70px] sm:w-[120px]">
                  <div
                    className="h-full bg-gradient-to-r from-[#5aa7e6] to-[#3da0e4]"
                    style={{ width: `${prog}%`, transition: "width .1s linear" }}
                  />
                </div>
                <button
                  onClick={() => {
                    slideRef.current.paused = !slideRef.current.paused;
                    setPaused((p) => !p);
                  }}
                  className="w-[26px] h-[26px] rounded-full bg-transparent border-[0.5px] border-white/30 text-white/70 text-[7.5px] flex items-center justify-center cursor-pointer transition-[border-color,color] duration-200"
                >
                  {paused ? "▶" : "⏸"}
                </button>
              </div>
            </div>
          </div>

          {/* Frame border ring */}
          <div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              borderRadius: collapseT * 14,
              border: `0.5px solid rgba(255,255,255,${collapseT * 0.15})`,
            }}
          />
        </div>

        {/* ── Collapsed thumbnail panels ── */}
        {collapsePanels.map((t, i) => {
          const rowIndex = i % 5;
          const centerOffset = rowIndex - 2;
          const isTopRow = i < 5;
          const startScale = 0.1;
          const endScale = isSmall ? 0.68 : 0.86;
          const sc = startScale + collapseT * (endScale - startScale);
          return (
            <div
              key={i}
              className="absolute z-[22] pointer-events-none overflow-hidden rounded-[10px] mix-blend-multiply w-[120px] h-[104px] sm:w-[185px] sm:h-[160px]"
              style={{
                left: `calc(50% + ${centerOffset * panelGap}px)`,
                top: isTopRow ? "24%" : "72%",
                transform: `translate(-50%,-50%) scale(${sc})`,
                opacity: Math.max(0, Math.min(1, collapseT * 1.45 - 0.18 - i * 0.015)),
                boxShadow: "0 4px 20px rgba(5,28,46,.10)",
              }}
            >
              <img src={t.src} alt="" className="w-full h-full object-contain block" />
            </div>
          );
        })}

        {/* ── Final CTA overlay ── */}
        <div
          className="absolute z-[30] text-center w-[96vw] max-w-[1180px]"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) translateY(${(1 - collapseT) * 18}px)`,
            opacity: Math.max(0, collapseT * 3 - 2),
            pointerEvents: collapseT > 0.85 ? "all" : "none",
          }}
        >
          <p className="font-mono font-bold tracking-[0.32em] uppercase text-[8.5px] text-[rgba(20,104,160,.5)] mb-[14px]">
            Making A Difference
          </p>
          <h2 className="font-extrabold leading-none tracking-[-0.04em] text-[#0c447c] mb-8 text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[58px]">
            Structure changes{" "}
            <span className="text-azure-500">everything.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => scrollTo("contact")} className="bg-azure-500 border-none py-3 px-8 text-[8.5px] font-bold tracking-[0.18em] uppercase rounded-full text-white cursor-pointer shadow-[0_4px_24px_rgba(25,128,194,.32)]">
              {hero.cta}
            </button>
            <button onClick={() => scrollTo("work")} className="bg-white/60 border-[0.5px] border-[rgba(15,79,122,.16)] py-3 px-8 text-[8.5px] font-bold tracking-[0.18em] uppercase rounded-full text-[#1468a0] cursor-pointer backdrop-blur-[10px]">
              View Our Work
            </button>
          </div>
        </div>

        {/* ── Trusted by marquee ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[70] pointer-events-none pt-[40px] px-8 pb-[22px]"
          style={{
            opacity: Math.min(
              1,
              Math.max(0, 1 - phase1v * 2.5) + Math.max(0, collapseT * 3 - 2),
            ),
          }}
        >
          <p className="text-[9px] tracking-[0.22em] uppercase font-bold mb-3 text-[#1468a0]">
            Trusted by
          </p>
          <div className="overflow-hidden w-[85vw] max-w-[560px]">
            <div className="mq flex items-center gap-[40px] w-max">
              {[
                "/log1.png", "/log2.png", "/log3.png", "/log4.png", "/log5.png",
                "/log1.png", "/log2.png", "/log3.png", "/log4.png", "/log5.png",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="h-[52px] w-auto object-contain shrink-0" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
