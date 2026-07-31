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

/** One row inside a mocked-up app screen. */
export interface PhoneRow {
  label: string;
  value: string;
  /** Drives the dot colour. `watch` is the accent, never red — nothing here is an emergency. */
  state?: 'ok' | 'watch';
}

export interface PhoneScreen {
  /** Short name shown under the phone, and the accessible name of its dot. */
  tab: string;
  /** Title bar inside the mocked app. */
  title: string;
  kind: 'status' | 'trend' | 'list' | 'access';
  primary: string;
  secondary: string;
  rows?: PhoneRow[];
  note?: string;
  /** Optional button drawn inside the screen. Decorative — the mock is not interactive. */
  cta?: string;
  /** 14 values, 0–1, for the trend sparkline. Illustrative shape, not real data. */
  series?: number[];
}

export interface JourneyStep {
  n: string;
  title: string;
  body: string;
}

export interface JourneyRole {
  value: 'physician' | 'patient' | 'family';
  /** Tab label. */
  tab: string;
  /** What this person says, in their own words. */
  quote: string;
  /** One sentence framing the flow below. */
  lead: string;
  steps: JourneyStep[];
  screens: PhoneScreen[];
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

  journey: {
    eyebrow: string;
    h2: string;
    intro: string;
    /** Says plainly that the phone is a design preview. Non-negotiable. */
    previewBadge: string;
    /** Instruction for the swipeable phone, announced to assistive tech too. */
    hint: string;
    /** Accessible label for the role tab list. */
    tabsLabel: string;
    /** Accessible label for the screen picker dots, e.g. "Screen". */
    screenLabel: string;
    roles: JourneyRole[];
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
