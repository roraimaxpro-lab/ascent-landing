import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const LEVELS = [
  {
    id: 'neo', name: 'NEO', num: '01', sub: 'Despertar', scadiq: 'S + C', days: '2 días',
    color: '#C5A55A', colorLight: '#f8ebb0', rgb: '197,165,90',
    badge: 'PUERTA DE ENTRADA',
    headline: 'Claridad, dirección y activación real.',
    body: 'NEO es una experiencia completa en sí misma. Aquí confrontas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones.',
    bullets: [
      'Claridad sobre lo que hoy frena tu crecimiento.',
      'Dirección más firme para tomar decisiones.',
      'Fortalecimiento de oferta, pitch y relaciones estratégicas.',
      'Activación real, no solo inspiración.',
    ],
    note: 'NEO es una experiencia completa. Las etapas posteriores existen únicamente para quienes, después de vivirla, decidan seguir creciendo dentro del ecosistema.',
  },
  {
    id: 'mid', name: 'MID', num: '02', sub: 'Construir', scadiq: 'A + D', days: '2 días',
    color: '#8AAFD4', colorLight: '#c8dff5', rgb: '138,175,212',
    badge: 'SIGUIENTE ETAPA',
    headline: 'Estructura, decisiones y crecimiento.',
    body: 'Convierte la claridad en estructura real. Decisiones más firmes, plan de 90 días con números reales, alianzas estratégicas y accountability que produce movimiento.',
    bullets: [
      'Plan de 90 días con números reales.',
      'Alianzas estratégicas dentro del ecosistema.',
      'Accountability que genera movimiento.',
      'Estructura para crecer con más orden.',
    ],
    note: 'Para quienes salieron de NEO con claridad y están listos para construir en serio.',
  },
  {
    id: 'pro', name: 'PRO', num: '03', sub: 'Escalar', scadiq: 'I + Q', days: '3 días',
    color: '#D4BA7A', colorLight: '#f2e4b0', rgb: '212,186,122',
    badge: 'NIVEL AVANZADO',
    headline: 'Liderazgo, expansión y deals reales.',
    body: 'La transición de operador a CEO. Delegación real, pitch de alto nivel, deals dentro del ecosistema y expansión hacia oportunidades que antes no existían.',
    bullets: [
      'Transición real de operador a CEO.',
      'Deal Room con oportunidades de negocio.',
      'Pitch de alto nivel frente a decisores.',
      'Expansión dentro del ecosistema ASCENT.',
    ],
    note: 'El nivel donde el ecosistema genera retorno real: conexiones, capital y movimiento.',
  },
];

/* ─────────────────────────────────────────────
   ORBITAL CIRCLE (for open panel)
───────────────────────────────────────────── */
function OrbitalVisual({ lvl }) {
  const rings = [
    { r: 22, dur: 7, dashed: true, op: 0.6, ccw: false },
    { r: 36, dur: 12, dashed: false, op: 0.35, ccw: true },
    { r: 52, dur: 20, dashed: true, op: 0.18, ccw: false },
  ];
  const dots = [
    { r: 22, dur: 7, size: 6, delay: 0 },
    { r: 36, dur: 12, size: 4, delay: 1.2 },
    { r: 52, dur: 20, size: 3, delay: 2.4 },
  ];

  return (
    <div style={{ position: 'relative', width: '240px', height: '240px' }}>
      {/* Wide ambient glow */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{
          position: 'absolute', inset: '-50px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${lvl.rgb},0.3) 0%, transparent 65%)`,
          filter: 'blur(20px)', pointerEvents: 'none',
        }}
      />
      {/* Rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          animate={{ rotate: ring.ccw ? -360 : 360 }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: `-${ring.r}px`, borderRadius: '50%',
            border: `1px ${ring.dashed ? 'dashed' : 'solid'} rgba(${lvl.rgb},${ring.op})`,
            pointerEvents: 'none',
          }}
        />
      ))}
      {/* Pulse rings */}
      {[0, 1.2, 2.4].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2 + i * 0.2, opacity: 0 }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1px solid rgba(${lvl.rgb},0.5)`, pointerEvents: 'none',
          }}
        />
      ))}
      {/* Orbiting dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: dot.dur, delay: dot.delay, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: `-${dot.r}px`, borderRadius: '50%' }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: 0,
            width: `${dot.size}px`, height: `${dot.size}px`, borderRadius: '50%',
            background: lvl.color, transform: 'translateY(-50%)',
            boxShadow: `0 0 ${dot.size * 3}px ${lvl.color}, 0 0 ${dot.size * 7}px rgba(${lvl.rgb},0.5)`,
          }} />
        </motion.div>
      ))}
      {/* Core */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: `radial-gradient(circle at 38% 32%, rgba(${lvl.rgb},0.25) 0%, #060e1c 65%)`,
        border: `2.5px solid rgba(${lvl.rgb},0.95)`,
        boxShadow: `0 0 0 1px rgba(${lvl.rgb},0.15), 0 0 40px rgba(${lvl.rgb},0.6), 0 0 100px rgba(${lvl.rgb},0.25), inset 0 0 30px rgba(${lvl.rgb},0.08)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
        zIndex: 1, position: 'relative',
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: '2.4rem', letterSpacing: '0.08em', lineHeight: 1,
          background: `linear-gradient(140deg,#fff8e8 0%,${lvl.colorLight} 30%,${lvl.color} 70%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: `drop-shadow(0 0 20px rgba(${lvl.rgb},1))`,
        }}>{lvl.name}</span>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
          fontSize: '0.5rem', letterSpacing: '0.3em',
          color: `rgba(${lvl.rgb},0.8)`,
        }}>{lvl.scadiq}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GATE PANEL
