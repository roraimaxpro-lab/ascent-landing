import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Orbital sub-components ── */
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

/* ── Main Export ── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
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
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: '1100px', height: '700px',
        background: 'radial-gradient(ellipse,rgba(197,165,90,0.08) 0%,transparent 65%)',
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
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4.5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '1.2rem' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5))' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', letterSpacing: '0.28em', color: '#C5A55A', textTransform: 'uppercase' }}>
              Arquitectura del Sistema
            </span>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg,rgba(197,165,90,0.5),transparent)' }} />
          </div>

          <div style={{ lineHeight: 1, marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#C5A55A', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
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

          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: '#FFFFFF', margin: '0 auto', lineHeight: 1.65, maxWidth: '580px' }}>
            Todo comienza en NEO.{' '}
            <span style={{ color: '#C5A55A', fontWeight: 600 }}>Una experiencia diseñada para darte claridad, dirección y activación real dentro de tu negocio.</span>
          </p>
        </motion.div>

        {/* ── NEO FEATURED BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
            gap: 'clamp(2rem,4vw,4rem)',
            alignItems: 'center',
            background: 'linear-gradient(135deg,rgba(197,165,90,0.07) 0%,rgba(9,16,28,0.9) 60%)',
            border: '1px solid rgba(197,165,90,0.35)',
            borderRadius: '10px',
            padding: 'clamp(2rem,4vw,3.5rem)',
            boxShadow: '0 0 80px rgba(197,165,90,0.1), 0 20px 80px rgba(0,0,0,0.5)',
            marginBottom: 'clamp(3rem,5vw,5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top gold bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg,transparent,#C5A55A 30%,#E8CC88 50%,#C5A55A 70%,transparent)',
            boxShadow: '0 0 20px rgba(197,165,90,0.5)',
          }} />

          {/* Left: NEO Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>

            {/* PUERTA DE ENTRADA badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                padding: '5px 16px',
                border: '1px solid rgba(197,165,90,0.6)',
                borderRadius: '2px',
                background: 'rgba(197,165,90,0.12)',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                fontSize: '9px', letterSpacing: '0.35em', color: '#E8CC88',
                textTransform: 'uppercase',
              }}
            >Puerta de entrada</motion.div>

            {/* NEO Orbital circle */}
            <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
              {visible && <>
                <PulseRing delay={0} color="rgba(197,165,90,0.22)" scale={1.85} />
                <PulseRing delay={1.4} color="rgba(197,165,90,0.1)" scale={1.55} />
              </>}

              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: '-24px', borderRadius: '50%',
                  background: 'radial-gradient(circle,rgba(197,165,90,0.2) 0%,transparent 70%)',
                  filter: 'blur(14px)', pointerEvents: 'none',
                }}
              />

              <OrbitalRing radius={18} duration={7} color="rgba(197,165,90,0.4)" opacity={1} dashes />
              <OrbitalRing radius={28} duration={13} color="rgba(197,165,90,0.2)" opacity={0.8} ccw />

              {visible && <>
                <OrbitDot radius={18} duration={7} delay={0} color="#C5A55A" size={5} />
                <OrbitDot radius={28} duration={13} delay={0.8} color="#f0d888" size={3} />
              </>}

              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%,#223660 0%,#0f2040 45%,#071525 100%)',
                border: '2px solid rgba(197,165,90,0.85)',
                boxShadow: '0 0 60px rgba(197,165,90,0.5), 0 0 120px rgba(197,165,90,0.2), inset 0 1px 0 rgba(197,165,90,0.15)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '4px',
              }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: '2rem', letterSpacing: '0.06em',
                  background: 'linear-gradient(140deg,#f0d888 0%,#C5A55A 60%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 14px rgba(197,165,90,0.6))',
                  lineHeight: 1,
                }}>NEO</span>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
                  fontSize: '0.52rem', color: 'rgba(197,165,90,0.7)', letterSpacing: '0.22em',
                }}>S + C</span>
              </div>
            </div>

            {/* Days badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px',
              background: 'rgba(197,165,90,0.1)',
              border: '1px solid rgba(197,165,90,0.3)',
              borderRadius: '2px',
            }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '0.22em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>2 días</span>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(197,165,90,0.4)' }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(197,165,90,0.7)', fontWeight: 700 }}>Vivencial</span>
            </div>
          </div>

          {/* Right: NEO Content */}
          <div>
            <div style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem,3vw,2.8rem)', letterSpacing: '-0.03em', lineHeight: 0.95,
              color: '#FFFFFF', marginBottom: '0.3rem',
            }}>Despertar</div>
            <div style={{
              width: '50px', height: '2px',
              background: 'linear-gradient(90deg,#C5A55A,transparent)',
              marginBottom: '1.5rem',
            }} />

            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: 'clamp(0.92rem,1.3vw,1rem)', lineHeight: 1.8,
              color: '#FFFFFF', margin: '0 0 1.4rem',
            }}>
              NEO es una experiencia completa en sí misma. Aquí confrontas la realidad actual de tu negocio, aclaras tu dirección y fortaleces tu oferta, tu pitch y tus conexiones.
            </p>

            {/* Bullet points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                >
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '6px',
                    background: '#C5A55A',
                    boxShadow: '0 0 8px rgba(197,165,90,0.7)',
                  }} />
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
                    fontSize: 'clamp(0.88rem,1.2vw,0.95rem)', color: '#FFFFFF', lineHeight: 1.6,
                  }}>{b}</span>
                </motion.div>
              ))}
            </div>

            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
              fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', lineHeight: 1.75,
              color: '#C5A55A',
              margin: '0 0 1.2rem',
              fontStyle: 'italic',
            }}>
              Sales con más claridad, más enfoque y una visión más sólida de tu siguiente etapa.
            </p>

            <div style={{
              padding: '1rem 1.2rem',
              background: 'rgba(197,165,90,0.06)',
              border: '1px solid rgba(197,165,90,0.18)',
              borderLeft: '3px solid rgba(197,165,90,0.6)',
              borderRadius: '3px',
            }}>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.8rem,1.1vw,0.87rem)', lineHeight: 1.75,
                color: '#FFFFFF', margin: 0,
              }}>
                NEO es una experiencia completa. Las etapas posteriores existen únicamente para quienes, después de vivirla, decidan seguir creciendo dentro del ecosistema.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── LO QUE SIGUE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginBottom: 'clamp(2rem,3vw,2.5rem)', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '1rem' }}>
            <div style={{ height: '1px', flex: 1, maxWidth: '120px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.35))' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px', letterSpacing: '0.32em', color: 'rgba(197,165,90,0.7)', textTransform: 'uppercase', fontWeight: 700 }}>
              Lo que sigue dentro del ecosistema
            </span>
            <div style={{ height: '1px', flex: 1, maxWidth: '120px', background: 'linear-gradient(90deg,rgba(197,165,90,0.35),transparent)' }} />
          </div>
          <p style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
            fontSize: 'clamp(0.88rem,1.2vw,0.95rem)', lineHeight: 1.7,
            color: '#FFFFFF', margin: '0 auto', maxWidth: '560px',
          }}>
            ASCENT está diseñado como un recorrido de evolución empresarial. Todo comienza en NEO, y para quienes decidan continuar, existen etapas posteriores de construcción y expansión.
          </p>
        </motion.div>

        {/* ── PROGRESSION CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: 'clamp(0.8rem,1.5vw,1.2rem)',
          marginBottom: 'clamp(2.5rem,5vw,4rem)',
        }}>
          {nextSteps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.62 + i * 0.12 }}
              style={{
                padding: 'clamp(1.2rem,2vw,1.6rem)',
                background: i === 0
                  ? 'linear-gradient(135deg,rgba(197,165,90,0.1) 0%,rgba(9,16,28,0.95) 100%)'
                  : 'rgba(9,16,28,0.85)',
                border: `1px solid ${i === 0 ? 'rgba(197,165,90,0.35)' : 'rgba(197,165,90,0.12)'}`,
                borderRadius: '6px',
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: '1.1rem', letterSpacing: '0.06em',
                  background: `linear-gradient(140deg,${step.colorLight} 0%,${step.color} 60%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: `drop-shadow(0 0 6px ${step.color}88)`,
                }}>{step.name}</span>
                <div style={{ width: '1px', height: '14px', background: `${step.color}40` }} />
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                  fontSize: '0.72rem', color: '#FFFFFF',
                }}>{step.sub}</span>
              </div>
              <p style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: '0.87rem', lineHeight: 1.65,
                color: '#FFFFFF', margin: 0,
              }}>{step.desc}</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '4px 12px',
                background: `${step.color}10`,
                border: `1px solid ${step.color}22`,
                borderRadius: '2px', alignSelf: 'flex-start',
              }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8px', letterSpacing: '0.22em', color: step.color, textTransform: 'uppercase', fontWeight: 700 }}>{step.days}</span>
                <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: `${step.color}50` }} />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8px', letterSpacing: '0.18em', color: `${step.color}88`, fontWeight: 700 }}>{step.scadiq}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.22) 30%,rgba(197,165,90,0.22) 70%,transparent)' }} />
    </section>
  );
}
