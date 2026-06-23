/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { toAbsoluteUrl } from '../data/media';
import { resolvePageSeo, getCanonicalUrl, getOrganizationSchema, getWebSiteSchema, getFaqPageSchema } from '../lib/seo';
import { HOME_FAQ_ITEMS } from '../data/faq';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function usePageSeo(path: string) {
  useEffect(() => {
    const seo = resolvePageSeo(path);
    const canonical = getCanonicalUrl(path);

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots ?? 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', seo.type ?? 'website');
    upsertMeta('property', 'og:site_name', 'X3 Organizer');
    upsertMeta('property', 'og:locale', 'id_ID');
    if (seo.image) {
      const imageUrl = toAbsoluteUrl(seo.image);
      upsertMeta('property', 'og:image', imageUrl);
      upsertMeta('property', 'og:image:width', String(seo.imageWidth ?? 1200));
      upsertMeta('property', 'og:image:height', String(seo.imageHeight ?? 630));
      upsertMeta('property', 'og:image:type', seo.imageType ?? 'image/jpeg');
      upsertMeta('property', 'og:image:alt', seo.imageAlt ?? seo.title);
      upsertMeta('name', 'twitter:image', imageUrl);
      upsertMeta('name', 'twitter:image:alt', seo.imageAlt ?? seo.title);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);

    if (path === '/') {
      upsertJsonLd('jsonld-organization', getOrganizationSchema());
      upsertJsonLd('jsonld-website', getWebSiteSchema());
      upsertJsonLd('jsonld-faq', getFaqPageSchema(HOME_FAQ_ITEMS));
    } else {
      document.getElementById('jsonld-organization')?.remove();
      document.getElementById('jsonld-website')?.remove();
      document.getElementById('jsonld-faq')?.remove();
    }
  }, [path]);
}
