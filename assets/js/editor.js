/* "Edit family" — shared, passcode-protected editing of the family tree (tree.html).
   Saves go to /api/tree; every save becomes a new version you can restore from "Change history". */
(function () {
  const { $, esc } = window.G; const F = window.FAMILY; const S = window.FamilySync || {};
  const ss = (k, v) => { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} };
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} };
  const state = { pass: ss('familyPass') || '', editor: ls('familyEditor') || '' };

  const ov = document.createElement('div'); ov.className = 'fe-ov'; ov.hidden = true;
  ov.innerHTML = '<div class="fe-box" role="dialog" aria-modal="true" aria-labelledby="fe-title"><button class="fe-x" type="button" aria-label="Close editor">✕</button><div class="fe-body"></div></div>';
  document.body.append(ov);
  const body = ov.querySelector('.fe-body');
  ov.querySelector('.fe-x').onclick = close; ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !ov.hidden) close(); });
  function open(html) { body.innerHTML = html; ov.hidden = false; document.body.style.overflow = 'hidden'; const f = body.querySelector('[autofocus],input,select,textarea,button'); f && f.focus(); }
  function close() { ov.hidden = true; document.body.style.overflow = ''; }
  const msg = (t, bad) => { const m = body.querySelector('.fe-msg'); if (m) { m.textContent = t; m.className = 'fe-msg' + (bad ? ' bad' : ' ok'); } };
  async function api(path, data) {
    const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ passcode: state.pass, editor: state.editor }, data)) });
    let j = {}; try { j = await r.json(); } catch (e) {}
    if (j.ok === false && r.ok) throw Object.assign(new Error(j.error), { status: 401 });
    if (r.status === 401) { state.pass = ''; ss('familyPass', null); }
    if (!r.ok) throw Object.assign(new Error(j.error || 'Something went wrong (' + r.status + ').'), { status: r.status });
    return j;
  }
  function reloadTo(hash) { ss('familyFresh', '1'); location.hash = hash || ''; location.reload(); }

  /* ---------- Step 1: passcode ---------- */
  function needPass(then) {
    if (state.pass) return then();
    open(`<h2 id="fe-title">Edit the family tree</h2>
      <p>Anyone can look at the tree. To change it, enter the <strong>family passcode</strong> (ask Joshua if you don't have it).</p>
      <form class="fe-form" id="fe-pass">
        <label>Family passcode<input name="pass" type="password" autocomplete="current-password" required autofocus></label>
        <label>Your name <small>(so the family knows who made the change)</small><input name="who" value="${esc(state.editor)}" maxlength="60" placeholder="e.g. Aunt Donna"></label>
        <div class="fe-msg" role="status" aria-live="polite"></div>
        <div class="fe-acts"><button class="fe-btn solid" type="submit">Unlock editing</button></div></form>`);
    $('#fe-pass').onsubmit = async (e) => {
      e.preventDefault(); const f = e.target; state.pass = f.pass.value.trim(); state.editor = f.who.value.trim(); ls('familyEditor', state.editor);
      msg('Checking…'); f.querySelector('button').disabled = true;
      try { await api('/api/auth', {}); ss('familyPass', state.pass); then(); }
      catch (err) { state.pass = ''; msg(err.status === 404 || err.status === 405 ? 'Editing only works on the live website.' : err.message, true); f.querySelector('button').disabled = false; }
    };
  }

  /* ---------- Menu ---------- */
  function menu() {
    needPass(() => { open(`<h2 id="fe-title">Edit family</h2>
      <p class="fe-who">Editing as <strong>${esc(state.editor || 'a family member')}</strong> · <button type="button" class="fe-link" id="fe-out">Lock editing</button></p>
      <div class="fe-big">
        <button class="fe-btn solid" id="fe-add">＋ Add a person</button>
        <label class="fe-pick">✎ Change someone<select id="fe-sel"><option value="">Choose a person…</option>${sorted().map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></label>
        <button class="fe-btn" id="fe-hist">↺ Change history &amp; undo</button>
      </div>
      <p class="fe-tip">Tip: while editing is unlocked, every person's card has a “✎ Edit this person” button.</p>
      ${S.source !== 'shared' ? '<p class="fe-msg bad">The shared tree could not be reached, so you are seeing the built-in copy. Saving may not work right now.</p>' : ''}`);
      $('#fe-add').onclick = () => form(null); $('#fe-sel').onchange = (e) => e.target.value && form(e.target.value); $('#fe-hist').onclick = hist;
      $('#fe-out').onclick = () => { state.pass = ''; ss('familyPass', null); close(); window.toast && window.toast('Editing locked'); };
    });
  }
  const sorted = () => [...F.people].sort((a, b) => a.name.localeCompare(b.name));

  /* ---------- Person form ---------- */
  function relPicker(kind, label, ids, max) {
    return `<fieldset class="fe-rel" data-kind="${kind}" data-max="${max || 99}"><legend>${label}</legend><div class="fe-chips">${ids.map((i) => chip(i)).join('')}</div>
      <select aria-label="Add to ${label}"><option value="">＋ Add…</option>${sorted().map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></fieldset>`;
  }
  const chip = (i) => F.byId[i] ? `<span class="fe-chip" data-id="${i}">${esc(F.byId[i].name)}<button type="button" aria-label="Remove ${esc(F.byId[i].name)}">✕</button></span>` : '';
  function form(id) {
    needPass(() => {
      const p = id ? F.byId[id] : { name: '', parents: [], spouses: [], children: [], facts: [], living: false, sex: 'U' };
      open(`<h2 id="fe-title">${id ? 'Edit ' + esc(p.name) : 'Add a person'}</h2>
      <div class="fe-note">🔒 <strong>Please protect living relatives.</strong> For anyone still living, the site shows only their first name and family role. Don’t add home addresses, phone numbers, emails or exact birthdates for living people.</div>
      <form class="fe-form" id="fe-person" novalidate>
        <label>Full name *<input name="name" required maxlength="120" value="${esc(p.name)}" autofocus></label>
        <label>Short name <small>(shown on small cards)</small><input name="short" maxlength="40" value="${esc(p.short || '')}" placeholder="e.g. Bill"></label>
        <div class="fe-row"><label>Sex<select name="sex"><option value="M"${p.sex === 'M' ? ' selected' : ''}>Male</option><option value="F"${p.sex === 'F' ? ' selected' : ''}>Female</option><option value="U"${p.sex !== 'M' && p.sex !== 'F' ? ' selected' : ''}>Not given</option></select></label>
        <label class="fe-check"><input type="checkbox" name="living"${p.living ? ' checked' : ''}> Still living</label></div>
        <div class="fe-dates"${p.living ? ' hidden' : ''}>
          <div class="fe-row"><label>Birth year<input name="born" inputmode="numeric" maxlength="4" value="${esc(p.born || '')}" placeholder="e.g. 1924"></label><label>Birthplace<input name="birthPlace" maxlength="120" value="${esc(p.birthPlace || '')}" placeholder="Town, County, State"></label></div>
          <div class="fe-row"><label>Death year<input name="died" inputmode="numeric" maxlength="4" value="${esc(p.died || '')}"></label><label>Place of death<input name="deathPlace" maxlength="120" value="${esc(p.deathPlace || '')}"></label></div>
          <label>Years as shown on the tree <small>(filled in for you; edit if you like, e.g. “c. 1794”)</small><input name="years" maxlength="60" value="${esc(p.years || '')}"></label>
          <label>Where they lived<input name="place" maxlength="200" value="${esc(p.place || '')}" placeholder="e.g. Adair County, KY → Indiana"></label>
        </div>
        <label>Family role <small>(one line)</small><input name="role" maxlength="160" value="${esc(p.role || '')}" placeholder="e.g. Joshua’s cousin"></label>
        <label>Their story<textarea name="bio" rows="5" maxlength="4000" placeholder="Memories, what they did, where they lived…">${esc(p.bio || '')}</textarea></label>
        <label>Facts &amp; records <small>(one per line)</small><textarea name="facts" rows="3">${esc((p.facts || []).join('\n'))}</textarea></label>
        ${relPicker('parents', 'Parents (up to 2)', p.parents || [], 2)}
        ${relPicker('spouses', 'Husband / wife', p.spouses || [])}
        ${relPicker('children', 'Children', p.children || [])}
        <fieldset class="fe-photo"><legend>Photo</legend>
          <div class="fe-ph">${p.photo ? `<img src="${esc(p.photo)}" alt="">` : '<span>No photo yet</span>'}</div>
          <label class="fe-btn">📷 Choose a photo<input type="file" accept="image/*" name="file" hidden></label>
          ${p.photo ? '<button type="button" class="fe-link" id="fe-rmph">Remove photo</button>' : ''}
          <input type="hidden" name="photo" value="${esc(p.photo || '')}"></fieldset>
        <p class="fe-hint">To place someone on the tree, link them to a parent or a husband/wife who is already on it.</p>
        <div class="fe-msg" role="status" aria-live="polite"></div>
        <div class="fe-acts sticky">
          <button class="fe-btn solid big" type="submit">💾 Save</button>
          <button class="fe-btn" type="button" id="fe-cancel">Cancel</button>
          ${id && id !== 'elijah' ? '<button class="fe-btn danger" type="button" id="fe-del">🗑 Delete</button>' : ''}
        </div></form>`);
      const f = $('#fe-person');
      f.living.onchange = () => { f.querySelector('.fe-dates').hidden = f.living.checked; };
      const yrs = () => { const b = f.born.value.trim(), d = f.died.value.trim(); if (f.years.dataset.touched) return; f.years.value = b && d ? `${b} – ${d}` : b ? `b. ${b}` : d ? `d. ${d}` : f.years.value; };
      f.years.oninput = () => (f.years.dataset.touched = '1'); f.born.oninput = yrs; f.died.oninput = yrs;
      f.querySelectorAll('.fe-rel').forEach((fs) => {
        const sel = fs.querySelector('select'), box = fs.querySelector('.fe-chips');
        sel.onchange = () => { const v = sel.value; sel.value = ''; if (!v || v === id || box.querySelector(`[data-id="${v}"]`)) return; if (box.children.length >= +fs.dataset.max) { msg('Only ' + fs.dataset.max + ' allowed here — remove one first.', true); return; } box.insertAdjacentHTML('beforeend', chip(v)); };
        box.onclick = (e) => { const b = e.target.closest('button'); if (b) b.parentElement.remove(); };
      });
      f.file.onchange = async () => {
        const file = f.file.files[0]; if (!file) return;
        if (!/^image\//.test(file.type)) return msg('Please choose a picture file.', true);
        if (file.size > 25e6) return msg('That file is very large — please pick one under 25 MB.', true);
        msg('Shrinking and uploading photo…');
        try { const data = await shrink(file, 1000); const r = await api('/api/photo', { data }); f.photo.value = r.url; f.querySelector('.fe-ph').innerHTML = `<img src="${esc(r.url)}" alt="">`; msg('Photo added — remember to press Save.'); }
        catch (err) { msg(err.message, true); }
      };
      const rm = $('#fe-rmph'); if (rm) rm.onclick = () => { f.photo.value = ''; f.querySelector('.fe-ph').innerHTML = '<span>No photo</span>'; rm.remove(); };
      $('#fe-cancel').onclick = close;
      const del = $('#fe-del'); if (del) del.onclick = async () => {
        if (!confirm(`Delete ${p.name} from the family tree?\n\nThis removes them for everyone. (You can undo it later from “Change history”.)`)) return;
        msg('Deleting…'); try { await api('/api/tree', { op: 'delete', id, base: S.version }); close(); window.toast && window.toast('Deleted'); reloadTo(''); } catch (err) { fail(err); }
      };
      f.onsubmit = async (e) => {
        e.preventDefault(); if (!f.name.value.trim()) { msg('Please type a name.', true); f.name.focus(); return; }
        const rel = (k) => [...f.querySelectorAll(`.fe-rel[data-kind="${k}"] .fe-chip`)].map((c) => c.dataset.id);
        const born = f.born.value.trim(), died = f.died.value.trim();
        if ((born && !/^\d{3,4}$/.test(born)) || (died && !/^\d{3,4}$/.test(died))) { msg('Birth and death years should be just the year, like 1924.', true); return; }
        const person = Object.assign({}, id ? p : {}, { id: id || undefined, name: f.name.value.trim(), short: f.short.value.trim(), sex: f.sex.value, living: f.living.checked,
          born, died, birthPlace: f.birthPlace.value.trim(), deathPlace: f.deathPlace.value.trim(), years: f.years.value.trim(), place: f.place.value.trim() || [f.birthPlace.value.trim(), f.deathPlace.value.trim()].filter(Boolean).join(' → '),
          role: f.role.value.trim(), bio: f.bio.value.trim(), facts: f.facts.value.split('\n').map((s) => s.trim()).filter(Boolean),
          parents: rel('parents'), spouses: rel('spouses'), children: rel('children'), photo: f.photo.value });
        delete person.gen; if (!id) delete person.id;
        const btn = f.querySelector('[type=submit]'); btn.disabled = true; msg('Saving for everyone…');
        try { const r = await api('/api/tree', { op: 'upsert', person, base: S.version }); close(); window.toast && window.toast('Saved ✓'); reloadTo('p=' + r.id); }
        catch (err) { btn.disabled = false; fail(err); }
      };
    });
  }
  function fail(err) { msg(err.message, true); if (err.status === 409) setTimeout(() => reloadTo(''), 2500); if (err.status === 401) setTimeout(() => needPass(menu), 1500); }
  function shrink(file, max) {
    return new Promise((res, rej) => { const url = URL.createObjectURL(file); const img = new Image();
      img.onload = () => { const k = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.82)); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('That picture could not be opened. Try a JPEG or PNG.')); }; img.src = url; });
  }

  /* ---------- History ---------- */
  async function hist() {
    open('<h2 id="fe-title">Change history</h2><p>Loading…</p>');
    try {
      const r = await fetch('/api/history', { cache: 'no-store' }); const { history = [] } = await r.json();
      const when = (s) => new Date(s).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
      open(`<h2 id="fe-title">Change history</h2><p>Every save is kept. Made a mistake? Press <strong>Restore</strong> on the last good version — the restore itself can be undone too.</p>
        <ol class="fe-hist">${history.map((h, i) => `<li><div><strong>${esc(h.summary || 'Change')}</strong><br><small>${esc(h.editor || 'A family member')} · ${esc(when(h.at))}${i === 0 ? ' · <em>current</em>' : ''}</small></div>${i ? `<button class="fe-btn small" data-restore="${esc(h.version)}">Restore</button>` : ''}</li>`).join('')}
        <li><div><strong>The original tree</strong><br><small>As first published</small></div><button class="fe-btn small" data-restore="seed">Restore</button></li></ol>
        <div class="fe-msg" role="status" aria-live="polite"></div><div class="fe-acts"><button class="fe-btn" id="fe-back">← Back</button></div>`);
      $('#fe-back').onclick = menu;
      body.querySelectorAll('[data-restore]').forEach((b) => (b.onclick = () => needPass(async () => {
        if (!confirm('Put the tree back the way it was at this point? (Later changes stay in the history.)')) return;
        msg('Restoring…'); try { await api('/api/history', { version: b.dataset.restore }); window.toast && window.toast('Restored ✓'); reloadTo(''); } catch (err) { fail(err); }
      })));
    } catch (e) { open('<h2 id="fe-title">Change history</h2><p class="fe-msg bad">Could not load the history right now.</p>'); }
  }

  /* ---------- Entry points ---------- */
  const tb = document.querySelector('.toolbar');
  if (tb) { const b = document.createElement('button'); b.className = 'btn small solid fe-open'; b.id = 't-edit'; b.type = 'button'; b.textContent = '✎ Edit family'; b.onclick = menu; tb.prepend(b); }
  window.FamilyEditor = { open: menu, edit: (id) => form(id), add: () => form(null) };
  const m = location.hash.match(/edit=([\w]+)/); if (m && F.byId[m[1]]) setTimeout(() => form(m[1]), 400); else if (/edit-family/.test(location.hash)) setTimeout(menu, 400);
})();
