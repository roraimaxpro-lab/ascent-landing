import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      background: '#060E18',
      borderTop: '1px solid rgba(197,165,90,0.1)',
      padding: 'clamp(3rem, 6vw, 5rem) 1.5rem 2rem',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(197,165,90,0.08)',
        }}>
          {/* Logo + description */}
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <img
                src="/LOGOS/logo-sin-fondo.png"
                alt="ASCENT"
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.85rem',
              color: '#8A9AB5',
              lineHeight: 1.7,
              maxWidth: '260px',
            }}>
              Entrenamiento vivencial de negocios y liderazgo para fundadores, líderes y emprendedores serios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C5A55A',
              marginBottom: '1.2rem',
            }}>Navegación</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { label: 'Qué es ASCENT', href: '#que-es' },
                { label: 'Para quién es', href: '#para-quien' },
                { label: 'La experiencia', href: '#experiencia' },
                { label: 'Testimonios', href: '#testimonios' },
                { label: 'FAQ', href: '#faq' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.87rem',
                    color: '#8A9AB5',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = '#C5A55A'}
                  onMouseLeave={e => e.target.style.color = '#8A9AB5'}
                >{link.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C5A55A',
              marginBottom: '1.2rem',
            }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <a href="mailto:roraimax.pro@gmail.com" style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.87rem',
                color: '#8A9AB5',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.target.style.color = '#C5A55A'}
                onMouseLeave={e => e.target.style.color = '#8A9AB5'}
              >roraimax.pro@gmail.com</a>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                {[
                  { label: 'IG', href: '#' },
                  { label: 'LI', href: '#' },
                  { label: 'TW', href: '#' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      color: '#8A9AB5',
                      border: '1px solid rgba(138,154,181,0.2)',
                      padding: '5px 10px',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = '#C5A55A';
                      e.target.style.borderColor = 'rgba(197,165,90,0.4)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = '#8A9AB5';
                      e.target.style.borderColor = 'rgba(138,154,181,0.2)';
                    }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: '0.75rem',
            color: 'rgba(138,154,181,0.4)',
            letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} ASCENT. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Aviso Legal', 'Privacidad', 'Términos'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(138,154,181,0.4)',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.color = '#8A9AB5'}
                onMouseLeave={e => e.target.style.color = 'rgba(138,154,181,0.4)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
