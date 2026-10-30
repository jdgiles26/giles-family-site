"""Generates the site's decorative SVG artwork (original, purely decorative: hills, trees, cabin, wagon, emblem).
Run: python3 tools/make_art.py  -> writes assets/img/art/*.svg and assets/js/art.js"""
import math, random, json, os
random.seed(1794)
OUT = os.path.join(os.path.dirname(__file__), '..', 'assets')
W = 1600

def ridge(base, amps, seed, step=8, h=520):
    r = random.Random(seed); ph = [r.random() * 6.28 for _ in amps]
    pts = []
    for x in range(0, W + step, step):
        y = base + sum(a * math.sin(x / f + p) for (a, f), p in zip(amps, ph))
        pts.append((x, y))
    d = 'M0 %d ' % h + ' '.join('L%d %.1f' % p for p in pts) + ' L%d %d Z' % (W, h)
    return d, pts

def trees(pts, n, seed, scale=1.0, kind='mix'):
    r = random.Random(seed); out = []
    for _ in range(n):
        i = r.randrange(len(pts)); x, y = pts[i]; s = scale * (0.6 + r.random() * 0.8)
        if kind == 'pine' or (kind == 'mix' and r.random() < .55):
            hgt = 34 * s; w = 11 * s
            out.append('<path d="M%.1f %.1f l%.1f %.1f h%.1f l%.1f %.1f h%.1f l%.1f %.1f h%.1f z"/>' % (x, y - hgt, -w * .6, hgt * .4, w * .35, -w * .35, hgt * .3, w * .45, -w * .5, hgt * .32, w * 2.2 + 0, ))
            out[-1] = '<path d="M%.1f %.1f L%.1f %.1f L%.1f %.1f L%.1f %.1f L%.1f %.1f L%.1f %.1f L%.1f %.1f Z"/>' % (x, y - hgt, x - w * .55, y - hgt * .55, x - w * .3, y - hgt * .55, x - w, y + 2, x + w, y + 2, x + w * .3, y - hgt * .55, x + w * .55, y - hgt * .55)
        else:
            rr = 12 * s
            out.append('<circle cx="%.1f" cy="%.1f" r="%.1f"/><circle cx="%.1f" cy="%.1f" r="%.1f"/><rect x="%.1f" y="%.1f" width="%.1f" height="%.1f"/>' % (x, y - rr * 1.4, rr, x + rr * .7, y - rr * .9, rr * .8, x - 1.2 * s, y - rr * .6, 2.4 * s, rr * .8))
    return ''.join(out)

