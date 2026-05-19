import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeCms } from "@/data/homeCms";

const content = homeCms.servicesInMotion;

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
        background:
          "linear-gradient(to bottom,rgba(244,244,242,.95),transparent)",
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
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            display: "inline-block",
          }}
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
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)",
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
          <div
            key={c}
            style={{ width: 7, height: 7, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 12,
            borderRadius: 3,
            background: "#d8d8d6",
            margin: "0 6px",
          }}
        />
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

function C1S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Browser>
        <div style={{ padding: 6 }}>
          <Shimmer
            style={{ height: 100, borderRadius: 5, position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <div
                className="bg-azure-500/70"
                style={{
                  height: 10,
                  width: "55%",
                  borderRadius: 2,
                  marginBottom: 6,
                }}
              />
              <div
                className="bg-azure-500/40"
                style={{
                  height: 7,
                  width: "35%",
                  borderRadius: 2,
                  marginBottom: 10,
                }}
              />
              <div
                className="bg-azure-500/80"
                style={{
                  height: 20,
                  width: 56,
                  borderRadius: 3,
                }}
              />
            </div>
          </Shimmer>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 5,
            padding: "0 6px",
          }}
        >
          {[0, 0.35, 0.7].map((d, i) => (
            <div
              key={i}
              className="bg-white"
              style={{
                borderRadius: 5,
                overflow: "hidden",
                border: "1px solid rgba(240,240,240,.6)",
              }}
            >
              <Shimmer delay={d} style={{ height: 40 }} />
              <div style={{ padding: 5 }}>
                <div
                  style={{
                    height: 5,
                    width: "80%",
                    borderRadius: 2,
                    background: "#f0f0f0",
                    marginBottom: 4,
                  }}
                />
                <div
                  className="bg-azure-500/50"
                  style={{
                    height: 5,
                    width: "40%",
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Browser>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Product & Digital" />
      <ReqBubble text="Build a clean e-commerce storefront with hero carousel and product grid." />
    </div>
  );
}

function C1S2() {
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
        @keyframes popInRight{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
      `}</style>
      {/* Figma-like toolbar */}
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
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 10 }}>
          {["✦ Move","⬜ Frame","✏ Pen","T Text"].map((t) => (
            <span key={t} style={{ fontSize: 6, color: "rgba(255,255,255,.35)" }}>{t}</span>
          ))}
        </div>
        <span style={{ fontSize: 6, color: "#1980c2", background: "rgba(25,128,194,.18)", padding: "2px 6px", borderRadius: 3 }}>
          STRKT · Draft
        </span>
      </div>

      {/* Canvas area + component panel */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Canvas */}
        <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
          {/* Nav bar section */}
          <div
            style={{
              animation: "slideDown 0.45s ease both",
              animationDelay: "0.05s",
              background: "#252535",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,.1)",
              height: 22,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.7)", fontWeight: 700 }}>STRKT</span>
            <div style={{ display: "flex", gap: 8 }}>
              {["Shop","Drops","About"].map((n) => (
                <span key={n} style={{ fontSize: 5.5, color: "rgba(255,255,255,.3)" }}>{n}</span>
              ))}
            </div>
          </div>

          {/* Hero section */}
          <div
            style={{
              animation: "slideDown 0.45s ease both",
              animationDelay: "0.22s",
              background: "linear-gradient(135deg,#0f1a2c,#1a3050)",
              borderRadius: 4,
              border: "1px solid rgba(25,128,194,.25)",
              height: 72,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              gap: 8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: "#fff", lineHeight: 1.3, marginBottom: 3 }}>Wear what<br/>you mean.</div>
              <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)", marginBottom: 5 }}>Limited drops, weekly.</div>
              <div style={{ fontSize: 5.5, background: "#1980c2", color: "#fff", display: "inline-block", padding: "2px 6px", borderRadius: 2 }}>Shop now →</div>
            </div>
            <div style={{ width: 36, height: 50, borderRadius: 3, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", flexShrink: 0 }} />
            {/* selection ring */}
            <div style={{ position: "absolute", inset: -1, borderRadius: 4, border: "1.5px solid #1980c2", pointerEvents: "none" }} />
          </div>

          {/* Product grid section */}
          <div
            style={{
              animation: "slideDown 0.45s ease both",
              animationDelay: "0.42s",
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 5,
            }}
          >
            {[
              ["Cargo Tee","$48","#0f2a4a","#1a3a5c"],
              ["Wide Hoodie","$90","#1a2030","#253040"],
              ["Track Pant","$72","#0a1520","#152030"],
            ].map(([nm, pr, f, t]) => (
              <div
                key={nm}
                style={{
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#252535",
                  border: "1px solid rgba(255,255,255,.07)",
                }}
              >
                <div style={{ height: 30, background: `linear-gradient(135deg,${f},${t})` }} />
                <div style={{ padding: 4 }}>
                  <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)" }}>{nm}</div>
                  <div style={{ fontSize: 7, color: "#1980c2", fontWeight: 700 }}>{pr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component panel */}
        <div
          style={{
            animation: "popInRight 0.4s ease both",
            animationDelay: "0.1s",
            width: 80,
            background: "#252535",
            borderLeft: "1px solid rgba(255,255,255,.07)",
            display: "flex",
            flexDirection: "column",
            padding: "8px 0",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 6, color: "rgba(255,255,255,.35)", padding: "0 8px", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Components
          </div>
          {[
            ["Hero Section", true],
            ["Product Grid", false],
            ["Nav Bar", false],
          ].map(([label, active]) => (
            <div
              key={label}
              style={{
                padding: "5px 8px",
                fontSize: 6,
                color: active ? "#fff" : "rgba(255,255,255,.38)",
                background: active ? "rgba(25,128,194,.22)" : "transparent",
                borderLeft: active ? "2px solid #1980c2" : "2px solid transparent",
                cursor: "default",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          height: 28,
          background: "#252535",
          borderTop: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          flexShrink: 0,
        }}
      >
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

function C1S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="/web.png"
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
      <Chip label="Product & Digital" />
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
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Product &amp; Digital
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
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

function C2S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div className="bg-white" style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            height: 38,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
            borderBottom: "1px solid rgba(229,229,229,.5)",
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#262626",
              flex: 1,
              fontFamily: "serif",
            }}
          >
            Instagram
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 12px",
            gap: 10,
            borderBottom: "1px solid #f5f5f5",
          }}
        >
          <div
            className="text-white"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fb923c,#db2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            M
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#262626" }}>mad.studio</div>
            <div style={{ fontSize: 8.5, color: "#8e8e8e" }}>
              @mad.studio · Creative Agency
            </div>
          </div>
          <div
            className="bg-azure-500 text-white"
            style={{
              fontSize: 8,
              padding: "4px 12px",
              borderRadius: 5,
            }}
          >
            Follow
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 1,
            padding: 1,
          }}
        >
          {[
            ["#1980c2", "Brand"],
            ["#181817", "Launch"],
            ["#3da0e4", "Web"],
            ["#f0f0ee", "MAD"],
            ["#0f4f7a", "Identity"],
            ["#e8e8e4", "Campaign"],
          ].map(([bg, lbl], i) => (
            <div
              key={i}
              style={{
                background: bg,
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  bg === "#f0f0ee" || bg === "#e8e8e4" ? "#181817" : "#ffffff",
                fontSize: 7.5,
                fontWeight: 900,
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Marketing & Comms" />
      <ReqBubble text="Create a social media content calendar for our spring product launch." />
    </div>
  );
}

function C2S2() {
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          borderBottom: "1px solid rgba(229,229,229,.5)",
          background: "#f8f8f8",
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#262626",
            flex: 1,
            fontFamily: "serif",
          }}
        >
          Instagram
        </span>
      </div>
      <div style={{ borderBottom: "1px solid #f5f5f5" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fb923c,#db2777)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 9, color: "#262626", flex: 1 }}>
            mad.studio
          </span>
        </div>
        <div
          style={{
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#1980c2,#0f4f7a)",
            position: "relative",
          }}
        >
          <div
            className="text-white"
            style={{
              fontSize: 17,
              textAlign: "center",
              lineHeight: 1.25,
              padding: "0 10px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Your brand,
            <br />
            everywhere.
          </div>
        </div>
        <div
          style={{
            padding: "5px 12px 3px",
            fontSize: 8,
            color: "#262626",
            lineHeight: 1.55,
          }}
        >
          <strong>mad.studio</strong> Campaigns that connect — content built to
          reach the right people.
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            padding: "0 12px 8px",
          }}
        >
          {["#branding", "#marketing", "#springdrop", "#growth"].map((t) => (
            <span key={t} className="text-azure-500" style={{ fontSize: 7.5 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "8px 12px" }}>
        {[
          ["Total Reach", "248K", "+38%"],
          ["Conv.", "3.2K", "+52%"],
        ].map(([l, v, d]) => (
          <div
            key={l}
            style={{
              flex: 1,
              borderRadius: 5,
              padding: 8,
              background: "#f8f8f8",
            }}
          >
            <div style={{ fontSize: 6.5, color: "#aaa" }}>{l}</div>
            <div
              className="text-dark-900"
              style={{ fontSize: 13, fontWeight: 700 }}
            >
              {v}
            </div>
            <div style={{ fontSize: 7.5, color: "#22c55e" }}>↑ {d}</div>
          </div>
        ))}
      </div>
      <div
        className="text-white bg-black/75 flex items-center gap-[5px]"
        style={{
          position: "absolute",
          bottom: 14,
          right: 12,
          backdropFilter: "blur(8px)",
          fontSize: 7.5,
          padding: "4px 10px",
          borderRadius: 99,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        Campaign live
      </div>
      <Chip label="Marketing & Comms" />
    </div>
  );
}

function C2S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="/soc.png"
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
      <Chip label="Marketing & Comms" />
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
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Marketing &amp; Comms
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
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

function C3S1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#f8f7f5" }}>
        <div
          className="bg-white"
          style={{
            height: 32,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <span className="text-dark-900" style={{ fontSize: 10 }}>
            M<span className="text-azure-500">A</span>D Brand Studio
          </span>
        </div>
        <div
          className="bg-white"
          style={{
            height: 24,
            display: "flex",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {["Colours", "Typography", "Components"].map((t, i) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 7.5,
                borderBottom: `2px solid ${i === 0 ? "#1980c2" : "transparent"}`,
                color: i === 0 ? "#1980c2" : "#aaa",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "flex",
              borderRadius: 6,
              overflow: "hidden",
              height: 52,
              marginBottom: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            {[
              ["#1980c2", "Azure", "rgba(255,255,255,.7)"],
              ["#181817", "Onyx", "rgba(255,255,255,.7)"],
              ["#ffffff", "White", "#aaa"],
              ["#0f4f7a", "Deep", "rgba(255,255,255,.7)"],
              ["#3da0e4", "Sky", "rgba(255,255,255,.7)"],
            ].map(([bg, l, c]) => (
              <div
                key={l}
                style={{
                  background: bg,
                  color: c,
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontSize: 5.5,
                  fontWeight: 700,
                }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.58),rgba(0,0,0,.84))",
        }}
      />
      <Chip label="Brand & Identity" />
      <ReqBubble text="Design a bold brand identity system with logo, type, and a colour palette." />
    </div>
  );
}

function C3S2() {
  const swatches = [
    { color: "#1980c2", name: "Azure Blue",  hex: "#1980c2", role: "Primary",   delay: "0.05s" },
    { color: "#181817", name: "Onyx",        hex: "#181817", role: "Dark",      delay: "0.28s" },
    { color: "#ffffff", name: "White",       hex: "#ffffff", role: "Light",     delay: "0.50s" },
    { color: "#0f4f7a", name: "Deep Navy",   hex: "#0f4f7a", role: "Accent",    delay: "0.72s" },
    { color: "#3da0e4", name: "Sky",         hex: "#3da0e4", role: "Highlight", delay: "0.94s" },
  ];

  const logoVariants = [
    { bg: "#1980c2", color: "#ffffff", label: "MAD", delay: "0.15s" },
    { bg: "#ffffff", color: "#181817", label: "MAD", delay: "0.35s" },
    { bg: "#181817", color: "#ffffff", label: "MAD", delay: "0.55s" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#f8f7f5",
        fontFamily: "monospace",
      }}
    >
      <style>{`
        @keyframes popIn{from{opacity:0;transform:scale(0.6)}to{opacity:1;transform:scale(1)}}
        @keyframes colorSlide{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
        @keyframes cursorPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
      `}</style>

      {/* Toolbar */}
      <div
        style={{
          height: 30,
          background: "#fff",
          borderBottom: "1px solid #ebebeb",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 8.5, color: "#181817", fontWeight: 700 }}>
          M<span style={{ color: "#1980c2" }}>A</span>D Brand Studio
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 0 }}>
          {["Colours", "Typography", "Components"].map((t, i) => (
            <div
              key={t}
              style={{
                fontSize: 7,
                padding: "0 8px",
                height: 30,
                display: "flex",
                alignItems: "center",
                borderBottom: i === 0 ? "2px solid #1980c2" : "2px solid transparent",
                color: i === 0 ? "#1980c2" : "#aaa",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: palette builder */}
        <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          <div style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Colour Palette
          </div>

          {/* Swatches appear one by one */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {swatches.map((s, i) => (
              <div
                key={s.hex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  animation: `colorSlide 0.38s cubic-bezier(0.22,1,0.36,1) both`,
                  animationDelay: s.delay,
                }}
              >
                {/* swatch with pulsing ring on first (selected) */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 5,
                      background: s.color,
                      border: s.color === "#ffffff" ? "1px solid #ddd" : "none",
                      animation: i === 0 ? "popIn 0.35s cubic-bezier(0.22,1,0.36,1) both" : undefined,
                      animationDelay: i === 0 ? s.delay : undefined,
                    }}
                  />
                  {i === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: -3,
                        borderRadius: 8,
                        border: "1.5px solid #1980c2",
                        animation: "cursorPulse 1.4s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 7.5, color: "#181817", lineHeight: 1.2 }}>{s.name}</div>
                  <div style={{ fontSize: 6, color: "#bbb" }}>{s.hex} · {s.role}</div>
                </div>
                {i === 0 && (
                  <div
                    style={{
                      marginLeft: "auto",
                      fontSize: 6,
                      background: "rgba(25,128,194,.12)",
                      color: "#1980c2",
                      padding: "2px 6px",
                      borderRadius: 99,
                    }}
                  >
                    selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: logo variations */}
        <div
          style={{
            width: 110,
            borderLeft: "1px solid #ebebeb",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: "#fff",
          }}
        >
          <div style={{ fontSize: 7, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            Logo Variants
          </div>
          {logoVariants.map((v, i) => (
            <div
              key={i}
              style={{
                background: v.bg,
                color: v.color,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 0",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.04em",
                border: v.bg === "#ffffff" ? "1px solid #eee" : "none",
                animation: `popIn 0.38s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: v.delay,
                fontFamily: "sans-serif",
              }}
            >
              {v.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 7.5,
          padding: "4px 10px",
          borderRadius: 99,
          background: "#181817",
          color: "#fff",
          zIndex: 10,
        }}
      >
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8" }} />
        Brand system building…
      </div>
      <Chip label="Brand & Identity" />
    </div>
  );
}

function C3S3() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src="/brandd.png"
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
      <Chip label="Brand & Identity" />
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
        <div>
          <div
            className="text-white/[38%]"
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Brand &amp; Identity
          </div>
          <div
            className="text-white/[88%]"
            style={{
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            MAD Studio.
          </div>
        </div>
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

export const STAGE_SETS = {
  product: [C1S1, C1S2, C1S3],
  marketing: [C2S1, C2S2, C2S3],
  brand: [C3S1, C3S2, C3S3],
};

export const CARDS = content.cards.map((card) => ({
  ...card,
  stages: STAGE_SETS[card.stageSet] ?? STAGE_SETS.product,
}));

const S1 = 2000,
  S2 = 2000,
  S3 = 90000;
const LOOP = S1 + S2 + S3;

export function SvcCard({ config, startDelay, isActive }) {
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

  const { stages, title, sub } = config;
  const [S1c, S2c, S3c] = stages;

  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        width: "min(560px,calc(100vw - 24px))",
        paddingBottom: 8,
        paddingRight: 8,
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <S1c />
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
              <S2c />
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="s3"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
            >
              <S3c />
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
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 3 }}
        transition={{ duration: 0.3 }}
        style={{ paddingLeft: 2 }}
      >
        <div
          className="text-dark-900"
          style={{
            fontSize: 17,
            lineHeight: 1.2,
            marginBottom: 3,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          className="text-dark-900/[52%]"
          style={{
            fontSize: 11,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesInMotion() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [expandP, setExpandP] = useState(0);
  const G = 16;
  const [cardW, setCardW] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < 640 ? Math.max(280, window.innerWidth - 24) : 560
      : 560
  );
  const STEP = cardW + G;
  const max = CARDS.length - 1;
  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 640;
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Keep cardW in sync with viewport for 1-per-view on mobile
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setCardW(mobile ? Math.max(280, window.innerWidth - 24) : 560);
    };
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const extraPx = window.innerHeight * 0.8;
      const normalTotal = total - extraPx;
      const scrolled = -rect.top;
      if (scrolled <= normalTotal) {
        const p = Math.min(1, Math.max(0, scrolled / Math.max(1, normalTotal)));
        setActive(Math.min(max, Math.max(0, Math.round(p * max))));
        setExpandP(0);
      } else {
        setActive(max);
        setExpandP(Math.min(1, Math.max(0, (scrolled - normalTotal) / extraPx)));
      }
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [max]);

  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40)
      setActive((a) => (dx > 0 ? Math.min(max, a + 1) : Math.max(0, a - 1)));
    touchX.current = null;
  };

  const wAcc = useRef(0);
  const onWheel = (e) => {
    e.preventDefault();
    wAcc.current += e.deltaY;
    if (wAcc.current > 60) {
      setActive((a) => Math.min(max, a + 1));
      wAcc.current = 0;
    } else if (wAcc.current < -60) {
      setActive((a) => Math.max(0, a - 1));
      wAcc.current = 0;
    }
  };

  const isMobile = window.innerWidth < 640;
  const sectionHeight = isMobile ? `calc(100vh + ${CARDS.length * 280}px + 80vh)` : `calc(100vh + ${CARDS.length * 260}px + 80vh)`;

  return (
    <section
      ref={wrapRef}
      style={{
        position: "relative",
        height: sectionHeight,
        paddingBottom: 0,
        background: "linear-gradient(160deg, #daf0ff 0%, #c6e6ff 55%, #b8ddf8 100%)",
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
            padding: "72px 32px 8px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "linear-gradient(to bottom, rgba(218,240,255,0.97) 0%, rgba(198,230,255,0.88) 100%)",
            opacity: Math.max(0, 1 - expandP * 3),
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 6,
                color: "rgba(160,168,180,.75)",
              }}
            >
              {content.eyebrow}
            </p>
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
          <div style={{ display: "flex", gap: 8 }}>
            {[
              {
                d: "M14 6L8 12l6 6",
                fn: () => setActive((a) => Math.max(0, a - 1)),
              },
              {
                d: "M10 6l6 6-6 6",
                fn: () => setActive((a) => Math.min(max, a + 1)),
              },
            ].map(({ d, fn }, i) => (
              <button
                key={i}
                onClick={fn}
                className="bg-transparent flex items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(24,24,23,.14)",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(15,23,42,.45)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Strip */}
        <div
          className="pl-4 sm:pl-8"
          style={{ flex: 1, overflow: "hidden" }}
          onWheel={onWheel}
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
              opacity: Math.max(0, 1 - expandP * 2),
            }}
            animate={{ x: -active * STEP }}
            transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
          >
            {CARDS.map((c, i) => (
              <SvcCard
                key={c.id}
                config={c}
                isActive={i === active}
                startDelay={i * 600}
              />
            ))}
          </motion.div>
        </div>

        {/* Expansion overlay — last card grows to fill viewport */}
        {expandP > 0 && (
          <div
            style={{
              position: "absolute",
              width: cardW,
              height: 460,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scaleX(${1 + expandP * (window.innerWidth / cardW - 1)}) scaleY(${1 + expandP * (window.innerHeight / 460 - 1)})`,
              borderRadius: Math.round(20 * (1 - expandP)),
              background: "linear-gradient(160deg, #daf0ff 0%, #c6e6ff 55%, #b8ddf8 100%)",
              opacity: Math.min(1, expandP * 3),
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "10px 0 18px",
            flexShrink: 0,
            opacity: Math.max(0, 1 - expandP * 3),
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
