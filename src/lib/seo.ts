/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initialPaketTrip, initialBlogArtikel, initialLayanan } from '../data';
import {
  BRAND_ASSETS,
  DEFAULT_SOCIAL_IMAGE,
  SOCIAL_IMAGE_SIZE,
  getSiteUrl,
  socialImageForPath,
  toAbsoluteUrl,
} from '../data/media';
import { isNotFoundRoute } from './routes';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  structuredDataImage?: string;
  robots?: string;
}

const SITE_NAME = 'X3 Organizer';
const ORIGIN = getSiteUrl();

function withSocialImage(seo: PageSeo): PageSeo {
  const image = seo.image ?? socialImageForPath(seo.path);
  return {
    ...seo,
    image,
    imageAlt: seo.imageAlt ?? `${SITE_NAME} — ${seo.title.replace(` — ${SITE_NAME}`, '')}`,
    imageWidth: SOCIAL_IMAGE_SIZE.width,
    imageHeight: SOCIAL_IMAGE_SIZE.height,
    imageType: SOCIAL_IMAGE_SIZE.type,
    structuredDataImage: seo.structuredDataImage ?? image,
  };
}

export const DEFAULT_SEO: PageSeo = {
  title: `${SITE_NAME} — Open Trip, Private Trip & Corporate Outing`,
  description:
    'Layanan spesialis perjalanan domestik dan internasional. Paket open trip Bromo, private trip Bali & Nusa Penida, corporate outing Malang-Batu. Booking via WhatsApp 24/7.',
  path: '/',
  type: 'website',
  image: DEFAULT_SOCIAL_IMAGE,
  imageAlt: 'X3 Organizer — layanan open trip, private trip, corporate outing, dan family trip',
};

export function resolvePageSeo(path: string): PageSeo {
  const [pathname, query = ''] = path.split('?');
  const canonicalPath = pathname + (query ? `?${query}` : '');

  if (pathname === '/') return withSocialImage({ ...DEFAULT_SEO, path: '/', image: socialImageForPath('/') });

  if (pathname === '/layanan') {
    return withSocialImage({
      title: `Layanan Perjalanan — ${SITE_NAME}`,
      description:
        'Open trip, private trip, corporate outing, dan family trip. Pilih format perjalanan sesuai kebutuhan rombongan dan budget Anda.',
      path: '/layanan',
    });
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '');
    const layanan = initialLayanan.find((l) => l.slug === slug);
    if (layanan) {
      return withSocialImage({
        title: `${layanan.name} — Layanan ${SITE_NAME}`,
        description: layanan.description.slice(0, 155),
        path: canonicalPath,
      });
    }
  }

  if (pathname === '/produk' || pathname.startsWith('/produk')) {
    if (pathname.startsWith('/produk/') && pathname !== '/produk') {
      const slug = pathname.replace('/produk/', '');
      const paket = initialPaketTrip.find((p) => p.slug === slug);
      if (paket) {
        return withSocialImage({
          title: `${paket.name} — Paket Trip ${SITE_NAME}`,
          description: `${paket.summary} Mulai ${paket.price_label}. ${paket.duration_label}.`,
          path: canonicalPath,
          structuredDataImage: paket.imageUrl,
        });
      }
    }
    const dest = query ? new URLSearchParams(query).get('dest') : null;
    const destLabel = dest ? ` di ${dest.replace(/-/g, ' ')}` : '';
    return withSocialImage({
      title: `Katalog Paket Trip${destLabel} — ${SITE_NAME}`,
      description:
        'Temukan paket open trip, private trip, corporate outing, dan family trip. Filter berdasarkan destinasi, durasi, dan harga.',
      path: canonicalPath,
    });
  }

  if (pathname === '/blog') {
    return withSocialImage({
      title: `Blog & Panduan Wisata — ${SITE_NAME}`,
      description:
        'Tips perjalanan, panduan destinasi, dan rekomendasi wisata Bromo, Bali, Nusa Penida, dan Malang dari tim X3 Organizer.',
      path: '/blog',
    });
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    const article = initialBlogArtikel.find((a) => a.slug === slug);
    if (article) {
      return withSocialImage({
        title: `${article.title} — ${SITE_NAME}`,
        description: article.excerpt.slice(0, 155),
        path: canonicalPath,
        type: 'article',
        structuredDataImage: article.imageUrl,
      });
    }
  }

  const staticPages: Record<string, { title: string; description: string }> = {
    '/tentang-kami': {
      title: `Tentang Kami — ${SITE_NAME}`,
      description:
        'PT. Xthree Navigasi Internasional — penyedia layanan perjalanan terpercaya dengan armada terstandar, pemandu lokal, dan admin 24/7.',
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
    return withSocialImage({ ...staticPage, path: pathname });
  }

  if (isNotFoundRoute(path)) {
    return withSocialImage({
      title: `Halaman Tidak Ditemukan — ${SITE_NAME}`,
      description: 'Halaman yang Anda cari tidak tersedia. Kembali ke beranda untuk melihat paket open trip, private trip, dan corporate outing.',
      path: pathname,
      robots: 'noindex, follow',
    });
  }

  return withSocialImage({ ...DEFAULT_SEO, path: canonicalPath });
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
    logo: toAbsoluteUrl(BRAND_ASSETS.organizationLogo, ORIGIN),
    image: toAbsoluteUrl(DEFAULT_SOCIAL_IMAGE, ORIGIN),
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

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: ORIGIN,
    description: DEFAULT_SEO.description,
    inLanguage: 'id-ID',
  };
}

export function getFaqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
