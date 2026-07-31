# ZISTA — Landing Page Build Brief
### A complete, self-contained prompt for Claude Code

> **نحوهٔ استفاده:** کل این فایل را در یک پوشهٔ خالی به Claude Code بدهید و بنویسید:
> `Read ZISTA_Landing_Page_PROMPT.md and execute it end to end.`
> متن به انگلیسی نوشته شده چون خروجی کد و محتوای سایت دوزبانه است و مدل با دستور انگلیسی دقیق‌تر عمل می‌کند.
> **تنها متغیری که ممکن است بخواهید عوض کنید:** نام برند در بخش ۱. آن را در یک جا تغییر دهید، بقیهٔ سند خودش تطبیق می‌یابد.

---

## 0 · Your role

You are a senior product engineer and conversion-focused web designer building the public launch site for a health-technology startup. You own design, copy, code, SEO, deployment and the git history. You work autonomously: plan, build, verify with real measurements, fix, then deliver. You do not ask for approval between steps; you ask only if a required secret or credential is missing.

Quality bar: this page will be read by medical device suppliers, practising physicians, and investors. It must look like it was made by a company with a design team, and it must survive a sceptical clinician reading it line by line.

---

## 1 · The company

| Field | Value |
|---|---|
| Brand | **Zista** (Persian: **زیستا**) |
| Full name | Zista Health |
| Category | AI-powered remote patient monitoring platform |
| Stage | Pre-launch. Hardware evaluation with an OEM partner in progress. No product shipped yet. |
| Founder | Mahdi Mortazavi — Founder & Product Lead |
| Primary market | Iran (Persian) |
| Secondary market | International (English) — investors, partners, clinical collaborators |

**Contact channels — all of these must appear and all must work:**

| Channel | Value | Link format |
|---|---|---|
| Telegram | @Mahdi_mortazavi1 | `https://t.me/Mahdi_mortazavi1` |
| WhatsApp | +98 992 927 1926 | `https://wa.me/989929271926` |
| Phone | +98 992 927 1926 | `tel:+989929271926` |
| Email | mahdi.mortazavi.135@gmail.com | `mailto:` |
| GitHub | Mahdi-mortazavi | `https://github.com/Mahdi-mortazavi` |

---

## 2 · Mission and success criteria

The page has one job: **turn a stranger into a conversation.**

A visitor must, within 8 seconds, be able to answer: *what is this, what problem does it solve, is it for me, and how do I reach a human.*

Ship only when all of these are true:

1. A physician who spends 40 seconds on the page can explain Zista to a colleague in one sentence.
2. An investor can find the market, the wedge, the stage and the founder without scrolling twice.
3. A patient's family member understands what they get without knowing a single medical term.
4. Lighthouse mobile: **100 / 100 / 100 / 100**.
5. Every contact channel is reachable in **one tap** from any screen position.
6. Nothing on the page is untrue. See section 3 — this is the hardest constraint, and it is not negotiable.

---

## 3 · Truth constraints — read this twice

This is a health product. False or inflated claims are not a growth tactic here; they are a legal and ethical failure, and any sophisticated reader detects them instantly.

**Absolutely forbidden:**

- Fake testimonials, fake user counts, fake hospital or university logos, fake press mentions, fake awards, fake "trusted by" rows, placeholder star ratings.
- Any claim that the product **diagnoses**, **detects disease**, **prevents**, **treats**, or **replaces** a clinician.
- Any implication that Zista is a certified medical device, or that it holds CE / FDA / IMED clearance.
- Statistics without a source. If you cannot attach a real, linkable citation, delete the number and make the point in words.
- Stock photography of models in white coats. It reads as fake to exactly the audience that matters.

**Required language pattern:** use *monitors*, *measures continuously*, *surfaces patterns*, *flags changes*, *supports clinical decisions*, *helps families stay informed*. Never *diagnoses*, *predicts illness*, *guarantees*.

**Required disclosure**, in both languages, in the footer and near any health claim:

