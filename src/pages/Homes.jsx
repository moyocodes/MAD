import { useState, useEffect, useCallback } from "react";
import { ThemeCtx } from "../context/ThemeContext";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import HeroView from "@/components/home/HeroView";
import WhatWeDo from "../components/home/WhatWeDo";
import ServicesInMotion from "@/components/home/Servicesinmotion";
import Experience from "../components/home/Experience";
import BeyondProjects from "../components/home/BeyondProjects";
import Contact from "../components/home/Contact";

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
        <div
          className="font-sans transition-colors duration-300"
          style={{
            background: dark
              ? "linear-gradient(175deg,#0d1117 0%,#0d1117 100%)"
              : "linear-gradient(175deg,#eaf5fc 0%,#f4f9ff 7%,#ffffff 22%,#ffffff 74%,#fef7f2 100%)",
          }}
        >
          
          <style>{`
            * { box-sizing: border-box; }

            @media (max-width: 767px) {
              .mad-nav-ul { display: none !important; }
            }

            input::placeholder, textarea::placeholder {
              color: rgba(24,24,23,0.28) !important;
            }

            @keyframes dotPulse {
              0%, 100% { opacity: .2; transform: scale(.85); }
              50% { opacity: 1; transform: scale(1.1); }
            }
          `}</style>

          <Nav />
          <div className="mx-auto">
            <Hero />
            <HeroView />
            <WhatWeDo />
            <ServicesInMotion />
            <Experience />
            <BeyondProjects />
            <Contact />
          </div>

        </div>
      </div>
    </ThemeCtx.Provider>
  );
}