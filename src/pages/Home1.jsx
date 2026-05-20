import { useEffect, useRef } from "react";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import WhatWeDo from "../components/home/WhatWeDo";
import ServicesInMotion from "../components/home/ServicesInMotion";
import Experience from "../components/home/Experience";
import Beyond from "../components/home/Beyond";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";
import { CmsProvider } from "../context/CmsContext";
import AdminBar from "../components/cms/AdminBar";
import CmsPanel from "../components/cms/CmsPanel";

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("_mad"))
    return;
  const s = document.createElement("style");
  s.id = "_mad";
  s.textContent = `
 *{box-sizing:border-box;margin:0;padding:0}
    html{overscroll-behavior:none}
    body{background:#ffffff;color:#181817;overflow-x:hidden;overscroll-behavior:none;-webkit-overflow-scrolling:touch}
    @keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
    .sh{animation:shimmer 1.8s linear infinite}
    @keyframes fadeup{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeup .6s cubic-bezier(.22,1,.36,1) both}
    @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .mq{animation:marqueeScroll 18s linear infinite}
    input,textarea{outline:none;font-family:inherit}
    button{font-family:inherit;cursor:pointer}
    a{text-decoration:none}
  `;
  document.head.appendChild(s);
}

export default function MADLandingPage() {
  const contactContainerRef = useRef(null);

  useEffect(() => {
    injectCSS();

    const saved = sessionStorage.getItem("mad_scroll");
    if (saved) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: Number(saved), behavior: "instant" }),
      );
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem("mad_scroll", String(window.scrollY));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <CmsProvider>
      <main
        style={{
          background:
            "linear-gradient(180deg, #e0eef8 0%, #d4e8f4 12%, #dceef8 25%, #e6f2fb 40%, #eef7fc 58%, #f4fafb 75%, #f8fbfc 100%)",
          minHeight: "100vh",
        }}
      >
        <Nav />
        <Hero />
        {/* Containing block — WhatWeDo sticky range ends when Experience ends */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <WhatWeDo />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <Experience />
          </div>
        </div>
        {/* ServicesInMotion sticky — context ends at Contact so Footer is never behind it */}
        <div style={{ position: "relative", zIndex: 3 }}>
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <ServicesInMotion />
          </div>
          {/* Beyond pinned, Contact slides over it then sticks for phone scroll */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <Beyond />
            </div>
            {/* 200vh container gives the phone 100vh of scroll travel while Contact stays pinned */}
            <div ref={contactContainerRef} style={{ position: "relative", zIndex: 2, minHeight: "200vh" }}>
              <div style={{ position: "sticky", top: 0 }}>
                <Contact scrollRef={contactContainerRef} />
              </div>
            </div>
          </div>
        </div>
        {/* Footer outside sticky context — renders cleanly on its own */}
        <Footer />
      </main>
      <AdminBar />
      <CmsPanel />
    </CmsProvider>
  );
}
