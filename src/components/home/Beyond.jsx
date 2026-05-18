import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

const content = homeCms.beyond;

const projects = [
  { img: "/web.png",    category: "Product & Digital",  name: "STRKT Store" },
  { img: "/soc.png",    category: "Marketing & Comms",  name: "Meridian Campaign" },
  { img: "/brandd.png", category: "Brand & Identity",   name: "MAD Identity" },
  { img: "/app.png",    category: "Product & Digital",  name: "TruBilling App" },
  { img: "/loggg.png",  category: "Brand & Identity",   name: "Brand System" },
  { img: "/post.png",   category: "Marketing & Comms",  name: "Content Strategy" },
];

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "scale(1.025)" : "scale(1)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,.18)" : "0 2px 8px rgba(0,0,0,.06)",
        transition: "transform 0.32s cubic-bezier(.16,1,.3,1), box-shadow 0.32s ease",
        flex: 1,
        minHeight: 0,
      }}
    >
      <img src={project.img} alt={project.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.12) 55%,transparent 100%)",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(12px,1.6vw,18px)" }}>
        <p style={{ fontSize: "clamp(8px,0.7vw,10px)", fontWeight: 700, color: "rgba(255,255,255,.55)",
          letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>
          {project.category}
        </p>
        <p style={{ fontSize: "clamp(12px,1.1vw,15px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: 0 }}>
          {project.name}
        </p>
      </div>
    </motion.div>
  );
}

export default function Beyond() {
  const titleLines = content.title.split("\n");

  return (
    <section style={{
      background: "#f8f8f6",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
        padding: "clamp(48px,6vw,80px) clamp(20px,4vw,48px)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "clamp(28px,3.5vw,44px)",
        boxSizing: "border-box",
      }}>

        {/* ── Top: Headline + Stats ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "clamp(24px,4vw,60px)", flexWrap: "wrap" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: "clamp(8px,0.75vw,10px)", fontWeight: 700, color: "#1980c2",
              letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14, fontFamily: "monospace" }}>
              {content.eyebrow}
            </p>
            <h2 style={{
              fontSize: "clamp(32px,4.2vw,60px)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "clamp(-1px,-0.03em,-2px)",
              color: "#0f172a",
              maxWidth: 540,
              margin: 0,
            }}>
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: "flex", gap: "clamp(28px,4vw,56px)", alignItems: "center", paddingTop: 4 }}
          >
            {content.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px,3.2vw,48px)", fontWeight: 900, color: "#0f172a",
                  lineHeight: 1, letterSpacing: -1, marginBottom: 4 }}>
                  {s.to}<span style={{ color: "#1980c2" }}>{s.suffix}</span>
                </div>
                <p style={{ fontSize: "clamp(9px,0.75vw,11px)", color: "rgba(15,23,42,.4)",
                  textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Project Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "clamp(10px,1.2vw,16px)",
          flex: 1,
          minHeight: "clamp(280px,32vw,420px)",
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 0.07} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px,3vw,40px)",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(15,23,42,.08)",
            paddingTop: "clamp(20px,2.5vw,32px)",
          }}
        >
          <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(15,23,42,.52)", lineHeight: 1.75,
            maxWidth: 440, margin: 0 }}>
            {content.body}{" "}
            <strong style={{ color: "#0f172a", fontWeight: 700 }}>{content.emphasis}</strong>
          </p>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
            <Button className="bg-gradient-to-r from-[#1980c2] to-[#45b3f5] text-white border-none rounded-full px-7 py-3 text-xs font-bold tracking-wider h-auto hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(25,128,194,.35)]">
              {content.primaryCta}
            </Button>
            <Button variant="outline"
              className="bg-black/[.04] text-[#0f172a] border-black/[.12] rounded-full px-7 py-3 text-xs font-semibold tracking-wider h-auto hover:bg-black/[.08] transition-colors">
              {content.secondaryCta}
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
