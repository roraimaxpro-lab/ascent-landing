import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function OrbitalRing({ radius, duration, color, opacity, dashes, ccw }) {
  return (
    <motion.div
      animate={{ rotate: ccw ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', inset: `-${radius}px`, borderRadius: '50%',
        border: `1px ${dashes ? 'dashed' : 'solid'} ${color}`,
        opacity, pointerEvents: 'none',
      }}
    />
  );
}

function PulseRing({ delay, color, scale = 1.7 }) {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale, opacity: 0 }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeOut' }}
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
        width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: color,
        transform: 'translateY(-50%)',
        boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 7}px ${color}55`,
      }} />
    </motion.div>
  );
}

export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 860);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 860);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const bullets = [
    'Claridad sobre lo que hoy frena tu crecimiento.',
    'Dirección más firme para tomar decisiones.',
    'Fortalecimiento de oferta, pitch y relaciones estratégicas.',
    'Activación real, no solo inspiración.',
  ];

  const nextSteps = [
    { name: 'NEO', sub: 'Despertar', desc: 'Claridad, dirección y activación.', color: '#C5A55A', colorLight: '#f0d888', scadiq: 'S + C', days: '2 días' },
    { name: 'MID', sub: 'Construir', desc: 'Estructura, decisiones y crecimiento con más orden.', color: '#8AAFD4', colorLight: '#b8d4f0', scadiq: 'A + D', days: '2 días' },
    { name: 'PRO', sub: 'Escalar', desc: 'Liderazgo, expansión y oportunidades dentro del ecosistema.', color: '#D4BA7A', colorLight: '#f0dfa0', scadiq: 'I + Q', days: '3 días' },
  ];

  return (
    <section ref={ref} style={{
      background: '#060D18',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(4rem,8vw,7rem) 1.5rem',
    }}>

      {/* Deep atmosphere layers */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(197,165,90,0.018) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '140vw', height: '80vh',
        background: 'radial-gradient(ellipse,rgba(197,165,90,0.1) 0%,transparent 55%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '15%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle,rgba(197,165,90,0.06) 0%,transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5) 30%,rgba(197,165,90,0.5) 70%,transparent)',
      }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,6rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.6rem' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }}
            />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '0.38em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              Arquitectura del Sistema
            </span>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }}
            />
          </div>

          {/* Giant title */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#C5A55A',
              letterSpacing: '0.06em', marginBottom: '0.15rem',
              textShadow: '0 0 40px rgba(197,165,90,0.4)',
            }}>El Ecosistema</div>
            <div style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(3.5rem,10vw,8rem)', letterSpacing: '-0.04em', lineHeight: 0.88,
              color: '#FFFFFF',
              textShadow: '0 0 80px rgba(197,165,90,0.15)',
            }}>ASCENT</div>
            {/* Glow under title */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '1px',
              background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.6),transparent)',
            }} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
              fontSize: 'clamp(1rem,1.8vw,1.2rem)', lineHeight: 1.7,
              color: '#FFFFFF', margin: '2.2rem auto 0', maxWidth: '560px',
            }}
          >
            Todo comienza en NEO.{' '}
            <span style={{
              color: '#C5A55A', fontWeight: 700,
              textShadow: '0 0 20px rgba(197,165,90,0.5)',
            }}>
              Una experiencia diseñada para darte claridad, dirección y activación real dentro de tu negocio.
            </span>
          </motion.p>
        </motion.div>

        {/* ── NEO HERO BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '380px 1fr',
            gap: 'clamp(2rem,4vw,5rem)',
            alignItems: 'center',
            background: 'linear-gradient(135deg,rgba(197,165,90,0.09) 0%,rgba(7,13,24,0.97) 55%,rgba(5,10,20,1) 100%)',
            border: '1px solid rgba(197,165,90,0.4)',
            borderRadius: '12px',
            padding: isMobile ? '2.5rem 1.5rem' : 'clamp(2.5rem,5vw,4.5rem)',
            boxShadow: '0 0 0 1px rgba(197,165,90,0.06), 0 30px 100px rgba(0,0,0,0.7), 0 0 120px rgba(197,165,90,0.08)',
            marginBottom: 'clamp(3.5rem,6vw,6rem)',
            overflow: 'hidden',
          }}
        >
          {/* Corner accent top-left */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '120px', height: '120px',
            background: 'radial-gradient(circle at 0% 0%,rgba(197,165,90,0.18) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Corner accent bottom-right */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px',
            background: 'radial-gradient(circle at 100% 100%,rgba(197,165,90,0.06) 0%,transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* Gold top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg,rgba(197,165,90,0.1),#C5A55A 25%,#E8CC88 50%,#C5A55A 75%,rgba(197,165,90,0.1))',
            boxShadow: '0 0 30px rgba(197,165,90,0.6)',
          }} />

          {/* Left: Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              style={{
                padding: '7px 20px',
                border: '1px solid rgba(197,165,90,0.7)',
                borderRadius: '2px',
                background: 'rgba(197,165,90,0.14)',
                boxShadow: '0 0 20px rgba(197,165,90,0.2)',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: '9.5px', letterSpacing: '0.42em', color: '#E8CC88',
                textTransform: 'uppercase',
              }}
            >Puerta de entrada</motion.div>

            {/* Giant orbital */}
            <div style={{ position: 'relative', width: '220px', height: '220px', flexShrink: 0 }}>
              {visible && <>
                <PulseRing delay={0} color="rgba(197,165,90,0.3)" scale={1.9} />
                <PulseRing delay={1.6} color="rgba(197,165,90,0.15)" scale={1.6} />
                <PulseRing delay={3.2} color="rgba(197,165,90,0.08)" scale={2.1} />
              </>}

              {/* Wide ambient glow */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: '-40px', borderRadius: '50%',
                  background: 'radial-gradient(circle,rgba(197,165,90,0.25) 0%,transparent 65%)',
                  filter: 'blur(20px)', pointerEvents: 'none',
                }}
              />

              <OrbitalRing radius={20} duration={6} color="rgba(197,165,90,0.5)" opacity={1} dashes />
              <OrbitalRing radius={34} duration={11} color="rgba(197,165,90,0.25)" opacity={1} ccw />
              <OrbitalRing radius={48} duration={18} color="rgba(197,165,90,0.1)" opacity={1} />

              {visible && <>
                <OrbitDot radius={20} duration={6} delay={0} color="#C5A55A" size={6} />
                <OrbitDot radius={34} duration={11} delay={1} color="#f0d888" size={4} />
                <OrbitDot radius={48} duration={18} delay={2} color="rgba(197,165,90,0.7)" size={3} />
              </>}

              {/* Core circle */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'radial-gradient(circle at 38% 32%,#1c3560 0%,#0d1e3a 40%,#060e1c 100%)',
                border: '2.5px solid rgba(197,165,90,0.9)',
                boxShadow: '0 0 0 1px rgba(197,165,90,0.15), 0 0 60px rgba(197,165,90,0.55), 0 0 140px rgba(197,165,90,0.22), inset 0 1px 0 rgba(197,165,90,0.2), inset 0 0 40px rgba(197,165,90,0.05)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: '2.5rem', letterSpacing: '0.08em',
                  background: 'linear-gradient(140deg,#fff8e8 0%,#f0d888 35%,#C5A55A 70%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(197,165,90,0.8))',
                  lineHeight: 1,
                }}>NEO</span>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
                  fontSize: '0.55rem', color: 'rgba(197,165,90,0.75)', letterSpacing: '0.28em',
                }}>S + C</span>
              </div>
            </div>

            {/* Days + type badges */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[{ label: '2 días', accent: true }, { label: '100% Presencial', accent: false }].map((b, i) => (
                <div key={i} style={{
                  padding: '6px 14px',
                  background: b.accent ? 'rgba(197,165,90,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${b.accent ? 'rgba(197,165,90,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '2px',
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9px',
                  letterSpacing: '0.22em', color: b.accent ? '#C5A55A' : '#FFFFFF',
                  textTransform: 'uppercase', fontWeight: 700,
                }}>{b.label}</div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Big title */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(2.5rem,4.5vw,4rem)', letterSpacing: '-0.04em', lineHeight: 0.9,
                color: '#FFFFFF',
                textShadow: '0 0 60px rgba(197,165,90,0.1)',
              }}>Despertar</div>
              <motion.div
                initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  marginTop: '10px', width: '80px', height: '2px',
                  background: 'linear-gradient(90deg,#C5A55A,rgba(197,165,90,0.2))',
                  transformOrigin: 'left',
                  boxShadow: '0 0 12px rgba(197,165,90,0.5)',
                }}
              />
            </div>

            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: 'clamp(0.92rem,1.3vw,1rem)', lineHeight: 1.85,
              color: '#FFFFFF', margin: '0 0 1.8rem',
            }}>
              NEO es una experiencia completa en sí misma. Aquí confrontas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones.
            </p>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <motion.div
                    animate={{ boxShadow: ['0 0 6px rgba(197,165,90,0.5)', '0 0 18px rgba(197,165,90,0.9)', '0 0 6px rgba(197,165,90,0.5)'] }}
                    transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity }}
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, marginTop: '7px',
                      background: 'linear-gradient(135deg,#f0d888,#C5A55A)',
                    }}
                  />
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
                    fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', color: '#FFFFFF', lineHeight: 1.65,
                  }}>{b}</span>
                </motion.div>
              ))}
            </div>

            {/* Italic closing */}
            <div style={{
              padding: '1rem 0',
              borderTop: '1px solid rgba(197,165,90,0.15)',
              borderBottom: '1px solid rgba(197,165,90,0.15)',
              marginBottom: '1.4rem',
            }}>
              <p style={{
                fontFamily: "'Playfair Display',serif", fontWeight: 500, fontStyle: 'italic',
                fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.65,
                color: '#C5A55A', margin: 0,
                textShadow: '0 0 30px rgba(197,165,90,0.35)',
              }}>
                Sales con más claridad, más enfoque y una visión más sólida de tu siguiente etapa.
              </p>
            </div>

            {/* Callout note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              padding: '1rem 1.2rem',
              background: 'rgba(197,165,90,0.05)',
              border: '1px solid rgba(197,165,90,0.2)',
              borderLeft: '3px solid #C5A55A',
              borderRadius: '3px',
              boxShadow: 'inset 0 0 30px rgba(197,165,90,0.03)',
            }}>
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0,
                background: '#C5A55A', marginTop: '7px',
                boxShadow: '0 0 8px rgba(197,165,90,0.8)',
              }} />
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.8rem,1.1vw,0.87rem)', lineHeight: 1.8,
                color: '#FFFFFF', margin: 0,
              }}>
                NEO es una experiencia completa. Las etapas posteriores existen únicamente para quienes, después de vivirla, decidan seguir creciendo dentro del ecosistema.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── LO QUE SIGUE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginBottom: 'clamp(1.8rem,3vw,2.8rem)', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.2rem' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ height: '1px', flex: 1, maxWidth: '140px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.45))', transformOrigin: 'right' }}
            />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '10px', letterSpacing: '0.38em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap' }}>
              Lo que sigue dentro del ecosistema
            </span>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ height: '1px', flex: 1, maxWidth: '140px', background: 'linear-gradient(90deg,rgba(197,165,90,0.45),transparent)', transformOrigin: 'left' }}
            />
          </div>
          <p style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
            fontSize: 'clamp(0.88rem,1.2vw,0.95rem)', lineHeight: 1.75,
            color: '#FFFFFF', margin: '0 auto', maxWidth: '580px',
          }}>
            ASCENT está diseñado como un recorrido de evolución empresarial. Todo comienza en NEO, y para quienes decidan continuar, existen etapas posteriores de construcción y expansión.
          </p>
        </motion.div>

        {/* ── PROGRESSION CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: 'clamp(0.8rem,1.5vw,1.2rem)',
        }}>
          {nextSteps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.65 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                padding: 'clamp(1.3rem,2vw,1.8rem)',
                background: i === 0
                  ? 'linear-gradient(135deg,rgba(197,165,90,0.12) 0%,rgba(7,13,24,0.95) 100%)'
                  : 'rgba(8,14,24,0.9)',
                border: `1px solid ${i === 0 ? 'rgba(197,165,90,0.4)' : 'rgba(197,165,90,0.12)'}`,
                borderRadius: '8px',
                display: 'flex', flexDirection: 'column', gap: '0.8rem',
                boxShadow: i === 0 ? '0 0 40px rgba(197,165,90,0.08)' : 'none',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg,transparent,${step.color}${i === 0 ? 'CC' : '55'},transparent)`,
                boxShadow: i === 0 ? `0 0 12px ${step.color}66` : 'none',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: '1.25rem', letterSpacing: '0.06em',
                  background: `linear-gradient(140deg,${step.colorLight} 0%,${step.color} 60%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: `drop-shadow(0 0 8px ${step.color}88)`,
                }}>{step.name}</span>
                <div style={{ width: '1px', height: '16px', background: `${step.color}40` }} />
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                  fontSize: '0.78rem', color: '#FFFFFF', letterSpacing: '0.02em',
                }}>{step.sub}</span>
              </div>

              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: '0.9rem', lineHeight: 1.7,
                color: '#FFFFFF', margin: 0,
              }}>{step.desc}</p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '5px 12px',
                background: `${step.color}0E`,
                border: `1px solid ${step.color}25`,
                borderRadius: '2px', alignSelf: 'flex-start',
              }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8px', letterSpacing: '0.24em', color: step.color, textTransform: 'uppercase', fontWeight: 700 }}>{step.days}</span>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: `${step.color}50` }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8px', letterSpacing: '0.18em', color: `${step.color}99`, fontWeight: 700 }}>{step.scadiq}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />
    </section>
  );
}
