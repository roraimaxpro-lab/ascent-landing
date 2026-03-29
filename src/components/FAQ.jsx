import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqs = [
  {
    q: '¿Necesito tener un negocio para asistir?',
    a: 'No es requisito. ASCENT está diseñado principalmente para fundadores, emprendedores y dueños de negocio, pero también es para profesionales que quieren escalar su carrera, asumir un rol de mayor impacto o construir autoridad dentro de su industria. Lo que sí necesitas, sin importar tu punto de partida, es venir con una dirección real, con retos concretos y con disposición genuina de avanzar.',
    tag: 'Requisitos',
  },
  {
    q: '¿Qué tipo de persona asiste normalmente?',
    a: 'Fundadores, socios, líderes de equipo, emprendedores en crecimiento, directivos en transición. No hay un perfil único, pero hay un denominador común: todos vienen con algo real en mente y la disposición de trabajarlo en serio.',
    tag: 'Perfil',
  },
  {
    q: '¿Voy a hacer conexiones reales o es solo socializar?',
    a: 'Las dinámicas están diseñadas para que las conexiones ocurran de forma natural, no forzada. No sales con una lista de contactos, sales con personas que ya saben quién eres, qué buscas y con quiénes podrían trabajar.',
    tag: 'Red',
  },
  {
    q: '¿Cuánto dura el entrenamiento?',
    a: 'ASCENT tiene tres niveles. NEO dura 2 días, MID dura 2 días y PRO dura 3 días. Cada nivel profundiza donde el anterior terminó, no son eventos independientes, son etapas de un mismo proceso.',
    tag: 'Formato',
  },
  {
    q: '¿Qué debo esperar del primer día?',
    a: 'Inmersión total desde el primer bloque. No hay calentamientos de 3 horas ni bienvenidas interminables. El proceso comienza desde que entras a la sala. Al final del primer día ya habrás procesado más de lo que procesas en meses de trabajo habitual.',
    tag: 'Día 1',
  },
  {
    q: '¿Puedo asistir si estoy en un momento de transición?',
    a: 'Especialmente si estás en transición. Los momentos de mayor tensión son los que más se benefician de claridad, estructura y entorno de alta calidad. ASCENT fue diseñado precisamente para esos momentos.',
    tag: 'Momento',
  },
];

