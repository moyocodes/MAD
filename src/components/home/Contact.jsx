import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NOTIF_SHOW = 500;
const NOTIF_HIDE = 2600;

const SCRIPT = [
  { role: "mad",  text: "Hi 👋 We're MAD — a product, brand & marketing firm. What are you building?", delay: 1800 },
  { role: "user", text: "Launching a SaaS. Need full brand + landing page.", delay: 3800 },
  { role: "mad",  text: "Perfect scope — that's exactly our wheelhouse. Timeline and budget?", delay: 5900 },
  { role: "user", text: "6 weeks out, budget around $25–30k.", delay: 7700 },
  { role: "mad",  text: "Totally doable. Here's a snapshot of what we'd deliver:", delay: 9400 },
  { role: "ui",   delay: 10800 },
  { role: "cta",  text: "📅 Book a Call →", delay: 12200 },
];

function UIStoryCard() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,.13)", border: "1px solid rgba(0,0,0,.06)", maxWidth: "88%" }}>
      <div style={{ background: "#f2f2f2", padding: "6px 10px", display: "flex", alignItems: "center", gap: 5, borderBottom: "1px solid rgba(0,0,0,.06)" }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width:6,height:6,borderRadius:"50%",background:c }} />)}
        <div style={{ flex:1,background:"#e2e2e2",borderRadius:4,height:13,marginLeft:8,display:"flex",alignItems:"center",paddingLeft:7 }}>
          <span style={{ fontSize:7.5,color:"#999",fontWeight:500 }}>yoursaas.com</span>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=75&auto=format&fit=crop" alt="project preview" style={{ width:"100%",height:96,objectFit:"cover",display:"block" }} />
      <div style={{ padding:"10px 12px 11px" }}>
        <div style={{ fontSize:11,fontWeight:800,color:"#181817",marginBottom:5 }}>Your SaaS Brand Kit</div>
        <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
          {["Landing Page","Brand System","App UI"].map(t => (
            <span key={t} style={{ background:"#eef6fd",color:"#1980c2",borderRadius:5,padding:"2px 7px",fontSize:8.5,fontWeight:700 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping]   = useState(false);
  const [notifIn, setNotifIn] = useState(false);
  const [prompted, setPrompted] = useState(false);
  const bottomRef  = useRef(null);
  const startedRef = useRef(false);

  function startChat() {
    if (startedRef.current) return;
    startedRef.current = true;
    setPrompted(true);

    const t0 = setTimeout(() => setNotifIn(true), NOTIF_SHOW);
    const t1 = setTimeout(() => setNotifIn(false), NOTIF_HIDE);

    const timers = SCRIPT.flatMap((item, i) => {
      const out = [];
      if (item.role === "mad") out.push(setTimeout(() => setTyping(true), item.delay - 1100));
      out.push(setTimeout(() => { setTyping(false); setVisible(v => [...v, i]); }, item.delay));
      return out;
    });

    return () => { clearTimeout(t0); clearTimeout(t1); timers.forEach(clearTimeout); };
  }

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visible, typing]);

  const MadAvatar = () => (
    <div style={{ width:24,height:24,borderRadius:8,background:"linear-gradient(135deg,#1980c2,#45b3f5)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
      <span style={{ fontSize:8.5,fontWeight:900,color:"#fff" }}>M</span>
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",position:"relative" }}>
      {/* Notification banner */}
      <div style={{ position:"absolute",top:8,left:8,right:8,zIndex:50,background:"rgba(24,24,30,0.93)",backdropFilter:"blur(18px)",borderRadius:14,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,transform:notifIn?"translateY(0)":"translateY(-100px)",opacity:notifIn?1:0,transition:"transform 0.45s cubic-bezier(0.22,1,0.36,1),opacity 0.3s",pointerEvents:"none" }}>
        <div style={{ width:30,height:30,borderRadius:9,background:"linear-gradient(135deg,#1980c2,#45b3f5)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:12,fontWeight:900,color:"#fff" }}>M</span>
        </div>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
            <span style={{ fontSize:11,fontWeight:700,color:"#fff" }}>MAD</span>
            <span style={{ fontSize:9,color:"rgba(255,255,255,.35)" }}>now</span>
          </div>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,.7)",lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
            Hi 👋 Ready to build something real?
          </div>
        </div>
      </div>

      {/* Chat header */}
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#111",borderBottom:"1px solid rgba(255,255,255,.05)",flexShrink:0 }}>
        <div style={{ position:"relative",width:34,height:34,flexShrink:0 }}>
          <div style={{ position:"absolute",top:"50%",left:"50%",width:"100%",height:"100%",borderRadius:"50%",border:"1px solid rgba(25,128,194,.5)",animation:"ringOut 2.2s ease-out infinite",pointerEvents:"none" }} />
          <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#1980c2,#45b3f5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>
            <span style={{ fontSize:12,fontWeight:900,color:"#fff" }}>M</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:13,fontWeight:700,color:"#fff",lineHeight:1,marginBottom:3 }}>MAD AI</div>
          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
            <div style={{ width:5,height:5,borderRadius:"50%",background:"#34d399" }} />
            <span style={{ fontSize:9,color:"rgba(255,255,255,.38)",fontWeight:500 }}>Strategic Partner · Online</span>
          </div>
        </div>
      </div>

      {/* Messages / Idle */}
      <div className="mad-scroll" style={{ flex:1,overflowY:"auto",padding:"12px",display:"flex",flexDirection:"column",gap:9 }}>
        {!prompted ? (
          /* ── Idle state ── */
          <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"24px 12px",textAlign:"center" }}>
            <div style={{ width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,#1980c2,#45b3f5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(25,128,194,.4)" }}>
              <span style={{ fontSize:20,fontWeight:900,color:"#fff" }}>M</span>
            </div>
            <div>
              <div style={{ fontSize:13,fontWeight:700,color:"#fff",marginBottom:5 }}>Talk to MAD AI</div>
              <div style={{ fontSize:10.5,color:"rgba(255,255,255,.38)",lineHeight:1.55,maxWidth:180 }}>
                Ask us about your project — we'll walk you through what we'd build.
              </div>
            </div>
            <button
              onClick={startChat}
              style={{ background:"linear-gradient(135deg,#1980c2,#45b3f5)",color:"#fff",border:"none",borderRadius:20,padding:"10px 22px",fontSize:11,fontWeight:700,letterSpacing:"0.04em",cursor:"pointer",boxShadow:"0 4px 18px rgba(25,128,194,.4)" }}
            >
              Start a conversation →
            </button>
          </div>
        ) : (
          /* ── Chat messages ── */
          <>
            {SCRIPT.map((item, i) => {
              if (!visible.includes(i)) return null;
              if (item.role === "ui") return (
                <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:6 }}>
                  <MadAvatar /><UIStoryCard />
                </div>
              );
              if (item.role === "cta") return (
                <div key={i} style={{ display:"flex",justifyContent:"center",marginTop:6 }}>
                  <button onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior:"smooth",block:"center" })}
                    style={{ background:"linear-gradient(135deg,#1980c2,#45b3f5)",color:"#fff",border:"none",borderRadius:20,padding:"10px 22px",fontSize:11,fontWeight:700,letterSpacing:"0.04em",cursor:"pointer",boxShadow:"0 4px 18px rgba(25,128,194,.45)" }}>
                    {item.text}
                  </button>
                </div>
              );
              return (
                <div key={i} style={{ display:"flex",alignItems:"flex-end",gap:6,justifyContent:item.role==="user"?"flex-end":"flex-start" }}>
                  {item.role === "mad" && <MadAvatar />}
                  <div style={{ background:item.role==="user"?"linear-gradient(135deg,#1980c2,#45b3f5)":"#1e1e1e",borderRadius:item.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"9px 12px",fontSize:11,color:"#fff",lineHeight:1.55,maxWidth:"80%" }}>
                    {item.text}
                  </div>
                </div>
              );
            })}
            {typing && (
              <div style={{ display:"flex",alignItems:"flex-end",gap:6 }}>
                <MadAvatar />
                <div style={{ background:"#1e1e1e",borderRadius:"14px 14px 14px 4px",padding:"10px 14px",display:"flex",gap:4,alignItems:"center" }}>
                  {[0,0.22,0.44].map((d,i) => <div key={i} style={{ width:5,height:5,borderRadius:"50%",background:"#45b3f5",animation:`dotPulse 1.2s ${d}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input bar — tapping send also starts chat if not yet started */}
      <div style={{ padding:"7px 12px 12px",background:"#111",borderTop:"1px solid rgba(255,255,255,.05)",flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,background:"#1d1d1d",borderRadius:24,padding:"6px 6px 6px 14px" }}>
          <span style={{ flex:1,fontSize:11,color:"rgba(255,255,255,.2)" }}>
            {prompted ? "Reply to MAD AI…" : "Tap to start chatting…"}
          </span>
          <div
            onClick={prompted ? undefined : startChat}
            style={{ width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#1980c2,#45b3f5)",display:"flex",alignItems:"center",justifyContent:"center",cursor:prompted?"default":"pointer" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm]   = useState({ name:"", email:"", msg:"" });
  const [sent, setSent]   = useState(false);
  const phoneRef = useRef(null);

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
  };

  return (
    <section
      style={{
        paddingBottom: 0,
        background: "transparent",
      }}
    >
      <style>{`
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
        @keyframes ringOut{0%{transform:translate(-50%,-50%) scale(1);opacity:.5}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .mad-scroll::-webkit-scrollbar{display:none}
        .c-input::placeholder{color:rgba(24,24,23,.32)}
        .c-input:focus{border-color:rgba(25,128,194,.45)!important;background:#fff!important}
        /* phone sticky only on md+ */
        @media(min-width:768px){
          .phone-sticky{
            position:sticky;
            top:24px;
            align-self:start;
            margin-top:-240px;
          }
        }
      `}</style>

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* LEFT — form */}
          <div className="order-2 md:order-1" style={{ paddingTop: "clamp(48px,7vw,96px)", paddingBottom: 80 }}>
            <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}>
            <p style={{ fontSize:9,fontWeight:700,letterSpacing:"0.28em",textTransform:"uppercase",color:"rgba(25,128,194,.6)",marginBottom:12 }}>
              Work With Us
            </p>
            <h2 style={{ fontSize:"clamp(28px,3.4vw,48px)",fontWeight:800,lineHeight:1.05,letterSpacing:-0.8,color:"#0f2a45",marginBottom:16 }}>
              Start something<br />that matters.
            </h2>
            <p style={{ fontSize:14,lineHeight:1.75,color:"rgba(15,42,69,.55)",marginBottom:32,maxWidth:400 }}>
              Whether you have a polished brief or a raw idea — we'll help you turn it
              into a product, brand, or campaign that moves the needle.
            </p>
            </motion.div>

            <motion.div
              variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 }}}}
              initial="hidden"
              whileInView="show"
              viewport={{ once:true, margin:"-40px" }}
              style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:36 }}
            >
              {[
                ["01","Strategy first","We align on what success looks like before touching a pixel."],
                ["02","Design that converts","Every decision is made with your audience and goal in mind."],
                ["03","Ship, then improve","We launch fast and iterate based on real data."],
              ].map(([num,title,sub]) => (
                <motion.div key={num} variants={{ hidden:{opacity:0,x:-16}, show:{opacity:1,x:0,transition:{duration:0.5,ease:[0.16,1,0.3,1]}}}} style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
                  <span style={{ fontFamily:"monospace",fontSize:8,fontWeight:700,color:"rgba(25,128,194,.45)",paddingTop:3,minWidth:18 }}>{num}</span>
                  <div>
                    <div style={{ fontSize:13,fontWeight:700,color:"#0f2a45",marginBottom:2 }}>{title}</div>
                    <div style={{ fontSize:12,color:"rgba(15,42,69,.5)",lineHeight:1.55 }}>{sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {sent ? (
              <div style={{ background:"rgba(52,211,153,.1)",border:"1.5px solid rgba(52,211,153,.3)",borderRadius:12,padding:"24px 20px",textAlign:"center" }}>
                <div style={{ fontSize:22,marginBottom:8 }}>✓</div>
                <div style={{ fontSize:14,fontWeight:700,color:"#0f2a45",marginBottom:6 }}>Message received</div>
                <div style={{ fontSize:12,color:"rgba(15,42,69,.5)" }}>We'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <motion.div id="contact-form" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.6, ease:[0.16,1,0.3,1], delay:0.2 }} style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className="c-input" type="text"  placeholder="Your name"      value={form.name}  onChange={e=>setForm({...form,name:e.target.value})}  style={inputBase} />
                  <input className="c-input" type="email" placeholder="Email address"  value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inputBase} />
                </div>
                <textarea className="c-input" placeholder="What are you working on?" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{...inputBase,height:100,resize:"none"}} />
                <Button
                  onClick={() => form.name && form.email && setSent(true)}
                  className="w-full bg-gradient-to-r from-[#1980c2] to-[#45b3f5] text-white border-none rounded-lg py-3 text-xs font-bold tracking-widest uppercase shadow-[0_4px_20px_rgba(25,128,194,.28)] hover:opacity-90 transition-opacity h-auto"
                >
                  Send Message →
                </Button>
                <p style={{ fontSize:11,color:"rgba(15,42,69,.42)",textAlign:"center" }}>
                  Or email us at{" "}
                  <a href="mailto:hello@mad.studio" style={{ color:"#1980c2",fontWeight:600 }}>hello@mad.studio</a>
                </p>
              </motion.div>
            )}
          </div>

          {/* RIGHT — phone, sticky + overlaps Beyond image */}
          <div ref={phoneRef} className="phone-sticky order-1 md:order-2 flex justify-center md:block">
            <div style={{ width:"min(300px, calc(100vw - 48px))",background:"#080808",borderRadius:44,padding:10,border:"1px solid rgba(255,255,255,.08)",boxShadow:"0 40px 80px rgba(15,42,69,.22),0 16px 40px rgba(15,42,69,.14),0 0 0 1px rgba(255,255,255,.04)" }}>
              {/* Notch */}
              <div style={{ width:90,height:26,background:"#080808",borderRadius:"0 0 18px 18px",margin:"0 auto",position:"relative",zIndex:4 }}>
                <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:9,height:9,borderRadius:"50%",background:"#181818",border:"1px solid rgba(255,255,255,.08)" }} />
              </div>
              {/* Screen */}
              <div style={{ background:"#111",borderRadius:36,overflow:"hidden",height:"clamp(420px,54vh,560px)",display:"flex",flexDirection:"column" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 18px",fontSize:9,fontWeight:700,color:"rgba(255,255,255,.4)",flexShrink:0 }}>
                  <span>9:41</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,.4)">
                    <rect x="0" y="4" width="2" height="6" rx=".5"/>
                    <rect x="3" y="2" width="2" height="8" rx=".5"/>
                    <rect x="6" y="0" width="2" height="10" rx=".5"/>
                  </svg>
                </div>
                <div style={{ flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
                  <PhoneScreen />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
