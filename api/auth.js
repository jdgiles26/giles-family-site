// POST /api/auth {passcode} -> {ok:true} or 401/429. Lets the editor confirm the passcode before showing forms.
import { send, body, checkPass } from './_lib/http.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  try { const b = await body(req); const a = await checkPass(req, b.passcode); return a.ok ? send(res, 200, { ok: true }) : send(res, a.code === 401 ? 200 : a.code, { ok: false, error: a.error }); }
  catch (e) { return send(res, 400, { error: 'Bad request' }); }
}
