/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Search, Star, ArrowRight, ArrowLeft, Shield, Award, Smile, MessageSquare, Quote, MapPin } from 'lucide-react';
import { initialLayanan, initialDestinasi, initialPaketTrip, initialBlogArtikel } from '../data';
import { TripCard, DestinationCard, ServiceCard } from '../components/CardsAndUI';
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
 avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
 review: "Kualitas pelayanan tim sangat memuaskan. Mulai dari penjemputan hingga seluruh rundown acara berjalan sangat presisi dan on-time. Tim lapangan juga sangat asyik dan kooperatif dengan rombongan kami.",
 rating: 5
 },
 {
 id: 2,
 name: "Riana Lestari",
 role: "Ketua Komunitas",
 avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
 review: "Awalnya kami mencari organizer yang bisa mengakomodasi puluhan orang dengan ragam usia. Ternyata solusinya sangat praktis, fasilitas memadai, dan harga sangat transparan tanpa biaya tersembunyi.",
 rating: 5
 },
 {
 id: 3,
 name: "Keluarga Gunawan",
 role: "Liburan Keluarga",
 avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
 review: "Bawa anak kecil dan lansia ternyata tetap nyaman karena pace turnya santai sesuai request kami. Penginapan bersih, makanan cocok untuk semua umur, layanannya benar-benar bintang lima.",
 rating: 5
 }
 ];

 return (
 <div id="home-view-container" className="w-full @theme font-sans bg-white text-slate-900 md:pb-0">
  {/* 1. HERO SECTION WITH CAROUSEL AESTHETIC */}
  <section
    className="relative w-full h-[400px] md:h-[540px] bg-slate-950 flex items-center justify-center group border-b border-slate-900/40"
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
        
        let transformClass = "translate-x-full opacity-0";
        let zIndex = "z-0";
        let overlayClass = "bg-black/60"; // Dark overlay for side items
        let imgEffectClass = "grayscale opacity-100";
        
        if (isCenter) {
          transformClass = "translate-x-0 scale-100 opacity-100";
          zIndex = "z-20";
          overlayClass = "bg-gradient-to-t from-black/90 via-black/40 to-transparent";
          imgEffectClass = "grayscale-0 opacity-100";
        } else if (isLeft) {
          transformClass = "max-md:translate-x-full max-md:opacity-0 max-md:pointer-events-none -translate-x-[80%] scale-95 opacity-100";
          zIndex = "z-10";
        } else if (isRight) {
          transformClass = "max-md:-translate-x-full max-md:opacity-0 max-md:pointer-events-none translate-x-[80%] scale-95 opacity-100";
          zIndex = "z-10";
        }

        return (
          <div 
            key={dest.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${transformClass} ${zIndex} flex items-center justify-center ${!isCenter ? 'max-md:hidden' : ''}`}
          >
            <div className={`relative w-full max-w-[1279px] h-full md:h-full rounded-none transition-all duration-700 ${imgEffectClass}`}>
               <img 
                 src={dest.imageUrl} 
                 alt={`Pemandangan wisata ${dest.name}, ${dest.region}`}
                 className="absolute inset-0 w-full h-full object-cover"
                 aria-hidden={!isCenter}
               />
               <div className={`absolute inset-0 ${overlayClass} transition-colors duration-700`}></div>
               
               {isCenter && (
                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 flex flex-col justify-end gap-6 max-w-7xl mx-auto w-full h-full">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
                     <div className="space-y-3 max-w-2xl">
                       <h2 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tighter leading-none">
                         {dest.name}
                       </h2>
                       
                       <p className="text-slate-300 text-sm md:text-base font-sans font-medium max-w-md">
                         Eksplorasi destinasi unggulan di {dest.region} dengan layanan privat dan jadwal yang fleksibel.
                       </p>

                       <div className="flex items-center gap-4 pt-2">
                         <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase">
                           <MapPin className="w-4 h-4 text-amber-500" />
                           {dest.region}
                         </div>
                       </div>
                     </div>
                     
                     <div className="w-full md:w-auto shrink-0 pb-2 mt-4 md:mt-0">
                       <Button
                         variant="outline"
                         size="lg"
                         onClick={() => onNavigate(`/produk?dest=${dest.slug}`)}
                         className="uppercase tracking-widest w-full md:w-auto"
                       >
                         Lihat Paket
                         <ArrowRight className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 </div>
               )}

               {(isLeft || isRight) && (
                 <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 flex-col ${isLeft ? 'right-16 items-end' : 'left-16 items-start'} z-20`}>
                   <span className="text-white/60 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                     {isLeft ? 'Sebelumnya' : 'Selanjutnya'}
                   </span>
                   <span className="text-white/90 font-serif font-bold text-2xl md:text-4xl tracking-tighter drop-shadow-lg max-w-[200px] md:max-w-[300px] truncate">
                     {dest.name}
                   </span>
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
      className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 text-white/50 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" />
    </button>
    <button 
      onClick={nextSlide}
      aria-label="Slide berikutnya"
      className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-30 touch-target p-2 md:p-3 text-white/50 hover:text-white transition-colors"
    >
      <ArrowRight className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" />
    </button>

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2" role="tablist" aria-label="Indikator slide">
      {heroDestinations.map((dest, index) => (
        <button
          key={dest.id}
          type="button"
          role="tab"
          aria-selected={index === activeSlide}
          aria-label={`Slide ${index + 1}: ${dest.name}`}
          onClick={() => setActiveSlide(index)}
          className={`touch-target h-2 rounded-full transition-all ${index === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
        />
      ))}
    </div>
  </section>

 {/* 2. QUICK SEARCH / FILTER SECTION */}
 <section className="relative z-20 max-w-7xl mx-auto pt-8 px-4 md:px-8 mb-6 md:mb-0">
 <form 
 onSubmit={handleSearchSubmit}
 className="bg-white border border-slate-200 p-5 md:p-6 rounded-xl shadow-md md:flex items-center gap-6 space-y-6 md:space-y-0 max-md:mb-4"
 >
 <div className="flex-1 space-y-2">
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

 <div className="flex-1 space-y-2">
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

 <div className="flex-1 space-y-2">
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
 </section>

  {/* 3. LAYANAN CATEGORY GRID */}
  <Section bordered>
  <div className="text-center space-y-4 mb-16">
  <Eyebrow className="text-sm normal-case tracking-wider">Jenis Layanan</Eyebrow>
  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-display">
  Pilihan Perjalanan Sesuai Kebutuhan
  </h2>
  <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mt-6">
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
  <Section bordered>
  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
  <div className="space-y-4">
  <Eyebrow className="text-sm normal-case tracking-wider">Rekomendasi</Eyebrow>
  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-display">
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
  <Section bordered>
  <div className="text-center space-y-4 mb-16">
  <Eyebrow className="text-sm normal-case tracking-wider">Destinasi</Eyebrow>
  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-display">
  Jelajah Destinasi Favorit
  </h2>
  <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mt-6 leading-relaxed">
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
  <Section bordered>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
  <div className="lg:col-span-5 space-y-6">
  <Eyebrow className="text-sm normal-case tracking-wider">Nilai Tambah</Eyebrow>
  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-display leading-[1.1]">
  Komitmen Kami Melayani Tanpa Batas
  </h2>
  <p className="text-slate-500 text-lg leading-relaxed font-sans">
  Kami percaya, liburan adalah momen melepas penat terbaik. Oleh sebab itu, kami menghadirkan pengelolaan trip yang andal, akuntabel, dan transparan dari awal hingga kepulangan Anda.
  </p>
 <div className="pt-4">
 <Button variant="accent" onClick={() => onNavigate('/produk')}>
 Eksplor Katalog Paket
 </Button>
 </div>
 </div>

 <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
 <div className="space-y-2">
 <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
 <Shield className="w-6 h-6" />
 </div>
 <h3 className="text-slate-900 font-serif font-bold text-lg">Berbadan Hukum & Tepercaya</h3>
 <p className="text-slate-500 text-sm leading-relaxed">
 Izin usaha lengkap dan terverifikasi amanah, menjamin transaksi pembayaran Anda tanpa cemas calo palsu.
 </p>
 </div>

 <div className="space-y-2 p-2">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
        <Award className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-serif font-bold text-sm">Armada Terstandar & Bersih</h3>
    </div>
 <p className="text-slate-500 text-xs leading-relaxed">
 Kami mengoperasikan Jeep 4x4 dan MVP pribadi ber-AC yang selalu dicek kelayakan mesinnya berkala.
 </p>
 </div>

 <div className="space-y-2 p-2">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
        <Smile className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-serif font-bold text-sm">Pemandu Lokal Berpengalaman</h3>
    </div>
 <p className="text-slate-500 text-xs leading-relaxed">
 Supir merangkap pemandu ramah yang pandai memotret aesthetic dengan angle terbaik di HP Anda.
 </p>
 </div>

 <div className="space-y-2 p-2">
 <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
        <MessageSquare className="w-5 h-5" />
      </div>
      <h3 className="text-slate-900 font-serif font-bold text-sm">Layanan Admin Sigap 24/7</h3>
    </div>
 <p className="text-slate-500 text-xs leading-relaxed">
 Butuh bantuan darurat di tengah perjalanan? Tim operasional hotline kami siaga mendampingi Anda penuh.
 </p>
 </div>
 </div>
 </div>
 </Section>

  {/* 7. TESTIMONIALS */}
  <section className="bg-slate-50 border-t border-slate-200 px-4 md:px-8 py-24 lg:py-32 relative">
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col items-center text-center gap-4 mb-16 md:mb-20 max-w-3xl mx-auto">
      <span className="bg-white border border-slate-200 text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
        Ulasan Pelanggan
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-display leading-[1.1]">
        Cerita Perjalanan Mereka
      </h2>
      <p className="text-slate-500 text-base md:text-lg leading-relaxed mt-2 max-w-prose mx-auto">
        Kami tidak sekadar menjual paket trip, kami membantu merangkai ingatan manis yang layak diceritakan ulang seumur hidup.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {reviews.map((rev) => (
        <div key={rev.id} className="p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-400 group">
          <div className="space-y-6 relative">
            <Quote className="absolute -top-2 -left-3 w-14 h-14 text-slate-200 rotate-180 -z-10 group-hover:text-amber-500/20 transition-colors duration-300" />
            
            <div className="flex gap-1 text-amber-500 relative z-10">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10 font-sans font-medium italic">
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
 <Section>
 <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 lg:mb-16">
 <div className="space-y-4 max-w-3xl">
 <Eyebrow>Blog & Artikel</Eyebrow>
 <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display ">
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
 className="group hover:-translate-y-1 hover:shadow-xl overflow-hidden"
 >
 <div className="relative aspect-[16/10] w-full">
 <img 
 src={art.imageUrl} 
 alt={art.title} 
 className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-transform duration-700 ease-out" 
 referrerPolicy="no-referrer"
 />
 <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
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
