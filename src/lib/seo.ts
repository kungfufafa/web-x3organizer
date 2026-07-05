import { IMAGES } from './media'
import { COMPANY } from './company'
import { getSameAsUrls, SITE_URL } from './social'
import { LANDING_PAGES } from './landingPages'
import { SERVICE_FAQS } from './serviceFaqs'

export { SITE_URL }

export interface PageSeo {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  imageType?: string
  type?: 'website' | 'article'
  robots?: string
  structuredDataImage?: string
  noStructuredData?: boolean
  keywords?: string
}

const DEFAULT_OG = `${SITE_URL}${IMAGES.hero.homeGroupTravel}`

const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'X3 Organizer — Agen Travel & Tour Organizer Cirebon',
    description:
      'X3 Organizer — agen travel dan tour organizer Cirebon untuk jasa gathering perusahaan, company trip, team building, trip kampus, family trip custom, dan open trip. Konsultasi gratis.',
    keywords: 'x3 organizer, agen travel cirebon, tour organizer cirebon',
    image: DEFAULT_OG,
    imageAlt: 'X3 Organizer agen travel Cirebon',
  },
  '/agen-travel-cirebon': {
    path: '/agen-travel-cirebon',
    title: 'Agen Travel Cirebon & Tour Organizer | X3 Organizer',
    description:
      `Agen travel Cirebon terpercaya — ${COMPANY.brandName} melayani gathering perusahaan, team building, open trip, dan perjalanan grup. Based in ${COMPANY.cityRegion}. Konsultasi gratis.`,
    keywords: 'agen travel cirebon, tour organizer cirebon, biro perjalanan cirebon',
    image: DEFAULT_OG,
  },
  '/gathering-perusahaan-cirebon': {
    path: '/gathering-perusahaan-cirebon',
    title: 'Gathering Perusahaan Cirebon | Jasa Outing Kantor | X3',
    description:
      'Jasa gathering perusahaan Cirebon — outing kantor, company trip, dan event korporat ke Bromo, Batu Malang, Bali. Koordinasi lengkap dari Cirebon. Konsultasi gratis via WhatsApp.',
    keywords: 'gathering perusahaan cirebon, outing kantor cirebon, company trip cirebon',
    image: `${SITE_URL}${IMAGES.services.groupTrip}`,
  },
  '/layanan': {
    path: '/layanan',
    title: 'Layanan Agen Travel & Perjalanan Grup | X3 Organizer',
    description:
      'Layanan X3 Organizer: jasa gathering perusahaan, team building, trip kampus, family trip custom, dan open trip. Tour organizer Cirebon melayani seluruh Indonesia.',
    image: `${SITE_URL}${IMAGES.services.groupTrip}`,
  },
  '/layanan/group-trip': {
    path: '/layanan/group-trip',
    title: 'Jasa Gathering Perusahaan & Company Trip | X3 Organizer',
    description:
      'Jasa gathering perusahaan dan company trip organizer — outing kantor, tour perusahaan, dan event korporat dengan koordinasi lengkap. Konsultasi gratis via WhatsApp.',
    keywords: 'jasa gathering perusahaan, company trip organizer, outing kantor',
    image: `${SITE_URL}${IMAGES.services.groupTrip}`,
    imageAlt: 'Jasa gathering perusahaan dan company trip',
  },
  '/layanan/team-building': {
    path: '/layanan/team-building',
    title: 'Jasa Team Building Perusahaan & Outbound | X3 Organizer',
    description:
      'Jasa team building perusahaan — program outbound, Amazing Race, dan aktivitas kolaborasi untuk memperkuat tim. Tour organizer Cirebon melayani grup korporat. Konsultasi gratis.',
    keywords: 'jasa team building perusahaan, team building outbound, amazing race perusahaan',
    image: `${SITE_URL}${IMAGES.services.teamBuilding}`,
  },
  '/layanan/kampus-institusi': {
    path: '/layanan/kampus-institusi',
    title: 'Jasa Trip Kampus & Studi Wisata | X3 Organizer',
    description:
      'Jasa trip kampus dan studi wisata untuk kelompok besar — trip angkatan, kunjungan institusi, dan wisata edukasi. Koordinasi aman dan terstruktur. Hubungi X3 Organizer.',
    keywords: 'jasa trip kampus, studi wisata, trip angkatan',
    image: `${SITE_URL}${IMAGES.services.kampusInstitusi}`,
  },
  '/layanan/family-trip': {
    path: '/layanan/family-trip',
    title: 'Paket Family Trip Custom | Wisata Keluarga | X3 Organizer',
    description:
      'Paket family trip custom sesuai kebutuhan keluarga — destinasi, durasi, dan aktivitas fleksibel. Agen travel terpercaya untuk liburan keluarga terencana. Konsultasi gratis.',
    keywords: 'paket family trip custom, family trip custom, tour keluarga',
    image: `${SITE_URL}${IMAGES.services.familyTrip}`,
  },
  '/layanan/open-trip': {
    path: '/layanan/open-trip',
    title: 'Open Trip Indonesia Terencana | X3 Organizer',
    description:
      'Open trip ke destinasi populer — Bromo, Nusa Penida, Bali, dan lainnya. Transportasi, akomodasi, dan itinerary sudah tersedia. Cek jadwal via WhatsApp.',
    keywords: 'open trip indonesia, open trip bromo, open trip nusa penida',
    image: `${SITE_URL}${IMAGES.services.openTrip}`,
  },
  '/destinasi/bromo': {
    path: '/destinasi/bromo',
    title: 'Open Trip Bromo & Gathering Bromo | X3 Organizer',
    description:
      'Open trip Bromo dan paket gathering perusahaan ke Gunung Bromo — sunrise, jeep tour, koordinasi grup lengkap. Private trip custom tersedia. Konsultasi gratis.',
    keywords: 'open trip bromo, paket wisata bromo, gathering bromo',
    image: `${SITE_URL}${IMAGES.destinations.bromo}`,
  },
  '/destinasi/nusa-penida': {
    path: '/destinasi/nusa-penida',
    title: 'Open Trip Nusa Penida | Paket Trip Nusa Penida | X3',
    description:
      'Open trip Nusa Penida ke Kelingking, Angel Billabong, dan spot ikonik. Itinerary terencana — bergabung open trip atau private grup. Hubungi X3 Organizer.',
    keywords: 'open trip nusa penida, trip nusa penida, paket nusa penida',
    image: `${SITE_URL}${IMAGES.packages.nusaPenida}`,
  },
  '/destinasi/batu-malang': {
    path: '/destinasi/batu-malang',
    title: 'Paket Wisata Batu Malang Grup & Outing Kantor | X3',
    description:
      'Paket wisata Batu Malang untuk grup — outing kantor, gathering perusahaan, trip kampus. Jatim Park, Museum Angkut, udara sejuk. Konsultasi via WhatsApp.',
    keywords: 'paket wisata batu malang grup, outing kantor batu malang, gathering batu malang',
    image: `${SITE_URL}${IMAGES.destinations.batuMalang}`,
  },
  '/destinasi/jogja': {
    path: '/destinasi/jogja',
    title: 'Paket Wisata Jogja Grup & Studi Wisata | X3 Organizer',
    description:
      'Trip kampus dan studi wisata ke Jogja — Malioboro, Borobudur, Lava Tour Merapi. Paket grup perusahaan dan institusi dari X3 Organizer Cirebon.',
    keywords: 'paket wisata jogja grup, studi wisata jogja, trip kampus jogja',
    image: `${SITE_URL}${IMAGES.destinations.jogja}`,
  },
  '/destinasi/lombok': {
    path: '/destinasi/lombok',
    title: 'Paket Wisata Lombok Grup & Open Trip | X3 Organizer',
    description:
      'Open trip dan paket wisata Lombok untuk grup — Pantai Mawun, Tanjung Aan, Gili. Family trip dan gathering custom. Hubungi X3 Organizer.',
    keywords: 'open trip lombok, paket wisata lombok grup',
    image: `${SITE_URL}${IMAGES.destinations.lombok}`,
  },
  '/destinasi/banyuwangi': {
    path: '/destinasi/banyuwangi',
    title: 'Trip Banyuwangi & Kawah Ijen | Open Trip | X3',
    description:
      'Open trip Banyuwangi — Kawah Ijen sunrise, blue fire, Baluran, Plengkung. Paket trip grup dari X3 Organizer. Konsultasi gratis.',
    keywords: 'open trip banyuwangi, trip kawah ijen, wisata banyuwangi grup',
    image: `${SITE_URL}${IMAGES.destinations.banyuwangi}`,
  },
  '/paket': {
    path: '/paket',
    title: 'Paket Wisata Grup & Gathering | X3 Organizer',
    description:
      'Contoh paket perjalanan X3 Organizer — family trip Batu Malang, outing Bromo, open trip Nusa Penida. Agen travel Cirebon untuk trip grup. Konsultasi gratis.',
    image: `${SITE_URL}${IMAGES.packages.familyTripBatuMalang}`,
  },
  '/paket/family-trip-batu-malang': {
    path: '/paket/family-trip-batu-malang',
    title: 'Paket Family Trip Batu–Malang Edukatif | X3 Organizer',
    description:
      'Contoh paket family trip custom 3 hari 2 malam ke Batu dan Malang — wisata edukatif keluarga. Minta penyesuaian via WhatsApp.',
    image: `${SITE_URL}${IMAGES.packages.familyTripBatuMalang}`,
  },
  '/destinasi': {
    path: '/destinasi',
    title: 'Destinasi Open Trip & Wisata Grup | X3 Organizer',
    description:
      'Destinasi favorit: Bromo, Batu Malang, Nusa Penida, Bali, Jogja, Lombok. Open trip dan paket wisata grup dari X3 Organizer Cirebon.',
    image: `${SITE_URL}${IMAGES.destinations.bromo}`,
  },
  '/inspirasi': {
    path: '/inspirasi',
    title: 'Inspirasi Perjalanan Instagram, TikTok & Threads | X3 Organizer',
    description:
      'Momen perjalanan nyata X3 Organizer di Instagram, TikTok, dan Threads — gathering, team building, open trip. Ikuti @x3organizer dan rencanakan trip serupa via WhatsApp.',
    keywords: 'x3 organizer instagram, x3 organizer tiktok, x3 organizer threads',
    image: `${SITE_URL}${IMAGES.social.gatheringBromo}`,
  },
  '/mulai': {
    path: '/mulai',
    title: 'Mulai Rencanakan Perjalanan | X3 Organizer',
    description:
      'Langkah cepat memulai perjalanan dengan X3 Organizer — pilih layanan dan konsultasi gratis via WhatsApp.',
    image: DEFAULT_OG,
    robots: 'noindex, follow',
  },
  '/pengalaman': {
    path: '/pengalaman',
    title: 'Pengalaman Perjalanan Klien | X3 Organizer',
    description:
      'Dokumentasi gathering, team building, dan family trip X3 Organizer. Lihat contoh dan mulai konsultasi.',
    image: `${SITE_URL}${IMAGES.experiences.gatheringPerusahaan}`,
  },
  '/tentang': {
    path: '/tentang',
    title: 'Tentang X3 Organizer | PT Xthree Navigasi Internasional',
    description:
      `${COMPANY.brandName} — ${COMPANY.legalName}, agen travel dan tour organizer di ${COMPANY.cityRegion}. Gathering, team building, dan trip grup terorganisir.`,
    image: `${SITE_URL}${IMAGES.hero.tentangMountains}`,
  },
  '/blog': {
    path: '/blog',
    title: 'Blog Tips Outing Kantor & Destinasi | X3 Organizer',
    description:
      'Artikel outing kantor, panduan destinasi Bromo & Nusa Penida, tips merencanakan perjalanan grup. Blog X3 Organizer Cirebon.',
    image: `${SITE_URL}${IMAGES.blog.tipsOutingBatuMalang}`,
  },
  '/blog/tips-outing-kantor-batu-malang': {
    path: '/blog/tips-outing-kantor-batu-malang',
    title: 'Tips Outing Kantor Batu Malang — Panduan Lengkap | X3',
    description:
      'Tips outing kantor di Batu Malang — panduan praktis merencanakan gathering perusahaan yang lancar di kawasan Batu dan Malang. Konsultasi via WhatsApp.',
    keywords: 'tips outing kantor batu malang, outing kantor batu malang, gathering batu malang',
    image: `${SITE_URL}${IMAGES.blog.tipsOutingBatuMalang}`,
    type: 'article',
  },
  '/blog/panduan-wisata-bromo-2026': {
    path: '/blog/panduan-wisata-bromo-2026',
    title: 'Panduan Wisata Bromo 2026 — Open Trip & Gathering | X3',
    description:
      'Panduan lengkap wisata Gunung Bromo 2026 — sunrise, jeep tour, open trip Bromo, dan tips gathering perusahaan ke Kawah Bromo. By X3 Organizer Cirebon.',
    keywords: 'open trip bromo, panduan wisata bromo, gathering bromo',
    image: `${SITE_URL}${IMAGES.blog.panduanWisataBromo}`,
    type: 'article',
  },
  '/blog/rekomendasi-destinasi-nusa-penida': {
    path: '/blog/rekomendasi-destinasi-nusa-penida',
    title: 'Rekomendasi Destinasi Nusa Penida — Open Trip | X3',
    description:
      'Rekomendasi destinasi wisata Nusa Penida — Kelingking, Angel Billabong, Crystal Bay. Panduan open trip Nusa Penida dari X3 Organizer.',
    keywords: 'open trip nusa penida, rekomendasi nusa penida, trip nusa penida',
    image: `${SITE_URL}${IMAGES.blog.rekomendasiNusaPenida}`,
    type: 'article',
  },
  '/kontak': {
    path: '/kontak',
    title: 'Kontak Agen Travel Cirebon | X3 Organizer',
    description:
      `Hubungi agen travel Cirebon ${COMPANY.brandName} — WhatsApp ${COMPANY.phoneDisplay}, ${COMPANY.email}. Ikuti juga @x3organizer di Instagram, TikTok, dan Threads. Konsultasi gathering, team building, open trip gratis.`,
    image: `${SITE_URL}${IMAGES.hero.kontakOffice}`,
  },
}

