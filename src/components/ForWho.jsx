import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const YES = [
  'Eres fundador, emprendedor o líder de negocio con metas reales y decisiones que tomar.',
  'Tu negocio avanza, pero tu claridad, ejecución o red no están donde deberían estar.',
  'Buscas conversaciones de negocio reales, no paneles de motivación.',
  'Estás dispuesto a ser honesto contigo mismo durante dos días intensos.',
];

const NO = [
  'Buscas un evento donde vas a escuchar sin comprometerte con nada.',
  'Prefieres aprender teoría pero aplazas la ejecución indefinidamente.',
  'Solo quieres asistir para poner en tu perfil que "fuiste a ASCENT".',
  'No estás dispuesto a cuestionar tus supuestos de negocios ni tu forma de decidir.',
];

function YesItem({ text, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.25 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr',
        gap: '0',
        alignItems: 'center',
        padding: '18px 20px 18px 0',
        borderBottom: '1px solid rgba(197,165,90,0.07)',
        position: 'relative',
        cursor: 'default',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(197,165,90,0.05)' : 'transparent',
        borderRadius: '2px',
        marginLeft: hovered ? '-8px' : '0',
        paddingLeft: hovered ? '8px' : '0',
      }}
    >
      {/* Left accent line on hover */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', left: hovered ? '0' : '-4px', top: 0, bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, #C5A55A, rgba(197,165,90,0.3))',
          transformOrigin: 'top',
          boxShadow: '0 0 8px rgba(197,165,90,0.6)',
        }}
      />

      {/* Number */}
      <span style={{
        fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
        fontSize: '0.75rem', letterSpacing: '0.08em',
        color: hovered ? '#C5A55A' : 'rgba(197,165,90,0.35)',
        transition: 'color 0.3s',
        userSelect: 'none',
      }}>{num}</span>

      {/* Text */}
      <p style={{
        fontFamily: "'Montserrat',sans-serif",
        fontWeight: hovered ? 600 : 400,
        fontSize: 'clamp(0.94rem,1.4vw,1.05rem)',
        lineHeight: 1.65,
        color: hovered ? '#FFFFFF' : 'rgba(225,233,245,0.85)',
        margin: 0,
        transition: 'color 0.3s',
      }}>{text}</p>
    </motion.div>
  );
}

