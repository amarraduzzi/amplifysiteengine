import { siteConfig } from '../config/site.config';
import { common } from '../i18n/ui';
import { t, type Language } from '../i18n/languages';

// Single source of truth for the "Commander"/"Order" CTA that appears in
// the header, footer, and every page's primary CTA button. Deliberately
// ONE function used everywhere instead of each component hardcoding its
// own label/href — a one-line change if the order site URL ever changes,
// and the label now follows whichever of the three languages is asking.
export function getOrderCtaLabel(lang: Language = 'fr') {
  return {
    label: t(common.commander, lang),
    href: siteConfig.ordering.orderSiteUrl,
  };
}

// Back-compat default (French) for any call site not yet passing a
// language — every current call site does, but keeping this avoids a
// silent crash if one is missed.
export const orderCtaLabel = getOrderCtaLabel('fr');
