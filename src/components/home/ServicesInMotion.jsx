import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";




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
      <span
        className="text-white/30"
        style={{
          fontFamily: "monospace",
          fontSize: 8.5,
        }}
      >
        you · just now
      </span>
    </div>
  );
}

function GenericStage1({ card }) {
  const src = card.wide;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {src && (
        <img
          src={src}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top,rgba(0,0,0,.65),rgba(0,0,0,.1) 55%,transparent)",
        }}
      />
      <ReqBubble text={card.request || "Let's build something great."} />
    </div>
  );
}

function GenericStage2({ card }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#1e1e2e",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
    >
      <style>{`
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
      `}</style>
      <div
        style={{
          height: 28,
          background: "#252535",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span
          style={{
            fontSize: 6.5,
            color: "#1980c2",
            background: "rgba(25,128,194,.18)",
            padding: "2px 6px",
            borderRadius: 3,
            marginLeft: "auto",
          }}
        >
          {card.title} · Building
        </span>
      </div>
      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
        {[
          { w: "60%", h: 12, delay: "0.05s" },
          { w: "92%", h: 60, delay: "0.22s" },
          { w: "40%", h: 12, delay: "0.4s" },
          { w: "75%", h: 12, delay: "0.55s" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              width: b.w,
              height: b.h,
              borderRadius: 5,
              background: i === 1 ? "linear-gradient(135deg,#0f1a2c,#1a3050)" : "rgba(255,255,255,.08)",
              border: i === 1 ? "1px solid rgba(25,128,194,.3)" : "none",
              animation: "slideDown 0.45s ease both",
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>
      <div
        style={{
          height: 26,
          background: "#252535",
          borderTop: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8" }} />
        <span style={{ fontSize: 6.5, color: "rgba(255,255,255,.4)" }}>Assembling components…</span>
      </div>
    </div>
  );
}

function GenericStage3({ card }) {
  const src = card.top;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08) 55%,transparent)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 18,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#38bdf8",
            marginBottom: 3,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── Stage 2 "in progress" demos ─────────────────────────────────────────────
// A neutral GenericStage2 (above) is the fallback for any card. These are
// bespoke, on-brand demos for the current line-up of services — keyed off
// card.story so a new card with no matching story still renders fine.

function StoryFrame({ chip, children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#1e1e2e",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          height: 28,
          background: "#252535",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span
          style={{
            fontSize: 6.5,
            color: "#1980c2",
            background: "rgba(25,128,194,.18)",
            padding: "2px 6px",
            borderRadius: 3,
            marginLeft: "auto",
          }}
        >
          {chip}
        </span>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function WebsiteBuildStage({ card }) {
  return (
    <StoryFrame chip={`${card.title} · Draft`}>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 20, borderRadius: 4, background: "#fff", display: "flex", alignItems: "center", padding: "0 8px", gap: 6, animation: "slideDown .4s ease both" }}>
          <span style={{ fontSize: 7, fontWeight: 900, color: "#181817" }}>MAD</span>
          <div style={{ flex: 1, display: "flex", gap: 6, justifyContent: "center" }}>
            {["Home", "Work", "About"].map((t) => <span key={t} style={{ fontSize: 5.5, color: "#aaa" }}>{t}</span>)}
          </div>
        </div>
        <div style={{ height: 68, borderRadius: 5, background: "linear-gradient(135deg,#0f1a2c,#1a3050)", display: "flex", alignItems: "center", padding: "0 10px", animation: "slideDown .45s ease both", animationDelay: ".2s" }}>
          <div>
            <div style={{ fontSize: 9, color: "#fff", marginBottom: 3 }}>Built for launch.</div>
            <div style={{ fontSize: 5.5, background: "#1980c2", color: "#fff", display: "inline-block", padding: "2px 6px", borderRadius: 2 }}>Get started →</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, animation: "slideDown .45s ease both", animationDelay: ".4s" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 34, borderRadius: 4, background: "#252535", border: "1px solid rgba(255,255,255,.07)" }} />
          ))}
        </div>
      </div>
    </StoryFrame>
  );
}

