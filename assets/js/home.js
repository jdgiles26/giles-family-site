(function () {
  const { $, $$, esc, reduce } = window.G, F = window.FAMILY;
  // style + hero layers
  const st = document.createElement('style'); st.textContent = window.ART.css; document.head.append(st);
  const holder = $('#hero-layers'); const depths = [0.12, 0.2, 0.3, 0.42, 0.55];
  window.ART.hero.forEach((svg, i) => { const d = document.createElement('div'); d.className = 'layer'; d.dataset.depth = depths[i]; d.style.bottom = (-2 - i * 0) + 'px'; d.innerHTML = svg; holder.append(d); });
  const hero = $('#hero'); const movers = $$('[data-depth]', hero);
  let ticking = false;
  function par() { ticking = false; const y = scrollY; if (y > innerHeight * 1.2) return; movers.forEach((m) => { const dd = +m.dataset.depth; m.style.transform = (m.classList.contains('sun') ? 'translate(-50%,-50%) ' : '') + `translate3d(0,${y * dd}px,0)`; }); $('.hero-copy').style.opacity = Math.max(0, 1 - y / (innerHeight * 0.7)); }
  if (!reduce) addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(par); } }, { passive: true });
  // pointer parallax on hero
  if (!reduce) hero.addEventListener('pointermove', (e) => { const k = (e.clientX / innerWidth - 0.5); $$('.layer', hero).forEach((l, i) => { l.style.marginLeft = (-k * (i + 1) * 8) + 'px'; }); });

  // Then & Now strips
  $$('[data-tn]').forEach((el) => { const t = window.THEN_NOW[el.dataset.tn]; el.innerHTML = `<h4>Then &amp; Now <b>${esc(t.year)}</b></h4><ul>${t.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`; el.setAttribute('aria-label', 'What was happening in the world, ' + t.year); });
  // Luther's kids chips
  $('#luther-kids').innerHTML = F.byId.luther.children.map((id) => `<button class="chip" data-person="${id}"><span class="dot"></span>${esc(F.byId[id].short)}</button>`).join('');
  // Siblings gallery
  $('#sib-gallery').innerHTML = F.byId.william.children.map((id) => { const p = F.byId[id]; return `<div class="sib ${p.sex === 'F' ? 'f' : ''} ${id === 'hershel' ? 'star' : ''}" role="button" tabindex="0" data-person="${id}" aria-label="${esc(p.name)} — ${esc(p.badge || '')}">
    <div class="mono" aria-hidden="true">${esc(p.short[0])}</div><div class="badge">${esc(p.badge || '')}</div><h3>${esc(p.name)}</h3>${!p.living && p.years ? `<div class="yrs">${esc(p.years)}</div>` : ''}<p>${esc(p.bio)}</p></div>`; }).join('');
  $$('.sib').forEach((s) => s.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.openProfile(s.dataset.person); } }));
  // Explore cards
  const cards = [['tree.html', 'The Family Tree', 'Zoom, pan and click through seven generations — then switch to the fan chart or find out exactly how any two Giles are related.', '<path d="M24 44V20M24 30l-9-7M24 26l9-7"/><circle cx="24" cy="12" r="6"/><circle cx="13" cy="20" r="4"/><circle cx="35" cy="18" r="4"/>'],
    ['war.html', 'Rifleman, 9th Infantry', 'Inspect William’s discharge up close and follow his regiment across Normandy to 3 August 1944.', '<path d="M24 6l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z"/>'],
    ['census.html', 'Census Time Machine', 'Pick a year from 1840 to 1950 and see exactly who was living under one roof.', '<path d="M8 22L24 8l16 14v18H8z"/><path d="M19 40V28h10v12"/>'],
    ['timeline.html', 'The Timeline', 'Scrub through 230 years of the family against the history of Kentucky and America.', '<path d="M6 24h36"/><circle cx="12" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="36" cy="24" r="3"/>'],
    ['places.html', 'Kentucky to Indiana', 'An animated map of the roads the family travelled — Virginia, Rockcastle, Knifley, Camp Atterbury, Edinburg, Wadsworth.', '<path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z"/><path d="M18 8v28M30 12v28"/>'],
    ['memories.html', 'The Memory Wall', 'Pin a memory, a saying or a story about anyone in the family, and read what others have shared.', '<path d="M10 8h28v32H10z"/><path d="M16 16h16M16 23h16M16 30h10"/><circle cx="24" cy="8" r="3"/>'],
    ['quiz.html', 'Ask the Family', 'How well do you know the family? Fourteen questions, with the story behind every answer.', '<circle cx="24" cy="24" r="17"/><path d="M19 19a5 5 0 1 1 7 4.6c-1.4.7-2 1.6-2 3.4M24 33v.5"/>']];
  $('#explore-cards').innerHTML = cards.map(([h, t, d, ic]) => `<a class="card" href="${h}"><svg class="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">${ic}</svg><h3>${t}</h3><p>${d}</p><span class="arrow">Open →</span></a>`).join('');

  // Generation rail + counter
  const gens = $$('.gen'), rail = $('#genrail'), gc = $('#gencount');
  const obs = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { const g = en.target.dataset.gen; $$('a', rail).forEach((a, i) => a.classList.toggle('on', i + 1 == g)); $('#gc-n').textContent = g; $('#gc-l').textContent = 'Generation · ' + en.target.dataset.label; } }), { rootMargin: '-45% 0px -45% 0px' });
  gens.forEach((g) => obs.observe(g));
  addEventListener('scroll', () => { const a = gens[0].getBoundingClientRect().top < innerHeight * 0.6 && gens[gens.length - 1].getBoundingClientRect().bottom > innerHeight * 0.4; rail.classList.toggle('show', a); gc.classList.toggle('show', a); }, { passive: true });
  // legend hint
  $('#legend-hint').onclick = () => { const l = $('#logo-btn'); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); $('#top-nav').classList.remove('hide'); l.classList.remove('wiggle'); void l.offsetWidth; l.classList.add('wiggle'); window.toast('Look up — click the little tree in the top corner.'); };
})();

