import { useRef, useEffect } from "react";
import { homeCms } from "@/data/homeCms";

const content = homeCms.beyond;

const SERVICES = [
  "Brand Strategy",
  "Motion Design",
  "Web & App",
  "Creative Direction",
  "UI / UX",
  "3D & Render",
  "Campaigns",
  "Copywriting",
];

const CSS = `
  @keyframes ticker-slide {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes spotlight-drift {
    0%,100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    50%     { opacity: 1; transform: translate(-47%,-53%) scale(1.1); }
  }
  @keyframes spotlight-soft {
    0%,100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    50%     { opacity: 1; transform: translate(-53%,-47%) scale(1.07); }
  }
  @keyframes blink-dot {
    0%,100% { opacity: 1; } 50% { opacity: .2; }
  }
  @keyframes badge-float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-5px); }
  }
  @keyframes shimmer-line {
    0%,100% { width: 32px; opacity: .4; }
    50%     { width: 56px; opacity: .7; }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function Beyond() {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (document.getElementById("beyond-css")) return;
    const s = document.createElement("style");
    s.id = "beyond-css";
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  const tickerItems = [...SERVICES, ...SERVICES];

  return (
    <section ref={wrapRef} style={{ position: "relative", height: "160dvh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          zIndex: 4,
          background: "linear-gradient(135deg, #dff0fb 0%, #e8f5fb 35%, #fff4ef 68%, #fdeadb 100%)",
          padding: "36px 36px 0",
        }}
      >

        {/* ── MAD spotlight – primary ── */}
        <div style={{
          position: "absolute",
          top: "52%", left: "60%",
          width: "68vw", height: "68vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25,128,194,.12) 0%, rgba(25,128,194,.03) 50%, transparent 72%)",
          transform: "translate(-50%,-50%)",
          animation: "spotlight-drift 11s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── MAD spotlight – secondary ── */}
        <div style={{
          position: "absolute",
          top: "35%", left: "75%",
          width: "38vw", height: "38vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(69,179,245,.09) 0%, transparent 65%)",
          transform: "translate(-50%,-50%)",
          animation: "spotlight-soft 15s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Ghost MAD watermark ── */}
        <div style={{
          position: "absolute", bottom: -24, right: -12,
          fontSize: "28vw", fontWeight: 900, lineHeight: 1,
          color: "rgba(25,128,194,.045)", userSelect: "none", pointerEvents: "none",
          letterSpacing: -4, zIndex: 0,
        }}>
          MAD
        </div>

        {/* ── Floating status badge ── */}
        <div style={{
          position: "absolute", top: 40, right: 40,
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,.5)",
          border: "1px solid rgba(25,128,194,.14)",
          backdropFilter: "blur(10px)",
          borderRadius: 999,
          padding: "7px 16px",
          animation: "badge-float 6s ease-in-out infinite",
          zIndex: 2,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(25,128,194,.5)",
            animation: "blink-dot 2.2s ease-in-out infinite",
          }} />
          <span
            className="font-mono font-bold uppercase"
            style={{ fontSize: 9, letterSpacing: "0.28em", color: "rgba(25,128,194,.65)" }}
          >
            Open for work
          </span>
        </div>

        {/* ── Content ── */}
        <div
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 820, margin: "0 auto", paddingTop: "8vh",
            animation: "fade-up .8s ease both",
          }}
        >

          {/* Eyebrow */}
          <p
            className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color: "rgba(25,128,194,.6)" }}
          >
            {content.eyebrow}
          </p>

          {/* Headline */}
          <h2
            className="font-black text-3xl md:text-[62px] text-dark-900 mb-5"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.04, whiteSpace: "pre-line", maxWidth: 720 }}
          >
            {content.title}
          </h2>

          {/* Animated accent rule */}
          <div style={{
            height: 2, borderRadius: 2, marginBottom: 22,
            background: "rgba(25,128,194,.22)",
            animation: "shimmer-line 3.8s ease-in-out infinite",
          }} />

          {/* Body */}
          <p
            className="text-dark-900/50 text-sm md:text-base leading-[1.75] mb-10"
            style={{ maxWidth: 480 }}
          >
            {content.body}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <button
              className="text-white font-bold text-[10px] md:text-xs tracking-[0.14em] uppercase px-7 py-3 rounded-full border-none cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(25,128,194,.8), rgba(69,179,245,.75))",
                boxShadow: "0 4px 20px rgba(25,128,194,.18)",
              }}
            >
              {content.primaryCta}
            </button>
            <button
              className="text-dark-900 font-semibold text-[10px] md:text-xs tracking-[0.14em] uppercase px-7 py-3 rounded-full cursor-pointer"
              style={{ background: "rgba(15,23,42,.06)", border: "1px solid rgba(15,23,42,.12)" }}
            >
              {content.secondaryCta}
            </button>
          </div>
        </div>

        {/* ── Services ticker ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          borderTop: "1px solid rgba(25,128,194,.1)",
          background: "rgba(223,240,251,.5)",
          backdropFilter: "blur(10px)",
          padding: "12px 0",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "ticker-slide 30s linear infinite",
            willChange: "transform",
          }}>
            {tickerItems.map((label, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 20,
                  paddingRight: 44,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="font-mono font-bold uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    color: i % 3 === 0
                      ? "rgba(25,128,194,.65)"
                      : i % 3 === 1
                      ? "rgba(25,128,194,.38)"
                      : "rgba(15,23,42,.22)",
                  }}
                >
                  {label}
                </span>
                <span style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(25,128,194,.2)",
                  flexShrink: 0,
                }} />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}