import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const LEVELS = [
  {
    id: 'neo', name: 'NEO', sub: 'Despertar', scadiq: 'S + C', days: '2 días',
    color: '#C5A55A', colorLight: '#f5e4a8', glow: 'rgba(197,165,90,',
    badge: 'Puerta de entrada',
    headline: 'Claridad, dirección y activación real.',
    body: 'NEO es una experiencia completa en sí misma. Aquí confrontas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones.',
    bullets: [
      'Claridad sobre lo que hoy frena tu crecimiento.',
      'Dirección más firme para tomar decisiones.',
      'Fortalecimiento de oferta, pitch y relaciones estratégicas.',
      'Activación real, no solo inspiración.',
    ],
    closing: 'NEO es una experiencia completa. Las etapas posteriores existen para quienes, después de vivirla, decidan seguir creciendo.',
  },
  {
    id: 'mid', name: 'MID', sub: 'Construir', scadiq: 'A + D', days: '2 días',
    color: '#8AAFD4', colorLight: '#c0d8f0', glow: 'rgba(138,175,212,',
    badge: 'Siguiente nivel',
    headline: 'Estructura, decisiones y crecimiento.',
    body: 'Convierte la claridad que obtuviste en NEO en estructura real. Decisiones más firmes, plan de 90 días, alianzas estratégicas y accountability que produce resultados.',
    bullets: [
      'Plan de 90 días con números reales.',
      'Alianzas estratégicas dentro del ecosistema.',
      'Accountability que genera movimiento.',
      'Estructura para crecer con más orden.',
    ],
    closing: 'Para quienes salieron de NEO con claridad y están listos para construir en serio.',
  },
  {
    id: 'pro', name: 'PRO', sub: 'Escalar', scadiq: 'I + Q', days: '3 días',
    color: '#D4BA7A', colorLight: '#f0dfa0', glow: 'rgba(212,186,122,',
    badge: 'Nivel avanzado',
    headline: 'Liderazgo, expansión y deals reales.',
    body: 'La transición de operador a CEO. Delegación real, pitch de alto nivel, deals dentro del ecosistema y expansión hacia oportunidades que antes no existían.',
    bullets: [
      'Transición real de operador a CEO.',
      'Deal Room con oportunidades de negocio.',
      'Pitch de alto nivel frente a decisores.',
      'Expansión dentro del ecosistema ASCENT.',
    ],
    closing: 'El nivel donde el ecosistema genera retorno real: conexiones, capital y movimiento.',
  },
];

