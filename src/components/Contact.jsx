import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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

const INTEREST_OPTIONS = ['Product & Digital', 'Marketing & Communication', 'Brand & Design', 'Not sure yet']

export default function Contact() {
  const [ref, visible] = useFadeIn()
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const isSmall = isMobile || isTablet

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)

  const input = (field) => ({
    value: form[field],
    onChange: (e) => setForm(f => ({ ...f, [field]: e.target.value })),
    style: {
      width: '100%',
      background: 'rgba(255,255,255,0.05)',
      border: '0.5px solid rgba(255,255,255,0.12)',
      borderRadius: '4px',
      padding: '13px 14px',
      fontFamily: 'Helvetica Neue,sans-serif',
      fontSize: '13px',
      color: '#fff',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={ref} style={{ background: '#181817', padding: isMobile ? '72px 20px 80px' : isTablet ? '88px 40px 96px' : '96px 64px 112px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: isMobile ? '40px' : '64px', maxWidth: '700px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: '#1980c2', textTransform: 'uppercase', fontFamily: 'Montserrat,sans-serif', marginBottom: '16px' }}>Get in touch</div>
          <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: isMobile ? 'clamp(1.8rem,6.5vw,2.4rem)' : 'clamp(2rem,4vw,3.2rem)', color: '#fff', lineHeight: 1.06, letterSpacing: '-0.035em', marginBottom: '16px' }}>
            Not sure what comes next?<br />Talk to MAD.
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue,sans-serif', color: 'rgba(255,255,255,0.45)', fontSize: isMobile ? '13px' : '15px', lineHeight: 1.7, maxWidth: '500px' }}>
            Whether you have a clear brief or just an idea, we'll help you shape it into something structured and actionable. Tell us what you're working on.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr', gap: isSmall ? '48px' : '96px', alignItems: 'start' }}>

          {/* Left: info */}
          <motion.div initial={{ opacity: 0, x: isSmall ? 0 : -24 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
              {[
                { label: 'Email', value: 'hello@madagency.co', href: 'mailto:hello@madagency.co' },
                { label: 'Based in', value: 'Canada / Remote-first' },
              ].map(item => (
                <div key={item.label} style={{ borderBottom: '0.5px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '15px', color: '#1980c2', textDecoration: 'none', letterSpacing: '-0.01em' }}>{item.value}</a>
                  ) : (
                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '-0.01em' }}>{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Approach note */}
            <div style={{ padding: '20px', background: 'rgba(25,128,194,0.08)', border: '0.5px solid rgba(25,128,194,0.2)', borderRadius: '6px' }}>
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '11px', color: '#1980c2', marginBottom: '8px', letterSpacing: '-0.01em' }}>Our process</div>
              <p style={{ fontFamily: 'Helvetica Neue,sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.65, margin: 0 }}>
                We start every engagement with a structured discovery call. No lengthy proposals before we understand your challenge. Just a focused conversation to shape the right next step.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: isSmall ? 0 : 24 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.18 }}>
            {submitted ? (
              <div style={{ padding: '48px 32px', textAlign: 'center', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(25,128,194,0.15)', border: '1px solid #1980c2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l5 5 7-9" stroke="#1980c2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '18px', color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>Message received.</h3>
                <p style={{ fontFamily: 'Helvetica Neue,sans-serif', color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.65 }}>We'll be in touch within 1–2 business days to set up a discovery call.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Full name *</label>
                    <input {...input('name')} placeholder="Your name" required onFocus={e => e.target.style.borderColor = 'rgba(25,128,194,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Email *</label>
                    <input {...input('email')} type="email" placeholder="you@company.com" required onFocus={e => e.target.style.borderColor = 'rgba(25,128,194,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Company / Organization</label>
                  <input {...input('company')} placeholder="Where you work" onFocus={e => e.target.style.borderColor = 'rgba(25,128,194,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>I'm interested in</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {INTEREST_OPTIONS.map(opt => (
                      <button key={opt} type="button" onClick={() => setForm(f => ({ ...f, interest: opt }))}
                        style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '0.06em', padding: '7px 14px', borderRadius: '100px', border: `1px solid ${form.interest === opt ? '#1980c2' : 'rgba(255,255,255,0.12)'}`, background: form.interest === opt ? 'rgba(25,128,194,0.15)' : 'transparent', color: form.interest === opt ? '#1980c2' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>What are you working on? *</label>
                  <textarea {...input('message')} placeholder="Tell us about your project, challenge, or idea..." required rows={4} onFocus={e => e.target.style.borderColor = 'rgba(25,128,194,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                    style={{ ...input('message').style, resize: 'vertical', minHeight: '100px' }} />
                </div>

                <button type="submit" style={{ background: '#1980c2', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '15px 28px', borderRadius: '4px', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.target.style.background = '#1468a0'} onMouseLeave={e => e.target.style.background = '#1980c2'}>
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ maxWidth: '1400px', margin: '80px auto 0', padding: isMobile ? '24px 20px 0' : '24px 64px 0', borderTop: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 900, fontSize: '16px', color: '#fff', letterSpacing: '-0.02em' }}>
          M<span style={{ color: '#1980c2' }}>A</span>D
        </span>
        <span style={{ fontFamily: 'Helvetica Neue,sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
          © 2026 MAD Agency. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Work', 'Services', 'About'].map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</a>
          ))}
        </div>
      </div>
    </section>
  )
}
