import { useState } from 'react'
import { MessageCircle, CheckCircle, ChevronDown, ChevronRight, MapPin } from 'lucide-react'
import { COMPANY } from '@/lib/company'
import type { LandingConfig } from '@/lib/landingPages'

const WA = (msg: string) => `https://wa.me/${COMPANY.phoneWa}?text=${encodeURIComponent(msg)}`

function Link({
  to, children, className = '',
}: { to: string; children: React.ReactNode; className?: string }) {
  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
    window.scrollTo({ top: 0 })
  }
  return (
    <a href={to} className={className}
      onClick={(e) => { e.preventDefault(); navigate(to) }}>
      {children}
    </a>
  )
}

function Breadcrumb({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 hidden items-center gap-2 text-sm text-[#5A7A9F] lg:mb-8 lg:flex">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} />}
          {item.path ? (
            <Link to={item.path} className="hover:text-[#0B2542] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#0B2542] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-[#E2E8F0]">
      {items.map((item, i) => (
        <div key={i}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between py-5 text-left gap-6">
            <span className="font-semibold text-[#0B2542] leading-snug">{item.q}</span>
            <ChevronDown size={18}
              className={`text-[#C99F5F] flex-shrink-0 mt-0.5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all ${open === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
            <p className="text-[#5A7A9F] leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SeoLandingPage({ config }: { config: LandingConfig }) {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[
            { label: 'Beranda', path: '/' },
            ...(config.path.startsWith('/destinasi')
              ? [{ label: 'Destinasi', path: '/destinasi' }]
              : []),
            { label: config.h1.split('—')[0].trim().slice(0, 40) },
          ]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C99F5F] text-xs font-bold tracking-[0.2em] uppercase mb-4">{config.eyebrow}</p>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#0B2542] mb-5 leading-tight">{config.h1}</h1>
              <p className="text-[#5A7A9F] text-lg leading-relaxed mb-6">{config.sub}</p>
              <p className="flex items-center gap-2 text-sm text-[#5A7A9F] mb-8">
                <MapPin size={14} className="text-[#C99F5F]" />
                {COMPANY.address}
              </p>
              <a href={WA(config.waMsg)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-all hover:shadow-lg">
                <MessageCircle size={16} /> Konsultasi Gratis via WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#ABB6BF] shadow-xl">
              <img src={config.image} alt={config.imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0B2542] mb-10">Mengapa {COMPANY.brandName}?</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {config.highlights.map((h) => (
              <li key={h} className="flex gap-3 bg-white p-5 rounded-xl border border-[#E2E8F0]">
                <CheckCircle size={18} className="text-[#C99F5F] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A6080] text-sm leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(config.sections?.length ?? 0) > 0 && (
        <section className="bg-white py-16 lg:py-20 border-b border-[#E2E8F0]">
          <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-10">
            {config.sections!.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-[#0B2542] mb-4">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="text-[#5A7A9F] leading-relaxed mb-4 last:mb-0">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0B2542] mb-6">Lihat Juga</h2>
          <div className="flex flex-wrap gap-3">
            {config.relatedLinks.map((l) => (
              <Link key={l.path} to={l.path}
                className="px-4 py-2.5 bg-[#F5F8FC] border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#0B2542] hover:border-[#C99F5F]/60 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F8FC] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0B2542] mb-8 text-center">Pertanyaan Umum</h2>
          <FaqBlock items={config.faq} />
        </div>
      </section>

      <section className="bg-[#0B2542] py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Siap Merencanakan Perjalanan?</h2>
          <p className="text-white/70 mb-8">Konsultasi gratis — ceritakan kebutuhan grup Anda.</p>
          <a href={WA(config.waMsg)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C99F5F] text-white font-semibold rounded-xl hover:bg-[#B8904F] transition-colors">
            <MessageCircle size={17} /> Hubungi X3 Organizer
          </a>
        </div>
      </section>
    </div>
  )
}
