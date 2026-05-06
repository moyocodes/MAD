import { useState, useEffect, useRef, useCallback } from "react";

// ─── FONTS ─────────────────────────────────────────────────────────────────
// Add to your <head>:
// <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

const F = {
  serif: "'DM Serif Display', Georgia, serif",
  syne: "'Syne', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

// ─── LOCAL IMAGES ──────────────────────────────────────────────────────────
const IMG = {
  i1: "/flier/image.png",
  i2: "/flier/image2.png",
  i3: "/flier/image3.png",
  i4: "/flier/image4.png",
  i5: "/flier/image5.png",
  i6: "/flier/image6.png",
  i7: "/flier/image7.png",
  i8: "/flier/image8.png",
  i9: "/flier/image9.png",
};

// ─── CARD DATA ─────────────────────────────────────────────────────────────
const CARDS = [
  {
    color: "#1e1240",
    textColor: "#c4b8f0",
    label: "Product & Digital",
    sub: "Websites, apps, and digital platforms built to perform and scale.",
    stages: [
      {
        type: "browser",
        url: "luxe-studio.co",
        title: "LUXE STUDIO",
        sub: "SS 2025 Collection",
        heroImg: IMG.i1,
      },
      {
        type: "tweet",
        img: IMG.i4,
        text: "Our SS25 collection is live. Every piece designed to outlast the season.",
        handle: "@luxestudio",
        likes: "2.4K",
      },
    ],
  },
  {
    color: "#0d2b18",
    textColor: "#86d4a4",
    label: "Marketing & Comms",
    sub: "Campaigns and content systems that connect brands with the right audience.",
    stages: [
      { type: "ig" },
      {
        type: "tweet",
        img: IMG.i5,
        text: "Great brands don't shout. They show up — consistently, clearly, with intention.",
        handle: "@madagency",
        likes: "5.1K",
      },
    ],
  },
  {
    color: "#1a1a2e",
    textColor: "#a8b4e8",
    label: "Brand & Identity",
    sub: "Logo, type, colour, and brand systems that bring clarity to every touchpoint.",
    stages: [{ type: "brand" }, { type: "palette" }],
  },
  {
    color: "#2a1200",
    textColor: "#e8a870",
    label: "E-Commerce",
    sub: "Shopify and Next.js stores optimised to convert from day one.",
    stages: [
      {
        type: "browser",
        url: "sole-store.co",
        title: "SOLE.",
        sub: "Spring Drop 2025",
        heroImg: IMG.i8,
      },
      {
        type: "tweet",
        img: IMG.i9,
        text: "Spring Drop is here. Free shipping on all orders this week.",
        handle: "@solestore",
        likes: "3.7K",
      },
    ],
  },
  {
    color: "#0a2828",
    textColor: "#7ad4d4",
    label: "Campaign Analytics",
    sub: "Live dashboards, KPI benchmarks, and weekly insight reports.",
    stages: [
      { type: "dashboard" },
      {
        type: "tweet",
        img: IMG.i6,
        text: "6.4× ROAS. 84K reach. $4.20 CPA. That's what a well-structured campaign looks like.",
        handle: "@madagency",
        likes: "4.2K",
      },
    ],
  },
  {
    color: "#280a1e",
    textColor: "#e89fd4",
    label: "Illustration",
    sub: "Editorial illustration, comics, and icon systems for campaigns.",
    stages: [{ type: "comic" }, { type: "chat" }],
  },
];

const HOLD = 2800;

// ═══════════════════════════════════════════
// STAGE COMPONENTS
// ═══════════════════════════════════════════

function BrowserStage({ stage }) {
  const gridItems = [
    { img: IMG.i7, name: "Silk Blazer", price: "$420", tag: "BESTSELLER" },
    { img: IMG.i8, name: "Trench Coat", price: "$510", tag: "NEW" },
    { img: IMG.i9, name: "Mini Dress", price: "$280", tag: "" },
  ];
  return (
    <div
      style={{
        background: "#f8f6ff",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#e8e8e8",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 4,
            padding: "2px 8px",
            fontFamily: F.mono,
            fontSize: 8,
            color: "#666",
            textAlign: "center",
          }}
        >
          {stage.url}
        </div>
      </div>
      {/* Hero */}
      <div
        style={{
          background: "#111",
          height: 110,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={stage.heroImg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
            position: "absolute",
            inset: 0,
            objectPosition: "center 25%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right,rgba(0,0,0,.8) 40%,rgba(0,0,0,.15))",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, padding: "14px 16px" }}>
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.5)",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              marginBottom: 4,
              fontFamily: F.mono,
            }}
          >
            New Arrivals
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
              fontFamily: F.syne,
              lineHeight: 1,
            }}
          >
            {stage.title}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,.55)",
              marginTop: 3,
            }}
          >
            {stage.sub}
          </div>
          <div
            style={{
              marginTop: 8,
              display: "inline-flex",
              background: "#1980c2",
              color: "#fff",
              fontSize: 7,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 3,
              letterSpacing: ".12em",
              fontFamily: F.syne,
            }}
          >
            SHOP NOW
          </div>
        </div>
      </div>
      {/* Grid */}
      <div
        style={{
          padding: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 7,
          flex: 1,
        }}
      >
        {gridItems.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#f0f0f0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{ height: 70, overflow: "hidden", position: "relative" }}
            >
              <img
                src={item.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {item.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    background: "#1980c2",
                    color: "#fff",
                    fontSize: 5,
                    fontWeight: 800,
                    padding: "2px 5px",
                    fontFamily: F.syne,
                  }}
                >
                  {item.tag}
                </div>
              )}
            </div>
            <div style={{ padding: "5px 7px" }}>
              <div style={{ fontSize: 7, color: "#666", fontFamily: F.syne }}>
                {item.name}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#111" }}>
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TweetStage({ card, stage }) {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <img
        src={stage.img}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(.42)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 55%)",
        }}
      />
      <div style={{ position: "absolute", bottom: 16, left: 14, right: 14 }}>
        <div
          style={{
            background: "rgba(0,0,0,.45)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: card.textColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "#000",
                fontFamily: F.syne,
              }}
            >
              {stage.handle.charAt(1).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: F.syne,
                  lineHeight: 1,
                }}
              >
                {stage.handle.replace("@", "").toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,.38)",
                  fontFamily: F.mono,
                }}
              >
                {stage.handle}
              </div>
            </div>
            <svg
              style={{ marginLeft: "auto" }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,.3)"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </div>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.88)",
              lineHeight: 1.55,
              margin: "0 0 10px",
              fontFamily: F.syne,
            }}
          >
            {stage.text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,.08)",
              paddingTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.28)",
                fontFamily: F.mono,
              }}
            >
              9:41 AM · 2025
            </span>
            <span
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,.38)",
                fontFamily: F.mono,
              }}
            >
              ♥ {stage.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IgStage() {
  const gridImgs = [IMG.i1, IMG.i2, IMG.i3, IMG.i4, IMG.i5, IMG.i6];
  return (
    <div
      style={{
        background: "#fff",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderBottom: "1px solid #eee",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#000",
            fontFamily: F.syne,
          }}
        >
          luxe.studio
        </span>
        <span style={{ fontSize: 16 }}>≡</span>
      </div>
      <div style={{ padding: "10px 12px", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(45deg,#f09433,#dc2743,#bc1888)",
              padding: 2,
              flexShrink: 0,
            }}
          >
            <img
              src={IMG.i2}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              ["184", "posts"],
              ["48.2K", "followers"],
              ["312", "following"],
            ].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#000",
                    fontFamily: F.syne,
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 8, color: "#666" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "#000",
            marginBottom: 2,
          }}
        >
          LUXE STUDIO
        </div>
        <div
          style={{
            fontSize: 8,
            color: "#444",
            lineHeight: 1.4,
            marginBottom: 8,
          }}
        >
          Premium editorial fashion. SS25 collection live now.
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: 5,
              borderRadius: 8,
              background: "#1980c2",
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Follow
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: 5,
              borderRadius: 8,
              background: "#f0f0f0",
              fontSize: 9,
              fontWeight: 700,
              color: "#000",
            }}
          >
            Message
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1.5,
          flex: 1,
          minHeight: 0,
        }}
      >
        {gridImgs.map((src, i) => (
          <div key={i} style={{ overflow: "hidden", background: "#eee" }}>
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandStage() {
  return (
    <div
      style={{
        background: "#0d1117",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "rgba(255,255,255,.25)",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontFamily: F.mono,
        }}
      >
        Brand Identity System
      </div>
      <div
        style={{
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 10,
          height: 88,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <polygon
              points="11,1 21,7 21,15 11,21 1,15 1,7"
              fill="rgba(255,255,255,.9)"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: ".05em",
              fontFamily: F.syne,
            }}
          >
            MAD
          </div>
          <div
            style={{
              fontSize: 6,
              color: "rgba(255,255,255,.28)",
              letterSpacing: ".35em",
              fontFamily: F.mono,
            }}
          >
            AGENCY
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        {[
          ["#0d1117", "#fff", "1px solid rgba(255,255,255,.15)"],
          ["#fff", "#111", "none"],
          [
            "rgba(255,255,255,.08)",
            "rgba(255,255,255,.7)",
            "1px solid rgba(255,255,255,.15)",
          ],
        ].map(([bg, c, b], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 30,
              borderRadius: 6,
              background: bg,
              border: b,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: c,
              fontFamily: F.syne,
            }}
          >
            MAD
          </div>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 7,
            color: "rgba(255,255,255,.25)",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 4,
            fontFamily: F.mono,
          }}
        >
          Typefaces
        </div>
        {[
          [
            "DM Serif Display",
            F.serif,
            "italic",
            20,
            "rgba(255,255,255,1)",
            "Headlines",
          ],
          [
            "Syne Bold",
            F.syne,
            "normal",
            13,
            "rgba(255,255,255,.8)",
            "UI / Body",
          ],
          [
            "JetBrains Mono",
            F.mono,
            "normal",
            10,
            "rgba(255,255,255,.45)",
            "Captions",
          ],
        ].map(([name, ff, style, size, color, role], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: ff,
                fontStyle: style,
                fontSize: size,
                color,
                fontWeight: i === 0 ? 400 : 700,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.25)",
                fontFamily: F.mono,
              }}
            >
              {role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaletteStage() {
  const swatches = [
    ["#0a0a0a", "Ink"],
    ["#2d2d2d", "Dark"],
    ["#6b6b6b", "Mid"],
    ["#b4b4b4", "Light"],
    ["#f5f5f5", "Paper"],
  ];
  return (
    <div
      style={{
        background: "#fafafa",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        border: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          fontSize: 7,
          color: "#888",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          fontFamily: F.mono,
        }}
      >
        Colour Palette
      </div>
      <div style={{ display: "flex", gap: 8, flex: 1, alignItems: "stretch" }}>
        {swatches.map(([hex, lbl], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                flex: 1,
                minHeight: 90,
                borderRadius: 10,
                background: hex,
                border: hex === "#f5f5f5" ? "1px solid #ddd" : "none",
              }}
            />
            <span style={{ fontSize: 7, color: "#888", fontFamily: F.mono }}>
              {lbl}
            </span>
            <span style={{ fontSize: 7, color: "#aaa", fontFamily: F.mono }}>
              {hex}
            </span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", paddingTop: 12 }}>
        <div
          style={{
            fontSize: 7,
            color: "#888",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            marginBottom: 8,
            fontFamily: F.mono,
          }}
        >
          Usage
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            ["Primary", "#0a0a0a", "#fff"],
            ["Surface", "#fafafa", "#0a0a0a"],
            ["Muted", "#f0f0f0", "#666"],
          ].map(([nm, bg, c], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 9px",
                borderRadius: 6,
                background: bg,
                border: bg === "#fafafa" ? "1px solid #e8e8e8" : "none",
              }}
            >
              <span style={{ fontSize: 9, color: c, fontFamily: F.syne }}>
                {nm}
              </span>
              <span
                style={{
                  fontSize: 7,
                  color: c === "#fff" ? "rgba(255,255,255,.5)" : "#aaa",
                  fontFamily: F.mono,
                }}
              >
                {bg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardStage() {
  return (
    <div
      style={{
        background: "#0e0e0c",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              fontFamily: F.syne,
            }}
          >
            Campaign Dashboard
          </div>
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.3)",
              fontFamily: F.mono,
            }}
          >
            Q4 2025 · Live
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,.5)",
            }}
          />
          <span
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,.45)",
              fontFamily: F.mono,
            }}
          >
            LIVE
          </span>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 6,
          flexShrink: 0,
        }}
      >
        {[
          ["84K", "Reach", "+32%"],
          ["3.2K", "Conv.", "+18%"],
          ["$4.20", "CPA", "-12%"],
          ["6.4×", "ROAS", "+8%"],
        ].map(([v, l, d], i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 8,
              padding: 8,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
                fontFamily: F.syne,
                lineHeight: 1,
              }}
            >
              {v}
            </div>
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.3)",
                margin: "2px 0",
              }}
            >
              {l}
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "rgba(255,255,255,.65)",
                fontFamily: F.mono,
              }}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
      <svg
        viewBox="0 0 260 70"
        style={{ width: "100%", flex: 1, minHeight: 60 }}
      >
        <defs>
          <linearGradient id="dashGr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {[0, 65, 130, 195, 260].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="0"
            x2={x}
            y2="70"
            stroke="rgba(255,255,255,.05)"
            strokeWidth=".5"
          />
        ))}
        <polyline
          points="0,60 35,48 70,35 105,40 140,20 175,12 210,7 260,3"
          fill="none"
          stroke="rgba(255,255,255,.65)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,60 35,48 70,35 105,40 140,20 175,12 210,7 260,3 260,70 0,70"
          fill="url(#dashGr)"
        />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flexShrink: 0,
        }}
      >
        {[
          ["Instagram", 88],
          ["LinkedIn", 64],
          ["Email", 76],
          ["Paid", 52],
        ].map(([nm, pct], i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                fontSize: 7,
                width: 52,
                color: "rgba(255,255,255,.38)",
                flexShrink: 0,
                fontFamily: F.mono,
              }}
            >
              {nm}
            </span>
            <div
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,.07)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 2,
                  background: "rgba(255,255,255,.55)",
                  width: `${pct}%`,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.45)",
                fontFamily: F.mono,
              }}
            >
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComicStage() {
  const panels = [
    { img: IMG.i1, bubble: "Idea!", label: "Chapter 1" },
    { img: IMG.i2, bubble: "POW!", label: "Rise" },
    { img: IMG.i3, bubble: "Plot!", label: "Strategy" },
    { img: IMG.i6, bubble: "WIN!", label: "Launch" },
  ];
  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 3,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {panels.map((p, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={p.img}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "#fff",
              color: "#111",
              fontSize: 9,
              fontWeight: 800,
              padding: "2px 7px",
              borderRadius: "6px 6px 0 6px",
              fontFamily: F.syne,
            }}
          >
            {p.bubble}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 7,
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              fontStyle: "italic",
              fontFamily: F.serif,
            }}
          >
            {p.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatStage() {
  const msgs = [
    { from: "client", text: "4-panel comic for our product launch." },
    {
      from: "studio",
      text: "Bold outlines, halftone dots, speech bubbles. Style ref?",
    },
    { from: "client", text: "Roy Lichtenstein meets streetwear." },
    { from: "studio", text: "PNG @ 300dpi + PDF. Figma source included ✓" },
  ];
  return (
    <div
      style={{
        background: "#08090c",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 800,
            color: "#000",
            fontFamily: F.syne,
          }}
        >
          M
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              fontFamily: F.syne,
            }}
          >
            MAD Studio
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,.3)",
                fontFamily: F.mono,
              }}
            >
              online
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 7,
          justifyContent: "flex-end",
        }}
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.from === "client" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "78%",
                padding: "8px 11px",
                fontSize: 9,
                lineHeight: 1.5,
                borderRadius:
                  m.from === "client"
                    ? "11px 11px 2px 11px"
                    : "11px 11px 11px 2px",
                background:
                  m.from === "client"
                    ? "rgba(255,255,255,.75)"
                    : "rgba(255,255,255,.08)",
                color: m.from === "client" ? "#111" : "rgba(255,255,255,.78)",
                fontFamily: F.syne,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 7,
          alignItems: "center",
          padding: "8px 10px",
          borderTop: "1px solid rgba(255,255,255,.07)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 100,
            padding: "6px 10px",
            background: "rgba(255,255,255,.07)",
            fontSize: 7,
            color: "rgba(255,255,255,.18)",
            fontFamily: F.mono,
          }}
        >
          Message...
        </div>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M7 2l5 5-5 5"
              stroke="#111"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function renderStage(card, stage) {
  switch (stage.type) {
    case "browser":
      return <BrowserStage stage={stage} />;
    case "tweet":
      return <TweetStage card={card} stage={stage} />;
    case "ig":
      return <IgStage />;
    case "brand":
      return <BrandStage />;
    case "palette":
      return <PaletteStage />;
    case "dashboard":
      return <DashboardStage />;
    case "comic":
      return <ComicStage />;
    case "chat":
      return <ChatStage />;
    default:
      return null;
  }
}

