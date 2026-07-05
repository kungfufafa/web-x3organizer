import { IMAGES } from './media'
import { COMPANY } from './company'

export type LandingConfig = {
  path: string
  eyebrow: string
  h1: string
  sub: string
  image: string
  imageAlt: string
  waMsg: string
  highlights: string[]
  sections?: { heading: string; paragraphs: string[] }[]
  relatedLinks: { label: string; path: string }[]
  faq: { q: string; a: string }[]
}

export const LANDING_PAGES: Record<string, LandingConfig> = {
  '/agen-travel-cirebon': {
    path: '/agen-travel-cirebon',
    eyebrow: `Agen Travel & Tour Organizer · ${COMPANY.cityRegion}`,
    h1: 'Agen Travel Cirebon & Tour Organizer Terpercaya',
    sub: `${COMPANY.brandName} — agen travel dan tour organizer di Cirebon untuk gathering perusahaan, team building, trip kampus, family trip custom, dan open trip ke seluruh Indonesia. Konsultasi gratis via WhatsApp.`,
    image: IMAGES.hero.homeGroupTravel,
    imageAlt: 'Agen travel Cirebon X3 Organizer',
    waMsg: 'Halo X3, saya cari agen travel di Cirebon dan ingin konsultasi perjalanan.',
    highlights: [
      'Berbasis di Cirebon, melayani perusahaan & institusi di Jawa Barat dan nasional',
      'Spesialis perjalanan grup — bukan hanya wisata kota 1 hari',
      'Satu kontak dari konsultasi hingga hari keberangkatan',
      'Transparansi rincian biaya sebelum konfirmasi',
    ],
    sections: [
      {
        heading: 'Layanan Agen Travel Cirebon X3 Organizer',
        paragraphs: [
          `${COMPANY.brandName} bukan sekadar biro tiket — kami adalah tour organizer yang fokus pada perjalanan grup terorganisir. Dari gathering perusahaan dan company trip, team building outbound, trip kampus dan studi wisata, family trip custom, hingga open trip ke destinasi nasional.`,
          `Beroperasi dari ${COMPANY.cityRegion}, kami melayani klien korporat di Cirebon, Jawa Barat, dan seluruh Indonesia. Satu tim koordinator menangani transportasi, akomodasi, itinerary, dan aktivitas lapangan — sehingga HR, GA, atau panitia tidak perlu mengurus detail teknis sendiri.`,
        ],
      },
      {
        heading: 'Mengapa Memilih Tour Organizer Lokal di Cirebon?',
        paragraphs: [
          'Memilih agen travel lokal berarti respons lebih cepat, pertemuan langsung jika diperlukan, dan pemahaman konteks bisnis di Jawa Barat. X3 Organizer hadir sebagai mitra jangka panjang — bukan vendor sekali pakai.',
          'Konsultasi pertama gratis via WhatsApp. Ceritakan jenis perjalanan, jumlah peserta, destinasi, dan kisaran tanggal — tim kami akan merespons dengan rekomendasi dan penawaran yang transparan.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Gathering Perusahaan Cirebon', path: '/gathering-perusahaan-cirebon' },
      { label: 'Jasa Gathering Perusahaan', path: '/layanan/group-trip' },
      { label: 'Team Building', path: '/layanan/team-building' },
      { label: 'Open Trip', path: '/layanan/open-trip' },
    ],
    faq: [
      {
        q: 'Apakah X3 Organizer melayani sebagai agen travel di Cirebon?',
        a: 'Ya. Kami beroperasi dari Cirebon dan melayani klien korporat, kampus, keluarga, serta peserta open trip dengan koordinasi perjalanan lengkap.',
      },
      {
        q: 'Apa bedanya X3 dengan agen wisata lokal Cirebon?',
        a: 'Kami fokus pada perjalanan grup terorganisir — gathering, company trip, team building, dan trip ke destinasi nasional — bukan paket wisata kota semata.',
      },
      {
        q: 'Bagaimana memulai konsultasi?',
        a: `Hubungi kami via WhatsApp ${COMPANY.phoneDisplay} atau halaman Kontak. Ceritakan jenis trip, jumlah peserta, dan destinasi.`,
      },
    ],
  },
  '/gathering-perusahaan-cirebon': {
    path: '/gathering-perusahaan-cirebon',
    eyebrow: 'Gathering & Company Trip · Cirebon',
    h1: 'Jasa Gathering Perusahaan Cirebon yang Terencana',
    sub: 'Rencanakan gathering perusahaan, outing kantor, atau company trip dari Cirebon bersama X3 Organizer. Transportasi, akomodasi, dan aktivitas kelompok kami koordinasikan — Anda fokus pada tim.',
    image: IMAGES.services.groupTrip,
    imageAlt: 'Gathering perusahaan Cirebon',
    waMsg: 'Halo X3, saya butuh jasa gathering perusahaan di Cirebon.',
    highlights: [
      'Outing kantor & company trip untuk HR dan People Team',
      'Destinasi populer: Bromo, Batu Malang, Bali, Jogja',
      'Itinerary disesuaikan tujuan acara dan jumlah peserta',
      'Koordinasi lapangan dari berangkat hingga kembali',
    ],
    sections: [
      {
        heading: 'Solusi Gathering Perusahaan dari Cirebon',
        paragraphs: [
          'Perusahaan di Cirebon dan sekitarnya sering kesulitan mengoordinasikan outing kantor untuk puluhan hingga ratusan karyawan. X3 Organizer hadir sebagai mitra HR dan GA — dari pemilihan destinasi, negosiasi vendor, hingga koordinasi hari H.',
          'Destinasi favorit untuk gathering perusahaan dari Cirebon: Batu–Malang (2–3 hari), Bromo (2D1N), Bali & Nusa Penida (3–4 hari), dan Yogyakarta. Durasi dan budget disesuaikan kebutuhan perusahaan Anda.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Jasa Gathering Perusahaan', path: '/layanan/group-trip' },
      { label: 'Tips Outing Kantor Batu Malang', path: '/blog/tips-outing-kantor-batu-malang' },
      { label: 'Paket Wisata Batu Malang Grup', path: '/destinasi/batu-malang' },
      { label: 'Agen Travel Cirebon', path: '/agen-travel-cirebon' },
    ],
    faq: [
      {
        q: 'Apakah X3 melayani gathering perusahaan di Cirebon?',
        a: 'Ya. Kami membantu perusahaan di Cirebon dan sekitarnya merencanakan gathering, outing kantor, dan company trip ke berbagai destinasi.',
      },
      {
        q: 'Berapa minimal peserta gathering?',
        a: 'Hubungi kami untuk diskusi — kami menangani trip kelompok kecil hingga besar sesuai kebutuhan perusahaan Anda.',
      },
      {
        q: 'Destinasi apa yang sering dipilih untuk outing kantor?',
        a: 'Batu Malang, Bromo, Bali, dan Jogja sering menjadi pilihan. Kami bantu rekomendasikan sesuai budget dan durasi.',
      },
    ],
  },
  '/destinasi/bromo': {
    path: '/destinasi/bromo',
    eyebrow: 'Open Trip & Group Trip · Bromo',
    h1: 'Open Trip Bromo & Outing Perusahaan ke Gunung Bromo',
    sub: 'Open trip Bromo dan paket gathering ke Kawah Bromo — sunrise, jeep tour, dan koordinasi grup lengkap. Cocok untuk company trip, open trip, dan trip kampus.',
    image: IMAGES.destinations.bromo,
    imageAlt: 'Open trip Bromo X3 Organizer',
    waMsg: 'Halo X3, saya tertarik open trip atau gathering ke Bromo.',
    highlights: [
      'Open trip Bromo dengan itinerary terencana',
      'Outing kantor & gathering perusahaan ke Bromo',
      'Koordinasi transportasi, akomodasi, dan aktivitas',
      'Private trip custom untuk grup Anda',
    ],
    relatedLinks: [
      { label: 'Layanan Open Trip', path: '/layanan/open-trip' },
      { label: 'Gathering Perusahaan', path: '/layanan/group-trip' },
      { label: 'Semua Destinasi', path: '/destinasi' },
    ],
    faq: [
      {
        q: 'Apakah ada open trip Bromo?',
        a: 'Hubungi kami via WhatsApp untuk cek jadwal open trip Bromo yang tersedia atau minta private trip untuk grup Anda.',
      },
      {
        q: 'Bisakah outing kantor ke Bromo?',
        a: 'Ya. Bromo populer untuk company trip dan gathering perusahaan. Kami bantu susun itinerary sesuai jumlah peserta.',
      },
    ],
  },
  '/destinasi/nusa-penida': {
    path: '/destinasi/nusa-penida',
    eyebrow: 'Open Trip · Nusa Penida',
    h1: 'Open Trip Nusa Penida — Eksplorasi Terencana',
    sub: 'Open trip Nusa Penida ke Kelingking, Angel Billabong, dan spot ikonik lainnya. Transportasi, akomodasi, dan itinerary sudah terencana — tinggal bergabung atau custom untuk grup.',
    image: IMAGES.packages.nusaPenida,
    imageAlt: 'Open trip Nusa Penida',
    waMsg: 'Halo X3, saya ingin open trip ke Nusa Penida.',
    highlights: [
      'Open trip Nusa Penida dengan grup terjadwal',
      'Family trip & gathering custom ke Nusa Penida',
      'Koordinasi fast boat, transport lokal, dan akomodasi',
      'Itinerary fleksibel sesuai durasi trip',
    ],
    relatedLinks: [
      { label: 'Layanan Open Trip', path: '/layanan/open-trip' },
      { label: 'Family Trip Custom', path: '/layanan/family-trip' },
      { label: 'Paket Nusa Penida', path: '/paket' },
    ],
    faq: [
      {
        q: 'Apakah tersedia open trip Nusa Penida?',
        a: 'Hubungi kami untuk informasi jadwal dan ketersediaan open trip Nusa Penida terbaru.',
      },
      {
        q: 'Bisakah private trip ke Nusa Penida untuk keluarga?',
        a: 'Ya. Selain open trip, kami juga merancang family trip custom ke Nusa Penida dan Bali.',
      },
    ],
  },
  '/destinasi/batu-malang': {
    path: '/destinasi/batu-malang',
    eyebrow: 'Group Trip · Batu & Malang',
    h1: 'Paket Wisata Batu Malang Grup & Outing Kantor',
    sub: 'Paket wisata Batu Malang untuk grup — outing kantor, gathering perusahaan, trip kampus, dan family trip. Jatim Park, Museum Angkut, Bromo dekat, udara sejuk pegunungan.',
    image: IMAGES.destinations.batuMalang,
    imageAlt: 'Paket wisata Batu Malang grup',
    waMsg: 'Halo X3, saya ingin paket wisata Batu Malang untuk grup.',
    highlights: [
      'Outing kantor & gathering ke Batu–Malang',
      'Paket grup untuk perusahaan, kampus, dan keluarga',
      'Contoh program 2–3 hari dengan itinerary jelas',
      'Koordinasi lengkap dari Cirebon & seluruh Indonesia',
    ],
    relatedLinks: [
      { label: 'Tips Outing Kantor Batu Malang', path: '/blog/tips-outing-kantor-batu-malang' },
      { label: 'Family Trip Batu Malang', path: '/paket/family-trip-batu-malang' },
      { label: 'Gathering Perusahaan', path: '/layanan/group-trip' },
    ],
    faq: [
      {
        q: 'Apakah ada paket wisata Batu Malang untuk grup perusahaan?',
        a: 'Ya. Batu Malang populer untuk outing kantor dan gathering. Kami susun paket sesuai jumlah peserta dan durasi.',
      },
      {
        q: 'Berapa lama rekomendasi trip Batu Malang?',
        a: 'Umumnya 2–3 hari 2 malam. Durasi bisa disesuaikan dengan kebutuhan grup Anda.',
      },
    ],
  },
  '/destinasi/jogja': {
    path: '/destinasi/jogja',
    eyebrow: 'Trip Kampus & Studi Wisata · Jogja',
    h1: 'Paket Wisata Jogja Grup & Studi Wisata',
    sub: 'Trip kampus, studi wisata, dan perjalanan grup ke Yogyakarta — Malioboro, Candi Borobudur, Lava Tour Merapi, dan wisata edukatif. Koordinasi lengkap dari X3 Organizer.',
    image: IMAGES.destinations.jogja,
    imageAlt: 'Paket wisata Jogja grup',
    waMsg: 'Halo X3, saya ingin trip kampus atau grup ke Jogja.',
    highlights: [
      'Studi wisata & trip angkatan ke Jogja',
      'Gathering perusahaan & family trip custom',
      'Itinerary edukatif dan rekreasi',
      'Koordinasi transportasi dan akomodasi grup',
    ],
    relatedLinks: [
      { label: 'Jasa Trip Kampus', path: '/layanan/kampus-institusi' },
      { label: 'Gathering Perusahaan', path: '/layanan/group-trip' },
      { label: 'Semua Destinasi', path: '/destinasi' },
    ],
    faq: [
      {
        q: 'Apakah X3 melayani studi wisata ke Jogja?',
        a: 'Ya. Kami membantu kampus dan institusi merencanakan studi wisata ke Jogja dengan itinerary edukatif dan koordinasi grup.',
      },
      {
        q: 'Berapa lama rekomendasi trip Jogja?',
        a: 'Umumnya 2–4 hari tergantung tujuan edukatif dan jumlah destinasi. Durasi disesuaikan kebutuhan institusi atau perusahaan.',
      },
    ],
  },
  '/destinasi/lombok': {
    path: '/destinasi/lombok',
    eyebrow: 'Open Trip & Family Trip · Lombok',
    h1: 'Paket Wisata Lombok Grup & Open Trip',
    sub: 'Paket wisata Lombok untuk grup — Pantai Mawun, Tanjung Aan, Gili Nanggu, dan spot pantai tersembunyi. Open trip, family trip, dan gathering custom.',
    image: IMAGES.destinations.lombok,
    imageAlt: 'Paket wisata Lombok grup',
    waMsg: 'Halo X3, saya tertarik trip ke Lombok.',
    highlights: [
      'Open trip & private trip ke Lombok',
      'Family trip dan gathering perusahaan',
      'Koordinasi fast boat & transport lokal',
      'Itinerary pantai dan budaya Sasak',
    ],
    relatedLinks: [
      { label: 'Layanan Open Trip', path: '/layanan/open-trip' },
      { label: 'Family Trip Custom', path: '/layanan/family-trip' },
      { label: 'Semua Destinasi', path: '/destinasi' },
    ],
    faq: [
      {
        q: 'Apakah ada open trip ke Lombok?',
        a: 'Hubungi kami via WhatsApp untuk cek jadwal open trip Lombok atau minta private trip untuk grup Anda.',
      },
      {
        q: 'Bisakah kombinasi Lombok–Bali?',
        a: 'Ya. Kami bisa merancang itinerary kombinasi Bali dan Lombok sesuai durasi dan budget grup.',
      },
    ],
  },
  '/destinasi/banyuwangi': {
    path: '/destinasi/banyuwangi',
    eyebrow: 'Open Trip · Banyuwangi',
    h1: 'Trip Banyuwangi & Kawah Ijen — Open Trip Grup',
    sub: 'Open trip dan paket wisata Banyuwangi — sunrise Kawah Ijen, api biru, Taman Nasional Baluran, dan Pantai Plengkung. Koordinasi trip grup lengkap.',
    image: IMAGES.destinations.banyuwangi,
    imageAlt: 'Trip Kawah Ijen Banyuwangi',
    waMsg: 'Halo X3, saya ingin trip ke Banyuwangi / Kawah Ijen.',
    highlights: [
      'Sunrise Kawah Ijen & blue fire',
      'Open trip dan private trip grup',
      'Safari Baluran & pantai Plengkung',
      'Koordinasi transportasi dari Cirebon & nasional',
    ],
    relatedLinks: [
      { label: 'Layanan Open Trip', path: '/layanan/open-trip' },
      { label: 'Open Trip Bromo', path: '/destinasi/bromo' },
      { label: 'Semua Destinasi', path: '/destinasi' },
    ],
    faq: [
      {
        q: 'Kapan waktu terbaik ke Kawah Ijen?',
        a: 'Musim kemarau (Mei–Oktober) ideal untuk sunrise dan blue fire. Untuk grup, kami bantu susun jadwal aman dan nyaman.',
      },
      {
        q: 'Apakah cocok untuk company trip?',
        a: 'Ya. Banyuwangi populer untuk adventure trip perusahaan. Kami koordinasikan manifest, transportasi, dan akomodasi grup.',
      },
    ],
  },
}
