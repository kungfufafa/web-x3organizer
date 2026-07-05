import { COMPANY } from './company'

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://www.x3organizer.com'

/**
 * Profil resmi yang sudah diverifikasi (Juli 2026).
 * Hanya masukkan URL yang benar-benar aktif — jangan tebak slug Facebook/dll.
 */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/x3organizer/',
  tiktok: 'https://www.tiktok.com/@x3organizer',
  threads: 'https://www.threads.net/@x3organizer',
  youtube: 'https://www.youtube.com/@X3Organizer',
  linkedin: 'https://www.linkedin.com/company/pt-xthree-navigasi-internasional',
  twitter: 'https://x.com/X3Organizer',
  whatsapp: `https://wa.me/${COMPANY.phoneWa}`,
} as const

/** Handle X/Twitter resmi (case-sensitive) */
export const TWITTER_HANDLE = '@X3Organizer'

/** Handle Threads resmi */
export const THREADS_HANDLE = '@x3organizer'

export type SocialPlatform = keyof typeof SOCIAL_LINKS

/** Label human-readable untuk UTM source → pesan WhatsApp */
export const UTM_SOURCE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  threads: 'Threads',
  twitter: 'Twitter/X',
  whatsapp: 'WhatsApp',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

export const SOCIAL_PROFILES = [
  { platform: 'instagram' as const, label: 'Instagram @x3organizer', href: SOCIAL_LINKS.instagram },
  { platform: 'tiktok' as const, label: 'TikTok @x3organizer', href: SOCIAL_LINKS.tiktok },
  { platform: 'threads' as const, label: 'Threads @x3organizer', href: SOCIAL_LINKS.threads },
  { platform: 'youtube' as const, label: 'YouTube X3 Organizer', href: SOCIAL_LINKS.youtube },
  { platform: 'linkedin' as const, label: 'LinkedIn PT Xthree Navigasi Internasional', href: SOCIAL_LINKS.linkedin },
  { platform: 'twitter' as const, label: 'X @X3Organizer', href: SOCIAL_LINKS.twitter },
] as const

export type SocialProfilePlatform = (typeof SOCIAL_PROFILES)[number]['platform']

export function getSameAsUrls(): string[] {
  return SOCIAL_PROFILES.map((p) => p.href)
}

export function utmSourceLabel(source: string): string {
  return UTM_SOURCE_LABELS[source.toLowerCase()] ?? source
}
