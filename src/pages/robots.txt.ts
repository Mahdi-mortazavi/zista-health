import type { APIRoute } from 'astro';

// AI answer engines are allowed on purpose: being quotable by them is a
// distribution channel, not a leak. Everything on this site is public copy.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'cohere-ai',
  'Diffbot',
  'YouBot',
];

export const GET: APIRoute = ({ site }) => {
  const base = site!.origin;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_CRAWLERS.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${base}/sitemap-index.xml`,
    '',
    `# Zista Health (زیستا) — remote patient monitoring, founded by Mahdi Mortazavi.`,
    `# Plain-text summary for language models: ${base}/llms.txt`,
    `# Full page copy in Markdown: ${base}/llms-full.txt`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
