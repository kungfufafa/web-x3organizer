/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Layanan, Destinasi, PaketTrip, BlogArtikel } from './types';

const destinationImages = {
  bromo: "/images/destinations/bromo-sunrise-jeep.jpg",
  bali: "/images/destinations/bali-coastal-temple.jpg",
  nusaPenida: "/images/destinations/nusa-penida-kelingking.jpg",
  malang: "/images/destinations/malang-heritage-riverside.jpg",
  batu: "/images/destinations/batu-family-park.jpg"
};

const packageImages = {
  corporateOuting: "/images/packages/corporate-outing-malang-batu.jpg"
};

// 1. Layanan (trip_categories)
export const initialLayanan: Layanan[] = [
  {
    id: 1,
    name: "Open Trip",
    slug: "open-trip",
    sort_order: 1,
    is_active: true,
    summary: "Perjalanan bersama travelers lain untuk menghemat budget dan menambah relasi baru.",
    description: "Nikmati perjalanan seru dengan bergabung bersama kelompok wisata lainnya. Solusi liburan murah, praktis, dan menyenangkan tanpa perlu pusing memikirkan quota minimal atau sewa armada sendirian. Cocok untuk solo traveler, pasangan, atau grup kecil.",
    iconName: "Users"
  },
  {
    id: 2,
    name: "Private Trip",
    slug: "private-trip",
    sort_order: 2,
    is_active: true,
    summary: "Liburan fleksibel, eksklusif, dan nyaman khusus untuk Anda dan orang terdekat.",
    description: "Perjalanan privat yang dirancang khusus untuk Anda, pasangan, atau keluarga tercinta. Anda bebas menentukan tanggal berangkat, destinasi, durasi, dan itinerary perjalanan. Nikmati privasi penuh dan kemewahan berwisata dengan layanan personal sepanjang trip.",
    iconName: "Compass"
  },
  {
    id: 3,
    name: "Corporate Outing",
    slug: "corporate-outing",
    sort_order: 3,
    is_active: true,
    summary: "Program rekreasi & team building perusahaan untuk meningkatkan kerja sama tim.",
    description: "Solusi paket gathering, outing, dan outbound untuk instansi, korporasi, maupun dinas pemerintahan. Dirancang secara profesional dengan mengintegrasikan aktivitas fun games, team building, gala dinner, dan akomodasi berkelas sesuai dengan visi-misi korporate Anda.",
    iconName: "Briefcase"
  },
  {
    id: 4,
    name: "Family Trip",
    slug: "family-trip",
    sort_order: 4,
    is_active: true,
    summary: "Wisata ramah keluarga dengan kenyamanan maksimal dan itinerary yang santai.",
    description: "Perjalanan wisata yang dirancang khusus ramah anak-anak dan lansia. Kami menyediakan penginapan yang bersih, aman, kendaraan yang lapang, serta pilihan destinasi edukatif dan rekreatif dengan pace perjalanan yang santai tanpa membuat lelah anggota keluarga.",
    iconName: "Heart"
  }
];

// 2. Destinasi (destinations)
export const initialDestinasi: Destinasi[] = [
  {
    id: 11,
    name: "Bromo",
    slug: "bromo",
    region: "Jawa Timur",
    summary: "Matahari terbit legendaris di atas kaldera pasir vulkanik Gunung Bromo.",
    description: "Gunung Bromo menyuguhkan pemandangan magis matahari terbit (sunrise) berlatar belakang Gunung Batok dan Gunung Semeru. Petualangan berkendara Jeep 4x4 melintasi lautan pasir, menaiki kawah aktif, serta berfoto di Bukit Teletubbies dan Pasir Berbisik menjadikan destinasi ini ikon wisata dunia.",
    status: "active",
    sort_order: 1,
    imageUrl: destinationImages.bromo
  },
  {
    id: 12,
    name: "Bali",
    slug: "bali",
    region: "Bali",
    summary: "Surga pulau tropis dengan paduan pantai yang eksotis dan budaya yang kental.",
    description: "Pulau Dewata tidak pernah gagal memukau pengunjungnya dengan keragaman pantai pasir putih di selatan, hamparan terasering sawah hijau di Ubud, hingga keagungan pura bersejarah di tepi laut. Sentuhan seni, budaya, dan hospitality kelas dunia membuat liburan di Bali terasa begitu magis.",
    status: "active",
    sort_order: 2,
    imageUrl: destinationImages.bali
  },
  {
    id: 13,
    name: "Nusa Penida",
    slug: "nusa-penida",
    region: "Bali",
    summary: "Tebing karang spektakuler dan pantai perawan di lepas pantai tenggara Bali.",
    description: "Nusa Penida terkenal dengan formasi tebing karang raksasa yang menyerupai dinosaurus T-Rex di Kelingking Beach, kolam infinity alami Angel's Billabong, serta keindahan sunset di Broken Beach. Destinasi impian bagi para pecinta petualangan alam liar dan fotografi lanskap.",
    status: "active",
    sort_order: 3,
    imageUrl: destinationImages.nusaPenida
  },
  {
    id: 14,
    name: "Malang",
    slug: "malang",
    region: "Jawa Timur",
    summary: "Kota bersejarah berhawa sejuk dengan warisan kolonial dan wisata pantai selatan.",
    description: "Malang menyuguhkan suasana perkotaan berhawa sejuk yang tenang, kuliner legendaris yang lezat, serta gugusan pantai selatan yang eksotis seperti Pantai Tiga Warna dan Pantai Sendang Biru. Akses transit utama di Jawa Timur dengan keramahtamahan warganya.",
    status: "active",
    sort_order: 4,
    imageUrl: destinationImages.malang
  },
  {
    id: 15,
    name: "Batu",
    slug: "batu",
    region: "Jawa Timur",
    summary: "Sentra destinasi wisata modern, agrowisata, dan rekreasi keluarga nomor satu.",
    description: "Berada tepat bersebelahan dengan Malang, Kota Wisata Batu adalah pusat rekreasi modern di Jawa Timur. Mulai dari kebun binatang edukatif kelas dunia Jatim Park, Museum Angkut, petik apel organik di kebun raya, hingga paralayang ekstrem di Gunung Banyak.",
    status: "active",
    sort_order: 5,
    imageUrl: destinationImages.batu
  }
];

