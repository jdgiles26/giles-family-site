/* Tree layout + SVG rendering shared by tree.html (interactive) and poster.html (print/export). */
window.TreeCore = (function () {
  const F = window.FAMILY;
  const CW = 196, CH = 74, COL = 224, ROW = 150, STK = 88, MAXSTACK = 4;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bloodKids = (id) => (F.byId[id].children || []).filter((c) => F.byId[c] && !F.byId[c].married);

  function layout(collapsed, root) {
    collapsed = collapsed || new Set(); root = root || 'elijah';
    const nodes = [], edges = []; let col = 0;
    const vis = (id) => (collapsed.has(id) ? [] : bloodKids(id));
    function place(id, depth) {
      const kids = vis(id);
      if (!kids.length) { const n = { id, x: col * COL, y: depth * ROW, depth }; col++; nodes.push(n); return n; }
      // group consecutive leaves into stacks
      const groups = []; let cur = null;
      kids.forEach((k) => { const leaf = !vis(k).length; if (leaf) { if (!cur || cur.length >= MAXSTACK) { cur = []; groups.push(cur); } cur.push(k); } else { cur = null; groups.push(k); } });
      const placed = [];
      groups.forEach((g) => {
        if (Array.isArray(g)) { const x = col * COL; g.forEach((k, i) => { const n = { id: k, x, y: (depth + 1) * ROW + i * STK, depth: depth + 1, stacked: g.length > 1, stackIndex: i }; nodes.push(n); placed.push({ n, top: i === 0, stack: g.length > 1 ? g.length : 0 }); }); col++; }
        else { const n = place(g, depth + 1); placed.push({ n, top: true, stack: 0 }); }
      });
      const tops = placed.filter((p) => p.top).map((p) => p.n);
      const minX = Math.min(...tops.map((n) => n.x)), maxX = Math.max(...tops.map((n) => n.x));
      const me = { id, x: (minX + maxX) / 2, y: depth * ROW, depth, kids: placed.length };
      nodes.push(me);
      // edges
      const busY = me.y + CH + 26;
      edges.push(`M${me.x} ${me.y + CH} V${busY}`);
      if (maxX > minX) edges.push(`M${minX} ${busY} H${maxX}`);
      tops.forEach((n) => edges.push(`M${n.x} ${busY} V${n.y}`));
      placed.filter((p) => p.n.stacked).forEach((p) => { if (p.n.stackIndex > 0) { const sx = p.n.x - CW / 2 - 12; edges.push(`M${p.n.x - CW / 2 - 12} ${p.n.y - STK + CH / 2} V${p.n.y + CH / 2} H${p.n.x - CW / 2}`); } else { edges.push(`M${p.n.x - CW / 2} ${p.n.y + CH / 2} H${p.n.x - CW / 2 - 12}`); } });
      return me;
    }
    place(root, 0);
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const bounds = { x0: Math.min(...xs) - CW / 2 - 30, x1: Math.max(...xs) + CW / 2 + 30, y0: -30, y1: Math.max(...ys) + CH + 40 };
    return { nodes, edges, bounds };
  }

  function nodeSVG(n, opts) {
    const p = F.byId[n.id]; const kids = bloodKids(n.id).length; const col = opts.collapsed && opts.collapsed.has(n.id);
    const sp = p.spouses.map((s) => F.byId[s]).filter(Boolean);
    const yrs = p.living ? 'Living' : (p.years || '');
    const x = n.x - CW / 2, y = n.y;
    const cls = ['node', p.line ? 'line' : '', p.sex === 'F' ? 'f' : 'm', p.living ? 'living' : '', n.id === 'joshua' ? 'me' : ''].join(' ');
    let s = `<g class="${cls}" data-id="${n.id}" data-gen="${p.gen}" transform="translate(${x} ${y})" tabindex="0" role="button" aria-label="${esc(p.name)}${p.living ? '' : ', ' + esc(p.years || '')}. ${esc(p.role || '')}">`;
    s += `<rect class="card" width="${CW}" height="${CH}" rx="4"/><rect class="band" width="5" height="${CH}" rx="2"/>`;
    const name = p.name.length > 26 ? p.short : p.name;
    s += `<text class="nm" x="14" y="23">${esc(name)}</text>`;
    s += `<text class="yr" x="14" y="40">${esc(yrs)}</text>`;
    if (sp.length) s += `<text class="sp" x="14" y="60" data-person="${sp[0].id}">∞ ${esc(sp.map((q) => q.short).join(', later '))}</text>`;
    else if (p.role) s += `<text class="sp rl" x="14" y="60">${esc((p.role.split('—')[0]).slice(0, 30))}</text>`;
    if (kids && opts.toggles) s += `<g class="tog" data-toggle="${n.id}" transform="translate(${CW / 2} ${CH})" role="button" aria-label="${col ? 'Expand' : 'Collapse'} children of ${esc(p.short)}" tabindex="0"><circle r="10"/><path d="M-4 0H4${col ? 'M0 -4V4' : ''}"/></g>`;
    s += '</g>';
    return s;
  }

  function render(L, opts) {
    opts = opts || {};
    return `<g class="edges">${L.edges.map((d) => `<path d="${d}"/>`).join('')}</g><g class="nodes">${L.nodes.map((n) => nodeSVG(n, opts)).join('')}</g>`;
  }

  const POSTER_CSS = `.edges path{fill:none;stroke:#8a6a44;stroke-width:1.6}.card{fill:#f7edd6;stroke:#8a6a44;stroke-width:1}.band{fill:#8f3a1c}.f .band{fill:#4b5a37}.line .card{stroke:#b38432;stroke-width:2.6}.me .card{fill:#fff3d6}.nm{font:700 15px 'Playfair Display',Georgia,serif;fill:#2a1c10}.yr{font:12px 'Special Elite','Courier New',monospace;fill:#5a4330}.sp{font:italic 12.5px 'IM Fell English',Georgia,serif;fill:#8f3a1c}.tog{display:none}`;
  function posterSVG() {
    const L = layout(new Set()); const b = L.bounds; const pad = 60, head = 170;
    const W = b.x1 - b.x0 + pad * 2, H = b.y1 - b.y0 + pad * 2 + head;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><style>${POSTER_CSS}</style>
      <rect width="${W}" height="${H}" fill="#f1e4c8"/><rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#8f3a1c" stroke-width="3"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#8f3a1c" stroke-width="1"/>
      <text x="${W / 2}" y="100" text-anchor="middle" style="font:800 64px 'Playfair Display',Georgia,serif;fill:#2a1c10">The Giles of Adair County, Kentucky</text>
      <text x="${W / 2}" y="140" text-anchor="middle" style="font:italic 26px 'IM Fell English',Georgia,serif;fill:#8f3a1c">Seven generations, from Elijah Giles (born c. 1794, Virginia) to Joshua — gold frames mark Joshua’s direct line</text>
      <g transform="translate(${pad - b.x0} ${pad + head - b.y0})">${render(L, {})}</g></svg>`;
  }

  /* Fan chart: Joshua at the hub, paternal ancestry in Ahnentafel order */
  function fanSVG(size) {
    const R0 = 70, RW = 62, rings = 6; const cx = size / 2, cy = size / 2 + 10;
    const slots = { 1: ['hershel'], 2: ['william', 'bertha'], 3: ['luther', 'nora', 'john_burton', null], 4: ['preston', 'susan'], 5: ['jamesw', 'abby'], 6: ['elijah', 'susan_e'] };
    const pt = (r, a) => [cx + r * Math.cos(a), cy - r * Math.sin(a)];
    let s = `<g class="fan">`;
    for (let ring = 1; ring <= rings; ring++) {
      const n = Math.pow(2, ring - 1), r1 = R0 + (ring - 1) * RW, r2 = r1 + RW - 3; const ids = slots[ring] || [];
      for (let i = 0; i < n; i++) {
        const a1 = Math.PI - (i / n) * Math.PI, a2 = Math.PI - ((i + 1) / n) * Math.PI; const id = ids[i] || null; const p = id && F.byId[id];
        const [x1, y1] = pt(r1, a1), [x2, y2] = pt(r2, a1), [x3, y3] = pt(r2, a2), [x4, y4] = pt(r1, a2); const large = a1 - a2 > Math.PI ? 1 : 0;
        const d = `M${x1} ${y1} L${x2} ${y2} A${r2} ${r2} 0 ${large} 1 ${x3} ${y3} L${x4} ${y4} A${r1} ${r1} 0 ${large} 0 ${x1} ${y1}Z`;
        s += `<path class="seg ${p ? (p.sex === 'F' ? 'f' : 'm') : 'empty'} r${ring}" d="${d}"${p ? ` data-person="${id}" tabindex="0" role="button" aria-label="${esc(p.name)} — ${esc(p.role || '')}"` : ' aria-hidden="true"'}/>`;
        if (p) {
          const am = (a1 + a2) / 2, rm = (r1 + r2) / 2; const [tx, ty] = pt(rm, am); const deg = -am * 180 / Math.PI;
          const radial = ring >= 4; const rot = radial ? (deg < -90 ? deg + 180 : deg) : deg + 90;
          const label = ring >= 5 ? p.short : (ring >= 3 ? p.short : p.name.replace(/ \(.*\)/, '').replace(/ Giles$/, ''));
          s += `<text class="fl r${ring}" transform="translate(${tx} ${ty}) rotate(${rot})" text-anchor="middle" dy="${p.years && !p.living && ring <= 3 ? -2 : 4}">${esc(label)}</text>`;
          if (p.years && !p.living && ring <= 3) s += `<text class="fy" transform="translate(${tx} ${ty}) rotate(${rot})" text-anchor="middle" dy="13">${esc(p.years)}</text>`;
        }
      }
    }
    s += `<path class="hub" d="M${cx - R0 + 3} ${cy} A${R0 - 3} ${R0 - 3} 0 0 1 ${cx + R0 - 3} ${cy} Z" data-person="joshua" tabindex="0" role="button" aria-label="Joshua and Shelby"/><text class="hubt" x="${cx}" y="${cy - 26}" text-anchor="middle">Joshua</text><text class="hubt" x="${cx}" y="${cy - 8}" text-anchor="middle" data-person="shelby" style="font-size:.8em">&amp; Shelby</text>`;
    const labels = ['Father', 'Grandparents', 'Great-grandparents', '2nd great', '3rd great', '4th great'];
    labels.forEach((l, i) => { const r = R0 + i * RW + RW / 2; s += `<line x1="${cx + r}" x2="${cx + r}" y1="${cy + 4}" y2="${cy + (i % 2 ? 26 : 10)}" stroke="currentColor" opacity=".35"/><text class="ringl" x="${cx + r}" y="${cy + (i % 2 ? 36 : 20)}" text-anchor="middle">${l}</text>`; });
    return s + '</g>';
  }
  return { layout, render, posterSVG, fanSVG, CW, CH, bloodKids, POSTER_CSS };
})();
