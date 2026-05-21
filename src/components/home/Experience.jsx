import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { homeCms } from "@/data/homeCms";
import { useCms } from "@/context/CmsContext";

// ─── Typing animation ─────────────────────────────────────────────────────────
function TypingText({ text, inView, delay = 0, className = "" }) {
  const texts = Array.isArray(text) ? text : [text];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      setDone(false);
      setIndex(0);
      return;
    }
    let charIndex = 0;
    let charTimer = null;
    let startTimer = null;
    const startTyping = () => {
      const current = texts[index] || "";
      setDisplayed("");
      setDone(false);
      charIndex = 0;
      charTimer = setInterval(() => {
        charIndex += 1;
        setDisplayed(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          clearInterval(charTimer);
          setDone(true);
          startTimer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % texts.length);
          }, 900);
        }
      }, 55);
    };
    startTimer = setTimeout(startTyping, delay * 1000);
    return () => {
      clearTimeout(startTimer);
      clearInterval(charTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, index, delay, text]);

  return (
    <span className={className}>
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

function TypingTexts({ text, inView, delay = 0, className = "", chunkSize = 1 }) {
  const texts = Array.isArray(text) ? text : [text];
  const chunks = [];
  for (let i = 0; i < texts.length; i += chunkSize) {
    chunks.push(texts.slice(i, i + chunkSize).join(", "));
  }
  const [chunkIdx, setChunkIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      setDone(false);
      setChunkIdx(0);
      return;
    }
    let charIndex = 0;
    let charTimer = null;
    let startTimer = null;
    const startTyping = () => {
      const current = chunks[chunkIdx] ?? "";
      setDisplayed("");
      setDone(false);
      charIndex = 0;
      charTimer = setInterval(() => {
        charIndex += 1;
        setDisplayed(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          clearInterval(charTimer);
          setDone(true);
          startTimer = setTimeout(() => {
            setChunkIdx((prev) => (prev + 1) % chunks.length);
          }, 1200);
        }
      }, 55);
    };
    startTimer = setTimeout(startTyping, delay * 1000);
    return () => {
      clearTimeout(startTimer);
      clearInterval(charTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, chunkIdx]);

  return (
    <span className={className}>
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

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(end, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTs = null;
    let raf;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return val;
}

// ─── Stage map ────────────────────────────────────────────────────────────────
const STAGES = [
  {
    needIdx: -1,
    approachIdx: -1,
    solutionIdx: -1,
    navLabel: "Dashboard",
    pageKey: "dashboard",
    url: "trubilling.com/dashboard",
  },
  {
    needIdx: 1,
    approachIdx: 1,
    solutionIdx: 1,
    navLabel: "Invoice",
    pageKey: "newInvoice",
    url: "trubilling.com/invoice/new",
  },
  {
    needIdx: 3,
    approachIdx: 3,
    solutionIdx: 3,
    navLabel: "Payments",
    pageKey: "paymentsList",
    url: "trubilling.com/payments",
  },
  {
    needIdx: 3,
    approachIdx: 3,
    solutionIdx: 4,
    navLabel: "Payments",
    pageKey: "paymentsAnalytics",
    url: "trubilling.com/payments/analytics",
  },
];

const TB = "#C2411D";

// ─── Static data ──────────────────────────────────────────────────────────────
const INVOICE_ROWS = [
  ["#3066", "Marvin McKinney", "210.00", "Jan 6, 2022", "Paid"],
  ["#3065", "Jerome Bell", "120,000.00", "Jan 6, 2022", "Paid"],
  ["#3064", "Jenny Wilson", "266.00", "Jan 6, 2022", "Cancelled"],
  ["#3063", "Savannah Nguyen", "1,878.50", "Jan 5, 2022", "Paid"],
  ["#3062", "Cameron Williamson", "23.67", "Jan 5, 2022", "Refunded"],
  ["#3066", "Marvin McKinney", "92.76", "Jan 6, 2022", "Paid"],
  ["#3065", "Jerome Bell", "11.38", "Jan 6, 2022", "Paid"],
];
const PAYMENT_ROWS = [
  ["#3066", "Jan 6, 2022", "Bank Transfer", "Domain and Hosting", "210.00"],
  ["#3065", "Jan 6, 2022", "Bank Transfer", "Development of mobile application...", "120,000.00"],
  ["#3064", "Jan 6, 2022", "Cash", "Client website development", "266.00"],
  ["#3063", "Jan 5, 2022", "Mobile Money", "Monthly social media management", "1,878.50"],
  ["#3062", "Jan 5, 2022", "Bank Transfer", "Domain and Hosting", "23.67"],
  ["#3066", "Jan 6, 2022", "Card", "Development of mobile application...", "92.76"],
  ["#3065", "Jan 6, 2022", "Card", "Client website development", "11.38"],
  ["#3064", "Jan 6, 2022", "Mobile Money", "Monthly social media management", "283.94"],
  ["#3063", "Jan 5, 2022", "Card", "Domain and Hosting", "207.49"],
  ["#3062", "Jan 5, 2022", "Card", "Development of mobile application...", "37.60"],
];

// ─── Shared micro-components ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Paid: { color: "#1a7a4a", bg: "rgba(26,122,74,.1)", icon: "✓" },
    Cancelled: { color: "#c2411d", bg: "rgba(194,65,29,.1)", icon: "✕" },
    Refunded: { color: "#6b7280", bg: "rgba(107,114,128,.1)", icon: "↩" },
  };
  const s = map[status] || { color: "#555", bg: "#f0f0f0", icon: "" };
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 99, padding: "1px 5px", fontSize: 5, fontWeight: 700, whiteSpace: "nowrap" }}>
      {s.icon} {status}
    </span>
  );
}

function PageHeader({ crumb, title, btnLabel, btnIcon }) {
  return (
    <div style={{ marginBottom: 5 }}>
      <div style={{ fontSize: 6.5, color: "#aaa", marginBottom: 2 }}>
        <span style={{ color: TB }}>Dashboard</span> ›{" "}
        <span style={{ fontWeight: 700, color: "#333" }}>{crumb}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: TB }}>{title}</span>
        {btnLabel && (
          <div style={{ background: TB, borderRadius: 99, padding: "2px 8px", display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 6, fontWeight: 700, color: "#fff" }}>{btnLabel}</span>
            {btnIcon && <span style={{ fontSize: 7, color: "#fff" }}>{btnIcon}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterBar({ placeholder }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5, padding: "3px 0", borderBottom: "1px solid #eee" }}>
      <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 5, padding: "2px 6px" }}>
        <span style={{ fontSize: 6.5, color: "#555", fontWeight: 500 }}>Jan 6 – Jan 13, 2022</span>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 5, padding: "2px 6px" }}>
        <span style={{ fontSize: 6.5, color: "#555" }}>≡ Filters</span>
      </div>
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 5, padding: "2px 7px" }}>
        <span style={{ fontSize: 6.5, color: "#bbb" }}>{placeholder}</span>
      </div>
    </div>
  );
}

