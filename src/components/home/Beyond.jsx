import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function CountUp({ to, suffix = "", duration = 1400, inView }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) { setVal(0); return; }
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

  return <>{val}{suffix}</>;
}

export default function Beyond() {
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "transparent",
        padding: 0,
      }}
    >
      {/* ── Content area ── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(56px,7vw,96px) clamp(20px,4vw,48px) clamp(48px,5vw,72px)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left — heading */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(25,128,194,.1)",
                border: "1px solid rgba(25,128,194,.2)",
                borderRadius: 99,
                padding: "4px 12px 4px 8px",
                marginBottom: 22,
                width: "fit-content",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1980c2" }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: "#1980c2", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Work With Us
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(26px,3.2vw,46px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -0.7,
                color: "#181817",
                marginBottom: 16,
              }}
            >
              We don't just deliver projects,
              <br />
              we build long-term partnerships.
            </h2>
            <p
              style={{
                fontSize: "clamp(13px,1.3vw,15px)",
                color: "#556",
                lineHeight: 1.72,
                maxWidth: 420,
              }}
            >
              Our work extends beyond initial delivery. We support organizations
              across digital platforms, brand systems, and communication needs
              as they grow and evolve.
            </p>
            <p
              style={{
                fontSize: "clamp(13px,1.3vw,15px)",
                color: "#181817",
                fontWeight: 700,
                lineHeight: 1.5,
                maxWidth: 380,
                marginTop: 16,
              }}
            >
              Let's build something that performs.
            </p>
          </motion.div>

          {/* Right — stats + CTAs */}
          <motion.div className="flex flex-col justify-between" style={{ paddingTop: "clamp(0px,1vw,16px)" }} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1], delay:0.15 }}>
            {/* Count-up stats */}
            <div
              ref={statsRef}
              style={{ display: "flex", gap: "clamp(24px,4vw,52px)", marginBottom: 36, flexWrap: "wrap" }}
            >
              {[
                { to: 50, suffix: "+", label: "Projects launched" },
                { to: 98, suffix: "%", label: "Client retention" },
                { to: 6,  suffix: " wk", label: "Avg. ship time" },
              ].map(({ to, suffix, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "clamp(28px,2.8vw,40px)",
                      fontWeight: 900,
                      color: "#1980c2",
                      letterSpacing: -0.6,
                      lineHeight: 1,
                      marginBottom: 5,
                    }}
                  >
                    <CountUp to={to} suffix={suffix} inView={inView} />
                  </div>
                  <div style={{ fontSize: 10.5, color: "#888", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button className="bg-[#181817] text-white border-none rounded-lg px-7 py-3 text-xs font-bold tracking-wider h-auto hover:bg-[#2a2a28]">
                Start a Project →
              </Button>
              <Button variant="outline" className="bg-white/70 text-[#181817] border-[rgba(24,24,23,.14)] rounded-lg px-7 py-3 text-xs font-semibold tracking-wider h-auto">
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Landscape photo — fades into Contact ── */}
      <motion.div style={{ position: "relative", height: "clamp(260px,26vw,400px)", overflow: "hidden" }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}>
        <img
          src="/mad.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
        />
        {/* Floating badge */}
        
        {/* Bottom fade into Contact bg */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            background: "linear-gradient(to bottom, transparent 0%, #bddff5 100%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </section>
  );
}