layers = []
specs = [  # base, amps, fill(day), fill(night), trees
    (300, [(38, 260), (22, 110), (9, 47)], '#e7b47c', '#3a3d55', 0),
    (330, [(46, 300), (24, 130), (10, 53)], '#c98a56', '#2c2f45', 30),
    (370, [(52, 340), (20, 120), (9, 41)], '#9c5f37', '#222538', 60),
    (410, [(44, 380), (26, 150), (8, 37)], '#6b3c22', '#181a29', 90),
    (460, [(30, 420), (18, 170), (6, 33)], '#3a2213', '#0e0f18', 140),
]
svgs = []
for i, (base, amps, day, night, nt) in enumerate(specs):
    d, pts = ridge(base, amps, i * 11 + 3)
    extra = trees(pts, nt, i * 7 + 1, scale=0.6 + i * 0.25) if nt else ''
    cabin = ''
    if i == 4:
        x, y = pts[len(pts) * 7 // 10]
        cabin = ('<g transform="translate(%.1f %.1f)"><rect x="-34" y="-30" width="68" height="34"/><path d="M-42 -28 L0 -58 L42 -28 Z"/><rect x="18" y="-66" width="9" height="22"/>'
                 '<rect x="-24" y="-20" width="12" height="12" class="win"/><rect x="6" y="-20" width="12" height="12" class="win"/></g>'
                 '<path class="smoke" d="M%.1f %.1f c -10 -20, 18 -30, 4 -52 s 20 -30, 0 -60" fill="none" stroke-width="6" stroke-linecap="round"/>') % (x, y + 6, x + 22, y - 62)
        fence = ''.join('<rect x="%d" y="%.1f" width="3" height="16"/>' % (fx, pts[fx // 8][1] - 10) for fx in range(80, 600, 26))
        cabin += fence
    svgs.append('<svg viewBox="0 120 %d 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g class="hl hl%d"><path d="%s"/>%s%s</g></svg>' % (W, i, d, extra, cabin))
    layers.append((day, night))

css = ''.join('.hl%d{fill:%s}html.lantern .hl%d{fill:%s}' % (i, d, i, n) for i, (d, n) in enumerate(layers))
css += '.hl .win{fill:#ffd27a}html.lantern .hl .win{fill:#ffcc55;filter:drop-shadow(0 0 6px #ffb437)}.hl .smoke{stroke:rgba(255,240,220,.35);fill:none}html.lantern .hl .smoke{stroke:rgba(200,200,220,.18)}'

# Small strip for page heroes
d, pts = ridge(60, [(14, 200), (8, 80)], 99, h=120)
d2, pts2 = ridge(80, [(10, 240), (6, 70)], 42, h=120)
strip = '<svg class="hills" viewBox="0 0 %d 120" preserveAspectRatio="none" aria-hidden="true"><path d="%s" fill="var(--gold)" opacity=".5"/><path d="%s" fill="var(--rust)" opacity=".55"/></svg>' % (W, d, d2)

# Wilderness road illustration (wagon on ridge)
def wagon_scene():
    W2, H2 = 900, 560
    d1, p1 = ridge(250, [(30, 160), (14, 60)], 5, h=H2); d1 = d1.replace('L1600', 'L900')
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560" role="img" aria-label="Decorative illustration: a covered wagon crossing the Kentucky hills on the Wilderness Road">',
           '<defs><linearGradient id="ws" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a3f24"/><stop offset=".55" stop-color="#e3a15e"/><stop offset="1" stop-color="#f6d9a2"/></linearGradient></defs>',
           '<rect width="900" height="560" fill="url(#ws)"/><circle cx="640" cy="230" r="70" fill="#fff0c8" opacity=".9"/>']
    cols = ['#d39a62', '#a96a3e', '#7a4428', '#4a2a17', '#2b180c']
    for k, c in enumerate(cols):
        dd, pp = ridge(250 + k * 55, [(40 - k * 4, 180 + k * 40), (14, 70 + k * 9)], k * 13 + 2, h=600)
        out.append('<path d="%s" fill="%s"/>' % (dd, c))
        if k >= 2: out.append('<g fill="%s">%s</g>' % (cols[min(k + 1, 4)] if k < 4 else '#1a0e06', trees([q for q in pp if q[0] < 900], 18 + k * 6, k * 3, scale=0.8 + k * 0.4)))
    # road + wagon
    out.append('<path d="M-10 560 C 200 480, 360 520, 470 470 S 760 420, 910 440" fill="none" stroke="#c99a62" stroke-width="18" opacity=".7"/>')
    out.append('<g transform="translate(400 430)" fill="#1a0e06"><path d="M0 0 C 0 -60, 120 -60, 120 0 Z" fill="#f2e3c2" stroke="#1a0e06" stroke-width="4"/><path d="M20 -4 v-40 M50 -4 v-48 M80 -4 v-46 M105 -4 v-34" stroke="#1a0e06" stroke-width="2.5" opacity=".6"/><rect x="-6" y="0" width="132" height="14"/><circle cx="18" cy="26" r="14" fill="none" stroke="#1a0e06" stroke-width="4"/><circle cx="102" cy="26" r="14" fill="none" stroke="#1a0e06" stroke-width="4"/><path d="M126 6 L160 10"/><path d="M160 -6 c 8 -14 30 -14 40 -4 l 10 -12 l 4 10 c 4 8 -2 16 -10 16 l -4 22 h-6 l-2 -18 h-22 l-4 18 h-6 z"/></g>')
    out.append('</svg>')
    return ''.join(out)

def record_book():
    # open ledger with tree growing from it — Joshua chapter
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="Decorative illustration: an open record book with a family tree growing from its pages">'
            '<rect width="900" height="600" fill="#2b1c10"/><radialGradient id="lg" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".55"/><stop offset="1" stop-color="#2b1c10" stop-opacity="0"/></radialGradient><rect width="900" height="600" fill="url(#lg)"/>'
            '<path d="M150 470 Q 300 430 450 470 Q 600 430 750 470 L 750 500 Q 600 465 450 505 Q 300 465 150 500 Z" fill="#5a3a1e"/>'
            '<path d="M160 460 Q 300 420 450 455 L 450 490 Q 300 455 160 488 Z" fill="#f1e2bf"/><path d="M450 455 Q 600 420 740 460 L 740 488 Q 600 455 450 490 Z" fill="#e8d4a8"/>'
            + ''.join('<path d="M190 %d Q 300 %d 430 %d" stroke="#8a6a44" stroke-width="1.2" fill="none" opacity=".6"/><path d="M470 %d Q 600 %d 715 %d" stroke="#8a6a44" stroke-width="1.2" fill="none" opacity=".6"/>' % (462 + k * 5 - 0, 440 + k * 5, 462 + k * 5, 462 + k * 5, 440 + k * 5, 462 + k * 5) for k in range(4))
            + '<g fill="none" stroke="#c98a3e" stroke-width="7" stroke-linecap="round"><path d="M450 455 C 450 380, 445 330, 450 250"/><path d="M450 380 C 400 350, 360 330, 320 300"/><path d="M450 340 C 500 310, 545 290, 590 250"/><path d="M450 300 C 420 270, 400 230, 380 190"/><path d="M450 280 C 480 240, 500 200, 520 160"/><path d="M320 300 C 290 280, 270 250, 260 220"/><path d="M590 250 C 620 230, 640 200, 650 170"/></g>'
            + ''.join('<circle cx="%d" cy="%d" r="%d" fill="%s" opacity="%.2f"/>' % (x, y, r, c, o) for x, y, r, c, o in [(450, 220, 34, '#e3b860', .9), (380, 180, 26, '#d79a4a', .85), (520, 150, 26, '#d79a4a', .85), (260, 210, 22, '#b4532a', .8), (650, 160, 22, '#b4532a', .8), (320, 290, 18, '#9bb07a', .8), (590, 240, 18, '#9bb07a', .8), (410, 120, 14, '#e3b860', .7), (490, 100, 12, '#e3b860', .65)])
            + '<g fill="#ffe6a6">' + ''.join('<circle cx="%d" cy="%d" r="%.1f" opacity="%.2f"/>' % (random.randint(120, 780), random.randint(60, 420), random.random() * 2 + .6, random.random() * .6 + .2) for _ in range(60)) + '</g></svg>')

os.makedirs(os.path.join(OUT, 'img', 'art'), exist_ok=True)
open(os.path.join(OUT, 'img', 'art', 'wilderness-road.svg'), 'w').write(wagon_scene())
open(os.path.join(OUT, 'img', 'art', 'record-book.svg'), 'w').write(record_book())
open(os.path.join(OUT, 'js', 'art.js'), 'w').write('/* generated by tools/make_art.py */\nwindow.ART=' + json.dumps({'hero': svgs, 'css': css, 'strip': strip}) + ';\n')
print('ok', sum(len(s) for s in svgs))
