/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialBlogArtikel, initialPaketTrip, initialDestinasi } from '../data';
import { ArrowRight, BookOpen, Calendar, Search } from 'lucide-react';
import { PaketTrip } from '../types';
import {
  PageHero,
  Button,
  Card,
  Input,
  Section,
  SectionHeader,
  Breadcrumbs,
  ResponsiveImage,
  FinalCTA,
} from '../components/ui';

// ==========================================
// 1. BLOG LISTING VIEW (/blog)
// ==========================================
interface BlogListingProps {
  onNavigate: (route: string) => void;
  onTanyaAdmin: (packageItemOrMsg: PaketTrip | string) => void;
}

export const BlogListingView: React.FC<BlogListingProps> = ({ onNavigate, onTanyaAdmin }) => {
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
    <div id="blog-listing-container" className="w-full font-sans bg-surface-page text-slate-900">
      <PageHero
        eyebrow="Jurnal Perjalanan"
        title="Cerita & Inspirasi"
        subtitle="Panduan perjalanan, rekomendasi rute, dan tips praktis dari tim X3 Organizer—disusun untuk membantu Anda merencanakan liburan dengan lebih yakin."
        density="compact"
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

      <Section
        density="compact"
        surface="card"
        container="site"
        className="sticky top-[calc(var(--layout-header-height)+1rem)] z-20 border-b border-slate-100 shadow-sm !py-4"
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-none items-center justify-start lg:justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 tracking-wider ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      <Section density="default" surface="card" container="site">
        {searchTerm === '' && activeCategory === 'Semua' && featuredArticle && (
          <a
            href={`/blog/${featuredArticle.slug}`}
            onClick={(e) => {
              if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              onNavigate(`/blog/${featuredArticle.slug}`);
            }}
            className="group grid w-full grid-cols-1 items-start gap-8 text-left mb-16 border-b border-slate-100 pb-12 lg:grid-cols-12"
            aria-label={`Baca artikel: ${featuredArticle.title}`}
          >
            <div className="lg:col-span-7 aspect-[16/10] rounded-2xl relative overflow-hidden shadow-md border border-slate-100 bg-slate-50">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-bold py-1.5 px-3 rounded-full shadow-sm tracking-wider uppercase border border-slate-100">
                Sorotan Utama
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col space-y-4 lg:pr-4 font-sans">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-amber-600 uppercase tracking-wider">{featuredArticle.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{featuredArticle.published_at}</span>
              </div>

              <h2 className="font-display font-bold text-slate-900 text-2xl mt-1 md:text-3xl leading-tight group-hover:text-amber-600 transition-colors">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 font-sans">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-2 text-slate-900 font-bold tracking-wider text-xs group-hover:text-amber-600 transition-colors uppercase">
                Baca Selengkapnya
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        )}

        <div className="space-y-8">
          <SectionHeader
            align="left"
            width="wide"
            title={searchTerm || activeCategory !== 'Semua' ? 'Hasil Pencarian' : 'Artikel Terbaru'}
            description={`${filteredArticles.length} artikel`}
            className="!mb-8 border-b border-slate-200 pb-4"
          />

          {filteredArticles.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm font-sans">Tidak ada artikel yang sesuai dengan kriteria pencarian Anda.</p>
              <Button onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }} className="mt-2">
                Tampilkan Semua
              </Button>
            </div>
          ) : (
            <div className="grid-cards md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((art, index) => (
                <Card
                  id={`blog-grid-card-${art.id}`}
                  key={art.id}
                  href={`/blog/${art.slug}`}
                  onClick={() => onNavigate(`/blog/${art.slug}`)}
                  animateIndex={index}
                  className="group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-xl bg-slate-100 transition-transform duration-700 ease-out group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide uppercase font-sans">
                      {art.category}
                    </span>
                  </div>

                  <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 font-sans">
                      <span>{art.published_at}</span>
                    </div>

                    <h4 className="font-display font-bold text-slate-900 text-lg leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow font-sans">
                      {art.excerpt}
                    </p>

                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between font-sans">
                      <span className="text-slate-900 font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1.5 group-hover:text-brand-primary transition-colors">
                        Mulai Membaca
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>

      <FinalCTA
        eyebrow="Butuh rekomendasi?"
        title="Sudah punya destinasi impian?"
        description="Ceritakan rencana perjalanan Anda. Tim X3 Organizer siap bantu arahkan paket dan rute yang paling cocok."
        onWhatsApp={() =>
          onTanyaAdmin('Halo Admin, saya sedang membaca blog X3 Organizer dan ingin konsultasi rencana perjalanan.')
        }
        onNavigate={onNavigate}
        secondaryLabel="Lihat Paket Trip"
      />
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
  const article = initialBlogArtikel.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="p-6 text-center max-w-lg mx-auto space-y-4">
        <h1 className="text-xl font-bold text-rose-500">Artikel tidak ditemukan!</h1>
        <p className="text-slate-500">Harap kembali ke halaman blog untuk membaca list panduan resmi kami.</p>
        <Button href="/blog" onClick={() => onNavigate('/blog')}>Kembali ke Blog</Button>
      </div>
    );
  }

  const relatedPackages = initialPaketTrip.filter(p => article.related_package_ids.includes(p.id) && p.status === 'published');
  const relatedDests = initialDestinasi.filter(d => article.related_destinasi_ids.includes(d.id));

  return (
    <div id="blog-detail-root" className="w-full font-sans bg-surface-page text-slate-900">
      <PageHero
        eyebrow={article.category}
        title={article.title}
        subtitle={article.excerpt}
        density="compact"
        centered={false}
        media={
          <ResponsiveImage
            src={article.imageUrl}
            alt={article.title}
            aspect="aspect-[4/3] lg:aspect-[3/2]"
            loading="eager"
          />
        }
      >
        <Breadcrumbs
          inverted
          onNavigate={onNavigate}
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          {article.published_at}
        </div>
      </PageHero>

      <Section density="default" surface="card" container="site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-12">
            <article className="prose prose-slate prose-base md:prose-lg max-w-prose font-sans text-slate-700 leading-relaxed marker:text-amber-600 prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-primary hover:prose-a:text-brand-primary prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </article>

            {(relatedPackages.length > 0 || relatedDests.length > 0) && (
              <div className="mt-16 border-t border-slate-100 pt-8 font-sans">
                <h4 className="font-display font-bold text-slate-900 text-lg tracking-tight mb-6">Penawaran & Destinasi Terkait</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPackages.map(pkg => (
                    <a
                      key={pkg.id}
                      href={`/produk/${pkg.slug}`}
                      onClick={(e) => {
                        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        e.preventDefault();
                        onNavigate(`/produk/${pkg.slug}`);
                      }}
                      className="group bg-white border border-slate-200 p-4 rounded-xl hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-4"
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                        <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors font-display">{pkg.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1 tracking-wider font-bold">Mulai: {pkg.price_label}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-[calc(var(--layout-header-height)+1rem)] z-20">
            <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-900 relative flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-amber-500/15 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-6 font-sans">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-amber-500">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-2xl leading-tight tracking-tight">Wujudkan Liburan Impian Anda</h4>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  Tertarik mengikuti rute petualangan keindahan destinasi di dalam artikel ini? Konsultasikan perjalanan Anda sekarang.
                </p>
                <div className="pt-2">
                  <Button
                    variant="accent"
                    fullWidth
                    onClick={() => onTanyaAdmin(`Halo Admin, saya membaca artikel "${article.title}" dan tertarik untuk tanya-tanya.`)}
                  >
                    Tanya Rute di WA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FinalCTA
        eyebrow="Rencanakan Sekarang"
        title="Siap mewujudkan rencana perjalanan ini?"
        description="Hubungi admin X3 Organizer untuk konsultasi rute, jadwal keberangkatan, dan rekomendasi paket yang selaras dengan artikel yang Anda baca."
        onWhatsApp={() =>
          onTanyaAdmin(`Halo Admin, saya membaca artikel "${article.title}" dan ingin konsultasi paket perjalanan.`)
        }
        onNavigate={onNavigate}
        secondaryLabel="Lihat Paket Trip"
      />
    </div>
  );
};
