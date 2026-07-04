# X3 Organizer — Website Plan v1.1
**Revisi dari:** v1.0 (30 Juni 2026)
**Tanggal revisi:** 30 Juni 2026
**Jenis revisi:** Koreksi bertarget — keputusan v1.0 yang valid dipertahankan

---

## Ringkasan Koreksi dari v1.0

| # | Koreksi | Status |
|---|---|---|
| 1 | Tambah definisi halaman index /paket/, /destinasi/, /blog/ | ✓ Ditambahkan |
| 2 | Re-evaluasi sub-halaman /layanan/group-trip | ✓ Direvisi — 2 halaman, bukan 3 |
| 3 | Destinasi sebagai kandidat, bukan halaman otomatis | ✓ Aturan publikasi ditambahkan |
| 4 | Redundansi homepage: Audience Entry Points vs Core Services | ✓ Digabung menjadi satu section |
| 5 | /galeri/ diganti /pengalaman/ dengan format trip story | ✓ Direvisi |
| 6 | Klasifikasi readiness dikoreksi | ✓ 4-level status system |
| 7 | Jumlah section homepage ditinjau | ✓ 13 → 11 section |
| 8 | Format sitemap per halaman dilengkapi | ✓ Setiap halaman memiliki 7 atribut |

---

## 1. Planning Assumptions (Dipertahankan dari v1.0)

| Asumsi | Kategori |
|---|---|
| Domain utama x3organizer.com | CLIENT CONFIRMATION REQUIRED |
| Navigasi existing: Home, Paket, Layanan, Blog | CLIENT-STATED |
| CTA utama adalah WhatsApp consultation | FIRST-PARTY VERIFIED |
| Segmen utama: Korporat, Kampus, Keluarga, Open Trip | FIRST-PARTY VERIFIED |
| Layanan inti: 7 jenis trip | OFFICIAL BRAND CLAIM |
| Destinasi aktif dari search snippet: 6 destinasi | FIRST-PARTY VERIFIED (snippet) |
| Blog sudah ada minimal 3 artikel | CLIENT-STATED |
| Visual: clean, terang, navy/blue/gold/silver | CLIENT-STATED |
| Foto dokumentasi dan testimoni belum dikonfirmasi | CLIENT CONFIRMATION REQUIRED |

---

## 2. Corrected Sitemap

### Struktur Lengkap

```
x3organizer.com/
│
├── / (Home)
│
├── /layanan/                         [INDEX]
│   ├── /layanan/group-trip           [PARENT + OVERVIEW]
│   │   ├── /layanan/team-building    [DETAIL — halaman terpisah]
│   │   └── (company-gathering = konten di /group-trip/, bukan halaman terpisah)
│   ├── /layanan/kampus-institusi
│   ├── /layanan/family-trip
│   └── /layanan/open-trip
│
├── /paket/                           [INDEX — katalog semua paket]
│   └── /paket/[nama-paket]           [DETAIL]
│
├── /destinasi/                       [INDEX — grid destinasi]
│   ├── /destinasi/batu-malang        [STATUS: lihat Seksi 7]
│   ├── /destinasi/bromo              [STATUS: lihat Seksi 7]
│   ├── /destinasi/bali               [STATUS: lihat Seksi 7]
│   ├── /destinasi/nusa-penida        [STATUS: lihat Seksi 7]
│   ├── /destinasi/jogja              [STATUS: lihat Seksi 7]
│   ├── /destinasi/lombok             [STATUS: lihat Seksi 7]
│   └── /destinasi/banyuwangi         [STATUS: lihat Seksi 7]
│
├── /pengalaman/                      [INDEX + DETAIL entries — menggantikan /galeri/]
│
├── /tentang/
│
├── /blog/                            [INDEX]
│   └── /blog/[slug]                  [DETAIL]
│
└── /kontak/                          [termasuk form brief]
```

---

## 3. Corrected Navigation Structure (Dipertahankan dari v1.0, diperbarui)

### Desktop Navbar
```
Logo    |    Layanan ▾    Paket    Destinasi ▾    Pengalaman    Blog    Tentang
                                                                  [Konsultasi WhatsApp] ← gold button
```

**Dropdown Layanan:**
- Group & Corporate Trip → /layanan/group-trip/
- Team Building → /layanan/team-building/
- Kampus & Institusi → /layanan/kampus-institusi/
- Family Trip → /layanan/family-trip/
- Open Trip → /layanan/open-trip/

**Dropdown Destinasi:** (hanya destinasi dengan status LIVE)
- Menampilkan hanya destinasi yang sudah dikonfirmasi dan dipublikasikan
- Jika belum ada yang dikonfirmasi, dropdown ini tidak ditampilkan — gunakan link langsung ke /destinasi/

**Catatan:**
- "Paket" dan "Pengalaman" tidak memerlukan dropdown — langsung ke halaman index
- CTA WhatsApp di navbar berbeda warna dari menu (gold / navy filled)
- Navbar sticky di semua halaman

### Mobile Navbar
- Hamburger → slide panel kanan
- Urutan: Layanan → Paket → Destinasi → Pengalaman → Blog → Tentang
- CTA WhatsApp full-width di bagian bawah panel
- Floating WhatsApp button tetap visible di semua halaman mobile (bottom-right)

---

## 4. Final Service Architecture (Koreksi #2)

### Evaluasi Sub-halaman /layanan/group-trip

**Pertanyaan:** Apakah Family Gathering, Team Building, dan Company Trip memiliki perbedaan user intent yang cukup untuk halaman terpisah?

**Analisis:**

