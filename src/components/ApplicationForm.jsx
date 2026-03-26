import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

function Field({ label, name, type = 'text', placeholder, value, onChange, as = 'input', rows }) {
  const [focused, setFocused] = useState(false);
  const Tag = as;
  return (
    <div>
      <label style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
        fontSize: '0.6rem', letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: focused ? '#C5A55A' : 'rgba(197,165,90,0.45)',
        marginBottom: '8px',
        transition: 'color 0.25s',
      }}>
        <span style={{
          width: '16px', height: '1px',
          background: focused ? '#C5A55A' : 'rgba(197,165,90,0.3)',
          transition: 'background 0.25s',
        }} />
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: focused ? 'rgba(197,165,90,0.04)' : 'rgba(11,22,36,0.8)',
          border: `1px solid ${focused ? 'rgba(197,165,90,0.55)' : 'rgba(197,165,90,0.12)'}`,
          borderRadius: '3px',
          padding: as === 'textarea' ? '14px 16px' : '13px 16px',
          fontFamily: "'Montserrat',sans-serif",
          fontSize: '0.88rem', color: '#FFFFFF',
          outline: 'none',
          transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
          resize: as === 'textarea' ? 'vertical' : undefined,
          minHeight: as === 'textarea' ? '96px' : undefined,
          boxShadow: focused ? '0 0 20px rgba(197,165,90,0.1), inset 0 1px 0 rgba(197,165,90,0.06)' : 'none',
        }}
      />
    </div>
  );
}

const stats = [
  { value: '2', label: 'Días presenciales' },
  { value: '7', label: 'Entregables concretos' },
  { value: '< 30', label: 'Participantes por edición' },
];

