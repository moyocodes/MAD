import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeCms } from "@/data/homeCms";

const { brand, nav } = homeCms;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSolid(y > 20);
      setHidden(
        (y > window.innerHeight * 0.9 && y < window.innerHeight * 3.6) ||
          (y > window.innerHeight * 3.7 && y < window.innerHeight * 11),
      );
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isPill = solid && !hidden;
  const links = nav.links;

  const Hamburger = ({ open }) => (
    <button
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5.5px] rounded-xl border-none"
      style={{
        background: open ? "rgba(11,69,123,.07)" : "transparent",
        cursor: "pointer", padding: 0, flexShrink: 0,
        transition: "background .2s",
      }}
      onClick={() => setMenuOpen((o) => !o)}
      aria-label="Menu"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(11,69,123,.82)", transformOrigin: "center" }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(11,69,123,.82)" }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(11,69,123,.82)", transformOrigin: "center" }}
      />
    </button>
  );

  const inner = () => (
    <>
      <motion.img
        src={brand.logo}
        alt={brand.name}
        className="h-50 w-36"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        {links.map((l, i) => (
          <motion.a
            key={l}
            href="#"
            className="text-[11px] tracking-[0.14em] uppercase font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 + i * 0.065, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "rgba(11,69,123,.5)",
              transition: "color .18s, border-color .18s",
              textDecoration: "none",
              paddingBottom: 2,
              borderBottom: "1.5px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0b457b";
              e.currentTarget.style.borderBottomColor = "#0b457b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(11,69,123,.5)";
              e.currentTarget.style.borderBottomColor = "transparent";
            }}
          >
            {l}
          </motion.a>
        ))}
      </div>

      {/* Desktop CTA */}
      <motion.button
        className="hidden md:block text-[11px] font-bold tracking-[0.12em] uppercase border-none"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0b457b",
          color: "#fff",
          borderRadius: 7,
          padding: "10px 22px",
          cursor: "pointer",
          transition: "background .18s, box-shadow .18s, transform .15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#09396a";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(11,69,123,.4)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0b457b";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {nav.cta}
      </motion.button>

      <Hamburger open={menuOpen} />
    </>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {hidden ? null : isPill ? (
          <motion.nav
            key="pill"
            initial={{ scaleY: 0.45, opacity: 0, y: -18 }}
            animate={{ scaleY: 1, opacity: 1, y: 0 }}
            exit={{ scaleY: 0.45, opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 16, left: 0, right: 0,
              margin: "0 auto",
              width: "fit-content",
              minWidth: "min(92vw, 580px)",
              maxWidth: 780,
              borderRadius: 50,
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              background: "rgba(237,246,255,0.93)",
              border: "1px solid rgba(11,69,123,.18)",
              padding: "0 28px",
              zIndex: 300,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              boxShadow: "0 4px 32px rgba(11,69,123,.13), 0 1px 4px rgba(0,0,0,.06)",
              transformOrigin: "top center",
            }}
          >
            {inner()}
          </motion.nav>
        ) : (
          <motion.nav
            key="flat"
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -72, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0,
              zIndex: 300,
              height: 68,
              background: "rgba(237,246,255,0.93)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(11,69,123,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 40px",
            }}
          >
            {inner()}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(4,12,26,.65)", zIndex: 290, backdropFilter: "blur(6px)" }}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ y: "-108%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-108%", opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0,
              zIndex: 295,
              background: "linear-gradient(158deg, #0c2040 0%, #060f1e 52%, #091724 100%)",
              borderRadius: "0 0 32px 32px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(11,69,123,.3)",
            }}
          >
            {/* Dot grid texture */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              opacity: 0.16,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,.38) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }} />

            {/* Top-right glow blob */}
            <div style={{
              position: "absolute", top: -70, right: -60,
              width: 260, height: 260, borderRadius: "50%",
              background: "rgba(11,69,123,.5)",
              filter: "blur(72px)", pointerEvents: "none",
            }} />

            {/* Bottom-left accent blob */}
            <div style={{
              position: "absolute", bottom: -44, left: -50,
              width: 200, height: 200, borderRadius: "50%",
              background: "rgba(25,128,194,.22)",
              filter: "blur(58px)", pointerEvents: "none",
            }} />

            {/* Horizontal accent line */}
            <div style={{
              position: "absolute", top: 68, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(11,69,123,.6) 30%, rgba(25,128,194,.4) 60%, transparent)",
              pointerEvents: "none",
            }} />

            {/* Content wrapper — top padding clears the nav bar */}
            <div style={{ position: "relative", zIndex: 2, padding: "88px 28px 36px" }}>

              {/* Numbered links */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l}
                    href="#"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "15px 0",
                      borderBottom: "1px solid rgba(255,255,255,.07)",
                      textDecoration: "none",
                      transition: "opacity .15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = ".65"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <span style={{
                      fontFamily: "monospace", fontSize: 9, fontWeight: 700,
                      color: "#1980c2", letterSpacing: "0.1em",
                      minWidth: 20, lineHeight: 1, opacity: 0.85,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      color: "rgba(255,255,255,.84)", fontSize: 22,
                      fontWeight: 700, letterSpacing: -0.5, lineHeight: 1, flex: 1,
                    }}>
                      {l}
                    </span>
                    <motion.svg
                      width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeLinecap="round"
                      initial={{ x: -6, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.14 + i * 0.07, duration: 0.3 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: 28, width: "100%",
                  background: "#0b457b",
                  color: "#fff", border: "none",
                  padding: "16px 32px",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.13em", textTransform: "uppercase",
                  borderRadius: 12, cursor: "pointer",
                  boxShadow: "0 4px 28px rgba(11,69,123,.5), inset 0 1px 0 rgba(255,255,255,.12)",
                  transition: "background .18s, box-shadow .18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#093468";
                  e.currentTarget.style.boxShadow = "0 6px 32px rgba(11,69,123,.65), inset 0 1px 0 rgba(255,255,255,.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0b457b";
                  e.currentTarget.style.boxShadow = "0 4px 28px rgba(11,69,123,.5), inset 0 1px 0 rgba(255,255,255,.12)";
                }}
              >
                {nav.cta}
              </motion.button>

              {/* Bottom tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.44, duration: 0.4 }}
                style={{
                  marginTop: 20, textAlign: "center",
                  fontSize: 10, color: "rgba(255,255,255,.22)",
                  letterSpacing: "0.1em", fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                {brand.name} · Studio
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
