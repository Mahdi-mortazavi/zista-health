import type { APIRoute } from 'astro';
import { fa } from '../content/copy.fa';
import { en } from '../content/copy.en';
import type { Copy } from '../content/types';

/** Renders one locale's entire page copy as Markdown, straight from the source. */
function render(c: Copy, url: string): string {
  const L: string[] = [];
  const p = (s: string) => L.push(s, '');

  p(`# ${c.meta.title}`);
  p(`_${url}_`);
  p(c.meta.description);

  p(`## ${c.hero.eyebrow}`);
  p(`### ${c.hero.h1}`);
  p(c.hero.sub);

  p(`## ${c.gap.eyebrow} — ${c.gap.h2}`);
  for (const b of c.gap.beats) p(`**${b.title}.** ${b.body}`);
  p(`**${c.gap.scenarioLabel}.** ${c.gap.scenario}`);

  p(`## ${c.personas.eyebrow} — ${c.personas.h2}`);
  p(c.personas.intro);
  for (const x of c.personas.items) p(`**${x.role}.** ${x.quote} ${x.body}`);

  p(`## ${c.how.eyebrow} — ${c.how.h2}`);
  for (const s of c.how.steps) p(`${s.n}. **${s.title}** ${s.body}`);

  p(`## ${c.signals.eyebrow} — ${c.signals.h2}`);
  p(c.signals.intro);
  for (const s of c.signals.items)
    p(`- **${s.name}** (${c.signals.statusLabels[s.status]}): ${s.body}`);
  p(c.signals.note);

  p(`## ${c.status.eyebrow} — ${c.status.h2}`);
  p(c.status.intro);
  for (const r of c.status.rows) p(`**${r.title}.** ${r.body}`);
  p(c.status.closing);

  p(`## ${c.paths.eyebrow} — ${c.paths.h2}`);
  for (const x of c.paths.items) p(`**${x.title}.** ${x.body}`);

  p(`## ${c.investors.eyebrow} — ${c.investors.h2}`);
  for (const b of c.investors.blocks) p(`**${b.title}.** ${b.body}`);
  p(`**${c.investors.founder.name} — ${c.investors.founder.role}.** ${c.investors.founder.body}`);
  p(c.investors.noNumbers);

  p(`## ${c.faq.eyebrow}`);
  for (const f of c.faq.items) p(`### ${f.q}\n\n${f.a}`);

  p(`## ${c.contact.eyebrow}`);
  p(c.contact.intro);
  p(
    [
      `- Telegram: ${c.channels.telegram.href}`,
      `- WhatsApp: ${c.channels.whatsapp.href}`,
      `- Phone: ${c.channels.phone.href.replace('tel:', '')}`,
      `- Email: ${c.channels.email.href.replace('mailto:', '')}`,
      `- GitHub: ${c.channels.github.href}`,
    ].join('\n')
  );

  p(`## Disclosure`);
  p(c.footer.disclaimerFa);
  p(c.footer.disclaimerEn);

  return L.join('\n');
}

export const GET: APIRoute = ({ site }) => {
  const base = site!.origin;
  const body = [
    '<!-- Complete copy of zista.health in Markdown, generated at build time',
    '     from src/content/copy.fa.ts and src/content/copy.en.ts. -->',
    '',
    render(en, `${base}/en/`),
    '',
    '---',
    '',
    render(fa, `${base}/`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
