(function () {
  const { $, $$, esc, reduce } = window.G; const K = window.GEO.ky; const svg = $('#kmap'); const PL = Object.assign({}, K.places);
  // build base map
  let s = '<g id="kworld">';
  s += Object.entries(K.states).map(([n, d]) => `<path class="st ${n === 'Kentucky' ? 'ky' : ''}" data-st="${n}" d="${d}"/>`).join('');
  s += Object.entries(K.counties).map(([n, d]) => `<path class="co ${n === 'Adair' ? 'adair' : ''}" data-co="${n}" d="${d}"/>`).join('');
  s += '<g id="routes"></g></g><g id="labs"></g><g id="pts"></g>';
  svg.insertAdjacentHTML('beforeend', s);
  const bb = (sel) => { const b = svg.querySelector(sel).getBBox(); return [b.x + b.width / 2, b.y + b.height / 2, b]; };
  // derived points
  const va = bb('[data-st="Virginia"]'); PL['Virginia'] = [va[2].x + va[2].width * 0.5, va[2].y + va[2].height * 0.55];
  const tn = bb('[data-st="Tennessee"]'); PL['Tennessee'] = [PL['Knifley'][0] - 10, tn[2].y + 60];
  const cc = (n) => { const c = bb(`[data-co="${n}"]`); return [c[0], c[1]]; };
  PL['Casey County'] = cc('Casey'); PL['Rockcastle County'] = cc('Rockcastle');
  // labels
  const lab = []; const stl = { Kentucky: [430, 560], Indiana: [330, 300], Ohio: [700, 230], Tennessee: [420, 760], Illinois: [130, 380], 'West Virginia': [880, 420], Virginia: [900, 640] };
  Object.entries(stl).forEach(([n, [x, y]]) => lab.push(`<text class="stlab" data-x="${x}" data-y="${y}" text-anchor="middle">${n}</text>`));
  ['Adair', 'Casey', 'Rockcastle'].forEach((n) => { const [x, y] = cc(n); lab.push(`<text class="colab" data-x="${x}" data-y="${y + (n === 'Adair' ? 22 : 4)}" text-anchor="middle">${n} Co.</text>`); });
  $('#labs').innerHTML = lab.join('');
  const R = [
    { id: 'va', tab: 'Over the mountains', when: 'c. 1794 – 1850', h: 'Out of Virginia', fit: ['Kentucky', 'Virginia'], p: 'Elijah Giles was born in Virginia around 1794 and came west into the young state of Kentucky — to Casey County by 1840, then on to Rockcastle County, where the 1850 census found him and his son James living side by side.',
      stops: [['Virginia', 'Virginia', 'Elijah is born here around 1794. Abagail, James’s wife, was Virginia-born too.'], ['Casey County', 'Casey County, Ky.', '1840: Elijah heads a household of nine.'], ['Rockcastle County', 'Rockcastle County, Ky.', '1850–1860: Elijah next door to James and Abagail.'], ['Neatsville', 'Neatsville, Adair Co.', 'By 1870: James W. and Abby put down roots for good.']] },
    { id: 'adair', tab: 'Home ground', when: '1870 – 1950', h: 'The Adair County hills', p: 'For eighty years the family moved only a few miles at a time — Neatsville, Casey Creek, Pellyton, Knifley — the ridges and hollows of northern Adair County, an easy ride from the Green River.', zoom: 'Adair',
      stops: [['Neatsville', 'Neatsville', '1870: James W. and Abby, ten under one roof.'], ['Casey Creek', 'Casey Creek', '1880: young Washington’s first home.'], ['Pellyton', 'Pellyton', '1900: Preston and Washington, side by side.'], ['Knifley', 'Knifley', 'Where William was born in 1924, and Luther and Nora raised nine.'], ['Columbia', 'Columbia', 'The county seat — where William’s discharge was filed in 1945.']] },
    { id: 'tn', tab: 'The wedding trip', when: 'September 1906', h: 'Over the line to Tennessee', p: '“Mr. Luther Giles and Miss Tinna Allen eloped to Tennessee a few days ago, and got married.” — Knifley news, Adair County News, 19 September 1906.', dash: true,
      stops: [['Knifley', 'Knifley', 'Luther and Nora set out together.'], ['Tennessee', 'Tennessee', 'Married across the state line.'], ['Knifley', 'Back home', 'Home to raise seven sons and two daughters.']] },
    { id: 'war', tab: 'Off to war', when: '1943', h: 'Knifley to Camp Atterbury', p: 'Inducted on 5 October 1943, William entered active service at Louisville on the 26th. The Adair County News listed him among the men sent from the reception center at Fort Thomas to Camp Atterbury, Indiana.',
      stops: [['Knifley', 'Knifley', 'Home: a young farmer, nineteen.'], ['Louisville', 'Louisville', '26 Oct 1943: active service begins.'], ['Fort Thomas', 'Fort Thomas', 'Reception center on the Ohio River.'], ['Camp Atterbury', 'Camp Atterbury, Ind.', 'November 1943: training — then France.']], link: ['war.html', 'Read the war chapter →'] },
    { id: 'north', tab: 'North for work', when: '1944 – 1959', h: 'Up the road to Indiana and Ohio', p: 'Like thousands of Kentucky families after the war, the Gileses went north where the factories were hiring. Bertha was up in Edinburg, Indiana in 1944; William was working in Wadsworth, Ohio in 1949; and by 1959 Luther’s obituary found William at Edinburg, Flossie at Columbus, Indiana, and Melzena in Wadsworth.',
      stops: [['Knifley', 'Knifley', 'The homeplace.'], ['Edinburg', 'Edinburg, Ind.', '1944: Miss Bertha Burton is at Edinburg. 1959: William lives here.'], ['Columbus', 'Columbus, Ind.', '1959: Flossie and one of her brothers.'], ['Wadsworth', 'Wadsworth, Ohio', '1949: William works here. 1959: Melzena, too.']] },
    { id: 'home', tab: 'Home again', when: 'to 2001', h: 'Back to the Kentucky hills', p: 'William came home to south-central Kentucky. He made his home at Edmonton, retired from Cosco Industries, and died at Glasgow in March 2001. He rests at Heavenly Hill Cemetery near Columbia — a few miles from Knifley, where it all began.',
      stops: [['Edinburg', 'Edinburg, Ind.', 'Years of work up north.'], ['Edmonton', 'Edmonton, Ky.', 'Home with Dular.'], ['Glasgow', 'Glasgow, Ky.', '16 March 2001: William dies, 77.'], ['Columbia', 'Heavenly Hill, Columbia', 'Laid to rest in Adair County.']] },
    { id: 'hershel', tab: 'Hershel’s Indiana', when: '1959 – 2022', h: 'Franklin to Morgantown', p: 'Hershel was born in Franklin, Indiana, in 1959 and built his life in the hills south of Indianapolis, framing houses across Johnson, Morgan and Brown counties. He lived for years in Nineveh, later in Martinsville, and rests at East Hill Cemetery in Morgantown.',
      stops: [['Franklin', 'Franklin, Ind.', '3 July 1959: Hershel is born.'], ['Nineveh', 'Nineveh, Ind.', 'Home for many years.'], ['Martinsville', 'Martinsville, Ind.', '14 Nov 2022: Hershel dies at home, 63.'], ['Morgantown', 'Morgantown, Ind.', '19 Nov 2022: funeral; burial at East Hill Cemetery.']] },
  ];
  $('#pl-tabs').innerHTML = R.map((r, i) => `<button role="tab" id="tab-${r.id}" aria-selected="false" data-r="${i}"><span>${esc(r.tab)}</span><small>${esc(r.when)}</small></button>`).join('');
  // all points
  const ptNames = [...new Set(R.flatMap((r) => r.stops.map((s) => s[0])))];
  $('#pts').innerHTML = ptNames.map((n) => { const [x, y] = PL[n]; return `<g class="pt" data-pt="${esc(n)}" data-x="${x}" data-y="${y}"><circle r="4"/><text x="8" y="4"></text></g>`; }).join('');
  // viewBox animation
  let vb = [0, 0, K.w, K.h], anim;
  function zoomTo(t) { cancelAnimationFrame(anim); const from = vb.slice(); const t0 = performance.now(); const D = reduce ? 1 : 900;
    const f = (now) => { const k = Math.min(1, (now - t0) / D); const e = 1 - Math.pow(1 - k, 3); vb = from.map((v, i) => v + (t[i] - v) * e); place(); if (k < 1) anim = requestAnimationFrame(f); }; anim = requestAnimationFrame(f); }
  function fitPts(names, pad = 70) {
    const xs = names.map((n) => PL[n][0]), ys = names.map((n) => PL[n][1]);
    let x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad, y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
    let w = x1 - x0, h = y1 - y0; const ar = K.w / K.h; if (w / h < ar) { const nw = h * ar; x0 -= (nw - w) / 2; w = nw; } else { const nh = w / ar; y0 -= (nh - h) / 2; h = nh; }
    return [x0, y0, w, h];
  }
  function place() { const S = K.w / vb[2]; $('#kworld').setAttribute('transform', `scale(${S}) translate(${-vb[0]} ${-vb[1]})`); $$('#routes .rt').forEach((r) => (r.style.strokeWidth = 4 / S));
    const X = (x) => (x - vb[0]) * S, Y = (y) => (y - vb[1]) * S;
    $$('#pts .pt').forEach((g) => { g.setAttribute('transform', `translate(${X(+g.dataset.x)} ${Y(+g.dataset.y)})`); g.querySelector('circle').setAttribute('r', g.classList.contains('on') ? 6 : 4); });
    $$('#labs text').forEach((t) => { t.setAttribute('x', X(+t.dataset.x)); t.setAttribute('y', Y(+t.dataset.y)); t.style.display = t.classList.contains('colab') && S < 2 ? 'none' : ''; }); }
  const curve = (a, b, bend = 0.18) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; const dx = b[0] - a[0], dy = b[1] - a[1]; return `Q${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
  let curR = -1;
  function pick(i, focusTab) {
    curR = i; const r = R[i];
    $$('#pl-tabs button').forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
    if (focusTab) $(`#pl-tabs [data-r="${i}"]`).focus();
    $('#pl-head').innerHTML = `<div class="d">${esc(r.when)}</div><h2>${esc(r.h)}</h2><p>${esc(r.p)}</p>${r.link ? `<p style="margin-top:.6em"><a href="${r.link[0]}">${esc(r.link[1])}</a></p>` : ''}`;
    $('#pl-stops').innerHTML = r.stops.map((s, k) => `<li><button data-s="${k}"><b>${esc(s[1])}</b><small>${esc(s[2])}</small></button></li>`).join('');
    const names = r.stops.map((s) => s[0]);
    $$('.pt').forEach((g) => { const on = names.includes(g.dataset.pt); g.classList.toggle('on', on); g.classList.remove('cur'); if (on) { const st = r.stops.find((s) => s[0] === g.dataset.pt); g.querySelector('text').textContent = st[0] === 'Virginia' || st[0] === 'Tennessee' ? st[1] : st[1].replace(/, (Ind|Ohio|Ky)\.?$/, ''); } });
    let d = `M${PL[names[0]].join(' ')}`; for (let k = 1; k < names.length; k++) d += ' ' + curve(PL[names[k - 1]], PL[names[k]], names[k] === names[k - 2] ? -0.25 : 0.18);
    $('#routes').innerHTML = `<path class="rt ghost" d="${d}"/><path class="rt ${r.dash ? 'dash' : ''}" id="rt" d="${d}"/>`; place();
    const p = $('#rt'), L = p.getTotalLength();
    if (!r.dash) { p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.getBoundingClientRect(); p.style.transition = reduce ? 'none' : 'stroke-dashoffset 2.2s ease .5s'; p.style.strokeDashoffset = 0; }
    else { p.style.opacity = 0; p.style.transition = 'opacity 1.2s .6s'; p.getBoundingClientRect(); p.style.opacity = 1; }
    if (r.fit) { const bs = r.fit.map((n) => svg.querySelector(`[data-st="${n}"]`).getBBox()); const x0 = Math.min(...bs.map((b) => b.x)), y0 = Math.min(...bs.map((b) => b.y)), x1 = Math.max(...bs.map((b) => b.x + b.width)), y1 = Math.max(...bs.map((b) => b.y + b.height)); PL.__a = [x0 - 10, y0 - 10]; PL.__b = [x1 + 10, y1 + 10]; zoomTo(fitPts(['__a', '__b'], 0)); }
    else zoomTo(r.zoom === 'Adair' ? fitPts(names, 22) : fitPts(names, 80));
    history.replaceState(null, '', '#' + r.id);
  }
  function stop(k) { const r = R[curR]; const n = r.stops[k][0]; $$('.pl-stops button').forEach((b) => b.classList.toggle('on', +b.dataset.s === k)); $$('.pt').forEach((g) => g.classList.toggle('cur', g.dataset.pt === n)); }
  $('#pl-tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-r]'); if (b) pick(+b.dataset.r); });
  $('#pl-tabs').addEventListener('keydown', (e) => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault(); pick((curR + (e.key === 'ArrowRight' ? 1 : R.length - 1)) % R.length, true); });
  $('#pl-stops').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (b) stop(+b.dataset.s); });
  $('#pl-all').onclick = () => zoomTo([0, 0, K.w, K.h]);
  const start = Math.max(0, R.findIndex((r) => '#' + r.id === location.hash));
  pick(start); place();
  window.__pl = { pick, stop, R };
})();
