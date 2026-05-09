import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function TypingText({ text, inView, delay = 0, style = {}, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      setDone(false);
      return;
    }
    let i = 0;
    setDisplayed("");
    setDone(false);
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, 65);
      return () => clearInterval(id);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay]);
  return (
    <span className={className} style={style}>
      {displayed}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "0.85em",
            background: "currentColor",
            marginLeft: 2,
            verticalAlign: "text-bottom",
            animation: "blink 0.75s step-end infinite",
          }}
        />
      )}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}

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
        className="rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          border: "0.5px solid rgba(255,255,255,0.85)",
          boxShadow:
            "0 6px 28px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.7)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            on
            b
            style={{
              background: "rgba(242,101,34,.15)",
              border: "1px solid rgba(242,101,34,.2)",
            }}
          >
            <i
              className="ti ti-alert-circle"
              style={{ fontSize: 12, color: "#F26522" }}
            />
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F26522",
            }}
          >
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
              style={{ color: "#444" }}
            >
              <span
                className="absolute left-0 font-bold"
                style={{ color: "#F26522" }}
              >
                —
              </span>
              {n}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Approach card */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          border: "0.5px solid rgba(255,255,255,0.8)",
          boxShadow:
            "0 6px 28px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.65)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(242,101,34,.12)",
              border: "1px solid rgba(242,101,34,.2)",
            }}
          >
            <i
              className="ti ti-bulb"
              style={{ fontSize: 12, color: "#F26522" }}
            />
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F26522",
            }}
          >
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
              style={{ color: "#444" }}
            >
              <span
                className="absolute left-0 font-bold"
                style={{ color: "#F26522" }}
              >
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
        className="rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(14px)",
          border: "0.5px solid rgba(255,255,255,0.82)",
          boxShadow:
            "0 6px 28px rgba(0,0,0,.09), inset 0 1px 0 rgba(255,255,255,.65)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(242,101,34,.12)",
              border: "1px solid rgba(242,101,34,.2)",
            }}
          >
            <i
              className="ti ti-check"
              style={{ fontSize: 12, color: "#F26522" }}
            />
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F26522",
            }}
          >
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
              style={{ color: "#444" }}
            >
              <span
                className="absolute left-0 font-bold"
                style={{ color: "#F26522" }}
              >
                —
              </span>
              {s}
            </motion.li>
          ))}
        </ul>
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(242,101,34,.07)",
            border: "1px solid rgba(242,101,34,.2)",
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#F26522",
            }}
          >
            Outcome
          </span>
          <p
            className="text-[11px] font-semibold mt-1 leading-snug m-0"
            style={{ color: "#333" }}
          >
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
        {/* screen */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* LEFT HALF — image */}
          <div
            style={{
              width: "50%",
              position: "relative",
              flexShrink: 0,
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
            {/* gradient fade on left side */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(255,248,240,.88) 0%, rgba(255,248,240,.15) 45%, transparent 100%)",
              }}
            />
          </div>

          {/* RIGHT HALF — video top + tangerine stats bottom */}
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* VIDEO — top ~65% */}
            <div
              style={{
                flex: "0 0 65%",
                position: "relative",
                background: "#111",
                overflow: "hidden",
              }}
            >
              <video
                src="/your-video.mp4" // 👈 plug your src here
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* STATS — bottom ~35% on tangerine bg */}
            <div
              className="bg-tangerine-500"
              style={{
                flex: "0 0 35%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 12px",
              }}
            >
              {[
                ["24", "Paid"],
                ["7", "Pending"],
                ["2", "Overdue"],
              ].map(([val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    className="text-white"
                    style={{
                      fontSize: "clamp(14px, 2vw, 20px)",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    className="text-white/70"
                    style={{
                      fontSize: 9,
                      marginTop: 3,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAD badge — stays top-right */}
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
              zIndex: 10,
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
                style={{ fontSize: 7, fontWeight: 900, letterSpacing: 0.5 }}
              >
                M
              </span>
            </div>
            <span
              className="text-white/75"
              style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}
            >
              Built by MAD
            </span>
          </motion.div>

          {/* product label — stays bottom-left over image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            style={{ position: "absolute", bottom: 24, left: 24, zIndex: 10 }}
          >
            <p
              text="trubilling"
              inView={inView}
              delay={0.65}
              className="text-dark-900"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 900,
                letterSpacing: -0.6,
                lineHeight: 1,
                display: "block",
              }}
            />
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
          "linear-gradient(180deg, rgba(242,101,34,.12) 0%, rgba(242,101,34,.06) 35%, rgba(242,101,34,.02) 65%, transparent 100%)",
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
            <TypingText
              text="billing"
              inView={inView}
              delay={0.65}
              className="text-dark-900"
              // style={{
              //   fontSize: "clamp(20px, 3vw, 32px)",
              //   fontWeight: 900,
              //   letterSpacing: -0.6,
              //   lineHeight: 1,
              //   display: "block",
              // }}
            />
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
          TruBilling is a financial management platform designed to help small
          and growing businesses manage billing, track payments, and maintain
          financial clarity in one structured system. The goal was to simplify
          how businesses handle day-to-day financial operations without
          overwhelming them with complexity.
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
