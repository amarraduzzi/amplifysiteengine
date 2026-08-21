import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site.config';

// Hand-written static sitemap instead of @astrojs/sitemap (see the comment
// in astro.config.mjs for why). Update this list if pages are added or
// removed — it deliberately stays a flat, explicit array rather than a
// filesystem crawl, so it's obvious at a glance exactly what's in it.
const PAGES = ['/', '/menu', '/a-propos', '/avis', '/faq', '/contact'];

export const GET: APIRoute = () => {
  const base = siteConfig.identity.siteUrl.replace(/\/$/, '');
  const urls = PAGES.map(
    (path) => `  <url>\n    <loc>${base}${path}</loc>\n  </url>`
  ).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
