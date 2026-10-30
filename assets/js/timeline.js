(function () {
  const { $, $$, esc, reduce } = window.G; const F = window.FAMILY;
  const EV = window.TIMELINE.slice().sort((a, b) => a.y - b.y); const Y0 = 1790, Y1 = 2026;
  const track = $('#tl-track'); const pct = (y) => ((y - Y0) / (Y1 - Y0)) * 100;
  // axis
  let ax = ''; for (let y = Y0; y <= Y1; y += 10) { const c = y % 50 === 0; ax += `<i class="${c ? 'c' : ''}" style="left:${pct(y)}%"></i>`; if (y % 20 === 0) ax += `<b style="left:${pct(y)}%">${y}</b>`; }
  $('#tl-axis').innerHTML = ax;
  // lifetime bands for the direct line (deceased only)
  const B = [['elijah', 1794, 1860, true], ['jamesw', 1824, 1913], ['preston', 1851, 1900, true], ['luther', 1882, 1959], ['william', 1924, 2001], ['hershel', 1959, 2022]];
  $('#tl-bands').innerHTML = B.map(([id, a, b, open], i) => `<button class="tl-band ${open ? 'open' : ''}" data-person="${id}" style="left:${pct(a)}%;width:${pct(b + (open ? 12 : 0)) - pct(a)}%;top:${(i % 3) * 28}px" title="${esc(F.byId[id].name)}">${esc(F.byId[id].short)}</button>`).join('');
  // dots, staggered when crowded
  let lastX = -99, lane = 0;
  $('#tl-dots').innerHTML = EV.map((e, i) => { const x = pct(e.y); lane = x - lastX < 1.2 ? (lane + 1) % 3 : 0; lastX = x; return `<button class="tl-dot ${e.type === 'world' ? 'w' : ''}" data-i="${i}" style="left:${x}%;top:${lane * 14 - 14}px" aria-label="${esc(e.d + ': ' + e.t)}"></button>`; }).join('');
  $('#tl-list').innerHTML = EV.map((e, i) => `<li><button data-i="${i}" class="${e.type === 'world' ? 'w' : ''}"><span>${esc(e.d)}</span>${esc(e.t)}</button></li>`).join('');
  let cur = -1, year = EV[0].y;
  const visible = () => EV.map((e, i) => i).filter((i) => $('#tl-world').checked || EV[i].type !== 'world');
  function show(i, moveNeedle = true) {
    if (i === cur) return; cur = i; const e = EV[i];
    if (moveNeedle) setYear(e.y, false);
    $$('.tl-dot').forEach((d) => d.classList.toggle('on', +d.dataset.i === i));
    const card = $('#tl-card'); const p = e.who && F.byId[e.who];
    card.className = 'tl-card' + (e.img ? '' : ' noimg') + (e.type === 'world' ? ' w' : '');
    card.innerHTML = `<div>${e.type === 'world' ? '<span class="tag">The wider world</span>' : ''}<div class="d">${esc(e.d)}</div><h2>${esc(e.t)}</h2>${e.txt ? `<p>${esc(e.txt)}</p>` : ''}${p ? `<p><button class="chip" data-person="${p.id}"><span class="dot"></span>Meet ${esc(p.short)}</button></p>` : ''}<p class="mnote" style="font-family:var(--ui);font-size:.75rem;color:var(--ink2)">${visible().indexOf(i) + 1} of ${visible().length}</p></div>${e.img ? `<figure><img src="${e.img}" alt="Original record: ${esc(e.t)}"></figure>` : ''}`;
    card.style.animation = 'none'; card.offsetWidth; card.style.animation = '';
  }
  function setYear(y, pick = true) {
    year = Math.max(Y0, Math.min(Y1, y)); $('#tl-needle').style.left = pct(year) + '%';
    $('#tl-year').textContent = Math.floor(year); track.setAttribute('aria-valuenow', Math.floor(year));
    track.setAttribute('aria-valuetext', Math.floor(year) + (cur >= 0 ? ': ' + EV[cur].t : ''));
    if (pick) { const vis = visible(); let best = vis[0]; vis.forEach((i) => { if (EV[i].y <= year + 0.05) best = i; }); show(best, false); }
  }
  const yAt = (clientX) => { const r = track.getBoundingClientRect(); return Y0 + ((clientX - r.left) / r.width) * (Y1 - Y0); };
  let drag = false;
  track.addEventListener('pointerdown', (e) => { const d = e.target.closest('.tl-dot'); if (d) { stop(); show(+d.dataset.i); return; } if (e.target.closest('.tl-band')) return; drag = true; stop(); track.classList.add('drag'); track.setPointerCapture(e.pointerId); setYear(yAt(e.clientX)); });
  track.addEventListener('pointermove', (e) => { if (drag) setYear(yAt(e.clientX)); });
  const end = () => { if (!drag) return; drag = false; track.classList.remove('drag'); if (cur >= 0) setYear(EV[cur].y, false); };
  track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
  const step = (dir) => { const vis = visible(); let k = vis.indexOf(cur); k = k < 0 ? 0 : Math.max(0, Math.min(vis.length - 1, k + dir)); show(vis[k]); };
  track.addEventListener('keydown', (e) => {
    const vis = visible();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') step(1); else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') step(-1);
    else if (e.key === 'Home') show(vis[0]); else if (e.key === 'End') show(vis[vis.length - 1]);
    else if (e.key === 'PageUp') setYear(year + 10); else if (e.key === 'PageDown') setYear(year - 10); else return;
    e.preventDefault(); stop();
  });
  $('#tl-prev').onclick = () => { stop(); step(-1); }; $('#tl-next').onclick = () => { stop(); step(1); };
  $('#tl-list').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { stop(); show(+b.dataset.i); track.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); } });
  $('#tl-world').onchange = (e) => { track.classList.toggle('noworld', !e.target.checked); if (!e.target.checked && EV[cur].type === 'world') step(1); };
  let timer = null;
  function stop() { if (timer) { clearInterval(timer); timer = null; $('#tl-play').textContent = '▶ Play'; $('#tl-play').setAttribute('aria-pressed', 'false'); } }
  $('#tl-play').onclick = () => {
    if (timer) return stop();
    const vis = visible(); if (vis.indexOf(cur) === vis.length - 1) show(vis[0]);
    $('#tl-play').textContent = '❚❚ Pause'; $('#tl-play').setAttribute('aria-pressed', 'true');
    timer = setInterval(() => { const v = visible(); const k = v.indexOf(cur); if (k >= v.length - 1) return stop(); show(v[k + 1]); }, 3200);
  };
  // scroll needle into view on mobile
  const keepVisible = () => { const sc = $('.tl-scroll'); if (sc.scrollWidth > sc.clientWidth) { const x = (pct(year) / 100) * sc.scrollWidth; if (x < sc.scrollLeft + 40 || x > sc.scrollLeft + sc.clientWidth - 40) sc.scrollLeft = x - sc.clientWidth / 2; } };
  new MutationObserver(keepVisible).observe($('#tl-needle'), { attributes: true });
  show(0);
  window.__tl = { show, setYear, EV };
})();
