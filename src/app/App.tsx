import { useState, useEffect, useContext, createContext, useRef } from "react"
import {
  Menu, X, ChevronDown, ChevronLeft, ArrowRight, ChevronRight,
  Users, Building2, GraduationCap, Home, Compass,
  CheckCircle, MessageCircle, Phone, Mail, MapPin,
  Star, Clock, Shield, Zap, Send, Loader2,
  Package, Sparkles, BookOpen, ExternalLink, Play, Filter
} from "lucide-react"
import { IMAGES, TESTIMONIALS } from "@/lib/media"
import { COMPANY } from "@/lib/company"
import { SOCIAL_LINKS, SOCIAL_PROFILES, utmSourceLabel, type SocialProfilePlatform } from "@/lib/social"
import { usePageSeo } from "@/hooks/usePageSeo"
import { SocialLinks } from "@/components/SocialLinks"
import { SeoLandingPage } from "@/components/SeoLandingPage"
import { LANDING_PAGES } from "@/lib/landingPages"
import { BLOG_POSTS, BLOG_POST_BY_PATH } from "@/lib/blogPosts"
import { BlogArticlePage, BlogArticleCard } from "@/components/BlogArticlePage"
import { SERVICE_FAQS, SERVICE_SCOPE_EXTRAS } from "@/lib/serviceFaqs"
import { DEST_DETAIL_PATH } from "@/lib/routes"
import { SOCIAL_POSTS, type SocialPost } from "@/lib/socialPosts"

// ─── Config ───────────────────────────────────────────────────────────────────
const WA_NUMBER = COMPANY.phoneWa
const wa = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
const DEFAULT_MSG = "Halo X3, saya ingin konsultasi perjalanan."

// ─── UTM Session Tracking ─────────────────────────────────────────────────────
function readUrlUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  ;["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((k) => {
    const v = params.get(k)
    if (v) out[k] = v
  })
  return out
}
function getSessionUtm(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem("x3_utm") || "{}") } catch { return {} }
}
function saveSessionUtm(d: Record<string, string>) {
  try { sessionStorage.setItem("x3_utm", JSON.stringify(d)) } catch {}
}
function buildUtmWaMsg(serviceLabel: string): string {
  const utm = getSessionUtm()
  if (!utm.utm_source) return `Halo X3 Organizer, saya ingin berkonsultasi mengenai ${serviceLabel}.`
  const src = utmSourceLabel(utm.utm_source)
  return `Halo X3 Organizer, saya datang dari ${src} dan ingin berkonsultasi mengenai ${serviceLabel}.`
}

// ─── Router ───────────────────────────────────────────────────────────────────
type NavCtx = { path: string; navigate: (to: string) => void }
const NavContext = createContext<NavCtx>({ path: "/", navigate: () => {} })
const useNav = () => useContext(NavContext)

function Link({
  to, children, className = "", onClick,
}: {
  to: string; children: React.ReactNode; className?: string; onClick?: () => void
}) {
  const { navigate } = useNav()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => { e.preventDefault(); onClick?.(); navigate(to) }}
    >
      {children}
    </a>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "group-trip", path: "/layanan/group-trip",
    forWhom: "Perusahaan & Korporat",
    title: "Group Trip & Gathering",
    desc: "Outing kantor, company trip, dan gathering perusahaan yang terencana dan berkesan.",
    waMsg: "Halo X3, saya butuh bantuan merencanakan gathering/company trip.",
    Icon: Building2,
    img: IMAGES.services.groupTrip,
    color: "#113356",
  },
  {
    id: "team-building", path: "/layanan/team-building",
    forWhom: "Tim Anda",
    title: "Team Building",
    desc: "Program kolaborasi terstruktur—outbound, Amazing Race, dan aktivitas yang membangun kerjasama.",
    waMsg: "Halo X3, saya tertarik dengan layanan team building.",
    Icon: Users,
    img: IMAGES.services.teamBuilding,
    color: "#1A436D",
  },
  {
    id: "kampus-institusi", path: "/layanan/kampus-institusi",
    forWhom: "Kampus & Sekolah",
    title: "Kampus & Institusi",
    desc: "Studi wisata, trip angkatan, dan kunjungan institusi untuk kelompok besar.",
    waMsg: "Halo X3, saya dari institusi dan ingin merencanakan trip kelompok.",
    Icon: GraduationCap,
    img: IMAGES.services.kampusInstitusi,
    color: "#0B2542",
  },
  {
    id: "family-trip", path: "/layanan/family-trip",
    forWhom: "Keluarga",
    title: "Family Trip Custom",
    desc: "Perjalanan keluarga yang dirancang sesuai kebutuhan—destinasi dan durasi yang bisa disesuaikan.",
    waMsg: "Halo X3, saya ingin merencanakan family trip.",
    Icon: Home,
    img: IMAGES.services.familyTrip,
    color: "#113356",
  },
  {
    id: "open-trip", path: "/layanan/open-trip",
    forWhom: "Individu & Pasangan",
    title: "Open Trip",
    desc: "Bergabung dalam perjalanan yang sudah terencana bersama peserta lain. Cukup hadir dan nikmati.",
    waMsg: "Halo X3, saya tertarik bergabung open trip. Boleh info jadwal tersedia?",
    Icon: Compass,
    img: IMAGES.services.openTrip,
    color: "#1A436D",
  },
]

const SERVICE_DETAILS: Record<string, {
  headline: string; sub: string; problems: string[]
  benefits: { title: string; desc: string }[]
  scope: string[]; steps: string[]; faq: { q: string; a: string }[]
}> = {
  "group-trip": {
    headline: "Jasa Gathering Perusahaan & Company Trip yang Terencana",
    sub: "Outing kantor, company trip organizer, dan gathering perusahaan yang terkoordinasi — transportasi, akomodasi, dan aktivitas kelompok dalam satu alur yang jelas. Cocok untuk HR, GA, dan tim yang ingin acara berjalan lancar tanpa repot.",
    problems: [
      "Sulit koordinasi perjalanan untuk banyak orang sekaligus",
      "Tidak punya waktu untuk riset destinasi dan vendor satu per satu",
      "Anggaran terbatas tapi tetap ingin acara yang berkesan",
      "Pernah kecewa dengan vendor yang tidak sesuai janji",
    ],
    benefits: [
      { title: "Satu Titik Kontak", desc: "Semua kebutuhan—transportasi, akomodasi, dan aktivitas—kami koordinasikan dalam satu alur yang jelas." },
      { title: "Itinerary Disesuaikan", desc: "Rencana perjalanan dibuat berdasarkan tujuan acara dan karakter tim Anda, bukan template standar." },
      { title: "Rincian Biaya Jelas", desc: "Sebelum memutuskan, Anda sudah tahu apa yang termasuk—tidak ada kejutan di akhir." },
    ],
    scope: ["Outing kantor", "Company gathering", "Company trip ke destinasi wisata", "Koordinasi transportasi dan akomodasi grup", "Aktivitas kelompok dan wisata"],
    steps: ["Konsultasi—ceritakan tujuan acara, jumlah peserta, dan anggaran", "Kami siapkan rencana dan penawaran", "Review bersama—revisi hingga sesuai", "Konfirmasi dan keberangkatan"],
    faq: SERVICE_FAQS['group-trip'],
  },
  "team-building": {
    headline: "Jasa Team Building Perusahaan yang Tepat Sasaran",
    sub: "Team building yang dirancang dengan baik membantu tim bekerja lebih baik bersama—dan diingat jauh setelah acara selesai. X3 Organizer membantu Anda merancang program yang sesuai dengan tujuan dan karakter tim.",
    problems: [
      "Team building sebelumnya terasa seperti acara biasa tanpa dampak",
      "Tidak tahu harus mulai dari mana untuk program yang tepat",
      "Sulit menyesuaikan aktivitas dengan kondisi peserta yang beragam",
    ],
    benefits: [
      { title: "Berbasis Tujuan", desc: "Program dirancang berdasarkan apa yang ingin Anda capai—bukan sekadar mengisi hari." },
      { title: "Aktivitas Terstruktur", desc: "Amazing Race, outbound, dan aktivitas lain yang disesuaikan dengan jumlah dan kondisi peserta." },
      { title: "Pilihan Lokasi", desc: "Indoor atau outdoor, di kota atau di alam—kami bantu tentukan yang paling sesuai." },
    ],
    scope: ["Amazing Race", "Outbound", "Program aktivitas terstruktur", "Kombinasi team building + trip", ...SERVICE_SCOPE_EXTRAS['team-building']],
    steps: ["Konsultasi—ceritakan tujuan, jumlah peserta, dan kondisi tim", "Kami rekomendasikan aktivitas yang paling sesuai", "Konfirmasi program dan lokasi", "Eksekusi oleh tim X3"],
    faq: SERVICE_FAQS['team-building'],
  },
  "kampus-institusi": {
    headline: "Jasa Trip Kampus & Studi Wisata Terkoordinasi",
    sub: "Perjalanan untuk puluhan hingga ratusan mahasiswa atau siswa membutuhkan perhatian ekstra pada keamanan, jadwal, dan koordinasi. X3 Organizer membantu institusi merencanakan dan menjalankan trip dengan lebih terstruktur.",
    problems: [
      "Mengkoordinasikan ratusan peserta dalam satu perjalanan sangat menguras tenaga panitia",
      "Sulit menemukan vendor yang bisa menyesuaikan dengan jadwal akademik",
      "Khawatir dengan aspek keamanan dan koordinasi peserta di lokasi",
    ],
    benefits: [
      { title: "Koordinasi Grup Besar", desc: "Pengalaman menangani trip institusi dengan peserta dalam jumlah besar secara terstruktur." },
      { title: "Fleksibel Agenda", desc: "Itinerary yang bisa disesuaikan dengan tujuan edukatif atau rekreasi dan jadwal akademik." },
      { title: "Satu PIC untuk Semua", desc: "Satu titik kontak untuk seluruh kebutuhan teknis perjalanan institusi." },
    ],
    scope: ["Studi wisata", "Trip angkatan atau wisuda", "Campus gathering", "Kunjungan lapangan institusi", ...SERVICE_SCOPE_EXTRAS['kampus-institusi']],
    steps: ["Konsultasi dengan panitia atau PIC institusi", "Kami siapkan rencana dan penawaran", "Koordinasi teknis: manifest peserta, transportasi, akomodasi", "Koordinasi hari H"],
    faq: SERVICE_FAQS['kampus-institusi'],
  },
  "family-trip": {
    headline: "Paket Family Trip Custom untuk Keluarga Anda",
    sub: "Tidak ada dua keluarga yang sama. X3 Organizer membantu Anda merencanakan family trip yang benar-benar sesuai dengan cara liburan keluarga Anda—bukan memaksakan Anda masuk ke dalam paket yang sudah jadi.",
    problems: [
      "Paket yang ada tidak cocok dengan kondisi dan preferensi keluarga",
      "Bingung menentukan destinasi yang bisa dinikmati semua anggota keluarga",
      "Khawatir ada yang terlewat atau tidak terkoordinasi saat di lokasi",
    ],
    benefits: [
      { title: "Itinerary Custom", desc: "Destinasi, durasi, aktivitas, dan kecepatan perjalanan disesuaikan dengan keluarga Anda." },
      { title: "Koordinasi Penuh", desc: "Transportasi dan akomodasi diurus sesuai kebutuhan keluarga, dari berangkat hingga kembali." },
      { title: "Satu Kontak", desc: "Satu nomor untuk semua pertanyaan sebelum dan selama perjalanan." },
    ],
    scope: ["Family trip custom ke berbagai destinasi", "Koordinasi transportasi dan akomodasi", "Penyusunan itinerary harian", ...SERVICE_SCOPE_EXTRAS['family-trip']],
    steps: ["Konsultasi—ceritakan komposisi keluarga dan preferensi destinasi", "Kami rekomendasikan dan susun itinerary", "Review bersama—revisi hingga sesuai", "Konfirmasi dan keberangkatan"],
    faq: SERVICE_FAQS['family-trip'],
  },
  "open-trip": {
    headline: "Bergabung dalam Perjalanan yang Sudah Terencana",
    sub: "Tidak perlu merencanakan sendiri. Dalam open trip X3 Organizer, Anda bergabung dengan peserta lain dalam perjalanan yang sudah kami rancang—transportasi, akomodasi, dan itinerary sudah tersedia. Anda tinggal hadir dan menikmati.",
    problems: [
      "Ingin traveling tapi tidak punya teman yang mau ikut",
      "Repot merencanakan sendiri—riset, booking, koordinasi",
      "Ingin traveling dengan anggaran yang lebih efisien",
    ],
    benefits: [
      { title: "Semua Sudah Terencana", desc: "Transportasi, akomodasi, dan itinerary sudah tersedia. Anda tinggal hadir." },
      { title: "Bergabung dengan Peserta Lain", desc: "Bertemu dan bepergian bersama orang-orang baru yang memiliki minat serupa." },
      { title: "Lebih Efisien", desc: "Biaya lebih terjangkau dibanding trip private karena berbagi dengan peserta lain." },
    ],
    scope: ["Open trip ke berbagai destinasi", ...SERVICE_SCOPE_EXTRAS['open-trip']],
    steps: ["Hubungi kami untuk cek jadwal yang tersedia", "Pilih destinasi dan tanggal yang sesuai", "Daftar dan lakukan konfirmasi", "Berangkat bersama peserta lain"],
    faq: SERVICE_FAQS['open-trip'],
  },
}

