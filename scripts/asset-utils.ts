import { existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import sharp from 'sharp';
import { initialBlogArtikel, initialLayanan, initialPaketTrip } from '../src/data';
import { resolvePageSeo } from '../src/lib/seo';
import { getAllPublicPaths } from '../src/lib/routes';
import {
  DEFAULT_SOCIAL_IMAGE,
  FALLBACK_IMAGE,
  REQUIRED_ICON_ASSETS,
  RESPONSIVE_IMAGE_WIDTHS,
  SOCIAL_IMAGE_SIZE,
  SOURCE_MEDIA,
  socialImageForSlug,
} from '../src/data/media';

export const rootDir = new URL('..', import.meta.url).pathname;
export const publicDir = join(rootDir, 'public');

export function publicPath(path: string): string {
  return join(publicDir, path.replace(/^\//, ''));
}

export function routeSlug(path: string): string {
  if (path === '/') return 'x3-organizer-homepage';
  return `x3-organizer${path}`.replace(/\//g, '-').replace(/^-+|-+$/g, '');
}

export function routeSourceImage(path: string): string {
  const [pathname] = path.split('?');

  if (pathname.startsWith('/produk/')) {
    const slug = pathname.replace('/produk/', '');
    return initialPaketTrip.find((item) => item.slug === slug)?.imageUrl ?? DEFAULT_SOCIAL_IMAGE;
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    return initialBlogArtikel.find((item) => item.slug === slug)?.imageUrl ?? DEFAULT_SOCIAL_IMAGE;
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '');
    const service = initialLayanan.find((item) => item.slug === slug);
    if (service?.slug === 'corporate-outing') return '/images/packages/corporate-outing-malang-batu.jpg';
    if (service?.slug === 'family-trip') return '/images/destinations/batu-family-park.jpg';
    if (service?.slug === 'private-trip') return '/images/destinations/nusa-penida-kelingking.jpg';
    return '/images/destinations/bromo-sunrise-jeep.jpg';
  }

  const defaults: Record<string, string> = {
    '/': '/images/destinations/bromo-sunrise-jeep.jpg',
    '/layanan': '/images/destinations/nusa-penida-kelingking.jpg',
    '/produk': '/images/destinations/bromo-sunrise-jeep.jpg',
    '/blog': '/images/destinations/bali-coastal-temple.jpg',
    '/tentang-kami': '/images/packages/corporate-outing-malang-batu.jpg',
    '/karir': '/images/destinations/malang-heritage-riverside.jpg',
    '/syarat-ketentuan': '/images/destinations/bali-coastal-temple.jpg',
    '/kebijakan-privasi': '/images/destinations/bali-coastal-temple.jpg',
  };

  return defaults[pathname] ?? DEFAULT_SOCIAL_IMAGE;
}

export function routeSocialImage(path: string): string {
  return socialImageForSlug(routeSlug(path));
}

export function getSocialRoutes() {
  return getAllPublicPaths().map((path) => ({
    path,
    seo: resolvePageSeo(path),
    image: routeSocialImage(path),
    sourceImage: routeSourceImage(path),
  }));
}

export function getExpectedGeneratedAssets(): string[] {
  const photographic = SOURCE_MEDIA.filter((item) => /\.(jpe?g)$/i.test(item.src));
  const responsive = photographic.flatMap((item) =>
    RESPONSIVE_IMAGE_WIDTHS.flatMap((width) => [
      item.src.replace(/\.jpe?g$/i, `-${width}.webp`),
      item.src.replace(/\.jpe?g$/i, `-${width}.jpg`),
    ]),
  );

  return [
    '/images/brand/x3-organizer-logo.svg',
    '/images/brand/x3-organizer-logo-dark.svg',
    '/images/brand/x3-organizer-logo-light.svg',
    '/images/brand/x3-organizer-mark.svg',
    '/images/brand/x3-organizer-logo.png',
    DEFAULT_SOCIAL_IMAGE,
    FALLBACK_IMAGE,
    ...REQUIRED_ICON_ASSETS,
    ...getSocialRoutes().map((route) => route.image),
    ...responsive,
  ];
}

export async function imageMetadata(path: string) {
  return sharp(publicPath(path)).metadata();
}

export function fileSize(path: string): number {
  return statSync(publicPath(path)).size;
}

export function existsPublic(path: string): boolean {
  return existsSync(publicPath(path));
}

export function fileHash(path: string): string {
  return createHash('sha1').update(statSync(publicPath(path)).size.toString()).digest('hex');
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export { SOCIAL_IMAGE_SIZE };
