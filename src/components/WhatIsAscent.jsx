import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SCADIQ = [
  { letter: 'S', name: 'SCAN',          sub: 'Diagnóstico real',      num: '01',
    detail: 'Identifica con precisión lo que está frenando tu negocio ahora mismo.' },
  { letter: 'C', name: 'COMPREHEND',    sub: 'Comprensión profunda',  num: '02',
    detail: 'Entiende el sistema detrás del problema. Por qué persiste, qué lo sostiene y qué lo alimenta sin que te des cuenta.' },
  { letter: 'A', name: 'ANALYZE · ACT', sub: 'Análisis y acción',     num: '03',
    detail: 'Del diagnóstico a decisiones concretas dentro del mismo bloque, sin postponer y sin análisis infinito.' },
  { letter: 'D', name: 'DECIDE',        sub: 'Decisión estructurada', num: '04',
    detail: 'Decide con claridad y estructura, sin urgencia, sin emoción. La decisión correcta en el momento correcto.' },
  { letter: 'I', name: 'IMPLEMENT',     sub: 'Ejecución real',        num: '05',
    detail: 'Plan con fecha y nombre. Sin excusas de salida, sin compromisos vagos que nunca se ejecutan.' },
  { letter: 'Q', name: 'QUANTUM',       sub: 'Salto de nivel',        num: '06',
    detail: 'La transición de operador a dueño de tu propio ecosistema de negocio. El paso que lo cambia todo.' },
];

const NOT_LIST = [
  { not: 'No es un evento',                  is: 'Es un bootcamp vivencial' },
  { not: 'No es coaching grupal',            is: 'Es un entorno de decisiones reales' },
  { not: 'No es contenido empaquetado',      is: 'Es un sistema con consecuencia' },
  { not: 'No es motivación',                 is: 'Es claridad con plan de ejecución' },
];

/* ══════════════════════════════════════════════════════════════
   VERDICT CARD — NOT → IS
══════════════════════════════════════════════════════════════ */
/* VerdictCard unused — split panel layout used directly */
function VerdictCard() { return null; }

/* ══════════════════════════════════════════════════════════════
   SCADIQ TIMELINE
══════════════════════════════════════════════════════════════ */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

