(function () {
  const { $, $$, esc } = window.G; const toast = (m) => window.toast(m); const Q = window.QUIZ; let order, i, score, answers;
  const RANKS = [[14, 'Keeper of the Family Bible'], [10, 'Front-Porch Storyteller'], [7, 'Sunday-Dinner Regular'], [4, 'Cousin Twice Removed'], [0, 'Newcomer to the Ridge']];
  function start() { order = Q.map((_, k) => k).sort(() => Math.random() - 0.5); i = 0; score = 0; answers = []; $('#qz-score').textContent = 0; render(); }
  function render() {
    const q = Q[order[i]]; $('#qz-prog span').style.width = (i / Q.length) * 100 + '%';
    const card = $('#qz-card'); card.style.animation = 'none'; card.offsetWidth; card.style.animation = '';
    card.innerHTML = `<div class="n">Question ${i + 1} of ${Q.length}</div><h2 id="qz-q">${esc(q.q)}</h2><div class="qz-opts" role="group" aria-labelledby="qz-q">${q.a.map((a, k) => `<button data-k="${k}"><kbd>${k + 1}</kbd>${esc(a)}</button>`).join('')}</div><div class="qz-why" id="qz-why" aria-live="polite"></div><button class="btn solid qz-next" id="qz-next">${i === Q.length - 1 ? 'See my score' : 'Next question →'}</button>`;
    $('.qz-opts button').focus({ preventScroll: true });
  }
  function answer(k) {
    const q = Q[order[i]]; if (answers.length > i) return; const ok = k === q.c; answers.push(ok);
    $$('.qz-opts button').forEach((b) => { b.disabled = true; const n = +b.dataset.k; if (n === q.c) b.classList.add('right'); else if (n === k) b.classList.add('wrong'); });
    if (ok) { score++; const s = $('#qz-score'); s.textContent = score; s.classList.add('pop'); setTimeout(() => s.classList.remove('pop'), 300); }
    const w = $('#qz-why'); w.innerHTML = `<b>${ok ? 'That’s right!' : 'Not quite — it’s “' + esc(q.a[q.c]) + '.”'}</b> ${esc(q.why)}`; w.classList.add('on');
    const n = $('#qz-next'); n.classList.add('on'); n.focus({ preventScroll: true });
  }
  function next() { if (i < Q.length - 1) { i++; render(); } else final(); }
  function final() {
    $('#qz-prog span').style.width = '100%'; const rank = RANKS.find((r) => score >= r[0])[1];
    $('#qz-card').innerHTML = `<div class="qz-final"><div class="eyebrow">Your score</div><div class="big">${score}<span style="font-size:.4em;color:var(--ink2)">/${Q.length}</span></div><div class="rank">${rank}</div>
      <div class="acts"><button class="btn solid" id="qz-again">Play again</button><a class="btn" href="tree.html">Explore the tree</a><button class="btn" id="qz-copy">Copy my score</button></div>
      <ol class="qz-review">${order.map((o, k) => `<li>${answers[k] ? '✔' : '✘'} ${esc(Q[o].q)} <em>${esc(Q[o].a[Q[o].c])}</em></li>`).join('')}</ol></div>`;
    $('#qz-again').onclick = start;
    $('#qz-copy').onclick = () => { const t = `I scored ${score}/${Q.length} — “${rank}” — on the Giles of Adair County family quiz!`; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Score copied'), () => toast(t)); };
    try { const best = +localStorage.getItem('quizBest') || 0; if (score > best) localStorage.setItem('quizBest', score); } catch (e) {}
  }
  $('#qz-card').addEventListener('click', (e) => { const b = e.target.closest('.qz-opts button'); if (b) answer(+b.dataset.k); if (e.target.closest('#qz-next')) next(); });
  document.addEventListener('keydown', (e) => { if (document.querySelector('.modal.open') || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return; if (/^[1-4]$/.test(e.key) && $('.qz-opts') && answers.length === i) answer(+e.key - 1); });
  start(); window.__qz = { answer, next, get score() { return score; }, get cur() { return Q[order[i]]; } };
})();
