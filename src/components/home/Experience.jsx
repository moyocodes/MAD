import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── constants ────────────────────────────────────────────────────────────────
const AZ = "#1980c2";
const DK = "#111111";
const WH = "#ffffff";
const ease = [0.22, 1, 0.36, 1];

// ─── floating card data ───────────────────────────────────────────────────────
const CARDS = [
  {
    id: "billing",
    icon: "ti-receipt",
    title: "TruBilling",
    sub: "Financial clarity for growing teams",
    tag: "Active",
    tagColor: "#7ef8b5",
    tagBg: "rgba(126,248,181,.15)",
    delay: 0.45,
  },
  {
    id: "payments",
    icon: "ti-credit-card",
    title: "Payment Tracking",
    sub: "Real-time status across all clients",
    tag: "7 pending",
    tagColor: "#fbbf77",
    tagBg: "rgba(251,191,119,.15)",
    delay: 0.6,
  },
  {
    id: "records",
    icon: "ti-chart-bar",
    title: "Financial Records",
    sub: "Clear, structured history at a glance",
    tag: "Up to date",
    tagColor: "#7ef8b5",
    tagBg: "rgba(126,248,181,.15)",
    delay: 0.75,
  },
  {
    id: "invoices",
    icon: "ti-file-invoice",
    title: "Invoice Manager",
    sub: "Draft, send and track with one click",
    tag: "24 paid",
    tagColor: AZ,
    tagBg: "rgba(25,128,194,.12)",
    delay: 0.9,
  },
];

// ─── mobile tab panels ────────────────────────────────────────────────────────
const MOBILE_TABS = [
  {
    id: "need",
    label: "The Need",
    items: [
      "Unstructured billing processes",
      "No real-time payment visibility",
      "Fragmented manual tools",
      "Difficulty tracking overdue invoices",
    ],
  },
  {
    id: "solution",
    label: "The Solution",
    items: [
      "Invoices created and managed in one place",
      "Real-time payment status tracking",
      "Clear, structured financial records",
      "One-click draft, send and follow-up",
    ],
  },
  {
    id: "outcome",
    label: "Outcome",
    items: [
      "Scalable billing for growing businesses",
      "Teams save hours every billing cycle",
      "Full financial clarity at a glance",
      "Built to scale with the business",
    ],
  },
];

