/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MediaCategory =
  | 'brand'
  | 'favicon'
  | 'social'
  | 'hero'
  | 'destination'
  | 'package'
  | 'article'
  | 'testimonial'
  | 'decorative'
  | 'structured-data'
  | 'fallback';

export interface MediaAsset {
  id: string;
  src: string;
  category: MediaCategory;
  alt: string;
  purpose: string;
  provenance: string;
  expectedAspectRatio?: number;
  loading?: 'eager' | 'lazy';
}

export const SITE_URL_ENV = 'VITE_SITE_URL';
export const FALLBACK_SITE_URL = 'https://www.x3organizer.com';

export const BRAND_ASSETS = {
  logo: '/images/brand/x3-organizer-logo.png',
  logoSvg: '/images/brand/x3-organizer-logo.svg',
  markSvg: '/images/brand/x3-organizer-mark.svg',
  organizationLogo: '/images/brand/x3-organizer-logo.png',
};

export const DEFAULT_SOCIAL_IMAGE = '/images/seo/x3-organizer-default-og-1200x630.jpg';

export const SOURCE_MEDIA: MediaAsset[] = [
  {
    id: 'logo-master',
    src: '/logo.png',
    category: 'brand',
    alt: 'X3 Organizer',
    purpose: 'Master raster logo currently shipped with the repository.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1,
    loading: 'eager',
  },
  {
    id: 'bromo-sunrise-jeep',
    src: '/images/destinations/bromo-sunrise-jeep.jpg',
    category: 'destination',
    alt: 'Pemandangan matahari terbit Gunung Bromo dengan jeep wisata di area kaldera',
    purpose: 'Bromo destination, open trip hero, package cards, and article imagery.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'bali-coastal-temple',
    src: '/images/destinations/bali-coastal-temple.jpg',
    category: 'destination',
    alt: 'Pura pesisir Bali di tepi laut dengan lanskap tropis',
    purpose: 'Bali destination and final homepage CTA background.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'nusa-penida-kelingking',
    src: '/images/destinations/nusa-penida-kelingking.jpg',
    category: 'destination',
    alt: 'Tebing Kelingking Nusa Penida dengan pantai dan laut biru di bawahnya',
    purpose: 'Nusa Penida destination, private trip, family trip, and article imagery.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'malang-heritage-riverside',
    src: '/images/destinations/malang-heritage-riverside.jpg',
    category: 'destination',
    alt: 'Kawasan heritage Malang di tepi sungai dengan suasana kota bersejarah',
    purpose: 'Malang destination cards and related package context.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'batu-family-park',
    src: '/images/destinations/batu-family-park.jpg',
    category: 'destination',
    alt: 'Area wisata keluarga di Batu dengan suasana taman rekreasi',
    purpose: 'Batu destination, family trip package, and family travel imagery.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'corporate-outing-malang-batu',
    src: '/images/packages/corporate-outing-malang-batu.jpg',
    category: 'package',
    alt: 'Rombongan corporate outing di kawasan Malang Batu',
    purpose: 'Corporate outing package, corporate article, and homepage group travel sections.',
    provenance: 'License/provenance requires owner verification',
    expectedAspectRatio: 1400 / 875,
    loading: 'lazy',
  },
  {
    id: 'bgn-pattern-white',
    src: '/images/patterns/bgn-pattern4-white.png',
    category: 'decorative',
    alt: '',
    purpose: 'Decorative background pattern for dark page heroes.',
    provenance: 'License/provenance requires owner verification',
    loading: 'lazy',
  },
  {
    id: 'avatar-andi-saputra',
    src: '/images/avatars/andi-saputra.svg',
    category: 'testimonial',
    alt: 'Andi Saputra',
    purpose: 'Illustrated testimonial avatar.',
    provenance: 'Programmatic SVG in repository; ownership requires owner verification',
    loading: 'lazy',
  },
  {
    id: 'avatar-keluarga-gunawan',
    src: '/images/avatars/keluarga-gunawan.svg',
    category: 'testimonial',
    alt: 'Keluarga Gunawan',
    purpose: 'Illustrated testimonial avatar.',
    provenance: 'Programmatic SVG in repository; ownership requires owner verification',
    loading: 'lazy',
  },
  {
    id: 'avatar-riana-lestari',
    src: '/images/avatars/riana-lestari.svg',
    category: 'testimonial',
    alt: 'Riana Lestari',
    purpose: 'Illustrated testimonial avatar.',
    provenance: 'Programmatic SVG in repository; ownership requires owner verification',
    loading: 'lazy',
  },
];

export const RESPONSIVE_IMAGE_WIDTHS = [480, 768, 960, 1280] as const;

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
  type: 'image/jpeg',
};

export const REQUIRED_ICON_ASSETS = [
  '/favicon.ico',
  '/favicon.svg',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/site.webmanifest',
];

export const FALLBACK_IMAGE = '/images/fallbacks/x3-organizer-travel-fallback.svg';

export function getSiteUrl(): string {
  const envUrl =
    typeof import.meta !== 'undefined'
      ? (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.[SITE_URL_ENV]
      : undefined;
  return (envUrl || FALLBACK_SITE_URL).replace(/\/$/, '');
}

export function toAbsoluteUrl(path: string, siteUrl = getSiteUrl()): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function socialImageForSlug(slug: string): string {
  return `/images/seo/${slug}-og-1200x630.jpg`;
}

export function routeSlugForPath(path: string): string {
  const [pathname] = path.split('?');
  if (pathname === '/') return 'x3-organizer-homepage';
  return `x3-organizer${pathname}`.replace(/\//g, '-').replace(/^-+|-+$/g, '');
}

export function socialImageForPath(path: string): string {
  return socialImageForSlug(routeSlugForPath(path));
}

export function responsiveImageProps(
  src: string,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
) {
  if (!/\.jpe?g$/i.test(src)) {
    return { src, sizes };
  }

  const jpgSet = RESPONSIVE_IMAGE_WIDTHS.map(
    (width) => `${src.replace(/\.jpe?g$/i, `-${width}.jpg`)} ${width}w`,
  ).join(', ');

  return {
    src,
    srcSet: jpgSet,
    sizes,
    width: 1400,
    height: 875,
  };
}

export function getMediaAlt(src: string, fallback: string): string {
  return SOURCE_MEDIA.find((item) => item.src === src)?.alt ?? fallback;
}