function ScadiqTimeline({ visible }) {
  const [active, setActive] = useState(0);
  const [lineDrawn, setLineDrawn] = useState(false);
  const [pulsePos, setPulsePos] = useState(0);
  const isMobile = useIsMobile();

  // After line draws in, start pulse animation
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setLineDrawn(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!lineDrawn) return;
    let frame;
    let pos = 0;
    const animate = () => {
      pos = (pos + 0.003) % 1;
      setPulsePos(pos);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [lineDrawn]);

  const item = SCADIQ[active];

  const nodeSize = isMobile ? '44px' : 'clamp(52px,7vw,72px)';
  const letterSize = isMobile ? '1.2rem' : 'clamp(1.3rem,2.8vw,1.9rem)';
  const numSize = isMobile ? '9px' : '10px';

  return (
    <div>
      {/* ── PIPELINE ROW ── */}
      <div style={{ position: 'relative', padding: isMobile ? '1.8rem 0 1rem' : '2.5rem 0 1.5rem',
        overflowX: isMobile ? 'auto' : 'visible',
      }}>
        <div style={{ minWidth: isMobile ? '420px' : 'auto', position: 'relative' }}>

        {/* Base line */}
        <div style={{
          position: 'absolute', top: isMobile ? '38px' : '50%',
          left: '4%', right: '4%', height: '2px',
          background: 'rgba(197,165,90,0.12)',
          transform: isMobile ? 'none' : 'translateY(-50%)', zIndex: 0,
        }} />

        {/* Animated neon line */}
        <motion.div
          initial={{ width: 0 }}
          animate={visible ? { width: '92%' } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute', top: isMobile ? '38px' : '50%', left: '4%',
            height: '2px',
            background: 'linear-gradient(90deg, #C5A55A, #f0d888, #C5A55A)',
            transform: isMobile ? 'none' : 'translateY(-50%)',
            boxShadow: '0 0 6px #C5A55A, 0 0 16px rgba(197,165,90,0.55), 0 0 32px rgba(197,165,90,0.25)',
            zIndex: 1,
          }}
        />

        {/* Traveling pulse dot */}
        {lineDrawn && (
          <div style={{
            position: 'absolute', top: isMobile ? '38px' : '50%',
            left: `calc(4% + ${pulsePos * 92}%)`,
            transform: isMobile ? 'translateX(-50%)' : 'translate(-50%, -50%)',
            zIndex: 3, width: '10px', height: '10px', borderRadius: '50%',
            background: '#fff8e0',
            boxShadow: '0 0 8px #C5A55A, 0 0 20px rgba(197,165,90,0.9), 0 0 40px rgba(197,165,90,0.4)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Nodes */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          position: 'relative', zIndex: 2, padding: '0 4%',
        }}>
          {SCADIQ.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                onClick={() => setActive(i)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: isMobile ? '6px' : '10px', cursor: 'pointer',
                  flexShrink: 0, width: isMobile ? '60px' : undefined,
                }}
              >
                {/* Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  animate={isActive ? {
                    boxShadow: ['0 0 0 0px rgba(197,165,90,0)','0 0 0 6px rgba(197,165,90,0.2)','0 0 0 12px rgba(197,165,90,0)'],
                  } : { boxShadow: 'none' }}
                  transition={isActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                  style={{
                    width: nodeSize, height: nodeSize, borderRadius: '50%',
                    background: isActive ? 'linear-gradient(135deg,#f0d888,#C5A55A,#d4ba7a)' : 'rgba(9,18,32,0.9)',
                    border: `2px solid ${isActive ? '#f0d888' : 'rgba(197,165,90,0.35)'}`,
                    filter: isActive ? 'drop-shadow(0 0 12px rgba(197,165,90,0.9)) drop-shadow(0 0 28px rgba(197,165,90,0.4))' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.35s, border-color 0.35s, filter 0.35s',
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: letterSize, letterSpacing: '-0.03em',
                    color: isActive ? '#04080E' : '#C5A55A',
                    transition: 'color 0.35s', lineHeight: 1,
                  }}>{s.letter}</span>
                </motion.div>

                {/* Name — hidden on mobile, shown on desktop */}
                {!isMobile && (
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: isActive ? 700 : 400,
                    fontSize: 'clamp(0.58rem,0.9vw,0.7rem)', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? '#FFFFFF' : 'rgba(138,154,181,0.5)',
                    transition: 'color 0.3s',
                    textAlign: 'center', width: '80px', lineHeight: 1.3,
                  }}>{s.name}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        </div>
      </div>

      {/* ── DESCRIPTION PANEL ── */}
      <div style={{
        marginTop: '1rem',
        background: 'rgba(8,16,28,0.97)',
        border: '1px solid rgba(197,165,90,0.18)',
        borderTop: '2px solid #C5A55A',
        borderRadius: '0 0 4px 4px',
        overflow: 'hidden',
        boxShadow: '0 12px 50px rgba(0,0,0,0.55)',
        position: 'relative',
        minHeight: '240px',
      }}>
        {/* Ghost step number */}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: 'clamp(1.6rem,3vw,2.4rem)',
              position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Top line */}
            <div style={{ height:'1px', background:'linear-gradient(90deg,rgba(197,165,90,0.4),transparent)', marginBottom:'0.9rem' }} />

            {/* Name + Letter inline */}
            <div style={{ display:'flex', alignItems:'baseline', gap:'clamp(1rem,3vw,2rem)',
              flexWrap:'wrap', marginBottom:'0.5rem' }}>
              <span style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:900,
                fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'-0.02em',
                color:'#C5A55A',
                textShadow:'0 0 24px rgba(197,165,90,0.55), 0 0 60px rgba(197,165,90,0.25)',
                lineHeight:1, userSelect:'none', flexShrink:0,
              }}>{item.letter}</span>
              <span style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:900,
                fontSize:'clamp(1.3rem,3vw,2.2rem)', letterSpacing:'0.04em',
                color:'#FFFFFF', lineHeight:1.1,
              }}>{item.name}</span>
            </div>

            {/* Subtitle */}
            <div style={{
              fontFamily:"'Playfair Display',serif", fontStyle:'italic',
              fontSize:'clamp(0.92rem,1.5vw,1.1rem)',
              color:'#C5A55A', marginBottom:'0.9rem',
            }}>{item.sub}</div>

            {/* Detail */}
            <p style={{
              fontFamily:"'Montserrat',sans-serif", fontWeight:400,
              fontSize:'clamp(0.88rem,1.35vw,1rem)', lineHeight:1.8,
              color:'rgba(210,222,240,0.78)', margin:'0 0 1.4rem',
              maxWidth:'640px',
            }}>{item.detail}</p>

            {/* Stage dots */}
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              {SCADIQ.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: active === i ? '28px' : '8px', height:'8px', borderRadius:'4px',
                  background: active === i ? '#C5A55A' : 'rgba(197,165,90,0.2)',
                  border:'none', cursor:'pointer',
                  boxShadow: active === i ? '0 0 10px rgba(197,165,90,0.7)' : 'none',
                  transition:'all 0.35s ease', padding:0,
                }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════════════ */
