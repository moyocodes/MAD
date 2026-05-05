import { useState, useEffect, useCallback } from "react";
import { ThemeCtx } from "../context/ThemeContext";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import WhatWeDo from "../components/home/WhatWeDo";
import Experience from "../components/home/Experience";
import Contact from "../components/home/Contact";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MADLanding() {
  const [dark, setDark] = useState(false);
  const toggle = useCallback(() => setDark((d) => !d), []);

  useEffect(() => {
    const key = "mad:homes:scroll";
    const originalRestoration = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const saved = sessionStorage.getItem(key);
    const savedY = saved ? Number(saved) : 0;
    const restoreY = Number.isFinite(savedY) && savedY > 0 ? savedY : 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, restoreY));
    });

    let ticking = false;
    const remember = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    };

    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("pagehide", remember);

    return () => {
      window.removeEventListener("scroll", remember);
      window.removeEventListener("pagehide", remember);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = originalRestoration;
      }
    };
  }, []);

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={dark ? "dark" : ""}>
        <div
          className="font-sans transition-colors duration-300"
          style={{ background: dark ? "#141413" : "#f5f1eb" }}
        >
          <style>{`
            @keyframes pulseGlow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
            @keyframes dotPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
            @media (max-width: 767px) {
              .mad-hero-left { width: 100% !important; height: 44vw !important; min-height: 200px !important; }
              .mad-exp-devices { display: none !important; }
              .mad-contact-grid { grid-template-columns: 1fr !important; }
              .mad-contact-grid > div:first-child { border-right: none !important; padding: 40px 24px !important; }
              .mad-contact-grid > div:last-child { padding: 40px 24px 64px !important; min-height: 500px !important; }
              .mad-nav-ul { display: none !important; }
              .mad-trusted { padding: 28px 20px !important; }
            }
            input::placeholder, textarea::placeholder { color: rgba(24,24,23,0.28) !important; }
            * { box-sizing: border-box; }
          `}</style>
          <Nav />
          <div className="h-[60px]" />
          <Hero />
          <WhatWeDo />
          <Experience />
          <Contact />
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
