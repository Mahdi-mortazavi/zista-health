# Redesign — Apple-grade pass

August 2026. Not a repaint: the information architecture changed, one section
was replaced with a deeper one, and a product visualisation was added that the
page previously did not have at all.

---

## The audit that drove it

Four problems with the previous page, in the order they cost the most:

1. **No one could see what Zista *is*.** After 2,400 words the visitor still had
   no idea what the thing looked like or what using it involved. For a
   pre-launch product with nothing to demo, that is the difference between
   "interesting" and "I understand this".
2. **"Three people, one thread" named three audiences without showing any of
   their journeys.** It said a physician, a patient and a family member each get
   something — but never what, in what order, or what each of them has to do.
3. **The mechanism section floated free.** "Wear it · we watch · someone acts"
   sat *after* the personas, so the abstract came before the concrete.
4. **The visual system was a good document, not a product page.** One type
   ramp, one fade, glass on the nav only. Correct, unremarkable.

---

## What changed

### IA: two shallow sections became one deep one

| Before | After |
|---|---|
| `Personas` — three cards, three quotes, three paragraphs | `Journey` — a role picker driving **four steps per role** and **three app screens per role** |
| `HowItWorks` *after* personas | `HowItWorks` *before* the journey, so the shared mechanism is established before the per-role detail |

The journey carries 12 steps and 9 screens of new copy. Choosing a role changes
the quote, the flow, the phone, and the screen names together — it is one state,
not four independent widgets.

**Why a picker and not three columns:** three parallel flows shown at once is
how you make a reader skip all three. Self-selection is the point; the visitor
tells the page who they are, and the page answers only that question.

### The phone: a design preview, labelled as one

The demo is built entirely in CSS and SVG — no screenshots, no images, no mockup
library. It carries a permanent badge reading *"Design preview — no product has
shipped."*

This label is not decoration and should not be removed. Everything else on this
site is constrained by section 3 of the original brief: nothing untrue, no
implication that a product exists. A phone mockup this finished, unlabelled,
would be the most effective lie on the page. Labelled, it is a design artefact —
which is exactly what it is.

The screens are honest in their content too. The patient's alert screen says
*"This is not a diagnosis"* inside the mock. The family screen shows **Location:
Never**. The physician screen shows thresholds the clinician sets, not thresholds
we chose.

**Not a carousel.** The original brief bans carousels, and it was right to. This
never advances on its own — it moves only when a finger drags it or a labelled
button is pressed, and the step-by-step text beside it is always fully visible.
It is a screen picker, not a slideshow.

### Motion: real springs, not transitions

`src/lib/spring.ts`, about a kilobyte, no dependency. Critically-damped springs
by default (`response 0.35 / damping 1.0`), a touch of overshoot only where a
gesture carried momentum (`0.3 / 0.8`).

- Drags track the finger 1:1 and **rubber-band** at the ends instead of hitting a wall.
- Release hands the pointer's **velocity** into the spring, so drag and animation are one motion.
- The snap target comes from **momentum projection** (`d = 0.998`) — where the flick was heading, not where the finger stopped.
- Every animation re-targets **from the value currently on screen**, so it can be grabbed and reversed mid-flight. A CSS transition cannot do this, which is why gesture-driven motion here does not use one.
- Under `prefers-reduced-motion` the spring resolves instantly: the state change still happens, only the travel is removed.

### Liquid Glass, 2026 spec — and only three layers

Glass is the floating chrome and nothing else: the nav bar, the role picker, the
contact bar. Content is never glass, glass is never nested.

Each surface has the full anatomy — diffused backdrop, fill, darkened edge,
specular top highlight, size-scaled shadow. The nav starts fully transparent and
**materialises** when content actually scrolls under it, rather than sitting
frosted over nothing.

The phone's own status bar and tab bar deliberately do **not** use
`backdrop-filter`. Their backdrop is our own mock content, so a real blur buys no
legibility and would have spent two more composited layers.

### Type

Full iOS ramp, LargeTitle down to Caption, with size-specific tracking: −0.028em
on display sizes, 0 on body, +0.01em on captions. Persian overrides tracking to
zero everywhere and takes taller leading — negative tracking breaks Arabic
letter joining, and the previous build applied it uniformly.

---

## Performance: what the redesign cost, and how it was paid back

The redesign initially dropped the Persian page to 98–99. Profiling showed the
new JavaScript was not the problem — script evaluation was **16ms**. The cost was
`styleLayout` at **1,201ms**.

Three fixes, in order of what they actually returned:

| Fix | Why | Result |
|---|---|---|
| `content-visibility: auto` on the six below-fold sections | The whole document is ~2,400 words of a complex script; laying all of it out during load was the single largest block of main-thread time | TBT 103ms → 33ms, main thread 2.4s → 1.8s |
| Journey script initialises via IntersectionObserver at 200% root margin | It was running during load for a control the visitor cannot see yet | removed ~120ms of blocking time |
| `text-wrap: balance` scoped to the two display sizes; `pretty` to leads only | `balance` runs a multi-pass line-breaker. It was applied to forty `h3`s and every paragraph on the page | small but free |
| `will-change` scoped to an active drag | Three permanently composited layers held for the whole session | one less GPU cost |
| Inactive phone panes get `content-visibility: hidden` | Six of the nine mock screens are never visible at once, but were being laid out anyway | ~40ms on the Persian page |

Then one more, found only on the deployed site: **Speed Index 4,060ms against an
LCP of 1,486ms**. The gap was the hero pulse. An animation that never stops means
the filmstrip never reaches visually complete, so the metric keeps counting long
after the page is usable.

Stopping the pulse permanently fixed it and was the wrong fix — a halted
heartbeat is not an image a patient-monitoring company should ship. It now holds
still until load finishes and while the hero is off screen, then runs as before.
SI 4,060ms → 1,788ms, and it no longer burns the compositor on a phone for a
decoration nobody is looking at.

Final, five clean runs on the Persian page locally: **100, 100, 100, 100, 100**.

### Contrast regression found and fixed

The language chip turned out to be 4.24:1 in dark mode — accent text on a raised
fill, which lightens the backdrop and drops the ratio. Added
`--color-tint-on-fill`, a variant of the same accent adjusted for elevated
surfaces, exactly the way iOS varies systemBlue. Accessibility back to 100.

---

## Verified

Measured on the deployed site, median of three runs each:

| | Persian `/` | English `/en/` |
|---|---|---|
| Lighthouse mobile | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| LCP | 1.19 s | 1.53 s |
| Speed Index | 1.79 s | 2.63 s |
| CLS | 0.0034 | 0.0000 |
| Total transfer | 116 KB | 113 KB |
| Client JS | 7.0 KB inline, no bundle | same |
| Composited glass layers | 3 | 3 |

Also checked: no horizontal overflow and no sub-44px target at 320 / 360 / 390 /
414 / 768 / 1024 / 1440 / 1920; role tabs, screen picker, drag-with-flick and
keyboard arrows all behave in both reading directions (dragging left in Persian
means *previous*, as it should); and the three preference paths — reduced
motion, reduced transparency, increased contrast — each render as designed.

---

## What was deliberately not built

- **Auto-playing anything.** See above.
- **A blur inside the phone mock.** Cost without benefit.
- **A motion library.** The whole physics module is ~1 KB; Motion One's mini
  build would have been larger and bought nothing this page needs.
- **Scroll-linked pinning for the hero.** It is the most-copied Apple technique
  and the most fragile: it fights the reader, breaks on short viewports, and has
  no reduced-motion equivalent that keeps the meaning.
