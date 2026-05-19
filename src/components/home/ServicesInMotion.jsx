import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate, useInView } from "framer-motion";
import { homeCms } from "@/data/homeCms";
import { useCms } from "@/context/CmsContext";

// ─── Shared primitives (original, unchanged) ──────────────────────────────────

function Chip({ label }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: "10px 14px 28px",
        background: "linear-gradient(to bottom,rgba(244,244,242,.95),transparent)",
      }}
    >
      <span
        className="bg-white/90 inline-flex items-center gap-[5px]"
        style={{
          padding: "3px 10px",
          borderRadius: 99,
          fontFamily: "monospace",
          fontSize: 8,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#666",
          border: "1px solid #ddd",
          backdropFilter: "blur(6px)",
        }}
      >
        <span
          className="bg-azure-500"
          style={{ width: 5, height: 5, borderRadius: "50%", display: "inline-block" }}
        />
        {label}
      </span>
    </div>
  );
}

function Shimmer({ delay = 0, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg,#dbeeff,#c0d8f0)",
        ...style,
      }}
    >
      <div
        className="sh"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

function Browser({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 12,
        right: 12,
        bottom: 0,
        background: "#f8f8f6",
        border: "1px solid rgb(0 0 0 / 9%)",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 24,
          background: "#e8e8e6",
          borderBottom: "1px solid rgb(0 0 0 / 7%)",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 5,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, height: 12, borderRadius: 3, background: "#d8d8d6", margin: "0 6px" }} />
      </div>
      {children}
    </div>
  );
}

function ReqBubble({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "48px 16px 18px",
        gap: 5,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "rgba(26,26,24,.93)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: "16px 16px 3px 16px",
          padding: "12px 14px",
          maxWidth: 240,
          fontSize: 12,
          lineHeight: 1.55,
          color: "#f0ede8",
        }}
      >
        {text}
      </motion.div>
      <span className="text-white/30" style={{ fontFamily: "monospace", fontSize: 8.5 }}>
        you · just now
      </span>
    </div>
  );
}

// ─── Card 1: Product & Digital ────────────────────────────────────────────────

