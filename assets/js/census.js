(function () {
  const { $, $$, esc } = window.G; const C = window.CENSUS; const YRS = Object.keys(C).map(Number).sort();
  const IMG = { 1850: ['assets/img/archive/census-1850-rockcastle.jpg', 'Rockcastle, 1850'], 1870: ['assets/img/archive/census-1870-neatsville.jpg', 'Neatsville, 1870'], 1950: ['assets/img/archive/census-1950-william.jpg', 'Sheet, 1950'] };
  // houses: log cabin (early), dogtrot / frame farmhouse (later)
  const house = (yr, seed) => {
    const sky = `<circle cx="${270 + (seed % 3) * 18}" cy="34" r="14" fill="#f3d58a" opacity=".7"/>`;
    const hills = `<path d="M0 118 C60 92 120 104 180 96 S300 80 400 100 V150 H0Z" fill="#c9b282"/><path d="M0 132 C80 118 160 128 240 118 S340 112 400 124 V150 H0Z" fill="#a89263"/>`;
    const tree = (x, s) => `<g transform="translate(${x} ${118 - 40 * s}) scale(${s})"><rect x="-2" y="26" width="4" height="16" fill="#5a4326"/><path d="M0 -6 L16 28 H-16Z" fill="#4b5a37"/><path d="M0 6 L19 36 H-19Z" fill="#4b5a37"/></g>`;
    let b;
    if (yr < 1880) b = `<g transform="translate(150 66)"><path d="M-8 26 L50 -6 L108 26Z" fill="#6b4a2a"/><rect x="0" y="26" width="100" height="40" fill="#8a6440"/>${[32, 40, 48, 56].map((y) => `<line x1="0" x2="100" y1="${y}" y2="${y}" stroke="#5a3d22" stroke-width="2"/>`).join('')}<rect x="42" y="40" width="16" height="26" fill="#3a2614"/><rect x="14" y="36" width="14" height="12" fill="#f3d58a"/><rect x="74" y="36" width="14" height="12" fill="#f3d58a"/><rect x="80" y="6" width="10" height="20" fill="#7a6a5a"/><path d="M85 4 q8 -10 0 -18 q-8 -8 2 -16" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none"/></g>`;
    else if (yr < 1940) b = `<g transform="translate(140 56)"><path d="M-6 30 L60 -4 L126 30Z" fill="#7d3a26"/><rect x="0" y="30" width="120" height="46" fill="#efe4c9" stroke="#8a7350"/><rect x="0" y="46" width="120" height="4" fill="#cdbb94"/><rect x="52" y="48" width="16" height="28" fill="#5a3d22"/><rect x="14" y="40" width="14" height="18" fill="#f3d58a" stroke="#8a7350"/><rect x="92" y="40" width="14" height="18" fill="#f3d58a" stroke="#8a7350"/><rect x="-6" y="56" width="132" height="4" fill="#8a7350"/><rect x="20" y="6" width="9" height="20" fill="#7a5a4a"/></g>`;
    else b = `<g transform="translate(130 60)"><path d="M-6 26 L70 -2 L146 26Z" fill="#4a4a48"/><rect x="0" y="26" width="140" height="46" fill="#f6efdc" stroke="#8a7350"/><rect x="62" y="42" width="16" height="30" fill="#7d3a26"/><rect x="16" y="38" width="22" height="16" fill="#f3d58a" stroke="#8a7350"/><rect x="102" y="38" width="22" height="16" fill="#f3d58a" stroke="#8a7350"/><line x1="160" y1="20" x2="160" y2="80" stroke="#5a4326" stroke-width="3"/><line x1="152" y1="24" x2="168" y2="24" stroke="#5a4326" stroke-width="2"/><path d="M-30 74 Q 40 66 120 74" stroke="#8a7350" stroke-width="2" fill="none" stroke-dasharray="4 4"/></g>`;
    return `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sky}${hills}${tree(60 + (seed % 4) * 10, .9)}${tree(96, .7)}${b}${tree(350 - (seed % 3) * 14, 1)}<path d="M0 140 H400" stroke="#8a7350" stroke-width="2" stroke-dasharray="2 6"/></svg>`;
  };
  const ageNum = (a) => (typeof a === 'number' ? a : a === 'infant' ? 0 : /½/.test(a) ? parseFloat(a) : /^\d/.test(a || '') ? parseInt(a) : null);
  const person = (m) => {
    let a = ageNum(m.a); const kid = /boy|girl|baby|son|daughter|infant/i.test((m.n || '') + (m.r || '')) && a == null ? 6 : a;
    const h = kid == null ? 72 : Math.round(34 + Math.min(1, kid / 18) * 38); const f = m.s === 'F';
    const many = /^(\d) /.exec(m.n || ''); const n = many ? +many[1] : 1;
    const one = `<svg class="${f ? 'f' : ''}" style="--h:${h}px" viewBox="0 0 24 60" aria-hidden="true"><circle cx="12" cy="7" r="5.5" fill="currentColor"/>${f ? '<path d="M6 15 h12 l5 30 H1Z" fill="currentColor"/><rect x="7.5" y="44" width="3" height="15" fill="currentColor"/><rect x="13.5" y="44" width="3" height="15" fill="currentColor"/>' : '<path d="M5 15 h14 l2 22 h-3 v22 h-4.5 v-18 h-3 v18 H6 V37 H3Z" fill="currentColor"/>'}</svg>`;
    return one.repeat(n);
  };
  $('#cz-years').innerHTML = YRS.map((y, i) => `<button role="radio" aria-checked="false" data-i="${i}">${y}</button>`).join('');
  $('#cz-range').max = YRS.length - 1;
  function show(i) {
    const y = YRS[i], c = C[y];
    $$('#cz-years button').forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; });
    $('#cz-range').value = i;
    const total = c.homes.reduce((s, h) => s + h.members.reduce((t, m) => t + (+(/^(\d) /.exec(m.n || '') || [0, 1])[1]), 0), 0);
    $('#cz-stage').innerHTML = `<div class="cz-intro"><div class="cz-big">${y}</div><div><h2>${esc(c.place)}</h2><p>${esc(c.note)}</p><div class="cz-count">${c.homes.length} household${c.homes.length > 1 ? 's' : ''} · ${total} people</div></div>${IMG[y] ? `<a class="cz-orig" href="${IMG[y][0]}" target="_blank" rel="noopener"><img src="${IMG[y][0]}" alt="The original ${y} census page"><small>See the original page</small></a>` : '<span></span>'}</div>
    <div class="cz-homes">${c.homes.map((h, k) => `<article class="home ${h.star ? 'star' : ''}"><div class="art">${house(y, k + y)}${h.star ? '<span class="tagline">Joshua’s line</span>' : ''}</div><div class="body"><h3>${esc(h.head)}</h3><div class="where">${esc(h.where)}</div><div class="fam" aria-hidden="true">${h.members.map(person).join('')}</div>
      <ul class="mem">${h.members.map((m) => `<li><span>${m.id ? `<button data-person="${m.id}">${esc(m.n)}</button>` : esc(m.n)}${m.a != null ? `<span class="a">${esc(String(m.a))}</span>` : ''}</span><span class="r">${esc(m.r || '')}</span></li>`).join('')}</ul></div></article>`).join('')}</div>`;
    history.replaceState(null, '', '#' + y);
  }
  $('#cz-years').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
  $('#cz-years').addEventListener('keydown', (e) => { const cur = +$('#cz-range').value; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : YRS.length - 1)) % YRS.length; show(n); $(`#cz-years [data-i="${n}"]`).focus(); } });
  $('#cz-range').addEventListener('input', (e) => show(+e.target.value));
  const h = +location.hash.slice(1); show(Math.max(0, YRS.indexOf(h)));
  window.__cz = { show, YRS };
})();
