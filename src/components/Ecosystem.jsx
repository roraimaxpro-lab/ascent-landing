import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NEO = {
  id: 'neo', name: 'NEO', sub: 'Despertar', scadiq: 'S + C', days: '2 días',
  color: '#C5A55A', colorLight: '#f8ebb0', rgb: '197,165,90',
  badge: 'EXPERIENCIA ASCENT',
  headline: ['Claridad,', 'dirección', 'y activación real.'],
  body: 'NEO es una experiencia diseñada para ayudarte a leer con más precisión la realidad actual de tu negocio, afinar tu dirección y fortalecer tu oferta, tu pitch y tus conexiones estratégicas. A través del método SCADIQ, construyes una base más sólida para decidir y moverte con mayor intención.',
  bullets: [
    'Scan: identificas con precisión lo que hoy frena tu crecimiento.',
    'Comprehend: entiendes la raíz del problema, no solo los síntomas.',
    'Dirección más firme y oferta más clara para el mercado.',
    'Conexiones estratégicas reales desde el primer día.',
  ],
  note: 'NEO es una experiencia completa. Diseñada para producir claridad real, conexiones estratégicas y un punto de partida más sólido para tu negocio.',
};

/* ── Circle node ── */
function CircleNode({ visible }) {
  const lvl = NEO;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sz = isMobile ? 200 : 300;
  const rings = isMobile
    ? [{ r: 18, dur: 10, dash: true, ccw: false }, { r: 30, dur: 18, dash: false, ccw: true }]
    : [{ r: 24, dur: 7,  dash: true, ccw: false }, { r: 40, dur: 13, dash: false, ccw: true  }, { r: 58, dur: 22, dash: true, ccw: false }];
  const dotData = isMobile
    ? []
    : [{ r: 24, dur: 7, sz: 7, d: 0 }, { r: 40, dur: 13, sz: 4.5, d: 1.5 }, { r: 58, dur: 22, sz: 3, d: 3 }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ position: 'relative', width: sz, height: sz, flexShrink: 0 }}>

        {/* Active burst pulses — desktop only, contained within outer ring */}
        {!isMobile && [0, 0.7, 1.4].map((delay, i) => (
          <motion.div key={i}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.3 + i * 0.08, opacity: 0 }}
            transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `1px solid rgba(${lvl.rgb},0.4)`, pointerEvents: 'none',
            }}
          />
        ))}

        {/* Wide ambient glow — static on mobile, animated on desktop */}
        {isMobile ? (
          <div style={{
            position: 'absolute', inset: `-${sz * 0.18}px`, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${lvl.rgb},0.3) 0%, transparent 65%)`,
            pointerEvents: 'none',
          }} />
        ) : (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: `-${sz * 0.22}px`, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${lvl.rgb},0.38) 0%, transparent 65%)`,
              filter: 'blur(20px)', pointerEvents: 'none',
            }}
          />
        )}

        {/* Rings — CSS animation on mobile for better perf */}
        {rings.map((r, i) => (
          isMobile ? (
            <div key={i} className={`neo-ring neo-ring-${r.ccw ? 'ccw' : 'cw'}`} style={{
              position: 'absolute', inset: `-${r.r}px`, borderRadius: '50%',
              border: `1px ${r.dash ? 'dashed' : 'solid'} rgba(${lvl.rgb},${i === 0 ? 0.5 : 0.25})`,
              willChange: 'transform', pointerEvents: 'none',
              animation: `${r.ccw ? 'neo-spin-ccw' : 'neo-spin-cw'} ${r.dur}s linear infinite`,
            }} />
          ) : (
            <motion.div key={i}
              animate={{ rotate: r.ccw ? -360 : 360 }}
              transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: `-${r.r}px`, borderRadius: '50%',
                border: `1px ${r.dash ? 'dashed' : 'solid'} rgba(${lvl.rgb},${i === 0 ? 0.65 : i === 1 ? 0.35 : 0.18})`,
                willChange: 'transform', pointerEvents: 'none',
              }}
            />
          )
        ))}

        {/* Orbiting dots — desktop only */}
        {visible && dotData.map((d, i) => (
          <motion.div key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: d.dur, delay: d.d, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: `-${d.r}px`, borderRadius: '50%', willChange: 'transform', pointerEvents: 'none' }}
          >
            <div style={{
              position: 'absolute', top: '50%', left: 0,
              width: d.sz, height: d.sz, borderRadius: '50%', background: lvl.color,
              transform: 'translateY(-50%)',
              boxShadow: `0 0 ${d.sz * 3}px ${lvl.color}, 0 0 ${d.sz * 7}px rgba(${lvl.rgb},0.45)`,
            }} />
          </motion.div>
        ))}

        {/* Core circle */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `radial-gradient(circle at 38% 32%, rgba(${lvl.rgb},0.3) 0%, #07101e 60%)`,
            border: `2.5px solid rgba(${lvl.rgb},0.95)`,
            boxShadow: isMobile
              ? `0 0 0 2px rgba(${lvl.rgb},0.85), 0 0 25px rgba(${lvl.rgb},0.4)`
              : `0 0 0 2px rgba(${lvl.rgb},0.9), 0 0 30px rgba(${lvl.rgb},0.7), 0 0 80px rgba(${lvl.rgb},0.5), 0 0 160px rgba(${lvl.rgb},0.25)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 7,
          }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: isMobile ? '2rem' : '2.8rem', letterSpacing: '0.08em', lineHeight: 1,
            background: `linear-gradient(140deg,#fff8e8 0%,${lvl.colorLight} 30%,${lvl.color} 70%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            color: 'transparent',
            filter: isMobile ? 'none' : `drop-shadow(0 0 24px rgba(${lvl.rgb},1))`,
            textShadow: isMobile ? `0 0 18px rgba(${lvl.rgb},0.8)` : 'none',
          }}>{lvl.name}</span>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '0.78rem', letterSpacing: '0.22em',
            color: `rgba(${lvl.rgb},1)`,
            textShadow: `0 0 14px rgba(${lvl.rgb},0.8)`,
          }}>{lvl.scadiq}</span>
        </div>
      </div>

      {/* Label below circle */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '1rem',
          color: '#FFFFFF', textShadow: `0 0 20px rgba(${lvl.rgb},0.5)`,
        }}>{lvl.sub}</div>
        <div style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: '0.66rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3,
          color: lvl.color, textShadow: `0 0 14px rgba(${lvl.rgb},0.7)`,
        }}>{lvl.days}</div>
      </div>
    </div>
  );
}

