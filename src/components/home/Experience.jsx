import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const STEPS = [
  {
    tag: "The Need",
    num: "01",
    color: "#C92534",
    bg: "#FEF2F3",
    border: "#FCCDD0",
    textColor: "#991B1B",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 4v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    points: [
      "Unstructured billing across teams",
      "No real-time financial visibility",
      "Fragmented manual tools",
      "No confidence in financial data",
    ],
  },
  {
    tag: "Our Approach",
    num: "02",
    color: "#C2500A",
    bg: "#FDF3EC",
    border: "#F5CBAA",
    textColor: "#92400E",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5L9 5.5H13L9.5 8L11 12L7 9.5L3 12L4.5 8L1 5.5H5L7 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
      </svg>
    ),
    points: [
      "System design, not just software",
      "Simplified financial workflows",
      "Clean, intuitive UX at every step",
      "Business value + tech in balance",
    ],
  },
  {
    tag: "The Solution",
    num: "03",
    color: "#1F8F63",
    bg: "#EFFAF5",
    border: "#A8DEC7",
    textColor: "#065F46",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    points: [
      "Create & manage invoices with ease",
      "Track payments in real time",
      "Organized, clear financial records",
      "Reduced friction across operations",
    ],
  },
  {
    tag: "Outcome",
    num: "04",
    color: "#3A3A6A",
    bg: "#F0F0FA",
    border: "#C0C0E0",
    textColor: "#312E81",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10L5 6.5L8 8.5L12 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 3H12V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    points: [
      "60% less admin time",
      "22% revenue increase",
      "3× faster invoicing",
      "Infinitely scalable architecture",
    ],
    outcomes: ["60%", "22%", "3×", "∞"],
  },
];

// ─── SIDEBAR NAV ITEM ─────────────────────────────────────────────────────────
function SidebarItem({ step, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 group"
      style={{
        background: isActive ? step.bg : "transparent",
        border: isActive ? `1px solid ${step.border}` : "1px solid transparent",
      }}
    >
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          background: isActive ? step.color : "#F2F2EE",
          color: isActive ? "#fff" : step.color,
        }}
      >
        {step.icon}
      </div>
      <div className="min-w-0">
        <div
          className="text-[9px] font-black tracking-widest uppercase leading-none mb-0.5"
          style={{ color: step.color, opacity: isActive ? 1 : 0.5 }}
        >
          {step.num}
        </div>
        <div
          className="text-[11px] font-semibold leading-tight truncate"
          style={{ color: isActive ? "#1A1A1A" : "#666" }}
        >
          {step.tag}
        </div>
      </div>
      {isActive && (
        <div
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: step.color }}
        />
      )}
    </button>
  );
}

