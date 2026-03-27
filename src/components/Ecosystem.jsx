import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────── DATA ─────────────────── */
const LEVELS = [
  {
    id: 'neo', name: 'NEO', num: '01', sub: 'Despertar', scadiq: 'S + C', days: '2 días',
    color: '#C5A55A', colorLight: '#f8ebb0', rgb: '197,165,90',
    badge: 'PUERTA DE ENTRADA',
    headline: 'Claridad, dirección y activación real.',
    body: 'NEO es una experiencia completa en sí misma. Aquí trabajas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones.',
    bullets: [
      'Claridad sobre lo que hoy frena tu crecimiento.',
      'Dirección más firme para tomar decisiones.',
      'Fortalecimiento de oferta, pitch y relaciones estratégicas.',
      'Activación real, no solo inspiración.',
    ],
    note: 'NEO es una experiencia completa. Las etapas posteriores existen para quienes, después de vivirla, decidan seguir creciendo dentro del ecosistema.',
  },
  {
    id: 'mid', name: 'MID', num: '02', sub: 'Construir', scadiq: 'A + D', days: '2 días',
    color: '#8AAFD4', colorLight: '#c8dff5', rgb: '138,175,212',
    badge: 'SIGUIENTE ETAPA',
    headline: 'Estructura, decisiones y crecimiento.',
    body: 'Convierte la claridad en estructura real. Plan de 90 días, alianzas estratégicas y accountability que produce movimiento.',
    bullets: ['Plan de 90 días con números reales.', 'Alianzas estratégicas dentro del ecosistema.', 'Accountability que genera movimiento.', 'Estructura para crecer con orden.'],
    note: 'Para quienes salieron de NEO y están listos para construir en serio.',
  },
  {
    id: 'pro', name: 'PRO', num: '03', sub: 'Escalar', scadiq: 'I + Q', days: '3 días',
    color: '#D4BA7A', colorLight: '#f2e4b0', rgb: '212,186,122',
    badge: 'NIVEL AVANZADO',
    headline: 'Liderazgo, expansión y deals reales.',
    body: 'La transición de operador a CEO. Delegación real, deals dentro del ecosistema y expansión hacia oportunidades que antes no existían.',
    bullets: ['Transición real de operador a CEO.', 'Deal Room con oportunidades de negocio.', 'Pitch de alto nivel frente a decisores.', 'Expansión dentro del ecosistema ASCENT.'],
    note: 'El nivel donde el ecosistema genera retorno real: conexiones, capital y movimiento.',
  },
];

/* ─────────────────── ORBITAL ─────────────────── */
function Orbital({ rgb, color, colorLight, name, scadiq, size = 300 }) {
  const rings = [
    { r: 24, dur: 7, dashed: true, op: 0.55, ccw: false },
    { r: 40, dur: 13, dashed: false, op: 0.3, ccw: true },
    { r: 60, dur: 22, dashed: true, op: 0.15, ccw: false },
  ];
  const dots = [
    { r: 24, dur: 7, size: 7, delay: 0 },
    { r: 40, dur: 13, size: 4.5, delay: 1.5 },
    { r: 60, dur: 22, size: 3, delay: 3 },
  ];
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute', inset: `-${size * 0.25}px`, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${rgb},0.28) 0%, transparent 65%)`,
          filter: 'blur(24px)', pointerEvents: 'none',
        }}
      />
      {rings.map((r, i) => (
        <motion.div key={i}
          animate={{ rotate: r.ccw ? -360 : 360 }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: `-${r.r}px`, borderRadius: '50%',
            border: `1px ${r.dashed ? 'dashed' : 'solid'} rgba(${rgb},${r.op})`,
            pointerEvents: 'none',
          }} />
      ))}
      {[0, 1.4, 2.8].map((delay, i) => (
        <motion.div key={i}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.4 + i * 0.2, opacity: 0 }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1px solid rgba(${rgb},0.45)`, pointerEvents: 'none',
          }} />
      ))}
      {dots.map((d, i) => (
        <motion.div key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: `-${d.r}px`, borderRadius: '50%' }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: 0,
            width: d.size, height: d.size, borderRadius: '50%',
            background: color, transform: 'translateY(-50%)',
            boxShadow: `0 0 ${d.size * 3}px ${color}, 0 0 ${d.size * 6}px rgba(${rgb},0.5)`,
          }} />
        </motion.div>
      ))}
      {/* core */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: `radial-gradient(circle at 38% 32%, rgba(${rgb},0.28) 0%, #06101e 65%)`,
        border: `3px solid rgba(${rgb},0.95)`,
        boxShadow: `0 0 0 1px rgba(${rgb},0.15), 0 0 50px rgba(${rgb},0.65), 0 0 120px rgba(${rgb},0.28), inset 0 0 40px rgba(${rgb},0.07)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: size > 200 ? '3rem' : '1.8rem', letterSpacing: '0.08em', lineHeight: 1,
          background: `linear-gradient(140deg,#fff8e8 0%,${colorLight} 30%,${color} 70%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: `drop-shadow(0 0 22px rgba(${rgb},1))`,
        }}>{name}</span>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
          fontSize: size > 200 ? '0.52rem' : '0.44rem', letterSpacing: '0.3em',
          color: `rgba(${rgb},0.8)`,
        }}>{scadiq}</span>
      </div>
    </div>
  );
}