// ═══════════════════════════════════════════
// SINGLE CARD
// ═══════════════════════════════════════════

function ServiceCard({ card, cardIdx, isActive, onActivate }) {
  const [curStage, setCurStage] = useState(0);
  const fillRef = useRef(null);
  const timerRef = useRef(null);
  const total = card.stages.length;

  const advanceStage = useCallback(() => {
    setCurStage((s) => (s + 1) % total);
  }, [total]);

  // Reset to stage 0 when card becomes active
  useEffect(() => {
    if (!isActive) {
      setCurStage(0);
    }
  }, [isActive]);

  // Progress bar + auto-advance
  useEffect(() => {
    if (!isActive) return;
    const el = fillRef.current;
    if (!el) return;
    clearTimeout(timerRef.current);
    el.style.transition = "none";
    el.style.width = "0%";
    const rAF = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = `width ${HOLD}ms linear`;
        el.style.width = "100%";
        timerRef.current = setTimeout(advanceStage, HOLD);
      }),
    );
    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timerRef.current);
    };
  }, [curStage, isActive, advanceStage]);

  const goStage = (si) => {
    clearTimeout(timerRef.current);
    setCurStage(si);
  };

  return (
    <div
      onClick={() => !isActive && onActivate()}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 380,
        height: 480,
        marginLeft: -190,
        marginTop: -240,
        transformStyle: "preserve-3d",
        cursor: isActive ? "default" : "pointer",
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
          boxShadow: isActive
            ? "0 4px 24px rgba(0,0,0,.1),0 20px 60px rgba(0,0,0,.14)"
            : "0 2px 8px rgba(0,0,0,.06),0 8px 32px rgba(0,0,0,.08)",
          transition: "box-shadow .5s ease",
        }}
      >
        {/* Background colour */}
        <div
          style={{ position: "absolute", inset: 0, background: card.color }}
        />

        {/* Stages */}
        {card.stages.map((stage, si) => (
          <div
            key={si}
            style={{
              position: "absolute",
              inset: 0,
              opacity: si === curStage ? 1 : 0,
              transition: "opacity .4s ease",
              pointerEvents: si === curStage ? "auto" : "none",
              padding: "14px 14px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {renderStage(card, stage)}
          </div>
        ))}

        {/* Top bar: chip + dots */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px 28px",
            background:
              "linear-gradient(to bottom,rgba(0,0,0,.45) 0%,transparent 100%)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "5px 12px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,.25)",
              background: "rgba(255,255,255,.12)",
              backdropFilter: "blur(8px)",
              fontFamily: F.mono,
              fontSize: 9,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.8)",
            }}
          >
            {card.label}
          </span>

          {total > 1 && (
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {card.stages.map((_, si) => (
                <button
                  key={si}
                  onClick={(e) => {
                    e.stopPropagation();
                    isActive ? goStage(si) : onActivate();
                  }}
                  style={{
                    height: 5,
                    width: si === curStage ? 16 : 5,
                    borderRadius: 3,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background:
                      si === curStage
                        ? "rgba(255,255,255,.9)"
                        : "rgba(255,255,255,.35)",
                    transition: "all .3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(255,255,255,.15)",
          }}
        >
          <div
            ref={fillRef}
            style={{
              height: "100%",
              width: "0%",
              background: "rgba(255,255,255,.7)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════

export default function CardsReel({ dark, progress = 0 }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Sync with scroll progress from parent
  useEffect(() => {
    const target = Math.round(progress * (CARDS.length - 1));
    setActiveIdx(Math.min(target, CARDS.length - 1));
  }, [progress]);

  const getTransform = (i) => {
    const off = i - activeIdx;
    const abs = Math.abs(off);
    const sign = off < 0 ? -1 : off > 0 ? 1 : 0;
    const SPREAD = 360;
    const DEPTH = 230;
    const ROTY = 36;
    const scale = Math.pow(0.79, abs);
    const x = sign * Math.min(abs, 2) * SPREAD * (1 - abs * 0.08);
    const z = -(abs * DEPTH);
    const ry = -sign * Math.min(abs, 2) * ROTY;
    const op = abs <= 2 ? Math.max(0.22, 1 - abs * 0.38) : 0;
    return { x, z, ry, scale, op, abs };
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#f5f3ef",
        padding: "40px 0 48px",
        overflow: "hidden",
        fontFamily: F.syne,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 40px 36px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: F.mono,
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 8,
            }}
          >
            Services in motion &nbsp;·&nbsp; {activeIdx + 1} / {CARDS.length}
          </p>
          <h2
            style={{
              fontFamily: F.serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 38,
              color: "#0f0f0f",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Systems for growth.
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { dir: -1, d: "M14 6L8 12l6 6" },
            { dir: 1, d: "M10 6l6 6-6 6" },
          ].map(({ dir, d }, i) => (
            <button
              key={i}
              onClick={() =>
                setActiveIdx((a) =>
                  Math.max(0, Math.min(CARDS.length - 1, a + dir)),
                )
              }
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d={d} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Scene */}
      <div
        style={{
          width: "100%",
          position: "relative",
          height: 520,
          perspective: 1400,
          perspectiveOrigin: "50% 38%",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {CARDS.map((card, i) => {
            const { x, z, ry, scale, op, abs } = getTransform(i);
            return (
              <div
                key={card.label}
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity: op,
                  zIndex: 10 - abs,
                  pointerEvents: abs <= 2 ? "auto" : "none",
                  transition:
                    "transform .65s cubic-bezier(.23,1,.32,1), opacity .65s ease",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 380,
                  height: 480,
                  marginLeft: -190,
                  marginTop: -240,
                  transformStyle: "preserve-3d",
                }}
              >
                <ServiceCard
                  card={card}
                  cardIdx={i}
                  isActive={i === activeIdx}
                  onActivate={() => setActiveIdx(i)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Below-card text */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "0 40px",
          marginTop: 28,
          justifyContent: "center",
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 380px",
              opacity: i === activeIdx ? 1 : 0,
              transform: i === activeIdx ? "translateY(0)" : "translateY(8px)",
              transition: "opacity .45s ease, transform .45s ease",
              pointerEvents: i === activeIdx ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontFamily: F.serif,
                fontStyle: "italic",
                fontSize: 19,
                color: "#0f0f0f",
                marginBottom: 5,
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                lineHeight: 1.65,
                fontFamily: F.syne,
              }}
            >
              {card.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
