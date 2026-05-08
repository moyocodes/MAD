import { useEffect } from "react";
import Nav from "../components/home/Nav";
import Hero from "../components/home/Hero";
import WhatWeDo from "../components/home/WhatWeDo";
import ServicesInMotion from "../components/home/ServicesInMotion";
import Experience from "../components/home/Experience";
import Beyond from "../components/home/Beyond";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";

function injectCSS() {
  if (typeof document === "undefined" || document.getElementById("_mad"))
    return;
  const s = document.createElement("style");
  s.id = "_mad";
  s.textContent = `
    *{box-sizing:border-box;margin:0;padding:0}
    html{overflow-x:hidden;max-width:100%}
    body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#ffffff;color:#181817;overflow-x:hidden;max-width:100%;position:relative}
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
  useEffect(() => { injectCSS(); }, []);
  return (
    <main>
      <Nav />
      <Hero />
      <WhatWeDo />
      <ServicesInMotion />
      <Experience />
      <Beyond />
      <Contact />
      <Footer />
    </main>
  );
}
