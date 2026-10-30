// Storage: Vercel Blob in production (BLOB_READ_WRITE_TOKEN), local folder for dev (LOCAL_STORE_DIR).
// Versions are immutable files named with an inverted timestamp so the newest sorts first.
import fs from 'node:fs'; import path from 'node:path';
const LOCAL = !process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL;
const NOSTORE = !process.env.BLOB_READ_WRITE_TOKEN && !!process.env.VERCEL;
const noStore = () => Object.assign(new Error('Saving isn’t switched on yet: the shared storage hasn’t been connected to this website. The tree below is the built-in copy.'), { code: 503 });
const DIR = process.env.LOCAL_STORE_DIR || '/tmp/giles-store';
let blob = null; async function B() { if (!blob) blob = await import('@vercel/blob'); return blob; }
const MAXT = 9999999999999;
export const newKey = () => String(MAXT - Date.now()).padStart(13, '0') + '-' + Math.random().toString(36).slice(2, 8);
export const keyTime = (k) => MAXT - parseInt(k, 10);

async function putJSON(p, obj) {
  if (NOSTORE) throw noStore();
  const body = JSON.stringify(obj);
  if (LOCAL) { const f = path.join(DIR, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, body); return; }
  const { put } = await B(); await put(p, body, { access: 'public', contentType: 'application/json', addRandomSuffix: false, cacheControlMaxAge: 31536000 });
}
async function listKeys(prefix, limit) {
  if (NOSTORE) return [];
  if (LOCAL) { const d = path.join(DIR, prefix); if (!fs.existsSync(d)) return []; return fs.readdirSync(d).sort().slice(0, limit).map((n) => ({ key: n.replace(/\.json$/, ''), url: 'file:' + path.join(d, n) })); }
  const { list } = await B(); const r = await list({ prefix: prefix + '/', limit });
  return r.blobs.sort((a, b) => (a.pathname < b.pathname ? -1 : 1)).map((b) => ({ key: b.pathname.slice(prefix.length + 1).replace(/\.json$/, ''), url: b.url }));
}
async function getJSON(url) {
  if (url.startsWith('file:')) return JSON.parse(fs.readFileSync(url.slice(5), 'utf8'));
  const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error('blob read ' + r.status); return r.json();
}
export async function current() {
  const [top] = await listKeys('tree/v', 1);
  if (!top) { const seed = JSON.parse(fs.readFileSync(new URL('./seed.json', import.meta.url), 'utf8')); return { version: 'seed', people: seed.people }; }
  const d = await getJSON(top.url); return { version: top.key, people: d.people };
}
export async function save(people, meta) {
  const key = newKey(); const at = new Date().toISOString();
  await putJSON(`tree/v/${key}.json`, { people, meta: { ...meta, at } });
  await putJSON(`tree/m/${key}.json`, { ...meta, at, version: key, count: people.length });
  return { version: key, at };
}
export async function history(limit = 40) {
  const ks = await listKeys('tree/m', limit);
  const out = await Promise.all(ks.map((k) => getJSON(k.url).catch(() => ({ version: k.key }))));
  return out.map((m, i) => ({ ...m, version: ks[i].key, at: m.at || new Date(keyTime(ks[i].key)).toISOString() }));
}
export async function getVersion(key) {
  if (!/^[0-9]{13}-[a-z0-9]{1,8}$/.test(key)) throw new Error('bad version');
  if (LOCAL) return getJSON('file:' + path.join(DIR, 'tree/v', key + '.json'));
  const { head } = await B(); const h = await head(`tree/v/${key}.json`); return getJSON(h.url);
}
export async function putPhoto(buf) {
  if (NOSTORE) throw noStore();
  const name = `photos/${newKey()}.jpg`;
  if (LOCAL) { const f = path.join(DIR, name); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, buf); return '/api/photo?local=' + encodeURIComponent(name); }
  const { put } = await B(); const r = await put(name, buf, { access: 'public', contentType: 'image/jpeg', addRandomSuffix: true }); return r.url;
}
export function readLocalPhoto(name) { if (!/^photos\/[0-9a-z-]+\.jpg$/.test(name)) return null; const f = path.join(DIR, name); return fs.existsSync(f) ? fs.readFileSync(f) : null; }
export const isLocal = LOCAL;

// ---------- Memory Wall ----------
// Each memory is its own immutable JSON file under memories/, newest first.
export async function addMemory(m) {
  const key = newKey(); const at = new Date().toISOString();
  await putJSON(`memories/${key}.json`, { ...m, at, id: key });
  return { id: key, at };
}
export async function listMemories(limit = 200) {
  const ks = await listKeys('memories', limit);
  const out = await Promise.all(ks.map((k) => getJSON(k.url).catch(() => null)));
  return out.filter(Boolean);
}
export const storageOn = !NOSTORE;
