import { IMAGES } from './media'

export type BlogPost = {
  slug: string
  path: string
  title: string
  h1: string
  excerpt: string
  tag: string
  date: string
  dateIso: string
  img: string
  sections: { type: 'p' | 'h2'; content: string }[]
  waMsg: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'tips-outing-kantor-batu-malang',
    path: '/blog/tips-outing-kantor-batu-malang',
    title: 'Tips Mengatur Outing Kantor di Batu–Malang',
    h1: 'Tips Outing Kantor Batu Malang untuk Perusahaan',
    excerpt: 'Panduan praktis merencanakan outing perusahaan yang lancar dan berkesan di kawasan Batu dan Malang.',
    tag: 'Group Trip',
    date: '15 Juni 2025',
    dateIso: '2025-06-15',
    img: IMAGES.blog.tipsOutingBatuMalang,
    waMsg: 'Halo X3, saya baca artikel tips outing kantor Batu Malang dan ingin konsultasi.',
    sections: [
      { type: 'p', content: 'Batu dan Malang adalah salah satu destinasi paling populer untuk outing perusahaan di Jawa Timur—dan bukan tanpa alasan. Kawasan ini menawarkan kombinasi udara sejuk, berbagai pilihan aktivitas, dan aksesibilitas yang baik dari berbagai kota.' },
      { type: 'p', content: 'Namun, merencanakan outing untuk puluhan hingga ratusan orang membutuhkan lebih dari sekadar memilih destinasi yang bagus. Koordinasi, timing, dan pemilihan aktivitas yang tepat sangat menentukan apakah outing berjalan lancar atau justru membebani panitia.' },
      { type: 'h2', content: '1. Tentukan Tujuan Outing Terlebih Dahulu' },
      { type: 'p', content: 'Sebelum menentukan destinasi spesifik atau aktivitas, tanyakan: apa yang ingin dicapai dari outing ini? Bonding antar tim? Reward perjalanan? Kombinasi kerja dan rekreasi? Jawaban ini akan sangat mempengaruhi format acara yang paling tepat.' },
      { type: 'h2', content: '2. Sesuaikan Aktivitas dengan Komposisi Peserta' },
      { type: 'p', content: 'Kawasan Batu–Malang menawarkan berbagai pilihan—dari outbound di alam terbuka hingga wisata wahana di Jatim Park, dari cultural tour hingga agrowisata petik apel. Pilih aktivitas yang bisa dinikmati oleh sebagian besar peserta, termasuk mereka yang mungkin tidak terlalu suka aktivitas fisik berat.' },
      { type: 'h2', content: '3. Rencanakan Transportasi dengan Matang' },
      { type: 'p', content: 'Untuk grup besar, koordinasi transportasi adalah salah satu aspek yang paling menentukan kelancaran acara. Pastikan kapasitas kendaraan sesuai, titik kumpul jelas, dan ada rencana cadangan jika ada perubahan jadwal.' },
      { type: 'h2', content: '4. Beri Waktu yang Cukup untuk Setiap Lokasi' },
      { type: 'p', content: 'Salah satu kesalahan umum adalah memasukkan terlalu banyak destinasi dalam satu hari. Hasilnya, peserta terburu-buru di setiap lokasi dan tidak bisa menikmati perjalanan dengan baik. Lebih baik sedikit destinasi tapi dinikmati sepenuhnya.' },
      { type: 'h2', content: '5. Percayakan Koordinasi kepada Tim yang Berpengalaman' },
      { type: 'p', content: 'Merencanakan outing sendiri dari nol membutuhkan waktu dan energi yang tidak sedikit. Bekerja sama dengan tour organizer yang sudah familiar dengan destinasi dan vendor lokal bisa menghemat banyak usaha—dan meminimalkan risiko hal-hal yang tidak terduga.' },
    ],
  },
  {
    slug: 'panduan-wisata-bromo-2026',
    path: '/blog/panduan-wisata-bromo-2026',
    title: 'Panduan Lengkap Wisata Bromo 2026',
    h1: 'Panduan Wisata Bromo 2026 — Open Trip & Gathering Perusahaan',
    excerpt: 'Semua yang perlu Anda ketahui sebelum mengunjungi Gunung Bromo—dari rute, waktu terbaik, hingga tips perjalanan grup.',
    tag: 'Destinasi',
    date: '3 April 2025',
    dateIso: '2025-04-03',
    img: IMAGES.blog.panduanWisataBromo,
    waMsg: 'Halo X3, saya baca panduan wisata Bromo dan tertarik open trip atau gathering ke Bromo.',
    sections: [
      { type: 'p', content: 'Gunung Bromo tetap menjadi destinasi favorit untuk open trip, company trip, dan gathering perusahaan di 2026. Pemandangan sunrise di Penanjakan, kawah Bromo yang aktif, dan padang pasir luas memberikan pengalaman yang sulit dilupakan—asalkan perjalanan terencana dengan baik.' },
      { type: 'h2', content: 'Waktu Terbaik Berkunjung ke Bromo' },
      { type: 'p', content: 'Musim kemarau (April–Oktober) ideal untuk open trip Bromo karena lang cerah dan sunrise lebih konsisten. Hindari peak season libur panjang jika ingin menghindari keramaian. Untuk gathering perusahaan, pertimbangkan weekday untuk pengalaman lebih tenang.' },
      { type: 'h2', content: 'Itinerary Open Trip Bromo yang Umum' },
      { type: 'p', content: 'Program 2 hari 1 malam populer: hari 1 perjalanan ke Probolinggo/Malang dan check-in hotel, dini hari hari 2 jeep tour ke Penanjakan sunrise, kawah Bromo, padang pasir, lalu kembali. Private trip bisa disesuaikan durasi dan aktivitas tambahan seperti Madakaripura atau Coban Pelangi.' },
      { type: 'h2', content: 'Tips untuk Grup Perusahaan' },
      { type: 'p', content: 'Pastikan peserta membawa jaket tebal (suhu di Penanjakan bisa 5–10°C), sepatu nyaman, dan masker untuk debu pasir. Koordinasikan manifest peserta, titik kumpul jeep, dan waktu bangun dini hari agar tidak ada yang tertinggal. Tour organizer berpengalaman akan mengurus logistik ini.' },
      { type: 'h2', content: 'Open Trip vs Private Trip Bromo' },
      { type: 'p', content: 'Open trip cocok untuk individu atau grup kecil yang ingin biaya efisien. Private trip lebih fleksibel untuk gathering perusahaan dengan jumlah peserta besar, branding acara, dan itinerary custom. Hubungi X3 Organizer untuk cek jadwal open trip atau minta penawaran private trip.' },
    ],
  },
  {
    slug: 'rekomendasi-destinasi-nusa-penida',
    path: '/blog/rekomendasi-destinasi-nusa-penida',
    title: 'Rekomendasi Destinasi Wisata Nusa Penida',
    h1: 'Rekomendasi Destinasi Nusa Penida — Panduan Open Trip',
    excerpt: 'Nusa Penida menawarkan pemandangan dramatis yang menjadi favorit banyak traveler—ini tempat yang wajib dikunjungi.',
    tag: 'Destinasi',
    date: '18 Februari 2025',
    dateIso: '2025-02-18',
    img: IMAGES.blog.rekomendasiNusaPenida,
    waMsg: 'Halo X3, saya baca rekomendasi Nusa Penida dan ingin open trip ke sana.',
    sections: [
      { type: 'p', content: 'Nusa Penida adalah pulau di timur Bali yang terkenal dengan tebing dramatic, air laut jernih, dan spot foto ikonik. Open trip Nusa Penida populer untuk traveler solo maupun grup yang ingin pengalaman tropis tanpa repot merencanakan sendiri.' },
      { type: 'h2', content: 'Spot Wajib Kunjungi di Nusa Penida' },
      { type: 'p', content: "Kelingking Beach — tebing T-Rex yang menjadi ikon Nusa Penida. Angel's Billabong & Broken Beach — kolam alami dan lubang batu karang spektakuler. Crystal Bay — snorkeling dan sunset. Atuh Beach dan Diamond Beach — pantai tersembunyi dengan pemandangan menakjubkan." },
      { type: 'h2', content: 'Durasi Trip yang Disarankan' },
      { type: 'p', content: 'Minimal 2 hari 1 malam untuk mengunjungi spot utama tanpa terburu-buru. Program 3 hari 2 malam lebih nyaman untuk grup family trip atau gathering yang ingin tempo santai. Fast boat dari Sanur atau Padang Bai memakan waktu sekitar 45–60 menit.' },
      { type: 'h2', content: 'Tips Open Trip Nusa Penida' },
      { type: 'p', content: 'Jalan di Nusa Penida berkelok dan berbukit—persiapkan obat mabuk perjalanan jika perlu. Bawa sunscreen, topi, dan sepatu anti-slip untuk turun ke pantai. Untuk open trip, pastikan itinerary jelas dan koordinator trip responsif. X3 Organizer mengoordinasikan fast boat, transport lokal, dan akomodasi dalam satu paket.' },
      { type: 'h2', content: 'Open Trip atau Private Trip?' },
      { type: 'p', content: 'Open trip Nusa Penida ideal untuk budget efisien dan bertemu peserta baru. Private trip cocok untuk keluarga besar atau gathering perusahaan yang butuh fleksibilitas jadwal dan aktivitas. Konsultasikan kebutuhan Anda via WhatsApp untuk rekomendasi terbaik.' },
    ],
  },
]

export const BLOG_POST_BY_PATH: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.path, p]),
)
