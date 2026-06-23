/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Quote,
  Search,
  Shield,
  Smile,
  Star,
  Users,
} from 'lucide-react';
import { initialLayanan, initialDestinasi, initialPaketTrip, initialBlogArtikel } from '../data';
import { ServiceIcon } from '../components/CardsAndUI';
import {
  Button,
  FinalCTA,
  PageHero,
  ResponsiveImage,
  Section,
  SectionHeader,
  SplitSection,
} from '../components/ui';
import { Accordion } from '../components/ui/Accordion';
import { HOME_FAQ_ITEMS } from '../data/faq';
import { getMediaAlt, responsiveImageProps } from '../data/media';
import { BlogArtikel, Destinasi, Layanan, PaketTrip } from '../types';

interface HomeViewProps {
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

const generalInquiryMessage =
  'Halo Admin, saya tertarik bertanya mengenai paket open trip / private trip yang tersedia.';

const getPackageDestinationLabel = (packageItem: PaketTrip, destinations: Destinasi[]) => {
  const names = destinations
    .filter((destination) => packageItem.destinasi_ids.includes(destination.id))
    .map((destination) => destination.name);

  return names.length > 0 ? names.join(' + ') : packageItem.type;
};

// Navigate via SPA pushState while preserving real-anchor semantics (open-in-new-tab, copy link).
const handleAnchorNav = (e: React.MouseEvent, handler: () => void) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  handler();
};

interface HomePackageCardProps {
  packageItem: PaketTrip;
  destinations: Destinasi[];
  onNavigate: (route: string) => void;
}

