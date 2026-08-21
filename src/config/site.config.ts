// ============================================================================
// AMPLIFY MARKETING SITE — site.config.ts
//
// THIS IS THE ONLY FILE YOU EDIT PER CLIENT (together with src/content/faq.ts
// and src/content/testimonials.ts for longer lists). Same philosophy as the
// order-landing-page engine's brand.config.ts: one config object, real
// content, nothing hardcoded in the page templates.
//
// PER-CLIENT PUBLISH CHECKLIST (do all of these, in this order):
//   1. Fill in every field below with the real restaurant's info.
//   2. Update astro.config.mjs's SITE_URL to match identity.siteUrl exactly
//      (sitemap + canonical URLs are generated from astro.config's `site`,
//      NOT from this file — they must match or canonicals will be wrong),
//      AND update the Sitemap: line in public/robots.txt to the same URL.
//   3. Fill src/content/faq.ts and src/content/testimonials.ts with real,
//      client-specific content — do not ship the example FAQ/reviews.
//   4. Replace every image in public/ with real photos (see the "why 100+
//      real photos matter more than any code change" note below).
//   5. Double-check ordering.orderSiteUrl points at the actual deployed
//      order-landing-page (the separate React/Vite project) — every
//      "Commander" CTA on this site links out to that URL.
// ============================================================================

// Small local alias instead of importing the shared LocalizedText type —
// site.config.ts is deliberately the one file with zero imports from the
// rest of the app (see the file banner above), so every other file can
// safely import FROM here without a circular-import risk. Shape is
// identical to src/i18n/languages.ts's LocalizedText on purpose.
interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
}

export interface SiteConfig {
  identity: {
    name: string;
    tagline: LocalizedString;
    city: string;
    country: string;
    siteUrl: string; // must match astro.config.mjs's SITE_URL exactly
    // The primary SERVICE keyword — deliberately WITHOUT the city baked in
    // ("restaurant indien", not "restaurant indien Rabat"). Every page
    // composes it with `city` explicitly (`${primaryKeyword} à ${city}`),
    // exactly once per sentence. Keeping city out of the constant is what
    // stops it from being concatenated in twice in the same title/
    // description — a real bug this template shipped with once already
    // ("restaurant indien Rabat au Rabat"). Match the exact term the local
    // market actually searches, not a rebrand of it ("spa culinaire") — see
    // the standing SEO notes at the bottom of this file. Now LocalizedText
    // because "the term the market actually searches" is a DIFFERENT term
    // per language, not a translation of the French one (an English
    // searcher types "indian restaurant", not a literal rendering of
    // "restaurant indien").
    primaryKeyword: LocalizedString;
  };
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string; // tel: link, digits only with country code
    whatsappNumber: string; // digits only, country code, no + or spaces
    address: string;
    mapsUrl?: string;
    openingHours: LocalizedString;
    // Structured, machine-readable hours for the live "open now / closed"
    // badge (final punch-list item #4) — kept separate from the free-text
    // `openingHours` above on purpose: parsing "13:00 - 23:00" out of a
    // translated sentence at runtime is fragile (format changes per
    // language, e.g. English's "1:00 PM – 11:00 PM"), while these two plain
    // 24h numbers are unambiguous and can't drift out of sync with a
    // wording change. Restaurant is open every day, same hours — if that
    // ever changes to different hours per day, this becomes a per-day
    // structure instead of two flat numbers.
    hours: { open: number; close: number };
    instagramUrl?: string;
    facebookUrl?: string;
  };
  ordering: {
    // The separate order-landing-page deploy (React/Vite engine). Every
    // "Commander" / "Voir le menu et commander" button on this marketing
    // site links out to this URL — this site does not implement ordering
    // itself (see the architecture decision recorded in this project).
    orderSiteUrl: string;
  };
  social: {
    googleReviewsUrl?: string;
    // Real number from the client's Google Business Profile — NOT computed
    // or guessed. Deliberately no googleReviewCount field: only the rating
    // was confirmed, and showing a review count we didn't verify would be
    // exactly the kind of fabricated-looking claim this site has avoided
    // everywhere else (see testimonials.ts's standing note on this).
    googleRating?: string;
  };
}