function Tabs({ items, active }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: 5 }}>
      {items.map(({ label, badge }, i) => {
        const isActive = i === active;
        return (
          <div key={label} style={{ padding: "3px 8px", borderBottom: isActive ? `2px solid ${TB}` : "2px solid transparent", marginBottom: -1, display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 6, fontWeight: isActive ? 700 : 500, color: isActive ? TB : "#888" }}>{label}</span>
            {badge && (
              <div style={{ background: TB, borderRadius: 99, width: 10, height: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 5, color: "#fff", fontWeight: 700 }}>{badge}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Stage 0: Dashboard ───────────────────────────────────────────────────────
function DashboardPage() {
  const invRaw = useCountUp(22809500, 1600);
  const quoRaw = useCountUp(4760000, 1400);
  const vatRaw = useCountUp(611250, 1200);
  const fmt = (n) => `₦${n.toLocaleString()}.00`;

  const STATS = [
    { label: "Invoices", value: fmt(invRaw), icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6", color: TB },
    { label: "Quotes", value: fmt(quoRaw), icon: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", color: "#1a7a4a" },
    { label: "VAT Paid", value: fmt(vatRaw), icon: "M20.84 4.61a6.5 6.5 0 00-7.78 0L12 5.67l-1.06-1.06a6.5 6.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a6.5 6.5 0 000-7.78z", color: "#2563eb" },
  ];
  const BAR_DATA = [28, 16, 22, 12, 30, 9, 20, 16, 24, 10, 18, 13];

  return (
    <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, color: "#1c1a18" }}>Welcome Segun</div>
          <div style={{ fontSize: 6.5, color: "#aaa", maxWidth: 200 }}>Your financial summary at a glance.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, background: "#fff", border: "1px solid #eee", borderRadius: 5, padding: "2px 6px" }}>
          <span style={{ fontSize: 6, color: TB }}>📅</span>
          <span style={{ fontSize: 6.5, color: "#555", fontWeight: 500 }}>Jan 6 – Jan 13, 2022</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
        {STATS.map(({ label, value, icon, color }, i) => (
          <div key={label} style={{ background: "#fff", borderRadius: 7, padding: "5px 7px", border: "1px solid #eee", animation: `fadeSlideUp 0.45s ease ${i * 0.09}s both` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                  <path d={icon} />
                </svg>
              </div>
              <span style={{ fontSize: 5, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
            </div>
            <div style={{ fontSize: 8, fontWeight: 900, color: "#1c1a18", lineHeight: 1, marginBottom: 1, fontVariantNumeric: "tabular-nums" }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 5, color: "#1a7a4a", fontWeight: 700 }}>↑ 100%</span>
              <span style={{ fontSize: 4.5, color: "#aaa" }}>vs last month</span>
            </div>
            <div style={{ height: 2, background: "#f0f0ee", borderRadius: 99, marginTop: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${color}60,${color})`, animation: `statBarFill 1.6s ease ${i * 0.15}s both` }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <div style={{ background: "#fff", borderRadius: 7, padding: "5px 7px", border: "1px solid #eee", animation: "fadeSlideUp 0.45s ease 0.3s both" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Income Flow</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 3 }}>April 2 – April 24, 2024</div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
              <circle cx="23" cy="23" r="16" fill="none" stroke="#eee" strokeWidth="7" />
              <circle cx="23" cy="23" r="16" fill="none" stroke="#4b5680" strokeWidth="7" strokeDasharray="55 45" strokeDashoffset="0" transform="rotate(-90 23 23)" style={{ animation: "dashLoop 3s ease-in-out infinite" }} />
              <circle cx="23" cy="23" r="16" fill="none" stroke="#8fa05a" strokeWidth="7" strokeDasharray="25 75" strokeDashoffset="-55" transform="rotate(-90 23 23)" style={{ animation: "dashLoop 3s ease-in-out 0.8s infinite" }} />
              <circle cx="23" cy="23" r="16" fill="none" stroke="#2dab81" strokeWidth="7" strokeDasharray="8 92" strokeDashoffset="-80" transform="rotate(-90 23 23)" style={{ animation: "dashLoop 3s ease-in-out 1.6s infinite" }} />
              <text x="23" y="21" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1c1a18">10</text>
              <text x="23" y="28" textAnchor="middle" fontSize="5" fill="#aaa">Trans.</text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[["#8fa05a", "Service Invoices", "₦10M", "↑ 11%"], ["#2dab81", "Payments Recv'd", "₦4.9M", "↑ 12%"], ["#4b5680", "Outstanding", "₦2.1M", "↓ 3%"]].map(([c, l, v, ch]) => (
                <div key={l}>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: c }} />
                    <span style={{ fontSize: 5, color: "#888" }}>{l}</span>
                  </div>
                  <div style={{ fontSize: 6.5, fontWeight: 800, color: TB }}>
                    {v} <span style={{ fontSize: 5, color: ch.startsWith("↓") ? "#e05a4e" : "#1a7a4a" }}>{ch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 7, padding: "5px 7px", border: "1px solid #eee", animation: "fadeSlideUp 0.45s ease 0.38s both" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Expense Categories</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 3 }}>April 2 – April 24, 2024</div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="40" height="40" viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
              <circle cx="23" cy="23" r="16" fill="none" stroke="#eee" strokeWidth="7" />
              <circle cx="23" cy="23" r="16" fill="none" stroke={TB} strokeWidth="7" strokeDasharray="45 55" strokeDashoffset="0" transform="rotate(-90 23 23)" style={{ animation: "dashLoop 2.8s ease-in-out 0.3s infinite" }} />
              <circle cx="23" cy="23" r="16" fill="none" stroke="#2dab81" strokeWidth="7" strokeDasharray="35 65" strokeDashoffset="-45" transform="rotate(-90 23 23)" style={{ animation: "dashLoop 2.8s ease-in-out 1.1s infinite" }} />
              <circle cx="23" cy="23" r="16" fill="none" stroke="#e0e0de" strokeWidth="7" strokeDasharray="20 80" strokeDashoffset="-80" transform="rotate(-90 23 23)" />
              <text x="23" y="21" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1c1a18">1M</text>
              <text x="23" y="28" textAnchor="middle" fontSize="5" fill="#aaa">Categ.</text>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[[TB, "Adv & Marketing", "800K", "↓ 13%"], ["#2dab81", "Website & Soft.", "200K", "↑ 3%"], ["#888", "Rent & Mortgage", "5M", "↑ 1%"]].map(([c, l, v, ch]) => (
                <div key={l}>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: c }} />
                    <span style={{ fontSize: 5, color: "#888" }}>{l}</span>
                  </div>
                  <div style={{ fontSize: 6.5, fontWeight: 800, color: "#333" }}>
                    {v} <span style={{ fontSize: 5, color: ch.startsWith("↓") ? "#e05a4e" : "#1a7a4a" }}>{ch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <div style={{ background: "#fff", borderRadius: 7, padding: "5px 7px", border: "1px solid #eee", animation: "fadeSlideUp 0.45s ease 0.46s both" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Monthly Income Flow</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 2 }}>April 2 – April 24, 2024</div>
          <svg width="100%" height="32" viewBox="0 0 220 32" preserveAspectRatio="none">
            {BAR_DATA.map((h, i) => (
              <rect key={i} x={i * 18 + 2} y={32 - h} width={12} height={h} rx="2" fill={i % 2 === 0 ? TB : "#2dab81"} opacity="0.85"
                style={{ animation: `barGrowLoop 2.5s ease-in-out ${i * 0.12}s infinite`, transformOrigin: "bottom" }} />
            ))}
          </svg>
          <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
            {[[TB, "Invoice Avg ↑1%"], ["#2dab81", "₦708,557 ↑1%"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: 1, background: c }} />
                <span style={{ fontSize: 5, color: "#555" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 7, padding: "5px 7px", border: "1px solid #eee", animation: "fadeSlideUp 0.45s ease 0.54s both" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Total Profit</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 1 }}>April 2 – April 24, 2024</div>
          <div style={{ fontSize: 9.5, fontWeight: 900, color: "#1c1a18", marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>₦1,086,166.67</div>
          <svg width="100%" height="26" viewBox="0 0 200 26" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dab81" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2dab81" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,22 C15,20 30,24 50,16 C70,8 90,13 110,9 C130,5 155,7 175,3 L200,2 L200,26 L0,26Z" fill="url(#pg2)" />
            <path d="M0,22 C15,20 30,24 50,16 C70,8 90,13 110,9 C130,5 155,7 175,3 L200,2" fill="none" stroke="#2dab81" strokeWidth="1.5" style={{ animation: "drawLineLoop 4s ease-in-out infinite" }} />
          </svg>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 7, border: "1px solid #eee", overflow: "hidden", animation: "fadeSlideUp 0.45s ease 0.62s both" }}>
        <div style={{ display: "grid", gridTemplateColumns: "14px 28px 1fr 34px 26px 28px", padding: "2px 7px", background: "#fafaf8", borderBottom: "1px solid #eee" }}>
          {["S/N", "Invoice", "Customer", "Amount", "Due", "Status"].map((h) => (
            <span key={h} style={{ fontSize: 5, fontWeight: 700, color: TB }}>{h}</span>
          ))}
        </div>
        {INVOICE_ROWS.slice(0, 4).map(([inv, cust, amt, due, st], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "14px 28px 1fr 34px 26px 28px", padding: "2px 7px", borderBottom: "1px solid #f5f5f2", alignItems: "center", animation: `rowIn 0.3s ease ${i * 0.05}s both` }}>
            <span style={{ fontSize: 5, color: "#888" }}>{i + 1}</span>
            <span style={{ fontSize: 5, color: TB, fontWeight: 700 }}>{inv}</span>
            <span style={{ fontSize: 5, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cust}</span>
            <span style={{ fontSize: 5, fontWeight: 600, color: "#333" }}>{amt}</span>
            <span style={{ fontSize: 5, color: "#888" }}>{due.split(",")[0]}</span>
            <StatusBadge status={st} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stage 1: New Invoice ─────────────────────────────────────────────────────
function NewInvoicePage() {
  return (
    <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 5, color: "#aaa" }}>
        <span style={{ color: TB }}>Dashboard</span> › <span style={{ color: TB }}>Invoice</span> › <span style={{ fontWeight: 700, color: "#333" }}>New Invoice</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: "#1c1a18" }}>New Invoice</span>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 20, padding: "2px 9px" }}>
            <span style={{ fontSize: 6, color: "#555" }}>Cancel</span>
          </div>
          <div style={{ background: TB, borderRadius: 20, padding: "2px 9px" }}>
            <span style={{ fontSize: 6, fontWeight: 700, color: "#fff" }}>Submit</span>
          </div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #eee" }} />
      {[
        ["Invoice Currency", "The total amount will be calculated in this currency", "Placeholder", true, false],
        ["Contact", null, "Placeholder", true, false],
        ["Due Date", null, null, false, true],
        ["Tax Type", "The tax type selected here will affect the total amount", "VAT", true, false],
      ].map(([label, sub, val, isDropdown, isDate]) => (
        <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 8, alignItems: "center", paddingBottom: 5, borderBottom: "1px solid #f5f5f2" }}>
          <div>
            <div style={{ fontSize: 6, fontWeight: 600, color: "#333" }}>{label}</div>
            {sub && <div style={{ fontSize: 5, color: "#aaa", marginTop: 1, lineHeight: 1.3 }}>{sub}</div>}
          </div>
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "2px 7px", display: "flex", alignItems: "center", gap: 3, background: "#fff" }}>
            {isDate && <span style={{ fontSize: 7, color: TB }}>🗓</span>}
            <span style={{ fontSize: 6.5, color: val ? "#333" : "#bbb", flex: 1 }}>{val || "Select date"}</span>
            {isDropdown && <span style={{ fontSize: 6, color: "#aaa" }}>∨</span>}
          </div>
        </div>
      ))}
      <div style={{ border: `1.5px dashed rgba(194,65,29,.35)`, borderRadius: 7, padding: "6px", textAlign: "center" }}>
        <span style={{ fontSize: 6.5, fontWeight: 700, color: TB }}>+ &nbsp; Add an item</span>
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr 0.7fr 1fr 0.6fr", padding: "2px 7px", background: "#fafaf8", borderBottom: "1px solid #eee" }}>
          {["Title", "Unit Amount", "Quantity", "Discount", "Total Amount", "Actions"].map((h) => (
            <span key={h} style={{ fontSize: 5, fontWeight: 700, color: TB }}>{h}</span>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "10px 0", fontSize: 6.5, color: "#bbb" }}>No items added yet</div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 7px", borderTop: "1px solid #eee" }}>
          <span style={{ fontSize: 6.5, fontWeight: 600, color: "#333" }}>Total Amount</span>
          <span style={{ fontSize: 6.5, fontWeight: 700, color: "#555" }}>-</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 8, alignItems: "start" }}>
        <div style={{ fontSize: 6, fontWeight: 600, color: "#333" }}>Quote Comment</div>
        <div>
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "6px 7px", minHeight: 30, background: "#fff" }}>
            <span style={{ fontSize: 6.5, color: "#bbb" }}>Type your message...</span>
          </div>
          <span style={{ fontSize: 5, color: "#aaa" }}>263 characters left</span>
        </div>
      </div>
    </div>
  );
}

// ─── Shared product sidebar ───────────────────────────────────────────────────
function ProductPanel() {
  return (
    <div style={{ width: 75, background: "#fff", borderLeft: "1px solid #eee", padding: "6px 5px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 6 }}>Select a product</div>
      {[1, 2].map((i) => (
        <div key={i} style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 5px", marginBottom: 5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
            <span style={{ background: "#f0f0ee", borderRadius: 3, padding: "1px 4px", fontSize: 5, color: "#666" }}>Service</span>
            <span style={{ fontSize: 5, fontWeight: 700, color: "#333" }}>210.00 USD</span>
          </div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1c1a18", marginBottom: 1 }}>Application development</div>
          <div style={{ fontSize: 5, color: "#888", lineHeight: 1.3 }}>Development of mobile application</div>
        </div>
      ))}
      <div style={{ fontSize: 6, color: TB, fontWeight: 600, marginTop: "auto", textAlign: "center" }}>+ Add a new product</div>
    </div>
  );
}

// ─── Stage 2: Invoice Item Modal ──────────────────────────────────────────────
function InvoiceItemModalPage() {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ opacity: 0.22, padding: "6px 10px" }}>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 3 }}>Dashboard › Invoice › New Invoice</div>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#1c1a18", marginBottom: 5 }}>New Invoice</div>
          {[["Invoice Currency", "Placeholder"], ["Contact", "Placeholder"], ["Due Date", "Select date"], ["Tax Type", "VAT"]].map(([l, v]) => (
            <div key={l} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 6, paddingBottom: 5, borderBottom: "1px solid #f5f5f2", marginBottom: 5 }}>
              <span style={{ fontSize: 6, fontWeight: 600, color: "#333" }}>{l}</span>
              <span style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "2px 7px", fontSize: 6.5, color: "#888" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(220,220,218,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", width: "82%", boxShadow: "0 20px 60px rgba(0,0,0,.22)", border: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 8.5, fontWeight: 800, color: TB }}>Invoice Item</span>
              <div style={{ width: 12, height: 12, borderRadius: 3, border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 6, color: "#aaa" }}>✕</span>
              </div>
            </div>
            {[["Description", "Development of mobile application and admin dashboard"], ["Category", "Service"]].map(([l, v]) => (
              <div key={l} style={{ marginBottom: 5 }}>
                <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>{l}</div>
                <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "4px 7px" }}>
                  <span style={{ fontSize: 6.5, color: "#333" }}>{v}</span>
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 5 }}>
              {[["Unit Price", "210.00"], ["Quantity", "320"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>{l}</div>
                  <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "3px 7px" }}>
                    <span style={{ fontSize: 6.5, color: "#333" }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
              {[["Payment Method", "Cash"], ["Discount", "VAT"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>{l}</div>
                  <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "3px 7px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 6.5, color: "#333" }}>{v}</span>
                    <span style={{ fontSize: 6, color: "#aaa" }}>∨</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: TB, borderRadius: 20, padding: "4px 0", textAlign: "center" }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: "#fff" }}>Confirm</span>
            </div>
          </div>
        </div>
      </div>
      <ProductPanel />
    </div>
  );
}

// ─── Stage 3: Add Item Modal ──────────────────────────────────────────────────
function AddItemModalPage() {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ opacity: 0.22, padding: "6px 10px" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#1c1a18", marginBottom: 4 }}>New Invoice</div>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(220,220,218,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20 }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", width: "82%", boxShadow: "0 20px 60px rgba(0,0,0,.22)", border: "1px solid #eee" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: TB }}>Add an Item</span>
            </div>
            {[["Product Name", "Placeholder"], ["Product Number", "Placeholder"], ["Product Price", "Placeholder"]].map(([l, ph]) => (
              <div key={l} style={{ marginBottom: 5 }}>
                <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>{l}</div>
                <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "4px 7px" }}>
                  <span style={{ fontSize: 6.5, color: "#bbb" }}>{ph}</span>
                </div>
              </div>
            ))}
            <div style={{ marginBottom: 5 }}>
              <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>Product Type</div>
              <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "3px 7px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 6.5, color: "#bbb" }}>Placeholder</span>
                <span style={{ fontSize: 6, color: "#aaa" }}>∨</span>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 6.5, fontWeight: 600, color: "#333", marginBottom: 2 }}>Description</div>
              <div style={{ border: "1px solid #e0e0e0", borderRadius: 5, padding: "6px", minHeight: 24, background: "#fafaf8" }} />
            </div>
            <div style={{ background: TB, borderRadius: 20, padding: "4px 0", textAlign: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: "#fff" }}>Confirm</span>
            </div>
            <div style={{ border: "1.5px solid #ddd", borderRadius: 20, padding: "3px 0", textAlign: "center" }}>
              <span style={{ fontSize: 6.5, color: "#333" }}>Cancel</span>
            </div>
          </div>
        </div>
      </div>
      <ProductPanel />
    </div>
  );
}

// ─── Stage 4: Payments List ───────────────────────────────────────────────────
function PaymentsListPage() {
  return (
    <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeader crumb="Payments" title="Payments" />
      <Tabs items={[{ label: "All Invoices" }, { label: "Analytics" }]} active={0} />
      <FilterBar placeholder="Search for Payments" />
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 7, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "12px 28px 38px 38px 1fr 40px 18px", padding: "2px 7px", background: "#fafaf8", borderBottom: "1px solid #eee" }}>
          {["S/N", "Inv.", "Date", "Method", "Notes", "Amount", ""].map((h) => (
            <span key={h} style={{ fontSize: 5, fontWeight: 700, color: TB }}>{h}</span>
          ))}
        </div>
        {PAYMENT_ROWS.slice(0, 7).map(([inv, date, method, notes, amt], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "12px 28px 38px 38px 1fr 40px 18px", padding: "2px 7px", borderBottom: "1px solid #f5f5f2", alignItems: "center", animation: `rowIn 0.25s ease ${i * 0.04}s both` }}>
            <span style={{ fontSize: 5, color: "#888" }}>{i + 1}</span>
            <span style={{ fontSize: 5, fontWeight: 700, color: TB }}>{inv}</span>
            <span style={{ fontSize: 5, color: "#888" }}>{date.split(",")[0]}</span>
            <span style={{ fontSize: 5, color: "#555" }}>{method}</span>
            <span style={{ fontSize: 5, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{notes}</span>
            <span style={{ fontSize: 5, fontWeight: 600, color: "#333" }}>{amt}</span>
            <div style={{ display: "flex", gap: 2 }}>
              <span style={{ fontSize: 6.5, color: "#ddd" }}>🗑</span>
              <span style={{ fontSize: 6.5, color: "#ddd" }}>✏️</span>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 7px", borderTop: "1px solid #eee", background: "#fafaf8" }}>
          <span style={{ fontSize: 6.5, color: "#888" }}>Page 1 of 10</span>
          <div style={{ display: "flex", gap: 3 }}>
            {["← Prev", "Next →"].map((l) => (
              <div key={l} style={{ border: "1px solid #eee", borderRadius: 5, padding: "1px 6px" }}>
                <span style={{ fontSize: 6.5, color: "#555" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stage 5: Payments Analytics ─────────────────────────────────────────────
function PaymentsAnalyticsPage() {
  return (
    <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeader crumb="Payments" title="Payments" />
      <Tabs items={[{ label: "All Payments" }, { label: "Analytics" }]} active={1} />
      <FilterBar placeholder="Search for Payments" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 5 }}>
        <div style={{ background: "#fff", borderRadius: 7, padding: "6px 7px", border: "1px solid #eee" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Income Flow</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 5 }}>April 2 – April 24, 2024</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <svg width="62" height="62" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="26" fill="none" stroke="#eee" strokeWidth="10" />
              <circle cx="35" cy="35" r="26" fill="none" stroke="#4b5680" strokeWidth="10" strokeDasharray="88 76" strokeDashoffset="0" transform="rotate(-90 35 35)" style={{ animation: "dashLoop 3s ease-in-out infinite" }} />
              <circle cx="35" cy="35" r="26" fill="none" stroke="#8fa05a" strokeWidth="10" strokeDasharray="40 124" strokeDashoffset="-88" transform="rotate(-90 35 35)" style={{ animation: "dashLoop 3s ease-in-out 0.8s infinite" }} />
              <circle cx="35" cy="35" r="26" fill="none" stroke="#2dab81" strokeWidth="10" strokeDasharray="12 152" strokeDashoffset="-128" transform="rotate(-90 35 35)" style={{ animation: "dashLoop 3s ease-in-out 1.6s infinite" }} />
              <text x="35" y="33" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1c1a18">10</text>
              <text x="35" y="43" textAnchor="middle" fontSize="7" fill="#aaa">Trans.</text>
            </svg>
          </div>
          {[["#8fa05a", "Service Invoices", "₦10,006,500", "↑ 11%"], ["#2dab81", "Payments Recv'd", "₦4,962,000", "↑ 12%"], ["#4b5680", "Outstanding", "₦2,192,500", "↓ 3%"]].map(([c, l, v, ch]) => (
            <div key={l} style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: 6.5, color: "#888" }}>{l}</span>
              </div>
              <div style={{ fontSize: 7, fontWeight: 800, color: TB, marginLeft: 8 }}>
                {v} <span style={{ fontSize: 6.5, color: ch.startsWith("↓") ? "#e05a4e" : "#1a7a4a" }}>{ch}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 7, padding: "6px 7px", border: "1px solid #eee" }}>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#1c1a18", marginBottom: 1 }}>Monthly Income Flow</div>
          <div style={{ fontSize: 5, color: "#aaa", marginBottom: 4 }}>April 2 – April 24, 2024</div>
          <svg width="100%" height="82" viewBox="0 0 260 82" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ag3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={TB} stopOpacity="0.2" />
                <stop offset="100%" stopColor={TB} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,65 C20,60 35,58 55,50 C75,40 85,45 100,35 C115,25 130,32 145,24 C160,16 175,20 195,12 C210,8 230,5 260,0 L260,82 L0,82Z" fill="url(#ag3)" />
            <path d="M0,65 C20,60 35,58 55,50 C75,40 85,45 100,35 C115,25 130,32 145,24 C160,16 175,20 195,12 C210,8 230,5 260,0" fill="none" stroke={TB} strokeWidth="1.5" style={{ animation: "drawLineLoop 4s ease-in-out infinite" }} />
            <path d="M0,75 C20,73 35,70 55,65 C75,60 85,62 100,57 C115,52 130,54 145,50 C160,46 175,47 195,43 C210,40 230,38 260,35" fill="none" stroke="#2dab81" strokeWidth="1.5" />
            {["Apr 4", "Apr 8", "Apr 12", "Apr 16", "Apr 20", "Apr 24"].map((l, i) => (
              <text key={l} x={i * 50 + 5} y="80" fontSize="5" fill="#aaa">{l}</text>
            ))}
          </svg>
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            {[[TB, "Total Revenue", "₦22.8M"], ["#2dab81", "Received", "₦4.9M"], ["#888", "Pending", "₦2.1M"]].map(([c, l, v]) => (
              <div key={l} style={{ flex: 1, background: `${c}12`, borderRadius: 5, padding: "3px 5px", border: `1px solid ${c}28` }}>
                <div style={{ fontSize: 5, color: "#888" }}>{l}</div>
                <div style={{ fontSize: 6.5, fontWeight: 800, color: c }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard", d: "M21.21 15.89A10 10 0 118 2.83 M22 12A10 10 0 0012 2v10z" },
  { label: "Products & Services", d: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" },
  { label: "Expenses", d: "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
  { label: "Quotes", d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8" },
  { label: "Invoice", d: "M4 2h16v16l-4-4-4 4-4-4-4 4V2z" },
  { label: "Payments", d: "M1 4h22v16H1z M1 10h22" },
  { label: "Users", d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z" },
  { label: "Contacts", d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75", badge: "24" },
];

// ─── ProjectCardPage ──────────────────────────────────────────────────────────
function ProjectCardPage() {
  return (
    <div style={{ padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#fafaf8", animation: "pageIn 0.4s ease both" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "12px 12px 10px", boxShadow: "0 2px 20px rgba(0,0,0,.1), 0 0 0 0.5px rgba(0,0,0,.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, width: 130 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: TB, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 3px 10px ${TB}55` }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: "#fff", letterSpacing: -0.4 }}>tru</span>
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1c1a18", textAlign: "center", lineHeight: 1.3 }}>Website Build Project</div>
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: 6.5, color: "#aaa", marginBottom: 2 }}>Payment type</div>
          <div style={{ border: "0.5px solid #ddd", borderRadius: 5, padding: "2px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafaf8" }}>
            <span style={{ fontSize: 6.5, color: "#333" }}>Installment</span>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
        <div style={{ width: "100%", borderTop: "0.5px solid #eee" }} />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
          {[{ label: "First Payment", badge: "Received", bg: "#22c55e" }, { label: "Second Payment", badge: "Due", bg: "#ef4444" }].map(({ label, badge, bg }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 8.5, color: "#333" }}>{label}</span>
              <span style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: bg, borderRadius: 3, padding: "1px 4px", whiteSpace: "nowrap" }}>{badge}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff5ef", border: "0.5px solid rgba(194,65,29,.3)", borderRadius: 20, padding: "3px 9px", color: TB, fontSize: 8, fontWeight: 600 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: TB, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          Reminder Sent
        </div>
      </div>
    </div>
  );
}

const PAGE_COMPONENTS = {
  dashboard: DashboardPage,
  projectCard: ProjectCardPage,
  newInvoice: NewInvoicePage,
  invoiceItem: InvoiceItemModalPage,
  addItem: AddItemModalPage,
  paymentsList: PaymentsListPage,
  paymentsAnalytics: PaymentsAnalyticsPage,
};

// ─── TruBilling shell ─────────────────────────────────────────────────────────
function TruBillingDashboard({ stage }) {
  const stageData = STAGES[stage] ?? STAGES[0];
  const activeNavLabel = stageData.navLabel;
  const PageComp = PAGE_COMPONENTS[stageData.pageKey] ?? DashboardPage;

  return (
    <div style={{ width: "100%", height: "100%", background: "#ffffff", display: "flex" }}>
      <style>{`
        @keyframes rowIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:none}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes dashLoop{0%,100%{stroke-dasharray:0 164;opacity:0.4}55%{stroke-dasharray:164 0;opacity:1}}
        @keyframes barGrowLoop{0%,100%{transform:scaleY(0.08);opacity:0.35}50%{transform:scaleY(1);opacity:0.9}}
        @keyframes drawLineLoop{0%{stroke-dasharray:0 1000}55%{stroke-dasharray:1000 0}100%{stroke-dasharray:0 1000}}
        @keyframes statBarFill{from{width:0%}to{width:100%}}
        @keyframes pageIn{from{opacity:0;transform:translateX(5px)}to{opacity:1;transform:none}}
        @keyframes navActiveBg{from{clip-path:inset(0 100% 0 0 round 6px)}to{clip-path:inset(0 0% 0 0 round 6px)}}
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 82, background: "#fff", borderRight: "1px solid #eee", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "6px 7px 3px" }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: TB, letterSpacing: -0.3 }}>tru</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#1c1a18", letterSpacing: -0.3 }}>billing</span>
          </div>
          <div style={{ background: "#fafaf8", border: "1px solid #eee", borderRadius: 99, padding: "2px 5px", display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke={TB} strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <span style={{ fontSize: 7.5, color: "#bbb" }}>Search</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: "2px 0" }}>
          {NAV_ITEMS.map(({ label, d, badge }) => {
            const isActive = label === activeNavLabel;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 6px", margin: "1px 4px", borderRadius: 6, position: "relative", cursor: "pointer" }}>
                {isActive && <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: TB, animation: "navActiveBg 0.28s cubic-bezier(.22,1,.36,1) both" }} />}
                {isActive && <div style={{ position: "absolute", left: -3, top: "50%", transform: "translateY(-50%)", width: 2.5, height: 12, borderRadius: 99, background: TB }} />}
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : TB} strokeWidth="2" style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
                  <path d={d} />
                </svg>
                <span style={{ fontSize: 6.5, fontWeight: isActive ? 700 : 400, color: isActive ? "#fff" : "#333", flex: 1, lineHeight: 1.2, position: "relative", zIndex: 1 }}>{label}</span>
                {badge && !isActive && (
                  <div style={{ background: "#f0f0ee", border: "1px solid #ddd", borderRadius: 99, padding: "0 3px", position: "relative", zIndex: 1 }}>
                    <span style={{ fontSize: 5, color: "#666", fontWeight: 600 }}>{badge}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ padding: "3px 5px" }}>
          <div style={{ border: `1.5px solid ${TB}`, borderRadius: 99, padding: "2px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
            <span style={{ fontSize: 6.5, fontWeight: 700, color: TB }}>Create New</span>
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={TB} strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
          </div>
        </div>

        <div style={{ margin: "3px 4px 0", border: `1px solid ${TB}44`, borderRadius: 7, padding: "4px" }}>
          <div style={{ fontSize: 6, fontWeight: 800, color: TB, marginBottom: 1 }}>Complete your profile</div>
          <div style={{ fontSize: 5, color: "#888", lineHeight: 1.4, marginBottom: 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div style={{ height: 2.5, background: "#eee", borderRadius: 99, marginBottom: 2 }}>
            <div style={{ width: "80%", height: "100%", background: "#2dab81", borderRadius: 99 }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontSize: 6.5, color: "#888", textDecoration: "underline" }}>Dismiss</span>
            <span style={{ fontSize: 6.5, color: TB, fontWeight: 600 }}>Proceed</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 5px 5px" }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 6, fontWeight: 900, color: "#fff" }}>S</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: "#1c1a18", lineHeight: 1 }}>Segun Adesola</div>
            <div style={{ fontSize: 5, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>segun@trubilling.com</div>
          </div>
          <span style={{ fontSize: 8, color: "#bbb" }}>···</span>
        </div>
      </div>

      {/* Main area */}
      <div key={stageData.pageKey} style={{ flex: 1, overflowY: "auto", minWidth: 0, animation: "pageIn 0.3s ease both" }}>
        <PageComp />
      </div>
    </div>
  );
}

// ─── Laptop frame ─────────────────────────────────────────────────────────────
function LaptopFrame({ stage, badge }) {
  const url = STAGES[stage]?.url ?? "trubilling.com/dashboard";
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (!frameRef.current) return;
      setScale(Math.min(1, frameRef.current.offsetWidth / 620));
    };
    update();
    const ro = new ResizeObserver(update);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div ref={frameRef} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="w-full max-w-full md:max-w-[620px] relative z-10">
      <style>{`@keyframes urlTextIn{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}`}</style>
      <div style={{ background: "#e8e8e8", borderRadius: "14px 14px 0 0", padding: "7px 9px 0", border: "2px solid #c8c8c8", borderBottom: "none" }}>
        <div style={{ background: "#f2f2f2", borderRadius: "6px 6px 0 0", overflow: "hidden" }}>
          <div style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {["#ff5f57", "#ffbd2e", "#27c840"].map((c) => (
                <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, maxWidth: 240, margin: "0 auto", background: "#fff", borderRadius: 5, padding: "3px 8px", border: "1px solid #e0e0e0", overflow: "hidden" }}>
              <span key={url} style={{ fontSize: 8, fontWeight: 500, color: "rgba(0,0,0,0.45)", animation: "urlTextIn 0.3s ease both", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{url}</span>
            </div>
            <div style={{ borderRadius: 5, padding: "3px 9px", fontSize: 8, fontWeight: 700, background: "#F26522", color: "#fff" }}>Publish</div>
          </div>
          <div style={{ height: 1.5, background: "#e8e8e8" }} />
        </div>
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <div style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transformOrigin: "top left", transform: `scale(${scale})` }}>
            <TruBillingDashboard stage={stage} />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            style={{ position: "absolute", top: 6, right: 6, backdropFilter: "blur(8px)", border: "0.5px solid rgba(255,255,255,.12)", borderRadius: 99, padding: "3px 6px 3px 4px", zIndex: 10, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F26522", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 4.5, fontWeight: 900, color: "#fff" }}>M</span>
            </div>
            <span style={{ fontSize: 6, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>{badge}</span>
          </motion.div>
        </div>
      </div>
      <div style={{ background: "#d8d8d8", height: 9, borderRadius: "0 0 3px 3px", border: "2px solid #c0c0c0", borderTop: "1px solid #ccc", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 55, height: 4, background: "#cacaca", borderRadius: "0 0 5px 5px" }} />
      </div>
      <div style={{ width: "55%", margin: "0 auto", height: 6, background: "#e0e0e0", borderRadius: "0 0 8px 8px", border: "2px solid #c8c8c8", borderTop: "none" }} />
    </motion.div>
  );
}

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  alertCircle:   <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  search:        <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  eyeOff:        <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  tool:          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>,
  zap:           <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  sparkles:      <><path d="M12 3l1.45 4.45L18 9l-4.55 1.55L12 15l-1.45-4.45L6 9l4.55-1.55L12 3z"/><path d="M19 15l.73 2.27L22 18l-2.27.73L19 21l-.73-2.27L16 18l2.27-.73L19 15z"/><path d="M5 17l.6 1.8L7.4 19l-1.8.6L5 21.4l-.6-1.8L2.6 19l1.8-.6L5 17z"/></>,
  trendUp:       <><polyline points="22 7 13.5 16.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
  target:        <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></>,
  fileText:      <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  clock:         <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  database:      <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
  barChart:      <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  checkCircle:   <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  layers:        <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  users:         <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  grid:          <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
  messageSquare: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  bookOpen:      <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
  shuffle:       <><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></>,
  smartphone:    <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  layout:        <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  creditCard:    <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  bell:          <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
};

// ─── Icon row (icon + text) — Solution panel ─────────────────────────────────
function IconRow({ iconKey, text, isActive }) {
  const svgEl = ICON_MAP[iconKey] ?? ICON_MAP.alertCircle;
  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: isActive ? 1 : 0.52 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: isActive ? "rgba(242,101,34,.13)" : "rgba(0,0,0,.04)", border: `1px solid ${isActive ? "rgba(242,101,34,.32)" : "rgba(0,0,0,.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .28s, border-color .28s", boxShadow: isActive ? "0 2px 8px rgba(242,101,34,.15)" : "none" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#F26522" : "#bbb"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke .28s" }}>{svgEl}</svg>
        </div>
        <span style={{ fontSize: 9.5, lineHeight: 1.4, fontWeight: isActive ? 700 : 400, color: isActive ? "#181817" : "#999", transition: "color .2s" }}>{text}</span>
      </div>
    </motion.div>
  );
}

function PanelSectionHead({ title, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
      <div style={{ width: 17, height: 17, borderRadius: 5, background: "rgba(242,101,34,.12)", border: "1px solid rgba(242,101,34,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F26522" }}>{title}</span>
    </div>
  );
}

// ─── Inline SVG icons for the Need icon grid ─────────────────────────────────
function XlsIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 40 46" fill="none">
      <rect x="2" y="2" width="28" height="36" rx="3" fill="#fff" stroke="#c0d0e0" strokeWidth="2" />
      <rect x="2" y="2" width="16" height="12" rx="3" fill="#e8f0f8" stroke="#c0d0e0" strokeWidth="2" />
      <rect x="4" y="16" width="24" height="3" rx="1" fill="#c0d0e0" />
      <rect x="4" y="22" width="24" height="3" rx="1" fill="#c0d0e0" />
      <rect x="4" y="28" width="16" height="3" rx="1" fill="#c0d0e0" />
      <rect x="0" y="0" width="16" height="14" rx="3" fill="#22a04a" />
      <text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff">XLS</text>
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 38 34" fill="none">
      <rect x="1" y="1" width="30" height="22" rx="5" fill="#fff" stroke="#333" strokeWidth="2.5" />
      <line x1="7" y1="8" x2="25" y2="8" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7" y1="14" x2="20" y2="14" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 23 L4 31 L13 26" fill="#fff" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function LedgerIcon() {
  return (
    <svg width="30" height="26" viewBox="0 0 38 32" fill="none">
      <path d="M19 4 C14 2 6 2 2 4 L2 28 C6 26 14 26 19 28 C24 26 32 26 36 28 L36 4 C32 2 24 2 19 4Z" fill="#fff" stroke="#333" strokeWidth="2.2" />
      <line x1="19" y1="4" x2="19" y2="28" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {[10, 15, 20].map((y) => (
        <g key={y}>
          <line x1="7" y1={y} x2="16" y2={y} stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1={y} x2="31" y2={y} stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg width="26" height="30" viewBox="0 0 34 38" fill="none">
      <rect x="3" y="5" width="28" height="30" rx="3" fill="#fff" stroke="#333" strokeWidth="2.2" />
      <rect x="11" y="1" width="12" height="7" rx="2" fill="#fff" stroke="#333" strokeWidth="2" />
      <line x1="9" y1="15" x2="25" y2="15" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="21" x2="25" y2="21" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="27" x2="19" y2="27" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="20" y="22" width="8" height="8" rx="2" fill="#e8e8e4" stroke="#bbb" strokeWidth="1.5" />
    </svg>
  );
}

// ─── LEFT panel: Need (problem text + icon grid) + Approach (ProjectCard) ─────
function NeedApproachPanel() {
  const needIcons = [
    { Icon: XlsIcon, label: "Scattered records" },
    { Icon: ChatIcon, label: "Untracked payments" },
    { Icon: LedgerIcon, label: "Missed inventory" },
    { Icon: ClipboardIcon, label: "Manual processes" },
  ];

  return (
    <div
      className="rounded-xl md:rounded-[14px]"
      style={{
        padding: "8px 11px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)",
        border: "0.5px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.9)",
        animation: "floatUp 5s ease-in-out infinite",
        width: 190,
      }}
    >
      {/* ── NEED section ── */}
      <PanelSectionHead
        title="Need"
        icon={
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#F26522" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
      />

      {/* Problem headline */}
      <p style={{ fontSize: 9.5, fontWeight: 900, color: "#181817", lineHeight: 1.3, margin: "0 10px 10px 0" }}>
        Scattered records.<br />
        Untracked payments.<br />
        Missed inventory.
      </p>

      {/* 2×2 icon grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
        {needIcons.map(({ Icon, label }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.04 }}
            style={{
              background: "#f5f5f2",
              borderRadius: 10,
              border: "1px solid #e8e8e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 6px",
              cursor: "default",
            }}
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,.07)", margin: "0 0 12px" }} />

      {/* ── APPROACH section ── */}
      <PanelSectionHead
        title="Approach"
        icon={
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#F26522" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />
          </svg>
        }
      />

      {/* ProjectCard embedded */}
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #eee", background: "#fafaf8" }}>
        {/* Mini card — inline rather than full ProjectCardPage to avoid height issues */}
        <div style={{ padding: "10px 10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: TB, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 3px 8px ${TB}44` }}>
            <span style={{ fontSize: 8, fontWeight: 900, color: "#fff", letterSpacing: -0.3 }}>tru</span>
          </div>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#1c1a18", textAlign: "center", lineHeight: 1.3 }}>Website Build Project</div>
          <div style={{ width: "100%" }}>
            <div style={{ fontSize: 7, color: "#aaa", marginBottom: 2 }}>Payment type</div>
            <div style={{ border: "0.5px solid #ddd", borderRadius: 5, padding: "2px 5px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
              <span style={{ fontSize: 8, color: "#333" }}>Installment</span>
              <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
          <div style={{ width: "100%", borderTop: "0.5px solid #eee", paddingTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            {[{ label: "First Payment", badge: "Received", bg: "#22c55e" }, { label: "Second Payment", badge: "Due", bg: "#ef4444" }].map(({ label, badge, bg }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 7, color: "#333" }}>{label}</span>
                <span style={{ fontSize: 5.5, fontWeight: 700, color: "#fff", background: bg, borderRadius: 3, padding: "1px 4px", whiteSpace: "nowrap" }}>{badge}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff5ef", border: "0.5px solid rgba(194,65,29,.3)", borderRadius: 20, padding: "2px 8px", color: TB, fontSize: 6, fontWeight: 600 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: TB, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            Reminder Sent
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RIGHT panel: Solution ────────────────────────────────────────────────────
function SolutionPanel({ activeSolutionIdx, solutionBullets, outcome }) {
  return (
    <div
      className="rounded-xl md:rounded-[14px]"
      style={{
        padding: "12px 11px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)",
        border: "0.5px solid rgba(242,101,34,.25)",
        boxShadow: "0 8px 32px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.9)",
        animation: "floatUp 5s ease-in-out 0.5s infinite",
      }}
    >
      <PanelSectionHead
        title="The Solution"
        icon={
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#F26522" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        }
      />
      {solutionBullets.map((item, i) => (
        <AnimatePresence key={i}>
          {activeSolutionIdx >= 0 && i <= activeSolutionIdx && i < solutionBullets.length && (
            <IconRow iconKey={item.icon ?? "fileText"} text={item.text} isActive={i === activeSolutionIdx} />
          )}
        </AnimatePresence>
      ))}

      <AnimatePresence>
        {activeSolutionIdx >= solutionBullets.length && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <div style={{ borderTop: "1px solid rgba(0,0,0,.07)", margin: "4px 0 10px" }} />
            <PanelSectionHead
              title="Outcome"
              icon={
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#F26522" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
            />
            <p style={{ fontSize: 10, fontWeight: 600, color: "#444", lineHeight: 1.55, margin: 0, whiteSpace: "pre-line" }}>{outcome}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Experience() {
  const { cmsData, isEditMode, openPanel } = useCms();
  const content = cmsData.experience;
  const sectionRef = useRef(null);
  const TOTAL_STAGES = STAGES.length;

  const [stage, setStage] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  const inView = useInView(sectionRef, { once: false, margin: "-120px" });

  const { scrollYProgress: entryProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.2"] });
  const entryOp  = useTransform(entryProgress, [0, 1], [0, 1]);
  const headlineY = useTransform(entryProgress, [0, 1], [24, 0]);
  const leftX    = useTransform(entryProgress, [0.1, 1], [-28, 0]);
  const rightX   = useTransform(entryProgress, [0.1, 1], [28, 0]);
  const ctaY     = useTransform(entryProgress, [0.2, 1], [16, 0]);

  useEffect(() => {
    if (!inView) { setStage(0); setHasEntered(false); return; }
    setHasEntered(true);
    const timers = [];
    for (let i = 1; i < TOTAL_STAGES; i++) {
      timers.push(setTimeout(() => setStage(i), 1000 + (i - 1) * 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, TOTAL_STAGES]);

  const stageData          = STAGES[stage] ?? STAGES[0];
  const displaySolutionIdx = stageData.solutionIdx;

  return (
    <div id="products" ref={sectionRef} className="bg-gradient-to-tr from-tangerine-50 to-white relative overflow-hidden py-12" style={{ position: "relative" }}>
      {isEditMode && (
        <button onClick={() => openPanel("experience")} style={{ position: "absolute", bottom: 24, left: 20, zIndex: 400, background: "rgba(11,69,123,.92)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,.18)", borderRadius: 99, padding: "10px 20px", fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }}>
          ✏ Edit
        </button>
      )}

      <div className="flex items-start md:items-center justify-center pt-4 pb-10 md:pt-0 overflow-hidden" style={{ minHeight: "100dvh", zIndex: 2 }}>
        <style>{`@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`}</style>

        <div className="w-full max-w-[1200px] mx-auto px-4 py-4 md:px-8">

          {/* ── Headline row ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-3 gap-4">
            <motion.div style={{ opacity: entryOp, y: headlineY }}>
              <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#F26522", marginBottom: 2 }}>{content.eyebrow}</p>
              <h2 className="text-xl md:text-3xl" style={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: -0.5, color: "#181817", margin: 0 }}>
                <span style={{ color: "#F26522" }}>{content.productPrefix}</span>
                <TypingText text={content.productTyped} inView={hasEntered} />
              </h2>
              <TypingTexts
                text={content.productTypedsub[0].split(",").map((s) => s.trim()).filter(Boolean)}
                inView={hasEntered}
                chunkSize={3}
                className="text-xl py-2"
              />
            </motion.div>

            <motion.div style={{ opacity: entryOp, y: ctaY }} className="flex-shrink-0 sm:max-w-[210px]">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-tangerine-500 text-white border-none rounded-full cursor-pointer"
                style={{ padding: "10px 22px", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", boxShadow: "0 6px 20px rgba(242,101,34,.35)", display: "block", marginBottom: 8 }}
              >
                {content.cta}
              </button>
            </motion.div>
          </div>

          {/* ── DESKTOP layout ── */}
          <div className="hidden md:flex items-center justify-center pt-4">
            <motion.div style={{ opacity: entryOp, x: leftX, flexShrink: 0, position: "relative", zIndex: 20, marginRight: -18 }}>
              <NeedApproachPanel />
            </motion.div>

            <div style={{ position: "relative", zIndex: 10, flexShrink: 1, minWidth: 0, maxWidth: 620 }} className="w-full">
              <LaptopFrame stage={stage} badge={content.badge} />
            </div>

            <motion.div style={{ opacity: entryOp, x: rightX, flexShrink: 0, position: "relative", zIndex: 20, marginLeft: -18 }}>
              <SolutionPanel
                activeSolutionIdx={displaySolutionIdx}
                solutionBullets={content.solutions ?? []}
                outcome={content.outcome ?? ""}
              />
            </motion.div>
          </div>

          {/* ── MOBILE layout ── */}
          <div className="md:hidden pt-4">
            <div className="flex justify-center mb-4">
              <LaptopFrame stage={stage} badge={content.badge} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div style={{ opacity: entryOp }}>
                <NeedApproachPanel />
              </motion.div>
              <motion.div style={{ opacity: entryOp }}>
                <SolutionPanel
                  activeSolutionIdx={displaySolutionIdx}
                  solutionBullets={content.solutions ?? []}
                  outcome={content.outcome ?? ""}
                />
              </motion.div>
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              {STAGES.map((_, i) => (
                <motion.div key={i} animate={{ width: i === stage ? 18 : 5, background: i === stage ? "#F26522" : "rgba(194,65,29,.22)" }} transition={{ duration: 0.28 }} style={{ height: 5, borderRadius: 99 }} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 18, height: 26, borderRadius: 9, border: "2px solid rgba(242,101,34,.6)", display: "flex", justifyContent: "center", paddingTop: 4, flexShrink: 0 }}>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ width: 3, height: 6, borderRadius: 99, background: "#F26522" }} />
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: "#F26522", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Auto-advancing</p>
                <p style={{ fontSize: 8, color: "rgba(24,24,23,.4)", margin: 0 }}>Each step reveals as you watch</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}