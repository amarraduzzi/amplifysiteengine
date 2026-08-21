// Shared language plumbing for the trilingual site. Mirrors the
// order-landing-page engine's `Language` type ('fr' | 'ar' | 'en') and its
// LocalizedText convention (fr required, ar/en optional at the type level —
// though for this site we've translated everything, so all three are
// populated everywhere) so the two codebases stay conceptually aligned even
// though the mechanism differs (see astro.config.mjs's i18n comment for why:
// static, crawlable per-language pages here vs. a client-side toggle there).
export type Language = 'fr' | 'ar' | 'en';

export const LANGUAGES: Language[] = ['fr', 'en', 'ar'];

export const LANGUAGE_LABEL: Record<Language, string> = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR',
};

// Native-script self-name — used in the <html lang> switcher's accessible
// label and anywhere we want the language named IN that language rather
// than translated into the current page's language.
export const LANGUAGE_NATIVE_NAME: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export interface LocalizedText {
  fr: string;
  en: string;
  ar: string;
}

export function t(text: LocalizedText, lang: Language): string {
  return text[lang] ?? text.fr;
}

export function isRTL(lang: Language): boolean {
  return lang === 'ar';
}

// Plain-text "→" used inline throughout the site's link labels ("Menu
// complet →", "Lire tous les avis →"...) points the wrong way once the
// page reads right-to-left — this flips it. (The Button.astro CTA arrow is
// a real SVG icon and gets its own CSS mirror instead; see the [dir=rtl]
// rules there.)
export function arrow(lang: Language): string {
  return lang === 'ar' ? '←' : '→';
}

// Given the current URL path and a target language, return the equivalent
// path in that language. FR is unprefixed (the default locale — see
// astro.config.mjs), EN/AR live under /en/ and /ar/. Every page on the site
// exists in all three languages at the same relative path, so this is a
// pure string transform, no lookup table needed.
export function localizedPath(pathname: string, lang: Language): string {
  const stripped = pathname.replace(/^\/(en|ar)(\/|$)/, '/');
  if (lang === 'fr') return stripped;
  return `/${lang}${stripped === '/' ? '' : stripped}`;
}

export function currentLanguage(pathname: string): Language {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  if (pathname.startsWith('/ar/') || pathname === '/ar') return 'ar';
  return 'fr';
}
