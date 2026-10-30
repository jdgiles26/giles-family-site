// POST /api/photo {passcode, data: 'data:image/jpeg;base64,...'} -> {url}. The browser resizes to <=1000px first; server caps at 1.5 MB, JPEG only.
import { putPhoto, readLocalPhoto, isLocal } from './_lib/store.js';
import { send, body, checkPass } from './_lib/http.js';
export default async function handler(req, res) {
  try {
    if (req.method === 'GET' && isLocal) { const u = new URL(req.url, 'http://x'); const buf = readLocalPhoto(u.searchParams.get('local') || ''); if (!buf) return send(res, 404, { error: 'not found' }); res.setHeader('Content-Type', 'image/jpeg'); return res.end(buf); }
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const b = await body(req, 2_500_000); const auth = await checkPass(req, b.passcode); if (!auth.ok) return send(res, auth.code, { error: auth.error });
    const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(b.data || '')); if (!m) return send(res, 400, { error: 'Please choose a photo (JPEG, PNG or similar).' });
    const buf = Buffer.from(m[1], 'base64');
    if (buf.length > 1_500_000) return send(res, 413, { error: 'That photo is too big even after shrinking. Try a smaller one.' });
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return send(res, 400, { error: 'That file doesn’t look like a photo.' });
    return send(res, 200, { ok: true, url: await putPhoto(buf) });
  } catch (e) { return send(res, e.code === 413 || e.code === 503 ? e.code : 500, { error: e.code === 503 ? e.message : e.code === 413 ? 'That photo is too big.' : 'Upload failed — please try again.' }); }
}
