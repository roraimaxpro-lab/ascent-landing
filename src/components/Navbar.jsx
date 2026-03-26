import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Qué es', id: 'que-es' },
  { label: 'Para quién', id: 'para-quien' },
  { label: 'La experiencia', id: 'experiencia' },
  { label: 'FAQ', id: 'faq' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 2rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(11,22,36,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(197,165,90,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/LOGOS/logo-sin-fondo.png"
          alt="ASCENT"
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      {/* Desktop Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        listStyle: 'none',
      }} className="desktop-nav">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: '#8A9AB5',
              transition: 'color 0.2s ease',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C5A55A'}
            onMouseLeave={e => e.currentTarget.style.color = '#8A9AB5'}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="javascript:void(0)"
        onClick={e => { e.preventDefault(); scrollTo('aplicar'); }}
        className="nav-cta-btn"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0B1624',
          background: '#C5A55A',
          padding: '10px 22px',
          borderRadius: '2px',
          transition: 'background 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.target.style.background = '#D4BA7A';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.target.style.background = '#C5A55A';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Mi lugar
      </a>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          padding: '4px',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: '#C5A55A',
            transition: 'all 0.3s',
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              background: 'rgba(11,22,36,0.98)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderBottom: '1px solid rgba(197,165,90,0.2)',
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setMenuOpen(false); }}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >{link.label}</button>
            ))}
            <a href="javascript:void(0)" onClick={e => { e.preventDefault(); scrollTo('aplicar'); setMenuOpen(false); }} style={{
              display: 'inline-block',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0B1624',
              background: '#C5A55A',
              padding: '12px 24px',
              borderRadius: '2px',
              textAlign: 'center',
              marginTop: '0.5rem',
            }}>Quiero mi lugar</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