export default function ApplicationForm() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.06 });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', business: '', challenge: '' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || 'Error al enviar. Intenta nuevamente.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Error de conexión. Intenta nuevamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="aplicar" ref={ref} style={{
      background: '#070F1A',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
    }}>

      {/* ── Background layers ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(197,165,90,0.055) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Left diagonal gold accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%', pointerEvents: 'none',
        background: 'linear-gradient(160deg, rgba(197,165,90,0.055) 0%, transparent 60%)',
      }} />

      {/* Ghost "NEO" watermark */}
      <div style={{
        position: 'absolute', left: '-3%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(16rem,24vw,22rem)', lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(197,165,90,0.04)',
        userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em',
      }}>NEO</div>

      {/* Top edge */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.4) 30%, rgba(197,165,90,0.4) 70%, transparent)',
      }} />

      {/* Central glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '-10%', left: '35%', transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(197,165,90,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="apply-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem,6vw,7rem)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Visual / Copy ── */}
          <div>

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.2rem' }}
            >
              <div style={{ width: '32px', height: '1px', background: '#C5A55A', opacity: 0.6 }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '11px',
                letterSpacing: '0.26em', color: '#C5A55A', textTransform: 'uppercase', fontWeight: 700 }}>
                Solicitar lugar
              </span>
            </motion.div>

            {/* Headline */}
            <div style={{ overflow: 'hidden', marginBottom: '0.2rem' }}>
              <motion.h2
                initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(2.4rem,5vw,4.2rem)', color: '#FFFFFF',
                  letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
                }}
              >Hay un antes</motion.h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '0.2rem' }}>
              <motion.h2
                initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(2.4rem,5vw,4.2rem)', color: '#FFFFFF',
                  letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
                }}
              >y un después</motion.h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '2.2rem' }}>
              <motion.h2
                initial={{ y: '100%' }} animate={visible ? { y: '0%' } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(2.4rem,5vw,4.2rem)',
                  letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
                }}
              >
                <span style={{
                  background: 'linear-gradient(135deg,#f0d888,#C5A55A,#e8cc88)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>de ASCENT.</span>
              </motion.h2>
            </div>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.9rem,1.3vw,0.97rem)', lineHeight: 1.8,
                color: 'rgba(138,154,181,0.7)', marginBottom: '2.8rem', maxWidth: '420px',
              }}
            >
              Elige en qué lado quedarte. No hay forma de saber exactamente lo que vives dentro hasta que estás en la sala. Los lugares son limitados, no porque sea una táctica de marketing, sino porque el nivel de la sala depende del nivel de las personas que la ocupan.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: 'flex', gap: '0', marginBottom: '2.8rem' }}
            >
              {stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1,
                  padding: 'clamp(1rem,1.8vw,1.4rem) clamp(0.8rem,1.5vw,1.2rem)',
                  borderLeft: i === 0 ? '1px solid rgba(197,165,90,0.3)' : 'none',
                  borderRight: '1px solid rgba(197,165,90,0.3)',
                  borderTop: '1px solid rgba(197,165,90,0.15)',
                  borderBottom: '1px solid rgba(197,165,90,0.15)',
                  background: i === 1 ? 'rgba(197,165,90,0.04)' : 'transparent',
                }}>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    fontSize: 'clamp(1.4rem,2.8vw,2rem)', lineHeight: 1,
                    background: 'linear-gradient(135deg,#e8cc88,#C5A55A)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    marginBottom: '4px',
                    textShadow: 'none',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: '0.58rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(138,154,181,0.6)', lineHeight: 1.3,
                  }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Urgency callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '1.2rem 1.4rem',
                background: 'rgba(197,165,90,0.06)',
                border: '1px solid rgba(197,165,90,0.2)',
                borderLeft: '3px solid #C5A55A',
                borderRadius: '3px',
                marginBottom: '2.5rem',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, marginTop: '5px',
                  background: '#C5A55A',
                  boxShadow: '0 0 10px rgba(197,165,90,1), 0 0 20px rgba(197,165,90,0.5)',
                }}
              />
              <div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  fontSize: 'clamp(0.88rem,1.2vw,0.95rem)', color: '#FFFFFF', marginBottom: '4px',
                }}>Sala en llenado activo</div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.78rem,1.05vw,0.83rem)', color: 'rgba(138,154,181,0.65)', lineHeight: 1.6,
                }}>Las plazas disponibles se confirman por orden de solicitud. El proceso de selección comienza con el formulario.</div>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            className="apply-form-card"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: '6rem' }}
          >
            <div style={{
              position: 'relative',
              background: 'rgba(10,18,32,0.95)',
              border: '1px solid rgba(197,165,90,0.2)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,165,90,0.06)',
            }}>
              {/* Gold top bar */}
              <div style={{
                height: '3px',
                background: 'linear-gradient(90deg, #C5A55A, #E8CC88, rgba(197,165,90,0.3))',
                boxShadow: '0 0 20px rgba(197,165,90,0.5)',
              }} />

              {/* Ambient inner glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '200px', pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(197,165,90,0.05) 0%, transparent 100%)',
              }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(4rem,8vw,6rem) clamp(2rem,4vw,3rem)',
                      position: 'relative', zIndex: 1,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      style={{
                        width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.8rem',
                        border: '2px solid #C5A55A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(197,165,90,0.12)',
                        boxShadow: '0 0 40px rgba(197,165,90,0.4)',
                      }}
                    >
                      <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                        <path d="M2 10L9.5 17.5L24 2" stroke="#C5A55A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h3 style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                      fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.8rem', letterSpacing: '-0.02em',
                    }}>Solicitud recibida.</h3>
                    <p style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 400,
                      fontSize: '0.92rem', color: 'rgba(138,154,181,0.75)', lineHeight: 1.75,
                    }}>
                      Te respondemos con la misma seriedad con la que facilitamos el entrenamiento.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    style={{
                      padding: 'clamp(1.8rem,3.5vw,2.8rem)',
                      display: 'flex', flexDirection: 'column', gap: '1.3rem',
                      position: 'relative', zIndex: 1,
                    }}
                  >
                    {/* Form header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(197,165,90,0.1)',
                      paddingBottom: '1.1rem', marginBottom: '0.3rem',
                    }}>
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif", fontSize: '0.58rem',
                        letterSpacing: '0.25em', color: 'rgba(197,165,90,0.5)',
                        textTransform: 'uppercase',
                      }}>Formulario de aplicación · ASCENT NEO</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[1,2,3].map(i => (
                          <div key={i} style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: i === 1 ? '#C5A55A' : 'rgba(197,165,90,0.2)',
                          }} />
                        ))}
                      </div>
                    </div>

                    <Field label="Nombre completo" name="name" placeholder="Tu nombre"
                      value={form.name} onChange={handle} />
                    <Field label="Correo electrónico" name="email" type="email" placeholder="tu@email.com"
                      value={form.email} onChange={handle} />
                    <Field label="¿A qué te dedicas?" name="business" placeholder="Sector / tipo de negocio / rol"
                      value={form.business} onChange={handle} />
                    <Field label="¿Cuál es tu mayor reto ahora mismo?" name="challenge" as="textarea"
                      placeholder="En 2-3 líneas, el reto más importante que estás enfrentando en tu negocio."
                      value={form.challenge} onChange={handle} />

                    {/* Error message */}
                    {serverError && (
                      <div style={{
                        padding: '10px 14px',
                        background: 'rgba(220,60,60,0.1)',
                        border: '1px solid rgba(220,60,60,0.3)',
                        borderRadius: '3px',
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: '0.8rem',
                        color: '#ff7070',
                      }}>
                        {serverError}
                      </div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={!sending ? { scale: 1.02, boxShadow: '0 0 80px rgba(197,165,90,0.7), 0 8px 40px rgba(0,0,0,0.5)' } : {}}
                      whileTap={!sending ? { scale: 0.98 } : {}}
                      style={{
                        width: '100%', marginTop: '0.4rem',
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                        fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#070F1A',
                        background: sending
                          ? 'rgba(197,165,90,0.4)'
                          : 'linear-gradient(135deg, #D4BA7A 0%, #C5A55A 50%, #E8CC88 100%)',
                        border: 'none', padding: '19px',
                        borderRadius: '3px', cursor: sending ? 'not-allowed' : 'pointer',
                        boxShadow: sending ? 'none' : '0 0 50px rgba(197,165,90,0.35), 0 4px 20px rgba(0,0,0,0.4)',
                        position: 'relative', overflow: 'hidden',
                        opacity: sending ? 0.7 : 1,
                      }}
                    >
                      {/* Button shimmer */}
                      {!sending && (
                        <motion.div
                          animate={{ x: ['-120%', '250%'] }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                          style={{
                            position: 'absolute', top: 0, bottom: 0, width: '30%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>
                        {sending ? 'Enviando...' : 'Quiero mi lugar en ASCENT'}
                      </span>
                    </motion.button>

                    <p style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: '0.74rem',
                      color: 'rgba(138,154,181,0.45)', textAlign: 'center', lineHeight: 1.65,
                      margin: 0,
                    }}>
                      No todos los que asisten llegan igual.<br />
                      Pero todos los que llegan de verdad salen diferentes.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.25) 30%, rgba(197,165,90,0.25) 70%, transparent)',
      }} />

      <style>{`
        @media (max-width: 860px) {
          #aplicar .apply-layout {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          #aplicar .apply-layout > * {
            width: 100% !important;
            max-width: 500px !important;
          }
          #aplicar .apply-form-card {
            position: relative !important;
          }
        }
      `}</style>
    </section>
  );
}
