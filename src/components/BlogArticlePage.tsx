import { MessageCircle, ChevronRight } from 'lucide-react'
import { COMPANY } from '@/lib/company'
import type { BlogPost } from '@/lib/blogPosts'

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
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[#5A7A9F]">
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

export function BlogArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link to={post.path}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#C99F5F]/40 hover:shadow-lg transition-all block">
      <div className="h-48 bg-[#ABB6BF] overflow-hidden">
        <img src={post.img} alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-5">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#EEF2F8] text-[#113356] rounded-full mb-3">{post.tag}</span>
        <h3 className="font-bold text-[#0B2542] text-lg mb-2 leading-snug group-hover:text-[#1A436D] transition-colors">{post.title}</h3>
        <p className="text-[#5A7A9F] text-sm leading-relaxed mb-3">{post.excerpt}</p>
        <p className="text-xs text-[#ABB6BF]">{post.date}</p>
      </div>
    </Link>
  )
}

export function BlogArticlePage({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return (
    <div className="pt-14 lg:pt-18">
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Breadcrumb items={[
            { label: 'Beranda', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: post.tag },
          ]} />
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#EEF2F8] text-[#113356] rounded-full mb-4">{post.tag}</span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B2542] mb-4 leading-tight">{post.h1}</h1>
          <p className="text-[#5A7A9F] text-sm mb-8 flex items-center gap-3">
            <span>{COMPANY.brandName}</span>
            <span>·</span>
            <time dateTime={post.dateIso}>{post.date}</time>
          </p>
          <div className="rounded-2xl overflow-hidden h-64 bg-[#ABB6BF] mb-10">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <article className="prose max-w-none text-[#4A6080] leading-relaxed space-y-6">
            {post.sections.map((section, i) =>
              section.type === 'h2' ? (
                <h2 key={i} className="text-xl font-bold text-[#0B2542] !mt-10 !mb-3">{section.content}</h2>
              ) : (
                <p key={i} className={i === 0 ? 'text-lg font-medium text-[#0B2542]' : undefined}>{section.content}</p>
              ),
            )}
          </article>
          <div className="mt-12 p-6 bg-[#F5F8FC] rounded-2xl border border-[#E2E8F0]">
            <p className="font-bold text-[#0B2542] mb-2">Butuh Bantuan Merencanakan Perjalanan?</p>
            <p className="text-[#5A7A9F] text-sm mb-4">Tim {COMPANY.brandName} siap membantu dari tahap konsultasi hingga koordinasi hari H. Konsultasi gratis.</p>
            <a href={WA(post.waMsg)} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C99F5F] text-white text-sm font-semibold rounded-lg hover:bg-[#B8904F] transition-colors">
              <MessageCircle size={15} /> Konsultasi via WhatsApp
            </a>
          </div>
          {related.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
              <p className="text-[#5A7A9F] text-sm mb-4">Artikel terkait:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p) => <BlogArticleCard key={p.slug} post={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
