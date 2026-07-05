import { useEffect } from 'react'
import {
  getCanonicalUrl,
  getPageStructuredData,
  resolvePageSeo,
} from '@/lib/seo'
import { COMPANY } from '@/lib/company'
import { TWITTER_HANDLE } from '@/lib/social'

const JSON_LD_ID = 'x3-jsonld'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function setJsonLd(schemas: object[]) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = JSON_LD_ID
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
}

export function usePageSeo(path: string) {
  useEffect(() => {
    const seo = resolvePageSeo(path)
    const canonical = getCanonicalUrl(path)
    const imageUrl = seo.image ?? ''

    document.documentElement.lang = 'id'
    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.robots ?? 'index, follow')
    if (seo.keywords) upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'author', 'X3 Organizer')
    upsertMeta('name', 'theme-color', '#0B2542')
    upsertLink('canonical', canonical)

    // Open Graph — Facebook, Instagram link preview, WhatsApp, TikTok
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', seo.type ?? 'website')
    upsertMeta('property', 'og:site_name', 'X3 Organizer')
    upsertMeta('property', 'og:locale', 'id_ID')

    if (imageUrl) {
      upsertMeta('property', 'og:image', imageUrl)
      upsertMeta('property', 'og:image:secure_url', imageUrl)
      upsertMeta('property', 'og:image:width', String(seo.imageWidth ?? 1200))
      upsertMeta('property', 'og:image:height', String(seo.imageHeight ?? 630))
      upsertMeta('property', 'og:image:type', seo.imageType ?? 'image/jpeg')
      upsertMeta('property', 'og:image:alt', seo.imageAlt ?? seo.title)
    }

    // Twitter / X Cards
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:site', TWITTER_HANDLE)
    upsertMeta('name', 'twitter:creator', TWITTER_HANDLE)
    if (imageUrl) {
      upsertMeta('name', 'twitter:image', imageUrl)
      upsertMeta('name', 'twitter:image:alt', seo.imageAlt ?? seo.title)
    }

    // WhatsApp & mobile sharing hints
    upsertMeta('property', 'og:phone_number', `+${COMPANY.phoneWa}`)

    if (!seo.noStructuredData) {
      setJsonLd(getPageStructuredData(path, seo))
    }
  }, [path])
}
