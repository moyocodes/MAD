import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── PALETTE — one accent, everything else neutral ────────────────────────────
const C = {
  accent: "#1980c2", // azure-500 — used sparingly
  accentLight: "#eef7fd", // azure-50
  accentBorder: "#b3d8f5", // azure-200
  bg: "#f5f1eb", // cream-100
  surface: "#ffffff",
  surfaceAlt: "#faf9f7",
  border: "#e8e2d9",
  borderStrong: "#d0c9be",
  text: "#0a1628", // near-black
  textMuted: "#6b6560",
  textFaint: "#a09890",
  dark: "#0f0d0b",
};

// ─── COPY ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    tag: "The Need",
    points: [
      "Unstructured billing processes",
      "Difficulty tracking invoices",
      "No real-time financial visibility",
      "Fragmented manual tools",
    ],
  },
  {
    num: "02",
    tag: "Our Approach",
    points: [
      "System design, not just software",
      "Simplified financial workflows",
      "Clean, intuitive UX at every step",
      "Scalability built in from day one",
    ],
  },
  {
    num: "03",
    tag: "The Solution",
    points: [
      "Create & manage invoices easily",
      "Real-time payment tracking",
      "Clear, organised financial records",
      "Reduced operational friction",
    ],
  },
  {
    num: "04",
    tag: "Outcome",
    points: [
      "60% less admin overhead",
      "22% revenue increase",
      "3× faster invoicing",
      "Infinitely scalable architecture",
    ],
    outcomes: ["60%", "22%", "3×", "∞"],
  },
];

const DEVICES = [
  {
    id: "laptop",
    label: "Desktop",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x=".8"
          y="1.5"
          width="11.4"
          height="8"
          rx="1.1"
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path
          d="M4 9.5L3.5 12h6L9 9.5"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="2.5"
          y=".8"
          width="8"
          height="11.4"
          rx="1.1"
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <circle cx="6.5" cy="10.6" r=".65" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Mobile",
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect
          x="3.8"
          y=".8"
          width="5.4"
          height="11.4"
          rx="1.1"
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <circle cx="6.5" cy="10.6" r=".6" fill="currentColor" />
      </svg>
    ),
  },
];

// ─── SCREEN IMAGE — replace with your own ────────────────────────────────────
const SCREEN_IMAGE = "/image.png";

// ─── POINT CARD — neutral with azure accent on active step only ───────────────
function PointCard({ text, index, side, isActive, outcomeVal, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28, delay }}
      className="flex items-start gap-2.5 py-2 px-2.5 rounded-lg"
      style={{
        background: isActive ? C.accentLight : C.surfaceAlt,
        border: `1px solid ${isActive ? C.accentBorder : C.border}`,
      }}
    >
      <div
        className="flex-shrink-0 w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-black mt-0.5"
        style={{
          background: isActive ? C.accent : C.border,
          color: isActive ? "#fff" : C.textMuted,
        }}
      >
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[11px] font-semibold leading-snug"
          style={{ color: C.text }}
        >
          {text}
        </p>
        {outcomeVal && (
          <span
            className="inline-block mt-1 text-[11px] font-black"
            style={{ color: isActive ? C.accent : C.textMuted }}
          >
            {outcomeVal}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── STEP PANEL ───────────────────────────────────────────────────────────────
function StepPanel({ step, isActive, side, isInView, onClick }) {
  return (
    <div className="flex flex-col gap-1.5 cursor-pointer" onClick={onClick}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black flex-shrink-0 transition-all duration-200"
          style={{
            background: isActive ? C.accent : C.border,
            color: isActive ? "#fff" : C.textMuted,
          }}
        >
          {step.num}
        </div>
        <span
          className="text-[10px] font-black uppercase tracking-wider transition-colors duration-200"
          style={{ color: isActive ? C.accent : C.textFaint }}
        >
          {step.tag}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeStepLine"
            className="flex-1 h-px"
            style={{ background: C.accentBorder }}
          />
        )}
      </div>

      {/* Points */}
      {isInView &&
        step.points.map((pt, i) => (
          <PointCard
            key={i}
            text={pt}
            index={i}
            side={side}
            isActive={isActive}
            outcomeVal={step.outcomes?.[i]}
            delay={i * 0.055}
          />
        ))}
    </div>
  );
}