> Zista is a health monitoring platform. It is not a diagnostic device and does not replace professional medical assessment. Regulatory certification is in progress.

**Turn honesty into the differentiator.** Include a short block titled *"Where we are today"* that states plainly: pre-launch, hardware partner under evaluation, clinical validation planned, regulatory path started. Sceptical readers reward this — it is the single most credible thing an early-stage health startup can put on a page, and it makes every other claim believable.

---

## 4 · The narrative

Everything on the page serves this argument. Do not dilute it.

> **Health rarely fails suddenly. It fails quietly first.**
> In the days before a hospitalisation, the body is already signalling — heart rate drifts, oxygen dips at night, sleep fragments, temperature shifts. But between two appointments, a patient is invisible. The doctor sees a snapshot. The family notices when it is already an emergency.
> **Zista watches the signals nobody is watching.** A ring worn day and night turns continuous physiological data into early, plain-language insight — for the patient, for their doctor, and for the family member who worries.
> The point is not more data. The point is **acting before, instead of reacting after.**

**Headline candidates** — write three more in each language, then pick the strongest. Do not use all of them.

EN:
- *Health doesn't fail suddenly. It fails quietly first.*
- *The warning signs are already there. Nobody is watching them.*
- *Between two appointments, your patient disappears.*

FA:
- «سلامتی ناگهانی از بین نمی‌رود. اول بی‌صدا افت می‌کند.»
- «نشانه‌ها از قبل وجود دارند. کسی آن‌ها را نمی‌بیند.»
- «بین دو ویزیت، بیمار شما ناپدید می‌شود.»

**Subhead pattern:** one sentence, what it is + who it is for. Example EN: *Continuous, clinical-quality monitoring that reaches the patient, the physician, and the family — before a condition becomes critical.*

---

## 5 · Page structure

One page, Persian at `/`, English at `/en/`. Each section below names the persuasion principle it applies — implement the principle, do not print its name on the page.

| # | Section | Purpose | Principle applied |
|---|---|---|---|
| 1 | **Hero** | One headline, one subhead, one primary CTA, one secondary CTA. Nothing else. A single restrained visual — an abstract animated signal/waveform in the brand accent, never a photo of a person. | Zeigarnik open loop · cognitive fluency · Von Restorff (exactly one visually dominant element) |
| 2 | **The gap** | Three short beats: what happens today, what is missed, what it costs. Concrete and human, not statistical. One short anonymised scenario beats any percentage. | Problem–Agitation–Solution · identifiable-victim effect · responsible loss framing (no fear-mongering, no mortality imagery) |
| 3 | **Three people, one thread** | Patient / Physician / Family — three cards, each written in that person's own voice and vocabulary. The family card is the emotional centre of the page. | Self-referencing effect · audience self-selection |
| 4 | **How it works** | Exactly three steps. Maximum seven words per step. *Wear it · We watch · Someone acts.* Add a one-line explanation under each. | Processing fluency — a mechanism that is easy to understand is judged more likely to be true |
| 5 | **What Zista measures** | A quiet, honest grid of signals: heart rate, HRV, SpO₂, respiration, skin temperature, sleep, activity, single-lead ECG (band). Label anything not yet validated as *planned*. | Specificity effect · credibility through precision |
| 6 | **Where we are today** | The honesty block from section 3. Stage, partner status, validation plan, regulatory path. | Pratfall effect · disclosure builds trust more than polish |
| 7 | **Choose your path** | Four cards that segment the audience and route to a pre-filled contact intent: *I'm a physician · I'm a patient or family member · I want to invest · I want to partner or supply.* Each opens the contact form with its context already selected. | Choice architecture · endowed progress — the form starts at step 2 of 3 |
| 8 | **For investors** *(collapsible or `/en/#invest`)* | The problem's cost, the wedge (start narrow: continuous monitoring and sleep-apnea screening), why now, the founder, what we are raising for. No fabricated financials. | Anchoring on the cost of the status quo · authority through the specificity of the plan |
| 9 | **FAQ** | 8–10 real questions, phrased the way a person actually types them. This section is what AI assistants quote — write it to be quotable. Include: *Is it a medical device? Is my data private? Does it work without internet? Who can see my data? How is it different from a smartwatch?* | Objection handling · AI answer-engine optimisation |
| 10 | **Contact** | The peak. Warm, direct, human. All five channels as one-tap targets, plus a short form. Maximum four form fields. Show the founder's name and face-free identity — a real name and real links, not a stock portrait. | Peak–end rule · friction removal · reciprocity (offer the partnership one-pager as a download) |
| 11 | **Footer** | Legal disclaimer, language switch, contact repeat, GitHub, copyright. | — |

