(function () {
  const { $, $$, esc, reduce } = window.G;
  /* ---------- Service chronology ---------- */
  const S = [['5 Oct 1943', 'Inducted', 'Columbia, Ky. listed as home'], ['26 Oct 1943', 'Active service', 'Entered at Louisville'], ['Nov 1943', 'Camp Atterbury, Ind.', 'From Fort Thomas reception center'], ['1 Jul 1944', 'Ships out', 'Departs the United States'], ['16 Jul 1944', 'European Theater', 'Co. E, 9th Infantry'], ['3 Aug 1944', 'Wounded in France', 'Severe leg wounds · Purple Heart', 1], ['3 Jan 1945', 'Back in the USA', 'Left Europe 26 Dec 1944'], ['30 May 1945', 'Honorable discharge', 'Beaumont General Hospital, El Paso'], ['1 Jun 1945', 'Home', 'Returns to Adair County']];
  $('#service').innerHTML = S.map(([d, t, s, hit]) => `<li class="${hit ? 'hit' : ''}"><b>${d}</b><span>${t}</span><small>${s}</small></li>`).join('');

  /* ---------- Discharge viewer ---------- */
  const PINS = [
    [52, 11, 'Name, serial number, unit', 'Giles, William C. 35806948, Pvt., Co. E, 9th Inf.', 'The headline of the whole document: Private William C. Giles, Army serial number 35806948, of Company E, 9th Infantry. A “3” at the start of a serial number marked a man who came in through the draft.'],
    [32.2, 22.7, 'Where and when', 'William Beaumont General Hospital, El Paso, Texas · 30th May 1945', 'William was discharged not from a camp but from an Army hospital in El Paso — one of the great general hospitals where wounded men were treated after coming home.'],
    [19.5, 29.2, 'Organization', 'Co. E, 9th Inf.', 'Company E belonged to the 2nd Battalion of the 9th Infantry Regiment — the “Manchus” of the 2nd Infantry Division.'],
    [62.5, 33.2, 'Born at Knifley', '19 Apr. 1924 · Knifley, Ky.', 'The form settles his birthday and birthplace: 19 April 1924, Knifley, Kentucky. His permanent mailing address was Knifley, too.'],
    [58.6, 36.3, 'The man himself', 'Blue · Brown · 5\u2032 11\u2033 · 138 · Married · 1 dependent · Farmer', 'Blue eyes, brown hair, five feet eleven, 138 pounds. Married, with one dependent. Civilian occupation: farmer.'],
    [17.6, 38.7, 'Inducted', '5 Oct. 1943', 'The day the Army took him in.'],
    [48.8, 40.5, 'Into active service', '26 Oct. 1943 · Louisville, Ky. · home: Columbia, Ky.', 'Active duty began at Louisville three weeks after induction.'],
    [32.2, 43.1, 'Rifleman', 'Rifleman 745 · Rifle M1 MkM', 'Military occupational specialty 745: rifleman. He qualified as a marksman (MkM) with the M1 rifle — the Garand.'],
    [15.6, 44.8, 'Campaign', 'No. France', 'The Northern France campaign — the official name for the fighting in France that followed the Normandy breakout.'],
    [44, 47.5, 'Decorations', 'E.A.M.E. Theatre Medal · 1 battle star · Purple Heart', 'The European–African–Middle Eastern Campaign Medal with one bronze battle star for Northern France — and the Purple Heart, awarded for wounds received in action.'],
    [22.5, 48.8, 'Wounded in action', '3 Aug 1944 France', 'The day he was wounded in France. The Adair County News later reported “severe leg wounds.”'],
    [66.4, 54.5, 'Overseas', 'Departed 1 July 1944 → ETO 16 July 1944 · Departed 26 Dec. 1944 → U.S.A. 3 Jan. 1945', 'Six months and two days of foreign service. He sailed on 1 July 1944, landed in the European Theater on 16 July, and was home in the United States on 3 January 1945.'],
    [15.9, 59.2, 'Reason for separation', 'CDD · WBGH, El Paso, Texas', 'CDD: Certificate of Disability for Discharge, given because of the wounds he received in action.'],
    [73.3, 62.6, 'Schooling', 'Grammar school 4 · High school 0 · College 0', 'As printed on the form. Like many young men of his time, he went to work on the family farm young.'],
    [51.3, 73.9, 'Remarks', 'Lapel button issued … Not physically qualified for reenlistment', 'He received the Honorable Service lapel button, worn with pride by veterans coming home.'],
    [18.3, 79.1, 'His signature', 'William C. Giles', 'William signed the form himself.'],
    [26.3, 84, 'Filed at home', 'Filed for record 18 June 1945', 'The paper carries the Adair County filing stamp: filed for record on 18 June 1945.'],
    [40.3, 93.1, 'The family’s certified copy', 'Discharge Book No. 2, page 119 · certified 15 Aug. 1960', 'The certification printed at the foot of the page: County Clerk H. B. Taylor certified this true copy from Discharge Book No. 2, page 119, on 15 August 1960. William’s daughter Alice kept this copy and gave it to her nephew Joshua.'],
  ];
  const vs = $('#vstage'), vl = $('#vlayer'), img = $('#vimg'); const IW = 1800, IH = 2400;
  let k = 0.3, x = 0, y = 0;
  const applyV = () => { vl.style.transform = `translate(${x}px,${y}px) scale(${k})`; };
  function fitV() { const r = vs.getBoundingClientRect(); k = Math.min(r.width / IW, r.height / IH); x = (r.width - IW * k) / 2; y = (r.height - IH * k) / 2; applyV(); }
  function zoomV(f, cx, cy) { const nk = Math.max(0.1, Math.min(2, k * f)); x = cx - (cx - x) * nk / k; y = cy - (cy - y) * nk / k; k = nk; applyV(); }
  $('#pins').innerHTML = PINS.map((p, i) => `<button class="pin" style="left:${p[0] / 100 * IW}px;top:${p[1] / 100 * IH}px" data-pin="${i}" aria-label="Pin ${i + 1}: ${esc(p[2])}">${i + 1}</button>`).join('');
  // pins should not scale too much: counter-scale via CSS var
  const syncPins = () => $$('.pin').forEach((b) => (b.style.transform = `scale(${Math.min(3.2, 0.9 / k)})`));
  const _apply = applyV; 
  $('#vlist').innerHTML = PINS.map((p, i) => `<li><button data-pin="${i}"><b>${i + 1}</b>${esc(p[2])}</button></li>`).join('');
  function showPin(i, fly = true) {
    const p = PINS[i]; $$('[data-pin]').forEach((b) => b.classList.toggle('on', +b.dataset.pin === i));
    $('#vnote').innerHTML = `<span class="eyebrow">Box ${i + 1} of ${PINS.length}</span><h3>${esc(p[2])}</h3><div class="q">“${esc(p[3])}”</div><p>${esc(p[4])}</p><div style="display:flex;gap:8px"><button class="btn small" id="vprev">← Prev</button><button class="btn small" id="vnext">Next →</button></div>`;
    $('#vprev').onclick = () => showPin((i + PINS.length - 1) % PINS.length); $('#vnext').onclick = () => showPin((i + 1) % PINS.length);
    if (fly) { const r = vs.getBoundingClientRect(); k = Math.max(0.55, Math.min(0.75, r.width / 900)); x = r.width / 2 - p[0] / 100 * IW * k; y = r.height / 2 - p[1] / 100 * IH * k; applyV(); syncPins(); }
    const li = $(`.vlist [data-pin="${i}"]`); li && li.scrollIntoView({ block: 'nearest' });
  }
  $('#vlist').addEventListener('click', (e) => { const b = e.target.closest('[data-pin]'); if (b) showPin(+b.dataset.pin); });
  $('#pins').addEventListener('keydown', (e) => { const b = e.target.closest('.pin'); if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showPin(+b.dataset.pin); } });
  let downPin = null;
  let pts = new Map(), last = null, moved = 0, p0 = null;
  vs.addEventListener('pointerdown', (e) => { if (e.target.closest('.vctl')) return; downPin = e.target.closest('.pin'); vs.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); last = { x: e.clientX, y: e.clientY }; moved = 0; if (pts.size === 2) { const [a, b] = [...pts.values()]; p0 = { d: Math.hypot(a.x - b.x, a.y - b.y), k }; } vs.classList.add('drag'); });
  vs.addEventListener('pointermove', (e) => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pts.size === 2 && p0) { const [a, b] = [...pts.values()]; const r = vs.getBoundingClientRect(); zoomV((p0.k * Math.hypot(a.x - b.x, a.y - b.y) / p0.d) / k, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); syncPins(); moved = 99; return; } const dx = e.clientX - last.x, dy = e.clientY - last.y; moved += Math.abs(dx) + Math.abs(dy); last = { x: e.clientX, y: e.clientY }; x += dx; y += dy; applyV(); });
  const endV = (e) => { pts.delete(e.pointerId); if (pts.size < 2) p0 = null; if (!pts.size) { vs.classList.remove('drag'); if (moved <= 6 && downPin) showPin(+downPin.dataset.pin); downPin = null; } };
  vs.addEventListener('pointerup', endV); vs.addEventListener('pointercancel', endV);
  let wt; vs.addEventListener('wheel', (e) => { e.preventDefault(); vs.classList.add('wheeling'); clearTimeout(wt); wt = setTimeout(() => vs.classList.remove('wheeling'), 150); const r = vs.getBoundingClientRect(); zoomV(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top); syncPins(); }, { passive: false });
  vs.addEventListener('keydown', (e) => { const r = vs.getBoundingClientRect(); if (e.target !== vs) return; if (e.key === '+' || e.key === '=') zoomV(1.25, r.width / 2, r.height / 2); else if (e.key === '-') zoomV(0.8, r.width / 2, r.height / 2); else if (e.key.startsWith('Arrow')) { const s = 60; if (e.key === 'ArrowLeft') x += s; if (e.key === 'ArrowRight') x -= s; if (e.key === 'ArrowUp') y += s; if (e.key === 'ArrowDown') y -= s; applyV(); } else return; e.preventDefault(); syncPins(); });
  $('#vz-in').onclick = () => { const r = vs.getBoundingClientRect(); zoomV(1.3, r.width / 2, r.height / 2); syncPins(); };
  $('#vz-out').onclick = () => { const r = vs.getBoundingClientRect(); zoomV(1 / 1.3, r.width / 2, r.height / 2); syncPins(); };
  $('#vz-reset').onclick = () => { fitV(); syncPins(); };
  $('#vz-color').onclick = (e) => { const on = vs.classList.toggle('color'); e.currentTarget.setAttribute('aria-pressed', on); };
  const bootV = () => { fitV(); syncPins(); };
  img.complete ? bootV() : img.addEventListener('load', bootV); addEventListener('resize', bootV);
  window.__showPin = showPin;

  /* ---------- Normandy map ---------- */
  const N = window.GEO.nor, svg = $('#nmap');
  const P = (lat, lon) => [(lon + 1.95) / 1.7 * N.w, (49.75 - lat) / 1.2 * N.h];
  const focus = ['Calvados', 'Manche', 'Orne'];
  let s = `<text class="sea" x="${P(49.66, -0.95)[0]}" y="${P(49.66, -0.95)[1]}" text-anchor="middle">English Channel</text>`;
  s += Object.entries(N.deps).map(([n, d]) => `<path class="dep ${focus.includes(n) ? 'focus' : ''}" d="${d}"/>`).join('');
  [['MANCHE', 49.0, -1.62], ['CALVADOS', 49.02, -0.45], ['ORNE', 48.62, -0.45]].forEach(([t, la, lo]) => { const [px, py] = P(la, lo); s += `<text class="deplab" x="${px}" y="${py}" text-anchor="middle">${t}</text>`; });
  const W = [['Omaha Beach', 49.367, -0.875], ['Trévières', 49.309, -0.906], ['Cerisy-la-Forêt', 49.195, -0.934], ['Saint-Germain-d’Elle', 49.112, -0.938], ['Hill 192', 49.118, -0.985], ['Saint-Jean-des-Baisants', 49.082, -0.975], [null, 48.97, -0.985], [null, 48.9, -0.93], ['Vire', 48.838, -0.889], ['Tinchebray', 48.764, -0.733]];
  const ctx = [['Saint-Lô', 49.116, -1.091], ['Bayeux', 49.276, -0.703], ['Cherbourg', 49.639, -1.616], ['Caen', 49.182, -0.37], ['Utah Beach', 49.415, -1.175], ['Carentan', 49.303, -1.248]];
  const pts2 = W.map(([n, la, lo]) => P(la, lo));
  const dPath = 'M' + pts2.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L');
  s += `<path class="route-bg" d="${dPath}"/><path class="route" id="route" d="${dPath}"/>`;
  const [c1, c2, c3] = [P(49.09, -1.16), P(49.0, -1.28), P(48.9, -1.38)];
  s += `<path class="cobra" id="cobra" d="M${c1} Q${c2} ${c3}" marker-end="url(#arr)"/><text class="cobratxt" id="cobratxt" x="${c3[0] - 10}" y="${c3[1] + 26}" text-anchor="middle">Operation Cobra · 25 July</text>`;
  s = `<defs><marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#4b5a37"/></marker></defs>` + s;
  ctx.forEach(([n, la, lo]) => { const [px, py] = P(la, lo); s += `<g class="town ctx"><circle cx="${px}" cy="${py}" r="5"/><text x="${px + 10}" y="${py + 7}">${n}</text></g>`; });
  W.forEach(([n], i) => { if (!n) return; const [px, py] = pts2[i]; const right = !/Hill 192|Saint-Jean|Vire/.test(n); s += `<g class="town"><circle cx="${px}" cy="${py}" r="5.5"/><text x="${px + (n === 'Hill 192' ? -6 : right ? 12 : -12)}" y="${py + (n === 'Hill 192' ? -12 : 7)}" text-anchor="${right ? 'start' : 'end'}">${n}</text></g>`; });
  s += `<g class="burst" id="burst"><path d="M0 -34 L9 -12 L33 -14 L15 2 L24 26 L0 12 L-24 26 L-15 2 L-33 -14 L-9 -12Z"/><text x="40" y="8" text-anchor="start" style="fill:#8f3a1c;paint-order:stroke;stroke:#f2e6c8;stroke-width:6px">WOUNDED · 3 AUG 1944</text></g>`;
  s += `<g class="marker" id="marker"><circle r="11"/></g>`;
  svg.insertAdjacentHTML('beforeend', s);
  const route = $('#route'), total = route.getTotalLength();
  // cumulative lengths at waypoints
  const cum = [0]; for (let i = 1; i < pts2.length; i++) cum.push(cum[i - 1] + Math.hypot(pts2[i][0] - pts2[i - 1][0], pts2[i][1] - pts2[i - 1][1]));
  const at = (wp) => cum[wp] / cum[cum.length - 1];
  const STEPS = [
    { t: at(0), d: '7 June 1944', h: 'Omaha Beach', p: 'One day after D-Day, the 2nd Infantry Division comes ashore at Omaha Beach — the 9th Infantry among them.' },
    { t: at(1), d: '10 June', h: 'Trévières', p: 'The division takes Trévières and pushes south into the bocage — a maze of earthen hedgerows that turned every field into a fortress.' },
    { t: at(2), d: 'Mid-June', h: 'Through the Cerisy Forest', p: 'The advance rolls through the Forêt de Cerisy toward the ridges east of Saint-Lô.' },
    { t: at(3), d: '20 June – 10 July', h: 'The hedgerow line', p: 'Around Saint-Germain-d’Elle the front locks up. For weeks the fighting is measured in single fields.' },
    { t: at(4), d: '11–12 July', h: 'Hill 192 falls', p: 'The division storms Hill 192, the high ground that had given German observers a view across the whole sector.' },
    { t: at(4) + 0.012, d: '16 July 1944', h: 'William arrives', p: 'Rifleman William C. Giles of Knifley reaches the European Theater of Operations, fifteen days after leaving the United States.', personal: true },
    { t: at(4) + 0.03, d: '25 July', h: 'Operation Cobra', p: 'West of Saint-Lô, a massive air and ground assault breaks the German line. The breakout from Normandy begins.', cobra: true },
    { t: at(5), d: '26 July →', h: 'The Vire offensive', p: 'The 2nd Division attacks south from Saint-Germain-d’Elle; Saint-Jean-des-Baisants falls on 28–29 July. The division drives toward the town of Vire.' },
    { t: at(6), d: 'By 2 August', h: 'Across the Vire River', p: 'Still spearheading V Corps, the division is across the Vire River and pressing south.' },
    { t: at(7), d: '3 August 1944', h: 'William is wounded', p: 'In the middle of the drive toward Vire, William is hit — severe leg wounds. Purple Heart. For him, the war in France is over.', personal: true, burst: true },
    { t: at(9), d: '15 August', h: 'Tinchebray — and on', p: 'The division takes Tinchebray and heads for Brittany and the siege of Brest. The Manchus would end the war near Pilsen, Czechoslovakia.' },
  ];
  $('#mlist').innerHTML = STEPS.map((st, i) => `<li><button data-step="${i}" class="${st.personal ? 'personal' : ''}"><span>${st.d}</span>${st.h}</button></li>`).join('');
  const burstPt = route.getPointAtLength(STEPS[9].t * total); $('#burst').setAttribute('transform', `translate(${burstPt.x + 34} ${burstPt.y - 4})`);
  let prog = 0, playing = false, raf;
  function setProg(t) {
    prog = Math.max(0, Math.min(1, t)); route.style.strokeDasharray = total; route.style.strokeDashoffset = total * (1 - prog);
    const pt = route.getPointAtLength(prog * total); $('#marker').setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    $('#mrange').value = Math.round(prog * 1000);
    let cur = 0; STEPS.forEach((st, i) => { if (prog >= st.t - 0.0005) cur = i; });
    const st = STEPS[cur]; const box = $('#mstep');
    if (box.dataset.cur != cur) { box.dataset.cur = cur; box.className = 'mstep' + (st.personal ? ' personal' : ''); box.innerHTML = `<div class="d">${st.d}</div><h3>${st.h}</h3><p>${st.p}</p>`; }
    $$('.mlist button').forEach((b) => b.classList.toggle('on', +b.dataset.step === cur));
    const cob = prog >= STEPS[6].t - 0.0005; $('#cobra').classList.toggle('on', cob); $('#cobratxt').classList.toggle('on', cob);
    $('#burst').classList.toggle('on', prog >= STEPS[9].t - 0.0005);
  }
  function play() {
    if (playing) { playing = false; cancelAnimationFrame(raf); $('#mplay').textContent = '▶ Play'; return; }
    if (prog >= 0.999) setProg(0); playing = true; $('#mplay').textContent = '❚❚ Pause';
    let lastT = performance.now(); let hold = 0; let lastStep = -1;
    const tick = (now) => { const dt = now - lastT; lastT = now; if (hold > 0) { hold -= dt; } else { const next = prog + dt / 26000; const ns = STEPS.findIndex((st) => st.t > prog + 1e-6 && st.t <= next); if (ns >= 0 && ns !== lastStep) { setProg(STEPS[ns].t); lastStep = ns; hold = 2200; } else setProg(next); }
      if (prog >= 1) { playing = false; $('#mplay').textContent = '↺ Replay'; return; } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  $('#mplay').onclick = play;
  $('#mrange').addEventListener('input', (e) => { if (playing) play(); setProg(e.target.value / 1000); });
  $('#mlist').addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (!b) return; if (playing) play(); setProg(STEPS[+b.dataset.step].t); });
  setProg(0);
  // autoplay once when scrolled into view
  const io = new IntersectionObserver((es) => { if (es[0].isIntersecting && !reduce) { io.disconnect(); setTimeout(() => { if (!playing && prog === 0) play(); }, 600); } }, { threshold: 0.5 });
  io.observe(svg);
  window.__map = { setProg, STEPS };
})();
