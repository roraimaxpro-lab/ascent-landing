import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─────────────────── DATA ─────────────────── */
const LEVELS = [
  {
    id: 'neo', name: 'NEO', num: '01', sub: 'Despertar', scadiq: 'S + C', days: '2 días',
    color: '#C5A55A', colorLight: '#f8ebb0', rgb: '197,165,90',
    badge: 'PUERTA DE ENTRADA',
    headline: 'Claridad, dirección y activación real dentro de tu negocio.',
    body: 'NEO es una experiencia completa en sí misma. Aquí trabajas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones estratégicas.',
    bullets: [
      'Claridad sobre lo que hoy frena tu crecimiento.',
      'Dirección más firme para tomar decisiones.',
      'Fortalecimiento de oferta, pitch y relaciones estratégicas.',
      'Activación real, no solo inspiración.',
    ],
    note: 'NEO es una experiencia completa. Las etapas posteriores existen únicamente para quienes, después de vivirla, decidan seguir creciendo dentro del ecosistema.',
    size: 280,
  },
  {
    id: 'mid', name: 'MID', num: '02', sub: 'Construir', scadiq: 'A + D', days: '2 días',
    color: '#8AAFD4', colorLight: '#c8dff5', rgb: '138,175,212',
    badge: 'SIGUIENTE ETAPA',
    headline: 'Estructura, decisiones y crecimiento con más orden.',
    body: 'Convierte la claridad en estructura real. Plan de 90 días, alianzas estratégicas dentro del ecosistema y accountability que produce movimiento.',
    bullets: [
      'Plan de 90 días con números reales.',
      'Alianzas estratégicas dentro del ecosistema.',
      'Accountability que genera movimiento.',
    ],
    note: 'Para quienes salieron de NEO y están listos para construir en serio.',
    size: 170,
  },
  {
    id: 'pro', name: 'PRO', num: '03', sub: 'Escalar', scadiq: 'I + Q', days: '3 días',
    color: '#D4BA7A', colorLight: '#f2e4b0', rgb: '212,186,122',
    badge: 'NIVEL AVANZADO',
    headline: 'Liderazgo, expansión y deals reales dentro del ecosistema.',
    body: 'La transición de operador a CEO. Delegación real, deals dentro del ecosistema y expansión hacia oportunidades que antes no existían.',
    bullets: [
      'Transición real de operador a CEO.',
      'Deal Room con oportunidades de negocio.',
      'Expansión dentro del ecosistema ASCENT.',
    ],
    note: 'El nivel donde el ecosistema genera retorno real: conexiones, capital y movimiento.',
    size: 170,
  },
];