/* ---------- On this day ---------- */
(function () {
  const el = document.getElementById('otd'); if (!el || !window.TIMELINE) return;
  const { esc } = window.G; const F = window.FAMILY;
  const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
  const ev = window.TIMELINE.map((e) => { const m = /^(\d{1,2}) ([A-Za-z]+)\.? (\d{4})$/.exec(e.d || ''); if (!m) return null; const mo = MON[m[2].slice(0, 4).toLowerCase()] ?? MON[m[2].slice(0, 3).toLowerCase()]; return mo === undefined ? null : Object.assign({ mo, da: +m[1], yr: +m[3] }, e); }).filter(Boolean)
    .sort((a, b) => (a.mo - b.mo) || (a.da - b.da) || (a.yr - b.yr));
  if (!ev.length) return;
  const now = new Date(); const tm = now.getMonth(), td = now.getDate();
  let i = ev.findIndex((e) => e.mo === tm && e.da === td); const today = i >= 0;
  if (!today) { i = ev.findIndex((e) => e.mo > tm || (e.mo === tm && e.da > td)); if (i < 0) i = 0; }
  const MN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function show(k, first) {
    const e = ev[k]; const p = e.who && F.byId[e.who]; const ago = now.getFullYear() - e.yr;
    const head = first && today ? 'On this day in the family' : first ? 'Coming up in the family calendar' : 'In the family calendar';
    el.innerHTML = `<div class="eyebrow">${head}</div><div class="d">${e.da} ${MN[e.mo]} ${e.yr} · ${ago} years ago</div><h3>${esc(e.t)}</h3>${e.txt ? `<p>${esc(e.txt)}</p>` : ''}<div class="nav"><button class="btn small" data-k="${(k + ev.length - 1) % ev.length}">← Earlier in the year</button><button class="btn small" data-k="${(k + 1) % ev.length}">Later in the year →</button>${p ? `<button class="chip" data-person="${p.id}"><span class="dot"></span>Meet ${esc(p.short || p.name)}</button>` : ''}</div>`;
  }
  el.addEventListener('click', (x) => { const b = x.target.closest('[data-k]'); if (b) show(+b.dataset.k, false); });
  show(i, true);
})();