**Global:** a floating glass contact bar that appears after the first scroll and stays reachable — Telegram, WhatsApp, Call. On mobile it sits above the safe area. It must never cover content or fire a popup.

---

## 6 · Design system

The brand already has a document design system. The site must be visibly the same family.

```css
:root{
  color-scheme: light dark;
  --label-1: light-dark(#1d1d1f, rgba(255,255,255,.96));
  --label-2: light-dark(#6e6e73, rgba(235,235,245,.62));
  --label-3: light-dark(#86868b, rgba(235,235,245,.40));
  --bg-primary: light-dark(#ffffff, #000000);
  --bg-canvas:  light-dark(#fbfbfd, #0a0a0b);
  --bg-secondary: light-dark(#f5f5f7, #1c1c1e);
  --separator: light-dark(rgba(60,60,67,.16), rgba(84,84,88,.50));
  --tint: light-dark(#0071e3, #0a84ff);      /* the ONLY accent colour */
  --radius-control:10px; --radius-card:18px; --radius-glass:22px;
}
```

**Rules:**

- **One accent colour**, used only for interactive elements and one emphasis per screen. No gradient soup, no purple-blue SaaS cliché, no neon.
- **Typography:** Persian — Vazirmatn Variable, self-hosted, subset. English — Inter Variable, self-hosted, subset. Negative tracking on display sizes (−0.02em to −0.028em), normal on body, positive on small uppercase labels. Line length 60–70 characters maximum.
- **Space is the design.** Generous vertical rhythm on an 8px grid. If a section feels crowded, remove content rather than shrink type.
- **Liquid Glass, correctly:** translucency belongs only to floating chrome — the nav bar and the floating contact bar. Content is never glass. Never nest glass in glass. Provide solid fallbacks for `prefers-reduced-transparency`.
- **Motion:** spring-based, `cubic-bezier(.32,.72,0,1)`, 300–450ms. Entrance reveals on scroll are subtle (12px rise + fade), fire once, and are fully disabled under `prefers-reduced-motion`. No parallax, no scroll-jacking, no counters spinning up, no confetti.
- **Dark mode** is automatic and must be as considered as light mode, not an inversion.
- **Imagery:** abstract only — signal traces, soft gradients, a stylised ring rendered in CSS/SVG. Zero stock photos. If you need a hero visual, generate an animated SVG waveform derived from a real PPG-shaped curve.
- **RTL:** Persian is right-to-left. Use CSS logical properties everywhere (`margin-inline-start`, not `margin-left`). Test both directions. Numerals: use Persian digits in Persian copy where natural, Latin digits for measurements and phone numbers.

---

## 7 · Contact and conversion system

**Form:** maximum four fields — name, how to reach you (one field accepting phone/email/Telegram), I am a … (pre-selected from the path card), message. Nothing else. No company field, no dropdown of 12 countries.

**Backend:** a single Worker route `POST /api/contact` that:

