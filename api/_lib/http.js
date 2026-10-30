import crypto from 'node:crypto';
export function send(res, code, obj, headers = {}) {
  res.statusCode = code; res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', headers['Cache-Control'] || 'no-store');
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(obj));
}
export async function body(req, max = 3_000_000) {
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = []; let n = 0;
  for await (const c of req) { n += c.length; if (n > max) throw Object.assign(new Error('too large'), { code: 413 }); chunks.push(c); }
  const s = Buffer.concat(chunks).toString('utf8'); return s ? JSON.parse(s) : {};
}
// Passcode check with per-IP rate limiting (5 wrong tries per 15 minutes per server instance) and a delay on failure.
const fails = new Map();
const ipOf = (req) => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '?').split(',')[0].trim();
export async function checkPass(req, given) {
  const ip = ipOf(req), now = Date.now(); const f = (fails.get(ip) || []).filter((t) => now - t < 15 * 60e3);
  if (f.length >= 5) return { ok: false, code: 429, error: 'Too many wrong passcodes. Please wait 15 minutes and try again.' };
  const real = process.env.FAMILY_PASSCODE || '';
  const norm = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, '-');
  const a = crypto.createHash('sha256').update(norm(given)).digest(), b = crypto.createHash('sha256').update(norm(real)).digest();
  if (real && crypto.timingSafeEqual(a, b)) { fails.delete(ip); return { ok: true }; }
  f.push(now); fails.set(ip, f); await new Promise((r) => setTimeout(r, 700));
  return { ok: false, code: real ? 401 : 503, error: real ? 'That passcode isn’t right. Check with the family and try again.' : 'Editing is not set up yet (no passcode configured).' };
}
