/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { initialLayanan, initialDestinasi, initialPaketTrip } from '../data';
import { ServiceIcon, TripCard } from '../components/CardsAndUI';
import { Compass, MapPin, MessageSquare } from 'lucide-react';
import { PaketTrip } from '../types';
import { PageHero, Section, Button, Card } from '../components/ui';

interface LayananListingProps {
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export const LayananListingView: React.FC<LayananListingProps> = ({ onNavigate, onTanyaAdmin }) => {
 const activeLayanan = initialLayanan.filter(l => l.is_active);

 return (
 <div id="layanan-listing-container" className="w-full @theme font-sans bg-white text-slate-900 md:pb-32">
 <PageHero
 eyebrow="Spesialisasi Kami"
 title="Solusi Perjalanan Anda"
 subtitle="Berbagai format perjalanan yang dirancang khusus untuk memenuhi gaya, kebutuhan, dan jumlah rombongan liburan Anda."
 />

 <Section>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
 {activeLayanan.map((lay, index) => {
 const associatedTrips = initialPaketTrip.filter(p => p.layanan_ids.includes(lay.id) && p.status === 'published');
 const relatedDestIds = Array.from(new Set(associatedTrips.flatMap(t => t.destinasi_ids)));
 const associatedDests = initialDestinasi.filter(d => relatedDestIds.includes(d.id)).slice(0, 3);

 return (
 <Card
 id={`layanan-listing-card-${lay.id}`}
 key={lay.id}
 animateIndex={index}
 className="p-5 md:p-6 hover:-translate-y-1 relative overflow-hidden"
 >
 <ServiceIcon name={lay.iconName} className="absolute bottom-4 right-4 w-28 h-28 text-slate-50 rotate-12 group-hover:-rotate-12 transition-transform duration-700 ease-out z-0 pointer-events-none" />

 <div className="relative z-10 space-y-6">
 <div className="flex items-center justify-between">
 <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-primary-blue group-hover:border-primary-blue group-hover:text-amber-500 transition-colors duration-300">
 <ServiceIcon name={lay.iconName} className="w-7 h-7" />
 </div>
 <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200">
 {associatedTrips.length} Paket
 </span>
 </div>

 <div className="space-y-4">
 <h2 className="font-display font-bold text-slate-900 text-2xl tracking-tight">
 {lay.name}
 </h2>
 <p className="text-slate-500 text-sm leading-relaxed min-h-[4rem]">
 {lay.description}
 </p>
 </div>

 {associatedDests.length > 0 && (
 <div className="pt-4 border-t border-slate-100/60">
 <p className="text-[10px] font-semibold text-slate-500 mb-3 tracking-wide uppercase">
 Destinasi Populer
 </p>
 <div className="flex flex-wrap gap-2">
 {associatedDests.map(dest => (
 <span key={dest.id} className="text-slate-700 text-[10px] font-bold py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200/50 flex items-center">
 <MapPin className="w-3 h-3 text-amber-600 mr-1.5" />
 {dest.name}
 </span>
 ))}
 </div>
 </div>
 )}
 </div>

 <div className="relative z-10 grid grid-cols-2 gap-3 pt-8 mt-auto">
 <Button
 variant="primary"
 size="sm"
 fullWidth
 onClick={() => onNavigate(`/layanan/${lay.slug}`)}
 >
 Lihat Paket
 </Button>
 <Button
 variant="outline"
 size="sm"
 fullWidth
 onClick={() => onTanyaAdmin(`Halo Admin, saya tertarik tanya-tanya mengenai layanan kategori ${lay.name}.`)}
 >
 Tanya Admin
 </Button>
 </div>
 </Card>
 );
 })}
 </div>
 </Section>
 </div>
 );
};

interface LayananDetailProps {
 slug: string;
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export const LayananDetailView: React.FC<LayananDetailProps> = ({ slug, onNavigate, onTanyaAdmin }) => {
 const currentLayanan = initialLayanan.find(l => l.slug === slug);

 if (!currentLayanan) {
 return (
 <div className="p-20 text-center max-w-lg mx-auto space-y-6">
 <h2 className="text-2xl font-bold text-rose-500 font-display tracking-tight">Kategori tidak ditemukan</h2>
 <p className="text-slate-500 text-sm">Layanan yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>
 <Button onClick={() => onNavigate('/layanan')}>Kembali ke Layanan</Button>
 </div>
 );
 }

 const associatedTrips = initialPaketTrip.filter(p => p.layanan_ids.includes(currentLayanan.id) && p.status === 'published');
 const relatedDestIds = Array.from(new Set(associatedTrips.flatMap(t => t.destinasi_ids)));
 const associatedDests = initialDestinasi.filter(d => relatedDestIds.includes(d.id));

 const faqs = [
 {
 q: `Apakah tiket masuk objek wisata termasuk dalam paket ${currentLayanan.name}?`,
 a: "Ya, sebagian besar paket kami sudah All-In. Harga mencakup tiket masuk, transportasi, dan retribusi resmi. Detail persis bisa dilihat pada rincian fasilitas tiap paket."
 },
 {
 q: "Bagaimana cara dan sistem pembayaran yang berlaku?",
 a: "Anda cukup membayarkan Down Payment (DP) 30% setelah konfirmasi ketersediaan. Pelunasan dapat dilakukan pada hari H saat trip berlangsung."
 },
 {
 q: "Bisakah kami menyesuaikan itinerary perjalanan?",
 a: "Sangat bisa, terutama untuk layanan Private Trip dan Corporate Outing, tim konsultan kami akan membantu menyusun rute sesuai preferensi dan waktu Anda."
 }
 ];

 return (
 <div id="layanan-detail-container" className="w-full @theme font-sans bg-white text-slate-900 md:pb-32">
 <section className="bg-slate-950 text-white py-24 lg:py-32 px-4 md:px-8 border-b border-slate-900 relative">
 <div className="absolute inset-0 bg-radial from-slate-800/20 via-transparent to-transparent pointer-events-none" />
 <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
 <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center mx-auto">
 <ServiceIcon name={currentLayanan.iconName} className="w-8 h-8" />
 </div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-none">
 {currentLayanan.name}
 </h1>
 <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
 {currentLayanan.description}
 </p>
 <button
 onClick={() => onNavigate('/layanan')}
 className="text-amber-600 hover:text-amber-500 text-[10px] font-semibold transition-colors"
 >
 ← Kembali
 </button>
 </div>
 </section>

 <Section>
 <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
 <div className="space-y-4 max-w-2xl">
 <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">Pilihan Trip</p>
 <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight font-display leading-tight">
 Paket {currentLayanan.name}
 </h2>
 </div>
 </div>

 {associatedTrips.length === 0 ? (
 <Card className="p-16 text-center max-w-lg mx-auto space-y-6" hoverable={false}>
 <Compass className="w-12 h-12 text-slate-300 mx-auto" />
 <p className="text-slate-500 text-sm">Belum ada paket perjalanan yang tersedia untuk kategori ini.</p>
 <Button onClick={() => onNavigate('/produk')}>Jelajahi Semua Paket</Button>
 </Card>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {associatedTrips.map(pkg => (
 <TripCard
 key={pkg.id}
 packageItem={pkg}
 destinationsList={initialDestinasi}
 onSelect={(s) => onNavigate(`/produk/${s}`)}
 onTanyaAdmin={(item) => onTanyaAdmin(item)}
 />
 ))}
 </div>
 )}
 </Section>

 {associatedDests.length > 0 && (
 <Section className="pt-0 pb-32">
 <Card className="p-5 md:p-6 bg-slate-50" hoverable={false}>
 <div className="mb-8">
 <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display mb-3">
 Cakupan Destinasi
 </h3>
 <p className="text-sm text-slate-500">
 Pilih wilayah yang ingin Anda kunjungi dengan layanan ini.
 </p>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
 {associatedDests.map(dest => (
 <div
 id={`layanan-dest-badge-${dest.id}`}
 onClick={() => onNavigate(`/produk?dest=${dest.slug}`)}
 key={dest.id}
 className="group relative rounded-xl aspect-[4/3] cursor-pointer overflow-hidden"
 >
 <img src={dest.imageUrl} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
 <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
 <div className="absolute inset-0 p-5 flex flex-col justify-end">
 <h4 className="font-display font-bold text-white text-lg leading-tight group-hover:text-amber-500 transition-colors">{dest.name}</h4>
 <p className="text-[10px] text-slate-300 mt-1 tracking-wider">{dest.region}</p>
 </div>
 </div>
 ))}
 </div>
 </Card>
 </Section>
 )}

 <Section className="pt-0">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start">
 <div className="space-y-8">
 <div className="space-y-2">
 <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">Pertanyaan Umum</h2>
 <p className="text-sm text-slate-500">Klarifikasi singkat sebelum merencanakan liburan.</p>
 </div>

 <div className="space-y-4">
 {faqs.map((faq, index) => (
 <Card key={index} className="p-6 bg-slate-50" hoverable={true}>
 <h4 className="font-bold text-slate-900 text-sm mb-3 pr-4 leading-snug">
 {faq.q}
 </h4>
 <p className="text-slate-600 text-sm leading-relaxed">
 {faq.a}
 </p>
 </Card>
 ))}
 </div>
 </div>

 <Card className="bg-slate-900 text-white p-5 md:p-6 relative h-full flex flex-col justify-center overflow-hidden" hoverable={false}>
 <div className="absolute inset-0 bg-radial from-amber-500/20 to-transparent pointer-events-none"></div>

 <div className="relative z-10 space-y-6">
 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 mb-2">
 <MessageSquare className="w-6 h-6" />
 </div>
 <h3 className="text-2xl font-bold tracking-tight font-display leading-tight">
 Konsultasikan Perjalanan Anda
 </h3>
 <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
 Bingung memilih itinerary? Hubungi konsultan tur kami untuk mendapatkan saran destinasi dan penawaran terbaik sesuai budget Anda.
 </p>

 <div className="pt-4">
 <Button
 variant="accent"
 onClick={() => onTanyaAdmin(`Halo Admin, saya butuh saran itinerary untuk layanan ${currentLayanan.name}.`)}
 >
 Hubungi Via WhatsApp
 </Button>
 </div>
 </div>
 </Card>
 </div>
 </Section>
 </div>
 );
};
