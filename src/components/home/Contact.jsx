import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

const LOGO_SRC = "YOUR_LOGO_URL_HERE";

const { brand, contact } = homeCms;
const SERVICES = contact.ai.services;

const COPY = {
  greeting:
    "Hi there! 👋 I'm Mad, your AI assistant. What can I help you with today?",
  transferPrompt:
    "Want me to connect you with our team for a deeper conversation?",
  emailPrompt: "Great! Drop your email and we'll reach out shortly.",
  donePrefix: "Perfect! We'll be in touch at",
  doneSuffix: "soon ✓",
  noTransfer:
    "No worries! Feel free to come back anytime. Have a great day! 👋",
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── TypingText (TruBilling-style) ───────────────────────────────────────────
function TypingText({ texts, inView, delay = 0, className = "" }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      setDone(false);
      setIndex(0);
      return;
    }

    let charIndex = 0;
    let charTimer = null;
    let startTimer = null;

    const startTyping = () => {
      const current = texts[index] || "";
      setDisplayed("");
      setDone(false);
      charIndex = 0;
      charTimer = setInterval(() => {
        charIndex += 1;
        setDisplayed(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          clearInterval(charTimer);
          setDone(true);
          startTimer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % texts.length);
          }, 1200);
        }
      }, 55);
    };

    startTimer = setTimeout(startTyping, delay * 1000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(charTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, index, delay]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          className="inline-block bg-blue-500 ml-0.5 align-middle"
          style={{
            width: 2,
            height: "0.85em",
            animation: "madBlink 0.75s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

// ─── Chat sub-components ──────────────────────────────────────────────────────
function MadAvatar({ size = "sm" }) {
  const dim =
    size === "lg" ? "w-16 h-16" : size === "md" ? "w-8 h-8" : "w-6 h-6";
  const text =
    size === "lg" ? "text-2xl" : size === "md" ? "text-sm" : "text-[8px]";
  return (
    <div
      className={`${dim} rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg shadow-sky-900/40`}
    >
      <img
        src={LOGO_SRC}
        alt="Mad"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
      <span
        className={`hidden ${text} font-black text-white items-center justify-center w-full h-full`}
      >
        M
      </span>
    </div>
  );
}

function TypingBubble({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);
    const timer = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, ++idx.current));
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 26);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="flex items-end gap-1.5 animate-[fadeUp_.28s_ease_both]">
      <MadAvatar />
      <div className="bg-white/10 rounded-[14px_14px_14px_4px] px-3 py-2 text-[11px] leading-relaxed text-white max-w-[82%] font-mono">
        {displayed}
        {!done && (
          <span className="inline-block w-px h-3 bg-sky-400 ml-0.5 animate-[blink_1s_infinite]" />
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-end gap-1.5 animate-[fadeUp_.2s_ease_both]">
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
    </div>
  );
}

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex items-end gap-1.5 animate-[fadeUp_.28s_ease_both] ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <MadAvatar />}
      <div
        className={`px-3 py-2 text-[11px] leading-relaxed text-white max-w-[82%] ${
          isUser
            ? "bg-gradient-to-br from-sky-500 to-blue-600 rounded-[14px_14px_4px_14px]"
            : "bg-white/10 rounded-[14px_14px_14px_4px]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function Notification({ email, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 4500);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <div className="absolute top-2 left-2 right-2 z-50 bg-black/90 backdrop-blur-xl rounded-2xl p-2.5 flex items-center gap-2.5 pointer-events-none shadow-2xl animate-[slideDown_.4s_cubic-bezier(.16,1,.3,1)_both]">
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
        <div className="text-[10px] text-white/50 mb-0.5">New message sent</div>
        <div className="text-[10.5px] text-white/70 leading-snug truncate">
          Your enquiry has been received at {email}
        </div>
      </div>
    </div>
  );
}

function CallingScreen({ onAnswer, onDecline }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 py-8 bg-gradient-to-b from-[#0a1628] to-[#0d0d12]">
      <div className="text-center animate-[fadeUp_.6s_ease_both]">
        <p className="text-[10px] text-white/35 tracking-[.2em] uppercase mb-2">
          Incoming call
        </p>
        <p className="text-base font-extrabold text-white leading-none mb-1">
          Mad AI
        </p>
        <p className="text-[10px] text-white/40">Assistant · Online</p>
      </div>

      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 rounded-full border border-sky-400/40 animate-[ringOut_2s_ease-out_infinite]" />
        <div className="absolute inset-0 rounded-full border border-sky-300/20 animate-[ringOut_2s_ease-out_.7s_infinite]" />
        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center overflow-hidden shadow-xl shadow-sky-900/50 z-10">
          <img
            src={LOGO_SRC}
            alt="Mad"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <span className="hidden text-2xl font-black text-white items-center justify-center w-full h-full">
            M
          </span>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-center w-full">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onDecline}
            className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
              <line x1="22" y1="2" x2="2" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-[9px] text-white/35">Decline</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onAnswer}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity active:scale-95 animate-[callerPulse_1.8s_ease-in-out_infinite]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
            </svg>
          </button>
          <span className="text-[9px] text-white/35">Answer</span>
        </div>
      </div>
    </div>
  );
}

function DeclinedScreen({ onCallback }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center animate-[fadeUp_.4s_ease_both]">
      <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
          <line x1="22" y1="2" x2="2" y2="22" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-[13px] font-bold text-white">Call ended</p>
      <p className="text-[10px] text-white/35 leading-relaxed">
        You missed Mad AI.
        <br />
        Tap to call back.
      </p>
      <button
        onClick={onCallback}
        className="mt-2 bg-gradient-to-br from-sky-500 to-blue-600 border-none rounded-full px-6 py-2.5 text-[11px] text-white font-bold cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
      >
        Call back
      </button>
    </div>
  );
}

function ChatScreen() {
  const [phase, setPhase] = useState("greeting-start");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [showDots, setShowDots] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [notif, setNotif] = useState(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const lockedRef = useRef(false);

  const scrollBottom = useCallback(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  const pushMsg = useCallback((role, text) => {
    setMessages((prev) => [
      ...prev,
      { role, text, id: Date.now() + Math.random() },
    ]);
  }, []);

  const typeAndSay = useCallback(
    async (text, delayMs = 1000) => {
      setShowDots(true);
      setTyping(false);
      await wait(delayMs * 0.4);
      setShowDots(false);
      setTypingText(text);
      setTyping(true);
      await wait(Math.max(text.length * 26 + 400, delayMs * 0.6));
      setTyping(false);
      setTypingText("");
      pushMsg("mad", text);
    },
    [pushMsg],
  );

  useEffect(() => {
    if (!lockedRef.current) {
      lockedRef.current = true;
      (async () => {
        await typeAndSay(COPY.greeting, 1200);
        pushMsg("services", null);
        setPhase("greeting");
      })();
    }
  }, [typeAndSay, pushMsg]);

  useEffect(() => {
    scrollBottom();
  }, [messages, typing, showDots, scrollBottom]);

  const pickService = async (svc) => {
    if (phase !== "greeting") return;
    setPhase("deep");
    setMessages((prev) => prev.filter((m) => m.role !== "services"));
    pushMsg("user", svc.label);
    for (let i = 0; i < svc.reply.length; i++) {
      await typeAndSay(svc.reply[i], 900 + i * 150);
    }
    await typeAndSay(COPY.transferPrompt, 900);
    pushMsg("transfer", null);
    setPhase("transfer");
  };

  const confirmTransfer = async (yes) => {
    setMessages((prev) => prev.filter((m) => m.role !== "transfer"));
    if (!yes) {
      pushMsg("user", "Not right now.");
      await typeAndSay(COPY.noTransfer, 900);
      setPhase("done");
      return;
    }
    pushMsg("user", "Yes, connect me.");
    await typeAndSay(COPY.emailPrompt, 1000);
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
    pushMsg("user", email);
    setEmailVal("");
    await typeAndSay(`${COPY.donePrefix} ${email} ${COPY.doneSuffix}`, 1400);
    setPhase("done");
    setNotif(email);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {notif && <Notification email={notif} onHide={() => setNotif(null)} />}

      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-black/30 border-b border-white/5 flex-shrink-0">
        <div className="relative w-8 h-8 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border border-sky-400/50 animate-[ringOut_2.2s_ease-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center z-10 overflow-hidden shadow-lg shadow-sky-900/50">
            <img
              src={LOGO_SRC}
              alt="Mad"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <span className="hidden text-xs font-black text-white items-center justify-center w-full h-full">
              M
            </span>
          </div>
        </div>
        <div>
          <p className="text-[13px] font-bold text-white leading-none mb-1">
            Mad AI
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-white/40 font-medium">
              Active now
            </span>
          </div>
        </div>
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 flex flex-col gap-2.5 min-h-0 [scrollbar-width:none]"
      >
        {messages.map((msg) => {
          if (msg.role === "services") {
            return (
              <div
                key={msg.id}
                className="flex flex-col gap-1.5 pl-7 animate-[fadeUp_.28s_ease_both]"
              >
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => pickService(svc)}
                    className="bg-sky-500/10 border border-sky-500/25 rounded-xl px-3 py-2 text-[10.5px] text-sky-300 font-semibold text-left cursor-pointer hover:bg-sky-500/20 transition-colors active:scale-[.98]"
                  >
                    {svc.icon} {svc.label}
                  </button>
                ))}
              </div>
            );
          }
          if (msg.role === "transfer") {
            return (
              <div
                key={msg.id}
                className="pl-7 flex gap-2 animate-[fadeUp_.28s_ease_both]"
              >
                <button
                  onClick={() => confirmTransfer(true)}
                  className="bg-gradient-to-br from-sky-500 to-blue-600 border-none rounded-full px-3.5 py-2 text-[10.5px] text-white font-bold cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
                >
                  Yes, connect me
                </button>
                <button
                  onClick={() => confirmTransfer(false)}
                  className="bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-[10.5px] text-white/45 cursor-pointer hover:bg-white/10 transition-colors active:scale-95"
                >
                  Not now
                </button>
              </div>
            );
          }
          return <Bubble key={msg.id} role={msg.role} text={msg.text} />;
        })}

        {showDots && <TypingDots />}
        {typing && typingText && <TypingBubble text={typingText} />}
        <div className="h-px" />
      </div>

      <motion.div className="px-3 pb-3 pt-2 bg-gradient-to-t from-black/40 via-black/20 to-transparent border-t border-white/5 flex-shrink-0 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {phase === "email" || phase === "sending" ? (
            <motion.div
              key="email-input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-2.5 rounded-2xl px-4 py-2.5 border transition-all duration-300 ${
                emailErr
                  ? "bg-red-500/15 border-red-500/50 ring-1 ring-red-500/20"
                  : "bg-white/12 border-white/20 hover:bg-white/15 hover:border-white/30"
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
                className="flex-1 text-[12px] text-white bg-transparent border-none outline-none min-w-0 placeholder:text-white/35 font-medium"
              />
              <motion.button
                onClick={submitEmail}
                disabled={phase === "sending"}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg shadow-sky-500/20 ${
                  phase === "sending"
                    ? "opacity-40 cursor-default"
                    : "hover:shadow-sky-500/40 hover:shadow-lg"
                }`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="status-message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 bg-gradient-to-r from-white/8 to-white/5 rounded-2xl px-4 py-3 border border-white/15 backdrop-blur-xs"
            >
              {phase === "done" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
              )}
              <span className="flex-1 text-[11px] text-white/45 font-medium">
                {phase === "done"
                  ? "Conversation complete"
                  : "Choose an option above…"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PhoneShell() {
  const [callPhase, setCallPhase] = useState("calling");

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
      <div className="w-20 h-6 bg-[#060608] rounded-b-[18px] mx-auto relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/10" />
      </div>

      <div className="bg-[#0d0d12] rounded-[34px] overflow-hidden h-[500px] flex flex-col">
        <div className="flex justify-between items-center px-4 py-1 flex-shrink-0">
          <span className="text-[9px] font-bold text-white/35 font-mono">
            9:41
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.35)">
            <rect x="0" y="4" width="2" height="6" rx=".5" />
            <rect x="3" y="2" width="2" height="8" rx=".5" />
            <rect x="6" y="0" width="2" height="10" rx=".5" />
          </svg>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          {callPhase === "calling" && (
            <CallingScreen
              onAnswer={() => setCallPhase("chat")}
              onDecline={() => setCallPhase("declined")}
            />
          )}
          {callPhase === "declined" && (
            <DeclinedScreen onCallback={() => setCallPhase("calling")} />
          )}
          {callPhase === "chat" && <ChatScreen />}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MadPhoneChatWithForm() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const titleLines = contact.title.split("\n");

  // Words that cycle in the "Talk to" heading inside the left form panel
  const MAD_TEXTS = ["MAD", "the future", "Mad AI"];

  return (
    <section ref={sectionRef} className="relative">
      <style>{`
        @keyframes madBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes dotPulse {
          0%, 100% { opacity: .3; transform: scale(.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes ringOut {
          0% { transform: translate(-50%, -50%) scale(1); opacity: .6; }
          100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes callerPulse {
          0%, 100% { opacity: .85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        .contact-grid { overflow: visible !important; }
        @media(min-width:768px){
          .right-panel-sticky {
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            align-self: start !important;
            overflow: visible !important;
          }
        }
        .c-input::placeholder { color: rgba(25, 128, 194, 0.35); }
        .c-input:focus {
          border-color: rgba(25, 128, 194, 0.5) !important;
          background: rgba(25, 128, 194, 0.06) !important;
        }
      `}</style>

      <div className="contact-grid w-full grid grid-cols-1 md:grid-cols-2 md:items-start">

        {/* ── LEFT — form column ── */}
        <div className="order-2 md:order-1 bg-white md:bg-gradient-to-br md:from-white md:via-blue-50 md:to-blue-100/70 flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 relative overflow-hidden md:min-h-screen">
          <motion.div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, -22, 0], opacity: [0.3, 0.55, 0.3] } : { opacity: 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-blue-200/25 blur-3xl pointer-events-none"
            animate={inView ? { y: [0, 18, 0], opacity: [0.2, 0.45, 0.2] } : { opacity: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          <div className="relative z-10 max-w-md w-full">
         

            {/* ── "Talk to MAD" with TruBilling TypingText ── */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            >
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-blue-400/60 mb-1">
                Talk to
              </p>
              <h2 className="text-3xl md:text-5xl font-black leading-none tracking-tight text-blue-900">
                <TypingText
                  texts={MAD_TEXTS}
                  inView={inView}
                  delay={0.4}
                  className="text-blue-700/80"
                />
              </h2>
            </motion.div>

            <motion.h3
              className="text-lg md:text-2xl font-black leading-tight tracking-tight text-blue-900 mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h3>

            <motion.p
              className="text-sm md:text-base text-blue-700/55 leading-relaxed mb-7"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {contact.body}
            </motion.p>

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
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-900">
                        {contact.successTitle}
                      </div>
                      <div className="text-xs text-blue-700/50">
                        {contact.successBody}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  className="c-input w-full rounded-xl border border-blue-200/70 bg-white/70 text-blue-900 px-4 py-3 text-sm outline-none transition-colors"
                  type="text"
                  placeholder={contact.fields.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  className="c-input w-full rounded-xl border border-blue-200/70 bg-white/70 text-blue-900 px-4 py-3 text-sm outline-none transition-colors"
                  type="email"
                  placeholder={contact.fields.email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <textarea
                className="c-input w-full rounded-xl border border-blue-200/70 bg-white/70 text-blue-900 px-4 py-3 text-sm outline-none resize-none transition-colors h-24"
                placeholder={contact.fields.message}
                value={formData.msg}
                onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
              />
              <Button
                onClick={() => {
                  if (formData.name && formData.email) {
                    setSent(true);
                    setTimeout(() => setSent(false), 5000);
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white border-none rounded-full py-3 text-xs font-bold tracking-widest uppercase shadow-lg shadow-blue-400/25 hover:shadow-blue-500/35 transition-all h-auto"
              >
                {contact.submit}
              </Button>
              <p className="text-xs text-blue-700/40 text-center">
                {contact.emailPrefix}{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                >
                  {brand.email}
                </a>
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3.5"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {contact.principles.map(([num, title, sub]) => (
                <motion.div
                  key={num}
                  className="flex gap-3 items-start"
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <span className="font-mono text-[8px] font-bold text-blue-500/60 pt-0.5 min-w-[16px]">
                    {num}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-blue-900 mb-0.5">
                      {title}
                    </div>
                    <div className="text-xs text-blue-500/45 leading-relaxed">
                      {sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT — sticky blue panel with phone ── */}
        <div className="right-panel-sticky order-1 md:order-2 bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 relative min-h-[65vh] md:min-h-0">

          {/* Mobile "Talk to MAD" header — also uses TypingText */}
          <motion.div
            className="md:hidden absolute top-0 left-0 right-0 z-20 pt-6 px-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-sm text-white/70 font-medium mb-1">Talk to</div>
            <div className="text-3xl font-black text-white tracking-tight">
              <TypingText
                texts={MAD_TEXTS}
                inView={inView}
                delay={0.5}
              />
            </div>
          </motion.div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl"
              animate={inView ? { y: [0, -28, 0], scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] } : { opacity: 0 }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-blue-700/25 blur-3xl"
              animate={inView ? { y: [0, 22, 0], opacity: [0.25, 0.5, 0.25] } : { opacity: 0 }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-blue-200/20 blur-2xl"
              animate={inView ? { x: [0, 16, 0], y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] } : { opacity: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Phone — Desktop */}
          <motion.div
            className="hidden md:flex items-center justify-center w-full h-full py-16"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <motion.div
              animate={inView ? { y: [0, -13, 0] } : { y: 0 }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative" }}
            >
              <PhoneShell />
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full bg-blue-900/40 blur-xl pointer-events-none"
                animate={inView ? { scaleX: [1, 0.75, 1], opacity: [0.5, 0.25, 0.5] } : { opacity: 0 }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Phone — Mobile */}
          <div className="md:hidden flex items-center justify-center w-full h-full pt-24 pb-8 px-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              <motion.div
                animate={inView ? { y: [0, -13, 0] } : { y: 0 }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneShell />
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}