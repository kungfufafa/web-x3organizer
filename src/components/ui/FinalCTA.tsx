import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';
import { Section } from './Section';
import { Eyebrow } from './Badge';

interface FinalCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  onWhatsApp: () => void;
  onNavigate?: (path: string) => void;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  eyebrow = 'Rencanakan Sekarang',
  title = 'Siap berangkat dengan alur jelas?',
  description = 'Kirim tujuan, jumlah peserta, dan perkiraan tanggal. Tim X3 Organizer akan bantu arahkan format trip yang paling masuk akal untuk budget dan ritme rombongan Anda.',
  onWhatsApp,
  onNavigate,
  secondaryLabel = 'Bandingkan Paket',
  secondaryHref = '/produk',
}) => (
  <Section surface="dark" density="hero" container="none" overflow="hidden" className="relative">
    <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block" aria-hidden="true">
      <img src="/images/destinations/bali-coastal-temple.jpg" alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/25" />
    </div>
    <Container variant="site" className="section-cta relative z-10">
      <div className="max-w-3xl">
        <Eyebrow className="text-amber-400">{eyebrow}</Eyebrow>
        <h2 className="measure-section-title mt-4 font-display text-display-section font-bold leading-tight text-white">
          {title}
        </h2>
        <p className="measure-lead mt-6 text-lg leading-relaxed text-slate-300 md:text-xl">{description}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button variant="whatsapp" size="lg" onClick={onWhatsApp} className="shadow-card-hover">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Tanya via WhatsApp
          </Button>
          {onNavigate && (
            <Button variant="outlineOnDark" size="lg" onClick={() => onNavigate(secondaryHref)}>
              {secondaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </Container>
  </Section>
);
