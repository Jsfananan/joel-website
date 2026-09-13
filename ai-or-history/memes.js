// Detective meme series, Blue-Pencil system (LiC 12D):
// Apricot #FFE5D9 + faint grid, black ink humans, Electric Blue #3C9EE7 AI with glow,
// Ink-to-Circuit transition, The Leader (bald, trench coat, watch, high-tops),
// leadershipinchange.com watermark in Midnight Navy.
(function () {
  const INK = '#1c1712', BLUE = '#3C9EE7', NAVY = '#1B264F', PAPER = '#FFFCF9', APRICOT = '#FFE5D9';
  const G = 318;           // ground line
  let t = 0, uid = 0;      // animation delay counter, unique ids

  const d = (step = 0.035) => (t += step).toFixed(2);
  const P = (path, cls = 'ink', extra = '') =>
    `<path d="${path}" pathLength="1" class="stroke ${cls}" style="animation-delay:${d()}s" ${extra}/>`;
  const C = (cx, cy, r, cls = 'ink', extra = '') =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" pathLength="1" class="stroke ${cls}" style="animation-delay:${d()}s" ${extra}/>`;
  const fade = (inner) => `<g class="fadein" style="animation-delay:${d(0.02)}s">${inner}</g>`;
  const dot = (cx, cy, r, fill = INK) => fade(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`);
  const node = (cx, cy) => fade(`<circle cx="${cx}" cy="${cy}" r="3.2" fill="${BLUE}" class="glow"/>`);

  function shadow(x, w = 34) {
    let s = fade(`<ellipse cx="${x}" cy="${G + 2}" rx="${w}" ry="5" fill="${INK}" opacity=".10"/>`);
    for (let i = 0; i < 4; i++) s += P(`M${x - w + 10 + i * 14} ${G + 6} l9 -8`, 'ink hair');
    return s;
  }

  function hightop(fx, dir) {
    return P(`M${fx - 7 * dir} ${G - 26} L${fx - 8 * dir} ${G - 3} L${fx + 14 * dir} ${G - 3} Q${fx + 18 * dir} ${G - 12} ${fx + 6 * dir} ${G - 14} L${fx + 5 * dir} ${G - 26} Z`, 'ink thin') +
      P(`M${fx - 10 * dir} ${G} L${fx + 17 * dir} ${G}`, 'ink') +
      P(`M${fx - 4 * dir} ${G - 21} l${6 * dir} 0 M${fx - 4 * dir} ${G - 16} l${6 * dir} 0`, 'ink hair');
  }

  function face(x, y, kind, s = '') {
    const eye = kind === 'shock' ? 3.6 : 2.8;
    if (kind === 'happy') {
      s += P(`M${x - 11} ${y - 4} q4 -5 8 0 M${x + 3} ${y - 4} q4 -5 8 0`, 'ink thin');
    } else {
      s += dot(x - 7, y - 4, eye) + dot(x + 7, y - 4, eye);
    }
    const m = {
      smile: `M${x - 9} ${y + 8} Q${x} ${y + 17} ${x + 9} ${y + 8}`,
      happy: `M${x - 11} ${y + 7} Q${x} ${y + 21} ${x + 11} ${y + 7}`,
      worry: `M${x - 8} ${y + 14} Q${x} ${y + 7} ${x + 8} ${y + 14}`,
      smug: `M${x - 8} ${y + 11} Q${x + 2} ${y + 15} ${x + 10} ${y + 6}`,
      squiggle: `M${x - 9} ${y + 11} q3 -4 6 0 t6 0 t6 0`,
      flat: `M${x - 7} ${y + 11} L${x + 7} ${y + 11}`
    };
    if (kind === 'shock') s += C(x, y + 12, 4.5, 'ink thin');
    else s += P(m[kind] || m.smile, 'ink thin');
    return s;
  }

  const sweat = (x, y) => P(`M${x} ${y} q-5 9 0 12 q5 -3 0 -12`, 'ink thin') + P(`M${x + 9} ${y + 12} q-4 7 0 9 q4 -2 0 -9`, 'ink hair');

  // The Leader. armL / armR are hand offsets from the shoulder. armR carries the watch (his left wrist).
  function leader(x, o = {}) {
    const hy = G - 152, sh = G - 122;
    const L = o.armL || [-26, 50], R = o.armR || [26, 50];
    let s = shadow(x);
    s += P(`M${x - 7} ${G - 70} L${x - 16} ${G - 26}`) + P(`M${x + 7} ${G - 70} L${x + 16} ${G - 26}`);
    s += hightop(x - 16, -1) + hightop(x + 16, 1);
    // trench coat: straight cut, popped collar, belt with tie, cross-hatched shading
    const coat = `M${x - 15} ${G - 128} L${x - 24} ${G - 60} L${x - 2} ${G - 57} L${x + 25} ${G - 61} L${x + 15} ${G - 128} Z`;
    s += fade(`<path d="${coat}" fill="${PAPER}"/>`) + P(coat);
    s += P(`M${x - 15} ${G - 128} L${x - 21} ${G - 140} L${x - 4} ${G - 124} M${x + 15} ${G - 128} L${x + 21} ${G - 140} L${x + 4} ${G - 124}`, 'ink thin');
    s += P(`M${x - 4} ${G - 124} L${x + 2} ${G - 58}`, 'ink thin');
    s += P(`M${x - 20} ${G - 88} L${x + 21} ${G - 88}`, 'ink thin') + P(`M${x + 9} ${G - 88} l5 15 M${x + 9} ${G - 88} l-1 16`, 'ink hair');
    for (let i = 0; i < 5; i++) s += P(`M${x - 21 + i * 3.5} ${G - 64} l5 -18`, 'ink hair');
    for (let i = 0; i < 3; i++) s += P(`M${x + 10 + i * 4} ${G - 64} l-4 -14`, 'ink hair');
    s += P(`M${x - 17} ${G - 74} h8 M${x + 10} ${G - 74} h8`, 'ink hair');
    s += dot(x - 1, G - 104, 1.8) + dot(x, G - 76, 1.8);
    // arms
    const arm = (sx, h) => P(`M${sx} ${sh} Q${sx + h[0] * 0.25} ${sh + h[1] * 0.65 + 12} ${x + h[0] + (sx > x ? 12 : -12)} ${sh + h[1]}`);
    s += arm(x - 12, L) + arm(x + 12, R);
    const hxR = x + R[0] + 12, hyR = sh + R[1];
    // watch on the left wrist, faint blue glow on the face
    const wx = x + 12 + (hxR - x - 12) * 0.82, wy = sh + (hyR - sh) * 0.82;
    s += fade(`<rect x="${wx - 5}" y="${wy - 4}" width="10" height="8" rx="2" fill="${PAPER}" stroke="${INK}" stroke-width="2"/><circle cx="${wx}" cy="${wy}" r="2.4" fill="${BLUE}" class="glow"/>`);
    // head (bald, round)
    s += fade(`<circle cx="${x}" cy="${hy}" r="22" fill="${PAPER}"/>`);
    s += C(x, hy, 22);
    s += P(`M${x + 8} ${hy - 17} q7 3 9 10`, 'ink hair');
    s += face(x, hy, o.face || 'smile');
    if (o.sweat) s += sweat(x + 27, hy - 20);
    return s;
  }

  // A historical figure: top hat + beard (Lincoln), bun + dress (Dickinson), bow tie (Churchill).
  function person(x, o = {}) {
    const hy = G - 150, sh = G - 122;
    const L = o.armL || [-24, 52], R = o.armR || [24, 52];
    let s = shadow(x, 30);
    if (o.dress) {
      s += P(`M${x - 10} ${G - 128} L${x - 36} ${G - 22} L${x + 36} ${G - 22} L${x + 10} ${G - 128} Z`);
      for (let i = 0; i < 5; i++) s += P(`M${x - 26 + i * 11} ${G - 26} l8 -12`, 'ink hair');
      s += P(`M${x - 10} ${G - 22} L${x - 12} ${G - 4} M${x + 10} ${G - 22} L${x + 12} ${G - 4}`);
    } else if (o.hat) {
      // Lincoln's frock coat, cross-hatched
      const coat = `M${x - 12} ${G - 128} L${x - 21} ${G - 42} L${x + 21} ${G - 42} L${x + 12} ${G - 128} Z`;
      s += fade(`<path d="${coat}" fill="${PAPER}"/>`) + P(coat);
      s += P(`M${x - 6} ${G - 128} L${x} ${G - 104} L${x + 6} ${G - 128}`, 'ink thin');
      for (let i = 0; i < 5; i++) s += P(`M${x + 2 + i * 3.6} ${G - 46} l4 -16`, 'ink hair');
      s += dot(x, G - 92, 1.6) + dot(x, G - 76, 1.6);
      s += P(`M${x - 8} ${G - 42} L${x - 14} ${G - 4} M${x + 8} ${G - 42} L${x + 14} ${G - 4}`);
    } else {
      s += P(`M${x} ${G - 128} L${x} ${G - 66}`) + P(`M${x} ${G - 66} L${x - 16} ${G - 4} M${x} ${G - 66} L${x + 16} ${G - 4}`);
    }
    s += P(`M${x} ${sh} Q${x + L[0] * 0.3} ${sh + L[1] * 0.6 + 10} ${x + L[0]} ${sh + L[1]}`);
    s += P(`M${x} ${sh} Q${x + R[0] * 0.3} ${sh + R[1] * 0.6 + 10} ${x + R[0]} ${sh + R[1]}`);
    s += fade(`<circle cx="${x}" cy="${hy}" r="20" fill="${PAPER}"/>`) + C(x, hy, 20);
    if (o.bun) s += C(x + 15, hy - 16, 8) + P(`M${x - 19} ${hy - 4} Q${x - 12} ${hy - 26} ${x + 12} ${hy - 19}`, 'ink thin');
    if (o.beard) s += P(`M${x - 19} ${hy + 3} Q${x} ${hy + 36} ${x + 19} ${hy + 3}`) + P(`M${x - 8} ${hy + 20} l3 6 M${x + 3} ${hy + 22} l2 6`, 'ink hair');
    if (o.hat) {
      s += P(`M${x - 15} ${hy - 18} L${x - 13} ${hy - 58} L${x + 13} ${hy - 58} L${x + 15} ${hy - 18}`);
      s += P(`M${x - 26} ${hy - 18} L${x + 26} ${hy - 18}`);
      for (let i = 0; i < 5; i++) s += P(`M${x - 11 + i * 5} ${hy - 22} l4 -10`, 'ink hair');
    }
    if (o.bowtie) s += P(`M${x} ${sh - 2} l-10 -6 l0 12 Z M${x} ${sh - 2} l10 -6 l0 12 Z`, 'ink thin');
    if (o.cigar) s += P(`M${x + 6} ${hy + 10} l22 3`) + P(`M${x + 30} ${hy + 8} q4 -8 0 -14 q-4 -6 2 -12`, 'ink hair');
    s += face(x, hy + (o.beard ? -2 : 0), o.face || 'flat');
    if (o.quill) s += P(`M${x + R[0]} ${sh + R[1]} l14 -40`) + P(`M${x + R[0] + 14} ${sh + R[1] - 40} q12 8 2 24 q-8 -10 -2 -24`, 'ink thin');
    return s;
  }

  // The robot. Everything AI is Electric Blue and glowing: SQUARE head, square pixel eyes,
  // translucent blue fill so it reads as a light source. Humans are the only round faces.
  // o.hat = ink top hat (antenna hidden) · o.disguise = hat + clip-on Lincoln beard (ink)
  function robot(x, o = {}) {
    const top = G - 184;
    const tint = (path) => fade(`<path d="${path}" fill="${BLUE}" fill-opacity=".14" class="glow"/>`);
    const head = `M${x - 19} ${top} h38 q9 0 9 9 v28 q0 9 -9 9 h-38 q-9 0 -9 -9 v-28 q0 -9 9 -9 Z`;
    const body = `M${x - 18} ${top + 54} h36 q6 0 6 6 v48 q0 6 -6 6 h-36 q-6 0 -6 -6 v-48 q0 -6 6 -6 Z`;
    let s = fade(`<ellipse cx="${x}" cy="${G + 2}" rx="36" ry="6" fill="${BLUE}" fill-opacity=".25" class="glow"/>`);
    s += tint(head) + tint(body);
    if (!o.hat && !o.disguise) s += P(`M${x} ${top} V${top - 13}`, 'blue') + fade(`<circle cx="${x}" cy="${top - 18}" r="5" fill="${BLUE}" class="glow"/>`);
    s += P(head, 'blue');
    s += P(`M${x - 28} ${top + 15} h-6 v16 h6 M${x + 28} ${top + 15} h6 v16 h-6`, 'blue thin');
    const px = (cx, cy, sz = 7) => fade(`<rect x="${cx}" y="${cy}" width="${sz}" height="${sz}" rx="1.5" fill="${BLUE}" class="glow"/>`);
    if (o.face === 'shock') {
      s += P(`M${x - 16} ${top + 11} h11 v11 h-11 Z M${x + 5} ${top + 11} h11 v11 h-11 Z`, 'blue thin') + px(x - 13, top + 14, 5) + px(x + 8, top + 14, 5);
      s += P(`M${x - 5} ${top + 29} h10 v8 h-10 Z`, 'blue thin');
    } else {
      s += px(x - 14, top + 13) + px(x + 7, top + 13);
      s += o.face === 'flat' ? P(`M${x - 9} ${top + 32} h18`, 'blue thin', 'stroke-dasharray="3 3"')
        : P(`M${x - 10} ${top + 28} v4 h20 v-4`, 'blue thin');
    }
    s += P(`M${x - 7} ${top + 46} v8 M${x + 7} ${top + 46} v8`, 'blue thin');
    s += P(body, 'blue');
    s += P(`M${x - 14} ${top + 68} h9 v14 h12 v10`, 'blue thin') + node(x - 14, top + 68) + node(x + 7, top + 92);
    s += P(`M${x + 4} ${top + 64} h7`, 'blue thin') + fade(`<circle cx="${x + 15}" cy="${top + 64}" r="2.6" fill="${BLUE}" class="glow"/>`);
    // arms with elbow joints and claw hands
    s += P(`M${x - 24} ${top + 62} L${x - 36} ${top + 84} L${x - 40} ${top + 104}`, 'blue') + C(x - 36, top + 84, 3.2, 'blue hair') + P(`M${x - 45} ${top + 106} q5 7 10 0`, 'blue thin');
    s += o.wave
      ? P(`M${x + 24} ${top + 62} L${x + 40} ${top + 46} L${x + 46} ${top + 24}`, 'blue') + C(x + 40, top + 46, 3.2, 'blue hair') + P(`M${x + 41} ${top + 21} q5 -7 10 0`, 'blue thin') + P(`M${x + 56} ${top + 14} q6 4 4 12 M${x + 62} ${top + 8} q8 6 6 18`, 'blue hair')
      : P(`M${x + 24} ${top + 62} L${x + 36} ${top + 84} L${x + 40} ${top + 104}`, 'blue') + C(x + 36, top + 84, 3.2, 'blue hair') + P(`M${x + 35} ${top + 106} q5 7 10 0`, 'blue thin');
    // legs + block feet
    s += P(`M${x - 12} ${top + 114} V${G - 8} M${x + 12} ${top + 114} V${G - 8}`, 'blue');
    s += P(`M${x - 23} ${G - 8} h17 v8 h-17 Z M${x + 6} ${G - 8} h17 v8 h-17 Z`, 'blue thin');
    if (o.hat || o.disguise) {
      s += P(`M${x - 17} ${top + 1} L${x - 15} ${top - 40} L${x + 15} ${top - 40} L${x + 17} ${top + 1}`) + P(`M${x - 32} ${top + 1} L${x + 32} ${top + 1}`);
      for (let i = 0; i < 5; i++) s += P(`M${x - 11 + i * 5} ${top - 4} l4 -12`, 'ink hair');
    }
    if (o.disguise) s += beard(x, top + 30, 24);
    if (o.sparks) s += P(`M${x - 46} ${top} l-14 -10 M${x + 46} ${top} l14 -10 M${x - 40} ${top + 30} l-16 2 M${x + 40} ${top + 30} l16 2 M${x} ${top - 30} l0 -12`, 'blue thin');
    return s;
  }

  // A clip-on Lincoln beard in black ink, with loops that hook over a robot's ear bolts.
  function beard(cx, y, w) {
    return P(`M${cx - w} ${y} Q${cx} ${y + 48} ${cx + w} ${y}`) +
      P(`M${cx - w + 8} ${y + 10} l3 9 M${cx - 4} ${y + 18} l2 10 M${cx + 6} ${y + 17} l-1 10 M${cx + w - 9} ${y + 9} l-3 9`, 'ink hair') +
      P(`M${cx - w} ${y} q-9 -6 -7 -15 M${cx + w} ${y} q9 -6 7 -15`, 'ink hair');
  }

  // The disguise, pulled off: top hat + beard held as a prop.
  function disguise(cx, cy, rot = 0) {
    let s = `<g transform="rotate(${rot} ${cx} ${cy})">`;
    s += P(`M${cx - 15} ${cy} L${cx - 13} ${cy - 38} L${cx + 13} ${cy - 38} L${cx + 15} ${cy}`) + P(`M${cx - 28} ${cy} L${cx + 28} ${cy}`);
    for (let i = 0; i < 5; i++) s += P(`M${cx - 10 + i * 5} ${cy - 4} l4 -12`, 'ink hair');
    s += beard(cx, cy + 16, 20);
    return s + '</g>';
  }

  function bubble(x, y, w, h, text, tx, ty, size = 22) {
    const lines = text.split('|');
    // Bigger punchlines so they survive a phone screen; the bubble grows to fit, staying on the canvas.
    size = Math.round(size * 1.22);
    const need = Math.max(...lines.map((l) => l.length)) * size * 0.43 + 34;
    if (need > w) { const cx = x + w / 2; w = need; x = Math.max(8, Math.min(592 - w, cx - w / 2)); }
    h = Math.max(h, lines.length * size * 1.05 + 20);
    if (y + h > 150 && ty > y + h) y = Math.max(6, y - (y + h - 150));
    // short tail from the bubble's bottom edge, aimed at the speaker
    const bx = Math.max(x + 30, Math.min(x + w - 30, tx)), by = y + h;
    const dist = Math.hypot(tx - bx, ty - by) || 1, len = Math.min(30, dist);
    const px = bx + (tx - bx) / dist * len, py = by + (ty - by) / dist * len;
    const shape = `M${x + 16} ${y} h${w - 32} q16 0 16 16 v${h - 32} q0 16 -16 16 H${bx + 9} L${px.toFixed(1)} ${py.toFixed(1)} L${bx - 9} ${by} H${x + 16} q-16 0 -16 -16 v-${h - 32} q0 -16 16 -16 Z`;
    let s = fade(`<path d="${shape}" fill="${PAPER}"/>`);
    s += P(shape, 'ink thin');
    const lh = size * 1.05, y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.34;
    s += fade(`<text x="${x + w / 2}" y="${y0}" text-anchor="middle" font-family="Caveat, 'Bradley Hand', cursive" font-weight="700" font-size="${size}" fill="${NAVY}">` +
      lines.map((l, i) => `<tspan x="${x + w / 2}" dy="${i ? lh : 0}">${l}</tspan>`).join('') + `</text>`);
    return s;
  }

  const glass = (cx, cy, r, hx, hy) => P(`M${hx} ${hy} L${cx + (hx - cx) * r / Math.hypot(hx - cx, hy - cy)} ${cy + (hy - cy) * r / Math.hypot(hx - cx, hy - cy)}`, 'ink thick') + C(cx, cy, r, 'ink thick') + P(`M${cx - r * 0.55} ${cy - r * 0.2} q${r * 0.15} ${-r * 0.4} ${r * 0.5} ${-r * 0.45}`, 'ink hair');

  const ground = (x1, x2, cx2) => P(`M${x1} ${G + 1} L${x2} ${G + 1}`, 'ink thin') + (cx2 ? P(`M${x2} ${G + 1} h26 v-10 h24 v10 L${cx2} ${G + 1}`, 'blue thin') + node(x2 + 26, G - 9) + node(cx2, G + 1) : '');

  const small = (cx, inner, k = 0.6) => `<g transform="translate(${cx} ${G}) scale(${k}) translate(${-cx} ${-G})">${inner}</g>`;

  // ---------------- The 11 scenes ----------------
  const SCENES = [
    // 0: Arrested Abe Lincoln
    () => ground(20, 470, 590) + person(410, { hat: 1, beard: 1, face: 'worry', armL: [-36, 22] }) +
      leader(210, { face: 'smug', armR: [58, 10] }) +
      C(290, 206, 9) + C(362, 214, 9) + P(`M299 208 Q326 224 353 214`, 'ink thin', 'stroke-dasharray="4 4"') +
      small(548, robot(548, { wave: 1 }), 0.5) +
      bubble(24, 30, 250, 72, "You're under arrest for|sounding like a chatbot.", 196, 122, 23) +
      bubble(446, 40, 136, 52, "It's 1863.", 426, 108),

    // 1: Interrogated the Poet
    () => ground(20, 500, 596) + P('M300 0 L300 64') + P('M268 98 L284 64 L316 64 L332 98 Z') +
      P('M268 98 L226 250', 'ink hair', 'stroke-dasharray="6 6"') + P('M332 98 L374 250', 'ink hair', 'stroke-dasharray="6 6"') +
      person(320, { bun: 1, dress: 1, quill: 1, face: 'flat', armR: [22, 30] }) +
      leader(160, { face: 'squiggle', sweat: 1, armR: [60, -6] }) + glass(262, 170, 20, 232, 190) +
      P('M512 318 L512 176 L548 176', 'ink') + P('M548 176 L584 176 L584 318', 'blue') + node(548, 176) +
      small(560, robot(560, {}), 0.5) +
      bubble(392, 36, 160, 64, "They're called|dashes.", 350, 132),

    // 2: Wrong End of the Glass
    () => ground(20, 330, 470) + robot(400, { wave: 1 }) +
      leader(250, { face: 'flat', armL: [-58, -28] }) + glass(160, 152, 30, 180, 172) +
      fade(`<ellipse cx="160" cy="152" rx="20" ry="13" fill="${PAPER}" stroke="${INK}" stroke-width="2"/><circle cx="154" cy="152" r="7" fill="${INK}"/>`) +
      bubble(20, 26, 190, 66, 'Any robots|around here?', 212, 118) +
      bubble(452, 58, 84, 50, 'Hi.', 424, 118),

    // 3: Suspected the Typewriter
    () => ground(20, 590) + P('M300 250 L470 250') + P('M470 250 h22 v-12 h18', 'blue thin') + node(510, 238) + node(470, 250) +
      P('M320 250 L320 318 M500 250 L500 318') + P('M360 250 L370 205 L450 205 L460 250 Z') + P('M385 205 L385 172 L435 172 L435 205', 'ink thin') +
      [375, 389, 403, 417, 431, 445].map(k => dot(k, 232, 3)).join('') +
      P('M548 250 L566 196 L512 150') + P('M478 158 L506 136 L528 168 Z') + P('M492 170 L430 202 M512 174 L456 206', 'ink hair', 'stroke-dasharray="5 5"') +
      leader(190, { face: 'squiggle', armR: [74, -32] }) +
      bubble(30, 30, 200, 66, 'Where were you|in 2023?', 196, 120),

    // 4: Going on Vibes
    () => ground(20, 590) + P('M300 44 L566 44 L566 244 L300 244 Z') + P('M330 244 L322 318 M536 244 L544 318') +
      [[318, 62, -4, 'vibes'], [436, 58, 3, 'vibes'], [340, 150, 2, 'VIBES!!'], [452, 150, -3, 'vibes']].map(([cx, cy, r, w]) =>
        `<g transform="rotate(${r} ${cx + 45} ${cy + 30})">` + fade(`<rect x="${cx}" y="${cy}" width="92" height="60" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>`) + dot(cx + 46, cy + 6, 4) +
        fade(`<text x="${cx + 46}" y="${cy + 42}" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="26" fill="${NAVY}">${w}</text>`) + '</g>').join('') +
      P('M364 68 L482 64 M364 68 L386 156 M482 64 L498 156', 'ink hair') +
      P('M498 210 L512 232', 'ink hair') + P('M512 232 h24 v-8', 'blue thin') + node(536, 224) +
      leader(180, { face: 'smile', armR: [98, -64] }) +
      bubble(20, 28, 170, 66, "It's all|connected.", 172, 118),

    // 5: Coin Flip Detective
    () => ground(20, 470, 590) + robot(120, { disguise: 1 }) +
      person(480, { hat: 1, beard: 1, face: 'flat' }) +
      leader(300, { face: 'worry', sweat: 1, armR: [34, -56] }) +
      fade(`<ellipse cx="354" cy="96" rx="13" ry="6" fill="${PAPER}" stroke="${INK}" stroke-width="2.5"/>`) + P('M340 128 q-8 -14 2 -26 M368 128 q8 -14 -2 -26', 'ink hair') +
      bubble(190, 12, 150, 62, 'One of you|is lying.', 286, 124),

    // 6: Promising Rookie
    () => ground(20, 590) + P('M270 36 L570 36 L570 244 L270 244 Z') +
      fade(`<rect x="292" y="58" width="78" height="72" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>`) + P('M320 84 L322 64 L340 64 L342 84 M312 84 L350 84', 'ink thin') + C(331, 100, 12, 'ink thin') +
      fade(`<rect x="452" y="58" width="78" height="72" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>`) + C(491, 100, 12, 'ink thin') + C(500, 86, 6, 'ink thin') +
      fade(`<rect x="372" y="158" width="78" height="72" fill="${PAPER}" stroke="${BLUE}" stroke-width="2" class="glow"/>`) + P('M396 176 h30 v24 h-30 Z', 'blue thin') + node(404, 186) + node(418, 186) +
      P('M331 130 L380 160', 'ink thin') + P('M491 130 L450 160', 'ink thin') + P('M380 160 l8 -8 h10', 'blue hair') +
      fade(`<text x="512" y="222" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="44" fill="${NAVY}">?</text>`) +
      leader(160, { face: 'smile', armR: [10, -26] }) +
      bubble(40, 40, 120, 52, 'Hmm.', 150, 118),

    // 7: Sharp Eye
    () => ground(20, 590) + P('M330 40 L510 40 L510 236 L330 236 Z') + P('M344 54 L496 54 L496 222 L344 222 Z', 'ink thin') +
      P('M404 110 L406 70 L430 70 L432 110 M392 110 L444 110') + C(418, 134, 22) + P('M398 138 Q418 170 438 138', 'ink thin') + P('M372 222 Q418 172 464 222') +
      fade(`<circle cx="450" cy="170" r="40" fill="${PAPER}"/>`) +
      P('M420 170 h14 v-14 h22 v18 h14', 'blue thin') + P('M432 196 h36', 'blue thin') + node(456, 156) + node(470, 174) + node(432, 196) + P('M436 206 Q450 196 464 206', 'blue hair') +
      C(450, 170, 40, 'ink thick') + P('M422 196 L340 204', 'ink thick') +
      leader(210, { face: 'smile', armR: [104, 4] }) +
      bubble(30, 36, 150, 66, 'Nice try,|"Abe."', 192, 122),

    // 8: Senior Detective
    () => ground(20, 590) + fade(`<path d="M318 190 L548 190 L574 290 L292 290 Z" fill="${PAPER}"/>`) + P('M318 190 L548 190 L574 290') + P('M318 190 L292 290') +
      P('M292 290 Q310 278 328 290 T364 290 T400 290 T436 290', 'ink') + P('M436 290 Q454 278 472 290', 'blue') + P('M472 290 T508 290 T544 290 T574 290', 'ink') + node(436, 290) + node(472, 290) +
      P('M432 290 V304 M456 290 V304 M466 290 V304 M490 290 V304', 'blue thin') +
      P(`M420 304 h40 v14 h-40 Z M462 304 h40 v14 h-40 Z`, 'blue') + P('M430 304 v14 M492 304 v14', 'blue hair') +
      P('M432 190 L432 172', 'blue') + C(432, 166, 5, 'blue') +
      leader(150, { face: 'smug', armR: [60, -10] }) +
      P('M218 184 l26 -6 l3 12 l-26 5 Z') + P('M250 180 L380 150 M250 192 L420 290', 'ink hair') +
      [0, 1, 2, 3, 4].map(i => P(`M${300 + i * 22} ${170 + i * 8} l8 26`, 'ink hair')).join('') +
      bubble(20, 26, 176, 66, 'I can see|your feet.', 142, 118),

    // 9: One Got Away
    () => ground(20, 470, 596) + robot(410, { face: 'shock' }) +
      leader(230, { face: 'shock', armR: [88, -72] }) + disguise(330, 120, -14) +
      P('M356 84 q12 -12 26 -8 M362 104 q14 -6 26 0', 'ink hair') +
      small(548, robot(548, { hat: 1 }), 0.55) +
      fade(`<text x="532" y="150" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="26" fill="${NAVY}">shh</text>`) +
      P('M500 318 l8 -4 M514 318 l8 -4', 'blue hair'),

    // 10: Case Closed
    () => ground(20, 330, 470) + robot(430, { face: 'shock', sparks: 1 }) +
      leader(220, { face: 'happy', armR: [74, -96], armL: [-18, 32] }) + disguise(312, 98, -12) +
      P('M296 108 q30 20 64 36', 'ink hair', 'stroke-dasharray="4 5"') + P('M360 144 l24 0 v12', 'blue hair') + node(384, 156) +
      `<g transform="rotate(-8 150 70)">` + P('M40 38 L262 38 L262 102 L40 102 Z', 'ink thick') +
      fade(`<text x="151" y="82" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="36" fill="${INK}">CASE CLOSED</text>`) + '</g>' +
      P('M520 60 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 Z', 'blue thin')
  ];

  const INTRO = () => ground(20, 420, 590) + person(360, { hat: 1, beard: 1, face: 'flat' }) + robot(500, { disguise: 1 }) +
    leader(170, { face: 'squiggle', sweat: 1, armR: [74, -12] }) + glass(274, 176, 22, 250, 190) +
    fade(`<text x="430" y="70" text-anchor="middle" font-family="Caveat, cursive" font-weight="700" font-size="54" fill="${NAVY}">? ?</text>`);

  window.TIERS = [
    { title: 'Arrested Abe Lincoln', caption: "You'd have arrested Lincoln for sounding like a chatbot. His alibi is the entire 19th century." },
    { title: 'Grilled the Poet', caption: 'You spent the whole case questioning Emily Dickinson about her punctuation while the robot walked out the front door.' },
    { title: 'Wrong End of the Glass', caption: 'Detective, the robot is standing right behind you, and it said hi.' },
    { title: 'Suspected the Typewriter', caption: "You interrogated a typewriter for an hour. It didn't crack, but to be fair, neither did the case." },
    { title: 'Going on Vibes', caption: "Your case notes have one word on every page, and that word is 'vibes.'" },
    { title: 'Coin Flip Detective', caption: 'Five out of ten, so a coin would have tied you, and the coin works for free.' },
    { title: 'Promising Rookie', caption: "You've got a string board and a real theory. A few more cases and they'll let you keep the coat." },
    { title: 'Sharp Eye', caption: 'You caught most of them. The em dashes still got you once or twice, which is what they do to all of us.' },
    { title: 'Senior Detective', caption: "A robot hiding under a tablecloth doesn't stand a chance with you. Two slipped past, but they were very good at hiding." },
    { title: 'One Got Away', caption: 'You pulled the disguise off nearly every one of them. The last one got away in a top hat.' },
    { title: 'Case Closed', caption: "You can spot a robot in a fake Lincoln beard from across the room. Honestly, we're a little worried about you." }
  ];

  function wrap(inner, animate) {
    const id = 'm' + (++uid);
    return `<svg viewBox="0 0 600 364" xmlns="http://www.w3.org/2000/svg" class="${animate ? 'draw' : ''}" role="img">
<defs>
  <pattern id="${id}g" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="${INK}" stroke-opacity=".07" stroke-width="1"/></pattern>
  <filter id="${id}r"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
  <filter id="${id}b" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="364"><feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<style>
  .ink{fill:none;stroke:${INK};stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
  .blue{fill:none;stroke:${BLUE};stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
  .thin{stroke-width:2.2}.hair{stroke-width:1.4}.thick{stroke-width:4.4}
  .wob .blue,.wob .glow{visibility:hidden}
  .clean *{visibility:hidden}
  .clean .blue,.clean .glow{visibility:visible}
</style>
<rect width="600" height="364" fill="${APRICOT}"/><rect width="600" height="364" fill="url(#${id}g)"/>
<g class="wob" filter="url(#${id}r)">${inner}</g>
<g class="clean" filter="url(#${id}b)">${inner}</g>
<text x="300" y="354" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" fill="${NAVY}" opacity=".7" letter-spacing=".5">leadershipinchange.com</text>
</svg>`;
  }

  window.memeSVG = function (score, animate = true) { t = 0.1; return wrap(SCENES[Math.max(0, Math.min(10, score))](), animate); };
  window.introSVG = function (animate = true) { t = 0.1; return wrap(INTRO(), animate); };
})();