export const DEFAULT_SEO: PageSeo = {
  path: '/',
  title: 'X3 Organizer — Agen Travel & Tour Organizer Cirebon',
  description:
    'X3 Organizer — agen travel Cirebon untuk gathering perusahaan, team building, trip kampus, family trip, dan open trip. Konsultasi gratis via WhatsApp.',
  image: DEFAULT_OG,
  robots: 'index, follow',
}

export const SITEMAP_PATHS = Object.keys(PAGE_SEO).filter((p) => PAGE_SEO[p].robots !== 'noindex, follow')

const FAQ_SCHEMA = [
  {
    q: 'Apakah perjalanan dapat disesuaikan dengan kebutuhan grup?',
    a: 'Ya. Selain paket yang sudah tersedia, kami juga menerima permintaan perjalanan yang disesuaikan—baik dari sisi destinasi, durasi, aktivitas, maupun anggaran.',
  },
  {
    q: 'Bagaimana cara memulai konsultasi?',
    a: 'Hubungi kami via WhatsApp atau isi form brief perjalanan di halaman Kontak. Ceritakan jenis trip, jumlah peserta, dan destinasi yang Anda inginkan.',
  },
  {
    q: 'Apakah X3 Organizer melayani perusahaan dan institusi di Cirebon?',
    a: 'Ya. Kami berbasis di Cirebon dan melayani perusahaan, kampus, keluarga, serta peserta open trip di Jawa Barat dan seluruh Indonesia.',
  },
  {
    q: 'Apakah X3 Organizer adalah agen travel Cirebon?',
    a: 'Ya. X3 Organizer (PT Xthree Navigasi Internasional) adalah agen travel dan tour organizer di Cirebon yang fokus pada perjalanan grup terorganisir.',
  },
  {
    q: 'Bagaimana mengetahui paket yang sedang tersedia?',
    a: 'Jelajahi halaman Paket dan Destinasi, atau hubungi kami via WhatsApp untuk rekomendasi open trip Bromo, Nusa Penida, dan destinasi lain.',
  },
]