1. Validates input server-side, rejects on a honeypot field and on missing fields.
2. Rate-limits by IP using Cloudflare KV or Durable Objects — 5 requests per 10 minutes.
3. Verifies a Cloudflare Turnstile token (invisible mode — never a visible captcha).
4. Forwards the submission to Telegram via the Bot API using secrets `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, formatted as a readable message so the founder receives every lead instantly on his phone.
5. Also writes the submission to a KV namespace `LEADS` as a backup, keyed by timestamp.
6. Returns JSON. The client shows an inline success state — never an alert, never a page reload.

If the secrets are absent at build time, the form must degrade gracefully to a `mailto:` fallback rather than break. Document in the README exactly how to create the bot with @BotFather, obtain the chat id, and set the secrets with `wrangler secret put`.

**Analytics:** Cloudflare Web Analytics only — no cookies, no consent banner, no Google Analytics.

---

## 8 · Stack and repository

- **Astro 5**, static output (`output: 'static'`), **Tailwind CSS v4**, TypeScript.
- Astro's built-in i18n routing: `fa` as the default locale at `/`, `en` at `/en/`.
- Client-side JavaScript budget: **≤ 30 KB**. Use Astro islands only for the form and the floating bar. Everything else ships zero JS.
- **Cloudflare Workers** with the Static Assets binding, plus one Worker route for `/api/contact`.

```
zista-health/
├─ src/
│  ├─ components/        # Hero, Gap, Personas, HowItWorks, Signals, Status,
│  │                     # Paths, Investors, FAQ, Contact, FloatingBar, Footer
│  ├─ layouts/BaseLayout.astro   # all <head>, SEO, JSON-LD, hreflang
│  ├─ pages/index.astro          # fa
│  ├─ pages/en/index.astro       # en
│  ├─ content/copy.fa.ts         # ALL Persian copy — single source
│  ├─ content/copy.en.ts         # ALL English copy — single source
│  └─ styles/tokens.css
├─ public/                # fonts, og images, robots.txt, llms.txt, favicons
├─ worker/index.ts        # /api/contact
├─ wrangler.jsonc
├─ .github/workflows/deploy.yml
├─ README.md
└─ LICENSE
```

**All copy lives in `copy.fa.ts` and `copy.en.ts`.** No hard-coded strings inside components. This is what lets the founder rewrite a headline without touching markup.

---

## 9 · SEO and AI discoverability

The page must rank on Google **and** be quotable by ChatGPT, Claude, Perplexity and Google AI Overviews. These are different jobs.

**For search engines**

- One `<h1>` per page; a strict, logical `h2`/`h3` hierarchy.
- Unique `<title>` (≤ 60 chars) and `<meta name="description">` (≤ 155 chars) per locale.
- `<link rel="canonical">` and `hreflang` alternates for `fa`, `en`, plus `x-default`.
- Open Graph and Twitter card tags with a generated 1200×630 image per locale (build-time, via `satori` or a static SVG rendered to PNG — never a screenshot).
- `sitemap.xml` (Astro's sitemap integration) and a `robots.txt`.
- Real text in the DOM. Never text baked into an image — neither Google nor an AI crawler can read it.
- Descriptive `alt` on every meaningful graphic.

**JSON-LD** — emit all of these, validated against schema.org:

- `Organization` — name, alternateName `زیستا`, url, logo, sameAs (GitHub, Telegram), founder, contactPoint.
- `WebSite` with `inLanguage`.
- `Person` for the founder, with `sameAs` links — this builds entity recognition, which is how AI systems learn the company exists.
- `FAQPage` covering the FAQ section verbatim.
- `SoftwareApplication` for the platform. **Do not** use `MedicalDevice` — that is a claim you have not earned.

**For AI answer engines**

- Ship `/llms.txt` — a concise Markdown summary of what Zista is, who it serves, current stage, and contact — and `/llms-full.txt` with the complete page copy in Markdown.
- Explicitly allow AI crawlers in `robots.txt`: `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bytespider`.
- The FAQ answers must be self-contained: each answer must make sense quoted alone, without the question or the surrounding page. This is the single highest-leverage thing for being cited by an AI assistant.
- Everything critical must be in the server-rendered HTML. AI crawlers generally do not execute JavaScript — content that appears only after hydration is invisible to them.
- State the entity clearly and repeatedly in natural language: *"Zista (زیستا) is a remote patient monitoring platform founded by Mahdi Mortazavi."* Entity clarity beats keyword density.

---

## 10 · Budgets

| Metric | Target |
|---|---|
| Lighthouse mobile (all four) | 100 |
| LCP (Moto G4, Slow 4G) | < 1.5 s |
| CLS | 0 |
| INP | < 200 ms |
| First-view transfer | ≤ 200 KB |
| Client JS | ≤ 30 KB |
| Accessibility | WCAG 2.2 AA — contrast ≥ 4.5:1, visible focus rings, full keyboard operation, 44×44px minimum targets |
| Motion | Full `prefers-reduced-motion` path |
| Transparency | Full `prefers-reduced-transparency` and `prefers-contrast: more` paths |

Self-host fonts, subset them to the characters actually used, `font-display: swap`, preload the two faces used above the fold. No third-party requests on first load — none.

---

## 11 · Deployment

1. `wrangler.jsonc` configured with `assets` (directory `./dist`) and the Worker entry for the API route, `compatibility_date` set to today.
2. `npm run build && npx wrangler deploy` must work from a clean clone.
3. `.github/workflows/deploy.yml` — on push to `main`: install, build, run Lighthouse CI against the preview, then `cloudflare/wrangler-action` deploy using repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. README documents: local dev, the four secrets, custom-domain setup, and how to change any copy string.
5. Suggest domains in the README, in preference order: `zista.health`, `zistahealth.com`, `zista.ai`. Note that `zista.com` is unlikely to be available and that an unrelated pharmaceutical company already uses the name *Zista Pharma* — so the site must consistently self-identify as **Zista Health** to stay distinct in search results.

---

## 12 · Git and GitHub

Do this automatically at the end, without asking:

```bash
git init && git checkout -b main
# .gitignore: node_modules, dist, .astro, .wrangler, .dev.vars, .env
git add -A
git commit -m "feat: Zista Health landing page — bilingual, Workers-ready"
gh repo create Mahdi-mortazavi/zista-health --public \
  --description "Zista Health — AI-powered remote patient monitoring. Bilingual landing page on Cloudflare Workers." \
  --source . --remote origin --push
