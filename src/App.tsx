/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
 Compass, 
 Users, 
 Briefcase, 
 MapPin, 
 Clock, 
 Menu, 
 X, 
 Phone, 
 Share2, 
 Code, 
 Tag, 
 HelpCircle, 
 MessageSquare, 
 Globe, 
 ArrowRight, 
 ArrowLeft,
 Settings,
 Check,
 Mail,
 Plane,
 Facebook,
 Youtube,
 Instagram
} from 'lucide-react';

// Live Views
import HomeView from './views/HomeView';
import { LayananListingView, LayananDetailView } from './views/LayananViews';
import { ProdukListingView, ProdukDetailView } from './views/ProdukViews';
import { BlogListingView, BlogDetailView } from './views/BlogViews';

// CMS DevTools Panel
import DevTools from './components/DevTools';
import StaticPageView from './views/StaticPageView';
import { PaketTrip } from './types';
import { usePageSeo } from './hooks/usePageSeo';

const getPathFromLocation = () => `${window.location.pathname}${window.location.search}`;

const pathMatches = (current: string, target: string) => {
 const [pathname] = current.split('?');
 if (target === '/') return pathname === '/';
 return pathname === target || pathname.startsWith(`${target}/`);
};

export default function App() {
 const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);
 
 // Responsive Drawer Menu For Mobile
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
 // DevTools Panel Visibility
 const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

 usePageSeo(currentPath);

 useEffect(() => {
 const handlePopState = () => {
 setCurrentPath(getPathFromLocation());
 window.scrollTo({ top: 0, behavior: 'instant' });
 };
 window.addEventListener('popstate', handlePopState);
 return () => window.removeEventListener('popstate', handlePopState);
 }, []);

 useEffect(() => {
 document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
 return () => { document.body.style.overflow = ''; };
 }, [isMobileMenuOpen]);

 useEffect(() => {
 if (!isMobileMenuOpen) return;
 const onKeyDown = (e: KeyboardEvent) => {
 if (e.key === 'Escape') setIsMobileMenuOpen(false);
 };
 window.addEventListener('keydown', onKeyDown);
 return () => window.removeEventListener('keydown', onKeyDown);
 }, [isMobileMenuOpen]);

 const navigateTo = (path: string) => {
 const nextPath = path.startsWith('/') ? path : `/${path}`;
 if (nextPath !== getPathFromLocation()) {
 window.history.pushState(null, '', nextPath);
 }
 setCurrentPath(nextPath);
 setIsMobileMenuOpen(false);
 window.scrollTo({ top: 0, behavior: 'instant' });
 };

 // Directly direct to real WhatsApp URL
 const handleTanyaAdmin = (packageItemOrMsg: PaketTrip | string) => {
 const msgText = typeof packageItemOrMsg === 'string' ? packageItemOrMsg : packageItemOrMsg.booking_message;
 const url = `https://wa.me/628123456789?text=${encodeURIComponent(msgText)}`;
 window.open(url, '_blank', 'noopener,noreferrer');
 };

 // Directly direct to WhatsApp for general inquiries
 const handleGeneralWa = () => {
 const defaultMsg = "Halo Admin, saya tertarik bertanya mengenai paket open trip / private trip yang tersedia.";
 const url = `https://wa.me/628123456789?text=${encodeURIComponent(defaultMsg)}`;
 window.open(url, '_blank', 'noopener,noreferrer');
 };

 // URL Path parser
 const renderCurrentView = () => {
 // Exact path match or param parsing
 if (currentPath === '/') {
 return <HomeView onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }
 
 if (currentPath === '/layanan') {
 return <LayananListingView onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }
 
 if (currentPath.startsWith('/layanan/')) {
 const slug = currentPath.replace('/layanan/', '').split('?')[0];
 return <LayananDetailView slug={slug} onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }
 
 if (currentPath === '/produk' || currentPath.startsWith('/produk?')) {
 // Parse optional dest filter
 let destFilter = "";
 if (currentPath.includes('?')) {
 const qParams = new URLSearchParams(currentPath.split('?')[1]);
 destFilter = qParams.get('dest') || "";
 }
 return <ProdukListingView initialDestFilter={destFilter} onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }
 
 if (currentPath.startsWith('/produk/')) {
 const slug = currentPath.replace('/produk/', '').split('?')[0];
 return <ProdukDetailView slug={slug} onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }
 
 if (currentPath === '/blog') {
 return <BlogListingView onNavigate={navigateTo} />;
 }
 
 if (currentPath.startsWith('/blog/')) {
 const slug = currentPath.replace('/blog/', '').split('?')[0];
 return <BlogDetailView slug={slug} onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 }

 if (currentPath === '/tentang-kami') {
 return (
 <StaticPageView title="Tentang Kami" eyebrow="Perusahaan" onNavigate={navigateTo}>
 <p>PT. X3 Organizer Nusantara adalah penyedia layanan perjalanan domestik dan internasional yang berfokus pada open trip, private trip, corporate outing, dan family trip di destinasi populer seperti Bromo, Bali, Nusa Penida, Malang, dan Batu.</p>
 <p>Sejak berdiri, kami melayani ribuan wisatawan dengan prinsip transparansi harga, itinerary jelas, dan tim lapangan yang responsif. Setiap paket trip dirancang oleh konsultan berpengalaman yang memahami kondisi lapangan secara langsung.</p>
 <h2>Keunggulan Kami</h2>
 <ul>
 <li>Armada Jeep 4x4 dan kendaraan MVP ber-AC yang dicek berkala</li>
 <li>Pemandu lokal ramah dan terlatih dokumentasi perjalanan</li>
 <li>Hotline admin WhatsApp aktif 24 jam</li>
 <li>Harga transparan tanpa biaya tersembunyi</li>
 </ul>
 </StaticPageView>
 );
 }

 if (currentPath === '/karir') {
 return (
 <StaticPageView title="Karir / Careers" eyebrow="Perusahaan" onNavigate={navigateTo}>
 <p>Kami terbuka untuk talenta di bidang operasional trip, sales travel, content marketing, dan customer service.</p>
 <p>Kirimkan CV dan portofolio Anda ke <strong>cs@x3organizer.com</strong> dengan subjek &quot;Lamaran Karir - [Posisi]&quot;.</p>
 </StaticPageView>
 );
 }

 if (currentPath === '/syarat-ketentuan') {
 return (
 <StaticPageView title="Syarat & Ketentuan" eyebrow="Legal" onNavigate={navigateTo}>
 <p>Dengan menggunakan layanan X3 Organizer, Anda setuju untuk mematuhi ketentuan berikut yang berlaku pada seluruh paket trip.</p>
 <h2>Pemesanan & Pembayaran</h2>
 <p>DP minimal 30% diperlukan untuk konfirmasi booking. Pelunasan mengikuti kesepakatan saat pemesanan. Harga dapat berubah sesuai musim dan ketersediaan kuota.</p>
 <h2>Pembatalan & Reschedule</h2>
 <p>Pembatalan dan perubahan jadwal mengikuti kebijakan masing-masing paket. Hubungi admin untuk konfirmasi ketentuan spesifik sebelum melakukan pembayaran.</p>
 <h2>Tanggung Jawab Peserta</h2>
 <p>Peserta wajib membawa dokumen identitas, mengikuti instruksi pemandu, dan mematuhi peraturan destinasi setempat demi keselamatan bersama.</p>
 </StaticPageView>
 );
 }

 if (currentPath === '/kebijakan-privasi') {
 return (
 <StaticPageView title="Kebijakan Privasi" eyebrow="Legal" onNavigate={navigateTo}>
 <p>Kami hanya mengumpulkan data pribadi yang diperlukan untuk keperluan booking, komunikasi perjalanan, dan layanan pelanggan.</p>
 <p>Data Anda tidak dibagikan kepada pihak ketiga tanpa persetujuan, kecuali jika diwajibkan oleh hukum.</p>
 </StaticPageView>
 );
 }

 // Default Fallback
 return <HomeView onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
 };

 return (
 <div className="min-h-[100dvh] text-slate-900 flex flex-col relative antialiased font-sans">
 <a href="#main-content" className="skip-link">Lewati ke konten utama</a>

  {/* 2. REAL APP CONTENT LAYOUT - TWO GRID CONTAINER IF DEV SPLIT OPEN */}
  <div className={`flex-1 flex flex-col lg:flex-row ${isDevToolsOpen ? 'divide-x divide-slate-800' : ''}`}>
 
 {/* VIEWPORT CONTROLLER SIDE */}
 <div className={`flex-1 flex flex-col min-w-0 ${isDevToolsOpen ? 'lg:max-w-[55%] xl:max-w-[60%]' : 'w-full'}`}>
 
 {/* 3. HEADER COMPONENT (As requested) */}
 <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-sm transition-colors duration-150 ease-out py-3 px-4 md:px-8">
 <div className="max-w-7xl mx-auto flex items-center justify-between">
 
 {/* Logo left */}
 <button
 type="button"
 onClick={() => navigateTo('/')}
 className="flex items-center gap-3 cursor-pointer group touch-target"
 aria-label="X3 Organizer — kembali ke beranda"
 >
 <img src="/logo.png" alt="" className="h-10 md:h-12 w-auto object-contain drop-shadow-sm transition-transform duration-300" />
 </button>

 {/* Desktop menu center */}
 <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
 <button 
 onClick={() => navigateTo('/')} 
 aria-current={pathMatches(currentPath, '/') ? 'page' : undefined}
 className={`px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 ${
 pathMatches(currentPath, '/') 
 ? 'bg-primary-blue/5 text-primary-blue font-bold shadow-3xs' 
 : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
 }`}
 >
 Home
 </button>
 <button 
 onClick={() => navigateTo('/layanan')} 
 aria-current={pathMatches(currentPath, '/layanan') ? 'page' : undefined}
 className={`px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 ${
 pathMatches(currentPath, '/layanan') 
 ? 'bg-primary-blue/5 text-primary-blue font-bold shadow-3xs' 
 : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
 }`}
 >
 Layanan
 </button>
 <button 
 onClick={() => navigateTo('/produk')} 
 aria-current={pathMatches(currentPath, '/produk') ? 'page' : undefined}
 className={`px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 ${
 pathMatches(currentPath, '/produk') 
 ? 'bg-primary-blue/5 text-primary-blue font-bold shadow-3xs' 
 : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
 }`}
 >
 Paket Trip
 </button>
 <button 
 onClick={() => navigateTo('/blog')} 
 aria-current={pathMatches(currentPath, '/blog') ? 'page' : undefined}
 className={`px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 ${
 pathMatches(currentPath, '/blog') 
 ? 'bg-primary-blue/5 text-primary-blue font-bold shadow-3xs' 
 : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
 }`}
 >
 Blog
 </button>
 </nav>

 {/* CTA WhatsApp right (Styled like Laravel search & Sign in/Auth UI) */}
 <div className="flex items-center gap-2">
 {/* TikTok Icon SVG Component */}
 {(() => {
 const TikTokIcon = ({ className = "w-4 h-4" }) => (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
 </svg>
 );
 return (
 <>
 <a
 href="https://www.instagram.com/x3organizer/"
 target="_blank"
 rel="noopener noreferrer"
 className="flex bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/85 hover:border-slate-300 py-2 px-2.5 rounded-lg items-center transition shadow-3xs cursor-pointer group"
 aria-label="Instagram"
 >
 <Instagram className="w-4 h-4 text-pink-600  transition-transform" />
 </a>
 <a
 href="https://www.tiktok.com/@x3organizer"
 target="_blank"
 rel="noopener noreferrer"
 className="flex bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/85 hover:border-slate-300 py-2 px-2.5 rounded-lg items-center transition shadow-3xs cursor-pointer group"
 aria-label="TikTok"
 >
 <TikTokIcon className="w-4 h-4 text-slate-900  transition-transform" />
 </a>
 </>
 );
 })()}

 <button
 onClick={() => setIsDevToolsOpen(!isDevToolsOpen)}
 className={`hidden lg:flex p-2 rounded-lg transition ${isDevToolsOpen ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
 aria-label="Toggle CMS DevTools"
 title="CMS DevTools"
 >
 <Code className="w-4 h-4" />
 </button>

 {/* Hamburger menu trigger for mobile drawer */}
 <button 
 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 className="md:hidden touch-target p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition"
 aria-label="Buka menu navigasi"
 aria-expanded={isMobileMenuOpen}
 aria-controls="mobile-nav-drawer">
 <Menu className="w-5.5 h-5.5" />
 </button>
 </div>
 </div>
 </header>

 {/* Mobile Drawer Menu Layer */}
 {isMobileMenuOpen && (
 <div className="fixed inset-0 z-50 md:hidden flex justify-end" role="presentation">
 <div 
 className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
 onClick={() => setIsMobileMenuOpen(false)}
 aria-hidden="true"
 ></div>
 <div
 id="mobile-nav-drawer"
 role="dialog"
 aria-modal="true"
 aria-label="Menu navigasi"
 className="bg-white w-[85%] max-w-sm h-full p-6 flex flex-col shadow-2xl relative z-10 animate-slide-in overflow-y-auto"
 >
 <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
 <div className="flex items-center gap-2">
 <div className="bg-primary-blue text-white p-2 rounded-lg shadow-sm">
 <Compass className="w-5 h-5" />
 </div>
 <div>
 <div className="flex items-baseline gap-1.5">
 <span className="font-display font-bold text-slate-900 text-lg tracking-tighter leading-none">
 X3
 </span>
 <span className="font-display font-bold text-primary-blue text-lg tracking-tighter leading-none">
 ORGANIZER
 </span>
 </div>
 </div>
 </div>
 <button 
 onClick={() => setIsMobileMenuOpen(false)}
 className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-colors"
 aria-label="Close mobile menu">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="flex-1">
 <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4 block">Navigasi Utama</span>
 <ul className="space-y-2">
 <li>
 <button 
 onClick={() => navigateTo('/')} 
 className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath === '/' ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
 >
 <Compass className="w-5 h-5" />
 <span>Home Page</span>
 </button>
 </li>
 <li>
 <button 
 onClick={() => navigateTo('/layanan')} 
 className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/layanan') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
 >
 <MapPin className="w-5 h-5" />
 <span>Listing Layanan</span>
 </button>
 </li>
 <li>
 <button 
 onClick={() => navigateTo('/produk')} 
 className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/produk') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
 >
 <Plane className="w-5 h-5" />
 <span>Semua Paket Trip</span>
 </button>
 </li>
 <li>
 <button 
 onClick={() => navigateTo('/blog')} 
 className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/blog') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
 >
 <MessageSquare className="w-5 h-5" />
 <span>Blog & Artikel</span>
 </button>
 </li>
 </ul>
 </div>

 <div className="mt-8 pt-6 border-t border-slate-100">
 <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-4 block">Bantuan & Kontak</span>
 <button
 onClick={handleGeneralWa}
 className="w-full bg-whatsapp hover:bg-emerald-600 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
 >
 <Phone className="w-4 h-4 fill-current text-white shrink-0 animate-pulse" />
 <span>Hubungi Admin WA</span>
 </button>
 <p className="text-[10px] text-slate-500 text-center mt-4">
 Hotline tersedia 24/7 untuk Anda
 </p>
 </div>
 </div>
 </div>
 )}

 {/* 4. ACTUAL DYNAMIC COMPONENT STAGE */}
 <main id="main-content" className="flex-1 pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-0" tabIndex={-1}>
 {renderCurrentView()}
 </main>

 {/* 5. FOOTER SITE COMPONENT */}
 {/* FOOTER */}
 <footer className="bg-white text-slate-600 border-t border-slate-200 pt-12 pb-[calc(70px+env(safe-area-inset-bottom))] md:pb-12 px-4 md:px-8 shadow-xs">
 <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
 <div className="md:w-1/3 space-y-4">
 {/* Brand */}
 <button type="button" onClick={() => navigateTo('/')} className="cursor-pointer group w-fit inline-block mb-2" aria-label="X3 Organizer — beranda">
 <img src="/logo.png" alt="" className="h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform duration-300" />
 </button>
 <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
 Layanan spesialis perjalanan domestik dan internasional dengan pengalaman tak terlupakan.
 </p>
 <div className="flex gap-4 pt-2">
 <a href="https://www.instagram.com/x3organizer/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-colors p-1 -ml-1" aria-label="Visit our Instagram"><Instagram className="w-4 h-4" /></a>
 <a href="https://www.tiktok.com/@x3organizer" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-colors p-1" aria-label="Visit our TikTok">
 {(() => {
 const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
 </svg>
 );
 return <TikTokIcon />;
 })()}
 </a>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-8 md:w-2/3 md:grid-cols-3">
 {/* Kolom 1 */}
 <div className="space-y-4">
 <h3 className="text-slate-900 font-bold text-xs">Perusahaan</h3>
 <ul className="space-y-2.5 text-slate-500 text-xs font-medium">
 <li><button onClick={() => navigateTo('/tentang-kami')} className="hover:text-slate-900 transition">Tentang Kami</button></li>
 <li><button onClick={() => navigateTo('/blog')} className="hover:text-slate-900 transition">Blog & Artikel</button></li>
 <li><button onClick={() => navigateTo('/karir')} className="hover:text-slate-900 transition">Karir / Careers</button></li>
 </ul>
 </div>
 
 {/* Kolom 2 */}
 <div className="space-y-4">
 <h3 className="text-slate-900 font-bold text-xs">Layanan</h3>
 <ul className="space-y-2.5 text-slate-500 text-xs font-medium">
 <li><button onClick={() => navigateTo('/produk')} className="hover:text-slate-900 transition">Paket Open Trip</button></li>
 <li><button onClick={() => navigateTo('/layanan/private-trip')} className="hover:text-slate-900 transition">Private Tour</button></li>
 <li><button onClick={() => navigateTo('/layanan/corporate-outing')} className="hover:text-slate-900 transition">Corporate Outing</button></li>
 </ul>
 </div>

 {/* Kolom 3 */}
 <div className="space-y-4 col-span-2 md:col-span-1">
 <h3 className="text-slate-900 font-bold text-xs">Bantuan</h3>
 <ul className="space-y-2.5 text-slate-500 text-xs font-medium">
 <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" /> +62 812 3456 789</li>
 <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" /> cs@x3organizer.com</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto border-t border-slate-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
 <p>© 2026 PT. X3 Organizer Nusantara. Hak Cipta Dilindungi.</p>
 <div className="flex gap-4">
 <button onClick={() => navigateTo('/syarat-ketentuan')} className="hover:text-slate-600 transition">Syarat & Ketentuan</button>
 <button onClick={() => navigateTo('/kebijakan-privasi')} className="hover:text-slate-600 transition">Kebijakan Privasi</button>
 </div>
 </div>
 </footer>

 {/* 6. BOTTOM NAVIGATION (Mobile optimized finger tap as requested) */}
 <nav aria-label="Navigasi bawah" className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] z-40 flex items-stretch justify-around text-[10px] text-slate-500 font-bold tracking-wider font-sans transition-all pb-[calc(10px+env(safe-area-inset-bottom))] pt-2">
 <button 
 onClick={() => navigateTo('/')}
 aria-current={pathMatches(currentPath, '/') ? 'page' : undefined}
 aria-label="Home"
 className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/') ? 'text-primary-blue font-extrabold' : ''}`}
 >
 <Compass className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/') ? 'text-primary-blue' : 'text-slate-500'}`} />
 <span>Home</span>
 </button>
 <button 
 onClick={() => navigateTo('/produk')}
 aria-current={pathMatches(currentPath, '/produk') ? 'page' : undefined}
 aria-label="Paket Trip"
 className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/produk') ? 'text-primary-blue font-extrabold' : ''}`}
 >
 <Tag className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/produk') ? 'text-primary-blue' : 'text-slate-500'}`} />
 <span>Paket</span>
 </button>
 <button 
 onClick={() => navigateTo('/layanan')}
 aria-current={pathMatches(currentPath, '/layanan') ? 'page' : undefined}
 aria-label="Layanan"
 className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/layanan') ? 'text-primary-blue font-extrabold' : ''}`}
 >
 <Users className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/layanan') ? 'text-primary-blue' : 'text-slate-500'}`} />
 <span>Layanan</span>
 </button>
 <button 
 onClick={() => navigateTo('/blog')}
 aria-current={pathMatches(currentPath, '/blog') ? 'page' : undefined}
 aria-label="Blog"
 className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/blog') ? 'text-primary-blue font-extrabold' : ''}`}
 >
 <MessageSquare className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/blog') ? 'text-primary-blue' : 'text-slate-500'}`} />
 <span>Blog</span>
 </button>
 </nav>

 {/* 7. FLOATING WHATSAPP BUTTON (persistent, non-obscured layout) */}
 <button
 onClick={handleGeneralWa}
 aria-label="Hubungi via WhatsApp" className="fixed max-md:bottom-[calc(90px+env(safe-area-inset-bottom))] md:bottom-6 right-6 bg-whatsapp hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 z-[35] group ring-4 ring-whatsapp/20 hover:ring-whatsapp/40"
 >
 <Phone className="w-6 h-6 fill-current text-white block" />
 <span className="absolute bg-slate-900 text-white text-[10px] py-1 px-2.5 font-bold rounded-lg border border-slate-800 right-14 top-1.5 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
 Hotline 24 Jam
 </span>
 </button>

 </div>

 {/* CMS / FILAMENT DEVELOPMENT BLUEPRINT SPLIT PANEL */}
 {isDevToolsOpen && (
 <div className="w-full lg:w-[45%] xl:w-[40%] bg-slate-900 overflow-y-hidden border-t lg:border-t-0 border-slate-800 shrink-0 h-[500px] lg:h-auto">
 <DevTools onClose={() => setIsDevToolsOpen(false)} />
 </div>
 )}

 </div>

 </div>
 );
}
