import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Site URL is read from src/config/site.config.ts at content-authoring time,
// but astro.config needs it too (for sitemap + canonical generation). Kept
// as a plain constant here — update this AND site.config.ts's identity.siteUrl
// together when publishing a client (see the big comment at the top of
// site.config.ts for the full per-client checklist).
const SITE_URL = 'https://indianflavors.pages.dev';

export default defineConfig({
  site: SITE_URL,
  // @astrojs/sitemap was tried here but crashes at build time against this
  // Astro version (internal build-hook payload shape mismatch — a known
  // class of issue between the integration and newer Astro releases). For a
  // fixed, small page count like this template, a hand-written static
  // sitemap endpoint (src/pages/sitemap.xml.ts) is more reliable than
  // debugging a third-party integration's internals, and has zero
  // dependency-drift risk going forward.
  integrations: [tailwind({ applyBaseStyles: false })],
  // Static output (no SSR) is deliberate: every page ships as real,
  // pre-rendered HTML with no client-side render step required to see the
  // content. That's what makes this readable by AI crawlers (ChatGPT,
  // Perplexity, Google's AI Overviews) that mostly don't execute JS, and
  // it's the single biggest technical reason this project is Astro and not
  // the same React/Vite stack as the order-landing-page engine.
  output: 'static',
  // FR primary (unprefixed — keeps every existing /menu, /avis, etc. URL
  // exactly as it was, no redirect, no lost SEO equity), EN and AR as
  // opt-in translations under /en/ and /ar/. Mirrors the order-engine's
  // Language type ('fr' | 'ar' | 'en', FR-required/others-optional) but
  // implemented as real, separately-crawlable static pages instead of a
  // client-side toggle — this site's whole architecture is built around
  // being readable by non-JS crawlers (see the `output: 'static'` note
  // above), so a JS-only language switch would quietly undo that for two
  // of the three languages. `getRelativeLocaleUrl` from astro:i18n is what
  // the header's language switcher uses to link between them.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
});
