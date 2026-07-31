/**
 * Verification screenshots. Not part of the build — run it when you change the
 * layout and want to look at both locales at three widths before shipping.
 *
 *   node scripts/shots.mjs [baseUrl] [outDir]
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://127.0.0.1:8787';
const OUT = process.argv[3] || 'shots';
const CHROME =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const WIDTHS = [390, 768, 1440];
const PAGES = [
  ['fa', '/'],
  ['en', '/en/'],
];

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});

for (const [name, path] of PAGES) {
  for (const width of WIDTHS) {
    for (const scheme of ['light', 'dark']) {
      const page = await browser.newPage();
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: scheme },
      ]);
      await page.setViewport({ width, height: Math.round(width * 2.1), deviceScaleFactor: 1 });
      await page.goto(BASE + path, { waitUntil: 'networkidle0' });
      await page.evaluate(async () => {
        // Trigger every scroll reveal, then come back to the top.
        for (let y = 0; y < document.body.scrollHeight; y += 600) window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 600));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 300));
      });
      const file = `${OUT}/${name}-${width}-${scheme}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(file);
      await page.close();
    }
  }
}

await browser.close();