/* ── Content reveal ── */
function ContentReveal() {
  const lvl = NEO;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Flash burst on entry */}
      <motion.div
        initial={{ opacity: 0.8, scaleX: 0 }}
        animate={inView ? { opacity: 0, scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(${lvl.rgb},0.18), transparent)`,
          pointerEvents: 'none', transformOrigin: 'left', zIndex: 10,
        }}
      />

      {/* Connector beam from above */}
      <motion.div
        initial={{ scaleY: 0, opacity: 1 }}
        animate={inView ? { scaleY: 1, opacity: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '2px', height: '60px',
          background: `linear-gradient(180deg,rgba(${lvl.rgb},0.9),transparent)`,
          boxShadow: `0 0 12px rgba(${lvl.rgb},0.7)`,
          transformOrigin: 'top', zIndex: 9,
        }}
      />

      {/* Top glow line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 0.6 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '1px', marginBottom: 'clamp(2rem,4vw,3rem)',
          background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},0.8) 30%,rgba(${lvl.rgb},0.8) 70%,transparent)`,
          boxShadow: `0 0 16px rgba(${lvl.rgb},0.6)`,
          transformOrigin: 'center',
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 20px',
          background: `rgba(${lvl.rgb},0.12)`,
          border: `1px solid rgba(${lvl.rgb},0.6)`,
          borderRadius: '2px',
          boxShadow: `0 0 24px rgba(${lvl.rgb},0.25), inset 0 0 20px rgba(${lvl.rgb},0.05)`,
        }}>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: lvl.color, boxShadow: `0 0 10px ${lvl.color}` }}
          />
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: '9.5px', letterSpacing: '0.42em', color: lvl.colorLight, textTransform: 'uppercase',
          }}>
            {lvl.badge}
          </span>
        </div>
      </motion.div>

      {/* Headline — word by word */}
      <div style={{ textAlign: 'center', marginBottom: '1.6rem', lineHeight: 1.05 }}>
        {lvl.headline.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 60, rotateX: -40, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.65, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(2rem,4.5vw,4rem)', letterSpacing: '-0.035em',
              display: 'block',
              background: i === 0
                ? `linear-gradient(140deg,#ffffff,#ffffff)`
                : i === 1
                ? `linear-gradient(140deg,#ffffff 0%,${lvl.colorLight} 60%,${lvl.color} 100%)`
                : `linear-gradient(140deg,${lvl.colorLight},${lvl.color})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: i === 2 ? `drop-shadow(0 0 20px rgba(${lvl.rgb},0.7))` : 'none',
            }}
          >{word}</motion.div>
        ))}
      </div>

      {/* Animated divider with light sweep */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative', height: '1px', maxWidth: '600px', margin: '0 auto 1.8rem',
          background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},0.7) 30%,rgba(${lvl.rgb},0.7) 70%,transparent)`,
          transformOrigin: 'center', overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={inView ? { x: '250%' } : {}}
          transition={{ duration: 1, delay: 1.0, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '-2px', width: '25%',
            background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},1),white,rgba(${lvl.rgb},1),transparent)`,
            boxShadow: `0 0 20px rgba(${lvl.rgb},1)`,
          }}
        />
      </motion.div>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.65, delay: 0.6 }}
        style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
          fontSize: 'clamp(0.95rem,1.4vw,1.05rem)', lineHeight: 1.9,
          color: '#FFFFFF', textAlign: 'center',
          margin: '0 auto 2rem', maxWidth: '680px',
        }}
      >{lvl.body}</motion.p>

      {/* Bullets — staggered fly-in */}
      <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto 2rem' }}>
        {lvl.bullets.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.12, type: 'spring', stiffness: 300 }}
              style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 8,
                background: `linear-gradient(135deg,${lvl.colorLight},${lvl.color})`,
                boxShadow: `0 0 10px rgba(${lvl.rgb},0.8), 0 0 20px rgba(${lvl.rgb},0.4)`,
              }}
            />
            <span style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
              fontSize: 'clamp(0.9rem,1.2vw,0.97rem)', color: '#FFFFFF', lineHeight: 1.75,
            }}>{b}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '620px', margin: '0 auto',
          padding: '1.1rem 1.8rem',
          background: `linear-gradient(135deg,rgba(${lvl.rgb},0.08) 0%,rgba(4,10,20,0.9) 100%)`,
          border: `1px solid rgba(${lvl.rgb},0.3)`,
          borderLeft: `3px solid ${lvl.color}`,
          borderRight: `3px solid rgba(${lvl.rgb},0.3)`,
          borderRadius: '3px',
          boxShadow: `0 0 40px rgba(${lvl.rgb},0.1), inset 0 0 30px rgba(${lvl.rgb},0.04)`,
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
          fontSize: 'clamp(0.88rem,1.2vw,1rem)', lineHeight: 1.85,
          color: '#FFFFFF', margin: 0,
        }}>{lvl.note}</p>
      </motion.div>

      {/* Bottom glow line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 0.4 } : {}}
        transition={{ duration: 0.9, delay: 1.3 }}
        style={{
          height: '1px', marginTop: 'clamp(2rem,4vw,3rem)',
          background: `linear-gradient(90deg,transparent,rgba(${lvl.rgb},0.6) 30%,rgba(${lvl.rgb},0.6) 70%,transparent)`,
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}

/* ── Main ── */
export default function Ecosystem() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.04 });
  const lvl = NEO;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section ref={ref} style={{ background: '#040A14', position: 'relative', overflow: 'hidden', padding: 'clamp(4rem,8vw,7rem) 1.5rem' }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.06) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%,black,transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%,black,transparent)',
      }} />

      {/* Atmosphere — static on mobile, animated on desktop */}
      {isMobile ? (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '180vw', height: '75vh',
          background: `radial-gradient(ellipse,rgba(${lvl.rgb},0.10) 0%,transparent 50%)`,
          pointerEvents: 'none',
        }} />
      ) : (
        <>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '180vw', height: '75vh',
              background: `radial-gradient(ellipse,rgba(${lvl.rgb},0.13) 0%,transparent 50%)`,
              filter: 'blur(80px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '180vw', height: '75vh',
              background: `radial-gradient(ellipse,rgba(${lvl.rgb},0.06) 0%,transparent 50%)`,
              filter: 'blur(60px)', pointerEvents: 'none',
            }}
          />
        </>
      )}

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.55) 30%,rgba(197,165,90,0.55) 70%,transparent)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.4rem' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,transparent,#C5A55A)', transformOrigin: 'right' }}
            />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: '0.42em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
              La Experiencia
            </span>
            <motion.div
              initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ height: 1, width: 70, background: 'linear-gradient(90deg,#C5A55A,transparent)', transformOrigin: 'left' }}
            />
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,2.8vw,2rem)', color: '#C5A55A', marginBottom: '0.15rem', textShadow: '0 0 40px rgba(197,165,90,0.4)' }}>
            El Ecosistema
          </div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem,10vw,8.5rem)', letterSpacing: '-0.045em', lineHeight: 0.87, color: '#FFFFFF' }}>
            ASCENT
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 'clamp(0.95rem,1.5vw,1.08rem)', lineHeight: 1.75, color: '#FFFFFF', margin: '1.6rem auto 0', maxWidth: '480px' }}
          >
            Una experiencia diseñada bajo el método{' '}
            <span style={{ color: '#C5A55A', fontWeight: 700, textShadow: '0 0 16px rgba(197,165,90,0.5)' }}>SCADIQ.</span>
          </motion.p>
        </motion.div>

        {/* SINGLE NEO CIRCLE — centered */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(3rem,5vw,5rem) 0', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={visible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CircleNode visible={visible} />
          </motion.div>
        </div>

        {/* CONTENT — cinematic reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ paddingTop: 'clamp(1rem,2vw,1.5rem)' }}
        >
          <ContentReveal />
        </motion.div>

        {/* SECTION TITLE — 3 Capas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: 'clamp(3rem,5vw,5rem)', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: '0.8rem' }}>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.5))' }} />
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C5A55A', textTransform: 'uppercase' }}>
              3 Capas · 1 Ecosistema
            </span>
            <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg,rgba(197,165,90,0.5),transparent)' }} />
          </div>
          <p style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: 'clamp(0.88rem,1.2vw,0.95rem)', color: '#FFFFFF',
            margin: 0, maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6,
          }}>
            NEO es solo el inicio. Lo que sigue multiplica todo lo que construyes aquí.
          </p>
        </motion.div>

        {/* ECOSYSTEM LAYERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="capas-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 0,
            border: '1px solid rgba(197,165,90,0.18)',
            borderRadius: 10, overflow: 'hidden',
          }}
        >
          {[
            { num: '1', name: 'Bootcamp Vivencial', items: 'NEO — 2 Días Intensivos', sub: 'Tu punto de partida.', color: '#C5A55A', rgb: '197,165,90' },
            { num: '2', name: 'Private Business Network', items: 'Pods · Eventos · Métricas', sub: 'Creces con los que ya están adentro.', color: '#8AAFD4', rgb: '138,175,212' },
            { num: '3', name: 'Opportunity Platform', items: 'Deals · Alianzas · Capital', sub: 'Donde el ecosistema trabaja para ti.', color: '#D4BA7A', rgb: '212,186,122' },
          ].map((capa, i) => (
            <div key={i} style={{
              padding: 'clamp(1.6rem,3vw,2.4rem)',
              background: `linear-gradient(160deg,rgba(${capa.rgb},0.08) 0%,rgba(4,10,20,0.98) 100%)`,
              borderRight: i < 2 ? '1px solid rgba(197,165,90,0.12)' : 'none',
              position: 'relative',
            }}>
              {/* Top color bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${capa.color}, rgba(${capa.rgb},0.15))`,
              }} />

              {/* Number badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                border: `1.5px solid rgba(${capa.rgb},0.5)`,
                background: `rgba(${capa.rgb},0.08)`,
                marginBottom: '1rem',
              }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.7rem', color: capa.color }}>
                  {capa.num}
                </span>
              </div>

              {/* Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.8rem' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.28em', color: capa.color, textTransform: 'uppercase' }}>
                  Capa {capa.num}
                </span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,rgba(${capa.rgb},0.4),transparent)` }} />
              </div>

              {/* Title */}
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(1.05rem,1.6vw,1.2rem)', color: '#FFFFFF', marginBottom: 8, lineHeight: 1.25 }}>{capa.name}</div>

              {/* Items */}
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 'clamp(0.95rem,1.3vw,1.05rem)', color: '#FFFFFF', lineHeight: 1.7, marginBottom: 14 }}>{capa.items}</div>

              {/* Subtitle */}
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.95rem,1.3vw,1.05rem)', color: '#FFFFFF', lineHeight: 1.5,
              }}>{capa.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />

      <style>{`
        @keyframes neo-spin-cw { to { transform: rotate(360deg); } }
        @keyframes neo-spin-ccw { to { transform: rotate(-360deg); } }
        @media (max-width: 768px) {
          .capas-grid {
            grid-template-columns: 1fr !important;
          }
          .capas-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(197,165,90,0.1);
          }
          .capas-grid > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
