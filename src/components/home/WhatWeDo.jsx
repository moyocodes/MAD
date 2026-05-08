import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const PILLARS = [
  {
    num: "01",
    title: "Product & Digital Solutions",
    accent: "#1980c2",
    desc: "We translate ideas into high-performing digital products. From web apps to mobile platforms, every decision is made with the end user in mind — and the business outcome in sight.",
    tags: ["Web Apps", "Mobile", "SaaS Platforms", "API Design"],
  },
  {
    num: "02",
    title: "Marketing & Communication",
    accent: "#F26522",
    desc: "Marketing isn't noise. We create strategic narratives and campaigns that resonate, retain, and convert — across digital channels, content, and community.",
    tags: ["Strategy", "Campaigns", "Content", "Analytics"],
  },
  {
    num: "03",
    title: "Brand & Design Systems",
    accent: "#2f9e44",
    desc: "A brand is more than a logo. We build identity systems that communicate who you are before you say a word — designed for consistency, scalability, and trust.",
    tags: ["Identity", "Systems", "Guidelines", "Visual Language"],
  },
];

function TypingText({ text, inView, delay = 0, className = "" }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + i * 0.022, duration: 0.08 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function PillarCard({ pillar, i, inView, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.01 }}
      style={{ willChange: "transform" }}
      className={`group relative p-8 rounded-2xl border cursor-default transition-colors duration-300
        ${dark
          ? "bg-dark-700/40 border-white/[.07] hover:border-white/[.13]"
          : "bg-white border-dark-100/70 hover:border-azure-200 hover:shadow-xl hover:shadow-azure-50"
        }`}
    >
      {/* Number + dot */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[.22em] text-dark-400/55">{pillar.num}</span>
        <div
          className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: pillar.accent }}
        />
      </div>

      {/* Accent bar */}
      <div
        className="mb-5 h-[3px] rounded-full transition-all duration-500 group-hover:w-20"
        style={{ background: pillar.accent, width: 40 }}
      />

      {/* Title */}
      <h3
        className={`mb-4 text-[18px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 ${dark ? "text-white/90" : "text-dark-900"}`}
      >
        {pillar.title}
      </h3>

      {/* Description */}
      <p className={`mb-6 text-[13px] leading-relaxed ${dark ? "text-white/48" : "text-dark-600/72"}`}>
        {pillar.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {pillar.tags.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md font-mono text-[9px] tracking-[.08em] uppercase"
            style={{
              background: pillar.accent + "12",
              color: pillar.accent,
              border: `1px solid ${pillar.accent}22`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="px-6 md:px-12 lg:px-20 py-32 md:py-48"
    >
      <div className="max-w-[1240px] mx-auto">

        {/* Header block */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 uppercase tracking-[.24em] font-mono text-[10px] text-tangerine-500"
          >
            What We Do
          </motion.p>

          <h2
            className={`mb-5 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold ${dark ? "text-white/95" : "text-dark-900"}`}
          >
            <TypingText text="We build what" inView={inView} delay={0.1} />
            <br />
            <TypingText text="grows with you." inView={inView} delay={0.48} className="text-azure-500" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className={`max-w-[500px] text-[15px] leading-relaxed ${dark ? "text-white/50" : "text-dark-700/65"}`}
          >
            Every system designed with strategy and purpose — built to scale with your ambitions, not just your brief.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.num} pillar={p} i={i} inView={inView} dark={dark} />
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={`border-t pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${dark ? "border-white/[.07]" : "border-dark-100/70"}`}
        >
          <p className={`max-w-[520px] text-[14px] leading-relaxed ${dark ? "text-white/38" : "text-dark-600/50"}`}>
            <em className="not-italic">"We don't just deliver projects — we embed with your team, align with your goals, and stay involved beyond the brief."</em>
          </p>
          <button
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[11px] font-semibold tracking-[.06em] text-white border-none cursor-pointer transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-[.98]"
            style={{ background: "#1980c2", boxShadow: "0 4px 20px #1980c230" }}
          >
            Work With Us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
