import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCms } from "@/context/CmsContext";

export default function Beyond() {
  const { cmsData } = useCms();
  const content = cmsData.beyond;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden flex items-center bg-azure-200"
      style={{ height: "100vh", width: "100%" }}
    >
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-azure-300/25 blur-3xl"
            style={{ animation: "bBlob1 8s ease-in-out infinite" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute -bottom-16 -left-10 w-96 h-96 rounded-full bg-azure-400/20 blur-3xl"
            style={{ animation: "bBlob2 10s ease-in-out 2s infinite" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-azure-200/40 blur-2xl"
            style={{ top: "calc(50% - 160px)", left: "calc(50% - 160px)", animation: "bBlob3 7s ease-in-out 3.5s infinite" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(90,167,230,0.18) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        {/* Top edge accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-400/65 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Bottom edge accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure-400/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          style={{ transformOrigin: "right" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto w-full px-6 md:px-14 py-16 md:py-24">

          {/* Eyebrow */}
          <motion.p
            className="text-[14px] font-mono font-bold tracking-[0.3em] uppercase text-azure-800 mb-6"
            initial={{ opacity: 0, x: -20, scale: 0.88 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.88 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.eyebrow}
          </motion.p>

          {/* Title — word-by-word 3D flip */}
          <h2
            className="text-[44px]  font-black leading-tight tracking-tight mb-6"
            style={{ perspective: "800px" }}
          >
            {content.title.split("\n").map((line, li) => (
              <span key={li} className="block" style={{ perspective: "800px" }}>
                {line.split(" ").map((word, wi) => (
                  <motion.span
                    key={wi}
                    className={li === 1 ? "text-azure-500" : "text-azure-900"}
                    initial={{ opacity: 0, y: 36, rotateX: 55 }}
                    animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 36, rotateX: 55 }}
                    transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.26 + li * 0.14 + wi * 0.08 }}
                    style={{ display: "inline-block", marginRight: "0.22em", transformOrigin: "bottom center" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>

          {/* Body */}
          <motion.p
            className="text-sm md:text-base text-azure-800/80 leading-relaxed mb-4 max-w-xl"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
          >
            {content.body}
          </motion.p>

          {/* Emphasis */}
          <motion.p
            className="text-sm md:text-base font-bold text-azure-800 mb-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
          >
            {content.emphasis}
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 14 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 14 }}
            transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.86 }}
          >
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-azure-500 text-white text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded-full border-none cursor-pointer shadow-lg shadow-azure-400/30"
              whileHover={{ scale: 1.07, y: -4, boxShadow: "0 14px 38px rgba(25,128,194,.42)" }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.18 }}
            >
              {content.primaryCta}
            </motion.button>
          </motion.div>
        </div>
    </section>
  );
}