import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const LEVELS = [
  {
    name: 'NEO',
    sub: 'Despertar',
    scadiq: 'S + C',
    tagline: 'Entrada al ecosistema',
    size: 1,
    color: '#C5A55A',
    colorLight: '#f0d888',
    glow: 'rgba(197,165,90,0.5)',
    glowWide: 'rgba(197,165,90,0.18)',
    ring1: 'rgba(197,165,90,0.22)',
    ring2: 'rgba(197,165,90,0.08)',
    days: '2 días',
  },
  {
    name: 'MID',
    sub: 'Construir',
    scadiq: 'A + D',
    tagline: 'Expansión real',
    size: 0.8,
    color: '#8AAFD4',
    colorLight: '#b8d4f0',
    glow: 'rgba(100,150,210,0.35)',
    glowWide: 'rgba(100,150,210,0.12)',
    ring1: 'rgba(100,150,210,0.15)',
    ring2: 'rgba(100,150,210,0.06)',
    days: '2 días',
  },
  {
    name: 'PRO',
    sub: 'Escalar',
    scadiq: 'I + Q',
    tagline: 'Dominio total',
    size: 0.65,
    color: '#D4BA7A',
    colorLight: '#f0dfa0',
    glow: 'rgba(212,186,122,0.3)',
    glowWide: 'rgba(212,186,122,0.1)',
    ring1: 'rgba(212,186,122,0.14)',
    ring2: 'rgba(212,186,122,0.05)',
    days: '3 días',
  },
];

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
      style={{
        position: 'absolute', inset: `-${radius}px`,
        borderRadius: '50%', pointerEvents: 'none',
      }}
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

