import { useState, useEffect, useCallback } from "react";
import { ThemeCtx } from "../context/ThemeContext";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import WhatWeDo from "../components/home/WhatWeDo";
import Experience from "../components/home/Experience";
import Contact from "../components/home/Contact";
import CTASection from "@/components/home/CTASection";

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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, savedY || 0));
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
        <div className="font-sans transition-colors duration-300 bg-azure-50 dark:bg-dark-900">
          
          <style>{`
            * { box-sizing: border-box; }

            @media (max-width: 767px) {
              .mad-nav-ul { display: none !important; }
            }

            input::placeholder, textarea::placeholder {
              color: rgba(24,24,23,0.28) !important;
            }
          `}</style>

          <Nav />
          <div className="h-[60px]" />

          <div className="max-w-[1400px] mx-auto">
            <Hero />
            <WhatWeDo />
            <CTASection />
            <Experience />
            <Contact />
          </div>

        </div>
      </div>
    </ThemeCtx.Provider>
  );
}