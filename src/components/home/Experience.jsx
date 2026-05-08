import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const NEEDS = [
  "Unstructured billing processes",
  "Difficulty tracking payments and invoices",
  "Lack of financial visibility in real time",
  "Over-reliance on manual and fragmented tools",
];

const APPROACH = [
  "Simplified financial workflows",
  "Clean, intuitive user experience",
  "Built for scalability from day one",
  "Business, design & tech aligned",
];

const SOLUTIONS = [
  "Create & manage invoices easily",
  "Track payments in real time",
  "Maintain clear financial records",
  "Improved daily financial visibility",
];

function LeftPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className="hidden xl:flex absolute top-[10%] -left-[160px] xl:-left-[180px] w-[220px] xl:w-[240px] z-20 flex-col gap-3 pointer-events-none"
    >
      {/* Need card */}
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i
              className="ti ti-alert-circle text-white"
              style={{ fontSize: 12 }}
            />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
            The Need
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
          {NEEDS.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-azure-500">
                —
              </span>
              {n}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Approach card */}
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i className="ti ti-bulb text-white" style={{ fontSize: 12 }} />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
            Our Approach
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
          {APPROACH.map((a, i) => (
            <motion.li
              key={a}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-tangerine-500">
                —
              </span>
              {a}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function RightPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      className="hidden xl:block absolute top-[10%] -right-[160px] xl:-right-[180px] w-[220px] xl:w-[240px] z-20 pointer-events-none"
    >
      <div
        className="bg-white rounded-2xl p-4"
        style={{
          border: "0.5px solid rgba(0,0,0,.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-azure-500">
            <i className="ti ti-check text-white" style={{ fontSize: 12 }} />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-tangerine-500">
            The Solution
          </span>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1.5 mb-4">
          {SOLUTIONS.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[11px] pl-3.5 relative"
              style={{ color: "#555" }}
            >
              <span className="absolute left-0 font-bold text-tangerine-500">
                —
              </span>
              {s}
            </motion.li>
          ))}
        </ul>
        {/* Outcome box */}
        <div
          className="p-3 rounded-xl bg-tangerine-500/[6%]"
          style={{
            border: "1px solid rgba(242,101,34,.25)",
          }}
        >
          <span className="text-[9px] font-bold tracking-[.2em] uppercase text-tangerine-500">
            Outcome
          </span>
          <p className="text-[11px] font-semibold mt-1 leading-snug m-0 text-dark-900">
            A more structured, efficient, and scalable approach to business
            billing.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function LaptopFrame({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative z-10"
    >
      {/* lid */}
      <div
        style={{
          background: "#e8e8e8",
          borderRadius: "18px 18px 0 0",
          padding: "10px 12px 0",
          border: "2.5px solid #c8c8c8",
          borderBottom: "none",
        }}
      >
        {/* browser chrome */}
        <div
          style={{
            background: "#f2f2f2",
            borderRadius: "8px 8px 0 0",
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* traffic lights */}
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57", "#ffbd2e", "#27c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          {/* URL bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 280,
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: 6,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: "1px solid #e0e0e0",
            }}
          >
            <i
              className="ti ti-lock text-dark-900/30"
              style={{ fontSize: 10 }}
            />
            <span
              className="text-dark-900/45"
              style={{
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              trubilling.com/dashboard
            </span>
          </div>
          {/* publish btn */}
          <div
            className="bg-tangerine-500 text-white"
            style={{
              borderRadius: 6,
              padding: "4px 11px",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Publish
          </div>
        </div>

        {/* screen */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
        >
          <img
            src="/image.png"
            alt="TruBilling"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(255,248,240,.88) 0%, rgba(255,248,240,.15) 45%, transparent 100%)",
            }}
          />

          {/* MAD badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.8, y: -8 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="bg-dark-900/85 flex items-center gap-[6px]"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(255,255,255,.12)",
              borderRadius: 99,
              padding: "5px 10px 5px 6px",
            }}
          >
            <div
              className="bg-tangerine-500"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="text-white"
                style={{
                  fontSize: 7,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                }}
              >
                M
              </span>
            </div>
            <span
              className="text-white/75"
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Built by MAD
            </span>
          </motion.div>

          {/* product label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            style={{ position: "absolute", bottom: 24, left: 24 }}
          >
            <div
              className="text-tangerine-500"
              style={{
                fontSize: 9,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Product Development
            </div>
            <div
              className="text-dark-900"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 900,
                letterSpacing: -0.6,
                lineHeight: 1,
              }}
            >
              TruBilling
            </div>
          </motion.div>

          {/* stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              display: "flex",
              gap: 8,
            }}
          >
            {[
              ["24", "Paid"],
              ["7", "Pending"],
              ["2", "Overdue"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="bg-white/80 text-center"
                style={{
                  borderRadius: 10,
                  padding: "8px 12px",
                  border: "0.5px solid rgba(24,24,23,.12)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="text-dark-900"
                  style={{
                    fontSize: "clamp(14px, 2vw, 18px)",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-dark-900/50"
                  style={{
                    fontSize: 9,
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* hinge */}
      <div
        style={{
          background: "#d8d8d8",
          height: 12,
          borderRadius: "0 0 4px 4px",
          border: "2.5px solid #c0c0c0",
          borderTop: "1.5px solid #cccccc",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 72,
            height: 5,
            background: "#cacaca",
            borderRadius: "0 0 6px 6px",
          }}
        />
      </div>

      {/* base */}
      <div
        style={{
          width: "55%",
          margin: "0 auto",
          height: 8,
          background: "#e0e0e0",
          borderRadius: "0 0 10px 10px",
          border: "2.5px solid #c8c8c8",
          borderTop: "none",
        }}
      />
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="pb-24 font-sans overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg,#eaf4fb 0%,#f4f9ff 8%,#fff8f2 30%,#fef3ea 65%,#fdeee2 100%)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
        {/* header */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease, delay: 0 }}
          className="text-[9px] tracking-[.28em] uppercase font-bold pt-12 lg:pt-16 mb-2 text-tangerine-500"
        >
          Our Experience · Product Development
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease, delay: 0.04 }}
          className="text-[13px] text-dark-900/45 italic mb-3 max-w-[480px]"
        >
          Struggling to track where your money goes? Tired of chasing unpaid
          invoices?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.65, ease, delay: 0.08 }}
          className="font-extrabold leading-[1.05] tracking-tight mb-5 text-dark-900"
          style={{ fontSize: "clamp(26px, 3.5vw, 46px)" }}
        >
          <span
            className="text-tangerine-500"
            style={{ textShadow: "0 2px 18px rgba(242,101,34,.35)" }}
          >
            tru
          </span>
          <span
            className="text-dark-900"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,.18)" }}
          >
            billing
          </span>
          <span className="text-dark-900">.</span>
        </motion.h2>

        {/* intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease, delay: 0.16 }}
          className="mb-12 lg:mb-16 max-w-[620px]"
          style={{
            fontSize: 15,
            color: "rgba(24,24,23,.55)",
            lineHeight: 1.72,
          }}
        >
          A financial management platform designed to help small and growing
          businesses manage billing, track payments, and maintain financial
          clarity in one structured system — built to simplify operations
          without overwhelming complexity.
        </motion.p>

        {/* device + floating panels */}
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: 780 }}>
            <LeftPanel inView={inView} />
            <RightPanel inView={inView} />
            <LaptopFrame inView={inView} />
          </div>
        </div>

        {/* Mobile cards: Need / Approach / Outcome — hidden on xl+ where floating panels show */}
        <div className="xl:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Need */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.4 }}
            className="bg-white rounded-2xl p-4"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i
                  className="ti ti-alert-circle text-white"
                  style={{ fontSize: 12 }}
                />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
                The Need
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              {NEEDS.map((n) => (
                <li
                  key={n}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.5 }}
            className="bg-white rounded-2xl p-4"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i className="ti ti-bulb text-white" style={{ fontSize: 12 }} />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-dark-900">
                Our Approach
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              {APPROACH.map((a) => (
                <li
                  key={a}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution + Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.6 }}
            className="bg-white rounded-2xl p-4 sm:col-span-2"
            style={{
              border: "0.5px solid rgba(0,0,0,.09)",
              boxShadow: "0 4px 24px rgba(0,0,0,.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-tangerine-500">
                <i
                  className="ti ti-check text-white"
                  style={{ fontSize: 12 }}
                />
              </div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-tangerine-500">
                The Solution
              </span>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5 mb-4 sm:columns-2">
              {SOLUTIONS.map((s) => (
                <li
                  key={s}
                  className="text-[11px] pl-3.5 relative"
                  style={{ color: "#555" }}
                >
                  <span className="absolute left-0 font-bold text-tangerine-500">
                    —
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <div
              className="p-3 rounded-xl bg-tangerine-500/[6%]"
              style={{ border: "1px solid rgba(242,101,34,.25)" }}
            >
              <span className="text-[9px] font-bold tracking-[.2em] uppercase text-tangerine-500">
                Outcome
              </span>
              <p className="text-[11px] font-semibold mt-1 leading-snug m-0 text-dark-900">
                A more structured, efficient, and scalable approach to business
                billing.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
          className="flex justify-center mt-14"
        >
          <button
            className="bg-tangerine-500 text-white border-none rounded-full text-[11px] font-bold tracking-[.12em] uppercase cursor-pointer"
            style={{ padding: "13px 32px" }}
          >
            Work With Us Today →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
