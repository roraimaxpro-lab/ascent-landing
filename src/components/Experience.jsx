import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Unique geometric SVG marks per block ─────────────────────────── */
const GeoMark = ({ id, hovered }) => {
  const gold = hovered ? '#E8CC88' : 'rgba(197,165,90,0.55)';
  const glow = hovered ? '0 0 12px rgba(197,165,90,0.9)' : 'none';

  const marks = {
    '01': ( /* Energy waveform */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <path d="M4 27 L12 10 L20 44 L28 16 L36 38 L44 22 L50 27" stroke={gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="27" r="2" fill={gold} />
        <circle cx="50" cy="27" r="2" fill={gold} />
        <line x1="0" y1="27" x2="54" y2="27" stroke={gold} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
      </svg>
    ),
    '02': ( /* Orbit rings */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <circle cx="27" cy="27" r="20" stroke={gold} strokeWidth="1.2" />
        <ellipse cx="27" cy="27" rx="20" ry="7" stroke={gold} strokeWidth="1.2" />
        <ellipse cx="27" cy="27" rx="7" ry="20" stroke={gold} strokeWidth="1.2" />
        <circle cx="27" cy="27" r="2.5" fill={gold} />
        <circle cx="47" cy="27" r="2" fill={gold} />
      </svg>
    ),
    '03': ( /* Precision crosshair */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <circle cx="27" cy="27" r="18" stroke={gold} strokeWidth="1.2" />
        <circle cx="27" cy="27" r="9" stroke={gold} strokeWidth="1.2" />
        <circle cx="27" cy="27" r="2.5" fill={gold} />
        <line x1="27" y1="4" x2="27" y2="14" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="27" y1="40" x2="27" y2="50" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="27" x2="14" y2="27" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="27" x2="50" y2="27" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="19" x2="22" y2="22" stroke={gold} strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="19" x2="32" y2="22" stroke={gold} strokeWidth="1" opacity="0.5" />
        <line x1="19" y1="35" x2="22" y2="32" stroke={gold} strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="35" x2="32" y2="32" stroke={gold} strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    '04': ( /* Compass rose */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <circle cx="27" cy="27" r="20" stroke={gold} strokeWidth="1" opacity="0.4" />
        <polygon points="27,7 30,24 27,27 24,24" fill={gold} opacity="0.9" />
        <polygon points="27,47 30,30 27,27 24,30" fill={gold} opacity="0.4" />
        <polygon points="7,27 24,24 27,27 24,30" fill={gold} opacity="0.4" />
        <polygon points="47,27 30,24 27,27 30,30" fill={gold} opacity="0.65" />
        <circle cx="27" cy="27" r="3" stroke={gold} strokeWidth="1.2" fill="none" />
        <line x1="27" y1="4" x2="27" y2="7" stroke={gold} strokeWidth="2" strokeLinecap="round" />
        <text x="27" y="3" textAnchor="middle" fill={gold} fontSize="5" fontFamily="monospace">N</text>
      </svg>
    ),
    '05': ( /* Network nodes */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <circle cx="27" cy="27" r="5" fill={gold} />
        <circle cx="10" cy="14" r="3.5" stroke={gold} strokeWidth="1.2" fill="none" />
        <circle cx="44" cy="14" r="3.5" stroke={gold} strokeWidth="1.2" fill="none" />
        <circle cx="10" cy="40" r="3.5" stroke={gold} strokeWidth="1.2" fill="none" />
        <circle cx="44" cy="40" r="3.5" stroke={gold} strokeWidth="1.2" fill="none" />
        <circle cx="27" cy="8" r="3" stroke={gold} strokeWidth="1.2" fill="none" opacity="0.6" />
        <line x1="27" y1="22" x2="13" y2="17" stroke={gold} strokeWidth="1" opacity="0.7" />
        <line x1="27" y1="22" x2="41" y2="17" stroke={gold} strokeWidth="1" opacity="0.7" />
        <line x1="27" y1="32" x2="13" y2="37" stroke={gold} strokeWidth="1" opacity="0.7" />
        <line x1="27" y1="32" x2="41" y2="37" stroke={gold} strokeWidth="1" opacity="0.7" />
        <line x1="27" y1="22" x2="27" y2="11" stroke={gold} strokeWidth="1" opacity="0.5" />
        <line x1="13" y1="17" x2="13" y2="37" stroke={gold} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.4" />
        <line x1="41" y1="17" x2="41" y2="37" stroke={gold} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.4" />
      </svg>
    ),
    '06': ( /* Mountain terrain */
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" style={{ filter: hovered ? 'drop-shadow(0 0 6px rgba(197,165,90,0.8))' : 'none', transition: 'filter 0.4s' }}>
        <polyline points="3,42 16,22 27,10 38,22 51,42" stroke={gold} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points="3,42 12,32 20,36 27,26 34,36 42,32 51,42" stroke={gold} strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round" opacity="0.4" />
        <line x1="3" y1="42" x2="51" y2="42" stroke={gold} strokeWidth="1" opacity="0.35" />
        <polyline points="22,10 27,5 32,10" stroke={gold} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" opacity="0.7" />
        <circle cx="27" cy="10" r="1.5" fill={gold} />
      </svg>
    ),
  };

  return marks[id] || null;
};

const blocks = [
  {
    num: '01',
    title: 'Entrenamiento de Alto Nivel',
    tag: 'Trabajo real',
    desc: 'No es un panel de expertos hablando de sus casos de éxito. Es trabajo real sobre tu negocio, tu modelo y tu forma de decidir.',
  },
  {
    num: '02',
    title: 'Dinámicas Vivenciales',
    tag: 'Aprendizaje activo',
    desc: 'Las ideas más importantes no se aprenden con diapositivas, se aprenden cuando las vives. Las dinámicas de ASCENT te ponen en situaciones donde tus patrones emergen y donde puedes reescribirlos con estructura.',
  },
  {
    num: '03',
    title: 'Retos de Ejecución',
    tag: 'Tu negocio',
    desc: 'Cada participante trabaja sus propios retos de negocio, no los de un caso de estudio genérico. Lo que ocurre en la sala tiene que conectar con lo que ocurre fuera de ella.',
  },
  {
    num: '04',
    title: 'Reflexión Estratégica',
    tag: 'Decisiones concretas',
    desc: 'Momentos deliberados para integrar lo aprendido, tomar decisiones concretas y definir los siguientes pasos con claridad real, no con intenciones vagas.',
  },
  {
    num: '05',
    title: 'Networking con Propósito',
    tag: 'Conexiones que producen',
    desc: 'El networking en ASCENT no ocurre solo en el break, está integrado en la experiencia. Saldrás con conexiones reales, conversaciones de alto valor y relaciones con potencial de producir resultados concretos.',
  },
  {
    num: '06',
    title: 'Entorno Presencial Deliberado',
    tag: 'Sin escapatoria',
    desc: 'No es el contenido lo que cambia el nivel. Es estar en un espacio diseñado para que no puedas esquivar lo importante. Sin distracciones de tu día a día. Sin la comodidad que te mantiene donde estás.',
  },
];

function Card({ block, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered
          ? 'linear-gradient(145deg, rgba(197,165,90,0.09) 0%, rgba(10,18,34,0.98) 100%)'
          : 'rgba(255,255,255,0.025)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(197,165,90,0.5)' : 'rgba(197,165,90,0.09)',
        borderRadius: '8px',
        padding: 'clamp(1.8rem,2.8vw,2.5rem) clamp(1.4rem,2.2vw,2rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'background 0.45s ease, border-color 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease',
        boxShadow: hovered
          ? '0 28px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,165,90,0.07), 0 0 60px rgba(197,165,90,0.08)'
          : '0 2px 24px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Ghost watermark number */}
      <div style={{
        position: 'absolute', bottom: '-18px', right: '8px',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(5rem,8vw,7rem)', lineHeight: 1,
        color: hovered ? 'rgba(197,165,90,0.07)' : 'rgba(197,165,90,0.03)',
        letterSpacing: '-0.06em',
        pointerEvents: 'none', userSelect: 'none',
        transition: 'color 0.5s',
      }}>{block.num}</div>

      {/* Top-left diagonal accent bar (reveals on hover) */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.3), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Scan shimmer on hover */}
      <motion.div
        animate={hovered ? { x: ['-120%', '300%'] } : { x: '-120%' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: 0, bottom: 0, width: '30%',
          background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.06), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Geo mark ── */}
      <div style={{
        marginBottom: '1.4rem',
        position: 'relative', zIndex: 1,
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        <GeoMark id={block.num} hovered={hovered} />
      </div>

      {/* Number + divider row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '0.85rem', position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '0.6rem',
          letterSpacing: '0.3em', fontWeight: 700, textTransform: 'uppercase',
          color: hovered ? '#C5A55A' : 'rgba(197,165,90,0.38)',
          textShadow: hovered ? '0 0 12px rgba(197,165,90,0.7)' : 'none',
          transition: 'color 0.35s, text-shadow 0.35s',
        }}>{block.num}</span>
        <motion.div
          animate={{ width: hovered ? '40px' : '18px', opacity: hovered ? 0.85 : 0.3 }}
          transition={{ duration: 0.4 }}
          style={{ height: '1px', background: '#C5A55A',
            boxShadow: hovered ? '0 0 5px rgba(197,165,90,0.7)' : 'none' }}
        />
        <span style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '0.55rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: hovered ? 'rgba(197,165,90,0.7)' : 'rgba(197,165,90,0.22)',
          transition: 'color 0.35s',
        }}>{block.tag}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
        fontSize: 'clamp(0.95rem,1.45vw,1.15rem)', letterSpacing: '-0.025em',
        color: hovered ? '#FFFFFF' : 'rgba(210,225,248,0.82)',
        lineHeight: 1.25, marginBottom: '0.75rem',
        transition: 'color 0.35s',
        position: 'relative', zIndex: 1,
      }}>{block.title}</h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
        fontSize: 'clamp(0.78rem,1.05vw,0.85rem)', lineHeight: 1.85,
        color: hovered ? 'rgba(148,165,192,0.92)' : 'rgba(138,154,181,0.42)',
        margin: 0,
        transition: 'color 0.45s',
        position: 'relative', zIndex: 1,
      }}>{block.desc}</p>

      {/* Bottom read-line — technical detail */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(197,165,90,0.4) 30%, rgba(197,165,90,0.4) 70%, transparent)'
          : 'transparent',
        transition: 'background 0.4s',
      }} />
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });

  return (
    <section id="experiencia" ref={ref} style={{
      background: '#070F1A',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.065) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        width: '75%', height: '55%',
        background: 'radial-gradient(ellipse at center, rgba(197,165,90,0.045) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.4) 30%, rgba(197,165,90,0.4) 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem,7vw,5.5rem)' }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '1.6rem' }}
          >
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '40px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.55 }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
              letterSpacing: '0.26em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              La experiencia
            </span>
            <motion.div initial={{ width: 0 }} animate={visible ? { width: '40px' } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: '1px', background: '#C5A55A', opacity: 0.55 }} />
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(2.2rem,5.5vw,4.4rem)', color: '#FFFFFF',
                letterSpacing: '-0.03em', lineHeight: 1.05,
                margin: '0 0 0.12em',
              }}
            >
              Diseñado con propósito.{' '}
              <span style={{
                fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
                background: 'linear-gradient(135deg,#e8cc88,#C5A55A,#f0d888)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Bloque a bloque.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: 'clamp(0.9rem,1.4vw,1rem)', lineHeight: 1.75,
              color: 'rgba(138,154,181,0.68)', maxWidth: '460px', margin: '1rem auto 0',
            }}
          >
            No hay improvisación en ASCENT. Cada dinámica, cada espacio,
            cada conversación tiene una función dentro de un proceso mayor.
          </motion.p>
        </div>

        {/* ── CARD GRID ── */}
        <div className="exp-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px,1.5vw,20px)',
        }}>
          {blocks.map((block, i) => (
            <Card key={block.num} block={block} index={i} visible={visible} />
          ))}
        </div>

        {/* ── COMMUNITY CALLOUT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.85 }}
          style={{
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            background: 'linear-gradient(135deg, rgba(197,165,90,0.1) 0%, rgba(197,165,90,0.04) 60%, transparent 100%)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(197,165,90,0.28)',
            borderRadius: '8px',
            overflow: 'hidden', position: 'relative',
            boxShadow: '0 0 70px rgba(197,165,90,0.07), 0 16px 60px rgba(0,0,0,0.45)',
          }}
        >
          <div style={{ height: '2px', background: 'linear-gradient(90deg,#C5A55A,rgba(197,165,90,0.3),transparent)' }} />

          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{
              position: 'absolute', top: '-60%', left: '5%', right: '5%', bottom: '-60%',
              background: 'radial-gradient(ellipse at center, rgba(197,165,90,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            animate={{ x: ['-100%', '280%'] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: 0, bottom: 0, width: '20%',
              background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.05), transparent)',
              pointerEvents: 'none',
            }}
          />

          <div style={{
            padding: 'clamp(2rem,4vw,3rem)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'clamp(1.5rem,3vw,2rem)',
            position: 'relative', zIndex: 1,
          }} className="community-inner">
            {/* Left: text + button */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.7rem' }}>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: '#C5A55A', boxShadow: '0 0 10px rgba(197,165,90,1), 0 0 20px rgba(197,165,90,0.5)' }}
                />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
                  letterSpacing: '0.22em', color: '#C5A55A', textTransform: 'uppercase', opacity: 0.8 }}>
                  Incluido en la experiencia
                </span>
              </div>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#FFFFFF',
                marginBottom: '0.8rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Comunidad ASCENT
              </h3>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.9rem,1.3vw,0.97rem)', color: '#8A9AB5', lineHeight: 1.75,
                maxWidth: '520px', margin: '0 0 1.8rem' }}>
                ASCENT no termina cuando termina el entrenamiento. Entras a una comunidad con
                los mismos estándares que la sala — personas serias, con metas reales,
                que no vienen a dar like sino a avanzar.
              </p>
              <motion.a
                href="#aplicar"
                whileHover={{ scale: 1.03, boxShadow: '0 0 60px rgba(197,165,90,0.85), 0 8px 30px rgba(0,0,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#0B1624', textDecoration: 'none',
                  background: 'linear-gradient(135deg, #D4BA7A 0%, #C5A55A 50%, #E8CC88 100%)',
                  padding: '16px 36px', borderRadius: '4px', whiteSpace: 'nowrap',
                  boxShadow: '0 0 35px rgba(197,165,90,0.5), 0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                Quiero entrar
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2l4 4-4 4M2 6h8" stroke="#0B1624" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </div>

            {/* Right: neon-traced SVG icon */}
            <div style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              position: 'relative',
            }}>
              {/* ambient gold halo behind SVG */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '160px', height: '160px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(197,165,90,0.35) 0%, rgba(197,165,90,0.1) 45%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <svg className="community-svg" width="150" height="150" viewBox="0 0 80 80" fill="none"
                  style={{ overflow: 'visible' }}>
                  <defs>
                    <filter id="neon-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="1.8" result="blur1" />
                      <feGaussianBlur stdDeviation="4" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="neon-glow-soft" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ── solid visible base paths (always on) ── */}
                  <circle cx="40" cy="26" r="12" stroke="rgba(197,165,90,0.35)" strokeWidth="2" fill="none" />
                  <path d="M16 70c0-13.25 10.75-24 24-24s24 10.75 24 24" stroke="rgba(197,165,90,0.35)" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="17" cy="29" r="8" stroke="rgba(197,165,90,0.25)" strokeWidth="1.6" fill="none" />
                  <path d="M3 70c0-9.94 6.27-18 14-18" stroke="rgba(197,165,90,0.25)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <circle cx="63" cy="29" r="8" stroke="rgba(197,165,90,0.25)" strokeWidth="1.6" fill="none" />
                  <path d="M77 70c0-9.94-6.27-18-14-18" stroke="rgba(197,165,90,0.25)" strokeWidth="1.6" strokeLinecap="round" fill="none" />

                  {/* ── bright neon traveling light — center head ── */}
                  <circle cx="40" cy="26" r="12"
                    stroke="#FFE98A" strokeWidth="3" fill="none"
                    strokeDasharray="22 56" strokeLinecap="round"
                    className="neon-trace-1" style={{ filter: 'url(#neon-glow-strong)' }} />
                  {/* ── bright neon traveling light — center body ── */}
                  <path d="M16 70c0-13.25 10.75-24 24-24s24 10.75 24 24"
                    stroke="#FFE98A" strokeWidth="3" strokeLinecap="round" fill="none"
                    strokeDasharray="28 85" className="neon-trace-2" style={{ filter: 'url(#neon-glow-strong)' }} />
                  {/* ── bright neon traveling light — left head ── */}
                  <circle cx="17" cy="29" r="8"
                    stroke="#E8CC88" strokeWidth="2.5" fill="none"
                    strokeDasharray="14 38" strokeLinecap="round"
                    className="neon-trace-3" style={{ filter: 'url(#neon-glow-soft)' }} />
                  {/* ── bright neon traveling light — left body ── */}
                  <path d="M3 70c0-9.94 6.27-18 14-18"
                    stroke="#E8CC88" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    strokeDasharray="12 30" className="neon-trace-4" style={{ filter: 'url(#neon-glow-soft)' }} />
                  {/* ── bright neon traveling light — right head ── */}
                  <circle cx="63" cy="29" r="8"
                    stroke="#E8CC88" strokeWidth="2.5" fill="none"
                    strokeDasharray="14 38" strokeLinecap="round"
                    className="neon-trace-5" style={{ filter: 'url(#neon-glow-soft)' }} />
                  {/* ── bright neon traveling light — right body ── */}
                  <path d="M77 70c0-9.94-6.27-18-14-18"
                    stroke="#E8CC88" strokeWidth="2.5" strokeLinecap="round" fill="none"
                    strokeDasharray="12 30" className="neon-trace-6" style={{ filter: 'url(#neon-glow-soft)' }} />

                  {/* center glowing dot */}
                  <circle cx="40" cy="26" r="3.5" fill="#FFE98A" style={{ filter: 'url(#neon-glow-strong)' }} />
                  <circle cx="40" cy="26" r="1.8" fill="#FFFFFF" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.25) 30%, rgba(197,165,90,0.25) 70%, transparent)',
      }} />

      <style>{`
        @keyframes neon-dash-1 { from { stroke-dashoffset: 78; } to { stroke-dashoffset: -78; } }
        @keyframes neon-dash-2 { from { stroke-dashoffset: 113; } to { stroke-dashoffset: -113; } }
        @keyframes neon-dash-3 { from { stroke-dashoffset: 52; } to { stroke-dashoffset: -52; } }
        @keyframes neon-dash-4 { from { stroke-dashoffset: 42; } to { stroke-dashoffset: -42; } }
        @keyframes neon-dash-5 { from { stroke-dashoffset: 52; } to { stroke-dashoffset: -52; } }
        @keyframes neon-dash-6 { from { stroke-dashoffset: 42; } to { stroke-dashoffset: -42; } }

        .neon-trace-1 { animation: neon-dash-1 1.8s linear infinite; }
        .neon-trace-2 { animation: neon-dash-2 2.2s linear infinite 0.3s; }
        .neon-trace-3 { animation: neon-dash-3 1.6s linear infinite 0.6s; }
        .neon-trace-4 { animation: neon-dash-4 1.4s linear infinite 0.9s; }
        .neon-trace-5 { animation: neon-dash-5 1.6s linear infinite 1.1s; }
        .neon-trace-6 { animation: neon-dash-6 1.4s linear infinite 1.3s; }

        @media (max-width: 900px) {
          #experiencia .exp-cards { grid-template-columns: repeat(2, 1fr) !important; }
          .community-svg { width: 110px !important; height: 110px !important; }
        }
        @media (max-width: 540px) {
          #experiencia .exp-cards { grid-template-columns: 1fr !important; }
          #experiencia .community-inner { flex-direction: row !important; align-items: center !important; }
          .community-svg { width: 100px !important; height: 100px !important; }
        }
      `}</style>
    </section>
  );
}
