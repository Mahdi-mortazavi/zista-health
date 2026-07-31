/**
 * The shape every locale file must satisfy.
 *
 * If you want to change a word on the site, change it in `copy.fa.ts` or
 * `copy.en.ts`. Nothing else. Components contain no prose.
 */

export type Locale = 'fa' | 'en';

export interface Link {
  label: string;
  href: string;
}

export interface Beat {
  title: string;
  body: string;
}

export interface Persona {
  id: string;
  role: string;
  quote: string;
  body: string;
}

export interface Step {
  n: string;
  title: string;
  body: string;
}

export interface Signal {
  name: string;
  body: string;
  status: 'evaluating' | 'planned';
}

export interface PathCard {
  /** Value written into the form's "I am a …" field. Keep stable across locales. */
  value: 'physician' | 'patient' | 'investor' | 'partner';
  title: string;
  body: string;
  cta: string;
}

export interface Faq {
  q: string;
  /** Must read correctly quoted on its own, with no question and no page around it. */
  a: string;
}

export interface Copy {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  htmlLang: string;
  ogLocale: string;

  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };

  brand: {
    name: string;
    legalName: string;
    tagline: string;
  };

  nav: {
    links: Link[];
    skipToContent: string;
    langSwitch: string;
    langSwitchHref: string;
    menu: string;
  };

  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    ctaPrimary: Link;
    ctaSecondary: Link;
    visualAlt: string;
    /** Rejected headline candidates, kept so the founder can swap one in. */
    alternates: string[];
  };

  gap: {
    eyebrow: string;
    h2: string;
    beats: Beat[];
    scenarioLabel: string;
    scenario: string;
  };

  personas: {
    eyebrow: string;
    h2: string;
    intro: string;
    items: Persona[];
  };

  how: {
    eyebrow: string;
    h2: string;
    steps: Step[];
  };

  signals: {
    eyebrow: string;
    h2: string;
    intro: string;
    items: Signal[];
    statusLabels: { evaluating: string; planned: string };
    note: string;
  };

  status: {
    eyebrow: string;
    h2: string;
    intro: string;
    rows: Beat[];
    closing: string;
  };

  paths: {
    eyebrow: string;
    h2: string;
    intro: string;
    items: PathCard[];
  };

  investors: {
    eyebrow: string;
    h2: string;
    summary: string;
    blocks: Beat[];
    founder: { name: string; role: string; body: string };
    noNumbers: string;
  };

  faq: {
    eyebrow: string;
    h2: string;
    items: Faq[];
  };

  contact: {
    eyebrow: string;
    h2: string;
    intro: string;
    channelsLabel: string;
    formLabel: string;
    progress: string;
    fields: {
      name: string;
      namePlaceholder: string;
      reach: string;
      reachPlaceholder: string;
      role: string;
      message: string;
      messagePlaceholder: string;
    };
    roles: { value: string; label: string }[];
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    mailtoFallback: string;
    consent: string;
    onePager: Link;
    founderLine: string;
  };

  channels: {
    telegram: Link;
    whatsapp: Link;
    phone: Link;
    email: Link;
    github: Link;
  };

  floating: {
    label: string;
    telegram: string;
    whatsapp: string;
    call: string;
  };

  footer: {
    disclaimerFa: string;
    disclaimerEn: string;
    rights: string;
    nameNote: string;
    links: Link[];
  };

  onePager: {
    title: string;
    subtitle: string;
    print: string;
    sections: Beat[];
    back: string;
  };
}
