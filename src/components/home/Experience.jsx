import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";

const DASHBOARD_IMG = "/image.png";

const STEPS = [
  {
    id: 0,
    tag: "The Need",
    label: "01 — Problem",
    color: "#e03e2d",
    light: "#fff0ee",
    border: "#f8b5ad",
    icon: "⚡",
    corner: "tl",
    floatDelay: 0,
    points: [
      "Unstructured billing",
      "No real-time visibility",
      "Fragmented tools",
      "Zero confidence",
    ],
  },
  {
    id: 1,
    tag: "Our Approach",
    label: "02 — Strategy",
    color: "#d95f0a",
    light: "#fff4ec",
    border: "#fdc08c",
    icon: "◎",
    corner: "tr",
    floatDelay: 0.8,
    points: [
      "System-first design",
      "Simplified workflows",
      "Intentional UX",
      "Biz + tech alignment",
    ],
  },
  {
    id: 2,
    tag: "The Solution",
    label: "03 — Build",
    color: "#1971c2",
    light: "#eef5ff",
    border: "#91c3fd",
    icon: "✦",
    corner: "bl",
    floatDelay: 1.6,
    points: [
      "Easy invoice creation",
      "Real-time tracking",
      "Clear records",
      "Friction removed",
    ],
  },
  {
    id: 3,
    tag: "Outcome",
    label: "04 — Results",
    color: "#2f9e44",
    light: "#ebfbee",
    border: "#8ce99a",
    icon: "↑",
    corner: "br",
    floatDelay: 2.4,
    points: [
      "60% less admin time",
      "22% more revenue",
      "3× faster invoicing",
      "Fully scalable",
    ],
  },
];

const DEVICES = [
  { id: "laptop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "phone", label: "Mobile" },
];

/* Scene dimensions — device width defines the 3D scene container width.
   Cards overlap the device edges using negative left/right offsets.      */
const SCENE = {
  laptop: {
    sceneW: 760,
    deviceH: 470,
    cardW: 188,
    cardZ: [80, 60, 70, 90],
    pos: {
      tl: { top: 60, left: -160 },
      tr: { top: 60, right: -160 },
      bl: { bottom: 70, left: -160 },
      br: { bottom: 70, right: -160 },
    },
  },
  tablet: {
    sceneW: 430,
    deviceH: 520,
    cardW: 166,
    cardZ: [70, 55, 60, 80],
    pos: {
      tl: { top: 50, left: -130 },
      tr: { top: 50, right: -130 },
      bl: { bottom: 60, left: -130 },
      br: { bottom: 60, right: -130 },
    },
  },
  phone: {
    sceneW: 295,
    deviceH: 550,
    cardW: 148,
    cardZ: [60, 45, 55, 70],
    pos: {
      tl: { top: 40, left: -110 },
      tr: { top: 40, right: -110 },
      bl: { bottom: 50, left: -110 },
      br: { bottom: 50, right: -110 },
    },
  },
};

/* ─── DEVICE FRAME ─── */
function DeviceFrame({ device, screenH, children }) {
  const cfg = {
    laptop: { radius: 14, bezel: 10, base: true },
    tablet: { radius: 26, bezel: 14, homeBtn: true },
    phone: { radius: 38, bezel: 8, notch: true },
  }[device];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1c1c1e",
          borderRadius: cfg.radius,
          padding: cfg.bezel,
          paddingTop: cfg.notch ? 0 : cfg.bezel,
          boxShadow: `
          0 50px 120px rgba(0,0,0,0.7),
          0 20px 40px rgba(0,0,0,0.4),
          0 0 0 1px rgba(255,255,255,0.08) inset,
          0 0 0 0.5px rgba(0,0,0,0.6)
        `,
          width: "100%",
        }}
      >
        {device === "laptop" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 8,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3a3a3a",
              }}
            />
          </div>
        )}
        {device === "tablet" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3a3a3a",
              }}
            />
          </div>
        )}
        {cfg.notch && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 10,
              paddingBottom: 8,
            }}
          >
            <div
              style={{
                width: 90,
                height: 26,
                borderRadius: 13,
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#252525",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#1e1e1e",
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{
            borderRadius: device === "laptop" ? "8px 8px 0 0" : 10,
            overflow: "hidden",
            height: screenH,
            position: "relative",
            background: "#111",
          }}
        >
          {children}
        </div>
        {cfg.homeBtn && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 12,
              paddingBottom: 4,
            }}
          >
            {device === "phone" ? (
              <div
                style={{
                  width: 100,
                  height: 4,
                  borderRadius: 2,
                  background: "#333",
                }}
              />
            ) : (
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#2a2a2a",
                  border: "1px solid #3a3a3a",
                }}
              />
            )}
          </div>
        )}
      </div>
      {cfg.base && (
        <>
          <div
            style={{
              height: 14,
              background: "linear-gradient(180deg,#2a2a2a,#1a1a1a)",
              borderRadius: "0 0 10px 10px",
              width: "100%",
            }}
          />
          <div
            style={{
              height: 4,
              background: "#0d0d0d",
              borderRadius: "0 0 4px 4px",
              width: "80%",
              marginTop: -1,
            }}
          />
        </>
      )}
    </div>
  );
}