function withAbsoluteImage(seo: PageSeo): PageSeo {
  const image = seo.image ?? DEFAULT_OG
  return {
    ...seo,
    image,
    structuredDataImage: seo.structuredDataImage ?? image,
  }
}

export function resolvePageSeo(path: string): PageSeo {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path || '/'
  const match = PAGE_SEO[normalized]
  if (match) return withAbsoluteImage(match)
  if (LANDING_PAGES[normalized]) {
    const lp = LANDING_PAGES[normalized]
    return withAbsoluteImage({
      ...DEFAULT_SEO,
      path: normalized,
      title: `${lp.h1.slice(0, 50)} | X3 Organizer`,
      description: lp.sub.slice(0, 155),
      image: `${SITE_URL}${lp.image.startsWith('/') ? lp.image : `/${lp.image}`}`,
    })
  }
  return withAbsoluteImage({
    ...DEFAULT_SEO,
    title: 'Halaman Tidak Ditemukan | X3 Organizer',
    description: DEFAULT_SEO.description,
    robots: 'noindex, follow',
  })
}

export function getCanonicalUrl(path: string): string {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path || '/'
  if (normalized === '/') return `${SITE_URL}/`
  return `${SITE_URL}${normalized}`
}

export function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) return imagePath
  return `${SITE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/hero/home-group-travel.jpg`,
    image: `${SITE_URL}${IMAGES.hero.homeGroupTravel}`,
    description:
      'Agen travel dan tour organizer Cirebon — jasa gathering perusahaan, company trip, team building, trip kampus, family trip custom, dan open trip. Aktif di Instagram, TikTok, Threads, YouTube, LinkedIn, dan X.',
    email: COMPANY.email,
    telephone: `+${COMPANY.phoneWa}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: 'Cirebon',
      addressRegion: 'Jawa Barat',
      postalCode: '45141',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    hasMap: COMPANY.googleMapsUrl,
    openingHours: COMPANY.openingHours,
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Cirebon' },
      { '@type': 'AdministrativeArea', name: 'Jawa Barat' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
    sameAs: getSameAsUrls(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${COMPANY.phoneWa}`,
      url: `https://wa.me/${COMPANY.phoneWa}`,
      availableLanguage: ['Indonesian', 'English'],
      areaServed: 'ID',
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.brandName,
    url: `${SITE_URL}/`,
    description: DEFAULT_SEO.description,
    inLanguage: 'id-ID',
    publisher: { '@type': 'Organization', name: COMPANY.brandName },
  }
}

