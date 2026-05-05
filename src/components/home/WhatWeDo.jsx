import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// ─── FONTS ───────────────────────────────────────────────────────────────────
// Add to your global CSS or index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SERVICES = [
  { tag: "01", shortTag: "Product", label: "Product & Digital Solutions", tagline: "Built for performance.", wide: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop", top: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop" },
  { tag: "02", shortTag: "Marketing", label: "Marketing & Communication", tagline: "Reach the right people.", wide: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=85&auto=format&fit=crop", top: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=85&auto=format&fit=crop" },
  { tag: "03", shortTag: "Brand", label: "Brand & Design Systems", tagline: "Identity that speaks first.", wide: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=85&auto=format&fit=crop", top: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=85&auto=format&fit=crop" },
];

// ─── CARD DATA ────────────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  {
    id: 1, label: "Fashion Website", accent: "#c9a96e",
    stages: [
      {
        type: "website-mockup",
        browserUrl: "luxe-studio.co",
        nav: ["Collections", "Lookbook", "Atelier", "Journal"],
        heroImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90&auto=format&fit=crop",
        heroTitle: "LUXE STUDIO", heroSub: "SS 2025 Collection", heroTag: "New Arrivals",
        grid: [
          { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80&auto=format&fit=crop", name: "Silk Blazer", price: "$420", tag: "BESTSELLER" },
          { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80&auto=format&fit=crop", name: "Trench Coat", price: "$510", tag: "NEW" },
          { img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80&auto=format&fit=crop", name: "Mini Dress", price: "$280", tag: "" },
        ],
      },
      {
        type: "process", style: "timeline", accent: "#c9a96e",
        steps: [
          { num: "01", title: "Discovery", body: "Brand audit, competitor research, target audience mapping.", icon: "◉" },
          { num: "02", title: "Wireframes", body: "Lo-fi flows for every key page — desktop & mobile first.", icon: "▣" },
          { num: "03", title: "Visual Design", body: "High-fidelity Figma screens. Typography, palette, motion.", icon: "◈" },
          { num: "04", title: "Build & Ship", body: "Webflow / Next.js. CMS, checkout, auth gate. Live in days.", icon: "◆" },
        ],
      },
    ],
  },
  {
    id: 2, label: "Social Media", accent: "#e1306c",
    stages: [
      {
        type: "ig-full",
        username: "luxe.studio", name: "LUXE STUDIO",
        bio: "Premium editorial fashion. SS25 collection live now.",
        website: "luxe-studio.co",
        followers: "48.2K", following: "312", posts: "184",
        stories: [
          { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=70&auto=format&fit=crop", label: "SS25" },
          { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=70&auto=format&fit=crop", label: "BTS" },
          { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=70&auto=format&fit=crop", label: "Drops" },
          { img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=70&auto=format&fit=crop", label: "Press" },
        ],
        grid: [
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=70&auto=format&fit=crop",
        ],
      },
      {
        type: "process", style: "numbered", accent: "#e1306c",
        steps: [
          { num: "01", title: "Strategy", body: "Audience personas, platform audit, content pillars, posting cadence." },
          { num: "02", title: "Content Plan", body: "Monthly calendar. Reels, carousels, stories, collabs mapped out." },
          { num: "03", title: "Production", body: "Shot lists, copy, design assets — on-brand every single post." },
          { num: "04", title: "Grow & Optimise", body: "Weekly analytics review. A/B captions, hashtag sets, paid boost." },
        ],
      },
    ],
  },
  {
    id: 3, label: "Event Design", accent: "#a78bfa",
    stages: [
      {
        type: "flier-full",
        img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=90&auto=format&fit=crop",
        title: "GRAND\nOPENING", sub: "Experience the night",
        date: "FRI · 23 AUG · 8PM", venue: "Skyline Club, Downtown", pill: "Print-ready A3",
      },
      {
        type: "process", style: "chat", accent: "#a78bfa",
        convo: [
          { from: "client", text: "Need a grand opening flier — luxury nightclub vibe, print + digital." },
          { from: "studio", text: "On it. Full-bleed photography, gold type, dramatic headline. Venue?" },
          { from: "client", text: "Skyline Club. Friday the 23rd. VIP door at 8." },
          { from: "studio", text: "Sending v1 in 2h — deep violet palette, editorial grid, halftone texture." },
          { from: "client", text: "🔥 Love it. A3 print-ready + Instagram sizes?" },
          { from: "studio", text: "Delivered: 300dpi PDF · 1080×1080 · 1080×1920 stories ✓" },
        ],
      },
    ],
  },
  {
    id: 4, label: "Logo & Brand", accent: "#38bdf8",
    stages: [
      { type: "logo-system", accent: "#38bdf8" },
      {
        type: "process", style: "before-after", accent: "#38bdf8",
        before: { label: "Before", words: ["Generic wordmark", "3+ conflicting fonts", "No visual grid", "Inconsistent use"] },
        after:  { label: "After",  words: ["Custom logo suite", "One typeface family", "8pt grid, strict rules", "40-page brand guide"] },
      },
    ],
  },
  {
    id: 5, label: "E-Commerce", accent: "#34d399",
    stages: [
      {
        type: "website-mockup",
        browserUrl: "sole-store.co",
        nav: ["Men", "Women", "New", "Sale"],
        heroImg: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=90&auto=format&fit=crop",
        heroTitle: "SOLE.", heroSub: "Spring Drop 2025", heroTag: "Free Shipping Over $150",
        grid: [
          { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop", name: "Air Runner Pro", price: "$189", tag: "TOP PICK" },
          { img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80&auto=format&fit=crop", name: "Classic Low", price: "$134", tag: "" },
          { img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80&auto=format&fit=crop", name: "Trail Boost", price: "$215", tag: "NEW" },
        ],
      },
      {
        type: "process", style: "timeline", accent: "#34d399",
        steps: [
          { num: "01", title: "Platform Setup", body: "Shopify / Next.js. Domain, hosting, SSL, payment gateway.", icon: "◉" },
          { num: "02", title: "Product Import", body: "Catalogue structured, photography standards set, SEO copy.", icon: "▣" },
          { num: "03", title: "UX & Design", body: "Cart, checkout flow, size guides, wishlist, returns flow.", icon: "◈" },
          { num: "04", title: "Launch & Ads", body: "Meta pixel, GA4, email flows, first paid campaign live.", icon: "◆" },
        ],
      },
    ],
  },
  {
    id: 6, label: "Campaign Analytics", accent: "#fb923c",
    stages: [
      { type: "dashboard-full", accent: "#fb923c" },
      {
        type: "process", style: "numbered", accent: "#fb923c",
        steps: [
          { num: "01", title: "Audit", body: "All channels, pixel health, UTM structure, attribution model." },
          { num: "02", title: "Benchmark", body: "Set KPIs per channel. CPA, ROAS, CAC, LTV targets agreed." },
          { num: "03", title: "Dashboard", body: "Live Looker Studio build. Client access from day one." },
          { num: "04", title: "Iterate", body: "Weekly insights report. Budget shifts. Creative tests. Scale." },
        ],
      },
    ],
  },
  {
    id: 7, label: "Illustration", accent: "#f472b6",
    stages: [
      {
        type: "comic-full",
        panels: [
          { img: "https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?w=400&q=80&auto=format&fit=crop", bubble: "Idea!", label: "Chapter 1", tint: "rgba(0,0,0,.4)" },
          { img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80&auto=format&fit=crop", bubble: "POW!", label: "Rise", tint: "rgba(25,128,194,.45)" },
          { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80&auto=format&fit=crop", bubble: "Plot!", label: "Strategy", tint: "rgba(80,30,0,.45)" },
          { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80&auto=format&fit=crop", bubble: "WIN!", label: "Launch", tint: "rgba(0,60,20,.45)" },
        ],
      },
      {
        type: "process", style: "chat", accent: "#f472b6",
        convo: [
          { from: "client", text: "4-panel comic strip for our product launch campaign." },
          { from: "studio", text: "Pop-art treatment — bold outlines, halftone dots, speech bubbles. Style ref?" },
          { from: "client", text: "Roy Lichtenstein meets streetwear brand. High energy." },
          { from: "studio", text: "Sketches sent. Panel 1: 'aha' moment. Panel 4: the win. Check Notion." },
          { from: "client", text: "This is 🔥🔥. IG carousel + A2 print?" },
          { from: "studio", text: "Both done. PNG @ 300dpi + PDF. Figma source included ✓" },
        ],
      },
    ],
  },
  {
    id: 8, label: "Rebrand", accent: "#e2e8f0",
    stages: [
      {
        type: "rebrand-split",
        beforeImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format&fit=crop",
        afterImg: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80&auto=format&fit=crop",
      },
      {
        type: "process", style: "before-after", accent: "#e2e8f0",
        before: { label: "Old brand", words: ["Dated wordmark (2009)", "5 conflicting fonts", "No visual hierarchy", "Ignored by press"] },
        after:  { label: "New identity", words: ["Bespoke logotype", "Single typeface family", "Clear design system", "Featured in Dezeen"] },
      },
    ],
  },
  {
    id: 9, label: "Print & Editorial", accent: "#fde68a",
    stages: [
      {
        type: "print-full",
        img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=90&auto=format&fit=crop",
        title: "Annual Report\n2025", sub: "48 pages · Print + Interactive PDF",
        tools: ["InDesign", "Figma", "After Effects"], pill: "Press-ready",
      },
      {
        type: "process", style: "timeline", accent: "#fde68a",
        steps: [
          { num: "01", title: "Content Strategy", body: "Narrative arc, data stories, photography brief, page budget.", icon: "◉" },
          { num: "02", title: "Grid & Type", body: "Master pages, baseline grid, type scale, colour tokens.", icon: "▣" },
          { num: "03", title: "Design & Infographics", body: "All 48 pages. Charts, pull quotes, full-bleeds.", icon: "◈" },
          { num: "04", title: "Preflight & Print", body: "PDF/X-4 300dpi + interactive PDF + Figma handoff ✓", icon: "◆" },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// STAGE COMPONENTS
// ═══════════════════════════════════════════════════════

function WebsiteMockup({ stage }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0a0a0a", fontFamily: "'Syne', sans-serif" }}>
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "#141414", borderBottom: "1px solid #222", flexShrink: 0 }}>
        {["#ef4444","#f59e0b","#22c55e"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, background: "#1a1a1a", borderRadius: 6, margin: "0 10px", height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, color: "#444", fontFamily: "'JetBrains Mono', monospace" }}>{stage.browserUrl}</span>
        </div>
      </div>
      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "#000", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.15em" }}>{stage.heroTitle}</span>
        <div style={{ display: "flex", gap: 16 }}>
          {stage.nav.map((n,i) => <span key={i} style={{ fontSize: 8, color: i===0?"#fff":"#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>{n}</span>)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ position: "relative", height: 170, flexShrink: 0 }}>
        <img src={stage.heroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.88) 40%, rgba(0,0,0,.15))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
          <div style={{ fontSize: 8, color: stage.grid[0]?.tag ? "#c9a96e" : "#34d399", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{stage.heroTag}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "0.02em" }}>{stage.heroTitle}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", marginTop: 5 }}>{stage.heroSub}</div>
          <div style={{ marginTop: 12, display: "inline-flex", background: "#c9a96e", color: "#000", fontSize: 8, fontWeight: 700, padding: "5px 14px", borderRadius: 2, letterSpacing: "0.1em", width: "fit-content" }}>SHOP NOW</div>
        </div>
      </div>
      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, padding: 8, flex: 1 }}>
        {stage.grid.map((item, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden", background: "#111", borderRadius: 3 }}>
            <img src={item.img} alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
            {item.tag && <div style={{ position: "absolute", top: 6, left: 6, background: "#c9a96e", color: "#000", fontSize: 6, fontWeight: 800, padding: "2px 5px", letterSpacing: "0.08em" }}>{item.tag}</div>}
            <div style={{ padding: "6px 8px" }}>
              <div style={{ fontSize: 8, color: "#aaa", marginBottom: 2 }}>{item.name}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IgFull({ stage }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "0.5px solid #dbdbdb", flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>{stage.username}</span>
        <div style={{ display: "flex", gap: 14 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </div>
      </div>
      {/* Profile info */}
      <div style={{ padding: "12px 14px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
          {/* Avatar with gradient ring */}
          <div style={{ flexShrink: 0, width: 74, height: 74, borderRadius: "50%", padding: 2, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#fff", padding: 2 }}>
              <img src={stage.stories[0].img} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 20 }}>
            {[[stage.posts, "posts"], [stage.followers, "followers"], [stage.following, "following"]].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>{v}</div>
                <div style={{ fontSize: 11, color: "#000" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#000", marginBottom: 2 }}>{stage.name}</div>
        <div style={{ fontSize: 11, color: "#262626", lineHeight: 1.4 }}>{stage.bio}</div>
        <div style={{ fontSize: 11, color: "#00376b", fontWeight: 600, marginTop: 2 }}>{stage.website}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 6, background: "#0095f6", color: "#fff", fontSize: 13, fontWeight: 600 }}>Follow</div>
          <div style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 6, background: "#efefef", fontSize: 13, fontWeight: 600 }}>Message</div>
          <div style={{ padding: "6px 10px", borderRadius: 6, background: "#efefef", fontSize: 12 }}>▾</div>
        </div>
      </div>
      {/* Stories */}
      <div style={{ display: "flex", gap: 12, padding: "0 14px 10px", overflowX: "auto", scrollbarWidth: "none", flexShrink: 0 }}>
        {stage.stories.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", padding: 2, background: i === 0 ? "#efefef" : "linear-gradient(45deg, #f09433, #dc2743, #bc1888)" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid #fff" }}>
                <img src={s.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <span style={{ fontSize: 9, color: "#262626" }}>{s.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", border: "1.5px dashed #dbdbdb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#dbdbdb" }}>+</div>
          <span style={{ fontSize: 9, color: "#262626" }}>New</span>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", borderTop: "0.5px solid #dbdbdb", borderBottom: "0.5px solid #dbdbdb", flexShrink: 0 }}>
        {["⊞","▷","◫"].map((icon, i) => (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", borderBottom: i===0?"1.5px solid #000":"none" }}>
            <span style={{ fontSize: 18, color: i===0?"#000":"#999" }}>{icon}</span>
          </div>
        ))}
      </div>
      {/* Photo grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.5, flex: 1, overflow: "hidden" }}>
        {stage.grid.map((src, i) => (
          <div key={i} style={{ overflow: "hidden", aspectRatio: "1" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FlierFull({ stage }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", fontFamily: "'Syne', sans-serif" }}>
      <img src={stage.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(8,6,30,.92) 0%,rgba(50,0,80,.72) 50%,rgba(0,0,0,.88) 100%)" }} />
      {/* Decorative lines */}
      <div style={{ position: "absolute", top: "10%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "90%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "10%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,.03)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>MAD AGENCY × EVENT</span>
          <div style={{ background: "rgba(167,139,250,.2)", border: "1px solid rgba(167,139,250,.4)", color: "#a78bfa", fontSize: 8, padding: "3px 12px", borderRadius: 20, letterSpacing: "0.1em" }}>EXCLUSIVE</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#a78bfa", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>{stage.sub}</div>
          <div style={{ fontSize: 58, fontWeight: 800, color: "#fff", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            {stage.title.split("\n").map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ height: 1, width: 28, background: "#a78bfa" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)", letterSpacing: "0.08em" }}>{stage.date}</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 5, letterSpacing: "0.05em" }}>{stage.venue}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ background: "#a78bfa", color: "#000", fontSize: 10, fontWeight: 700, padding: "8px 20px", borderRadius: 2, letterSpacing: "0.12em" }}>GET TICKETS</div>
          <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.45)", fontSize: 8, padding: "5px 12px", borderRadius: 2, letterSpacing: "0.1em" }}>{stage.pill}</div>
        </div>
      </div>
    </div>
  );
}

function LogoSystem({ stage }) {
  const accent = stage.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#080c10", fontFamily: "'Syne', sans-serif", padding: 28 }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>Brand Identity System</div>
      {/* Logo canvas */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, marginBottom: 18, height: 160, background: "#0d1117", border: "1px solid #1e2530", position: "relative", overflow: "hidden" }}>
        {[180,120,70].map((s,i) => <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:"0.5px solid rgba(255,255,255,.03)" }} />)}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 50, height: 50, background: accent, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 22 22" fill="none"><polygon points="11,1 21,7 21,15 11,21 1,15 1,7" fill="rgba(0,0,0,.85)" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>MAD</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: "0.38em", textTransform: "uppercase" }}>AGENCY</div>
          </div>
        </div>
      </div>
      {/* Variants */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[{ bg: accent, color: "#000" }, { bg: "#fff", color: "#000" }, { bg: "#0d1117", color: "#fff", border: "1px solid #2a3545" }].map(({ bg, color, border }, i) => (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: bg, color, border, height: 38, borderRadius: 8, fontSize: 12, fontWeight: 800, letterSpacing: "0.08em" }}>MAD</div>
        ))}
      </div>
      {/* Palette */}
      <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>PALETTE</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {[[accent,"Primary"],["#fff","White"],["#0d1117","Dark"],["#1e2530","Surface"]].map(([bg,lbl],i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
            <div style={{ width: 40, height: 40, background: bg, borderRadius: 8, border: i>1?"1px solid #2a3545":undefined }} />
            <span style={{ fontSize: 7, color: "rgba(255,255,255,.3)" }}>{lbl}</span>
          </div>
        ))}
      </div>
      {/* Type */}
      <div style={{ paddingTop: 14, borderTop: "1px solid #1e2530", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 22, fontWeight: 400, color: "#fff", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Display — DM Serif</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontFamily: "'JetBrains Mono', monospace" }}>Body — JetBrains Mono</div>
      </div>
    </div>
  );
}

function DashboardFull({ stage }) {
  const accent = stage.accent;
  const channels = [["Instagram",88],["LinkedIn",64],["Email",76],["Paid",52]];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0e0e0c", fontFamily: "'Syne', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #1a1a18", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Campaign Dashboard</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", fontFamily: "'JetBrains Mono', monospace" }}>Q4 2025 · Live</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ fontSize: 9, color: accent, fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
        </div>
      </div>
      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: "1px solid #1a1a18", flexShrink: 0 }}>
        {[["84K","Reach","+32%"],["3.2K","Converts","+18%"],["$4.20","CPA","-12%"],["6.4×","ROAS","+8%"]].map(([v,l,d],i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"12px 0", borderRight: i<3?"1px solid #1a1a18":"none" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{v}</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)" }}>{l}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: accent, fontFamily: "'JetBrains Mono', monospace" }}>{d}</div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div style={{ position: "relative", flex: 1, padding: "12px 20px 8px", minHeight: 100 }}>
        <svg style={{ position: "absolute", top: 12, left: 20, right: 20, bottom: 28, width: "calc(100% - 40px)", height: "calc(100% - 40px)" }} viewBox="0 0 300 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad${stage.accent?.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0,75,150,225,300].map((x,i)=><line key={i} x1={x} y1={0} x2={x} y2={80} stroke="#1a1a18" strokeWidth="0.5"/>)}
          <polyline points="0,65 40,52 80,38 120,44 160,22 200,14 240,8 300,4" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="0,65 40,52 80,38 120,44 160,22 200,14 240,8 300,4 300,80 0,80" fill={`url(#grad${stage.accent?.replace('#','')})`} />
        </svg>
        <div style={{ position: "absolute", bottom: 8, right: 20, display: "flex", gap: 12 }}>
          {["30d","90d","1y"].map((t,i) => <span key={i} style={{ fontSize: 8, color: i===0?accent:"rgba(255,255,255,.25)", fontFamily:"'JetBrains Mono',monospace", cursor:"pointer" }}>{t}</span>)}
        </div>
      </div>
      {/* Bars */}
      <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        {channels.map(([nm, pct], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 9, width: 60, color: "rgba(255,255,255,.4)", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>{nm}</span>
            <div style={{ flex: 1, borderRadius: 4, overflow: "hidden", height: 4, background: "#1a1a18" }}>
              <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: accent }} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: accent, width: 30, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComicFull({ stage }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", height: "100%", gap: 3, padding: 3, background: "#111" }}>
      {stage.panels.map((p, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: 5 }}>
          <img src={p.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: p.tint }} />
          <div style={{ position: "absolute", inset: 2, border: "2px solid rgba(255,255,255,.1)", borderRadius: 4, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", color: "#111", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: "9px 9px 0 9px", fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em" }}>{p.bubble}</div>
          <div style={{ position: "absolute", bottom: 10, left: 10, fontSize: 13, fontWeight: 800, color: "#fff", fontStyle: "italic", textShadow: "0 1px 6px rgba(0,0,0,.8)", fontFamily: "'DM Serif Display', serif" }}>{p.label}</div>
        </div>
      ))}
    </div>
  );
}

function RebrandSplit({ stage }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%", gap: 2 }}>
      {/* Before */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={stage.beforeImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(90%) brightness(0.6)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: 20, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>BEFORE</div>
          <div>
            <div style={{ fontSize: 8, color: "#666", marginBottom: 8 }}>Est. 2009</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,.45)", letterSpacing: "-0.01em" }}>Brand<br />Co.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              {["#c8c8c8","#888","#444"].map((c,i)=><div key={i} style={{ width:18,height:18,background:c,borderRadius:4 }}/>)}
            </div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 12 }}>Forgettable.</div>
          </div>
        </div>
      </div>
      {/* After */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={stage.afterImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,15,30,.78)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: 20, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          <div style={{ fontSize: 9, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>AFTER</div>
          <div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Rebranded 2025</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "0.08em", fontFamily: "'Syne', sans-serif" }}>MAD</div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              {["#38bdf8","#0f172a","#fff"].map((c,i)=><div key={i} style={{ width:18,height:18,background:c,borderRadius:4,border:i===2?"1px solid #333":undefined }}/>)}
            </div>
            <div style={{ fontSize: 10, color: "#38bdf8", marginTop: 12, fontWeight: 700 }}>Distinctive & clear.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintFull({ stage }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", fontFamily: "'Syne', sans-serif" }}>
      <img src={stage.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.96) 0%, rgba(0,0,0,.55) 50%, rgba(0,0,0,.15) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: 28, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>PRINT EDITORIAL</span>
          <div style={{ background: "rgba(253,230,138,.14)", border: "1px solid rgba(253,230,138,.3)", color: "#fde68a", fontSize: 8, padding: "3px 12px", borderRadius: 20 }}>{stage.pill}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#fde68a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>Annual Report</div>
          <div style={{ fontSize: 46, fontWeight: 400, color: "#fff", lineHeight: 0.95, fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
            {stage.title.split("\n").map((l,i) => <div key={i}>{l}</div>)}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginTop: 14 }}>{stage.sub}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {stage.tools.map((t,i) => <span key={i} style={{ fontSize: 9, color: "rgba(255,255,255,.45)", border: "1px solid rgba(255,255,255,.15)", padding: "4px 12px", borderRadius: 2, letterSpacing: "0.08em" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROCESS COMPONENTS ───────────────────────────────────────────────────────

function ProcessTimeline({ stage }) {
  const accent = stage.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 28, background: "#08090c", fontFamily: "'Syne', sans-serif" }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>Process</div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        {stage.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, position: "relative" }}>
            {i < stage.steps.length - 1 && (
              <div style={{ position: "absolute", left: 19, top: 38, bottom: -16, width: 1, background: `linear-gradient(to bottom, ${accent}55, transparent)` }} />
            )}
            <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${accent}`, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: accent }}>{s.icon}</div>
            <div style={{ paddingBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: accent, fontFamily: "'JetBrains Mono', monospace" }}>{s.num}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.title}</span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.44)", lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessNumbered({ stage }) {
  const accent = stage.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 28, background: "#08090c", fontFamily: "'Syne', sans-serif" }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>How We Do It</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
        {stage.steps.map((s, i) => (
          <div key={i} style={{ borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 8, background: "#0e0f13", border: "1px solid #1a1c22" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: `${accent}28`, fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: -4 }}>{s.title}</div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,.4)", lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            <div style={{ height: 2, width: 24, background: accent, borderRadius: 1, marginTop: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessChat({ stage }) {
  const accent = stage.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#08090c", fontFamily: "'Syne', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid #141418", flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#000" }}>M</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MAD Studio</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,.3)", fontFamily: "'JetBrains Mono', monospace" }}>online</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 18px", flex: 1, justifyContent: "flex-end", overflow: "hidden" }}>
        {stage.convo.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
            style={{ display: "flex", justifyContent: msg.from === "client" ? "flex-end" : "flex-start" }}
          >
            <div style={{ maxWidth: "82%", padding: "9px 13px", borderRadius: msg.from === "client" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", background: msg.from === "client" ? accent : "#141418", color: msg.from === "client" ? "#000" : "rgba(255,255,255,.8)", fontSize: 10.5, lineHeight: 1.5, fontWeight: msg.from === "client" ? 600 : 400 }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px 14px", borderTop: "1px solid #141418", flexShrink: 0 }}>
        <div style={{ flex: 1, borderRadius: 20, padding: "8px 14px", background: "#141418", fontSize: 9, color: "rgba(255,255,255,.2)", fontFamily: "'JetBrains Mono', monospace" }}>Message...</div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#000" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function ProcessBeforeAfter({ stage }) {
  const accent = stage.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 28, background: "#08090c", fontFamily: "'Syne', sans-serif" }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>The Transformation</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
        <div style={{ borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#0e0f13", border: "1px solid #1a1c22" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>{stage.before.label}</div>
          {stage.before.words.map((w,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
              <span style={{ color:"#2d2d2d", fontSize:12, flexShrink:0, marginTop:1 }}>✕</span>
              <span style={{ fontSize:11, color:"#444", lineHeight:1.4 }}>{w}</span>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#0e0f13", border: `1px solid ${accent}38` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>{stage.after.label}</div>
          {stage.after.words.map((w,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
              <span style={{ color:accent, fontSize:12, flexShrink:0, marginTop:1 }}>✓</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,.68)", lineHeight:1.4 }}>{w}</span>
            </div>
          ))}
          <div style={{ height: 2, background: `linear-gradient(to right, ${accent}, transparent)`, borderRadius: 1, marginTop: "auto" }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
        <div style={{ height: 1, flex: 1, background: "#1a1c22" }} />
        <span style={{ fontSize: 8, color: "rgba(255,255,255,.2)", letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace" }}>DELIVERED IN 3 WEEKS</span>
        <div style={{ height: 1, flex: 1, background: "#1a1c22" }} />
      </div>
    </div>
  );
}

// ─── STAGE ROUTER ─────────────────────────────────────────────────────────────
function renderStage(stage) {
  switch (stage.type) {
    case "website-mockup":  return <WebsiteMockup stage={stage} />;
    case "ig-full":         return <IgFull stage={stage} />;
    case "flier-full":      return <FlierFull stage={stage} />;
    case "logo-system":     return <LogoSystem stage={stage} />;
    case "dashboard-full":  return <DashboardFull stage={stage} />;
    case "comic-full":      return <ComicFull stage={stage} />;
    case "rebrand-split":   return <RebrandSplit stage={stage} />;
    case "print-full":      return <PrintFull stage={stage} />;
    case "process":
      switch (stage.style) {
        case "timeline":     return <ProcessTimeline stage={stage} />;
        case "numbered":     return <ProcessNumbered stage={stage} />;
        case "chat":         return <ProcessChat stage={stage} />;
        case "before-after": return <ProcessBeforeAfter stage={stage} />;
        default: return null;
      }
    default: return null;
  }
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
const HOLD = 4200;

function ServiceCard({ card, isActive }) {
  const [cur, setCur] = useState(0);
  const total = card.stages.length;
  const fillRef = useRef(null);
  const timerRef = useRef(null);
  const advance = useCallback(() => setCur(c => (c + 1) % total), [total]);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.width = "0%";
    const rAF = requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = `width ${HOLD}ms linear`;
      el.style.width = "100%";
      timerRef.current = setTimeout(advance, HOLD);
    }));
    return () => { cancelAnimationFrame(rAF); clearTimeout(timerRef.current); };
  }, [cur, advance]);

  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.72 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        flexShrink: 0,
        width: "clamp(360px, 36vw, 500px)",
        height: "min(80vh, 640px)",
        borderRadius: 22,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${isActive ? card.accent + "45" : "rgba(255,255,255,.06)"}`,
        background: "#0a0a0c",
        boxShadow: isActive ? `0 0 48px ${card.accent}20, 0 24px 64px rgba(0,0,0,.5)` : "0 8px 32px rgba(0,0,0,.3)",
        transition: "border-color .4s, box-shadow .4s",
      }}
    >
      {/* Label badge */}
      <div style={{ position: "absolute", top: 14, left: 14, zIndex: 30, background: "rgba(0,0,0,.65)", backdropFilter: "blur(10px)", border: `1px solid ${card.accent}38`, color: card.accent, fontSize: 9, fontWeight: 700, padding: "5px 11px", borderRadius: 22, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', sans-serif" }}>
        {card.label}
      </div>

      {/* Stage dots */}
      {total > 1 && (
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 30, display: "flex", gap: 6 }}>
          {card.stages.map((_, i) => (
            <button key={i} onClick={() => setCur(i)} style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${i === cur ? card.accent : "rgba(255,255,255,.22)"}`, background: i === cur ? card.accent : "rgba(0,0,0,.55)", cursor: "pointer", transition: "all .22s" }} />
          ))}
        </div>
      )}

      {/* Stages */}
      {card.stages.map((stage, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", opacity: i === cur ? 1 : 0, transition: "opacity .5s ease", pointerEvents: i === cur ? "auto" : "none" }}>
          {renderStage(stage)}
        </div>
      ))}

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,.04)", zIndex: 20 }}>
        <div ref={fillRef} style={{ height: "100%", background: card.accent, width: "0%" }} />
      </div>
    </motion.div>
  );
}

// ─── CARDS REEL ───────────────────────────────────────────────────────────────
function CardsReel({ dark, progress }) {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = progress * maxScroll;
    el.scrollLeft = target;
    const cardW = el.querySelector("[data-card]")?.offsetWidth ?? 460;
    setActiveIdx(Math.min(Math.round(target / (cardW + 20)), SERVICE_CARDS.length - 1));
  }, [progress]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "36px 48px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.35)", marginBottom: 7, fontFamily: "'JetBrains Mono', monospace", margin: "0 0 7px" }}>
            Our Work Reel &nbsp;·&nbsp; {activeIdx + 1} / {SERVICE_CARDS.length}
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: dark ? "#fff" : "#0a0a0c", fontSize: "clamp(28px,3.8vw,52px)", lineHeight: 1, margin: 0 }}>
            Services in motion.
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 90, height: 2, background: "rgba(255,255,255,.08)", borderRadius: 1, overflow: "hidden" }}>
            <motion.div style={{ height: "100%", borderRadius: 1, background: SERVICE_CARDS[activeIdx]?.accent ?? "#fff" }} animate={{ width: `${Math.round(progress * 100)}%` }} transition={{ duration: 0.06 }} />
          </div>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.28)", fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(progress * 100)}%</span>
        </div>
      </div>

      {/* Card track */}
      <div
        ref={trackRef}
        style={{ display: "flex", gap: 20, paddingLeft: 48, paddingRight: 48, paddingBottom: 36, flex: 1, alignItems: "center", overflowX: "hidden", overflowY: "hidden", scrollbarWidth: "none" }}
      >
        {SERVICE_CARDS.map((card, i) => (
          <div key={card.id} data-card style={{ flexShrink: 0 }}>
            <ServiceCard card={card} isActive={i === activeIdx} />
          </div>
        ))}
        <div style={{ flexShrink: 0, width: 48 }} />
      </div>
    </div>
  );
}

// ─── HERO PROGRESS BAR ────────────────────────────────────────────────────────
function HeroProgressBar({ duration, running, onComplete }) {
  const fillRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    el.style.transition = "none"; el.style.width = "0%";
    if (!running) return;
    let start = null;
    const step = ts => { if (!start) start = ts; const p = Math.min(((ts - start) / duration) * 100, 100); el.style.width = `${p}%`; if (p < 100) rafRef.current = requestAnimationFrame(step); else onComplete(); };
    const id = requestAnimationFrame(() => { el.style.transition = `width ${duration}ms linear`; rafRef.current = requestAnimationFrame(step); });
    return () => { cancelAnimationFrame(id); cancelAnimationFrame(rafRef.current); };
  }, [running, duration]);
  return (
    <div style={{ width: "100%", height: 1.5, borderRadius: 1, background: "rgba(0,0,0,.1)" }}>
      <div ref={fillRef} style={{ height: "100%", borderRadius: 1, background: "#1980c2", width: "0%" }} />
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function WhatWeDo() {
  const { dark } = useTheme();
  const wrapRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroCur, setHeroCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const HERO_DURATION = 5500;

  // Scroll: 380vh total
  // 0–0.30  → Hero grid
  // 0.28–0.44 → Crossfade to reel
  // 0.44–1.0 → Cards reel (horizontal pan)
  useEffect(() => {
    const fn = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const total = wrapRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setScrollProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const heroNext = useCallback(() => setHeroCur(c => (c + 1) % SERVICES.length), []);
  const heroPrev = useCallback(() => setHeroCur(c => (c - 1 + SERVICES.length) % SERVICES.length), []);
  const svc = SERVICES[heroCur];

  const heroT  = 1 - Math.min(1, Math.max(0, (scrollProgress - 0.28) / 0.15));
  const reelT  = Math.min(1, Math.max(0, (scrollProgress - 0.36) / 0.13));
  const cardsP = Math.min(1, Math.max(0, (scrollProgress - 0.44) / 0.56));

  return (
    <section ref={wrapRef} id="services" style={{ position: "relative", height: "380vh", background: dark ? "#252523" : "#f5f5f3" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: dark ? "linear-gradient(180deg,#181817 0%,#0f0f0e 100%)" : "linear-gradient(180deg,#f8f8f7 0%,#e8edf0 100%)" }}
      >
        {/* Top vignette */}
        <div style={{ position: "absolute", inset: "0 0 auto 0", height: 80, background: "linear-gradient(to bottom,rgba(0,0,0,.55),transparent)", pointerEvents: "none", zIndex: 30 }} />

        {/* ── HERO GRID ──────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-10"
          animate={{ opacity: heroT, scale: 0.94 + heroT * 0.06, y: (1 - heroT) * -40 }}
          transition={{ duration: 0.08, ease: "linear" }}
          style={{ padding: "22px 4px 4px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 0.67fr", gap: 4, pointerEvents: heroT > 0.15 ? "auto" : "none" }}
        >
          {/* Large left image */}
          <div className="relative overflow-hidden rounded-sm" style={{ gridRow: "1 / 3" }}>
            {SERVICES.map((s, i) => <img key={i} src={s.wide} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: i === heroCur ? 1 : 0 }} />)}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.08) 55%,transparent 100%)" }} />
            <div className="absolute bottom-8 left-0 right-0 text-center px-6">
              <p className="text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(22px,2.8vw,36px)", lineHeight: 1.15 }}>{svc.tagline}</p>
              <button className="text-white rounded-full font-bold tracking-wider uppercase cursor-pointer px-6 py-2.5 border border-white/30" style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", fontSize: 10, fontFamily: "'Syne', sans-serif" }}>Start a Project</button>
            </div>
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full font-bold uppercase" style={{ background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.5)", backdropFilter: "blur(6px)", fontSize: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.28em" }}>{svc.tag} / 0{SERVICES.length}</span>
            </div>
          </div>

          {/* Top right */}
          <div className="relative overflow-hidden rounded-sm">
            {SERVICES.map((s, i) => <img key={i} src={s.top} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: i === heroCur ? 1 : 0, objectPosition: "center 40%" }} />)}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "clamp(24px,3vw,38px)" }}>MAD</span>
                <span className="text-white/40 font-light text-xl">×</span>
                <span className="text-white font-black tracking-wider uppercase" style={{ fontSize: "clamp(16px,2.2vw,26px)", fontFamily: "'Syne', sans-serif" }}>{svc.shortTag}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-1.5">
              {SERVICES.map((_, i) => <button key={i} onClick={() => setHeroCur(i)} className="rounded-full cursor-pointer transition-all duration-300" style={{ width: 24, height: 24, border: `1.5px solid ${i === heroCur ? "#fff" : "rgba(255,255,255,.28)"}`, background: i === heroCur ? "#fff" : "transparent" }} />)}
            </div>
          </div>

          {/* Bottom right grid */}
          <div className="grid rounded-sm overflow-hidden" style={{ gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            <div className="relative overflow-hidden rounded-sm flex flex-col justify-between p-5" style={{ background: dark ? "linear-gradient(145deg,#181817,#102535 58%,rgba(25,128,194,.72))" : "linear-gradient(145deg,#ffffff,#eef7fd)", border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}` }}>
              <div>
                <p style={{ fontSize: 7, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: 10 }}>Start a Project</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(20px,2.2vw,28px)", color: dark ? "#f0ede8" : "#181817", lineHeight: 1.2, margin: 0 }}>Work With MAD</h3>
              </div>
              <button style={{ alignSelf: "flex-start", padding: "10px 20px", borderRadius: 30, fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: dark ? "#1980c2" : "#181817", border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>Let's Talk →</button>
            </div>
            <div className={`rounded-sm p-5 flex flex-col justify-between ${dark ? "bg-[#1e1e1c]" : "bg-white"}`}>
              <div className={`border-2 rounded-sm p-3 mb-3 ${dark ? "border-white/90" : "border-[#181817]"}`}>
                <div className={`font-black leading-tight tracking-tight ${dark ? "text-white/90" : "text-[#181817]"}`} style={{ fontSize: "clamp(13px,1.3vw,16px)", fontFamily: "'Syne', sans-serif" }}>{svc.label}</div>
              </div>
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                  {SERVICES.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 6, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, width: 13, flexShrink: 0, color: i === heroCur ? "#4a4a48" : "#d0d0ce" }}>{s.tag}</span>
                      <div style={{ flex: 1 }}>
                        {i === heroCur ? <HeroProgressBar duration={HERO_DURATION} running={!paused} onComplete={heroNext} /> : <div style={{ height: 1.5, borderRadius: 1, background: i < heroCur ? "#b0b0ac" : "#e8e8e6" }} />}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {[{ fn: heroPrev, d: "M14 6L8 12l6 6" }, { fn: heroNext, d: "M10 6l6 6-6 6" }].map(({ fn, d }, i) => (
                    <button key={i} onClick={fn} style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d={d} stroke={dark ? "rgba(240,237,232,.65)" : "#6b6b68"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  ))}
                  <button onClick={() => setPaused(p => !p)} style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#e8e8e6"}`, background: "transparent", cursor: "pointer", fontSize: 11, color: dark ? "rgba(240,237,232,.65)" : "#6b6b68" }}>{paused ? "▶" : "⏸"}</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CARDS REEL ─────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-20"
          animate={{ opacity: reelT, y: (1 - reelT) * 50 }}
          transition={{ duration: 0.08, ease: "linear" }}
          style={{ pointerEvents: reelT > 0.2 ? "auto" : "none" }}
        >
          <CardsReel dark={dark} progress={cardsP} />
        </motion.div>

        {/* ── SCROLL CUE ─────────────────────────────────────────── */}
        <AnimatePresence>
          {cardsP > 0.93 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 9, color: "rgba(255,255,255,.32)", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Continue scrolling</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}