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
  const sz = 300;
  const rings = [
    { r: 24, dur: 7,  dash: true,  ccw: false },
    { r: 40, dur: 13, dash: false, ccw: true  },
    { r: 58, dur: 22, dash: true,  ccw: false },
  ];
  const dotData = [
    { r: 24, dur: 7,  sz: 7,   d: 0   },
    { r: 40, dur: 13, sz: 4.5, d: 1.5 },
    { r: 58, dur: 22, sz: 3,   d: 3   },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ position: 'relative', width: sz, height: sz, flexShrink: 0 }}>

        {/* Active burst pulses */}
        {[0, 0.7, 1.4, 2.1].map((delay, i) => (
          <motion.div key={i}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.5 + i * 0.2, opacity: 0 }}
            transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `1px solid rgba(${lvl.rgb},0.55)`, pointerEvents: 'none',
            }}
          />
        ))}

        {/* Wide ambient glow */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: `-${sz * 0.22}px`, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${lvl.rgb},0.38) 0%, transparent 65%)`,
            filter: 'blur(20px)', pointerEvents: 'none',
          }}
        />

        {/* Rings */}
        {rings.map((r, i) => (
          <motion.div key={i}
            animate={{ rotate: r.ccw ? -360 : 360 }}
            transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: `-${r.r}px`, borderRadius: '50%',
              border: `1px ${r.dash ? 'dashed' : 'solid'} rgba(${lvl.rgb},${i === 0 ? 0.65 : i === 1 ? 0.35 : 0.18})`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Orbiting dots */}
        {visible && dotData.map((d, i) => (
          <motion.div key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: d.dur, delay: d.d, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: `-${d.r}px`, borderRadius: '50%', pointerEvents: 'none' }}
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
        <motion.div
          animate={{
            boxShadow: [
              `0 0 0 2px rgba(${lvl.rgb},0.9), 0 0 30px rgba(${lvl.rgb},0.7), 0 0 80px rgba(${lvl.rgb},0.5), 0 0 160px rgba(${lvl.rgb},0.25)`,
              `0 0 0 2px rgba(${lvl.rgb},1), 0 0 50px rgba(${lvl.rgb},0.95), 0 0 120px rgba(${lvl.rgb},0.65), 0 0 240px rgba(${lvl.rgb},0.35)`,
              `0 0 0 2px rgba(${lvl.rgb},0.9), 0 0 30px rgba(${lvl.rgb},0.7), 0 0 80px rgba(${lvl.rgb},0.5), 0 0 160px rgba(${lvl.rgb},0.25)`,
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `radial-gradient(circle at 38% 32%, rgba(${lvl.rgb},0.3) 0%, #07101e 60%)`,
            border: `2.5px solid rgba(${lvl.rgb},0.95)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 7,
          }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: '2.8rem', letterSpacing: '0.08em', lineHeight: 1,
            background: `linear-gradient(140deg,#fff8e8 0%,${lvl.colorLight} 30%,${lvl.color} 70%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            color: 'transparent',
            filter: `drop-shadow(0 0 24px rgba(${lvl.rgb},1))`,
          }}>{lvl.name}</span>
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '0.78rem', letterSpacing: '0.22em',
            color: `rgba(${lvl.rgb},1)`,
            textShadow: `0 0 14px rgba(${lvl.rgb},0.8)`,
          }}>{lvl.scadiq}</span>
        </motion.div>
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

      {/* Atmosphere */}
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

        {/* ECOSYSTEM LAYERS FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{
            marginTop: 'clamp(3rem,5vw,5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            border: '1px solid rgba(197,165,90,0.15)',
            borderRadius: 8, overflow: 'hidden',
          }}
        >
          {[
            { num: '1', name: 'Bootcamp Vivencial', items: 'NEO — 2 Días Intensivos',   color: '#C5A55A', rgb: '197,165,90'  },
            { num: '2', name: 'Private Business Network', items: 'Pods · Eventos · Métricas', color: '#8AAFD4', rgb: '138,175,212' },
            { num: '3', name: 'Opportunity Platform',     items: 'Deals · Alianzas · Capital', color: '#D4BA7A', rgb: '212,186,122' },
          ].map((capa, i) => (
            <div key={i} style={{
              padding: 'clamp(1.2rem,2vw,1.7rem)',
              background: i === 2
                ? 'linear-gradient(135deg,rgba(212,186,122,0.07) 0%,rgba(4,10,20,0.98) 100%)'
                : 'rgba(4,10,20,0.98)',
              borderRight: i < 2 ? '1px solid rgba(197,165,90,0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '0.58rem', letterSpacing: '0.3em', color: `rgba(${capa.rgb},0.5)`, textTransform: 'uppercase' }}>
                  Capa {capa.num}
                </span>
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
