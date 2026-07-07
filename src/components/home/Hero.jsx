import { useState, useRef, useEffect } from "react";
import { useCms } from "@/context/CmsContext";

export default function Hero() {
  const { cmsData } = useCms();
  const { brand, hero } = cmsData;
  const SLIDES = hero.slides;
  const rafRef = useRef(null);
  const lastTs = useRef(null);
  const slideRef = useRef({ slide: 0, prog: 0, paused: false });
  const [slide, setSlide] = useState(0);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const notifRevealTimerRef = useRef(null);
  const notifTimerRef = useRef(null);

  const NOTIFS = hero.notifications;

  useEffect(() => {
    notifRevealTimerRef.current = setTimeout(() => {
      setNotifMsg(NOTIFS[0]);
      setNotif(true);
      notifTimerRef.current = setTimeout(() => setNotif(false), 5500);
    }, 800);
    return () => {
      clearTimeout(notifRevealTimerRef.current);
      clearTimeout(notifTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const DUR = hero.slideDuration ?? 6000;
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

  const s = SLIDES[slide];

  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div id="hero" className="relative flex flex-col h-[100dvh]">
      <style>{`
        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mq { animation: marquee 18s linear infinite; }
      `}</style>

      {/* ── Top 80%: slideshow ── */}
      <div className="relative overflow-hidden" style={{ height: "80%" }}>
        <div className="absolute inset-0 flex">
          {/* Left panel */}
          <div
            className="relative overflow-hidden shrink-0"
            style={{ width: "42%" }}
          >
            {SLIDES.map((sl, i) => (
              <img
                key={i}
                src={sl.left}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transition: "opacity .6s",
                }}
              />
            ))}

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
              style={{ bottom: "4rem", left: "50%", width: "min(276px,86%)" }}
            >
              <div
                className="absolute bg-white rounded-[8px] sm:rounded-[10px] border-[2px] overflow-hidden w-[140px] sm:w-[220px] md:w-[280px] lg:w-[350px]"
                style={{
                  transform: "translate(-50%, -100%)",
                  boxShadow:
                    "0 20px 60px rgba(5,28,46,.28), 0 4px 12px rgba(5,28,46,.12), 0 0 0 0.5px rgba(255,255,255,.18)",
                }}
              >
                <img
                  src={s.cardImg}
                  alt=""
                  className="w-full h-[140px] sm:h-[220px] md:h-[280px] lg:h-[350px] object-cover block"
                />
                <div className="absolute top-0 left-0 right-0 h-[70px] sm:h-[110px] md:h-[140px] lg:h-[175px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
                      animation: "shimmerSlide 3.2s ease-in-out infinite",
                    }}
                  />
                </div>
                <div className="px-2 pt-[8px] pb-2 sm:px-4 sm:pt-[14px] sm:pb-4 flex items-start justify-between">
                  <div className="text-[9px] sm:text-[13px] font-black mb-[4px] sm:mb-[6px] tracking-[-0.3px] text-[#0f1a2e]">
                    {s.card}
                  </div>
                  <div className="text-right">
                    <div className="text-[4.5px] sm:text-[6.5px] font-bold text-[#aaa] tracking-[0.22em] uppercase mb-[1px]">
                      {brand.serviceByLabel}
                    </div>
                    <div className="text-[7px] sm:text-[9.5px] font-black tracking-[0.1em] uppercase text-[#0f1a2e]">
                      {brand.name}™
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 relative overflow-hidden">
            {SLIDES.map((sl, i) => (
              <img
                key={i}
                src={sl.right}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transition: "opacity .6s",
                }}
              />
            ))}

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,28,46,.72) 0%, rgba(5,28,46,.18) 48%, transparent 72%), linear-gradient(to left, transparent 60%, rgba(5,28,46,.14) 100%)",
              }}
            />

            {/* Notification toast */}
            <div
              className="absolute z-[80] pointer-events-none backdrop-blur-[20px] rounded-xl top-[82px] right-6 bg-[rgba(238,247,253,.92)] border-[0.5px] border-azure-500/[18%] px-[10px] py-2 sm:px-[14px] sm:py-3"
              style={{
                width: "min(240px, calc(58vw - 16px))",
                transform: notif
                  ? "translateY(0) scale(1)"
                  : "translateY(-16px) scale(.96)",
                opacity: notif ? 1 : 0,
                transition:
                  "transform .4s cubic-bezier(.22,1,.36,1), opacity .28s",
                boxShadow:
                  "0 8px 32px rgba(5,28,46,.12), 0 1px 0 rgba(255,255,255,.6) inset",
              }}
            >
              <div className="flex items-center gap-[7px] sm:gap-[10px]">
                <div className="w-[22px] h-[22px] sm:w-[30px] sm:h-[30px] rounded-[6px] sm:rounded-[7px] bg-azure-500 flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(25,128,194,.35)]">
                  <span className="text-[4.5px] sm:text-[6.5px] font-black tracking-[0.5px] text-white">
                    {brand.name}
                  </span>
                </div>
                <div>
                  <div className="text-[6px] sm:text-[7px] font-bold text-[#1468a0] tracking-[0.14em] uppercase mb-[1px] sm:mb-[2px]">
                    New update
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-semibold text-[#0c447c] leading-[1.45]">
                    {notifMsg}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero copy */}
            <div className="absolute right-7 left-6 max-w-[480px] bottom-16">
              <h1 className="text-white font-extrabold leading-[1.04] tracking-[-0.03em] whitespace-pre-line mb-[14px] text-[22px] sm:text-[30px] md:text-[38px] xl:text-[46px]">
                {s.h1}
              </h1>
              <p className="text-white/50 font-medium tracking-[0.04em] leading-[1.65] mb-6 max-w-[340px] text-[11px] sm:text-[13px]">
                {s.sub}
              </p>
              <div className="flex flex-wrap gap-[10px]">
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-white border-none font-bold text-[8.5px] sm:text-[10px] tracking-[0.16em] uppercase rounded-full text-[#0f1a2e] cursor-pointer py-3 px-6 sm:py-[12px] sm:px-[30px]"
                >
                  {hero.cta}
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="bg-white/[7%] border-[0.5px] border-white/30 font-bold text-[8.5px] sm:text-[10px] tracking-[0.16em] uppercase rounded-full text-white/80 cursor-pointer py-3 px-6 sm:py-[12px] sm:px-[30px] backdrop-blur-sm"
                >
                  View Our Work
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute left-[18px] right--[18px] flex items-center justify-center  bottom-[18px]">
              <div className="h-[1.5px] rounded-[1px] bg-white/[15%] overflow-hidden w-[160px] ">
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
                className="w-[26px] h-[26px] rounded-full bg-transparent border-[0.5px] border-white/30 text-white/70 text-[9px] flex items-center justify-center cursor-pointer transition-[border-color,color] duration-200"
              >
                {paused ? "▶" : "⏸"}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-[5] pointer-events-none border-[0.5px] border-white/[8%]" />
      </div>

      {/* ── Bottom 20%: Trusted by ── */}
      <div
        className="flex flex-col items-center px-10 md:px-40 py-6 shrink-0 bg-white"
        style={{ height: "20%" }}
      >
        <p className="text-[11px] tracking-[0.28em] uppercase font-bold text-dark/50 shrink-0 whitespace-nowrap mb-4">
          {hero.trustedBy.label}
        </p>
        <div className="overflow-hidden flex-1 w-full">
          <div className="mq flex items-center gap-[48px] w-max">
            {[...hero.trustedBy.logos, ...hero.trustedBy.logos].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-[56px] w-auto object-contain shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
