# Amplify Restaurant Marketing Site

Static, multi-page SEO/marketing site for a restaurant — the companion to
the separate WhatsApp order-landing-page engine (`amplify-menu-engine-boilerplate`).
Same visual family (colors, fonts, header/button behavior), different job:
this site is for being found and trusted (Google, AI answer engines, real
visitors deciding whether to order), the order engine is for the actual
transaction.

## Stack

Astro (static output, no client-side framework runtime) + Tailwind CSS.
Static HTML per page on purpose — see the comment at the top of
`astro.config.mjs` for why that matters for AI-crawler readability.

## Setup

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## The one file you edit per client

`src/config/site.config.ts` — identity, contact info, primary keyword,
colors, and the order-site URL. Read the checklist comment at the top of
that file before publishing a new client; it also covers the two other
content files you'll want to fill with real data:

- `src/content/faq.ts` — FAQ page content + FAQPage structured data
- `src/content/testimonials.ts` — reviews page content + Review structured data
- `src/content/menu-highlights.ts` — display-only menu teaser (NOT the order
  system's full menu — that lives in the order engine's own `menu.ts`)

## Pages

`/` `/menu` `/a-propos` `/avis` `/faq` `/contact` — six pages, deliberately
not more: see the "no keyword cannibalization" note in `site.config.ts` for
why a 7th near-duplicate page (e.g. a separate "Livraison" page) would hurt
more than help.

## Deploy

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Push `dist/` after `npm run build`, or connect the repo and let the host
run the build command.
