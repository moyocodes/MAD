import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── STAGE TIMINGS ────────────────────────────────────────────────────────────
const S1_DUR = 3200;
const S3_DUR = 4000;
const S4_DUR = 120000;
const LOADING_DUR = S1_DUR + S3_DUR;
const TOTAL_DUR = LOADING_DUR + S4_DUR;
const LOOP_PAUSE = 750;

// ─── BLINK ────────────────────────────────────────────────────────────────────
const BLINK_CSS = `
@keyframes _madBlink{0%,100%{opacity:.18}50%{opacity:.85}}
._mb{animation:_madBlink 1.1s ease-in-out infinite}
._mb:nth-child(2){animation-delay:.22s}
._mb:nth-child(3){animation-delay:.44s}
@keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
.shimmer-anim{animation:shimmer 1.8s linear infinite}
`;
function injectBlink() {
  if (typeof document === "undefined" || document.getElementById("_mad-blink-sim")) return;
  const s = document.createElement("style");
  s.id = "_mad-blink-sim";
  s.textContent = BLINK_CSS;
  document.head.appendChild(s);
}

// ════════════════════════════════════════════════════════════════
// SHARED ATOMS
// ════════════════════════════════════════════════════════════════

function Chip({ label }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 pb-8 bg-gradient-to-b from-neutral-100/95 to-transparent">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase text-neutral-500 border border-neutral-200 bg-white/90 backdrop-blur-sm">
        <span className="inline-block rounded-full w-1.5 h-1.5 bg-sky-600" />
        {label}
      </span>
    </div>
  );
}

function DeliveredBadge({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-4 right-4 bottom-5 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3"
    >
      <div className="font-mono text-[9px] text-white/50 tracking-widest uppercase mb-1">{eyebrow}</div>
      <div className="text-[15px] text-white">{title}</div>
    </motion.div>
  );
}

function CoverImage({ src, alt, children }) {
  return (
    <>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      {children}
    </>
  );
}

function WFBrowser({ children }) {
  return (
    <div className="absolute top-7 left-4 right-4 bottom-0 overflow-hidden rounded-t-xl bg-[#f8f8f6] border border-black/10">
      <div className="h-7 flex items-center px-2.5 gap-1.5 bg-[#e8e8e6] border-b border-black/[0.08]">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ background: c }} className="w-2 h-2 rounded-full" />
        ))}
        <div className="flex-1 h-3.5 rounded bg-[#d8d8d6] mx-2" />
      </div>
      {children}
    </div>
  );
}