// ─── FLOATING CARD ────────────────────────────────────────────────────────────
function FloatingCard({ step, text, side, delay, outcomeVal }) {
  const xFrom = side === "left" ? -260 : 260;

  return (
    <motion.div
      initial={{ x: xFrom, opacity: 0, scale: 0.92 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: xFrom, opacity: 0, scale: 0.94 }}
      transition={{
        x: { type: "spring", stiffness: 280, damping: 28, delay },
        opacity: { duration: 0.3, delay },
        scale: { duration: 0.35, delay },
      }}
      className="w-[200px] rounded-xl overflow-hidden"
      style={{
        background: "#FEFEFE",
        border: `1px solid ${step.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        borderLeft: `3px solid ${step.color}`,
      }}
    >
      {/* Card header */}
      <div
        className="px-3 pt-2.5 pb-1.5 flex items-center gap-1.5"
        style={{ borderBottom: `1px solid ${step.border}` }}
      >
        <div style={{ color: step.color }}>{step.icon}</div>
        <span
          className="text-[8.5px] font-black tracking-widest uppercase"
          style={{ color: step.color }}
        >
          {step.num} · {step.tag}
        </span>
      </div>

      {/* Card body */}
      <div className="px-3 py-2.5">
        <p
          className="text-[12px] font-semibold leading-snug"
          style={{ color: "#1A1A1A" }}
        >
          {text}
        </p>

        {outcomeVal && (
          <div
            className="mt-2 inline-flex items-baseline gap-1 px-2 py-1 rounded-md"
            style={{ background: step.bg, border: `1px solid ${step.border}` }}
          >
            <span
              className="text-base font-black leading-none"
              style={{ color: step.color }}
            >
              {outcomeVal}
            </span>
            <span className="text-[9px] font-semibold" style={{ color: step.textColor }}>
              result
            </span>
          </div>
        )}
      </div>

      {/* Card footer — fake UI action strip */}
      <div
        className="px-3 py-1.5 flex items-center gap-2"
        style={{ borderTop: `1px solid ${step.border}`, background: step.bg }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: step.color, opacity: 0.7 }} />
        <div className="h-1.5 w-16 rounded-full" style={{ background: step.border }} />
        <div className="ml-auto h-1.5 w-8 rounded-full" style={{ background: step.border }} />
      </div>
    </motion.div>
  );
}

// ─── LAPTOP FRAME ─────────────────────────────────────────────────────────────
function LaptopFrame({ imageUrl, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))" }}
    >
      {/* Lid / Screen bezel */}
      <div
        className="rounded-t-xl overflow-hidden"
        style={{
          background: "#2A2522",
          padding: "10px 12px 0",
          border: "1.5px solid #1A1715",
          borderBottom: "none",
        }}
      >
        {/* Camera dot */}
        <div className="flex justify-center mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3A3530]" />
        </div>

        {/* Screen area */}
        <div
          className="rounded-t-sm overflow-hidden"
          style={{ aspectRatio: "16/10", background: "#0A0A0A", position: "relative" }}
        >
          {/* Browser chrome bar */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-1.5"
            style={{ background: "rgba(30,27,24,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
            </div>
            {/* URL bar */}
            <div
              className="flex-1 max-w-[160px] mx-auto flex items-center gap-1.5 rounded-md px-2 py-0.5"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                <rect x="0.5" y="3.5" width="6" height="4" rx="0.8" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7"/>
                <path d="M2 3.5V2.5a1.5 1.5 0 013 0v1" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7"/>
              </svg>
              <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                trubilling.app/dashboard
              </span>
            </div>
            {/* Nav pills */}
            <div className="flex gap-1 ml-auto">
              {["▢", "▣", "▤"].map((s, i) => (
                <span key={i} className="text-[8px]" style={{ color: "rgba(255,255,255,0.25)" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Hero image — fills the screen */}
          <img
            src="/image.png"
            alt="TruBilling dashboard preview"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ marginTop: "22px", height: "calc(100% - 22px)", objectPosition: "top center" }}
          />

          {/* Overlay — subtle gradient at bottom for depth */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
          />

          {/* Floating notification inside screen */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-3 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
            style={{
              background: "rgba(20,16,12,0.88)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[7px] font-black text-white"
              style={{ background: "#C2500A" }}
            >
              TB
            </div>
            <div>
              <div className="text-[7px] font-bold text-white leading-none">TruBilling</div>
              <div className="text-[6.5px] leading-none mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                Invoice paid · ₦3,200,000
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hinge */}
      <div
        style={{
          height: 8,
          background: "linear-gradient(to bottom, #2A2522, #1E1C1A)",
          border: "1.5px solid #1A1715",
          borderTop: "none",
          borderBottom: "none",
        }}
      />

      {/* Base */}
      <div
        className="rounded-b-xl flex items-center justify-center"
        style={{
          height: 20,
          background: "linear-gradient(to bottom, #1E1C1A, #171513)",
          border: "1.5px solid #1A1715",
          borderTop: "none",
        }}
      >
        <div
          className="rounded-sm"
          style={{ width: 64, height: 8, background: "#141210" }}
        />
      </div>
    </motion.div>
  );
}

// ─── BUILDER TOOLBAR (top bar) ────────────────────────────────────────────────
function BuilderToolbar({ activeStep }) {
  const step = STEPS[activeStep];
  return (
    <div
      className="flex items-center justify-between px-4 py-2 border-b"
      style={{
        background: "#1A1715",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      {/* Left — logo + mode */}
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
          style={{ background: "#C2500A" }}
        >
          TB
        </div>
        <span className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
          tru<span style={{ color: "#C2500A" }}>billing</span>
        </span>
        <div
          className="h-4 w-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <span className="text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
          Case Study · Product Design
        </span>
      </div>

      {/* Center — viewport icons */}
      <div className="flex items-center gap-2">
        {[
          <svg key="d" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M5 11.5h4M7 11.5v-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
          <svg key="t" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="1.5" width="8" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M5 12h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
          <svg key="m" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="1.5" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1.1"/><path d="M6.5 11h1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
        ].map((icon, i) => (
          <button
            key={i}
            className="p-1.5 rounded-md transition-colors"
            style={{
              background: i === 0 ? "rgba(194,80,10,0.2)" : "transparent",
              color: i === 0 ? "#C2500A" : "rgba(255,255,255,0.3)",
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Right — step badge + publish */}
      <div className="flex items-center gap-2">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-bold"
          style={{
            background: step.bg,
            color: step.color,
            border: `1px solid ${step.border}`,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
          {step.tag}
        </motion.div>
        <button
          className="px-3 py-1.5 rounded-lg text-[10px] font-black text-white transition-all"
          style={{ background: "#C2500A" }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  const [activeStep, setActiveStep] = useState(0);
  const [activePointL, setActivePointL] = useState(0);
  const [activePointR, setActivePointR] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  // Cycle through cards automatically
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCardKey((k) => k + 1);
      setActiveStep((s) => {
        const next = (s + 1) % STEPS.length;
        return next;
      });
      setActivePointL((p) => (p + 1) % 4);
      setActivePointR((p) => (p + 2) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const leftStep = STEPS[activeStep];
  const rightStep = STEPS[(activeStep + 1) % STEPS.length];
  const leftPoint = leftStep.points[activePointL];
  const rightPoint = rightStep.points[activePointR];
  const leftOutcome = leftStep.outcomes?.[activePointL];
  const rightOutcome = rightStep.outcomes?.[activePointR];

  // Progress through all steps
  const totalCards = STEPS.reduce((a, s) => a + s.points.length, 0);
  const seenCards = STEPS.slice(0, activeStep).reduce((a, s) => a + s.points.length, 0) + activePointL;
  const progress = Math.round((seenCards / totalCards) * 100);

  // Replace with your actual screenshot/image URL
  const SCREEN_IMAGE =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80";

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F7F4F0" }}
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(194,80,10,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(194,80,10,.035) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />
      {/* Warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", left: "25%", width: "50%", height: "60%",
          background: "radial-gradient(ellipse, rgba(194,80,10,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%", right: "10%", width: "40%", height: "50%",
          background: "radial-gradient(ellipse, rgba(31,143,99,0.06) 0%, transparent 65%)",
        }}
      />

      {/* ── Builder toolbar ── */}
      <div className="relative z-20 flex-shrink-0">
        <BuilderToolbar activeStep={activeStep} />
      </div>

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex-shrink-0 px-10 pt-8 pb-0"
      >
        <p
          className="text-[9px] font-black tracking-[.28em] uppercase mb-3"
          style={{ color: "#C2500A", opacity: 0.65 }}
        >
          Case Study · Product Development
        </p>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-[14px] flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: "#C2500A", boxShadow: "0 8px 24px rgba(194,80,10,.3)" }}
            >
              TB
            </div>
            <h2
              className="font-black tracking-tight leading-tight"
              style={{ fontSize: "clamp(22px, 2.4vw, 34px)", color: "#1A1A1A" }}
            >
              TruBilling{" "}
              <span
                style={{ color: "#C2500A", fontWeight: 400, fontStyle: "italic", fontFamily: "Georgia, serif" }}
              >
                — built by MAD
              </span>
            </h2>
          </div>

          {/* Step pills */}
          <div className="flex flex-wrap gap-2">
            {STEPS.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.07 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black tracking-wide transition-all"
                style={{
                  border: `1.5px solid ${i === activeStep ? s.color : s.border}`,
                  background: i === activeStep ? s.bg : "transparent",
                  color: s.color,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: s.color }}
                />
                {s.tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: "#E5E0D8" }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #C2500A 0%, #E8834A 50%, #1F8F63 100%)" }}
          />
        </div>
      </motion.div>

      {/* ── Main 3-column layout ── */}
      <div
        className="relative z-10 flex-1 grid items-start"
        style={{
          gridTemplateColumns: "220px 1fr 220px",
          gap: 0,
          padding: "28px 20px 36px",
          minHeight: "72vh",
        }}
      >
        {/* ── LEFT panel (Elementor-style) ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col h-full"
          style={{ paddingTop: 16, paddingRight: 14 }}
        >
          {/* Panel header */}
          <div
            className="rounded-xl mb-3 overflow-hidden"
            style={{
              background: "#fff",
              border: "1px solid #E7E7E1",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Tabs */}
            <div className="flex" style={{ borderBottom: "1px solid #E7E7E1" }}>
              {[
                { icon: "⊞", label: "Steps" },
                { icon: "◎", label: "Style" },
              ].map(({ icon, label }, i) => (
                <button
                  key={i}
                  className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[9px] font-semibold transition-colors"
                  style={{
                    color: i === 0 ? "#C2500A" : "#888",
                    borderBottom: i === 0 ? "2px solid #C2500A" : "2px solid transparent",
                    background: "transparent",
                  }}
                >
                  <span className="text-base leading-none">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Steps list */}
            <div className="p-2 flex flex-col gap-1">
              <p
                className="text-[8px] font-black tracking-widest uppercase px-1 mb-1"
                style={{ color: "#AAAAAA" }}
              >
                ▾ Sections
              </p>
              {STEPS.map((s, i) => (
                <SidebarItem
                  key={i}
                  step={s}
                  isActive={i === activeStep}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>

            {/* Progress meter */}
            <div className="px-3 pb-3 pt-1" style={{ borderTop: "1px solid #F2F2EE" }}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[8px] text-[#AAA] font-medium">Build progress</span>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] font-black"
                  style={{ color: "#C2500A" }}
                >
                  {progress}%
                </motion.span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#E7E7E1" }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #C2500A, #1F8F63)" }}
                />
              </div>
            </div>
          </div>

          {/* Left floating card area */}
          <div
            className="flex-1 flex items-start justify-end"
            style={{ paddingTop: 20 }}
          >
            <AnimatePresence mode="wait">
              <FloatingCard
                key={`left-${cardKey}`}
                step={leftStep}
                text={leftPoint}
                side="left"
                delay={0}
                outcomeVal={leftOutcome}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── CENTER: Laptop ── */}
        <div
          className="flex flex-col items-center"
          style={{ padding: "16px 20px 0" }}
        >
          <LaptopFrame imageUrl={SCREEN_IMAGE} isInView={isInView} />

          {/* Step dots */}
          <div className="flex gap-2 mt-5">
            {STEPS.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveStep(i)}
                animate={{
                  width: i === activeStep ? 20 : 6,
                  background: i === activeStep ? s.color : "#D3D1C7",
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>

          {/* Active step label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
              style={{
                background: STEPS[activeStep].bg,
                border: `1px solid ${STEPS[activeStep].border}`,
                color: STEPS[activeStep].color,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: STEPS[activeStep].color }}
              />
              {STEPS[activeStep].tag}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col h-full"
          style={{ paddingTop: 16, paddingLeft: 14 }}
        >
          {/* Accessibility-style panel */}
          <div
            className="rounded-xl mb-3 overflow-hidden"
            style={{
              background: "#fff",
              border: "1px solid #E7E7E1",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Panel titlebar */}
            <div
              className="flex items-center justify-between px-3 py-2.5"
              style={{ borderBottom: "1px solid #E7E7E1" }}
            >
              <span className="text-[11px] font-bold text-[#1A1A1A]">Insights</span>
              <div className="flex gap-1.5">
                {["↺", "⊘", "✕"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-5 h-5 rounded flex items-center justify-center text-[10px] transition-colors hover:bg-gray-100"
                    style={{ color: "#888" }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics grid */}
            <div className="p-3 grid grid-cols-2 gap-2">
              {[
                { label: "Invoices", val: "₦22.8M", icon: "▣", color: "#1F8F63" },
                { label: "Quotes", val: "₦4.7M", icon: "▤", color: "#C2500A" },
                { label: "Payments", val: "₦4.9M", icon: "∿", color: "#3A3A6A" },
                { label: "Contacts", val: "247", icon: "◉", color: "#888", badge: "24" },
              ].map(({ label, val, icon, color, badge }) => (
                <div
                  key={label}
                  className="rounded-lg p-2 relative"
                  style={{ background: "#FAFAF8", border: "1px solid #F0EDE8" }}
                >
                  {badge && (
                    <div
                      className="absolute -top-1 -right-1 text-[7px] font-black px-1 rounded-full"
                      style={{ background: "#C2500A", color: "#fff" }}
                    >
                      {badge}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mb-1">
                    <span style={{ fontSize: 9, color }}>{icon}</span>
                    <span className="text-[8px] text-[#AAA]">{label}</span>
                  </div>
                  <div className="text-[11px] font-black" style={{ color }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Angie-style AI prompt strip */}
            <div
              className="mx-3 mb-3 rounded-lg px-3 py-2.5 flex items-center gap-2"
              style={{ background: "#FAFAF8", border: "1px solid #E7E7E1" }}
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "#C2500A" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[9px] font-semibold flex-1" style={{ color: "#666" }}>
                Generate invoice report
              </span>
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: "#C2500A" }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 1v6M1 4l3-3 3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right floating card area */}
          <div
            className="flex-1 flex items-start justify-start"
            style={{ paddingTop: 20 }}
          >
            <AnimatePresence mode="wait">
              <FloatingCard
                key={`right-${cardKey}`}
                step={rightStep}
                text={rightPoint}
                side="right"
                delay={0.15}
                outcomeVal={rightOutcome}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
      `}</style>
    </section>
  );
}