export default function WhatIsAscent() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });

  const titleWords1 = ['ASCENT', 'no', 'es', 'lo', 'que'];
  const titleWords2 = ['estás', 'imaginando'];

  return (
    <section id="que-es" ref={ref} style={{
      background: '#070F1A',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem clamp(5rem,10vw,9rem)',
    }}>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(197,165,90,0.012) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div style={{
        position: 'absolute', right: '-2%', top: '18%',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(14rem,24vw,24rem)', lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.035)',
        pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.06em',
      }}>01</div>

      <div style={{
        position: 'absolute', top: '20%', left: '20%',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(197,165,90,0.05) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      <div style={{ position:'absolute',top:0,left:0,right:0,height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section tag */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={visible?{opacity:1,x:0}:{}} transition={{duration:0.7}}
          style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'2.5rem' }}>
          <div style={{ width:'32px', height:'1px', background:'#C5A55A' }} />
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'15px',
            letterSpacing:'0.22em', color:'#C5A55A', textTransform:'uppercase', opacity:0.9 }}>
            Qué es ASCENT
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom:'clamp(3rem,5vw,5rem)' }}>
          <div style={{ overflow:'hidden', display:'flex', flexWrap:'wrap', gap:'0 0.55em', marginBottom:'0.05em' }}>
            {titleWords1.map((w, i) => (
              <motion.span key={i}
                initial={{ y:'110%', opacity:0 }}
                animate={visible ? { y:0, opacity:1 } : {}}
                transition={{ duration:0.65, delay:0.1+i*0.06, ease:[0.22,1,0.36,1] }}
                style={{
                  display:'inline-block',
                  fontFamily:"'Montserrat',sans-serif", fontWeight:900,
                  fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'0.01em',
                  color:'#FFFFFF', lineHeight:1.1,
                }}>{w}</motion.span>
            ))}
          </div>
          <div style={{ overflow:'hidden', display:'flex', flexWrap:'wrap', gap:'0 0.45em', paddingBottom:'0.18em' }}>
            {titleWords2.map((w, i) => (
              <motion.span key={i}
                initial={{ y:'110%', opacity:0 }}
                animate={visible ? { y:0, opacity:1 } : {}}
                transition={{ duration:0.65, delay:0.42+i*0.07, ease:[0.22,1,0.36,1] }}
                style={{
                  display:'inline-block',
                  fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                  fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'0.01em', lineHeight:1.1,
                  background:'linear-gradient(160deg,#f7e8b0 0%,#c5a55a 45%,#d4ba7a 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  filter:'drop-shadow(0 0 20px rgba(197,165,90,0.3))',
                }}>{w}</motion.span>
            ))}
          </div>
        </div>

        {/* Text block */}
        <div style={{ maxWidth:'700px', marginBottom:'clamp(3rem,6vw,5rem)' }}>
          <motion.p initial={{ opacity:0, y:22 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.35}}
            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:400,
              fontSize:'clamp(0.92rem,1.4vw,1.03rem)', lineHeight:1.9,
              color:'rgba(190,205,225,0.72)', marginBottom:'1.6rem' }}>
            La mayoría de los eventos de negocios y liderazgo se parecen entre sí: conferencias de una jornada, salones con PowerPoint, conversaciones superficiales en el coffee break, y una lista de "takeaways" que nunca terminas de aplicar.
          </motion.p>
          <motion.div initial={{ opacity:0, y:22 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.44}}
            style={{ borderLeft:'3px solid #C5A55A', paddingLeft:'1.3rem', marginBottom:'1.6rem' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:600,
              fontSize:'clamp(1rem,1.7vw,1.16rem)', color:'#FFFFFF', lineHeight:1.7, margin:0 }}>
              Aquí no vienes a acumular ideas.<br />
              Vienes a entender qué está frenando tu negocio, y a decidir qué cambia desde hoy.
            </p>
          </motion.div>
          <motion.p initial={{ opacity:0, y:22 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.52}}
            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:400,
              fontSize:'clamp(0.92rem,1.4vw,1.03rem)', lineHeight:1.9,
              color:'rgba(190,205,225,0.72)' }}>
            Es el entorno que activa el siguiente nivel de quien ya viene construyendo. Cada bloque tiene una función específica dentro de un sistema:{' '}
            <strong style={{ color:'#C5A55A', fontWeight:700 }}>SCADIQ</strong>, el proceso
            que convierte claridad en decisión y decisión en ejecución real.
          </motion.p>
        </div>

        {/* ══ SCADIQ TIMELINE ══ */}
        <motion.div initial={{ opacity:0, y:30 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.5}}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:'1rem', marginBottom:'0.5rem',
            paddingBottom:'1.5rem', borderBottom:'1px solid rgba(197,165,90,0.1)' }}>
            <div>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'15px',
                letterSpacing:'0.22em', color:'#C5A55A', textTransform:'uppercase',
                opacity:0.9, marginBottom:'6px', fontWeight:700 }}>Sistema operativo del entrenamiento</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'16px', flexWrap:'wrap' }}>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900,
                  fontSize:'clamp(2.6rem,6vw,5rem)', letterSpacing:'0.04em',
                  background:'linear-gradient(135deg,#f0d888 0%,#c5a55a 40%,#d4ba7a 75%,#f7e8b0 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  filter:'drop-shadow(0 0 24px rgba(197,165,90,0.4))' }}>SCADIQ</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic',
                  fontSize:'clamp(1.1rem,2vw,1.5rem)', color:'rgba(200,215,230,0.65)' }}>
                  El proceso que lo mueve todo
                </span>
              </div>
            </div>
          </div>

          <ScadiqTimeline visible={visible} />
        </motion.div>

        {/* Bottom quote — Impact block */}
        <motion.div initial={{ opacity:0, y:40 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.9,delay:1.0}}
          style={{ marginTop:'clamp(4rem,8vw,7rem)', position:'relative', overflow:'hidden',
            borderRadius:'4px', border:'1px solid rgba(197,165,90,0.1)',
            background:'linear-gradient(135deg,rgba(9,18,32,0.95) 0%,rgba(7,12,24,0.98) 100%)',
            padding:'clamp(3rem,6vw,5rem) clamp(2rem,5vw,4rem)',
            textAlign:'center',
            boxShadow:'0 0 80px rgba(197,165,90,0.06), inset 0 1px 0 rgba(197,165,90,0.08)' }}>

          {/* Ghost ? + LED trace */}
          <div style={{
            position:'absolute', right:'-2%', top:'50%', transform:'translateY(-50%)',
            pointerEvents:'none', userSelect:'none',
            width:'clamp(14rem,24vw,22rem)', height:'clamp(18rem,32vw,30rem)',
          }}>
            {/* Ghost text */}
            <div style={{
              position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:"'Montserrat',sans-serif", fontWeight:900,
              fontSize:'clamp(16rem,28vw,26rem)', lineHeight:1,
              color:'transparent', WebkitTextStroke:'2px rgba(197,165,90,0.08)',
            }}>?</div>

            {/* LED trace SVG */}
            <svg viewBox="0 0 120 195" fill="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
              <defs>
                <filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="sparkGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Ghost base path */}
              <path id="qPath"
                d="M 28,65 Q 26,22 62,20 Q 98,18 98,55 Q 98,82 74,98 Q 62,108 62,126 L 62,150"
                stroke="rgba(197,165,90,0.08)" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <circle cx="62" cy="170" r="8" fill="none" stroke="rgba(197,165,90,0.08)" strokeWidth="4"/>

              {/* Animated gold stroke — travels along the path */}
              <path
                d="M 28,65 Q 26,22 62,20 Q 98,18 98,55 Q 98,82 74,98 Q 62,108 62,126 L 62,150"
                stroke="#C5A55A" strokeWidth="2.5" strokeLinecap="round" fill="none"
                filter="url(#ledGlow)"
                strokeDasharray="40 999"
                strokeOpacity="0.9">
                <animate attributeName="stroke-dashoffset"
                  from="0" to="-280"
                  dur="2.5s" repeatCount="indefinite"
                  calcMode="spline" keySplines="0.4 0 0.6 1"/>
              </path>

              {/* Bright spark dot along the path */}
              <circle r="4.5" fill="#fdf0b0" filter="url(#sparkGlow)">
                <animateMotion dur="2.5s" repeatCount="indefinite"
                  calcMode="spline" keySplines="0.4 0 0.6 1">
                  <mpath href="#qPath"/>
                </animateMotion>
              </circle>

              {/* Dot circle trace */}
              <circle cx="62" cy="170" r="8"
                stroke="#C5A55A" strokeWidth="2.5" fill="none"
                filter="url(#ledGlow)"
                strokeDasharray="20 999" strokeOpacity="0.85">
                <animate attributeName="stroke-dashoffset"
                  from="0" to="-60"
                  dur="1s" begin="2.3s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/* Top gold line */}
          <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
            background:'linear-gradient(90deg,transparent,rgba(197,165,90,0.5) 40%,rgba(197,165,90,0.5) 60%,transparent)' }} />

          {/* Intro label */}
          <motion.p initial={{ opacity:0, y:10 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:1.1}}
            style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:400,
              fontSize:'clamp(0.95rem,1.5vw,1.15rem)', color:'rgba(197,165,90,0.65)',
              marginBottom:'1.6rem', letterSpacing:'0.02em' }}>
            La pregunta que nadie se atreve a hacerse:
          </motion.p>

          {/* Main statement */}
          <motion.p initial={{ opacity:0, y:14 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:1.2}}
            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800,
              fontSize:'clamp(1.6rem,3.5vw,3rem)', letterSpacing:'-0.03em', lineHeight:1.2,
              color:'#FFFFFF', marginBottom:'0.4rem' }}>
            Sabes exactamente lo que tienes que hacer.
          </motion.p>

          {/* The question — gold neon */}
          <motion.p initial={{ opacity:0, y:14 }} animate={visible?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:1.32}}
            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800,
              fontSize:'clamp(1.6rem,3.5vw,3rem)', letterSpacing:'-0.03em', lineHeight:1.2,
              marginBottom:'clamp(2.5rem,4vw,3.5rem)' }}>
            <span style={{ color:'#FFFFFF' }}>{'¿Por qué '}</span>
            <span style={{
              background:'linear-gradient(135deg,#f7e8a0 0%,#E8CC88 35%,#C5A55A 70%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              filter:'drop-shadow(0 0 18px rgba(197,165,90,0.7)) drop-shadow(0 0 40px rgba(197,165,90,0.35))',
            }}>no lo haces</span>
            <span style={{
              background:'linear-gradient(135deg,#f7e8a0 0%,#E8CC88 35%,#C5A55A 70%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              filter:'drop-shadow(0 0 18px rgba(197,165,90,0.7)) drop-shadow(0 0 40px rgba(197,165,90,0.35))',
            }}>?</span>
          </motion.p>

          {/* CTA */}
          <motion.a href="#aplicar" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            style={{ display:'inline-flex', alignItems:'center', gap:'10px',
              fontFamily:"'Montserrat',sans-serif", fontWeight:700,
              fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase',
              color:'#C5A55A', textDecoration:'none',
              border:'1px solid rgba(197,165,90,0.3)',
              padding:'13px 32px', borderRadius:'1px',
              transition:'border-color 0.3s, color 0.3s, box-shadow 0.3s',
              position:'relative', zIndex:1 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(197,165,90,0.7)'; e.currentTarget.style.color='#f0d888'; e.currentTarget.style.boxShadow='0 0 24px rgba(197,165,90,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(197,165,90,0.3)'; e.currentTarget.style.color='#C5A55A'; e.currentTarget.style.boxShadow='none'; }}>
            Solicitar lugar en ASCENT
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2l4 4-4 4M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(197,165,90,0.2) 30%,rgba(197,165,90,0.2) 70%,transparent)' }} />
    </section>
  );
}