export default function ForWho() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="para-quien" ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
      background: '#060E18',
    }}>

      {/* Photo background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        filter: 'brightness(0.22) saturate(0.5)',
      }} />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(6,14,24,0.92) 0%, rgba(6,14,24,0.55) 40%, rgba(6,14,24,0.55) 65%, rgba(6,14,24,0.96) 100%)',
      }} />
      {/* Central warm light */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(197,165,90,0.06) 0%, transparent 70%)',
      }} />

      {/* Ghost "02" */}
      <div style={{
        position: 'absolute', left: '-3%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(14rem,22vw,22rem)', lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.025)',
        pointerEvents: 'none', userSelect: 'none', zIndex: 2,
      }}>02</div>

      {/* Edges */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:'1px',zIndex:3,
        background:'linear-gradient(90deg,transparent,rgba(197,165,90,0.3) 30%,rgba(197,165,90,0.3) 70%,transparent)' }}/>
      <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'1px',zIndex:3,
        background:'linear-gradient(90deg,transparent,rgba(197,165,90,0.15) 30%,rgba(197,165,90,0.15) 70%,transparent)' }}/>

      <div style={{ maxWidth:'1160px', margin:'0 auto', position:'relative', zIndex:4 }}>

        {/* Section tag */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={visible?{opacity:1,x:0}:{}} transition={{duration:0.7}}
          style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'2rem' }}>
          <div style={{ width:'32px', height:'1px', background:'#C5A55A' }} />
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:'15px',
            letterSpacing:'0.22em', color:'#C5A55A', textTransform:'uppercase', opacity:0.9, fontWeight:700 }}>
            Para quién es
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom:'clamp(3rem,5vw,4.5rem)', overflow:'hidden' }}>
          <motion.h2
            initial={{ y:'110%', opacity:0 }} animate={visible?{y:0,opacity:1}:{}}
            transition={{ duration:0.7, delay:0.08, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:900,
              fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'0.01em',
              color:'#FFFFFF', lineHeight:1.1, margin:0,
              textShadow:'0 2px 24px rgba(0,0,0,0.8)' }}>
            Si esto resuena contigo,
          </motion.h2>
          <motion.h2
            initial={{ y:'110%', opacity:0 }} animate={visible?{y:0,opacity:1}:{}}
            transition={{ duration:0.7, delay:0.16, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
              fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'0.01em', lineHeight:1.1,
              background:'linear-gradient(160deg,#f7e8b0 0%,#c5a55a 45%,#d4ba7a 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              filter:'drop-shadow(0 0 24px rgba(197,165,90,0.5))', margin:0 }}>
            estás en el lugar correcto
          </motion.h2>
        </div>

        {/* ── MAIN LAYOUT: wide YES + compact NO ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(2rem,4vw,4rem)',
          alignItems: 'start',
        }}>

          {/* ══ YES COLUMN ══ */}
          <motion.div
            initial={{ opacity:0, y:36 }} animate={visible?{opacity:1,y:0}:{}}
            transition={{ duration:0.75, delay:0.2 }}
            style={{
              background:'rgba(10,20,36,0.82)',
              backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
              border:'1px solid rgba(197,165,90,0.22)',
              borderRadius:'4px',
              overflow:'hidden',
              boxShadow:'0 16px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(197,165,90,0.15)',
            }}
          >
            {/* Card header */}
            <div style={{
              padding:'1.6rem 2rem',
              borderBottom:'1px solid rgba(197,165,90,0.1)',
              background:'linear-gradient(135deg, rgba(197,165,90,0.1) 0%, transparent 60%)',
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%',
                  background:'#C5A55A', boxShadow:'0 0 12px rgba(197,165,90,1), 0 0 24px rgba(197,165,90,0.5)' }} />
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800,
                  fontSize:'clamp(0.78rem,1.1vw,0.9rem)', letterSpacing:'0.2em',
                  color:'#C5A55A', textTransform:'uppercase' }}>Listo para ASCENT si:</span>
              </div>
            </div>

            {/* YES items */}
            <div style={{ padding:'0.5rem 2rem 1.5rem' }}>
              {YES.map((text, i) => (
                <YesItem key={i} text={text} index={i} visible={visible} />
              ))}
            </div>
          </motion.div>

          {/* ══ NO COLUMN ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(1.2rem,2vw,1.8rem)' }}>

            {/* NO card */}
            <motion.div
              initial={{ opacity:0, y:36 }} animate={visible?{opacity:1,y:0}:{}}
              transition={{ duration:0.75, delay:0.34 }}
              style={{
                background:'rgba(6,12,22,0.8)',
                backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:'4px', overflow:'hidden',
                boxShadow:'0 16px 60px rgba(0,0,0,0.55)',
              }}
            >
              {/* Card header */}
              <div style={{
                padding:'1.4rem 1.8rem',
                borderBottom:'1px solid rgba(255,50,50,0.12)',
                background:'linear-gradient(135deg, rgba(255,30,30,0.04) 0%, transparent 60%)',
                display:'flex', alignItems:'center', gap:'10px',
              }}>
                <motion.div
                  animate={{ scale:[1,1.4,1], opacity:[0.8,1,0.8] }}
                  transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
                  style={{ width:'8px', height:'8px', borderRadius:'50%',
                    background:'#FF2222',
                    boxShadow:'0 0 10px rgba(255,30,30,1), 0 0 22px rgba(255,30,30,0.6), 0 0 40px rgba(255,30,30,0.3)',
                    flexShrink:0 }}
                />
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800,
                  fontSize:'clamp(0.72rem,1vw,0.82rem)', letterSpacing:'0.2em',
                  color:'rgba(255,120,120,0.85)', textTransform:'uppercase',
                  textShadow:'0 0 12px rgba(255,50,50,0.4)' }}>
                  ASCENT no es para todo el mundo
                </span>
              </div>

              {/* Italic statement */}
              <div style={{ padding:'1.2rem 1.8rem 0.6rem',
                borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontStyle:'italic',
                  fontSize:'clamp(0.86rem,1.3vw,0.97rem)',
                  color:'#FFFFFF', lineHeight:1.65, margin:0 }}>
                  No filtramos por nivel de ingreso ni por tamaño de empresa.
                  Filtramos por actitud.
                </p>
              </div>

              {/* NO items */}
              <div style={{ padding:'0.4rem 1.8rem 1.4rem' }}>
                {NO.map((text, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:18 }} animate={visible?{opacity:1,x:0}:{}}
                    transition={{ duration:0.45, delay:0.5+i*0.07 }}
                    style={{
                      display:'flex', gap:'12px', alignItems:'flex-start',
                      padding:'11px 0',
                      borderBottom: i < NO.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <div style={{
                      width:'20px', height:'20px', borderRadius:'50%', flexShrink:0, marginTop:'2px',
                      border:'1.5px solid rgba(255,40,40,0.75)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      background:'rgba(255,20,20,0.08)',
                      boxShadow:'0 0 8px rgba(255,30,30,0.55), 0 0 18px rgba(255,30,30,0.2), inset 0 0 5px rgba(255,30,30,0.08)',
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#FF3333" strokeWidth="1.4" strokeLinecap="round"
                          style={{ filter:'drop-shadow(0 0 3px rgba(255,50,50,0.9))' }} />
                      </svg>
                    </div>
                    <p style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:400,
                      fontSize:'clamp(0.83rem,1.2vw,0.92rem)', lineHeight:1.65,
                      color:'rgba(190,205,225,0.72)', margin:0 }}>{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CALLOUT card — separate, more prominent */}
            <motion.div
              initial={{ opacity:0, y:24 }} animate={visible?{opacity:1,y:0}:{}}
              transition={{ duration:0.65, delay:0.92 }}
              style={{
                background:'linear-gradient(135deg, rgba(197,165,90,0.12) 0%, rgba(197,165,90,0.05) 100%)',
                backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
                border:'1px solid rgba(197,165,90,0.3)',
                borderLeft:'4px solid #C5A55A',
                borderRadius:'0 4px 4px 0',
                padding:'1.6rem 1.8rem',
                boxShadow:'0 0 30px rgba(197,165,90,0.08), inset 0 1px 0 rgba(197,165,90,0.1)',
              }}
            >
              <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#C5A55A',
                  boxShadow:'0 0 10px rgba(197,165,90,0.9)', flexShrink:0, marginTop:'6px' }} />
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700,
                  fontSize:'clamp(0.9rem,1.4vw,1.02rem)', color:'#C5A55A',
                  lineHeight:1.65, margin:0,
                  textShadow:'0 0 20px rgba(197,165,90,0.3)' }}>
                  El espacio en ASCENT es limitado. Y lo queremos ocupado con personas que vengan a actuar, no a tomar notas que nunca van a aplicar.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={visible?{opacity:1,y:0}:{}}
          transition={{ duration:0.8, delay:1.0 }}
          style={{
            marginTop:'clamp(3rem,6vw,5rem)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:'1.5rem',
            paddingTop:'clamp(2rem,4vw,3rem)',
            borderTop:'1px solid rgba(197,165,90,0.1)',
          }}
        >
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic',
            fontSize:'clamp(1rem,2vw,1.35rem)', fontWeight:600,
            color:'rgba(255,255,255,0.75)', margin:0,
            maxWidth:'560px', lineHeight:1.55,
            textShadow:'0 2px 16px rgba(0,0,0,0.7)' }}>
            "Si llevas tiempo buscando el tipo de experiencia que realmente mueva el marcador, ASCENT fue diseñado para ti."
          </p>
          <motion.a href="#aplicar"
            onClick={e => { if (window.innerWidth < 860) { e.preventDefault(); const el = document.getElementById('formulario'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
            whileHover={{ scale:1.04, boxShadow:'0 0 40px rgba(197,165,90,0.55)' }}
            whileTap={{ scale:0.97 }}
            style={{
              display:'inline-flex', alignItems:'center', gap:'10px',
              fontFamily:"'Montserrat',sans-serif", fontWeight:800,
              fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase',
              color:'#04080E',
              background:'linear-gradient(105deg,#D4BA7A,#C5A55A,#E8CC88)',
              padding:'15px 36px', borderRadius:'2px', textDecoration:'none',
              boxShadow:'0 0 30px rgba(197,165,90,0.4), 0 4px 20px rgba(0,0,0,0.5)',
              whiteSpace:'nowrap',
            }}>
            Verificar si califico
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2l4 4-4 4M2 6h8" stroke="#04080E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
