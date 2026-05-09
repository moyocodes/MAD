import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSolid(y > 20);
      setHidden((y > window.innerHeight * 0.9 && y < window.innerHeight * 3.6) || (y > window.innerHeight * 4.2 && y < window.innerHeight * 7.5));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const isPill = solid && !hidden;

  const links = ["Work", "Services", "About", "Journal"];

  const Hamburger = ({ light, open }) => (
    <button
      className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full border-none"
      style={{ background: "transparent", cursor: "pointer", padding: 0, flexShrink: 0 }}
      onClick={() => setMenuOpen((o) => !o)}
      aria-label="Menu"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(15,79,122,.7)", transformOrigin: "center" }}
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(15,79,122,.7)" }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        style={{ display: "block", height: 1.5, width: 22, borderRadius: 2, background: "rgba(15,79,122,.7)", transformOrigin: "center" }}
      />
    </button>
  );

  const inner = (_light) => (
    <>
      <img src="/ma.png" alt="MAD" className="h-40 w-36" />
      <div className="hidden md:flex gap-6">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="text-[11px] tracking-[0.14em] uppercase font-semibold"
            style={{
              color: "rgba(15,79,122,.55)",
              transition: "color .18s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0f4f7a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(15,79,122,.55)")}
          >
            {l}
          </a>
        ))}
      </div>
      <button
        className="hidden md:block text-[11px] font-bold tracking-[0.12em] uppercase border-none px-4 py-2"
        style={{
          background: "#1980c2",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        Work With Us
      </button>
      <Hamburger light={false} open={menuOpen} />
    </>
  );

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {hidden ? null : isPill ? (
          <motion.nav
            key="pill"
            initial={{ scaleY: 0.4, opacity: 0, y: -12 }}
            animate={{ scaleY: 1, opacity: 1, y: 0 }}
            exit={{ scaleY: 0.4, opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 16,
              left: 0,
              right: 0,
              margin: "0 auto",
              width: "fit-content",
              minWidth: "min(92vw, 540px)",
              maxWidth: 720,
              borderRadius: 50,
              backdropFilter: "blur(20px)",
              background: "rgba(240,248,255,0.88)",
              border: "1px solid rgba(25,128,194,.14)",
              padding: "0 20px",
              zIndex: 300,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              boxShadow: "0 4px 28px rgba(25,128,194,.10), 0 1px 4px rgba(0,0,0,.04)",
              transformOrigin: "top center",
            }}
          >
            {inner(true)}
          </motion.nav>
        ) : (
          <motion.nav
            key="flat"
            initial={false}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 300,
              height: 56,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            {inner(false)}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 290, backdropFilter: "blur(4px)" }}
            />
            <motion.div
              key="drawer"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 295,
                background: "#0d1117",
                borderRadius: "0 0 20px 20px",
                padding: "80px 28px 36px",
                boxShadow: "0 16px 48px rgba(0,0,0,.4)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l}
                    href="#"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: "block", color: "rgba(255,255,255,.75)", fontSize: 22, fontWeight: 700, letterSpacing: -0.3, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)", textDecoration: "none" }}
                  >
                    {l}
                  </motion.a>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                style={{ marginTop: 28, background: "#1980c2", color: "#fff", border: "none", padding: "14px 32px", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 8, cursor: "pointer", width: "100%" }}
              >
                Work With Us
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