/* ─────────────────────────────────────────────
   NODE GLOW CIRCLE
───────────────────────────────────────────── */
function Node({ lvl, index, isActive, onClick, visible }) {
  const sizes = [160, 120, 120];
  const sz = sizes[index];
  const delay = 0.3 + index * 0.15;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{
        width: `${sz}px`, height: `${sz}px`,
        borderRadius: '50%',
        cursor: 'pointer',
        background: 'none', border: 'none', padding: 0,
        position: 'relative', flexShrink: 0,
        outline: 'none',
      }}
    >
      {/* LED pulse rings when active */}
      {isActive && [0, 0.7, 1.4].map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2 + i * 0.3, opacity: 0 }}
          transition={{ duration: 2.5, delay: d, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1px solid ${lvl.glow}0.6)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Outer LED ring */}
      <motion.div
        animate={isActive ? {
          boxShadow: [
            `0 0 0 2px ${lvl.glow}0.9), 0 0 20px ${lvl.glow}0.7), 0 0 60px ${lvl.glow}0.4), 0 0 120px ${lvl.glow}0.2)`,
            `0 0 0 2px ${lvl.glow}1), 0 0 35px ${lvl.glow}0.9), 0 0 90px ${lvl.glow}0.55), 0 0 180px ${lvl.glow}0.3)`,
            `0 0 0 2px ${lvl.glow}0.9), 0 0 20px ${lvl.glow}0.7), 0 0 60px ${lvl.glow}0.4), 0 0 120px ${lvl.glow}0.2)`,
          ],
        } : {
          boxShadow: `0 0 0 1px ${lvl.glow}0.25), 0 0 12px ${lvl.glow}0.1)`,
        }}
        transition={{ duration: 2.2, repeat: isActive ? Infinity : 0 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          transition: 'box-shadow 0.5s ease',
        }}
      />

      {/* Circle fill */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: isActive
          ? `radial-gradient(circle at 38% 32%, ${lvl.glow}0.35) 0%, rgba(7,13,24,0.97) 65%)`
          : 'radial-gradient(circle at 38% 32%, rgba(20,34,58,0.95) 0%, rgba(6,11,20,0.98) 70%)',
        border: `${isActive ? 2 : 1}px solid ${lvl.glow}${isActive ? '0.9)' : '0.22)'}`,
        transition: 'all 0.45s ease',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '4px',
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: index === 0 ? '1.9rem' : '1.45rem',
          letterSpacing: '0.07em', lineHeight: 1,
          background: isActive
            ? `linear-gradient(140deg,#fff6e0 0%,${lvl.colorLight} 35%,${lvl.color} 70%)`
            : `linear-gradient(140deg,${lvl.colorLight} 0%,${lvl.color} 60%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: isActive ? `drop-shadow(0 0 16px ${lvl.glow}1))` : 'none',
          transition: 'filter 0.4s',
        }}>{lvl.name}</span>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
          fontSize: index === 0 ? '0.52rem' : '0.44rem',
          letterSpacing: '0.22em',
          color: isActive ? `${lvl.glow}0.9)` : `${lvl.glow}0.45)`,
          transition: 'color 0.4s',
        }}>{lvl.scadiq}</span>
      </div>

      {/* Label below */}
      <div style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
        marginTop: '12px', textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
          fontSize: index === 0 ? '0.85rem' : '0.72rem',
          letterSpacing: '0.06em',
          color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.4s',
        }}>{lvl.sub}</div>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '0.62rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: isActive ? lvl.color : `${lvl.glow}0.4)`,
          marginTop: '2px', transition: 'color 0.4s',
          textShadow: isActive ? `0 0 12px ${lvl.glow}0.8)` : 'none',
        }}>{lvl.days}</div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 900);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const lvl = LEVELS[active];

  /* SVG connector paths between nodes (desktop only) */
  // Node centers (relative to a 420×340 SVG viewBox)
  // NEO: center x=210, y=85; MID: x=90, y=270; PRO: x=330, y=270
  const nodes = [
    { cx: 210, cy: 85 },
    { cx: 90,  cy: 270 },
    { cx: 330, cy: 270 },
  ];

  return (
    <section ref={ref} style={{
      background: '#050C16',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(4rem,8vw,7rem) 1.5rem',
    }}>

      {/* ── Atmosphere ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.06) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
      }} />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '120vw', height: '70vh',
          background: `radial-gradient(ellipse,${LEVELS[active].glow}0.12) 0%,transparent 55%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
          transition: 'background 0.6s ease',
        }}
      />
      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5) 30%,rgba(197,165,90,0.5) 70%,transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,7vw,6rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.4rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '0.4em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              El Sistema
            </span>
            <motion.div initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#C5A55A', marginBottom: '0.2rem', textShadow: '0 0 40px rgba(197,165,90,0.4)' }}>
            El Ecosistema
          </div>
          <div style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(3.5rem,10vw,8rem)', letterSpacing: '-0.04em', lineHeight: 0.88,
            color: '#FFFFFF', textShadow: '0 0 60px rgba(197,165,90,0.12)',
          }}>ASCENT</div>
          <motion.p
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: 'clamp(0.95rem,1.6vw,1.1rem)', lineHeight: 1.7,
              color: '#FFFFFF', margin: '1.6rem auto 0', maxWidth: '520px',
            }}
          >
            Selecciona cada nivel para explorar el sistema.{' '}
            <span style={{ color: '#C5A55A', fontWeight: 600 }}>Todo comienza en NEO.</span>
          </motion.p>
        </motion.div>

        {/* ── MAIN INTERACTIVE LAYOUT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '420px 1fr',
          gap: isMobile ? '3rem' : 'clamp(2rem,5vw,6rem)',
          alignItems: 'center',
        }}>

          {/* ── LEFT: DIAGRAM ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '420px', maxWidth: '100%' }}>

              {/* SVG connector lines */}
              <svg
                viewBox="0 0 420 360"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
              >
                <defs>
                  <linearGradient id="lineGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5A55A" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#C5A55A" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="lineBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C5A55A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8AAFD4" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="lineWarm" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C5A55A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#D4BA7A" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* NEO → MID */}
                {visible && (
                  <motion.line
                    x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[1].cx} y2={nodes[1].cy}
                    stroke="url(#lineBlue)" strokeWidth="1.5" filter="url(#glow)"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                  />
                )}
                {/* NEO → PRO */}
                {visible && (
                  <motion.line
                    x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[2].cx} y2={nodes[2].cy}
                    stroke="url(#lineWarm)" strokeWidth="1.5" filter="url(#glow)"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.75 }}
                  />
                )}
                {/* MID → PRO */}
                {visible && (
                  <motion.line
                    x1={nodes[1].cx} y1={nodes[1].cy} x2={nodes[2].cx} y2={nodes[2].cy}
                    stroke="url(#lineGold)" strokeWidth="1" strokeOpacity="0.25"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                )}

                {/* Active node indicator dot on line */}
                {visible && active > 0 && (
                  <motion.circle
                    cx={nodes[0].cx + (nodes[active].cx - nodes[0].cx) * 0.5}
                    cy={nodes[0].cy + (nodes[active].cy - nodes[0].cy) * 0.5}
                    r="3"
                    fill={LEVELS[active].color}
                    filter="url(#glow)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </svg>

              {/* Nodes positioned */}
              <div style={{ position: 'relative', height: '380px' }}>

                {/* NEO — top center */}
                <div style={{ position: 'absolute', left: '50%', top: '10px', transform: 'translateX(-50%)' }}>
                  <Node lvl={LEVELS[0]} index={0} isActive={active === 0} onClick={() => setActive(0)} visible={visible} />
                </div>

                {/* MID — bottom left */}
                <div style={{ position: 'absolute', left: '5%', bottom: '30px' }}>
                  <Node lvl={LEVELS[1]} index={1} isActive={active === 1} onClick={() => setActive(1)} visible={visible} />
                </div>

                {/* PRO — bottom right */}
                <div style={{ position: 'absolute', right: '5%', bottom: '30px' }}>
                  <Node lvl={LEVELS[2]} index={2} isActive={active === 2} onClick={() => setActive(2)} visible={visible} />
                </div>

                {/* Center label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={visible ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                  style={{
                    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
                    textAlign: 'center', pointerEvents: 'none',
                  }}
                >
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(197,165,90,0.35)',
                    textTransform: 'uppercase',
                  }}>Sistema</div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(197,165,90,0.35)',
                    textTransform: 'uppercase', marginTop: '2px',
                  }}>SCADIQ</div>
                </motion.div>

              </div>

              {/* Click hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
                style={{
                  textAlign: 'center', marginTop: '-1rem',
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
                  letterSpacing: '0.28em', color: 'rgba(197,165,90,0.45)',
                  textTransform: 'uppercase',
                }}
              >
                Selecciona un nivel
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: CONTENT PANEL ── */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative',
                  background: `linear-gradient(135deg,${lvl.glow}0.09) 0%,rgba(6,11,20,0.97) 60%)`,
                  border: `1px solid ${lvl.glow}0.35)`,
                  borderRadius: '12px',
                  padding: 'clamp(1.8rem,3vw,2.8rem)',
                  boxShadow: `0 0 0 1px ${lvl.glow}0.06), 0 20px 80px rgba(0,0,0,0.6), 0 0 60px ${lvl.glow}0.08)`,
                  overflow: 'hidden',
                }}
              >
                {/* LED top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg,transparent,${lvl.color} 30%,${lvl.colorLight} 50%,${lvl.color} 70%,transparent)`,
                  boxShadow: `0 0 20px ${lvl.glow}0.8), 0 0 40px ${lvl.glow}0.4)`,
                }} />

                {/* Corner glow */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '200px', height: '200px',
                  background: `radial-gradient(circle at 0% 0%,${lvl.glow}0.14) 0%,transparent 65%)`,
                  pointerEvents: 'none',
                }} />

                {/* Badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '5px 14px',
                  background: `${lvl.glow}0.12)`,
                  border: `1px solid ${lvl.glow}0.5)`,
                  borderRadius: '2px',
                  marginBottom: '1.4rem',
                  boxShadow: `0 0 14px ${lvl.glow}0.2)`,
                }}>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: '5px', height: '5px', borderRadius: '50%', background: lvl.color, boxShadow: `0 0 8px ${lvl.color}` }}
                  />
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '9px', letterSpacing: '0.35em', color: lvl.colorLight, textTransform: 'uppercase' }}>
                    {lvl.badge}
                  </span>
                </div>

                {/* Level + Sub */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '0.3rem' }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                      fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '-0.03em',
                      background: `linear-gradient(140deg,#fff6e0 0%,${lvl.colorLight} 30%,${lvl.color} 70%)`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      filter: `drop-shadow(0 0 20px ${lvl.glow}0.8))`,
                    }}>{lvl.name}</span>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                      fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '-0.03em',
                      color: '#FFFFFF',
                    }}>— {lvl.sub}</span>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1rem,1.5vw,1.15rem)', color: lvl.color, lineHeight: 1.4 }}>
                    {lvl.headline}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: '100%', height: '1px', background: `linear-gradient(90deg,${lvl.glow}0.5),transparent)`, marginBottom: '1.4rem' }} />

                {/* Body */}
                <p style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', lineHeight: 1.85,
                  color: '#FFFFFF', margin: '0 0 1.5rem',
                }}>{lvl.body}</p>

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.6rem' }}>
                  {lvl.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                    >
                      <motion.div
                        animate={{ boxShadow: [`0 0 5px ${lvl.color}`, `0 0 16px ${lvl.color}`, `0 0 5px ${lvl.color}`] }}
                        transition={{ duration: 2.5 + i * 0.4, repeat: Infinity }}
                        style={{
                          width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '7px',
                          background: lvl.color,
                        }}
                      />
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(0.88rem,1.1vw,0.95rem)', color: '#FFFFFF', lineHeight: 1.65 }}>{b}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Closing note */}
                <div style={{
                  padding: '1rem 1.2rem',
                  background: `${lvl.glow}0.06)`,
                  border: `1px solid ${lvl.glow}0.2)`,
                  borderLeft: `3px solid ${lvl.color}`,
                  borderRadius: '3px',
                  boxShadow: `inset 0 0 30px ${lvl.glow}0.03), 0 0 20px ${lvl.glow}0.06)`,
                }}>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.8rem,1.1vw,0.87rem)', lineHeight: 1.75, color: '#FFFFFF', margin: 0 }}>
                    {lvl.closing}
                  </p>
                </div>

                {/* SCADIQ + days footer */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '1.4rem', flexWrap: 'wrap' }}>
                  {[`${lvl.days}`, `SCADIQ: ${lvl.scadiq}`, lvl.badge].map((tag, i) => (
                    <div key={i} style={{
                      padding: '5px 14px',
                      background: i === 0 ? `${lvl.glow}0.12)` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i === 0 ? lvl.glow + '0.4)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '2px',
                      fontFamily: "'Montserrat',sans-serif", fontSize: '8.5px',
                      letterSpacing: '0.22em', color: i === 0 ? lvl.color : '#FFFFFF',
                      textTransform: 'uppercase', fontWeight: 700,
                    }}>{tag}</div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── ECOSYSTEM NOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{
            marginTop: 'clamp(3rem,5vw,5rem)',
            padding: 'clamp(1.5rem,3vw,2.2rem)',
            background: 'linear-gradient(135deg,rgba(197,165,90,0.06) 0%,rgba(6,11,20,0.95) 100%)',
            border: '1px solid rgba(197,165,90,0.25)',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr auto 1fr',
            gap: 'clamp(1rem,2vw,1.5rem)',
            alignItems: 'center',
            boxShadow: '0 0 60px rgba(197,165,90,0.05)',
          }}
        >
          {[
            { name: 'Capa 1', title: 'Bootcamp Vivencial', sub: 'NEO · MID · PRO', color: '#C5A55A' },
            { name: 'Capa 2', title: 'Private Business Network', sub: 'Pods · Eventos · Métricas', color: '#8AAFD4' },
            { name: 'Capa 3', title: 'Opportunity Platform', sub: 'Deals · Alianzas · Referidos', color: '#D4BA7A' },
          ].map((capa, i) => (
            <>
              <div key={capa.name} style={{ textAlign: isMobile ? 'left' : 'center' }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '0.32em', color: capa.color, textTransform: 'uppercase', fontWeight: 700, marginBottom: '5px', opacity: 0.8 }}>{capa.name}</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem,1.3vw,1rem)', color: '#FFFFFF', marginBottom: '3px' }}>{capa.title}</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '0.78rem', color: '#FFFFFF', lineHeight: 1.5 }}>{capa.sub}</div>
              </div>
              {!isMobile && i < 2 && (
                <div key={`sep-${i}`} style={{ width: '1px', height: '50px', background: 'linear-gradient(180deg,transparent,rgba(197,165,90,0.35),transparent)', margin: '0 auto' }} />
              )}
            </>
          ))}
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />
    </section>
  );
}
