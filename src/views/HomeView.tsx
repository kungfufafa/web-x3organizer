/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Search, Star, ArrowRight, ArrowLeft, Shield, Award, Smile, MessageSquare, Quote, MapPin } from 'lucide-react';
import { initialLayanan, initialDestinasi, initialPaketTrip, initialBlogArtikel } from '../data';
import { TripCard, DestinationCard, ServiceCard, ServiceIcon } from '../components/CardsAndUI';
import { Button, Section, Card, Eyebrow } from '../components/ui';
import { PaketTrip } from '../types';

interface HomeViewProps {
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export default function HomeView({ onNavigate, onTanyaAdmin }: HomeViewProps) {
 // Filter States for Quick Search
  const [selectedDest, setSelectedDest] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const heroDestinations = initialDestinasi.slice(0, 4);

  const nextSlide = useCallback(() => setActiveSlide(prev => (prev + 1) % heroDestinations.length), [heroDestinations.length]);
  const prevSlide = useCallback(() => setActiveSlide(prev => (prev - 1 + heroDestinations.length) % heroDestinations.length), [heroDestinations.length]);

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
  };

 const featuredPackages = initialPaketTrip.filter(p => p.is_featured && p.status === 'published');
 const popularDestinations = initialDestinasi.filter(d => d.status === 'active').slice(0, 4);
 const recentArticles = initialBlogArtikel.slice(0, 3);