// 3. Paket Trip (trip_packages)
export const initialPaketTrip: PaketTrip[] = [
  {
    id: 101,
    name: "Open Trip Bromo Midnight Sunrise",
    slug: "open-trip-bromo-midnight",
    type: "Open Trip",
    summary: "Petualangan menyaksikan golden sunrise Bromo, menjelajahi Kawah, Pasir Berbisik dan Bukit Teletubbies dalam satu malam.",
    description: "Bergabunglah bersama ratusan traveler dari seluruh penjuru negeri dalam perjalanan legendaris menyaksikan matahari terbit tercantik di dunia dari puncak Penanjakan Bromo. Kita akan menyisir lautan pasir Bromo menggunakan Jeep 4x4 klasik, mendaki 250 anak tangga menuju bibir kawah aktif, berfoto di rimbunnya savana Bukit Teletubbies, dan mencicipi sensasi menunggangi kuda di tengah badai pasir yang syahdu.",
    duration_label: "1 Hari (Midnight)",
    starting_price: 350000,
    price_label: "Rp 350.000",
    rating: 4.8,
    review_label: "185+ Ulasan verified",
    booking_message: "Halo Admin, saya tertarik untuk ikut Open Trip Bromo Midnight. Mohon informasi ketersediaan kuota tanggal keberangkatan berikutnya.",
    is_featured: true,
    status: "published",
    published_at: "2026-05-01 08:00:00",
    imageUrl: destinationImages.bromo,
    layanan_ids: [1], // Open Trip
    destinasi_ids: [11], // Bromo
    prices: [
      {
        name: "Regular",
        label: "Paket Sharing per Orang",
        price: 350000,
        price_suffix: "/pax",
        min_pax: 1,
        max_pax: 6,
        is_primary: true,
        sort_order: 1
      },
      {
        name: "Promo Berdua",
        label: "Duo Traveler (Hemat Rp20k/pax)",
        price: 330000,
        price_suffix: "/pax",
        min_pax: 2,
        max_pax: 2,
        is_primary: false,
        sort_order: 2
      }
    ],
    features: [
      {
         type: "highlight",
         label: "Golden Sunrise Penanjakan 1",
         description: "Sudut pandang tertinggi menyaksikan panorama Bromo dengan latar Gunung Semeru mengepulkan abu.",
         icon: "Sun",
         sort_order: 1
      },
      {
         type: "highlight",
         label: "Petualangan Hardtop Jeep 4x4",
         description: "Sensasi membelah hamparan Kaldera Lautan Pasir Bromo dengan armada legendaris.",
         icon: "Zap",
         sort_order: 2
      },
      {
         type: "included",
         label: "Transportasi Penjemputan",
         description: "PP dari meeting point Malang/Surabaya (Avanza/Hiace ber-AC).",
         icon: "CheckCircle",
         sort_order: 1
      },
      {
         type: "included",
         label: "Jeep Bromo Exclusive sharing",
         description: "Sharing maksimal 6 orang per Jeep untuk kenyamanan.",
         icon: "CheckCircle",
         sort_order: 2
      },
      {
         type: "included",
         label: "Tiket Masuk TNBTS",
         description: "Sudah include biaya retribusi resmi turis domestik.",
         icon: "CheckCircle",
         sort_order: 3
      },
      {
         type: "included",
         label: "Driver Berpengalaman & BBM",
         description: "Driver handal sekaligus merangkap asisten dokumentasi handphone.",
         icon: "CheckCircle",
         sort_order: 4
      },
      {
         type: "excluded",
         label: "Sewa Kuda di Bromo",
         description: "Bersifat tentatif / opsional jika lelah mendaki kawah.",
         icon: "XCircle",
         sort_order: 1
      },
      {
         type: "excluded",
         label: "Makanan & Pengeluaran Pribadi",
         description: "Sewa jaket, sarung tangan, atau jajan bakso di lautan pasir.",
         icon: "XCircle",
         sort_order: 2
      },
      {
         type: "note",
         label: "Ketentuan Suhu",
         description: "Suhu di puncak Bromo dapat menyentuh 5°C - 12°C. Harap membawa jaket tebal, syal, kupluk, dan masker penahan debu pasir.",
         icon: "Info",
         sort_order: 1
      }
    ],
    itineraries: [
      {
        day_number: 1,
        time: "23.30 - 00.30",
        title: "Penjemputan Peserta",
        description: "Penjemputan peserta di area Kota Malang atau Surabaya (Hotel, Stasiun, Terminal, dll) oleh driver profesional kami.",
        sort_order: 1
      },
      {
        day_number: 1,
        time: "00.30 - 02.30",
        title: "Perjalanan Menuju Pos Jeep",
        description: "Berkendara menggunakan mobil AC menuju transit area Wonokitri / tumpang untuk berpindah ke Jeep Hardtop 4x4.",
        sort_order: 2
      },
      {
        day_number: 1,
        time: "03.00 - 06.00",
        title: "Sunrise Hunting di Penanjakan Bromo",
        description: "Sampai di Penanjakan 1 / Bukit Kingkong. Menanti fajar, menikmati kopi hangat, dan menyaksikan pemandangan sunrise ikonik Bromo.",
        sort_order: 3
      },
      {
        day_number: 1,
        time: "06.00 - 08.00",
        title: "Eksplorasi Kawah Bromo & Pura Luhur Poten",
        description: "Jeep menuruni kaldera pasir. Berjalan kaki atau naik kuda melewati Pura Luhur Poten dan mendaki 250 anak tangga Bromo.",
        sort_order: 4
      },
      {
        day_number: 1,
        time: "08.00 - 09.30",
        title: "Pasir Berbisik & Bukit Savana Teletubbies",
        description: "Sesi foto kreatif bersama Jeep di tengah padang Pasir Berbisik dan menikmati hamparan savana hijau Bukit Teletubbies.",
        sort_order: 5
      },
      {
        day_number: 1,
        time: "10.00 - 12.30",
        title: "Kembali ke Meeting Point",
        description: "Transfer kembali ke basecamp Jeep, beristirahat sejenak, lalu berkendara kembali ke Malang/Surabaya. Trip selesai dengan memori indah.",
        sort_order: 6
      }
    ]
  },
  {
    id: 102,
    name: "Private Trip Nusa Penida Paradise Explorer",
    slug: "private-nusa-penida-paradise",
    type: "Private Trip",
    summary: "Eksplorasi eksklusif pantai barat dan timur Nusa Penida dengan armada pribadi, menginap di resort berpemandangan laut.",
    description: "Nikmati kemewahan berwisata di Nusa Penida tanpa dibatasi waktu orang lain. Dalam trip privat 3 hari 2 malam ini, kami memandu Anda menjelajahi formasi tebing karang Kelingking Beach yang mendunia, berenang di kolam jernih Angel's Billabong, snorkling bersama ikan pari Manta besar di Manta Point, hingga bersantai menyaksikan sunrise di Diamond Beach. Sangat cocok bagi pasangan bulan madu atau keluarga yang ingin berlibur intim.",
    duration_label: "3 Hari 2 Malam",
    starting_price: 1850000,
    price_label: "Rp 1.850.000",
    rating: 4.9,
    review_label: "98+ Ulasan premium",
    booking_message: "Halo Admin, saya tertarik memesan Private Trip Nusa Penida Paradise untuk bulan depan. Tolong buatkan kuotasi privat 4 orang.",
    is_featured: true,
    status: "published",
    published_at: "2026-05-15 10:00:00",
    imageUrl: destinationImages.nusaPenida,
    layanan_ids: [2, 4], // Private Trip, Family Trip
    destinasi_ids: [12, 13], // Bali, Nusa Penida
    prices: [
      {
        name: "Privat 2 Pax",
        label: "Paket Honeymoon (2 Orang)",
        price: 2450000,
        price_suffix: "/pax",
        min_pax: 2,
        max_pax: 2,
        is_primary: false,
        sort_order: 1
      },
      {
        name: "Privat 4-6 Pax",
        label: "Grup Kecil / Keluarga (4-6 Orang)",
        price: 1850000,
        price_suffix: "/pax",
        min_pax: 4,
        max_pax: 6,
        is_primary: true,
        sort_order: 2
      }
    ],
    features: [
      {
        type: "highlight",
        label: "Manta Point Snorkeling",
        description: "Berenang sedekat 2 meter bersama ikan pari raksasa Manta Ray (Manta Birostris) di habitat aslinya.",
        icon: "Droplet",
        sort_order: 1
      },
      {
        type: "highlight",
        label: "Tebing Kelingking Tanpa Antre",
        description: "Akses waktu emas sore hari di Kelingking Beach ketika kerumunan turis satu hari (day-trip) telah pulang ke Bali.",
        icon: "Camera",
        sort_order: 2
      },
      {
        type: "included",
        label: "Tiket Fastboat PP",
        description: "Akses penyeberangan cepat Sanur ke Nusa Penida PP (Executive Class).",
        icon: "CheckCircle",
        sort_order: 1
      },
      {
        type: "included",
        label: "Armada Pribadi & BBM",
        description: "Avanza / Xenia ber-AC modern di Nusa Penida, bensin, dan supir multi-bahasa.",
        icon: "CheckCircle",
        sort_order: 2
      },
      {
        type: "included",
        label: "2 Malam di Beachfront Resort",
        description: "Akomodasi hotel bintang 3/4 dengan kolam renang menghadap ke Selat Badung (termasuk sarapan).",
        icon: "CheckCircle",
        sort_order: 3
      },
      {
        type: "included",
        label: "Tiket Masuk & Snorkeling Kit",
        description: "Pinjam pelampung, kaca snorkeling, fin, dan asuransi penyeberangan laut.",
        icon: "CheckCircle",
        sort_order: 4
      },
      {
        type: "excluded",
        label: "Makan Malam (Dinner)",
        description: "Driver siap mengantar ke restoran tropis / kafe tepi pantai terpopuler.",
        icon: "XCircle",
        sort_order: 1
      },
      {
        type: "excluded",
        label: "Pengeluaran Pribadi",
        description: "Belanja cenderamata, tips opsional untuk pemandu snorkeling lokal.",
        icon: "XCircle",
        sort_order: 2
      }
    ],
    itineraries: [
      {
        day_number: 1,
        time: "07.30 - 09.00",
        title: "Penyeberangan dari Pelabuhan Sanur",
        description: "Registrasi tiket fastboat di Sanur. Berlayar sekitar 40 menit menuju Nusa Penida. Dijemput oleh staf kami setibanya di pelabuhan Penida.",
        sort_order: 1
      },
      {
        day_number: 1,
        time: "09.30 - 15.00",
        title: "Eksplorasi West Coast (Kelingking & Broken Beach)",
        description: "Menuju Tebing Kelingking yang berbentuk kepala dinosaurus. Dilanjutkan makan siang khas Bali dan mengunjungi Broken Beach & Angel's Billabong.",
        sort_order: 2
      },
      {
        day_number: 1,
        time: "15.30 - Check In",
        title: "Santai Sore di Pantai & Check In Resort",
        description: "Check in akomodasi, berenang santai menikmati senja di private beach resort Nusa Penida.",
        sort_order: 3
      },
      {
        day_number: 2,
        time: "08.00 - 12.00",
        title: "Sesi Snorkeling 3 Spot Terbaik",
        description: "Menaiki boat tradisional untuk snorkeling di Manta Point, Gamat Bay, dan Wall Bay Penida bersama asisten selam.",
        sort_order: 4
      },
      {
        day_number: 2,
        time: "13.00 - 17.00",
        title: "Menjelajahi Tebing Palintang & Sunset",
        description: "Eksplorasi tebing tersembunyi Palintang Cliff dan menikmati sunset tropis yang spektakuler.",
        sort_order: 5
      },
      {
        day_number: 3,
        time: "08.00 - 13.00",
        title: "East Coast Quest (Diamond & Atuh Beach)",
        description: "Kunjungan pagi ke Diamond Beach yang eksotis. Berfoto di atas tangga marmer tebing pantai yang megah dan Rumah Pohon Molenteng.",
        sort_order: 6
      },
      {
        day_number: 3,
        time: "14.30 - 16.00",
        title: "Kembali ke Sanur, Bali",
        description: "Supir mengantar kembali ke pelabuhan Nusa Penida. Menaiki Fastboat sore menuju Sanur. Trip eksklusif Anda telah selesai.",
        sort_order: 7
      }
    ]
  },
  {
    id: 103,
    name: "Corporate Outing Malang-Batu Fun Team Building",
    slug: "corporate-outing-malang-batu",
    type: "Corporate Outing",
    summary: "Paket kustom gathering kantor penuh keseruan, outbound game interaktif, menginap di hotel bintang 4 Batu, dan gala dinner meriah.",
    description: "Tingkatkan loyalitas, kerja sama, dan keceriaan tim kerja Anda di sela kesibukan kantor. Paket Corporate Outing Jawa Timur ini menghadirkan perpaduan sempurna antara rekreasi alam sejuk di pegunungan Batu, outbound training interaktif yang dipandu instruktur berpengalaman, petik buah apel segar di kebun raya, serta gala dinner malam yang dilengkapi live music akustik dan penghargaan internal karyawan.",
    duration_label: "2 Hari 1 Malam",
    starting_price: 950000,
    price_label: "Rp 950.000",
    rating: 5.0,
    review_label: "45+ Korporat puas",
    booking_message: "Halo Admin, kami berencana menyelenggarakan gathering kantor di Batu untuk 80 staf. Mohon bantu kirim rancangan itinerary dan proposal harganya.",
    is_featured: true,
    status: "published",
    published_at: "2026-05-20 11:30:00",
    imageUrl: packageImages.corporateOuting,
    layanan_ids: [3], // Corporate Outing
    destinasi_ids: [14, 15], // Malang, Batu
    prices: [
      {
        name: "Min 30 Pax",
        label: "Grup Kantor Kecil (Min 30 Orang)",
        price: 1100000,
        price_suffix: "/pax",
        min_pax: 30,
        max_pax: 50,
        is_primary: false,
        sort_order: 1
      },
      {
        name: "Min 50 Pax",
        label: "Grup Korporat Besar (Min 50 Orang)",
        price: 950000,
        price_suffix: "/pax",
        min_pax: 50,
        max_pax: 200,
        is_primary: true,
        sort_order: 2
      }
    ],
    features: [
      {
        type: "highlight",
        label: "Dynamic Outbound & Games",
        description: "Aktivitas team building seru di alam terbuka pegunungan Batu untuk melatih leadership dan komunikasi.",
        icon: "ShieldAlert",
        sort_order: 1
      },
      {
        type: "highlight",
        label: "Gala Dinner & Acoustic",
        description: "Acara keakraban malam hari eksklusif di aula resort Batu dengan sajian kambing guling tradisional.",
        icon: "Music",
        sort_order: 2
      },
      {
        type: "included",
        label: "Bis Wisata Executive",
        description: "Antar-jemput dari stasiun/bandara Surabaya-Malang PP dengan Bus Pariwisata AC terbaru.",
        icon: "CheckCircle",
        sort_order: 1
      },
      {
        type: "included",
        label: "Resort Bintang 4 di Batu",
        description: "Akomodasi 1 malam twin sharing di hotel terbaik (e.g. Golden Tulip / Amarta Hills).",
        icon: "CheckCircle",
        sort_order: 2
      },
      {
        type: "included",
        label: "Konsumsi Lengkap 5x Kali",
        description: "Termasuk 2x Makan Pagi, 2x Makan Siang buffet, 1x Gala Dinner mewah.",
        icon: "CheckCircle",
        sort_order: 3
      },
      {
        type: "included",
        label: "Fasilitator & Alat Games",
        description: "Games master profesional, sound system outdoor, perijinan lahan outbound, dan banner spanduk.",
        icon: "CheckCircle",
        sort_order: 4
      },
      {
        type: "excluded",
        label: "Video Dokumentasi Drone",
        description: "Tersedia sebagai add-on dokumentasi profesional cinematografik.",
        icon: "XCircle",
        sort_order: 1
      },
      {
        type: "excluded",
        label: "Kebutuhan Tiket Mandiri",
        description: "Tiket pesawat terbang atau kereta dari luar kota menuju meeting point.",
        icon: "XCircle",
        sort_order: 2
      }
    ],
    itineraries: [
      {
        day_number: 1,
        time: "08.00 - 10.00",
        title: "Penjemputan & Perjalanan ke Batu",
        description: "Tim dijemput di Stasiun Malang atau Bandara Surabaya dengan bus eksekutif. Pembagian snack box pagi.",
        sort_order: 1
      },
      {
        day_number: 1,
        time: "10.30 - 12.30",
        title: "Outbound / Team Building di Coban Rondo",
        description: "Ice breaking games, fun outbound, dan kompetisi kelompok interaktif di bawah rimbunnya hutan pinus air terjun Coban Rondo Batu.",
        sort_order: 2
      },
      {
        day_number: 1,
        time: "13.00 - 15.00",
        title: "Makan Siang & Check In Hotel",
        description: "Makan siang kuliner tradisional khas Jawa. Check-in di bintang 4 resort Batu. Waktu istirahat pribadi.",
        sort_order: 3
      },
      {
        day_number: 1,
        time: "19.00 - 22.00",
        title: "Gala Dinner Keakraban",
        description: "Sajian BBQ & Buffet istimewa, perform musik akustik karyawan, pemutaran video dokumentasi kilas balik hari pertama, sesi apresiasi.",
        sort_order: 4
      },
      {
        day_number: 2,
        time: "07.00 - 08.30",
        title: "Sarapan Pagi & Trekking Ringan",
        description: "Sarapan sehat menghirup udara bersih pegunungan, pemanasan, dan jalan santai di sekitar taman hotel.",
        sort_order: 5
      },
      {
        day_number: 2,
        time: "09.00 - 12.00",
        title: "Agrowisata Petik Apel & Oleh-Oleh",
        description: "Mengunjungi perkebunan apel Batu, memetik dan memakan langsung apel organic segar sepuasnya di dahan pohon. Singgah di pusat oleh-oleh khas Malang.",
        sort_order: 6
      },
      {
        day_number: 2,
        time: "13.00 - 15.00",
        title: "Transfer Drop Point & Selesai",
        description: "Makan siang bersama sebelum diantar kembali menuju stasiun / bandara. Program outing sukses usai dengan semangat baru.",
        sort_order: 7
      }
    ]
  },
  {
    id: 104,
    name: "Family Trip Batu Malang Edukatif",
    slug: "family-trip-batu-malang-edukatif",
    type: "Family Trip",
    summary: "Liburan ramah anak dan keluarga menyusuri Museum Angkut, Jatim Park 3, kebun binatang konservasi, dan akomodasi sejuk.",
    description: "Hilangkan penat di akhir pekan dengan mengajak buah hati dan keluarga besar menjelajahi pusat rekreasi modern terbaik di Indonesia. Kami mengemas tur yang santai tanpa lelah, mengendarai MVP premium lapang ber-AC yang nyaman, menyisir pesona kreativitas Museum Angkut dengan ratusan koleksi mobil antik, berinteraksi langsung dengan dinosaurus raksasa bersuara di Dino Park (Jatim Park 3), serta bermalam di hotel bernuansa sejuk nan asri.",
    duration_label: "3 Hari 2 Malam",
    starting_price: 1250000,
    price_label: "Rp 1.250.000",
    rating: 4.7,
    review_label: "75+ Keluarga bahagia",
    booking_message: "Halo Admin, kami ingin memesan Family Trip Batu Malang untuk 6 orang (4 dewasa, 2 anak). Tolong buatkan estimasi tanggal 15 Juni.",
    is_featured: false,
    status: "published",
    published_at: "2026-05-22 14:00:00",
    imageUrl: destinationImages.batu,
    layanan_ids: [4, 2], // Family Trip, Private Trip
    destinasi_ids: [14, 15], // Malang, Batu
    prices: [
      {
        name: "Keluarga 4 Orang",
        label: "Paket Intim Keluarga (4 Orang)",
        price: 1450000,
        price_suffix: "/pax",
        min_pax: 4,
        max_pax: 4,
        is_primary: false,
        sort_order: 1
      },
      {
        name: "Keluarga 6-8 Orang",
        label: "Keluarga Besar (6-8 Orang)",
        price: 1250000,
        price_suffix: "/pax",
        min_pax: 6,
        max_pax: 8,
        is_primary: true,
        sort_order: 2
      }
    ],
    features: [
      {
        type: "highlight",
        label: "Dinosaur Park Jatim Park 3",
        description: "Kelilingi replika dinosaurus megah berukuran asli yang dapat bergerak dan bersuara edukatif bagi anak-anak.",
        icon: "Award",
        sort_order: 1
      },
      {
        type: "highlight",
        label: "Spot Foto Museum Angkut",
        description: "Menjelajahi replika zona sejarah dunia dan berfoto ria bersama berbagai mobil antik nan langka asal Eropa-Amerika.",
        icon: "Camera",
        sort_order: 2
      },
      {
        type: "included",
        label: "Private MVP Car AC PP",
        description: "Penjemputan dan armada khusus keluarga (Innova Reborn / Avanza Baru) ber-AC wangi dan nyaman.",
        icon: "CheckCircle",
        sort_order: 1
      },
      {
        type: "included",
        label: "Hotel Keluarga 2 Malam",
        description: "Kamar tipe family room atau sambungan (connecting) di hotel bersuhu sejuk pegunungan Batu.",
        icon: "CheckCircle",
        sort_order: 2
      },
      {
        type: "included",
        label: "All Access Tiket Wisata",
        description: "Sudah mencakup tiket terusan Museum Angkut dan Dino Park (Jatim Park 3) tanpa ribet antre online.",
        icon: "CheckCircle",
        sort_order: 3
      },
      {
        type: "included",
        label: "Makan Pagi Hotel & Driver Wisata",
        description: "Driver ramah anak yang multi-fungsi sebagai perancang dokumentasi keluarga.",
        icon: "CheckCircle",
        sort_order: 4
      },
      {
        type: "excluded",
        label: "Makan Siang & Malam",
        description: "Supir siap mengantar ke pusat kuliner legendaris Batu Malang seperti bakso presiden / pos ketan legenda.",
        icon: "XCircle",
        sort_order: 1
      },
      {
        type: "excluded",
        label: "Belanja Pribadi & Wahana Ekstra",
        description: "Aktivitas berbelanja cenderamata, jajan, atau menyewa sepeda listrik di taman wisata.",
        icon: "XCircle",
        sort_order: 2
      }
    ],
    itineraries: [
      {
        day_number: 1,
        time: "09.00 - 11.00",
        title: "Penjemputan & Welcoming Malang",
        description: "Dijemput di Stasiun Malang / Bandara Malang dengan armada private eksklusif keluarga yang bersih. Perjalanan santai menghirup hawa dingin menuju Kota Batu.",
        sort_order: 1
      },
      {
        day_number: 1,
        time: "11.30 - 15.30",
        title: "Eksplorasi Jatim Park 3 (Dino Park)",
        description: "Makan siang lalu mengunjungi Dino Park. Menunggangi kereta berjalan berpetualang ke zaman purba, seru dan beredukasi untuk anak-anak.",
        sort_order: 2
      },
      {
        day_number: 1,
        time: "16.00 - Check In",
        title: "Check-in Hotel & Relax",
        description: "Proses check-in cepat di hotel Batu. Istirahat sejenak sambil menikmati secangkir teh hangat berlatar pemandangan pegunungan.",
        sort_order: 3
      },
      {
        day_number: 2,
        time: "09.00 - 12.30",
        title: "Agrowisata Petik Buah & Outbound Ringan",
        description: "Mengunjungi kebun petik jeruk atau apel sepuasnya. Berinteraksi aktif mendidik buah hati menghargai alam perkebunan pegunungan Batu.",
        sort_order: 4
      },
      {
        day_number: 2,
        time: "13.30 - 18.00",
        title: "Keseruan di Museum Angkut & Pasar Apung",
        description: "Makan siang di Pasar Apung tradisional. Masuk ke Museum Angkut menyusuri koleksi transportasi dunia, menanti atraksi parade sore pahlawan berkendara.",
        sort_order: 5
      },
      {
        day_number: 3,
        time: "08.00 - 11.00",
        title: "Taman Rekreasi Alun-Alun Batu",
        description: "Sarapan pagi di hotel, bersantai, check-out lalu menikmati susu segar khas Batu di sekitaran Alun-Alun.",
        sort_order: 6
      },
      {
        day_number: 3,
        time: "12.00 - Drop Off",
        title: "Kembali ke Drop Point",
        description: "Singgah sebentar berbelanja cinderamata keripik buah asli Malang, lalu diantar kembali ke stasiun/hotel asal. Liburan keluarga berkesan telah usai.",
        sort_order: 7
      }
    ]
  },
  {
    id: 105,
    name: "Open Trip Nusa Penida Island Quest",
    slug: "open-trip-nusa-penida-one-day",
    type: "Open Trip",
    summary: "One day trip ekonomis mengeksplorasi ikon tebing Kelingking, Broken Beach, dan Angels Billabong dari Bali dalam sehari.",
    description: "Punya waktu sedikit di Bali namun ingin mengunjungi Nusa Penida yang indah? Kami menyediakan paket One Day Open Trip gabungan harian yang sangat ramah kantong. Anda akan dinaikkan kapal cepat (fastboat) pagi hari dari Sanur, berkeliling bersama traveler lain menjelajahi pantai barat Nusa Penida dengan dipandu guide loka bercerita ramah, berfoto seru, dan kembali ke Bali di sore harinya.",
    duration_label: "1 Hari (Go Show)",
    starting_price: 450000,
    price_label: "Rp 450.000",
    rating: 4.8,
    review_label: "230+ Ulasan ceria",
    booking_message: "Halo Admin, saya tertarik ikut Open Trip Nusa Penida 1 Hari besok lusa. Apakah masih tersedia kursi untuk solo traveler?",
    is_featured: false,
    status: "published",
    published_at: "2026-05-25 09:00:00",
    imageUrl: destinationImages.nusaPenida,
    layanan_ids: [1], // Open Trip
    destinasi_ids: [12, 13], // Bali, Nusa Penida
    prices: [
      {
        name: "Standard Pax",
        label: "Tiket sharing gabungan + Transport",
        price: 450000,
        price_suffix: "/pax",
        min_pax: 1,
        max_pax: 10,
        is_primary: true,
        sort_order: 1
      }
    ],
    features: [
      {
        type: "highlight",
        label: "Spot Selfie Kelingking Beach",
        description: "Berfoto di tebing raksasa menyerupai karakter kadal prasejarah yang ikonik dan indah.",
        icon: "Camera",
        sort_order: 1
      },
      {
        type: "included",
        label: "Tiket Fastboat PP Sanur",
        description: "Tiket penyeberangan reguler kapal cepat pergi dan pulang.",
        icon: "CheckCircle",
        sort_order: 1
      },
      {
        type: "included",
        label: "Mobil AC Sharing di Pulau",
        description: "Transportasi ber-AC sharing berkapasitas maksimal 6 orang per mobil.",
        icon: "CheckCircle",
        sort_order: 2
      },
      {
        type: "included",
        label: "Makan Siang Resto Lokal",
        description: "Makan siang dengan menu set khas nusantara / vegetarian yang lezat.",
        icon: "CheckCircle",
        sort_order: 3
      },
      {
        type: "included",
        label: "Driver cum Guide Lokal",
        description: "Supir merangkap pemandu wisata lokal Penida yang siap menjepret momen indah Anda.",
        icon: "CheckCircle",
        sort_order: 4
      },
      {
        type: "excluded",
        label: "Akses ke Pasir Kelingking",
        description: "Menuruni tebing ke pasir bawah Kelingking tidak direkomendasikan untuk paket harian demi efisiensi waktu kapal pulang.",
        icon: "XCircle",
        sort_order: 1
      },
      {
        type: "excluded",
        label: "Pengeluaran Minum & Jajan",
        description: "Minuman ringan kelapa muda di pantai, makan malam sepulang ke Sanur.",
        icon: "XCircle",
        sort_order: 2
      }
    ],
    itineraries: [
      {
        day_number: 1,
        time: "07.00 - 07.30",
        title: "Meeting Point Sanur",
        description: "Peserta berkumpul mandiri di Pelabuhan Sanur Bali untuk pembagian tiket fisik fastboat.",
        sort_order: 1
      },
      {
        day_number: 1,
        time: "08.00 - 08.45",
        title: "Penyeberangan Laut",
        description: "Fastboat bertolak mengarungi Selat Badung menuju Nusa Penida.",
        sort_order: 2
      },
      {
        day_number: 1,
        time: "09.00 - 12.30",
        title: "Eksplorasi Tebing Kelingking",
        description: "Tiba di Penida, berpindah ke mobil sharing dan langsung dipandu berfoto di atas tebing spektakuler Kelingking Beach.",
        sort_order: 3
      },
      {
        day_number: 1,
        time: "12.30 - 13.30",
        title: "Makan Siang Bersama",
        description: "Menikmati menu makan siang set di restoran dengan nuansa asri tengah pulau.",
        sort_order: 4
      },
      {
        day_number: 1,
        time: "13.45 - 15.30",
        title: "Melihat Broken Beach & Angel's Billabong",
        description: "Eksplorasi jembatan karang Broken Beach dan kolam renang alami tebing laut Angel's Billabong.",
        sort_order: 5
      },
      {
        day_number: 1,
        time: "16.00 - 17.00",
        title: "Kembali Menyisir Sanur",
        description: "Kembali ke pelabuhan penyeberangan, menumpang fastboat sore pulang menuju Sanur Bali. Tur yang seru selesai.",
        sort_order: 6
      }
    ]
  }
];