export function getFaqPageSchema(items: { q: string; a: string }[] = FAQ_SCHEMA) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export const BLOG_ARTICLE_META: Record<string, { headline: string; datePublished: string; author: string }> = {
  '/blog/tips-outing-kantor-batu-malang': {
    headline: 'Tips Outing Kantor Batu Malang untuk Perusahaan',
    datePublished: '2025-06-15',
    author: 'Tim X3 Organizer',
  },
  '/blog/panduan-wisata-bromo-2026': {
    headline: 'Panduan Lengkap Wisata Bromo 2026',
    datePublished: '2025-04-03',
    author: 'Tim X3 Organizer',
  },
  '/blog/rekomendasi-destinasi-nusa-penida': {
    headline: 'Rekomendasi Destinasi Wisata Nusa Penida',
    datePublished: '2025-02-18',
    author: 'Tim X3 Organizer',
  },
}

export function getArticleSchema(path: string, seo: PageSeo) {
  const meta = BLOG_ARTICLE_META[path]
  if (!meta) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.headline,
    description: seo.description,
    image: seo.image,
    datePublished: meta.datePublished,
    dateModified: meta.datePublished,
    author: { '@type': 'Organization', name: meta.author, url: `${SITE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.brandName,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/hero/home-group-travel.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': getCanonicalUrl(path) },
    inLanguage: 'id-ID',
  }
}

const SERVICE_PATH_TO_ID: Record<string, string> = {
  '/layanan/group-trip': 'group-trip',
  '/layanan/team-building': 'team-building',
  '/layanan/kampus-institusi': 'kampus-institusi',
  '/layanan/family-trip': 'family-trip',
  '/layanan/open-trip': 'open-trip',
}

const BREADCRUMB_MAP: Record<string, { name: string; path: string }[]> = {
  '/agen-travel-cirebon': [{ name: 'Beranda', path: '/' }, { name: 'Agen Travel Cirebon', path: '/agen-travel-cirebon' }],
  '/gathering-perusahaan-cirebon': [{ name: 'Beranda', path: '/' }, { name: 'Gathering Perusahaan Cirebon', path: '/gathering-perusahaan-cirebon' }],
  '/destinasi/bromo': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Bromo', path: '/destinasi/bromo' }],
  '/destinasi/nusa-penida': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Nusa Penida', path: '/destinasi/nusa-penida' }],
  '/destinasi/batu-malang': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Batu Malang', path: '/destinasi/batu-malang' }],
  '/destinasi/jogja': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Jogja', path: '/destinasi/jogja' }],
  '/destinasi/lombok': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Lombok', path: '/destinasi/lombok' }],
  '/destinasi/banyuwangi': [{ name: 'Beranda', path: '/' }, { name: 'Destinasi', path: '/destinasi' }, { name: 'Banyuwangi', path: '/destinasi/banyuwangi' }],
  '/layanan/group-trip': [{ name: 'Beranda', path: '/' }, { name: 'Layanan', path: '/layanan' }, { name: 'Group Trip', path: '/layanan/group-trip' }],
  '/layanan/team-building': [{ name: 'Beranda', path: '/' }, { name: 'Layanan', path: '/layanan' }, { name: 'Team Building', path: '/layanan/team-building' }],
  '/layanan/kampus-institusi': [{ name: 'Beranda', path: '/' }, { name: 'Layanan', path: '/layanan' }, { name: 'Trip Kampus', path: '/layanan/kampus-institusi' }],
  '/layanan/family-trip': [{ name: 'Beranda', path: '/' }, { name: 'Layanan', path: '/layanan' }, { name: 'Family Trip', path: '/layanan/family-trip' }],
  '/layanan/open-trip': [{ name: 'Beranda', path: '/' }, { name: 'Layanan', path: '/layanan' }, { name: 'Open Trip', path: '/layanan/open-trip' }],
  '/blog/tips-outing-kantor-batu-malang': [{ name: 'Beranda', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Tips Outing Batu Malang', path: '/blog/tips-outing-kantor-batu-malang' }],
  '/blog/panduan-wisata-bromo-2026': [{ name: 'Beranda', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Panduan Bromo 2026', path: '/blog/panduan-wisata-bromo-2026' }],
  '/blog/rekomendasi-destinasi-nusa-penida': [{ name: 'Beranda', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Nusa Penida', path: '/blog/rekomendasi-destinasi-nusa-penida' }],
  '/kontak': [{ name: 'Beranda', path: '/' }, { name: 'Kontak', path: '/kontak' }],
}

export function getPageStructuredData(path: string, seo: PageSeo): object[] {
  const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path || '/'
  const schemas: object[] = [getOrganizationSchema(), getWebSiteSchema()]

  if (normalized === '/') {
    schemas.push(getFaqPageSchema())
  }

  const landing = LANDING_PAGES[normalized]
  if (landing) {
    schemas.push(getFaqPageSchema(landing.faq))
  }

  const serviceId = SERVICE_PATH_TO_ID[normalized]
  if (serviceId && SERVICE_FAQS[serviceId]) {
    schemas.push(getFaqPageSchema(SERVICE_FAQS[serviceId]))
  }

  const article = getArticleSchema(normalized, seo)
  if (article) schemas.push(article)

  const crumbs = BREADCRUMB_MAP[normalized]
  if (crumbs) schemas.push(getBreadcrumbSchema(crumbs))

  return schemas
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  }
}
