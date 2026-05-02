import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

export default function BeyondProjects() {
  const [ref, visible] = useFadeIn()
  const width = useWindowWidth()
  const isMobile = width < 640

  return (
    <section ref={ref} style={{ background: '#1980c2', overflow: 'hidden', position: 'relative' }}>
      {/* Texture layer */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '72px 20px' : '96px 64px', position: 'relative' }}>

        {/* Top row */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: isMobile ? '32px' : '48px', marginBottom: isMobile ? '40px' : '64px' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Montserrat,sans-serif', marginBottom: '20px' }}>
              Beyond Projects
            </div>
            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: isMobile ? 'clamp(2rem,7vw,2.6rem)' : 'clamp(2.2rem,4.5vw,4rem)', color: '#fff', lineHeight: 1.04, letterSpacing: '-0.035em', maxWidth: '600px' }}>
              We don't just deliver projects — we build long-term partnerships.
            </h2>
          </motion.div>

          {!isMobile && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.15 }}>
              <Link to="/contact" style={{ display: 'inline-block', background: '#fff', color: '#181817', fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 32px', borderRadius: '3px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Start a project
              </Link>
            </motion.div>
          )}
        </div>

        {/* Supporting copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '40px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: isMobile ? '28px' : '40px', marginBottom: isMobile ? '32px' : '48px' }}>
          <p style={{ fontFamily: 'Helvetica Neue,sans-serif', color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? '14px' : '16px', lineHeight: 1.7 }}>
            Our work extends beyond initial delivery. We support organizations across digital platforms, brand systems, and communication needs as they grow and evolve.
          </p>
          <div>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#fff', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.5, marginBottom: '16px', letterSpacing: '-0.01em' }}>
              Let's build something that performs.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Digital Platforms', 'Brand Systems', 'Communication', 'Ongoing Support'].map(tag => (
                <span key={tag} style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', border: '0.5px solid rgba(255,255,255,0.25)', padding: '5px 10px', borderRadius: '100px' }}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stat row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.15)' }}>
          {[{ stat: '100%', label: 'Client retention' }, { stat: '3+', label: 'Years of impact' }, { stat: '15+', label: 'Projects delivered' }, { stat: '3', label: 'Service pillars' }].map((item, i) => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', padding: isMobile ? '20px 16px' : '24px 28px', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: isMobile ? '2rem' : '2.4rem', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>{item.stat}</div>
              <div style={{ fontFamily: 'Helvetica Neue,sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{item.label}</div>
            </div>
          ))}
        </motion.div>

        {isMobile && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.55 }} style={{ marginTop: '32px' }}>
            <Link to="/contact" style={{ display: 'inline-block', background: '#fff', color: '#181817', fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: '3px', textDecoration: 'none' }}>
              Start a project
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
