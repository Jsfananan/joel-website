(function () {
  const BASE = 'https://jsalinas.org/ai-or-history/';
  const SUBSCRIBE = 'https://leadershipinchange.com/subscribe';
  const PER_SIDE = 5;
  const app = document.getElementById('app');
  const count = document.getElementById('count');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let deck = [], idx = 0, score = 0, results = [];

  const track = (name, params) => { try { window.gtag && window.gtag('event', name, params || {}); } catch (e) {} };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  const ICON_AI = `<svg viewBox="0 0 40 40" fill="none" stroke="#3C9EE7" stroke-width="2.6" stroke-linecap="round" style="filter:drop-shadow(0 0 3px rgba(60,158,231,.8))"><rect x="10" y="10" width="20" height="20" rx="3"/><path d="M15 4v6M25 4v6M15 30v6M25 30v6M4 15h6M4 25h6M30 15h6M30 25h6"/><circle cx="20" cy="20" r="3.5" fill="#3C9EE7"/></svg>`;
  const ICON_HIST = `<svg viewBox="0 0 40 40" fill="none" stroke="#1c1712" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34c6-10 12-18 26-28-3 12-10 20-20 23"/><path d="M8 34l6-6"/><path d="M19 22l7-1"/></svg>`;

  // ---------------- Intro ----------------
  function intro() {
    count.textContent = '';
    app.innerHTML = `
      <section class="intro">
        <p class="eyebrow">a Leadership in Change game</p>
        <h1>AI or History<span class="q">?</span></h1>
        ${Number.isInteger(window.CHALLENGE) && TIERS[window.CHALLENGE] ? `<p class="challenge">A friend scored <b>${window.CHALLENGE}/10</b> and got “${esc(TIERS[window.CHALLENGE].title)}.” Think you can beat that?</p>` : ''}
        <div class="intro-art gc-meme">${introSVG(!reduced)}</div>
        <p class="lede">So, you think you can spot AI writing? Half of these lines were written by people long before chatbots existed, and the other half came out of a chatbot this year, written to imitate them. Score 9 out of 10 and you’ve earned the bragging rights.</p>
        <button class="btn full" id="start">Take the case</button>
        <ol class="rules">
          <li><b>1</b><span>Read the exhibit and call it: AI or History.</span></li>
          <li><b>2</b><span>The source unblurs the second you answer.</span></li>
          <li><b>3</b><span>Ten exhibits, one grade, and a card you’ll either share or hide.</span></li>
        </ol>
      </section>`;
    document.getElementById('start').onclick = start;
  }

  function start() {
    // Every AI line mirrors one History line (same index in each list). Deal at most one
    // side of each pair per game, or the real line gives its copy away.
    const hist = ITEMS.filter((i) => !i.ai), ai = ITEMS.filter((i) => i.ai);
    const pairs = shuffle([...hist.keys()]).slice(0, PER_SIDE * 2);
    deck = shuffle(pairs.map((p, k) => (k < PER_SIDE ? hist[p] : ai[p])));
    idx = 0; score = 0; results = [];
    track('quiz_start');
    round();
  }

  function progressHTML() {
    return `<div class="progress">${deck.map((_, i) => {
      const r = results[i];
      return `<span class="${i === idx && !r ? 'now' : r ? (r.correct ? 'hit' : 'miss') : ''}"></span>`;
    }).join('')}</div>`;
  }

  // ---------------- A round ----------------
  function round() {
    const item = deck[idx];
    count.textContent = `Score ${score} · Exhibit ${idx + 1} of ${deck.length}`;
    app.innerHTML = `
      ${progressHTML()}
      <div class="stage">
        <article class="card" id="card">
          <div class="stamp" id="stamp"></div>
          <p class="label">Exhibit ${idx + 1}</p>
          <p class="passage">${esc(item.text)}</p>
          <div class="reveal" id="reveal">
            <div class="who" id="who">Xxxxxxxxx Xxxxxxx · 0000</div>
            <div class="where" id="where">Xxxxx xxxxxx xxxxx xxxx</div>
          </div>
        </article>
      </div>
      <div class="choices">
        <button class="choice ai" id="c-ai">${ICON_AI}AI<small>written by a machine</small></button>
        <button class="choice history" id="c-hist">${ICON_HIST}History<small>written by a person</small></button>
      </div>
      <div id="verdict"></div>`;
    document.getElementById('c-ai').onclick = () => answer(true);
    document.getElementById('c-hist').onclick = () => answer(false);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  function answer(guessAI) {
    const item = deck[idx];
    if (results[idx]) return;
    const correct = guessAI === item.ai;
    if (correct) score++;
    results[idx] = { item, correct };

    const btnAI = document.getElementById('c-ai'), btnH = document.getElementById('c-hist');
    const picked = guessAI ? btnAI : btnH, other = guessAI ? btnH : btnAI;
    btnAI.disabled = btnH.disabled = true;
    picked.classList.add('picked', correct ? 'right' : 'wrong');
    other.classList.add('faded');

    // Swap the placeholder for the real answer while it's still blurred, then unblur.
    const who = document.getElementById('who'), where = document.getElementById('where'), reveal = document.getElementById('reveal');
    if (item.ai) {
      who.textContent = 'AI-generated'; who.classList.add('ai');
      where.textContent = 'Written by Claude for this quiz · 2026';
    } else {
      who.textContent = `${item.who} · ${item.year}`;
      where.innerHTML = `${esc(item.where)} · <a href="${item.src}" target="_blank" rel="noopener" style="color:inherit">source</a>`;
    }
    void reveal.offsetWidth;
    reveal.classList.add('open');

    const stamp = document.getElementById('stamp');
    stamp.textContent = item.ai ? 'AI' : 'History';
    stamp.className = `stamp ${item.ai ? 'ai' : 'history'}`;
    setTimeout(() => stamp.classList.add('go'), reduced ? 0 : 160);
    if (!correct) { const card = document.getElementById('card'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }

    count.textContent = `Score ${score} · Exhibit ${idx + 1} of ${deck.length}`;
    document.querySelector('.progress').outerHTML = progressHTML();

    const last = idx === deck.length - 1;
    document.getElementById('verdict').innerHTML = `
      <div class="verdict">
        <p class="line">${pick(correct ? VERDICTS.right : VERDICTS.wrong)}</p>
        <p class="tell"><b>The tell:</b> ${esc(item.tell)}</p>
        <button class="btn full" id="next">${last ? 'See my grade' : 'Next exhibit'}</button>
      </div>`;
    const next = document.getElementById('next');
    next.onclick = () => { idx++; last ? finish() : round(); };
    setTimeout(() => {
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    }, reduced ? 50 : 850);
  }

  // ---------------- Results ----------------
  function finish() {
    const tier = TIERS[score];
    track('quiz_complete', { score });
    count.textContent = `Final score ${score}/10`;
    app.innerHTML = `
      <section class="results">
        <div class="grade-card" id="grade">
          <div class="gc-head">
            <p class="gc-kicker">Final grade</p>
            <p class="gc-score" id="gscore">0<small>/10</small></p>
          </div>
          <h2 class="gc-title">${esc(tier.title)}</h2>
          <div class="gc-meme">${memeSVG(score, !reduced)}</div>
          <p class="gc-caption">${esc(tier.caption)}</p>
          <div class="gc-foot">
            <img src="${window.LIC_LOGO}" alt="Leadership in Change">
            <a class="gc-by" href="${SUBSCRIBE}" target="_blank" rel="noopener">by Leadership in Change</a>
          </div>
          <p class="gc-url">Think you can beat ${score}/10? Play at <span class="nowrap">jsalinas.org/ai-or-history</span></p>
        </div>
        <div class="actions">
          <button class="btn" id="share">Share my grade</button>
          <button class="btn ghost" id="save">Save card</button>
          <p class="toast" id="toast" aria-live="polite"></p>
        </div>
        <button class="linkish" id="again">Play again</button>
        <p class="moral">Honestly, the punctuation won’t tell you who wrote a sentence. What usually gives a machine away is a line that sounds big until you go looking for what it actually says.</p>
        <div class="recap">
          <h2>Your case file</h2>
          <ol>${results.map((r) => {
            const flat = r.item.text.replace(/\n/g, ' ');
            const short = flat.length > 70 ? flat.slice(0, 70).replace(/\s+\S*$/, '') + '…' : flat;
            return `<li><span class="${r.correct ? 'ok' : 'no'}">${r.correct ? '✓' : '✗'}</span><span>“${esc(short)}”</span><cite class="${r.item.ai ? 'ai' : ''}">${r.item.ai ? 'AI' : esc(r.item.who + ', ' + r.item.year)}</cite></li>`;
          }).join('')}</ol>
        </div>
      </section>`;
    window.scrollTo({ top: 0, behavior: 'auto' });

    // count the score up
    const el = document.getElementById('gscore');
    if (reduced) el.innerHTML = `${score}<small>/10</small>`;
    else {
      let n = 0; const tick = () => { el.innerHTML = `${n}<small>/10</small>`; if (n < score) { n++; setTimeout(tick, 90); } else el.classList.add('pop'); };
      setTimeout(tick, 250);
    }
    document.getElementById('save').onclick = saveCard;
    document.getElementById('share').onclick = shareCard;
    document.getElementById('again').onclick = start;
  }

  const toast = (msg) => { const t = document.getElementById('toast'); if (t) t.textContent = msg; };
  const shareURL = () => `${BASE}s/${score}/`;
  const shareText = () => `I scored ${score}/10 on AI or History? and got “${TIERS[score].title}.” Think you can tell a person from a chatbot?`;

  // Export a fixed-size copy (1080 wide) so the posted image looks the same from any device.
  async function cardBlob() {
    if (!window.htmlToImage) throw new Error('image library not loaded');
    await document.fonts.ready;
    const src = document.getElementById('grade');
    const holder = document.createElement('div');
    holder.style.cssText = 'position:fixed;left:-10000px;top:0;width:540px;pointer-events:none';
    const copy = src.cloneNode(true);
    copy.removeAttribute('id');
    copy.classList.add('export');
    copy.querySelectorAll('.draw').forEach((s) => s.classList.remove('draw'));
    const sc = copy.querySelector('.gc-score'); if (sc) { sc.classList.remove('pop'); sc.innerHTML = `${score}<small>/10</small>`; }
    holder.appendChild(copy);
    document.body.appendChild(holder);
    try {
      return await window.htmlToImage.toBlob(copy, { pixelRatio: 2, backgroundColor: '#FFE5D9', cacheBust: true });
    } finally { holder.remove(); }
  }

  async function saveCard() {
    toast('Developing the photo…');
    try {
      const blob = await cardBlob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `ai-or-history-${score}-of-10.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      toast('Saved. Post it before you change your mind.');
      track('card_saved', { score });
    } catch (e) { toast('Couldn’t save the card on this browser. A screenshot works too.'); }
  }

  async function shareCard() {
    const text = shareText(), url = shareURL();
    try {
      if (navigator.share) {
        let data = { title: 'AI or History?', text, url };
        try {
          const blob = await cardBlob();
          const file = new File([blob], `ai-or-history-${score}.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) data = { ...data, files: [file] };
        } catch (e) {}
        await navigator.share(data);
        track('card_shared', { score, method: 'native' });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast('Link copied. Paste it wherever your friends overestimate themselves.');
      track('card_shared', { score, method: 'clipboard' });
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      toast(`Copy this: ${url}`);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (document.getElementById('c-ai') && !document.getElementById('c-ai').disabled) {
      if (k === 'a') answer(true);
      if (k === 'h') answer(false);
    }
  });

  document.querySelector('.topbar img').src = window.LIC_LOGO;
  intro();
})();
