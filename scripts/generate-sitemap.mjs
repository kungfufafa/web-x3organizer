#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from static route list.
 * Set SITE_URL for production absolute URLs (e.g. https://x3organizer.com).
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

const staticRoutes = [
  '/',
  '/layanan',
  '/produk',
  '/blog',
  '/tentang-kami',
  '/karir',
  '/syarat-ketentuan',
  '/kebijakan-privasi',
];

const layananSlugs = ['open-trip', 'private-trip', 'corporate-outing', 'family-trip'];
const produkSlugs = [
  'open-trip-bromo-midnight',
  'private-nusa-penida-paradise',
  'corporate-outing-malang-batu',
  'family-trip-batu-malang-edukatif',
  'open-trip-nusa-penida-one-day',
];
const blogSlugs = [
  'panduan-lengkap-wisata-bromo-2026',
  'rekomendasi-destinasi-wisata-nusa-penida',
  'tips-mengatur-outing-kantor-batu-malang',
];

const paths = [
  ...staticRoutes,
  ...layananSlugs.map((s) => `/layanan/${s}`),
  ...produkSlugs.map((s) => `/produk/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
];

const today = new Date().toISOString().slice(0, 10);

const urls = paths
  .map((path) => {
    const loc = siteUrl ? `${siteUrl}${path}` : path;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '/' ? '1.0' : path.includes('/') && path.split('/').length > 2 ? '0.7' : '0.8'}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${paths.length} URLs to ${outPath}${siteUrl ? ` (base: ${siteUrl})` : ' (relative loc — set SITE_URL for production)'}`);