function AppBuildStage({ card }) {
  return (
    <StoryFrame chip={`${card.title} · Preview`}>
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", height: "100%" }}>
        <div style={{ width: 96, height: "100%", borderRadius: 12, border: "2px solid rgba(255,255,255,.15)", background: "#12121e", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 14, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 2 }}>
            <div style={{ width: 28, height: 4, borderRadius: 2, background: "rgba(255,255,255,.2)" }} />
          </div>
          <div style={{ flex: 1, padding: "6px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
            {["92%", "70%", "84%"].map((w, i) => (
              <div key={i} style={{ height: i === 0 ? 30 : 12, width: w, borderRadius: 4, background: i === 0 ? "linear-gradient(135deg,#1980c2,#0f4f7a)" : "rgba(255,255,255,.08)", animation: "slideDown .4s ease both", animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <div style={{ height: 22, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i === 0 ? "#1980c2" : "rgba(255,255,255,.18)" }} />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>
    </StoryFrame>
  );
}

function SocialBuildStage({ card }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <StoryFrame chip={`${card.title} · Calendar`}>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 6, color: "rgba(255,255,255,.4)", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>This week</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
          {days.map((d, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>{d}</div>
              <div
                style={{
                  height: [30, 44, 24, 50, 34, 18, 18][i],
                  borderRadius: 4,
                  background: [1, 3, 4].includes(i) ? "linear-gradient(135deg,#db2777,#fb923c)" : "rgba(255,255,255,.08)",
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {[["Reach", "12.4K"], ["Engagement", "6.8%"]].map(([l, v]) => (
            <div key={l} style={{ flex: 1, background: "#252535", borderRadius: 5, padding: 6 }}>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.35)" }}>{l}</div>
              <div style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </StoryFrame>
  );
}

function PrintBuildStage({ card }) {
  const swatches = [
    ["#1980c2", "Azure"],
    ["#181817", "Onyx"],
    ["#ffffff", "White"],
    ["#fb923c", "Ember"],
  ];
  return (
    <StoryFrame chip={`${card.title} · Palette`}>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", borderRadius: 5, overflow: "hidden", height: 46, marginBottom: 8 }}>
          {swatches.map(([bg, l]) => (
            <div key={l} style={{ background: bg, flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, fontSize: 5, fontWeight: 700, color: bg === "#ffffff" ? "#aaa" : "rgba(255,255,255,.7)" }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ height: 54, borderRadius: 5, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#181817" }}>MAD</div>
          <div style={{ height: 54, borderRadius: 5, background: "#181817", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff" }}>MAD</div>
        </div>
      </div>
    </StoryFrame>
  );
}

function BizDevBuildStage({ card }) {
  const cols = [
    { label: "Leads", n: 8, color: "rgba(255,255,255,.15)" },
    { label: "Proposal", n: 4, color: "rgba(25,128,194,.35)" },
    { label: "Won", n: 3, color: "#1980c2" },
  ];
  return (
    <StoryFrame chip={`${card.title} · Pipeline`}>
      <div style={{ padding: 10, display: "flex", gap: 6, height: "100%" }}>
        {cols.map((c) => (
          <div key={c.label} style={{ flex: 1, background: "#252535", borderRadius: 5, padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)" }}>{c.label} · {c.n}</div>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} style={{ height: 16, borderRadius: 3, background: c.color }} />
            ))}
          </div>
        ))}
      </div>
    </StoryFrame>
  );
}

function PrBuildStage({ card }) {
  return (
    <StoryFrame chip={`${card.title} · Coverage`}>
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ borderRadius: 5, background: "#fff", padding: 8 }}>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>Featured in</div>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#181817", fontFamily: "serif" }}>The Business Journal</div>
          <div style={{ fontSize: 6, color: "#666", marginTop: 3 }}>“{card.title} done right — a case study.”</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Reach", "Mentions", "Sentiment"].map((l, i) => (
            <div key={l} style={{ flex: 1, background: "#252535", borderRadius: 5, padding: 6, textAlign: "center" }}>
              <div style={{ fontSize: 8, color: "#1980c2", fontWeight: 700 }}>{["240K", "18", "92%"][i]}</div>
              <div style={{ fontSize: 5, color: "rgba(255,255,255,.35)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </StoryFrame>
  );
}

const STORY_STAGES = {
  website: WebsiteBuildStage,
  app: AppBuildStage,
  social: SocialBuildStage,
  print: PrintBuildStage,
  bizdev: BizDevBuildStage,
  pr: PrBuildStage,
};

const S1 = 2000,
  S2 = 2000,
  S3 = 3000;
const LOOP = S1 + S2 + S3;

export function SvcCard({ config, startDelay, isActive }) {
  const Stage2 = STORY_STAGES[config.story] ?? GenericStage2;
  const [stage, setStage] = useState(0);
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const runCycle = useCallback(() => {
    const pf = fillRef.current;
    if (pf) {
      pf.style.transition = "none";
      pf.style.width = "0%";
    }
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
    return () => {
      clearTimeout(t);
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [runCycle, startDelay]);

  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "min(560px,calc(100vw - 24px))",
      }}
    >
      <div
        className="bg-azure-500/[7%]"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 0,
          height: 460,
          borderRadius: 18,
          zIndex: 0,
        }}
      />
      <div
        className="bg-azure-500/10"
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          right: -5,
          height: 460,
          border: "1px solid rgba(25,128,194,.18)",
          borderRadius: 18,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 460,
          borderRadius: 18,
          overflow: "hidden",
          zIndex: 2,
          border: "1px solid rgba(25,128,194,.25)",
          boxShadow: isActive
            ? "0 0 0 1.5px rgba(15,23,42,.18), 0 32px 80px rgba(15,23,42,.22), 0 8px 24px rgba(25,128,194,.10)"
            : "0 4px 16px rgba(0,0,0,.06)",
          transition: "box-shadow .5s",
        }}
      >
        <AnimatePresence>
          {stage === 0 && (
            <motion.div
              key="s1"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.45 }}
            >
              <GenericStage1 card={config} />
            </motion.div>
          )}
          {stage === 1 && (
            <motion.div
              key="s2"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Stage2 card={config} />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="s3"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <GenericStage3 card={config} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Stage dots */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 5,
            zIndex: 30,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                width: i === stage ? 12 : 4,
                background:
                  i === stage
                    ? "rgba(255,255,255,.85)"
                    : "rgba(255,255,255,.22)",
              }}
              transition={{ duration: 0.2 }}
              style={{ height: 5, borderRadius: 2.5 }}
            />
          ))}
        </div>
        {/* Progress bar */}
        <div
          className="bg-black/[6%]"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2.5,
            zIndex: 30,
          }}
        >
          <div
            ref={fillRef}
            className="bg-azure-500/75"
            style={{
              height: "100%",
              width: "0%",
            }}
          />
        </div>
      </div>

      {/* Card label */}
      <div style={{ padding: "14px 4px 0" }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", letterSpacing: -0.3, margin: "0 0 4px" }}>
          {config.title}
        </p>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
          {config.sub}
        </p>
      </div>
    </div>
  );
}

export default function ServicesInMotion() {
  const { cmsData } = useCms();
  const content = cmsData.servicesInMotion;
  const CARDS = content.cards ?? [];
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0); // mirror for use inside event listeners
  const G = 16;
  const [cardW, setCardW] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < 640 ? Math.max(280, window.innerWidth - 24) : 560
      : 560
  );
  const STEP = cardW + G;
  const max = CARDS.length - 1;

  // Keep activeRef in sync so wheel/touch handlers always see current value
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Keep cardW in sync with viewport
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setCardW(mobile ? Math.max(280, window.innerWidth - 24) : 560);
    };
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ─── Scroll jail ────────────────────────────────────────────────────────────
  // Attach a non-passive wheel listener to window so we can call preventDefault.
  // When the section is in the sticky viewport AND there are still cards to show,
  // we intercept the scroll and advance/retreat the card index instead.
  // Once the user has scrolled past the last card, we let the page scroll freely.
  useEffect(() => {
    let wheelAcc = 0;
    let cooldown = false;

    const onWheel = (e) => {
      const section = wrapRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Section is "active" when its sticky child is filling the viewport
      const sectionActive = rect.top <= 4 && rect.bottom >= window.innerHeight - 4;
      if (!sectionActive) return;

      const cur = activeRef.current;

      if (e.deltaY > 0) {
        // Scrolling down — jail until 2nd-to-last card; release on last two
        if (cur < max - 1) {
          e.preventDefault();
          if (cooldown) return;
          wheelAcc += e.deltaY;
          if (wheelAcc > 65) {
            setActive((a) => Math.min(max, a + 1));
            wheelAcc = 0;
            cooldown = true;
            setTimeout(() => { cooldown = false; }, 480);
          }
        }
        // cur >= max - 1 → fall through, browser scrolls page naturally
      } else {
        // Scrolling up — jail if not yet on first card
        if (cur > 0) {
          e.preventDefault();
          if (cooldown) return;
          wheelAcc += e.deltaY; // deltaY is negative here
          if (wheelAcc < -65) {
            setActive((a) => Math.max(0, a - 1));
            wheelAcc = 0;
            cooldown = true;
            setTimeout(() => { cooldown = false; }, 480);
          }
        }
        // cur === 0 → fall through, browser scrolls page naturally
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [max]);

  // ─── Touch jail ─────────────────────────────────────────────────────────────
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical swipe — only advance if not already on last two cards
      if (dy > 40 && activeRef.current < max - 1) setActive((a) => Math.min(max, a + 1));
      else if (dy < -40) setActive((a) => Math.max(0, a - 1));
    } else {
      // Horizontal swipe — existing card navigation
      if (Math.abs(dx) > 40)
        setActive((a) => (dx > 0 ? Math.min(max, a + 1) : Math.max(0, a - 1)));
    }
  };

  return (
    <section
      id="services"
      ref={wrapRef}
      style={{
        position: "relative",
        // Height = 100vh (the sticky panel) + enough scroll runway so the
        // browser has room to "park" us here while the jail runs.
        // We want the section to stay sticky for the full jail duration, so
        // we give it a generous extra height that the user never actually
        // scrolls through (the jail swallows those scroll events).
        // Using 100vh + a fixed buffer keeps it simple and reliable.
        // Each card needs ~300px of scroll runway so the jail can swallow those
        // wheel events while the sticky panel fully covers the viewport.
        // Without this, Beyond bleeds through the moment the section sticks.
        height: `calc(100vh + ${(max + 1) * 180}px)`,
        background: "linear-gradient(160deg, #daf0ff 0%, #c6e6ff 55%, #b8ddf8 100%)",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          zIndex: 3,
          boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="section-sticky-title"
          style={{
            padding: "96px 32px 8px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "linear-gradient(to bottom, rgba(218,240,255,0.97) 0%, rgba(198,230,255,0.88) 100%)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {/* Mouse scroll indicator */}
              <div style={{ position: "relative", width: 18, height: 28, flexShrink: 0 }}>
                <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="16" height="26" rx="8" stroke="rgba(160,168,180,.6)" strokeWidth="1.5"/>
                  <motion.rect
                    x="7.5" y="5" width="3" height="5" rx="1.5"
                    fill="rgba(25,128,194,.7)"
                    animate={{ y: [5, 12, 5], opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "rgba(160,168,180,.75)",
                  margin: 0,
                }}
              >
                {content.eyebrow}
              </p>
            </div>
            <h2
              className="text-dark-900"
              style={{
                fontSize: "clamp(26px,3.8vw,44px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-.04em",
              }}
            >
              {content.title.replace(content.titleAccent, "")}
              <span className="text-azure-500">{content.titleAccent}</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <style>{`
              @keyframes beamPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(25,128,194,0), 0 0 12px 2px rgba(25,128,194,0.18); }
                50% { box-shadow: 0 0 0 5px rgba(25,128,194,0.08), 0 0 22px 6px rgba(25,128,194,0.38); }
              }
              @keyframes beamRing {
                0% { transform: scale(1); opacity: 0.7; }
                100% { transform: scale(2.1); opacity: 0; }
              }
              .beam-btn {
                position: relative;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                border: 1.5px solid rgba(25,128,194,.55);
                background: rgba(25,128,194,.10);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                animation: beamPulse 2.2s ease-in-out infinite;
                transition: background .18s, border-color .18s, transform .15s;
                flex-shrink: 0;
              }
              .beam-btn:hover {
                background: rgba(25,128,194,.22);
                border-color: rgba(25,128,194,.9);
                transform: scale(1.08);
                animation: none;
                box-shadow: 0 0 24px 6px rgba(25,128,194,.45);
              }
              .beam-btn:active { transform: scale(0.94); }
              .beam-btn .ring {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                border: 1.5px solid rgba(25,128,194,.55);
                animation: beamRing 2.2s ease-out infinite;
                pointer-events: none;
              }
              .beam-btn:nth-child(2) { animation-delay: 1.1s; }
              .beam-btn:nth-child(2) .ring { animation-delay: 1.1s; }
            `}</style>
            {[
              {
                d: "M14 6L8 12l6 6",
                fn: () => setActive((a) => Math.max(0, a - 1)),
                disabled: false,
              },
              {
                d: "M10 6l6 6-6 6",
                fn: () => setActive((a) => Math.min(max, a + 1)),
                disabled: false,
              },
            ].map(({ d, fn }, i) => (
              <button
                key={i}
                onClick={fn}
                className="beam-btn"
              >
                <span className="ring" />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(25,128,194,.9)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Card strip */}
        <div
          className="pl-4 sm:pl-8"
          style={{ flex: 1, overflow: "hidden" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "flex-start",
              paddingTop: 24,
              gap: G,
            }}
            animate={{ x: -active * STEP }}
            transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
          >
            {CARDS.map((c, i) => (
              <SvcCard
                key={c.id}
                config={c}
                isActive={i === active}
                startDelay={i * 4000}
              />
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "10px 0 18px",
            flexShrink: 0,
          }}
        >
          {CARDS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 16 : 5,
                background:
                  i === active ? "rgba(15,23,42,.52)" : "rgba(15,23,42,.16)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                height: 5,
                borderRadius: 2.5,
                border: "none",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, rgba(242,101,34,.12))",
        }}
      />
    </section>
  );
}