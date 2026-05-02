import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── tiny hooks ────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ── brand tokens (used only where Tailwind can't reach: SVG fills, scale() ) ──
const TB  = '#F26522'
const AZ  = '#3a9fd6'

// ── content ───────────────────────────────────────────────────────────────
const CARDS = [
  {
    tag: 'The Need', icon: '⚡',
    points: [
      'Unstructured billing processes across teams',
      'Difficulty tracking payments and invoices',
      'No real-time financial visibility',
      'Over-reliance on fragmented manual tools',
    ],
  },
  {
    tag: 'Our Approach', icon: '🧭',
    points: [
      'System design problem, not just a software build',
      'Simplified financial workflows end-to-end',
      'Clean, intuitive user experience at every step',
      'Business value + UX + tech feasibility in balance',
    ],
  },
  {
    tag: 'The Solution', icon: '✦',
    points: [
      'Create and manage invoices with ease',
      'Track payments and status in real time',
      'Maintain clear, organized financial records',
      'Reduced friction across daily operations',
    ],
  },
  {
    tag: 'Outcome', icon: '◆',
    points: [
      'Structured, efficient billing from day one',
      'Improved financial clarity for decision-making',
      'Scalable architecture for growing businesses',
      'Less admin time, more focus on growth',
    ],
  },
]

// ── Dashboard (mini app rendered inside devices) ──────────────────────────
function Dashboard({ scale = 1 }) {
  const s = v => `${v * scale}px`
  const stats = [
    { label: 'Invoices Sent', value: '24',      sub: '+4 this month',    color: TB },
    { label: 'Pending',       value: '$12,480', sub: '6 outstanding',    color: '#ea580c' },
    { label: 'Collected',     value: '$38,920', sub: '+22% vs last mo.', color: '#16a34a' },
  ]
  const invoices = [
    { id: 'INV-041', client: 'Vertex Corp',   amount: '$3,200', status: 'Paid',    sc: '#16a34a', sbg: '#f0fdf4' },
    { id: 'INV-040', client: 'GreenPath Ltd', amount: '$1,850', status: 'Pending', sc: TB,        sbg: '#fff3ee' },
    { id: 'INV-039', client: 'Nova Studio',   amount: '$5,400', status: 'Paid',    sc: '#16a34a', sbg: '#f0fdf4' },
  ]
  const bars = [40, 65, 45, 80, 55, 90, 70]
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr']

  return (
    <div className="flex w-full h-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div
        className="flex flex-col flex-shrink-0 bg-white border-r border-slate-100"
        style={{ width: s(108), padding: `${s(14)} 0`, gap: s(2) }}
      >
        <div
          className="flex items-center border-b border-slate-100"
          style={{ padding: `0 ${s(12)} ${s(12)}`, marginBottom: s(6), gap: s(5) }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 rounded"
            style={{ width: s(9), height: s(9), background: TB, borderRadius: s(2) }}
          >
            <svg width={s(6)} height={s(6)} viewBox="0 0 6 6" fill="none">
              <path d="M1 3l1.5 1.5L5 1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span
            className="font-montserrat font-black tracking-tight text-slate-900"
            style={{ fontSize: s(10) }}
          >
            Tru<span style={{ color: TB }}>Billing</span>
          </span>
        </div>
        {['Dashboard','Invoices','Payments','Clients','Reports'].map((item, i) => (
          <div
            key={item}
            className="font-montserrat font-semibold tracking-wide"
            style={{
              padding: `${s(6)} ${s(12)}`,
              fontSize: s(7.5),
              color: i === 0 ? TB : '#9ca3af',
              background: i === 0 ? 'rgba(242,101,34,0.08)' : 'transparent',
              borderLeft: i === 0 ? `2px solid ${TB}` : '2px solid transparent',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ padding: s(14), gap: s(10) }}>
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-montserrat font-bold text-slate-900" style={{ fontSize: s(10) }}>Dashboard</div>
            <div className="font-sans font-medium text-slate-400" style={{ fontSize: s(6) }}>April 2026</div>
          </div>
          <div
            className="font-montserrat font-bold tracking-widest text-white uppercase"
            style={{ background: TB, fontSize: s(6), padding: `${s(4)} ${s(8)}`, borderRadius: s(3) }}
          >
            + New Invoice
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3" style={{ gap: s(6) }}>
          {stats.map(st => (
            <div key={st.label} className="bg-white border border-slate-100 rounded" style={{ padding: s(8), borderRadius: s(4) }}>
              <div className="font-montserrat font-semibold uppercase tracking-widest text-slate-400" style={{ fontSize: s(5.5), marginBottom: s(3) }}>{st.label}</div>
              <div className="font-montserrat font-black tracking-tight text-slate-900" style={{ fontSize: s(13), marginBottom: s(2) }}>{st.value}</div>
              <div className="font-montserrat font-semibold" style={{ fontSize: s(5.5), color: st.color }}>{st.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 bg-white border border-slate-100" style={{ borderRadius: s(4), padding: s(8) }}>
          <div className="font-montserrat font-bold text-slate-900" style={{ fontSize: s(7), marginBottom: s(8) }}>Revenue Overview</div>
          <div className="flex items-end" style={{ gap: s(4), height: s(40) }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  height: `${h}%`,
                  background: i === 5 ? TB : 'rgba(242,101,34,0.18)',
                  borderRadius: `${s(2)} ${s(2)} 0 0`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between" style={{ marginTop: s(3) }}>
            {months.map((m, i) => (
              <span key={m} className="font-montserrat font-semibold" style={{ fontSize: s(5), color: i === 5 ? TB : '#d1d5db' }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Recent invoices */}
        <div className="bg-white border border-slate-100 overflow-hidden" style={{ borderRadius: s(4) }}>
          <div className="flex justify-between border-b border-slate-50" style={{ padding: `${s(6)} ${s(10)}` }}>
            <span className="font-montserrat font-bold text-slate-900" style={{ fontSize: s(7) }}>Recent Invoices</span>
            <span className="font-montserrat font-semibold" style={{ fontSize: s(6), color: TB }}>View all</span>
          </div>
          {invoices.map((inv, i) => (
            <div key={inv.id} className="flex items-center border-b border-slate-50 last:border-0" style={{ padding: `${s(5)} ${s(10)}`, gap: s(6) }}>
              <div className="flex-1">
                <div className="font-montserrat font-bold text-slate-900" style={{ fontSize: s(6.5) }}>{inv.client}</div>
                <div className="font-sans font-medium text-slate-400" style={{ fontSize: s(5.5) }}>{inv.id}</div>
              </div>
              <div className="font-montserrat font-bold text-slate-700" style={{ fontSize: s(6.5) }}>{inv.amount}</div>
              <div
                className="font-montserrat font-bold"
                style={{ fontSize: s(5.5), padding: `${s(2)} ${s(5)}`, borderRadius: s(2), background: inv.sbg, color: inv.sc }}
              >
                {inv.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Draggable wrapper ─────────────────────────────────────────────────────
function Draggable({ children, initialRotate = 0, label, className = '', zBase = 20 }) {
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(zBase)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.06}
      onDragStart={() => { setIsDragging(true); setZIndex(100) }}
      onDragEnd={() => { setIsDragging(false); setZIndex(zBase) }}
      animate={{ rotate: isDragging ? 0 : initialRotate }}
      whileHover={{ scale: isDragging ? 1.01 : 1.02 }}
      whileDrag={{ scale: 1.04, rotate: 0 }}
      transition={{ rotate: { type: 'spring', stiffness: 180, damping: 22 } }}
      className={`relative select-none touch-none ${className}`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex,
        filter: isDragging
          ? 'drop-shadow(0 32px 64px rgba(0,0,0,0.55))'
          : 'drop-shadow(0 16px 36px rgba(0,0,0,0.32))',
      }}
    >
      {children}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-7 whitespace-nowrap flex items-center gap-1 px-3 py-1 rounded-full border font-montserrat font-semibold tracking-wider"
          style={{ fontSize: '8px', color: AZ, background: 'rgba(58,159,214,0.10)', borderColor: 'rgba(58,159,214,0.25)' }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )
}

// ── Device shells ─────────────────────────────────────────────────────────
function LaptopMockup() {
  return (
    <div className="w-full max-w-[660px]">
      <div className="rounded-t-2xl border border-white/50 pb-0 p-4" style={{ background: '#dde3ea', boxShadow: '0 28px 70px rgba(0,0,0,0.18)' }}>
        <div className="w-2 h-2 rounded-full border border-black/10 mx-auto mb-3" style={{ background: '#c4cfd9' }} />
        <div className="rounded-t-md overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <Dashboard scale={1} />
        </div>
      </div>
      <div className="h-3.5 border-x border-b border-black/5 rounded-b-sm" style={{ background: 'linear-gradient(to bottom,#c8d4de,#b6c2cc)' }} />
      <div className="h-8 rounded-b-xl border-x border-b border-black/5 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom,#bfcbd5,#adb9c3)', boxShadow: '0 10px 28px rgba(0,0,0,0.12)' }}>
        <div className="w-20 h-3 rounded border border-black/5" style={{ background: '#cdd8e0' }} />
      </div>
    </div>
  )
}

function TabletMockup() {
  return (
    <div
      className="flex-shrink-0 overflow-hidden relative"
      style={{ width: 200, height: 270, background: '#2a2a35', borderRadius: 18, border: '2.5px solid #3a3a4a', boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)' }}
    >
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center" style={{ height: 18, background: '#222230', zIndex: 10 }}>
        <div className="w-10 h-1 rounded-full" style={{ background: '#3a3a4a' }} />
      </div>
      <div className="w-full overflow-hidden" style={{ height: 'calc(100% - 18px)' }}>
        <Dashboard scale={0.78} />
      </div>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div
      className="flex-shrink-0 overflow-hidden relative"
      style={{ width: 140, height: 272, background: '#1a1a2e', borderRadius: 26, border: '2.5px solid #2d2d44', boxShadow: '0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)' }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10" style={{ width: 44, height: 14, background: '#1a1a2e', borderRadius: '0 0 10px 10px' }} />
      <div className="flex flex-col w-full h-full bg-slate-50 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-slate-100">
          <span className="font-montserrat font-black text-slate-900" style={{ fontSize: 10 }}>
            Tru<span style={{ color: TB }}>Billing</span>
          </span>
          <div
            className="flex items-center justify-center rounded-full font-montserrat font-bold"
            style={{ width: 22, height: 22, fontSize: 8, color: TB, background: 'rgba(242,101,34,0.10)', border: '1px solid rgba(242,101,34,0.25)' }}
          >
            JD
          </div>
        </div>
        {/* Body */}
        <div className="flex flex-col flex-1 overflow-hidden p-2 gap-1.5">
          <div className="rounded-lg p-2.5" style={{ background: TB }}>
            <div className="font-sans text-white/75" style={{ fontSize: 7, marginBottom: 3 }}>Total Collected</div>
            <div className="font-montserrat font-black text-white tracking-tight" style={{ fontSize: 18 }}>$38,920</div>
            <div className="font-sans text-white/65" style={{ fontSize: 6, marginTop: 2 }}>+22% this month</div>
          </div>
          {[
            { label: 'Invoices Sent', val: '24',  color: TB },
            { label: 'Pending',       val: '6',   color: '#ea580c' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between bg-white border border-slate-100 rounded-md px-2 py-1.5">
              <span className="font-montserrat font-semibold text-slate-500" style={{ fontSize: 8 }}>{s.label}</span>
              <span className="font-montserrat font-black" style={{ fontSize: 13, color: s.color }}>{s.val}</span>
            </div>
          ))}
          <div className="flex-1 bg-white border border-slate-100 rounded-md p-2 overflow-hidden">
            <div className="font-montserrat font-bold text-slate-900 mb-1" style={{ fontSize: 7.5 }}>Recent</div>
            {[
              { c: 'Vertex Corp', a: '$3,200', col: '#16a34a' },
              { c: 'GreenPath',   a: '$1,850', col: TB },
              { c: 'Nova Studio', a: '$5,400', col: '#16a34a' },
            ].map((inv, i) => (
              <div key={inv.c} className={`flex justify-between items-center py-1 ${i < 2 ? 'border-b border-slate-50' : ''}`}>
                <span className="font-montserrat font-semibold text-slate-700" style={{ fontSize: 7 }}>{inv.c}</span>
                <span className="font-montserrat font-bold" style={{ fontSize: 7, color: inv.col }}>{inv.a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Floating info card (desktop) ──────────────────────────────────────────
function FloatingCard({ card, index, activeCard, onClick, posClass }) {
  const isActive = activeCard === index
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -2 }}
      className={`absolute cursor-pointer rounded-xl ${posClass}`}
      style={{
        width: 162,
        padding: isActive ? '14px 16px' : '10px 14px',
        background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isActive ? `1.5px solid ${AZ}` : '1px solid rgba(255,255,255,0.1)',
        borderTop: `3px solid ${AZ}`,
        boxShadow: isActive ? `0 12px 40px rgba(58,159,214,0.18)` : '0 6px 24px rgba(0,0,0,0.25)',
        transition: 'all 0.32s cubic-bezier(0.22,1,0.36,1)',
        zIndex: isActive ? 30 : 20,
      }}
    >
      <div className={`flex items-center gap-2 ${isActive ? 'mb-2.5' : ''}`}>
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-lg text-sm"
          style={{
            width: 28, height: 28,
            background: isActive ? 'rgba(58,159,214,0.15)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${isActive ? 'rgba(58,159,214,0.3)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-montserrat font-extrabold text-white/90 leading-tight" style={{ fontSize: 11 }}>{card.tag}</div>
          {!isActive && <div className="font-montserrat text-white/25 mt-0.5" style={{ fontSize: 8 }}>Click to expand</div>}
        </div>
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full transition-all"
          style={{ width: 18, height: 18, background: isActive ? AZ : 'rgba(255,255,255,0.08)' }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d={isActive ? 'M1 5l3-3 3 3' : 'M1 3l3 3 3-3'} stroke={isActive ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5">
              {card.points.map(p => (
                <div key={p} className="flex items-start gap-2">
                  <div className="flex-shrink-0 rounded-full mt-1.5" style={{ width: 4, height: 4, background: AZ }} />
                  <span className="font-sans text-white/55 leading-relaxed" style={{ fontSize: 10.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default function Experience() {
  const [sectionRef, visible] = useFadeIn()
  const [activeCard, setActiveCard] = useState(0)
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const isSmall = isMobile || isTablet

  // Tight card positions — pulled close to device cluster
  const cardPositions = [
    { pos: 'top-[-18px] left-[-172px]' },
    { pos: 'top-[-18px] right-[-172px]' },
    { pos: 'bottom-[90px] left-[-172px]' },
    { pos: 'bottom-[90px] right-[-172px]' },
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ── Background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        {/*
          Use any royalty-free abstract/data motion loop.
          Good free sources: Coverr.co, Mixkit.co, Pexels video
          e.g. a dark grid / particles / financial data stream
          Drop the URL below or swap with a local asset path.
        */}
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-particles-flowing-in-a-dark-background-43456-large.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay: dark gradient so text stays legible ── */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(135deg, rgba(20,22,28,0.94) 0%, rgba(18,20,26,0.88) 50%, rgba(22,26,32,0.92) 100%)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={isSmall ? 'mb-10' : 'mb-16'}
        >
          <p className="font-montserrat font-semibold text-azure-light uppercase tracking-[0.18em] text-[10px] mb-3">
            Our Experience
          </p>
          <h2 className="font-montserrat font-black text-white leading-none tracking-tight text-4xl lg:text-5xl max-w-lg mb-3">
            TruBilling: <span className="text-azure-light">Product Development</span>
          </h2>
          <p className="font-sans text-white/40 text-sm leading-relaxed max-w-xl">
            A financial management platform designed to help small and growing businesses manage billing, track payments, and maintain financial clarity — in one structured system.
          </p>
        </motion.div>

        {isSmall ? (
          /* ── MOBILE / TABLET ── */
          <div className="flex flex-col gap-8">

            {/* Scrollable device row */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-end overflow-x-auto overflow-y-visible pb-10 pt-2 gap-3"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                {/* Tablet */}
                <Draggable initialRotate={2} label="drag ↔" className="flex-shrink-0" zBase={22}>
                  <motion.div initial={{ opacity: 0, y: 18 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                    <TabletMockup />
                  </motion.div>
                </Draggable>

                {/* Laptop */}
                <Draggable initialRotate={0} label="drag ↔" className="flex-shrink-0" zBase={15}>
                  <motion.div initial={{ opacity: 0, y: 18 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.0 }}>
                    <div style={{ width: isMobile ? 260 : 360 }}>
                      <LaptopMockup />
                    </div>
                  </motion.div>
                </Draggable>

                {/* Phone */}
                <Draggable initialRotate={-3} label="drag ↔" className="flex-shrink-0 mb-6" zBase={28}>
                  <motion.div initial={{ opacity: 0, y: 18 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                    <PhoneMockup />
                  </motion.div>
                </Draggable>
              </div>

              {isMobile && (
                <p className="font-montserrat text-center text-white/20 tracking-widest mt-[-12px]" style={{ fontSize: 9 }}>
                  ← scroll to see all devices →
                </p>
              )}
            </motion.div>

            {/* Card carousel */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl mb-4"
                  style={{
                    padding: isMobile ? '20px 18px' : '26px 30px',
                    borderLeft: `4px solid ${AZ}`,
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid rgba(255,255,255,0.10)`,
                    borderLeft: `4px solid ${AZ}`,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-xl text-lg"
                      style={{ width: 36, height: 36, background: 'rgba(58,159,214,0.15)', border: '1px solid rgba(58,159,214,0.28)' }}
                    >
                      {CARDS[activeCard].icon}
                    </div>
                    <div>
                      <span className="font-montserrat font-extrabold text-white tracking-tight" style={{ fontSize: isMobile ? 14 : 15 }}>
                        {CARDS[activeCard].tag}
                      </span>
                      <div className="font-montserrat text-white/25 mt-0.5" style={{ fontSize: 10 }}>
                        {activeCard + 1} of {CARDS.length}
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {CARDS[activeCard].points.map(p => (
                      <li key={p} className="flex items-start gap-2.5 font-sans text-white/55 leading-relaxed" style={{ fontSize: isMobile ? 13 : 14 }}>
                        <div className="flex-shrink-0 rounded-full mt-1.5" style={{ width: 5, height: 5, background: AZ }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Dot nav + arrows */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  {CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCard(i)}
                      className="h-1.5 rounded-full border-0 p-0 cursor-pointer transition-all duration-300"
                      style={{ width: i === activeCard ? 28 : 6, background: i === activeCard ? AZ : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveCard(c => Math.max(0, c - 1))}
                    disabled={activeCard === 0}
                    className="w-9 h-9 rounded-full border border-white/10 bg-transparent flex items-center justify-center transition-opacity"
                    style={{ opacity: activeCard === 0 ? 0.25 : 1, cursor: activeCard === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={() => setActiveCard(c => Math.min(CARDS.length - 1, c + 1))}
                    disabled={activeCard === CARDS.length - 1}
                    className="w-9 h-9 rounded-full border-0 flex items-center justify-center transition-all"
                    style={{ background: activeCard === CARDS.length - 1 ? 'rgba(255,255,255,0.06)' : AZ, opacity: activeCard === CARDS.length - 1 ? 0.25 : 1, cursor: activeCard === CARDS.length - 1 ? 'not-allowed' : 'pointer' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-1">
              <a
                href="https://trubillingsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-montserrat font-bold text-azure-light uppercase tracking-widest text-[10px] px-6 py-3 rounded-sm border border-azure-light no-underline"
                style={{ background: 'transparent' }}
              >
                View live product ↗
              </a>
            </div>
          </div>
        ) : (
          /* ── DESKTOP ── */
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative"
              style={{ padding: '40px 176px 70px' }}
            >
              {/* Floating info cards */}
              {CARDS.map((card, i) => (
                <FloatingCard
                  key={card.tag}
                  card={card}
                  index={i}
                  activeCard={activeCard}
                  onClick={() => setActiveCard(i === activeCard ? -1 : i)}
                  posClass={cardPositions[i].pos}
                />
              ))}

              {/* Connector lines */}
              {CARDS.map((_, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={`line-${i}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={visible ? { scaleX: 1, opacity: activeCard === i ? 1 : 0.18 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    className="absolute h-px"
                    style={{
                      top: i < 2 ? 30 : undefined,
                      bottom: i >= 2 ? 128 : undefined,
                      [isLeft ? 'left' : 'right']: 176,
                      width: 10,
                      background: activeCard === i ? AZ : 'rgba(255,255,255,0.14)',
                      transformOrigin: isLeft ? 'left' : 'right',
                      transition: 'background 0.3s',
                    }}
                  />
                )
              })}

              {/* Device cluster — tablet → laptop → phone */}
              <div className="flex items-end relative">
                {/* Tablet */}
                <Draggable initialRotate={-2} label="drag ↔" className="mb-8 -mr-5" zBase={22}>
                  <motion.div initial={{ opacity: 0, x: -14, y: 10 }} animate={visible ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }}>
                    <TabletMockup />
                  </motion.div>
                </Draggable>

                {/* Laptop */}
                <Draggable initialRotate={0} label="drag ↔" className="flex-1 min-w-0" zBase={15}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.12 }}>
                    <LaptopMockup />
                  </motion.div>
                </Draggable>

                {/* Phone */}
                <Draggable initialRotate={4} label="drag ↔" className="-ml-4 mb-14" zBase={28}>
                  <motion.div initial={{ opacity: 0, x: 14 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.44 }}>
                    <PhoneMockup />
                  </motion.div>
                </Draggable>
              </div>

              {/* URL badge */}
              <div className="flex justify-center mt-12">
                <a
                  href="https://trubillingsystems.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full no-underline font-montserrat font-semibold tracking-widest"
                  style={{ fontSize: 9, color: AZ, background: 'rgba(58,159,214,0.10)', border: '0.5px solid rgba(58,159,214,0.25)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: AZ }} />
                  trubillingsystems.com ↗
                </a>
              </div>
            </motion.div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-2 px-6 py-5 rounded-xl flex items-center justify-between flex-wrap gap-4 w-full max-w-3xl border border-white/5"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <p className="font-sans text-white/30 text-sm leading-relaxed max-w-sm m-0">
                A more structured, efficient, and scalable approach to business billing and financial management.
              </p>
              <a
                href="https://trubillingsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-montserrat font-bold text-azure-light uppercase tracking-widest text-[10px] px-5 py-3 rounded-sm border border-azure-light no-underline whitespace-nowrap"
                style={{ background: 'transparent' }}
              >
                View live product ↗
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}