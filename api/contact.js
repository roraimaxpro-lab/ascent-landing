import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, challenge } = req.body;

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

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `Nueva aplicación ASCENT NEO — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#0B1624;color:#FFFFFF;padding:40px;max-width:600px;margin:0 auto;border-radius:8px;">
          <div style="border-bottom:3px solid #C5A55A;padding-bottom:20px;margin-bottom:30px;">
            <h1 style="color:#C5A55A;font-size:22px;margin:0;letter-spacing:0.1em;text-transform:uppercase;">ASCENT</h1>
            <p style="color:#8A9AB5;font-size:11px;margin:8px 0 0;letter-spacing:0.2em;text-transform:uppercase;">Nueva solicitud · NEO</p>
          </div>

          <div style="background:#132238;border:1px solid rgba(197,165,90,0.2);border-radius:6px;padding:24px;margin-bottom:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 16px 10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;width:130px;vertical-align:top;">Nombre</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#FFFFFF;font-size:14px;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px 10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;">Correo</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#C5A55A;font-size:14px;">${email}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px 10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;">Dedicación</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(197,165,90,0.1);color:#FFFFFF;font-size:14px;">${business}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px 10px 0;color:#8A9AB5;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;">Reto principal</td>
                <td style="padding:10px 0;color:#FFFFFF;font-size:14px;line-height:1.7;">${challenge}</td>
              </tr>
            </table>
          </div>

          <p style="color:#8A9AB5;font-size:11px;text-align:center;margin:0;letter-spacing:0.1em;">
            ASCENT · Sistema de aplicaciones · ${fecha}
          </p>
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
}