 // Search Submission
 const handleSearchSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // Build query params concept or navigate to /produk with active filters
 let url = '/produk';
 const params: string[] = [];
 if (selectedDest) params.push(`dest=${selectedDest}`);
 if (selectedType) params.push(`type=${selectedType}`);
 if (selectedDuration) params.push(`dur=${selectedDuration}`);
 if (params.length > 0) {
 url += '?' + params.join('&');
 }
 onNavigate(url);
 };

 const reviews = [
 {
 id: 1,
 name: "Andi Saputra",
 role: "Corporate HR Specialist",
 avatar: "/images/avatars/andi-saputra.svg",
 review: "Kualitas pelayanan tim sangat memuaskan. Mulai dari penjemputan hingga seluruh rundown acara berjalan sangat presisi dan on-time. Tim lapangan juga sangat asyik dan kooperatif dengan rombongan kami.",
 rating: 5
 },
 {
 id: 2,
 name: "Riana Lestari",
 role: "Ketua Komunitas",
 avatar: "/images/avatars/riana-lestari.svg",
 review: "Awalnya kami mencari organizer yang bisa mengakomodasi puluhan orang dengan ragam usia. Ternyata solusinya sangat praktis, fasilitas memadai, dan harga sangat transparan tanpa biaya tersembunyi.",
 rating: 5
 },
 {
 id: 3,
 name: "Keluarga Gunawan",
 role: "Liburan Keluarga",
 avatar: "/images/avatars/keluarga-gunawan.svg",
 review: "Bawa anak kecil dan lansia ternyata tetap nyaman karena pace turnya santai sesuai request kami. Penginapan bersih, makanan cocok untuk semua umur, layanannya benar-benar bintang lima.",
 rating: 5
 }
 ];

 return (
 <div id="home-view-container" className="w-full @theme font-sans bg-surface-page text-slate-900 md:pb-0">
  {/* 1. HERO SECTION WITH CAROUSEL AESTHETIC */}
  <section
    className="relative w-full h-[420px] md:h-[520px] bg-slate-950 flex items-center justify-center group border-b border-slate-100"
    role="region"
    aria-roledescription="carousel"
    aria-label="Destinasi unggulan"
    tabIndex={0}
    onKeyDown={handleCarouselKeyDown}
  >
    
    {/* Slides Container */}
    <div className="relative w-full h-full flex items-center justify-center">
      {heroDestinations.map((dest, index) => {
        const offset = index - activeSlide;
        const isCenter = offset === 0;
        const isLeft = offset === -1 || (activeSlide === 0 && index === heroDestinations.length - 1);
        const isRight = offset === 1 || (activeSlide === heroDestinations.length - 1 && index === 0);
        
        let transformClass = "opacity-0 pointer-events-none";
        let zIndex = "z-0";
        let overlayClass = "bg-slate-950/70";
        let imgEffectClass = "opacity-100";
        
        if (isCenter) {
          transformClass = "opacity-100";
          zIndex = "z-20";
          overlayClass = "bg-gradient-to-t from-slate-950/88 via-slate-950/28 to-transparent";
          imgEffectClass = "opacity-100";
        } else if (isLeft) {
          transformClass = "opacity-0 pointer-events-none";
          zIndex = "z-10";
        } else if (isRight) {
          transformClass = "opacity-0 pointer-events-none";
          zIndex = "z-10";
        }

        return (
          <div 
            key={dest.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${transformClass} ${zIndex} flex items-center justify-center`}
          >
            <div className={`relative w-full h-full rounded-none transition-all duration-700 ${imgEffectClass}`}>
               <img 
                 src={dest.imageUrl} 
                 alt={`Pemandangan wisata ${dest.name}, ${dest.region}`}
                 className="absolute inset-0 w-full h-full object-cover"
                 aria-hidden={!isCenter}
               />
               <div className={`absolute inset-0 ${overlayClass} transition-colors duration-700`}></div>
               
               {isCenter && (
                 <div className="absolute bottom-0 left-0 right-0 p-6 pb-20 md:p-10 md:pb-24 lg:p-14 lg:pb-28 flex flex-col justify-end gap-6 max-w-7xl mx-auto w-full h-full">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
                     <div className="space-y-4 max-w-2xl">
                       <div className="inline-flex items-center gap-2 bg-slate-950/72 border border-white/15 text-white text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1.5">
                         <MapPin className="w-3.5 h-3.5 text-amber-500" />
                         {dest.region}
                       </div>
                       <h2 className="text-4xl md:text-6xl font-bold font-display text-white tracking-tight leading-none">
                         {dest.name}
                       </h2>
                       
                       <p className="text-slate-100 text-sm md:text-base font-sans font-medium max-w-md leading-relaxed">
                         Eksplorasi destinasi unggulan di {dest.region} dengan layanan privat dan jadwal yang fleksibel.
                       </p>
                     </div>
                     
                     <div className="w-full md:w-auto shrink-0 pb-2 mt-4 md:mt-0">
                       <Button
                         variant="outline"
                         size="lg"
                         onClick={() => onNavigate(`/produk?dest=${dest.slug}`)}
                         className="uppercase tracking-widest w-full md:w-auto border-white/70"
                       >
                         Lihat Paket
                         <ArrowRight className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 </div>
               )}

            </div>
          </div>
        );
      })}
    </div>

    {/* Controls */}
    <button 
      onClick={prevSlide}
      aria-label="Slide sebelumnya"
      className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 text-white/65 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-7 h-7 md:w-10 md:h-10 drop-shadow-md" />
    </button>
    <button 
      onClick={nextSlide}
      aria-label="Slide berikutnya"
      className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 touch-target p-2 md:p-3 text-white/65 hover:text-white transition-colors"
    >
      <ArrowRight className="w-7 h-7 md:w-10 md:h-10 drop-shadow-md" />
    </button>

    <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2" role="tablist" aria-label="Indikator slide">
      {heroDestinations.map((dest, index) => (
        <button
          key={dest.id}
          type="button"
          role="tab"
          aria-selected={index === activeSlide}
          aria-label={`Slide ${index + 1}: ${dest.name}`}
          onClick={() => setActiveSlide(index)}
          className={`touch-target h-2 rounded-full transition-all ${index === activeSlide ? 'w-7 bg-white' : 'w-2 bg-white/42 hover:bg-white/60'}`}
        />
      ))}
    </div>
  </section>

 {/* 2. QUICK SEARCH & TENTANG KAMI */}
 <section className="w-full bg-white flex flex-col relative z-20">
  <div className="max-w-7xl mx-auto w-full px-4 md:px-8 -mt-8">
   <form 
   onSubmit={handleSearchSubmit}
   className="bg-white/96 border border-slate-100 p-4 md:p-6 rounded-lg shadow-[0_20px_55px_-20px_rgba(7,30,73,0.15)] md:flex items-center gap-6 space-y-4 md:space-y-0"
   >
   <div className="flex-1 space-y-1 md:space-y-2">
   <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Destinasi</label>
   <select 
   value={selectedDest} 
   onChange={(e) => setSelectedDest(e.target.value)}
   className="w-full text-slate-900 text-sm md:text-base font-bold focus:ring-0 cursor-pointer bg-transparent p-0 outline-none"
   >
   <option value="">Semua Destinasi</option>
   {initialDestinasi.map(d => (
   <option key={d.id} value={d.slug}>{d.name} ({d.region})</option>
   ))}
   </select>
   </div>
   
   <div className="hidden md:block w-px h-12 bg-slate-200"></div>

   <div className="flex-1 space-y-1 md:space-y-2">
   <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Tipe Trip</label>
   <select 
   value={selectedType}
   onChange={(e) => setSelectedType(e.target.value)}
   className="w-full text-slate-900 text-sm md:text-base font-bold focus:ring-0 cursor-pointer bg-transparent p-0 outline-none"
   >
   <option value="">Semua Tipe</option>
   <option value="Open Trip">Open Trip</option>
   <option value="Private Trip">Private Trip</option>
   <option value="Corporate Outing">Corporate Outing</option>
   <option value="Family Trip">Family Trip</option>
   </select>
   </div>

   <div className="hidden md:block w-px h-12 bg-slate-200"></div>

   <div className="flex-1 space-y-1 md:space-y-2">
   <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Durasi</label>
   <select 
   value={selectedDuration}
   onChange={(e) => setSelectedDuration(e.target.value)}
   className="w-full text-slate-900 text-sm md:text-base font-bold focus:ring-0 cursor-pointer bg-transparent p-0 outline-none"
   >
   <option value="">Semua Durasi</option>
   <option value="1 Hari">1 Hari</option>
   <option value="2 Hari 1 Malam">2 Hari 1 Malam</option>
   <option value="3 Hari 2 Malam">3 Hari 2 Malam</option>
   </select>
   </div>

   <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto p-4 touch-target min-h-[48px]">
   <Search className="w-5 h-5" />
   <span className="md:hidden text-[11px]">Cari Paket</span>
   <span className="hidden md:inline">Cari Paket</span>
   </Button>
   </form>
  </div>

  <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 lg:py-28 w-full">
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
   <div className="lg:col-span-7 space-y-5">
   <Eyebrow>Tentang Kami</Eyebrow>
   <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-display leading-tight max-w-3xl">
   X3 Organizer: Partner Perjalanan yang Berkomitmen pada Pengalaman Rombongan yang Rapi dan Nyaman
   </h2>
   <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
   Kami mengelola open trip, private trip, family trip, dan corporate outing dengan itinerary jelas, admin responsif, serta tim lapangan yang memahami kondisi destinasi secara langsung.
   </p>
   <div className="flex flex-wrap gap-3 pt-2">
   <span className="rounded-full bg-slate-50 border border-slate-100 px-4 py-2 text-[10px] font-bold tracking-wide text-slate-700">Admin 24/7</span>
   <span className="rounded-full bg-slate-50 border border-slate-100 px-4 py-2 text-[10px] font-bold tracking-wide text-slate-700">Itinerary Transparan</span>
   <span className="rounded-full bg-slate-50 border border-slate-100 px-4 py-2 text-[10px] font-bold tracking-wide text-slate-700">Tim Lokal</span>
   </div>
   </div>
   <div className="lg:col-span-5 relative">
     <div className="grid grid-cols-2 gap-4">
       <div className="space-y-4 mt-8">
         <img src="/images/destinations/bromo-sunrise.jpg" alt="Bromo" className="w-full h-40 object-cover rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
         <img src="/images/destinations/bali-culture.jpg" alt="Bali" className="w-full h-48 object-cover rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
       </div>
       <div className="space-y-4">
         <img src="/images/destinations/nusa-penida-coast.jpg" alt="Nusa Penida" className="w-full h-48 object-cover rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
         <div className="w-full h-40 bg-slate-50 rounded-2xl shadow-inner flex items-center justify-center p-6">
           <img src="/logo.png" alt="X3 Organizer" className="w-full h-full object-contain opacity-80" />
         </div>
       </div>
     </div>
   </div>
   </div>
  </div>
 </section>

  {/* 3. LAYANAN CATEGORY GRID */}
  <Section bordered bg="muted">
  <div className="text-center space-y-4 mb-12 md:mb-14">
  <Eyebrow className="normal-case tracking-wider">Jenis Layanan</Eyebrow>
  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-display">
  Pilihan Perjalanan Sesuai Kebutuhan
  </h2>
  <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
  Apakah Anda solo traveler hemat budget, rombongan bulan madu romantis, reuni akbar, ataupun gathering dinas? Kami punya formatnya.
  </p>
  </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
 {initialLayanan.map(lay => {
 const count = initialPaketTrip.filter(p => p.layanan_ids.includes(lay.id)).length;
 return (
 <ServiceCard 
 key={lay.id} 
 layanan={lay} 
 tripCount={count} 
 onSelect={() => onNavigate(`/layanan/${lay.slug}`)} 
 
 />
 );
 })}
 </div>
 </Section>

  {/* 4. PAKET TRIP UNGGULAN (is_featured = true) */}
  <Section bordered className="bg-white">
  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-14">
  <div className="space-y-4">
  <Eyebrow className="normal-case tracking-wider">Rekomendasi</Eyebrow>
  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-display">
  Paket Trip Unggulan
  </h2>
  </div>
 
 <button 
 onClick={() => onNavigate('/produk')}
 className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition tracking-wide"
 >
 Lihat Semua Trip
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
 {featuredPackages.map((pkg, index) => (
 <TripCard 
 key={pkg.id} 
 packageItem={pkg} 
 destinationsList={initialDestinasi} 
 animateIndex={index}
 onSelect={(slug) => onNavigate(`/produk/${slug}`)}
 onTanyaAdmin={(item, e) => {
 e.stopPropagation();
 onTanyaAdmin(item);
 }}
 />
 ))}
 </div>
 </Section>

  {/* 5. DESTINASI POPULER */}
  <Section bordered bg="muted">
  <div className="text-center space-y-4 mb-12 md:mb-14">
  <Eyebrow className="normal-case tracking-wider">Destinasi</Eyebrow>
  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-display">
  Jelajah Destinasi Favorit
  </h2>
  <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
  Dari sunrise emas lautan pasir Jawa Timur hingga pura pesisir tropis eksotis Bali.
  </p>
  </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
 {popularDestinations.map(dest => {
 const count = initialPaketTrip.filter(p => p.destinasi_ids.includes(dest.id)).length;
 return (
 <DestinationCard 
 key={dest.id} 
 destination={dest} 
 tripCount={count} 
 onSelect={() => onNavigate(`/produk?dest=${dest.slug}`)} 
 />
 );
 })}
 </div>
 </Section>

  {/* 6. KENAPA PILIH KAMI */}
  <Section bordered className="bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
  <div className="lg:col-span-5 space-y-6">
  <Eyebrow className="normal-case tracking-wider">Nilai Tambah</Eyebrow>
  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-display leading-[1.12]">
  Komitmen Kami Melayani Tanpa Batas
  </h2>
  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
  Kami percaya, liburan adalah momen melepas penat terbaik. Oleh sebab itu, kami menghadirkan pengelolaan trip yang andal, akuntabel, dan transparan dari awal hingga kepulangan Anda.
  </p>
 <div className="pt-4">
 <Button variant="accent" onClick={() => onNavigate('/produk')}>
 Eksplor Katalog Paket
 </Button>
 </div>
 </div>

 <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
 <div className="space-y-3">
 <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
 <Shield className="w-6 h-6" />
 </div>
 <h3 className="text-slate-900 font-display font-bold text-base">Berbadan Hukum & Tepercaya</h3>
 <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
 Izin usaha lengkap dan terverifikasi amanah, menjamin transaksi pembayaran Anda tanpa cemas calo palsu.
 </p>
 </div>

 <div className="space-y-3">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
        <Award className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-display font-bold text-base">Armada Terstandar & Bersih</h3>
    </div>
 <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
 Kami mengoperasikan Jeep 4x4 dan MVP pribadi ber-AC yang selalu dicek kelayakan mesinnya berkala.
 </p>
 </div>

 <div className="space-y-3">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
        <Smile className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-display font-bold text-base">Pemandu Lokal Berpengalaman</h3>
    </div>
 <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
 Supir merangkap pemandu ramah yang pandai memotret aesthetic dengan angle terbaik di HP Anda.
 </p>
 </div>

 <div className="space-y-3">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
        <MessageSquare className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-display font-bold text-base">Layanan Admin Sigap 24/7</h3>
    </div>
 <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
 Butuh bantuan darurat di tengah perjalanan? Tim operasional hotline kami siaga mendampingi Anda penuh.
 </p>
 </div>
 </div>
 </div>
 </Section>

  {/* 7. TESTIMONIALS */}
  <section className="bg-slate-950 text-white border-t border-slate-900 px-4 md:px-8 py-20 lg:py-28 relative bgn-pattern-white bgn-pattern-right-top">
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col items-center text-center gap-4 mb-16 md:mb-20 max-w-3xl mx-auto">
      <span className="bg-white/10 border border-white/15 text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
        Ulasan Pelanggan
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-[1.1]">
        Cerita Perjalanan Mereka
      </h2>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-2 max-w-prose mx-auto">
        Kami tidak sekadar menjual paket trip, kami membantu merangkai ingatan manis yang layak diceritakan ulang seumur hidup.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {reviews.map((rev) => (
        <div key={rev.id} className="bg-white text-slate-900 rounded-lg border border-white/10 p-7 md:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-400 group">
          <div className="space-y-6 relative">
            <Quote className="absolute -top-2 -left-3 w-14 h-14 text-slate-100 rotate-180 -z-10 group-hover:text-amber-500/20 transition-colors duration-300" />
            
            <div className="flex gap-1 text-amber-500 relative z-10">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed relative z-10 font-sans font-medium italic">
              "{rev.review}"
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-100">
            <div className="relative shrink-0">
              <img 
                src={rev.avatar} 
                alt={rev.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-amber-500 transition-colors duration-300 relative z-10" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full bg-amber-500/20 scale-110 -z-0 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="min-w-0">
              <h3 className="text-slate-900 font-bold font-display tracking-tight text-sm truncate">{rev.name}</h3>
              <p className="text-slate-500 text-xs font-semibold mt-0.5 truncate">{rev.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </section>

 {/* 8. LATEST SEO BLOG POSTS */}
 <Section className="bg-white">
 <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 lg:mb-16">
 <div className="space-y-4 max-w-3xl">
 <Eyebrow>Blog & Artikel</Eyebrow>
 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-display ">
 Tips & Rekomendasi Menarik Wisata
 </h2>
 </div>
 
 <button 
 onClick={() => onNavigate('/blog')}
 className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition tracking-wide pb-2"
 >
 Lihat Semua Artikel
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
 {recentArticles.map((art, index) => (
 <Card
 id={`home-blog-card-${art.id}`}
 key={art.id}
 onClick={() => onNavigate(`/blog/${art.slug}`)}
 animateIndex={index}
 className="group hover:-translate-y-1 hover:shadow-md overflow-hidden"
 >
 <div className="relative aspect-[16/10] w-full">
 <img 
 src={art.imageUrl} 
 alt={art.title} 
 className="absolute inset-0 w-full h-full object-cover rounded-t-lg transition-transform duration-700 ease-out" 
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
 <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide">
 {art.category}
 </span>
 </div>
 
 <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
 <div>
 <h3 className="font-display font-bold text-slate-900 text-xl leading-snug group-hover:text-primary-blue transition-colors duration-300 mb-4">
 {art.title}
 </h3>
 
 <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-sans">
 {art.excerpt}
 </p>
 </div>
 
 <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-6 mt-2">
 <span className="font-medium">{art.published_at}</span>
 <span className="text-slate-900 font-semibold flex items-center gap-1.5 group-hover:text-primary-blue transition-colors">
 Baca 
 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
 </span>
 </div>
 </div>
 </Card>
 ))}
 </div>
 </Section>
 </div>
 );
}
