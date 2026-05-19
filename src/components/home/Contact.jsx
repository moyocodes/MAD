import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

const { brand, contact } = homeCms;
const SERVICES = contact.ai.services;

const MadAvatar = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 8,
      background: "linear-gradient(135deg,#1980c2,#45b3f5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: 8.5, fontWeight: 900, color: "#fff" }}>M</span>
  </div>
);

function Bubble({ role, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        justifyContent: role === "user" ? "flex-end" : "flex-start",
      }}
    >
      {role === "mad" && <MadAvatar />}
      <div
        style={{
          background: role === "user" ? "linear-gradient(135deg,#1980c2,#45b3f5)" : "#1e1e1e",
          borderRadius: role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          padding: "9px 12px",
          fontSize: 11,
          color: "#fff",
          lineHeight: 1.6,
          maxWidth: "82%",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: "flex", alignItems: "flex-end", gap: 6 }}
    >
      <MadAvatar />
      <div
        style={{
          background: "#1e1e1e",
          borderRadius: "14px 14px 14px 4px",
          padding: "10px 14px",
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        {[0, 0.22, 0.44].map((d, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#45b3f5",
              animation: `dotPulse 1.2s ${d}s infinite`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function PhoneScreen() {
  const [phase, setPhase] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [notif, setNotif] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const lockedRef = useRef(false);

  const scrollBottom = () => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const push = (role, content) =>
    new Promise((res) =>
      setMessages((prev) => { res(); return [...prev, { role, content, id: Date.now() + Math.random() }]; })
    );

  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  const typeAndSay = async (text, ms = 1100) => {
    setTyping(true);
    await wait(ms);
    setTyping(false);
    await push("mad", text);
    scrollBottom();
  };

  const startChat = async () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setPhase("greeting");
    await typeAndSay(contact.ai.greeting, 1200);
    await push("mad-services", null);
  };

  const pickService = async (svc) => {
    if (phase !== "greeting") return;
    setPhase("deep");
    setMessages((prev) => prev.filter((m) => m.role !== "mad-services"));
    await push("user", svc.label);
    for (let i = 0; i < svc.reply.length; i++) {
      await typeAndSay(svc.reply[i], 900 + i * 150);
    }
    await typeAndSay(contact.ai.transferPrompt, 900);
    await push("mad-transfer", null);
    setPhase("transfer");
  };

  const confirmTransfer = async (yes) => {
    setMessages((prev) => prev.filter((m) => m.role !== "mad-transfer"));
    if (!yes) {
      await push("user", "Not right now.");
      await typeAndSay(contact.ai.noTransfer, 900);
      setPhase("done");
      return;
    }
    await push("user", "Yes, connect me.");
    await typeAndSay(contact.ai.emailPrompt, 1000);
    setPhase("email");
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const submitEmail = async () => {
    const email = emailVal.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setEmailErr(true); return; }
    setEmailErr(false);
    setPhase("sending");
    await push("user", email);
    setEmailVal("");
    await typeAndSay(`${contact.ai.donePrefix} ${email} ${contact.ai.doneSuffix}`, 1400);
    setPhase("done");
    setTimeout(() => { setNotif(true); setTimeout(() => setNotif(false), 4500); }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative", overflow: "hidden" }}>
      <AnimatePresence>
        {notif && (
          <motion.div
            key="notif"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "absolute", top: 8, left: 8, right: 8, zIndex: 60,
              background: "rgba(20,20,28,0.95)", backdropFilter: "blur(20px)",
              borderRadius: 14, padding: "10px 12px", display: "flex",
              alignItems: "center", gap: 10, pointerEvents: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,.4)",
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0a84ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Mail</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)" }}>now</span>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.55)", marginBottom: 1 }}>{contact.ai.notificationTitle}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.75)", lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{contact.ai.notificationBody}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#111", borderBottom: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
        <div style={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%", borderRadius: "50%", border: "1px solid rgba(25,128,194,.5)", animation: "ringOut 2.2s ease-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#1980c2,#45b3f5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#fff" }}>M</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 3 }}>{contact.ai.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.38)", fontWeight: 500 }}>{contact.ai.status}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="mad-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px", display: "flex", flexDirection: "column", gap: 9, minHeight: 0 }}>
        {phase === "idle" ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "24px 12px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#1980c2,#45b3f5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(25,128,194,.4)" }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>M</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{contact.ai.idleTitle}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.38)", lineHeight: 1.55, maxWidth: 180 }}>{contact.ai.idleBody}</div>
            </div>
            <button onClick={startChat} style={{ background: "linear-gradient(135deg,#1980c2,#45b3f5)", color: "#fff", border: "none", borderRadius: 20, padding: "10px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", boxShadow: "0 4px 18px rgba(25,128,194,.4)" }}>
              {contact.ai.start}
            </button>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              if (msg.role === "mad-services")
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 30 }}>
                    {SERVICES.map((svc) => (
                      <button key={svc.id} onClick={() => pickService(svc)}
                        style={{ background: "rgba(25,128,194,.12)", border: "1px solid rgba(25,128,194,.3)", borderRadius: 10, padding: "8px 12px", fontSize: 10.5, color: "#45b3f5", fontWeight: 600, textAlign: "left", cursor: "pointer", transition: "background .15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(25,128,194,.22)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(25,128,194,.12)")}
                      >
                        {svc.icon} {svc.label}
                      </button>
                    ))}
                  </motion.div>
                );
              if (msg.role === "mad-transfer")
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} style={{ paddingLeft: 30, display: "flex", gap: 6 }}>
                    <button onClick={() => confirmTransfer(true)} style={{ background: "linear-gradient(135deg,#1980c2,#45b3f5)", border: "none", borderRadius: 20, padding: "8px 14px", fontSize: 10.5, color: "#fff", fontWeight: 700, cursor: "pointer" }}>Yes, connect me</button>
                    <button onClick={() => confirmTransfer(false)} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "8px 14px", fontSize: 10.5, color: "rgba(255,255,255,.45)", cursor: "pointer" }}>Not now</button>
                  </motion.div>
                );
              return <Bubble key={msg.id} role={msg.role} text={msg.content} />;
            })}
            <AnimatePresence>{typing && <TypingDots key="typing" />}</AnimatePresence>
            <div style={{ height: 1 }} />
          </>
        )}
      </div>

      {/* Input bar */}
      <div style={{ padding: "7px 12px 12px", background: "#111", borderTop: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
        {phase === "email" || phase === "sending" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: emailErr ? "rgba(239,68,68,.12)" : "#1d1d1d", border: emailErr ? "1px solid rgba(239,68,68,.4)" : "1px solid transparent", borderRadius: 24, padding: "6px 6px 6px 14px", transition: "all .2s" }}>
            <input ref={inputRef} type="text" value={emailVal} disabled={phase === "sending"}
              onChange={(e) => { setEmailVal(e.target.value); setEmailErr(false); }}
              onKeyDown={(e) => e.key === "Enter" && submitEmail()}
              placeholder="your@email.com"
              style={{ flex: 1, fontSize: 11, color: "#fff", background: "transparent", border: "none", outline: "none", minWidth: 0 }}
            />
            <div onClick={submitEmail} style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#1980c2,#45b3f5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: phase === "sending" ? "default" : "pointer", opacity: phase === "sending" ? 0.5 : 1 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1d1d1d", borderRadius: 24, padding: "6px 6px 6px 14px" }}>
            <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,.2)" }}>
              {phase === "idle" ? "Tap to start chatting…" : phase === "done" ? "Conversation complete ✓" : "Choose an option above…"}
            </span>
            {phase === "idle" && (
              <div onClick={startChat} style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#1980c2,#45b3f5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const titleLines = contact.title.split("\n");

  return (
    <section ref={sectionRef} className="relative">
      <style>{`
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
        @keyframes ringOut{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .mad-scroll::-webkit-scrollbar{display:none}
        .c-input::placeholder{color:rgba(25,128,194,.35)}
        .c-input:focus{border-color:rgba(25,128,194,.5)!important;background:rgba(25,128,194,.06)!important}
      `}</style>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:items-start">

        {/* ── LEFT — form ── */}
        <div className="order-2 md:order-1 bg-gradient-to-br from-white via-azure-50 to-azure-100/70 flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 relative overflow-hidden md:min-h-screen">

          {/* looping blob */}
          <motion.div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-azure-300/20 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, -22, 0], opacity: [0.3, 0.55, 0.3] } : { opacity: 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-azure-200/25 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, 18, 0], opacity: [0.2, 0.45, 0.2] } : { opacity: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          <div className="relative z-10 max-w-md w-full">
            {/* Eyebrow */}
            <motion.p
              className="text-xs font-mono font-bold tracking-[0.28em] uppercase text-azure-500/60 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {contact.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-azure-900 mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            >
              {titleLines.map((line, i) => <span key={i} className="block">{line}</span>)}
            </motion.h2>

            {/* Body */}
            <motion.p
              className="text-sm md:text-base text-azure-700/55 leading-relaxed mb-7"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {contact.body}
            </motion.p>

            {/* Form */}
            <motion.div
              id="contact-form"
              className="flex flex-col gap-2.5 mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 bg-green-50 border border-green-200/60 rounded-xl px-4 py-3 overflow-hidden"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-azure-900">{contact.successTitle}</div>
                      <div className="text-xs text-azure-700/50">{contact.successBody}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input className="c-input w-full rounded-xl border border-azure-200/70 bg-white/70 text-azure-900 px-4 py-3 text-sm outline-none transition-colors"
                  type="text" placeholder={contact.fields.name}
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="c-input w-full rounded-xl border border-azure-200/70 bg-white/70 text-azure-900 px-4 py-3 text-sm outline-none transition-colors"
                  type="email" placeholder={contact.fields.email}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <textarea className="c-input w-full rounded-xl border border-azure-200/70 bg-white/70 text-azure-900 px-4 py-3 text-sm outline-none resize-none transition-colors h-24"
                placeholder={contact.fields.message}
                value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
              <Button
                onClick={() => { if (form.name && form.email) { setSent(true); setTimeout(() => setSent(false), 5000); } }}
                className="w-full bg-azure-500 hover:bg-azure-600 text-white border-none rounded-full py-3 text-xs font-bold tracking-widest uppercase shadow-lg shadow-azure-400/25 hover:shadow-azure-500/35 transition-all h-auto"
              >
                {contact.submit}
              </Button>
              <p className="text-xs text-azure-700/40 text-center">
                {contact.emailPrefix}{" "}
                <a href={`mailto:${brand.email}`} className="text-azure-500 font-semibold hover:text-azure-600 transition-colors">{brand.email}</a>
              </p>
            </motion.div>

            {/* Principles */}
            <motion.div
              className="flex flex-col gap-3.5"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {contact.principles.map(([num, title, sub]) => (
                <motion.div
                  key={num}
                  className="flex gap-3 items-start"
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <span className="font-mono text-[8px] font-bold text-azure-400/60 pt-0.5 min-w-[16px]">{num}</span>
                  <div>
                    <div className="text-xs font-bold text-azure-900 mb-0.5">{title}</div>
                    <div className="text-xs text-azure-700/45 leading-relaxed">{sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT — sticky phone panel ── */}
        <div
          className="order-1 md:order-2 bg-gradient-to-br from-azure-400/80 via-azure-500/70 to-azure-600/80 flex items-center justify-center px-8 py-16 md:py-0 relative min-h-[65vh] md:min-h-0"
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "visible" }}
        >
          {/* Background elements contained within panel */}
          <div className="absolute inset-0 overflow-hidden rounded-none pointer-events-none">
            <motion.div
              className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-azure-300/30 blur-3xl"
              animate={inView ? { y: [0, -28, 0], scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] } : { opacity: 0 }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-azure-700/25 blur-3xl"
              animate={inView ? { y: [0, 22, 0], opacity: [0.25, 0.5, 0.25] } : { opacity: 0 }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-azure-200/20 blur-2xl"
              animate={inView ? { x: [0, 16, 0], y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] } : { opacity: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
            />
          </div>

          {/* Phone — floats at the seam edge, sticks while form scrolls */}
          <motion.div
            className="relative z-10 md:-mt-20"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <motion.div
              animate={inView ? { y: [0, -13, 0] } : { y: 0 }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-[260px]"
            >
              <div className="bg-[#080808] rounded-[44px] p-2.5 border border-white/10"
                style={{ boxShadow: "0 40px 80px rgba(0,0,0,.45), 0 12px 32px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.05)" }}>
                <div className="w-20 h-6 bg-[#080808] rounded-b-[18px] mx-auto relative z-[4]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/10" />
                </div>
                <div className="bg-[#111] rounded-[34px] overflow-hidden h-[500px] flex flex-col">
                  <div className="flex justify-between items-center px-4 py-1 flex-shrink-0">
                    <span className="text-[9px] font-bold text-white/40">9:41</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.4)">
                      <rect x="0" y="4" width="2" height="6" rx=".5" />
                      <rect x="3" y="2" width="2" height="8" rx=".5" />
                      <rect x="6" y="0" width="2" height="10" rx=".5" />
                    </svg>
                  </div>
                  <div className="flex-1 min-h-0 flex flex-col">
                    <PhoneScreen />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full bg-azure-900/40 blur-xl pointer-events-none"
              animate={inView ? { scaleX: [1, 0.75, 1], opacity: [0.5, 0.25, 0.5] } : { opacity: 0 }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}