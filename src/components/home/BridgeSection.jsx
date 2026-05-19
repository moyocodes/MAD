import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * BridgeSection
 * Drop this between <Beyond /> and <Contact />.
 * It creates a tall scroll space that:
 *  1. Fades the warm beyond-gradient → cool contact-gradient
 *  2. Floats the phone up from below, scales it in, centers it
 *  3. Hands off cleanly to Contact with the phone already sticky-positioned
 *
 * Props:
 *  phoneSlot — ReactNode  — render your <PhoneShell /> or whatever you pass
 */
export default function BridgeSection({ phoneSlot }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const spring = (v) => useSpring(v, { stiffness: 60, damping: 22 });

  // Background: beyond warm → contact cool
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);

  // Phone: rises from +120px → 0, fades in, scales up
  const phoneY = spring(useTransform(scrollYProgress, [0.05, 0.55], [140, 0]));
  const phoneOp = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const phoneScale = spring(
    useTransform(scrollYProgress, [0.05, 0.55], [0.88, 1]),
  );

  // Label fades in a beat after phone
  const labelOp = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const labelY = spring(useTransform(scrollYProgress, [0.3, 0.55], [12, 0]));

  // Divider line widens
  const lineW = useTransform(scrollYProgress, [0.4, 0.7], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "200vh",
        overflow: "hidden",
      }}
    >
      {/* Beyond gradient — always present underneath */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background:
            "linear-gradient(135deg, #dff0fb 0%, #e8f5fb 35%, #fff4ef 68%, #fdeadb 100%)",
          zIndex: 0,
        }}
      />

      {/* Contact gradient — fades in on scroll */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg, #dff0fb 0%, #fff8f5 98%, #fdeadb 48%, #e8f5fb 68%, #fff4ef 84%, #e0f0fb 100%)",
          opacity: bgOpacity,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Sticky content well */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {/* Eyebrow label */}
        <motion.p
          style={{
            opacity: labelOp,
            y: labelY,
            fontFamily: "monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(25,128,194,.55)",
            marginBottom: 24,
            pointerEvents: "none",
          }}
        >
          Chat with MAD AI
        </motion.p>

        {/* Phone */}
        <motion.div
          style={{
            opacity: phoneOp,
            y: phoneY,
            scale: phoneScale,
            pointerEvents: "auto",
            filter:
              "drop-shadow(0 40px 80px rgba(15,42,69,.18)) drop-shadow(0 12px 32px rgba(15,42,69,.12))",
          }}
        >
          {phoneSlot}
        </motion.div>

        {/* Divider — grows as you approach Contact */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: 1,
            width: lineW,
            background:
              "linear-gradient(90deg, transparent, rgba(25,128,194,.18), transparent)",
          }}
        />
      </div>
    </section>
  );
}