/* ─────────────────── SECONDARY CARD (MID / PRO) ─────────────────── */
function SecondaryCard({ lvl, visible, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: hovered
          ? `linear-gradient(160deg,rgba(${lvl.rgb},0.1) 0%,rgba(4,10,20,0.98) 100%)`
          : 'rgba(4,10,20,0.95)',
        border: `1px solid rgba(${lvl.rgb},${hovered ? 0.45 : 0.15})`,
        borderRadius: '10px',
        padding: 'clamp(1.4rem,2.5vw,2rem)',
        transition: 'background 0.4s, border-color 0.4s',
        cursor: 'default',
      }}
    >
      {/* LED top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg,rgba(${lvl.rgb},0.8),rgba(${lvl.rgb},${hovered ? 0.5 : 0.15}),transparent)`,
        boxShadow: hovered ? `0 0 16px rgba(${lvl.rgb},0.6)` : 'none',
        transition: 'box-shadow 0.4s',
      }} />

      {/* ghost name */}
      <div style={{
        position: 'absolute', right: '-5%', bottom: '-10%',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(5rem,9vw,8rem)', lineHeight: 1, color: 'transparent',
        WebkitTextStroke: `1px rgba(${lvl.rgb},${hovered ? 0.1 : 0.05})`,
        userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
        transition: '-webkit-text-stroke 0.4s',
      }}>{lvl.name}</div>

      {/* badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '4px 12px',
        background: `rgba(${lvl.rgb},0.1)`,
        border: `1px solid rgba(${lvl.rgb},0.3)`,
        borderRadius: '2px', marginBottom: '1rem',
      }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: lvl.color, boxShadow: `0 0 6px ${lvl.color}` }} />
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '8px', letterSpacing: '0.38em', color: lvl.colorLight, textTransform: 'uppercase' }}>{lvl.badge}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '0.3rem' }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.5rem,2.5vw,2rem)', letterSpacing: '-0.02em',
          background: `linear-gradient(140deg,${lvl.colorLight},${lvl.color})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: hovered ? `drop-shadow(0 0 14px rgba(${lvl.rgb},0.8))` : 'none',
          transition: 'filter 0.4s',
        }}>{lvl.name}</span>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
          fontSize: 'clamp(1rem,1.8vw,1.4rem)', color: '#FFFFFF',
        }}>— {lvl.sub}</span>
      </div>

      <div style={{
        fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
        fontSize: 'clamp(0.85rem,1.2vw,0.97rem)', color: lvl.color, marginBottom: '1rem',
        textShadow: hovered ? `0 0 20px rgba(${lvl.rgb},0.5)` : 'none', transition: 'text-shadow 0.4s',
      }}>{lvl.headline}</div>

      <div style={{ width: '40px', height: '1px', background: `rgba(${lvl.rgb},0.5)`, marginBottom: '1rem' }} />

      <p style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
        fontSize: 'clamp(0.82rem,1.1vw,0.9rem)', lineHeight: 1.8,
        color: '#FFFFFF', margin: '0 0 1.2rem',
      }}>{lvl.body}</p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[lvl.days, lvl.scadiq].map((tag, i) => (
          <div key={i} style={{
            padding: '4px 11px',
            background: i === 0 ? `rgba(${lvl.rgb},0.12)` : 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(${lvl.rgb},${i === 0 ? 0.4 : 0.12})`,
            borderRadius: '2px',
            fontFamily: "'Montserrat',sans-serif", fontSize: '8px',
            letterSpacing: '0.22em', color: i === 0 ? lvl.color : '#FFFFFF',
            textTransform: 'uppercase', fontWeight: 700,
          }}>{tag}</div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────── MAIN ─────────────────── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const neo = LEVELS[0];

  return (
    <section ref={ref} style={{ background: '#040A14', position: 'relative', overflow: 'hidden' }}>

      {/* atmosphere */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.055) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%,black,transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 40%,black,transparent)',
      }} />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '160vw', height: '65vh',
          background: 'radial-gradient(ellipse,rgba(197,165,90,0.1) 0%,transparent 50%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.55) 30%,rgba(197,165,90,0.55) 70%,transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,3rem)', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5.5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.4rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '0.42em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              El Sistema ASCENT
            </span>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#C5A55A', marginBottom: '0.15rem', textShadow: '0 0 40px rgba(197,165,90,0.4)' }}>
            El Ecosistema
          </div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem,10vw,8.5rem)', letterSpacing: '-0.045em', lineHeight: 0.87, color: '#FFFFFF' }}>
            ASCENT
          </div>
          <motion.p initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.95rem,1.5vw,1.08rem)', lineHeight: 1.75, color: '#FFFFFF', margin: '1.6rem auto 0', maxWidth: '480px' }}>
            Tres niveles de transformación bajo el método{' '}
            <span style={{ color: '#C5A55A', fontWeight: 700, textShadow: '0 0 16px rgba(197,165,90,0.5)' }}>SCADIQ.</span>
            {' '}Todo comienza aquí.
          </motion.p>
        </motion.div>

        {/* ── 80/20 GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.85fr) minmax(0,1fr)',
          gap: 'clamp(1rem,2vw,1.5rem)',
          alignItems: 'stretch',
        }}>

          {/* ── NEO — 80% ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg,rgba(197,165,90,0.1) 0%,rgba(4,10,22,0.97) 50%,rgba(3,8,18,1) 100%)',
              border: '1px solid rgba(197,165,90,0.4)',
              borderRadius: '14px',
              padding: 'clamp(2.5rem,4vw,4rem)',
              boxShadow: '0 0 0 1px rgba(197,165,90,0.07), 0 30px 100px rgba(0,0,0,0.7), 0 0 100px rgba(197,165,90,0.08)',
            }}
          >
            {/* Gold top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg,rgba(197,165,90,0.2),#C5A55A 25%,#f8ebb0 50%,#C5A55A 75%,rgba(197,165,90,0.2))',
              boxShadow: '0 0 30px rgba(197,165,90,0.7)',
            }} />

            {/* Corner glows */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 280, background: 'radial-gradient(circle at 0% 0%,rgba(197,165,90,0.18) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle at 100% 100%,rgba(197,165,90,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />

            {/* Giant "NEO" watermark */}
            <div style={{
              position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(14rem,20vw,22rem)', lineHeight: 1, color: 'transparent',
              WebkitTextStroke: '1px rgba(197,165,90,0.055)',
              userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
            }}>NEO</div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '7px 18px',
                background: 'rgba(197,165,90,0.13)',
                border: '1px solid rgba(197,165,90,0.65)',
                borderRadius: '2px', marginBottom: '2rem',
                boxShadow: '0 0 22px rgba(197,165,90,0.2)',
              }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#C5A55A', boxShadow: '0 0 10px #C5A55A' }}
              />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '9.5px', letterSpacing: '0.42em', color: '#f8ebb0', textTransform: 'uppercase' }}>
                {neo.badge}
              </span>
            </motion.div>

            {/* Layout: orbital left + content right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(2rem,4vw,4rem)',
              alignItems: 'center',
              position: 'relative', zIndex: 1,
            }}>
              {/* Left: orbital */}
              <motion.div
                initial={{ opacity: 0, scale: 0.65 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
              >
                <Orbital rgb={neo.rgb} color={neo.color} colorLight={neo.colorLight} name={neo.name} scadiq={neo.scadiq} size={260} />
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[neo.days, neo.scadiq, '100% presencial'].map((tag, i) => (
                    <div key={i} style={{
                      padding: '5px 13px',
                      background: i === 0 ? 'rgba(197,165,90,0.14)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i === 0 ? 'rgba(197,165,90,0.45)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '2px',
                      fontFamily: "'Montserrat',sans-serif", fontSize: '8.5px',
                      letterSpacing: '0.24em', textTransform: 'uppercase',
                      color: i === 0 ? '#C5A55A' : '#FFFFFF', fontWeight: 700,
                      boxShadow: i === 0 ? '0 0 12px rgba(197,165,90,0.22)' : 'none',
                    }}>{tag}</div>
                  ))}
                </div>
              </motion.div>

              {/* Right: content */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem,4.5vw,4rem)', letterSpacing: '-0.04em', lineHeight: 0.9, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Despertar
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1rem,1.6vw,1.2rem)', color: '#C5A55A', marginBottom: '1.4rem', textShadow: '0 0 28px rgba(197,165,90,0.5)' }}>
                  {neo.headline}
                </div>
                <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
                  style={{ height: 1, marginBottom: '1.4rem', background: 'linear-gradient(90deg,rgba(197,165,90,0.65),transparent)', transformOrigin: 'left' }} />
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.9rem,1.3vw,1rem)', lineHeight: 1.9, color: '#FFFFFF', margin: '0 0 1.5rem' }}>
                  {neo.body}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.7rem' }}>
                  {neo.bullets.map((b, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={visible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.09, duration: 0.45 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                    >
                      <motion.div
                        animate={{ boxShadow: ['0 0 4px #C5A55A', '0 0 18px #C5A55A', '0 0 4px #C5A55A'] }}
                        transition={{ duration: 2.5 + i * 0.5, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#f8ebb0,#C5A55A)', flexShrink: 0, marginTop: 7 }}
                      />
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(0.88rem,1.2vw,0.97rem)', color: '#FFFFFF', lineHeight: 1.7 }}>{b}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{
                  padding: '1rem 1.3rem',
                  background: 'rgba(197,165,90,0.06)',
                  border: '1px solid rgba(197,165,90,0.2)',
                  borderLeft: '3px solid #C5A55A',
                  borderRadius: '3px',
                  boxShadow: '0 0 24px rgba(197,165,90,0.07)',
                }}>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.8rem,1.1vw,0.87rem)', lineHeight: 1.8, color: '#FFFFFF', margin: 0 }}>
                    {neo.note}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── MID + PRO — 20% ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,1.5vw,1.2rem)' }}>
            {LEVELS.slice(1).map((lvl, i) => (
              <SecondaryCard key={lvl.id} lvl={lvl} visible={visible} delay={0.4 + i * 0.15} />
            ))}
          </div>
        </div>

        {/* ── ECOSYSTEM LAYERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            marginTop: 'clamp(1.5rem,3vw,2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            border: '1px solid rgba(197,165,90,0.18)',
            borderRadius: 8, overflow: 'hidden',
          }}
        >
          {[
            { num: '1', name: 'Bootcamp Vivencial', items: 'NEO · MID · PRO', color: '#C5A55A', rgb: '197,165,90' },
            { num: '2', name: 'Private Business Network', items: 'Pods · Eventos · Métricas', color: '#8AAFD4', rgb: '138,175,212' },
            { num: '3', name: 'Opportunity Platform', items: 'Deals · Alianzas · Capital', color: '#D4BA7A', rgb: '212,186,122' },
          ].map((capa, i) => (
            <div key={i} style={{
              padding: 'clamp(1.2rem,2vw,1.7rem)',
              background: i === 2 ? 'linear-gradient(135deg,rgba(212,186,122,0.07) 0%,rgba(4,10,20,0.98) 100%)' : 'rgba(4,10,20,0.98)',
              borderRight: i < 2 ? '1px solid rgba(197,165,90,0.12)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(${capa.rgb},0.55)`, textTransform: 'uppercase' }}>Capa {capa.num}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(${capa.rgb},0.3),transparent)` }} />
              </div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem,1.3vw,1rem)', color: '#FFFFFF', marginBottom: '4px' }}>{capa.name}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '0.78rem', color: '#FFFFFF', lineHeight: 1.6 }}>{capa.items}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />
    </section>
  );
}
