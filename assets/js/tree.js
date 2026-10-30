(function () {
  const { $, $$, esc, reduce } = window.G, F = window.FAMILY, T = window.TreeCore;
  const stage = $('#stage'), svg = $('#tree-svg'), vp = $('#viewport'), fan = $('#fan-svg');
  const collapsed = new Set(); let L = null, k = 1, tx = 0, ty = 0, lineOn = false, hotPath = null;
  const GEN = { 1: 'Elijah', 2: 'James W.', 3: 'Preston', 4: 'Luther', 5: 'William Cecil', 6: 'Hershel', 7: 'Joshua' };
  const GENWORD = { 1: '4th-great-grandfather', 2: '3rd-great-grandfather', 3: 'great-great-grandfather', 4: 'great-grandfather', 5: 'grandfather', 6: 'father', 7: 'Joshua himself' };

  function apply() { vp.style.transform = `translate(${tx}px,${ty}px) scale(${k})`; vp.style.transformOrigin = '0 0'; }
  function draw() {
    L = T.layout(collapsed);
    vp.innerHTML = T.render(L, { toggles: true, collapsed });
    if (hotPath) markPath(hotPath, false);
    svg.classList.toggle('dim', lineOn || !!hotPath);
  }
  function fit(anim = true) {
    const r = stage.getBoundingClientRect(), b = L.bounds; const w = b.x1 - b.x0, h = b.y1 - b.y0;
    k = Math.min(r.width / w, r.height / h, 1.1); tx = (r.width - w * k) / 2 - b.x0 * k; ty = Math.max(10, (r.height - h * k) / 2) - b.y0 * k;
    if (!anim) stage.classList.add('wheeling'); apply(); if (!anim) requestAnimationFrame(() => stage.classList.remove('wheeling'));
  }
  function zoomAt(f, cx, cy) { const nk = Math.max(0.12, Math.min(2.6, k * f)); tx = cx - (cx - tx) * (nk / k); ty = cy - (cy - ty) * (nk / k); k = nk; apply(); }
  function centerOn(id, zoom) {
    // expand ancestors if collapsed
    let changed = false; const up = (x) => (F.byId[x].parents || []).forEach((p) => { if (collapsed.delete(p)) changed = true; up(p); }); up(id); if (changed) draw();
    const n = L.nodes.find((q) => q.id === id); if (!n) return;
    const r = stage.getBoundingClientRect(); k = zoom || Math.max(k, 0.9); tx = r.width / 2 - n.x * k; ty = r.height / 2 - (n.y + T.CH / 2) * k; apply();
    const g = vp.querySelector(`.node[data-id="${id}"]`); if (g) { g.classList.remove('pulse'); void g.getBBox(); g.classList.add('pulse'); }
    setMeter(F.byId[id]);
  }
  window.treeCenterOn = centerOn;

  /* ---------- Pan / zoom input ---------- */
  const fanOn = () => !fan.hasAttribute('hidden');
  const pts = new Map(); let moved = 0, last = null, pinch0 = null;
  let downT = null;
  stage.addEventListener('pointerdown', (e) => { if (fanOn()) return; downT = e.target; stage.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = 0; last = { x: e.clientX, y: e.clientY }; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), k }; } stage.classList.add('drag'); $('#hint').style.opacity = 0; });
  stage.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinch0) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); const r = stage.getBoundingClientRect(); zoomAt((pinch0.k * d / pinch0.d) / k, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); moved += 10; return; }
    const dx = e.clientX - last.x, dy = e.clientY - last.y; moved += Math.abs(dx) + Math.abs(dy); last = { x: e.clientX, y: e.clientY }; tx += dx; ty += dy; apply();
  });
  const end = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = null; if (!pts.size) { stage.classList.remove('drag'); if (e.type === 'pointerup' && moved <= 6 && downT) tap(downT); downT = null; } };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  let wt; stage.addEventListener('wheel', (e) => { if (fanOn()) return; e.preventDefault(); stage.classList.add('wheeling'); clearTimeout(wt); wt = setTimeout(() => stage.classList.remove('wheeling'), 150); const r = stage.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  stage.addEventListener('keydown', (e) => {
    if (e.target !== stage) return; const s = 60; const r = stage.getBoundingClientRect();
    if (e.key === 'ArrowLeft') tx += s; else if (e.key === 'ArrowRight') tx -= s; else if (e.key === 'ArrowUp') ty += s; else if (e.key === 'ArrowDown') ty -= s;
    else if (e.key === '+' || e.key === '=') return zoomAt(1.2, r.width / 2, r.height / 2); else if (e.key === '-') return zoomAt(1 / 1.2, r.width / 2, r.height / 2); else return; e.preventDefault(); apply();
  });
  $('#z-in').onclick = () => { const r = stage.getBoundingClientRect(); zoomAt(1.3, r.width / 2, r.height / 2); };
  $('#z-out').onclick = () => { const r = stage.getBoundingClientRect(); zoomAt(1 / 1.3, r.width / 2, r.height / 2); };
  $('#z-fit').onclick = () => fit();

  /* ---------- Node interactions ---------- */
  let tapAt = 0;
  // after a touch tap opens a card, the browser's follow-up click must not land on (and close) the new modal
  document.addEventListener('click', (e) => { if (Date.now() - tapAt < 500 && e.target.closest && e.target.closest('.modal')) { e.stopPropagation(); e.preventDefault(); } }, true);
  function tap(target) {
    if (!target || !target.closest || !vp.contains(target)) return; tapAt = Date.now();
    const t = target.closest('[data-toggle]'); if (t) { const id = t.dataset.toggle; collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id); draw(); setTimeout(() => centerOn(id, k), 30); return; }
    const sp = target.closest('.sp[data-person]'); if (sp) { window.openProfile(sp.dataset.person); return; }
    const n = target.closest('.node'); if (n) window.openProfile(n.dataset.id);
  }
  // pointer capture retargets click events to the stage, so taps are handled on pointerup; this stops the global [data-person] handler double-firing
  vp.addEventListener('click', (e) => { if (e.target.closest('[data-person],[data-toggle],.node')) { e.stopPropagation(); e.preventDefault(); } }, true);
  vp.addEventListener('keydown', (e) => { if (e.key !== 'Enter' && e.key !== ' ') return; const t = e.target.closest('[data-toggle]'); if (t) { e.preventDefault(); const id = t.dataset.toggle; collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id); draw(); const nt = vp.querySelector(`[data-toggle="${id}"]`); nt && nt.focus(); return; } const n = e.target.closest('.node'); if (n) { e.preventDefault(); window.openProfile(n.dataset.id); } });
  vp.addEventListener('mouseover', (e) => { const n = e.target.closest('.node'); if (n) setMeter(F.byId[n.dataset.id]); });
  vp.addEventListener('focusin', (e) => { const n = e.target.closest('.node'); if (n) setMeter(F.byId[n.dataset.id]); });
  // Stop modal chips (data-person inside svg cards) from double handling
  vp.querySelectorAll && null;

  /* ---------- Generation meter ---------- */
  const meter = $('#gen-meter');
  meter.innerHTML = Object.keys(GEN).map((g) => `<button class="pip" data-g="${g}" type="button"><b>${g}</b>${GEN[g]}</button>`).join('') + '<div class="readout" id="readout">Elijah to Joshua: seven generations, father to son. Hover any card to see where it sits.</div>';
  function setMeter(p) {
    if (!p) return; $$('.pip', meter).forEach((x) => x.classList.toggle('on', +x.dataset.g === p.gen));
    const rel = p.id === 'joshua' ? 'Joshua himself' : (window.relate('joshua', p.id) || {}).word;
    $('#readout').textContent = `Generation ${p.gen} of 7 · ${p.name}${rel ? ' — Joshua’s ' + rel : ''}`.replace('Joshua’s Joshua himself', 'that’s Joshua');
  }
  meter.addEventListener('click', (e) => { const b = e.target.closest('.pip'); if (!b) return; const lineIds = { 1: 'elijah', 2: 'jamesw', 3: 'preston', 4: 'luther', 5: 'william', 6: 'hershel', 7: 'joshua' }; showTree(); centerOn(lineIds[b.dataset.g], 1); });

  /* ---------- Toolbar ---------- */
  $('#t-line').onclick = (e) => { lineOn = !lineOn; e.currentTarget.setAttribute('aria-pressed', lineOn); hotPath = null; draw(); window.toast(lineOn ? 'Showing Joshua’s direct line' : 'Showing everyone'); };
  let compact = false;
  $('#t-collapse').onclick = (e) => {
    compact = !compact; collapsed.clear();
    if (compact) F.people.forEach((p) => { if (!p.line && T.bloodKids(p.id).length && p.id !== 'jwash' && p.id !== 'frank') collapsed.add(p.id); });
    e.currentTarget.textContent = compact ? 'Expand all' : 'Collapse branches'; draw(); fit();
  };
  $('#t-svg').onclick = () => { const blob = new Blob([T.posterSVG()], { type: 'image/svg+xml' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'giles-family-tree-poster.svg'; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); window.toast('Poster downloaded — print it big!'); };

  /* ---------- View toggle (tree / fan) ---------- */
  function showTree() { fan.setAttribute('hidden', ''); svg.removeAttribute('hidden'); $('#v-tree').setAttribute('aria-pressed', 'true'); $('#v-fan').setAttribute('aria-pressed', 'false'); stage.style.cursor = ''; }
  function showFan() { svg.setAttribute('hidden', ''); fan.removeAttribute('hidden'); $('#v-tree').setAttribute('aria-pressed', 'false'); $('#v-fan').setAttribute('aria-pressed', 'true'); fan.innerHTML = T.fanSVG(900); stage.style.cursor = 'default'; $('#hint').style.opacity = 0; }
  $('#v-tree').onclick = showTree; $('#v-fan').onclick = showFan;
  fan.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset.person) { e.preventDefault(); window.openProfile(e.target.dataset.person); } });
  fan.addEventListener('mouseover', (e) => { const id = e.target.dataset && e.target.dataset.person; if (id) setMeter(F.byId[id]); });

  /* ---------- Search in tree ---------- */
  const tq = $('#tq'), tl = $('#tq-list'); let sel = -1;
  function list() { const v = tq.value.trim().toLowerCase(); const hits = v ? F.people.filter((p) => (p.name + ' ' + (p.place || '') + ' ' + (p.years || '')).toLowerCase().includes(v)).slice(0, 12) : []; sel = -1; tl.innerHTML = hits.map((p, i) => `<li role="option" id="tqo${i}" data-id="${p.id}" aria-selected="false">${esc(p.name)}</li>`).join(''); tl.classList.toggle('open', hits.length > 0); tq.setAttribute('aria-expanded', hits.length > 0); }
  function pick(id) { tl.classList.remove('open'); tq.value = F.byId[id].name; const inTree = !F.byId[id].married && id !== 'john_burton'; showTree(); if (inTree) centerOn(id, 1); else { const sp = F.byId[id].spouses[0] || (F.byId[id].children[0]); sp && centerOn(sp, 1); } }
  tq.addEventListener('input', list);
  tq.addEventListener('keydown', (e) => { const items = $$('li', tl); if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); } else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); } else if (e.key === 'Enter') { e.preventDefault(); const it = items[Math.max(0, sel)]; it && pick(it.dataset.id); return; } else if (e.key === 'Escape') { tl.classList.remove('open'); return; } else return; items.forEach((x, i) => x.setAttribute('aria-selected', i === sel)); if (items[sel]) tq.setAttribute('aria-activedescendant', items[sel].id); });
  tl.addEventListener('click', (e) => { const li = e.target.closest('li'); li && pick(li.dataset.id); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.tsearch')) tl.classList.remove('open'); });

  /* ---------- Relationship explorer ---------- */
  const ra = $('#ra'), rb = $('#rb');
  const opts = [...F.people].sort((a, b) => a.gen - b.gen || a.name.localeCompare(b.name)).map((p) => `<option value="${p.id}">${esc(p.name)} (gen. ${p.gen})</option>`).join('');
  ra.innerHTML = opts; rb.innerHTML = opts; ra.value = 'joshua'; rb.value = 'henry';
  function markPath(path, center) {
    $$('.node.hot', vp).forEach((n) => n.classList.remove('hot')); $$('.edges path.hot', vp).forEach((n) => n.classList.remove('hot'));
    path.forEach((id) => { const g = vp.querySelector(`.node[data-id="${id}"]`); g && g.classList.add('hot'); });
    svg.classList.add('dim');
  }
  function runRel() {
    const r = window.relate(ra.value, rb.value); if (!r) return;
    $('#rout').innerHTML = esc(r.text).replace(esc(r.word || '~~'), `<em>${esc(r.word || '')}</em>`);
    $('#rpath').innerHTML = r.path.map((id, i) => `${i ? '<span class="arr" aria-hidden="true">→</span>' : ''}<button class="chip" data-person="${id}" style="animation-delay:${i * 70}ms"><span class="dot"></span>${esc(F.byId[id].short)}</button>`).join('');
    return r;
  }
  ra.onchange = rb.onchange = runRel; $('#rswap').onclick = () => { const t = ra.value; ra.value = rb.value; rb.value = t; runRel(); };
  $('#rshow').onclick = () => { const r = runRel(); hotPath = r.path; lineOn = false; $('#t-line').setAttribute('aria-pressed', 'false'); showTree(); draw(); markPath(hotPath); stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); setTimeout(fit, 400); window.toast('Path lit in gold — click “Joshua’s line” twice to reset'); };
  runRel();

  /* ---------- Boot ---------- */
  draw(); fit(false);
  addEventListener('resize', () => fit(false));
  function hash() {
    const h = location.hash; const m1 = h.match(/p=([\w_]+)/), m2 = h.match(/rel=([\w_]+)/);
    if (m1 && F.byId[m1[1]]) { setTimeout(() => { const id = m1[1]; const inTree = !F.byId[id].married && id !== 'john_burton'; centerOn(inTree ? id : (F.byId[id].spouses[0] || id), 1); window.openProfile(id); }, 300); }
    if (m2 && F.byId[m2[1]]) { rb.value = m2[1]; ra.value = m2[1] === 'joshua' ? 'elijah' : 'joshua'; runRel(); setTimeout(() => $('#relate').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), 300); }
  }
  hash(); addEventListener('hashchange', hash);
  // Lit path reset when toggling line twice
})();