gh repo edit --add-topic healthtech,remote-patient-monitoring,cloudflare-workers,astro,digital-health
```

If `gh` is not authenticated, stop and print the exact `gh auth login` command instead of failing silently. Never commit secrets, `.dev.vars`, or tokens — verify this before the first commit.

---

## 13 · Anti-requirements

Do not build: carousels or sliders · entry popups or exit-intent modals · cookie-consent banners · chat-widget bubbles from third parties · fake countdown timers · "as seen in" logo rows · animated statistics counters · parallax · scroll-jacking · autoplaying video · a newsletter signup · testimonials of any kind · a blog · a pricing table (there is no product to price yet) · em-dash-heavy marketing prose · the words *revolutionary*, *cutting-edge*, *game-changing*, *seamless*, *empower*, *unlock*.

Write like a competent doctor explaining something to a colleague: short sentences, concrete nouns, no adjectives doing work that facts should do.

---

## 14 · Verification before you declare done

Do not report completion until you have actually run these and fixed what they found:

1. `npm run build` succeeds with zero warnings.
2. Lighthouse mobile run — paste the four scores into your final summary.
3. Render both `/` and `/en/` at 390px, 768px and 1440px and **look at the screenshots**. Fix anything that is cramped, misaligned, or breaks in RTL.
4. Validate every JSON-LD block with the schema.org validator or `structured-data-testing-tool`.
5. Click every contact link and confirm the URL scheme is correct — `tel:`, `wa.me`, `t.me`, `mailto:`.
6. Test the form against a local Worker with `wrangler dev`, including the honeypot and rate-limit paths.
7. Read the whole page aloud in both languages. Delete every sentence that does not earn its place.
8. Re-read section 3 and audit the finished page against it, line by line. Confirm in your summary that no forbidden claim appears.

---

## 15 · Deliver

A final summary containing: the live preview URL, the GitHub repository URL, the four Lighthouse scores, the list of secrets the founder still needs to set, the exact file to edit to change any piece of copy, and the three highest-impact things you would do next.
