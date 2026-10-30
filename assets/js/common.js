/* Shared site chrome: nav, footer, lantern mode, music, page turns, reveals, search, profiles, share cards, legend. */
(function () {
  const F = window.FAMILY, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  window.G = { $, $$, esc, reduce };

  const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".5"/><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M32 52V24M32 38l-9-8M32 33l10-9M32 44l8-6M23 30l-6-1M23 30l-1-7M42 24l2-7M42 24l6 0"/><path d="M32 52c-4 2-9 2-13 1M32 52c4 2 9 2 13 1M32 52v4" opacity=".7"/></g><g fill="currentColor"><circle cx="32" cy="18" r="6.5" opacity=".85"/><circle cx="20" cy="24" r="5.5" opacity=".7"/><circle cx="44" cy="20" r="5.5" opacity=".75"/><circle cx="15" cy="30" r="3.5" opacity=".6"/><circle cx="49" cy="25" r="3.5" opacity=".6"/><circle cx="40" cy="37" r="3" opacity=".55"/></g></svg>`;
  window.G.LOGO = LOGO;
  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    lantern: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6M12 3v2M8 7h8l-1 2v8l1 2H8l1-2V9z"/><path d="M12 11c1.2 1.3 1.2 2.7 0 4-1.2-1.3-1.2-2.7 0-4z" fill="currentColor"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };
  window.G.I = I;
  const PAGES = [['index.html', 'Story'], ['tree.html', 'Family Tree'], ['war.html', 'Rifleman'], ['timeline.html', 'Timeline'], ['places.html', 'Places'], ['census.html', 'Census'], ['quiz.html', 'Quiz'], ['memories.html', 'Memories'], ['sources.html', 'Sources']];
  const here = (location.pathname.split('/').pop() || 'index.html');

  /* ---------- Lantern mode (before paint) ---------- */
  try { if (localStorage.getItem('lantern') === '1') document.documentElement.classList.add('lantern'); } catch (e) {}

  function buildChrome() {
    const nav = document.createElement('header');
    nav.className = 'nav'; nav.id = 'top-nav';
    nav.innerHTML = `<a class="skip" href="#main">Skip to content</a>
      <button class="logo" id="logo-btn" type="button" aria-label="The Giles family tree emblem — something is hidden here" title="Something is hidden in the tree…">${LOGO}<span class="lt">The Giles<small>of Adair County</small></span></button>
      <nav aria-label="Main"><ul id="nav-list">${PAGES.map(([h, t]) => `<li><a href="${h}"${h === here ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul></nav>
      <div class="tools">
        <button class="icon-btn" id="search-btn" type="button" aria-label="Search the family">${I.search}</button>
        <button class="icon-btn" id="lantern-btn" type="button" aria-pressed="false" aria-label="Lantern (dark) mode">${I.lantern}</button>
        <button class="icon-btn" id="music-btn" type="button" aria-pressed="false" aria-label="Ambient music (off)">${I.music}</button>
        <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-list" aria-label="Menu">${I.menu}</button>
      </div>`;
    document.body.prepend(nav);
    const foot = document.createElement('footer');
    foot.innerHTML = `<div class="wrap"><div style="width:48px;margin:0 auto 14px;color:var(--rust)">${LOGO}</div>
      <p><strong style="font-family:var(--display);font-size:1.2rem">The Giles of Adair County, Kentucky</strong><br>A family history for Joshua Giles and his kin.</p>
      <nav aria-label="Footer">${PAGES.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="legend.html">Legend</a></nav>
      <p class="egg-hint">Every family has a legend. Ours is hidden in the tree at the top of the page.</p>
      <p style="font-size:.8rem;opacity:.7">Living family members appear by first name and family role only.</p></div>`;
    document.body.append(foot);
    const turn = document.createElement('div'); turn.className = 'turn'; turn.innerHTML = '<div class="leaf"></div>'; turn.setAttribute('aria-hidden', 'true');
    document.body.append(turn);
    const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.id = 'toast'; document.body.append(toast);
    // modals
    const mk = (id, cls, label) => { const m = document.createElement('div'); m.className = 'modal ' + (cls || ''); m.id = id; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', label); m.innerHTML = '<div class="sheet"></div>'; document.body.append(m); return m; };
    mk('profile-modal', '', 'Family member profile'); mk('search-modal', '', 'Search the family'); mk('legend-modal', 'scroll-modal', 'The family legend'); mk('share-modal', '', 'Share card');
  }

  window.toast = (msg) => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600); };

  /* ---------- Modal helpers ---------- */
  let lastFocus = null;
  function openModal(id, html) {
    const m = document.getElementById(id); lastFocus = document.activeElement;
    m.querySelector('.sheet').innerHTML = html; m.classList.add('open'); document.body.style.overflow = 'hidden';
    const f = m.querySelector('[autofocus]') || m.querySelector('button, a, input, [tabindex]'); f && f.focus();
    return m;
  }
  function closeModal(m) { m.classList.remove('open'); if (!$$('.modal.open').length) document.body.style.overflow = ''; lastFocus && lastFocus.focus && lastFocus.focus(); }
  window.openModal = openModal; window.closeModal = closeModal;
  document.addEventListener('keydown', (e) => {
    const m = $$('.modal.open').pop(); if (!m) return;
    if (e.key === 'Escape') closeModal(m);
    if (e.key === 'Tab') { // focus trap
      const f = $$('button, a[href], input, select, [tabindex]:not([tabindex="-1"])', m).filter((x) => x.offsetParent !== null);
      if (!f.length) return; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (e) => { const m = e.target.classList && e.target.classList.contains('modal') ? e.target : null; if (m) closeModal(m); const c = e.target.closest('[data-close]'); if (c) closeModal(c.closest('.modal')); });

  /* ---------- Relationship engine ---------- */
  function upMap(id) { const d = { [id]: { n: 0, prev: null } }; const q = [id]; while (q.length) { const c = q.shift(); const p = F.byId[c]; (p ? p.parents : []).forEach((pp) => { if (!(pp in d)) { d[pp] = { n: d[c].n + 1, prev: c }; q.push(pp); } }); } return d; }
  const ord = (n) => ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth'][n] || n + 'th';
  const times = (n) => n === 1 ? 'once' : n === 2 ? 'twice' : n === 3 ? 'three times' : n + ' times';
  function kinWord(d1, d2, sex) {
    const m = sex === 'M';
    const greats = (k) => 'great-'.repeat(Math.max(0, k));
    if (d1 === 0 && d2 === 0) return 'the same person';
    if (d1 === 0) return d2 === 1 ? (m ? 'son' : 'daughter') : greats(d2 - 2) + 'grand' + (m ? 'son' : 'daughter');
    if (d2 === 0) return d1 === 1 ? (m ? 'father' : 'mother') : greats(d1 - 2) + 'grand' + (m ? 'father' : 'mother');
    if (d1 === 1 && d2 === 1) return m ? 'brother' : 'sister';
    if (d1 === 1) return (d2 === 2 ? '' : greats(d2 - 3) + 'grand-') + (m ? 'nephew' : 'niece');
    if (d2 === 1) return (d1 === 2 ? '' : greats(d1 - 3) + 'great-') + (m ? 'uncle' : 'aunt');
    const deg = Math.min(d1, d2) - 1, rem = Math.abs(d1 - d2);
    return ord(deg) + ' cousin' + (rem ? ' ' + times(rem) + ' removed' : '');
  }
  function relate(a, b) {
    const A = F.byId[a], B = F.byId[b]; if (!A || !B) return null;
    if (a === b) return { text: `That\u2019s the same person.`, path: [a], word: 'self' };
    if (A.spouses.includes(b)) return { text: `${B.short} is ${A.short}\u2019s ${B.sex === 'M' ? 'husband' : 'wife'}.`, path: [a, b], word: B.sex === 'M' ? 'husband' : 'wife' };
    const ua = upMap(a), ub = upMap(b); let best = null;
    Object.keys(ua).forEach((k) => { if (k in ub) { const s = ua[k].n + ub[k].n; if (!best || s < best.s) best = { k, s }; } });
    if (best) {
      const d1 = ua[best.k].n, d2 = ub[best.k].n; const word = kinWord(d1, d2, B.sex);
      // build path a -> lca
      const pathA = []; { let cur = best.k; while (cur) { pathA.unshift(cur); cur = ua[cur].prev; } } // lca..a reversed
      const pA = pathA; // a .. lca
      const pB = []; { let cur = best.k; while (cur) { pB.unshift(cur); cur = ub[cur].prev; } } // b .. lca ; reverse
      const path = pA.concat(pB.reverse().slice(1));
      const lca = F.byId[best.k];
      let extra = '';
      if (d1 > 0 && d2 > 0) extra = ` Their closest shared ancestor is ${lca.name}${lca.spouses.length ? ' (and ' + F.byId[lca.spouses[0]].short + ')' : ''}.`;
      return { text: `${B.short} is ${A.short}\u2019s ${word}.${extra}`, path, word, d1, d2 };
    }
    // marriage links
    for (const s of A.spouses) { const r = relate(s, b); if (r && r.word && r.word !== 'self' && !/marriage/.test(r.word)) return { text: `${B.short} is ${A.short}\u2019s ${r.word} by marriage (through ${F.byId[s].short}).`, path: [a].concat(r.path), word: r.word + ' by marriage' }; }
    for (const s of B.spouses) { const r = relate(a, s); if (r && r.word && r.word !== 'self' && !/marriage/.test(r.word)) { const w = r.word.match(/(son|daughter|brother|sister|father|mother|nephew|niece|uncle|aunt)$/) ? r.word.replace(/son$/, 'son-in-law').replace(/daughter$/, 'daughter-in-law').replace(/brother$/, 'brother-in-law').replace(/sister$/, 'sister-in-law').replace(/father$/, 'father-in-law').replace(/mother$/, 'mother-in-law') : r.word + '\u2019s spouse'; return { text: `${B.short} is married to ${A.short}\u2019s ${r.word}, ${F.byId[s].short}.`, path: r.path.concat([b]), word: w }; } }
    return { text: `${A.short} and ${B.short} connect through the wider family.`, path: [a, b], word: 'kin' };
  }
  window.relate = relate;

  /* ---------- Profile ---------- */
  function chips(ids) { return ids.filter((i) => F.byId[i]).map((i) => `<button class="chip" data-person="${i}"><span class="dot"></span>${esc(F.byId[i].short)}</button>`).join(''); }
  function profileHTML(id) {
    const p = F.byId[id]; if (!p) return '';
    const rel = id === 'joshua' ? 'This is Joshua.' : (relate('joshua', id) || {}).text;
    return `<div class="profile"><button class="icon-btn close" data-close aria-label="Close">${I.close}</button>
      <div class="role">${esc(p.role || '')}</div><h2>${esc(p.name)}</h2>
      ${!p.living && p.years ? `<div class="yrs">${esc(p.years)}</div>` : ''}
      ${p.living ? '<div class="living-note">Living — shared with first name and family role only</div>' : ''}
      ${p.place ? `<div class="pl">${esc(p.place)}</div>` : ''}
      ${p.photo ? `<figure class="pimg pphoto"><img src="${esc(p.photo)}" alt="Photo of ${esc(p.name)}" loading="lazy"></figure>` : ''}
      ${p.img ? `<figure class="pimg"><img src="${p.img}" alt="Archival record for ${esc(p.name)}"></figure>` : ''}
      <p>${esc(p.bio || '')}</p>
      ${p.facts && p.facts.length ? `<ul class="facts">${p.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
      <p style="font-style:italic;color:var(--rust)">${esc(rel || '')}</p>
      ${p.parents.length ? `<div><span class="eyebrow">Parents</span><div class="kin">${chips(p.parents)}</div></div>` : ''}
      ${p.spouses.length ? `<div style="margin-top:.8em"><span class="eyebrow">Married</span><div class="kin">${chips(p.spouses)}</div></div>` : ''}
      ${p.children.length ? `<div style="margin-top:.8em"><span class="eyebrow">Children</span><div class="kin">${chips(p.children)}</div></div>` : ''}
      <div class="acts"><a class="btn small" href="tree.html#p=${id}">See in the tree</a><a class="btn small" href="tree.html#rel=${id}">How are we related?</a><button class="btn small solid" data-share="${id}">Make a share card</button><button class="btn small" data-edit="${id}">✎ Edit this person</button></div></div>`;
  }
  window.openProfile = (id) => { if (!F.byId[id]) return; openModal('profile-modal', profileHTML(id)); };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-person]'); if (c) { e.preventDefault(); const sm = c.closest('#search-modal'); if (sm) closeModal(sm); window.openProfile(c.dataset.person); }
    const ed = e.target.closest('[data-edit]'); if (ed) { e.preventDefault(); const pm = ed.closest('#profile-modal'); if (pm) closeModal(pm); if (window.FamilyEditor) window.FamilyEditor.edit(ed.dataset.edit); else location.href = 'tree.html#edit=' + ed.dataset.edit; return; }
    const s = e.target.closest('[data-share]'); if (s) { e.preventDefault(); const pm = s.closest('#profile-modal'); if (pm) closeModal(pm); openShare(s.dataset.share); }
  });

  /* ---------- Share card generator (canvas → PNG) ---------- */
  function drawShare(id, canvas) {
    const p = F.byId[id] || F.byId.joshua; const W = 1200, H = 630; canvas.width = W; canvas.height = H; const g = canvas.getContext('2d');
    const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#f3e5c6'); bg.addColorStop(1, '#e2c995'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    // speckle grain
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(90,60,30,${rnd() * 0.08})`; g.fillRect(rnd() * W, rnd() * H, 1.5, 1.5); }
    // hills
    const hills = [['#c99a5b', 470, 40], ['#9a6a3c', 520, 55], ['#5e3f22', 575, 60]];
    hills.forEach(([c, y, a], k) => { g.fillStyle = c; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 20) g.lineTo(x, y + Math.sin(x / (140 + k * 40) + k) * a * 0.5 + Math.sin(x / 61 + k * 2) * 8); g.lineTo(W, H); g.fill(); });
    // frame
    g.strokeStyle = '#8f3a1c'; g.lineWidth = 3; g.strokeRect(28, 28, W - 56, H - 56); g.lineWidth = 1; g.strokeRect(40, 40, W - 80, H - 80);
    g.fillStyle = '#8f3a1c'; g.font = '600 22px "Libre Franklin", sans-serif'; g.textAlign = 'center';
    g.fillText('THE GILES OF ADAIR COUNTY, KENTUCKY', W / 2, 105);
    g.fillStyle = '#2a1c10'; let size = 84; g.font = `800 ${size}px "Playfair Display", Georgia, serif`;
    while (g.measureText(p.name).width > W - 160 && size > 40) { size -= 4; g.font = `800 ${size}px "Playfair Display", Georgia, serif`; }
    g.fillText(p.name, W / 2, 225);
    g.font = 'italic 34px "IM Fell English", Georgia, serif'; g.fillStyle = '#5a4330';
    g.fillText(p.living ? (p.role || '') : [p.years, p.role].filter(Boolean).join('  ·  '), W / 2, 285);
    if (p.place) { g.font = '26px "Special Elite", monospace'; g.fillStyle = '#5a4330'; g.fillText(p.place.length > 70 ? p.place.slice(0, 68) + '…' : p.place, W / 2, 335); }
    const rel = id === 'joshua' ? 'Seven generations of Giles' : (relate('joshua', id) || {}).word;
    if (rel) { g.font = '600 24px "Libre Franklin", sans-serif'; g.fillStyle = '#fff6e6'; const t = ('Joshua\u2019s ' + rel).toUpperCase().replace('JOSHUA\u2019S SEVEN', 'SEVEN'); const w = g.measureText(t).width + 50; g.fillStyle = '#8f3a1c'; g.fillRect(W / 2 - w / 2, 370, w, 46); g.fillStyle = '#fff6e6'; g.fillText(t, W / 2, 402); }
    // little tree
    g.save(); g.translate(W / 2, 470); g.strokeStyle = '#2a1c10'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, 30); g.lineTo(0, -10); g.stroke(); g.fillStyle = '#2a1c10'; [[0, -22, 14], [-16, -12, 10], [16, -14, 10]].forEach(([x, y, r]) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }); g.restore();
  }
  function openShare(id) {
    const p = F.byId[id];
    const m = openModal('share-modal', `<button class="icon-btn close" data-close aria-label="Close">${I.close}</button><span class="eyebrow">Share card</span><h2 style="font-size:2rem">${esc(p.name)}</h2>
      <canvas id="share-canvas" style="width:100%;height:auto;box-shadow:0 10px 30px var(--shadow)" aria-label="Share card preview"></canvas>
      <div class="acts" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button class="btn solid small" id="share-dl">Download PNG</button>
      <label style="font-family:var(--ui);font-size:.8rem;display:flex;align-items:center;gap:6px">Person <select id="share-pick" style="font-family:var(--body);font-size:1rem;padding:.3em">${F.people.map((x) => `<option value="${x.id}"${x.id === id ? ' selected' : ''}>${esc(x.name)}</option>`).join('')}</select></label></div>`);
    const cv = $('#share-canvas', m); const draw = (pid) => (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => drawShare(pid, cv)); draw(id);
    $('#share-pick', m).onchange = (e) => draw(e.target.value);
    $('#share-dl', m).onclick = () => { const a = document.createElement('a'); a.download = 'giles-' + $('#share-pick', m).value + '.png'; a.href = cv.toDataURL('image/png'); document.body.append(a); a.click(); a.remove(); toast('Share card downloaded'); };
  }
  window.openShare = openShare; window.drawShare = drawShare;

  /* ---------- Search ---------- */
  function openSearch(prefill) {
    const m = openModal('search-modal', `<button class="icon-btn close" data-close aria-label="Close">${I.close}</button><span class="eyebrow">Search the family</span><h2 style="font-size:2rem">Who are you looking for?</h2>
      <div class="search-box"><label class="sr" for="q">Name, place or year</label><input id="q" autofocus autocomplete="off" placeholder="Try “Knifley”, “Luther”, or “1924”" value="${esc(prefill || '')}"></div><ul class="results" id="results" aria-live="polite"></ul>`);
    const q = $('#q', m), out = $('#results', m);
    const run = () => {
      const v = q.value.trim().toLowerCase();
      const hits = F.people.filter((p) => !v || [p.name, p.short, p.place, p.role, p.years, p.bio].join(' ').toLowerCase().includes(v)).slice(0, 40);
      out.innerHTML = hits.length ? hits.map((p) => `<li><button data-person="${p.id}"><span>${esc(p.name)}${!p.living && p.years ? ` <span style="opacity:.6;font-family:var(--type);font-size:.85em">${esc(p.years)}</span>` : ''}</span><small>${esc((p.role || '').split('—')[0])}</small></button></li>`).join('') : '<li style="padding:1em 0">No one by that name — yet.</li>';
    };
    q.addEventListener('input', run); run();
    q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const b = out.querySelector('button'); b && b.click(); } if (e.key === 'ArrowDown') { e.preventDefault(); const b = out.querySelector('button'); b && b.focus(); } });
    out.addEventListener('keydown', (e) => { const bs = $$('button', out); const i = bs.indexOf(document.activeElement); if (e.key === 'ArrowDown' && i < bs.length - 1) { e.preventDefault(); bs[i + 1].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? bs[i - 1] : q).focus(); } });
  }
  window.openSearch = openSearch;

  /* ---------- Legend (easter egg) ---------- */
  function openLegend() {
    openModal('legend-modal', `<div class="scroll"><button class="icon-btn close" data-close aria-label="Close the scroll">${I.close}</button>
      <span class="tag">You found it · A family legend</span><h2>The Daughter of Dragging Canoe</h2>
      <p class="dropcap">Ask around the Giles table long enough and someone will tell you: <em>we are kin to the daughter of Chief Dragging Canoe.</em> The story has been carried down among William\u2019s children and treasured like an heirloom.</p>
      <p>Dragging Canoe — <em>Tsiyu Gansini</em> — was one of the great Cherokee leaders of his age: the son of the Cherokee leader Attakullakulla, the war chief who refused to accept the 1775 Treaty of Sycamore Shoals that sold away much of what became Kentucky. Tradition says he warned the buyers that the land would become a \u201cdark and bloody ground.\u201d For nearly fifteen years he led the Chickamauga Cherokee in defense of their homeland, until his death at Running Water Town in 1792 — two years before Elijah Giles was born.</p>
      <p>Written history recorded his son. The Giles family has kept the memory of his daughter by word of mouth for generations, and it is honored here as part of the family\u2019s story.</p>
      <p style="text-align:center;margin-top:1.4em"><a class="btn small" href="legend.html">Read the full legend</a></p></div>`);
    try { localStorage.setItem('legendFound', '1'); } catch (e) {}
  }
  window.openLegend = openLegend;

  /* ---------- Ambient music (WebAudio, generated, off by default) ---------- */
  let ac = null, master = null, timer = null;
  function startMusic() {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    master.gain.linearRampToValueAtTime(0.18, ac.currentTime + 2);
    const delay = ac.createDelay(); delay.delayTime.value = 0.42; const fb = ac.createGain(); fb.gain.value = 0.38; const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
    delay.connect(fb); fb.connect(lp); lp.connect(delay); delay.connect(master);
    const drone = (f) => { const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f; const gg = ac.createGain(); gg.gain.value = 0.05; o.connect(gg); gg.connect(master); o.start(); return o; };
    const drones = [drone(73.42), drone(110)];
    const scale = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99];
    const pluck = () => {
      const t = ac.currentTime; const f = scale[Math.floor(Math.random() * scale.length)];
      const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = f; const gg = ac.createGain(); gg.gain.setValueAtTime(0.0001, t); gg.gain.exponentialRampToValueAtTime(0.22, t + 0.01); gg.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      o.connect(gg); gg.connect(master); gg.connect(delay); o.start(t); o.stop(t + 2.5);
    };
    let step = 0; timer = setInterval(() => { if (Math.random() < 0.72) pluck(); if (step++ % 8 === 0) pluck(); }, 520);
    master._drones = drones;
  }
  function stopMusic() { if (!ac || !master) return; clearInterval(timer); const m = master; m.gain.linearRampToValueAtTime(0, ac.currentTime + 0.8); setTimeout(() => { m._drones.forEach((o) => o.stop()); m.disconnect(); }, 900); master = null; }

  /* ---------- Init ---------- */
  function init() {
    buildChrome();
    const nav = $('#top-nav'); let lastY = scrollY;
    addEventListener('scroll', () => { const y = scrollY; nav.classList.toggle('hide', y > lastY && y > 300 && !nav.classList.contains('open')); lastY = y; }, { passive: true });
    $('#menu-btn').onclick = () => { const o = nav.classList.toggle('open'); $('#menu-btn').setAttribute('aria-expanded', o); };
    $('#search-btn').onclick = () => openSearch();
    const lb = $('#lantern-btn'); const syncL = () => lb.setAttribute('aria-pressed', document.documentElement.classList.contains('lantern'));
    syncL(); lb.onclick = () => { const on = document.documentElement.classList.toggle('lantern'); try { localStorage.setItem('lantern', on ? '1' : '0'); } catch (e) {} syncL(); toast(on ? 'Lantern lit' : 'Daylight'); document.dispatchEvent(new Event('lanternchange')); };
    addEventListener('pointermove', (e) => { document.documentElement.style.setProperty('--lx', e.clientX + 'px'); document.documentElement.style.setProperty('--ly', e.clientY + 'px'); }, { passive: true });
    const mb = $('#music-btn'); mb.onclick = () => { const on = mb.getAttribute('aria-pressed') !== 'true'; mb.setAttribute('aria-pressed', on); mb.setAttribute('aria-label', 'Ambient music (' + (on ? 'on' : 'off') + ')'); try { on ? startMusic() : stopMusic(); } catch (e) {} toast(on ? 'Music on — a quiet dulcimer' : 'Music off'); };
    // logo → legend
    $('#logo-btn').onclick = openLegend;
    document.addEventListener('keydown', (e) => { if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); } });
    // reveals
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el) => io.observe(el));
    // counters
    const co = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; co.unobserve(en.target); const el = en.target, to = +el.dataset.count, dur = reduce ? 1 : 1600, t0 = performance.now(); const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString(); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: 0.4 });
    $$('[data-count]').forEach((el) => co.observe(el));
    // page turns
    const turn = $('.turn');
    try { if (sessionStorage.getItem('turning') === '1' && !reduce) { sessionStorage.removeItem('turning'); turn.classList.add('in'); setTimeout(() => turn.classList.remove('in'), 800); } } catch (e) {}
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href'); if (!/^[\w-]+\.html(#.*)?$/.test(href)) return;
      if (href.split('#')[0] === here && href.includes('#')) return;
      if (reduce) return; e.preventDefault(); try { sessionStorage.setItem('turning', '1'); } catch (er) {}
      turn.classList.add('out'); setTimeout(() => (location.href = href), 520);
    });
    addEventListener('pageshow', (e) => { if (e.persisted) turn.classList.remove('out', 'in'); });
    document.dispatchEvent(new Event('chromeready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
