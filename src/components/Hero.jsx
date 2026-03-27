import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ── isotipo = letter-A.png ── */
function Isotipo({ size = 80, style = {} }) {
  return (
    <img
      src="/LOGOS/letter-A.png"
      alt="ASCENT"
      style={{ width: size, height: size, objectFit: 'contain',
        filter: 'drop-shadow(0 0 22px rgba(197,165,90,0.55))', ...style }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   CANVAS — Mountain + LED Trace + Crepuscular Rays
═══════════════════════════════════════════════════════════════ */
function MountainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    /* ── Mountain normalized path (0..1 coords) ─────────────── */
    const PATH_NRM = [
      [0,    1    ],
      [0,    0.87 ],
      [0.08, 0.80 ],
      [0.18, 0.70 ],
      [0.27, 0.63 ],
      [0.35, 0.655],
      [0.42, 0.60 ],
      [0.50, 0.52 ],   // ← main peak
      [0.58, 0.60 ],
      [0.65, 0.655],
      [0.73, 0.62 ],
      [0.82, 0.70 ],
      [0.92, 0.80 ],
      [1.0,  0.87 ],
      [1.0,  1    ],
    ];

    /* Pre-compute cumulative arc lengths (normalized) */
    function buildPath() {
      const pts = PATH_NRM.map(([nx, ny]) => [nx * W(), ny * H()]);
      const dists = [0];
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i][0] - pts[i-1][0];
        const dy = pts[i][1] - pts[i-1][1];
        dists.push(dists[i-1] + Math.sqrt(dx*dx + dy*dy));
      }
      return { pts, dists, total: dists[dists.length - 1] };
    }

    /* Evaluate point at normalized arc length t ∈ [0,1] */
    function evalPath({ pts, dists, total }, t) {
      const target = t * total;
      for (let i = 1; i < dists.length; i++) {
        if (dists[i] >= target) {
          const seg = (target - dists[i-1]) / (dists[i] - dists[i-1]);
          return [
            pts[i-1][0] + seg * (pts[i][0] - pts[i-1][0]),
            pts[i-1][1] + seg * (pts[i][1] - pts[i-1][1]),
          ];
        }
      }
      return pts[pts.length - 1];
    }


    /* ── Particles ── */
    const particles = Array.from({ length: 80 }, () => ({
      x: 0.28 + Math.random() * 0.44, y: 0.55 + Math.random() * 0.45,
      r: Math.random() * 1.3 + 0.2,
      a: Math.random() * 0.3 + 0.05,
      dx: (Math.random() - 0.5) * 0.00022,
      dy: -(Math.random() * 0.00032 + 0.00008),
      ph: Math.random() * Math.PI * 2,
    }));

    /* ── LED trace state ── */
    // Progress goes 0→1 (left base → main peak → right base)
    // We only want the ASCENDING leg (left bottom → peak ≈ t=0.46)
    // Then reset and repeat
    const PEAK_T  = 0.50;     // normalized arc position of the peak
    const TRAIL   = 0.07;     // trail length in normalized arc
    let ledT      = 0;
    const LED_SPD = 0.0018;   // speed per frame

    /* ── Streaks ── */
    const streaks = Array.from({ length: 3 }, () => ({
      y: 0.1 + Math.random() * 0.5, progress: -0.15,
      speed: 0.0005 + Math.random() * 0.0007,
      length: 0.1 + Math.random() * 0.12,
      alpha: 0, maxAlpha: 0.1 + Math.random() * 0.12,
      active: false, timer: 100 + Math.random() * 400,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      t += 0.012;

      const cx   = W() * 0.5;
      const peakY = H() * 0.52;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.55);

      /* ── Background glow (sunrise behind peak) ── */
      const bg1 = ctx.createRadialGradient(cx, peakY, 0, cx, peakY, H() * 0.8);
      bg1.addColorStop(0,   `rgba(197,165,90,${0.20 + pulse * 0.10})`);
      bg1.addColorStop(0.22,`rgba(197,165,90,${0.07 + pulse * 0.04})`);
      bg1.addColorStop(0.55,`rgba(197,165,90,0.015)`);
      bg1.addColorStop(1,   'rgba(197,165,90,0)');
      ctx.fillStyle = bg1; ctx.fillRect(0, 0, W(), H());

      // Hot core
      const bg2 = ctx.createRadialGradient(cx, peakY, 0, cx, peakY, H() * 0.22);
      bg2.addColorStop(0,    `rgba(255,245,185,${0.38 + pulse * 0.18})`);
      bg2.addColorStop(0.15, `rgba(240,210,130,${0.18 + pulse * 0.10})`);
      bg2.addColorStop(1,    'rgba(197,165,90,0)');
      ctx.fillStyle = bg2; ctx.fillRect(0, 0, W(), H());


      /* ── Horizontal streaks ── */
      streaks.forEach(s => {
        if (!s.active) {
          s.timer--;
          if (s.timer <= 0) { s.active = true; s.progress = -s.length; s.y = 0.08 + Math.random() * 0.48; s.timer = 160 + Math.random() * 500; }
          return;
        }
        s.progress += s.speed;
        const fade = 0.025;
        s.alpha = s.progress < fade ? (s.progress / fade) * s.maxAlpha
          : s.progress + s.length > 1 - fade ? Math.max(0, (1 - s.progress - s.length) / fade * s.maxAlpha)
          : s.maxAlpha;
        if (s.progress > 1) { s.active = false; return; }
        const x1 = s.progress * W(), x2 = (s.progress + s.length) * W(), y = s.y * H();
        const sg = ctx.createLinearGradient(x1, y, x2, y);
        sg.addColorStop(0, 'rgba(255,240,180,0)');
        sg.addColorStop(0.3, `rgba(255,240,180,${s.alpha})`);
        sg.addColorStop(0.7, `rgba(212,186,122,${s.alpha})`);
        sg.addColorStop(1, 'rgba(197,165,90,0)');
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
        ctx.strokeStyle = sg; ctx.lineWidth = 1; ctx.stroke();
      });

      /* ── Particles ── */
      particles.forEach(p => {
        p.ph += 0.013; p.x += p.dx; p.y += p.dy;
        if (p.y < -0.02) { p.y = 0.55 + Math.random() * 0.45; p.x = 0.28 + Math.random() * 0.44; }
        const a = p.a * (0.6 + 0.4 * Math.sin(p.ph));
        ctx.beginPath(); ctx.arc(p.x * W(), p.y * H(), p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,186,122,${a})`; ctx.fill();
      });

      /* ── Mountain silhouette ── */
      const pathData = buildPath();

      // Fill mountain
      const mpts = pathData.pts;
      ctx.beginPath();
      ctx.moveTo(mpts[0][0], mpts[0][1]);
      mpts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fillStyle = 'rgba(4,8,14,0.97)';
      ctx.fill();

      // Soft ridge glow
      ctx.beginPath();
      ctx.moveTo(mpts[0][0], mpts[0][1]);
      mpts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.strokeStyle = `rgba(197,165,90,${0.08 + pulse * 0.08})`;
      ctx.lineWidth = 1.5; ctx.stroke();

      /* ── LED ASCENDING TRACE ─────────────────────────────── */
      ledT += LED_SPD;
      if (ledT > PEAK_T + TRAIL) ledT = -TRAIL * 0.5; // reset from before start

      // Draw trail (from ledT-TRAIL to ledT)
      const trailStart = Math.max(0, ledT - TRAIL);
      const trailEnd   = Math.min(PEAK_T, ledT);

      if (trailEnd > trailStart) {
        const STEPS = 60;
        for (let i = 0; i < STEPS; i++) {
          const ta = trailStart + (trailEnd - trailStart) * (i / STEPS);
          const tb = trailStart + (trailEnd - trailStart) * ((i + 1) / STEPS);
          if (ta < 0 || tb < 0) continue;
          const [x1, y1] = evalPath(pathData, ta);
          const [x2, y2] = evalPath(pathData, tb);

          // Intensity: bright at head, fades to 0 at tail
          const intensity = (tb - trailStart) / (trailEnd - trailStart);
          const a = Math.pow(intensity, 1.8);

          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(255,245,200,${a * 0.85})`;
          ctx.lineWidth = 2.5 * intensity + 0.5; ctx.lineCap = 'round'; ctx.stroke();

          // Outer glow segment
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(197,165,90,${a * 0.5})`;
          ctx.lineWidth = 8 * intensity; ctx.stroke();
        }
      }

      // Draw glowing head dot
      if (ledT >= 0 && ledT <= PEAK_T) {
        const [hx, hy] = evalPath(pathData, ledT);
        // outer soft halo
        const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 28);
        halo.addColorStop(0,   `rgba(255,250,210,${0.55 + pulse * 0.2})`);
        halo.addColorStop(0.35,`rgba(212,186,122,${0.2 + pulse * 0.1})`);
        halo.addColorStop(1,   'rgba(197,165,90,0)');
        ctx.beginPath(); ctx.arc(hx, hy, 28, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();
        // bright core
        ctx.beginPath(); ctx.arc(hx, hy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,235,${0.9 + pulse * 0.1})`; ctx.fill();
        ctx.beginPath(); ctx.arc(hx, hy, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF'; ctx.fill();
      }

      // Peak bright tip (always on)
      const peakGlow = ctx.createRadialGradient(cx, peakY, 0, cx, peakY, 55);
      peakGlow.addColorStop(0,   `rgba(255,248,210,${0.45 + pulse * 0.25})`);
      peakGlow.addColorStop(0.3, `rgba(197,165,90,${0.12 + pulse * 0.08})`);
      peakGlow.addColorStop(1,   'rgba(197,165,90,0)');
      ctx.beginPath(); ctx.arc(cx, peakY, 55, 0, Math.PI * 2);
      ctx.fillStyle = peakGlow; ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}

/* ─── Gold Diamond Divider ──────────────────────────────────── */
function GoldDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', margin: '1.2rem auto', transformOrigin: 'center' }}
    >
      <div style={{ flex: 1, maxWidth: '110px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.9))' }} />
      <div style={{ width: '6px', height: '6px', background: '#C5A55A', transform: 'rotate(45deg)', boxShadow: '0 0 10px rgba(197,165,90,1), 0 0 22px rgba(197,165,90,0.5)', flexShrink: 0 }} />
      <div style={{ width: '3px', height: '3px', background: 'rgba(197,165,90,0.45)', transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ width: '6px', height: '6px', background: '#C5A55A', transform: 'rotate(45deg)', boxShadow: '0 0 10px rgba(197,165,90,1), 0 0 22px rgba(197,165,90,0.5)', flexShrink: 0 }} />
      <div style={{ flex: 1, maxWidth: '110px', height: '1px', background: 'linear-gradient(90deg, rgba(197,165,90,0.9), transparent)' }} />
    </motion.div>
  );
}

/* ─── Variants ──────────────────────────────────────────────── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const fadeUp    = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } } };
const fadeIn    = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.1 } } };

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100svh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#04080E',
      padding: '88px 1.5rem 3rem',
    }}>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg,#04080E 0%,#07101C 55%,#04080E 100%)' }} />

      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(197,165,90,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(197,165,90,0.016) 1px,transparent 1px)',
        backgroundSize: '100px 100px' }} />

      {/* Top gold line */}
      <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: '2px',
        background: 'linear-gradient(90deg,transparent,rgba(197,165,90,0.6) 25%,#C5A55A 50%,rgba(197,165,90,0.6) 75%,transparent)',
        boxShadow: '0 0 20px rgba(197,165,90,0.45),0 0 50px rgba(197,165,90,0.18)' }} />

      <MountainCanvas />

      {/* Darken lower mountain area */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '52%', pointerEvents: 'none',
        background: 'linear-gradient(to bottom,transparent,rgba(4,8,14,0.88))' }} />

      {/* Ghost text */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
        fontSize: 'clamp(5rem,18vw,18rem)', letterSpacing: '-0.04em',
        color: 'transparent', WebkitTextStroke: '1px rgba(197,165,90,0.038)',
        pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0,
      }}>ASCENT</div>

      {/* ── CONTENT ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 2, maxWidth: '820px', width: '100%', textAlign: 'center' }}
      >
        {/* Isotipo */}
        <motion.div variants={fadeIn} style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '200px', height: '200px',
            background: 'radial-gradient(ellipse,rgba(197,165,90,0.28) 0%,transparent 70%)',
            filter: 'blur(20px)',
          }} />
          <Isotipo size={90} style={{ position: 'relative', zIndex: 1 }} />
        </motion.div>


        {/* ── HEADLINE ── */}
        <motion.div variants={fadeUp}>

          {/* Setup line — Playfair italic, muted */}
          <p style={{
            fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(1rem,2vw,1.45rem)', color: 'rgba(220,215,205,0.55)',
            letterSpacing: '0.01em', lineHeight: 1.3, margin: '0 0 0.25rem 0',
          }}>
            ¿Cuántos eventos has asistido
          </p>

          {/* Impact line 1 — METALLIC GOLD */}
          <h1 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(2.8rem,6.8vw,5.8rem)', lineHeight: 0.93,
            letterSpacing: '-0.04em', margin: '0 0 0.1rem 0',
            textTransform: 'uppercase',
            /* Metallic multi-stop gradient */
            background: `linear-gradient(
              175deg,
              #5a3e10 0%,
              #c5a55a 12%,
              #f7e8b0 22%,
              #d4b86a 32%,
              #8a6520 42%,
              #c5a55a 52%,
              #f0d888 60%,
              #c5a55a 70%,
              #7a5818 80%,
              #d4ba7a 90%,
              #f7e8b0 100%
            )`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 28px rgba(197,165,90,0.45)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
          }}>
            Sin que nada
          </h1>

          {/* Impact line 2 — crisp white */}
          <h1 style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(2.8rem,6.8vw,5.8rem)', lineHeight: 0.93,
            letterSpacing: '-0.04em', margin: 0,
            color: '#FFFFFF', textTransform: 'uppercase',
            textShadow: '0 0 50px rgba(197,165,90,0.14), 0 2px 6px rgba(0,0,0,0.7)',
          }}>
            Cambiara?
          </h1>
        </motion.div>



        {/* Subheadline */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
          fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.8,
          color: '#FFFFFF', maxWidth: '540px', margin: '2.8rem auto 1.4rem',
        }}>
          ASCENT es un entrenamiento vivencial de negocios y liderazgo para fundadores, líderes
          y emprendedores que tienen algo serio en mente, y quieren avanzar con{' '}
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>claridad, un sistema</span>{' '}
          y el entorno que lo hace posible.
        </motion.p>

        {/* Bold statement — NO animation, Montserrat ExtraBold */}
        <motion.div variants={fadeUp} style={{ marginBottom: '2.4rem' }}>
          <p style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(0.92rem,1.45vw,1.1rem)',
            color: '#C5A55A',
            letterSpacing: '0.01em',
            lineHeight: 1.5,
            margin: 0,
            textTransform: 'none',
          }}>
            Dos días donde tomas las decisiones que llevas meses postergando, conoces personas
            que cambian el rango de lo que crees posible y sales con un plan que tiene fecha y nombre.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2.6rem' }}>
          <motion.a href="#aplicar" whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#04080E',
              background: 'linear-gradient(105deg,#D4BA7A 0%,#C5A55A 45%,#E8CC88 100%)',
              padding: '16px 44px', borderRadius: '1px', textDecoration: 'none',
              boxShadow: '0 0 40px rgba(197,165,90,0.5),0 0 80px rgba(197,165,90,0.2),inset 0 1px 0 rgba(255,255,255,0.2)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)', x: '-100%' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Quiero mi lugar en ASCENT</span>
            <svg style={{ position: 'relative', zIndex: 1 }} width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 7.5h11M9 3.5l4 4-4 4" stroke="#04080E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <a href="#que-es"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
              fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(197,165,90,0.55)', textDecoration: 'none', transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#C5A55A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(197,165,90,0.55)'}
          >
            Conoce cómo funciona primero
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2l4 4-4 4M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeIn} style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
          paddingTop: '1.6rem', borderTop: '1px solid rgba(197,165,90,0.1)',
        }}>
          {[
            { num: '2', label: 'Días intensivos' },
            { num: 'NEO', label: 'Nivel de entrada' },
            { num: '100%', label: 'Presencial' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '0 clamp(1.2rem,3.5vw,3rem)' }}>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                  fontSize: 'clamp(1.2rem,2.2vw,1.9rem)',
                  background: 'linear-gradient(135deg,#E8CC88,#C5A55A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.01em', lineHeight: 1.1,
                  filter: 'drop-shadow(0 0 10px rgba(197,165,90,0.4))',
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '9.5px',
                  letterSpacing: '0.18em', color: 'rgba(138,154,181,0.6)',
                  textTransform: 'uppercase', marginTop: '4px',
                }}>{stat.label}</div>
              </div>
              {i < 2 && <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom,transparent,rgba(197,165,90,0.25),transparent)', flexShrink: 0 }} />}
            </div>
          ))}
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 7, 0] }}
          transition={{ opacity: { delay: 2.6, duration: 0.8 }, y: { delay: 2.6, duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ marginTop: 'clamp(0.8rem,3vw,2rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
        >
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '8.5px', letterSpacing: '0.3em', color: 'rgba(197,165,90,0.25)', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom,rgba(197,165,90,0.45),transparent)' }} />
        </motion.div>

      </motion.div>
    </section>
  );
}
