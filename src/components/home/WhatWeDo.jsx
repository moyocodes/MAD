import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

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

export default function WhatWeDo() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setCur((c) => (c + 1) % WWD.length), []);
  const svc = WWD[cur];

  return (
    <section
      style={{
        background: "transparent",
        paddingTop: 72,
      }}
    >
      {/* Intro row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12 px-4 sm:px-8 max-w-[1100px] mx-auto">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}>
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
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1], delay:0.12 }}>
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
      <motion.div className="max-w-[1100px] mx-auto px-1" initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:[0.16,1,0.3,1], delay:0.08 }}>
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
      </motion.div>
    </section>
  );
}
