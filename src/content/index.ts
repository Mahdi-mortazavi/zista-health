import type { Copy, Locale } from './types';
import { fa } from './copy.fa';
import { en } from './copy.en';

export const copies: Record<Locale, Copy> = { fa, en };

export function getCopy(locale: Locale): Copy {
  return copies[locale];
}

/** Locale → public path of the landing page. */
export const HOME: Record<Locale, string> = { fa: '/', en: '/en/' };

export type { Copy, Locale };
