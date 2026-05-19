import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

const content = homeCms.beyond;

function CountUp({ to, suffix = "", duration = 1400, inView }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, to, duration]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

export default function Beyond() {
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);
  const titleLines = content.title.split("\n");

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#0c0c0e", position: "relative" }}>
      {/* Sticky header — dark variant */}
      <div className="section-sticky-title--dark">
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(20px,4vw,48px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(25,128,194,.15)",
              border: "1px solid rgba(25,128,194,.25)",
              borderRadius: 99,
              padding: "4px 12px 4px 8px",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#45b3f5",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#45b3f5",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {content.eyebrow}
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(28px,3.8vw,52px)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1,
              color: "#fff",
              maxWidth: 700,
            }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(40px,5vw,72px) clamp(20px,4vw,48px)",
        }}
      >
        {/* Stat cards */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(10px,1.8vw,20px)",
            marginBottom: "clamp(36px,4vw,56px)",
          }}
        >
          {content.stats.map(({ to, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                padding: "clamp(22px,2.8vw,36px)",
                position: "relative",
                overflow: "hidden",
                animation: "pulseGlow 3s ease-in-out infinite",
              }}
            >
              {/* Blue accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "linear-gradient(90deg,#1980c2,#45b3f5)",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  fontSize: "clamp(40px,4.5vw,64px)",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: -2,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                <span style={{ color: "#45b3f5" }}>
                  <CountUp to={to} suffix={suffix} inView={inView} />
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.38)",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Body + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(20px,3vw,40px)",
            alignItems: "end",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "clamp(28px,3vw,40px)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "clamp(13px,1.2vw,15px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.78,
                maxWidth: 500,
                marginBottom: 12,
              }}
            >
              {content.body}
            </p>
            <p
              style={{
                fontSize: "clamp(13px,1.2vw,15px)",
                color: "#fff",
                fontWeight: 700,
                lineHeight: 1.5,
                maxWidth: 400,
              }}
            >
              {content.emphasis}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Button className="bg-gradient-to-r from-[#1980c2] to-[#45b3f5] text-white border-none rounded-full px-7 py-3 text-xs font-bold tracking-wider h-auto hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(25,128,194,.35)]">
              {content.primaryCta}
            </Button>
            <Button
              variant="outline"
              className="bg-white/[.06] text-white border-white/[.12] rounded-full px-7 py-3 text-xs font-semibold tracking-wider h-auto hover:bg-white/[.1] transition-colors"
            >
              {content.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
