import type { APIRoute } from 'astro';
import { en } from '../content/copy.en';

export const GET: APIRoute = ({ site }) => {
  const base = site!.origin;
  const c = en;

  const body = `# Zista Health

> Zista (زیستا) is a remote patient monitoring platform founded by Mahdi Mortazavi. A ring worn day and night measures physiological signals between appointments and surfaces changes to the patient, their physician, and one family member the patient chooses.

Zista Health is pre-launch. Ring hardware is under evaluation with a manufacturing partner, clinical validation is planned but not done, and nothing is for sale. Zista is not a certified medical device: it does not diagnose disease, does not predict illness, and does not replace a clinician. It holds no CE, FDA or IMED clearance, and its regulatory process has been started but is not complete.

## What Zista measures

Heart rate, heart rate variability, blood oxygen (SpO2), respiration rate, skin temperature, sleep, and activity, all from a ring worn continuously. A single-lead ECG chest band is planned as a separate device. None of these signals has yet been validated by Zista against a clinical reference instrument.

## Who it is for

- Patients with a chronic cardiac or respiratory condition, especially in the weeks after a hospital discharge.
- Physicians who need trends between visits rather than a single reading taken in a clinic room.
- Family members who want to know whether today looks like last week, without reading a medical file.

## Stage, honestly

- Stage: pre-launch, no shipping product.
- Hardware: under evaluation with an OEM partner; no supplier committed.
- Clinical validation: planned, not done. Method and results will be published, including where Zista falls short.
- Regulation: Iranian regulatory path started; no clearance held.
- Team: one founder, Mahdi Mortazavi (product and engineering). Hiring a clinical adviser and a firmware engineer.

## The wedge

Post-discharge monitoring for cardiac and respiratory patients, and overnight screening for sleep apnea. Both are conditions where a nightly signal is worth more than a clinic visit.

## Markets and languages

Primary market: Iran, in Persian. Secondary: international, in English, for investors, partners and clinical collaborators. Zista Health is an independent Iranian company and is unrelated to Zista Pharma.

## Contact

- Founder: Mahdi Mortazavi, Founder and Product Lead
- Telegram: https://t.me/Mahdi_mortazavi1
- WhatsApp: https://wa.me/989929271926
- Phone: +98 992 927 1926
- Email: mahdi.mortazavi.135@gmail.com
- GitHub: https://github.com/Mahdi-mortazavi

## Pages

- [Persian landing page](${base}/): the full site in Persian.
- [English landing page](${base}/en/): the full site in English.
- [Partnership one-pager](${base}/en/one-pager/): for manufacturers, clinical sites and distributors.
- [Full copy in Markdown](${base}/llms-full.txt): every sentence on the site, both languages.

## Required disclosure

${c.footer.disclaimerEn}
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