export const siteConfig: SiteConfig = {
  identity: {
    name: 'Indian Flavors',
    tagline: {
      fr: 'Restaurant indien traditionnel au cœur de Rabat',
      en: 'Traditional Indian restaurant in the heart of Rabat',
      ar: 'مطعم هندي تقليدي في قلب الرباط',
    },
    city: 'Rabat',
    country: 'Maroc',
    siteUrl: 'https://indianflavors.pages.dev',
    primaryKeyword: {
      fr: 'restaurant indien',
      en: 'indian restaurant',
      ar: 'مطعم هندي',
    },
  },
  colors: {
    primary: '#C8102E',
    accent: '#C9A15A',
    background: '#0B0B0C',
  },
  contact: {
    phoneDisplay: '07 74 44 74 44',
    phoneHref: 'tel:+212774447444',
    whatsappNumber: '212774447444',
    address: '29 Jbel El Ayachi, Rabat 10080',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=29+Jbel+El+Ayachi%2C+Rabat+10080',
    openingHours: {
      fr: 'Ouvert tous les jours : 13:00 - 23:00',
      en: 'Open every day: 1:00 PM – 11:00 PM',
      ar: 'مفتوح كل يوم: 13:00 - 23:00',
    },
    hours: { open: 13, close: 23 },
    instagramUrl: 'https://www.instagram.com/indianflavors.ma/',
    facebookUrl: 'https://www.facebook.com/indianflavors.ma/',
  },
  ordering: {
    orderSiteUrl: 'https://indianflavor.pages.dev',
  },
  social: {
    // Cleaned Google Maps place link (session/tracking params stripped —
    // the raw link copied from a browser address bar carries `sca_esv`,
    // `sxsrf`, `ved`, `g_ep` etc. that expire and shouldn't be published).
    // Opens the real Google Business Profile listing, reviews tab included.
    googleReviewsUrl:
      'https://www.google.com/maps/place/Indian+Flavors/@33.9953923,-6.8492066,17z/data=!3m1!4b1!4m6!3m5!1s0xda76dcf6d28c81b:0x30698f416a8579b1!8m2!3d33.9953923!4d-6.8466317!16s%2Fg%2F11vct6q72j',
    googleRating: '4.4',
  },
};

// ----------------------------------------------------------------------------
// STANDING SEO NOTES — read before editing page copy or adding new pages.
// These are the non-negotiable rules the templates in src/pages/ were built
// around; breaking them quietly undoes the SEO work even if the page still
// "looks fine".
//
// 1. Keyword realism: use the term the local market actually types into
//    Google in the H1, body copy, meta title AND meta description of a
//    page — all four, not just one. A clever rebrand of the service name
//    loses the search traffic entirely.
// 2. No keyword cannibalization: never create two pages targeting the same
//    search intent (e.g. a "Commander" page AND a "Livraison" page). This
//    site deliberately has ONE ordering path — every CTA points at
//    ordering.orderSiteUrl — instead of splitting that intent across pages.
// 3. FAQ sections are structural, not decorative: AI answer engines (ChatGPT,
//    Google AI Overviews, Perplexity) pull directly from clearly-formatted
//    question/answer pairs. Every service-relevant page should have one.
// 4. Real photos beat every on-page trick combined. Code cannot manufacture
//    E-E-A-T — only the client uploading 100+ real, original photos of the
//    food and the physical location can. Don't waste time renaming image
//    files to keyword strings or injecting EXIF geodata: Google strips that
//    metadata on upload and it can read as manipulation, not help ranking.
// 5. Review velocity and Google Business Profile completeness (Services
//    section, not Products) are the two highest-leverage local-SEO levers
//    available — and neither is something this codebase can do for you.
//    That's an operating habit for whoever runs the account: reply to every
//    review fast, and ask happy customers to name the dish + city in their
//    review text.
// ----------------------------------------------------------------------------