// 7. Blog / Artikel SEO (content_posts)
export const initialBlogArtikel: BlogArtikel[] = [
  {
    id: 501,
    title: "Panduan Lengkap Wisata Bromo 2026: Rute, Harga Tiket, dan Tips Menghindari Macet Jeep",
    slug: "panduan-lengkap-wisata-bromo-2026",
    primary_keyword: "panduan wisata bromo",
    secondary_keywords: ["tips liburan bromo", "harga tiket bromo", "rute jeep bromo"],
    search_intent: "Informational",
    category: "Panduan",
    excerpt: "Ingin berkunjung ke kawah Bromo dan sunrise Penanjakan dalam waktu dekat? Simak panduan transportasi, estimasi tarif terbaru, tata cara booking slot online Balai Besar TNBTS, hingga tips rahasia anti macet Jeep.",
    body: `<h2>Panduan Lengkap Merencanakan Liburan Terbaik ke Gunung Bromo</h2>
<p>Gunung Bromo yang terletak di wilayah Jawa Timur menempati urutan teratas destinasi alam impian wajib kunjung bagi wisatawan domestik maupun mancanegara. Dengan ketinggian 2.329 meter di atas permukaan laut, pesona magis lautan pasir vulkanik berpadu pemandangan fajar keemasan menjanjikan pengalaman spiritual yang tak lekang waktu.</p>

<h2>Mengapa Harus Menggunakan Jasa Tour Agent Terpercaya?</h2>
<p>Banyak wisatawan berspekulasi untuk mendatangi Gunung Bromo secara mandiri demi menghemat budget. Namun nyatanya, sesampainya di area transit (tumpang atau Pasuruan), regulasi setempat melarang keras mobil pribadi selain Jeep 4x4 lokal beroperasi menuruni kaldera pasir yang ekstrem.</p>
<p>Dengan memesan paket perjalanan dari kami, Anda tidak perlu lagi dipusingkan dengan:</p>
<ul>
  <li>Mencari ketersediaan Jeep kosong di tengah kepadatan musim lebaran / akhir pekan.</li>
  <li>Menghindari oknum calo tiket TNBTS yang menjual harga tidak wajar di pinggir jalan.</li>
  <li>Repot menyetir tengah malam menerjang jalur pegunungan curam berselimut kabut tebal.</li>
</ul>

<p>Pelajari paket <a href="/produk/open-trip-bromo-midnight">Open Trip Bromo Midnight Sunrise</a> kami yang ekonomis untuk memulai perjalanan Anda besok malam.</p>

<h2>Musim Terbaik Mengunjungi Gunung Bromo</h2>
<p>Waktu emas menggapai bromo terbaik jatuh pada masa kemarau panjang, sekitar <strong>Juni hingga September</strong>. Di bulan-bulan ini, kondisi langit cenderung bersih (high visibility) bebas awan mendung, sehingga matahari terbit fajar keemasan (golden sunrise) dambaan Anda akan terpapar sempurna tanpa penghalang kabut tebal basah.</p>

<h3>3 Tips Penting Menghindari Macet Antrean Jeep di Spot Sunrise:</h3>
<ol>
  <li><strong>Berangkat Lebih Awal:</strong> Tim kami selalu memajukan jam penjemputan dari Malang sekitar jam 11.30 malam untuk memastikan Jeep Anda memperoleh tempat parkir paling dekat dengan puncak Penanjakan.</li>
  <li><strong>Pilih Spot Alternatif:</strong> Selain Penanjakan 1, Bukit Kingkong dan Bukit Cinta menyuguhkan lanskap matahari terbit yang serupa dengan kepadatan pengunjung yang jauh lebih lenggang.</li>
  <li><strong>Gunakan Pakaian Tepat:</strong> Suhu pagi hari sanggup menusuk tulang hingga 5 derajat celcius. Selalu sedia jaket windbreaker, kupluk rajut, sarung tangan wool, dan sepatu sneakers/trekking ber-grip pakem.</li>
</ol>

<p>Hubungi admin kami lewat tombol konsultasi WhatsApp Resmi di panel samping untuk konsultasi gratis penyesuaian jadwal keberangkatan.</p>`,
    is_featured: true,
    imageUrl: destinationImages.bromo,
    status: "published",
    sort_order: 1,
    published_at: "2026-05-18",
    related_package_ids: [101],
    related_destinasi_ids: [11]
  },
  {
    id: 502,
    title: "7 Rekomendasi Destinasi Tersembunyi di Nusa Penida yang Wajib Masuk Itinerary Anda",
    slug: "rekomendasi-destinasi-wisata-nusa-penida",
    primary_keyword: "destinasi wisata nusa-penida",
    secondary_keywords: ["pantai tersembunyi nusa penida", "kelingking beach", "diamond beach nusa penida"],
    search_intent: "Commercial",
    category: "Rekomendasi",
    excerpt: "Nusa Penida bukan cuma tentang Pantai Kelingking. Temukan 7 spot rahasia lainnya yang berpasir seputih salju, gua stalaktit sakral, hingga tebing terjal yang menawarkan sunset tropis paling spektakuler.",
    body: `<h2>Pemberhentian Terbaik Melengkapi Penjelajahan Nusa Penida Island</h2>
<p>Popularitas Nusa Penida terus meningkat seiring kemunculan ribuan foto keindahan jajaran tebing megahnya di jagat media sosial. Meski demikian, mayoritas turis harian (day-tourists) hanya terkonsentrasi mendatangi 2 atau 3 titik populer barat. Padahal, pulau eksotis ini memendam segudang pesona terisolir di pelosok kepulauan timur dan selatan.</p>

<h2>Eksplorasi Pantai Barat vs Pantai Timur Nusa Penida</h2>
<p>Jika Anda memiliki waktu liburan terbatas sepanjang 1 hari, kami merekomendasikan rute <strong>Pantai Barat</strong>. Di rute ini, Anda akan menjumpai Kelingking Beach, Broken Beach, dan kolam renang alami karang laut Angel's Billabong yang ikonik berkat kedekatan akses jalurnya.</p>
<p>Namun, bila Anda mendambakan jepretan lanskap estetik bercahaya pagi nan tenang, pesona <strong>Pantai Timur</strong> dengan Diamond Beach, Atuh Cliff, dan Rumah Pohon Molenteng siap memberikan pengalaman petualangan berlibur yang tiada tandingannya.</p>

<p>Kombinasikan petualangan barat dan timur Nusa Penida dalam suasana tenang eksklusif via <a href="/produk/private-nusa-penida-paradise">Private Trip Nusa Penida Paradise Explorer (3D2N)</a> kami.</p>

<h2>7 Destinasi Nusa Penida yang Anti-Mainstream:</h2>
<ol>
  <li><strong>Diamond Beach:</strong> Pantai indah berpasir putih bersih dengan air laut toska jernih. Tangga batu tebingnya yang curam memberikan angle dokumentasi luhur.</li>
  <li><strong>Rumah Pohon Molenteng:</strong> Gazebo kayu sederhana di tepi tebing tinggi yang menghadap ke gugusan pulau karang kecil berjejer mirip Raja Ampat.</li>
  <li><strong>Peguyangan Waterfall:</strong> Kombinasi kuil persembahyangan dengan mata air suci tawar di bibir samudra, dicapai dengan menyisir anak tangga besi biru menggantung ekstrem di sisi tebing.</li>
  <li><strong>Tembeling Beach & Forest:</strong> Kolam pemandian air tawar alami bernuansa sepi, tersembunyi di balik hutan keramat tropis yang hijau rimbun.</li>
  <li><strong>Broken Beach:</strong> Terowongan raksasa tebing yang berongga bundar akibat abrasi ombak, tempat kura-kura samudera sering terlihat berenang bebas.</li>
  <li><strong>Atuh Beach:</strong> Teluk pasir melengkung tenang terlindungi tebing batu kapur besar berbentuk sepatu kuda.</li>
  <li><strong>Crystal Bay:</strong> Surga pantai pasir abu-abu teduh yang rindang oleh jejeran kelapa tinggi. Spot terbaik menyaksikan sunset langsung tenggelam ke garis samudra.</li>
</ol>

<p>Tunggu apa lagi? Rencanakan petualangan tropis eksklusif keluarga bersama agen kami hari ini juga.</p>`,
    is_featured: false,
    imageUrl: destinationImages.nusaPenida,
    status: "published",
    sort_order: 2,
    published_at: "2026-05-24",
    related_package_ids: [102, 105],
    related_destinasi_ids: [12, 13]
  },
  {
    id: 503,
    title: "Tips Mengatur Outing Kantor di Batu Malang agar Maksimal dan Tidak Membosankan",
    slug: "tips-mengatur-outing-kantor-batu-malang",
    primary_keyword: "outing kantor batu malang",
    secondary_keywords: ["tema gathering kantor", "outbound batu malang", "manfaat company gathering"],
    search_intent: "Transactional",
    category: "Tips",
    excerpt: "Apakah Anda panitia gathering tahun ini? Simak tips merancang program team building seru, pemilihan tema gathering, hingga pemilihan hotel bintang terbaik di Batu agar staf tidak bosan.",
    body: `<h2>Bagaimana Merancang Outing Perusahaan yang Sukses dan Mengesankan?</h2>
<p>Mengatur outing kantor (company outing) dengan keterlibatan puluhan bahkan ratusan karyawan instansi merupakan pekerjaan rumah kepanitiaan HRD yang penuh tantangan. Seringkali, karena salah memilih lokasi, acara outbound kantor berakhir kaku, dipenuhi ceramah membosankan, atau malahan menyiksa stamina fisik para staf.</p>
<p>Kota Wisata Batu di Malang hadir sebagai jawaban terbaik berkat ketersediaan fasilitas hotel berukuran raksasa, kawasan pegunungan berhawa sejuk yang segar, serta keberadaan ribuan wahana rekreasi ramah turis.</p>

<h2>3 Elemen Kunci Penyemangat Program Gathering Perusahaan</h2>
<p>Untuk melahirkan produktivitas yang loyal sepulangnya dari berlibur, pastikan susunan rencana outing Anda memuat tiga pondasi utama:</p>
<ul>
  <li><strong>Professional Team Building Trainer:</strong> Instruksikan instruktur games bersertifikat resmi agar aktivitas permainan di lapangan merangsang kreativitas kerja berkelompok dan penyelesaian masalah, bukan hanya sekadar berlari fisik lelah.</li>
  <li><strong>Fasilitas Gala Dinner Berkesan:</strong> Selingi acara resmi makan malam formal dengan pembagian hadiah hiburan (doorprize), live music akustik santai, serta penyematan award bagi karyawan teladan setingkat divisi.</li>
  <li><strong>Pace Itinerary Santai:</strong> Berikan sela waktu luang sekurangnya 2-3 jam bagi staf untuk beres-beres kamar mandi, atau sekadar berenang mandiri berbincang santai antarkolega di hotel.</li>
</ul>

<p>Lihat opsi rancangan program outbound kantor terbaik kami di <a href="/produk/corporate-outing-malang-batu">Corporate Outing Malang-Batu Fun Team Building</a>.</p>

<p>Kami bersedia menyusun draft proposal outline PDF penawaran, daftar menu makan bersertifikat halal, skema rundown acara khusus instansi Anda secara kustom. Hubungi admin kami untuk informasi kelengkapannya.</p>`,
    is_featured: false,
    imageUrl: packageImages.corporateOuting,
    status: "published",
    sort_order: 3,
    published_at: "2026-05-28",
    related_package_ids: [103],
    related_destinasi_ids: [14, 15]
  }
];
