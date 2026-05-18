import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SvcCard, CARDS } from "./ServicesInMotion";

// S1 (2000ms) + S2 (2000ms) + 3000ms viewing time for the final result image
const DURATION = 7000;

export default function WorkShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % CARDS.length), DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[#f4f4f2] relative overflow-hidden">

      {/* ── Sticky light header ── */}
      <div className="section-sticky-title">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,48px)]">
          <div className="inline-flex items-center gap-[7px] bg-[rgba(25,128,194,.15)] border border-[rgba(25,128,194,.25)] rounded-full px-3 py-1 mb-4">
            <div className="w-[6px] h-[6px] rounded-full bg-[#45b3f5] [animation:pulse_2s_ease_infinite]" />
            <span className="text-[9.5px] font-bold text-[#45b3f5] tracking-[0.12em] uppercase">Services</span>
          </div>
          <h2 className="text-[clamp(28px,3.8vw,52px)] font-extrabold leading-[1.06] tracking-[-1px] text-[#0f172a] max-w-[700px]">
            How we do <span className="text-[#45b3f5]">the work.</span>
          </h2>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — spotlight text list */}
          <div className="flex flex-col">
            {CARDS.map((card, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={i}
                  onClick={() => setActive(i)}
                  className="cursor-pointer py-5 border-b border-black/[0.07] group"
                  animate={{ opacity: isActive ? 1 : 0.22 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Row: dot + title */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.5 : 0.8,
                        opacity: isActive ? 1 : 0.3,
                        backgroundColor: isActive ? "#45b3f5" : "rgba(15,23,42,.2)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-2 h-2 rounded-full flex-shrink-0"
                    />
                    <motion.p
                      animate={{ letterSpacing: isActive ? "-0.03em" : "-0.01em" }}
                      transition={{ duration: 0.35 }}
                      className="text-[#0f172a] font-black leading-tight text-[clamp(22px,2.8vw,44px)]"
                    >
                      {card.title}
                    </motion.p>
                  </div>

                  {/* Subtitle — only when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, y: -4 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -4 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[#0f172a]/50 text-[13px] leading-relaxed pl-6 pt-2 overflow-hidden"
                      >
                        {card.sub}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Progress bar — only when active */}
                  {isActive && (
                    <div className="mt-3 pl-6">
                      <div className="h-[1.5px] bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          key={`pb-${active}`}
                          className="h-full bg-[#45b3f5] rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: DURATION / 1000, ease: "linear" }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — spotlight card */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SvcCard config={CARDS[active]} isActive startDelay={0} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
}
