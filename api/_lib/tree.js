// Validation + relationship bookkeeping for tree edits.
const STR = { name: 120, short: 40, years: 60, place: 200, birthPlace: 120, deathPlace: 120, role: 160, bio: 4000, badge: 60, photo: 400, img: 400, editor: 60 };
const clean = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
export function slug(name) { return (clean(name, 40).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'person') + '_' + Math.random().toString(36).slice(2, 6); }
export function sanitize(p, ids) {
  const o = { ...p }; for (const [k, n] of Object.entries(STR)) if (k in o) o[k] = clean(o[k], n);
  o.id = String(o.id || '').replace(/[^a-z0-9_]/gi, '').slice(0, 60);
  for (const k of ['parents', 'spouses', 'children']) o[k] = Array.isArray(o[k]) ? [...new Set(o[k].map(String))].filter((x) => x !== o.id && (!ids || ids.has(x))) : [];
  o.parents = o.parents.slice(0, 2);
  o.facts = Array.isArray(o.facts) ? o.facts.map((f) => clean(f, 300)).filter(Boolean).slice(0, 30) : [];
  for (const k of ['born', 'died', 'gen']) { if (o[k] === '' || o[k] == null) delete o[k]; else { const v = parseInt(o[k], 10); if (Number.isFinite(v)) o[k] = v; else delete o[k]; } }
  o.sex = o.sex === 'F' ? 'F' : o.sex === 'M' ? 'M' : 'U'; o.living = !!o.living; o.married = !!o.married; o.line = !!o.line;
  if (o.photo && !/^(https:\/\/[a-z0-9.-]+\.public\.blob\.vercel-storage\.com\/|\/api\/photo\?)/.test(o.photo)) delete o.photo;
  if (o.img && !/^assets\//.test(o.img)) delete o.img;
  if (!o.short) o.short = o.name.split(/\s+/)[0] || o.name;
  if (o.living) { for (const k of ['born', 'died', 'years', 'place', 'birthPlace', 'deathPlace']) delete o[k]; }
  return o;
}
// Apply one operation to the people list. Returns { people, summary }.
export function apply(people, op) {
  const byId = new Map(people.map((p) => [p.id, { ...p }]));
  const link = () => {
    // spouses symmetric; children lists derived from parents (keeping existing order)
    for (const p of byId.values()) p.spouses = (p.spouses || []).filter((s) => byId.has(s));
    for (const p of byId.values()) for (const s of p.spouses) { const q = byId.get(s); if (!q.spouses.includes(p.id)) q.spouses.push(p.id); }
    for (const p of byId.values()) { p.parents = (p.parents || []).filter((x) => byId.has(x)); }
    for (const p of byId.values()) { const kids = [...byId.values()].filter((c) => c.parents.includes(p.id)).map((c) => c.id); p.children = (p.children || []).filter((c) => kids.includes(c)).concat(kids.filter((c) => !(p.children || []).includes(c))); }
  };
  let summary = '';
  if (op.op === 'upsert') {
    const isNew = !op.person.id || !byId.has(op.person.id);
    const raw = { ...op.person }; if (isNew) raw.id = slug(raw.name);
    const ids = new Set([...byId.keys(), raw.id]);
    const p = sanitize(raw, ids); if (!p.name) throw Object.assign(new Error('Please give the person a name.'), { code: 400 });
    const prev = byId.get(p.id) || {};
    // children chosen in the form become those children's parents
    const wantKids = new Set(p.children);
    for (const q of byId.values()) {
      if (q.id === p.id) continue;
      if (wantKids.has(q.id) && !q.parents.includes(p.id)) { if (q.parents.length >= 2) q.parents = q.parents.slice(0, 1); q.parents = q.parents.concat(p.id); }
      if (!wantKids.has(q.id) && q.parents.includes(p.id)) q.parents = q.parents.filter((x) => x !== p.id);
      if (!p.spouses.includes(q.id) && (q.spouses || []).includes(p.id)) q.spouses = q.spouses.filter((x) => x !== p.id);
    }
    // a person with no parents in the tree but a spouse in it hangs off the spouse's card
    if (!p.parents.length && p.spouses.length && p.id !== 'elijah') p.married = true; else if (p.parents.length) p.married = false;
    const merged = { ...prev, ...p, children: p.children };
    for (const k of ['born', 'died', 'years', 'place', 'birthPlace', 'deathPlace', 'photo']) if ((p.living && k !== 'photo') || (k in raw && !(k in p))) delete merged[k];
    byId.set(p.id, merged);
    summary = (isNew ? 'Added ' : 'Edited ') + p.name; op.person.id = p.id;
  } else if (op.op === 'delete') {
    const p = byId.get(op.id); if (!p) throw Object.assign(new Error('Not found'), { code: 404 });
    if (op.id === 'elijah') throw Object.assign(new Error('Elijah is the root of the tree and can’t be deleted.'), { code: 400 });
    byId.delete(op.id); summary = 'Deleted ' + p.name;
  } else throw Object.assign(new Error('Unknown operation'), { code: 400 });
  link();
  return { people: [...byId.values()], summary };
}
