import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

const { brand, contact } = homeCms;
const SERVICES = contact.ai.services;

/* ─── Avatar ─── */
const MadAvatar = () => (
  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-900/40">
    <span className="text-[8.5px] font-black text-white">M</span>
  </div>
);

/* ─── Chat bubble ─── */
function Bubble({ role, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-1.5 ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      {role === "mad" && <MadAvatar />}
      <div
        className={`px-3 py-2 text-[11px] leading-relaxed text-white max-w-[82%] ${
          role === "user"
            ? "bg-gradient-to-br from-sky-500 to-blue-600 rounded-[14px_14px_4px_14px]"
            : "bg-white/10 rounded-[14px_14px_14px_4px]"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}

/* ─── Typing dots ─── */
function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-1.5"
    >
      <MadAvatar />
      <div className="bg-white/10 rounded-[14px_14px_14px_4px] px-3.5 py-2.5 flex gap-1 items-center">
        {[0, 0.22, 0.44].map((d, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-sky-400"
            style={{ animation: `dotPulse 1.2s ${d}s infinite` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Phone screen ─── */
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
      setMessages((prev) => {
        res();
        return [...prev, { role, content, id: Date.now() + Math.random() }];
      })
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
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErr(true);
      return;
    }
    setEmailErr(false);
    setPhase("sending");
    await push("user", email);
    setEmailVal("");
    await typeAndSay(`${contact.ai.donePrefix} ${email} ${contact.ai.doneSuffix}`, 1400);
    setPhase("done");
    setTimeout(() => {
      setNotif(true);
      setTimeout(() => setNotif(false), 4500);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Notification */}
      <AnimatePresence>
        {notif && (
          <motion.div
            key="notif"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute top-2 left-2 right-2 z-50 bg-black/90 backdrop-blur-xl rounded-2xl p-2.5 flex items-center gap-2.5 pointer-events-none shadow-2xl"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-0.5">
                <span className="text-[11px] font-bold text-white">Mail</span>
                <span className="text-[9px] text-white/35">now</span>
              </div>
              <div className="text-[10px] text-white/50 mb-0.5">{contact.ai.notificationTitle}</div>
              <div className="text-[10.5px] text-white/70 leading-snug truncate">{contact.ai.notificationBody}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-black/30 border-b border-white/5 flex-shrink-0">
        <div className="relative w-8 h-8 flex-shrink-0">
          <div
            className="absolute top-1/2 left-1/2 w-full h-full rounded-full border border-sky-400/50 pointer-events-none"
            style={{ animation: "ringOut 2.2s ease-out infinite" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center z-10 shadow-lg shadow-sky-900/50">
            <span className="text-xs font-black text-white">M</span>
          </div>
        </div>
        <div>
          <div className="text-[13px] font-bold text-white leading-none mb-1">{contact.ai.name}</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-white/40 font-medium">{contact.ai.status}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 flex flex-col gap-2.5 min-h-0"
        style={{ scrollbarWidth: "none" }}
      >
        {phase === "idle" ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-3 py-6 text-center">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-xl shadow-sky-900/40">
              <span className="text-xl font-black text-white">M</span>
            </div>
            <div>
              <div className="text-[13px] font-bold text-white mb-1.5">{contact.ai.idleTitle}</div>
              <div className="text-[10.5px] text-white/40 leading-relaxed max-w-[180px]">{contact.ai.idleBody}</div>
            </div>
            <button
              onClick={startChat}
              className="bg-gradient-to-br from-sky-500 to-blue-600 text-white border-none rounded-full px-5 py-2.5 text-[11px] font-bold tracking-wider cursor-pointer shadow-lg shadow-sky-900/40 hover:opacity-90 transition-opacity"
            >
              {contact.ai.start}
            </button>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              if (msg.role === "mad-services")
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className="flex flex-col gap-1.5 pl-7"
                  >
                    {SERVICES.map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => pickService(svc)}
                        className="bg-sky-500/10 border border-sky-500/25 rounded-xl px-3 py-2 text-[10.5px] text-sky-300 font-semibold text-left cursor-pointer hover:bg-sky-500/20 transition-colors"
                      >
                        {svc.icon} {svc.label}
                      </button>
                    ))}
                  </motion.div>
                );
              if (msg.role === "mad-transfer")
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className="pl-7 flex gap-2"
                  >
                    <button
                      onClick={() => confirmTransfer(true)}
                      className="bg-gradient-to-br from-sky-500 to-blue-600 border-none rounded-full px-3.5 py-2 text-[10.5px] text-white font-bold cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      Yes, connect me
                    </button>
                    <button
                      onClick={() => confirmTransfer(false)}
                      className="bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-[10.5px] text-white/45 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      Not now
                    </button>
                  </motion.div>
                );
              return <Bubble key={msg.id} role={msg.role} text={msg.content} />;
            })}
            <AnimatePresence>{typing && <TypingDots key="typing" />}</AnimatePresence>
            <div className="h-px" />
          </>
        )}
      </div>

      {/* Input bar */}
      <div className="px-3 pb-3 pt-1.5 bg-black/20 border-t border-white/5 flex-shrink-0">
        {phase === "email" || phase === "sending" ? (
          <div
            className={`flex items-center gap-2 rounded-3xl px-3.5 py-1.5 transition-all ${
              emailErr ? "bg-red-500/10 border border-red-500/40" : "bg-white/8 border border-white/5"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={emailVal}
              disabled={phase === "sending"}
              onChange={(e) => {
                setEmailVal(e.target.value);
                setEmailErr(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && submitEmail()}
              placeholder="your@email.com"
              className="flex-1 text-[11px] text-white bg-transparent border-none outline-none min-w-0 placeholder:text-white/25"
            />
            <div
              onClick={submitEmail}
              className={`w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center cursor-pointer transition-opacity ${
                phase === "sending" ? "opacity-50 cursor-default" : "hover:opacity-90"
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-white/5 rounded-3xl px-3.5 py-1.5">
            <span className="flex-1 text-[11px] text-white/20">
              {phase === "idle"
                ? "Tap to start chatting…"
                : phase === "done"
                ? "Conversation complete ✓"
                : "Choose an option above…"}
            </span>
            {phase === "idle" && (
              <div
                onClick={startChat}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Phone shell ─── */
function PhoneShell() {
  return (
    <div
      className="w-[260px] relative"
      style={{
        background: "#060608",
        borderRadius: 44,
        padding: 10,
        border: "1px solid rgba(255,255,255,.12)",
        boxShadow:
          "0 48px 96px rgba(0,0,0,.6), 0 16px 40px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05), 0 0 60px rgba(14,165,233,.12)",
      }}
    >
      {/* Notch */}
      <div className="w-20 h-6 bg-[#060608] rounded-b-[18px] mx-auto relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/10" />
      </div>
      {/* Screen */}
      <div className="bg-[#0d0d12] rounded-[34px] overflow-hidden h-[500px] flex flex-col">
        <div className="flex justify-between items-center px-4 py-1 flex-shrink-0">
          <span className="text-[9px] font-bold text-white/35">9:41</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.35)">
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
  );
}

/* ─── Main Contact section ─── */
export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const titleLines = contact.title.split("\n");

  return (
    <section ref={sectionRef} className="relative w-full">
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: .3; transform: scale(.85); }
          50%       { opacity: 1; transform: scale(1); }
        }
        @keyframes ringOut {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: .5; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
      `}</style>

      {/*
       * TWO-COLUMN GRID
       * Left  = scrollable form content
       * Right = sticky azure panel, phone floats at its top edge
       */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:items-start overflow-visible">

        {/* ── LEFT: scrollable form ── */}
        <div className="order-2 md:order-1 bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100/60 flex flex-col justify-start px-8 md:px-14 py-16 md:py-28 relative overflow-hidden md:min-h-screen">

          {/* Ambient blobs */}
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sky-300/20 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, -24, 0], opacity: [0.25, 0.5, 0.25] } : { opacity: 0 }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-200/25 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] } : { opacity: 0 }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          <div className="relative z-10 max-w-md w-full">
            {/* Eyebrow */}
            <motion.p
              className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-sky-500/70 mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {contact.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="text-3xl md:text-[2.6rem] font-black leading-tight tracking-tight text-slate-900 mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h2>

            {/* Body */}
            <motion.p
              className="text-sm md:text-[15px] text-slate-500 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {contact.body}
            </motion.p>

            {/* Form */}
            <motion.div
              id="contact-form"
              className="flex flex-col gap-3 mb-10"
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
                    className="flex items-center gap-3 bg-emerald-50 border border-emerald-200/60 rounded-2xl px-4 py-3 overflow-hidden"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{contact.successTitle}</div>
                      <div className="text-xs text-slate-500">{contact.successBody}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full rounded-2xl border border-sky-200/70 bg-white/80 text-slate-800 px-4 py-3 text-sm outline-none transition-all placeholder:text-sky-300/60 focus:border-sky-400/60 focus:bg-sky-50/50"
                  type="text"
                  placeholder={contact.fields.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="w-full rounded-2xl border border-sky-200/70 bg-white/80 text-slate-800 px-4 py-3 text-sm outline-none transition-all placeholder:text-sky-300/60 focus:border-sky-400/60 focus:bg-sky-50/50"
                  type="email"
                  placeholder={contact.fields.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <textarea
                className="w-full rounded-2xl border border-sky-200/70 bg-white/80 text-slate-800 px-4 py-3 text-sm outline-none resize-none transition-all placeholder:text-sky-300/60 focus:border-sky-400/60 focus:bg-sky-50/50 h-28"
                placeholder={contact.fields.message}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
              />
              <Button
                onClick={() => {
                  if (form.name && form.email) {
                    setSent(true);
                    setTimeout(() => setSent(false), 5000);
                  }
                }}
                className="w-full bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-none rounded-full py-3 text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-sky-400/30 hover:shadow-sky-500/40 transition-all h-auto"
              >
                {contact.submit}
              </Button>
              <p className="text-xs text-slate-400 text-center">
                {contact.emailPrefix}{" "}
                <a href={`mailto:${brand.email}`} className="text-sky-500 font-semibold hover:text-sky-600 transition-colors">
                  {brand.email}
                </a>
              </p>
            </motion.div>

            {/* Principles */}
            <motion.div
              className="flex flex-col gap-4"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {contact.principles.map(([num, title, sub]) => (
                <motion.div
                  key={num}
                  className="flex gap-3 items-start"
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <span className="font-mono text-[8px] font-bold text-sky-400/60 pt-0.5 min-w-[16px]">{num}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800 mb-0.5">{title}</div>
                    <div className="text-xs text-slate-500/70 leading-relaxed">{sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: sticky azure panel ── */}
        <div
          className="order-1 md:order-2 relative overflow-visible"
          style={{
            /* sticky pinned at section top */
            position: "sticky",
            top: 0,
            height: "100vh",
            alignSelf: "start",
            /* deep, fully opaque azure — no transparency on mobile */
            background: "linear-gradient(155deg, #0c4a7a 0%, #0e6bab 40%, #1982c4 70%, #1d4ed8 100%)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Depth orbs — clipped inside panel */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-16 -right-16 w-96 h-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(56,189,248,.18) 0%, transparent 70%)" }}
              animate={inView ? { y: [0, -30, 0], scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(30,64,175,.45) 0%, transparent 70%)" }}
              animate={inView ? { y: [0, 24, 0], opacity: [0.5, 0.9, 0.5] } : { opacity: 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            />
          </div>

          {/*
           * ── Phone: centred in the panel, peeking above the top edge ──
           *
           * On desktop: positioned near the top of the sticky panel so it
           * appears to "float" above the section fold.
           * On mobile: centred in the full-height panel.
           */}
          <div className="absolute inset-0 flex items-start justify-center pt-8 md:pt-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -40, scale: 0.92 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="pointer-events-auto"
            >
              {/* Bob wrapper */}
              <motion.div
                animate={inView ? { y: [0, -14, 0] } : { y: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative" }}
              >
                <PhoneShell />
                {/* Ground shadow */}
                <motion.div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full blur-xl pointer-events-none"
                  style={{ background: "rgba(7,30,60,.55)" }}
                  animate={inView ? { scaleX: [1, 0.72, 1], opacity: [0.6, 0.3, 0.6] } : { opacity: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Panel label at bottom */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">{contact.ai.status}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}