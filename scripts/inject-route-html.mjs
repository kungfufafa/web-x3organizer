/**
 * Generates per-route index.html with correct meta + JSON-LD in <head>
 * so crawlers receive SEO data before JavaScript executes.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')
const SITE = 'https://www.x3organizer.com'

const ROUTES = [
  {
    path: '/',
    title: 'X3 Organizer — Agen Travel & Tour Organizer Cirebon',
    description: 'X3 Organizer — agen travel dan tour organizer Cirebon untuk jasa gathering perusahaan, company trip, team building, trip kampus, family trip custom, dan open trip. Konsultasi gratis.',
    image: `${SITE}/images/hero/home-group-travel.jpg`,
  },
  {
    path: '/agen-travel-cirebon',
    title: 'Agen Travel Cirebon & Tour Organizer | X3 Organizer',
    description: 'Agen travel Cirebon terpercaya — X3 Organizer melayani gathering perusahaan, team building, open trip, dan perjalanan grup. Based in Cirebon, Jawa Barat. Konsultasi gratis.',
    image: `${SITE}/images/hero/home-group-travel.jpg`,
  },
  {
    path: '/gathering-perusahaan-cirebon',
    title: 'Gathering Perusahaan Cirebon | Jasa Outing Kantor | X3',
    description: 'Jasa gathering perusahaan Cirebon — outing kantor, company trip, dan event korporat ke Bromo, Batu Malang, Bali. Koordinasi lengkap dari Cirebon.',
    image: `${SITE}/images/services/group-trip.jpg`,
  },
  {
    path: '/destinasi/bromo',
    title: 'Open Trip Bromo & Gathering Bromo | X3 Organizer',
    description: 'Open trip Bromo dan paket gathering perusahaan ke Gunung Bromo — sunrise, jeep tour, koordinasi grup lengkap.',
    image: `${SITE}/images/destinations/bromo.jpg`,
  },
  {
    path: '/destinasi/nusa-penida',
    title: 'Open Trip Nusa Penida | Paket Trip Nusa Penida | X3',
    description: 'Open trip Nusa Penida ke Kelingking, Angel Billabong, dan spot ikonik. Itinerary terencana — bergabung open trip atau private grup.',
    image: `${SITE}/images/packages/nusa-penida.jpg`,
  },
  {
    path: '/destinasi/batu-malang',
    title: 'Paket Wisata Batu Malang Grup & Outing Kantor | X3',
    description: 'Paket wisata Batu Malang untuk grup — outing kantor, gathering perusahaan, trip kampus. Jatim Park, Museum Angkut, udara sejuk.',
    image: `${SITE}/images/destinations/batu-malang.jpg`,
  },
  {
    path: '/destinasi/jogja',
    title: 'Paket Wisata Jogja Grup & Studi Wisata | X3 Organizer',
    description: 'Trip kampus dan studi wisata ke Jogja — Malioboro, Borobudur, Lava Tour Merapi. Paket grup dari X3 Organizer.',
    image: `${SITE}/images/destinations/jogja.jpg`,
  },
  {
    path: '/destinasi/lombok',
    title: 'Paket Wisata Lombok Grup & Open Trip | X3 Organizer',
    description: 'Open trip dan paket wisata Lombok untuk grup — Pantai Mawun, Tanjung Aan, Gili. Hubungi X3 Organizer.',
    image: `${SITE}/images/destinations/lombok.jpg`,
  },
  {
    path: '/destinasi/banyuwangi',
    title: 'Trip Banyuwangi & Kawah Ijen | Open Trip | X3',
    description: 'Open trip Banyuwangi — Kawah Ijen sunrise, Baluran, Plengkung. Paket trip grup dari X3 Organizer.',
    image: `${SITE}/images/destinations/banyuwangi.jpg`,
  },
  {
    path: '/layanan/group-trip',
    title: 'Jasa Gathering Perusahaan & Company Trip | X3 Organizer',
    description: 'Jasa gathering perusahaan dan company trip organizer — outing kantor, tour perusahaan, dan event korporat dengan koordinasi lengkap.',
    image: `${SITE}/images/services/group-trip.jpg`,
  },
  {
    path: '/layanan/team-building',
    title: 'Jasa Team Building Perusahaan & Outbound | X3 Organizer',
    description: 'Jasa team building perusahaan — program outbound, Amazing Race, dan aktivitas kolaborasi untuk memperkuat tim.',
    image: `${SITE}/images/services/team-building.jpg`,
  },
  {
    path: '/layanan/kampus-institusi',
    title: 'Jasa Trip Kampus & Studi Wisata | X3 Organizer',
    description: 'Jasa trip kampus dan studi wisata untuk kelompok besar — trip angkatan, kunjungan institusi, dan wisata edukasi.',
    image: `${SITE}/images/services/kampus-institusi.jpg`,
  },
  {
    path: '/layanan/family-trip',
    title: 'Paket Family Trip Custom | Wisata Keluarga | X3 Organizer',
    description: 'Paket family trip custom sesuai kebutuhan keluarga — destinasi, durasi, dan aktivitas fleksibel.',
    image: `${SITE}/images/services/family-trip.jpg`,
  },
  {
    path: '/layanan/open-trip',
    title: 'Open Trip Indonesia Terencana | X3 Organizer',
    description: 'Open trip ke destinasi populer — Bromo, Nusa Penida, Bali, dan lainnya. Transportasi, akomodasi, dan itinerary sudah tersedia.',
    image: `${SITE}/images/services/open-trip.jpg`,
  },
  {
    path: '/layanan',
    title: 'Layanan Agen Travel & Perjalanan Grup | X3 Organizer',
    description: 'Layanan X3 Organizer: jasa gathering perusahaan, team building, trip kampus, family trip custom, dan open trip. Tour organizer Cirebon melayani seluruh Indonesia.',
    image: `${SITE}/images/services/group-trip.jpg`,
  },
  {
    path: '/destinasi',
    title: 'Destinasi Open Trip & Wisata Grup | X3 Organizer',
    description: 'Destinasi favorit: Bromo, Batu Malang, Nusa Penida, Bali, Jogja, Lombok. Open trip dan paket wisata grup dari X3 Organizer Cirebon.',
    image: `${SITE}/images/destinations/bromo.jpg`,
  },
  {
    path: '/paket',
    title: 'Paket Wisata Grup & Gathering | X3 Organizer',
    description: 'Contoh paket perjalanan X3 Organizer — family trip Batu Malang, outing Bromo, open trip Nusa Penida. Agen travel Cirebon untuk trip grup. Konsultasi gratis.',
    image: `${SITE}/images/packages/family-trip-batu-malang.jpg`,
  },
  {
    path: '/paket/family-trip-batu-malang',
    title: 'Paket Family Trip Batu–Malang Edukatif | X3 Organizer',
    description: 'Contoh paket family trip custom 3 hari 2 malam ke Batu dan Malang — wisata edukatif keluarga. Minta penyesuaian via WhatsApp.',
    image: `${SITE}/images/packages/family-trip-batu-malang.jpg`,
  },
  {
    path: '/inspirasi',
    title: 'Inspirasi Perjalanan Instagram, TikTok & Threads | X3 Organizer',
    description: 'Momen perjalanan nyata X3 Organizer di Instagram, TikTok, dan Threads — gathering, team building, open trip. Ikuti @x3organizer dan rencanakan trip serupa via WhatsApp.',
    image: `${SITE}/images/social/gathering-bromo.jpg`,
  },
  {
    path: '/pengalaman',
    title: 'Pengalaman Perjalanan Klien | X3 Organizer',
    description: 'Dokumentasi gathering, team building, dan family trip X3 Organizer. Lihat contoh dan mulai konsultasi.',
    image: `${SITE}/images/experiences/gathering-perusahaan.jpg`,
  },
  {
    path: '/tentang',
    title: 'Tentang X3 Organizer | PT Xthree Navigasi Internasional',
    description: 'X3 Organizer — PT Xthree Navigasi Internasional, agen travel dan tour organizer di Cirebon, Jawa Barat. Gathering, team building, dan trip grup terorganisir.',
    image: `${SITE}/images/hero/tentang-mountains.jpg`,
  },
  {
    path: '/blog',
    title: 'Blog Tips Outing Kantor & Destinasi | X3 Organizer',
    description: 'Artikel outing kantor, panduan destinasi Bromo & Nusa Penida, tips merencanakan perjalanan grup. Blog X3 Organizer Cirebon.',
    image: `${SITE}/images/blog/tips-outing-batu-malang.jpg`,
  },
  {
    path: '/blog/tips-outing-kantor-batu-malang',
    title: 'Tips Outing Kantor Batu Malang — Panduan Lengkap | X3',
    description: 'Tips outing kantor di Batu Malang — panduan praktis merencanakan gathering perusahaan yang lancar di kawasan Batu dan Malang.',
    image: `${SITE}/images/blog/tips-outing-kantor-batu-malang.jpg`,
    type: 'article',
  },
  {
    path: '/blog/panduan-wisata-bromo-2026',
    title: 'Panduan Wisata Bromo 2026 — Open Trip & Gathering | X3',
    description: 'Panduan lengkap wisata Gunung Bromo 2026 — sunrise, jeep tour, open trip Bromo, dan tips gathering perusahaan ke Kawah Bromo.',
    image: `${SITE}/images/blog/panduan-wisata-bromo.jpg`,
    type: 'article',
  },
  {
    path: '/blog/rekomendasi-destinasi-nusa-penida',
    title: 'Rekomendasi Destinasi Nusa Penida — Open Trip | X3',
    description: 'Rekomendasi destinasi wisata Nusa Penida — Kelingking, Angel Billabong, Crystal Bay. Panduan open trip Nusa Penida.',
    image: `${SITE}/images/blog/rekomendasi-nusa-penida.jpg`,
    type: 'article',
  },
  {
    path: '/kontak',
    title: 'Kontak Agen Travel Cirebon | X3 Organizer',
    description: 'Hubungi agen travel Cirebon X3 Organizer — WhatsApp 082241828733. Konsultasi gathering, team building, open trip gratis.',
    image: `${SITE}/images/hero/kontak-office.jpg`,
  },
]

function canonical(path) {
  return path === '/' ? `${SITE}/` : `${SITE}${path}`
}

function injectMeta(html, route) {
  const c = canonical(route.path)
  const ogType = route.type ?? 'website'
  let out = html
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.description}" />`,
  )
  out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${c}" />`)
  out = out.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${route.title}" />`)
  out = out.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${route.description}" />`)
  out = out.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${c}" />`)
  out = out.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${ogType}" />`)
  out = out.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${route.image}" />`)
  out = out.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
  out = out.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
  out = out.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${route.image}" />`)
  return out
}

function outFile(routePath) {
  if (routePath === '/') return join(dist, 'index.html')
  return join(dist, routePath.slice(1), 'index.html')
}

const template = readFileSync(join(dist, 'index.html'), 'utf8')

for (const route of ROUTES) {
  const html = injectMeta(template, route)
  const target = outFile(route.path)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf8')
  console.log('  ✓', route.path)
}

console.log(`Injected meta for ${ROUTES.length} routes.`)