───────────────────────────────────────────── */
function GatePanel({ lvl, index, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onClick={onToggle}
    >
      {/* LED LEFT BORDER — always visible, brighter when open */}
      <motion.div
        animate={{
          boxShadow: isOpen
            ? `inset 4px 0 0 ${lvl.color}, inset 8px 0 20px rgba(${lvl.rgb},0.3), inset 16px 0 40px rgba(${lvl.rgb},0.15)`
            : `inset 2px 0 0 rgba(${lvl.rgb},0.3)`,
          background: isOpen
            ? `linear-gradient(135deg, rgba(${lvl.rgb},0.1) 0%, rgba(5,10,18,0.98) 45%)`
            : 'rgba(5,9,16,0.98)',
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', minHeight: isOpen ? undefined : '80px' }}
      >

        {/* ── COLLAPSED BAR ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isOpen ? 'clamp(2rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem) 0' : '0 clamp(1.5rem,5vw,5rem)',
          minHeight: '80px',
        }}>
          {/* Left: level identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem,2.5vw,2rem)' }}>
            {/* Number */}
            <motion.span
              animate={{ color: isOpen ? `rgba(${lvl.rgb},0.25)` : `rgba(${lvl.rgb},0.18)` }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >{lvl.num}</motion.span>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', background: `rgba(${lvl.rgb},${isOpen ? 0.4 : 0.15})`, transition: 'background 0.4s' }} />

            {/* Name */}
            <motion.span
              animate={{
                background: isOpen
                  ? [`linear-gradient(140deg,#fff8e8,${lvl.colorLight},${lvl.color})`, `linear-gradient(140deg,#fff8e8,${lvl.colorLight},${lvl.color})`]
                  : `linear-gradient(140deg,${lvl.colorLight},${lvl.color})`,
              }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.8rem,4vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1,
                background: `linear-gradient(140deg,${lvl.colorLight},${lvl.color})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: isOpen ? `drop-shadow(0 0 20px rgba(${lvl.rgb},0.9))` : 'none',
                transition: 'filter 0.4s',
              }}
            >{lvl.name}</motion.span>

            <div>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: 'clamp(1rem,1.8vw,1.5rem)', letterSpacing: '-0.01em',
                color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.4s',
              }}>{lvl.sub}</div>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '0.65rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: isOpen ? `rgba(${lvl.rgb},0.8)` : `rgba(${lvl.rgb},0.3)`,
                transition: 'color 0.4s', marginTop: '2px',
                textShadow: isOpen ? `0 0 14px rgba(${lvl.rgb},0.8)` : 'none',
              }}>{lvl.days} · {lvl.scadiq}</div>
            </div>
          </div>

          {/* Right: toggle icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
              border: `1px solid rgba(${lvl.rgb},${isOpen ? 0.6 : 0.2})`,
              background: isOpen ? `rgba(${lvl.rgb},0.12)` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isOpen ? `0 0 20px rgba(${lvl.rgb},0.35)` : 'none',
              transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="8" y1="1" x2="8" y2="15" stroke={isOpen ? lvl.color : `rgba(${lvl.rgb},0.5)`} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="8" x2="15" y2="8" stroke={isOpen ? lvl.color : `rgba(${lvl.rgb},0.5)`} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* ── EXPANDED CONTENT ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{
                padding: 'clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,5rem) clamp(2.5rem,5vw,4rem)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1.8fr)',
                gap: 'clamp(2rem,5vw,6rem)',
                alignItems: 'center',
                position: 'relative',
              }}>

                {/* Ghost watermark */}
                <div style={{
                  position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(12rem,22vw,24rem)', lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: `1px rgba(${lvl.rgb},0.06)`,
                  userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
                  zIndex: 0,
                }}>{lvl.name}</div>

                {/* LED top sweep line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: `linear-gradient(90deg, rgba(${lvl.rgb},0.8) 0%, rgba(${lvl.rgb},0.15) 60%, transparent 100%)`,
                    boxShadow: `0 0 12px rgba(${lvl.rgb},0.5)`,
                    transformOrigin: 'left', zIndex: 2,
                  }}
                />

                {/* Left: Orbital */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem', position: 'relative', zIndex: 1 }}
                >
                  <OrbitalVisual lvl={lvl} />

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[lvl.days, lvl.scadiq, '100% presencial'].map((tag, i) => (
                      <div key={i} style={{
                        padding: '5px 14px',
                        background: i === 0 ? `rgba(${lvl.rgb},0.14)` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${i === 0 ? `rgba(${lvl.rgb},0.45)` : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '2px',
                        fontFamily: "'Montserrat',sans-serif", fontSize: '8.5px',
                        letterSpacing: '0.24em', textTransform: 'uppercase',
                        color: i === 0 ? lvl.color : '#FFFFFF', fontWeight: 700,
                        boxShadow: i === 0 ? `0 0 12px rgba(${lvl.rgb},0.2)` : 'none',
                      }}>{tag}</div>
                    ))}
                  </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '9px',
                    padding: '6px 16px',
                    background: `rgba(${lvl.rgb},0.12)`,
                    border: `1px solid rgba(${lvl.rgb},0.55)`,
                    borderRadius: '2px', marginBottom: '1.6rem',
                    boxShadow: `0 0 18px rgba(${lvl.rgb},0.2)`,
                  }}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      style={{ width: '5px', height: '5px', borderRadius: '50%', background: lvl.color, boxShadow: `0 0 8px ${lvl.color}` }}
                    />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '9px', letterSpacing: '0.4em', color: lvl.colorLight, textTransform: 'uppercase' }}>
                      {lvl.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div style={{ marginBottom: '1.4rem' }}>
                    <div style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                      fontSize: 'clamp(2.2rem,4.5vw,4rem)', letterSpacing: '-0.04em', lineHeight: 0.92,
                      color: '#FFFFFF', marginBottom: '0.5rem',
                    }}>{lvl.sub}</div>
                    <div style={{
                      fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                      fontSize: 'clamp(1rem,1.6vw,1.2rem)',
                      color: lvl.color, lineHeight: 1.4,
                      textShadow: `0 0 25px rgba(${lvl.rgb},0.5)`,
                    }}>{lvl.headline}</div>
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    style={{
                      height: '1px', marginBottom: '1.4rem',
                      background: `linear-gradient(90deg,rgba(${lvl.rgb},0.6),transparent)`,
                      transformOrigin: 'left',
                    }}
                  />

                  {/* Body */}
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                    fontSize: 'clamp(0.9rem,1.3vw,1rem)', lineHeight: 1.9,
                    color: '#FFFFFF', margin: '0 0 1.6rem',
                  }}>{lvl.body}</p>

                  {/* Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.8rem' }}>
                    {lvl.bullets.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.09, duration: 0.45 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}
                      >
                        <motion.div
                          animate={{ boxShadow: [`0 0 4px ${lvl.color}`, `0 0 18px ${lvl.color}`, `0 0 4px ${lvl.color}`] }}
                          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity }}
                          style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: `linear-gradient(135deg,${lvl.colorLight},${lvl.color})`,
                            flexShrink: 0, marginTop: '7px',
                          }}
                        />
                        <span style={{
                          fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
                          fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', color: '#FFFFFF', lineHeight: 1.7,
                        }}>{b}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Note callout */}
                  <div style={{
                    padding: '1.1rem 1.4rem',
                    background: `rgba(${lvl.rgb},0.06)`,
                    border: `1px solid rgba(${lvl.rgb},0.2)`,
                    borderLeft: `3px solid ${lvl.color}`,
                    borderRadius: '3px',
                    boxShadow: `0 0 24px rgba(${lvl.rgb},0.07), inset 0 0 20px rgba(${lvl.rgb},0.03)`,
                  }}>
                    <p style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                      fontSize: 'clamp(0.8rem,1.1vw,0.87rem)', lineHeight: 1.8,
                      color: '#FFFFFF', margin: 0,
                    }}>{lvl.note}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom separator */}
        <div style={{
          height: '1px', marginLeft: 'clamp(1.5rem,5vw,5rem)', marginRight: 'clamp(1.5rem,5vw,5rem)',
          background: `rgba(${lvl.rgb},${isOpen ? 0.25 : 0.08})`,
          transition: 'background 0.4s',
        }} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const [open, setOpen] = useState(0);

  return (
    <section ref={ref} style={{ background: '#040A14', position: 'relative', overflow: 'hidden' }}>

      {/* ── Atmosphere ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.05) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%,black 0%,transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%,black 0%,transparent 100%)',
      }} />
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity }}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '140vw', height: '60vh',
          background: 'radial-gradient(ellipse,rgba(197,165,90,0.1) 0%,transparent 50%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.55) 30%,rgba(197,165,90,0.55) 70%,transparent)',
      }} />

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        style={{
          padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem) clamp(3rem,5vw,4rem)',
          maxWidth: '1000px', margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.6rem' }}>
          <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '1px', width: '70px', background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }} />
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '0.42em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
            El Sistema ASCENT
          </span>
          <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '1px', width: '70px', background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }} />
        </div>

        <div style={{
          fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
          fontSize: 'clamp(1.4rem,3vw,2.2rem)', color: '#C5A55A',
          marginBottom: '0.2rem', textShadow: '0 0 40px rgba(197,165,90,0.45)',
        }}>El Ecosistema</div>

        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: 'clamp(3.5rem,11vw,9rem)', letterSpacing: '-0.045em', lineHeight: 0.86,
          color: '#FFFFFF',
          textShadow: '0 0 80px rgba(197,165,90,0.1)',
        }}>ASCENT</div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
            fontSize: 'clamp(0.97rem,1.6vw,1.1rem)', lineHeight: 1.75,
            color: '#FFFFFF', margin: '1.8rem auto 0', maxWidth: '500px',
          }}
        >
          Tres niveles de transformación. Cada uno opera sobre etapas específicas del método{' '}
          <span style={{ color: '#C5A55A', fontWeight: 700, textShadow: '0 0 16px rgba(197,165,90,0.5)' }}>SCADIQ.</span>
          {' '}Selecciona para explorar el sistema.
        </motion.p>
      </motion.div>

      {/* ── GATES ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {LEVELS.map((lvl, i) => (
          <GatePanel
            key={lvl.id}
            lvl={lvl}
            index={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </div>

      {/* ── ECOSYSTEM FOOTER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem)',
          position: 'relative', zIndex: 1,
        }}
      >
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
          gap: 'clamp(1px,0.15vw,2px)',
          border: '1px solid rgba(197,165,90,0.2)',
          borderRadius: '8px', overflow: 'hidden',
        }}>
          {[
            { num: '1', name: 'Bootcamp Vivencial', items: 'NEO · MID · PRO', color: '#C5A55A', rgb: '197,165,90' },
            { num: '2', name: 'Private Business Network', items: 'Pods · Eventos · Métricas · Relaciones', color: '#8AAFD4', rgb: '138,175,212' },
            { num: '3', name: 'Opportunity Platform', items: 'Deals · Alianzas · Referidos · Capital', color: '#D4BA7A', rgb: '212,186,122' },
          ].map((capa, i) => (
            <div key={i} style={{
              padding: 'clamp(1.4rem,2.5vw,2rem)',
              background: i === 2 ? 'linear-gradient(135deg,rgba(212,186,122,0.08) 0%,rgba(4,10,20,0.98) 100%)' : 'rgba(4,10,20,0.98)',
              borderRight: i < 2 ? '1px solid rgba(197,165,90,0.12)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.7rem' }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.6rem',
                  letterSpacing: '0.3em', color: `rgba(${capa.rgb},0.6)`, textTransform: 'uppercase',
                }}>Capa {capa.num}</span>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg,rgba(${capa.rgb},0.3),transparent)` }} />
              </div>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', color: '#FFFFFF', marginBottom: '6px',
              }}>{capa.name}</div>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: '0.8rem',
                color: '#FFFFFF', lineHeight: 1.6,
              }}>{capa.items}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />
    </section>
  );
}
