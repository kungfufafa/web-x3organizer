/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle, Clock, Filter, Info, MapPin, Phone, Share2 } from 'lucide-react';
import { initialBlogArtikel, initialDestinasi, initialLayanan, initialPaketTrip } from '../data';
import { FeaturesBlock, ItineraryTimeline, PricingCard, TripCard } from '../components/CardsAndUI';
import { PaketTrip } from '../types';
import {
  Breadcrumbs,
  Button,
  Card,
  FinalCTA,
  FormField,
  Input,
  PageHero,
  ResponsiveImage,
  Section,
  SectionHeader,
  Select,
  SplitSection,
} from '../components/ui';

interface ProdukListingProps {
  initialDestFilter?: string;
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItem: PaketTrip) => void;
}

export const ProdukListingView: React.FC<ProdukListingProps> = ({ initialDestFilter = '', onNavigate, onTanyaAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDest, setSelectedDest] = useState(initialDestFilter);
  const [selectedLayanan, setSelectedLayanan] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('dest');
    const type = params.get('type');
    const dur = params.get('dur');
    if (dest) setSelectedDest(dest);
    if (type) {
      const matchedLay = initialLayanan.find((layanan) => layanan.name.toLowerCase() === type.toLowerCase());
      if (matchedLay) setSelectedLayanan(matchedLay.slug);
    }
    if (dur) setSelectedDuration(dur);
  }, [initialDestFilter]);

  const filteredPackages = initialPaketTrip.filter((packageItem) => {
    if (packageItem.status !== 'published') return false;
    const matchesSearch =
      packageItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      packageItem.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const targetDest = selectedDest ? initialDestinasi.find((destination) => destination.slug === selectedDest) : null;
    const targetService = selectedLayanan ? initialLayanan.find((layanan) => layanan.slug === selectedLayanan) : null;

    const matchesDest = targetDest ? packageItem.destinasi_ids.includes(targetDest.id) : true;
    const matchesLayanan = targetService ? packageItem.layanan_ids.includes(targetService.id) : true;
    const matchesDuration = selectedDuration ? packageItem.duration_label.toLowerCase().includes(selectedDuration.toLowerCase()) : true;
    const matchesPrice =
      !selectedPriceRange ||
      (selectedPriceRange === 'under-500' && packageItem.starting_price < 500000) ||
      (selectedPriceRange === '500-1500' && packageItem.starting_price >= 500000 && packageItem.starting_price <= 1500000) ||
      (selectedPriceRange === 'above-1500' && packageItem.starting_price > 1500000);

    return matchesSearch && matchesDest && matchesLayanan && matchesDuration && matchesPrice;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-asc') return a.starting_price - b.starting_price;
    if (sortBy === 'price-desc') return b.starting_price - a.starting_price;
    if (sortBy === 'pop') return b.rating - a.rating;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDest('');
    setSelectedLayanan('');
    setSelectedDuration('');
    setSelectedPriceRange('');
    setSortBy('newest');
  };

  return (
    <div id="produk-listing-container" className="w-full bg-surface-page text-slate-900">
      <PageHero
        eyebrow="Katalog Perjalanan"
        title="Cari paket trip tanpa menebak detailnya."
        subtitle="Filter berdasarkan destinasi, format trip, durasi, dan budget. Kartu katalog dibuat ringkas; detail lengkap tersedia di halaman paket."
        centered={false}
        density="compact"
      >
        <div className="max-w-xl">
          <div className="relative flex items-center">
            <Filter className="absolute left-4 z-10 h-5 w-5 text-slate-300" aria-hidden="true" />
            <Input
              dark
              type="text"
              placeholder="Cari nama paket trip atau destinasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>
      </PageHero>

      <Section surface="page" density="default" container="site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <aside className="rounded-2xl border border-slate-100 bg-white p-5 lg:p-6 shadow-card lg:sticky lg:top-[calc(var(--layout-header-height)+1rem)] lg:col-span-3">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-display text-xl font-bold text-slate-900">Filter trip</h2>
              <button type="button" onClick={clearFilters} className="text-sm font-bold text-slate-500 hover:text-slate-900">
                Reset
              </button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <FormField label="Destinasi">
                <Select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}>
                  <option value="">Semua Destinasi</option>
                  {initialDestinasi.map((destination) => (
                    <option key={destination.id} value={destination.slug}>{destination.name}</option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Format Trip">
                <Select value={selectedLayanan} onChange={(e) => setSelectedLayanan(e.target.value)}>
                  <option value="">Semua Layanan</option>
                  {initialLayanan.map((layanan) => (
                    <option key={layanan.id} value={layanan.slug}>{layanan.name}</option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Durasi">
                <Select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
                  <option value="">Semua Durasi</option>
                  <option value="1 Hari">1 Hari</option>
                  <option value="2 Hari">2 Hari</option>
                  <option value="3 Hari">3 Hari</option>
                </Select>
              </FormField>
              <FormField label="Harga">
                <Select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                  <option value="">Semua Harga</option>
                  <option value="under-500">Di bawah Rp 500k</option>
                  <option value="500-1500">Rp 500k - Rp 1.5 Juta</option>
                  <option value="above-1500">Di atas Rp 1.5 Juta</option>
                </Select>
              </FormField>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Hasil katalog</p>
                <p className="font-display text-2xl font-bold text-slate-900">{sortedPackages.length} paket trip</p>
              </div>
              <FormField label="Urutkan" className="min-w-56">
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Terbaru</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="pop">Ulasan Terbaik</option>
                </Select>
              </FormField>
            </div>

            {sortedPackages.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-card">
                <Filter className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                <h2 className="mt-5 font-display text-2xl font-bold text-slate-900">Paket belum ditemukan</h2>
                <p className="mt-3 text-slate-600">Coba reset filter atau gunakan kata kunci yang lebih umum.</p>
                <Button onClick={clearFilters} className="mt-7">Atur Ulang Filter</Button>
              </div>
            ) : (
              <div className="grid-cards md:grid-cols-2 xl:grid-cols-3">
                {sortedPackages.map((packageItem) => (
                  <TripCard
                    key={packageItem.id}
                    packageItem={packageItem}
                    destinationsList={initialDestinasi}
                    onSelect={(packageSlug) => onNavigate(`/produk/${packageSlug}`)}
                    onTanyaAdmin={(item) => onTanyaAdmin(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <FinalCTA
        eyebrow="Butuh bantuan memilih?"
        title="Kirim kebutuhan rombongan, biar admin bantu saring."
        onWhatsApp={() => onTanyaAdmin(initialPaketTrip[0])}
        onNavigate={onNavigate}
      />
    </div>
  );
};

interface ProdukDetailProps {
  slug: string;
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItem: PaketTrip) => void;
}

export const ProdukDetailView: React.FC<ProdukDetailProps> = ({ slug, onNavigate, onTanyaAdmin }) => {
  const [shareCopied, setShareCopied] = useState(false);
  const packageItem = initialPaketTrip.find((packageData) => packageData.slug === slug);

  if (!packageItem) {
    return (
      <Section surface="page" density="spacious" container="content">
        <div className="text-center">
          <h1 className="font-display text-display-section font-bold text-slate-900">Paket trip tidak ditemukan</h1>
          <p className="mt-4 text-slate-600">Kembali ke katalog paket perjalanan untuk memilih paket yang tersedia.</p>
          <Button href="/produk" onClick={() => onNavigate('/produk')} className="mt-8">Kembali ke Katalog</Button>
        </div>
      </Section>
    );
  }

  const matchedDests = initialDestinasi.filter((destination) => packageItem.destinasi_ids.includes(destination.id));
  const matchedLay = initialLayanan.filter((layanan) => packageItem.layanan_ids.includes(layanan.id));
  const relatedPackages = initialPaketTrip
    .filter((item) => item.id !== packageItem.id && item.destinasi_ids.some((id) => packageItem.destinasi_ids.includes(id)))
    .slice(0, 3);
  const relatedArticles = initialBlogArtikel
    .filter((article) => article.related_package_ids.includes(packageItem.id))
    .slice(0, 2);
  const highlights = packageItem.features.filter((feature) => feature.type === 'highlight');

  const handleShare = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/produk/${packageItem.slug}`);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div id="produk-detail-root" className="w-full bg-surface-page text-slate-900 pb-24 lg:pb-0">
      <PageHero
        eyebrow={packageItem.type}
        title={packageItem.name}
        subtitle={packageItem.summary}
        centered={false}
        media={
          <ResponsiveImage
            src={packageItem.imageUrl}
            alt={packageItem.name}
            aspect="aspect-[4/3] lg:aspect-[3/2]"
            wrapperClassName="shadow-dialog"
            loading="eager"
          />
        }
      >
        <Breadcrumbs
          inverted
          onNavigate={onNavigate}
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Paket Trip', href: '/produk' },
            { label: packageItem.name },
          ]}
        />
      </PageHero>

      <Section surface="card" density="compact" container="site" className="border-b border-slate-100">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Destinasi', matchedDests.map((destination) => destination.name).join(', ')],
            ['Durasi', packageItem.duration_label],
            ['Mulai dari', packageItem.price_label],
            ['Ulasan', packageItem.review_label],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-2 font-display text-xl font-bold leading-tight text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="page" density="spacious" container="site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="space-y-14 lg:col-span-8">
            {highlights.length > 0 && (
              <section>
                <SectionHeader
                  eyebrow="Keistimewaan"
                  title="Alasan paket ini layak masuk shortlist."
                  description="Highlight disusun untuk membantu Anda memahami nilai utama paket tanpa membaca semua detail sekaligus."
                />
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {highlights.map((feature, index) => (
                    <div key={feature.label} className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 font-bold text-amber-300">{index + 1}</span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{feature.label}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
              <SectionHeader
                eyebrow="Informasi Trip"
                title="Gambaran perjalanan"
                description={packageItem.description}
              />
            </section>

            <section>
              <SectionHeader eyebrow="Itinerary" title="Rencana perjalanan" />
              <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
                <ItineraryTimeline itineraries={packageItem.itineraries} />
              </div>
            </section>

            <section>
              <SectionHeader eyebrow="Fasilitas" title="Termasuk, tidak termasuk, dan catatan penting" />
              <div className="mt-10 grid gap-8">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                  <h3 className="mb-5 font-display text-xl font-bold text-slate-900">Termasuk</h3>
                  <FeaturesBlock features={packageItem.features} type="included" />
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                  <h3 className="mb-5 font-display text-xl font-bold text-slate-900">Tidak termasuk</h3>
                  <FeaturesBlock features={packageItem.features} type="excluded" />
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                  <h3 className="mb-5 font-display text-xl font-bold text-slate-900">Catatan</h3>
                  <FeaturesBlock features={packageItem.features} type="note" />
                </div>
              </div>
            </section>

            {relatedArticles.length > 0 && (
              <section>
                <SectionHeader eyebrow="Panduan terkait" title="Baca sebelum berangkat" />
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {relatedArticles.map((article) => (
                    <a
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        e.preventDefault();
                        onNavigate(`/blog/${article.slug}`);
                      }}
                      className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <img src={article.imageUrl} alt="" loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-bold text-amber-700">{article.category}</p>
                        <h3 className="mt-1 line-clamp-2 font-display text-lg font-bold leading-tight text-slate-900">{article.title}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-[calc(var(--layout-header-height)+1rem)] rounded-2xl border border-slate-100 bg-white p-6 shadow-card-hover">
              <p className="text-sm font-semibold text-slate-500">Mulai dari</p>
              <p className="mt-2 font-display text-4xl font-bold text-slate-900">{packageItem.price_label}</p>
              <div className="my-7 space-y-4 border-y border-slate-100 py-6">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Format</span>
                  <strong className="text-right text-slate-900">{matchedLay.map((layanan) => layanan.name).join(', ')}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Durasi</span>
                  <strong className="text-right text-slate-900">{packageItem.duration_label}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Status</span>
                  <strong className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Tersedia</strong>
                </div>
              </div>
              <div className="grid gap-3">
                <Button variant="whatsapp" fullWidth onClick={() => onTanyaAdmin(packageItem)}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Booking via WhatsApp
                </Button>
                <Button variant="outline" fullWidth onClick={handleShare}>
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  {shareCopied ? 'URL disalin' : 'Bagikan paket'}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section surface="card" density="default" container="site" bordered>
        <SectionHeader eyebrow="Pilihan Pendaftaran" title="Tier harga dan peserta" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {packageItem.prices.map((tier) => <PricingCard key={tier.name} tier={tier} />)}
        </div>
      </Section>

      {relatedPackages.length > 0 && (
        <Section surface="dark" density="default" container="site" bordered>
          <SectionHeader eyebrow="Pilihan Alternatif" title="Paket serupa" inverted />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {relatedPackages.map((relatedPackage) => (
              <TripCard
                key={relatedPackage.id}
                packageItem={relatedPackage}
                destinationsList={initialDestinasi}
                onSelect={(packageSlug) => onNavigate(`/produk/${packageSlug}`)}
                onTanyaAdmin={(item) => onTanyaAdmin(item)}
              />
            ))}
          </div>
        </Section>
      )}

      <FinalCTA
        eyebrow="Butuh konfirmasi sebelum booking?"
        title="Tanyakan ketersediaan jadwal dan kuota rombongan."
        description="Admin akan membantu memastikan paket, tanggal, dan format trip sudah sesuai sebelum Anda transfer DP."
        onWhatsApp={() => onTanyaAdmin(packageItem)}
        onNavigate={onNavigate}
        secondaryLabel="Bandingkan Paket Lain"
      />

      <div className="lg:hidden fixed bottom-[calc(88px+env(safe-area-inset-bottom))] inset-x-0 z-40 border-t border-slate-100 bg-white/95 p-4 shadow-dropdown backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">Mulai dari</p>
            <p className="font-display text-xl font-bold text-slate-900">{packageItem.price_label}</p>
          </div>
          <Button variant="whatsapp" onClick={() => onTanyaAdmin(packageItem)}>
            Booking WA
          </Button>
        </div>
      </div>
    </div>
  );
};
