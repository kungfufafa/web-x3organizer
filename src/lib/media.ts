export const IMAGES = {
  services: {
    groupTrip: '/images/services/group-trip.jpg',
    teamBuilding: '/images/services/team-building.jpg',
    kampusInstitusi: '/images/services/kampus-institusi.jpg',
    familyTrip: '/images/services/family-trip.jpg',
    openTrip: '/images/services/open-trip.jpg',
  },
  packages: {
    familyTripBatuMalang: '/images/packages/family-trip-batu-malang.jpg',
    outingBromo: '/images/packages/outing-bromo.jpg',
    nusaPenida: '/images/packages/nusa-penida.jpg',
  },
  destinations: {
    batuMalang: '/images/destinations/batu-malang.jpg',
    bromo: '/images/destinations/bromo.jpg',
    baliNusaPenida: '/images/destinations/bali-nusa-penida.jpg',
    jogja: '/images/destinations/jogja.jpg',
    lombok: '/images/destinations/lombok.jpg',
    banyuwangi: '/images/destinations/banyuwangi.jpg',
  },
  blog: {
    tipsOutingBatuMalang: '/images/blog/tips-outing-batu-malang.jpg',
    panduanWisataBromo: '/images/blog/panduan-wisata-bromo.jpg',
    rekomendasiNusaPenida: '/images/blog/rekomendasi-nusa-penida.jpg',
  },
  social: {
    gatheringBromo: '/images/social/gathering-bromo.jpg',
    teamBuildingBatu: '/images/social/team-building-batu.jpg',
    openTripNusaPenida: '/images/social/open-trip-nusa-penida.jpg',
    familyTripBali: '/images/social/family-trip-bali.jpg',
    campusTripJogja: '/images/social/campus-trip-jogja.jpg',
    kawahIjen: '/images/social/kawah-ijen.jpg',
  },
  hero: {
    homeGroupTravel: '/images/hero/home-group-travel.jpg',
    whyX3Coordinator: '/images/hero/why-x3-coordinator.jpg',
    tentangMountains: '/images/hero/tentang-mountains.jpg',
    kontakOffice: '/images/hero/kontak-office.jpg',
  },
  experiences: {
    gatheringPerusahaan: '/images/experiences/gathering-perusahaan.jpg',
    familyTripCustom: '/images/experiences/family-trip-custom.jpg',
    teamBuildingProgram: '/images/experiences/team-building-program.jpg',
  },
  avatars: {
    testimonial1: '/images/avatars/testimonial-1.jpg',
    testimonial2: '/images/avatars/testimonial-2.jpg',
    testimonial3: '/images/avatars/testimonial-3.jpg',
  },
} as const

export const TESTIMONIALS = [
  {
    quote:
      'Gathering kantor kami ke Bromo berjalan sangat lancar. Tim X3 koordinasi transportasi, akomodasi, dan aktivitas dengan rapi—kami tinggal fokus menikmati momen bersama.',
    name: 'Riana L.',
    role: 'HR Manager · Perusahaan Manufaktur',
    avatar: IMAGES.avatars.testimonial1,
  },
  {
    quote:
      'Family trip ke Bali dan Nusa Penida jadi lebih tenang karena semua detail diurus X3. Itinerary fleksibel dan cocok untuk anak-anak maupun orang tua.',
    name: 'Keluarga G.',
    role: 'Family Trip · Surabaya',
    avatar: IMAGES.avatars.testimonial2,
  },
  {
    quote:
      'Program team building outbound-nya terstruktur dan menyenangkan. Peserta antusias, dan koordinasi di lapangan sangat responsif dari awal hingga selesai.',
    name: 'Andi S.',
    role: 'People Development · Perusahaan Retail',
    avatar: IMAGES.avatars.testimonial3,
  },
] as const
