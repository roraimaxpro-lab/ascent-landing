import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const outcomes = [
  { num: '01', label: 'Claridad estratégica', desc: 'Sabes exactamente en qué estás, qué sigue y por qué. Sin ruido. Sin adivinar.' },
  { num: '02', label: 'Mejor toma de decisiones', desc: 'Tu proceso para decidir es más estructurado, más rápido y más confiable.' },
  { num: '03', label: 'Expansión de perspectiva', desc: 'Viste tu negocio y tu liderazgo desde ángulos que no habías considerado.' },
  { num: '04', label: 'Red de alto valor', desc: 'Tienes al menos 5 conexiones reales con potencial de impactar tu negocio directamente.' },
  { num: '05', label: 'Plan de ejecución concreto', desc: 'No una lista de propósitos. Un plan con nombre, fecha y responsable.' },
  { num: '06', label: 'Identidad de liderazgo más afilada', desc: 'Sabes qué tipo de líder eres, qué tienes que fortalecer y cómo operar en el siguiente nivel.' },
  { num: '07', label: 'Estándares más altos', desc: 'Una vez que operas en un entorno de alta exigencia, no quieres volver a estándares menores.' },
];

const TICKER = '✦ ASCENT NEO  ✦ 2 DÍAS DE INTENSIDAD  ✦ SALA LIMITADA  ✦ TRABAJO REAL  ✦ 7 ENTREGABLES CONCRETOS  ✦ SIN ESPECTADORES  ✦ RESULTADOS DOCUMENTADOS  ✦ EDICIÓN 2025  ✦ ASCENT NEO  ✦ 2 DÍAS DE INTENSIDAD  ✦ SALA LIMITADA  ✦ TRABAJO REAL  ✦ 7 ENTREGABLES CONCRETOS  ✦ SIN ESPECTADORES  ✦';

