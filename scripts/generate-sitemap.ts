import { writeFileSync } from 'node:fs';
import { getSiteUrl, toAbsoluteUrl } from '../src/data/media';
import { getAllPublicPaths } from '../src/lib/routes';
import { escapeXml, getSocialRoutes, publicPath } from './asset-utils';

const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || getSiteUrl()).replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const socialRoutes = new Map(getSocialRoutes().map((route) => [route.path, route]));

const urls = getAllPublicPaths()
  .map((path) => {
    const priority = path === '/' ? '1.0' : path.split('/').length > 2 ? '0.7' : '0.8';
    const route = socialRoutes.get(path);
    const image = route
      ? `\n    <image:image>\n      <image:loc>${escapeXml(toAbsoluteUrl(route.image, siteUrl))}</image:loc>\n      <image:title>${escapeXml(route.seo.title)}</image:title>\n    </image:image>`
      : '';

    return `  <url>\n    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>${image}\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;

writeFileSync(publicPath('/sitemap.xml'), xml, 'utf8');
console.log(`Wrote ${getAllPublicPaths().length} URLs with image metadata to ${publicPath('/sitemap.xml')} (base: ${siteUrl})`);