/* ─── STEP CARD ─── */
function StepCard({
  step,
  idx,
  isActive,
  device,
  scenePos,
  cardW,
  cardZVal,
  onSelect,
}) {
  const isPhone = device === "phone";
  const pos = scenePos[step.corner];
  const onRight = step.corner === "tr" || step.corner === "br";

  return (
    <motion.div
      /* Continuous floating */
      animate={{ y: [0, -10, 0] }}
      transition={{
        repeat: Infinity,
        duration: 3.4,
        delay: step.floatDelay,
        ease: "easeInOut",
      }}
      onClick={() => onSelect(step.id)}
      style={{
        position: "absolute",
        width: cardW,
        zIndex: 20 + idx,
        cursor: "pointer",
        translateZ: cardZVal,
        ...pos,
      }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1 : 0.94,
          opacity: isActive ? 1 : 0.72,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 240 }}
        style={{
          background: isActive
            ? "rgba(255,255,255,0.97)"
            : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1.5px solid ${isActive ? step.color + "99" : "rgba(255,255,255,0.55)"}`,
          borderRadius: isPhone ? 12 : 16,
          padding: isPhone ? "11px 12px" : "14px 16px",
          boxShadow: isActive
            ? `0 20px 60px ${step.color}30, 0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${step.color}22`
            : "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
        }}
      >
        {/* Colored top bar */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${step.color}, ${step.color}88)`,
            transformOrigin: onRight ? "right" : "left",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isPhone ? 7 : 9,
            marginBottom: isPhone ? 8 : 10,
          }}
        >
          <motion.div
            animate={{ background: isActive ? step.color : "#e2e8f0" }}
            style={{
              width: isPhone ? 28 : 34,
              height: isPhone ? 28 : 34,
              borderRadius: isPhone ? 8 : 10,
              color: isActive ? "#fff" : "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isPhone ? 13 : 16,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {step.icon}
          </motion.div>
          <div>
            <div
              style={{
                fontSize: isPhone ? 8 : 9,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isActive ? step.color : "#94a3b8",
                marginBottom: 2,
                transition: "color 0.35s",
              }}
            >
              {step.label}
            </div>
            <div
              style={{
                fontSize: isPhone ? 12 : 13,
                fontWeight: 800,
                color: isActive ? "#0f172a" : "#64748b",
                lineHeight: 1.2,
                transition: "color 0.35s",
              }}
            >
              {step.tag}
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: isActive ? step.color + "20" : "#f1f5f9",
            marginBottom: isPhone ? 7 : 9,
          }}
        />

        {/* Points */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isPhone ? 4 : 5,
          }}
        >
          {step.points.map((pt, i) => (
            <motion.div
              key={i}
              animate={{ opacity: isActive ? 1 : 0.55, x: isActive ? 0 : 4 }}
              transition={{ delay: isActive ? i * 0.07 : 0 }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 7,
                fontSize: isPhone ? 10 : 11,
                color: isActive ? "#374151" : "#94a3b8",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: isPhone ? 4 : 5,
                  background: isActive ? step.color : "#d1d5db",
                  display: "inline-block",
                  transition: "background 0.35s",
                }}
              />
              {pt}
            </motion.div>
          ))}
        </div>

        {/* Active glow badge */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: step.color,
                border: "2.5px solid #fff",
                boxShadow: `0 0 0 3px ${step.color}44`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Connecting line to device edge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            ...(onRight ? { right: -28 } : { left: -28 }),
            width: 28,
            height: 1.5,
            background: isActive
              ? `linear-gradient(${onRight ? "270deg" : "90deg"}, transparent, ${step.color})`
              : "linear-gradient(90deg, transparent, #d1d5db)",
            transition: "background 0.35s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            ...(onRight ? { right: -32 } : { left: -32 }),
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isActive ? step.color : "#d1d5db",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: isActive ? `0 0 0 3px ${step.color}44` : "none",
            transition: "all 0.35s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN ─── */
export default function TruBillingExperience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [device, setDevice] = useState("laptop");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 80,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 80,
    damping: 25,
  });
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const onMouseMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left - r.width / 2) / r.width);
    mouseY.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!isInView || !isPlaying) return;
    const t = setInterval(
      () => setCurrentStep((s) => (s + 1) % STEPS.length),
      3200,
    );
    return () => clearInterval(t);
  }, [isInView, isPlaying]);

  const sc = SCENE[device];
  const step = STEPS[currentStep];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        fontFamily: "\'Inter\',-apple-system,sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Blurred background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${DASHBOARD_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(24px) brightness(0.25) saturate(0.6)",
          transform: "scale(1.08)",
          zIndex: 0,
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(160deg, rgba(10,15,30,0.7) 0%, rgba(5,10,20,0.55) 100%)",
        }}
      />
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.04,
          backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px),
                         repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)`,
        }}
      />

      {/* ── CONTENT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          width: "100%",
          maxWidth: 1300,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 100,
              padding: "5px 16px 5px 9px",
              fontSize: 10,
              fontWeight: 800,
              color: "#fb923c",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                background: "#F26522",
                color: "#fff",
                width: 20,
                height: 20,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
              }}
            >
              ✦
            </span>
            PRODUCT DEVELOPMENT JOURNEY
          </div>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.03em",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            How TruBilling came to life
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              margin: "10px 0 0",
              fontSize: 14,
            }}
          >
            Four stages · Move mouse for 3D · Click cards to jump
          </p>
        </motion.div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Device switcher */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: 4,
              gap: 2,
            }}
          >
            {DEVICES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "6px 16px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  background:
                    device === d.id ? "rgba(255,255,255,0.92)" : "transparent",
                  color: device === d.id ? "#0f172a" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Step pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              padding: "5px 8px",
            }}
          >
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStep(i);
                  setIsPlaying(false);
                }}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: currentStep === i ? "4px 12px 4px 6px" : "4px 9px",
                  borderRadius: 100,
                  background: currentStep === i ? s.color : "transparent",
                  border: `1px solid ${currentStep === i ? "transparent" : "rgba(255,255,255,0.15)"}`,
                  transition: "all 0.25s",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background:
                      currentStep === i
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(255,255,255,0.1)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {currentStep > i ? "✓" : i + 1}
                </div>
                {currentStep === i && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.tag}
                  </span>
                )}
              </button>
            ))}
            <div
              style={{
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.15)",
                margin: "0 2px",
              }}
            />
            <button
              onClick={() => setIsPlaying((p) => !p)}
              style={{
                all: "unset",
                cursor: "pointer",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: isPlaying
                  ? "rgba(220,38,38,0.2)"
                  : "rgba(47,158,68,0.2)",
                border: `1px solid ${isPlaying ? "rgba(220,38,38,0.4)" : "rgba(47,158,68,0.4)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: isPlaying ? "#f87171" : "#6ee7b7",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        </div>

        {/* ── 3D SCENE ── */}
        <div
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 45%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              position: "relative",
              width: sc.sceneW,
              /* Room for side cards */
              margin: "0 220px",
            }}
            animate={{ width: sc.sceneW }}
            transition={{ type: "spring", damping: 28, stiffness: 180 }}
          >
            {/* Step cards */}
            {STEPS.map((s, i) => (
              <StepCard
                key={s.id}
                step={s}
                idx={i}
                isActive={s.id === currentStep}
                device={device}
                scenePos={sc.pos}
                cardW={sc.cardW}
                cardZVal={sc.cardZ[i]}
                onSelect={(id) => {
                  setCurrentStep(id);
                  setIsPlaying(false);
                }}
              />
            ))}

            {/* Device — sits at z=0 in the 3D scene */}
            <motion.div style={{ translateZ: 0 }}>
              <DeviceFrame device={device} screenH={sc.deviceH}>
                {/* Dashboard screenshot */}
                <img
                  src={DASHBOARD_IMG}
                  alt="TruBilling Dashboard"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top left",
                    display: "block",
                  }}
                />
                {/* Subtle inner top gradient for browser chrome feel */}
                {device === "laptop" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(248,250,252,0.92)",
                      backdropFilter: "blur(8px)",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      padding: "7px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      zIndex: 5,
                    }}
                  >
                    <div style={{ display: "flex", gap: 4 }}>
                      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div
                          key={c}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: c,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: 10,
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <span style={{ fontSize: 9 }}>🔒</span>
                      app.trubilling.com/dashboard
                    </div>
                    <div
                      style={{
                        background: step.color,
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 5,
                      }}
                    >
                      Live
                    </div>
                  </div>
                )}

                {/* Centre animated step label */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    zIndex: 4,
                    pointerEvents: "none",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 14,
                        padding: "12px 18px",
                        border: `1.5px solid ${step.color}55`,
                        boxShadow: `0 12px 48px ${step.color}30, 0 4px 16px rgba(0,0,0,0.1)`,
                        textAlign: "center",
                        minWidth: device === "phone" ? 120 : 150,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 8,
                          fontWeight: 800,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          color: step.color,
                          marginBottom: 4,
                        }}
                      >
                        Step {currentStep + 1} / {STEPS.length}
                      </div>
                      <div
                        style={{
                          fontSize:
                            device === "phone"
                              ? 14
                              : device === "tablet"
                                ? 16
                                : 19,
                          fontWeight: 800,
                          color: "#0f172a",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.2,
                        }}
                      >
                        {step.tag}
                      </div>
                      <div
                        style={{
                          fontSize: device === "phone" ? 9 : 10,
                          color: "#64748b",
                          marginTop: 3,
                          fontWeight: 500,
                        }}
                      >
                        {step.points[0]}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom progress bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "rgba(0,0,0,0.15)",
                    zIndex: 6,
                  }}
                >
                  <motion.div
                    animate={{
                      width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: step.color,
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                </div>
              </DeviceFrame>
            </motion.div>

            {/* Floor reflection */}
            <motion.div
              style={{
                translateZ: 0,
                position: "absolute",
                bottom: -40,
                left: "10%",
                right: "10%",
                height: 40,
                background: `radial-gradient(ellipse at 50% 0%, ${step.color}25 0%, transparent 70%)`,
                filter: "blur(12px)",
                transition: "background 0.5s",
              }}
            />
          </motion.div>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: step.color,
                display: "inline-block",
              }}
            />
            {step.label} · {step.tag} · {step.points[0]}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
