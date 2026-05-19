import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ to, suffix = "", duration = 1600, inView }) {
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

// ── Floating orb ─────────────────────────────────────────────────────────────
function FloatingOrb({ size, top, left, delay, color = "rgba(25,128,194,0.12)" }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        top,
        left,
        pointerEvents: "none",
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 12, 0],
        scale: [1, 1.06, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ── Pillar card data ──────────────────────────────────────────────────────────
const pillars = [
  {
    icon: "🖥️",
    label: "Digital Platforms",
    desc: "Robust, scalable web products built to grow with your organization at every stage.",
    badges: ["Web Apps", "CMS", "E-commerce"],
    accent: "#1980c2",
  },
  {
    icon: "🎨",
    label: "Brand Systems",
    desc: "Cohesive visual identities and design languages that speak consistently across every touchpoint.",
    badges: ["Identity", "Design Systems"],
    accent: "#1468a0",
  },
  {
    icon: "📣",
    label: "Communication",
    desc: "Strategic messaging, content, and campaigns that connect with the right audience at the right moment.",
    badges: ["Content", "Campaigns", "Copy"],
    accent: "#0f4f7a",
  },
];

// ── Animated text split ───────────────────────────────────────────────────────
function SplitText({ text, className, style, stagger = 0.04, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ ...style, display: "block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * stagger,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Beyond() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [20, -100]);
  const bgPosY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const smoothOrbY1 = useSpring(orbY1, { stiffness: 60, damping: 20 });
  const smoothOrbY2 = useSpring(orbY2, { stiffness: 40, damping: 15 });
  const smoothOrbY3 = useSpring(orbY3, { stiffness: 80, damping: 25 });

  const [hoveredCard, setHoveredCard] = useState(null);

  // Stagger container variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.88, rotateY: -12 },
    visible: {
      opacity: 1, y: 0, scale: 1, rotateY: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, #eef7fd 0%, #d9ecfa 45%, #b3d8f5 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(64px,8vw,112px) clamp(20px,5vw,64px)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Parallax orbs ── */}
      <motion.div style={{ y: smoothOrbY1, position: "absolute", top: -80, right: -80, pointerEvents: "none" }}>
        <FloatingOrb size={420} top={0} left={0} delay={0} color="rgba(25,128,194,0.10)" />
      </motion.div>
      <motion.div style={{ y: smoothOrbY2, position: "absolute", bottom: -100, left: -60, pointerEvents: "none" }}>
        <FloatingOrb size={320} top={0} left={0} delay={1.5} color="rgba(20,104,160,0.09)" />
      </motion.div>
      <motion.div style={{ y: smoothOrbY3, position: "absolute", top: "30%", left: "40%", pointerEvents: "none" }}>
        <FloatingOrb size={180} top={0} left={0} delay={3} color="rgba(25,128,194,0.06)" />
      </motion.div>

      {/* ── Animated grid lines ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(25,128,194,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(25,128,194,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      {/* ── Main container ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

   

        {/* ── Two-column grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "clamp(32px,4vw,72px)", alignItems: "center" }}>

          {/* ── LEFT column ── */}
          <div style={{ perspective: 800 }}>

            {/* Heading with wild split animation */}
            <div style={{ marginBottom: 20, lineHeight: 1.08 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(28px,3.4vw,46px)", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a3654" }}>
                <SplitText text="We don't just deliver projects," delay={0} stagger={0.05} />
                <SplitText
                  text="we build long-term"
                  delay={0.3}
                  stagger={0.06}
                  style={{ color: "#1980c2" }}
                />
                <SplitText text="partnerships." delay={0.55} stagger={0.07} />
              </h2>
            </div>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 3, width: 56, background: "#1980c2", borderRadius: 2, marginBottom: 28 }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "clamp(14px,1.3vw,15.5px)", color: "#1468a0", lineHeight: 1.8, margin: "0 0 28px", maxWidth: 420 }}
            >
              Our work extends beyond initial delivery. We support organizations across digital platforms, brand systems, and communication needs as they grow and evolve.
            </motion.p>

            {/* Closing line */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(16px,1.6vw,22px)", fontWeight: 800,
                color: "#0a3654", letterSpacing: "-0.015em",
                margin: "0 0 36px",
              }}
            >
              Let's build something that performs.
            </motion.p>

          
          </div>
      <div>

  {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 36px rgba(25,128,194,0.40)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#1980c2", color: "#fff",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "14px 30px", borderRadius: 100, border: "none", cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(25,128,194,0.30)", transition: "box-shadow 0.2s",
                }}
              >
                Start a project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2, background: "rgba(25,128,194,0.10)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", color: "#1468a0",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "14px 30px", borderRadius: 100,
                  border: "1.5px solid rgba(25,128,194,0.4)", cursor: "pointer", transition: "background 0.2s",
                }}
              >
                See our work
              </motion.button>
            </motion.div>
      </div>
   
        </div>
      </div>
    </section>
  );
}