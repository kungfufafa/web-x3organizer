/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
 initialPaketTrip, 
 initialDestinasi, 
 initialLayanan, 
 initialBlogArtikel 
} from '../data';
import { 
 TripCard, 
 PricingCard, 
 FeaturesBlock, 
 ItineraryTimeline 
} from '../components/CardsAndUI';
import { 
 MapPin, 
 Clock, 
 Star, 
 Phone, 
 Share2, 
 Check, 
 Filter, 
 ChevronRight, 
 Info, 
 ArrowLeft,
 X,
 BookOpen,
 Calendar,
 Layers,
 ThumbsUp
} from 'lucide-react';
import { PaketTrip } from '../types';
import { PageHero, Button, FormField, Select, Input, Card } from '../components/ui';

// ==========================================
// 1. PRODUK LISTING VIEW (/produk)
// ==========================================
interface ProdukListingProps {
 initialDestFilter?: string;
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItem: PaketTrip) => void;
}

export const ProdukListingView: React.FC<ProdukListingProps> = ({ initialDestFilter = "", onNavigate, onTanyaAdmin }) => {
 // Query States
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedDest, setSelectedDest] = useState(initialDestFilter);
 const [selectedLayanan, setSelectedLayanan] = useState('');
 const [selectedDuration, setSelectedDuration] = useState('');
 const [selectedPriceRange, setSelectedPriceRange] = useState('');
 const [sortBy, setSortBy] = useState('newest'); // or 'price-asc', 'pop'

 // Sync initial query param if present
 useEffect(() => {
 // If URL has search query, e.g. from Home Search form
 const currentUrl = window.location.hash || '';
 if (currentUrl.includes('?')) {
 const qParams = new URLSearchParams(currentUrl.split('?')[1]);
 const dest = qParams.get('dest');
 const type = qParams.get('type');
 const dur = qParams.get('dur');
 if (dest) setSelectedDest(dest);
 if (type) {
 // match type to category slug
 const matchedLay = initialLayanan.find(l => l.name.toLowerCase() === type.toLowerCase());
 if (matchedLay) setSelectedLayanan(matchedLay.slug);
 }
 if (dur) setSelectedDuration(dur);
 }
 }, []);

 // Filter Logic
 const filteredPackages = initialPaketTrip.filter(pkg => {
 if (pkg.status !== 'published') return false;

 // Search query match
 const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
 pkg.summary.toLowerCase().includes(searchTerm.toLowerCase());

 // Destination filter match
 let matchesDest = true;
 if (selectedDest) {
 const targetDestObj = initialDestinasi.find(d => d.slug === selectedDest);
 matchesDest = targetDestObj ? pkg.destinasi_ids.includes(targetDestObj.id) : false;
 }

 // Layanan filter match
 let matchesLayanan = true;
 if (selectedLayanan) {
 const targetLayObj = initialLayanan.find(l => l.slug === selectedLayanan);
 matchesLayanan = targetLayObj ? pkg.layanan_ids.includes(targetLayObj.id) : false;
 }

 // Duration match
 let matchesDuration = true;
 if (selectedDuration) {
 matchesDuration = pkg.duration_label.toLowerCase().includes(selectedDuration.toLowerCase());
 }

 // Price tier match
 let matchesPrice = true;
 if (selectedPriceRange) {
 if (selectedPriceRange === 'under-500') {
 matchesPrice = pkg.starting_price < 500000;
 } else if (selectedPriceRange === '500-1500') {
 matchesPrice = pkg.starting_price >= 500000 && pkg.starting_price <= 1500000;
 } else if (selectedPriceRange === 'above-1500') {
 matchesPrice = pkg.starting_price > 1500000;
 }
 }

 return matchesSearch && matchesDest && matchesLayanan && matchesDuration && matchesPrice;
 });

 // Sorting Logic
 const sortedPackages = [...filteredPackages].sort((a, b) => {
 if (sortBy === 'price-asc') {
 return a.starting_price - b.starting_price;
 } else if (sortBy === 'price-desc') {
 return b.starting_price - a.starting_price;
 } else if (sortBy === 'pop') {
 return b.rating - a.rating;
 } else {
 // Default: newest publish date
 return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
 }
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
 <div id="produk-listing-container" className="w-full @theme font-sans bg-slate-50 text-slate-900 md:pb-32">
 <PageHero
 eyebrow="Katalog Perjalanan"
 title="Eksplorasi Tak Terbatas"
 subtitle="Temukan berbagai pilihan open trip harian irit budget, corporate gathering penuh keseruan, hingga petualangan eksklusif yang dirancang untuk Anda."
 className="pb-16"
 >
 <div className="max-w-xl mx-auto pt-4 w-full">
 <div className="relative flex items-center">
 <Filter className="absolute left-4 w-5 h-5 text-slate-500 z-10" />
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

 {/* Main Catalog interface */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
 
 {/* Left Side: Desktop Filter Rails */}
 <div className="lg:col-span-3 space-y-8 bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
 <div className="flex items-center justify-between border-b border-slate-100 pb-4">
 <h2 className="font-display font-bold text-slate-900 text-sm md:text-base tracking-tight flex items-center gap-2">
 <Filter className="w-4 h-4 text-amber-600" />
 Saring Trip
 </h2>
 <button 
 onClick={clearFilters}
 className="text-[10px] text-slate-500 hover:text-amber-600 font-bold transition-colors tracking-wide"
 >
 Reset
 </button>
 </div>

 <div className="space-y-6">
 <FormField label="Destinasi">
 <Select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}>
 <option value="">Semua Destinasi</option>
 {initialDestinasi.map(d => (
 <option key={d.id} value={d.slug}>{d.name}</option>
 ))}
 </Select>
 </FormField>

 <FormField label="Format Trip">
 <Select value={selectedLayanan} onChange={(e) => setSelectedLayanan(e.target.value)}>
 <option value="">Semua Layanan</option>
 {initialLayanan.map(l => (
 <option key={l.id} value={l.slug}>{l.name}</option>
 ))}
 </Select>
 </FormField>

 <FormField label="Durasi Waktu">
 <Select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
 <option value="">Semua Durasi</option>
 <option value="1 Hari">1 Hari</option>
 <option value="2 Hari">2 Hari</option>
 <option value="3 Hari">3 Hari</option>
 </Select>
 </FormField>

 <FormField label="Tarif Harga">
 <Select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
 <option value="">Semua Harga</option>
 <option value="under-500">Di bawah Rp 500k</option>
 <option value="500-1500">Rp 500k - Rp 1.5 Juta</option>
 <option value="above-1500">Di atas Rp 1.5 Juta</option>
 </Select>
 </FormField>
 </div>
 </div>

 {/* Right Side: Package Listing Cards & Sorter toolbar */}
 <div className="lg:col-span-9 space-y-8">
 <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <p className="text-sm text-slate-500 font-sans">
 Menampilkan <strong className="text-slate-900 font-bold">{sortedPackages.length} paket trip</strong>
 </p>

 <div className="flex items-center gap-3">
 <span className="text-[10px] text-slate-500 font-semibold text-xs">Urutkan:</span>
 <select
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value)}
 className="text-sm text-slate-900 border border-slate-200 p-2 lg:p-2.5 rounded-lg font-bold bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all appearance-none cursor-pointer pr-8"
 >
 <option value="newest">Terbaru</option>
 <option value="price-asc">Harga Terendah</option>
 <option value="price-desc">Harga Tertinggi</option>
 <option value="pop">Ulasan Terbaik</option>
 </select>
 </div>
 </div>

 {sortedPackages.length === 0 ? (
 <Card className="p-16 text-center space-y-6 max-w-xl mx-auto mt-12" hoverable={false}>
 <Filter className="w-12 h-12 text-slate-300 mx-auto" />
 <p className="text-slate-500 text-sm leading-relaxed text-center">
 Maaf, tidak menemukan kecocokan paket di kriteria penyaringan Anda. Harap memencet tombol reset untuk mengulang rute penyaringan.
 </p>
 <Button onClick={clearFilters}>Atur Ulang Filter</Button>
 </Card>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
 {sortedPackages.map(pkg => (
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
 </div>
 </div>
 </div>
 );
};

// ==========================================
// 2. PRODUK DETAIL VIEW (/produk/{slug})
// ==========================================
interface ProdukDetailProps {
 slug: string;
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItem: PaketTrip) => void;
}

export const ProdukDetailView: React.FC<ProdukDetailProps> = ({ slug, onNavigate, onTanyaAdmin }) => {
 const [activeTab, setActiveTab] = useState<'desc' | 'facility' | 'itinerary'>('desc');
 const [shareCopied, setShareCopied] = useState(false);

 // Find targeted trip
 const packageItem = initialPaketTrip.find(p => p.slug === slug);

 if (!packageItem) {
 return (
 <div className="p-6 text-center max-w-lg mx-auto space-y-4">
 <h2 className="text-xl font-bold text-rose-500">Paket trip tidak ditemukan!</h2>
 <p className="text-slate-500 text-xs">Harap kembali ke halaman katalog paket perjalanan untuk mengklik navigasi produk yang sah.</p>
 <Button onClick={() => onNavigate('/produk')} size="sm">
 Kembali ke Katalog
 </Button>
 </div>
 );
 }

 // Relations
 const matchedDests = initialDestinasi.filter(d => packageItem.destinasi_ids.includes(d.id));
 const matchedLay = initialLayanan.filter(l => packageItem.layanan_ids.includes(l.id));

 // Auto recommend related packages linking (excluding current package)
 const relatedPackages = initialPaketTrip
 .filter(p => p.id !== packageItem.id && p.destinasi_ids.some(id => packageItem.destinasi_ids.includes(id)))
 .slice(0, 2);

 // Auto linking related articles
 const relatedArticles = initialBlogArtikel
 .filter(a => a.related_package_ids.includes(packageItem.id))
 .slice(0, 2);

 const handleShare = () => {
 const shareUrl = `${window.location.origin}/#/produk/${packageItem.slug}`;
 navigator.clipboard.writeText(shareUrl);
 setShareCopied(true);
 setTimeout(() => setShareCopied(false), 2000);
 };

 const selectHighlights = packageItem.features.filter(f => f.type === 'highlight');

 return (
 <div id="produk-detail-root" className="w-full @theme font-sans bg-white text-slate-900 md:pb-32 relative">
 
 {/* Navigation Bar */}
 <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-4 md:px-8 sticky top-0 z-50">
 <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-sans">
 <button 
 onClick={() => onNavigate('/produk')}
 className="text-slate-500 hover:text-slate-900 font-semibold text-[10px] flex items-center gap-2 transition-colors"
 >
 <ArrowLeft className="w-4 h-4 text-slate-500" />
 Kembali ke Katalog
 </button>
 <div className="flex items-center gap-2">
 <span className="text-slate-500 text-[10px] font-bold tracking-wider hidden sm:inline-block">Package ID:</span>
 <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">#{packageItem.id}</span>
 </div>
 </div>
 </div>

 {/* Hero Banner Section */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32">
 <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start lg:items-center">
 <div className="lg:w-1/2 space-y-6">
 <div className="flex flex-wrap gap-2">
 <span className="bg-amber-500 text-amber-950 text-[10px] font-bold px-3 py-1.5 rounded-md tracking-wider">
 {packageItem.type}
 </span>
 {matchedLay.map(l => (
 <span key={l.id} className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-3 py-1.5 rounded-md font-bold">
 {l.name}
 </span>
 ))}
 </div>

 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.1] text-slate-900">
 {packageItem.name}
 </h1>

 <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-semibold pt-2">
 <span className="flex items-center gap-1.5 text-slate-700">
 <MapPin className="w-4 h-4 text-amber-600" />
 {matchedDests.map(d => d.name).join(', ')}
 </span>
 <span className="hidden sm:inline-block text-slate-300">•</span>
 <span className="flex items-center gap-1.5">
 <Clock className="w-4 h-4 text-amber-600" />
 {packageItem.duration_label}
 </span>
 <span className="hidden sm:inline-block text-slate-300">•</span>
 <span className="flex items-center gap-1.5 text-amber-600">
 ★ {packageItem.rating.toFixed(1)}
 <span className="text-slate-500 font-normal ml-1">({packageItem.review_label})</span>
 </span>
 </div>
 </div>
 
 <div className="lg:w-1/2 w-full">
 <div className="aspect-[4/3] lg:aspect-[16/10] w-full rounded-lg  bg-slate-100">
 <img 
 src={packageItem.imageUrl} 
 alt={packageItem.name} 
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />
 </div>
 </div>
 </div>
 </div>

 {/* Main Content Layout */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
 
 {/* Left Column: Primary details (col-span-8) */}
 <div className="lg:col-span-8 space-y-12">
 
 {/* Highlight section */}
 {selectHighlights.length > 0 && (
 <div className="bg-slate-50 border border-slate-100 p-6 rounded-lg space-y-6">
 <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
 <Info className="w-4 h-4 text-amber-600" />
 </div>
 Keistimewaan Perjalanan
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
 {selectHighlights.map((feat, idx) => (
 <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
 <span className="w-10 h-10 bg-primary-blue text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
 {idx+1}
 </span>
 <div>
 <p className="font-bold text-slate-900 text-sm font-display leading-snug">{feat.label}</p>
 <p className="text-slate-500 text-xs leading-relaxed mt-1.5">{feat.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Description & Tab panel selectors */}
 <div className="bg-white border border-slate-200 rounded-lg shadow-sm ">
 <div className="flex overflow-x-auto scrollbar-none border-b border-slate-100 text-[11px] font-medium font-bold bg-slate-50 ">
 <button
 onClick={() => setActiveTab('desc')}
 className={`py-4 px-6 md:px-8 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
 activeTab === 'desc' ? 'border-amber-500 text-slate-900 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
 }`}
 >
 Informasi Trip
 </button>
 <button
 onClick={() => setActiveTab('facility')}
 className={`py-4 px-6 md:px-8 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
 activeTab === 'facility' ? 'border-amber-500 text-slate-900 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
 }`}
 >
 Fasilitas
 </button>
 <button
 onClick={() => setActiveTab('itinerary')}
 className={`py-4 px-6 md:px-8 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
 activeTab === 'itinerary' ? 'border-amber-500 text-slate-900 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
 }`}
 >
 Itinerary
 </button>
 </div>

 <div className="p-5 md:p-6">
 {activeTab === 'desc' && (
 <div className="space-y-6">
 <h3 className="font-display font-bold text-slate-900 text-2xl tracking-tight">Menjelajah Lebih Jauh</h3>
 <p className="text-slate-600 text-base leading-relaxed font-sans whitespace-pre-line">
 {packageItem.description}
 </p>
 </div>
 )}

 {activeTab === 'facility' && (
 <div className="space-y-8 animate-fade-in">
 <div className="space-y-4">
 <h4 className="text-[11px] font-bold text-slate-500 tracking-wide ">Termasuk (Included)</h4>
 <FeaturesBlock features={packageItem.features} type="included" />
 </div>

 <div className="space-y-4 border-t border-slate-100 pt-8">
 <h4 className="text-[11px] font-bold text-slate-500 tracking-wide ">Tidak Termasuk (Excluded)</h4>
 <FeaturesBlock features={packageItem.features} type="excluded" />
 </div>

 <div className="space-y-4 border-t border-slate-100 pt-8">
 <h4 className="text-[11px] font-bold text-slate-500 tracking-wide ">Catatan Penting</h4>
 <FeaturesBlock features={packageItem.features} type="note" />
 </div>
 </div>
 )}

 {activeTab === 'itinerary' && (
 <div className="space-y-8 animate-fade-in">
 <h3 className="font-display font-bold text-slate-900 text-2xl tracking-tight mb-2">Rencana Perjalanan</h3>
 <ItineraryTimeline itineraries={packageItem.itineraries} />
 </div>
 )}
 </div>
 </div>

 {/* Pricing cards structured specifically for mobile layout */}
 <div className="bg-slate-50 border border-slate-100 p-6 rounded-lg space-y-6">
 <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
 Pilihan Pendaftaran
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {packageItem.prices.map((tier, k) => (
 <PricingCard key={k} tier={tier} />
 ))}
 </div>
 </div>

 {/* Related blog articles SEO internal linking list */}
 {relatedArticles.length > 0 && (
 <div className="bg-white border border-slate-200 p-6 rounded-lg space-y-4">
 <h4 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2 tracking-tight">
 <BookOpen className="w-5 h-5 text-amber-600" />
 Panduan Perjalanan Terkait
 </h4>
 <p className="text-sm text-slate-500 leading-relaxed font-sans mb-4">
 Artikel terkait di bawah ini disiapkan untuk melengkapi informasi serta tips seputar wawasan perjalanan Anda.
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {relatedArticles.map(art => (
 <div 
 key={art.id}
 onClick={() => onNavigate(`/blog/${art.slug}`)}
 className="p-4 bg-slate-50 hover:bg-white rounded-lg border border-slate-200 cursor-pointer flex gap-4 transition-all hover:shadow-md hover:border-slate-300 group"
 >
 <div className="w-16 h-16 rounded-lg bg-slate-100  shrink-0 border border-slate-200">
 <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover transition-transform " referrerPolicy="no-referrer" />
 </div>
 <div>
 <h5 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">{art.title}</h5>
 <span className="text-[9px] text-slate-500 font-semibold mt-2 inline-block">
 {art.category}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Right Column: Sticky desktop card (col-span-4) */}
 <div className="lg:col-span-4 hidden lg:block">
 <Card className="sticky top-24 shadow-lg p-6 space-y-8" hoverable={false}>
 <div className="space-y-1">
 <span className="text-xs font-semibold text-slate-500">Mulai Dari</span>
 <div className="flex items-baseline gap-2">
 <span className="text-2xl font-bold text-slate-900 font-display">
 {packageItem.price_label}
 </span>
 <span className="text-sm text-slate-500 font-bold">/ pax</span>
 </div>
 </div>

 <div className="space-y-4 text-sm text-slate-600 border-y border-slate-100 py-6 font-sans">
 <div className="flex justify-between items-center">
 <span>Durasi Perjalanan</span>
 <strong className="text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-full text-xs">{packageItem.duration_label}</strong>
 </div>
 <div className="flex justify-between items-center">
 <span>Destinasi</span>
 <strong className="text-slate-900 font-bold">{matchedDests.map(d => d.name).join(', ')}</strong>
 </div>
 <div className="flex justify-between items-center">
 <span>Ketersediaan</span>
 <strong className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">TERSEDIA HARIAN</strong>
 </div>
 </div>

 <div className="space-y-3">
 <Button variant="primary" fullWidth onClick={() => onTanyaAdmin(packageItem)}>
 Booking Via WhatsApp
 </Button>

 <Button variant="outline" fullWidth onClick={handleShare} className="text-[10px]">
 <Share2 className="w-4 h-4 text-slate-500" />
 {shareCopied ? 'URL Disalin!' : 'Bagikan Paket'}
 </Button>
 </div>
 </Card>
 </div>
 </div>

 {/* 4. Related trip packages */}
 {relatedPackages.length > 0 && (
 <section className="bg-slate-950 text-white py-24 lg:py-32 px-4 md:px-8 mt-12">
 <div className="max-w-7xl mx-auto space-y-10">
 <div className="text-center md:text-left space-y-2">
 <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
 Pilihan Alternatif
 </p>
 <h2 className="font-display font-bold text-white text-2xl tracking-tight">Paket Serupa</h2>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {relatedPackages.map(pkg => (
 <div 
 key={pkg.id}
 onClick={() => onNavigate(`/produk/${pkg.slug}`)}
 className="group bg-slate-900 border border-slate-800 p-4 rounded-lg cursor-pointer hover:border-slate-700 transition-colors flex flex-col md:flex-row items-center md:items-stretch gap-5 shadow-lg"
 >
 <div className="w-full md:w-28 aspect-video md:aspect-square rounded-lg  shrink-0">
 <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 " referrerPolicy="no-referrer" />
 </div>
 <div className="flex-1 flex flex-col justify-center py-2 min-w-0 pr-2 pb-2 md:pb-0 w-full text-center md:text-left">
 <span className="text-[10px] font-bold text-amber-600 font-medium text-xs mb-1">{pkg.type}</span>
 <h4 className="font-display font-bold text-white text-sm line-clamp-2 leading-snug group-hover:text-amber-500 transition-colors">{pkg.name}</h4>
 <div className="flex justify-between items-center text-[10px] mt-3 tracking-wider">
 <span className="text-slate-500 border border-slate-700 px-2 py-0.5 rounded-md">{pkg.duration_label}</span>
 <strong className="text-white text-xs font-sans font-bold">{pkg.price_label}</strong>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* 5. STICKY BOTTOM BAR FOR MOBILE LAYOUT (Thumb reach) */}
 <div className="lg:hidden fixed bottom-[calc(60px+env(safe-area-inset-bottom))] inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between transition-all">
 <div className="space-y-0.5">
 <p className="text-[9px] font-semibold text-slate-500">Mulai Dari</p>
 <p className="text-lg font-bold text-slate-900 font-display ">{packageItem.price_label}</p>
 </div>
 <div className="flex gap-2 text-[10px] font-bold tracking-wider">
 <button 
 onClick={handleShare}
 className="bg-white border border-slate-200 p-3 text-slate-700 rounded-lg"
 >
 <Share2 className="w-4 h-4 text-slate-500" />
 </button>
 <button
 onClick={() => onTanyaAdmin(packageItem)}
 className="bg-primary-blue hover:bg-primary-blue-dark text-white font-bold py-3 px-6 rounded-lg text-xs flex items-center gap-2 shadow-sm cursor-pointer font-sans"
 >
 Booking WA
 </button>
 </div>
 </div>
 </div>
 );
};
