/**
 * Zista Health — contact endpoint.
 *
 * Everything else on this site is a static asset served by the Workers Static
 * Assets binding. This Worker only exists for POST /api/contact.
 *
 * Order of operations, cheapest rejection first:
 *   1. shape and length validation      (no network)
 *   2. honeypot                         (no network)
 *   3. rate limit, 5 per 10 min per IP  (KV read)
 *   4. Turnstile verification           (one fetch, skipped if no secret)
 *   5. write to KV, then push to Telegram
 *
 * Every secret is optional. With none of them set the endpoint still validates
 * and still returns 200 so the founder can develop locally, and the client
 * falls back to mailto: whenever this returns anything else.
 */

export interface Env {
  ASSETS: Fetcher;
  LEADS: KVNamespace;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  TURNSTILE_SECRET?: string;
}

interface Submission {
  name: string;
  reach: string;
  role: string;
  message: string;
  company?: string;
  turnstile?: string;
}

const LIMIT = 5;
const WINDOW_SECONDS = 600;
const MAX = { name: 120, reach: 160, role: 40, message: 4000 };
const ROLES = ['physician', 'patient', 'investor', 'partner', 'other'];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // Strip control characters; they only ever arrive from a script.
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

/** Telegram MarkdownV2 is unforgiving. HTML mode with three escapes is not. */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function rateLimited(env: Env, ip: string): Promise<boolean> {
  if (!env.LEADS) return false;
  const key = `rl:${ip}`;
  const current = Number((await env.LEADS.get(key)) ?? 0);
  if (current >= LIMIT) return true;
  // Fixed window. Good enough for a contact form; a Durable Object would be
  // the upgrade if this ever needs to be exact under concurrency.
  await env.LEADS.put(key, String(current + 1), { expirationTtl: WINDOW_SECONDS });
  return false;
}

async function turnstileOk(env: Env, token: string, ip: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) return true; // not configured, nothing to verify
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', token);
  body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function toTelegram(env: Env, s: Submission, meta: Record<string, string>) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const text =
    `<b>Zista — new message</b>\n\n` +
    `<b>Name</b> ${esc(s.name)}\n` +
    `<b>Reach</b> ${esc(s.reach)}\n` +
    `<b>Is a</b> ${esc(s.role)}\n\n` +
    `${esc(s.message)}\n\n` +
    `<i>${esc(meta.country)} · ${esc(meta.time)}</i>`;

  const res = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    }
  );
  return res.ok;
}

async function handleContact(request: Request, env: Env, ctx: ExecutionContext) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method' }, 405);
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '0.0.0.0';
  const country = request.headers.get('cf-ipcountry') ?? '??';

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }
  const input = (raw ?? {}) as Record<string, unknown>;

  // 1 — honeypot. A real person never fills a field they cannot see.
  if (clean(input.company, 200)) {
    return json({ ok: true }); // look successful; do nothing
  }

  // 2 — shape
  const s: Submission = {
    name: clean(input.name, MAX.name),
    reach: clean(input.reach, MAX.reach),
    role: clean(input.role, MAX.role),
    message: clean(input.message, MAX.message),
  };
  if (!ROLES.includes(s.role)) s.role = 'other';
  if (!s.name || !s.reach || s.message.length < 2) {
    return json({ ok: false, error: 'missing' }, 400);
  }

  // 3 — rate limit
  if (await rateLimited(env, ip)) {
    return json({ ok: false, error: 'rate' }, 429);
  }

  // 4 — Turnstile
  if (!(await turnstileOk(env, clean(input.turnstile, 4096), ip))) {
    return json({ ok: false, error: 'turnstile' }, 403);
  }

  const time = new Date().toISOString();
  const meta = { country, time, ip };

  // 5 — durable copy first, so a Telegram outage never loses a lead.
  if (env.LEADS) {
    const key = `lead:${time}:${crypto.randomUUID().slice(0, 8)}`;
    await env.LEADS.put(key, JSON.stringify({ ...s, ...meta }));
  }

  ctx.waitUntil(toTelegram(env, s, meta));

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      return handleContact(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