const FEATURED_PACKAGES = [
  {
    id: "family-trip-batu-malang", path: "/paket/family-trip-batu-malang",
    tag: "Family Trip", tagColor: "#1A436D",
    title: "Family Trip Batu–Malang Edukatif",
    destination: "Batu & Malang, Jawa Timur",
    duration: "3 Hari 2 Malam",
    note: "Contoh Program",
    img: IMAGES.packages.familyTripBatuMalang,
  },
  {
    id: "outing-bromo", path: "/destinasi/bromo",
    tag: "Group Trip", tagColor: "#0B2542",
    title: "Outing Kantor ke Bromo",
    destination: "Bromo, Jawa Timur",
    duration: "2 Hari 1 Malam",
    note: "Inspirasi Perjalanan",
    img: IMAGES.packages.outingBromo,
  },
  {
    id: "nusa-penida", path: "/destinasi/nusa-penida",
    tag: "Open Trip", tagColor: "#1A436D",
    title: "Eksplorasi Nusa Penida",
    destination: "Nusa Penida, Bali",
    duration: "3 Hari 2 Malam",
    note: "Inspirasi Perjalanan",
    img: IMAGES.packages.nusaPenida,
  },
]

const DESTINATIONS = [
  {
    name: "Batu & Malang", slug: "batu-malang",
    desc: "Wisata alam, wahana, dan udara sejuk pegunungan Jawa Timur.",
    img: IMAGES.destinations.batuMalang,
    highlights: ["Jatim Park 2", "Museum Angkut", "Coban Rondo", "Gunung Bromo"],
  },
  {
    name: "Bromo", slug: "bromo",
    desc: "Sunrise spektakuler dan lanskap vulkanik yang ikonik.",
    img: IMAGES.destinations.bromo,
    highlights: ["Sunrise Pananjakan", "Kawah Bromo", "Savana Teletubbies"],
  },
  {
    name: "Bali & Nusa Penida", slug: "bali",
    desc: "Budaya, pantai, dan destinasi ikonik untuk semua jenis kelompok.",
    img: IMAGES.destinations.baliNusaPenida,
    highlights: ["GWK", "Pantai Pandawa", "Nusa Penida", "Pura Uluwatu"],
  },
  {
    name: "Jogja", slug: "jogja",
    desc: "Warisan budaya, kuliner, dan petualangan alam yang kaya.",
    img: IMAGES.destinations.jogja,
    highlights: ["Lava Tour Merapi", "Malioboro", "Pindul", "Hutan Pinus"],
  },
  {
    name: "Lombok", slug: "lombok",
    desc: "Pantai bersih dan keindahan alam yang belum banyak terjamah.",
    img: IMAGES.destinations.lombok,
    highlights: ["Pantai Mawun", "Tanjung Aan", "Bukit Merese", "Gili Nanggu"],
  },
  {
    name: "Banyuwangi", slug: "banyuwangi",
    desc: "Kawah Ijen yang memukau dan hutan alam yang masih terjaga.",
    img: IMAGES.destinations.banyuwangi,
    highlights: ["Kawah Ijen", "Taman Nasional Baluran", "Pantai Plengkung"],
  },
]


const FAQ_ITEMS = [
  {
    q: "Apakah perjalanan dapat disesuaikan dengan kebutuhan grup?",
    a: "Ya. Selain paket yang sudah tersedia, kami juga menerima permintaan perjalanan yang disesuaikan—baik dari sisi destinasi, durasi, aktivitas, maupun anggaran. Ceritakan kebutuhan Anda dan tim kami akan menyiapkan rencana yang sesuai.",
  },
  {
    q: "Bagaimana cara memulai konsultasi?",
    a: "Hubungi kami via WhatsApp atau isi form brief perjalanan di halaman Kontak. Tidak perlu format khusus—cukup ceritakan jenis trip, jumlah peserta, dan destinasi yang Anda inginkan. Tim kami akan merespons dan membantu melengkapi detailnya.",
  },
  {
    q: "Apakah X3 Organizer melayani perjalanan perusahaan dan institusi?",
    a: "Ya. Kami melayani perusahaan yang membutuhkan gathering, outing, atau team building; kampus dan institusi untuk studi wisata atau trip angkatan; serta keluarga dan individu yang ingin perjalanan terencana.",
  },
  {
    q: "Informasi apa yang perlu disiapkan sebelum konsultasi?",
    a: "Cukup siapkan gambaran umum: jenis perjalanan yang diinginkan, perkiraan jumlah peserta, destinasi atau wilayah yang dituju, dan kisaran tanggal. Kami akan membantu melengkapi detailnya.",
  },
  {
    q: "Bagaimana mengetahui paket yang sedang tersedia?",
    a: "Anda dapat menjelajahi halaman Paket untuk melihat pilihan yang ada, atau hubungi kami langsung via WhatsApp untuk mengetahui ketersediaan dan mendapatkan rekomendasi yang sesuai dengan kebutuhan Anda.",
  },
]

// ─── UI Components ────────────────────────────────────────────────────────────

function Btn({
  children, href, to, variant = "primary", size = "md", className = "", onClick,
}: {
  children: React.ReactNode
  href?: string; to?: string; variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"; className?: string; onClick?: () => void
}) {
  const { navigate } = useNav()
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }
  const variants = {
    primary: "bg-[#C99F5F] text-white hover:bg-[#B8904F] font-semibold",
    secondary: "border-2 border-[#0B2542] text-[#0B2542] hover:bg-[#0B2542] hover:text-white font-semibold",
    ghost: "text-[#C99F5F] hover:text-[#B8904F] font-semibold underline-offset-4 hover:underline",
  }
  const base = `inline-flex items-center gap-2 rounded-lg transition-all duration-200 ${sizes[size]} ${variants[variant]} ${className}`

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={base}>{children}</a>
  if (to) return (
    <a href={to} className={base}
      onClick={(e) => { e.preventDefault(); navigate(to) }}>{children}</a>
  )
  return <button className={base} onClick={onClick}>{children}</button>
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[#C99F5F] text-xs font-bold tracking-[0.2em] uppercase mb-4">{text}</p>
  )
}

function SectionHeading({ label, title, sub, center = false }: {
  label?: string; title: string; sub?: string; center?: boolean
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {label && <SectionLabel text={label} />}
      <h2 className="text-3xl lg:text-4xl font-bold text-[#0B2542] leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-[#5A7A9F] text-lg leading-relaxed max-w-2xl">{sub}</p>}
    </div>
  )
}

