(function () {
  'use strict';
  var C = window.COURSE;
  var MIN_SHOW = 10, MIN_LOG = 40;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nothing is stored. State lives in memory and resets on refresh. */
  function fresh() { return { start: { read: false, install: false }, mods: {}, cap: { why: false, picks: [], ran: false, log: {} }, cert: { name: '', date: '', id: '' }, step: {}, marked: {} }; }
  var S = fresh();
  function M(id) { if (!S.mods[id]) S.mods[id] = { why: false, picks: [], run: false, show: {} }; return S.mods[id]; }
  function len(s) { return (s || '').trim().length; }

  /* ---------- derived ---------- */
  function showOk(m, q) { return len(M(m.id).show[q.id]) >= MIN_SHOW; }
  function showDone(m) { return C.stepsCopy.showQs.every(function (q) { return showOk(m, q); }); }
  function modSteps(m) { if (S.marked['m-' + m.id]) return [true, true, true, true]; var d = M(m.id); return [!!d.why, d.picks.length > 0, !!d.run, showDone(m)]; }
  function modDone(m) { var s = modSteps(m); return s[1] && s[2] && s[3]; }
  function capLogOk(q) { return len(S.cap.log[q.id]) >= MIN_LOG; }
  function capSteps() { if (S.marked.capstone) return [true, true, true, true]; return [!!S.cap.why, S.cap.picks.length >= 3, !!S.cap.ran, C.capstone.logQs.every(capLogOk)]; }
  function capDone() { var s = capSteps(); return s[1] && s[2] && s[3]; }
  function startDone() { return !!(S.start.install || S.marked.start); }
  function doneCount() { return C.modules.filter(modDone).length + (capDone() ? 1 : 0); }
  function allDone() { return doneCount() === 7; }
  function skillById(id) { var r; C.modules.forEach(function (m) { m.skills.forEach(function (s) { if (s.id === id) r = s; }); }); return r; }

  /* ---------- routes ---------- */
  var ORDER = ['start'].concat(C.modules.map(function (m) { return 'm-' + m.id; }), ['capstone', 'certificate']);
  function modById(id) { return C.modules.filter(function (m) { return m.id === id; })[0]; }
  function routeDone(k) { if (k === 'start') return startDone(); if (k === 'capstone') return capDone(); if (k === 'certificate') return allDone(); return modDone(modById(k.slice(2))); }
  function validRoute(k) { return k === 'home' || k === 'install' || ORDER.indexOf(k) >= 0; }
  function routeTitle(k) { if (k === 'install') return 'Install a skill'; if (k === 'start') return 'Start Here'; if (k === 'capstone') return 'Capstone'; if (k === 'certificate') return 'Certificate of Completion'; var m = modById(k.slice(2)); return 'Module ' + (C.modules.indexOf(m) + 1) + ': ' + m.name; }
  function stepList(k) { if (k === 'start') return [S.start.install]; if (k === 'capstone') return capSteps(); if (k === 'certificate') return [allDone()]; return modSteps(modById(k.slice(2))); }
  function nextUp() {
    for (var i = 1; i < ORDER.length - 1; i++) if (!routeDone(ORDER[i])) { var st = stepList(ORDER[i]); var si = st.indexOf(false); if (si === 0 && ORDER[i] !== 'start' && st.length > 2) si = 1; return { route: ORDER[i], step: si < 0 ? 0 : si }; }
    return { route: 'certificate', step: 0 };
  }

  /* ---------- helpers ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in (attrs || {})) { if (k === 'class') n.className = attrs[k]; else if (k === 'text') n.textContent = attrs[k]; else if (k === 'html') n.innerHTML = attrs[k]; else n.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function $(id) { return document.getElementById(id); }
  var toastT;
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 3200); }
  var TRACE = '<svg class="trace" viewBox="0 0 56 56" aria-hidden="true"><path pathLength="100" d="M54 2 V22 L44 32 H30 M44 32 V46"/></svg>';
  var ICONS = {
    doc: '<path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6"/>',
    download: '<path d="M12 4v11 M7 11l5 5 5-5 M5 20h14"/>',
    bolt: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
    pencil: '<path d="M4 20l1-5L16 4l4 4L9 19z M14 6l4 4"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/>',
    book: '<path d="M4 5h6a3 3 0 013 3v12a2 2 0 00-2-2H4z M20 5h-6a3 3 0 00-1 .2 M20 5v13h-7"/>',
    log: '<path d="M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h4"/>'
  };
  function icon(n) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>'; }
  function glyph(seed) {
    var h = 0; for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    function r(n) { h = (h * 1103515245 + 12345) >>> 0; return (h >>> 8) % n; }
    var d = '', pads = '';
    for (var k = 0; k < 3; k++) { var x = 4, y = 7 + k * 13 + r(4); d += 'M' + x + ' ' + y; for (var st = 0; st < 3; st++) { x = Math.min(36, x + 6 + r(8)); d += ' H' + x; if (st < 2) { var ny = Math.max(4, Math.min(36, y + (r(2) ? 6 : -6))); d += ' V' + ny; y = ny; } } pads += '<circle cx="' + x + '" cy="' + y + '" r="2.4"/>'; }
    return '<svg class="gly" viewBox="0 0 40 40" aria-hidden="true"><path d="' + d + '"/>' + pads + '</svg>';
  }
  function tiles(list) { return '<div class="tiles">' + list.map(function (t) { return '<div class="tile"><span class="tico">' + icon(t[0]) + '</span><b>' + t[1] + '</b><p>' + t[2] + '</p></div>'; }).join('') + '</div>'; }
  function answersText() {
    var out = [C.name, 'My answers, ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), ''];
    C.modules.forEach(function (m, i) {
      var d = M(m.id), any = d.picks.length || C.stepsCopy.showQs.some(function (q) { return len(d.show[q.id]); });
      if (!any) return;
      out.push('MODULE ' + (i + 1) + ': ' + m.name.toUpperCase());
      if (d.picks.length) out.push('Skills: ' + d.picks.map(function (id) { return skillById(id).name; }).join(', '));
      C.stepsCopy.showQs.forEach(function (q) { if (len(d.show[q.id])) { out.push(q.label); out.push(d.show[q.id].trim()); } });
      out.push('');
    });
    if (S.cap.picks.length || C.capstone.logQs.some(function (q) { return len(S.cap.log[q.id]); })) {
      out.push('CAPSTONE'); if (S.cap.picks.length) out.push('Skills: ' + S.cap.picks.map(function (id) { return skillById(id).name; }).join(', '));
      C.capstone.logQs.forEach(function (q) { if (len(S.cap.log[q.id])) { out.push(q.label); out.push(S.cap.log[q.id].trim()); } });
    }
    return out.join('\n');
  }
  function copyAnswers() {
    var t = answersText();
    if (t.split('\n').length < 4) { toast('Nothing to copy yet. Your answers will show up here as you write them.'); return; }
    function fallback() {
      openModal('<h2 id="modal-title">Your answers</h2><p>Select all of it and copy it somewhere safe.</p><textarea id="copy-ta" rows="10" style="width:100%;text-align:left" readonly></textarea>', [{ label: 'Done', cls: 'primary' }]);
      var ta = $('copy-ta'); ta.value = t; ta.focus(); ta.select();
    }
    try { navigator.clipboard.writeText(t).then(function () { toast('Copied. Paste your answers anywhere you keep notes.'); }, fallback); } catch (e) { fallback(); }
  }
  function copyBtn(label) { var b = el('button', { class: 'btn ghost small', type: 'button', html: icon('doc') + '<span>' + (label || 'Copy my answers') + '</span>' }); b.addEventListener('click', copyAnswers); return b; }
  function textBtn(label, fn) { var b = el('button', { class: 'btn textlink', type: 'button', text: label }); b.addEventListener('click', fn); return b; }
  function goTo(route, step) { if (step != null) S.step[route] = step; go(route, true); }

  /* ---------- chrome: topbar, syllabus, rail ---------- */
  function setRing(node, frac, label) { var c = node.querySelector('.fill'), circ = 2 * Math.PI * 18; c.style.strokeDasharray = circ; c.style.strokeDashoffset = circ * (1 - frac); node.querySelector('b').textContent = label; }
  function chrome() {
    var dc = doneCount(), nu = nextUp();
    $('xpchip').innerHTML = ''; $('ring-mini').setAttribute('aria-label', dc + ' of 7 parts done'); $('ring-mini').setAttribute('title', dc + ' of 7 parts done');
    setRing($('ring-mini'), dc / 7, String(dc));
    renderQuest();
    $('topline-fill').style.setProperty('--p', String(dc / 7));
    var nav = $('syllabus'); nav.innerHTML = '';
    function item(key, icon, title, sub, done, part, lock) {
      var a = el('a', { class: 'sy' + (done ? ' done' : part ? ' part' : '') + (lock ? ' lock' : ''), href: '#' + key });
      if (current === key || (key === 'start' && current === 'install')) a.setAttribute('aria-current', 'page');
      a.innerHTML = '<span class="ic">' + (done ? '✓' : icon) + '</span><span class="t">' + title + (sub ? '<span class="sub">' + sub + '</span>' : '') + '</span>' + (key === nu.route && !allDone() ? '<span class="nextpill">Next</span>' : '');
      a.addEventListener('click', function (e) { e.preventDefault(); go(key, true); });
      nav.appendChild(a);
    }
    item('home', '⌂', 'Course home', '', false, false);
    var sk = el('button', { class: 'sy', type: 'button' }); sk.innerHTML = '<span class="ic"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></span><span class="t">All 25 skills<span class="sub">Find any skill, any time</span></span>'; sk.addEventListener('click', function () { document.body.classList.remove('nav-open'); openSkills(); }); nav.appendChild(sk);
    nav.appendChild(el('div', { class: 'sy-label', text: 'Suggested order' }));
    item('start', 'S', 'Start Here', startDone() ? 'Done' : 'Optional', startDone(), false);
    C.modules.forEach(function (m, i) { var n = modSteps(m).filter(Boolean).length; item('m-' + m.id, String(i + 1), m.name, modDone(m) ? 'Done' : n + ' of 4 steps', modDone(m), n > 0); });
    item('capstone', 'C', 'Capstone', capDone() ? 'Done' : capSteps().filter(Boolean).length + ' of 4 steps', capDone(), capSteps().some(Boolean));
    item('certificate', '★', 'Certificate', allDone() ? 'Ready' : 'After all 7 parts', false, false, !allDone());
    // rail: context aware
    var rail = $('rail'); rail.innerHTML = '';
    rail.appendChild(el('div', { class: 'blk', html: '<h3>Where you are</h3><div class="rowsb"><b>' + dc + ' of 7</b><span>parts done</span></div><div class="bigbar"><i style="width:' + Math.round(dc / 7 * 100) + '%"></i></div><p class="tiny">Six modules and the Capstone earn the Certificate of Completion.</p>' }));
    var lesson = cur && cur.steps && (current.indexOf('m-') === 0 || current === 'capstone');
    if (lesson) {
      var blk = el('div', { class: 'blk' }); blk.appendChild(el('h3', { text: current === 'capstone' ? 'This Capstone' : 'This module' }));
      var ul = el('ul', { class: 'steplist' });
      cur.steps.forEach(function (s, i) {
        var ok = !!s.done(), li = el('li', { class: (ok ? 'ok' : '') + (i === cur.idx() ? ' now' : '') }), bt = el('button', { type: 'button', text: s.label + (ok ? ' (done)' : '') });
        bt.addEventListener('click', function () { cur.go(i); }); li.appendChild(bt); ul.appendChild(li);
      });
      blk.appendChild(ul);
      var picks = current === 'capstone' ? S.cap.picks : M(current.slice(2)).picks;
      if (picks.length) { var pc = el('div', { class: 'pickchips' }); picks.forEach(function (id) { var sk = skillById(id); pc.appendChild(el('a', { href: sk.url, target: '_blank', rel: 'noopener', html: sk.name + ' <span aria-hidden="true">\u2197</span>' })); }); blk.appendChild(el('p', { class: 'tiny', text: 'Your picks' })); blk.appendChild(pc); }
      rail.appendChild(blk);
      var after = el('div', { class: 'blk' }); after.appendChild(el('h3', { text: 'After this' }));
      var ix = ORDER.indexOf(current), nx = ORDER[ix + 1];
      if (nx) { var al = textBtn(routeTitle(nx) + ' \u2192', function () { go(nx, true); }); after.appendChild(al); }
      rail.appendChild(after);
    } else {
      var card = el('div', { class: 'next-card', html: '<span class="eyebrow">' + (allDone() ? 'All done' : 'Next up') + '</span><b>' + routeTitle(nu.route) + '</b>' });
      var cb = el('button', { class: 'btn textlink light', type: 'button', text: (allDone() ? 'Open my certificate' : 'Go to it') + ' \u2192' }); cb.addEventListener('click', function () { goTo(nu.route, nu.step); }); card.appendChild(cb);
      rail.appendChild(el('div', { class: 'blk' }, [card]));
    }
  }


  /* ---------- course world map: slim bar that opens into an animated game map ---------- */
  var QN = [{ k: 'start', n: 'S', l: 'Start Here' }].concat(C.modules.map(function (m, i) { return { k: 'm-' + m.id, n: String(i + 1), l: m.name }; }), [{ k: 'capstone', n: 'C', l: 'Capstone' }, { k: 'certificate', n: '★', l: 'Certificate' }]);
  /* hand-placed, deliberately uneven landmarks on a 1000 x 380 world */
  var WP = [[80, 300], [205, 212], [318, 300], [432, 168], [560, 252], [660, 104], [790, 190], [872, 296], [944, 112]];
  var ZR = [52, 66, 58, 58, 52, 62, 84, 60, 50];
  var LBL = ['below', 'above', 'below', 'above', 'below', 'above', 'above', 'below', 'below'];
  var NS = 'http://www.w3.org/2000/svg';
  var W = { built: false, open: false, lenAt: [], total: 0, av: null, raf: 0, closeT: 0 };
  function rnd(seed) { var h = seed >>> 0; return function () { h = (h * 1103515245 + 12345) >>> 0; return (h >>> 8) / 16777216; }; }
  function spline(pts, closed) {
    var n = pts.length, d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1), last = closed ? n : n - 1;
    for (var i = 0; i < last; i++) {
      var p0 = pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = pts[i % n], p2 = pts[(i + 1) % n], p3 = pts[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return closed ? d + 'Z' : d;
  }
  function blob(cx, cy, r, seed, k) { var R = rnd(seed), pts = []; k = k || 9; for (var i = 0; i < k; i++) { var a = i / k * Math.PI * 2, rr = r * (0.72 + R() * 0.5); pts.push([cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr * 0.85]); } return spline(pts, true); }
  function sv(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function buildQuest() {
    var q = $('quest'); q.innerHTML = '';
    /* slim bar */
    var bar = el('button', { class: 'qbar', type: 'button', id: 'qbar', 'aria-expanded': 'false', 'aria-controls': 'qmap' });
    bar.innerHTML = '<span class="qt">Course map</span><svg class="qmini" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><line x1="6" y1="10" x2="194" y2="10" class="mb"/><line x1="6" y1="10" x2="6" y2="10" class="ml" id="qml"/></svg><span class="qwhere" id="qwhere"></span><span class="qhint"><span class="hv">Hover to open</span><span class="tp">Tap to open</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>';
    var mini = bar.querySelector('.qmini'); QN.forEach(function (n, i) { sv('circle', { cx: 6 + i * 188 / 8, cy: 10, r: 4.2, class: 'md', 'data-i': i }, mini); });
    sv('circle', { cx: 6, cy: 10, r: 7, class: 'mpin', id: 'qmpin' }, mini);
    q.appendChild(bar);
    /* world map panel */
    var map = el('div', { class: 'qmap', id: 'qmap', role: 'region', 'aria-label': 'Course map' });
    var svg = sv('svg', { viewBox: '0 0 1000 380', class: 'world', 'aria-hidden': 'false' });
    svg.innerHTML = '<defs><pattern id="fog" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="8" stroke="rgba(139,58,42,.18)" stroke-width="2"/></pattern>' +
      '<filter id="wglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="cloud"><feGaussianBlur stdDeviation="9"/></filter>' +
      '<radialGradient id="pinG" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#9AD3FF"/><stop offset="1" stop-color="#1F6FB5"/></radialGradient>' +
      '<mask id="litmask"><path id="wmask" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"/></mask></defs>';
    var g0 = sv('g', { class: 'terrain' }, svg);
    var R = rnd(7);
    for (var c = 0; c < 7; c++) { var cx = 60 + R() * 880, cy = 40 + R() * 300; for (var ring = 0; ring < 3; ring++) sv('path', { d: blob(cx, cy, 38 + ring * 26, 100 + c * 7 + ring, 11), class: 'contour' }, g0); }
    var zones = sv('g', { class: 'zones' }, svg);
    WP.forEach(function (p, i) { sv('path', { d: blob(p[0], p[1], ZR[i], 31 + i * 13), class: 'zone', 'data-i': i }, zones); });
    /* road through every landmark with gentle detours between them */
    var pts = [], nodeAt = [], RR = rnd(99);
    WP.forEach(function (p, i) {
      nodeAt.push(pts.length); pts.push(p);
      if (i < WP.length - 1) { var q2 = WP[i + 1], mx = (p[0] + q2[0]) / 2, my = (p[1] + q2[1]) / 2, dx = q2[0] - p[0], dy = q2[1] - p[1], L = Math.hypot(dx, dy), off = (i % 2 ? 1 : -1) * (26 + RR() * 22); pts.push([mx - dy / L * off, my + dx / L * off]); }
    });
    var d = spline(pts, false);
    sv('path', { d: d, class: 'rshadow' }, svg);
    sv('path', { d: d, class: 'rbase' }, svg);
    var lit = sv('path', { d: d, class: 'rlit', id: 'wlit' }, svg);
    sv('path', { d: d, class: 'rspark', mask: 'url(#litmask)' }, svg);
    svg.querySelector('#wmask').setAttribute('d', d);
    var clouds = sv('g', { class: 'clouds' }, svg);
    [[180, 70, 70], [520, 330, 90], [760, 40, 60], [930, 250, 55]].forEach(function (cl, i) { sv('ellipse', { cx: cl[0], cy: cl[1], rx: cl[2], ry: cl[2] * 0.38, class: 'cloud c' + i, filter: 'url(#cloud)' }, clouds); });
    var nodes = sv('g', { class: 'wnodes' }, svg);
    QN.forEach(function (n, i) {
      var p = WP[i], g = sv('g', { class: 'wnode', 'data-i': i, transform: 'translate(' + p[0] + ' ' + p[1] + ')', tabindex: '0', role: 'link' }, nodes);
      sv('circle', { r: 28, class: 'halo' }, g);
      if (n.k === 'certificate') { sv('path', { d: 'M-22 14 L-14 -10 L-6 2 L0 -22 L6 2 L14 -10 L22 14 Z', class: 'summit' }, g); sv('polygon', { points: '0,-38 4,-29 14,-28 6,-22 9,-12 0,-17 -9,-12 -6,-22 -14,-28 -4,-29', class: 'beacon' }, g); }
      sv('circle', { r: 17, class: 'disc' }, g);
      var t = sv('text', { class: 'num', 'text-anchor': 'middle', y: 5 }, g); t.textContent = n.n;
      sv('path', { d: 'M-7 0 L-2 6 L8 -6', class: 'tick' }, g);
      var fl = sv('g', { class: 'flag', transform: 'translate(12 -16)' }, g); sv('line', { x1: 0, y1: 0, x2: 0, y2: -24, class: 'pole' }, fl); sv('path', { d: 'M0 -24 L16 -19 L0 -13 Z', class: 'cloth' }, fl);
      var ly = LBL[i] === 'above' ? -34 : 44, lt = sv('text', { class: 'lbl ' + LBL[i], 'text-anchor': 'middle', y: ly }, g); lt.textContent = n.l;
      function goNode() { closeQuest(true); go(n.k, true); }
      g.addEventListener('click', goNode); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNode(); } });
      var title = sv('title', {}, g); title.textContent = n.l;
    });
    var av = sv('g', { class: 'wav', id: 'wav' }, svg);
    var avb = sv('g', { class: 'bobber' }, av);
    sv('ellipse', { cx: 0, cy: 2, rx: 10, ry: 3.5, class: 'shadow' }, av);
    sv('path', { d: 'M0 0 C-4 -8 -13 -14 -13 -24 A13 13 0 1 1 13 -24 C13 -14 4 -8 0 0 Z', class: 'pinb', fill: 'url(#pinG)' }, avb);
    sv('circle', { cx: 0, cy: -24, r: 5, fill: '#fff' }, avb);
    map.appendChild(el('div', { class: 'wscroll', id: 'wscroll' }, [svg]));
    map.appendChild(el('p', { class: 'qlegend', html: '<span><i class="lg done"></i>Done</span><span><i class="lg here"></i>You are here</span><span><i class="lg next"></i>Next up</span><span><i class="lg fog"></i>Not started</span><span class="tiny">Click any landmark to go there</span>' }));
    q.appendChild(map);
    /* measure the road at each landmark */
    W.total = lit.getTotalLength();
    var samp = []; for (var L2 = 0; L2 <= W.total; L2 += 4) { var pt = lit.getPointAtLength(L2); samp.push([L2, pt.x, pt.y]); }
    W.lenAt = nodeAt.map(function (pi) { var target = pts[pi], best = 0, bd = 1e9; samp.forEach(function (q) { var dd = (q[1] - target[0]) * (q[1] - target[0]) + (q[2] - target[1]) * (q[2] - target[1]); if (dd < bd) { bd = dd; best = q[0]; } }); return best; });
    W.lenAt[0] = 0;
    /* open on hover or focus, toggle on tap */
    var quest = q;
    quest.addEventListener('mouseenter', function () { if (matchMedia('(hover: hover)').matches) openQuest(); });
    quest.addEventListener('mouseleave', function () { if (matchMedia('(hover: hover)').matches) closeQuest(); });
    bar.addEventListener('click', function () { if (W.open && Date.now() - W.openedAt > 450) closeQuest(true); else openQuest(); });
    quest.addEventListener('focusin', function () { openQuest(); });
    quest.addEventListener('focusout', function (e) { if (!quest.contains(e.relatedTarget)) closeQuest(); });
    W.built = true;
  }
  function litTarget() { var hi = 0; QN.forEach(function (n, i) { if (n.k === 'certificate' ? allDone() : routeDone(n.k)) hi = i; }); return hi ? W.lenAt[hi] : 0; }
  function setLit(len, animate) {
    var lit = $('wlit'), m = $('wmask'), T = W.total;
    [lit, m].forEach(function (p) { p.style.transition = animate && !reduce ? 'stroke-dashoffset 1.6s cubic-bezier(.45,0,.2,1)' : 'none'; p.style.strokeDasharray = T + ' ' + T; p.style.strokeDashoffset = String(T - len); });
  }
  function placeAvatar(len) { var p = $('wlit').getPointAtLength(len); $('wav').setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + (p.y - 14).toFixed(1) + ') scale(.85)'); W.av = len; }
  function walkTo(len) {
    cancelAnimationFrame(W.raf);
    if (W.av == null || reduce) { placeAvatar(len); return; }
    var from = W.av, t0 = performance.now(), dur = Math.min(1800, 500 + Math.abs(len - from) * 1.4);
    $('wav').classList.add('walking');
    (function step(t) { var k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; placeAvatar(from + (len - from) * e); if (k < 1) W.raf = requestAnimationFrame(step); else $('wav').classList.remove('walking'); })(t0);
  }
  function openQuest() {
    clearTimeout(W.closeT); if (W.open) return; W.open = true; W.openedAt = Date.now();
    var q = $('quest'); q.classList.add('open'); $('qbar').setAttribute('aria-expanded', 'true');
    setLit(0, false); void $('wlit').getBoundingClientRect();
    requestAnimationFrame(function () { setLit(litTarget(), true); });
    var here = hereIndex(); if (W.av == null) placeAvatar(0);
    var mp = $('wscroll'); if (mp.scrollWidth > mp.clientWidth + 4) mp.scrollLeft = Math.max(0, WP[here][0] / 1000 * mp.scrollWidth - mp.clientWidth / 2); setTimeout(function () { walkTo(W.lenAt[here]); }, reduce ? 0 : 350);
  }
  function closeQuest(now) {
    clearTimeout(W.closeT);
    W.closeT = setTimeout(function () { W.open = false; $('quest').classList.remove('open'); $('qbar').setAttribute('aria-expanded', 'false'); }, now ? 0 : 260);
  }
  function hereIndex() { var nu = nextUp(), here = current === 'home' ? nu.route : current === 'install' ? 'start' : current, i = QN.map(function (n) { return n.k; }).indexOf(here); return i < 0 ? 0 : i; }
  function renderQuest() {
    if (!W.built) buildQuest();
    var nu = nextUp(), hi = hereIndex(), dc = doneCount();
    var doneIx = QN.map(function (n) { return n.k === 'certificate' ? allDone() : routeDone(n.k); });
    document.querySelectorAll('#quest .wnode').forEach(function (g, i) {
      g.classList.toggle('done', doneIx[i]); g.classList.toggle('here', i === hi); g.classList.toggle('next', QN[i].k === nu.route && !doneIx[i] && i !== hi); g.classList.toggle('locked', QN[i].k === 'certificate' && !allDone());
      g.setAttribute('aria-label', QN[i].l + (doneIx[i] ? ', done' : '') + (i === hi ? ', you are here' : ''));
    });
    document.querySelectorAll('#quest .zone').forEach(function (z, i) { z.classList.toggle('done', doneIx[i]); z.classList.toggle('here', i === hi); z.classList.toggle('fogged', !doneIx[i] && i !== hi); });
    document.querySelectorAll('#quest .md').forEach(function (c, i) { c.classList.toggle('on', doneIx[i]); c.classList.toggle('here', i === hi); });
    var hiDone = 0; doneIx.forEach(function (d, i) { if (d) hiDone = i; });
    $('qml').setAttribute('x2', String(6 + hiDone * 188 / 8)); $('qmpin').setAttribute('cx', String(6 + hi * 188 / 8));
    $('qwhere').innerHTML = '<b>' + dc + ' of 7</b> · You are at ' + QN[hi].l;
    if (W.open) { setLit(litTarget(), true); walkTo(W.lenAt[hi]); }
  }

  /* ---------- all 25 skills finder ---------- */
  var sheetReturn = null;
  function isPicked(id) { var p = S.cap.picks.indexOf(id) >= 0; C.modules.forEach(function (m) { if (S.mods[m.id] && S.mods[m.id].picks.indexOf(id) >= 0) p = true; }); return p; }
  function openSkills() {
    var box = $('sheet-box'); box.innerHTML = '';
    var head = el('div', { class: 'sh-head' }, [el('div', {}, [el('span', { class: 'pill', text: 'Skill Library' }), el('h2', { id: 'sheet-title', text: 'All 25 skills' })])]);
    var x = el('button', { class: 'iconbtn sh-x', type: 'button', 'aria-label': 'Close', html: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' });
    x.addEventListener('click', closeSkills); head.appendChild(x); box.appendChild(head);
    var search = el('input', { type: 'text', id: 'skill-search', placeholder: 'Search by skill or section', autocomplete: 'off', 'aria-label': 'Search skills' });
    var count = el('p', { class: 'tiny', id: 'skill-count', 'aria-live': 'polite' });
    box.appendChild(search); box.appendChild(count);
    var list = el('div', { class: 'sh-list' }); box.appendChild(list);
    function paint() {
      var q = search.value.trim().toLowerCase(), shown = 0; list.innerHTML = '';
      C.modules.forEach(function (m, i) {
        var hits = m.skills.filter(function (sk) { return !q || sk.name.toLowerCase().indexOf(q) >= 0 || m.name.toLowerCase().indexOf(q) >= 0; });
        if (!hits.length) return; shown += hits.length;
        var g = el('section', { class: 'sh-group' });
        var gh = el('div', { class: 'sh-gh' }, [el('h3', { text: (i + 1) + '. ' + m.name }), el('span', { class: 'tiny', text: m.skills.length + ' skills' })]);
        gh.appendChild(textBtn('Go to module →', function () { closeSkills(); go('m-' + m.id, true); })); g.appendChild(gh);
        hits.forEach(function (sk) {
          var row = el('div', { class: 'sh-row' });
          row.appendChild(el('span', { class: 'gw', html: glyph(sk.id) }));
          row.appendChild(el('div', { class: 'sh-name' }, [el('b', { text: sk.name }), isPicked(sk.id) ? el('span', { class: 'chip blue', text: 'Picked' }) : null, sk.does ? el('p', { class: 'does', text: 'Use it when: ' + sk.does }) : null]));
          row.appendChild(el('a', { class: 'btn ghost small', href: sk.url, target: '_blank', rel: 'noopener', text: 'Open ↗', 'aria-label': 'Open ' + sk.name + ' in the library' }));
          g.appendChild(row);
        });
        list.appendChild(g);
      });
      count.textContent = q ? shown + ' of 25 skills match' : '25 skills in six sections. Each one opens in the Premium library.';
      if (!shown) list.appendChild(el('p', { class: 'hint', text: 'No skill matches that. Try a section name, like Decide or Market.' }));
    }
    search.addEventListener('input', paint); paint();
    sheetReturn = document.activeElement; $('sheet').hidden = false; document.body.classList.add('sheet-open'); search.focus();
  }
  function closeSkills() { $('sheet').hidden = true; document.body.classList.remove('sheet-open'); if (sheetReturn && sheetReturn.focus) try { sheetReturn.focus(); } catch (e) {} }

  /* ---------- lesson engine: tabs + one step at a time ---------- */
  var cur = null;
  function firstOpen(steps) { for (var i = 0; i < steps.length; i++) if (!steps[i].done()) return i; return 0; }
  function Lesson(host, key, steps, startIdx, hooks) {
    hooks = hooks || {};
    var idx = startIdx != null ? startIdx : (S.step[key] != null && S.step[key] < steps.length ? S.step[key] : (steps[0].skippable ? 0 : firstOpen(steps)));
    var tabs = el('div', { class: 'tabs' + (steps.length > 4 ? ' many' : ''), role: 'tablist', 'aria-label': 'Steps' });
    var stage = el('div', { class: 'stage', role: 'tabpanel', id: 'stage-' + key });
    var btns = steps.map(function (s, i) {
      var b = el('button', { class: 'tab', type: 'button', role: 'tab', title: s.label, 'aria-label': s.label, id: 'tab-' + key + '-' + i }, [el('span', { class: 'n', text: String(i + 1) }), el('span', { text: s.label })]);
      b.addEventListener('click', function () { setIdx(i, true); });
      b.addEventListener('keydown', function (e) { var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (n) { e.preventDefault(); var j = (i + n + steps.length) % steps.length; setIdx(j, false); btns[j].focus(); } });
      tabs.appendChild(b); return b;
    });
    function paintTabs() { btns.forEach(function (b, i) { var ok = !!steps[i].done(); b.classList.toggle('ok', ok); b.setAttribute('aria-label', steps[i].label + (ok ? ', done' : '')); b.setAttribute('aria-controls', 'stage-' + key); b.setAttribute('aria-selected', i === idx ? 'true' : 'false'); b.tabIndex = i === idx ? 0 : -1; }); if (hooks.onIdx) hooks.onIdx(idx); }
    function paintStage() {
      var f = document.activeElement && document.activeElement.id, top = $('main').scrollTop;
      stage.innerHTML = ''; stage.setAttribute('aria-labelledby', 'tab-' + key + '-' + idx);
      steps[idx].body(stage, function (i) { setIdx(i, true); });
      var nav = el('div', { class: 'stepnav' });
      if (idx > 0) { var bk = el('button', { class: 'btn textlink', type: 'button', text: '\u2190 Back' }); bk.addEventListener('click', function () { setIdx(idx - 1, true); }); nav.appendChild(bk); } else nav.appendChild(el('span'));
      var last = idx === steps.length - 1, nx = el('button', { class: 'btn primary', type: 'button', text: steps[idx].nextLabel || (last ? (key === 'start' ? 'Continue to Module 1' : 'Finish and continue') : 'Next: ' + steps[idx + 1].label) });
      nx.addEventListener('click', function () {
        if (steps[idx].onNext) steps[idx].onNext();
        if (!last) { setIdx(idx + 1, true); return; }
        var req = steps.filter(function (s) { return !s.skippable; });
        if (!req.every(function (s) { return s.done(); })) { var o = steps.findIndex(function (s) { return !s.skippable && !s.done(); }); toast('Step ' + (o + 1) + ' is not done yet.'); setIdx(o, true); return; }
        if (hooks.finish) { hooks.finish(stage); return; }
        var n = nextUp(); goTo(n.route, n.step);
      });
      nav.appendChild(nx); stage.appendChild(nav);
      if (f) { var t = document.getElementById(f); if (t && t.focus) t.focus({ preventScroll: true }); }
      $('main').scrollTop = top;
    }
    function setIdx(i, focusStage) { idx = i; S.step[key] = i; touchSoft(); paintTabs(); stage.style.animation = 'none'; void stage.offsetWidth; stage.style.animation = ''; paintStage(); if (focusStage) { var h = stage.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } } }
    if (steps.length > 1) host.appendChild(tabs); host.appendChild(stage);
    cur = { paintTabs: paintTabs, paintStage: paintStage, steps: steps, idx: function () { return idx; }, go: function (i) { setIdx(i, true); } };
    paintTabs(); paintStage();
  }

  var wasDone = false, booted = false, celebrated = false;
  function touchSoft() { chrome(); if (screenLive) screenLive(); }
  function touch(hard) {
    afterChange(); chrome();
    if (cur) { cur.paintTabs(); if (hard) cur.paintStage(); }
    if (screenLive) screenLive();
  }
  var screenLive = null;
  function afterChange() {
    var d = allDone();
    if (d && !S.cert.date) { S.cert.date = new Date().toISOString(); S.cert.id = mkId(); }
    if (d && !wasDone && booted && !celebrated) { celebrated = true; celebrate(); toast('You finished the Course. Your certificate is ready.'); }
    wasDone = d;
  }

  /* ---------- modal (start over confirm) ---------- */
  var modalReturn = null;
  function closeModal() { $('modal').hidden = true; if (modalReturn && modalReturn.focus) try { modalReturn.focus(); } catch (e) {} }
  function openModal(html, buttons) {
    var box = $('modal-box'); box.innerHTML = html; var row = el('div', { class: 'btns' });
    buttons.forEach(function (b) { var x = el('button', { class: 'btn ' + (b.cls || 'ghost'), type: 'button', text: b.label }); x.addEventListener('click', function () { closeModal(); if (b.fn) b.fn(); }); row.appendChild(x); });
    box.appendChild(row); modalReturn = document.activeElement; $('modal').hidden = false; var f = row.querySelector('.btn'); if (f) f.focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (!$('modal').hidden) closeModal(); else if (!$('sheet').hidden) closeSkills(); else if (W.open) closeQuest(true); else document.body.classList.remove('nav-open'); } });
  $('modal').addEventListener('click', function (e) { if (e.target === $('modal')) closeModal(); });

  /* ---------- hero circuits ---------- */
  function buildCircuits(svg) {
    var ns = 'http://www.w3.org/2000/svg';
    svg.innerHTML = '<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
    var paths = ['M1200 50 H1100 L1070 80 V170 L1030 210 H990', 'M1200 150 H1150 L1130 170', 'M1200 300 H1140 L1110 330 H1050 L1030 350', 'M1080 0 V30 L1100 50 H1150'];
    var pads = [[990, 210], [1130, 170], [1030, 350], [1150, 50]];
    paths.forEach(function (d, i) {
      var p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); p.setAttribute('pathLength', '100'); p.setAttribute('class', 't draw'); p.style.animationDelay = (i * 0.18) + 's'; svg.appendChild(p);
      var q = document.createElementNS(ns, 'path'); q.setAttribute('d', d); q.setAttribute('pathLength', '100'); q.setAttribute('class', 'pulse'); q.style.animationDelay = (1.4 + i * 0.7) + 's'; q.style.animationDuration = (4 + (i % 3)) + 's'; svg.appendChild(q);
    });
    pads.forEach(function (c) { var k = document.createElementNS(ns, 'circle'); k.setAttribute('cx', c[0]); k.setAttribute('cy', c[1]); k.setAttribute('r', 6); k.setAttribute('class', 'pad'); svg.appendChild(k); });
  }

  /* ---------- widgets ---------- */
  function skillCard(skill, scope, isOn, onToggle) {
    var li = el('li'), card = el('div', { class: 'card' + (isOn ? ' on' : '') });
    card.insertAdjacentHTML('afterbegin', TRACE);
    card.appendChild(el('div', { class: 'gwrap', html: glyph(skill.id) }));
    var pick = el('button', { class: 'pick', type: 'button', id: 'pick-' + scope + '-' + skill.id, 'aria-pressed': isOn ? 'true' : 'false', text: skill.name });
    pick.addEventListener('click', function () { onToggle(skill.id); });
    var open = el('a', { class: 'open', href: skill.url, target: '_blank', rel: 'noopener', text: 'Open the skill in your library (Premium) \u2197', 'aria-label': 'Open ' + skill.name + ' in your Premium library, in a new tab' });
    var tick = el('span', { class: 'tick' }, [el('i'), el('span', { text: isOn ? 'Picked' : 'Pick' })]);
    card.appendChild(pick); if (skill.does) { var dp = el('p', { class: 'does' }, [el('b', { text: 'Use it when: ' })]); dp.appendChild(document.createTextNode(skill.does)); card.appendChild(dp); } card.appendChild(el('div', { class: 'row' }, [tick, open]));
    card.addEventListener('pointermove', function (e) { var r = card.getBoundingClientRect(); card.style.setProperty('--mx', (e.clientX - r.left) + 'px'); card.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    li.appendChild(card); return li;
  }
  function checkRow(id, text, checked, onChange) {
    var cb = el('input', { type: 'checkbox', id: id }); cb.checked = !!checked; cb.addEventListener('change', function () { onChange(cb.checked); });
    return el('label', { class: 'checkrow', 'for': id }, [cb, el('span', { text: text })]);
  }
  function field(id, label, value, min, onInput) {
    var ta = el('textarea', { id: id, rows: '4', 'aria-describedby': id + '-c' }); ta.value = value || ''; var cnt = el('span', { class: 'count', id: id + '-c' });
    function paint() { var l = len(ta.value); cnt.textContent = l >= min ? 'Done' : (min - l) + ' more characters to count this answer'; cnt.classList.toggle('ok', l >= min); }
    ta.addEventListener('input', function () { onInput(ta.value); paint(); touch(false); });
    paint(); return el('label', { class: 'f', 'for': id }, [el('span', { text: label }), ta, cnt]);
  }
  function pickedLine(ids, prefix, note) {
    var w = el('div', { class: 'picked' }, [el('p', { class: 'eyebrow', text: prefix })]), pc = el('div', { class: 'pickchips big' }); ids.forEach(function (id) { var sk = skillById(id); pc.appendChild(el('a', { href: sk.url, target: '_blank', rel: 'noopener', html: '<span class="gw">' + glyph(sk.id) + '</span>' + sk.name + ' <span aria-hidden="true">\u2197</span>' })); }); w.appendChild(pc); if (note) w.appendChild(el('p', { class: 'hint backline', text: note })); return w;
  }
  function skipBtn(label, fn) { var b = el('button', { class: 'btn ghost', type: 'button', text: label }); b.addEventListener('click', fn); return b; }

  /* ---------- screens ---------- */
  var current = 'home';
  function screenHead(eyebrow, title, extra, sub) {
    var hs = el('div', { class: 'hs' }), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'bgc circuits'); svg.setAttribute('viewBox', '0 0 1200 420'); svg.setAttribute('preserveAspectRatio', 'xMaxYMid slice'); svg.setAttribute('aria-hidden', 'true'); buildCircuits(svg); hs.appendChild(svg);
    extra.forEach(function (x) { hs.appendChild(x); });
    hs.appendChild(el('div', { class: 'meta' }, [el('span', { class: 'pill', text: eyebrow }), el('h1', { text: title, tabindex: '-1' }), sub ? el('p', { class: 'hs-sub', text: sub }) : null]));
    return hs;
  }

  function screenHome(host) {
    var banner = el('section', { class: 'banner' });
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'circuits'); svg.setAttribute('viewBox', '0 0 1200 420'); svg.setAttribute('preserveAspectRatio', 'xMaxYMid slice'); svg.setAttribute('aria-hidden', 'true'); buildCircuits(svg);
    banner.appendChild(svg);
    banner.appendChild(el('span', { class: 'eyebrow', text: 'Leadership in Change · Premium' }));
    banner.appendChild(el('h1', { html: 'The Leader&rsquo;s AI <em>Skills</em> Course', tabindex: '-1' }));
    banner.appendChild(el('p', { class: 'lead', text: C.hero.lead }));
    var cta = el('div', { class: 'cta-row' }), nu = nextUp(), started = startDone() || S.start.read || C.modules.some(function (m) { return modSteps(m).some(Boolean); }) || capSteps().some(Boolean);
    var go1 = el('button', { class: 'btn primary big', type: 'button', text: allDone() ? 'Open my certificate' : started ? 'Continue: ' + routeTitle(nu.route) : 'Start Here: install your first skill' }); go1.addEventListener('click', function () { if (!started && !allDone()) goTo('start', 0); else goTo(nu.route, nu.step); });
    cta.appendChild(go1);
    if (!started) cta.appendChild(textBtn('Or skip to Module 1 \u2192', function () { goTo('m-' + C.modules[0].id, 0); }));
    banner.appendChild(cta); banner.appendChild(el('p', { class: 'hint', text: C.hero.note }));
    host.appendChild(banner);
    var cards = el('div', { class: 'strip' }); host.appendChild(cards);
    var mk = el('section', { class: 'panel resume', style: 'margin-top:22px' }); host.appendChild(mk);
    var how = el('section', { class: 'panel', style: 'margin-top:22px' });
    how.innerHTML = '<h2 style="font-size:22px">Four steps in every module</h2><div class="four">' +
      '<div><b>1. Intro</b>A short read on what the section is for. Skip it any time.</div><div><b>2. ' + C.stepsCopy.pick + '</b>Choose as many skills as you want, at least one.</div><div><b>3. ' + C.stepsCopy.run + '</b>Use it on a real task, not a sample.</div><div><b>4. ' + C.stepsCopy.show + '</b>Three short answers about what you kept, changed and refused.</div></div>';
    host.appendChild(how);
    function paintMark() {
      mk.innerHTML = '<h2 style="font-size:22px">Already finished a section?</h2><p class="hint">Tick what you have already done and jump straight to what is next. This is on your word, so mark only what you really finished.</p>';
      var row = el('div', { class: 'markrow' });
      var items = [['start', 'Start Here']].concat(C.modules.map(function (m, i) { return ['m-' + m.id, (i + 1) + '. ' + m.name]; }), [['capstone', 'Capstone']]);
      items.forEach(function (it) {
        var real = !S.marked[it[0]] && (it[0] === 'start' ? !!S.start.install : routeDone(it[0])), on = real || !!S.marked[it[0]];
        var b = el('button', { class: 'mk' + (on ? ' on' : '') + (real ? ' real' : ''), type: 'button', 'aria-pressed': on ? 'true' : 'false', id: 'mk-' + it[0] }, [el('i'), el('span', { text: it[1] + (real ? ' (done)' : '') })]);
        if (real) b.setAttribute('aria-disabled', 'true');
        b.addEventListener('click', function () { if (real) return; if (S.marked[it[0]]) delete S.marked[it[0]]; else S.marked[it[0]] = true; touch(false); paintMark(); var nb = document.getElementById('mk-' + it[0]); if (nb) nb.focus({ preventScroll: true }); });
        row.appendChild(b);
      });
      mk.appendChild(row);
      var nu = nextUp(), jb = el('button', { class: 'btn primary', type: 'button', text: allDone() ? 'Open my certificate' : 'Jump to what\u2019s next: ' + routeTitle(nu.route) });
      jb.addEventListener('click', function () { goTo(nu.route, nu.step); }); mk.appendChild(el('div', { class: 'cta-row' }, [jb]));
    }
    paintMark();
    function paint() {
      var dc = doneCount(), n = nextUp();
      cards.innerHTML = '<div class="s-num"><b>' + dc + '</b><span>of 7 parts done</span></div><div class="s-bar"><div class="bigbar"><i style="width:' + Math.round(dc / 7 * 100) + '%"></i></div><p>' + (allDone() ? 'Every part is done. Your certificate is ready.' : 'Next up: <strong>' + routeTitle(n.route) + '</strong>') + '</p></div><p class="s-note">Your progress lasts while this tab is open. Use Copy my answers to keep what you write.</p>';
    }
    paint(); screenLive = function () { paint(); };
  }

  function screenStart(host) {
    var hs = screenHead('Start Here \u00b7 optional', 'How the Course works', [el('div', { class: 'numbig', html: icon('book'), 'aria-hidden': 'true' })], 'Install one skill and you are ready. Every module works on its own.');
    
    host.appendChild(hs);
    Lesson(host, 'start', [
      { label: 'Install a skill', skippable: true, done: function () { return !!S.start.install; }, body: function (st) {
        st.appendChild(el('h2', { text: 'Install a skill, then start' }));
        st.appendChild(el('div', { html: tiles([['doc', 'A saved set of instructions', 'Your AI tool follows it when you ask for that job.'], ['download', 'Set it up once', 'Works in Claude, ChatGPT and Gemini. The walkthrough shows each one.'], ['bolt', 'Run it on real work', 'Each module asks you to use a skill on a real task.']]) }));
        st.appendChild(el('p', { style: 'margin-top:16px' }, [skipBtn('Start the install walkthrough', function () { goTo('install', 0); })])); st.lastChild.firstChild.className = 'btn primary';
        st.appendChild(el('div', { class: 'flow', html: '<span>Start Here</span><i></i><span>6 modules</span><i></i><span>Capstone</span><i></i><span class="end">Certificate</span>' }));
        st.appendChild(el('p', { class: 'hint', text: C.startHere.orderBody }));
        st.appendChild(checkRow('start-install', C.startHere.steps[1].text, S.start.install, function (v) { S.start.install = v; touch(true); }));
      } }
    ]);
  }

  var surface = 'web', tool = 'claude';
  function scene(kind) {
    var url = tool === 'chatgpt' ? 'chatgpt.com' : tool === 'gemini' ? 'gemini.google.com' : surface === 'web' ? 'claude.ai' : 'Claude desktop app';
    var inner = {
      copy: '<div class="sc-card"><i class="ln w100 hot"></i><i class="ln w88"></i><i class="ln w70"></i><i class="ln w80"></i><span class="sc-btn sc-copy"><b class="a">Copy prompt</b><b class="b">\u2713 Copied</b></span></div>',
      toggle: '<div class="sc-set"><div class="sc-row"><span>Code execution and file creation</span><span class="sw"><i></i></span></div><div class="sc-row dim"><span>Other setting</span><span class="sw off"><i></i></span></div></div>',
      paste: '<div class="sc-chat"><div class="sc-input"><i class="ln w100"></i><i class="ln w88"></i><i class="ln w60"></i></div><span class="sc-btn sc-send">Send</span></div>',
      answer: '<div class="sc-chat"><div class="bub l"><i class="ln w88"></i><i class="ln w60"></i></div><div class="bub r"><i class="ln w70"></i></div></div>',
      save: '<div class="sc-card"><div class="sk-h"><span class="sk-i"></span><i class="ln w60"></i></div><i class="ln w88"></i><span class="sc-btn sc-save"><b class="a">Save</b><b class="b">\u2713 Saved</b></span></div>',
      chat: '<div class="sc-chat"><div class="bub r"><i class="ln w88"></i></div><div class="bub l"><span class="chip fire">Skill used</span><i class="ln w100"></i><i class="ln w80"></i></div></div>'
    }[kind];
    return '<div class="mock scn-' + kind + '" aria-hidden="true"><div class="bar"><span class="d"></span><span class="d"></span><span class="d"></span><span class="url">' + (kind === 'copy' ? 'leadershipinchange.com' : url) + '</span></div><div class="stg">' + inner + '<svg class="cur" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.5L11 19 5 3z" fill="#fff" stroke="#2D1810" stroke-width="1.4" stroke-linejoin="round"/></svg></div></div><p class="tiny" style="margin-top:8px">Illustration</p>';
  }
  function screenInstall(host) {
    var seen = [];
    var ih = screenHead('Walkthrough · 6 steps', 'Install a skill', [el('div', { class: 'numbig', html: icon('download'), 'aria-hidden': 'true' })], 'Set it up once in the tool you use.'); ih.classList.add('compact'); host.appendChild(ih);
    var picker = el('div', { class: 'toolpick' }, [el('span', { class: 'eyebrow', text: 'Which AI tool do you use?' })]);
    var seg = el('div', { class: 'seg big', role: 'group', 'aria-label': 'Which AI tool do you use?' });
    [['claude', 'Claude'], ['chatgpt', 'ChatGPT'], ['gemini', 'Gemini']].forEach(function (o) {
      var b = el('button', { type: 'button', text: o[1], 'aria-pressed': tool === o[0] ? 'true' : 'false' }); b.addEventListener('click', function () { if (tool === o[0]) return; tool = o[0]; S.step.install = 0; go('install', false); var nb = document.querySelector('.toolpick .seg button[aria-pressed="true"]'); if (nb) nb.focus(); }); seg.appendChild(b);
    });
    picker.appendChild(seg); host.appendChild(picker);
    var steps = C.installSteps(tool, surface);
    function mk(i) {
      return { label: steps[i].label, skippable: true, done: function () { return !!seen[i]; },
        nextLabel: steps[i].next, onNext: i === steps.length - 1 ? function () { S.start.install = true; touch(false); } : null,
        body: function (st) {
          var d = C.installSteps(tool, surface)[i]; seen[i] = true;
          if (tool === 'claude') {
            var sub = el('div', { class: 'seg', role: 'group', 'aria-label': 'Claude on the web or the desktop app?' });
            [['web', 'Web (claude.ai)'], ['desktop', 'Desktop app']].forEach(function (o) { var b = el('button', { type: 'button', text: o[1], 'aria-pressed': surface === o[0] ? 'true' : 'false' }); b.addEventListener('click', function () { surface = o[0]; cur.paintStage(); }); sub.appendChild(b); });
            st.appendChild(sub);
          }
          st.appendChild(el('p', { class: 'eyebrow', style: 'margin-top:18px', text: 'Step ' + (i + 1) + ' of ' + steps.length + ' · ' + (tool === 'chatgpt' ? 'ChatGPT' : tool === 'gemini' ? 'Gemini' : 'Claude') }));
          st.appendChild(el('h2', { text: d.title }));
          st.appendChild(el('div', { class: 'inst' }, [el('div', { html: scene(d.scene) }), el('div', {}, [el('p', { class: 'read', text: d.body }), el('div', { class: 'tipbox', html: '<b>Tip</b> ' }), i === 0 ? el('p', { style: 'margin-top:14px' }, [el('a', { class: 'btn ghost small', href: C.libraryUrl, target: '_blank', rel: 'noopener', text: 'Open the Skill Library' })]) : null])]));
          st.querySelector('.tipbox').appendChild(document.createTextNode(d.tip));
          if (i === steps.length - 1) st.appendChild(el('div', { class: 'onerule', style: 'margin-top:18px' }, [el('strong', { text: 'That’s it. Your skill is set up.' }), el('p', { text: 'From here, every new skill takes a few minutes.' })]));
          if (tool === 'claude') st.appendChild(el('p', { class: 'hint', style: 'margin-top:14px' }, [el('a', { href: C.guideUrl, target: '_blank', rel: 'noopener', text: 'Prefer the full Claude guide? Open it on jsalinas.org' })]));
        } };
    }
    Lesson(host, 'install', steps.map(function (s2, i) { return mk(i); }), S.step.install || 0);
  }

  function markBtn(key) {
    var on = !!S.marked[key], b = el('button', { class: 'chipbtn' + (on ? ' on' : ''), type: 'button', text: on ? 'Marked done. Undo' : 'Already did this? Mark it done and jump ahead' });
    b.addEventListener('click', function () { if (on) { delete S.marked[key]; touch(true); go(current, false); } else { S.marked[key] = true; touch(false); var n = nextUp(); goTo(n.route, n.step); } });
    return b;
  }
  function doneCard(stage, key) {
    var isCap = key === 'capstone', m = isCap ? null : modById(key.slice(2)), n = nextUp(), picks = isCap ? S.cap.picks : M(m.id).picks;
    stage.innerHTML = '';
    var box = el('div', { class: 'donecard' });
    box.appendChild(el('div', { class: 'donecheck', html: '<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23"/><path d="M15 27l7 7 15-16"/></svg>' }));
    box.appendChild(el('p', { class: 'eyebrow', text: isCap ? 'Capstone complete' : 'Module complete' }));
    var h = el('h2', { text: isCap ? 'Capstone done. Your certificate is ready.' : routeTitle(key) + ' is done.', tabindex: '-1' }); box.appendChild(h);
    if (picks.length) box.appendChild(pickedLine(picks, picks.length === 1 ? 'The skill you used' : 'The skills you used'));
    var row = el('div', { class: 'cta-row' });
    var next = allDone() ? { route: 'certificate', step: 0 } : n;
    var nb = el('button', { class: 'btn primary big', type: 'button', text: allDone() ? 'Open my certificate' : 'Next: ' + routeTitle(next.route) }); nb.addEventListener('click', function () { goTo(next.route, next.step); });
    row.appendChild(nb); row.appendChild(copyBtn()); box.appendChild(row);
    box.appendChild(textBtn('Back to Course home', function () { go('home', true); }));
    stage.appendChild(box); h.focus({ preventScroll: true });
  }
  function screenModule(host, m) {
    var i = C.modules.indexOf(m), chips = el('div', { class: 'chips' });
    var head = screenHead('Module ' + (i + 1) + ' of 6 · ' + m.skills.length + ' skills', m.name, [el('div', { class: 'numbig' + (modDone(m) ? ' done' : ''), id: 'numbig', text: String(i + 1), 'aria-hidden': 'true' })]); head.querySelector('.meta').appendChild(chips); host.appendChild(head);
    function paintHead() { var n = $('numbig'); if (n) n.classList.toggle('done', modDone(m)); var mkb = null; chips.innerHTML = '<span class="chip ' + (modDone(m) ? 'blue' : '') + '">' + (modDone(m) ? 'Module done' : modSteps(m).filter(Boolean).length + ' of 4 steps') + '</span>' + (M(m.id).picks.length ? '<span class="chip">' + M(m.id).picks.length + ' skill' + (M(m.id).picks.length > 1 ? 's' : '') + ' picked</span>' : ''); chips.appendChild(markBtn('m-' + m.id)); }
    paintHead(); screenLive = paintHead;
    var modHooks = { onIdx: function (ix) { head.classList.toggle('compact', ix > 0); }, finish: function (stage) { doneCard(stage, 'm-' + m.id); } };
    Lesson(host, 'm-' + m.id, [
      { label: 'Intro', skippable: true, done: function () { return !!M(m.id).why; }, onNext: function () { M(m.id).why = true; touch(false); }, body: function (st, setIdx) {
        st.appendChild(el('h2', { text: C.stepsCopy.why }));
        st.appendChild(el('div', { class: 'why-text' }, [el('p', { text: m.why })]));
        st.appendChild(el('p', { class: 'eyebrow', style: 'margin-top:22px', text: 'What comes next' }));
        st.appendChild(el('div', { html: tiles([['target', 'Pick your skill', 'Choose as many as you want, at least one.'], ['bolt', 'Run it', 'Use a real task from your week, not a sample.'], ['pencil', 'Show your work', 'Three short answers about what you kept, changed and refused.']]) }));
        st.appendChild(el('div', { class: 'cta-row', style: 'margin-top:18px' }, [skipBtn('Skip intro', function () { M(m.id).why = true; touch(false); setIdx(1); })]));
      } },
      { label: C.stepsCopy.pick, done: function () { return M(m.id).picks.length > 0; }, body: function (st) {
        st.appendChild(el('h2', { text: C.stepsCopy.pick })); st.appendChild(el('p', { class: 'read', text: C.stepsCopy.pickBody })); st.appendChild(textBtn('Browse all 25 skills', openSkills));
        var ul = el('ul', { class: 'cards' }); var d = M(m.id);
        m.skills.forEach(function (sk) { ul.appendChild(skillCard(sk, m.id, d.picks.indexOf(sk.id) >= 0, function (id) { var k = d.picks.indexOf(id); if (k >= 0) d.picks.splice(k, 1); else d.picks.push(id); touch(true); })); });
        st.appendChild(ul);
      } },
      { label: 'Run it', done: function () { return !!M(m.id).run; }, body: function (st) {
        st.appendChild(el('h2', { text: C.stepsCopy.run })); st.appendChild(el('p', { class: 'read', text: C.stepsCopy.runBody }));
        var picks = M(m.id).picks;
        if (picks.length) st.appendChild(pickedLine(picks, 'Your picks: ', C.stepsCopy.backLine)); else st.appendChild(el('p', { class: 'hint', text: 'Pick a skill in step 2 first, then open it here.' }));
        var ih = el('p', { class: 'hint' }); var ib = el('button', { class: 'linkbtn', type: 'button', text: 'Need to install it first? Open the install walkthrough' }); ib.addEventListener('click', function () { goTo('install', 0); }); ih.appendChild(ib); st.appendChild(ih);
        st.appendChild(checkRow('run-' + m.id, C.stepsCopy.runCheck, M(m.id).run, function (v) { M(m.id).run = v; touch(true); }));
      } },
      { label: C.stepsCopy.show, done: function () { return showDone(m); }, body: function (st) {
        st.appendChild(el('h2', { text: C.stepsCopy.show })); st.appendChild(el('p', { class: 'hint', text: C.stepsCopy.showHint }));
        var f = el('div', { class: 'fields' }); C.stepsCopy.showQs.forEach(function (q) { f.appendChild(field('show-' + m.id + '-' + q.id, q.label, M(m.id).show[q.id], MIN_SHOW, function (v) { M(m.id).show[q.id] = v; })); }); st.appendChild(f);
        st.appendChild(el('div', { class: 'cta-row' }, [copyBtn()]));
      } }
    ], null, modHooks);
  }

  function screenCapstone(host) {
    var ch = screenHead('Capstone', 'Three skills, one week, one judgment log', [el('div', { class: 'numbig', text: 'C', 'aria-hidden': 'true' })], 'The last step before your certificate.'); var cc = el('div', { class: 'chips' }, [markBtn('capstone')]); ch.querySelector('.meta').appendChild(cc); host.appendChild(ch);
    var capHooks = { onIdx: function (ix) { ch.classList.toggle('compact', ix > 0); }, finish: function (stage) { doneCard(stage, 'capstone'); } };
    Lesson(host, 'capstone', [
      { label: 'Intro', skippable: true, done: function () { return !!S.cap.why; }, onNext: function () { S.cap.why = true; touch(false); }, body: function (st, setIdx) {
        st.appendChild(el('h2', { text: 'About the Capstone' }));
        st.appendChild(el('div', { class: 'why-text' }, [el('p', { text: C.capstone.body })]));
        st.appendChild(el('p', { class: 'eyebrow', style: 'margin-top:22px', text: 'What comes next' }));
        st.appendChild(el('div', { html: tiles([['target', 'Pick three or more', 'From any sections.'], ['bolt', 'Run them', 'In the same week, on real work.'], ['log', 'Write the log', 'Where AI helped, where you overrode it, what you will keep doing.']]) }));
        st.appendChild(el('div', { class: 'cta-row', style: 'margin-top:18px' }, [skipBtn('Skip intro', function () { S.cap.why = true; touch(false); setIdx(1); })]));
      } },
      { label: 'Pick three or more', done: function () { return S.cap.picks.length >= 3; }, body: function (st) {
        st.appendChild(el('h2', { text: 'Pick at least three skills' })); st.appendChild(el('p', { class: 'hint', text: 'Choose from any section. Pick as many as you plan to run.' }));
        var groups = el('div', { class: 'cap-groups' });
        C.modules.forEach(function (m) {
          var ul = el('ul', { class: 'cards' });
          m.skills.forEach(function (sk) { ul.appendChild(skillCard(sk, 'cap', S.cap.picks.indexOf(sk.id) >= 0, function (id) { var p = S.cap.picks, k = p.indexOf(id); if (k >= 0) p.splice(k, 1); else p.push(id); touch(true); })); });
          groups.appendChild(el('div', {}, [el('h4', { text: m.name }), ul]));
        });
        st.appendChild(groups); st.appendChild(el('p', { class: 'pickcount', text: S.cap.picks.length + ' picked' + (S.cap.picks.length < 3 ? ' (at least 3)' : '') }));
      } },
      { label: 'Run them', done: function () { return !!S.cap.ran; }, body: function (st) {
        st.appendChild(el('h2', { text: 'Run them in the same week' })); st.appendChild(el('p', { class: 'read', text: 'Use real work for each one. Keep the outputs next to each other so you can compare them in the log.' }));
        if (S.cap.picks.length) st.appendChild(pickedLine(S.cap.picks, 'Your picks: ', C.stepsCopy.backLine));
        st.appendChild(checkRow('cap-ran', 'I ran them on real work in the same week.', S.cap.ran, function (v) { S.cap.ran = v; touch(true); }));
      } },
      { label: 'Judgment log', done: function () { return capSteps()[3]; }, body: function (st) {
        st.appendChild(el('h2', { text: 'Write your one-page judgment log' }));
        var f = el('div', { class: 'fields' }); C.capstone.logQs.forEach(function (q) { f.appendChild(field('cap-' + q.id, q.label, S.cap.log[q.id], MIN_LOG, function (v) { S.cap.log[q.id] = v; })); }); st.appendChild(f);
        st.appendChild(el('div', { class: 'cta-row' }, [copyBtn()]));
      } }
    ], null, capHooks);
  }

  /* ---------- certificate ---------- */
  function fmtDate(iso) { return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
  function mkId() { var a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', out = '', r = new Uint8Array(8); try { crypto.getRandomValues(r); } catch (e) { for (var i = 0; i < 8; i++) r[i] = Math.floor(Math.random() * 256); } for (var j = 0; j < 8; j++) out += a[r[j] % a.length]; return 'LIC-' + out.slice(0, 4) + '-' + out.slice(4); }
  function linkedinUrl() { var d = new Date(S.cert.date), q = new URLSearchParams({ startTask: 'CERTIFICATION_NAME', name: C.name, organizationName: C.org, issueYear: String(d.getFullYear()), issueMonth: String(d.getMonth() + 1), certId: S.cert.id }); return 'https://www.linkedin.com/profile/add?' + q.toString(); }

  function screenCert(host) {
    host.appendChild(screenHead('Certificate of Completion', allDone() ? 'Your Certificate of Completion' : 'Finish all six modules and the Capstone', [el('div', { class: 'numbig' + (allDone() ? ' done' : ''), text: '\u2605', 'aria-hidden': 'true' })], allDone() ? 'Add your name, then screenshot it or download the image.' : 'Your certificate appears here when every part is done.'));
    if (!allDone()) {
      var box = el('div', { class: 'locked-box' }); box.appendChild(el('p', { html: '<strong>Your certificate appears when every part is done.</strong>' }));
      var ul = el('ul'); C.modules.forEach(function (m) { var d = modDone(m); var a = el('a', { href: '#m-' + m.id, text: (d ? 'Done: ' : 'To do: ') + m.name }); a.addEventListener('click', function (e) { e.preventDefault(); go('m-' + m.id, true); }); ul.appendChild(el('li', { class: d ? 'ok' : '' }, [a])); });
      var ca = el('a', { href: '#capstone', text: (capDone() ? 'Done: ' : 'To do: ') + 'Capstone' }); ca.addEventListener('click', function (e) { e.preventDefault(); go('capstone', true); }); ul.appendChild(el('li', { class: capDone() ? 'ok' : '' }, [ca]));
      box.appendChild(ul); host.appendChild(box); return;
    }
    var ctl = el('div', { class: 'cert-controls' });
    var nameIn = el('input', { type: 'text', id: 'cert-name', autocomplete: 'name', maxlength: '40', placeholder: 'First and last name' }); nameIn.value = S.cert.name || '';
    ctl.appendChild(el('label', { class: 'f', 'for': 'cert-name' }, [el('span', { html: '<em class="stepn">1</em> Type your name as it should appear on the certificate' }), nameIn]));
    var act = el('div', { class: 'cert-actions' }), dlB = el('button', { class: 'btn primary', type: 'button', text: 'Download certificate (image)' }), li = el('a', { class: 'btn ghost', href: linkedinUrl(), target: '_blank', rel: 'noopener', text: 'Add to LinkedIn' });
    ctl.appendChild(el('p', { class: 'f', style: 'font-weight:600;color:var(--navy);margin-top:6px', html: '<em class="stepn">2</em> Download it or take a screenshot' })); act.appendChild(dlB); act.appendChild(li); act.appendChild(copyBtn()); ctl.appendChild(act); var msg = el('p', { class: 'hint', id: 'cert-msg' }); msg.setAttribute('aria-live', 'polite'); ctl.appendChild(msg); host.appendChild(ctl);
    var corner = '<svg class="corner CLS" viewBox="0 0 40 40" aria-hidden="true"><path d="M2 38 V14 L10 6 H38 M10 6 V20 M18 6 V12"/></svg>';
    var cert = el('div', { class: 'cert', role: 'img', 'aria-label': 'Certificate of Completion preview' });
    cert.innerHTML = '<div class="frame"></div><div class="band"></div>' + ['tl', 'tr', 'bl', 'br'].map(function (c) { return corner.replace('CLS', c); }).join('') +
      '<div class="in"><img alt="Leadership in Change" src="' + (window.LOGO_B64 || '') + '"><div class="t1">Certificate of Completion</div>' +
      '<div class="pres"><i></i><span>Presented to</span><i></i></div><div class="nm" id="cert-nm"></div><div class="rule"></div>' +
      '<div class="small">has successfully completed</div><div class="cn">' + C.name + '</div>' +
      '<div class="learn">Six modules and a Capstone applying AI skills to real work: ' + C.modules.map(function (m) { return m.name; }).join(', ').replace(/, ([^,]*)$/, ' and $1') + '. Each skill was run on real work, with a written record of what was kept, changed and refused.</div>' +
      '<div class="foot3"><div class="rec"><span>Date completed</span><b>' + fmtDate(S.cert.date) + '</b><span>Certificate ID</span><b>' + S.cert.id + '</b></div>' +
      '<svg class="seal" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" class="r1"/><circle cx="50" cy="50" r="31" class="r2"/><path id="sealp" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" fill="none"/><text><textPath href="#sealp" startOffset="0">LEADERSHIP IN CHANGE · COURSE COMPLETION · </textPath></text><polygon class="st" points="50,34 54.5,45 66,45.5 57,53 60,64.5 50,58 40,64.5 43,53 34,45.5 45.5,45"/></svg>' +
      '<div class="sig"><i></i><b>Joel Salinas</b><small>Leadership in Change</small></div></div>' +
      '<div class="legal">Self-paced Course · Issued by Leadership in Change LLC · leadershipinchange.com</div></div>';
    host.appendChild(cert);
    function paintName() { var n = nameIn.value.trim(), t = cert.querySelector('#cert-nm'); t.textContent = n || 'Your name'; t.classList.toggle('empty', !n); }
    paintName();
    nameIn.addEventListener('input', function () { S.cert.name = nameIn.value; paintName(); });
    dlB.addEventListener('click', function () { msg.textContent = 'Preparing your image...'; downloadPng(function (m2) { msg.textContent = m2; }); });
    host.appendChild(el('div', { class: 'honest', html: '<strong>What this certificate is and is not.</strong> It records that you completed the Course. You can screenshot it or download the image. The ID is generated on this page and is not stored anywhere, and there is no verify link. A verify page needs a backend and is not part of this version.' }));
  }

  /* certificate image, drawn at 2200 x 1700 */
  function downloadPng(done) {
    var name = (S.cert.name || '').trim(); if (!name) { var n = $('cert-name'); if (n) n.focus(); done('Add your name first.'); return; }
    var cv = document.createElement('canvas'), W = cv.width = 2200, H = cv.height = 1700, x = cv.getContext('2d'), cx = W / 2;
    var NAVY = '#1B2A4A', TERRA = '#C4563A', SAND = '#D4956A', SOFT = '#6B4A3C', BLUE = '#3C9EE7', DEEP = '#8B3A2A';
    function sp(v) { if ('letterSpacing' in x) x.letterSpacing = v; }
    function text(t, y, font, color, ls, al) { x.font = font; x.fillStyle = color; x.textAlign = al || 'center'; sp(ls || '0px'); x.fillText(t, al === 'left' ? 0 : cx, y); sp('0px'); }
    function T(t, px, y, font, color, ls, al) { x.font = font; x.fillStyle = color; x.textAlign = al || 'center'; sp(ls || '0px'); x.fillText(t, px, y); sp('0px'); }
    x.fillStyle = '#FFFDFB'; x.fillRect(0, 0, W, H);
    // fine hatch band between the two borders (security-style)
    x.save(); x.beginPath(); x.rect(70, 70, W - 140, H - 140); x.rect(100, 100, W - 200, H - 200); x.clip('evenodd');
    var pc = document.createElement('canvas'); pc.width = pc.height = 9; var px = pc.getContext('2d'); px.strokeStyle = 'rgba(212,149,106,.45)'; px.lineWidth = 2; px.beginPath(); px.moveTo(-1, -1); px.lineTo(10, 10); px.stroke(); x.fillStyle = x.createPattern(pc, 'repeat'); x.fillRect(60, 60, W - 120, H - 120); x.restore();
    x.strokeStyle = TERRA; x.lineWidth = 8; x.strokeRect(70, 70, W - 140, H - 140); x.strokeStyle = SAND; x.lineWidth = 3; x.strokeRect(100, 100, W - 200, H - 200);
    x.strokeStyle = BLUE; x.lineWidth = 6; x.lineCap = 'round'; x.shadowColor = BLUE; x.shadowBlur = 14;
    [[135, 135, 1, 1], [W - 135, 135, -1, 1], [135, H - 135, 1, -1], [W - 135, H - 135, -1, -1]].forEach(function (c) { var px = c[0], py = c[1], sx = c[2], sy = c[3]; x.beginPath(); x.moveTo(px + 190 * sx, py); x.lineTo(px, py); x.lineTo(px, py + 190 * sy); x.moveTo(px + 40 * sx, py + 40 * sy); x.lineTo(px + 130 * sx, py + 40 * sy); x.moveTo(px + 40 * sx, py + 40 * sy); x.lineTo(px + 40 * sx, py + 130 * sy); x.stroke(); });
    x.shadowBlur = 0;
    function seal(sx, sy, r) {
      x.save(); x.shadowColor = BLUE; x.shadowBlur = 20; x.strokeStyle = BLUE; x.lineWidth = 6; x.beginPath(); x.arc(sx, sy, r, 0, 7); x.stroke(); x.shadowBlur = 0; x.lineWidth = 3; x.beginPath(); x.arc(sx, sy, r * .67, 0, 7); x.stroke();
      var str = 'LEADERSHIP IN CHANGE · COURSE COMPLETION · ', nn = str.length, step = Math.PI * 2 / nn; x.fillStyle = NAVY; x.font = '700 25px Inter, sans-serif'; x.textAlign = 'center';
      for (var i = 0; i < nn; i++) { x.save(); x.translate(sx, sy); x.rotate(i * step - Math.PI / 2 + step / 2); x.fillText(str[i], 0, -(r * .84) + 8); x.restore(); }
      x.shadowColor = BLUE; x.shadowBlur = 16; x.fillStyle = BLUE; x.beginPath(); for (var j = 0; j < 10; j++) { var rr = j % 2 ? r * .13 : r * .3, a2 = j * Math.PI / 5 - Math.PI / 2; x.lineTo(sx + Math.cos(a2) * rr, sy + Math.sin(a2) * rr); } x.closePath(); x.fill(); x.restore();
    }
    function finish() {
      text('CERTIFICATE OF COMPLETION', 520, '700 80px "Roboto Slab", Georgia, serif', DEEP, '10px');
      // presented to, flanked by rules
      x.fillStyle = SOFT; x.font = '600 30px Inter, sans-serif'; sp('9px'); var pw = x.measureText('PRESENTED TO').width; sp('0px');
      T('PRESENTED TO', cx, 625, '600 30px Inter, sans-serif', SOFT, '9px'); x.strokeStyle = SAND; x.lineWidth = 3;
      x.beginPath(); x.moveTo(cx - pw / 2 - 90, 615); x.lineTo(cx - pw / 2 - 360, 615); x.moveTo(cx + pw / 2 + 90, 615); x.lineTo(cx + pw / 2 + 360, 615); x.stroke();
      var fs = 150; x.font = '700 ' + fs + 'px "Roboto Slab", Georgia, serif'; while (x.measureText(name).width > W - 600 && fs > 52) { fs -= 8; x.font = '700 ' + fs + 'px "Roboto Slab", Georgia, serif'; }
      T(name, cx, 790, '700 ' + fs + 'px "Roboto Slab", Georgia, serif', NAVY);
      var g = x.createLinearGradient(cx - 560, 0, cx + 560, 0); g.addColorStop(0, 'rgba(212,149,106,0)'); g.addColorStop(.5, BLUE); g.addColorStop(1, 'rgba(212,149,106,0)');
      x.strokeStyle = g; x.lineWidth = 5; x.shadowColor = BLUE; x.shadowBlur = 12; x.beginPath(); x.moveTo(cx - 560, 835); x.lineTo(cx + 560, 835); x.stroke(); x.shadowBlur = 0;
      T('has successfully completed', cx, 925, '400 40px Inter, sans-serif', SOFT);
      T(C.name, cx, 1025, '600 76px "Roboto Slab", Georgia, serif', NAVY);
      var learn = 'Six modules and a Capstone applying AI skills to real work: ' + C.modules.map(function (m) { return m.name; }).join(', ').replace(/, ([^,]*)$/, ' and $1') + '. Each skill was run on real work, with a written record of what was kept, changed and refused.';
      x.font = '400 32px Inter, sans-serif'; var words = learn.split(' '), line = '', ly = 1095, lines = []; words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (x.measureText(t).width > 1480) { lines.push(line); line = w; } else line = t; }); lines.push(line);
      lines.forEach(function (l, i) { T(l, cx, ly + i * 44, '400 31px Inter, sans-serif', SOFT); });
      // record, seal, signature
      var fy = 1290;
      T('DATE COMPLETED', 330, fy, '600 22px Inter, sans-serif', SOFT, '4px', 'left'); T(fmtDate(S.cert.date), 330, fy + 46, '600 38px Inter, sans-serif', NAVY, '0px', 'left');
      T('CERTIFICATE ID', 330, fy + 120, '600 22px Inter, sans-serif', SOFT, '4px', 'left'); T(S.cert.id, 330, fy + 166, '600 38px Inter, sans-serif', NAVY, '0px', 'left');
      seal(cx, fy + 55, 135);
      x.strokeStyle = NAVY; x.lineWidth = 3; x.beginPath(); x.moveTo(1560, fy + 105); x.lineTo(1880, fy + 105); x.stroke();
      T(C.certificate.signer, 1720, fy + 155, '700 40px "Roboto Slab", Georgia, serif', NAVY); T(C.org, 1720, fy + 198, '400 30px Inter, sans-serif', SOFT);
      T('Self-paced Course · Issued by Leadership in Change LLC · leadershipinchange.com', cx, 1556, '400 26px Inter, sans-serif', SOFT, '1px');
      cv.toBlob(function (b) { if (!b) { done('The image could not be made here. Take a screenshot of the certificate below instead.'); return; } var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'LiC-Skills-Course-Certificate.png'; document.body.appendChild(a); a.click(); a.remove(); done('Your certificate image is downloading. If nothing happens, take a screenshot of the certificate below.'); }, 'image/png');
    }
    function start() { var img = new Image(); img.onload = function () { var w = 640, h = w * img.height / img.width; x.drawImage(img, cx - w / 2, 190, w, h); finish(); }; img.onerror = finish; img.src = window.LOGO_B64 || ''; }
    var fl = []; try { fl = ['700 80px "Roboto Slab"', '600 76px "Roboto Slab"', '400 32px Inter', '600 38px Inter'].map(function (f) { return document.fonts.load(f); }); } catch (e) {}
    Promise.all(fl).then(start, start);
  }

  /* ---------- router ---------- */
  function go(key, user) {
    if (!validRoute(key)) key = 'home';
    current = key; cur = null; screenLive = null;
    var host = $('screen'); host.innerHTML = ''; host.style.animation = 'none'; void host.offsetWidth; host.style.animation = '';
    $('app').classList.toggle('has-rail', key !== 'home');
    document.body.classList.remove('nav-open'); $('btn-menu').setAttribute('aria-expanded', 'false');
    if (key === 'home') screenHome(host); else if (key === 'start') screenStart(host); else if (key === 'capstone') screenCapstone(host); else if (key === 'certificate') screenCert(host); else if (key === 'install') screenInstall(host); else screenModule(host, modById(key.slice(2)));
    chrome(); $('main').scrollTop = 0;
    try { if (location.hash.slice(1) !== key) location.hash = key; } catch (e) {}
    if (user) { var h = host.querySelector('h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
  }
  window.addEventListener('hashchange', function () { var k = location.hash.slice(1); if (k && k !== current && validRoute(k)) go(k, true); });

  /* ---------- celebration ---------- */
  function celebrate() {
    if (reduce) return;
    var cv = $('celebrate'), ctx = cv.getContext('2d'), w = cv.width = innerWidth, h = cv.height = innerHeight, ps = [];
    for (var i = 0; i < 70; i++) { var a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 6; ps.push({ x: w / 2, y: h * .45, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, l: 1, s: 2 + Math.random() * 3 }); }
    (function tick() { ctx.clearRect(0, 0, w, h); var alive = false; ps.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.vy += .12; p.vx *= .99; p.l -= .012; if (p.l > 0) { alive = true; ctx.globalAlpha = p.l; ctx.shadowColor = '#3C9EE7'; ctx.shadowBlur = 12; ctx.fillStyle = '#3C9EE7'; ctx.fillRect(p.x, p.y, p.s, p.s * 3); } }); if (alive) requestAnimationFrame(tick); else ctx.clearRect(0, 0, w, h); })();
  }

  /* ---------- tools ---------- */
  $('btn-reset').addEventListener('click', function () {
    openModal('<h2 id="modal-title">Start over?</h2><p>This clears everything you entered on this page.</p>', [
      { label: 'Yes, start over', cls: 'primary', fn: function () { S = fresh(); wasDone = false; celebrated = false; go('home', true); toast('Cleared.'); } }, { label: 'Keep going' }]);
  });
  $('btn-copy').addEventListener('click', copyAnswers);
  $('btn-skills').addEventListener('click', openSkills);
  $('sheet').addEventListener('click', function (e) { if (e.target === $('sheet')) closeSkills(); });
  $('btn-menu').addEventListener('click', function () { var o = document.body.classList.toggle('nav-open'); this.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  $('scrim').addEventListener('click', function () { document.body.classList.remove('nav-open'); $('btn-menu').setAttribute('aria-expanded', 'false'); });

  /* ---------- coming soon gate ---------- */
  function soonScreen() {
    var host = $('soon'); host.hidden = false; $('app').hidden = true; document.body.classList.add('soon-on');
    host.innerHTML = '<svg class="soon-circ" id="soon-circ" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg>' +
      '<div class="soon-in"><img class="soon-logo" alt="Leadership in Change" src="' + (window.LOGO_B64 || '') + '">' +
      '<p class="soon-kick">Coming November 5</p>' +
      '<h1>The Leader&rsquo;s <em>AI Skills</em> Course</h1>' +
      '<p class="soon-stats"><b>25</b> skills <i></i><b>6</b> modules <i></i><b>1</b> Capstone <i></i><b>1</b> Certificate of Completion</p>' +
      '<div class="soon-count" id="soon-count" aria-live="off"></div>' +
      '<div class="soon-only"><span>Only on</span><img alt="Leadership in Change" src="' + (window.LOGO_B64 || '') + '"><b>Premium</b></div>' +
      '<p class="soon-lead">Make sure you&rsquo;re a Premium subscriber before it opens. The Course and all 25 skills live in Leadership in Change Premium.</p>' +
      '<div class="soon-cta"><a class="btn primary big" href="' + C.subscribeUrl + '" target="_blank" rel="noopener">Subscribe to Premium</a></div>' +
      '<p class="soon-member">Already a Premium member? You&rsquo;re all set. The Course opens right here on November 5.</p>' +
      '<p class="soon-tools">Works in Claude, ChatGPT and Gemini</p>' +
      '<div class="soon-shot"><img src="soon-map.jpg" alt="A preview of the Course map inside the app" loading="lazy"></div></div>';
    buildCircuits($('soon-circ'));
    var end = new Date(C.launchAt).getTime(), box = $('soon-count');
    function tick() {
      var ms = end - Date.now(); if (ms <= 0) { location.reload(); return; }
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
      box.innerHTML = [[d, 'days'], [h, 'hours'], [m, 'minutes'], [sec, 'seconds']].map(function (x) { return '<div><b>' + String(x[0]).padStart(2, '0') + '</b><span>' + x[1] + '</span></div>'; }).join('');
      box.setAttribute('aria-label', d + ' days, ' + h + ' hours until the Course opens');
    }
    tick(); setInterval(tick, 1000);
  }
  var preview = false; try { preview = /[?&]preview\b/.test(location.search); } catch (e) {}
  if (!preview && C.launchAt && Date.now() < new Date(C.launchAt).getTime()) { soonScreen(); return; }

  /* ---------- init ---------- */
  $('logo').src = window.LOGO_B64 || '';
  afterChange();
  var h0 = ''; try { h0 = location.hash.slice(1); } catch (e) {}
  go(validRoute(h0) ? h0 : 'home', false);
  booted = true;
})();
