import { useState, useRef, useEffect, useCallback } from "react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { homeCms } from "@/data/homeCms";

// ─── Replace with your logo URL ───
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Avatar ──────────────────────────────────────────────────────────────────
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

// ─── Typing bubble with character-by-character animation ─────────────────────
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

// ─── Dots indicator (while waiting before typing starts) ─────────────────────
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

// ─── Chat Bubble ─────────────────────────────────────────────────────────────
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

// ─── Notification ────────────────────────────────────────────────────────────
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

// ─── Calling Screen ───────────────────────────────────────────────────────────
function CallingScreen({ onAnswer, onDecline }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 py-8 bg-gradient-to-b from-[#0a1628] to-[#0d0d12]">
      {/* Top label */}
      <div className="text-center animate-[fadeUp_.6s_ease_both]">
        <p className="text-[10px] text-white/35 tracking-[.2em] uppercase mb-2">
          Incoming call
        </p>
        <p className="text-base font-extrabold text-white leading-none mb-1">
          Mad AI
        </p>
        <p className="text-[10px] text-white/40">Assistant · Online</p>
      </div>

      {/* Avatar with rings */}
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

      {/* Action buttons */}
      <div className="flex gap-10 items-center justify-center w-full">
        {/* Decline */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onDecline}
            className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
              <line
                x1="22"
                y1="2"
                x2="2"
                y2="22"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="text-[9px] text-white/35">Decline</span>
        </div>

        {/* Answer */}
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

// ─── Declined Screen ──────────────────────────────────────────────────────────
function DeclinedScreen({ onCallback }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center animate-[fadeUp_.4s_ease_both]">
      <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
          <line
            x1="22"
            y1="2"
            x2="2"
            y2="22"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
          />
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

// ─── Chat Screen ──────────────────────────────────────────────────────────────
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
      // wait for typing animation to roughly finish
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
      {/* Notification */}
      {notif && <Notification email={notif} onHide={() => setNotif(null)} />}

      {/* Header */}
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

      {/* Messages */}
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

      {/* Input Bar */}
      <div className="px-3 pb-3 pt-1.5 bg-black/20 border-t border-white/5 flex-shrink-0">
        {phase === "email" || phase === "sending" ? (
          <div
            className={`flex items-center gap-2 rounded-3xl px-3.5 py-1.5 transition-all ${
              emailErr
                ? "bg-red-500/10 border border-red-500/40"
                : "bg-white/8 border border-white/10"
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
            <button
              onClick={submitEmail}
              disabled={phase === "sending"}
              className={`w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center cursor-pointer transition-opacity ${
                phase === "sending"
                  ? "opacity-50 cursor-default"
                  : "hover:opacity-90"
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-white/5 rounded-3xl px-3.5 py-1.5">
            <span className="flex-1 text-[11px] text-white/20">
              {phase === "done"
                ? "Conversation complete ✓"
                : "Choose an option above…"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Phone Shell ──────────────────────────────────────────────────────────────
function PhoneShell() {
  const [callPhase, setCallPhase] = useState("calling"); // calling | declined | chat

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
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 py-1 flex-shrink-0">
          <span className="text-[9px] font-bold text-white/35 font-mono">
            9:41
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="rgba(255,255,255,.35)"
          >
            <rect x="0" y="4" width="2" height="6" rx=".5" />
            <rect x="3" y="2" width="2" height="8" rx=".5" />
            <rect x="6" y="0" width="2" height="10" rx=".5" />
          </svg>
        </div>

        {/* Content */}
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

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function MadPhoneChat() {
  return (
    <>
      <style>{`
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
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: .55; }
          50% { transform: translateX(-50%) scaleX(.7); opacity: .25; }
        }
        @keyframes callerPulse {
          0%, 100% { opacity: .85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
      `}</style>

      <div className="flex justify-center items-center py-8 min-h-[520px]">
        <div
          className="relative"
          style={{ animation: "bob 4s ease-in-out infinite" }}
        >
          <PhoneShell />
          {/* Ground shadow */}
          <div
            className="absolute -bottom-5 w-44 h-5 rounded-full blur-xl pointer-events-none"
            style={{
              left: "50%",
              background: "rgba(7,30,60,.55)",
              animation: "shadowPulse 4s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
