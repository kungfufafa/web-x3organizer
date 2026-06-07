/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialBlogArtikel, initialPaketTrip, initialDestinasi } from '../data';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, HelpCircle, MapPin, Phone, Search, Tag, Clock, ChevronRight } from 'lucide-react';
import { PaketTrip } from '../types';
import { PageHero, Button, Card, Input } from '../components/ui';

// ==========================================
// 1. BLOG LISTING VIEW (/blog)
// ==========================================
interface BlogListingProps {
 onNavigate: (route: string) => void;
}

export const BlogListingView: React.FC<BlogListingProps> = ({ onNavigate }) => {
 const [searchTerm, setSearchTerm] = useState('');
 const [activeCategory, setActiveCategory] = useState<string>('Semua');

 const categories = ['Semua', 'Panduan', 'Rekomendasi', 'Perbandingan', 'Tips', 'Cara Booking'];

 const filteredArticles = initialBlogArtikel.filter(art => {
 if (art.status !== 'published') return false;

 const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
 art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
 art.primary_keyword.toLowerCase().includes(searchTerm.toLowerCase());

 const matchesCat = activeCategory === 'Semua' || art.category === activeCategory;

 return matchesSearch && matchesCat;
 });

 const featuredArticle = initialBlogArtikel.find(a => a.is_featured && a.status === 'published') || initialBlogArtikel[0];

 return (
 <div id="blog-listing-container" className="w-full @theme font-sans bg-white text-slate-900 md:pb-32">
 <PageHero
 eyebrow="Jurnal Perjalanan"
 title="Cerita & Inspirasi"
 subtitle="Temukan panduan lengkap, rekomendasi destinasi, hingga tips liburan terbaik untuk menyempurnakan pengalaman Anda."
 className="pb-16"
 >
 <div className="max-w-lg mx-auto pt-4 w-full">
 <div className="relative flex items-center">
 <Search className="absolute left-4 w-5 h-5 text-slate-500 z-10" />
 <Input
 dark
 type="text"
 placeholder="Cari artikel, panduan, atau tips..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="pl-12"
 />
 </div>
 </div>
 </PageHero>

 {/* Category Navigation */}
 <div className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4">
 <div className="max-w-7xl mx-auto px-4 md:px-8">
 <div className="flex gap-1 overflow-x-auto scrollbar-none items-center justify-start lg:justify-center">
 {categories.map(cat => (
 <button
 key={cat}
 onClick={() => setActiveCategory(cat)}
 className={`py-2 px-5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors tracking-wider ${
 activeCategory === cat 
 ? 'bg-primary-blue text-white' 
 : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
 }`}
 >
 {cat}
 </button>
 ))}
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32 space-y-20">
 {/* Featured Article - Editorial Style */}
 {searchTerm === '' && activeCategory === 'Semua' && featuredArticle && (
 <button
 type="button"
 onClick={() => onNavigate(`/blog/${featuredArticle.slug}`)}
 className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full text-left"
 aria-label={`Baca artikel: ${featuredArticle.title}`}
 >
 <div className="lg:col-span-8 rounded-lg relative aspect-[16/10]">
 <div className="absolute inset-0 overflow-hidden rounded-lg bg-slate-100">
 <img 
 src={featuredArticle.imageUrl} 
 alt={featuredArticle.title} 
 className="w-full h-full object-cover transition-transform duration-700 " 
 referrerPolicy="no-referrer" 
 />
 </div>
 <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold py-1.5 px-3 rounded-full tracking-wider">
 Sorotan Utama
 </div>
 </div>

 <div className="lg:col-span-4 flex flex-col justify-center space-y-5 lg:pr-4">
 <div className="flex items-center gap-3 text-xs font-medium font-bold">
 <span className="text-amber-600">{featuredArticle.category}</span>
 <span className="text-slate-300">•</span>
 <span className="text-slate-500">{featuredArticle.published_at}</span>
 </div>
 
 <h2 className="font-display font-bold text-slate-900 text-xl mt-1 md:text-2xl leading-tight group-hover:text-amber-600 transition-colors ">
 {featuredArticle.title}
 </h2>

 <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-4">
 {featuredArticle.excerpt}
 </p>

 <div className="pt-4 flex items-center gap-2 text-slate-900 font-bold tracking-wider text-[11px] group-hover:text-amber-600 transition-colors">
 Baca Selengkapnya
 <ArrowRight className="w-4 h-4" />
 </div>
 </div>
 </button>
 )}

 {/* Article Grid */}
 <div className="space-y-8">
 <div className="flex items-center justify-between border-b border-slate-200 pb-4">
 <h3 className="font-display font-bold text-slate-900 text-xl md:text-2xl tracking-tight">
 {searchTerm || activeCategory !== 'Semua' ? 'Hasil Pencarian' : 'Artikel Terbaru'}
 </h3>
 <span className="text-slate-500 text-sm ">{filteredArticles.length} Artikel</span>
 </div>

 {filteredArticles.length === 0 ? (
 <div className="py-24 lg:py-32 text-center space-y-4">
 <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
 <p className="text-slate-500 text-sm">Tidak ada artikel yang sesuai dengan kriteria pencarian Anda.</p>
 <Button onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }} className="mt-2">
 Tampilkan Semua
 </Button>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
 {filteredArticles.map((art, index) => {
 return (
 <Card
 id={`blog-grid-card-${art.id}`}
 key={art.id}
 onClick={() => onNavigate(`/blog/${art.slug}`)}
 animateIndex={index}
 className="group hover:-translate-y-1 hover:shadow-xl overflow-hidden"
 >
 <div className="relative aspect-[16/10] w-full">
  <img 
  src={art.imageUrl} 
  alt={art.title} 
  className="absolute inset-0 w-full h-full object-cover rounded-t-xl bg-slate-100 transition-transform duration-700 ease-out" 
  referrerPolicy="no-referrer" 
  />
  <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
  <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide">
  {art.category}
  </span>
  </div>
 
 <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
 <div className="flex items-center gap-2 text-[10px] font-semibold">
 <span className="text-slate-500">{art.published_at}</span>
 </div>

 <h4 className="font-display font-bold text-slate-900 text-lg md:text-xl leading-tight group-hover:text-primary-blue transition-colors">
 {art.title}
 </h4>

 <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-grow font-sans">
 {art.excerpt}
 </p>

 <div className="pt-6 mt-2 border-t border-slate-100 flex items-center justify-between">
 <span className="text-slate-900 font-semibold text-[10px] flex items-center gap-1.5 group-hover:text-primary-blue transition-colors">
 Mulai Membaca
 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
 </span>
 </div>
 </div>
 </Card>
 );
 })}
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

// ==========================================
// 2. BLOG DETAIL VIEW (/blog/{slug})
// ==========================================
interface BlogDetailProps {
 slug: string;
 onNavigate: (route: string) => void;
 onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export const BlogDetailView: React.FC<BlogDetailProps> = ({ slug, onNavigate, onTanyaAdmin }) => {
 // Find current post
 const article = initialBlogArtikel.find(a => a.slug === slug);

 if (!article) {
 return (
 <div className="p-6 text-center max-w-lg mx-auto space-y-4">
 <h2 className="text-xl font-bold text-rose-500">Artikel tidak ditemukan!</h2>
 <p className="text-slate-500">Harap kembali ke halaman blog untuk membaca list panduan resmi kami.</p>
 <Button onClick={() => onNavigate('/blog')}>Kembali ke Blog</Button>
 </div>
 );
 }

 // Relations
 const relatedPackages = initialPaketTrip.filter(p => article.related_package_ids.includes(p.id) && p.status === 'published');
 const relatedDests = initialDestinasi.filter(d => article.related_destinasi_ids.includes(d.id));

 // Auto generated structural Schema Markup block to show off SEO-first engineering
 const articleUrl = `${window.location.origin}/blog/${article.slug}`;
 const jsonLdSchema = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": article.title,
 "description": article.excerpt,
 "image": [article.imageUrl],
 "datePublished": article.published_at,
 "dateModified": article.published_at,
 "url": articleUrl,
 "mainEntityOfPage": articleUrl,
 "author": [{
 "@type": "Organization",
 "name": "X3 Organizer",
 "url": window.location.origin
 }],
 "publisher": {
 "@type": "Organization",
 "name": "X3 Organizer",
 "logo": { "@type": "ImageObject", "url": `${window.location.origin}/logo.png` }
 }
 };

 // Simulated Table of Contents (TOC) lists h2 tags parsed from database body
 const tableOfContents = [
 { title: "Mengapa Harus Menggunakan Jasa Tour Agent Terpercaya?", anchor: "#agent" },
 { title: "Musim Terbaik Berangkat Menatap Cahaya Emas", anchor: "#musim" },
 { title: "3 Tips Penting Menghindari Macet Antrean Tur", anchor: "#tips" }
 ];

 return (
 <div id="blog-detail-root" className="w-full @theme font-sans bg-white text-slate-900 md:pb-24">
 
 {/* Editorial Navigation Bar */}
 <div className="bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 px-4 md:px-8 sticky top-0 z-50">
 <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
 <button 
 onClick={() => onNavigate('/blog')}
 className="text-slate-500 hover:text-slate-900 font-semibold text-[10px] flex items-center gap-2 transition-colors"
 >
 <ArrowLeft className="w-4 h-4" />
 Kembali ke Jurnal
 </button>
 <div className="flex items-center gap-2">
 <span className="text-slate-500 text-[10px] font-bold tracking-wider hidden sm:inline-block">Kategori:</span>
 <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">{article.category}</span>
 </div>
 </div>
 </div>

 {/* Article Hero */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32">
 <div className="max-w-3xl mx-auto space-y-6 text-center">
 <div className="flex items-center justify-center gap-3 text-xs font-medium font-bold text-slate-500">
 <span className="text-amber-600">{article.category}</span>
 <span>•</span>
 <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.published_at}</span>
 </div>
 
 <h1 className="font-display font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight ">
 {article.title}
 </h1>

 <p className="text-slate-600 text-base md:text-lg lg:text-xl leading-relaxed italic max-w-2xl mx-auto">
 {article.excerpt}
 </p>
 </div>
 </div>

 {/* Featured Image */}
 <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
 <div className="w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden bg-slate-100">
 <img 
 src={article.imageUrl} 
 alt={article.title} 
 className="w-full h-full object-cover" 
 referrerPolicy="no-referrer" 
 />
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
 
 {/* Left Column: Rich Articles body */}
 <div className="lg:col-span-8 space-y-12">
 <article className="prose prose-slate prose-lg md:prose-xl max-w-prose font-sans text-slate-700 leading-relaxed marker:text-amber-600 prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h1:md:text-3xl prose-a:text-primary-blue hover:prose-a:text-primary-blue-dark prose-img:rounded-xl">
 {/* Dynamic HTML Articles Content Parser simulator with typography styling */}
 <div dangerouslySetInnerHTML={{ __html: article.body }} />
 </article>

 {/* Auto Dynamic Internal links boxes nested directly at end of core post */}
 {(relatedPackages.length > 0 || relatedDests.length > 0) && (
 <div className="mt-16 border-t border-slate-100 pt-8">
 <h4 className="font-display font-bold text-slate-900 text-lg tracking-tight mb-6">Penawaran & Destinasi Terkait</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {relatedPackages.map(pkg => (
 <div 
 key={pkg.id}
 onClick={() => onNavigate(`/produk/${pkg.slug}`)}
 className="group bg-white border border-slate-200 p-4 rounded-lg cursor-pointer hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-4"
 >
 <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
 <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 " referrerPolicy="no-referrer" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">{pkg.name}</p>
 <p className="text-[10px] text-slate-500 mt-1 tracking-wider font-bold">Mulai: {pkg.price_label}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Right Column: Schema Explorer and Soft Conversion Card (col-span-4) */}
 <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
 
 {/* Mobile-Friendly Table of Contents Panel */}
 <div className="bg-slate-50 border border-slate-100 rounded-lg p-6 hidden lg:block">
 <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
 Navigasi Artikel
 </h4>
 <ul className="space-y-3 text-sm text-slate-700 font-bold border-l-2 border-slate-200 pl-4">
 {tableOfContents.map((toc, index) => (
 <li key={index} className="hover:text-amber-600 cursor-pointer transition-colors leading-snug">
 {toc.title}
 </li>
 ))}
 </ul>
 </div>

 {/* Conversion Promo Callout card */}
 <div className="bg-slate-950 text-white p-6 rounded-lg border border-slate-900 relative flex flex-col justify-center">
 <div className="absolute inset-0 bg-radial from-amber-500/20 to-transparent rounded-lg pointer-events-none"></div>

 <div className="relative z-10 space-y-6">
 <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-amber-500">
 <BookOpen className="w-6 h-6" />
 </div>
 <h4 className="font-display font-bold text-white text-2xl leading-tight tracking-tight">Wujudkan Liburan Impian Anda</h4>
 <p className="text-sm text-slate-500 leading-relaxed font-sans">
 Tertarik mengikuti rute petualangan keindahan destinasi di dalam artikel ini? Konsultasikan perjalanan Anda sekarang.
 </p>
 <div className="pt-2">
 <Button
 variant="accent"
 fullWidth
 onClick={() => onTanyaAdmin(`Halo Admin, saya membaca artikel "${article.title}" dan tertarik untuk tanya-tanya.`)}
 className="py-4"
 >
 Tanya Rute di WA
 </Button>
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>
 );
};