function Shimmer({ delay = 0, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#dbeeff] to-[#c0d8f0] ${className}`}>
      <div
        className="shimmer-anim absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  );
}

function RequestBubble({ text }) {
  return (
    <div className="absolute inset-0 flex flex-col items-end justify-end px-5 pt-14 pb-6 gap-1.5">
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: -8, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-14 left-4 w-[118px] h-[76px] rounded-xl bg-white border border-neutral-100 shadow-lg px-3 py-2.5 overflow-hidden"
      >
        {[28, 14, 20, 10].map((w, i) => (
          <div
            key={i}
            style={{ width: `${w}%` }}
            className={`h-[5px] rounded mb-1.5 ${i === 0 ? "bg-neutral-300" : "bg-neutral-100"}`}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-[rgba(26,26,24,0.93)] border border-white/10 rounded-[18px_18px_4px_18px] px-4 py-3.5 max-w-[255px] text-[13px] leading-relaxed text-[#f0ede8] shadow-xl"
      >
        {text}
      </motion.div>
      <span className="font-mono text-[9.5px] text-white/35 tracking-wide">you · just now</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PER-CARD STAGES
// ════════════════════════════════════════════════════════════════

function C1S1() {
  return (
    <div className="absolute inset-0">
      <WFBrowser>
        <div className="p-1.5">
          <Shimmer className="h-28 rounded-md relative">
            <div className="absolute inset-0 flex flex-col justify-center p-3.5">
              <div className="h-2.5 rounded w-3/5 mb-1.5 bg-sky-600/70" />
              <div className="h-1.5 rounded w-2/5 mb-2.5 bg-sky-600/40" />
              <div className="h-5 w-16 rounded bg-sky-600/80" />
            </div>
          </Shimmer>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-2">
          {[0, 0.4, 0.8].map((d, i) => (
            <div key={i} className="rounded-md overflow-hidden bg-white border border-neutral-100/50">
              <Shimmer delay={d} className="h-11" />
              <div className="p-1.5">
                <div className="h-1.5 rounded mb-1 bg-neutral-100 w-4/5" />
                <div className="h-1.5 rounded w-2/5 bg-sky-600/60" />
              </div>
            </div>
          ))}
        </div>
      </WFBrowser>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="Product & Digital" />
      <RequestBubble text="Build us a clean e-commerce storefront with a hero carousel and product grid." />
    </div>
  );
}

function C1S3() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="h-8 flex items-center px-3 justify-between border-b border-neutral-200/50">
        <span className="text-[11px] text-[#181817]">STRKT</span>
        <div className="flex gap-2">
          {["Shop", "Drops", "About"].map((n) => (
            <span key={n} className="text-[7.5px] text-neutral-400">{n}</span>
          ))}
        </div>
      </div>
      <div className="h-28 flex items-center px-3.5 gap-2.5 relative overflow-hidden bg-gradient-to-br from-[#0f1a2c] to-[#1a3050]">
        <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-sky-600/30 blur-2xl pointer-events-none" />
        <div className="flex-1">
          <div className="text-xs text-white leading-tight mb-1">Wear what<br />you mean.</div>
          <div className="text-[8px] text-white/50 mb-2">Limited drops, weekly.</div>
          <div className="inline-block text-[7px] px-2.5 py-1 rounded bg-sky-600 text-white">Shop now →</div>
        </div>
        <div className="w-14 h-20 rounded-md flex-shrink-0 bg-white/10 border border-white/15" />
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {[["Cargo Tee","$48","👕","#0f2a4a","#1a3a5c"],["Wide Hoodie","$90","🧥","#1a2030","#253040"],["Track Pant","$72","👖","#0a1520","#152030"]].map(([nm, pr, ic, from, to]) => (
          <div key={nm} className="rounded-md overflow-hidden bg-neutral-50 border border-neutral-200/50">
            <div
              className="h-13 flex items-center justify-center text-lg"
              style={{ background: `linear-gradient(135deg,${from},${to})` }}
            >{ic}</div>
            <div className="p-1.5">
              <div className="text-[7px] text-neutral-400">{nm}</div>
              <div className="text-[9px] text-sky-600">{pr}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 justify-center pt-1.5 pb-1.5 border-t border-neutral-100">
        {[["98","Perf"],["1.2s","Load"],["4.9★","Rating"]].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-[13px] text-sky-600">{v}</div>
            <div className="text-[7px] text-neutral-400">{l}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-3.5 flex items-center gap-1.5 rounded-full px-3 py-1 bg-[#181817] text-white text-[8.5px]">
        <div className="rounded-full w-1.5 h-1.5 bg-sky-500" />
        Live &amp; converting
      </div>
      <Chip label="Product & Digital" />
    </div>
  );
}

function C1S4() {
  return (
    <CoverImage src="/flier/image6.png" alt="Product & Digital">
      <Chip label="Product & Digital" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Product &amp; Digital</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

function C2S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white">
        <div className="flex items-center px-3 gap-2 h-11 border-b border-neutral-200/50">
          <span className="font-serif text-[15px] text-[#262626] flex-1">Instagram</span>
          {[0, 1].map((i) => <div key={i} className="w-5 h-5 rounded bg-neutral-300" />)}
        </div>
        <div className="flex items-center px-3.5 py-3 gap-2.5 border-b border-neutral-100">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 via-rose-500 to-pink-700 flex items-center justify-center text-white text-sm font-black flex-shrink-0">M</div>
          <div className="flex-1">
            <div className="text-[11px] text-[#262626]">mad.studio</div>
            <div className="text-[9.5px] text-[#8e8e8e]">@mad.studio · Creative Agency</div>
          </div>
          <div className="text-[9px] px-3.5 py-1 rounded-md bg-sky-600 text-white">Follow</div>
        </div>
        <div className="flex border-b border-neutral-100">
          {[["48","posts"],["24.8K","followers"],["4.2%","eng."]].map(([n, l]) => (
            <div key={l} className="flex-1 text-center py-2">
              <div className="text-[12px] text-[#262626]">{n}</div>
              <div className="text-[8px] text-[#8e8e8e]">{l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {[["#1980c2","Brand"],["#181817","Launch"],["#3da0e4","Web"],["#f0f0ee","MAD"],["#0f4f7a","Identity"],["#e8e8e4","Campaign"]].map(([bg, lbl], i) => (
            <div key={i} style={{ background: bg }} className="aspect-square flex items-center justify-center text-white text-[8px] font-extrabold">{lbl}</div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="Marketing & Comms" />
      <RequestBubble text="Create a social media content calendar for our spring product launch." />
    </div>
  );
}

function C2S3() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="h-10 flex items-center px-3 border-b border-neutral-200/50 bg-neutral-50">
        <span className="font-serif text-sm text-[#262626] flex-1">Instagram</span>
      </div>
      <div className="border-b border-neutral-100">
        <div className="flex items-center px-3 py-2 gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-rose-600 flex-shrink-0" />
          <span className="text-[10px] text-[#262626] flex-1">mad.studio</span>
        </div>
        <div className="h-40 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-600 to-sky-800">
          <div className="text-lg text-white text-center leading-tight px-2.5 relative z-10">
            Your brand,<br />everywhere.
          </div>
        </div>
        <div className="px-3 py-1.5 text-[8.5px] text-[#262626] leading-relaxed">
          <strong>mad.studio</strong> Campaigns that connect — content built to reach the right people at the right time.
        </div>
        <div className="px-3 pb-2 flex gap-1 flex-wrap">
          {["#branding","#marketing","#springdrop","#growth"].map((t) => (
            <span key={t} className="text-[8px] text-sky-600">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-3">
        {[["Total Reach","248K","+38%"],["Conv.","3.2K","+52%"]].map(([l, v, d]) => (
          <div key={l} className="flex-1 rounded-md p-2 bg-neutral-50">
            <div className="text-[7px] text-neutral-400">{l}</div>
            <div className="text-sm text-[#181817]">{v}</div>
            <div className="text-[8px] text-green-600">↑ {d}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 bg-black/75 backdrop-blur-sm text-white text-[8px]">
        <div className="rounded-full w-1.5 h-1.5 bg-sky-500" />
        Campaign live
      </div>
      <Chip label="Marketing & Comms" />
    </div>
  );
}

function C2S4() {
  return (
    <CoverImage src="/flier/image4.png" alt="Marketing & Comms">
      <Chip label="Marketing & Comms" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Marketing &amp; Comms</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

function C3S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#f8f7f5]">
        <div className="h-9 flex items-center px-3 gap-2 bg-white border-b border-neutral-100">
          <span className="text-[11px] text-[#181817]">M<span className="text-sky-600">A</span>D Brand Studio</span>
        </div>
        <div className="h-7 flex bg-white border-b border-neutral-100">
          {["Colours","Typography","Components"].map((t, i) => (
            <div
              key={t}
              className={`flex items-center px-3 text-[8px] border-b-2 ${i === 0 ? "text-sky-600 border-sky-600" : "text-neutral-400 border-transparent"}`}
            >{t}</div>
          ))}
        </div>
        <div className="p-2.5">
          <div className="flex rounded-lg overflow-hidden h-16 mb-2 shadow-md">
            {[["#1980c2","Azure","rgba(255,255,255,0.7)"],["#181817","Onyx","rgba(255,255,255,0.7)"],["#fff","White","#aaa"],["#0f4f7a","Deep","rgba(255,255,255,0.7)"],["#3da0e4","Sky","rgba(255,255,255,0.7)"]].map(([bg, l, c]) => (
              <div
                key={l}
                style={{ background: bg, color: c }}
                className="flex-1 flex items-end justify-center pb-1.5 text-[6px]"
              >{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="Brand & Identity" />
      <RequestBubble text="Design a bold brand identity system with logo, type, and a colour palette." />
    </div>
  );
}

function C3S3() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative overflow-hidden flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-[#0a1628] via-[#0f2a4a] to-sky-700/50" style={{ height: "55%" }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-sky-600/25 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <polygon points="11,1 21,7 21,15 11,21 1,15 1,7" fill="white" opacity=".9" />
            </svg>
          </div>
          <span className="text-[28px] text-white leading-none tracking-tight">M<span className="text-sky-400">AD</span></span>
        </div>
        <div className="font-mono text-[9px] tracking-widest uppercase text-white/40 relative z-10">Identity System · 2025</div>
        <div className="flex rounded-lg overflow-hidden w-48 relative z-10">
          {[["#1980c2","#fff","MAD"],["#fff","#181817","MAD"],["#181817","#fff","MAD"]].map(([bg, color, lbl], i) => (
            <div
              key={i}
              style={{ background: bg, color }}
              className="flex-1 flex items-center justify-center py-1.5 text-[10px]"
            >{lbl}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-3 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {["#1980c2","#181817","#fff","#0f4f7a","#3da0e4"].map((c, i) => (
              <div
                key={i}
                style={{ background: c }}
                className={`w-5 h-5 rounded shadow-sm ${c === "#fff" ? "border border-neutral-200" : ""}`}
              />
            ))}
          </div>
          <div className="ml-2">
            <div className="text-[8px] text-[#181817]">Azure Blue</div>
            <div className="font-mono text-[7px] text-neutral-400">#1980c2 · Primary</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 bg-[#181817] text-white text-[8px] z-10">
        <div className="rounded-full w-1.5 h-1.5 bg-sky-500" />
        Brand system complete
      </div>
      <Chip label="Brand & Identity" />
    </div>
  );
}

function C3S4() {
  return (
    <CoverImage src="/flier/image10.png" alt="Brand & Identity">
      <Chip label="Brand & Identity" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Brand &amp; Identity</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

function C4S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#f8f8f6]">
        <WFBrowser><div /></WFBrowser>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="E-Commerce" />
      <RequestBubble text="Set up a Shopify store with custom checkout and Spring drop landing pages." />
    </div>
  );
}

function C4S3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-800 to-sky-600" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
      <DeliveredBadge eyebrow="Delivered" title="Store live · converting" />
      <Chip label="E-Commerce" />
    </div>
  );
}

function C4S4() {
  return (
    <CoverImage src="/flier/image6.png" alt="E-Commerce">
      <Chip label="E-Commerce" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">E-Commerce</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

function C5S1() {
  return (
    <div className="absolute inset-0 bg-[#0d1117]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="Campaign Analytics" />
      <RequestBubble text="Build a real-time dashboard showing ROAS, reach, CPA, and conversions." />
    </div>
  );
}

function C5S3() {
  return (
    <div className="absolute inset-0 flex flex-col p-3.5 bg-[#0d1117]">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-white">Live Dashboard</span>
        <span className="font-mono text-[8px] text-white/30">Real-time · May 2025</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        {[["ROAS","6.4×","↑ Strong"],["Reach","248K","↑ +38%"],["Conv.","3.2K","↑ +52%"]].map(([l, v, d]) => (
          <div key={l} className="rounded-lg p-2 bg-white/[0.04] border border-white/[0.07]">
            <div className="text-[7px] text-white/35 mb-0.5">{l}</div>
            <div className="text-[15px] text-white leading-none">{v}</div>
            <div className="text-[8px] text-green-500">{d}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg flex items-center justify-between p-2.5 bg-sky-600/15 border border-sky-600/30">
        <div className="font-mono text-[9px] text-white/50 tracking-widest uppercase">ROAS · Campaign total</div>
        <div className="text-[22px] text-sky-500">6.4×</div>
      </div>
      <Chip label="Campaign Analytics" />
    </div>
  );
}

function C5S4() {
  return (
    <CoverImage src="/flier/image5.png" alt="Campaign Analytics">
      <Chip label="Campaign Analytics" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Campaign Analytics</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

function C6S1() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#1a1a18]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/85" />
      <Chip label="Illustration" />
      <RequestBubble text="Create a 4-panel editorial comic for our product launch announcement." />
    </div>
  );
}

function C6S3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a1a18]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-1.5 w-[88%] p-6">
          {["✏️","🎨","🖼️","✨"].map((icon, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-2xl bg-white/[0.06] border border-white/10"
            >{icon}</div>
          ))}
        </div>
      </div>
      <DeliveredBadge eyebrow="Delivered" title="Illustration pack ready" />
      <Chip label="Illustration" />
    </div>
  );
}

function C6S4() {
  return (
    <CoverImage src="/flier/image8.png" alt="Illustration">
      <Chip label="Illustration" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="absolute bottom-5 left-4 right-4 flex items-end justify-between"
      >
        <div>
          <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Illustration</div>
          <div className="text-[22px] text-white/90 leading-none">MAD Studio.</div>
        </div>
        <div className="rounded-full w-2 h-2 mb-1 bg-sky-500" />
      </motion.div>
    </CoverImage>
  );
}

// ─── CARD CONFIG ──────────────────────────────────────────────────────────────
const CARD_CONFIGS = [
  { id:"c1", title:"Product & Digital", sub:"Websites, apps, and digital platforms built to perform and scale.", S1:C1S1, S3:C1S3, S4:C1S4 },
  { id:"c2", title:"Marketing & Comms", sub:"Campaigns and content systems that connect brands with the right audience.", S1:C2S1, S3:C2S3, S4:C2S4 },
  { id:"c3", title:"Brand & Identity", sub:"Logo, type, colour, and brand systems that bring clarity to every touchpoint.", S1:C3S1, S3:C3S3, S4:C3S4 },
  { id:"c4", title:"E-Commerce", sub:"Shopify and Next.js stores optimised to convert from day one.", S1:C4S1, S3:C4S3, S4:C4S4 },
  { id:"c5", title:"Campaign Analytics", sub:"Live dashboards, KPI benchmarks, and weekly insight reports.", S1:C5S1, S3:C5S3, S4:C5S4 },
  { id:"c6", title:"Illustration", sub:"Editorial illustration, comics, and icon systems for campaigns and brand.", S1:C6S1, S3:C6S3, S4:C6S4 },
];

// ════════════════════════════════════════════════════════════════
// SERVICE CARD
// ════════════════════════════════════════════════════════════════
function ServiceCard({ config, startDelay, isActive }) {
  const [stage, setStage] = useState(0);
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const runCycle = useCallback(() => {
    const pf = fillRef.current;
    if (pf) { pf.style.transition = "none"; pf.style.width = "0%"; }
    setStage(0);
    let startTs = null;
    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const el = ts - startTs;
      const pct = Math.min(100, (el / LOADING_DUR) * 100);
      if (pf) pf.style.width = `${pct}%`;
      if (el < S1_DUR) setStage(0);
      else if (el < LOADING_DUR) setStage(1);
      else setStage(2);
      if (el < TOTAL_DUR) { rafRef.current = requestAnimationFrame(tick); }
      else { timerRef.current = setTimeout(runCycle, LOOP_PAUSE); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    injectBlink();
    const t = setTimeout(runCycle, startDelay);
    return () => { clearTimeout(t); clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [runCycle, startDelay]);

  const { S1, S3, S4, title, sub } = config;

  return (
    <div className="flex-shrink-0 flex flex-col gap-3.5 relative w-[min(340px,calc(100vw-48px))] pb-2.5 pr-2.5">
      {/* Shadow layers */}
      <div className="absolute top-3 left-3 right-0 h-[490px] bg-azure-200/20 rounded-[22px] z-0" />
      <div className="absolute top-1.5 left-1.5 -right-1.5 h-[490px] bg-azure-100/30 border border-azure-200/40 rounded-[22px] z-[1]" />

      {/* Card */}
      <div
        className={`relative w-full h-[490px] rounded-[22px] z-[2] bg-azure-50 border border-azure-200/60 overflow-hidden ${
          isActive ? "shadow-2xl shadow-azure-500/10" : "shadow-md shadow-black/[0.06]"
        }`}
        style={{ transition: "box-shadow 0.5s ease" }}
      >
        <AnimatePresence>
          {stage === 0 && (
            <motion.div key="s1" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <S1 />
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div key="s3" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <S3 />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div key="s4" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <S4 />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage dots */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-1.5 z-30">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ width: i === stage ? 14 : 5, background: i === stage ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.22)" }}
              transition={{ duration: 0.2 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-black/[0.06]">
          <div ref={fillRef} className="h-full w-0 bg-azure-500/80" style={{ transition: "none" }} />
        </div>
      </div>

      {/* Text */}
      <motion.div
        className="px-1"
        animate={{ opacity: isActive ? 1 : 0.45, y: isActive ? 0 : 4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-[19px] text-dark-900 leading-tight mb-1">{title}</div>
        <div className="text-[11.5px] text-dark-900/55 leading-relaxed">{sub}</div>
      </motion.div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SERVICES IN MOTION
// ════════════════════════════════════════════════════════════════
export default function ServicesInMotion() {
  const wrapRef = useRef(null);
  const stripRef = useRef(null);
  const [active, setActive] = useState(0);

  const CARD_W_BASE = 340;
  const CARD_GAP = 24;
  const STEP = CARD_W_BASE + CARD_GAP;
  const maxIdx = CARD_CONFIGS.length - 1;

  // Desktop scroll-driven
  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      if (window.innerWidth < 640) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const cardIdx = Math.round(p * maxIdx);
      setActive(Math.min(maxIdx, Math.max(0, cardIdx)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [maxIdx]);

  // Mobile touch swipe
  const touchStartX = useRef(null);
  const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) setActive((a) => Math.min(maxIdx, a + 1));
      else setActive((a) => Math.max(0, a - 1));
    }
    touchStartX.current = null;
  }, [maxIdx]);

  // Desktop wheel
  const wheelAcc = useRef(0);
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    wheelAcc.current += e.deltaY;
    if (wheelAcc.current > 60) { setActive((a) => Math.min(maxIdx, a + 1)); wheelAcc.current = 0; }
    else if (wheelAcc.current < -60) { setActive((a) => Math.max(0, a - 1)); wheelAcc.current = 0; }
  }, [maxIdx]);

  const translateX = -active * STEP;

  const navBtns = [
    { d: "M14 6L8 12l6 6", fn: () => setActive((a) => Math.max(0, a - 1)) },
    { d: "M10 6l6 6-6 6", fn: () => setActive((a) => Math.min(maxIdx, a + 1)) },
  ];

  return (
    <section
      ref={wrapRef}
      id="services-in-motion"
      className="relative"
      style={{
        height: `calc(100vh + ${CARD_CONFIGS.length * 420}px)`,
        background: "linear-gradient(160deg, #eef7fd 0%, #f7fbff 30%, rgba(179,216,245,0.22) 65%, #eef7fd 100%)",
      }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Sticky panel */}
      <div className="sticky top-0 h-screen overflow-hidden z-[1] flex flex-col bg-azure-50/55 backdrop-blur-[1px]">

        {/* Header */}
        <div className="pt-[72px] px-6 flex items-end justify-between flex-shrink-0">
          <div>
            <p className="m-0 mb-2 font-mono text-[10px] tracking-widest uppercase text-dark-900/40">
              Services in motion &nbsp;·&nbsp; scroll to explore
            </p>
            <h2 className="m-0 text-dark-900 leading-[1.05] tracking-[-0.04em]" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              Systems for <span style={{ color: "#1980c2" }}>growth.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {navBtns.map(({ d, fn }, i) => (
              <button
                key={i}
                onClick={fn}
                className="w-9 h-9 rounded-full bg-transparent border border-dark-900/15 cursor-pointer flex items-center justify-center hover:bg-dark-900/5 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(15,23,42,.5)" strokeWidth="2" strokeLinecap="round">
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Card strip */}
        <div
          ref={stripRef}
          className="flex-1 overflow-hidden pl-5 sm:pl-12"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex h-full items-start pt-6 pb-2"
            style={{ gap: CARD_GAP }}
            animate={{ x: translateX }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            {CARD_CONFIGS.map((cfg, i) => (
              <ServiceCard key={cfg.id} config={cfg} isActive={i === active} startDelay={i * 650} />
            ))}
          </motion.div>
        </div>

        {/* Dot nav */}
        <div className="flex justify-center pb-5 pt-2.5 gap-2 flex-shrink-0">
          {CARD_CONFIGS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 18 : 6,
                background: i === active ? "rgba(15,23,42,.55)" : "rgba(15,23,42,.18)",
              }}
              transition={{ duration: 0.2 }}
              className="h-1.5 rounded-full border-none cursor-pointer p-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}


