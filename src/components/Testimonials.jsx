import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: 'Vine pensando que era un evento más. Salí con tres decisiones de negocio que llevaba meses postergando y con dos conexiones que ya se están convirtiendo en proyectos reales.',
    name: '[Nombre]',
    role: 'Fundador · Empresa de Servicios',
    initial: 'F',
    tag: 'ASCENT NEO · Edición 2025',
  },
  {
    quote: 'No esperaba el nivel de profundidad. Las dinámicas te obligan a ser honesto contigo mismo de una forma que no pasa en ningún curso online. Fue incómodo en el mejor sentido de la palabra.',
    name: '[Nombre]',
    role: 'Director · Empresa de Tecnología',
    initial: 'D',
    tag: 'ASCENT NEO · Edición 2025',
  },
  {
    quote: 'El networking en ASCENT es diferente porque todos vienen en el mismo modo: a construir. No hay nadie ahí perdiendo el tiempo. Eso cambia completamente el tipo de conversación que tienes.',
    name: '[Nombre]',
    role: 'Emprendedor · Sector Retail',
    initial: 'E',
    tag: 'ASCENT NEO · Edición 2025',
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.97 }),
};

export default function Testimonials() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!visible || paused) return;
    const t = setInterval(() => { setDir(1); setIndex(p => (p + 1) % testimonials.length); }, 5000);
    return () => clearInterval(t);
  }, [visible, paused]);

  const go = (d) => {
    setDir(d);
    setIndex(p => (p + d + testimonials.length) % testimonials.length);
    setPaused(true);
  };

  const t = testimonials[index];

  return (
    <section id="testimonios" ref={ref} style={{
      background: '#070F1A',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.06) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Ghost large quotation mark */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Playfair Display',serif", fontWeight: 900,
        fontSize: 'clamp(20rem,35vw,38rem)', lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.03)',
        pointerEvents: 'none', userSelect: 'none',
      }}>"</div>

      {/* Ambient center glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '70%', height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(197,165,90,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.4) 30%, rgba(197,165,90,0.4) 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1.6rem' }}>
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '36px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px',
              letterSpacing: '0.24em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              Lo que dicen quienes lo vivieron
            </span>
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '36px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.6 }} />
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '0.08em' }}>
            <motion.h2
              initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(2rem,5vw,4rem)', color: '#FFFFFF',
                letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
              }}
            >Credibilidad que se</motion.h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 700,
                fontSize: 'clamp(2rem,5vw,4rem)',
                background: 'linear-gradient(135deg,#e8cc88,#C5A55A,#f0d888)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0,
              }}
            >documenta en cada edición</motion.h2>
          </div>
        </motion.div>

        {/* ── CAROUSEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ position: 'relative' }}
        >
          {/* Card container with overflow hidden */}
          <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(197,165,90,0.22)',
                  borderRadius: '8px',
                  padding: 'clamp(2.5rem,5vw,4.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 80px rgba(197,165,90,0.07), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Gold top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.4), transparent)',
                }} />

                {/* Large decorative quote mark */}
                <div style={{
                  position: 'absolute', top: '-10px', right: 'clamp(1.5rem,3vw,3rem)',
                  fontFamily: "'Playfair Display',serif", fontWeight: 900,
                  fontSize: 'clamp(8rem,12vw,12rem)', lineHeight: 1,
                  color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.1)',
                  userSelect: 'none', pointerEvents: 'none',
                }}>"</div>

                {/* Inner ambient glow */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse 50% 70% at 10% 50%, rgba(197,165,90,0.05) 0%, transparent 65%)',
                }} />

                {/* Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '16px', height: '1px', background: '#C5A55A', opacity: 0.6 }} />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                    letterSpacing: '0.22em', color: 'rgba(197,165,90,0.6)', textTransform: 'uppercase' }}>
                    {t.tag}
                  </span>
                </div>

                {/* Quote text */}
                <p style={{
                  fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem,2.2vw,1.55rem)', lineHeight: 1.72,
                  color: '#E8E4DC', marginBottom: 'clamp(2rem,4vw,3rem)',
                  maxWidth: '820px', position: 'relative', zIndex: 1,
                  letterSpacing: '0.005em',
                }}>
                  "{t.quote}"
                </p>

                {/* Divider */}
                <div style={{
                  width: '40px', height: '1px', background: '#C5A55A',
                  opacity: 0.5, marginBottom: '1.5rem',
                  boxShadow: '0 0 6px rgba(197,165,90,0.4)',
                }} />

                {/* Author */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: 'rgba(197,165,90,0.12)',
                    border: '1.5px solid rgba(197,165,90,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                    fontSize: '1.1rem', color: '#C5A55A',
                    flexShrink: 0,
                    boxShadow: '0 0 14px rgba(197,165,90,0.2)',
                  }}>{t.initial}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                      fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '3px',
                    }}>{t.name}</div>
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '0.7rem',
                      color: '#8A9AB5', letterSpacing: '0.08em',
                    }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── CONTROLS ── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', marginTop: '2rem',
          }}>
            {/* Prev */}
            <motion.button
              onClick={() => go(-1)}
              whileHover={{ scale: 1.1, borderColor: 'rgba(197,165,90,0.9)', background: 'rgba(197,165,90,0.12)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid rgba(197,165,90,0.3)',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="#C5A55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); setPaused(true); }}
                  animate={{
                    width: i === index ? '28px' : '7px',
                    background: i === index ? '#C5A55A' : 'rgba(197,165,90,0.25)',
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    height: '5px', borderRadius: '3px',
                    border: 'none', cursor: 'pointer', padding: 0,
                    boxShadow: i === index ? '0 0 8px rgba(197,165,90,0.6)' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={() => go(1)}
              whileHover={{ scale: 1.1, borderColor: 'rgba(197,165,90,0.9)', background: 'rgba(197,165,90,0.12)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid rgba(197,165,90,0.3)',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="#C5A55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '1.2rem', height: '2px', background: 'rgba(197,165,90,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              key={`${index}-progress`}
              initial={{ scaleX: 0 }}
              animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.5))',
                transformOrigin: 'left',
                boxShadow: '0 0 6px rgba(197,165,90,0.5)',
              }}
            />
          </div>
        </motion.div>

        {/* ── BOTTOM STAT ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            marginTop: 'clamp(3rem,6vw,5rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '2rem',
          }}
        >
          {[
            { num: '100%', label: 'repiten o refieren' },
            { num: '2 días', label: 'de trabajo real' },
            { num: 'Cada edición', label: 'con sala limitada' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg,#e8cc88,#C5A55A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginBottom: '4px',
                filter: 'drop-shadow(0 0 12px rgba(197,165,90,0.3))',
              }}>{s.num}</div>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '0.62rem',
                letterSpacing: '0.2em', color: 'rgba(138,154,181,0.6)',
                textTransform: 'uppercase',
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.25) 30%, rgba(197,165,90,0.25) 70%, transparent)',
      }} />
    </section>
  );
}
