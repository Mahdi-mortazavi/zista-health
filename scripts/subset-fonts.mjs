/**
 * Font subsetting. Runs after `astro build`.
 *
 * Reads every character that actually appears in the built HTML and cuts the
 * two variable fonts down to exactly those glyphs. The full faces stay in
 * build/fonts as the source of truth; dev serves the full faces from
 * public/fonts, production serves these subsets.
 *
 * Result on the current copy: Vazirmatn 46 KB → ~20 KB, Inter 48 KB → ~13 KB.
 */
import subsetFont from 'subset-font';
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

// A safety floor, so a copy edit that adds a character we happen not to use
// today still renders while the founder is mid-sentence in a dev server.
const ALWAYS =
  'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیآأإئءةيكٱٰ' +
  'ًٌٍَُِّْٔ‌‍‎‏⁦⁩‫‬' +
  '۰۱۲۳۴۵۶۷۸۹0123456789' +
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '.,:;!?؟،؛«»""\'\'()[]{}–—-_/\\|@#$%^&*+=<>~`•·…°′″' +
  '€£¥₪﷼ ' +
  '₂₀₁₃₄' +
  'áéíóúàèìòùâêîôûäëïöüñçßœæø';

const html = walk(dist).map((f) => readFileSync(f, 'utf8')).join('');
const chars = new Set([...html, ...ALWAYS]);
// Formatting characters have no glyph but must survive the subset.
const text = [...chars].join('');

// The site only ever asks for 400–700. Shipping deltas for 100–900 costs
// ~15 KB per face for weights nothing on the page uses. Inter's optical-size
// axis is pinned to body size for the same reason; display sizes get their
// tracking from CSS instead.
const AXES = {
  'Vazirmatn-Variable.ttf': { wght: { min: 400, max: 700 } },
  'Inter-Variable.ttf': { wght: { min: 400, max: 700 }, opsz: 17 },
};

async function cut(srcName, outName, label) {
  const src = readFileSync(join(root, 'build/fonts', srcName));
  const buf = await subsetFont(src, text, {
    targetFormat: 'woff2',
    variationAxes: AXES[srcName],
  });
  writeFileSync(join(dist, 'fonts', outName), buf);
  console.log(
    `  ${label.padEnd(11)} ${(src.length / 1024).toFixed(0).padStart(4)} KB → ${(
      buf.length / 1024
    ).toFixed(1)} KB  (${chars.size} codepoints)`
  );
}

console.log('subsetting fonts…');
await cut('Vazirmatn-Variable.ttf', 'vazirmatn.woff2', 'Vazirmatn');
await cut('Inter-Variable.ttf', 'inter.woff2', 'Inter');

// The full faces shipped for `astro dev` have no business in the deployment.
for (const stale of ['vazirmatn-full.woff2', 'inter-full.woff2']) {
  const p = join(dist, 'fonts', stale);
  if (existsSync(p)) rmSync(p);
}