// ─── FloatingCard (desktop only) ──────────────────────────────────────────────
function FloatingCard({ icon, title, sub, tag, tagColor, tagBg, delay, index, inView }) {
  const topMap = [28, 158, 288, 418];
  return (
    <motion.div
      initial={{ opacity: 0, x: 56 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 56 }}
      transition={{ duration: 0.7, ease, delay }}
      className="hidden lg:block absolute"
      style={{
        top: topMap[index],
        right: -16,
        width: 232,
        background: WH,
        borderRadius: 16,
        padding: "14px 16px",
        border: "0.5px solid rgba(0,0,0,.1)",
        zIndex: 20,
        boxShadow: "0 4px 28px rgba(0,0,0,.09)",
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-lg"
          style={{ width: 28, height: 28, background: AZ }}
        >
          <i className={`ti ${icon} text-white`} style={{ fontSize: 14 }} aria-hidden="true" />
        </div>
        <span className="text-[13px] font-bold" style={{ color: DK }}>{title}</span>
        <span
          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
          style={{ color: tagColor, background: tagBg }}
        >
          {tag}
        </span>
      </div>
      <p className="text-[11.5px] leading-snug mb-2.5" style={{ color: "#666" }}>{sub}</p>
      <div className="flex gap-1.5 items-center">
        {["ti-plus", "ti-settings"].map((ic) => (
          <div
            key={ic}
            className="flex items-center justify-center rounded-full"
            style={{ width: 24, height: 24, background: "#f4f2ed", border: "0.5px solid #e2dfd8" }}
          >
            <i className={`ti ${ic}`} style={{ fontSize: 12, color: "#777" }} aria-hidden="true" />
          </div>
        ))}
        <div
          className="flex items-center justify-center rounded-full ml-auto"
          style={{ width: 28, height: 28, background: AZ }}
        >
          <i className="ti ti-arrow-up-right text-white" style={{ fontSize: 13 }} aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── MobileTabPanel ───────────────────────────────────────────────────────────
function MobileTabPanel({ inView }) {
  const [active, setActive] = useState("need");
  const current = MOBILE_TABS.find((t) => t.id === active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: 0.35 }}
      className="mt-6 lg:hidden"
    >
      {/* tab bar */}
      <div
        className="flex rounded-xl p-1 mb-4"
        style={{ background: "rgba(0,0,0,.06)" }}
      >
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="flex-1 text-[11px] font-semibold py-2 rounded-lg transition-all duration-200"
            style={{
              background: active === tab.id ? WH : "transparent",
              color: active === tab.id ? AZ : "#888",
              boxShadow: active === tab.id ? "0 1px 6px rgba(0,0,0,.1)" : "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: ".02em",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* animated panel */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 180 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease }}
          >
            <ul className="list-none m-0 p-0">
              {current.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
                  className="text-[13px] py-2.5 pl-4 border-b relative"
                  style={{ color: "#555", borderColor: "#e4e0d9" }}
                >
                  <span className="absolute left-0" style={{ color: AZ }}>—</span>
                  {item}
                </motion.li>
              ))}
            </ul>

            {active === "outcome" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease }}
                className="mt-4 p-4"
                style={{ border: "1px solid #dedad3", borderLeft: `2px solid ${AZ}` }}
              >
                <span
                  className="text-[9px] font-bold tracking-widest uppercase"
                  style={{ color: AZ }}
                >
                  Result
                </span>
                <p className="text-[13px] font-semibold mt-1 leading-snug" style={{ color: DK }}>
                  Scalable billing and financial management built for growing businesses.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#f0ede8] pb-16 lg:pb-20 font-sans"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── header ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease, delay: 0 }}
          className="text-[9px] tracking-[.28em] uppercase font-bold pt-12 lg:pt-16 mb-2"
          style={{ color: AZ }}
        >
          Our Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
          className="text-[clamp(26px,3.5vw,46px)] font-extrabold leading-[1.05] tracking-tight mb-8 lg:mb-10"
          style={{ color: DK }}
        >
          Built from the ground up.
        </motion.h2>

        {/* ── main row ── */}
        <div className="flex flex-col lg:flex-row gap-0 items-start">

          {/* ── LAPTOP FRAME ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="w-full lg:flex-1 relative min-w-0"
          >
            {/* lid */}
            <div
              className="rounded-t-[16px] lg:rounded-t-[18px]"
              style={{
                background: "#1c1c1e",
                padding: "8px 10px 0",
                border: "2px solid #2c2c2e",
                borderBottom: "none",
              }}
            >
              {/* browser bar */}
              <div
                className="rounded-t-lg flex items-center gap-2 px-3 py-1.5"
                style={{ background: "#2c2c2e" }}
              >
                {/* traffic lights - hidden on very small screens */}
                <div className="hidden sm:flex gap-1.5">
                  {["#ff5f57", "#ffbd2e", "#27c840"].map((c) => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                {/* URL bar */}
                <div
                  className="flex-1 max-w-[260px] mx-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{ background: "#3c3c3e" }}
                >
                  <i className="ti ti-lock text-white/35" style={{ fontSize: 9 }} aria-hidden="true" />
                  <span className="text-[9px] sm:text-[10px] text-white/45 font-medium truncate">
                    trubilling.io/dashboard
                  </span>
                </div>
                {/* publish */}
                <div
                  className="rounded-md px-2 py-1 text-[9px] sm:text-[10px] font-bold text-white flex-shrink-0"
                  style={{ background: AZ }}
                >
                  Publish
                </div>
              </div>

              {/* screen */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=85"
                  alt="TruBilling dashboard"
                  className="w-full h-full object-cover block"
                />
                {/* gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.08) 55%, transparent 100%)" }}
                />

                {/* product label bottom-left */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease, delay: 0.5 }}
                  className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
                >
                  <div className="text-[8px] sm:text-[9px] tracking-[.18em] uppercase text-white/50 font-bold mb-1">
                    Product Development
                  </div>
                  <div
                    className="text-[22px] sm:text-[30px] font-black text-white leading-none"
                    style={{ letterSpacing: -0.6 }}
                  >
                    TruBilling
                  </div>
                </motion.div>

                {/* stat chips bottom-right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease, delay: 0.55 }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-1.5 sm:gap-2"
                >
                  {[["24", "Paid"], ["7", "Pending"], ["2", "Overdue"]].map(([val, label]) => (
                    <div
                      key={label}
                      className="text-center rounded-lg px-2.5 sm:px-3 py-2"
                      style={{
                        background: "rgba(255,255,255,.13)",
                        border: "0.5px solid rgba(255,255,255,.18)",
                      }}
                    >
                      <div className="text-[15px] sm:text-[18px] font-extrabold text-white leading-none">{val}</div>
                      <div className="text-[8px] sm:text-[9px] text-white/55 mt-0.5">{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* hinge */}
            <div
              className="relative"
              style={{
                background: "#242426", height: 11,
                borderRadius: "0 0 3px 3px",
                border: "2px solid #2c2c2e", borderTop: "1.5px solid #3a3a3c",
              }}
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{ width: 68, height: 5, background: "#333335", borderRadius: "0 0 6px 6px" }}
              />
            </div>
            {/* base */}
            <div
              className="mx-auto"
              style={{
                width: "55%", height: 7, background: "#1c1c1e",
                borderRadius: "0 0 8px 8px",
                border: "2px solid #2c2c2e", borderTop: "none",
              }}
            />

            {/* desktop floating cards */}
            {CARDS.map((card, i) => (
              <FloatingCard key={card.id} {...card} index={i} inView={inView} />
            ))}

            {/* mobile tab panel — sits below the laptop */}
            <MobileTabPanel inView={inView} />
          </motion.div>

          {/* ── RIGHT: desktop text panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-7 flex-shrink-0"
            style={{ width: 240, marginLeft: 256, paddingTop: 4 }}
          >
            <p className="text-[14px] leading-[1.78] m-0" style={{ color: "#555" }}>
              Simplifying financial operations without overwhelming teams — a system design problem, not just a software build.
            </p>

            {[
              ["The Need", ["Unstructured billing", "No payment visibility", "Fragmented tools"]],
              ["The Solution", ["Invoices in one place", "Real-time tracking", "Clear records"]],
            ].map(([title, items]) => (
              <div key={title}>
                <h4
                  className="text-[9px] tracking-[.22em] uppercase font-bold mb-3"
                  style={{ color: AZ }}
                >
                  {title}
                </h4>
                <ul className="list-none m-0 p-0">
                  {items.map((it, i) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.07, ease: "easeOut" }}
                      className="text-[13px] py-1.5 pl-4 border-b relative"
                      style={{ color: "#555", borderColor: "#e4e0d9" }}
                    >
                      <span className="absolute left-0" style={{ color: AZ }}>—</span>
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease, delay: 0.9 }}
              className="p-4"
              style={{ border: "1px solid #dedad3", borderLeft: `2px solid ${AZ}` }}
            >
              <span className="text-[9px] tracking-[.2em] uppercase font-bold" style={{ color: AZ }}>
                Outcome
              </span>
              <p className="text-[13px] font-semibold mt-1.5 leading-snug m-0" style={{ color: DK }}>
                Scalable billing and financial management for growing businesses.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}