function C1S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Browser>
        <div style={{ padding: 6 }}>
          <Shimmer style={{ height: 100, borderRadius: 5, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: 12 }}>
              <div className="bg-azure-500/70" style={{ height: 10, width: "55%", borderRadius: 2, marginBottom: 6 }} />
              <div className="bg-azure-500/40" style={{ height: 7, width: "35%", borderRadius: 2, marginBottom: 10 }} />
              <div className="bg-azure-500/80" style={{ height: 20, width: 56, borderRadius: 3 }} />
            </div>
          </Shimmer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, padding: "0 6px" }}>
          {[0, 0.35, 0.7].map((d, i) => (
            <div key={i} className="bg-white" style={{ borderRadius: 5, overflow: "hidden", border: "1px solid rgba(240,240,240,.6)" }}>
              <Shimmer delay={d} style={{ height: 40 }} />
              <div style={{ padding: 5 }}>
                <div style={{ height: 5, width: "80%", borderRadius: 2, background: "#f0f0f0", marginBottom: 4 }} />
                <div className="bg-azure-500/50" style={{ height: 5, width: "40%", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </Browser>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))" }} />
      <Chip label="Product & Digital" />
      <ReqBubble text="Build a clean e-commerce storefront with hero carousel and product grid." />
    </div>
  );
}

function C1S2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1e1e2e", display: "flex", flexDirection: "column", fontFamily: "monospace" }}>
      <style>{`
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
        @keyframes popInRight{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
      `}</style>
      <div style={{ height: 28, background: "#252535", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 10 }}>
          {["✦ Move","⬜ Frame","✏ Pen","T Text"].map((t) => (
            <span key={t} style={{ fontSize: 6, color: "rgba(255,255,255,.35)" }}>{t}</span>
          ))}
        </div>
        <span style={{ fontSize: 6, color: "#1980c2", background: "rgba(25,128,194,.18)", padding: "2px 6px", borderRadius: 3 }}>STRKT · Draft</span>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
          <div style={{ animation: "slideDown 0.45s ease both", animationDelay: "0.05s", background: "#252535", borderRadius: 4, border: "1px solid rgba(255,255,255,.1)", height: 22, display: "flex", alignItems: "center", padding: "0 8px", justifyContent: "space-between" }}>
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.7)", fontWeight: 700 }}>STRKT</span>
            <div style={{ display: "flex", gap: 8 }}>
              {["Shop","Drops","About"].map((n) => <span key={n} style={{ fontSize: 5.5, color: "rgba(255,255,255,.3)" }}>{n}</span>)}
            </div>
          </div>
          <div style={{ animation: "slideDown 0.45s ease both", animationDelay: "0.22s", background: "linear-gradient(135deg,#0f1a2c,#1a3050)", borderRadius: 4, border: "1px solid rgba(25,128,194,.25)", height: 72, display: "flex", alignItems: "center", padding: "0 10px", gap: 8, position: "relative", overflow: "hidden" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: "#fff", lineHeight: 1.3, marginBottom: 3 }}>Wear what<br/>you mean.</div>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)", marginBottom: 5 }}>Limited drops, weekly.</div>
              <div style={{ fontSize: 5.5, background: "#1980c2", color: "#fff", display: "inline-block", padding: "2px 6px", borderRadius: 2 }}>Shop now →</div>
            </div>
            <div style={{ width: 36, height: 50, borderRadius: 3, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", flexShrink: 0 }} />
            <div style={{ position: "absolute", inset: -1, borderRadius: 4, border: "1.5px solid #1980c2", pointerEvents: "none" }} />
          </div>
          <div style={{ animation: "slideDown 0.45s ease both", animationDelay: "0.42s", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
            {[["Cargo Tee","$48","#0f2a4a","#1a3a5c"],["Wide Hoodie","$90","#1a2030","#253040"],["Track Pant","$72","#0a1520","#152030"]].map(([nm, pr, f, t]) => (
              <div key={nm} style={{ borderRadius: 4, overflow: "hidden", background: "#252535", border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ height: 30, background: `linear-gradient(135deg,${f},${t})` }} />
                <div style={{ padding: 4 }}>
                  <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)" }}>{nm}</div>
                  <div style={{ fontSize: 7, color: "#1980c2", fontWeight: 700 }}>{pr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ animation: "popInRight 0.4s ease both", animationDelay: "0.1s", width: 80, background: "#252535", borderLeft: "1px solid rgba(255,255,255,.07)", display: "flex", flexDirection: "column", padding: "8px 0", flexShrink: 0 }}>
          <div style={{ fontSize: 6, color: "rgba(255,255,255,.35)", padding: "0 8px", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Components</div>
          {[["Hero Section", true],["Product Grid", false],["Nav Bar", false]].map(([label, isActive]) => (
            <div key={label} style={{ padding: "5px 8px", fontSize: 6, color: isActive ? "#fff" : "rgba(255,255,255,.38)", background: isActive ? "rgba(25,128,194,.22)" : "transparent", borderLeft: isActive ? "2px solid #1980c2" : "2px solid transparent", cursor: "default" }}>{label}</div>
          ))}
        </div>
      </div>
      <div style={{ height: 28, background: "#252535", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexShrink: 0 }}>
        {[["98","Perf"],["1.2s","Load"],["4.9★","Rating"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#1980c2" }}>{v}</div>
            <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.3)" }}>{l}</div>
          </div>
        ))}
      </div>
      <Chip label="Product & Digital" />
    </div>
  );
}

function C1S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/1.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="Product & Digital" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>Product &amp; Digital</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Card 2: Marketing & Comms ────────────────────────────────────────────────

function C2S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div className="bg-white" style={{ position: "absolute", inset: 0 }}>
        <div style={{ height: 38, display: "flex", alignItems: "center", padding: "0 12px", gap: 8, borderBottom: "1px solid rgba(229,229,229,.5)" }}>
          <span style={{ fontSize: 14, color: "#262626", flex: 1, fontFamily: "serif" }}>Instagram</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 12px", gap: 10, borderBottom: "1px solid #f5f5f5" }}>
          <div className="text-white" style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#fb923c,#db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>M</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#262626" }}>mad.studio</div>
            <div style={{ fontSize: 8.5, color: "#8e8e8e" }}>@mad.studio · Creative Agency</div>
          </div>
          <div className="bg-azure-500 text-white" style={{ fontSize: 8, padding: "4px 12px", borderRadius: 5 }}>Follow</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, padding: 1 }}>
          {[["#1980c2","Brand"],["#181817","Launch"],["#3da0e4","Web"],["#f0f0ee","MAD"],["#0f4f7a","Identity"],["#e8e8e4","Campaign"]].map(([bg, lbl], i) => (
            <div key={i} style={{ background: bg, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", color: bg === "#f0f0ee" || bg === "#e8e8e4" ? "#181817" : "#ffffff", fontSize: 7.5, fontWeight: 900 }}>{lbl}</div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))" }} />
      <Chip label="Marketing & Comms" />
      <ReqBubble text="Create a social media content calendar for our spring product launch." />
    </div>
  );
}

function C2S2() {
  return (
    <div className="bg-white" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 36, display: "flex", alignItems: "center", padding: "0 12px", borderBottom: "1px solid rgba(229,229,229,.5)", background: "#f8f8f8" }}>
        <span style={{ fontSize: 13, color: "#262626", flex: 1, fontFamily: "serif" }}>Instagram</span>
      </div>
      <div style={{ borderBottom: "1px solid #f5f5f5" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#fb923c,#db2777)", flexShrink: 0 }} />
          <span style={{ fontSize: 9, color: "#262626", flex: 1 }}>mad.studio</span>
        </div>
        <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1980c2,#0f4f7a)", position: "relative" }}>
          <div className="text-white" style={{ fontSize: 17, textAlign: "center", lineHeight: 1.25, padding: "0 10px", position: "relative", zIndex: 1 }}>Your brand,<br />everywhere.</div>
        </div>
        <div style={{ padding: "5px 12px 3px", fontSize: 8, color: "#262626", lineHeight: 1.55 }}>
          <strong>mad.studio</strong> Campaigns that connect — content built to reach the right people.
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "0 12px 8px" }}>
          {["#branding","#marketing","#springdrop","#growth"].map((t) => (
            <span key={t} className="text-azure-500" style={{ fontSize: 7.5 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "8px 12px" }}>
        {[["Total Reach","248K","+38%"],["Conv.","3.2K","+52%"]].map(([l, v, d]) => (
          <div key={l} style={{ flex: 1, borderRadius: 5, padding: 8, background: "#f8f8f8" }}>
            <div style={{ fontSize: 6.5, color: "#aaa" }}>{l}</div>
            <div className="text-dark-900" style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
            <div style={{ fontSize: 7.5, color: "#22c55e" }}>↑ {d}</div>
          </div>
        ))}
      </div>
      <div className="text-white bg-black/75 flex items-center gap-[5px]" style={{ position: "absolute", bottom: 14, right: 12, backdropFilter: "blur(8px)", fontSize: 7.5, padding: "4px 10px", borderRadius: 99 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8" }} />
        Campaign live
      </div>
      <Chip label="Marketing & Comms" />
    </div>
  );
}

function C2S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/2.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="Marketing & Comms" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>Marketing &amp; Comms</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Card 3: Brand & Identity ─────────────────────────────────────────────────

function C3S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#f8f7f5" }}>
        <div className="bg-white" style={{ height: 32, display: "flex", alignItems: "center", padding: "0 12px", borderBottom: "1px solid #f0f0f0" }}>
          <span className="text-dark-900" style={{ fontSize: 10 }}>M<span className="text-azure-500">A</span>D Brand Studio</span>
        </div>
        <div className="bg-white" style={{ height: 24, display: "flex", borderBottom: "1px solid #f0f0f0" }}>
          {["Colours","Typography","Components"].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", padding: "0 10px", fontSize: 7.5, borderBottom: `2px solid ${i === 0 ? "#1980c2" : "transparent"}`, color: i === 0 ? "#1980c2" : "#aaa" }}>{t}</div>
          ))}
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 52, marginBottom: 8, boxShadow: "0 2px 8px rgba(0,0,0,.1)" }}>
            {[["#1980c2","Azure","rgba(255,255,255,.7)"],["#181817","Onyx","rgba(255,255,255,.7)"],["#ffffff","White","#aaa"],["#0f4f7a","Deep","rgba(255,255,255,.7)"],["#3da0e4","Sky","rgba(255,255,255,.7)"]].map(([bg, l, c]) => (
              <div key={l} style={{ background: bg, color: c, flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 5, fontSize: 5.5, fontWeight: 700 }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))" }} />
      <Chip label="Brand & Identity" />
      <ReqBubble text="Design a bold brand identity system with logo, type, and a colour palette." />
    </div>
  );
}

function C3S2() {
  const swatches = [
    { color: "#1980c2", name: "Azure Blue", hex: "#1980c2", role: "Primary",   delay: "0.05s" },
    { color: "#181817", name: "Onyx",       hex: "#181817", role: "Dark",      delay: "0.28s" },
    { color: "#ffffff", name: "White",      hex: "#ffffff", role: "Light",     delay: "0.50s" },
    { color: "#0f4f7a", name: "Deep Navy",  hex: "#0f4f7a", role: "Accent",    delay: "0.72s" },
    { color: "#3da0e4", name: "Sky",        hex: "#3da0e4", role: "Highlight", delay: "0.94s" },
  ];
  const logoVariants = [
    { bg: "#1980c2", color: "#ffffff", label: "MAD", delay: "0.15s" },
    { bg: "#ffffff", color: "#181817", label: "MAD", delay: "0.35s" },
    { bg: "#181817", color: "#ffffff", label: "MAD", delay: "0.55s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#f8f7f5", fontFamily: "monospace" }}>
      <style>{`
        @keyframes popIn{from{opacity:0;transform:scale(0.6)}to{opacity:1;transform:scale(1)}}
        @keyframes colorSlide{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
        @keyframes cursorPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
      `}</style>
      <div style={{ height: 30, background: "#fff", borderBottom: "1px solid #ebebeb", display: "flex", alignItems: "center", padding: "0 12px", gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 8.5, color: "#181817", fontWeight: 700 }}>M<span style={{ color: "#1980c2" }}>A</span>D Brand Studio</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 0 }}>
          {["Colours","Typography","Components"].map((t, i) => (
            <div key={t} style={{ fontSize: 7, padding: "0 8px", height: 30, display: "flex", alignItems: "center", borderBottom: i === 0 ? "2px solid #1980c2" : "2px solid transparent", color: i === 0 ? "#1980c2" : "#aaa" }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          <div style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>Colour Palette</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {swatches.map((s, i) => (
              <div key={s.hex} style={{ display: "flex", alignItems: "center", gap: 8, animation: "colorSlide 0.38s cubic-bezier(0.22,1,0.36,1) both", animationDelay: s.delay }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 5, background: s.color, border: s.color === "#ffffff" ? "1px solid #ddd" : "none", animation: i === 0 ? "popIn 0.35s cubic-bezier(0.22,1,0.36,1) both" : undefined, animationDelay: i === 0 ? s.delay : undefined }} />
                  {i === 0 && <div style={{ position: "absolute", inset: -3, borderRadius: 8, border: "1.5px solid #1980c2", animation: "cursorPulse 1.4s ease-in-out infinite" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 7.5, color: "#181817", lineHeight: 1.2 }}>{s.name}</div>
                  <div style={{ fontSize: 6, color: "#bbb" }}>{s.hex} · {s.role}</div>
                </div>
                {i === 0 && <div style={{ marginLeft: "auto", fontSize: 6, background: "rgba(25,128,194,.12)", color: "#1980c2", padding: "2px 6px", borderRadius: 99 }}>selected</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 110, borderLeft: "1px solid #ebebeb", padding: 10, display: "flex", flexDirection: "column", gap: 8, background: "#fff" }}>
          <div style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Logo Variants</div>
          {logoVariants.map((v, i) => (
            <div key={i} style={{ background: v.bg, color: v.color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", fontSize: 11, fontWeight: 900, letterSpacing: "0.04em", border: v.bg === "#ffffff" ? "1px solid #eee" : "none", animation: "popIn 0.38s cubic-bezier(0.22,1,0.36,1) both", animationDelay: v.delay, fontFamily: "sans-serif" }}>{v.label}</div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 14, right: 12, display: "flex", alignItems: "center", gap: 5, fontSize: 7.5, padding: "4px 10px", borderRadius: 99, background: "#181817", color: "#fff", zIndex: 10 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8" }} />
        Brand system building…
      </div>
      <Chip label="Brand & Identity" />
    </div>
  );
}

function C3S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/3.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="Brand & Identity" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>Brand &amp; Identity</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Card 4: Strategy ─────────────────────────────────────────────────────────

function C4S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#f4f6f8" }}>
        <div style={{ height: 36, background: "#fff", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
          <span style={{ fontSize: 10, color: "#181817", fontWeight: 700 }}>M<span style={{ color: "#1980c2" }}>A</span>D Strategy</span>
        </div>
        <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {[["Audience","80%"],["Position","60%"],["Voice","90%"],["Story","70%"]].map(([l, w]) => (
            <div key={l}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#888", marginBottom: 3 }}><span>{l}</span><span>{w}</span></div>
              <div style={{ height: 5, background: "rgba(25,128,194,.12)", borderRadius: 3 }}>
                <div style={{ height: "100%", width: w, background: "#1980c2", borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))" }} />
      <Chip label="Strategy" />
      <ReqBubble text="Map out our brand positioning and audience strategy for the next quarter." />
    </div>
  );
}

function C4S2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#f4f6f8", display: "flex", flexDirection: "column" }}>
      <style>{`@keyframes growBar{from{width:0}}`}</style>
      <div style={{ height: 30, background: "#fff", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", padding: "0 12px" }}>
        <span style={{ fontSize: 8.5, fontWeight: 700, color: "#181817" }}>M<span style={{ color: "#1980c2" }}>A</span>D Strategy</span>
      </div>
      <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 7, color: "#aaa", letterSpacing: ".15em", textTransform: "uppercase" }}>Brand Pillars</div>
        {[["Audience","People-first","85%","0.1s"],["Position","Bold & clear","65%","0.3s"],["Voice","Honest wit","92%","0.5s"],["Story","Origin-led","74%","0.7s"]].map(([k, v, w, d]) => (
          <div key={k} style={{ animation: `colorSlide 0.4s ease both`, animationDelay: d }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, marginBottom: 3 }}>
              <span style={{ color: "#181817", fontWeight: 600 }}>{k}</span>
              <span style={{ color: "#1980c2", fontFamily: "monospace" }}>{v}</span>
            </div>
            <div style={{ height: 5, background: "rgba(25,128,194,.1)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: w, background: "linear-gradient(90deg,#1980c2,#3da0e4)", borderRadius: 3, animation: `growBar 0.6s ease both`, animationDelay: d }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 12px", background: "rgba(25,128,194,.06)", borderTop: "1px solid rgba(25,128,194,.12)", display: "flex", gap: 6 }}>
        {[["NPS","72"],["Recall","88%"],["Share","+31%"]].map(([l, v]) => (
          <div key={l} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1980c2" }}>{v}</div>
            <div style={{ fontSize: 6, color: "#aaa" }}>{l}</div>
          </div>
        ))}
      </div>
      <Chip label="Strategy" />
    </div>
  );
}

function C4S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/4.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="Strategy" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>Strategy</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Card 5: Motion & Film ────────────────────────────────────────────────────

function C5S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#0d0d14", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(25,128,194,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "18px 0 18px 30px", borderColor: "transparent transparent transparent rgba(25,128,194,.8)", marginLeft: 6 }} />
        </div>
        <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 3 }}>
          {[1,1,2,1,3,2,1,2,1,1,3,2].map((h, i) => (
            <div key={i} style={{ width: 3, height: h * 8, background: `rgba(25,128,194,${0.3 + h * 0.2})`, borderRadius: 2 }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,.6),rgba(0,0,0,.88))" }} />
      <Chip label="Motion & Film" />
      <ReqBubble text="Produce a 60-second brand film and animated logo reveal for our launch." />
    </div>
  );
}

function C5S2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#111118", display: "flex", flexDirection: "column", fontFamily: "monospace" }}>
      <style>{`
        @keyframes waveBar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(2.2)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
      `}</style>
      <div style={{ height: 28, background: "#1a1a24", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, textAlign: "center", fontSize: 6.5, color: "rgba(255,255,255,.3)" }}>Timeline — MAD_Launch_v3.aep</div>
        <span style={{ fontSize: 6, color: "#1980c2", background: "rgba(25,128,194,.15)", padding: "2px 6px", borderRadius: 3 }}>00:42</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 8, gap: 5 }}>
        {[["Logo Reveal","#1980c2","70%"],["Text Anim","#3da0e4","45%"],["BG Motion","#0f4f7a","88%"],["Sound","#38bdf8","60%"]].map(([l, c, w]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 60, fontSize: 6, color: "rgba(255,255,255,.4)", textAlign: "right" }}>{l}</div>
            <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,.05)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: w, background: c, opacity: .7, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: w, top: 0, bottom: 0, width: 2, background: "#fff", opacity: .9 }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 6, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 32 }}>
          {[1,2,3,2,4,3,2,5,3,2,4,2,3,1,2,3].map((h, i) => (
            <div key={i} style={{ width: 4, height: h * 5, background: "#1980c2", borderRadius: 2, opacity: .7, animation: `waveBar 0.8s ease-in-out infinite`, animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "6px 10px", background: "#1a1a24", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "center", gap: 16 }}>
        {[["60s","Duration"],["4K","Export"],["24fps","Frame"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#1980c2" }}>{v}</div>
            <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.3)" }}>{l}</div>
          </div>
        ))}
      </div>
      <Chip label="Motion & Film" />
    </div>
  );
}

function C5S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/5.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="Motion & Film" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>Motion &amp; Film</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Card 6: UX & Interface ───────────────────────────────────────────────────

function C6S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#f0f4f8" }}>
        <div style={{ height: 32, background: "#fff", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#181817" }}>M<span style={{ color: "#1980c2" }}>A</span>D UX</span>
        </div>
        <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ background: "#fff", borderRadius: 5, padding: 8, border: "1px solid #e8e8e8" }}>
            <div style={{ fontSize: 6.5, color: "#aaa", marginBottom: 5 }}>User Flow — Checkout</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["Cart","Details","Payment","Done"].map((s, i) => (
                <div key={s} style={{ display: "contents" }}>
                  <div style={{ flex: 1, background: i === 0 ? "#1980c2" : i === 1 ? "rgba(25,128,194,.2)" : "#f0f0f0", borderRadius: 3, padding: "3px 0", textAlign: "center", fontSize: 5.5, color: i === 0 ? "#fff" : i === 1 ? "#1980c2" : "#ccc", fontWeight: 600 }}>{s}</div>
                  {i < 3 && <div style={{ fontSize: 7, color: i < 1 ? "#1980c2" : "#ddd" }}>›</div>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {[["Task Completion","94%"],["SUS Score","88"],["Error Rate","1.2%"],["Time-on-task","2.4s"]].map(([l, v]) => (
              <div key={l} style={{ background: "#fff", borderRadius: 4, padding: "5px 7px", border: "1px solid #e8e8e8" }}>
                <div style={{ fontSize: 5.5, color: "#aaa" }}>{l}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#1980c2" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))" }} />
      <Chip label="UX & Interface" />
      <ReqBubble text="Design a seamless checkout flow — research-led, tested, and dev-ready." />
    </div>
  );
}

function C6S2() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#f0f4f8", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 30, background: "#fff", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center", padding: "0 12px" }}>
        <span style={{ fontSize: 8.5, fontWeight: 700, color: "#181817" }}>M<span style={{ color: "#1980c2" }}>A</span>D UX</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 6, color: "#1980c2", background: "rgba(25,128,194,.1)", padding: "2px 8px", borderRadius: 99 }}>Prototype ready</span>
      </div>
      <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 7, color: "#aaa", letterSpacing: ".15em", textTransform: "uppercase" }}>Checkout — Step 2 of 4</div>
        <div style={{ background: "#fff", borderRadius: 6, padding: 10, border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 6.5, color: "#181817", fontWeight: 600 }}>Delivery details</div>
          {["Full name","Street address","City & postcode"].map(f => (
            <div key={f} style={{ height: 18, background: "#f4f6f8", borderRadius: 3, border: "1px solid #e0e4e8", display: "flex", alignItems: "center", padding: "0 6px" }}>
              <span style={{ fontSize: 6, color: "#aaa" }}>{f}</span>
            </div>
          ))}
          <div style={{ height: 22, background: "#1980c2", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, color: "#fff", fontWeight: 700 }}>Continue →</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["94%","Completion"],["88","SUS"],["1.2%","Errors"]].map(([v, l]) => (
            <div key={l} style={{ flex: 1, background: "#fff", borderRadius: 4, padding: "5px 0", textAlign: "center", border: "1px solid #e8e8e8" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#1980c2" }}>{v}</div>
              <div style={{ fontSize: 5.5, color: "#aaa" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <Chip label="UX & Interface" />
    </div>
  );
}

function C6S3({ src }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img src={src || "/brand.png"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)" }} />
      <Chip label="UX & Interface" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 18, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="text-white/[38%]" style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>UX &amp; Interface</div>
          <div className="text-white/[88%]" style={{ fontSize: 20, lineHeight: 1 }}>MAD Studio.</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", marginBottom: 3 }} />
      </motion.div>
    </div>
  );
}

// ─── Stage sets & cards ───────────────────────────────────────────────────────

export const STAGE_SETS = {
  product:   [C1S1, C1S2, C1S3],
  marketing: [C2S1, C2S2, C2S3],
  brand:     [C3S1, C3S2, C3S3],
  strategy:  [C4S1, C4S2, C4S3],
  motion:    [C5S1, C5S2, C5S3],
  ux:        [C6S1, C6S2, C6S3],
};

const DEFAULT_CARDS = [
  { id: "product",   stageSet: "product",   title: "Product & Digital",  sub: "E-commerce storefronts, web apps, and digital products built to perform." },
  { id: "marketing", stageSet: "marketing", title: "Marketing & Comms",  sub: "Content calendars, campaigns, and social strategies built for reach." },
  { id: "brand",     stageSet: "brand",     title: "Brand & Identity",   sub: "Logos, palettes, and type hierarchies that hold across every surface." },
  { id: "strategy",  stageSet: "strategy",  title: "Strategy",           sub: "Positioning, audience mapping, and competitive frameworks." },
  { id: "motion",    stageSet: "motion",    title: "Motion & Film",      sub: "Animated identities, explainers, and launch films that move people." },
  { id: "ux",        stageSet: "ux",        title: "UX & Interface",     sub: "Research-led design — flows, wireframes, and UI systems ready for dev." },
];

function buildCards(content) {
  const cmsCards = content?.cards ?? DEFAULT_CARDS;
  const stageImgs = content?.stageImages ?? homeCms.servicesInMotion.stageImages ?? {};
  return cmsCards.map((card) => ({
    ...card,
    stages: STAGE_SETS[card.stageSet] ?? STAGE_SETS.product,
    stageImage: stageImgs[card.stageSet] ?? null,
  }));
}

export const CARDS = buildCards(homeCms.servicesInMotion);

// ─── Timing constants ─────────────────────────────────────────────────────────

const S1 = 2000, S2 = 2000, S3 = 90000;
const LOOP = S1 + S2 + S3;

// ─── Glare layer — own component so hooks are never conditional ───────────────

function GlareLayer({ mouseX, mouseY }) {
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const background = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16) 0%, transparent 62%)`
  );
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0, zIndex: 50,
        pointerEvents: "none", borderRadius: 18, background,
      }}
    />
  );
}

// ─── SvcCard with 3D spotlight ────────────────────────────────────────────────

export function SvcCard({ config, startDelay, isActive, index, activeIndex, cardW: propCardW }) {
  const [stage, setStage] = useState(0);
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 280, damping: 28 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const runCycle = useCallback(() => {
    const pf = fillRef.current;
    if (pf) { pf.style.transition = "none"; pf.style.width = "0%"; }
    setStage(0);
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const el = ts - t0;
      if (pf) pf.style.width = `${Math.min(100, (el / (S1 + S2)) * 100)}%`;
      if (el < S1) setStage(0);
      else if (el < S1 + S2) setStage(1);
      else setStage(2);
      if (el < LOOP) rafRef.current = requestAnimationFrame(tick);
      else timerRef.current = setTimeout(runCycle, 600);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const t = setTimeout(runCycle, startDelay);
    return () => { clearTimeout(t); clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [runCycle, startDelay]);

  const { stages, title, sub } = config;
  const [S1c, S2c, S3c] = stages;

  const dist = index - activeIndex;
  const absD = Math.abs(dist);
  const isLeft = dist < 0;

  const cardW = propCardW ?? 380;
  const cardH = Math.round(cardW * (13 / 9));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        width: cardW,
        perspective: 1000,
      }}
      animate={{
        scale: isActive ? 1 : Math.max(0.84, 1 - absD * 0.07),
        opacity: isActive ? 1 : Math.max(0.38, 1 - absD * 0.26),
        rotateY: isActive ? 0 : (isLeft ? 10 : -10),
        filter: isActive ? "none" : `blur(${Math.min(absD * 1.5, 5)}px)`,
      }}
      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: cardH,
          borderRadius: 18,
          overflow: "hidden",
          border: isActive ? "1px solid rgba(25,128,194,.3)" : "1px solid rgba(25,128,194,.12)",
          boxShadow: isActive
            ? "0 0 0 1px rgba(15,23,42,.1), 0 40px 90px rgba(15,23,42,.2), 0 8px 24px rgba(25,128,194,.12)"
            : "0 4px 16px rgba(0,0,0,.06)",
          transformStyle: "preserve-3d",
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
        }}
        transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Glare always mounted on active card — own component, no conditional hook */}
        {isActive && <GlareLayer mouseX={mouseX} mouseY={mouseY} />}

        <AnimatePresence>
          {stage === 0 && (
            <motion.div key="s1" style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
              <S1c />
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div key="s2" style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
              <S2c />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div key="s3" style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
              <S3c src={config.stageImage} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage dots */}
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 30 }}>
          {[0, 1, 2].map((i) => (
            <motion.div key={i} animate={{ width: i === stage ? 12 : 4, background: i === stage ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.22)" }} transition={{ duration: 0.2 }} style={{ height: 5, borderRadius: 2.5 }} />
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-black/[6%]" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2.5, zIndex: 30 }}>
          <div ref={fillRef} className="bg-azure-500/75" style={{ height: "100%", width: "0%" }} />
        </div>
      </motion.div>

      {/* Text below card */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 3 }}
        transition={{ duration: 0.3 }}
        style={{ paddingLeft: 2 }}
      >
        <div className="text-dark-900" style={{ fontSize: "clamp(15px,2.2vw,17px)", lineHeight: 1.2, marginBottom: 3, fontWeight: 700 }}>{title}</div>
        <div className="text-dark-900/[52%]" style={{ fontSize: "clamp(11px,1.5vw,13px)", lineHeight: 1.55 }}>{sub}</div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ServicesInMotion() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const content = cmsData.servicesInMotion;
  const LIVE_CARDS = buildCards(content);

  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const touchX = useRef(null);

  const max = LIVE_CARDS.length - 1;

  const getCardW = () => {
    if (typeof window === "undefined") return 380;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const overhead = 310;
    const maxH = Math.max(200, vh - overhead);
    const maxWFromH = Math.floor(maxH * 9 / 13);
    if (vw < 480) return Math.min(vw - 36, 260, maxWFromH);
    if (vw < 768) return Math.min(vw - 64, 310, maxWFromH);
    return Math.min(400, maxWFromH);
  };
  const [cardW, setCardW] = useState(getCardW);
  const GAP = 24;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const titleAccent = content?.titleAccent ?? "make.";
  const titleWords = (content?.title?.replace(titleAccent, "") ?? "What we ").trim().split(" ").filter(Boolean);

  useEffect(() => {
    const u = () => setCardW(getCardW());
    window.addEventListener("resize", u, { passive: true });
    return () => window.removeEventListener("resize", u);
  }, []);

  const autoTimerRef = useRef(null);
  const startLoop = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (!spotHovered.current) setActive((a) => (a >= max ? 0 : a + 1));
    }, 3800);
  }, [max]);

  useEffect(() => {
    startLoop();
    return () => clearInterval(autoTimerRef.current);
  }, [startLoop]);

  const prev = () => { setActive((a) => Math.max(0, a - 1)); startLoop(); };
  const next = () => { setActive((a) => Math.min(max, a + 1)); startLoop(); };

  // Autonomous spotlight
  const spotHovered = useRef(false);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(30);
  const spotTransX = useTransform(spotX, [0, 100], ["-300px", "300px"]);
  const spotTransY = useTransform(spotY, [0, 100], ["-200px", "200px"]);
  useEffect(() => {
    const pts = [[35,22],[65,42],[48,16],[72,36],[26,50],[55,20],[40,58],[68,28]];
    let idx = 0;
    let stopped = false;
    let retryTimer = null;
    const step = () => {
      if (stopped) return;
      if (spotHovered.current) { retryTimer = setTimeout(step, 120); return; }
      const [tx, ty] = pts[idx % pts.length];
      idx++;
      animate(spotX, tx, { duration: 3, ease: "easeInOut" });
      animate(spotY, ty, { duration: 3, ease: "easeInOut", onComplete: step });
    };
    step();
    return () => { stopped = true; clearTimeout(retryTimer); };
  }, []);

  // scroll no longer controls carousel

  // scroll no longer drives the carousel — auto-loop handles advancement

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 36) { dx > 0 ? next() : prev(); startLoop(); }
    touchX.current = null;
  };

  // Centre active card; clamp edges so no empty track visible at start/end
  const containerW = typeof window !== "undefined" ? window.innerWidth : 1200;
  const centreX = containerW / 2 - cardW / 2;
  const PAD = 40;
  const rawOffset = centreX - active * (cardW + GAP);
  const maxOffset = PAD;
  const minOffset = containerW - PAD - cardW - max * (cardW + GAP);
  const offsetX = Math.min(maxOffset, Math.max(minOffset, rawOffset));

  return (
    <section
      ref={sectionRef}
      style={{ background: "transparent", paddingBottom: 48, position: "relative" }}
      onMouseEnter={() => { spotHovered.current = true; }}
      onMouseLeave={() => { spotHovered.current = false; }}
    >
      {isEditMode && (
        <button onClick={() => openPanel("servicesInMotion")} style={{ position: "absolute", top: 12, right: 12, zIndex: 100, background: "#0b457b", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 9, fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }}>
          ✏ Edit
        </button>
      )}
      {/* Edge blends */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, rgba(224,238,248,0.55), transparent)", pointerEvents: "none", zIndex: 10 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, rgba(212,232,244,0.45), transparent)", pointerEvents: "none", zIndex: 10 }} />
      <style>{`
        .sh { animation: shimmer 2.2s ease-in-out infinite; }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes colorSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:none} }
        @keyframes growBar { from{width:0} }
      `}</style>

      {/* Header */}
      <div style={{ padding: "64px 32px 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <motion.p
            style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, color: "rgba(160,168,180,.75)" }}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {content?.eyebrow ?? "Services"}
          </motion.p>
          <h2
            className="text-dark-900"
            style={{ fontSize: "clamp(26px,3.8vw,44px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.04em", perspective: "600px" }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 38, rotateX: 50 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", marginRight: "0.22em", transformOrigin: "bottom center" }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="text-azure-500"
              initial={{ opacity: 0, y: 38, rotateX: 50 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + titleWords.length * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", transformOrigin: "bottom center" }}
            >
              {titleAccent}
            </motion.span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ d: "M14 6L8 12l6 6", fn: prev }, { d: "M10 6l6 6-6 6", fn: next }].map(({ d, fn }, i) => (
            <motion.button
              key={i} onClick={fn}
              className="bg-transparent flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(24,24,23,.14)", cursor: "pointer" }}
              initial={{ opacity: 0, scale: 0.2, rotate: i === 0 ? 45 : -45 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.55 + i * 0.1 }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(15,23,42,.45)" strokeWidth="2" strokeLinecap="round">
                <path d={d} />
              </svg>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Spotlight + cards */}
      <div style={{ position: "relative" }}>
        <motion.div
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: 700, height: 500, pointerEvents: "none", zIndex: 0,
            translateX: "-50%", translateY: "-50%",
            x: spotTransX, y: spotTransY,
            background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(25,128,194,.11) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {/* Card strip — entrance wrapper + wheel handler */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={trackRef}
            style={{ overflow: "hidden", position: "relative", zIndex: 1, paddingTop: 12, paddingBottom: 40 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: GAP,
                willChange: "transform",
                perspective: 1400,
                perspectiveOrigin: "50% 35%",
              }}
              animate={{ x: offsetX }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              {LIVE_CARDS.map((c, i) => (
                <SvcCard
                  key={c.id}
                  config={c}
                  index={i}
                  activeIndex={active}
                  isActive={i === active}
                  startDelay={i * 600}
                  cardW={cardW}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <motion.div
        style={{ display: "flex", justifyContent: "center", gap: 8, paddingTop: 4 }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {LIVE_CARDS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setActive(i); startLoop(); }}
            animate={{ width: i === active ? 16 : 5, background: i === active ? "rgba(15,23,42,.52)" : "rgba(15,23,42,.16)" }}
            transition={{ duration: 0.2 }}
            style={{ height: 5, borderRadius: 2.5, border: "none", padding: 0, cursor: "pointer" }}
          />
        ))}
      </motion.div>
    </section>
  );
}
