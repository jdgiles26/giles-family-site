/* Shared family tree: loads the latest saved tree from /api/tree, then starts the page scripts.
   If the API can't be reached (offline, opened from disk, outage) the bundled data in data.js is used. */
(function () {
  const bundled = window.FAMILY;
  function build(people) {
    const P = people.map((p) => Object.assign({ parents: [], spouses: [], facts: [], living: false, children: [] }, p));
    const byId = {}; P.forEach((p) => (byId[p.id] = p));
    P.forEach((p) => { p.parents = p.parents.filter((x) => byId[x]); p.spouses = p.spouses.filter((x) => byId[x]); });
    P.forEach((p) => { const kids = P.filter((c) => c.parents.includes(p.id)).map((c) => c.id); p.children = (p.children || []).filter((c) => kids.includes(c)).concat(kids.filter((c) => !(p.children || []).includes(c))); });
    // generation for newly added people: parent + 1, else spouse, else child - 1
    for (let pass = 0; pass < 6; pass++) P.forEach((p) => {
      if (p.gen) return; const pg = p.parents.map((x) => byId[x].gen).filter(Boolean);
      if (pg.length) p.gen = Math.max(...pg) + 1; else { const sg = p.spouses.map((x) => byId[x].gen).find(Boolean); if (sg) p.gen = sg; else { const cg = p.children.map((x) => byId[x].gen).filter(Boolean); if (cg.length) p.gen = Math.min(...cg) - 1; } }
    });
    P.forEach((p) => { if (!p.gen) p.gen = 7; if (!p.short) p.short = (p.name || '?').split(' ')[0]; if (p.living) { delete p.years; delete p.place; } });
    return { people: P, byId };
  }
  window.FamilySync = { build, bundled, version: null, source: 'bundled' };
  function start() {
    const queue = [...document.querySelectorAll('script[type="family/deferred"]')];
    (function next() {
      const old = queue.shift(); if (!old) { document.dispatchEvent(new Event('familyready')); return; }
      const s = document.createElement('script');
      if (old.dataset.src) { s.src = old.dataset.src; s.onload = next; s.onerror = next; old.after(s); }
      else { s.textContent = old.textContent; old.after(s); next(); }
    })();
  }
  let fresh = false; try { fresh = sessionStorage.getItem('familyFresh') === '1'; sessionStorage.removeItem('familyFresh'); } catch (e) {}
  if (location.protocol === 'file:') { start(); return; }
  const ctl = 'AbortController' in window ? new AbortController() : null; const timer = setTimeout(() => ctl && ctl.abort(), 5000);
  fetch('/api/tree' + (fresh ? '?t=' + Date.now() : ''), { signal: ctl && ctl.signal, headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { if (d && Array.isArray(d.people) && d.people.length) { window.FAMILY = build(d.people); window.FamilySync.version = d.version; window.FamilySync.source = 'shared'; } })
    .catch(() => {})
    .finally(() => { clearTimeout(timer); start(); });
})();
