import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const LEVELS = [
  {
    name: 'NEO',
    step: '01',
    sub: 'Despertar',
    scadiq: 'S + C',
    days: '2 días',
    desc: 'Confronta tu realidad, aclara tu dirección y fortalece tu oferta, tu pitch y tus conexiones.',
    color: '#C5A55A',
    colorLight: '#f0d888',
    glow: 'rgba(197,165,90,0.5)',
    glowWide: 'rgba(197,165,90,0.18)',
    ring1: 'rgba(197,165,90,0.22)',
    ring2: 'rgba(197,165,90,0.08)',
    primary: true,
  },
  {
    name: 'MID',
    step: '02',
    sub: 'Construir',
    scadiq: 'A + D',
    days: '2 días',
    desc: 'Convierte la claridad en estructura con decisiones más firmes, plan de 90 días, alianzas y accountability.',
    color: '#8AAFD4',
    colorLight: '#b8d4f0',
    glow: 'rgba(100,150,210,0.35)',
    glowWide: 'rgba(100,150,210,0.12)',
    ring1: 'rgba(100,150,210,0.15)',
    ring2: 'rgba(100,150,210,0.06)',
    primary: false,
  },
  {
    name: 'PRO',
    step: '03',
    sub: 'Escalar',
    scadiq: 'I + Q',
    days: '3 días',
    desc: 'Pasa de operador a CEO con delegación, deals reales, pitch de alto nivel y expansión dentro del ecosistema.',
    color: '#D4BA7A',
    colorLight: '#f0dfa0',
    glow: 'rgba(212,186,122,0.3)',
    glowWide: 'rgba(212,186,122,0.1)',
    ring1: 'rgba(212,186,122,0.14)',
    ring2: 'rgba(212,186,122,0.05)',
    primary: false,
  },
];

/* ── Sub-components ── */

function OrbitalRing({ radius, duration, color, opacity, dashes, ccw }) {
  return (
    <motion.div
      animate={{ rotate: ccw ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', inset: `-${radius}px`,
        borderRadius: '50%',
        border: `1px ${dashes ? 'dashed' : 'solid'} ${color}`,
        opacity, pointerEvents: 'none',
      }}
    />
  );
}

function PulseRing({ delay, color, scale = 1.7 }) {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale, opacity: 0 }}
      transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
      style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: `1px solid ${color}`, pointerEvents: 'none',
      }}
    />
  );
}

