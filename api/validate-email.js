import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ valid: false });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ valid: false, reason: 'format' });
  }

  const domain = email.split('@')[1];

  try {
    const records = await resolveMx(domain);
    if (records && records.length > 0) {
      return res.json({ valid: true });
    }
    return res.json({ valid: false, reason: 'domain' });
  } catch {
    return res.json({ valid: false, reason: 'domain' });
  }
}
