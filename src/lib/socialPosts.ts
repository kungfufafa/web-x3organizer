/**
 * Konten sosial @x3organizer — diperbarui Juli 2026 dari profil Instagram & TikTok resmi.
 * Jalankan `npm run social:fetch` untuk sinkron ulang dengan posting terbaru.
 */
export type SocialPost = {
  id: string
  platform: 'instagram' | 'tiktok'
  postUrl: string
  thumbnailUrl: string
  title: string
  shortCaption: string
  destination?: string
  servicePath?: string
  detailPath?: string
  serviceLabel?: string
  featured?: boolean
  waContext: string
}

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'ig-gathering-service',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/reel/DL4nkAavHIj/',
    thumbnailUrl: '/images/social/ig-gathering-service.jpg',
    title: 'Company & Family Gathering — X3organizer Siap Wujudkan',
    shortCaption:
      'Cari jasa travel untuk company gathering atau family gathering? Tenang, X3organizer siap wujudkan acara seru dan berkesan sesuai budget kamu!',
    servicePath: '/layanan/group-trip',
    detailPath: '/gathering-perusahaan-cirebon',
    serviceLabel: 'Group Trip',
    featured: true,
    waContext: 'gathering perusahaan seperti di Instagram X3',
  },
  {
    id: 'ig-adventure-jeep',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/reel/DKcRDJCvaV0/',
    thumbnailUrl: '/images/social/ig-adventure-jeep.jpg',
    title: 'Pengalaman Baru — Jeep, VW Klasik & Jelajah Alam',
    shortCaption:
      'Masa iya liburan gitu-gitu aja? Saatnya keluar dari rutinitas, coba pengalaman baru mulai dari naik jeep jelajah alam, keliling naik VW klasik.',
    destination: 'Bromo & Jawa Timur',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/bromo',
    serviceLabel: 'Open Trip',
    waContext: 'pengalaman liburan outdoor seperti di Instagram X3',
  },
  {
    id: 'ig-karimunjawa-ypsh',
    platform: 'instagram',
    postUrl: 'https://www.instagram.com/reel/DYwN60lvGcj/',
    thumbnailUrl: '/images/social/ig-karimunjawa-ypsh.jpg',
    title: 'Trip Karimun Jawa Bersama YPSH — Seru & Tak Terlupakan',
    shortCaption:
      'Trip Karimun Jawa bersama rombongan YPSH @sditsabilulhuda_cirebon. Trip seru, asik, menyenangkan yang tidak terlupakan — semoga bisa lanjut di trip berikutnya!',
    destination: 'Karimun Jawa',
    servicePath: '/layanan/kampus-institusi',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Kampus & Institusi',
    waContext: 'trip sekolah ke Karimun Jawa seperti di Instagram X3',
  },
  {
    id: 'tk-karimunjawa-ypsh',
    platform: 'tiktok',
    postUrl: 'https://www.tiktok.com/@x3organizer/video/7643724918206549255',
    thumbnailUrl: '/images/social/tk-karimunjawa-ypsh.jpg',
    title: 'Trip Karimun Jawa Bersama YPSH — Kebersamaan Itu Indah',
    shortCaption:
      'Terimakasih kepada YPSH atas kepercayaannya kepada kami. Next Trip kemana kita? #YPSH #KarimunJawa #Holiday #tripseru #kebersamaanituindah',
    destination: 'Karimun Jawa',
    servicePath: '/layanan/kampus-institusi',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Kampus & Institusi',
    waContext: 'trip Karimun Jawa seperti di TikTok X3',
  },
  {
    id: 'tk-liburan-jogja',
    platform: 'tiktok',
    postUrl: 'https://www.tiktok.com/@x3organizer/video/7575546960950594834',
    thumbnailUrl: '/images/social/tk-liburan-jogja.jpg',
    title: 'Liburan ke Jogja — Jangan Cuma Diem di Rumah!',
    shortCaption:
      'Yakin nihh masa muda kalian cuma diem aja dirumah? Liburan dong biar seruu! #traveljogja #travelsurabaya #traveljawatimur #x3organizer',
    destination: 'Jogja',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Open Trip',
    waContext: 'liburan ke Jogja seperti di TikTok X3',
  },
  {
    id: 'tk-banyuwangi-green-island',
    platform: 'tiktok',
    postUrl: 'https://www.tiktok.com/@x3organizer/video/7557755355032259848',
    thumbnailUrl: '/images/social/tk-banyuwangi-green-island.jpg',
    title: 'Rekomendasi Wisata Banyuwangi — Green Island & Hutan Djawatan',
    shortCaption:
      'Green Island, Banyuwangi — pulau tenang dengan air sebening kaca. Hutan Djawatan — hutan magis ala Narnia. Save & rencanakan trip-mu!',
    destination: 'Banyuwangi',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/banyuwangi',
    serviceLabel: 'Open Trip',
    waContext: 'rekomendasi wisata Banyuwangi seperti di TikTok X3',
  },
]
