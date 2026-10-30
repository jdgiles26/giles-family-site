// GET  /api/history                       -> recent change log (who / what / when)
// POST /api/history {passcode, editor, version} -> restore that version (saved as a new version, so restores are undoable too)
import { history, getVersion, save, current } from './_lib/store.js';
import { send, body, checkPass } from './_lib/http.js';
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') return send(res, 200, { history: await history(40) });
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const b = await body(req); const auth = await checkPass(req, b.passcode); if (!auth.ok) return send(res, auth.code, { error: auth.error });
    let people, label;
    if (b.version === 'seed') { const { default: fs } = await import('node:fs'); people = JSON.parse(fs.readFileSync(new URL('./_lib/seed.json', import.meta.url), 'utf8')).people; label = 'the original tree'; }
    else { const d = await getVersion(String(b.version || '')); people = d.people; label = 'the version from ' + (d.meta && d.meta.at ? d.meta.at.slice(0, 16).replace('T', ' ') + ' UTC' : b.version); }
    const editor = String(b.editor || '').trim().slice(0, 60) || 'A family member';
    const v = await save(people, { editor, summary: 'Restored ' + label, op: 'restore', restoredFrom: b.version });
    return send(res, 200, { ok: true, version: v.version });
  } catch (e) { return send(res, e.code === 503 ? 503 : 400, { error: e.code === 503 ? e.message : 'Could not restore that version.' }); }
}
