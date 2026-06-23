import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Breadcrumbs, FinalCTA, PageHero, Section } from '../components/ui';

interface StaticPageViewProps {
  title: string;
  eyebrow?: string;
  onNavigate: (route: string) => void;
  onWhatsApp?: () => void;
  children: React.ReactNode;
}

export default function StaticPageView({
  title,
  eyebrow,
  onNavigate,
  onWhatsApp,
  children,
}: StaticPageViewProps) {
  const isLegal = eyebrow === 'Legal';

  return (
    <div className="w-full bg-surface-page text-slate-900">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={
          isLegal
            ? 'Informasi resmi yang membantu Anda memahami ketentuan layanan X3 Organizer.'
            : 'Cerita, prinsip layanan, dan informasi penting seputar X3 Organizer.'
        }
        centered
        density="compact"
      >
        <Breadcrumbs
          inverted
          onNavigate={onNavigate}
          className="mt-8 flex justify-center"
          items={[
            { label: 'Beranda', href: '/' },
            { label: title },
          ]}
        />
      </PageHero>

      <Section surface="card" density={isLegal ? 'default' : 'spacious'} container="prose">
        <article className="prose prose-slate prose-lg max-w-prose prose-headings:font-display prose-headings:font-bold prose-a:text-brand-primary font-sans">
          {children}
        </article>
      </Section>

      {!isLegal && (
        <Section surface="page" density="default" container="site" bordered>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              'Itinerary transparan sebelum booking',
              'Admin WhatsApp untuk konsultasi langsung',
              'Format trip untuk individu, keluarga, dan perusahaan',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                <CheckCircle className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                <p className="mt-5 font-display text-xl font-bold leading-tight text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {onWhatsApp && (
        <FinalCTA
          eyebrow="Butuh bantuan?"
          title={isLegal ? 'Ada pertanyaan sebelum booking?' : 'Siap berdiskusi dengan admin?'}
          description="Hubungi tim X3 Organizer untuk klarifikasi layanan, jadwal, dan rekomendasi paket."
          onWhatsApp={onWhatsApp}
          onNavigate={onNavigate}
          secondaryLabel="Beranda"
          secondaryHref="/"
        />
      )}
    </div>
  );
}