| Layanan | User Intent | Keyword Khas | Konten Unik |
|---|---|---|---|
| Company Gathering | "kumpul bareng tim, bonding, fun" | "gathering perusahaan", "family gathering kantor" | Aktivitas santai, makan bersama, lokasi wisata |
| Company Trip | "perjalanan wisata perusahaan" | "company trip", "tour perusahaan" | Destinasi wisata, itinerary perjalanan, bukan game |
| Team Building | "meningkatkan kerjasama tim" | "team building", "outbound", "Amazing Race" | Aktivitas terstruktur: game, challenge, outbound |

**Keputusan:**

- **Team Building → HALAMAN TERPISAH** ✓
  - User intent jelas berbeda: bukan wisata, melainkan aktivitas kolaborasi terstruktur
  - Keyword SEO berbeda: "jasa team building Jawa Timur", "outbound perusahaan"
  - Konten unik: Amazing Race, Outbound, game design, fasilitator — tidak overlap dengan wisata
  - URL: `/layanan/team-building/`

- **Company Gathering + Company Trip → TETAP DI /layanan/group-trip/** ✓
  - User intent sangat overlap: keduanya adalah "perjalanan kelompok perusahaan"
  - Konten yang unik tidak cukup untuk dua halaman terpisah tanpa duplikasi
  - Gathering dan Trip dibedakan sebagai **format/varian** di dalam satu halaman, bukan halaman berbeda
  - /layanan/group-trip/ menjelaskan keduanya dengan section berbeda

**Struktur Final Halaman Layanan:**

```
/layanan/                       ← Halaman induk (overview semua layanan)
/layanan/group-trip/            ← Corporate Group: Gathering + Company Trip
/layanan/team-building/         ← Team Building + Outbound (halaman terpisah)
/layanan/kampus-institusi/      ← Campus + Institusi
/layanan/family-trip/           ← Family Trip Custom
/layanan/open-trip/             ← Open Trip individu
```

**Custom Trip:** Tidak perlu halaman sendiri. Diintegrasikan sebagai penawaran di setiap halaman layanan: *"Butuh paket yang berbeda? Kami bisa custom sesuai kebutuhan Anda."*

---

## 5. Complete Sitemap with Page Attributes (Koreksi #8)

Format setiap halaman:
`Tujuan | Audiens | Konten utama | CTA | Halaman terkait | Dependency | Status`

---

### `/` — Home
- **Tujuan:** Orientasi brand dan routing ke layanan atau paket yang tepat
- **Audiens:** Semua segmen — pengunjung baru yang belum tahu layanan mana yang cocok
- **Konten utama:** Hero, navigasi kebutuhan, paket unggulan, keunggulan, proses, pengalaman preview, testimoni preview, blog preview, FAQ, final CTA
- **CTA:** "Konsultasi WhatsApp" (primer) + "Lihat Paket" (sekunder)
- **Halaman terkait:** /layanan/, /paket/, /pengalaman/, /blog/
- **Dependency:** Logo, tagline, minimal 1 foto perjalanan nyata, nomor WhatsApp
- **Status:** READY FOR LOW-FIDELITY WIREFRAME

---

### `/layanan/` — Layanan Induk
- **Tujuan:** Overview semua jenis layanan dan routing ke halaman layanan yang tepat
- **Audiens:** Pengunjung yang tahu butuh "tour organizer" tapi belum tahu layanan mana
- **Konten utama:** Grid 5 kartu layanan dengan deskripsi singkat dan untuk siapa
- **CTA:** Klik ke halaman layanan masing-masing
- **Halaman terkait:** Semua sub-halaman /layanan/
- **Dependency:** Deskripsi singkat per layanan
- **Status:** READY FOR CONTENT PLANNING

---

### `/layanan/group-trip/` — Corporate Group Trip
- **Tujuan:** Meyakinkan pengambil keputusan perusahaan untuk memilih X3 sebagai vendor perjalanan grup
- **Audiens:** HR, panitia event, direktur perusahaan yang butuh gathering atau company trip
- **Konten utama:** Deskripsi layanan, format (gathering vs company trip), aktivitas tersedia, proses pemesanan, paket terkait, pengalaman korporat, testimoni korporat
- **CTA:** "Konsultasikan Kebutuhan Gathering Anda" → WhatsApp pre-filled "gathering perusahaan"
- **Halaman terkait:** /layanan/team-building/, /paket/ (filter korporat), /pengalaman/
- **Dependency:** `[CLIENT CONTENT REQUIRED: foto gathering/company trip nyata, testimoni korporat]`
- **Status:** READY FOR CONTENT PLANNING

---

### `/layanan/team-building/` — Team Building & Outbound
- **Tujuan:** Meyakinkan perusahaan yang butuh aktivitas kolaborasi terstruktur (bukan sekadar wisata)
- **Audiens:** HR, training & development manager, panitia yang mencari team building
- **Konten utama:** Penjelasan aktivitas (Amazing Race, Outbound, game design), manfaat team building, proses, kapasitas, testimoni
- **CTA:** "Rancang Program Team Building Anda" → WhatsApp pre-filled "team building"
- **Halaman terkait:** /layanan/group-trip/, /paket/, /pengalaman/
- **Dependency:** `[CLIENT CONTENT REQUIRED: detail aktivitas yang ditawarkan, foto kegiatan outbound]`
- **Status:** READY FOR CONTENT PLANNING

---

### `/layanan/kampus-institusi/` — Kampus & Institusi
- **Tujuan:** Meyakinkan panitia kampus, sekolah, atau institusi untuk mempercayakan trip grup ke X3
- **Audiens:** BEM/Hima, bagian akademik kampus, panitia OSIS, koordinator studi wisata
- **Konten utama:** Deskripsi layanan, kapasitas grup besar, pengalaman dengan institusi pendidikan, proses, paket terkait
- **CTA:** "Rencanakan Trip Kampus Anda" → WhatsApp pre-filled "trip kampus/institusi"
- **Halaman terkait:** /paket/, /destinasi/, /pengalaman/
- **Dependency:** `[CLIENT CONTENT REQUIRED: foto trip kampus nyata, testimoni panitia]`
- **Status:** READY FOR CONTENT PLANNING

---

### `/layanan/family-trip/` — Family Trip Custom
- **Tujuan:** Meyakinkan keluarga bahwa X3 bisa merancang perjalanan sesuai kebutuhan spesifik mereka
- **Audiens:** Orang tua yang merencanakan liburan keluarga, reunion keluarga besar
- **Konten utama:** Penjelasan layanan custom, fleksibilitas itinerary, pilihan destinasi, proses perencanaan, contoh paket, testimoni keluarga
- **CTA:** "Ceritakan Rencana Family Trip Anda" → WhatsApp atau form brief
- **Halaman terkait:** /paket/, /destinasi/, /pengalaman/
- **Dependency:** `[CLIENT CONTENT REQUIRED: foto family trip nyata, testimoni keluarga]`
- **Status:** READY FOR CONTENT PLANNING

---

### `/layanan/open-trip/` — Open Trip
- **Tujuan:** Mendorong individu atau pasangan mendaftar ke trip bersama yang sudah terjadwal
- **Audiens:** Solo traveler, pasangan, atau teman kecil yang ingin bergabung trip tanpa harus booking private
- **Konten utama:** Penjelasan model open trip, jadwal tersedia, destinasi aktif, harga, cara daftar
- **CTA:** "Daftar Open Trip Sekarang" → WhatsApp pre-filled "daftar open trip [destinasi]"
- **Halaman terkait:** /paket/, /destinasi/, /pengalaman/
- **Dependency:** `[CLIENT CONTENT REQUIRED: jadwal open trip aktif, harga per trip]`
- **Status:** NOT READY FOR FINAL PUBLICATION — menunggu jadwal dan harga dari klien

---

### `/paket/` — Katalog Paket (INDEX — Koreksi #1)
- **Tujuan:** Memungkinkan pengunjung browse semua paket aktif, filter berdasarkan destinasi atau jenis layanan, dan memilih yang sesuai
- **Audiens:** Pengunjung yang sudah punya gambaran destinasi atau jenis trip dan ingin melihat pilihan konkret
- **Konten utama:** Grid semua paket aktif. Setiap card: nama paket, destinasi, durasi, jenis layanan, foto thumbnail, tombol detail. Filter opsional: berdasarkan destinasi / jenis layanan / durasi
- **CTA:** "Lihat Detail" per kartu → /paket/[nama-paket]/ | CTA sekunder: "Tidak menemukan yang cocok? Konsultasi custom" → WhatsApp
- **Halaman terkait:** /paket/[nama]/, /layanan/, /destinasi/
- **Dependency:** `[CLIENT CONTENT REQUIRED: daftar lengkap paket aktif dengan nama, destinasi, durasi, foto]`
- **Status:** NOT READY FOR FINAL PUBLICATION — menunggu daftar paket dari klien

---

### `/paket/[nama-paket]/` — Detail Paket
- **Tujuan:** Menyajikan detail paket spesifik dan mendorong calon peserta menghubungi X3
- **Audiens:** Pengunjung yang sudah tertarik dengan paket tertentu
- **Konten utama:** Nama, destinasi, durasi, foto, highlight itinerary, inclusions, untuk siapa, harga atau "hubungi untuk harga", CTA
- **CTA:** "Tanya tentang Paket Ini" → WhatsApp pre-filled nama paket
- **Halaman terkait:** /paket/ (kembali ke katalog), /destinasi/ relevan, /layanan/ relevan
- **Dependency:** `[CLIENT CONTENT REQUIRED: detail paket, foto, inclusions, harga]`
- **Status:** NOT READY FOR FINAL PUBLICATION

---

### `/destinasi/` — Katalog Destinasi (INDEX — Koreksi #1)
- **Tujuan:** Memungkinkan pengunjung menemukan paket berdasarkan destinasi yang sudah mereka inginkan; mendukung SEO berbasis lokasi
- **Audiens:** Pengunjung yang sudah tahu ingin ke destinasi tertentu tapi belum tahu paket mana
- **Konten utama:** Visual grid destinasi. Setiap kartu: foto, nama destinasi, highlight singkat (2–3 kata), tombol "Lihat Paket ke [Destinasi]". Hanya menampilkan destinasi dengan status LIVE
- **CTA:** Klik ke /destinasi/[nama]/ yang relevan | Jika belum ada destinasi LIVE: "Konsultasi destinasi pilihan Anda" → WhatsApp
- **Halaman terkait:** /destinasi/[nama]/, /paket/, /layanan/
- **Dependency:** Minimal 1 destinasi dengan status LIVE dan foto tersedia
- **Status:** CONDITIONALLY READY FOR VISUAL DESIGN — dapat dibuild dengan placeholder; publikasi menunggu konfirmasi destinasi aktif

---

### `/destinasi/[destinasi]/` — Detail Destinasi
- **Tujuan:** Menjelaskan suatu destinasi dan menghubungkan pengunjung ke paket yang tersedia ke sana; halaman SEO berbasis lokasi
- **Audiens:** Pengunjung yang mencari informasi destinasi spesifik
- **Konten utama:** Deskripsi destinasi, highlight atraksi (terverifikasi), paket yang tersedia ke sana, cocok untuk segmen apa, foto dokumentasi perjalanan
- **CTA:** "Rencanakan Trip ke [Destinasi]" → WhatsApp pre-filled
- **Halaman terkait:** /paket/ yang relevan, /layanan/ yang relevan, /blog/ yang relevan
- **Dependency:** Lihat Seksi 7 (Destination Publication Rules)
- **Status:** Lihat Seksi 7

---

### `/pengalaman/` — Pengalaman Perjalanan (Koreksi #5)
- **Tujuan:** Menampilkan bukti nyata bahwa X3 sudah menjalankan perjalanan — bukan gallery foto statis, melainkan kumpulan cerita perjalanan yang membangun kepercayaan
- **Audiens:** Pengunjung yang ragu-ragu dan butuh bukti konkret sebelum menghubungi X3
- **Konten utama:** Grid trip stories. Setiap entry memuat:
  - Jenis klien/grup (korporat, keluarga, kampus, open trip)
  - Tujuan perjalanan
  - Destinasi
  - Layanan yang digunakan
  - Foto dokumentasi `[CLIENT CONTENT REQUIRED]`
  - Narasi singkat perjalanan `[CLIENT CONTENT REQUIRED]`
  - Layanan terkait → link ke halaman layanan
  - CTA: "Trip Serupa untuk Anda?" → WhatsApp
- **Larangan:** Jangan mengarang identitas klien, jumlah peserta, atau hasil perjalanan
- **CTA:** "Rencanakan Perjalanan Serupa" → WhatsApp
- **Halaman terkait:** /layanan/, /paket/, /kontak/
- **Dependency:** `[CLIENT CONTENT REQUIRED — BLOCKER untuk populasi: foto perjalanan nyata + narasi cerita per trip, minimum 3 entry]`
- **Status:** READY FOR LOW-FIDELITY WIREFRAME — struktur bisa dibangun; konten menunggu klien

---

### `/tentang/` — Tentang X3 Organizer
- **Tujuan:** Membangun kredibilitas dan kepercayaan — terutama untuk segmen korporat yang butuh validasi vendor
- **Audiens:** Pengunjung yang sedang mengevaluasi X3 sebagai vendor sebelum memutuskan menghubungi
- **Konten utama:** Siapa X3, misi dan pendekatan layanan, informasi legal (nama PT, NIB, alamat — OFFICIAL BRAND CLAIM), tim (opsional), logo klien (jika ada izin), penghargaan/sertifikasi (jika ada dan dikonfirmasi)
- **CTA:** "Konsultasi dengan Tim Kami" → WhatsApp
- **Halaman terkait:** /kontak/, /pengalaman/, /layanan/
- **Dependency:** `[CLIENT CONTENT REQUIRED: konfirmasi nama legal resmi, NIB, alamat, foto tim opsional]`
- **Status:** READY FOR CONTENT PLANNING

---

### `/blog/` — Travel Insights Index (Koreksi #1)
- **Tujuan:** Halaman daftar semua artikel; mendukung SEO dan discovery konten; membangun authority sebagai sumber informasi perjalanan
- **Audiens:** Pengunjung yang masuk via search organik; pengunjung yang mau baca lebih sebelum membeli
- **Konten utama:** Grid semua artikel yang dipublikasikan, urut dari terbaru. Setiap card: thumbnail, judul, tanggal, tag destinasi/layanan, excerpt singkat. Filter opsional: berdasarkan destinasi atau jenis layanan
- **CTA:** "Baca Artikel" per kartu → /blog/[slug]/ | CTA akhir halaman: "Butuh bantuan merencanakan trip? Hubungi kami" → WhatsApp
- **Halaman terkait:** /blog/[slug]/, /layanan/, /destinasi/
- **Dependency:** Minimal 1 artikel dipublikasikan
- **Status:** CONDITIONALLY READY FOR VISUAL DESIGN — dapat dibuild; 3 artikel sudah ada (CLIENT-STATED), perlu konfirmasi kualitas sebelum publish

---

### `/blog/[slug]/` — Artikel Individual
- **Tujuan:** Menarik pengunjung organik via long-tail keyword; mengkonversi pembaca menjadi prospek
- **Audiens:** Pengunjung yang mencari informasi destinasi atau tips perjalanan
- **Konten utama:** Judul, tanggal, author (Tim X3 Organizer), thumbnail, konten artikel, internal link ke /layanan/ atau /destinasi/ relevan, CTA di akhir artikel
- **CTA:** "Butuh Bantuan Merencanakan Trip Ini?" → WhatsApp
- **Halaman terkait:** /blog/ (kembali), /layanan/ relevan, /destinasi/ relevan, /paket/ relevan
- **Dependency:** Konten artikel (CLIENT-STATED: 3 artikel ada)
- **Status:** CONDITIONALLY READY FOR VISUAL DESIGN

---

### `/kontak/` — Kontak + Form Brief
- **Tujuan:** Menyediakan alternatif konversi bagi pengunjung yang tidak siap langsung WhatsApp; menampilkan informasi kontak lengkap
- **Audiens:** Pengunjung yang butuh konversi lebih panjang (form) atau ingin mengetahui alamat/email
- **Konten utama:** Form brief perjalanan (jenis layanan, destinasi, jumlah orang, tanggal, budget range, catatan), nomor WhatsApp, email, alamat kantor, Google Maps embed
- **CTA:** Submit form brief | Atau: "Langsung Chat WhatsApp" (alternatif cepat)
- **Halaman terkait:** /layanan/, /paket/
- **Dependency:** `[CLIENT CONTENT REQUIRED: nomor WhatsApp, email, alamat dikonfirmasi]`
- **Status:** READY FOR LOW-FIDELITY WIREFRAME — struktur form bisa dibuild; kontak detail menunggu klien

---

## 6. Content Type Definitions (Diperbarui)

| Tipe | Definisi | Format | URL Pattern |
|---|---|---|---|
| **Layanan** | Menjelaskan jenis layanan berdasarkan segmen pengguna dan cara kerjanya | Deskripsi + proses + CTA | /layanan/[jenis] |
| **Paket** | Trip konkret dengan destinasi, durasi, dan detail spesifik yang bisa dipesan | Detail produk | /paket/[nama] |
| **Destinasi** | Halaman berbasis lokasi untuk SEO; menampilkan paket yang tersedia ke destinasi tersebut | Halaman lokasi + katalog paket terkait | /destinasi/[lokasi] |
| **Pengalaman** | Cerita perjalanan nyata dari trip yang sudah terlaksana; bukan gallery foto statis | Trip story / mini case study | /pengalaman/ (satu halaman index dengan entries) |
| **Artikel Blog** | Konten editorial informatif untuk SEO dan awareness; bukan halaman penjualan | Artikel panjang | /blog/[slug] |

### Mencegah Duplikasi

| Skenario | Solusi |
|---|---|
| Paket ke Bali juga muncul di halaman Destinasi Bali | Halaman Paket = halaman penjualan dengan detail. Halaman Destinasi = halaman eksplorasi dengan daftar paket ringkas + link ke detail |
| Artikel blog tentang Bromo dan halaman Destinasi Bromo | Artikel = tips/panduan editorial. Destinasi = paket yang tersedia, bukan panduan wisata umum |
| Pengalaman perjalanan dan galeri foto | Pengalaman = cerita + foto + layanan terkait. Tidak ada galeri foto standalone terpisah |
| Layanan Group Trip dan Paket Group Trip | Layanan = menjelaskan cara kerja dan untuk siapa. Paket = produk konkret yang bisa dipesan |

---

## 7. Destination Publication Rules (Koreksi #3)

Setiap halaman destinasi harus melewati checklist berikut sebelum dipublikasikan:

### Syarat Publikasi Halaman Destinasi

| Syarat | Deskripsi |
|---|---|
| ✓ Layanan aktif | X3 benar-benar melayani perjalanan ke destinasi ini saat ini |
| ✓ Konten original tersedia | Minimum: deskripsi destinasi (bukan copy-paste Wikipedia), 2–3 highlight atraksi yang terverifikasi, minimal 1 paket yang aktif |
| ✓ Tujuan berbeda dari blog | Halaman destinasi bukan artikel tips — fokus pada paket dan konversi |
| ✓ Foto dokumentasi tersedia | Minimal 1 foto nyata dari perjalanan X3 ke destinasi ini |
| ✓ Tidak duplikasi paket | Halaman destinasi menampilkan ringkasan paket + link, bukan copy isi halaman paket |

### Status Setiap Destinasi

| Destinasi | Atraksi Terverifikasi | Paket Aktif Dikonfirmasi | Status |
|---|---|---|---|
| Batu–Malang | ✓ (snippet terverifikasi) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Bromo | ✓ (blog dikonfirmasi klien) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Bali | ✓ (snippet terverifikasi) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Nusa Penida | ✓ (disebutkan dalam Bali snippet) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Jogja | ✓ (snippet terverifikasi) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Lombok | ✓ (snippet terverifikasi) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |
| Banyuwangi | ✓ (snippet terverifikasi) | `[CLIENT CONFIRMATION REQUIRED]` | **DRAFT** |

**Kebijakan DRAFT:** Halaman destinasi yang belum memenuhi semua syarat tetap dibangun secara struktural tetapi tidak dipublikasikan (no-index, tidak masuk navigasi, tidak muncul di sitemap.xml). Dipublikasikan hanya setelah klien mengkonfirmasi paket aktif dan foto tersedia.

**Catatan Bali vs Nusa Penida:** Evaluasi setelah konfirmasi klien apakah keduanya digabung (/destinasi/bali/) atau dipisah (/destinasi/bali/ dan /destinasi/nusa-penida/). Jika paket selalu mencakup keduanya dalam satu itinerary, gabung. Jika ada paket Bali-only dan Nusa Penida-only, pisah.

---

## 8. Final Homepage Architecture (Koreksi #4 dan #7)

### Keputusan: Audience Entry Points + Core Services → Digabung

**Alasan penggabungan:** Dua section card berturutan dengan subjek serupa (segmen audiens vs jenis layanan) menciptakan pengalaman yang repetitif dan tidak menambah informasi baru. Pengunjung scroll dua kali melewati konten yang sama bentuknya.

**Solusi yang dipilih:** Satu section "Layanan berdasarkan Kebutuhan" yang menggabungkan audience entry + deskripsi layanan utama dalam satu kartu. Setiap kartu menjelaskan *untuk siapa* + *apa yang didapat* + satu CTA.

### Hasil: 13 Section → 11 Section

Section yang dihapus:
- Section 4 (Core Services) → digabung ke Section 3 (sekarang "Pilih Berdasarkan Kebutuhan Anda")
- Section 11 (FAQ) → dipertahankan tapi posisi bisa fleksibel (sebelum Final CTA)

Jumlah section final: **11 (termasuk Header dan Footer)**

---

### Section 1 — Header / Navigation
- **Tujuan:** Branding global dan akses cepat ke semua area website
- **Konten:** Logo, menu navigasi, CTA button WhatsApp
- **CTA:** "Konsultasi WhatsApp" (gold button)
- **Mobile:** Hamburger + floating WhatsApp button
- **Dependency:** Logo file, nomor WhatsApp

---

### Section 2 — Hero
- **Tujuan:** Menetapkan identitas dan nilai utama dalam 3 detik
- **Pesan:** "Your Vacation, Our Priority"
- **Konten:**
  - Headline: "Your Vacation, Our Priority"
  - Subheadline: 1 kalimat — X3 sebagai mitra perjalanan terorganisir dari konsultasi hingga eksekusi
  - Visual: `[CLIENT CONTENT REQUIRED — BLOCKER: foto dokumentasi perjalanan nyata, landscape/full-width]`
  - CTA primer: "Mulai Konsultasi" → WhatsApp
  - CTA sekunder: "Lihat Layanan Kami" → scroll ke Section 3
- **Mobile:** Headline + CTA di atas, foto sebagai background dengan overlay

---

### Section 3 — Pilih Berdasarkan Kebutuhan Anda (Gabungan — Koreksi #4)
- **Tujuan:** Membantu pengunjung menemukan layanan yang tepat dalam satu klik; menggantikan dua section terpisah (audience entry + core services)
- **Pesan:** "Kami melayani berbagai jenis perjalanan — temukan yang sesuai dengan Anda"
- **Konten:** 5 kartu, masing-masing memuat:
  - Ikon atau ilustrasi
  - Untuk siapa (label audiens)
  - Nama layanan
  - Deskripsi 1 baris
  - Link "Pelajari Lebih Lanjut" → halaman layanan
  
  Kartu yang direncanakan:
  1. Perusahaan & Korporat → /layanan/group-trip/
  2. Team Building → /layanan/team-building/
  3. Kampus & Institusi → /layanan/kampus-institusi/
  4. Keluarga → /layanan/family-trip/
  5. Open Trip → /layanan/open-trip/
- **Mobile:** 2 kolom (3+2) atau scroll horizontal
- **Dependency:** Deskripsi singkat per layanan (dapat ditulis tanpa aset klien)

---

### Section 4 — Paket atau Destinasi Unggulan
- **Tujuan:** Menampilkan pilihan konkret — dari "mau kemana" menjadi "booking"
- **Pesan:** "Mulai dari sini — jelajahi paket perjalanan kami"
- **Konten:** 3–4 kartu paket unggulan: nama, destinasi, durasi, foto thumbnail, CTA
  - `[CLIENT CONTENT REQUIRED: paket aktif dengan foto]`
- **CTA:** "Lihat Semua Paket" → /paket/
- **Mobile:** Scroll horizontal atau 1 kolom
- **Dependency:** Minimal 3 paket aktif dengan foto (BLOCKER untuk populasi final)

---

### Section 5 — Mengapa Memilih X3
- **Tujuan:** Diferensiasi dari kompetitor generik
- **Pesan:** "Bukan sekadar agen tiket — mitra perjalanan Anda"
- **Konten:** 3–4 keunggulan spesifik dan konkret (OFFICIAL BRAND CLAIM, bukan klaim kosong):
  - End-to-end: konsultasi hingga eksekusi
  - Custom: disesuaikan dengan kebutuhan, bukan paket kaku
  - Transparan: rincian harga jelas
  - `[CLIENT CONTENT REQUIRED: keunggulan ke-4 yang spesifik]`
- **Mobile:** Single column dengan ikon

---

### Section 6 — Cara Kerja
- **Tujuan:** Mengurangi kecemasan — "apakah prosesnya ribet?"
- **Pesan:** "Mudah dari awal hingga akhir"
- **Konten:** 4 langkah:
  1. Konsultasi via WhatsApp
  2. Tim menyusun itinerary dan penawaran
  3. Konfirmasi dan DP
  4. Berangkat — X3 yang koordinasi
- **CTA:** "Mulai Konsultasi" → WhatsApp
- **Dependency:** Validasi alur pemesanan aktual dari klien

---

### Section 7 — Pengalaman Perjalanan (Preview)
- **Tujuan:** Bukti visual dan naratif bahwa X3 benar-benar menjalankan perjalanan
- **Pesan:** "Perjalanan nyata dari klien kami"
- **Konten:** Preview 2–3 trip stories dari /pengalaman/ — setiap entry: jenis klien, destinasi, foto, 1 kalimat cerita
  - `[CLIENT CONTENT REQUIRED — BLOCKER: foto dan narasi singkat per trip]`
- **CTA:** "Lihat Semua Pengalaman" → /pengalaman/
- **Mobile:** Scroll horizontal atau 1 kolom

---

### Section 8 — Testimoni
- **Tujuan:** Social proof dari klien nyata
- **Pesan:** "Apa kata mereka yang sudah bepergian bersama X3"
- **Konten:**
  - `[CLIENT CONTENT REQUIRED — BLOCKER: minimum 3 testimoni nyata dengan nama, jabatan/institusi, jenis perjalanan]`
  - Format: foto (opsional), nama, institusi, kutipan
- **Mobile:** Carousel swipe

---

### Section 9 — Travel Insights (Blog Preview)
- **Tujuan:** Membangun authority dan mendorong engagement lebih dalam
- **Pesan:** "Tips dan inspirasi perjalanan dari tim X3"
- **Konten:** 3 artikel terbaru dari blog (CLIENT-STATED: sudah ada 3 artikel)
- **CTA:** "Baca Semua Artikel" → /blog/
- **Mobile:** Single column

---

### Section 10 — FAQ
- **Tujuan:** Menjawab keberatan umum sebelum pengunjung meninggalkan halaman
- **Pesan:** "Pertanyaan yang sering kami terima"
- **Konten:** 4 pertanyaan yang paling umum:
  - Bagaimana cara memesan?
  - Apakah bisa custom itinerary?
  - Berapa minimal peserta group trip?
  - `[CLIENT CONTENT REQUIRED: pertanyaan ke-4 + semua jawaban aktual]`
- **CTA:** "Masih ada pertanyaan? Tanya langsung via WhatsApp"
- **Mobile:** Accordion collapse

---

### Section 11 — Final CTA
- **Tujuan:** Satu ajakan terakhir sebelum footer
- **Pesan:** "Siap merencanakan perjalanan Anda?"
- **Konten:** Headline singkat + subtext + 2 CTA
  - CTA primer: "Mulai Konsultasi di WhatsApp"
  - CTA sekunder: "Lihat Semua Paket"
- **Background:** Navy — kontras dengan body terang
- **Mobile:** Full width, tombol besar

---

### Section 12 — Footer
- **Konten:** Logo, tagline, navigasi ringkas, ikon sosial media, kontak, info legal
- **Dependency:** `[CLIENT CONTENT REQUIRED: nomor WA, email, alamat, nama legal resmi]`

---

## 9. WhatsApp Conversion Strategy (Dipertahankan dari v1.0 dengan penyesuaian)

### Prinsip
- Maksimum 2 WhatsApp CTA per halaman (floating sudah cover global)
- Label berbeda per halaman — jangan "Hubungi Kami" di semua tempat
- Pesan pre-filled mengidentifikasi konteks (layanan, paket, atau destinasi)

### CTA per Halaman

| Halaman | Label CTA | Pesan Pre-filled |
|---|---|---|
| Home (Hero) | "Mulai Konsultasi" | "Halo X3, saya ingin konsultasi perjalanan." |
| Home (Final CTA) | "Rencanakan Perjalanan Sekarang" | "Halo X3, saya ingin merencanakan perjalanan." |
| /layanan/group-trip/ | "Konsultasikan Gathering Anda" | "Halo, saya butuh bantuan gathering/company trip untuk [perusahaan]." |
| /layanan/team-building/ | "Rancang Program Team Building" | "Halo, saya tertarik dengan layanan team building untuk [jumlah] orang." |
| /layanan/kampus-institusi/ | "Rencanakan Trip Kampus" | "Halo, saya dari [institusi] ingin merencanakan trip untuk [jumlah] peserta." |
| /layanan/family-trip/ | "Ceritakan Rencana Family Trip" | "Halo, saya ingin merencanakan family trip untuk [jumlah] orang." |
| /layanan/open-trip/ | "Daftar Open Trip" | "Halo, saya tertarik daftar open trip ke [destinasi]." |
| /paket/[nama]/ | "Tanya tentang Paket Ini" | "Halo, saya tertarik dengan paket [nama paket]. Boleh saya tahu detail lebih lanjut?" |
| /destinasi/[nama]/ | "Rencanakan Trip ke [Destinasi]" | "Halo, saya ingin informasi paket ke [destinasi]." |
| /pengalaman/ | "Trip Serupa untuk Anda?" | "Halo, saya tertarik merencanakan trip seperti yang saya lihat di halaman pengalaman." |
| /blog/[slug]/ | "Butuh Bantuan Merencanakan Trip Ini?" | "Halo, saya baca artikel [judul] dan ingin konsultasi perjalanan." |

---

## 10. Corrected Build Sequence (Koreksi #6)

### Fase 1 — Foundation (Tidak memerlukan aset klien)
**Status: READY FOR CONTENT PLANNING + LOW-FIDELITY WIREFRAME**
1. Konfirmasi domain utama dengan klien (KRITIKAL sebelum build apapun)
2. Setup repository, hosting, framework/CMS
3. Design system: warna (navy/blue/gold/silver), tipografi, komponen UI dasar
4. Layout global: navbar, footer skeleton
5. Wireframe homepage (semua 11 section dengan placeholder)
6. Wireframe halaman layanan (template yang direplikasi)

### Fase 2 — Core Pages (Memerlukan daftar layanan dikonfirmasi)
**Status: READY FOR CONTENT PLANNING**
7. /layanan/ (induk) — semua 5 sub-halaman layanan
8. /tentang/
9. /kontak/ + form brief (struktur tanpa kontak detail)
10. /blog/ index + template artikel
11. /paket/ index (skeleton, menunggu data paket dari klien)
12. /destinasi/ index + 7 halaman destinasi dalam status DRAFT

### Fase 3 — Content + SEO (Memerlukan paket, artikel, konten destinasi)
**Status: CONDITIONALLY READY FOR VISUAL DESIGN**
13. Populasi halaman paket dengan data dari klien
14. Audit dan optimasi 3 artikel blog yang ada
15. Aktivasi halaman destinasi yang memenuhi syarat publikasi
16. Internal linking: blog → layanan → destinasi → paket
17. Meta title, meta description, Open Graph per halaman

### Fase 4 — Trust Content (Memerlukan foto dan testimoni dari klien)
**Status: Menunggu aset klien**
18. Populasi /pengalaman/ dengan trip stories nyata
19. Populasi testimoni di homepage dan halaman layanan
20. Populasi foto dokumentasi di Hero, Section 7, halaman paket, halaman destinasi
21. Finalisasi semua CTA WhatsApp dengan nomor resmi dan pesan pre-filled

### Fase 5 — Launch Preparation
**Status: NOT READY FOR FINAL PUBLICATION (menunggu Fase 4)**
22. Submit sitemap ke Google Search Console
23. Setup redirect dari domain kedua ke domain utama
24. Test semua CTA WhatsApp (link, nomor, pesan pre-filled)
25. Mobile QA di berbagai device
26. Performance check (loading, Core Web Vitals)

---

## 11. Remaining Client Dependencies

| Informasi | Dampak | Fase yang Diblokir | Prioritas |
|---|---|---|---|
| Konfirmasi domain utama | Tidak bisa deploy apapun | Fase 1 | **KRITIKAL** |
| Nomor WhatsApp resmi | Semua CTA tidak bisa difinalkan | Fase 4 | **KRITIKAL** |
| Foto dokumentasi perjalanan (min. 15 foto) | Hero, Pengalaman, Paket, Destinasi | Fase 4 | **KRITIKAL** |
| Testimoni klien nyata (min. 3) | Section testimoni homepage + layanan | Fase 4 | **KRITIKAL** |
| Daftar paket aktif (nama, destinasi, durasi, inclusions) | /paket/ index + detail | Fase 3 | **TINGGI** |
| Konfirmasi destinasi yang aktif dilayani | Aktivasi halaman destinasi | Fase 3 | **TINGGI** |
| Jadwal + harga open trip | /layanan/open-trip/, /paket/ open trip | Fase 3 | **TINGGI** |
| Jawaban FAQ (4 pertanyaan) | Section FAQ homepage + /kontak/ | Fase 2 | **SEDANG** |
| Nama legal resmi yang dikonfirmasi | Footer, /tentang/ | Fase 2 | **SEDANG** |
| Email resmi | /kontak/, footer | Fase 2 | **SEDANG** |
| Narasi trip stories per pengalaman | /pengalaman/ | Fase 4 | **SEDANG** |
| Detail aktivitas team building | /layanan/team-building/ | Fase 2 | **SEDANG** |
| Logo klien korporat (jika ada izin) | /tentang/ | Fase 4 | **RENDAH** |
| Foto tim X3 | /tentang/ | Fase 4 | **RENDAH** |

---

## 12. Corrected Planning Readiness Status (Koreksi #6)

```
READY FOR CONTENT PLANNING
  Sitemap, arsitektur informasi, dan user journey sudah cukup
  untuk mulai menyusun copy dan konten placeholder.
  Tidak memerlukan foto atau testimoni.

READY FOR LOW-FIDELITY WIREFRAME
  Semua section homepage dan halaman layanan sudah terdefinisi
  dengan jelas. Wireframe dapat dimulai sekarang dengan
  placeholder untuk konten yang belum ada.

CONDITIONALLY READY FOR VISUAL DESIGN
  Design system (warna, tipografi, spacing) dapat dikembangkan.
  Desain visual halaman dapat dimulai dengan placeholder.
  Tidak bisa difinalisasi sebelum foto dokumentasi tersedia.

NOT READY FOR FINAL PUBLICATION
  Menunggu: domain utama dikonfirmasi, foto perjalanan nyata,
  testimoni klien, nomor WhatsApp resmi, daftar paket aktif,
  konfirmasi destinasi yang dilayani.
```

---

## 13. Sections and Pages Intentionally Excluded

| Yang Dikecualikan | Alasan |
|---|---|
| Section "Core Services" terpisah | Digabung ke "Pilih Berdasarkan Kebutuhan" (Section 3) |
| Halaman /galeri/ | Digantikan oleh /pengalaman/ yang lebih informatif dan conversion-focused |
| Halaman /custom-trip/ terpisah | Diintegrasikan ke semua halaman layanan — tidak perlu halaman sendiri |
| Halaman /faq/ terpisah | FAQ cukup sebagai section homepage; halaman terpisah tidak efisien untuk konversi |
| Halaman /company-gathering/ terpisah | Konten tidak cukup berbeda dari /group-trip/ untuk membenarkan halaman terpisah |
| Halaman /career/ | Tidak relevan dengan tujuan konversi website |

---

## 14. Quality Loop — Pre-Return Review

**1. Navigation completeness:** ✓ Semua halaman terhubung dari navbar dan cross-links antar halaman

**2. Service overlap:** ✓ Group Trip dan Team Building dipisah karena user intent berbeda. Company Gathering digabung ke Group Trip karena overlap terlalu tinggi untuk halaman terpisah.

**3. Content-type duplication:** ✓ Layanan / Paket / Destinasi / Pengalaman / Blog memiliki definisi dan peran yang berbeda. Tabel pencegahan duplikasi tersedia di Seksi 6.

**4. Homepage redundancy:** ✓ Audience Entry Points dan Core Services sudah digabung menjadi satu section. 13 → 11 section.

**5. Package / Destination / Article / Experience distinctions:** ✓ Setiap tipe konten memiliki definisi, URL pattern, format, dan peran yang jelas.

**6. Readiness classification:** ✓ Sistem 4-level digunakan. Foto dan testimoni tidak memblokir perencanaan, wireframe, atau eksplorasi visual — hanya memblokir populasi konten final dan publikasi.

**7. Revision applied:** ✓ Satu revisi dilakukan setelah review awal.

---

## 15. Final Planning Status

```
FINAL STATUS: PASS

Semua 8 koreksi yang diminta sudah diterapkan.
Arsitektur informasi sudah lengkap dan konsisten.
Tidak ada duplikasi konten antar tipe halaman.
Tidak ada section homepage yang redundan.
Sistem readiness classification sudah proporsional.
Aturan publikasi destinasi sudah terdefinisi.

Website Plan v1.1 siap digunakan sebagai dasar
low-fidelity wireframe dan content planning.
```
