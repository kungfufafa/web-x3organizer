/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initialPaketTrip, initialBlogArtikel, initialLayanan } from '../data';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
}

const SITE_NAME = 'X3 Organizer';
const ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';

export const DEFAULT_SEO: PageSeo = {
  title: `${SITE_NAME} — Open Trip, Private Trip & Corporate Outing`,
  description:
    'Layanan spesialis perjalanan domestik dan internasional. Paket open trip Bromo, private trip Bali & Nusa Penida, corporate outing Malang-Batu. Booking via WhatsApp 24/7.',
  path: '/',
  type: 'website',
  image: '/logo.png',
};

export function resolvePageSeo(path: string): PageSeo {
  const [pathname, query = ''] = path.split('?');
  const canonicalPath = pathname + (query ? `?${query}` : '');

  if (pathname === '/') return { ...DEFAULT_SEO, path: '/' };

  if (pathname === '/layanan') {
    return {
      title: `Layanan Perjalanan — ${SITE_NAME}`,
      description:
        'Open trip, private trip, corporate outing, dan family trip. Pilih format perjalanan sesuai kebutuhan rombongan dan budget Anda.',
      path: '/layanan',
    };
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '');
    const layanan = initialLayanan.find((l) => l.slug === slug);
    if (layanan) {
      return {
        title: `${layanan.name} — Layanan ${SITE_NAME}`,
        description: layanan.description.slice(0, 155),
        path: canonicalPath,
      };
    }
  }

  if (pathname === '/produk' || pathname.startsWith('/produk')) {
    if (pathname.startsWith('/produk/') && pathname !== '/produk') {
      const slug = pathname.replace('/produk/', '');
      const paket = initialPaketTrip.find((p) => p.slug === slug);
      if (paket) {
        return {
          title: `${paket.name} — Paket Trip ${SITE_NAME}`,
          description: `${paket.summary} Mulai ${paket.price_label}. ${paket.duration_label}.`,
          path: canonicalPath,
          image: paket.imageUrl,
        };
      }
    }
    const dest = query ? new URLSearchParams(query).get('dest') : null;
    const destLabel = dest ? ` di ${dest.replace(/-/g, ' ')}` : '';
    return {
      title: `Katalog Paket Trip${destLabel} — ${SITE_NAME}`,
      description:
        'Temukan paket open trip, private trip, corporate outing, dan family trip. Filter berdasarkan destinasi, durasi, dan harga.',
      path: canonicalPath,
    };
  }

  if (pathname === '/blog') {
    return {
      title: `Blog & Panduan Wisata — ${SITE_NAME}`,
      description:
        'Tips perjalanan, panduan destinasi, dan rekomendasi wisata Bromo, Bali, Nusa Penida, dan Malang dari tim X3 Organizer.',
      path: '/blog',
    };
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    const article = initialBlogArtikel.find((a) => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} — ${SITE_NAME}`,
        description: article.excerpt.slice(0, 155),
        path: canonicalPath,
        type: 'article',
        image: article.imageUrl,
      };
    }
  }

  const staticPages: Record<string, { title: string; description: string }> = {
    '/tentang-kami': {
      title: `Tentang Kami — ${SITE_NAME}`,
      description:
        'PT. X3 Organizer Nusantara — penyedia layanan perjalanan terpercaya dengan armada terstandar, pemandu lokal, dan admin 24/7.',
    },
    '/karir': {
      title: `Karir & Lowongan — ${SITE_NAME}`,
      description: 'Bergabung dengan tim X3 Organizer. Lowongan operasional trip, sales travel, content marketing, dan customer service.',
    },
    '/syarat-ketentuan': {
      title: `Syarat & Ketentuan — ${SITE_NAME}`,
      description: 'Ketentuan pembayaran, jadwal keberangkatan, dan kebijakan pembatalan paket trip X3 Organizer.',
    },
    '/kebijakan-privasi': {
      title: `Kebijakan Privasi — ${SITE_NAME}`,
      description: 'Kebijakan privasi dan perlindungan data pribadi pelanggan X3 Organizer.',
    },
  };

  const staticPage = staticPages[pathname];
  if (staticPage) {
    return { ...staticPage, path: pathname };
  }

  return { ...DEFAULT_SEO, path: canonicalPath };
}

export function getCanonicalUrl(path: string): string {
  const seo = resolvePageSeo(path);
  return `${ORIGIN}${seo.path}`;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: ORIGIN,
    logo: `${ORIGIN}/logo.png`,
    description: DEFAULT_SEO.description,
    telephone: '+62-812-3456-789',
    email: 'cs@x3organizer.com',
    sameAs: [
      'https://www.instagram.com/x3organizer/',
      'https://www.tiktok.com/@x3organizer',
    ],
    areaServed: ['Indonesia'],
  };
}
