/** FAQ layanan — dipakai di halaman layanan & JSON-LD schema */
export const SERVICE_FAQS: Record<string, { q: string; a: string }[]> = {
  'group-trip': [
    {
      q: 'Berapa minimal peserta untuk group trip?',
      a: 'Minimal 15 peserta untuk outing kantor dan gathering perusahaan. Untuk grup lebih kecil, kami tetap bisa membantu dengan penyesuaian paket — hubungi kami untuk diskusi.',
    },
    {
      q: 'Apakah bisa custom destinasi?',
      a: 'Ya. Kami menerima permintaan custom sesuai preferensi destinasi, durasi, dan anggaran perusahaan Anda.',
    },
    {
      q: 'Apakah tersedia untuk perusahaan di luar Jawa Timur?',
      a: 'Ya. Kami berbasis di Cirebon dan melayani perusahaan di seluruh Indonesia. Titik kumpul dan transportasi disesuaikan dengan lokasi klien.',
    },
  ],
  'team-building': [
    {
      q: 'Apakah bisa dikombinasikan dengan company trip?',
      a: 'Ya. Kami bisa merancang program yang menggabungkan wisata dan team building dalam satu agenda.',
    },
    {
      q: 'Berapa minimal dan maksimal peserta?',
      a: 'Minimal 10 peserta, maksimal 200+ peserta tergantung lokasi dan jenis aktivitas. Hubungi kami untuk kapasitas spesifik di destinasi pilihan Anda.',
    },
    {
      q: 'Apakah tersedia program indoor jika cuaca tidak mendukung?',
      a: 'Ya. Kami menyiapkan alternatif indoor seperti games kolaboratif, workshop, dan Amazing Race versi indoor di hotel atau venue meeting.',
    },
  ],
  'kampus-institusi': [
    {
      q: 'Apakah tersedia laporan perjalanan untuk institusi?',
      a: 'Ya. Kami menyediakan laporan singkat perjalanan berisi manifest peserta, itinerary yang dijalankan, dan dokumentasi foto untuk keperluan administrasi institusi.',
    },
    {
      q: 'Bagaimana penanganan jika ada peserta yang berhalangan?',
      a: 'Peserta yang berhalangan sebelum keberangkatan dapat diganti sesuai kebijakan yang disepakati. Di lapangan, tim koordinator X3 akan membantu koordinasi dengan PIC institusi.',
    },
    {
      q: 'Apakah bisa menyesuaikan dengan anggaran institusi?',
      a: 'Ya. Kami menerima konsultasi untuk menyesuaikan rencana dengan anggaran yang tersedia.',
    },
  ],
  'family-trip': [
    {
      q: 'Apakah bisa memilih akomodasi dengan kebutuhan spesifik?',
      a: 'Ya. Kami membantu memilih hotel atau villa sesuai kebutuhan — kamar connecting, extra bed anak, atau fasilitas khusus lansia.',
    },
    {
      q: 'Apakah ada batasan destinasi untuk family trip?',
      a: 'Tidak ada batasan tetap. Destinasi populer meliputi Batu–Malang, Bali, Nusa Penida, Jogja, dan Lombok. Destinasi lain bisa didiskusikan.',
    },
    {
      q: 'Bisakah family trip untuk keluarga besar (20+ orang)?',
      a: 'Ya. Kami rutin menangani family trip kelompok besar — arisan keluarga, reunion, atau liburan multi-generasi dengan koordinasi transportasi grup.',
    },
  ],
  'open-trip': [
    {
      q: 'Apakah boleh daftar sendiri tanpa teman?',
      a: 'Ya. Open trip dirancang untuk individu yang ingin bergabung dengan peserta lain. Anda akan traveling bersama grup terjadwal.',
    },
    {
      q: 'Apa yang termasuk dalam harga open trip?',
      a: 'Umumnya termasuk transportasi sesuai itinerary, akomodasi, tiket masuk destinasi utama, dan koordinator trip. Tidak termasuk makan pribadi, souvenir, dan pengeluaran pribadi lainnya.',
    },
    {
      q: 'Bagaimana kebijakan pembatalan?',
      a: 'Pembatalan lebih dari 14 hari sebelum keberangkatan: refund 75%. 7–14 hari: refund 50%. Kurang dari 7 hari: tidak refund, kecuali force majeure. Detail final diberikan saat konfirmasi booking.',
    },
  ],
}

export const SERVICE_SCOPE_EXTRAS: Record<string, string[]> = {
  'team-building': ['Fun games & ice breaking', 'Facilitator lapangan', 'Dokumentasi foto & video'],
  'kampus-institusi': ['Trip OSPEK & orientasi', 'Kunjungan industri', 'Program edukasi & wisata'],
  'family-trip': ['Tour guide lokal', 'Asuransi perjalanan (opsional)', 'Dokumentasi foto keluarga'],
  'open-trip': ['Jadwal open trip Bromo & Nusa Penida (hubungi untuk update)', 'Destinasi: Bromo, Nusa Penida, Batu Malang, Bali, Jogja'],
}
