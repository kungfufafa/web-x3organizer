import React from 'react';
import { Compass, Home, Search } from 'lucide-react';
import { Button, Section } from '../components/ui';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
}

export default function NotFoundView({ onNavigate }: NotFoundViewProps) {
  return (
    <Section surface="page" density="default" container="content">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-amber-600">404</p>
        <h1 className="mt-4 font-display text-display-section font-bold text-slate-900">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Tautan yang Anda buka tidak tersedia. Kembali ke beranda atau langsung lihat katalog paket trip X3 Organizer.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => onNavigate('/')}>
            <Home className="h-4 w-4" aria-hidden="true" />
            Beranda
          </Button>
          <Button variant="outline" size="lg" onClick={() => onNavigate('/produk')}>
            <Search className="h-4 w-4" aria-hidden="true" />
            Lihat Paket
          </Button>
        </div>
      </div>
    </Section>
  );
}