const HomePackageCard: React.FC<HomePackageCardProps> = ({
  packageItem,
  destinations,
  onNavigate,
}) => {
  const destinationLabel = getPackageDestinationLabel(packageItem, destinations);
  const href = `/produk/${packageItem.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <a
        href={href}
        onClick={(e) => handleAnchorNav(e, () => onNavigate(href))}
        className="flex h-full flex-col text-left"
        aria-label={`Lihat detail ${packageItem.name}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            {...responsiveImageProps(packageItem.imageUrl)}
            alt={getMediaAlt(packageItem.imageUrl, `${packageItem.name} di ${destinationLabel}`)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-900 shadow-sm">
            {packageItem.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex-1">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Clock className="h-4 w-4 text-amber-600" aria-hidden="true" />
              {packageItem.duration_label}
            </p>
            <h3 className="font-display text-2xl font-bold leading-tight text-slate-900">
              {packageItem.name}
            </h3>
          </div>

          <div className="mt-7 flex items-end justify-between gap-5 border-t border-slate-100 pt-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">Mulai dari</p>
              <p className="font-display text-2xl font-bold text-slate-900">{packageItem.price_label}</p>
            </div>
            {/* Visual CTA only — the whole card is the link (no nested interactive). */}
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-sm transition-colors duration-[250ms] min-h-[44px]"
            >
              Lihat Paket
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};

interface ServicePanelProps {
  layanan: Layanan;
  tripCount: number;
  featured?: boolean;
  href: string;
  onSelect: () => void;
}

const ServicePanel: React.FC<ServicePanelProps> = ({ layanan, tripCount, featured = false, href, onSelect }) => (
  <a
    href={href}
    onClick={(e) => handleAnchorNav(e, onSelect)}
    className={[
      'group flex h-full w-full flex-col justify-between rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1',
      featured
        ? 'bg-slate-950 p-8 text-white shadow-card-hover hover:bg-slate-900 md:p-10'
        : 'bg-white p-6 text-slate-900 shadow-card hover:border-slate-200 hover:shadow-card-hover md:p-7',
    ].join(' ')}
  >
    <div>
      <div
        className={[
          'mb-7 flex h-14 w-14 items-center justify-center rounded-2xl',
          featured ? 'bg-amber-500 text-slate-950' : 'bg-amber-100 text-slate-900',
        ].join(' ')}
      >
        <ServiceIcon name={layanan.iconName} className="h-6 w-6" />
      </div>
      <p className={featured ? 'mb-3 text-sm font-semibold text-amber-300' : 'mb-3 text-sm font-semibold text-amber-700'}>
        {tripCount} paket tersedia
      </p>
      <h3 className={featured ? 'font-display text-4xl font-bold leading-tight' : 'font-display text-2xl font-bold leading-tight'}>
        {layanan.name}
      </h3>
      <p className={featured ? 'mt-5 max-w-md text-base leading-relaxed text-slate-200' : 'mt-4 text-base leading-relaxed text-slate-600'}>
        {layanan.summary}
      </p>
    </div>
    <span className={featured ? 'mt-10 inline-flex items-center gap-2 font-bold text-amber-300' : 'mt-8 inline-flex items-center gap-2 font-bold text-slate-900'}>
      Eksplor layanan
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </a>
);

interface DestinationTileProps {
  destination: Destinasi;
  tripCount: number;
  large?: boolean;
  href: string;
  onSelect: () => void;
  className?: string;
}

const DestinationTile: React.FC<DestinationTileProps> = ({
  destination,
  tripCount,
  large = false,
  href,
  onSelect,
  className = '',
}) => (
  <a
    href={href}
    onClick={(e) => handleAnchorNav(e, onSelect)}
    className={[
      'group relative w-full overflow-hidden rounded-2xl text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover aspect-[4/3]',
      className,
    ].join(' ')}
  >
    <img
      {...responsiveImageProps(destination.imageUrl)}
      alt=""
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-300">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {destination.region}
      </p>
      <h3 className={large ? 'font-display text-5xl font-bold leading-none' : 'font-display text-3xl font-bold leading-tight'}>
        {destination.name}
      </h3>
      {large && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-100">{destination.summary}</p>
      )}
      <div className="mt-7 flex items-center justify-between gap-5">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
          {tripCount} paket
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  </a>
);

interface ArticlePreviewProps {
  article: BlogArtikel;
  featured?: boolean;
  onNavigate: (route: string) => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article, featured = false, onNavigate }) => {
  const href = `/blog/${article.slug}`;
  if (featured) {
    return (
      <a
        href={href}
        onClick={(e) => handleAnchorNav(e, () => onNavigate(href))}
        className="group grid overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:grid-cols-12"
      >
        <div className="relative aspect-[16/10] md:col-span-7">
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
        <div className="flex flex-col justify-between p-7 md:col-span-5 md:p-9">
          <div>
            <p className="mb-4 text-sm font-bold text-amber-700">{article.category}</p>
            <h3 className="font-display text-3xl font-bold leading-tight text-slate-900">{article.title}</h3>
            <p className="mt-5 line-clamp-4 text-base leading-relaxed text-slate-600">{article.excerpt}</p>
          </div>
          <span className="mt-9 inline-flex items-center gap-2 font-bold text-slate-900">
            Baca panduan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={(e) => handleAnchorNav(e, () => onNavigate(href))}
      className="group flex gap-5 border-t border-slate-200 py-6 text-left first:border-t-0 first:pt-0"
    >
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
        <img
          src={article.imageUrl}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-amber-700">{article.category}</p>
        <h3 className="font-display text-xl font-bold leading-snug text-slate-900">{article.title}</h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-slate-600">
          Baca
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
};

export default function HomeView({ onNavigate, onTanyaAdmin }: HomeViewProps) {
  const [selectedDest, setSelectedDest] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  const featuredPackages = initialPaketTrip.filter((p) => p.is_featured && p.status === 'published');
  const popularDestinations = initialDestinasi.filter((d) => d.status === 'active').slice(0, 4);
  const recentArticles = initialBlogArtikel.slice(0, 3);
  const heroDestination = initialDestinasi.find((destination) => destination.slug === 'bromo') ?? initialDestinasi[0];
  const corporatePackage = initialPaketTrip.find((packageItem) => packageItem.slug === 'corporate-outing-malang-batu');
  const familyPackage = initialPaketTrip.find((packageItem) => packageItem.slug === 'family-trip-batu-malang-edukatif');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/produk';
    const params: string[] = [];
    if (selectedDest) params.push(`dest=${selectedDest}`);
    if (selectedType) params.push(`type=${selectedType}`);
    if (selectedDuration) params.push(`dur=${selectedDuration}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    onNavigate(url);
  };

  const reviews = [
    {
      id: 1,
      name: 'Andi Saputra',
      role: 'Corporate HR Specialist',
      avatar: '/images/avatars/andi-saputra.svg',
      review:
        'Kualitas pelayanan tim sangat memuaskan. Mulai dari penjemputan hingga seluruh rundown acara berjalan sangat presisi dan on-time. Tim lapangan juga sangat asyik dan kooperatif dengan rombongan kami.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Riana Lestari',
      role: 'Ketua Komunitas',
      avatar: '/images/avatars/riana-lestari.svg',
      review:
        'Awalnya kami mencari organizer yang bisa mengakomodasi puluhan orang dengan ragam usia. Ternyata solusinya sangat praktis, fasilitas memadai, dan harga sangat transparan tanpa biaya tersembunyi.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Keluarga Gunawan',
      role: 'Liburan Keluarga',
      avatar: '/images/avatars/keluarga-gunawan.svg',
      review:
        'Bawa anak kecil dan lansia ternyata tetap nyaman karena pace turnya santai sesuai request kami. Penginapan bersih, makanan cocok untuk semua umur, layanannya benar-benar bintang lima.',
      rating: 5,
    },
  ];

  const trustItems = [
    { label: 'Admin responsif', value: '24/7', icon: MessageSquare },
    { label: 'Format trip', value: '4 layanan', icon: Users },
    { label: 'Destinasi aktif', value: `${initialDestinasi.filter((d) => d.status === 'active').length} kota`, icon: MapPin },
    { label: 'Booking jelas', value: 'WA resmi', icon: CheckCircle },
  ];

  const commitments = [
    {
      title: 'Itinerary transparan',
      text: 'Jadwal, meeting point, fasilitas, dan kebutuhan tambahan dijelaskan sebelum pembayaran.',
      icon: CalendarDays,
    },
    {
      title: 'Armada bersih dan siap jalan',
      text: 'Jeep, Hiace, dan kendaraan keluarga dipilih sesuai medan, jarak, dan ukuran rombongan.',
      icon: Award,
    },
    {
      title: 'Tim lokal yang paham ritme destinasi',
      text: 'Rute disusun mengikuti kondisi lapangan, musim ramai, dan kebutuhan peserta.',
      icon: Smile,
    },
    {
      title: 'Pendampingan admin dari awal',
      text: 'Konsultasi, kuotasi, reminder, dan koordinasi perjalanan tetap berada dalam satu alur.',
      icon: Shield,
    },
  ];

  return (
    <div id="home-view-container" className="w-full bg-surface-page text-slate-900 md:pb-0">
      <PageHero
        density="hero"
        eyebrow="X3 Organizer"
        title="Trip rapi, rombongan tenang"
        subtitle="Open trip, private trip, family trip, dan corporate outing ke Bromo, Bali, Nusa Penida, Malang, dan Batu dengan itinerary jelas dan admin WhatsApp yang sigap."
        centered={false}
        ratio="5-7"
        align="start"
        titleScale="hero"
        actions={
          <>
            <Button
              variant="whatsapp"
              size="lg"
              onClick={() => onTanyaAdmin(generalInquiryMessage)}
              className="shadow-card-hover"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Konsultasi WhatsApp
            </Button>
            <Button
              variant="outlineOnDark"
              size="lg"
              href="/produk"
              onClick={() => onNavigate('/produk')}
            >
              Lihat Paket Trip
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </>
        }
        media={
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-dialog">
            <ResponsiveImage
              {...responsiveImageProps(heroDestination.imageUrl, '(min-width: 1024px) 50vw, 100vw')}
              alt={getMediaAlt(heroDestination.imageUrl, `Pemandangan wisata ${heroDestination.name}, ${heroDestination.region}`)}
              aspect="aspect-[4/3] lg:aspect-[3/2]"
              wrapperClassName="rounded-2xl"
              loading="eager"
              fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4 md:left-7 md:right-7 md:top-7">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm">
                {heroDestination.region}
              </span>
              <span className="hidden rounded-full bg-slate-950/70 px-4 py-2 text-sm font-bold text-white backdrop-blur-md sm:inline-flex">
                Focal trip: {heroDestination.name}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-8">
              <p className="mb-3 text-sm font-bold text-amber-300">Destinasi utama</p>
              <h2 className="font-display text-3xl font-bold leading-none text-white md:text-5xl">
                {heroDestination.name}
              </h2>
              <div className="mt-6 grid gap-3 rounded-2xl bg-white/95 p-4 text-slate-900 shadow-card backdrop-blur-md sm:grid-cols-3 md:p-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Meeting point</p>
                  <p className="mt-1 font-bold">Malang / Surabaya</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Format</p>
                  <p className="mt-1 font-bold">Open & private</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Booking</p>
                  <p className="mt-1 font-bold">Konsultasi WA</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Section surface="transparent" density="none" container="site" className="-mt-10 relative z-20">
          <form
            onSubmit={handleSearchSubmit}
            className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-dialog md:p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5"
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 block text-sm font-bold text-slate-600" htmlFor="home-destination">
                Destinasi
              </label>
              <select
                id="home-destination"
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-transparent text-base font-bold text-slate-900 outline-none"
              >
                <option value="">Semua destinasi</option>
                {initialDestinasi.map((destination) => (
                  <option key={destination.id} value={destination.slug}>
                    {destination.name} ({destination.region})
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 block text-sm font-bold text-slate-600" htmlFor="home-trip-type">
                Tipe trip
              </label>
              <select
                id="home-trip-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent text-base font-bold text-slate-900 outline-none"
              >
                <option value="">Semua tipe</option>
                <option value="Open Trip">Open Trip</option>
                <option value="Private Trip">Private Trip</option>
                <option value="Corporate Outing">Corporate Outing</option>
                <option value="Family Trip">Family Trip</option>
              </select>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <label className="mb-2 block text-sm font-bold text-slate-600" htmlFor="home-duration">
                Durasi
              </label>
              <select
                id="home-duration"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-transparent text-base font-bold text-slate-900 outline-none"
              >
                <option value="">Semua durasi</option>
                <option value="1 Hari">1 Hari</option>
                <option value="2 Hari 1 Malam">2 Hari 1 Malam</option>
                <option value="3 Hari 2 Malam">3 Hari 2 Malam</option>
              </select>
            </div>

            <Button type="submit" variant="primary" size="lg" className="h-full min-h-[56px] w-full lg:w-auto">
              <Search className="h-5 w-5" aria-hidden="true" />
              Cari Paket
            </Button>
          </form>
      </Section>

      <Section surface="card" density="default" container="site">
        <SplitSection ratio="5-7" mediaPosition="right" align="start">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Tentang Kami"
              title="Partner perjalanan yang mengurus ritme rombongan dari awal."
              description="Kami mengelola perjalanan wisata dengan jadwal yang mudah dibaca, komunikasi yang jelas, dan tim lapangan yang memahami karakter setiap destinasi."
            />
            <div className="mt-10 grid grid-cols-2 gap-4">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <Icon className="mb-5 h-6 w-6 text-amber-700" aria-hidden="true" />
                    <p className="font-display text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/destinations/nusa-penida-kelingking.jpg"
              alt="Tebing Kelingking Nusa Penida"
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover shadow-card md:h-72"
            />
            <div className="grid gap-4">
              <img
                src="/images/packages/corporate-outing-malang-batu.jpg"
                alt="Rombongan corporate outing di Malang Batu"
                loading="lazy"
                className="h-48 w-full rounded-2xl object-cover shadow-card md:h-56"
              />
              <div className="flex min-h-32 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-card md:min-h-40">
                <img src="/images/brand/x3-organizer-logo.png" width="512" height="512" alt="X3 Organizer" className="max-h-20 w-auto object-contain" />
              </div>
            </div>
          </div>
        </SplitSection>
      </Section>

      <Section surface="page" density="default" container="site" bordered>
        <SectionHeader
          align="left"
          eyebrow="Jenis Layanan"
          title="Pilih format perjalanan sebelum memilih destinasi."
          description="X3 Organizer melayani perjalanan hemat, privat, korporat, dan keluarga dengan ritme yang disesuaikan dengan jumlah peserta."
          contentGap
        />
        <div className="grid gap-6 lg:grid-cols-12">
          {initialLayanan[0] && (
            <div className="lg:col-span-5">
              <ServicePanel
                layanan={initialLayanan[0]}
                tripCount={initialPaketTrip.filter((packageItem) => packageItem.layanan_ids.includes(initialLayanan[0].id)).length}
                featured
                href={`/layanan/${initialLayanan[0].slug}`}
                onSelect={() => onNavigate(`/layanan/${initialLayanan[0].slug}`)}
              />
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
            {initialLayanan.slice(1).map((layanan) => {
              const count = initialPaketTrip.filter((packageItem) => packageItem.layanan_ids.includes(layanan.id)).length;
              return (
                <ServicePanel
                  key={layanan.id}
                  layanan={layanan}
                  tripCount={count}
                  href={`/layanan/${layanan.slug}`}
                  onSelect={() => onNavigate(`/layanan/${layanan.slug}`)}
                />
              );
            })}
          </div>
        </div>
      </Section>

      <Section surface="card" density="default" container="site">
        <div className="section-header-gap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            eyebrow="Rekomendasi"
            title="Paket unggulan dengan keputusan yang lebih mudah."
          />
          <a
            href="/produk"
            onClick={(e) => handleAnchorNav(e, () => onNavigate('/produk'))}
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-50 md:self-auto"
          >
            Semua paket
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid-cards md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((packageItem) => (
            <HomePackageCard
              key={packageItem.id}
              packageItem={packageItem}
              destinations={initialDestinasi}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </Section>

      <Section surface="page" density="default" container="site" bordered>
        <SectionHeader
          align="left"
          eyebrow="Destinasi"
          title="Satu peta rasa: sunrise, tebing, kota sejuk, dan rekreasi keluarga."
          description="Setiap destinasi dipilih karena punya karakter perjalanan yang jelas, sehingga rombongan bisa memilih suasana sebelum membahas detail paket."
          width="wide"
          contentGap
        />
        <div className="grid-cards lg:grid-cols-12 lg:auto-rows-fr">
            {popularDestinations.map((destination, index) => {
              const count = initialPaketTrip.filter((packageItem) => packageItem.destinasi_ids.includes(destination.id)).length;
              const isLarge = index === 0 || index === 3;
              return (
                <DestinationTile
                  key={destination.id}
                  destination={destination}
                  tripCount={count}
                  large={isLarge}
                  className={isLarge ? 'lg:col-span-7' : 'lg:col-span-5'}
                  href={`/produk?dest=${destination.slug}`}
                  onSelect={() => onNavigate(`/produk?dest=${destination.slug}`)}
                />
              );
            })}
        </div>
      </Section>

      <Section surface="dark" density="default" container="site">
        <SplitSection ratio="5-7" mediaPosition="right" align="start">
          <div>
            <SectionHeader
              align="left"
              inverted
              eyebrow="Komitmen Layanan"
              title="Perjalanan terasa ringan ketika detailnya sudah dijaga."
              description="Dari konsultasi awal sampai pulang, tim kami menjaga alur supaya peserta tidak menebak-nebak fasilitas, jadwal, atau titik kumpul."
              actions={
                <Button variant="accent" size="lg" href="/produk" onClick={() => onNavigate('/produk')}>
                  Eksplor Katalog
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              }
            />
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid gap-5 py-7 sm:grid-cols-[auto_1fr] sm:items-start md:py-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-300">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SplitSection>
      </Section>

      <Section surface="card" density="default" container="site">
        <SplitSection ratio="7-5" mediaPosition="left" align="start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-hover lg:min-h-[24rem]">
            <img
              src="/images/packages/corporate-outing-malang-batu.jpg"
              alt="Corporate outing dan family trip di area Malang Batu"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <p className="mb-3 text-sm font-bold text-amber-300">Corporate & family highlight</p>
              <h2 className="measure-section-title font-display text-3xl font-bold leading-tight md:text-4xl">
                Rombongan besar tetap bisa terasa personal.
              </h2>
            </div>
          </div>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Untuk Grup"
              title="Outing kantor atau liburan keluarga butuh ritme yang berbeda."
              description="Tim HR butuh rundown, invoice, dan koordinasi peserta. Keluarga butuh tempo yang santai, kendaraan nyaman, dan destinasi yang aman untuk anak maupun lansia."
            />
            <div className="mt-9 grid gap-4">
                <a
                  href={corporatePackage ? `/produk/${corporatePackage.slug}` : '/layanan/corporate-outing'}
                  onClick={(e) => handleAnchorNav(e, () => onNavigate(corporatePackage ? `/produk/${corporatePackage.slug}` : '/layanan/corporate-outing'))}
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left transition-colors hover:bg-white hover:shadow-card"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-amber-300">
                      <Briefcase className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-display text-xl text-slate-900">Corporate Outing</strong>
                      <span className="text-sm font-semibold text-slate-600">Rundown, games, dan kebutuhan kantor</span>
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>

                <a
                  href={familyPackage ? `/produk/${familyPackage.slug}` : '/layanan/family-trip'}
                  onClick={(e) => handleAnchorNav(e, () => onNavigate(familyPackage ? `/produk/${familyPackage.slug}` : '/layanan/family-trip'))}
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left transition-colors hover:bg-white hover:shadow-card"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-slate-900">
                      <Heart className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-display text-xl text-slate-900">Family Trip</strong>
                      <span className="text-sm font-semibold text-slate-600">Tempo santai dan pilihan destinasi ramah keluarga</span>
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
          </div>
        </SplitSection>
      </Section>

      <Section surface="page" density="default" container="content" bordered>
        <SectionHeader
          align="left"
          eyebrow="Ulasan Pelanggan"
          title="Yang membuat perjalanan terasa aman adalah cara tim merespons."
          contentGap
        />
        <div className="grid-cards lg:grid-cols-12">
            <article className="rounded-2xl bg-slate-950 p-7 text-white shadow-card-hover md:p-10 lg:col-span-7">
              <Quote className="h-14 w-14 text-amber-400" aria-hidden="true" />
              <div className="mt-8 flex gap-1 text-amber-400" role="img" aria-label={`${reviews[0].rating} dari 5 bintang`}>
                {Array.from({ length: reviews[0].rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-7 max-w-3xl font-display text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
                "{reviews[0].review}"
              </p>
              <div className="mt-10 flex items-center gap-4">
                <img src={reviews[0].avatar} alt={reviews[0].name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-white">{reviews[0].name}</h3>
                  <p className="text-sm font-semibold text-slate-300">{reviews[0].role}</p>
                </div>
              </div>
            </article>

            <div className="grid gap-6 lg:col-span-5">
              {reviews.slice(1).map((review) => (
                <article key={review.id} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card">
                  <div className="mb-5 flex gap-1 text-amber-500" role="img" aria-label={`${review.rating} dari 5 bintang`}>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-slate-700">"{review.review}"</p>
                  <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                    <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-slate-900">{review.name}</h3>
                      <p className="text-sm font-semibold text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
        </div>
      </Section>

      <Section surface="card" density="default" container="site">
        <div className="section-header-gap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            eyebrow="Blog & Artikel"
            title="Insight perjalanan sebelum menentukan tanggal."
          />
          <a
            href="/blog"
            onClick={(e) => handleAnchorNav(e, () => onNavigate('/blog'))}
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-50 md:self-auto"
          >
            Semua artikel
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              {recentArticles[0] && (
                <ArticlePreview article={recentArticles[0]} featured onNavigate={onNavigate} />
              )}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8 lg:col-span-4">
              {recentArticles.slice(1).map((article) => (
                <ArticlePreview key={article.id} article={article} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
      </Section>

      <Section id="faq" surface="page" density="default" container="content" bordered>
        <SplitSection ratio="5-7" mediaPosition="right" align="start">
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Jawaban cepat sebelum Anda menghubungi admin."
            description="Kalau kebutuhan rombongan Anda lebih spesifik, tim admin bisa bantu susun opsi paket lewat WhatsApp setelah Anda mengirim jumlah peserta dan tanggal rencana."
          />
          <Accordion items={HOME_FAQ_ITEMS} />
        </SplitSection>
      </Section>

      <FinalCTA
        onWhatsApp={() => onTanyaAdmin(generalInquiryMessage)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