function OutcomeRow({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.2 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'clamp(52px,5vw,72px) 1px 1fr auto',
        gap: `0 clamp(1.5rem,2.5vw,2.8rem)`,
        alignItems: 'center',
        padding: `clamp(1.4rem,2.5vw,2rem) clamp(1rem,2vw,1.8rem)`,
        borderBottom: '1px solid rgba(197,165,90,0.07)',
        cursor: 'default',
        background: hovered ? 'rgba(197,165,90,0.04)' : 'transparent',
        transition: 'background 0.35s ease',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
          background: 'linear-gradient(to bottom, #C5A55A, rgba(197,165,90,0.1))',
          transformOrigin: 'top',
        }}
      />

      {/* Sweep highlight */}
      {hovered && (
        <motion.div
          initial={{ x: '-100%' }} animate={{ x: '300%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.04), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Number */}
      <div style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
        fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1,
        color: hovered ? '#C5A55A' : 'rgba(197,165,90,0.18)',
        transition: 'color 0.4s ease',
        textShadow: hovered ? '0 0 24px rgba(197,165,90,0.6)' : 'none',
      }}>{item.num}</div>

      {/* Vertical separator */}
      <div style={{
        alignSelf: 'stretch', minHeight: '48px',
        background: hovered ? 'rgba(197,165,90,0.55)' : 'rgba(197,165,90,0.1)',
        transition: 'background 0.35s',
      }} />

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.35rem' }}>
          <h3 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.05rem,2vw,1.45rem)', letterSpacing: '-0.025em',
            color: hovered ? '#FFFFFF' : 'rgba(220,232,250,0.88)',
            margin: 0, lineHeight: 1.2,
            transition: 'color 0.3s',
          }}>{item.label}</h3>
        </div>
        <p style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
          fontSize: 'clamp(0.85rem,1.2vw,0.93rem)', lineHeight: 1.72,
          color: hovered ? 'rgba(138,154,181,0.95)' : 'rgba(138,154,181,0.5)',
          margin: 0, maxWidth: '600px',
          transition: 'color 0.4s',
        }}>{item.desc}</p>
      </div>

      {/* Verified badge */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0.3,
          scale: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: `1.5px solid rgba(197,165,90,${hovered ? 0.85 : 0.25})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'rgba(197,165,90,0.14)' : 'transparent',
          boxShadow: hovered ? '0 0 16px rgba(197,165,90,0.45)' : 'none',
          transition: 'all 0.3s',
        }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1.5 5L4.5 8L10.5 1.5"
              stroke={hovered ? '#C5A55A' : 'rgba(197,165,90,0.4)'}
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '0.48rem',
          letterSpacing: '0.12em', color: `rgba(197,165,90,${hovered ? 0.75 : 0.25})`,
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          transition: 'color 0.3s',
        }}>verificado</span>
      </motion.div>
    </motion.div>
  );
}

export default function Transformation() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });

  return (
    <section ref={ref} style={{
      background: '#0B1624',
      position: 'relative', overflow: 'hidden',
      padding: '0 0 clamp(5rem,10vw,9rem)',
    }}>

      {/* ── RUNNING TICKER ── */}
      <div style={{
        background: '#C5A55A',
        overflow: 'hidden',
        height: '36px',
        display: 'flex', alignItems: 'center',
        marginBottom: 'clamp(4rem,8vw,7rem)',
      }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'flex', alignItems: 'center',
            whiteSpace: 'nowrap',
            gap: '0',
          }}
        >
          {[TICKER, TICKER].map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
              fontSize: '11px', letterSpacing: '0.2em',
              color: '#0B1624', textTransform: 'uppercase',
              paddingRight: '0',
            }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Ghost "04" */}
      <div style={{
        position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(14rem,22vw,22rem)', lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.025)',
        pointerEvents: 'none', userSelect: 'none',
      }}>04</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}
          >
            <div style={{ width: '32px', height: '1px', background: '#C5A55A', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px',
              letterSpacing: '0.22em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              Lo que ASCENT produce
            </span>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))',
            gap: '1.5rem 4rem',
            alignItems: 'end',
          }}>
            <div>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                  transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: 'clamp(2rem,4.5vw,3.8rem)', color: '#FFFFFF',
                    letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
                  }}
                >Esto no es lo que</motion.h2>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                  transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: 'clamp(2rem,4.5vw,3.8rem)',
                    letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
                  }}
                >
                  <span style={{
                    background: 'linear-gradient(135deg,#e8cc88,#C5A55A,#f0d888)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>prometemos.</span>
                  <span style={{ color: '#FFFFFF' }}> Es lo que</span>
                </motion.h2>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                  transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 700,
                    fontSize: 'clamp(2rem,4.5vw,3.8rem)', color: '#FFFFFF',
                    letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0,
                  }}
                >documentamos.</motion.h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p style={{
                fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                fontSize: 'clamp(0.95rem,1.5vw,1.08rem)', color: '#8A9AB5',
                lineHeight: 1.78, margin: '0 0 1.2rem',
              }}>
                Prometemos el tipo de experiencia que, si la vives de verdad, cambia cómo creces,
                cómo decides y cómo te mueves en tu negocio.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── TOP SEPARATOR ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: '2px', transformOrigin: 'left',
            background: 'linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.2), transparent)',
            marginBottom: 0,
            boxShadow: '0 0 10px rgba(197,165,90,0.3)',
          }}
        />

        {/* ── OUTCOME ROWS ── */}
        <div>
          {outcomes.map((item, i) => (
            <OutcomeRow key={item.num} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* ── BOTTOM PULL QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
          style={{
            marginTop: 'clamp(3.5rem,7vw,6rem)',
            position: 'relative',
            padding: 'clamp(2.5rem,5vw,4rem)',
            background: 'linear-gradient(135deg, rgba(197,165,90,0.08) 0%, rgba(197,165,90,0.03) 50%, transparent 100%)',
            border: '1px solid rgba(197,165,90,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* Large quotation mark */}
          <div style={{
            position: 'absolute', top: '-10px', left: '24px',
            fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: '12rem', lineHeight: 1,
            color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.08)',
            userSelect: 'none', pointerEvents: 'none',
          }}>"</div>

          {/* Pulsing glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(197,165,90,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
              fontSize: 'clamp(1.2rem,2.5vw,1.9rem)', fontWeight: 600,
              color: '#FFFFFF', lineHeight: 1.45, marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              "Tu red no es solo quiénes conoces.{' '}
              <span style={{
                background: 'linear-gradient(135deg,#e8cc88,#C5A55A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Es quién eres cuando estás con ellos."</span>
            </p>
            <p style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
              fontSize: 'clamp(0.88rem,1.3vw,0.97rem)', color: '#8A9AB5',
              maxWidth: '620px', margin: '0 auto', lineHeight: 1.75,
            }}>
              El entorno que frecuentas define el rango de conversaciones al que tienes acceso, y el rango de conversaciones al que tienes acceso define el tipo de decisiones que puedes tomar. En ASCENT vas a estar en una sala con fundadores, líderes y emprendedores que tienen metas reales y el hambre de alcanzarlas. No hay espectadores pasivos, todos traen algo con qué trabajar.
            </p>

            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{
                width: '60px', height: '2px', margin: '1.8rem auto 0',
                background: 'linear-gradient(90deg, transparent, #C5A55A, transparent)',
                transformOrigin: 'center',
                boxShadow: '0 0 8px rgba(197,165,90,0.4)',
              }}
            />
          </div>
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.2) 30%, rgba(197,165,90,0.2) 70%, transparent)',
      }} />
    </section>
  );
}
