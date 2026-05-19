import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useCms } from "@/context/CmsContext";

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
    <div className="w-full bg-azure-700/30" style={{ height: 1 }}>
      <div ref={fillRef} className="bg-azure-400 h-full w-0" />
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1];

export default function WhatWeDo() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const content = cmsData.whatWeDo;
  const WWD = content.services;

  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);
  const next = useCallback(() => setCur((c) => (c + 1) % WWD.length), [WWD.length]);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "start start"],
  });
  const leftOp  = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const introY  = useTransform(scrollYProgress, [0,   0.6], [20, 0]);
  const introOp = useTransform(scrollYProgress, [0,   0.6], [0, 1]);
  const svcY    = useTransform(scrollYProgress, [0.2, 1],   [24, 0]);
  const svcOp   = useTransform(scrollYProgress, [0.2, 1],   [0, 1]);

  const svc = WWD[cur];

  return (
    <section ref={rootRef} className="relative h-[100dvh]">
      {isEditMode && (
        <button onClick={() => openPanel("whatWeDo")} style={{ position: "absolute", top: 12, right: 12, zIndex: 100, background: "#0b457b", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 9, fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }}>
          ✏ Edit
        </button>
      )}
      <div className="overflow-hidden h-full" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
          {/* ── Left full-height on desktop, 60dvh on mobile ── */}
          <motion.div style={{ opacity: leftOp }} className="md:row-span-2 relative overflow-hidden h-[60dvh] md:h-full">
            {WWD.map((sv, i) => (
              <motion.img
                key={i}
                src={sv.wide}
                alt=""
                animate={i === cur ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === cur ? 1 : 0,
                  transition: "opacity .9s",
                }}
              />
            ))}
            {/* deep azure gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-azure-900/95 via-azure-900/30 to-transparent" />

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 px-7 pb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="text-azure-400 font-mono text-[7.5px] tracking-[0.28em] uppercase mb-2 font-bold">
                    {svc.tag} / 03
                  </p>
                  <p className="text-white font-black mb-2 leading-[1.05] tracking-[-0.04em] text-xl md:text-[34px]">
                    {svc.label}
                  </p>
                  <p className="text-white/50 mb-5 leading-relaxed text-[10px] md:text-[13px]">
                    {svc.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
              <button className="text-white text-[9px] font-bold tracking-[0.14em] uppercase px-5 py-[9px] rounded-full bg-white/[10%] border border-white/20 backdrop-blur-md">
                {content.cta}
              </button>
            </div>

            {/* Top-left tag */}
            <div className="absolute top-3.5 left-3.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cur}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease }}
                  className="bg-azure-500/20 text-azure-300 font-mono text-[7px] font-bold tracking-[0.25em] uppercase border border-azure-400/40 px-[10px] py-[4px] rounded-full backdrop-blur-md inline-block"
                >
                  {svc.tag} / 03
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Top-right: hidden on mobile (no colored bg), collapses on scroll exit on desktop ── */}
          <div
            className="hidden md:block relative overflow-hidden border-b border-azure-500/20"
            style={{ minHeight: "50dvh" }}
          >
            {WWD.map((sv, i) => (
              <motion.img
                key={i}
                src={sv.top}
                alt=""
                animate={i === cur ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
                style={{
                  opacity: i === cur ? 1 : 0,
                  transition: "opacity .9s",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-azure-900/70" />

            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="flex items-center gap-2"
                >
                 
                  <span className="text-azure-400 font-black tracking-[0.1em] uppercase text-[10px] md:text-sm">
                    {svc.label.split(" ")[0]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute top-3 right-3 flex gap-[5px]">
              {WWD.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  className="w-3.5 h-3.5 rounded-full cursor-pointer"
                  style={{
                    border: `1.5px solid ${i === cur ? "#ffffff" : "rgba(90,167,230,.3)"}`,
                    background: i === cur ? "#ffffff" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom-right: 2 cards ── */}
          <div className="grid grid-cols-2 gap-0 h-[40dvh] md:h-auto">
            {/* Intro card — azure-800 bg */}
            <motion.div
              style={{ y: introY, opacity: introOp, minHeight: "40dvh" }}
              className="bg-azure-800 flex flex-col justify-between border-r border-azure-500/20 p-3 md:p-8"
            >
              <div>
                <p className="text-azure-400 font-mono text-[7.5px] tracking-[0.28em] uppercase mb-3 font-bold">
                  {content.eyebrow}
                </p>
                <h3
                  className="text-white font-black leading-[1.08] mb-3 text-sm md:text-2xl"
                  style={{ letterSpacing: "-1px" }}
                >
                  We help businesses become{" "}
                  <span className="text-azure-400">
                    {content.highlightedWords.better}
                  </span>{" "}
                  than they were{" "}
                  <span className="text-tangerine-500">
                    {content.highlightedWords.yesterday}
                  </span>
                </h3>
                <p className="text-white/50 leading-[1.75] text-[10px] md:text-xs">
                  {content.body}
                </p>
              </div>
              <button className="text-white bg-azure-500 self-start mt-4 rounded-full font-bold tracking-[0.12em] uppercase border-none text-[9px] md:text-[11px] px-[22px] py-[10px]">
                {content.cta}
              </button>
            </motion.div>

            {/* Service card — azure-900 bg */}
            <motion.div
              style={{ y: svcY, opacity: svcOp, minHeight: "40dvh" }}
              className="bg-azure-900 flex flex-col justify-between p-3 md:p-8"
            >
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <p className="text-azure-400 font-mono font-bold tracking-[0.28em] uppercase mb-2 text-[7px] md:text-[9px]">
                      {svc.tag} / {String(WWD.length).padStart(2, "0")}
                    </p>
                    <h4
                      className="text-white font-black leading-[1.1] mb-2 text-sm md:text-xl"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      {svc.label}
                    </h4>
                    <p className="text-white/40 leading-[1.65] text-[9px] md:text-xs">
                      {svc.tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                {WWD.map((sv, i) => (
                  <div key={i} className="flex items-center gap-2 mb-[7px]">
                    <span
                      className="font-mono text-[7px] font-bold min-w-[14px]"
                      style={{
                        color:
                          i === cur
                            ? "#5aa7e6"
                            : i < cur
                              ? "rgba(90,167,230,.45)"
                              : "rgba(90,167,230,.2)",
                      }}
                    >
                      {sv.tag}
                    </span>
                    <div className="flex-1">
                      {i === cur ? (
                        <ProgressBar
                          duration={5500}
                          running={!paused}
                          onComplete={next}
                          key={`pb-${cur}`}
                        />
                      ) : (
                        <div
                          className="h-px"
                          style={{
                            background:
                              i < cur
                                ? "rgba(90,167,230,.45)"
                                : "rgba(255,255,255,.08)",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex gap-[5px] mt-2.5">
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
                      className="w-[22px] h-[22px] rounded-full bg-transparent border border-azure-400/30 flex items-center justify-center"
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                        <path
                          d={d}
                          stroke="rgba(90,167,230,.6)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={() => setPaused((p) => !p)}
                    className="w-[22px] h-[22px] rounded-full bg-transparent border border-azure-400/30 text-azure-400 text-[9px] flex items-center justify-center"
                  >
                    {paused ? "▶" : "⏸"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
