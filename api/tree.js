// GET  /api/tree            -> { version, people, source }
// POST /api/tree {passcode, editor, base, op:'upsert'|'delete', person|id} -> saves a new version
import { current, save } from './_lib/store.js';
import { send, body, checkPass } from './_lib/http.js';
import { apply } from './_lib/tree.js';
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') { const c = await current(); return send(res, 200, { ...c, source: 'shared', storage: process.env.BLOB_READ_WRITE_TOKEN || !process.env.VERCEL ? 'ready' : 'not-connected' }, { 'Cache-Control': 'public, max-age=0, s-maxage=10, stale-while-revalidate=30' }); }
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
    const b = await body(req); const auth = await checkPass(req, b.passcode); if (!auth.ok) return send(res, auth.code, { error: auth.error });
    const cur = await current();
    if (b.base && b.base !== cur.version) return send(res, 409, { error: 'Someone else saved a change a moment ago. Your page will refresh — please make your edit again.', version: cur.version });
    const { people, summary } = apply(cur.people, b);
    const editor = String(b.editor || '').trim().slice(0, 60) || 'A family member';
    const v = await save(people, { editor, summary, op: b.op, person: b.op === 'delete' ? b.id : b.person && b.person.id });
    return send(res, 200, { ok: true, version: v.version, summary, id: b.person && b.person.id, people });
  } catch (e) { return send(res, e.code && e.code < 600 ? e.code : 500, { error: e.code ? e.message : 'Something went wrong saving. Please try again.' }); }
}
