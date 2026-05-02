import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const width = useWindowWidth()
  const isMobile = width < 768

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: isMobile ? 0 : '50%',
          right: 0,
          zIndex: 100,
          margin: isMobile ? '6px 10px' : '8px 12px',
          borderRadius: '6px',
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 14px' : '0 20px',
          height: isMobile ? '40px' : '42px',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/1.png" alt="MAD" style={{ height: isMobile ? '26px' : '30px', objectFit: 'contain', display: 'block' }} />
        </Link>

        {/* Desktop centre links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {['Work', 'Services', 'About'].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#181817',
                  textDecoration: 'none',
                  opacity: 0.6,
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && (
            <Link
              to="/contact"
              style={{
                background: '#1980c2',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '9px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Work with us
            </Link>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 110 }}
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#181817', transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#181817', transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#181817', transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: '#f8f8f7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {['Work', 'Services', 'About', 'Contact'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(2.4rem, 10vw, 3.2rem)',
                    color: '#181817',
                    textDecoration: 'none',
                    letterSpacing: '-0.03em',
                    padding: '8px 0',
                    lineHeight: 1.1,
                  }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34, duration: 0.4 }}
              style={{ marginTop: '32px' }}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: '#1980c2',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Work with us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
