/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initialPaketTrip, initialBlogArtikel, initialLayanan } from '../data';

export const STATIC_ROUTES = [
  '/',
  '/layanan',
  '/produk',
  '/blog',
  '/tentang-kami',
  '/karir',
  '/syarat-ketentuan',
  '/kebijakan-privasi',
] as const;

export function getAllPublicPaths(): string[] {
  const layananPaths = initialLayanan.filter((l) => l.is_active).map((l) => `/layanan/${l.slug}`);
  const produkPaths = initialPaketTrip
    .filter((p) => p.status === 'published')
    .map((p) => `/produk/${p.slug}`);
  const blogPaths = initialBlogArtikel
    .filter((a) => a.status === 'published')
    .map((a) => `/blog/${a.slug}`);

  return [...STATIC_ROUTES, ...layananPaths, ...produkPaths, ...blogPaths];
}

export function isKnownRoute(path: string): boolean {
  const [pathname] = path.split('?');

  if (STATIC_ROUTES.includes(pathname as (typeof STATIC_ROUTES)[number])) {
    return true;
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '');
    return initialLayanan.some((l) => l.slug === slug && l.is_active);
  }

  if (pathname.startsWith('/produk/') && pathname !== '/produk') {
    const slug = pathname.replace('/produk/', '');
    return initialPaketTrip.some((p) => p.slug === slug && p.status === 'published');
  }

  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const slug = pathname.replace('/blog/', '');
    return initialBlogArtikel.some((a) => a.slug === slug && a.status === 'published');
  }

  return false;
}

export function isNotFoundRoute(path: string): boolean {
  const [pathname] = path.split('?');
  if (pathname === '/') return false;
  return !isKnownRoute(path);
}