function OrbitDot({ radius, duration, delay, color, size = 5 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      style={{ position: 'absolute', inset: `-${radius}px`, borderRadius: '50%', pointerEvents: 'none' }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: 0,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%', background: color,
        transform: 'translateY(-50%)',
        boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}44`,
      }} />
    </motion.div>
  );
}

/* ── Journey Progress Track ── */
function JourneyTrack({ visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.35 }}
      style={{
        display: 'flex', alignItems: 'center',
        maxWidth: '520px', margin: '0 auto',
        marginBottom: 'clamp(2rem,4vw,3rem)',
        position: 'relative',
      }}
    >
      {[
        { label: 'NEO', color: '#C5A55A', delay: 0.55 },
        { label: 'MID', color: '#8AAFD4', delay: 0.75 },
        { label: 'PRO', color: '#D4BA7A', delay: 0.95 },
      ].map((node, i) => (
        <div key={node.label} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>

          {/* Node */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: node.delay, duration: 0.45, type: 'spring', stiffness: 220 }}
              style={{
                width: '11px', height: '11px', borderRadius: '50%',
                background: node.color,
                boxShadow: `0 0 14px ${node.color}AA, 0 0 28px ${node.color}44`,
              }}
            />
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: node.delay + 0.12, duration: 0.35 }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: '10px', letterSpacing: '0.24em',
                color: node.color, textTransform: 'uppercase',
              }}
            >{node.label}</motion.span>
          </div>

          {/* Connecting line */}
          {i < 2 && (
            <div style={{ flex: 1, height: '1px', background: 'rgba(197,165,90,0.1)', position: 'relative', margin: '0 4px', marginBottom: '22px' }}>
              {visible && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: node.delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(90deg,${node.color}88,rgba(197,165,90,0.25))`,
                    transformOrigin: 'left',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '250%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: node.delay + 1 }}
                    style={{
                      position: 'absolute', inset: 0, width: '35%',
                      background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)',
                    }}
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ── Level Card ── */
function LevelCard({ lvl, i, visible }) {
  const [hovered, setHovered] = useState(false);
  const circlePx = [118, 94, 78][i];
  const isMain = i === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
      animate={visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.88, delay: 0.42 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(1.8rem,2.8vw,2.5rem) clamp(1.2rem,2vw,1.8rem) clamp(1.4rem,2.2vw,2rem)',
        background: hovered
          ? isMain
            ? 'linear-gradient(160deg,rgba(197,165,90,0.09) 0%,rgba(10,18,32,0.98) 100%)'
            : `linear-gradient(160deg,${lvl.glowWide.replace('0.18','0.07').replace('0.12','0.06').replace('0.1','0.05')} 0%,rgba(10,18,32,0.98) 100%)`
          : 'rgba(9,16,28,0.85)',
        border: `1px solid ${hovered
          ? isMain ? 'rgba(197,165,90,0.45)' : lvl.color + '44'
          : isMain ? 'rgba(197,165,90,0.28)' : 'rgba(197,165,90,0.1)'}`,
        borderRadius: '6px',
        boxShadow: hovered
          ? `0 28px 90px rgba(0,0,0,0.55), 0 0 70px ${lvl.glowWide}, inset 0 1px 0 ${lvl.color}20`
          : isMain
          ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(197,165,90,0.06)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'background 0.45s, border-color 0.45s, box-shadow 0.45s, transform 0.38s cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hovered
          ? `linear-gradient(90deg,transparent,${lvl.color},transparent)`
          : isMain
          ? `linear-gradient(90deg,transparent,${lvl.color}77,transparent)`
          : 'transparent',
        transition: 'background 0.45s',
      }} />

      {/* Step watermark */}
      <div style={{
        position: 'absolute', top: '12px', right: '16px',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(2.8rem,4vw,3.8rem)', lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: `1px ${lvl.color}${hovered ? '1A' : '0A'}`,
        userSelect: 'none', pointerEvents: 'none',
        transition: '-webkit-text-stroke 0.4s',
      }}>{lvl.step}</div>

      {/* ── Circle ── */}
      <div style={{
        position: 'relative',
        width: `${circlePx}px`, height: `${circlePx}px`,
        flexShrink: 0, marginBottom: '1.5rem',
      }}>
        {visible && <>
          <PulseRing delay={i * 0.9} color={lvl.ring1} scale={isMain ? 1.85 : 1.65} />
          <PulseRing delay={1.5 + i * 0.9} color={lvl.ring2} scale={isMain ? 1.5 : 1.38} />
        </>}

        <motion.div
          animate={{ opacity: hovered ? [0.6, 1, 0.6] : [0.2, 0.45, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '-18px', borderRadius: '50%',
            background: `radial-gradient(circle,${lvl.glowWide} 0%,transparent 70%)`,
            filter: 'blur(12px)', pointerEvents: 'none',
          }}
        />

        <OrbitalRing radius={isMain ? 15 : 11} duration={isMain ? 7 : 11} color={lvl.color} opacity={isMain ? 0.4 : 0.22} dashes />
        <OrbitalRing radius={isMain ? 23 : 17} duration={isMain ? 13 : 17} color={lvl.ring1} opacity={0.6} ccw />

        {visible && <>
          <OrbitDot radius={isMain ? 15 : 11} duration={isMain ? 7 : 11} delay={i * 1.5} color={lvl.color} size={isMain ? 5 : 3.5} />
          <OrbitDot radius={isMain ? 23 : 17} duration={isMain ? 13 : 17} delay={i * 0.8 + 0.5} color={lvl.colorLight} size={isMain ? 3 : 2} />
        </>}

        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', height: '100%', borderRadius: '50%',
          background: isMain
            ? 'radial-gradient(circle at 35% 30%,#223660 0%,#0f2040 45%,#071525 100%)'
            : 'radial-gradient(circle at 35% 30%,#172535 0%,#0c1a2a 50%,#070f1a 100%)',
          border: isMain ? `2px solid rgba(197,165,90,0.85)` : `1px solid ${lvl.color}55`,
          boxShadow: isMain
            ? `0 0 50px ${lvl.glow}, 0 0 100px ${lvl.glowWide}, inset 0 1px 0 rgba(197,165,90,0.15)`
            : `0 0 25px ${lvl.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '3px',
        }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: isMain ? '1.6rem' : '1.25rem',
            letterSpacing: '0.06em',
            background: `linear-gradient(140deg,${lvl.colorLight} 0%,${lvl.color} 60%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: `drop-shadow(0 0 12px ${lvl.glow})`,
            lineHeight: 1,
          }}>{lvl.name}</span>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
            fontSize: isMain ? '0.5rem' : '0.44rem',
            color: `${lvl.color}88`, letterSpacing: '0.22em',
          }}>{lvl.scadiq}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ textAlign: 'center', zIndex: 1, width: '100%' }}>

        {/* Verb */}
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.15rem,1.7vw,1.42rem)',
          letterSpacing: '-0.025em',
          color: hovered ? '#FFFFFF' : 'rgba(225,238,255,0.88)',
          marginBottom: '0.55rem',
          transition: 'color 0.35s',
        }}>{lvl.sub}</div>

        {/* Animated divider */}
        <div style={{
          width: hovered ? '75%' : '35%',
          height: '1px',
          background: `linear-gradient(90deg,transparent,${lvl.color}${hovered ? '99' : '44'},transparent)`,
          margin: '0 auto 0.9rem',
          transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1), background 0.45s',
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
          fontSize: 'clamp(0.92rem,1.3vw,1rem)',
          lineHeight: 1.8,
          color: '#FFFFFF',
          margin: '0 0 1.3rem',
          transition: 'color 0.4s',
        }}>{lvl.desc}</p>

        {/* Meta badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 14px',
          background: hovered ? `${lvl.color}15` : `${lvl.color}09`,
          border: `1px solid ${lvl.color}${hovered ? '33' : '1A'}`,
          borderRadius: '2px',
          transition: 'background 0.4s, border-color 0.4s',
        }}>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
            letterSpacing: '0.22em', color: `${lvl.color}CC`,
            textTransform: 'uppercase', fontWeight: 700,
          }}>{lvl.days}</span>
          <div style={{
            width: '3px', height: '3px', borderRadius: '50%',
            background: `${lvl.color}55`,
          }} />
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
            letterSpacing: '0.22em', color: `${lvl.color}88`,
            fontWeight: 700,
          }}>{lvl.scadiq}</span>
        </div>
      </div>

      {/* Bottom glow sweep on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1px',
          background: `linear-gradient(90deg,transparent,${lvl.color}88,transparent)`,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

/* ── Main Export ── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <section ref={ref} style={{
      background: '#070F1A',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(3rem,5vw,5rem) 1.5rem',
    }}>

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(197,165,90,0.015) 1px,transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)',
        width: '1100px', height: '600px',
        background: 'radial-gradient(ellipse,rgba(197,165,90,0.09) 0%,transparent 65%)',
        filter: 'blur(90px)', pointerEvents: 'none',
      }} />

      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.35) 30%,rgba(197,165,90,0.35) 70%,transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3.5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '1.2rem' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5))' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', letterSpacing: '0.28em', color: 'rgba(197,165,90,0.65)', textTransform: 'uppercase' }}>
              Arquitectura del Sistema
            </span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,rgba(197,165,90,0.5),transparent)' }} />
          </div>

          <div style={{ lineHeight: 1, marginBottom: '0.8rem' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: 'rgba(197,165,90,0.65)', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
              El Ecosistema
            </div>
            <div style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(3rem,8vw,6.5rem)', letterSpacing: '-0.03em', lineHeight: 0.92,
              color: '#FFFFFF',
            }}>
              ASCENT
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '1rem', padding: '6px 18px', border: '1px solid rgba(197,165,90,0.35)', borderRadius: '2px', background: 'rgba(197,165,90,0.06)' }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(197,165,90,0.5)' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '0.38em', color: 'rgba(197,165,90,0.85)', textTransform: 'uppercase' }}>3 Capas</span>
            <div style={{ width: '20px', height: '1px', background: 'rgba(197,165,90,0.5)' }} />
          </div>

          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(1.05rem,1.8vw,1.3rem)', color: 'rgba(200,218,240,0.8)', margin: '1.4rem 0 0', lineHeight: 1.6 }}>
            No es un evento.{' '}
            <span style={{ color: '#C5A55A', fontWeight: 600 }}>Es un ecosistema empresarial completo.</span>
          </p>

          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.88rem,1.2vw,0.97rem)', color: 'rgba(200,218,240,0.65)', margin: '0.9rem 0 0', lineHeight: 1.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Está compuesto por tres niveles de transformación:{' '}
            <span style={{ color: '#C5A55A', fontWeight: 600 }}>NEO</span>,{' '}
            <span style={{ color: '#8AAFD4', fontWeight: 600 }}>MID</span>{' '}
            y{' '}
            <span style={{ color: '#D4BA7A', fontWeight: 600 }}>PRO</span>
            {' '}— cada uno opera sobre etapas específicas del método{' '}
            <span style={{ color: '#C5A55A', fontWeight: 600, letterSpacing: '0.06em' }}>SCADIQ</span>
            {' '}para llevar al operador de la claridad inicial hasta la escala real.
          </p>
        </motion.div>

        {/* ── CAPA 1 LABEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2rem' }}
        >
          <motion.div
            initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ flex: 1, height: '1px', transformOrigin: 'right', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5))' }}
          />
          <div style={{
            padding: '10px 24px',
            border: '1px solid rgba(197,165,90,0.6)',
            borderRadius: '2px',
            background: 'linear-gradient(135deg,rgba(197,165,90,0.15) 0%,rgba(197,165,90,0.05) 100%)',
            boxShadow: '0 0 30px rgba(197,165,90,0.15), inset 0 1px 0 rgba(197,165,90,0.12)',
            position: 'relative', overflow: 'hidden',
          }}>
            {visible && (
              <motion.div
                animate={{ x: ['-120%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.8 }}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
                  background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.2),transparent)',
                  pointerEvents: 'none',
                }}
              />
            )}
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
              fontSize: 'clamp(11px,1.4vw,15px)',
              letterSpacing: '0.28em', color: '#C5A55A', textTransform: 'uppercase',
              position: 'relative', zIndex: 1,
            }}>
              Capa 1 — Bootcamp Vivencial
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ flex: 1, height: '1px', transformOrigin: 'left', background: 'linear-gradient(90deg,rgba(197,165,90,0.5),transparent)' }}
          />
        </motion.div>

        {/* ── JOURNEY TRACK ── */}
        {!isMobile && <JourneyTrack visible={visible} />}

        {/* ── LEVEL CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: 'clamp(1rem,1.8vw,1.4rem)',
          marginBottom: 'clamp(2.5rem,5vw,4rem)',
        }}>
          {LEVELS.map((lvl, i) => (
            <LevelCard key={lvl.name} lvl={lvl} i={i} visible={visible} />
          ))}
        </div>

        {/* ── CAPA 2 + CAPA 3 ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,310px),1fr))',
          gap: 'clamp(1rem,2.5vw,1.5rem)',
          marginBottom: 'clamp(2.5rem,5vw,4rem)',
        }}>
          {[
            { num: 2, title: 'Private Business Network', body: 'Pods · Eventos · Métricas\nRelaciones que producen', gold: false },
            { num: 3, title: 'Opportunity Platform', body: 'Deals · Alianzas · Referidos\nDinero real del ecosistema', gold: true },
          ].map((capa, i) => (
            <motion.div
              key={capa.num}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 + i * 0.12 }}
              whileHover={{ y: -3, boxShadow: capa.gold ? '0 8px 50px rgba(197,165,90,0.18)' : '0 8px 30px rgba(197,165,90,0.08)' }}
              style={{
                border: `1px solid rgba(197,165,90,${capa.gold ? 0.5 : 0.18})`,
                borderRadius: '3px',
                padding: 'clamp(1.5rem,3vw,2.2rem)',
                background: capa.gold
                  ? 'linear-gradient(135deg,rgba(197,165,90,0.14) 0%,rgba(197,165,90,0.06) 50%,rgba(11,22,36,0.55) 100%)'
                  : 'rgba(11,22,36,0.55)',
                boxShadow: capa.gold ? '0 0 40px rgba(197,165,90,0.07)' : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '3px', height: '32px', borderRadius: '2px', background: capa.gold ? 'linear-gradient(180deg,#C5A55A,rgba(197,165,90,0.3))' : 'linear-gradient(180deg,rgba(197,165,90,0.6),rgba(197,165,90,0.15))' }} />
                <div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: `rgba(197,165,90,${capa.gold ? 0.75 : 0.5})`, textTransform: 'uppercase', marginBottom: '3px' }}>Capa {capa.num}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(1rem,1.8vw,1.25rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}>{capa.title}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.82rem,1.1vw,0.9rem)', lineHeight: 1.75, color: '#FFFFFF', whiteSpace: 'pre-line' }}>
                {capa.body}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 'clamp(0.95rem,1.6vw,1.15rem)', color: 'rgba(230,240,255,0.85)', margin: 0, letterSpacing: '-0.01em' }}>
            NEO es la puerta de entrada.{' '}
            <span style={{ background: 'linear-gradient(135deg,#f0d888,#C5A55A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 8px rgba(197,165,90,0.55))' }}>
              Todo comienza aquí.
            </span>
          </p>
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.22) 30%,rgba(197,165,90,0.22) 70%,transparent)' }} />
    </section>
  );
}