function Breadcrumb({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 hidden items-center gap-2 text-sm text-[#5A7A9F] lg:mb-8 lg:flex">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} />}
          {item.path ? (
            <Link to={item.path} className="hover:text-[#0B2542] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#0B2542] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-[#E2E8F0]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between py-5 text-left gap-6"
          >
            <span className="font-semibold text-[#0B2542] leading-snug">{item.q}</span>
            <ChevronDown
              size={18}
              className={`text-[#C99F5F] flex-shrink-0 mt-0.5 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48 pb-5" : "max-h-0"}`}>
            <p className="text-[#5A7A9F] leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PackageCard({ pkg }: { pkg: typeof FEATURED_PACKAGES[number] }) {
  return (
    <Link to={pkg.path} className="group block bg-white rounded-xl overflow-hidden border border-[#E2E8F0] hover:border-[#C99F5F]/40 hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 bg-[#ABB6BF]">
        <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2542]/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-bold text-white rounded-full"
            style={{ backgroundColor: pkg.tagColor }}>{pkg.tag}</span>
          {pkg.note && (
            <span className="px-3 py-1 text-xs font-medium bg-white/90 text-[#0B2542] rounded-full">{pkg.note}</span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#0B2542] text-lg mb-2 leading-snug">{pkg.title}</h3>
        <div className="flex items-center gap-4 text-sm text-[#5A7A9F]">
          <span className="flex items-center gap-1"><MapPin size={13} />{pkg.destination}</span>
          <span className="flex items-center gap-1"><Clock size={13} />{pkg.duration}</span>
        </div>
        <div className="mt-4 flex items-center gap-1 text-[#C99F5F] text-sm font-semibold">
          Lihat Detail <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

const DEST_LANDING_PATH = DEST_DETAIL_PATH

function DestCard({ dest }: { dest: typeof DESTINATIONS[number] }) {
  const detailPath = DEST_LANDING_PATH[dest.slug] ?? "/destinasi"
  const inner = (
    <>
      <div className="h-56">
        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2542]/70 via-[#0B2542]/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="text-[#DFBE82] text-xs font-bold tracking-widest uppercase mb-1">Inspirasi Destinasi</p>
        <h3 className="text-white font-bold text-xl mb-1">{dest.name}</h3>
        <p className="text-white/80 text-sm leading-snug mb-3">{dest.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {dest.highlights.slice(0, 3).map(h => (
            <span key={h} className="px-2 py-0.5 text-xs bg-white/20 text-white rounded-full border border-white/30">{h}</span>
          ))}
        </div>
      </div>
    </>
  )
  return (
    <Link to={detailPath} className="group relative rounded-xl overflow-hidden bg-[#ABB6BF] block cursor-pointer">
      {inner}
    </Link>
  )
}

function BlogRoute({ slug }: { slug: string }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return <NotFoundPage />
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2)
  return <BlogArticlePage post={post} related={related} />
}

// ─── Social Components ────────────────────────────────────────────────────────

function SocialPlatformBadge({ platform }: { platform: "instagram" | "tiktok" }) {
  const isIG = platform === "instagram"
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${
        isIG
          ? "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
          : "bg-black"
      }`}
    >
      {isIG ? "IG" : "TK"}&nbsp;{isIG ? "Instagram" : "TikTok"}
    </span>
  )
}

function SocialContentCard({ post, compact = false }: { post: SocialPost; compact?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false)
  const hasReal = !post.postUrl.includes("_REQUIRED")
  const platformUrl = hasReal
    ? post.postUrl
    : post.platform === "instagram" ? SOCIAL_LINKS.instagram : SOCIAL_LINKS.tiktok
  const viewLabel = post.platform === "instagram" ? "Tonton di Instagram" : "Tonton di TikTok"
  const socialBtnLabel = compact
    ? (post.platform === "instagram" ? "IG" : "TikTok")
    : (post.platform === "instagram" ? "Instagram" : "TikTok")
  const waBtnLabel = compact ? "Trip Ini" : "Rencana Trip"
  const waMsg = `Halo X3 Organizer, saya melihat konten tentang ${post.waContext} dan ingin berkonsultasi mengenai perjalanan serupa.`
  const thumbFallback =
    post.detailPath === "/destinasi/banyuwangi" ? IMAGES.destinations.banyuwangi :
    post.detailPath === "/destinasi/jogja" ? IMAGES.destinations.jogja :
    post.detailPath === "/destinasi/bromo" ? IMAGES.destinations.bromo :
    post.detailPath === "/gathering-perusahaan-cirebon" ? IMAGES.social.gatheringBromo :
    IMAGES.hero.homeGroupTravel
  const thumbSrc = imgFailed ? thumbFallback : post.thumbnailUrl

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#E2E8F0] hover:border-[#C99F5F]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <a
        href={platformUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden bg-[#ABB6BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99F5F] focus-visible:ring-offset-2"
        style={{ aspectRatio: "16/10" }}
        aria-label={`${viewLabel}: ${post.title}`}
      >
        <img
          src={thumbSrc}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <SocialPlatformBadge platform={post.platform} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play size={18} className="text-[#0B2542] ml-0.5" aria-hidden="true" />
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {post.destination && (
          <p className="flex items-center gap-1 text-[10px] text-[#5A7A9F] mb-1.5">
            <MapPin size={10} aria-hidden="true" />{post.destination}
          </p>
        )}
        <h3 className="font-bold text-[#0B2542] text-sm leading-snug mb-1.5 line-clamp-2">
          {(post.detailPath ?? post.servicePath) ? (
            <Link to={post.detailPath ?? post.servicePath!} className="hover:text-[#1A436D] transition-colors">
              {post.title}
            </Link>
          ) : post.title}
        </h3>
        {!compact && (
          <p className="text-[#5A7A9F] text-xs leading-relaxed line-clamp-2 mb-3 flex-1">{post.shortCaption}</p>
        )}
        {post.serviceLabel && post.servicePath && (
          <Link to={post.servicePath}
            className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-[#EEF2F8] text-[#113356] rounded-full mb-3 self-start hover:bg-[#DFBE82]/30 transition-colors">
            {post.serviceLabel}
          </Link>
        )}
        {!post.servicePath && post.serviceLabel && (
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-[#EEF2F8] text-[#113356] rounded-full mb-3 self-start">
            {post.serviceLabel}
          </span>
        )}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-1 w-full">
          {(post.detailPath ?? post.servicePath) && (
            <Link
              to={post.detailPath ?? post.servicePath!}
              className="col-span-1 flex items-center justify-center gap-1 min-h-9 px-2 py-2 rounded-lg border border-[#E2E8F0] text-[11px] font-semibold text-[#4A6080] hover:border-[#C99F5F] hover:text-[#0B2542] transition-colors whitespace-nowrap"
            >
              <ArrowRight size={11} aria-hidden="true" /> {compact ? "Detail" : "Lihat Detail"}
            </Link>
          )}
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${(post.detailPath ?? post.servicePath) ? "col-span-1" : "col-span-2"} flex items-center justify-center gap-1 min-h-9 px-2 py-2 rounded-lg border border-[#E2E8F0] text-[11px] font-semibold text-[#4A6080] hover:border-[#0B2542] hover:text-[#0B2542] transition-colors whitespace-nowrap`}
            aria-label={`${viewLabel} — tautan eksternal`}
          >
            <ExternalLink size={11} aria-hidden="true" /> {socialBtnLabel}
          </a>
          <a
            href={wa(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-1.5 min-h-9 px-3 py-2 rounded-lg bg-[#C99F5F] text-[11px] font-semibold text-white hover:bg-[#B8904F] transition-colors whitespace-nowrap"
            aria-label="Rencanakan trip serupa via WhatsApp"
          >
            <MessageCircle size={11} aria-hidden="true" /> {waBtnLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

// Horizontal scroll rail — mobile optimized, scroll-snap
function SocialContentRail({ posts }: { posts: SocialPost[] }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
    >
      {posts.map((post) => (
        <div key={post.id} className="flex-shrink-0 w-[72vw] max-w-[280px] snap-start">
          <SocialContentCard post={post} compact />
        </div>
      ))}
    </div>
  )
}

// Filter tab bar for Inspirasi page
type InspFilter = "semua" | "instagram" | "tiktok" | "destinasi" | "artikel"

function InspirationFilters({ active, onChange }: { active: InspFilter; onChange: (f: InspFilter) => void }) {
  const tabs: { value: InspFilter; label: string }[] = [
    { value: "semua", label: "Semua" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "destinasi", label: "Destinasi" },
    { value: "artikel", label: "Artikel" },
  ]
  return (
    <div role="tablist" aria-label="Filter konten inspirasi" className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#C99F5F] ${
            active === tab.value
              ? "bg-[#0B2542] text-white"
              : "bg-white border border-[#E2E8F0] text-[#4A6080] hover:border-[#0B2542] hover:text-[#0B2542]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// Follow social profile CTA
function SocialProfileCTA({ platform, label, variant = "outlined" }: {
  platform: SocialProfilePlatform; label: string; variant?: "outlined" | "text"
}) {
  const url = SOCIAL_PROFILES.find((p) => p.platform === platform)?.href ?? SOCIAL_LINKS[platform]
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "text"
          ? "inline-flex items-center gap-1.5 text-sm text-[#5A7A9F] hover:text-[#0B2542] font-medium transition-colors"
          : "inline-flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#0B2542] hover:border-[#0B2542] bg-white transition-colors"
      }
      aria-label={`${label} — tautan eksternal`}
    >
      <ExternalLink size={13} aria-hidden="true" /> {label}
    </a>
  )
}

// WhatsApp button that includes UTM source context in the message
function SourceAwareWhatsAppButton({ serviceLabel, children, className = "" }: {
  serviceLabel: string; children: React.ReactNode; className?: string
}) {
  return (
    <a
      href={wa(buildUtmWaMsg(serviceLabel))}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "flex items-center gap-2 px-6 py-3.5 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors"}
    >
      {children}
    </a>
  )
}

// ─── Layout ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: "Layanan", path: "/layanan",
    children: [
      { label: "Group Trip & Gathering", path: "/layanan/group-trip" },
      { label: "Team Building", path: "/layanan/team-building" },
      { label: "Kampus & Institusi", path: "/layanan/kampus-institusi" },
      { label: "Family Trip", path: "/layanan/family-trip" },
      { label: "Open Trip", path: "/layanan/open-trip" },
    ],
  },
  { label: "Paket", path: "/paket" },
  { label: "Destinasi", path: "/destinasi" },
  { label: "Pengalaman", path: "/pengalaman" },
  { label: "Blog", path: "/blog" },
  { label: "Tentang", path: "/tentang" },
]

function Header() {
  const { path, navigate } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setOpenDropdown(null) }, [path])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  return (
    <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${scrolled ? "shadow-sm border-b border-[#E2E8F0]" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-lg font-extrabold text-[#0B2542] tracking-tight">X3 Organizer</span>
            <span className="text-[10px] text-[#C99F5F] tracking-[0.15em] uppercase font-semibold">Your Vacation, Our Priority</span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${path.startsWith(item.path) ? "text-[#0B2542]" : "text-[#4A6080] hover:text-[#0B2542]"}`}
                  >
                    {item.label}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white shadow-xl rounded-xl border border-[#E2E8F0] py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.path} to={child.path}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center px-4 py-2.5 text-sm text-[#4A6080] hover:bg-[#F5F8FC] hover:text-[#0B2542] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path} to={item.path}
                  className={`text-sm font-medium transition-colors ${path === item.path ? "text-[#0B2542]" : "text-[#4A6080] hover:text-[#0B2542]"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <a
            href={wa(DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#C99F5F] text-white text-sm font-semibold rounded-lg hover:bg-[#B8904F] transition-colors"
          >
            <MessageCircle size={15} /> Konsultasi WhatsApp
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-[#0B2542] rounded-lg hover:bg-[#F5F8FC]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-5 py-5 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-semibold text-[#0B2542] rounded-lg hover:bg-[#F5F8FC]"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 pl-3 border-l border-[#E2E8F0] space-y-1 mb-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.path} to={child.path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-[#5A7A9F] hover:text-[#0B2542] rounded-lg hover:bg-[#F5F8FC]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={wa(DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-4 px-5 py-3.5 bg-[#C99F5F] text-white text-sm font-semibold rounded-xl hover:bg-[#B8904F] transition-colors"
          >
            <MessageCircle size={16} /> Konsultasi WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0B2542] text-white pt-16 pb-[calc(2rem+52px+env(safe-area-inset-bottom))] lg:pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="mb-1">
              <span className="text-xl font-extrabold tracking-tight">X3 Organizer</span>
            </div>
            <p className="text-[#C99F5F] text-xs tracking-[0.15em] uppercase font-semibold mb-4">Your Vacation, Our Priority</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Mitra perjalanan terorganisir untuk perusahaan, kampus, keluarga, dan peserta trip. Dari konsultasi hingga keberangkatan, kami yang koordinasikan.
            </p>
            <SocialLinks variant="icons" className="mt-6" includeWhatsApp />
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Layanan</p>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link to={s.path} className="text-white/60 hover:text-[#C99F5F] transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 mt-6">Area Layanan</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Agen Travel Cirebon", path: "/agen-travel-cirebon" },
                { label: "Gathering Perusahaan Cirebon", path: "/gathering-perusahaan-cirebon" },
                { label: "Open Trip Bromo", path: "/destinasi/bromo" },
                { label: "Open Trip Nusa Penida", path: "/destinasi/nusa-penida" },
                { label: "Paket Batu Malang Grup", path: "/destinasi/batu-malang" },
                { label: "Trip Jogja", path: "/destinasi/jogja" },
                { label: "Trip Lombok", path: "/destinasi/lombok" },
                { label: "Kawah Ijen Banyuwangi", path: "/destinasi/banyuwangi" },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/60 hover:text-[#C99F5F] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Perusahaan</p>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                { label: "Tentang Kami", path: "/tentang" },
                { label: "Pengalaman", path: "/pengalaman" },
                { label: "Blog", path: "/blog" },
                { label: "Kontak", path: "/kontak" },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/60 hover:text-[#C99F5F] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Kontak</p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[#C99F5F]" />
                {COMPANY.address}
              </p>
              <a href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 hover:text-[#C99F5F] transition-colors">
                <Mail size={13} className="text-[#C99F5F]" />{COMPANY.email}
              </a>
              <a href={wa(DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C99F5F] transition-colors">
                <MessageCircle size={13} className="text-[#C99F5F]" />{COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {COMPANY.brandName} · {COMPANY.legalName}</p>
          <p>{COMPANY.cityRegion}</p>
        </div>
      </div>
    </footer>
  )
}

function FloatingWA() {
  return (
    <a
      href={wa(DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pl-4 pr-5 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-full shadow-xl hover:bg-[#20BD5C] transition-all duration-200 hover:shadow-2xl hover:scale-105 max-w-[calc(100vw-2rem)]"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle size={18} className="flex-shrink-0" />
      <span className="hidden sm:inline truncate">Chat WhatsApp</span>
    </a>
  )
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <div className="pt-14 lg:pt-18">
      {/* Hero */}
      <section className="bg-white min-h-[88vh] flex items-center py-16 lg:py-0">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="lg:py-24">
              <p className="text-[#C99F5F] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                Agen Travel & Tour Organizer · Cirebon
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0B2542] leading-tight mb-6">
                <span className="text-[#1A436D]">X3 Organizer</span>
                <br />
                Perjalanan Grup yang Terorganisir
              </h1>
              <p className="text-[#5A7A9F] text-lg leading-relaxed mb-10 max-w-md">
                Agen travel Cirebon untuk jasa gathering perusahaan, company trip, team building, trip kampus, family trip custom, dan open trip — dari konsultasi hingga koordinasi keberangkatan.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={wa("Halo X3, saya ingin konsultasikan perjalanan.")} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all duration-200 hover:shadow-lg">
                  <MessageCircle size={17} /> Konsultasikan Perjalanan
                </a>
                <Link to="/layanan"
                  className="flex items-center gap-2 px-7 py-4 border-2 border-[#0B2542] text-[#0B2542] font-semibold rounded-xl hover:bg-[#0B2542] hover:text-white transition-all duration-200">
                  Jelajahi Layanan <ArrowRight size={17} />
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-[#5A7A9F]">
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-[#C99F5F]" />Konsultasi gratis</span>
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-[#C99F5F]" />Rencana custom</span>
                <span className="flex items-center gap-2"><CheckCircle size={15} className="text-[#C99F5F]" />Tanpa ribet</span>
              </div>
            </div>

            {/* Right */}
            <div className="relative lg:py-16">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#ABB6BF] shadow-xl">
                <img
                  src={IMAGES.hero.homeGroupTravel}
                  alt="Grup perjalanan bersama X3 Organizer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2542]/40 to-transparent" />
              </div>
              {/* Accent blocks */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#C99F5F]/15 rounded-2xl -z-10 hidden lg:block" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#0B2542]/8 rounded-2xl -z-10 hidden lg:block" />
              {/* Floating info card */}
              <div className="absolute bottom-6 left-4 lg:-left-8 bg-white rounded-2xl px-5 py-4 shadow-2xl border border-[#E2E8F0] hidden sm:block">
                <p className="text-xs text-[#5A7A9F] font-medium mb-1">Proses kami</p>
                <p className="text-[#0B2542] font-bold text-sm">Konsultasi · Rencanakan · Berangkat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Selector */}
      <section className="bg-[#F5F8FC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            label="Kami Melayani"
            title="Pilih Perjalanan Berdasarkan Kebutuhan Anda"
            sub="Setiap kelompok memiliki kebutuhan yang berbeda. Pilih kategori yang sesuai untuk melihat bagaimana kami dapat membantu."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => {
              const { Icon } = svc
              return (
                <Link key={svc.id} to={svc.path}
                  className="group bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#C99F5F]/50 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${svc.color}15` }}>
                      <Icon size={20} style={{ color: svc.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#C99F5F] uppercase tracking-wider mb-1">{svc.forWhom}</p>
                      <h3 className="font-bold text-[#0B2542] text-lg leading-snug">{svc.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#5A7A9F] text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-[#C99F5F] text-sm font-semibold group-hover:gap-3 transition-all">
                    Lihat Layanan <ArrowRight size={14} />
                  </div>
                </Link>
              )
            })}
            {/* Custom Trip card */}
            <Link to="/kontak" className="bg-[#0B2542] rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <p className="text-[#C99F5F] text-xs font-bold uppercase tracking-wider mb-2">Kebutuhan Khusus?</p>
                <h3 className="font-bold text-white text-xl mb-3">Custom Trip</h3>
                <p className="text-white/70 text-sm leading-relaxed">Tidak ada yang cocok? Ceritakan kebutuhan perjalanan Anda—kami rancang sesuai kelompok dan anggaran.</p>
              </div>
              <span className="mt-6 flex items-center gap-2 text-[#C99F5F] text-sm font-semibold group-hover:gap-4 transition-all">
                Konsultasi Sekarang <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              label="Pilihan Perjalanan"
              title="Mulai dari Sini"
              sub="Jelajahi paket perjalanan yang sudah kami rancang."
            />
            <Link to="/paket" className="flex items-center gap-1.5 text-[#C99F5F] font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap pb-4">
              Lihat Semua Paket <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
          <div className="mt-10 p-6 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#0B2542]">Tidak menemukan yang sesuai?</p>
              <p className="text-[#5A7A9F] text-sm">Kami bisa merancang paket custom sesuai kebutuhan dan anggaran kelompok Anda.</p>
            </div>
            <a href={wa("Halo X3, saya ingin konsultasi paket custom.")} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-3 bg-[#C99F5F] text-white text-sm font-semibold rounded-lg hover:bg-[#B8904F] transition-colors">
              Konsultasi Custom
            </a>
          </div>
        </div>
      </section>

      {/* Why X3 */}
      <section className="bg-[#F5F8FC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="Mengapa Memilih X3"
                title="Terorganisir, Transparan, dan Sesuai Kebutuhan Anda"
                sub="Kami tidak hanya menyediakan paket. Kami membantu Anda merencanakan perjalanan yang sesuai dengan kelompok, jadwal, dan anggaran Anda."
              />
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Perencanaan Berdasarkan Kebutuhan Grup", desc: "Kami mulai dari memahami kebutuhan Anda—bukan menawarkan template yang sama untuk semua orang." },
                  { icon: Shield, title: "Pilihan Perjalanan yang Fleksibel", desc: "Destinasi, durasi, dan aktivitas bisa disesuaikan. Kami menyesuaikan, Anda yang memutuskan." },
                  { icon: CheckCircle, title: "Koordinasi Informasi dalam Satu Alur", desc: "Semua informasi, komunikasi, dan koordinasi perjalanan melalui satu kontak yang sama dari awal hingga selesai." },
                  { icon: MessageCircle, title: "Konsultasi Sebelum Menentukan", desc: "Tidak perlu langsung memesan. Ceritakan kebutuhan, dapatkan rekomendasi, lalu putuskan dengan tenang." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C99F5F]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-[#C99F5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0B2542] mb-1">{title}</p>
                      <p className="text-[#5A7A9F] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-[#ABB6BF]">
                <img
                  src={IMAGES.hero.whyX3Coordinator}
                  alt="Tim X3 Organizer berkoordinasi perjalanan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#C99F5F]/10 rounded-2xl -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading
            label="Proses yang Jelas"
            title="Empat Langkah dari Chat Pertama hingga Keberangkatan"
            sub="Kami ingin proses merencanakan perjalanan terasa mudah, bukan membebani."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {[
              { n: "01", title: "Ceritakan Kebutuhan", desc: "Hubungi kami via WhatsApp. Ceritakan jenis trip, jumlah peserta, dan destinasi yang Anda pikirkan." },
              { n: "02", title: "Diskusikan Preferensi", desc: "Tim kami menggali lebih lanjut—tujuan perjalanan, anggaran, dan hal-hal yang penting untuk kelompok Anda." },
              { n: "03", title: "Terima Rekomendasi", desc: "Kami siapkan rencana perjalanan dan penawaran yang sesuai untuk Anda tinjau dan revisi." },
              { n: "04", title: "Konfirmasi & Berangkat", desc: "Setelah setuju, konfirmasi pemesanan. Di hari H, tim X3 yang koordinasi—Anda fokus menikmati perjalanan." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="text-5xl font-black text-[#E2E8F0] mb-4 leading-none select-none">{n}</div>
                <h3 className="font-bold text-[#0B2542] mb-2 text-lg">{title}</h3>
                <p className="text-[#5A7A9F] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href={wa("Halo X3, saya ingin mulai konsultasi perjalanan.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-lg">
              <MessageCircle size={17} /> Mulai Konsultasi Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Experience Preview */}
      <section className="bg-[#F5F8FC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              label="Perjalanan Nyata"
              title="Apa yang Terjadi Saat Anda Bepergian Bersama X3"
            />
            <Link to="/pengalaman" className="flex items-center gap-1.5 text-[#C99F5F] font-semibold text-sm hover:gap-3 transition-all pb-4 whitespace-nowrap">
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                tag: "Group Trip", tagColor: "#0B2542",
                dest: "Batu & Malang, Jawa Timur",
                title: "Gathering Perusahaan",
                story: "Tim yang berhasil merancang perjalanan gathering yang lancar dan berkesan untuk kelompok korporat—mulai dari transportasi hingga koordinasi aktivitas di lokasi.",
                img: IMAGES.experiences.gatheringPerusahaan,
                path: "/layanan/group-trip",
              },
              {
                tag: "Family Trip", tagColor: "#1A436D",
                dest: "Bali & Nusa Penida",
                title: "Family Trip Custom",
                story: "Perjalanan keluarga yang disesuaikan dengan komposisi dan preferensi—itinerary yang fleksibel dan koordinasi yang membuat semua anggota keluarga bisa menikmati perjalanan.",
                img: IMAGES.experiences.familyTripCustom,
                path: "/layanan/family-trip",
              },
            ].map((exp) => (
              <Link key={exp.title} to={exp.path}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] flex flex-col sm:flex-row hover:border-[#C99F5F]/40 hover:shadow-lg transition-all">
                <div className="sm:w-2/5 h-52 sm:h-auto bg-[#ABB6BF] flex-shrink-0">
                  <img src={exp.img} alt={`${exp.title} — dokumentasi perjalanan X3 Organizer`}
                    className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-3"
                      style={{ backgroundColor: exp.tagColor }}>{exp.tag}</span>
                    <p className="text-xs text-[#5A7A9F] mb-2 flex items-center gap-1">
                      <MapPin size={11} />{exp.dest}
                    </p>
                    <h3 className="font-bold text-[#0B2542] text-lg mb-3">{exp.title}</h3>
                    <p className="text-[#5A7A9F] text-sm leading-relaxed">{exp.story}</p>
                  </div>
                  <span className="mt-5 flex items-center gap-1.5 text-[#C99F5F] text-sm font-semibold">
                    Lihat Layanan <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeading label="Kata Mereka" title="Pengalaman Bepergian bersama X3 Organizer" center />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div key={item.name} className="bg-[#F5F8FC] rounded-2xl p-6 border border-[#E2E8F0]">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#C99F5F] fill-[#C99F5F]" />)}
                </div>
                <p className="text-[#5A7A9F] text-sm italic mb-6">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <p className="text-[#0B2542] font-semibold text-sm">{item.name}</p>
                    <p className="text-[#5A7A9F] text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Content Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel text="Cerita dari Perjalanan X3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B2542] leading-tight">
                Lihat Keseruan Perjalanannya<br className="hidden sm:block" /> Secara Langsung
              </h2>
              <p className="mt-3 text-[#5A7A9F] text-base leading-relaxed max-w-xl">
                Temukan dokumentasi, video singkat, dan inspirasi perjalanan terbaru X3 Organizer
                melalui Instagram, TikTok, dan Threads.
              </p>
            </div>
            <Link to="/inspirasi" className="flex items-center gap-1.5 text-[#C99F5F] font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap pb-1 lg:pb-4 self-start sm:self-end">
              Lihat Semua Inspirasi <ArrowRight size={14} />
            </Link>
          </div>

          {/* Desktop: editorial grid — featured item larger */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Featured post — spans 2 cols on lg */}
            {SOCIAL_POSTS.filter(p => p.featured).slice(0, 1).map(post => (
              <div key={post.id} className="lg:col-span-2">
                <div className="group bg-white rounded-xl overflow-hidden border border-[#E2E8F0] hover:border-[#C99F5F]/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col sm:flex-row">
                  <div className="relative overflow-hidden bg-[#ABB6BF] sm:w-3/5 flex-shrink-0" style={{ minHeight: "220px" }}>
                    <img src={post.thumbnailUrl}
                      alt={`${post.title} — dokumentasi perjalanan X3 Organizer`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    <div className="absolute top-3 left-3"><SocialPlatformBadge platform={post.platform} /></div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      {post.destination && (
                        <p className="flex items-center gap-1 text-xs text-[#5A7A9F] mb-2">
                          <MapPin size={11} aria-hidden="true" />{post.destination}
                        </p>
                      )}
                      <h3 className="font-bold text-[#0B2542] text-lg leading-snug mb-2">
                        {(post.detailPath ?? post.servicePath) ? (
                          <Link to={post.detailPath ?? post.servicePath!} className="hover:text-[#1A436D] transition-colors">
                            {post.title}
                          </Link>
                        ) : post.title}
                      </h3>
                      <p className="text-[#5A7A9F] text-sm leading-relaxed mb-4">{post.shortCaption}</p>
                      {post.serviceLabel && post.servicePath && (
                        <Link to={post.servicePath}
                          className="inline-block px-3 py-1 text-xs font-semibold bg-[#EEF2F8] text-[#113356] rounded-full hover:bg-[#DFBE82]/30 transition-colors">
                          {post.serviceLabel}
                        </Link>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-5 w-full">
                      {(post.detailPath ?? post.servicePath) && (
                        <Link
                          to={post.detailPath ?? post.servicePath!}
                          className="col-span-1 flex items-center justify-center gap-1.5 min-h-10 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#4A6080] hover:border-[#C99F5F] hover:text-[#0B2542] transition-colors whitespace-nowrap"
                        >
                          <ArrowRight size={12} aria-hidden="true" /> Lihat Detail
                        </Link>
                      )}
                      <a
                        href={post.postUrl.includes("_REQUIRED") ? SOCIAL_LINKS[post.platform as "instagram" | "tiktok"] : post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${(post.detailPath ?? post.servicePath) ? "col-span-1" : "col-span-2"} flex items-center justify-center gap-1.5 min-h-10 px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#4A6080] hover:border-[#0B2542] hover:text-[#0B2542] transition-colors whitespace-nowrap`}
                        aria-label={post.platform === "instagram" ? "Tonton di Instagram" : "Tonton di TikTok"}
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        {post.platform === "instagram" ? "Instagram" : "TikTok"}
                      </a>
                      <a
                        href={wa(`Halo X3 Organizer, saya melihat konten tentang ${post.waContext} dan ingin berkonsultasi mengenai perjalanan serupa.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 flex items-center justify-center gap-1.5 min-h-10 px-3 py-2.5 bg-[#C99F5F] rounded-lg text-xs font-semibold text-white hover:bg-[#B8904F] transition-colors whitespace-nowrap"
                        aria-label="Rencanakan trip serupa via WhatsApp"
                      >
                        <MessageCircle size={12} aria-hidden="true" /> Rencana Trip
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Regular posts */}
            {SOCIAL_POSTS.filter(p => !p.featured).slice(0, 3).map(post => (
              <SocialContentCard key={post.id} post={post} />
            ))}
          </div>

          {/* Mobile: horizontal swipe rail */}
          <div className="sm:hidden">
            <SocialContentRail posts={SOCIAL_POSTS} />
            <p className="text-xs text-[#ABB6BF] text-center mt-2">Geser untuk lihat lebih banyak</p>
          </div>

          {/* Section footer CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap gap-3">
              <SocialProfileCTA platform="instagram" label="Ikuti di Instagram" />
              <SocialProfileCTA platform="tiktok" label="Ikuti di TikTok" />
              <SocialProfileCTA platform="threads" label="Ikuti di Threads" />
            </div>
            <Link to="/inspirasi" className="flex items-center gap-1.5 text-sm font-semibold text-[#0B2542] hover:text-[#C99F5F] transition-colors">
              Jelajahi semua inspirasi perjalanan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-[#F5F8FC] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading label="Dari Tim X3" title="Tips dan Inspirasi Perjalanan" />
            <Link to="/blog" className="flex items-center gap-1.5 text-[#C99F5F] font-semibold text-sm hover:gap-3 transition-all pb-4 whitespace-nowrap">
              Baca Semua Artikel <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map(post => <BlogArticleCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <SectionHeading label="FAQ" title="Pertanyaan yang Sering Kami Terima" center />
          <Accordion items={FAQ_ITEMS} />
          <div className="mt-10 text-center">
            <p className="text-[#5A7A9F] mb-4">Masih ada pertanyaan?</p>
            <a href={wa("Halo X3, saya punya pertanyaan tentang layanan perjalanan.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#C99F5F] text-[#C99F5F] font-semibold rounded-xl hover:bg-[#C99F5F] hover:text-white transition-colors">
              <MessageCircle size={16} /> Tanya Langsung via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0B2542] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[#C99F5F] text-xs font-bold tracking-[0.25em] uppercase mb-4">Siap Memulai?</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Siap Merencanakan<br />Perjalanan Anda?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Ceritakan kebutuhan perjalanan Anda kepada kami. Kami bantu susun rencana yang sesuai—tidak perlu langsung memesan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={wa("Halo X3, saya ingin merencanakan perjalanan.")} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-xl">
              <MessageCircle size={17} /> Mulai Konsultasi di WhatsApp
            </a>
            <Link to="/paket"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all">
              Lihat Semua Paket <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Layanan Index ─────────────────────────────────────────────────────────────

function LayananPage() {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Layanan" }]} />
          <SectionHeading
            label="Kami Melayani"
            title="Layanan Perjalanan X3 Organizer"
            sub="Kami melayani berbagai jenis perjalanan—dari group trip perusahaan, team building, trip kampus dan institusi, family trip custom, hingga open trip individu."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => {
              const { Icon } = svc
              return (
                <Link key={svc.id} to={svc.path}
                  className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#C99F5F]/50 hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="h-48 bg-[#ABB6BF] overflow-hidden">
                    <img src={svc.img} alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                        <Icon size={18} style={{ color: svc.color }} />
                      </div>
                      <p className="text-xs font-bold text-[#C99F5F] uppercase tracking-wider">{svc.forWhom}</p>
                    </div>
                    <h3 className="font-bold text-[#0B2542] text-xl mb-2">{svc.title}</h3>
                    <p className="text-[#5A7A9F] text-sm leading-relaxed mb-5">{svc.desc}</p>
                    <div className="flex items-center gap-1.5 text-[#C99F5F] text-sm font-semibold group-hover:gap-3 transition-all">
                      Pelajari Lebih Lanjut <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-10 p-6 bg-[#0B2542] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-xl mb-1">Tidak menemukan yang sesuai?</p>
              <p className="text-white/70 text-sm">Ceritakan kebutuhan perjalanan Anda—kami bantu rancang solusi yang tepat.</p>
            </div>
            <a href={wa("Halo X3, saya ingin konsultasi layanan yang sesuai.")} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
              Konsultasi Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Service Page Template ────────────────────────────────────────────────────

function ServicePage({ serviceId }: { serviceId: string }) {
  const svc = SERVICES.find(s => s.id === serviceId)
  const detail = SERVICE_DETAILS[serviceId]
  if (!svc || !detail) return <NotFoundPage />
  const { Icon } = svc

  return (
    <div className="pt-14 lg:pt-18">
      {/* Hero */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[
            { label: "Beranda", path: "/" },
            { label: "Layanan", path: "/layanan" },
            { label: svc.title },
          ]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                  <Icon size={22} style={{ color: svc.color }} />
                </div>
                <p className="text-[#C99F5F] text-xs font-bold uppercase tracking-wider">{svc.forWhom}</p>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B2542] mb-5 leading-tight">{detail.headline}</h1>
              <p className="text-[#5A7A9F] text-lg leading-relaxed mb-8">{detail.sub}</p>
              <a href={wa(svc.waMsg)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-lg">
                <MessageCircle size={16} /> Konsultasikan Kebutuhan Anda
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#ABB6BF]">
              <img src={svc.img} alt={`${svc.title} — dokumentasi perjalanan X3 Organizer`}
                className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-[#F5F8FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading label="Tantangan Umum" title="Yang Sering Kami Dengar dari Klien" />
              <div className="space-y-4">
                {detail.problems.map((p, i) => (
                  <div key={i} className="flex gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[#C99F5F] font-black text-lg flex-shrink-0 leading-none mt-0.5">"</span>
                    <p className="text-[#4A6080] italic">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading label="Bagaimana Kami Membantu" title="Manfaat yang Anda Dapatkan" />
              <div className="space-y-5">
                {detail.benefits.map((b, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C99F5F]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={18} className="text-[#C99F5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0B2542] mb-1">{b.title}</p>
                      <p className="text-[#5A7A9F] text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope + Steps */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading label="Cakupan Layanan" title="Apa yang Kami Tangani" />
              <ul className="space-y-3">
                {detail.scope.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#4A6080]">
                    <ChevronRight size={16} className="text-[#C99F5F] mt-0.5 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading label="Proses" title="Cara Kerja Kami" />
              <div className="space-y-5">
                {detail.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0B2542] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <p className="text-[#4A6080] leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F8FC] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <SectionHeading label="FAQ" title={`Pertanyaan tentang ${svc.title}`} center />
          <Accordion items={detail.faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B2542] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Merencanakan {svc.title}?</h2>
          <p className="text-white/60 mb-8">Ceritakan kebutuhan Anda—kami bantu susun rencana yang tepat.</p>
          <a href={wa(svc.waMsg)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-xl">
            <MessageCircle size={17} /> Konsultasi Sekarang
          </a>
        </div>
      </section>
    </div>
  )
}

// ─── Package Pages ─────────────────────────────────────────────────────────────

function PaketPage() {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Paket" }]} />
          <SectionHeading
            label="Pilihan Perjalanan"
            title="Paket Perjalanan X3 Organizer"
            sub="Jelajahi paket perjalanan yang sudah kami rancang. Hubungi kami untuk paket custom sesuai kebutuhan Anda."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
            {DESTINATIONS.filter(d => !FEATURED_PACKAGES.some(p => p.path.includes(d.slug) || (d.slug === 'bali' && p.path.includes('nusa-penida')))).slice(0, 3).map(dest => {
              const path = DEST_DETAIL_PATH[dest.slug] ?? '/destinasi'
              return (
                <Link key={dest.slug} to={path}
                  className="group block bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#C99F5F]/40 hover:shadow-lg transition-all">
                  <div className="h-40 bg-[#ABB6BF] overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-[#C99F5F] uppercase tracking-wider mb-1">Inspirasi Destinasi</p>
                    <h3 className="font-bold text-[#0B2542] text-lg mb-2">{dest.name}</h3>
                    <p className="text-[#5A7A9F] text-sm line-clamp-2 mb-3">{dest.desc}</p>
                    <span className="flex items-center gap-1 text-[#C99F5F] text-sm font-semibold">
                      Jelajahi Destinasi <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-10 p-6 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#0B2542]">Ingin paket yang disesuaikan?</p>
              <p className="text-[#5A7A9F] text-sm">Kami bisa merancang custom trip sesuai destinasi, jumlah peserta, dan anggaran Anda.</p>
            </div>
            <a href={wa("Halo X3, saya ingin konsultasi paket custom.")} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-3 bg-[#C99F5F] text-white text-sm font-semibold rounded-lg hover:bg-[#B8904F] transition-colors">
              Konsultasi Custom
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function FamilyTripBatuMalangPage() {
  const pkg = FEATURED_PACKAGES[0]
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[
            { label: "Beranda", path: "/" },
            { label: "Paket", path: "/paket" },
            { label: "Family Trip Batu–Malang" },
          ]} />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-bold text-white rounded-full bg-[#1A436D]">Family Trip</span>
                <span className="px-3 py-1 text-xs font-medium bg-[#FFF8EE] text-[#C99F5F] rounded-full border border-[#DFBE82]">Contoh Program</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B2542] mb-4 leading-tight">Family Trip Batu–Malang Edukatif</h1>
              <div className="flex flex-wrap gap-4 text-sm text-[#5A7A9F] mb-6">
                <span className="flex items-center gap-1.5"><MapPin size={13} />Batu & Malang, Jawa Timur</span>
                <span className="flex items-center gap-1.5"><Clock size={13} />3 Hari 2 Malam</span>
                <span className="flex items-center gap-1.5"><Users size={13} />Min. 4 peserta</span>
              </div>
              <p className="text-[#5A7A9F] leading-relaxed mb-8">
                Perjalanan keluarga yang menggabungkan wisata alam, edukasi, dan wahana hiburan di kawasan Batu dan Malang—destinasi yang cocok untuk semua usia.
              </p>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Harga", value: "Hubungi tim X3 untuk penawaran — disesuaikan jumlah peserta & musim" },
                  { label: "Jadwal", value: "Fleksibel — konsultasikan tanggal keberangkatan via WhatsApp" },
                  { label: "Meeting Point", value: "Cirebon, Jakarta, atau Surabaya (sesuai kesepakatan)" },
                  { label: "Min. Peserta", value: "4 orang (family trip)" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F5F8FC] rounded-xl p-4 border border-[#E2E8F0]">
                    <p className="text-xs font-bold text-[#C99F5F] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-[#0B2542] text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <a href={wa("Halo X3, saya tertarik dengan paket Family Trip Batu-Malang. Boleh saya tahu detail lebih lanjut?")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-lg">
                <MessageCircle size={16} /> Tanya tentang Paket Ini
              </a>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#ABB6BF]">
                <img src={pkg.img} alt="Family Trip Batu Malang — paket wisata keluarga X3 Organizer"
                  className="w-full h-full object-cover" />
              </div>

              {/* Highlights */}
              <div className="bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] p-6">
                <p className="font-bold text-[#0B2542] mb-4">Highlight Destinasi</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Jatim Park 2", "Museum Angkut", "Coban Rondo", "Santerra De Laponte", "Gunung Bromo", "Batu Night Spectacular"].map(h => (
                    <div key={h} className="flex items-center gap-2 text-sm text-[#4A6080]">
                      <CheckCircle size={13} className="text-[#C99F5F] flex-shrink-0" /> {h}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] p-6">
                <p className="font-bold text-[#0B2542] mb-3">Itinerary</p>
                <div className="space-y-3 text-sm text-[#5A7A9F]">
                  <p><span className="font-semibold text-[#0B2542]">Hari 1:</span> Keberangkatan → check-in hotel Batu → wisata malam Batu Night Spectacular (opsional)</p>
                  <p><span className="font-semibold text-[#0B2542]">Hari 2:</span> Jatim Park 2 & Museum Angkut → petik apel / agrowisata → free time</p>
                  <p><span className="font-semibold text-[#0B2542]">Hari 3:</span> Coban Rondo / Santerra De Laponte → oleh-oleh → kembali</p>
                </div>
              </div>

              <div className="bg-[#F5F8FC] rounded-xl border border-[#E2E8F0] p-6">
                <p className="font-bold text-[#0B2542] mb-3">Termasuk & Tidak Termasuk</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#5A7A9F]">
                  <div>
                    <p className="font-semibold text-[#0B2542] mb-2">Termasuk</p>
                    <ul className="space-y-1">
                      {["Transportasi grup", "Akomodasi 2 malam", "Koordinator trip", "Tiket destinasi utama (sesuai paket)"].map(i => (
                        <li key={i} className="flex gap-2"><CheckCircle size={13} className="text-[#C99F5F] flex-shrink-0 mt-0.5" />{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B2542] mb-2">Tidak termasuk</p>
                    <ul className="space-y-1">
                      {["Makan pribadi di luar program", "Pengeluaran pribadi & souvenir", "Asuransi perjalanan (opsional)", "Tip guide lokal"].map(i => (
                        <li key={i} className="flex gap-2"><span className="text-[#ABB6BF]">—</span>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Destinasi ──────────────────────────────────────────────────────────────────

function DestinasiPage() {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Destinasi" }]} />
          <SectionHeading
            label="Inspirasi Destinasi"
            title="Destinasi Perjalanan"
            sub="Temukan paket perjalanan berdasarkan destinasi yang Anda inginkan. Hubungi kami untuk mengetahui paket yang tersedia."
          />
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8EE] border border-[#DFBE82] rounded-full text-sm text-[#C99F5F] font-semibold">
            <Star size={13} className="text-[#C99F5F]" />
            Halaman ini menampilkan destinasi sebagai inspirasi. Hubungi kami untuk informasi paket aktif.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map(dest => <DestCard key={dest.slug} dest={dest} />)}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[#5A7A9F] mb-4">Ada destinasi lain yang Anda inginkan?</p>
            <a href={wa("Halo X3, saya ingin menanyakan paket ke destinasi tertentu.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
              <MessageCircle size={16} /> Tanyakan via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Pengalaman ────────────────────────────────────────────────────────────────

function PengalamanPage() {
  const experiences = [
    {
      tag: "Group Trip", tagColor: "#0B2542", dest: "Batu & Malang",
      title: "Gathering Perusahaan",
      obj: "Bonding tim dan koordinasi antar departemen",
      svc: "Group Trip & Gathering",
      svcPath: "/layanan/group-trip",
      img: IMAGES.services.groupTrip,
      story: "Tim yang berhasil menjalankan perjalanan gathering untuk kelompok korporat—mulai dari transportasi, akomodasi, hingga koordinasi aktivitas di lokasi.",
      quote: "Gathering kantor kami ke Batu Malang berjalan sangat lancar. Tim X3 koordinasi transportasi, akomodasi, dan aktivitas dengan rapi.",
      quoteBy: "Riana L., HR Manager",
    },
    {
      tag: "Family Trip", tagColor: "#1A436D", dest: "Bali & Nusa Penida",
      title: "Family Trip Custom",
      obj: "Liburan keluarga yang menyenangkan untuk semua usia",
      svc: "Family Trip",
      svcPath: "/layanan/family-trip",
      img: IMAGES.services.familyTrip,
      story: "Perjalanan keluarga yang dirancang sesuai preferensi dan komposisi—itinerary yang fleksibel dan koordinasi penuh dari X3 Organizer.",
      quote: "Family trip ke Bali dan Nusa Penida jadi lebih tenang karena semua detail diurus X3. Itinerary fleksibel dan cocok untuk anak-anak.",
      quoteBy: "Keluarga G., Surabaya",
    },
    {
      tag: "Team Building", tagColor: "#113356", dest: "Bromo, Jawa Timur",
      title: "Program Team Building",
      obj: "Membangun kerjasama dan semangat tim",
      svc: "Team Building",
      svcPath: "/layanan/team-building",
      img: IMAGES.services.teamBuilding,
      story: "Program team building terstruktur yang menggabungkan aktivitas kolaboratif dengan perjalanan alam—diingat jauh setelah acara selesai.",
      quote: "Program outbound-nya terstruktur dan menyenangkan. Peserta antusias, koordinasi di lapangan sangat responsif.",
      quoteBy: "Andi S., People Development",
    },
  ]

  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Pengalaman" }]} />
          <SectionHeading
            label="Perjalanan Nyata"
            title="Pengalaman Perjalanan bersama X3 Organizer"
            sub="Setiap kelompok memiliki tujuan perjalanan yang berbeda. Berikut cerita dari trip yang sudah kami jalankan."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="bg-[#F5F8FC] rounded-2xl overflow-hidden border border-[#E2E8F0]">
                <div className="h-56 bg-[#ABB6BF] relative">
                  <img src={exp.img} alt={`${exp.title} — dokumentasi perjalanan X3 Organizer`}
                    className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2542]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-2"
                      style={{ backgroundColor: exp.tagColor }}>{exp.tag}</span>
                    <p className="text-white text-sm flex items-center gap-1"><MapPin size={11} />{exp.dest}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0B2542] text-xl mb-2">{exp.title}</h3>
                  <p className="text-xs text-[#5A7A9F] mb-3"><span className="font-semibold">Tujuan:</span> {exp.obj}</p>
                  <p className="text-[#5A7A9F] text-sm leading-relaxed mb-4">{exp.story}</p>
                  <blockquote className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-sm text-[#4A6080] italic mb-5">
                    &ldquo;{exp.quote}&rdquo;
                    <footer className="mt-2 text-xs text-[#5A7A9F] not-italic font-medium">— {exp.quoteBy}</footer>
                  </blockquote>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={exp.svcPath}
                      className="text-sm text-[#0B2542] font-semibold hover:text-[#C99F5F] transition-colors">
                      Layanan: {exp.svc} →
                    </Link>
                    <a href={wa(`Halo X3, saya tertarik merencanakan ${exp.tag} seperti di halaman pengalaman.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm text-[#C99F5F] font-semibold hover:underline">
                      Trip Serupa untuk Anda →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Tentang ──────────────────────────────────────────────────────────────────

function TentangPage() {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Tentang Kami" }]} />

          <div className="mb-14">
            <SectionLabel text="Tentang X3 Organizer" />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B2542] mb-6 leading-tight">Mitra Perjalanan yang<br />Mengelola Detail untuk Anda</h1>
            <p className="text-[#5A7A9F] text-xl leading-relaxed max-w-2xl">
              X3 Organizer adalah agen perjalanan dan event organizer yang membantu perusahaan, kampus, keluarga, dan individu merencanakan perjalanan yang terorganisir.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden h-72 bg-[#ABB6BF] mb-16">
            <img
              src={IMAGES.hero.tentangMountains}
              alt="Tim X3 Organizer merencanakan perjalanan"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2542] mb-4">Yang Kami Lakukan</h2>
              <p className="text-[#5A7A9F] leading-relaxed mb-4">
                Tim X3 Organizer membantu dalam konsultasi dan perencanaan perjalanan, penyusunan itinerary yang disesuaikan, koordinasi transportasi dan akomodasi, serta pengelolaan perjalanan grup dari ukuran kecil hingga besar.
              </p>
              <p className="text-[#5A7A9F] leading-relaxed">
                Kami tidak hanya menyediakan daftar paket—kami membantu Anda merencanakan, mengoordinasikan, dan menjalankan perjalanan dari tahap konsultasi hingga hari keberangkatan.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B2542] mb-4">Prinsip Kerja Kami</h2>
              <div className="space-y-4">
                {[
                  { title: "Konsultasi dulu.", desc: "Keputusan perjalanan yang baik dimulai dari percakapan jujur tentang kebutuhan, anggaran, dan harapan." },
                  { title: "Disesuaikan, bukan dipaksakan.", desc: "Setiap kelompok berbeda. Kami menyesuaikan rencana dengan kebutuhan Anda, bukan sebaliknya." },
                  { title: "Transparan.", desc: "Sebelum memutuskan, Anda sudah tahu apa yang termasuk, tidak termasuk, dan berapa biayanya." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle size={16} className="text-[#C99F5F] flex-shrink-0 mt-0.5" />
                    <p className="text-[#5A7A9F] text-sm"><span className="font-semibold text-[#0B2542]">{title}</span> {desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F5F8FC] rounded-2xl border border-[#E2E8F0] p-8 mb-10">
            <h2 className="text-xl font-bold text-[#0B2542] mb-5">Informasi Perusahaan</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Nama Perusahaan", val: COMPANY.legalName },
                { label: "Email", val: COMPANY.email },
                { label: "WhatsApp", val: COMPANY.phoneDisplay },
                { label: "Bidang", val: "Agent · Tour · Travel" },
                { label: "Alamat", val: COMPANY.address },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-xs font-bold text-[#C99F5F] uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-[#4A6080]">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0B2542] mb-4">Siap Berdiskusi?</h2>
            <p className="text-[#5A7A9F] mb-6">Ceritakan kebutuhan perjalanan Anda. Kami bantu susun rencana yang tepat.</p>
            <a href={wa("Halo X3, saya ingin mengetahui lebih lanjut tentang layanan X3 Organizer.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
              <MessageCircle size={16} /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function BlogPage() {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Blog" }]} />
          <SectionHeading
            label="Travel Insights"
            title="Tips dan Inspirasi Perjalanan"
            sub="Informasi praktis tentang destinasi, tips perjalanan, dan panduan dari tim X3 Organizer."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map(post => <BlogArticleCard key={post.slug} post={post} />)}
          </div>
          <div className="mt-12 text-center p-8 bg-[#F5F8FC] rounded-2xl border border-[#E2E8F0]">
            <p className="text-[#0B2542] font-semibold mb-2">Butuh bantuan merencanakan perjalanan?</p>
            <p className="text-[#5A7A9F] text-sm mb-5">Konsultasi gratis via WhatsApp—ceritakan kebutuhan dan kami bantu.</p>
            <a href={wa("Halo X3, saya ingin konsultasi perjalanan.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors text-sm">
              <MessageCircle size={15} /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Kontak ────────────────────────────────────────────────────────────────────

function KontakPage() {
  const [form, setForm] = useState({
    nama: "", wa: "", jenisPerjalanan: "", jumlahPeserta: "",
    tanggal: "", perusahaan: "", email: "", destinasi: "",
    budget: "", kebutuhan: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nama.trim()) e.nama = "Nama wajib diisi"
    if (!form.wa.trim()) e.wa = "Nomor WhatsApp wajib diisi"
    if (!form.jenisPerjalanan) e.jenisPerjalanan = "Pilih jenis perjalanan"
    if (!form.jumlahPeserta) e.jumlahPeserta = "Pilih perkiraan jumlah peserta"
    if (!form.tanggal.trim()) e.tanggal = "Preferensi tanggal wajib diisi"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus("loading")
    setTimeout(() => setStatus("success"), 1500)
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 border rounded-xl text-[#102033] bg-white text-sm outline-none transition-colors ${
      errors[field] ? "border-red-400 focus:border-red-400" : "border-[#E2E8F0] focus:border-[#C99F5F]"
    }`

  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-8 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Beranda", path: "/" }, { label: "Kontak" }]} />
          <SectionHeading
            label="Hubungi Kami"
            title="Mulai Percakapan Perjalanan Anda"
            sub="Ada dua cara. Jika sudah tahu kebutuhan Anda, langsung WhatsApp kami. Jika ingin kami hubungi terlebih dahulu, isi form brief di bawah."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Direct WA + info */}
            <div>
              <div className="bg-[#F5F8FC] rounded-2xl border border-[#E2E8F0] p-8 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mb-4">
                  <MessageCircle size={22} className="text-[#25D366]" />
                </div>
                <h3 className="font-bold text-[#0B2542] text-xl mb-2">Chat via WhatsApp</h3>
                <p className="text-[#5A7A9F] text-sm leading-relaxed mb-6">
                  Tim kami siap menjawab pertanyaan dan membantu Anda merencanakan perjalanan. Tidak perlu format khusus—cukup ceritakan kebutuhan Anda.
                </p>
                <a href={wa("Halo X3, saya ingin berkonsultasi tentang perjalanan.")} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5C] transition-colors">
                  <MessageCircle size={17} /> Buka WhatsApp
                </a>
              </div>

              <div className="space-y-4">
                {[
                  { icon: MessageCircle, label: "WhatsApp", val: COMPANY.phoneDisplay, href: wa("Halo X3, saya ingin berkonsultasi tentang perjalanan.") },
                  { icon: Mail, label: "Email", val: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { icon: MapPin, label: "Alamat", val: COMPANY.address, href: COMPANY.googleMapsUrl },
                ].map(({ icon: Icon, label, val, href }) => (
                  <div key={label} className="flex gap-4 p-4 bg-[#F5F8FC] rounded-xl border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-xl bg-[#C99F5F]/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#C99F5F]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#ABB6BF] uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[#0B2542] text-sm font-medium hover:text-[#C99F5F] transition-colors">
                          {val}
                        </a>
                      ) : (
                        <p className="text-[#0B2542] text-sm font-medium">{val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5A7A9F] mt-6 mb-3">
                Jam operasional: Senin–Sabtu 09.00–17.00 · Respons WhatsApp: {COMPANY.responseTime}
              </p>
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] h-56 lg:h-64">
                <iframe
                  title="Lokasi kantor X3 Organizer di Cirebon"
                  src={COMPANY.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#F5F8FC] rounded-2xl border border-[#E2E8F0] p-8">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-[#0B2542] text-xl mb-3">Brief Perjalanan Terkirim!</h3>
                  <p className="text-[#5A7A9F] text-sm leading-relaxed mb-6">
                    Terima kasih! Tim kami akan menghubungi Anda via WhatsApp dalam waktu dekat. Jika mendesak, langsung WhatsApp kami.
                  </p>
                  <a href={wa("Halo X3, saya sudah mengisi form brief perjalanan.")} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C99F5F] text-white text-sm font-semibold rounded-lg hover:bg-[#B8904F] transition-colors">
                    <MessageCircle size={15} /> Chat Langsung
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-bold text-[#0B2542] text-lg mb-6">Isi Brief Perjalanan</h3>
                  <div className="space-y-4">
                    {/* Nama */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B2542] uppercase tracking-wider mb-1.5">
                        Nama <span className="text-red-400">*</span>
                      </label>
                      <input className={inputCls("nama")} placeholder="Nama Anda"
                        value={form.nama} onChange={e => set("nama", e.target.value)} />
                      {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                    </div>
                    {/* WA */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B2542] uppercase tracking-wider mb-1.5">
                        Nomor WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <input className={inputCls("wa")} placeholder="08xx-xxxx-xxxx"
                        value={form.wa} onChange={e => set("wa", e.target.value)} />
                      {errors.wa && <p className="text-red-500 text-xs mt-1">{errors.wa}</p>}
                    </div>
                    {/* Jenis + Jumlah */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0B2542] uppercase tracking-wider mb-1.5">
                          Jenis Perjalanan <span className="text-red-400">*</span>
                        </label>
                        <select className={inputCls("jenisPerjalanan")}
                          value={form.jenisPerjalanan} onChange={e => set("jenisPerjalanan", e.target.value)}>
                          <option value="">Pilih jenis</option>
                          <option>Group Trip</option>
                          <option>Team Building</option>
                          <option>Kampus & Institusi</option>
                          <option>Family Trip</option>
                          <option>Open Trip</option>
                          <option>Belum tahu</option>
                        </select>
                        {errors.jenisPerjalanan && <p className="text-red-500 text-xs mt-1">{errors.jenisPerjalanan}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0B2542] uppercase tracking-wider mb-1.5">
                          Perkiraan Peserta <span className="text-red-400">*</span>
                        </label>
                        <select className={inputCls("jumlahPeserta")}
                          value={form.jumlahPeserta} onChange={e => set("jumlahPeserta", e.target.value)}>
                          <option value="">Pilih jumlah</option>
                          <option>1–5 orang</option>
                          <option>6–15 orang</option>
                          <option>16–30 orang</option>
                          <option>31–50 orang</option>
                          <option>51–100 orang</option>
                          <option>Lebih dari 100 orang</option>
                        </select>
                        {errors.jumlahPeserta && <p className="text-red-500 text-xs mt-1">{errors.jumlahPeserta}</p>}
                      </div>
                    </div>
                    {/* Tanggal */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B2542] uppercase tracking-wider mb-1.5">
                        Preferensi Tanggal <span className="text-red-400">*</span>
                      </label>
                      <input className={inputCls("tanggal")} placeholder="Contoh: Agustus 2025, atau akhir tahun"
                        value={form.tanggal} onChange={e => set("tanggal", e.target.value)} />
                      {errors.tanggal && <p className="text-red-500 text-xs mt-1">{errors.tanggal}</p>}
                    </div>
                    {/* Optional */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5A7A9F] uppercase tracking-wider mb-1.5">Perusahaan / Institusi</label>
                        <input className={inputCls("perusahaan")} placeholder="Opsional"
                          value={form.perusahaan} onChange={e => set("perusahaan", e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5A7A9F] uppercase tracking-wider mb-1.5">Destinasi</label>
                        <input className={inputCls("destinasi")} placeholder="Opsional"
                          value={form.destinasi} onChange={e => set("destinasi", e.target.value)} />
                      </div>
                    </div>
                    {/* Kebutuhan */}
                    <div>
                      <label className="block text-xs font-bold text-[#5A7A9F] uppercase tracking-wider mb-1.5">Kebutuhan Tambahan</label>
                      <textarea rows={3} className={`${inputCls("kebutuhan")} resize-none`}
                        placeholder="Hal lain yang perlu kami ketahui? (opsional)"
                        value={form.kebutuhan} onChange={e => set("kebutuhan", e.target.value)} />
                    </div>

                    <button type="submit" disabled={status === "loading"}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors disabled:opacity-70">
                      {status === "loading" ? <><Loader2 size={17} className="animate-spin" /> Mengirim…</> : <><Send size={16} /> Kirim Brief Perjalanan</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Inspirasi Page ───────────────────────────────────────────────────────────

function InspirationPage() {
  const [filter, setFilter] = useState<InspFilter>("semua")

  const socialPosts = SOCIAL_POSTS.filter(p =>
    filter === "semua" ? true :
    filter === "instagram" ? p.platform === "instagram" :
    filter === "tiktok" ? p.platform === "tiktok" : false
  )
  const showDest = filter === "semua" || filter === "destinasi"
  const showArt = filter === "semua" || filter === "artikel"
  const showSocial = filter === "semua" || filter === "instagram" || filter === "tiktok"

  return (
    <div className="pt-14 lg:pt-18">
      {/* Hero */}
      <section className="bg-white py-12 lg:py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionLabel text="Inspirasi Perjalanan X3" />
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B2542] mb-4 leading-tight max-w-2xl">
            Lihat Perjalanan Nyata.<br />Temukan Ide Trip Berikutnya.
          </h1>
          <p className="text-[#5A7A9F] text-lg leading-relaxed max-w-xl mb-7">
            Jelajahi dokumentasi perjalanan, video singkat, inspirasi destinasi, dan cerita terbaru dari X3 Organizer.
          </p>
          <div className="flex flex-wrap gap-3">
            <SocialProfileCTA platform="instagram" label="Lihat Instagram @x3organizer" />
            <SocialProfileCTA platform="tiktok" label="Lihat TikTok @x3organizer" />
            <SocialProfileCTA platform="threads" label="Lihat Threads @x3organizer" />
          </div>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="bg-[#F5F8FC] py-12 lg:py-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Filter tabs */}
          <div className="mb-8">
            <InspirationFilters active={filter} onChange={setFilter} />
          </div>

          {/* Social posts grid */}
          {showSocial && (
            <div className="mb-12 lg:mb-16 lg:pr-4">
              {(filter === "semua" || filter === "instagram" || filter === "tiktok") && (
                <h2 className="text-lg font-bold text-[#0B2542] mb-5 flex items-center gap-2">
                  {filter === "instagram" ? "Konten Instagram" :
                   filter === "tiktok" ? "Konten TikTok" : "Konten Instagram, TikTok & Threads"}
                  <span className="text-xs font-normal text-[#5A7A9F]">({socialPosts.length} konten)</span>
                </h2>
              )}
              {/* Mobile: rail */}
              <div className="sm:hidden">
                <SocialContentRail posts={socialPosts} />
              </div>
              {/* Desktop: grid */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {socialPosts.map(post => <SocialContentCard key={post.id} post={post} />)}
              </div>
              {socialPosts.length === 0 && (
                <div className="text-center py-12 text-[#5A7A9F]">
                  <p>Belum ada konten untuk filter ini.</p>
                </div>
              )}
            </div>
          )}

          {/* Destinations */}
          {showDest && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#0B2542]">Inspirasi Destinasi</h2>
                <Link to="/destinasi" className="text-sm text-[#C99F5F] font-semibold hover:underline flex items-center gap-1">
                  Lihat semua <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {DESTINATIONS.slice(0, 3).map(dest => <DestCard key={dest.slug} dest={dest} />)}
              </div>
            </div>
          )}

          {/* Articles */}
          {showArt && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#0B2542]">Artikel Perjalanan</h2>
                <Link to="/blog" className="text-sm text-[#C99F5F] font-semibold hover:underline flex items-center gap-1">
                  Lihat semua <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {BLOG_POSTS.map(post => <BlogArticleCard key={post.slug} post={post} />)}
              </div>
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-10 p-6 bg-[#0B2542] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg mb-1">Siap merencanakan perjalanan?</p>
              <p className="text-white/70 text-sm">Ceritakan kebutuhan Anda — konsultasi gratis via WhatsApp.</p>
            </div>
            <a href={wa("Halo X3 Organizer, saya melihat inspirasi di halaman Inspirasi dan ingin berkonsultasi.")}
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
              <MessageCircle size={16} aria-hidden="true" /> Konsultasi Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Mulai Page (Social Landing) ──────────────────────────────────────────────

function MulaiPage() {
  const { navigate } = useNav()

  // Capture UTM params on mount and store in session
  useEffect(() => {
    const utm = readUrlUtm()
    if (Object.keys(utm).length > 0) saveSessionUtm(utm)
  }, [])

  const utm = getSessionUtm()
  const srcLabel = utm.utm_source ? utmSourceLabel(utm.utm_source) : ""

  const options = [
    { label: "Company Gathering", Icon: Building2, path: "/layanan/group-trip", service: "Company Gathering" },
    { label: "Team Building", Icon: Users, path: "/layanan/team-building", service: "Team Building" },
    { label: "Kampus & Institusi", Icon: GraduationCap, path: "/layanan/kampus-institusi", service: "Kampus & Institusi" },
    { label: "Family Trip", Icon: Home, path: "/layanan/family-trip", service: "Family Trip" },
    { label: "Open Trip", Icon: Compass, path: "/layanan/open-trip", service: "Open Trip" },
  ]

  return (
    <div className="pt-14 min-h-screen bg-[#F5F8FC] flex flex-col">
      <div className="max-w-lg mx-auto w-full px-5 py-10 flex-1">
        {/* Source badge */}
        {srcLabel && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#5A7A9F] font-medium mb-6">
            <ExternalLink size={11} aria-hidden="true" />
            Selamat datang dari {srcLabel}
          </div>
        )}

        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B2542] mb-2 leading-tight">
          Mau merencanakan<br />perjalanan seperti apa?
        </h1>
        <p className="text-[#5A7A9F] mb-8 text-sm leading-relaxed">
          Pilih jenis perjalanan yang sesuai—kami siap membantu dari konsultasi hingga hari keberangkatan.
        </p>

        {/* Service options */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {options.map(({ label, Icon, path, service }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-start gap-3 p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#C99F5F]/60 hover:shadow-md transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#C99F5F] active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F5F8FC] flex items-center justify-center">
                <Icon size={18} className="text-[#0B2542]" aria-hidden="true" />
              </div>
              <span className="font-semibold text-[#0B2542] text-sm leading-snug">{label}</span>
            </button>
          ))}

          {/* "Belum Yakin" — WhatsApp direct */}
          <a
            href={wa(buildUtmWaMsg("perjalanan — saya belum tahu jenis yang tepat"))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-3 p-4 bg-[#C99F5F] rounded-xl border border-[#C99F5F] hover:bg-[#B8904F] transition-all focus:outline-none focus:ring-2 focus:ring-[#C99F5F]"
          >
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <MessageCircle size={18} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-semibold text-white text-sm leading-snug">Belum Yakin?<br />Tanya Langsung</span>
          </a>
        </div>

        <p className="text-xs text-[#ABB6BF] text-center leading-relaxed">
          Konsultasi gratis · Tidak ada kewajiban memesan
        </p>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-[#5A7A9F] hover:text-[#0B2542] transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer mini */}
      <div className="border-t border-[#E2E8F0] bg-white px-5 py-4 text-center">
        <p className="text-xs text-[#ABB6BF]">© {COMPANY.brandName} · {COMPANY.cityRegion}</p>
      </div>
    </div>
  )
}

// ─── 404 ──────────────────────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <div className="pt-14 lg:pt-16 min-h-screen flex items-center justify-center bg-[#F5F8FC]">
      <div className="text-center px-5">
        <p className="text-6xl font-black text-[#E2E8F0] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#0B2542] mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-[#5A7A9F] mb-8">Halaman yang Anda cari tidak tersedia.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}

// ─── Mobile Shell ─────────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  "/": "",
  "/layanan": "Layanan",
  "/layanan/group-trip": "Group Trip",
  "/layanan/team-building": "Team Building",
  "/layanan/kampus-institusi": "Kampus & Institusi",
  "/layanan/family-trip": "Family Trip",
  "/layanan/open-trip": "Open Trip",
  "/paket": "Paket Perjalanan",
  "/paket/family-trip-batu-malang": "Family Trip Batu–Malang",
  "/destinasi": "Destinasi",
  "/inspirasi": "Inspirasi",
  "/mulai": "",
  "/pengalaman": "Pengalaman",
  "/tentang": "Tentang X3",
  "/blog": "Travel Insights",
  "/blog/tips-outing-kantor-batu-malang": "Tips Outing Kantor",
  "/kontak": "Kontak",
}

function getMobileBackPath(path: string): string | null {
  if (path === "/" || path === "/mulai") return null
  const segments = path.split("/").filter(Boolean)
  if (segments.length <= 1) return "/"
  return `/${segments.slice(0, -1).join("/")}`
}

const SHEET_LINKS = [
  { label: "Inspirasi", path: "/inspirasi", Icon: Sparkles },
  { label: "Destinasi", path: "/destinasi", Icon: MapPin },
  { label: "Pengalaman", path: "/pengalaman", Icon: Star },
  { label: "Travel Insights", path: "/blog", Icon: BookOpen },
  { label: "Tentang X3", path: "/tentang", Icon: Users },
  { label: "Kontak", path: "/kontak", Icon: Phone },
]

function MobileMenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const { path } = useNav()
  const prevPath = useRef(path)

  useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  // Close on route change
  useEffect(() => {
    if (path !== prevPath.current) {
      prevPath.current = path
      onClose()
    }
  }, [path])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!mounted) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Menu navigasi" className="lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/50"
        style={{
          opacity: visible ? 1 : 0,
          transition: reduceMotion ? "none" : "opacity 0.25s ease",
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: reduceMotion ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#E2E8F0]" aria-hidden="true" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0F4F8]">
          <span className="font-bold text-[#0B2542]">Jelajahi</span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5A7A9F] hover:bg-[#F5F8FC] focus:outline-none focus:ring-2 focus:ring-[#C99F5F]"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>
        {/* Links */}
        <div className="px-4 py-3 space-y-1">
          {SHEET_LINKS.map(({ label, path: linkPath, Icon }) => (
            <Link
              key={linkPath}
              to={linkPath}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#102033] font-medium hover:bg-[#F5F8FC] focus:outline-none focus:ring-2 focus:ring-[#C99F5F] active:bg-[#EEF2F8]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F5F8FC] flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-[#C99F5F]" aria-hidden="true" />
              </div>
              <span>{label}</span>
              <ChevronRight size={15} className="ml-auto text-[#C0CAD4]" aria-hidden="true" />
            </Link>
          ))}
        </div>
        {/* Sheet CTA */}
        <div className="px-4 pb-6 pt-2">
          <a
            href={wa("Halo X3 Organizer, saya ingin berkonsultasi mengenai rencana perjalanan.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C99F5F] text-white font-semibold rounded-2xl hover:bg-[#B8904F] transition-colors"
          >
            <MessageCircle size={16} aria-hidden="true" /> Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function MobileAppBar() {
  const { path } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const pageTitle = PAGE_TITLES[path] ?? ""
  const backPath = getMobileBackPath(path)
  const isHome = path === "/" || path === "/mulai"

  return (
    <>
      <header
        className={`lg:hidden fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
          scrolled ? "shadow-sm border-b border-[#E2E8F0]" : "border-b border-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 px-4">
          {isHome ? (
            <Link to="/" className="min-w-0 leading-none">
              <span className="block truncate text-[15px] font-extrabold tracking-tight text-[#0B2542]">
                X3 Organizer
              </span>
            </Link>
          ) : (
            <Link
              to={backPath ?? "/"}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0B2542] hover:bg-[#F5F8FC] [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99F5F]"
              aria-label="Kembali"
            >
              <ChevronLeft size={22} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          )}

          {!isHome && pageTitle ? (
            <h1 className="truncate text-center text-[15px] font-semibold leading-none text-[#0B2542]">
              {pageTitle}
            </h1>
          ) : (
            <span aria-hidden="true" />
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0B2542] hover:bg-[#F5F8FC] [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99F5F]"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <Menu size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>
      <MobileMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

const MOBILE_WA_MSG =
  "Halo X3 Organizer, saya ingin berkonsultasi mengenai rencana perjalanan."

const BOTTOM_NAV_ITEMS = [
  { label: "Beranda", path: "/", Icon: Home, exact: true },
  { label: "Layanan", path: "/layanan", Icon: Compass, exact: false },
  { label: "Paket", path: "/paket", Icon: Package, exact: false },
  { label: "Inspirasi", path: "/inspirasi", Icon: Sparkles, exact: false },
]

// Routes with no matching bottom nav item — no active indicator shown
const SECONDARY_ROUTES = ["/destinasi", "/pengalaman", "/blog", "/tentang", "/kontak", "/mulai"]

function MobileNavItem({
  label, path: navPath, Icon, active,
}: {
  label: string; path: string; Icon: React.ElementType; active: boolean
}) {
  return (
    <Link
      to={navPath}
      className="flex min-h-[52px] flex-col items-center justify-end gap-1 pb-2 pt-1.5 [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99F5F]"
      aria-current={active ? "page" : undefined}
    >
      <span className="flex h-[22px] w-[22px] items-center justify-center">
        <Icon
          size={22}
          className={`transition-colors duration-150 ${active ? "text-[#0B2542]" : "text-[#ABB6BF]"}`}
          strokeWidth={active ? 2.25 : 1.75}
          aria-hidden="true"
        />
      </span>
      <span
        className={`text-[10px] leading-none font-semibold tracking-[-0.01em] transition-colors duration-150 ${
          active ? "text-[#0B2542]" : "text-[#ABB6BF]"
        }`}
      >
        {label}
      </span>
    </Link>
  )
}

function MobileBottomNavigation() {
  const { path } = useNav()

  const isSecondary = SECONDARY_ROUTES.some((r) => path.startsWith(r))

  const getActive = (item: typeof BOTTOM_NAV_ITEMS[number]) => {
    if (isSecondary) return false
    return item.exact ? path === item.path : path.startsWith(item.path)
  }

  const [leftItems, rightItems] = [
    BOTTOM_NAV_ITEMS.slice(0, 2),
    BOTTOM_NAV_ITEMS.slice(2),
  ]

  return (
    <nav
      aria-label="Navigasi utama"
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[#E2E8F0] bg-white/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative grid h-[52px] grid-cols-5">
        {leftItems.map((item) => (
          <MobileNavItem key={item.path} {...item} active={getActive(item)} />
        ))}

        <div className="relative flex flex-col items-center justify-end pb-2 pt-1.5">
          <a
            href={wa(MOBILE_WA_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi via WhatsApp"
            className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-[18px] items-center justify-center rounded-full bg-[#C99F5F] shadow-[0_4px_14px_rgba(201,159,95,0.38)] ring-[3px] ring-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99F5F]"
          >
            <MessageCircle size={21} className="text-white" strokeWidth={2.25} aria-hidden="true" />
          </a>
          <span className="h-[22px]" aria-hidden="true" />
          <span className="text-[10px] leading-none font-semibold tracking-[-0.01em] text-[#ABB6BF]">
            Konsultasi
          </span>
        </div>

        {rightItems.map((item) => (
          <MobileNavItem key={item.path} {...item} active={getActive(item)} />
        ))}
      </div>
    </nav>
  )
}

// ─── Route Resolver ────────────────────────────────────────────────────────────

function renderRoute(path: string) {
  const landing = LANDING_PAGES[path]
  if (landing) return <SeoLandingPage config={landing} />

  const blogPost = BLOG_POST_BY_PATH[path]
  if (blogPost) return <BlogRoute slug={blogPost.slug} />

  switch (path) {
    case "/": return <HomePage />
    case "/layanan": return <LayananPage />
    case "/layanan/group-trip": return <ServicePage serviceId="group-trip" />
    case "/layanan/team-building": return <ServicePage serviceId="team-building" />
    case "/layanan/kampus-institusi": return <ServicePage serviceId="kampus-institusi" />
    case "/layanan/family-trip": return <ServicePage serviceId="family-trip" />
    case "/layanan/open-trip": return <ServicePage serviceId="open-trip" />
    case "/paket": return <PaketPage />
    case "/paket/family-trip-batu-malang": return <FamilyTripBatuMalangPage />
    case "/destinasi": return <DestinasiPage />
    case "/inspirasi": return <InspirationPage />
    case "/mulai": return <MulaiPage />
    case "/pengalaman": return <PengalamanPage />
    case "/tentang": return <TentangPage />
    case "/blog": return <BlogPage />
    case "/kontak": return <KontakPage />
    default: return <NotFoundPage />
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const getPath = () => {
    const p = window.location.pathname
    if (!p || p === "/") return "/"
    return p.endsWith("/") ? p.slice(0, -1) : p
  }
  const [path, setPath] = useState<string>(getPath)

  usePageSeo(path)

  // Capture UTM on initial load (?utm_source=instagram&utm_medium=social)
  useEffect(() => {
    const utm = readUrlUtm()
    if (Object.keys(utm).length > 0) saveSessionUtm(utm)
  }, [])

  useEffect(() => {
    const handler = () => {
      setPath(getPath())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("popstate", handler)
    return () => window.removeEventListener("popstate", handler)
  }, [])

  const navigate = (to: string) => {
    if (getPath() !== to) {
      window.history.pushState(null, "", to)
      setPath(to)
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <NavContext.Provider value={{ path, navigate }}>
      <div className="min-h-screen bg-background font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Desktop header — visible lg+ only (hidden on mobile) */}
        <Header />
        {/* Mobile app bar — visible on mobile only */}
        <MobileAppBar />

        <main>
          {renderRoute(path)}
        </main>

        <Footer />

        {/* Floating WhatsApp — desktop only; mobile uses bottom nav central action */}
        <div className="hidden lg:block">
          <FloatingWA />
        </div>

        {/* Mobile bottom navigation */}
        <MobileBottomNavigation />
      </div>
    </NavContext.Provider>
  )
}
