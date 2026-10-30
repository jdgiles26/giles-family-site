(function () {
  const { $, esc } = window.G; const F = window.FAMILY;
  const people = F.people.slice().sort((a, b) => (a.gen - b.gen) || a.name.localeCompare(b.name));
  const opts = people.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
  $('#mw-about').insertAdjacentHTML('beforeend', opts); $('#mw-show').insertAdjacentHTML('beforeend', opts);
  const q = new URLSearchParams(location.search).get('about'); if (q && F.byId[q]) { $('#mw-about').value = q; }
  let all = []; let storage = true;
  const when = (iso) => { try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { return ''; } };
  function render() {
    const f = $('#mw-show').value; const list = all.filter((m) => !f || m.about === f);
    if (!list.length) { $('#mw-wall').innerHTML = `<p class="mw-empty">${storage ? (f ? 'No memories of ' + esc(F.byId[f].short || F.byId[f].name) + ' yet. Be the first to pin one.' : 'The wall is waiting for its first memory. Be the first to pin one.') : 'The Memory Wall will open as soon as the family\u2019s shared storage is connected. Until then, nothing can be saved here.'}</p>`; return; }
    $('#mw-wall').innerHTML = list.map((m, i) => { const p = m.about && F.byId[m.about]; return `<article class="mw-note" style="--r:${((i * 37) % 5) - 2}deg"><p>${esc(m.text)}</p><footer><b>${esc(m.name)}</b>${p ? ` · about <button class="chip" data-person="${p.id}"><span class="dot"></span>${esc(p.short || p.name)}</button>` : ''} · ${esc(when(m.at))}</footer></article>`; }).join('');
  }
  function load() { return fetch('/api/memories', { cache: 'no-store' }).then((r) => r.json()).then((d) => { all = d.memories || []; storage = d.storage !== false; render(); }).catch(() => { $('#mw-wall').innerHTML = '<p class="mw-empty">The Memory Wall could not be loaded just now. Please try again later.</p>'; }); }
  $('#mw-show').onchange = render;
  $('#mw-text').addEventListener('input', (e) => { $('#mw-count').textContent = e.target.value.length + ' / 1200'; });
  try { $('#mw-name').value = localStorage.getItem('editorName') || ''; } catch (e) {}
  $('#mw-form').addEventListener('submit', (e) => {
    e.preventDefault(); const msg = $('#mw-msg'); msg.className = 'mw-msg'; msg.textContent = 'Saving…'; $('#mw-send').disabled = true;
    const payload = { name: $('#mw-name').value, about: $('#mw-about').value, text: $('#mw-text').value, passcode: $('#mw-pass').value };
    fetch('/api/memories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => { if (!ok) throw new Error(d.error || 'Could not save that memory.'); msg.textContent = 'Pinned. Thank you for sharing it.'; $('#mw-text').value = ''; $('#mw-count').textContent = '0 / 1200'; try { localStorage.setItem('editorName', payload.name); } catch (e) {} return load(); })
      .catch((err) => { msg.className = 'mw-msg err'; msg.textContent = err.message; })
      .finally(() => { $('#mw-send').disabled = false; });
  });
  load();
})();
