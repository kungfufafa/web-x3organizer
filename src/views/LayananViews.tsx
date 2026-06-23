/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, MapPin, MessageSquare } from 'lucide-react';
import { initialLayanan, initialDestinasi, initialPaketTrip } from '../data';
import { getMediaAlt } from '../data/media';
import { ServiceIcon, TripCard } from '../components/CardsAndUI';
import { PaketTrip } from '../types';
import {
  Accordion,
  Breadcrumbs,
  Button,
  Card,
  FinalCTA,
  PageHero,
  ResponsiveImage,
  Section,
  SectionHeader,
  SplitSection,
} from '../components/ui';

interface LayananListingProps {
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

const serviceImages: Record<string, string> = {
  'open-trip': '/images/destinations/bromo-sunrise-jeep.jpg',
  'private-trip': '/images/destinations/nusa-penida-kelingking.jpg',
  'corporate-outing': '/images/packages/corporate-outing-malang-batu.jpg',
  'family-trip': '/images/destinations/batu-family-park.jpg',
};

const serviceFocus: Record<string, { headline: string; proof: string; process: string[] }> = {
  'open-trip': {
    headline: 'Berangkat bareng traveler lain tanpa mengurus teknis sendiri.',
    proof: 'Cocok untuk solo traveler, pasangan, atau grup kecil yang ingin budget efisien.',
    process: ['Pilih destinasi dan tanggal', 'Konfirmasi kuota dengan admin', 'Berangkat dari meeting point'],
  },
  'private-trip': {
    headline: 'Tanggal, tempo, dan rute disesuaikan untuk rombongan Anda.',
    proof: 'Cocok untuk pasangan, keluarga kecil, atau grup yang mengutamakan privasi.',
    process: ['Kirim jumlah peserta', 'Diskusikan rute dan kendaraan', 'Terima kuotasi privat'],
  },
  'corporate-outing': {
    headline: 'Rundown kantor, games, dan kebutuhan administratif berjalan satu alur.',
    proof: 'Cocok untuk HR, panitia gathering, instansi, dan komunitas besar.',
    process: ['Brief kebutuhan acara', 'Susun proposal dan rundown', 'Koordinasi peserta sampai hari H'],
  },
  'family-trip': {
    headline: 'Pace santai, kendaraan nyaman, dan destinasi ramah keluarga.',
    proof: 'Cocok untuk perjalanan bersama anak, orang tua, dan anggota keluarga lintas usia.',
    process: ['Pilih tempo perjalanan', 'Atur kebutuhan anak/lansia', 'Nikmati rute yang nyaman'],
  },
};

const getServiceTrips = (serviceId: number) =>
  initialPaketTrip.filter((packageItem) => packageItem.layanan_ids.includes(serviceId) && packageItem.status === 'published');

const getServiceDestinations = (packages: PaketTrip[]) => {
  const relatedDestIds = Array.from(new Set(packages.flatMap((trip) => trip.destinasi_ids)));
  return initialDestinasi.filter((destination) => relatedDestIds.includes(destination.id));
};

export const LayananListingView: React.FC<LayananListingProps> = ({ onNavigate, onTanyaAdmin }) => {
  const activeLayanan = initialLayanan.filter((layanan) => layanan.is_active);

  return (
    <div id="layanan-listing-container" className="w-full bg-surface-page text-slate-900">
      <PageHero
        density="compact"
        eyebrow="Katalog Layanan"
        title="Empat format perjalanan, satu standar layanan."
        subtitle="Pilih cara berangkat yang sesuai jumlah peserta, budget, dan ritme rombongan Anda."
        centered={false}
        ratio="5-7"
        align="start"
        media={
          <ResponsiveImage
            src="/images/destinations/nusa-penida-kelingking.jpg"
            alt={getMediaAlt('/images/destinations/nusa-penida-kelingking.jpg', 'Tebing Kelingking Nusa Penida')}
            aspect="aspect-[4/3] lg:aspect-[3/2]"
            wrapperClassName="shadow-card"
            loading="eager"
          />
        }
      />

      <Section surface="page" density="default" container="site">
        <SectionHeader
          align="left"
          eyebrow="Jenis Layanan"
          title="Mulai dari format perjalanan, lalu pilih destinasi."
          description="Setiap layanan punya ritme berbeda: hemat dan sosial, privat dan fleksibel, korporat dan terstruktur, atau keluarga dan santai."
          width="wide"
          contentGap
        />

        <div className="grid-cards md:grid-cols-2 lg:grid-cols-4">
          {activeLayanan.map((layanan, index) => {
            const packages = getServiceTrips(layanan.id);
            const destinations = getServiceDestinations(packages).slice(0, 3);

            return (
              <Card
                id={`layanan-listing-card-${layanan.id}`}
                key={layanan.id}
                animateIndex={index}
                className="group relative flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1"
              >
                <ServiceIcon
                  name={layanan.iconName}
                  className="pointer-events-none absolute bottom-4 right-4 z-0 h-28 w-28 rotate-12 text-slate-50 transition-transform duration-700 ease-out group-hover:-rotate-12"
                />

                <div className="relative z-10 flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-800 transition-colors duration-300 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-amber-500">
                      <ServiceIcon name={layanan.iconName} className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {packages.length} Paket
                    </span>
                  </div>

                  <div className="mt-6 flex-1 space-y-3">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-brand-primary">
                      {layanan.name}
                    </h2>
                    <p className="font-sans text-sm leading-relaxed text-slate-500">
                      {layanan.summary}
                    </p>
                  </div>

                  {destinations.length > 0 && (
                    <div className="mt-5 border-t border-slate-100/60 pt-4 font-sans">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Destinasi Populer
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {destinations.map((destination) => (
                          <span
                            key={destination.id}
                            className="flex items-center rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-700"
                          >
                            <MapPin className="mr-1.5 h-3 w-3 text-amber-600" aria-hidden="true" />
                            {destination.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 grid grid-cols-2 gap-3 pt-2 font-sans">
                    <Button variant="primary" size="sm" fullWidth href={`/layanan/${layanan.slug}`} onClick={() => onNavigate(`/layanan/${layanan.slug}`)}>
                      Lihat Paket
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => onTanyaAdmin(`Halo Admin, saya tertarik tanya-tanya mengenai layanan kategori ${layanan.name}.`)}
                    >
                      Tanya Admin
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <FinalCTA
        eyebrow="Butuh arahan?"
        title="Belum yakin format trip yang cocok?"
        description="Ceritakan jumlah peserta, destinasi impian, dan perkiraan tanggal. Admin X3 Organizer akan bantu arahkan layanan yang paling masuk akal."
        onWhatsApp={() => onTanyaAdmin('Halo Admin, saya butuh bantuan memilih format layanan perjalanan yang tepat.')}
        onNavigate={onNavigate}
        secondaryLabel="Lihat Semua Paket"
      />
    </div>
  );
};

interface LayananDetailProps {
  slug: string;
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export const LayananDetailView: React.FC<LayananDetailProps> = ({ slug, onNavigate, onTanyaAdmin }) => {
  const currentLayanan = initialLayanan.find((layanan) => layanan.slug === slug);

  if (!currentLayanan) {
    return (
      <Section surface="page" density="default" container="content">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
            <Compass className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-amber-600">Tidak ditemukan</p>
          <h1 className="mt-4 font-display text-display-section font-bold text-slate-900">
            Kategori layanan tidak ditemukan
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Layanan yang Anda cari mungkin telah dipindahkan atau tidak tersedia. Kembali ke katalog layanan atau jelajahi paket trip.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" href="/layanan" onClick={() => onNavigate('/layanan')}>
              Kembali ke Layanan
            </Button>
            <Button variant="outline" size="lg" href="/produk" onClick={() => onNavigate('/produk')}>
              Lihat Paket
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const associatedTrips = getServiceTrips(currentLayanan.id);
  const associatedDests = getServiceDestinations(associatedTrips);
  const focus = serviceFocus[currentLayanan.slug] ?? serviceFocus['open-trip'];
  const heroImage = serviceImages[currentLayanan.slug] ?? associatedTrips[0]?.imageUrl ?? '/images/destinations/bromo-sunrise-jeep.jpg';

  const faqs = [
    {
      id: `${currentLayanan.slug}-facility`,
      question: `Apakah tiket masuk objek wisata termasuk dalam paket ${currentLayanan.name}?`,
      answer: 'Sebagian besar paket sudah mencakup tiket masuk, transportasi, dan retribusi resmi. Detail persis tetap mengikuti rincian fasilitas tiap paket.',
    },
    {
      id: `${currentLayanan.slug}-payment`,
      question: 'Bagaimana cara dan sistem pembayaran yang berlaku?',
      answer: 'Admin akan mengonfirmasi ketersediaan terlebih dahulu. Setelah cocok, DP minimal 30% digunakan untuk mengunci jadwal dan kuota.',
    },
    {
      id: `${currentLayanan.slug}-custom`,
      question: 'Bisakah itinerary disesuaikan?',
      answer: 'Bisa, terutama untuk Private Trip, Corporate Outing, dan Family Trip. Untuk Open Trip, penyesuaian mengikuti jadwal keberangkatan yang tersedia.',
    },
  ];

  return (
    <div id="layanan-detail-container" className="w-full bg-surface-page text-slate-900">
      <PageHero
        density="compact"
        eyebrow={currentLayanan.name}
        title={focus.headline}
        subtitle={currentLayanan.description}
        centered={false}
        ratio="5-7"
        align="start"
        media={
          <ResponsiveImage
            src={heroImage}
            alt={getMediaAlt(heroImage, `Visual layanan ${currentLayanan.name}`)}
            aspect="aspect-[4/3] lg:aspect-[3/2]"
            wrapperClassName="shadow-card"
            loading="eager"
          />
        }
      >
        <Breadcrumbs
          inverted
          onNavigate={onNavigate}
          className="mt-8"
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Layanan', href: '/layanan' },
            { label: currentLayanan.name },
          ]}
        />
      </PageHero>

      <Section surface="card" density="spacious" container="site">
        <SplitSection ratio="5-7" mediaPosition="right" align="start">
          <SectionHeader
            eyebrow="Nilai layanan"
            title={focus.proof}
            description="Kami menjaga ekspektasi sejak awal: siapa pesertanya, bagaimana ritmenya, apa yang termasuk, dan bagaimana komunikasi berlangsung sampai trip selesai."
            actions={
              <Button
                variant="whatsapp"
                onClick={() => onTanyaAdmin(`Halo Admin, saya butuh saran itinerary untuk layanan ${currentLayanan.name}.`)}
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Konsultasi layanan
              </Button>
            }
          />
          <div className="grid gap-4">
            {focus.process.map((step, index) => (
              <div key={step} className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary font-bold text-amber-300">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">{step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Admin akan menjaga alur supaya keputusan perjalanan tetap jelas untuk semua peserta.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SplitSection>
      </Section>

      <Section surface="page" density="default" container="site">
        <SectionHeader
          align="left"
          eyebrow="Pilihan Trip"
          title={`Paket ${currentLayanan.name}`}
          description="Pilih paket yang paling mendekati kebutuhan Anda, lalu lanjutkan ke detail untuk melihat itinerary, fasilitas, dan harga tier."
          width="wide"
          contentGap
        />

        {associatedTrips.length === 0 ? (
          <Card className="mx-auto max-w-lg space-y-6 p-16 text-center" hoverable={false}>
            <Compass className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
            <p className="text-sm text-slate-500">Belum ada paket perjalanan yang tersedia untuk kategori ini.</p>
            <Button href="/produk" onClick={() => onNavigate('/produk')}>Jelajahi Semua Paket</Button>
          </Card>
        ) : (
          <div className="grid-cards sm:grid-cols-2 lg:grid-cols-3">
            {associatedTrips.map((packageItem) => (
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
      </Section>

      {associatedDests.length > 0 && (
        <Section surface="subtle" density="default" container="site">
          <SectionHeader
            align="left"
            eyebrow="Cakupan Destinasi"
            title="Destinasi yang relevan untuk layanan ini."
            description="Pilih wilayah yang ingin Anda kunjungi dengan layanan ini."
            width="wide"
            contentGap
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {associatedDests.map((destination) => (
              <a
                id={`layanan-dest-badge-${destination.id}`}
                key={destination.id}
                href={`/produk?dest=${destination.slug}`}
                onClick={(e) => {
                  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onNavigate(`/produk?dest=${destination.slug}`);
                }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-display text-lg font-bold leading-tight text-white transition-colors group-hover:text-amber-500">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-[10px] tracking-wider text-slate-300">{destination.region}</p>
                </div>
              </a>
            ))}
          </div>
        </Section>
      )}

      <Section surface="page" density="default" container="content">
        <SectionHeader
          align="left"
          eyebrow="FAQ"
          title="Pertanyaan umum sebelum booking."
          description="Jawaban singkat ini membantu Anda menentukan apakah layanan ini cocok sebelum berdiskusi lewat WhatsApp."
          width="default"
          contentGap
        />
        <Accordion items={faqs} />
      </Section>

      <FinalCTA
        onWhatsApp={() => onTanyaAdmin(`Halo Admin, saya butuh rekomendasi untuk layanan ${currentLayanan.name}.`)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
