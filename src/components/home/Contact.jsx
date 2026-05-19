import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const titleLines = contact.title.split("\n");

  const inputBase = {
    background: "rgba(255,255,255,0.88)",
    border: "1.5px solid rgba(25,128,194,.18)",
    color: "#181817",
    padding: "12px 14px",
    fontSize: 13,
    borderRadius: 8,
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <section
      style={{
        paddingBottom: 0,
        background: "linear-gradient(135deg, #dff0fb 0%, #fff8f5 98%, #fdeadb 48%, #e8f5fb 68%, #fff4ef 84%, #e0f0fb 100%)",
      }}
    >
      <style>{`
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
        @keyframes ringOut{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .mad-scroll::-webkit-scrollbar{display:none}
        .c-input::placeholder{color:rgba(24,24,23,.32)}
        .c-input:focus{border-color:rgba(25,128,194,.45)!important;background:#fff!important}
        @keyframes signagePulse{0%,100%{transform:scale(1);box-shadow:0 4px 20px rgba(25,128,194,.4)}50%{transform:scale(1.03);box-shadow:0 8px 32px rgba(25,128,194,.6)}}
        @keyframes signageBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes liveDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(0.7)}}
        @media(min-width:768px){
          .phone-sticky{
            position:sticky;
            top:24px;
            align-self:start;
          }
        }
      `}</style>

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* LEFT — form, never hidden */}
          <div className="order-2 md:order-1 pt-12 md:pt-24 pb-20">

            {/* Header block — plain div, NO sticky, NO whileInView clipping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <p
                style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.28em",
                  textTransform: "uppercase", color: "rgba(25,128,194,.6)", marginBottom: 12,
                }}
              >
                {contact.eyebrow}
              </p>
              <h2
                className="text-3xl md:text-5xl"
                style={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.8, color: "#0f2a45", marginBottom: 16 }}
              >
                {titleLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(15,42,69,.55)", marginBottom: 8, maxWidth: 400 }}>
                {contact.body}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(15,42,69,.4)", maxWidth: 400 }}>
                {contact.subbody}
              </p>
            </motion.div>

            {/* Principles — scroll reveal is fine here, they're below the fold */}
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}
            >
              {contact.principles.map(([num, title, sub]) => (
                <motion.div
                  key={num}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: 8, fontWeight: 700, color: "rgba(25,128,194,.45)", paddingTop: 3, minWidth: 18 }}>
                    {num}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f2a45", marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "rgba(15,42,69,.5)", lineHeight: 1.55 }}>{sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form — always rendered, animate on mount not on scroll */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {/* Success banner — slides in above form, form stays visible */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "rgba(52,211,153,.1)",
                      border: "1.5px solid rgba(52,211,153,.35)",
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(52,211,153,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f2a45", marginBottom: 2 }}>{contact.successTitle}</div>
                      <div style={{ fontSize: 11, color: "rgba(15,42,69,.5)" }}>{contact.successBody}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="c-input"
                  type="text"
                  placeholder={contact.fields.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputBase}
                />
                <input
                  className="c-input"
                  type="email"
                  placeholder={contact.fields.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputBase}
                />
              </div>
              <textarea
                className="c-input"
                placeholder={contact.fields.message}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                style={{ ...inputBase, height: 100, resize: "none" }}
              />
              <Button
                onClick={() => {
                  if (form.name && form.email) {
                    setSent(true);
                    setTimeout(() => setSent(false), 5000);
                  }
                }}
                className="w-full bg-gradient-to-r from-[#1980c2] to-[#45b3f5] text-white border-none rounded-full py-3 text-xs font-bold tracking-widest uppercase shadow-[0_4px_20px_rgba(25,128,194,.28)] hover:opacity-90 transition-opacity h-auto"
              >
                {contact.submit}
              </Button>
              <p style={{ fontSize: 11, color: "rgba(15,42,69,.42)", textAlign: "center" }}>
                {contact.emailPrefix}{" "}
                <a href={`mailto:${brand.email}`} style={{ color: "#1980c2", fontWeight: 600 }}>
                  {brand.email}
                </a>
              </p>
            </motion.div>
          </div>

          {/* RIGHT — phone, scroll reveal */}
          <motion.div
            className="phone-sticky order-1 md:order-2 flex flex-col items-center md:block pt-8 md:pt-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Signage badge */}
            <div className="flex justify-center mb-4">
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,#1980c2,#45b3f5)",
                  borderRadius: 99, padding: "8px 16px 8px 10px",
                  boxShadow: "0 4px 20px rgba(25,128,194,.4)", cursor: "pointer",
                  animation: "signagePulse 2.4s ease-in-out infinite",
                }}
              >
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", animation: "signageBob 1.2s ease-in-out infinite" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                  Chat with MAD AI →
                </span>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", animation: "liveDot 1.4s ease-in-out infinite" }} />
              </div>
            </div>

            {/* Phone shell */}
            <div
              className="w-full md:w-[300px]"
              style={{
                background: "#080808", borderRadius: 44, padding: 10,
                border: "1px solid rgba(255,255,255,.08)",
                boxShadow: "0 40px 80px rgba(15,42,69,.22),0 16px 40px rgba(15,42,69,.14),0 0 0 1px rgba(255,255,255,.04)",
              }}
            >
              <div style={{ width: 90, height: 26, background: "#080808", borderRadius: "0 0 18px 18px", margin: "0 auto", position: "relative", zIndex: 4 }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 9, height: 9, borderRadius: "50%", background: "#181818", border: "1px solid rgba(255,255,255,.08)" }} />
              </div>
              <div style={{ background: "#111", borderRadius: 36, overflow: "hidden", height: 520, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 18px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.4)", flexShrink: 0 }}>
                  <span>9:41</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.4)">
                    <rect x="0" y="4" width="2" height="6" rx=".5" />
                    <rect x="3" y="2" width="2" height="8" rx=".5" />
                    <rect x="6" y="0" width="2" height="10" rx=".5" />
                  </svg>
                </div>
                <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                  <PhoneScreen />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}