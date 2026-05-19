import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { homeCms } from "@/data/homeCms";

const content = homeCms.beyond;

export default function Beyond() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-azure-50 via-azure-100/80 to-azure-200/60 flex items-center"
    >
      {/* Looping background blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-azure-300/20 blur-3xl pointer-events-none"
        animate={inView ? { y: [0, -32, 0], scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] } : { opacity: 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -left-10 w-96 h-96 rounded-full bg-azure-400/15 blur-3xl pointer-events-none"
        animate={inView ? { y: [0, 28, 0], scale: [1, 1.1, 1], opacity: [0.25, 0.5, 0.25] } : { opacity: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-azure-200/30 blur-2xl pointer-events-none"
        animate={inView ? { x: [0, 20, 0], y: [0, -18, 0], opacity: [0.2, 0.45, 0.2] } : { opacity: 0 }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />

      {/* Top edge accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-400/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle, rgba(90,167,230,0.15) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full px-6 md:px-14 py-16 md:py-20">

        <motion.p
          className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-azure-600/70 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {content.eyebrow}
        </motion.p>

        <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
          {content.title.split("\n").map((line, i) => (
            <motion.span
              key={i}
              className={`block ${i === 1 ? "text-azure-500" : "text-azure-900"}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.13 }}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="text-sm md:text-base text-azure-700/60 leading-relaxed mb-4 max-w-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {content.body}
        </motion.p>

        <motion.p
          className="text-sm md:text-base font-bold text-azure-800 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
        >
          {content.emphasis}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <motion.button
            className="bg-azure-500 hover:bg-azure-600 text-white text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded-full border-none cursor-pointer shadow-lg shadow-azure-400/30 transition-colors duration-200"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {content.primaryCta}
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
