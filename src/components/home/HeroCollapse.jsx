import { useTheme } from "../../context/ThemeContext";

// ─── THUMB DATA ───────────────────────────────────────────────────────────────
const THUMB_IMGS = [
  "/flier/image.png",
  "/flier/image2.png",
  "/flier/image3.png",
  "/flier/image4.png",
  "/flier/image5.png",
  "/flier/image6.png",
  "/flier/image7.png",
];

const THUMB_W = 280;
const THUMB_H = 200;

// ── Elementor-style horizontal band: wide x-spread, shallow y-alternation ──
const THUMB_FINAL = [
  { x: -58, y:  +6, r: -1.2 }, // far-left, slightly low
  { x: -38, y: -14, r:  1.0 }, // left, elevated
  { x: -18, y:  +9, r: -0.6 }, // left-center, dipped
  { x:  +2, y: -10, r:  0.8 }, // center, raised
  { x: +22, y:  +7, r: -1.4 }, // right-center, dipped
  { x: +42, y: -13, r:  1.1 }, // right, elevated
  { x: +62, y:  +5, r: -0.9 }, // far-right, neutral
];

// ─── HERO COLLAPSE ────────────────────────────────────────────────────────────
export default function HeroCollapse({ collapseT }) {
  const { dark } = useTheme();

  return (
    <>
      {/* ── Soft gradient backdrop ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          opacity: collapseT,
          background: dark
            ? "radial-gradient(ellipse 120% 80% at 50% 60%, rgba(25,128,194,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse 120% 80% at 50% 60%, rgba(235,220,255,0.55) 0%, rgba(255,235,250,0.35) 40%, transparent 75%)",
        }}
      />

      {/* ── Floating website-preview cards ──────────────────────────────── */}
      {THUMB_IMGS.map((src, i) => {
        const tf = THUMB_FINAL[i];

        // Cards fly in from a wider scatter
        const startX = tf.x * 2.8;
        const startY = tf.y * 2.8;
        const cx = startX + (tf.x - startX) * collapseT;
        const cy = startY + (tf.y - startY) * collapseT;
        const sc = 0.08 + collapseT * 0.92;

        // Staggered fade: each card appears slightly after the previous
        const fadeDelay = i * 0.025;
        const opacity = Math.max(0, Math.min(1, (collapseT - fadeDelay) * 2.2));

        return (
          <div
            key={i}
            className="pointer-events-none absolute z-[15] overflow-hidden"
            style={{
              width:  THUMB_W,
              height: THUMB_H,
              left:   `calc(50% + ${cx}%)`,
              top:    `calc(50% + ${cy}%)`,
              transform: `translate(-50%, -50%) rotate(${tf.r}deg) scale(${sc})`,
              opacity,
              // ── Clean card — no browser chrome ──────────────────────────
              borderRadius: 16,
              background: dark ? "#1a1a1e" : "#ffffff",
              border: `1px solid ${dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.06)"}`,
              boxShadow: dark
                ? `0 ${10 * collapseT}px ${40 * collapseT}px rgba(0,0,0,.45),
                   0  ${2 * collapseT}px  ${8 * collapseT}px rgba(0,0,0,.25)`
                : `0 ${8 * collapseT}px ${36 * collapseT}px rgba(0,0,0,.12),
                   0 ${2 * collapseT}px  ${8 * collapseT}px rgba(0,0,0,.06)`,
            }}
          >
            {/* Screenshot fills the full card */}
            <img
              src={src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 16,
              }}
            />
          </div>
        );
      })}

      {/* ── CTA overlay ──────────────────────────────────────────────────── */}
      <div
        className="absolute z-30 text-center"
        style={{
          top:  "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${(1 - collapseT) * 20}px)`,
          pointerEvents: collapseT > 0.82 ? "all" : "none",
          opacity: Math.max(0, collapseT * 3 - 2),
          width: "min(560px, 80vw)",
        }}
      >
        <p
          className="font-bold tracking-[.25em] uppercase mb-3"
          style={{ fontSize: 9, color: dark ? "rgba(255,255,255,.4)" : "#aaa" }}
        >
          Making A Difference
        </p>
        <h2
          className="mb-6"
          style={{
            fontSize: "clamp(28px,4.4vw,56px)",
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            color: dark ? "#f0ede8" : "#181817",
          }}
        >
          Ready to build
          <br />
          something real?
        </h2>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase text-white border-none cursor-pointer"
            style={{ background: "#1980c2", boxShadow: "0 4px 24px #1980c250" }}
          >
            Start a Project →
          </button>
          <button
            className="px-6 py-3 rounded-full text-[9px] font-bold tracking-widest uppercase cursor-pointer border"
            style={{
              background:  dark ? "rgba(255,255,255,.08)" : "rgba(24,24,23,.06)",
              color:       dark ? "#f0ede8"               : "#181817",
              borderColor: dark ? "rgba(255,255,255,.15)" : "rgba(24,24,23,.12)",
            }}
          >
            View Our Work
          </button>
        </div>
      </div>
    </>
  );
}