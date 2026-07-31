# Zista Health — landing page

Bilingual (Persian / English) launch site for **Zista Health**, an AI-powered
remote patient monitoring platform. Astro 5 static output, Tailwind CSS v4,
deployed to Cloudflare Workers with a single Worker route for the contact form.

- Persian: `/`
- English: `/en/`
- Partnership one-pager: `/one-pager/` and `/en/one-pager/`
- Machine-readable summaries: `/llms.txt`, `/llms-full.txt`

**Zista is a health monitoring platform. It is not a diagnostic device and does
not replace professional medical assessment. Regulatory certification is in
progress.** That sentence is in the footer of every page, in both languages, and
it constrains everything else in this repository — see
[Copy rules](#copy-rules-read-before-editing-a-single-word).

---

## Quick start

```bash
npm install
npm run dev
```

`npm run dev` starts Astro on `http://localhost:4321`. The contact form's
`POST /api/contact` does not exist in that server, so it will fall back to the
`mailto:` path — which is exactly what a visitor would get if the API were down.
To exercise the real Worker:

```bash
npm run build && npx wrangler dev
```

That serves `./dist` through the Workers Static Assets binding on
`http://127.0.0.1:8787`, with a local KV namespace and the real endpoint.

> `wrangler dev` watches `./dist`. If you rebuild while it is running, its asset
> manifest goes stale and every route 404s. Restart it after a build.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | OG images → Astro build → font subsetting |
| `npm run assets` | Regenerate OG images and icons only |
| `npm run check` | `astro check` |
| `npx tsc --noEmit` | Type check everything, including the Worker |
| `npx wrangler dev` | Local Worker + static assets |
| `npm run deploy` | Build and deploy to Cloudflare |
| `node scripts/shots.mjs` | Screenshot both locales at 390 / 768 / 1440, light and dark |

---

## Copy rules — read before editing a single word

**All copy lives in two files and nowhere else:**

- Persian → [`src/content/copy.fa.ts`](src/content/copy.fa.ts)
- English → [`src/content/copy.en.ts`](src/content/copy.en.ts)

Components contain no prose. To change the headline, edit `hero.h1`. To change
a FAQ answer, edit the matching entry in `faq.items`. To change a phone number,
edit the five constants at the top of both files. `src/content/types.ts` is the
contract both files satisfy — add a field there first and TypeScript will tell
you which locale is missing it.

`/llms.txt`, `/llms-full.txt`, the JSON-LD `FAQPage`, the OG image alt text and
the sitemap all derive from those same two files. There is one source of truth.

This is a health product, so three rules are not negotiable:

1. **Never claim Zista diagnoses, detects, predicts, prevents, treats, or
   replaces a clinician.** Write *monitors*, *measures continuously*, *surfaces
   patterns*, *flags changes*, *supports clinical decisions*.
2. **Never imply certification.** Zista holds no CE, FDA or IMED clearance. Say
   so wherever it could be misread.
3. **No number without a linkable source.** If you cannot cite it, make the
   point in words. There is deliberately no market size and no revenue
   projection on the investor section, and that absence is itself the argument.

No testimonials, no user counts, no logo rows, no press mentions, no stock
photography. The persona quotes in *Three people, one thread* are explicitly
labelled as positions the product is designed for, not customer quotations.

---

## The four secrets

Everything works without them. Set them when you want leads on your phone.

### 1 and 2 — `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

1. Open Telegram, message [@BotFather](https://t.me/BotFather), send `/newbot`.
2. Give it a name and a username ending in `bot`. BotFather replies with a token
   that looks like `8123456789:AAH...`. That is `TELEGRAM_BOT_TOKEN`.
3. Send any message to your new bot from your own account (a bot cannot start a
   conversation with you).
4. Open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and
   find `"chat":{"id":123456789`. That number is `TELEGRAM_CHAT_ID`.
5. Store both:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

### 3 — `TURNSTILE_SECRET`

Cloudflare dashboard → Turnstile → *Add site*. Choose the **Managed** widget.
You get a **site key** (public) and a **secret key** (private).

```bash
npx wrangler secret put TURNSTILE_SECRET
```

Then put the site key in `.env` as `PUBLIC_TURNSTILE_SITE_KEY` and rebuild. The
widget is rendered with `appearance: "interaction-only"`, and the Turnstile
script is only fetched when someone focuses a form field — so a visitor who
never touches the form makes **zero** third-party requests.

If `TURNSTILE_SECRET` is unset the Worker skips verification entirely. If
`PUBLIC_TURNSTILE_SITE_KEY` is unset the client never loads the script.

### 4 — `LEADS` KV namespace

```bash
npx wrangler kv namespace create LEADS
```

Paste the returned id into `wrangler.jsonc`, replacing
`REPLACE_WITH_YOUR_KV_NAMESPACE_ID`. This namespace does two jobs: it stores
every submission (`lead:<iso-timestamp>:<rand>`) so a Telegram outage never
loses a lead, and it holds the per-IP rate-limit counters (`rl:<ip>`,
5 requests per 10 minutes, `expirationTtl` does the cleanup).

### Optional — `PUBLIC_CF_ANALYTICS_TOKEN`

Cloudflare dashboard → Web Analytics → add a site → copy the token into `.env`.
Cookie-free, so there is no consent banner. The beacon is injected after the
`load` event, so it never touches first paint.

### For GitHub Actions

Repository → Settings → Secrets and variables → Actions:

| Kind | Name |
|---|---|
| Secret | `CLOUDFLARE_API_TOKEN` (needs *Workers Scripts: Edit* + *Workers KV Storage: Edit*) |
| Secret | `CLOUDFLARE_ACCOUNT_ID` |
| Variable | `SITE_URL`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_CF_ANALYTICS_TOKEN` |

Worker secrets (`TELEGRAM_*`, `TURNSTILE_SECRET`) are set with
`wrangler secret put`, not in CI. They live in Cloudflare, not in this repo.

---

## Deploying

```bash
npm run build
npx wrangler deploy
```

Both work from a clean clone. `wrangler.jsonc` binds `./dist` as static assets
and routes only `/api/*` through the Worker, so every page is served from the
edge cache without invoking a single line of JavaScript on the server.

Pushing to `main` runs `.github/workflows/deploy.yml`: install → type check →
build → Lighthouse CI (which starts a real `wrangler dev` and fails the job if
any category drops below 100) → deploy.

### Custom domain

1. Add the domain to your Cloudflare account (Websites → Add a site) and move
   the nameservers.
2. Workers & Pages → `zista-health` → Settings → Domains & Routes → *Add custom
   domain*. Cloudflare creates the DNS record and the certificate.
3. Set `SITE_URL` in `.env` and in the GitHub Actions variables, then rebuild.
   Canonical URLs, `hreflang`, the sitemap, the JSON-LD `@id`s and the OG image
   URLs all derive from it.

### Domain suggestions, in order

1. **`zista.health`** — unambiguous, and the TLD does the positioning for you.
2. **`zistahealth.com`** — the safe fallback; `.com` still wins on trust in Iran.
3. **`zista.ai`** — only if the AI framing becomes the headline, which it is not
   yet.

`zista.com` is almost certainly unavailable. More importantly, an unrelated
pharmaceutical company trades as **Zista Pharma**, so the site self-identifies
as **Zista Health** everywhere — in the `<title>`, the JSON-LD `Organization`,
the footer, and an explicit FAQ answer — to stay a distinct entity in search
results and in AI answers.

---

## How the pieces fit

```
src/
  components/     Hero, Gap, Personas, HowItWorks, Signals, Status, Paths,
                  Investors, Faq, Contact, FloatingBar, Footer, Nav,
                  SignalWave, Reveal, Icons
  layouts/
    BaseLayout    every <head>: SEO, hreflang, OG, five JSON-LD blocks
    Landing       the one-page composition, used by both locales
    OnePager      the printable partnership sheet
  pages/
    index.astro         fa
    en/index.astro      en
    one-pager.astro     fa
    en/one-pager.astro  en
    robots.txt.ts       generated, allows every AI crawler by name
    llms.txt.ts         generated summary for language models
    llms-full.txt.ts    generated full copy, both languages, in Markdown
  content/        copy.fa.ts, copy.en.ts, types.ts   ← all prose
  styles/tokens.css     design tokens, @font-face, component layer
worker/index.ts   POST /api/contact
scripts/
  gen-assets.mjs    hand-written SVG → PNG (OG cards, icons) via resvg
  subset-fonts.mjs  cuts both variable fonts to the glyphs the HTML uses
  shots.mjs         verification screenshots
build/fonts/      full variable TTFs, build-time only, never shipped
```

### Client JavaScript: 3.4 KB, uncompressed, total

Three small inline modules — the contact form, the floating bar, and the scroll
reveal. Nothing else on the page ships a byte of JavaScript. Every word of copy
is in the server-rendered HTML, because AI crawlers do not execute JavaScript
and neither does a printed page.

### Fonts

`build/fonts/*.ttf` are the full variable faces and never leave the repository.
`scripts/subset-fonts.mjs` runs after `astro build`, reads every character that
actually appears in the built HTML, and cuts each face down to those glyphs with
the weight axis clamped to 400–700:

| Face | Full | Shipped |
|---|---|---|
| Vazirmatn (Persian) | 236 KB | ~44 KB |
| Inter (English) | 859 KB | ~37 KB |

`public/fonts/*.woff2` are wider faces used by `astro dev` only; the build
overwrites them in `dist`. If you add a language or a symbol, rebuild — the
subset follows the copy automatically.

---

## Verification

Run these before you claim anything is done.

```bash
npm run build                       # must finish with zero warnings
npx tsc --noEmit                    # Worker included
npx wrangler dev                    # then, in another shell:
node scripts/shots.mjs              # 12 screenshots, both locales, both themes
npx @lhci/cli autorun               # Lighthouse, fails below 100
```

Measured on this build, Lighthouse mobile, all four pages:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 |
| `/en/` | 100 | 100 | 100 | 100 |
| `/one-pager/` | 100 | 100 | 100 | 100 |
| `/en/one-pager/` | 100 | 100 | 100 | 100 |

Three Lighthouse CI runs per locale against a real `wrangler dev`, mobile
emulation, Slow 4G, 4× CPU slowdown:

| | Persian `/` | English `/en/` |
|---|---|---|
| LCP | 1.66 s | 1.51 s |
| CLS | 0.0006 | 0.0000 |
| Total transfer | 106 KB | 104 KB |
| First-view (HTML brotli + preloaded font) | 62 KB | 54 KB |
| Client JS | 3.3 KB | 3.3 KB |

The Persian page is ~160 ms over the 1.5 s LCP stretch target in the lab, which
is the cost of the Arabic face being 7 KB larger than the Latin one plus a local
`workerd` time-to-first-byte that the real edge will beat. Both pages score a
full 100 on performance.

All five JSON-LD blocks validate at `validator.schema.org` with zero errors and
zero warnings, on both locales.

---

## Known constraint

`npm audit` reports advisories against Astro 5. They are all in the dev server
or in SSR paths (`define:vars` XSS, server islands, spread-attribute escaping);
this site is `output: 'static'` with no user input rendered into any template,
so none of them are reachable at runtime. Astro 5 is pinned because the brief
specified it. Moving to Astro 7 clears the audit and is a small change: the
config, the layouts and the Worker are all version-agnostic.

---

## Licence

MIT — see [LICENSE](LICENSE). Vazirmatn and Inter are SIL OFL 1.1.