/* ─────────────────── CIRCLE NODE ─────────────────── */
function CircleNode({ lvl, isActive, onClick, visible }) {
  const sz = lvl.size;
  const isNeo = lvl.id === 'neo';

  return (
    <div
      onClick={onClick}
      style={{ position: 'relative', width: sz, height: sz, cursor: 'pointer', flexShrink: 0 }}
    >
      {/* Pulse rings when active */}
      {isActive && [0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, opacity: 0.65 }}
          animate={{ scale: 2.1 + i * 0.25, opacity: 0 }}
          transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1px solid rgba(${lvl.rgb},0.6)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: isActive ? [0.5, 1, 0.5] : [0.1, 0.25, 0.1],
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: isNeo ? '-50px' : '-30px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${lvl.rgb},${isActive ? 0.32 : 0.1}) 0%, transparent 65%)`,
          filter: 'blur(18px)', pointerEvents: 'none',
          transition: 'opacity 0.5s',
        }}
      />

      {/* Orbital rings */}
      {[
        { r: isNeo ? 22 : 14, dur: isNeo ? 7 : 9, dashed: true, op: isActive ? 0.65 : 0.18, ccw: false },
        { r: isNeo ? 36 : 22, dur: isNeo ? 13 : 16, dashed: false, op: isActive ? 0.35 : 0.1, ccw: true },
        ...(isNeo ? [{ r: 52, dur: 22, dashed: true, op: isActive ? 0.2 : 0.06, ccw: false }] : []),
      ].map((ring, i) => (
        <motion.div
          key={i}
          animate={{ rotate: ring.ccw ? -360 : 360 }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: `-${ring.r}px`, borderRadius: '50%',
            border: `1px ${ring.dashed ? 'dashed' : 'solid'} rgba(${lvl.rgb},${ring.op})`,
            transition: 'border-color 0.5s',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Orbiting dots */}
      {visible && [
        { r: isNeo ? 22 : 14, dur: isNeo ? 7 : 9, size: isNeo ? 6 : 4, delay: 0 },
        { r: isNeo ? 36 : 22, dur: isNeo ? 13 : 16, size: isNeo ? 4 : 2.5, delay: 1.5 },
        ...(isNeo ? [{ r: 52, dur: 22, size: 3, delay: 3 }] : []),
      ].map((dot, i) => (
        <motion.div key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: dot.dur, delay: dot.delay, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: `-${dot.r}px`, borderRadius: '50%', pointerEvents: 'none' }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: 0,
            width: dot.size, height: dot.size, borderRadius: '50%',
            background: lvl.color, transform: 'translateY(-50%)',
            boxShadow: `0 0 ${dot.size * 3}px ${lvl.color}, 0 0 ${dot.size * 6}px rgba(${lvl.rgb},0.4)`,
            opacity: isActive ? 1 : 0.4,
            transition: 'opacity 0.5s',
          }} />
        </motion.div>
      ))}

      {/* Core circle */}
      <motion.div
        animate={{
          boxShadow: isActive
            ? [
                `0 0 0 2px rgba(${lvl.rgb},0.9), 0 0 25px rgba(${lvl.rgb},0.7), 0 0 70px rgba(${lvl.rgb},0.45), 0 0 140px rgba(${lvl.rgb},0.22)`,
                `0 0 0 2px rgba(${lvl.rgb},1), 0 0 40px rgba(${lvl.rgb},0.9), 0 0 100px rgba(${lvl.rgb},0.6), 0 0 200px rgba(${lvl.rgb},0.3)`,
                `0 0 0 2px rgba(${lvl.rgb},0.9), 0 0 25px rgba(${lvl.rgb},0.7), 0 0 70px rgba(${lvl.rgb},0.45), 0 0 140px rgba(${lvl.rgb},0.22)`,
              ]
            : `0 0 0 1px rgba(${lvl.rgb},0.2), 0 0 12px rgba(${lvl.rgb},0.08)`,
        }}
        transition={{ duration: 2.5, repeat: isActive ? Infinity : 0 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: isActive
            ? `radial-gradient(circle at 38% 32%, rgba(${lvl.rgb},0.28) 0%, #07101e 65%)`
            : 'radial-gradient(circle at 38% 32%, rgba(20,34,55,0.9) 0%, #05090f 70%)',
          border: `${isActive ? 2.5 : 1.5}px solid rgba(${lvl.rgb},${isActive ? 0.95 : 0.22})`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: isNeo ? 7 : 5,
          transition: 'background 0.45s, border 0.45s',
        }}
      >
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: isNeo ? '2.6rem' : '1.6rem',
          letterSpacing: '0.08em', lineHeight: 1,
          background: isActive
            ? `linear-gradient(140deg,#fff8e8 0%,${lvl.colorLight} 30%,${lvl.color} 70%)`
            : `linear-gradient(140deg,${lvl.colorLight},${lvl.color})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: isActive ? `drop-shadow(0 0 22px rgba(${lvl.rgb},1))` : 'none',
          transition: 'filter 0.45s',
        }}>{lvl.name}</span>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
          fontSize: isNeo ? '0.52rem' : '0.42rem', letterSpacing: '0.28em',
          color: `rgba(${lvl.rgb},${isActive ? 0.9 : 0.35})`,
          transition: 'color 0.45s',
        }}>{lvl.scadiq}</span>
      </motion.div>

      {/* Label below circle */}
      <div style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
        marginTop: isNeo ? 18 : 14, textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
          fontSize: isNeo ? '1rem' : '0.8rem', letterSpacing: '0.02em',
          color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.35)',
          transition: 'color 0.4s',
          textShadow: isActive ? `0 0 20px rgba(${lvl.rgb},0.5)` : 'none',
        }}>{lvl.sub}</div>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: isNeo ? '0.68rem' : '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3,
          color: isActive ? lvl.color : `rgba(${lvl.rgb},0.3)`,
          textShadow: isActive ? `0 0 12px rgba(${lvl.rgb},0.7)` : 'none',
          transition: 'color 0.4s',
        }}>{lvl.days}</div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN ─────────────────── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const [active, setActive] = useState(0);
  const lvl = LEVELS[active];

  return (
    <section ref={ref} style={{ background: '#040A14', position: 'relative', overflow: 'hidden', padding: 'clamp(4rem,8vw,7rem) 1.5rem' }}>

      {/* ── Atmosphere ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.055) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%,black,transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%,black,transparent)',
      }} />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], background: [
          `radial-gradient(ellipse,rgba(${lvl.rgb},0.1) 0%,transparent 50%)`,
          `radial-gradient(ellipse,rgba(${lvl.rgb},0.16) 0%,transparent 50%)`,
          `radial-gradient(ellipse,rgba(${lvl.rgb},0.1) 0%,transparent 50%)`,
        ]}}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '160vw', height: '80vh',
          filter: 'blur(80px)', pointerEvents: 'none',
          transition: 'background 0.8s ease',
        }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.55) 30%,rgba(197,165,90,0.55) 70%,transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.4rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '0.42em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>El Sistema ASCENT</span>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#C5A55A', marginBottom: '0.15rem', textShadow: '0 0 40px rgba(197,165,90,0.4)' }}>El Ecosistema</div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem,10vw,8.5rem)', letterSpacing: '-0.045em', lineHeight: 0.87, color: '#FFFFFF' }}>ASCENT</div>
          <motion.p initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.95rem,1.5vw,1.08rem)', lineHeight: 1.75, color: '#FFFFFF', margin: '1.6rem auto 0', maxWidth: '480px' }}>
            Tres niveles bajo el método{' '}
            <span style={{ color: '#C5A55A', fontWeight: 700, textShadow: '0 0 16px rgba(197,165,90,0.5)' }}>SCADIQ.</span>
            {' '}Selecciona para explorar.
          </motion.p>
        </motion.div>

        {/* ── THREE CIRCLES ── */}
        <div style={{ position: 'relative', marginBottom: 'clamp(4rem,8vw,6rem)' }}>

          {/* SVG connecting lines */}
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', top: '50%', left: 0, right: 0, width: '100%', height: '200px', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineNeoMid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={LEVELS[1].color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={LEVELS[0].color} stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineNeoProRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={LEVELS[0].color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={LEVELS[2].color} stopOpacity="0.4" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {visible && <>
              <motion.line x1="220" y1="100" x2="450" y2="100"
                stroke="url(#lineNeoMid)" strokeWidth="1.5" strokeDasharray="8 5" filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }} />
              <motion.line x1="550" y1="100" x2="780" y2="100"
                stroke="url(#lineNeoProRight)" strokeWidth="1.5" strokeDasharray="8 5" filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1 }} />
            </>}
          </svg>

          {/* Circles row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(3rem,7vw,8rem)',
            paddingTop: 'clamp(3rem,5vw,4rem)',
            paddingBottom: 'clamp(3rem,5vw,4rem)',
            position: 'relative', zIndex: 1,
          }}>
            {/* MID */}
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <CircleNode lvl={LEVELS[1]} isActive={active === 1} onClick={() => setActive(active === 1 ? 0 : 1)} visible={visible} />
            </motion.div>

            {/* NEO — CENTER HERO */}
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
              <CircleNode lvl={LEVELS[0]} isActive={active === 0} onClick={() => setActive(0)} visible={visible} />
            </motion.div>

            {/* PRO */}
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <CircleNode lvl={LEVELS[2]} isActive={active === 2} onClick={() => setActive(active === 2 ? 0 : 2)} visible={visible} />
            </motion.div>
          </div>
        </div>

        {/* ── CONTENT PANEL (no box, floating) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: active === 0 ? '900px' : '680px', margin: '0 auto', textAlign: 'center' }}
          >
            {/* Thin top line in level color */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                height: '1px', marginBottom: 'clamp(1.8rem,3vw,2.5rem)',
                background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},0.7) 30%,rgba(${lvl.rgb},0.7) 70%,transparent)`,
                boxShadow: `0 0 12px rgba(${lvl.rgb},0.5)`,
                transformOrigin: 'center',
              }}
            />

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: '1.4rem',
              padding: '6px 18px',
              background: `rgba(${lvl.rgb},0.1)`,
              border: `1px solid rgba(${lvl.rgb},0.5)`,
              borderRadius: '2px',
              boxShadow: `0 0 18px rgba(${lvl.rgb},0.18)`,
            }}>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: lvl.color, boxShadow: `0 0 8px ${lvl.color}` }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '9px', letterSpacing: '0.4em', color: lvl.colorLight, textTransform: 'uppercase' }}>{lvl.badge}</span>
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
              fontSize: active === 0 ? 'clamp(1.4rem,2.8vw,2.2rem)' : 'clamp(1.2rem,2.2vw,1.8rem)',
              color: lvl.color, lineHeight: 1.4, marginBottom: '1.2rem',
              textShadow: `0 0 30px rgba(${lvl.rgb},0.5)`,
            }}>{lvl.headline}</div>

            {/* Body */}
            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: active === 0 ? 'clamp(0.95rem,1.4vw,1.05rem)' : 'clamp(0.9rem,1.3vw,1rem)',
              lineHeight: 1.9, color: '#FFFFFF',
              margin: '0 auto 1.6rem',
              maxWidth: active === 0 ? '750px' : '560px',
            }}>{lvl.body}</p>

            {/* Bullets */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.65rem',
              marginBottom: '1.8rem',
              alignItems: 'center',
            }}>
              {lvl.bullets.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.09, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, maxWidth: active === 0 ? '640px' : '480px', textAlign: 'left' }}
                >
                  <motion.div
                    animate={{ boxShadow: [`0 0 4px ${lvl.color}`, `0 0 16px ${lvl.color}`, `0 0 4px ${lvl.color}`] }}
                    transition={{ duration: 2.5 + i * 0.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg,${lvl.colorLight},${lvl.color})`, flexShrink: 0, marginTop: 8 }}
                  />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', color: '#FFFFFF', lineHeight: 1.7 }}>{b}</span>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <div style={{
              display: 'inline-block',
              padding: '0.9rem 1.6rem',
              borderLeft: `3px solid rgba(${lvl.rgb},0.7)`,
              borderRight: `3px solid rgba(${lvl.rgb},0.7)`,
              background: `rgba(${lvl.rgb},0.05)`,
              maxWidth: '620px',
            }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.82rem,1.1vw,0.9rem)', lineHeight: 1.8, color: '#FFFFFF', margin: 0, fontStyle: 'italic' }}>
                {lvl.note}
              </p>
            </div>

            {/* Bottom line */}
            <div style={{
              height: '1px', marginTop: 'clamp(1.8rem,3vw,2.5rem)',
              background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},0.3) 30%,rgba(${lvl.rgb},0.3) 70%,transparent)`,
            }} />
          </motion.div>
        </AnimatePresence>

        {/* ── ECOSYSTEM LAYERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            border: '1px solid rgba(197,165,90,0.15)', borderRadius: 8, overflow: 'hidden',
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
              borderRight: i < 2 ? '1px solid rgba(197,165,90,0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(${capa.rgb},0.5)`, textTransform: 'uppercase' }}>Capa {capa.num}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(${capa.rgb},0.3),transparent)` }} />
              </div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem,1.3vw,1rem)', color: '#FFFFFF', marginBottom: 4 }}>{capa.name}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '0.78rem', color: '#FFFFFF', lineHeight: 1.6 }}>{capa.items}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />
    </section>
  );
}
