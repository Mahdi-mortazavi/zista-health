/**
 * Build-time image generation. No screenshots, no design tool, no runtime cost.
 *
 * Renders hand-written SVG through resvg (which does real Arabic shaping and
 * bidi, so the Persian card is typeset correctly) into:
 *   public/og-fa.png, public/og-en.png   1200×630 social cards
 *   public/apple-touch-icon.png          180×180
 *   public/icon-192.png, icon-512.png    manifest icons
 *
 * Run by `npm run build`. Fonts come from build/fonts (TTF, build-only —
 * the browser gets the subset woff2 files in public/fonts instead).
 */
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontFiles = [
  'Inter-Regular.ttf',
  'Inter-Bold.ttf',
  'Vazirmatn-Regular.ttf',
  'Vazirmatn-Bold.ttf',
].map((f) => resolve(root, 'build/fonts', f));

const BG = '#0a0a0b';
const TINT = '#0a84ff';
const FG = '#ffffff';
const MUTED = '#8e8e93';

/** One PPG beat, repeated. Same curve as the hero waveform. */
function trace(x0, y0, scale, beats) {
  const W = 200;
  const pt = (x, y) => `${(x0 + x * scale).toFixed(1)},${(y0 + (y - 100) * scale).toFixed(1)}`;
  const beat = (x) =>
    `C${pt(x + 10, 100)} ${pt(x + 14, 100)} ${pt(x + 20, 98)} ` +
    `C${pt(x + 28, 94)} ${pt(x + 32, 40)} ${pt(x + 46, 30)} ` +
    `C${pt(x + 58, 22)} ${pt(x + 62, 52)} ${pt(x + 72, 66)} ` +
    `C${pt(x + 80, 77)} ${pt(x + 84, 74)} ${pt(x + 92, 66)} ` +
    `C${pt(x + 100, 58)} ${pt(x + 106, 60)} ${pt(x + 114, 70)} ` +
    `C${pt(x + 126, 84)} ${pt(x + 140, 96)} ${pt(x + 160, 99)} ` +
    `C${pt(x + 176, 101)} ${pt(x + 190, 100)} ${pt(x + W, 100)}`;
  const offsets = Array.from({ length: beats }, (_, i) => i * W);
  return `M${pt(0, 100)} ${offsets.map(beat).join(' ')}`;
}

function ringMark(cx, cy, r, stroke) {
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}"
      stroke-width="${r * 0.26}" stroke-linecap="round"
      stroke-dasharray="${(2 * Math.PI * r * 0.76).toFixed(1)} ${(2 * Math.PI * r).toFixed(1)}"
      transform="rotate(-52 ${cx} ${cy})" />
    <circle cx="${cx}" cy="${cy}" r="${r * 0.28}" fill="${stroke}" />`;
}

const CARDS = {
  en: {
    font: 'Inter',
    anchor: 'start',
    x: 80,
    wordmark: 'Zista Health',
    lines: ['Health doesn’t fail', 'suddenly. It fails', 'quietly first.'],
    sub: 'Remote patient monitoring. Pre-launch.',
    foot: 'Not a diagnostic device. Regulatory certification in progress.',
    size: 76,
  },
  fa: {
    font: 'Vazirmatn',
    anchor: 'end',
    x: 1120,
    wordmark: 'زیستا هلث',
    lines: ['سلامتی ناگهانی از بین', 'نمی‌رود. اول بی‌صدا', 'افت می‌کند.'],
    sub: 'پایش از راه دور بیمار. پیش از عرضه.',
    foot: 'ابزار تشخیص پزشکی نیست. فرایند اخذ مجوزهای قانونی در جریان است.',
    size: 68,
  },
};

// resvg does not honour the SVG `direction` attribute, so the paragraph base
// direction is forced with explicit Unicode bidi controls (RLE … PDF). Without
// this, a sentence-final period on a Persian line lands on the wrong side.
const rtlText = (s) => `‫${s}‬`;

function ogSvg(loc) {
  const k = CARDS[loc];
  const rtl = loc === 'fa';
  const T = rtl ? rtlText : (s) => s;
  const markX = rtl ? 1120 - 21 : 80 + 21;
  const wordX = rtl ? 1120 - 58 : 80 + 58;
  const top = 168;
  const lh = k.size * (rtl ? 1.42 : 1.16);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <g opacity="0.5">
    <path d="${trace(-40, 562, 0.62, 11)}" fill="none" stroke="${TINT}" stroke-width="3"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  ${ringMark(markX, 82, 21, TINT)}
  <text x="${wordX}" y="92" text-anchor="${k.anchor}" font-family="${k.font}" font-weight="700"
    font-size="30" fill="${FG}">${T(k.wordmark)}</text>
  ${k.lines
    .map(
      (line, i) =>
        `<text x="${k.x}" y="${top + i * lh}" text-anchor="${k.anchor}" font-family="${k.font}" ` +
        `font-weight="700" font-size="${k.size}" letter-spacing="${rtl ? 0 : -1.9}" fill="${FG}">${T(line)}</text>`
    )
    .join('\n  ')}
  <text x="${k.x}" y="${top + k.lines.length * lh + 34}" text-anchor="${k.anchor}"
    font-family="${k.font}" font-weight="400" font-size="30" fill="${TINT}">${T(k.sub)}</text>
  <text x="${k.x}" y="604" text-anchor="${k.anchor}" font-family="${k.font}" font-weight="400"
    font-size="21" fill="${MUTED}">${T(k.foot)}</text>
</svg>`;
}

function iconSvg(size, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="${bg}"/>
  ${ringMark(50, 50, 27, '#ffffff')}
</svg>`;
}

function png(svg, width) {
  return new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    fitTo: { mode: 'width', value: width },
  })
    .render()
    .asPng();
}

const out = (name, buf) => {
  const p = resolve(root, 'public', name);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, buf);
  console.log(`  ${name}  ${(buf.length / 1024).toFixed(1)} KB`);
};

console.log('generating static images…');
for (const loc of ['fa', 'en']) out(`og-${loc}.png`, png(ogSvg(loc), 1200));
out('apple-touch-icon.png', png(iconSvg(180, TINT), 180));
out('icon-192.png', png(iconSvg(192, TINT), 192));
out('icon-512.png', png(iconSvg(512, TINT), 512));
