import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WWD = [
  {
    tag: "01",
    label: "Product & Digital Solutions",
    tagline: "Websites, apps & platforms built to scale with confidence.",
    wide: "/web.png",
    top: "/app.png",
  },
  {
    tag: "02",
    label: "Marketing & Communication",
    tagline:
      "Campaigns that build relevance and connect brands with the right audience.",
    wide: "/soc.png",
    top: "/post.png",
  },
  {
    tag: "03",
    label: "Brand & Design Systems",
    tagline:
      "Brand systems with clarity, consistency, and credibility at every touchpoint.",
    wide: "/loggg.png",
    top: "/brandd.png",
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

const ease = [0.16, 1, 0.3, 1];

export default function WhatWeDo() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setCur((c) => (c + 1) % WWD.length), []);
  const svc = WWD[cur];

  return (
    <section style={{ background: "transparent", paddingTop: 40 }}>
      {/* Intro row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-8 px-4 sm:px-8 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.72,
              marginBottom: 16,
            }}
          >
            MAD is a product, marketing, and design firm focused on
            collaborating with the brightest minds in business to create smarter
            systems, stronger brands, and better digital experiences.
          </p>
          <div
            className="border-l-2 border-azure-500 bg-tangerine-50 text-azure-700"
            style={{ padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}
          >
            We create the conditions for growth by helping organizations balance
            business (value), design (usability) and technology (feasibility).
          </div>
        </motion.div>
      </div>

      {/* Image grid */}
      <motion.div
        className="w-full px-4 sm:px-6"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Big left */}
          <motion.div
            className="md:row-span-2 relative overflow-hidden"
            style={{ minHeight: 480 }}
            whileHover="hover"
          >
            {WWD.map((sv, i) => (
              <motion.img
                key={i}
                src={sv.wide}
                alt=""
                variants={{ hover: { scale: 1.04 } }}
                transition={{ duration: 0.6, ease }}
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
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
                    style={{ fontSize: 12, marginBottom: 16 }}
                  >
                    {svc.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
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
              <AnimatePresence mode="wait">
                <motion.span
                  key={cur}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease }}
                  className="bg-black/30 text-white/50"
                  style={{
                    display: "inline-block",
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
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Top right */}
          <motion.div
            className="relative overflow-hidden"
            style={{ minHeight: 240 }}
            whileHover="hover"
          >
            {WWD.map((sv, i) => (
              <motion.img
                key={i}
                src={sv.top}
                alt=""
                variants={{ hover: { scale: 1.04 } }}
                transition={{ duration: 0.6, ease }}
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
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
                    style={{ fontSize: "clamp(12px,2vw,18px)", fontWeight: 300 }}
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
                </motion.div>
              </AnimatePresence>
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
          </motion.div>

          {/* Bottom right: 2 cards */}
          <div className="grid grid-cols-2 gap-1">
            {/* Core value */}
            <motion.div
              className="bg-white"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #d4dff0",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease, delay: 0.3 }}
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
            </motion.div>

            {/* Nav */}
            <motion.div
              className="bg-white"
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
            >
              <div
                style={{
                  border: "2px solid #181817",
                  padding: "8px 10px",
                  marginBottom: 12,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-dark-900"
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(8px,1vw,10px)",
                      lineHeight: 1.3,
                    }}
                  >
                    {svc.label}
                  </motion.div>
                </AnimatePresence>
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
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div
        style={{
          height: 100,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, transparent, rgba(230,242,251,0.6))",
        }}
      />
    </section>
  );
}
