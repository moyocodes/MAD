import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function BeyondProjects() {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden px-6 md:px-12 lg:px-20 py-36 md:py-52 text-center ${
        dark ? "text-white" : "text-dark-900"
      }`}
    >
      {/* Large decorative word behind content */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className={`font-semibold leading-none tracking-[-0.06em] ${
            dark ? "text-white/[.03]" : "text-tangerine-300/30"
          }`}
          style={{ fontSize: "clamp(100px, 20vw, 260px)" }}
        >
          BEYOND
        </span>
      </div>

      {/* Subtle gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: "#F26522" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
        style={{ background: "#1980c2" }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 uppercase tracking-[.26em] font-mono text-[10px] text-tangerine-600/65 dark:text-tangerine-400/55"
        >
          Long-term Partnerships
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-8 leading-[1.0] tracking-[-0.04em] font-semibold ${
            dark ? "text-white/95" : "text-dark-900"
          }`}
          style={{ fontSize: "clamp(32px, 5.5vw, 74px)" }}
        >
          We don't just deliver projects,{" "}
          <span style={{ color: "#F26522" }}>we build long-term</span>
          <br />
          partnerships.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.7 }}
          className={`mb-12 max-w-[560px] mx-auto text-[15px] leading-relaxed ${
            dark ? "text-white/50" : "text-dark-700/65"
          }`}
        >
          From strategy to execution, we stay involved beyond the brief — refining, scaling, and growing alongside your business as it evolves.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34, duration: 0.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] font-semibold tracking-[.06em] text-white border-none cursor-pointer transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-[.98]"
            style={{ background: "#F26522", boxShadow: "0 4px 28px #F2652245" }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className={`w-px h-9 ${dark ? "bg-white/10" : "bg-dark-900/10"}`} />

          <button
            className={`inline-flex items-center gap-2 px-6 py-4 rounded-full border text-[11px] font-semibold tracking-[.06em] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98] bg-transparent ${
              dark
                ? "border-white/14 text-white/65 hover:border-white/28"
                : "border-dark-900/14 text-dark-700/65 hover:border-dark-900/32"
            }`}
          >
            View Our Work
          </button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.52, duration: 0.8 }}
          className="mt-14 flex items-center justify-center gap-6 flex-wrap"
        >
          {["Strategy included", "Remote-first", "Results in weeks"].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 uppercase tracking-[.1em] font-mono text-[10px] text-dark-700/38"
            >
              <span className="w-1 h-1 rounded-full bg-tangerine-500" />
              {t}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
