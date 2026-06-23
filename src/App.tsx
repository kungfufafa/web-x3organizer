/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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

import StaticPageView from './views/StaticPageView';
import NotFoundView from './views/NotFoundView';
import { PaketTrip } from './types';
import { usePageSeo } from './hooks/usePageSeo';
import { isNotFoundRoute } from './lib/routes';

const getPathFromLocation = () => `${window.location.pathname}${window.location.search}`;

const pathMatches = (current: string, target: string) => {
  const [pathname] = current.split('?');
  if (target === '/') return pathname === '/';
  return pathname === target || pathname.startsWith(`${target}/`);
};

// Navigate via SPA pushState while preserving real-anchor semantics (open-in-new-tab, copy link).
const onNavClick = (e: React.MouseEvent, navigateTo: (path: string) => void, path: string) => {
  // Only intercept plain left-clicks; let modifier-clicks behave as native links.
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigateTo(path);
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);

  // Responsive Drawer Menu For Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Focus-management refs for the mobile dialog (A11Y-002)
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

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

  // Mobile dialog: move focus in, trap Tab, restore focus on close (A11Y-002)
  useEffect(() => {
    if (isMobileMenuOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 0);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          return;
        }
        if (e.key !== 'Tab') return;
        const drawer = drawerRef.current;
        if (!drawer) return;
        const focusables: HTMLElement[] = [];
        drawer
          .querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
          .forEach((node) => {
            if (node instanceof HTMLElement && node.offsetParent !== null) {
              focusables.push(node);
            }
          });
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        clearTimeout(focusTimer);
        window.removeEventListener('keydown', onKeyDown);
      };
    }
    // On close: restore focus to the trigger that opened the menu.
    lastFocusedElement.current?.focus?.();
    lastFocusedElement.current = null;
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
    if (isNotFoundRoute(currentPath)) {
      return <NotFoundView onNavigate={navigateTo} />;
    }

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
      return <BlogListingView onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <BlogDetailView slug={slug} onNavigate={navigateTo} onTanyaAdmin={handleTanyaAdmin} />;
    }

    if (currentPath === '/tentang-kami') {
      return (
        <StaticPageView title="Tentang Kami" eyebrow="Perusahaan" onNavigate={navigateTo} onWhatsApp={handleGeneralWa}>
          <p>PT. Xthree Navigasi Internasional adalah penyedia layanan perjalanan domestik dan internasional yang berfokus pada open trip, private trip, corporate outing, dan family trip di destinasi populer seperti Bromo, Bali, Nusa Penida, Malang, dan Batu.</p>
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
        <StaticPageView title="Karir / Careers" eyebrow="Perusahaan" onNavigate={navigateTo} onWhatsApp={handleGeneralWa}>
          <p>Kami terbuka untuk talenta di bidang operasional trip, sales travel, content marketing, dan customer service.</p>
          <p>Kirimkan CV dan portofolio Anda ke <strong>cs@x3organizer.com</strong> dengan subjek &quot;Lamaran Karir - [Posisi]&quot;.</p>
        </StaticPageView>
      );
    }

    if (currentPath === '/syarat-ketentuan') {
      return (
        <StaticPageView title="Syarat & Ketentuan" eyebrow="Legal" onNavigate={navigateTo} onWhatsApp={handleGeneralWa}>
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
        <StaticPageView title="Kebijakan Privasi" eyebrow="Legal" onNavigate={navigateTo} onWhatsApp={handleGeneralWa}>
          <p>Kami hanya mengumpulkan data pribadi yang diperlukan untuk keperluan booking, komunikasi perjalanan, dan layanan pelanggan.</p>
          <p>Data Anda tidak dibagikan kepada pihak ketiga tanpa persetujuan, kecuali jika diwajibkan oleh hukum.</p>
        </StaticPageView>
      );
    }

    // Default Fallback (unknown route)
    return <NotFoundView onNavigate={navigateTo} />;
  };

  // The produk-detail page renders its own mobile WhatsApp booking bar; suppress the
  // global floating FAB on small screens there to avoid overlap (RESP-001).
  const hideFabOnMobile = currentPath.startsWith('/produk/');

  return (
    <div className="min-h-[100dvh] text-slate-900 flex flex-col relative antialiased font-sans">
      <a href="#main-content" className="skip-link">Lewati ke konten utama</a>

      {/* Announcement bar */}
      <div className="bg-brand-primary text-white text-center text-xs sm:text-sm font-medium py-2 px-4">
        <span className="opacity-90">Booking & konsultasi trip </span>
        <button type="button" onClick={handleGeneralWa} className="font-bold underline underline-offset-2 hover:text-amber-300 transition-colors ml-1">
          Hubungi Tim X3 Organizer via WhatsApp
        </button>
      </div>

      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-colors duration-150 ease-out">
          <div className="container-site flex items-center justify-between min-h-[var(--layout-header-height)] gap-4">

            {/* Logo left */}
            <a
              href="/"
              onClick={(e) => onNavClick(e, navigateTo, '/')}
              className="flex items-center gap-3 cursor-pointer group touch-target"
              aria-label="X3 Organizer — kembali ke beranda"
            >
              <img src="/images/brand/x3-organizer-logo.png" width="512" height="512" alt="" className="h-8 md:h-9 w-auto object-contain drop-shadow-sm transition-transform duration-300" />
            </a>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
              <a
                href="/"
                onClick={(e) => onNavClick(e, navigateTo, '/')}
                aria-current={pathMatches(currentPath, '/') ? 'page' : undefined}
                className={`relative px-0 py-4 text-sm font-semibold transition-all duration-200 ${pathMatches(currentPath, '/')
                  ? 'text-slate-950 after:absolute after:left-0 after:right-0 after:bottom-2 after:h-0.5 after:rounded-full after:bg-amber-500'
                  : 'text-slate-600 hover:text-slate-950'
                  }`}
              >
                Beranda
              </a>
              <a
                href="/layanan"
                onClick={(e) => onNavClick(e, navigateTo, '/layanan')}
                aria-current={pathMatches(currentPath, '/layanan') ? 'page' : undefined}
                className={`relative px-0 py-4 text-sm font-semibold transition-all duration-200 ${pathMatches(currentPath, '/layanan')
                  ? 'text-slate-950 after:absolute after:left-0 after:right-0 after:bottom-2 after:h-0.5 after:rounded-full after:bg-amber-500'
                  : 'text-slate-600 hover:text-slate-950'
                  }`}
              >
                Layanan
              </a>
              <a
                href="/produk"
                onClick={(e) => onNavClick(e, navigateTo, '/produk')}
                aria-current={pathMatches(currentPath, '/produk') ? 'page' : undefined}
                className={`relative px-0 py-4 text-sm font-semibold transition-all duration-200 ${pathMatches(currentPath, '/produk')
                  ? 'text-slate-950 after:absolute after:left-0 after:right-0 after:bottom-2 after:h-0.5 after:rounded-full after:bg-amber-500'
                  : 'text-slate-600 hover:text-slate-950'
                  }`}
              >
                Paket Trip
              </a>
              <a
                href="/blog"
                onClick={(e) => onNavClick(e, navigateTo, '/blog')}
                aria-current={pathMatches(currentPath, '/blog') ? 'page' : undefined}
                className={`relative px-0 py-4 text-sm font-semibold transition-all duration-200 ${pathMatches(currentPath, '/blog')
                  ? 'text-slate-950 after:absolute after:left-0 after:right-0 after:bottom-2 after:h-0.5 after:rounded-full after:bg-amber-500'
                  : 'text-slate-600 hover:text-slate-950'
                  }`}
              >
                Blog
              </a>
            </nav>

            {/* Social links right */}
            <div className="flex items-center gap-2">
              {/* TikTok Icon SVG Component */}
              {(() => {
                const TikTokIcon = ({ className = "w-4 h-4" }) => (
                  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                );
                return (
                  <>
                    <a
                      href="https://www.instagram.com/x3organizer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/85 hover:border-slate-300 p-2 rounded-full items-center transition shadow-3xs cursor-pointer group"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4 text-pink-600  transition-transform" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@x3organizer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/85 hover:border-slate-300 p-2 rounded-full items-center transition shadow-3xs cursor-pointer group"
                      aria-label="TikTok"
                    >
                      <TikTokIcon className="w-4 h-4 text-slate-900  transition-transform" />
                    </a>
                  </>
                );
              })()}

              {/* Hamburger menu trigger for mobile drawer */}
              <button
                ref={hamburgerRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden touch-target p-2 text-slate-700 hover:bg-slate-50 rounded-full transition"
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
              ref={drawerRef}
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
                  ref={closeButtonRef}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-full transition-colors"
                  aria-label="Close mobile menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 block">Navigasi Utama</span>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/"
                      onClick={(e) => onNavClick(e, navigateTo, '/')}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors touch-target ${currentPath === '/' ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
                    >
                      <Compass className="w-5 h-5" />
                      <span>Beranda</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/layanan"
                      onClick={(e) => onNavClick(e, navigateTo, '/layanan')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/layanan') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Daftar Layanan</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/produk"
                      onClick={(e) => onNavClick(e, navigateTo, '/produk')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/produk') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
                    >
                      <Plane className="w-5 h-5" />
                      <span>Lihat Pilihan Perjalanan</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      onClick={(e) => onNavClick(e, navigateTo, '/blog')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentPath.startsWith('/blog') ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'}`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Blog & Artikel</span>
                    </a>
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
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {renderCurrentView()}
        </main>

        {/* 5. FOOTER SITE COMPONENT */}
        {/* FOOTER */}
        <footer className="border-t border-slate-200 bg-white pt-12 pb-[calc(70px+env(safe-area-inset-bottom))] text-slate-600 shadow-xs md:pb-12">
          <div className="container-site flex flex-col justify-between gap-10 md:flex-row">
            <div className="md:w-1/3 space-y-4">
              {/* Brand */}
              <a href="/" onClick={(e) => onNavClick(e, navigateTo, '/')} className="cursor-pointer group w-fit inline-block mb-2" aria-label="X3 Organizer — beranda">
                <img src="/images/brand/x3-organizer-logo.png" width="512" height="512" alt="" className="h-14 lg:h-16 w-auto object-contain drop-shadow-sm transition-transform duration-300" />
              </a>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                Layanan spesialis perjalanan domestik dan internasional dengan pengalaman tak terlupakan.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/x3organizer/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-colors p-1 -ml-1" aria-label="Visit our Instagram"><Instagram className="w-4 h-4" /></a>
                <a href="https://www.tiktok.com/@x3organizer" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-colors p-1" aria-label="Visit our TikTok">
                  {(() => {
                    const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
                      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
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
                  <li><a href="/tentang-kami" onClick={(e) => onNavClick(e, navigateTo, '/tentang-kami')} className="hover:text-slate-900 transition">Tentang Kami</a></li>
                  <li><a href="/blog" onClick={(e) => onNavClick(e, navigateTo, '/blog')} className="hover:text-slate-900 transition">Blog & Artikel</a></li>
                  <li><a href="/karir" onClick={(e) => onNavClick(e, navigateTo, '/karir')} className="hover:text-slate-900 transition">Karir / Careers</a></li>
                </ul>
              </div>

              {/* Kolom 2 */}
              <div className="space-y-4">
                <h3 className="text-slate-900 font-bold text-xs">Layanan</h3>
                <ul className="space-y-2.5 text-slate-500 text-xs font-medium">
                  <li><a href="/produk" onClick={(e) => onNavClick(e, navigateTo, '/produk')} className="hover:text-slate-900 transition">Paket Open Trip</a></li>
                  <li><a href="/layanan/private-trip" onClick={(e) => onNavClick(e, navigateTo, '/layanan/private-trip')} className="hover:text-slate-900 transition">Private Tour</a></li>
                  <li><a href="/layanan/corporate-outing" onClick={(e) => onNavClick(e, navigateTo, '/layanan/corporate-outing')} className="hover:text-slate-900 transition">Corporate Outing</a></li>
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

          <div className="container-site mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row">
            <p>© 2026 PT. Xthree Navigasi Internasional. Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
              <a href="/syarat-ketentuan" onClick={(e) => onNavClick(e, navigateTo, '/syarat-ketentuan')} className="hover:text-slate-600 transition">Syarat & Ketentuan</a>
              <a href="/kebijakan-privasi" onClick={(e) => onNavClick(e, navigateTo, '/kebijakan-privasi')} className="hover:text-slate-600 transition">Kebijakan Privasi</a>
            </div>
          </div>
        </footer>

        {/* 6. BOTTOM NAVIGATION (Mobile optimized finger tap as requested) */}
        <nav aria-label="Navigasi bawah" className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] z-40 flex items-stretch justify-around text-xs text-slate-500 font-bold tracking-wide font-sans transition-all pb-[calc(10px+env(safe-area-inset-bottom))] pt-2">
          <a
            href="/"
            onClick={(e) => onNavClick(e, navigateTo, '/')}
            aria-current={pathMatches(currentPath, '/') ? 'page' : undefined}
            aria-label="Home"
            className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/') ? 'text-primary-blue font-extrabold' : ''}`}
          >
            <Compass className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/') ? 'text-primary-blue' : 'text-slate-500'}`} />
            <span>Home</span>
          </a>
          <a
            href="/produk"
            onClick={(e) => onNavClick(e, navigateTo, '/produk')}
            aria-current={pathMatches(currentPath, '/produk') ? 'page' : undefined}
            aria-label="Paket Trip"
            className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/produk') ? 'text-primary-blue font-extrabold' : ''}`}
          >
            <Tag className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/produk') ? 'text-primary-blue' : 'text-slate-500'}`} />
            <span>Paket</span>
          </a>
          <a
            href="/layanan"
            onClick={(e) => onNavClick(e, navigateTo, '/layanan')}
            aria-current={pathMatches(currentPath, '/layanan') ? 'page' : undefined}
            aria-label="Layanan"
            className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/layanan') ? 'text-primary-blue font-extrabold' : ''}`}
          >
            <Users className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/layanan') ? 'text-primary-blue' : 'text-slate-500'}`} />
            <span>Layanan</span>
          </a>
          <a
            href="/blog"
            onClick={(e) => onNavClick(e, navigateTo, '/blog')}
            aria-current={pathMatches(currentPath, '/blog') ? 'page' : undefined}
            aria-label="Blog"
            className={`touch-target flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0 ${pathMatches(currentPath, '/blog') ? 'text-primary-blue font-extrabold' : ''}`}
          >
            <MessageSquare className={`w-5 h-5 shrink-0 ${pathMatches(currentPath, '/blog') ? 'text-primary-blue' : 'text-slate-500'}`} />
            <span>Blog</span>
          </a>
        </nav>

        {/* 7. FLOATING WHATSAPP BUTTON (persistent, non-obscured layout) */}
        <button
          onClick={handleGeneralWa}
          aria-label="Hubungi via WhatsApp" className={`fixed max-md:bottom-[calc(90px+env(safe-area-inset-bottom))] md:bottom-10 right-6 md:right-10 bg-whatsapp hover:bg-whatsapp-hover text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 z-[35] group ring-4 ring-whatsapp/20 hover:ring-whatsapp/40 ${hideFabOnMobile ? 'max-md:hidden' : ''}`}
        >
          <Phone className="w-6 h-6 fill-current text-white block" />
          <span className="absolute bg-slate-900 text-white text-xs py-1 px-2.5 font-bold rounded-lg border border-slate-800 right-14 top-1.5 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
            Hotline 24 Jam
          </span>
        </button>

      </div>

    </div>
  );
}