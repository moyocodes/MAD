import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useCms } from "@/context/CmsContext";

const SECTION_MAP = [
  { id: "hero",     panel: "hero",             label: "Hero" },
  { id: "work",     panel: "whatWeDo",         label: "What We Do" },
  { id: "products", panel: "experience",       label: "Experience" },
  { id: "services", panel: "servicesInMotion", label: "Services" },
  { id: "about",    panel: "beyond",           label: "Beyond" },
  { id: "contact",  panel: "contact",          label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const observers = SECTION_MAP.map(({ id, panel }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(panel); },
        { threshold: 0.4 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io?.disconnect());
  }, []);
  return active;
}

const PIN = "1234";

export default function AdminBar() {
  const { isEditMode, setIsEditMode, resetCms, openPanel } = useCms();
  const activeSection = useActiveSection();
  const { pathname } = useLocation();
  const isGuard = pathname === "/guard";
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const unlock = () => {
    if (pin === PIN) {
      setIsEditMode(true);
      setShowPin(false);
      setPin("");
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <>
      {/* Section edit button — fixed bottom-left, only visible in edit mode */}
      <AnimatePresence>
        {isEditMode && activeSection && (
          <motion.button
            key={activeSection}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => openPanel(activeSection)}
            style={{
              position: "fixed", bottom: 24, left: 24, zIndex: 9999,
              background: "rgba(11,69,123,.92)", backdropFilter: "blur(12px)",
              color: "#fff", border: "1px solid rgba(255,255,255,.18)",
              borderRadius: 99, padding: "11px 22px",
              fontSize: 12, fontWeight: 800, letterSpacing: ".12em",
              textTransform: "uppercase", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(11,69,123,.4)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>✏</span>
            {SECTION_MAP.find(s => s.panel === activeSection)?.label ?? "Edit"}
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .admin-bar-row { position: fixed; bottom: 16px; right: 12px; z-index: 9999; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end; max-width: calc(100vw - 24px); }
        @media (min-width: 480px) { .admin-bar-row { bottom: 24px; right: 24px; gap: 8px; } }
        .admin-btn { padding: 8px 11px; font-size: 9px; }
        @media (min-width: 480px) { .admin-btn { padding: 9px 14px; font-size: 10px; } }
        .admin-editing-badge { padding: 8px 12px; font-size: 9px; }
        @media (min-width: 480px) { .admin-editing-badge { padding: 9px 16px; font-size: 10px; } }
        .admin-lock-btn { padding: 9px 16px; font-size: 9px; }
        @media (min-width: 480px) { .admin-lock-btn { padding: 10px 18px; font-size: 10px; } }
      `}</style>
      <div className="admin-bar-row">
        <AnimatePresence mode="wait">
          {isEditMode ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "inherit", flexWrap: "inherit" }}
            >
              <div className="admin-editing-badge" style={{
                background: "rgba(11,69,123,.96)", backdropFilter: "blur(14px)",
                color: "#fff", borderRadius: 99,
                fontWeight: 700, letterSpacing: ".14em",
                textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 20px rgba(11,69,123,.35)",
                border: "1px solid rgba(255,255,255,.12)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80", flexShrink: 0 }} />
                Editing
              </div>
              <button
                onClick={() => { if (window.confirm("Reset all content to defaults?")) resetCms(); }}
                className="admin-btn"
                style={{
                  background: "rgba(220,53,69,.9)", backdropFilter: "blur(12px)",
                  color: "#fff", border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 99, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(220,53,69,.3)", fontFamily: "inherit",
                }}
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="admin-btn"
                style={{
                  background: "rgba(11,69,123,.9)", backdropFilter: "blur(12px)",
                  color: "#fff", border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 99, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(11,69,123,.3)", fontFamily: "inherit",
                }}
              >
                🔒 Lock
              </button>
            </motion.div>
          ) : isGuard ? (
            <motion.button
              key="locked"
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setShowPin(true)}
              className="admin-lock-btn"
              style={{
                background: "rgba(11,69,123,.85)", backdropFilter: "blur(14px)",
                color: "#fff", border: "1px solid rgba(255,255,255,.15)",
                borderRadius: 99, fontWeight: 700, letterSpacing: ".14em",
                textTransform: "uppercase", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7, fontFamily: "inherit",
                boxShadow: "0 4px 20px rgba(11,69,123,.25)",
              }}
            >
              🔐 Admin
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPin && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => { setShowPin(false); setPin(""); setError(false); }}
              style={{ position: "fixed", inset: 0, background: "rgba(4,10,22,.6)", zIndex: 10000, backdropFilter: "blur(4px)" }}
            />
            <motion.div
              key="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(320px, calc(100vw - 32px))",
                zIndex: 10001,
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 24 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "#fff", borderRadius: 20,
                  padding: "clamp(20px,5vw,32px) clamp(16px,5vw,28px)",
                  boxShadow: "0 40px 100px rgba(0,0,0,.25), 0 0 0 1px rgba(11,69,123,.1)",
                }}
              >
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0c1a2e", marginBottom: 5 }}>Admin Access</h3>
                <p style={{ fontSize: 12, color: "rgba(12,26,46,.4)", lineHeight: 1.5 }}>Enter your PIN to enable content editing.</p>
              </div>
              <input
                autoFocus
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && unlock()}
                placeholder="Enter PIN"
                style={{
                  width: "100%", boxSizing: "border-box",
                  border: `1.5px solid ${error ? "#ef4444" : "rgba(11,69,123,.2)"}`,
                  borderRadius: 11, padding: "12px 14px",
                  fontSize: 15, outline: "none",
                  color: "#0c1a2e", letterSpacing: "0.2em",
                  background: error ? "#fff5f5" : "#f8fbff",
                  fontFamily: "inherit", marginBottom: 6,
                  transition: "border-color .15s",
                }}
              />
              {error && (
                <p style={{ fontSize: 11, color: "#ef4444", marginBottom: 10 }}>Incorrect PIN. Try again.</p>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button
                  onClick={() => { setShowPin(false); setPin(""); setError(false); }}
                  style={{
                    flex: 1, padding: 11, borderRadius: 10,
                    border: "1px solid rgba(11,69,123,.15)",
                    background: "transparent", color: "rgba(12,26,46,.45)",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={unlock}
                  style={{
                    flex: 2, padding: 11, borderRadius: 10,
                    border: "none", background: "#0b457b",
                    color: "#fff", fontSize: 12, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Unlock
                </button>
              </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