export default function FAQ() {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });

  const current = faqs[selected];

  return (
    <section id="faq" ref={ref} style={{
      background: '#070F1A',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.055) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.35) 30%, rgba(197,165,90,0.35) 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '1.5rem' }}
          >
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '40px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.5 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
              letterSpacing: '0.26em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              Preguntas frecuentes
            </span>
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '40px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.5 }} />
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(2rem,5vw,4rem)', color: '#FFFFFF',
                letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0,
              }}
            >
              Antes de decidir,{' '}
              <span style={{
                fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                background: 'linear-gradient(135deg,#e8cc88,#C5A55A,#f0d888)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>respuestas directas.</span>
            </motion.h2>
          </div>
        </div>

        {/* ── MAIN PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="faq-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '2px',
            border: '1px solid rgba(197,165,90,0.12)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
          }}
        >

          {/* ── LEFT: Question List ── */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderRight: '1px solid rgba(197,165,90,0.1)',
          }}>
            {faqs.map((faq, i) => {
              const isActive = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: 'clamp(0.9rem,1.5vw,1.25rem) clamp(1.2rem,2vw,1.8rem)',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(197,165,90,0.12) 0%, rgba(197,165,90,0.04) 100%)'
                      : 'transparent',
                    borderBottom: i < faqs.length - 1 ? '1px solid rgba(197,165,90,0.07)' : 'none',
                    borderLeft: `3px solid ${isActive ? '#C5A55A' : 'transparent'}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {/* Left accent sweep */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSweep"
                      style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'linear-gradient(90deg, rgba(197,165,90,0.08) 0%, transparent 80%)',
                      }}
                    />
                  )}


                  {/* Question text */}
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: isActive ? 700 : 500,
                    fontSize: 'clamp(0.75rem,1.05vw,0.85rem)', lineHeight: 1.4,
                    color: '#FFFFFF',
                    transition: 'color 0.3s, font-weight 0.2s',
                    position: 'relative', zIndex: 1,
                  }}>{faq.q}</span>

                  {/* Active arrow */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                    transition={{ duration: 0.25 }}
                    style={{ marginLeft: 'auto', flexShrink: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6h6M6 3l3 3-3 3" stroke="#C5A55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Answer Panel ── */}
          <div style={{
            background: '#070F1A',
            position: 'relative', overflow: 'hidden',
            minHeight: '480px', display: 'flex', flexDirection: 'column',
          }}>

            {/* Ghost question mark watermark */}
            <div style={{
              position: 'absolute', top: '-10px', right: '-10px',
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(12rem,18vw,16rem)',
              fontWeight: 700, fontStyle: 'italic',
              color: 'rgba(197,165,90,0.03)',
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              letterSpacing: '-0.06em',
            }}>?</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: 'clamp(2rem,4vw,3.5rem)',
                  display: 'flex', flexDirection: 'column',
                  flex: 1, position: 'relative', zIndex: 1,
                }}
              >
                {/* Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.8rem' }}>
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '10px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: '#C5A55A', opacity: 0.75,
                  }}>
                    {String(selected + 1).padStart(2, '0')} / {current.tag}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(197,165,90,0.3), transparent)' }} />
                </div>

                {/* Question */}
                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  fontSize: 'clamp(1.1rem,2vw,1.55rem)', letterSpacing: '-0.025em',
                  color: '#FFFFFF', lineHeight: 1.25,
                  marginBottom: '1.5rem',
                }}>{current.q}</h3>

                {/* Gold rule */}
                <div style={{
                  height: '1.5px', width: '50px',
                  background: 'linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.2))',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 8px rgba(197,165,90,0.4)',
                }} />

                {/* Answer */}
                <div style={{
                  borderLeft: '2px solid rgba(197,165,90,0.35)',
                  paddingLeft: '1.4rem',
                  flex: 1,
                }}>
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                    fontSize: 'clamp(0.88rem,1.25vw,0.97rem)', lineHeight: 1.85,
                    color: '#FFFFFF', margin: 0,
                  }}>{current.a}</p>
                </div>

                {/* Nav dots */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  marginTop: '2.5rem',
                }}>
                  {faqs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      style={{
                        width: i === selected ? '24px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background: i === selected ? '#C5A55A' : 'rgba(197,165,90,0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                        padding: 0,
                        boxShadow: i === selected ? '0 0 10px rgba(197,165,90,0.6)' : 'none',
                      }}
                    />
                  ))}

                  {/* Prev / Next */}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                    {[
                      { dir: -1, icon: 'M7 6H1M4 3l-3 3 3 3' },
                      { dir: 1, icon: 'M1 6h6M4 3l3 3-3 3' },
                    ].map(({ dir, icon }) => (
                      <button
                        key={dir}
                        onClick={() => setSelected(s => Math.max(0, Math.min(faqs.length - 1, s + dir)))}
                        style={{
                          width: '30px', height: '30px',
                          borderRadius: '50%',
                          border: '1px solid rgba(197,165,90,0.25)',
                          background: 'rgba(197,165,90,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(197,165,90,0.15)';
                          e.currentTarget.style.borderColor = 'rgba(197,165,90,0.6)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(197,165,90,0.05)';
                          e.currentTarget.style.borderColor = 'rgba(197,165,90,0.25)';
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 8 12" fill="none">
                          <path d={icon} stroke="#C5A55A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{ textAlign: 'center', marginTop: 'clamp(2.5rem,4vw,3.5rem)' }}
        >
          <p style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: 'clamp(0.85rem,1.2vw,0.92rem)', color: '#FFFFFF',
            marginBottom: '1.2rem', lineHeight: 1.6,
          }}>
            ¿Tienes preguntas que no están aquí?
          </p>
          <motion.a
            href="#aplicar"
            onClick={e => { if (window.innerWidth < 860) { e.preventDefault(); const el = document.getElementById('formulario'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
              fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#C5A55A', textDecoration: 'none',
              border: '1px solid rgba(197,165,90,0.35)',
              padding: '13px 30px', borderRadius: '4px',
              background: 'rgba(197,165,90,0.05)',
              transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(197,165,90,0.1)';
              e.currentTarget.style.borderColor = 'rgba(197,165,90,0.55)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(197,165,90,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(197,165,90,0.05)';
              e.currentTarget.style.borderColor = 'rgba(197,165,90,0.35)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Habla con nosotros
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path d="M6 2l4 4-4 4M2 6h8" stroke="#C5A55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.25) 30%, rgba(197,165,90,0.25) 70%, transparent)',
      }} />

      <style>{`
        @media (max-width: 750px) {
          #faq .faq-layout {
            grid-template-columns: 1fr !important;
          }
          #faq .faq-layout > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(197,165,90,0.1);
          }
        }
      `}</style>
    </section>
  );
}
