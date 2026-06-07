/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { resolvePageSeo, getOrganizationSchema } from '../lib/seo';

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
    const canonical = `${window.location.origin}${seo.path}`;

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', seo.type ?? 'website');
    upsertMeta('property', 'og:site_name', 'X3 Organizer');
    upsertMeta('property', 'og:locale', 'id_ID');
    if (seo.image) {
      const imageUrl = seo.image.startsWith('http') ? seo.image : `${window.location.origin}${seo.image}`;
      upsertMeta('property', 'og:image', imageUrl);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);

    if (path === '/') {
      upsertJsonLd('jsonld-organization', getOrganizationSchema());
    } else {
      document.getElementById('jsonld-organization')?.remove();
    }
  }, [path]);
}
