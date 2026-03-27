// LOCAL DEVELOPMENT ONLY — this server is not used on Vercel.
// In production, /api/contact is handled by api/contact.js (Vercel serverless function).
// To run locally: npm run dev:full
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, business, challenge } = req.body;

  if (!name || !email || !business || !challenge) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Correo electrónico inválido.' });
  }

  const fecha = new Date().toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const phoneBlock = phone ? `
    <div style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);">
      <div style="color:#8A9AB5;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">TELÉFONO</div>
      <div style="color:#FFFFFF;font-size:15px;">${phone}</div>
    </div>` : '';

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `Nueva aplicación ASCENT NEO — ${name}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#080E18;padding:0;max-width:600px;margin:0 auto;">

          <!-- Top bar -->
          <div style="height:3px;background:linear-gradient(90deg,#C5A55A,#E8CC88,rgba(197,165,90,0.3));"></div>

          <!-- Header -->
          <div style="background:#0B1624;text-align:center;padding:40px 40px 24px;">
            <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:800;color:#C5A55A;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">ASCENT</div>
            <div style="font-size:10px;color:#8A9AB5;letter-spacing:0.3em;text-transform:uppercase;">Business Growth Bootcamp</div>
            <div style="width:80px;height:1px;background:linear-gradient(90deg,transparent,#C5A55A,transparent);margin:20px auto 0;"></div>
            <div style="font-size:11px;color:#8A9AB5;letter-spacing:0.25em;text-transform:uppercase;margin-top:16px;">Ecosistema Privado de Negocios</div>
          </div>

          <!-- Body -->
          <div style="background:#0B1624;padding:0 20px 40px;">

            <!-- Badge -->
            <div style="text-align:center;margin-bottom:24px;">
              <span style="display:inline-block;background:rgba(197,165,90,0.12);border:1px solid rgba(197,165,90,0.35);border-radius:20px;padding:8px 22px;color:#C5A55A;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
                ◆ Nueva Aplicación ◆
              </span>
            </div>

            <!-- Heading -->
            <h2 style="color:#FFFFFF;font-size:22px;font-weight:700;text-align:center;margin:0 0 10px;line-height:1.3;">${name} ha aplicado.</h2>
            <p style="color:#8A9AB5;font-size:13px;line-height:1.7;text-align:center;margin:0 0 32px;">
              Nueva solicitud recibida para el ecosistema privado ASCENT — revisa los detalles del aplicante a continuación.
            </p>

            <!-- Details card -->
            <div style="background:#132238;border:1px solid rgba(197,165,90,0.15);border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <div style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);">
                <div style="color:#8A9AB5;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">NOMBRE</div>
                <div style="color:#FFFFFF;font-size:15px;font-weight:600;">${name}</div>
              </div>
              <div style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);">
                <div style="color:#8A9AB5;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">CORREO</div>
                <div style="font-size:15px;word-break:break-all;"><a href="mailto:${email}" style="color:#C5A55A;text-decoration:none;">${email}</a></div>
              </div>
              ${phoneBlock}
              <div style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);">
                <div style="color:#8A9AB5;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">DEDICACIÓN</div>
                <div style="color:#FFFFFF;font-size:15px;">${business}</div>
              </div>
              <div style="padding:14px 20px;">
                <div style="color:#8A9AB5;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">RETO PRINCIPAL</div>
                <div style="color:#FFFFFF;font-size:15px;line-height:1.6;">${challenge}</div>
              </div>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:28px;">
              <a href="mailto:${email}?subject=Re: Tu aplicación a ASCENT NEO" style="display:inline-block;background:linear-gradient(135deg,#D4BA7A,#C5A55A,#E8CC88);color:#0B1624;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:14px 36px;border-radius:4px;text-decoration:none;">
                Responder al Aplicante
              </a>
            </div>

            <!-- Security note -->
            <div style="background:rgba(197,165,90,0.06);border:1px solid rgba(197,165,90,0.12);border-radius:6px;padding:14px 18px;">
              <p style="color:#8A9AB5;font-size:11px;line-height:1.6;margin:0;">
                <span style="color:#C5A55A;">🔒</span> <strong style="color:#FFFFFF;">Nota:</strong> Esta solicitud fue enviada desde el formulario de aplicación de ascent-landing. Puedes responder directamente al correo del aplicante.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#080E18;padding:20px 40px;text-align:center;border-top:1px solid rgba(197,165,90,0.1);">
            <p style="color:#8A9AB5;font-size:10px;letter-spacing:0.12em;margin:0;">
              ASCENT · Sistema de aplicaciones · ${fecha}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar la solicitud. Intenta nuevamente.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.listen(PORT, () => {
  console.log(`ASCENT API server → http://localhost:${PORT}`);
});
