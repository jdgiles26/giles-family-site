// GET  /api/memories                               -> { memories:[...], storage:true|false }
// POST /api/memories {passcode, name, about, text}  -> add a memory (family passcode required)
import { addMemory, listMemories, storageOn } from './_lib/store.js';
import { send, body, checkPass } from './_lib/http.js';
const clean = (s, n) => String(s || '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim().slice(0, n);
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') return send(res, 200, { memories: await listMemories(200), storage: storageOn });
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const b = await body(req, 20_000);
    const auth = await checkPass(req, b.passcode); if (!auth.ok) return send(res, auth.code, { error: auth.error });
    const text = clean(b.text, 1200), name = clean(b.name, 60) || 'A family member', about = clean(b.about, 40);
    if (text.length < 3) return send(res, 400, { error: 'Please write a memory first.' });
    if (about && !/^[a-z0-9_]{1,40}$/.test(about)) return send(res, 400, { error: 'Unknown person.' });
    const r = await addMemory({ name, about, text });
    return send(res, 200, { ok: true, ...r });
  } catch (e) { return send(res, e.code === 503 ? 503 : e.code === 413 ? 413 : 400, { error: e.code === 503 ? 'The Memory Wall isn’t switched on yet: the shared storage hasn’t been connected to this website, so your memory was not saved. Please copy it somewhere safe and try again later.' : 'Could not save that memory.' }); }
}
