import type { Copy } from './types';

/**
 * ENGLISH COPY — single source of truth.
 * Every English string on the site lives here. Edit here, nowhere else.
 *
 * House rules, enforced by review:
 *  • Never write "diagnoses", "detects disease", "predicts", "prevents",
 *    "treats", "guarantees", or "medical device" as a claim about Zista.
 *  • Write "monitors", "measures continuously", "surfaces patterns",
 *    "flags changes", "supports clinical decisions".
 *  • No number without a source you can link. If you cannot cite it, say it
 *    in words instead.
 */

const TELEGRAM = 'https://t.me/Mahdi_mortazavi1';
const WHATSAPP = 'https://wa.me/989929271926';
const PHONE = 'tel:+989929271926';
const EMAIL = 'mailto:mahdi.mortazavi.135@gmail.com';
const GITHUB = 'https://github.com/Mahdi-mortazavi';

export const en: Copy = {
  locale: 'en',
  dir: 'ltr',
  htmlLang: 'en',
  ogLocale: 'en_US',

  meta: {
    title: 'Zista Health · Remote Patient Monitoring',
    description:
      'Zista Health (زیستا) is a remote patient monitoring platform founded by Mahdi Mortazavi. A ring measures the signals between appointments. Pre-launch.',
    ogAlt:
      'Zista Health. Health does not fail suddenly. It fails quietly first. A remote patient monitoring platform.',
  },

  brand: {
    name: 'Zista',
    legalName: 'Zista Health',
    tagline: 'Remote patient monitoring',
  },

  nav: {
    links: [
      { label: 'The gap', href: '#gap' },
      { label: 'How it works', href: '#how' },
      { label: 'What we measure', href: '#signals' },
      { label: 'Where we are', href: '#status' },
      { label: 'Investors', href: '#invest' },
      { label: 'FAQ', href: '#faq' },
    ],
    skipToContent: 'Skip to content',
    langSwitch: 'فارسی',
    langSwitchHref: '/',
    menu: 'Sections',
  },

  hero: {
    eyebrow: 'Zista Health',
    h1: 'Health doesn’t fail suddenly. It fails quietly first.',
    sub: 'Zista is a remote patient monitoring platform. A ring worn day and night measures the signals between two appointments, and tells the patient, the physician and the family when something changes.',
    ctaPrimary: { label: 'Start a conversation', href: '#contact' },
    ctaSecondary: { label: 'Where we are today', href: '#status' },
    visualAlt:
      'An abstract animated trace of a pulse waveform, drawn continuously from left to right.',
    alternates: [
      'The warning signs are already there. Nobody is watching them.',
      'Between two appointments, your patient disappears.',
      'Most of what a body does all year, nobody records.',
      'The days before an emergency are not silent.',
      'Your doctor sees one moment. The other 8,759 hours go unrecorded.',
    ],
  },

  gap: {
    eyebrow: 'The gap',
    h2: 'Care is built around appointments. Illness is not.',
    beats: [
      {
        title: 'What happens today',
        body: 'A blood pressure cuff in a clinic. An oxygen clip in a waiting room. A question about how sleep has been, answered from memory. Two or three snapshots a year, taken on the patient’s best behaviour, in a room that makes everyone’s heart rate higher than usual.',
      },
      {
        title: 'What gets missed',
        body: 'Resting heart rate climbing a little each week. Oxygen dipping at three in the morning, every night, for a month. Sleep breaking into shorter and shorter pieces. On its own each of these is nothing. Together they are a trend, and a trend is the thing a clinician can actually act on.',
      },
      {
        title: 'What it costs',
        body: 'So the first real signal is the ambulance. And the family says the same sentence every time: he seemed fine last week. He was not fine last week. Nobody was measuring.',
      },
    ],
    scenarioLabel: 'An illustration, not a case report',
    scenario:
      'A man of sixty-eight goes home after a heart failure admission and is told to come back in six weeks. In week two his weight is unchanged, but his resting heart rate has drifted up nine beats and his nights have broken into pieces. Nobody sees it, because nobody is looking. In week five he is readmitted. The information that mattered existed for three weeks. It was simply never collected.',
  },

  journey: {
    eyebrow: 'Three people, one thread',
    h2: 'One stream of data. Three different journeys.',
    intro:
      'A measurement is only useful if it reaches someone who can act on it. Zista sends one continuous stream to three people and designs a separate path for each. Pick the one you are.',
    previewBadge: 'Design preview — no product has shipped',
    hint: 'Swipe to see the other screens',
    tabsLabel: 'Choose a role',
    screenLabel: 'Screen',
    roles: [
      {
        value: 'patient',
        tab: 'Patient',
        quote: '“I don’t want to think about it. I want to put something on and forget it.”',
        lead: 'The only thing asked of the patient is that they wear a ring. Everything else happens out of sight.',
        steps: [
          {
            n: '01',
            title: 'Wear the ring and forget it',
            body: 'About an hour on the charger, twice a week. No buttons, no daily logging, no reminders. Zista works even if you never open the app.',
          },
          {
            n: '02',
            title: 'Two weeks builds your baseline',
            body: 'Zista never compares you to anyone else. It first learns what normal looks like for you, then judges against that.',
          },
          {
            n: '03',
            title: 'If something changes, one sentence',
            body: 'No chart, no number you have to look up. One line in plain language and one specific thing you can do about it.',
          },
          {
            n: '04',
            title: 'You decide who sees it',
            body: 'A physician or a family member sees something only when you have granted it, and you can take that back at any moment.',
          },
        ],
        screens: [
          {
            tab: 'Today',
            title: 'Today',
            kind: 'status',
            primary: 'Same as usual',
            secondary: 'Against your own 14-day baseline',
            rows: [
              { label: 'Resting heart rate', value: '62', state: 'ok' },
              { label: 'Overnight oxygen', value: '95%', state: 'ok' },
              { label: 'Sleep', value: '6h 40m', state: 'ok' },
              { label: 'Skin temperature', value: '±0.1', state: 'ok' },
            ],
            note: 'Nothing needs doing today.',
          },
          {
            tab: 'A change',
            title: 'A change',
            kind: 'trend',
            primary: 'Your resting heart rate has been climbing for five days',
            secondary: 'Averaging 7 beats above your normal',
            series: [0.32, 0.3, 0.34, 0.31, 0.33, 0.36, 0.35, 0.41, 0.46, 0.52, 0.58, 0.63, 0.69, 0.74],
            note: 'This is not a diagnosis. Its value is that you can raise it at your next visit.',
            cta: 'Send to my doctor',
          },
          {
            tab: 'Ring',
            title: 'Ring',
            kind: 'status',
            primary: '79%',
            secondary: 'About four days until the next charge',
            rows: [
              { label: 'Connection', value: 'Connected', state: 'ok' },
              { label: 'Last sync', value: '3 minutes ago', state: 'ok' },
              { label: 'Stored on device', value: '0 hours', state: 'ok' },
            ],
            note: 'Recording continues without internet and syncs later.',
          },
        ],
      },
      {
        value: 'physician',
        tab: 'Physician',
        quote: '“I need continuity, not more noise.”',
        lead: 'The goal is that fifteen seconds before you walk into the room, you know what happened between visits.',
        steps: [
          {
            n: '01',
            title: 'You invite a patient, you do not enrol them',
            body: 'You send an invitation and the patient accepts. Until they do, no data reaches you at all.',
          },
          {
            n: '02',
            title: 'You set the thresholds yourself',
            body: 'Per patient. A heart failure patient and a sleep apnea patient do not share a threshold, and we should not be deciding that for you.',
          },
          {
            n: '03',
            title: 'Only what crossed a line surfaces',
            body: 'The patient list is quiet by default. An alert that has not earned its place in your day is never shown at all.',
          },
          {
            n: '04',
            title: 'You see the trend, not a number',
            body: 'Fourteen days at a glance with the point of change marked, and exportable into the record.',
          },
        ],
        screens: [
          {
            tab: 'Patients',
            title: 'Patients',
            kind: 'list',
            primary: '2 need a look',
            secondary: 'Of 24 patients being monitored',
            rows: [
              { label: 'M. R. — post-discharge', value: 'HR ↑ 5 days', state: 'watch' },
              { label: 'F. A. — sleep apnea', value: 'Nightly O₂ dips', state: 'watch' },
              { label: 'H. N. — heart failure', value: 'Stable', state: 'ok' },
              { label: 'S. M. — post-discharge', value: 'Stable', state: 'ok' },
            ],
            note: '20 other patients are stable and are not shown.',
          },
          {
            tab: 'Trend',
            title: 'M. R. — resting heart rate',
            kind: 'trend',
            primary: '74 bpm',
            secondary: 'Patient’s own baseline: 67 · changed from day five',
            series: [0.3, 0.28, 0.31, 0.29, 0.3, 0.34, 0.38, 0.44, 0.5, 0.55, 0.61, 0.66, 0.7, 0.76],
            note: 'Weight unchanged. Sleep fragmented over the same window.',
            cta: 'Add to record',
          },
          {
            tab: 'Thresholds',
            title: 'Thresholds — M. R.',
            kind: 'access',
            primary: 'You decide what is allowed to interrupt you',
            secondary: 'For this patient, separately from the rest',
            rows: [
              { label: 'Resting heart rate', value: '+8 bpm, 3 days', state: 'ok' },
              { label: 'Overnight oxygen', value: 'Below 90%', state: 'ok' },
              { label: 'Sleep fragmentation', value: 'Off', state: 'ok' },
              { label: 'Weekly summary', value: 'Sundays', state: 'ok' },
            ],
          },
        ],
      },
      {
        value: 'family',
        tab: 'Family',
        quote: '“I live in another city. I call, and he says he’s fine, and I have no way to know.”',
        lead: 'This is the part that usually gets left out. You do not want a medical file. You want an answer.',
        steps: [
          {
            n: '01',
            title: 'The patient adds you',
            body: 'Not the other way round. Access is always granted from the patient’s side and can always be withdrawn.',
          },
          {
            n: '02',
            title: 'You see a sentence, not data',
            body: '“Today looks like last week.” That is it. Raw medical numbers are not shown by default.',
          },
          {
            n: '03',
            title: 'You are told when something changes',
            body: 'In the language you use with a person, not the language of a chart. Always with what the next step is.',
          },
          {
            n: '04',
            title: 'Without becoming a watcher',
            body: 'The patient sees exactly what you see. A relationship built on something hidden is the next problem, not the solution.',
          },
        ],
        screens: [
          {
            tab: 'My father',
            title: 'My father',
            kind: 'status',
            primary: 'Today looks like last week',
            secondary: 'Updated 12 minutes ago',
            rows: [
              { label: 'Last night', value: 'Settled', state: 'ok' },
              { label: 'Movement today', value: 'As usual', state: 'ok' },
              { label: 'Ring', value: 'Being worn', state: 'ok' },
            ],
            note: 'If something changes, we will tell you.',
          },
          {
            tab: 'This week',
            title: 'This week',
            kind: 'trend',
            primary: 'Six settled nights out of seven',
            secondary: 'Tuesday was a little more restless',
            series: [0.6, 0.62, 0.58, 0.61, 0.44, 0.59, 0.63, 0.6, 0.62, 0.61, 0.58, 0.6, 0.63, 0.62],
            note: 'One different night means nothing. A pattern means something.',
          },
          {
            tab: 'Access',
            title: 'What you can see',
            kind: 'access',
            primary: 'Your father has shared these',
            secondary: 'And can change it at any moment',
            rows: [
              { label: 'Daily status', value: 'On', state: 'ok' },
              { label: 'Change alerts', value: 'On', state: 'ok' },
              { label: 'Raw numbers', value: 'Off', state: 'ok' },
              { label: 'Location', value: 'Never', state: 'ok' },
            ],
            note: 'Zista does not collect location at all.',
          },
        ],
      },
    ],
  },

  how: {
    eyebrow: 'How it works',
    h2: 'Three steps. That is the whole mechanism.',
    steps: [
      {
        n: '01',
        title: 'Wear the ring.',
        body: 'Charged twice a week. Nothing to open, nothing to log, nothing to remember.',
      },
      {
        n: '02',
        title: 'Zista measures, day and night.',
        body: 'Heart rate, heart rate variability, blood oxygen, respiration, skin temperature, sleep and movement, recorded continuously and compared against the person’s own baseline.',
      },
      {
        n: '03',
        title: 'Someone acts.',
        body: 'When a trend crosses a line, the patient, the physician and one chosen family member are told, in the language each of them needs.',
      },
    ],
  },

  signals: {
    eyebrow: 'What Zista measures',
    h2: 'Measurements, not conclusions.',
    intro:
      'Nothing in this list is a diagnosis. These are physiological signals, and their value is not in any single reading. It is in the change over days and weeks.',
    items: [
      {
        name: 'Heart rate',
        body: 'Continuous, awake and asleep. The resting figure over time is the useful one, not the number at any given moment.',
        status: 'evaluating',
      },
      {
        name: 'Heart rate variability',
        body: 'A measure of autonomic balance. Meaningful only against a person’s own baseline, never compared between two people.',
        status: 'evaluating',
      },
      {
        name: 'Blood oxygen (SpO₂)',
        body: 'Sampled through the night, which is where dips are most informative and where nobody is currently looking.',
        status: 'evaluating',
      },
      {
        name: 'Respiration rate',
        body: 'Derived from the pulse waveform during rest, so it needs no separate sensor and no effort from the patient.',
        status: 'evaluating',
      },
      {
        name: 'Skin temperature',
        body: 'Read as a deviation from the wearer’s own baseline rather than as a fever number, because peripheral temperature is not core temperature.',
        status: 'evaluating',
      },
      {
        name: 'Sleep',
        body: 'Duration, timing and fragmentation. How broken the night was is often the earliest thing to change.',
        status: 'evaluating',
      },
      {
        name: 'Activity and movement',
        body: 'Steps, and just as importantly the absence of movement. A person who stopped walking to the kitchen is telling you something.',
        status: 'evaluating',
      },
      {
        name: 'Single-lead ECG',
        body: 'A separate chest band for rhythm strips, intended for patients where rhythm is the question. A second device, not part of the ring.',
        status: 'planned',
      },
    ],
    statusLabels: {
      evaluating: 'In the hardware under evaluation',
      planned: 'Planned',
    },
    note: 'No signal on this list has been validated by us against a clinical reference instrument yet. That work is described below, in Where we are today.',
  },

  status: {
    eyebrow: 'Where we are today',
    h2: 'The honest version, before you ask for it.',
    intro:
      'Most early health startups describe the finished company. Here is the actual one, in July 2026.',
    rows: [
      {
        title: 'Stage: pre-launch',
        body: 'No product is shipping. Nothing on this page is for sale, and there is no waiting list designed to look like demand.',
      },
      {
        title: 'Hardware: under evaluation',
        body: 'We are evaluating ring hardware with a manufacturing partner. The sensor set above is what that hardware reports. We have not committed to a final supplier, and the evaluation may change what the first device measures.',
      },
      {
        title: 'Clinical validation: planned, not done',
        body: 'Before Zista makes any accuracy claim, we intend to run a comparison against reference instruments and publish the method and the results, including the places where we fall short. Until that exists, treat every measurement here as unvalidated.',
      },
      {
        title: 'Regulation: started, not finished',
        body: 'Zista is not a certified medical device and holds no CE, FDA or IMED clearance. We have begun the Iranian regulatory path and are keeping design and risk documentation to a quality-system standard from the start, rather than retrofitting it after the fact.',
      },
      {
        title: 'Team: one founder, hiring',
        body: 'Mahdi Mortazavi leads product and engineering. We are looking for a clinical adviser and a firmware engineer. If that is you, the contact form below reaches him directly.',
      },
    ],
    closing:
      'If you need something you can deploy this quarter, Zista is not it. If you want to shape what gets built, this is the useful moment to talk.',
  },

  paths: {
    eyebrow: 'Choose your path',
    h2: 'Who are you, and what would make this worth your time?',
    intro:
      'Pick the one that fits. The form below opens with your context already filled in, so you only have to write the part that matters.',
    items: [
      {
        value: 'physician',
        title: 'I’m a physician',
        body: 'Tell us what would have to be true before you would trust continuous data in your practice. That answer is currently shaping the product more than anything else.',
        cta: 'Write to us as a clinician',
      },
      {
        value: 'patient',
        title: 'I’m a patient or a family member',
        body: 'Tell us who you are worried about. We will be straight with you about what Zista can and cannot do today, which is less than we intend it to do later.',
        cta: 'Tell us your situation',
      },
      {
        value: 'investor',
        title: 'I want to invest',
        body: 'Pre-seed. We will send the deck, the plan for clinical validation, and the honest list of what could kill this.',
        cta: 'Request the deck',
      },
      {
        value: 'partner',
        title: 'I want to partner or supply',
        body: 'Ring and sensor manufacturing, clinical sites for the validation study, and distribution inside Iran.',
        cta: 'Open a partnership conversation',
      },
    ],
  },

  investors: {
    eyebrow: 'For investors',
    h2: 'The short version.',
    summary: 'Market, wedge, timing, founder and use of funds, without decoration.',
    blocks: [
      {
        title: 'The cost of the status quo',
        body: 'Most of the money spent on chronic disease is not spent in the clinic. It is spent on readmissions and emergency admissions, and a large share of those are preceded by days of change that nobody measured. The status quo is not cheap. It is only invisible.',
      },
      {
        title: 'The wedge: start narrow',
        body: 'Two use cases first. Continuous monitoring for cardiac and respiratory patients in the weeks after discharge, and overnight screening for sleep apnea. Both are conditions where a nightly signal is worth more than a clinic visit, and where the current alternative is either nothing at all or an expensive night in a sleep lab.',
      },
      {
        title: 'Why now',
        body: 'Ring-format sensors became good enough and cheap enough in the last few years. Iranian clinics are digitising their records. And nobody is building this for Persian-speaking patients in their own language, with the family included by design rather than as an afterthought.',
      },
      {
        title: 'The market',
        body: 'Iran: a large population, an ageing cohort growing faster than the health system is, high smartphone use, and a private clinic sector that buys its own tools without waiting for a national procurement cycle. International expansion is a later question, not this one.',
      },
      {
        title: 'What we are raising for',
        body: 'A pre-seed round to finish hardware selection, run the first clinical validation study, and reach a first patient cohort in a single Tehran clinic. Product, not marketing.',
      },
    ],
    founder: {
      name: 'Mahdi Mortazavi',
      role: 'Founder and Product Lead',
      body: 'Product and engineering. Building Zista Health as an independent Iranian company. Reachable directly on Telegram, WhatsApp or by phone, usually within a day.',
    },
    noNumbers:
      'You will not find a market-size figure or a revenue projection on this page, because we are not going to invent one. Ask, and we will send the model along with the sources and assumptions it rests on, so you can disagree with them precisely.',
  },

  faq: {
    eyebrow: 'Questions',
    h2: 'The things people actually ask.',
    items: [
      {
        q: 'Is Zista a medical device?',
        a: 'Zista Health is not a certified medical device. It is a health monitoring platform: it does not diagnose disease and does not replace a clinician’s assessment. Zista holds no CE, FDA or IMED clearance, and its regulatory certification process has been started but is not complete. Any measurement Zista shows is information to discuss with a doctor, not a diagnosis.',
      },
      {
        q: 'What does Zista actually measure?',
        a: 'Zista measures heart rate, heart rate variability, blood oxygen, respiration rate, skin temperature, sleep and movement, using a ring worn day and night. A single-lead ECG chest band is planned as a separate device. The value of Zista is not in any single reading but in how those readings change over days and weeks against a person’s own baseline.',
      },
      {
        q: 'How is Zista different from a smartwatch?',
        a: 'A smartwatch is built for a healthy person who wants to look at their own numbers. Zista Health is built for a patient, their physician and their family at the same time: the same continuous data reaches all three, phrased differently for each, inside an existing clinical relationship rather than as a fitness score. Zista is also designed around a patient who may not want to interact with an app at all.',
      },
      {
        q: 'Is my data private, and who can see it?',
        a: 'With Zista, the patient decides who sees their data. Nothing reaches a physician or a family member until the patient grants that access, and the patient can withdraw it at any time. Zista Health does not sell health data and does not share it with advertisers or insurers.',
      },
      {
        q: 'Does Zista work without an internet connection?',
        a: 'The Zista ring stores measurements on the device and syncs when a phone is in range, so short gaps in connectivity do not lose data. Live alerts do require a connection. Zista is being designed for intermittent connectivity because that is the normal condition across much of Iran, not an edge case.',
      },
      {
        q: 'Can Zista predict a heart attack or detect a disease?',
        a: 'No. Zista does not predict, detect or diagnose any disease, and any consumer product claiming otherwise should be read very carefully. Zista measures physiological signals continuously and flags when they drift away from a person’s own baseline. What that drift means is a clinical question, and it belongs to a doctor.',
      },
      {
        q: 'Can I buy Zista? Is it available yet?',
        a: 'Not yet. Zista Health is pre-launch: the hardware is under evaluation with a manufacturing partner, clinical validation is planned but not done, and nothing is for sale. Anyone who wants to be part of the first patient cohort can contact the founder directly.',
      },
      {
        q: 'What does Zista cost?',
        a: 'Zista has no price, because Zista has no product to sell yet. Pricing will be set after hardware selection and clinical validation are finished, and it will be published on this page when it exists.',
      },
      {
        q: 'Does a family member see everything?',
        a: 'No. In Zista, a family member sees only what the patient has chosen to share, and the default is a simple status rather than raw medical data. The point is to answer the question “does today look like last week” without turning a relative into a medical record.',
      },
      {
        q: 'Who is behind Zista, and is it related to Zista Pharma?',
        a: 'Zista Health was founded by Mahdi Mortazavi, who leads product and engineering. Zista Health is an independent Iranian health-technology company and has no connection to Zista Pharma or to any other similarly named business.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    h2: 'Talk to the person building it.',
    intro:
      'There is no sales team. Messages go straight to the founder’s phone, and are usually answered the same day.',
    channelsLabel: 'Direct channels',
    formLabel: 'Or write a few lines',
    progress: 'Step 2 of 3',
    fields: {
      name: 'Your name',
      namePlaceholder: 'What should we call you?',
      reach: 'How to reach you',
      reachPlaceholder: 'Phone, email or Telegram handle',
      role: 'I am a…',
      message: 'What would you like to say?',
      messagePlaceholder:
        'A few lines is enough. What you need, or what you would want to know first.',
    },
    roles: [
      { value: 'physician', label: 'Physician or clinician' },
      { value: 'patient', label: 'Patient or family member' },
      { value: 'investor', label: 'Investor' },
      { value: 'partner', label: 'Partner or supplier' },
      { value: 'other', label: 'Something else' },
    ],
    submit: 'Send',
    sending: 'Sending…',
    success:
      'Sent. It is on the founder’s phone now. You will normally hear back within a day.',
    error: 'That did not go through. Send it as an email instead:',
    required: 'Name, a way to reach you, and a message. That is all we need.',
    mailtoFallback: 'Email it instead',
    consent:
      'What you write here is forwarded to the founder and stored so it is not lost. Nothing else. No tracking, no mailing list.',
    onePager: { label: 'Partnership one-pager', href: '/en/one-pager/' },
    founderLine: 'Mahdi Mortazavi · Founder and Product Lead · Tehran',
  },

  channels: {
    telegram: { label: 'Telegram @Mahdi_mortazavi1', href: TELEGRAM },
    whatsapp: { label: 'WhatsApp +98 992 927 1926', href: WHATSAPP },
    phone: { label: 'Call +98 992 927 1926', href: PHONE },
    email: { label: 'mahdi.mortazavi.135@gmail.com', href: EMAIL },
    github: { label: 'GitHub Mahdi-mortazavi', href: GITHUB },
  },

  floating: {
    label: 'Quick contact',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    call: 'Call',
  },

  footer: {
    disclaimerFa:
      'زیستا یک سکوی پایش سلامت است. ابزار تشخیص پزشکی نیست و جای ارزیابی حرفه‌ای پزشک را نمی‌گیرد. فرایند اخذ مجوزهای قانونی در جریان است.',
    disclaimerEn:
      'Zista is a health monitoring platform. It is not a diagnostic device and does not replace professional medical assessment. Regulatory certification is in progress.',
    rights: '© 2026 Zista Health. All rights reserved.',
    nameNote:
      'Zista Health is an independent Iranian health-technology company, unrelated to Zista Pharma.',
    links: [
      { label: 'فارسی', href: '/' },
      { label: 'GitHub', href: GITHUB },
      { label: 'Telegram', href: TELEGRAM },
      { label: 'Email', href: EMAIL },
    ],
  },

  onePager: {
    title: 'Zista Health — partnership one-pager',
    subtitle:
      'For manufacturers, clinical sites and distribution partners. Last revised July 2026.',
    print: 'Print or save as PDF',
    back: 'Back to the site',
    sections: [
      {
        title: 'What Zista is',
        body: 'Zista Health is a remote patient monitoring platform being built in Iran. A ring worn day and night measures heart rate, heart rate variability, blood oxygen, respiration, skin temperature, sleep and movement, and delivers the resulting trends to three people at once: the patient, their physician, and one family member the patient chooses. Zista is not a diagnostic device.',
      },
      {
        title: 'Stage',
        body: 'Pre-launch. Ring hardware is under evaluation with a manufacturing partner. No supplier is committed. Clinical validation is planned and not yet done. The Iranian regulatory path has been started. Nothing is for sale.',
      },
      {
        title: 'What we are looking for',
        body: 'Ring and sensor manufacturing at pilot volumes with a path to production. Clinical sites in Tehran willing to host a validation cohort. Distribution partners with reach into private clinics and pharmacies. Firmware and clinical advisory talent.',
      },
      {
        title: 'What a first pilot looks like',
        body: 'A single Tehran clinic, one cohort of discharged cardiac or respiratory patients, ninety days of continuous monitoring, and a written comparison against reference instruments. We publish the method and the results, including the parts that do not go our way.',
      },
      {
        title: 'The wedge',
        body: 'Post-discharge monitoring for cardiac and respiratory patients, and overnight screening for sleep apnea. Both are conditions where a nightly signal is worth more than a clinic visit, and where the current alternative is either nothing or an expensive night in a sleep lab.',
      },
      {
        title: 'Who to talk to',
        body: 'Mahdi Mortazavi, Founder and Product Lead. Telegram @Mahdi_mortazavi1. WhatsApp and phone +98 992 927 1926. Email mahdi.mortazavi.135@gmail.com. GitHub github.com/Mahdi-mortazavi.',
      },
    ],
  },
};

export default en;