// ─── DEVICES ─────────────────────────────────────────────────────────────────
function LaptopDevice({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.22))" }}
    >
      <div
        className="rounded-t-xl overflow-hidden"
        style={{
          background: "#1a1714",
          padding: "8px 10px 0",
          border: "1.5px solid #0c0a08",
          borderBottom: "none",
        }}
      >
        <div className="flex justify-center mb-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#252118" }}
          />
        </div>
        <div
          className="rounded-t-sm overflow-hidden relative"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Browser bar */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-2.5 py-1"
            style={{
              background: "rgba(10,8,6,0.97)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1">
              {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                <div
                  key={c}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div
              className="flex-1 max-w-[160px] mx-auto flex items-center gap-1 rounded px-2 py-0.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <svg width="6" height="7" viewBox="0 0 6 7" fill="none">
                <rect
                  x=".4"
                  y="3"
                  width="5.2"
                  height="3.6"
                  rx=".7"
                  stroke="rgba(255,255,255,0.38)"
                  strokeWidth=".65"
                />
                <path
                  d="M1.7 3V2.1a1.3 1.3 0 012.6 0V3"
                  stroke="rgba(255,255,255,0.38)"
                  strokeWidth=".65"
                />
              </svg>
              <span style={{ fontSize: 7, color: "rgba(255,255,255,0.32)" }}>
                trubilling.app
              </span>
            </div>
          </div>
          <img
            src={SCREEN_IMAGE}
            alt="TruBilling dashboard"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              top: 18,
              height: "calc(100% - 18px)",
              objectPosition: "top center",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top,rgba(0,0,0,0.35),transparent)",
            }}
          />
          {/* Notification */}
          <motion.div
            initial={{ y: -28, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-6 right-2 z-20 flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
            style={{
              background: "rgba(10,8,6,0.92)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="w-3.5 h-3.5 rounded flex-shrink-0 flex items-center justify-center"
              style={{
                background: C.accent,
                fontSize: 6,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              TB
            </div>
            <div>
              <div
                style={{
                  fontSize: 6.5,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                TruBilling
              </div>
              <div
                style={{
                  fontSize: 6,
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 1.5,
                }}
              >
                Invoice paid · ₦3,200,000
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          height: 6,
          background: "linear-gradient(to bottom,#1a1714,#111009)",
          border: "1.5px solid #0c0a08",
          borderTop: "none",
          borderBottom: "none",
        }}
      />
      <div
        className="rounded-b-xl flex items-center justify-center"
        style={{
          height: 16,
          background: "#0a0806",
          border: "1.5px solid #0c0a08",
          borderTop: "none",
        }}
      >
        <div
          className="rounded-sm"
          style={{ width: 52, height: 6, background: "#060504" }}
        />
      </div>
    </motion.div>
  );
}

function TabletDevice({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.22))",
        maxWidth: 240,
        margin: "0 auto",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#1a1714",
          padding: "10px 8px",
          border: "2px solid #0c0a08",
        }}
      >
        <div className="flex justify-center mb-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#252118" }}
          />
        </div>
        <div
          className="rounded-xl overflow-hidden relative"
          style={{ aspectRatio: "3/4" }}
        >
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1 px-2 py-1"
            style={{
              background: "rgba(10,8,6,0.97)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1">
              {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                <div
                  key={c}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div
              className="flex-1 text-center"
              style={{ fontSize: 6.5, color: "rgba(255,255,255,0.3)" }}
            >
              trubilling.app
            </div>
          </div>
          <img
            src={SCREEN_IMAGE}
            alt="TruBilling tablet"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              top: 18,
              height: "calc(100% - 18px)",
              objectPosition: "top center",
            }}
          />
        </div>
        <div className="flex justify-center mt-2">
          <div
            className="w-6 h-1 rounded-full"
            style={{ background: "#252118" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function PhoneDevice({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.22))",
        maxWidth: 160,
        margin: "0 auto",
      }}
    >
      <div
        className="rounded-[26px] overflow-hidden"
        style={{
          background: "#1a1714",
          padding: "12px 7px",
          border: "2px solid #0c0a08",
        }}
      >
        <div className="flex justify-center mb-1.5">
          <div
            className="w-10 h-2.5 rounded-full"
            style={{ background: "#0c0a08" }}
          />
        </div>
        <div
          className="rounded-xl overflow-hidden relative"
          style={{ aspectRatio: "9/19.5" }}
        >
          <img
            src={SCREEN_IMAGE}
            alt="TruBilling mobile"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "top center" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-2.5"
            style={{
              background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)",
            }}
          >
            <div style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>
              TruBilling
            </div>
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,0.5)",
                marginTop: 1,
              }}
            >
              ₦22.8M invoiced
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div
            className="w-12 h-0.5 rounded-full"
            style={{ background: "#252118" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function DeviceFrame({ device, isInView }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={device}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {device === "laptop" && <LaptopDevice isInView={isInView} />}
        {device === "tablet" && <TabletDevice isInView={isInView} />}
        {device === "phone" && <PhoneDevice isInView={isInView} />}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-4% 0px" });
  const [device, setDevice] = useState("laptop");
  const [activeStep, setActiveStep] = useState(1); // "Our Approach" highlighted by default

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: C.bg,
        height: "100vh",
        minHeight: 640,
        maxHeight: 900,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${C.borderStrong} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />
      {/* Single azure glow — top centre */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-20%",
          left: "30%",
          width: "40%",
          height: "60%",
          background: `radial-gradient(ellipse, rgba(25,128,194,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* ── TOOLBAR ── */}
      <div
        className="relative z-20 flex-shrink-0 flex items-center justify-between px-6 py-2"
        style={{
          background: C.dark,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
            style={{ background: C.accent }}
          >
            TB
          </div>
          <span
            className="text-[11px] font-bold"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            tru<span style={{ color: C.accent }}>billing</span>
          </span>
          <div
            className="h-3 w-px mx-1"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <span
            className="text-[9px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Product Development
          </span>
        </div>

        {/* Device toggle */}
        <div
          className="flex rounded-lg overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {DEVICES.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200"
              style={{
                background: device === d.id ? C.accent : "transparent",
                color: device === d.id ? "#fff" : "rgba(255,255,255,0.28)",
                fontSize: 9,
                fontWeight: 600,
                borderRight:
                  i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color: device === d.id ? "#fff" : "rgba(255,255,255,0.28)",
                }}
              >
                {d.icon}
              </span>
              {d.label}
            </button>
          ))}
        </div>

        <button
          className="px-3.5 py-1.5 rounded-lg text-[10px] font-black text-white"
          style={{ background: C.accent }}
        >
          Publish ↗
        </button>
      </div>

      {/* ── SECTION HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex-shrink-0 flex items-center justify-between px-8 pt-5 pb-3"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black text-white flex-shrink-0"
            style={{
              background: C.accent,
              boxShadow: "0 6px 20px rgba(25,128,194,.25)",
            }}
          >
            TB
          </div>
          <div>
            <p
              className="text-[8px] font-black tracking-[.25em] uppercase"
              style={{ color: C.accent, opacity: 0.7 }}
            >
              Section 03 · Case Study
            </p>
            <h2
              className="font-black tracking-tight leading-tight text-[22px]"
              style={{ color: C.text }}
            >
              TruBilling{" "}
              <span
                style={{
                  color: C.accent,
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontFamily: "Georgia, serif",
                }}
              >
                — built by MAD
              </span>
            </h2>
          </div>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8.5px] font-black tracking-wide transition-all duration-200"
              style={{
                border: `1.5px solid ${i === activeStep ? C.accent : C.border}`,
                background: i === activeStep ? C.accentLight : "transparent",
                color: i === activeStep ? C.accent : C.textFaint,
                cursor: "pointer",
              }}
            >
              {i === activeStep && (
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: C.accent }}
                />
              )}
              {s.num} {s.tag}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="relative z-10 px-8 flex-shrink-0">
        <div
          className="h-px rounded-full overflow-hidden"
          style={{ background: C.border }}
        >
          <motion.div
            animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${C.accent}, #5aa7e6)`,
            }}
          />
        </div>
      </div>

      {/* ── MAIN 3-COL ── */}
      <div
        className="relative z-10 flex-1 min-h-0"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 36% 1fr",
          gap: 0,
          padding: "16px 14px 16px",
        }}
      >
        {/* LEFT — steps 01 + 02 stacked */}
        <div
          className="flex flex-col gap-4 overflow-hidden"
          style={{ paddingRight: 12 }}
        >
          {[STEPS[0], STEPS[1]].map((step, si) => (
            <StepPanel
              key={step.num}
              step={step}
              side="left"
              isActive={activeStep === si}
              isInView={isInView}
              onClick={() => setActiveStep(si)}
            />
          ))}
        </div>

        {/* CENTER — device + mini panel */}
        <div
          className="flex flex-col gap-3 overflow-hidden"
          style={{ padding: "0 10px" }}
        >
          <DeviceFrame device={device} isInView={isInView} />

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveStep(i)}
                animate={{
                  width: i === activeStep ? 16 : 5,
                  background: i === activeStep ? C.accent : C.borderStrong,
                }}
                transition={{ duration: 0.25 }}
                className="h-1 rounded-full"
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          {/* Compact metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <div
              className="flex items-center justify-between px-3.5 py-2"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: C.accent }}
                />
                <span
                  className="text-[10px] font-bold"
                  style={{ color: C.text }}
                >
                  Insights
                </span>
              </div>
              <span className="text-[8px]" style={{ color: C.textFaint }}>
                Apr 2024
              </span>
            </div>
            <div
              className="grid grid-cols-4 divide-x"
              style={{ borderColor: C.border }}
            >
              {[
                { label: "Invoiced", val: "₦22.8M" },
                { label: "Quotes", val: "₦4.7M" },
                { label: "Paid", val: "₦4.9M" },
                { label: "Contacts", val: "247" },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="px-2.5 py-2"
                  style={{ borderColor: C.border }}
                >
                  <div
                    className="text-[7.5px] font-medium mb-0.5"
                    style={{ color: C.textFaint }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-[11px] font-black"
                    style={{ color: C.text }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Outcome stats — replaces the heavy outro banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65 }}
            className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{
              background: C.accentLight,
              border: `1px solid ${C.accentBorder}`,
            }}
          >
            {[
              ["60%", "Less admin"],
              ["22%", "Revenue ↑"],
              ["3×", "Faster"],
              ["∞", "Scalable"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div
                  className="text-[16px] font-black leading-none"
                  style={{ color: C.accent }}
                >
                  {val}
                </div>
                <div
                  className="text-[7.5px] font-semibold mt-0.5"
                  style={{ color: C.textMuted }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — steps 03 + 04 */}
        <div
          className="flex flex-col gap-4 overflow-hidden"
          style={{ paddingLeft: 12 }}
        >
          {[STEPS[2], STEPS[3]].map((step, si) => (
            <StepPanel
              key={step.num}
              step={step}
              side="right"
              isActive={activeStep === si + 2}
              isInView={isInView}
              onClick={() => setActiveStep(si + 2)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        .divide-x > * + * { border-left: 1px solid #e8e2d9; }
      `}</style>
    </section>
  );
}