/* Animated connector with flowing light */
function FlowConnector({ visible, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={visible ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, position: 'relative' }}
    >
      <div style={{ position: 'relative', width: 'clamp(28px,4vw,52px)', height: '2px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg,rgba(197,165,90,0.2),rgba(197,165,90,0.6))',
        }} />
        {visible && (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: delay + 0.3 }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '40%', height: '100%',
              background: 'linear-gradient(90deg,transparent,rgba(197,165,90,1),transparent)',
            }}
          />
        )}
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <motion.path
          d="M1 7h12M7 1l6 6-6 6"
          stroke="rgba(197,165,90,0.9)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        />
      </svg>
    </motion.div>
  );
}

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

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(197,165,90,0.015) 1px,transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      {/* Wide ambient glow */}
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
        </motion.div>

        {/* ── CAPA 1 LABEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem' }}
        >
          {/* Left line with glow */}
          <motion.div
            initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ flex: 1, height: '1px', transformOrigin: 'right', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5))' }}
          />
          <div style={{
            padding: '12px 28px',
            border: '1px solid rgba(197,165,90,0.6)',
            borderRadius: '2px',
            background: 'linear-gradient(135deg,rgba(197,165,90,0.15) 0%,rgba(197,165,90,0.05) 100%)',
            boxShadow: '0 0 30px rgba(197,165,90,0.15), inset 0 1px 0 rgba(197,165,90,0.12)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Shimmer sweep */}
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
          {/* Right line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ flex: 1, height: '1px', transformOrigin: 'left', background: 'linear-gradient(90deg,rgba(197,165,90,0.5),transparent)' }}
          />
        </motion.div>

        {/* ── CIRCLES ROW ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : 'clamp(1rem,4vw,3rem)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
          position: 'relative',
        }}>

          {/* Glow backdrop behind circles */}
          <div style={{
            position: 'absolute', inset: '-40px',
            background: 'radial-gradient(ellipse 70% 80% at 50% 50%,rgba(197,165,90,0.05) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />

          {LEVELS.map((lvl, i) => {
            const basePx = [220, 175, 145][i];
            const sz = `clamp(${Math.round(basePx * 0.62)}px,${Math.round(basePx * 0.19)}vw,${basePx}px)`;
            const isMain = i === 0;

            return (
              <div key={lvl.name} style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1rem' : 'clamp(0.8rem,2.5vw,2rem)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>

                  {/* Circle wrapper */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.55, y: 20 }}
                    animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.45 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'relative', width: sz, height: sz, flexShrink: 0 }}
                  >
                    {/* Pulse rings */}
                    {visible && <>
                      <PulseRing delay={i * 0.9} color={lvl.ring1} scale={isMain ? 1.8 : 1.6} />
                      <PulseRing delay={1.4 + i * 0.9} color={lvl.ring2} scale={isMain ? 1.5 : 1.4} />
                    </>}

                    {/* Outer glow halo (NEO only) */}
                    {isMain && (
                      <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute', inset: '-20px', borderRadius: '50%',
                          background: `radial-gradient(circle,${lvl.glowWide} 0%,transparent 70%)`,
                          filter: 'blur(12px)', pointerEvents: 'none',
                        }}
                      />
                    )}

                    {/* Orbital rings */}
                    <OrbitalRing radius={isMain ? 20 : 13} duration={isMain ? 7 : 11} color={lvl.color} opacity={isMain ? 0.4 : 0.22} dashes />
                    <OrbitalRing radius={isMain ? 32 : 22} duration={isMain ? 13 : 17} color={lvl.ring1} opacity={0.6} ccw />

                    {/* Orbit dots */}
                    {visible && <>
                      <OrbitDot radius={isMain ? 20 : 13} duration={isMain ? 7 : 11} delay={i * 1.5} color={lvl.color} size={isMain ? 6 : 4} />
                      <OrbitDot radius={isMain ? 32 : 22} duration={isMain ? 13 : 17} delay={i * 0.8 + 0.5} color={lvl.colorLight} size={isMain ? 3.5 : 2.5} />
                    </>}

                    {/* Main circle */}
                    <motion.div
                      whileHover={{ scale: 1.04, boxShadow: `0 0 80px ${lvl.glow}, 0 0 140px ${lvl.glowWide}` }}
                      style={{
                        position: 'relative', zIndex: 1,
                        width: '100%', height: '100%', borderRadius: '50%',
                        background: isMain
                          ? 'radial-gradient(circle at 35% 30%,#223660 0%,#0f2040 45%,#071525 100%)'
                          : 'radial-gradient(circle at 35% 30%,#172535 0%,#0c1a2a 50%,#070f1a 100%)',
                        border: isMain ? `2px solid rgba(197,165,90,0.85)` : `1px solid ${lvl.color}55`,
                        boxShadow: isMain
                          ? `0 0 60px ${lvl.glow}, 0 0 120px ${lvl.glowWide}, inset 0 1px 0 rgba(197,165,90,0.15), inset 0 -1px 0 rgba(197,165,90,0.05)`
                          : `0 0 30px ${lvl.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        gap: '4px', cursor: 'default',
                        transition: 'box-shadow 0.4s, transform 0.3s',
                      }}
                    >
                      {/* Days badge — top */}
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
                        fontSize: `clamp(${(0.48 * lvl.size).toFixed(2)}rem,${(0.65 * lvl.size).toFixed(1)}vw,${(0.62 * lvl.size).toFixed(2)}rem)`,
                        color: `${lvl.color}99`, letterSpacing: '0.18em',
                        textTransform: 'uppercase', marginBottom: '2px',
                      }}>{lvl.days}</span>

                      {/* Name */}
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                        fontSize: `clamp(${(1.7 * lvl.size).toFixed(1)}rem,${(3.8 * lvl.size).toFixed(1)}vw,${(2.8 * lvl.size).toFixed(1)}rem)`,
                        letterSpacing: '0.06em',
                        background: `linear-gradient(140deg,${lvl.colorLight} 0%,${lvl.color} 60%)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        filter: `drop-shadow(0 0 14px ${lvl.glow})`,
                        lineHeight: 1,
                      }}>{lvl.name}</span>

                      {/* Sub */}
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
                        fontSize: `clamp(${(0.6 * lvl.size).toFixed(2)}rem,${(0.95 * lvl.size).toFixed(1)}vw,${(0.85 * lvl.size).toFixed(2)}rem)`,
                        color: 'rgba(200,215,235,0.82)', letterSpacing: '0.03em',
                      }}>{lvl.sub}</span>

                      {/* SCADIQ */}
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                        fontSize: `clamp(${(0.48 * lvl.size).toFixed(2)}rem,${(0.65 * lvl.size).toFixed(1)}vw,${(0.62 * lvl.size).toFixed(2)}rem)`,
                        color: `${lvl.color}70`, letterSpacing: '0.22em', marginTop: '3px',
                      }}>{lvl.scadiq}</span>
                    </motion.div>
                  </motion.div>

                  {/* Tagline below circle */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
                    style={{ textAlign: 'center' }}
                  >
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
                      fontSize: 'clamp(0.7rem,1vw,0.82rem)',
                      color: `${lvl.color}88`, letterSpacing: '0.06em',
                    }}>{lvl.tagline}</span>
                  </motion.div>
                </div>

                {/* Flow connector */}
                {i < LEVELS.length - 1 && (
                  <div style={isMobile ? { transform: 'rotate(90deg)' } : undefined}>
                    <FlowConnector visible={visible} delay={0.7 + i * 0.15} />
                  </div>
                )}
              </div>
            );
          })}
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
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.82rem,1.1vw,0.9rem)', lineHeight: 1.75, color: capa.gold ? 'rgba(220,200,150,0.72)' : 'rgba(175,192,215,0.65)', whiteSpace: 'pre-line' }}>
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
