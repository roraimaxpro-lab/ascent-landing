import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, business, challenge } = req.body;

  if (!name || !email || !business || !challenge) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Correo electr\u00f3nico inv\u00e1lido.' });
  }

  const fecha = new Date().toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const phoneRow = phone ? `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">TEL&Eacute;FONO</td>
      <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#FFFFFF;font-size:14px;text-align:right;">${phone}</td>
    </tr>` : '';

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `Nueva aplicaci\u00f3n ASCENT NEO \u2014 ${name}`,
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
          <div style="background:#0B1624;padding:0 40px 40px;">

            <!-- Badge -->
            <div style="text-align:center;margin-bottom:24px;">
              <span style="display:inline-block;background:rgba(197,165,90,0.12);border:1px solid rgba(197,165,90,0.35);border-radius:20px;padding:8px 22px;color:#C5A55A;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
                &#9670; Nueva Aplicaci&oacute;n &#9670;
              </span>
            </div>

            <!-- Heading -->
            <h2 style="color:#FFFFFF;font-size:22px;font-weight:700;text-align:center;margin:0 0 10px;line-height:1.3;">${name} ha aplicado.</h2>
            <p style="color:#8A9AB5;font-size:13px;line-height:1.7;text-align:center;margin:0 0 32px;">
              Nueva solicitud recibida para el ecosistema privado ASCENT &mdash; revisa los detalles del aplicante a continuaci&oacute;n.
            </p>

            <!-- Details card -->
            <div style="background:#132238;border:1px solid rgba(197,165,90,0.15);border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">NOMBRE</td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#FFFFFF;font-size:14px;text-align:right;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">CORREO</td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#C5A55A;font-size:14px;text-align:right;">
                    <a href="mailto:${email}" style="color:#C5A55A;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                ${phoneRow}
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#8A9AB5;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">DEDICACI&Oacute;N</td>
                  <td style="padding:14px 20px;border-bottom:1px solid rgba(197,165,90,0.1);color:#FFFFFF;font-size:14px;text-align:right;">${business}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;color:#8A9AB5;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">RETO PRINCIPAL</td>
                  <td style="padding:14px 20px;color:#FFFFFF;font-size:14px;text-align:right;line-height:1.6;">${challenge}</td>
                </tr>
              </table>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:28px;">
              <a href="mailto:${email}?subject=Re: Tu aplicaci%C3%B3n a ASCENT NEO" style="display:inline-block;background:linear-gradient(135deg,#D4BA7A,#C5A55A,#E8CC88);color:#0B1624;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:14px 36px;border-radius:4px;text-decoration:none;">
                Responder al Aplicante
              </a>
            </div>

            <!-- Security note -->
            <div style="background:rgba(197,165,90,0.06);border:1px solid rgba(197,165,90,0.12);border-radius:6px;padding:14px 18px;">
              <p style="color:#8A9AB5;font-size:11px;line-height:1.6;margin:0;">
                <span style="color:#C5A55A;">&#128274;</span> <strong style="color:#FFFFFF;">Nota:</strong> Esta solicitud fue enviada desde el formulario de aplicaci&oacute;n de ascent-landing. Puedes responder directamente al correo del aplicante.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#080E18;padding:20px 40px;text-align:center;border-top:1px solid rgba(197,165,90,0.1);">
            <p style="color:#8A9AB5;font-size:10px;letter-spacing:0.12em;margin:0;">
              ASCENT &middot; Sistema de aplicaciones &middot; ${fecha}
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
}
