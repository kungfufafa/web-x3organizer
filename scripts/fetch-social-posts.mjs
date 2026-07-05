#!/usr/bin/env node
/**
 * Sinkronkan konten sosial @x3organizer dari Instagram & TikTok.
 * - Instagram: API web_profile_info (X-IG-App-ID publik)
 * - TikTok: tikwm.com API
 *
 * Usage: npm run social:fetch
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'images', 'social')
const outFile = path.join(root, 'src', 'lib', 'socialPosts.ts')

const IG_APP_ID = '936619743392459'
const IG_UA = 'Instagram 76.0.0.15.395 (iPhone13,2; iOS 11_4 like Mac OS X)'

/** @typedef {{ id: string; platform: 'instagram' | 'tiktok'; postUrl: string; thumbnailUrl: string; title: string; shortCaption: string; destination?: string; servicePath?: string; detailPath?: string; serviceLabel?: string; featured?: boolean; waContext: string }} SocialPost */

/** @param {string} url @param {string} dest */
async function downloadImage(url, dest, referer = 'https://www.instagram.com/') {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Referer: referer },
  })
  if (!res.ok) throw new Error(`Download failed ${dest}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  ensureJpeg(dest)
  console.log(`✓ ${path.basename(dest)}`)
}

/** Pastikan thumbnail browser-safe (.jpg benar-benar JPEG, bukan WebP/HEIF) */
function ensureJpeg(dest) {
  const probe = spawnSync('file', ['-b', '--mime-type', dest], { encoding: 'utf8' })
  const mime = probe.stdout?.trim() ?? ''
  if (mime === 'image/jpeg') return
  const convert = spawnSync('python3', [
    '-c',
    `from PIL import Image; img=Image.open(${JSON.stringify(dest)}).convert("RGB"); img.save(${JSON.stringify(dest)}, "JPEG", quality=85, optimize=True)`,
  ], { encoding: 'utf8' })
  if (convert.status !== 0) {
    throw new Error(`Could not convert ${dest} to JPEG: ${convert.stderr}`)
  }
}

/** @param {string} text @param {number} max */
function truncate(text, max) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean
}

async function fetchInstagramPosts() {
  const res = await fetch(
    'https://www.instagram.com/api/v1/users/web_profile_info/?username=x3organizer',
    { headers: { 'User-Agent': IG_UA, 'X-IG-App-ID': IG_APP_ID } },
  )
  if (!res.ok) throw new Error(`Instagram API: ${res.status}`)
  const data = await res.json()
  /** @type {Record<string, object>} */
  const byCode = {}
  for (const edge of data.data.user.edge_owner_to_timeline_media.edges) {
    byCode[edge.node.shortcode] = edge.node
  }
  return byCode
}

async function fetchTikTokVideos() {
  const res = await fetch('https://www.tikwm.com/api/user/posts?unique_id=x3organizer&count=20', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!res.ok) throw new Error(`TikTok API: ${res.status}`)
  const data = await res.json()
  if (data.code !== 0) throw new Error(`TikTok API: ${data.msg}`)
  /** @type {Record<string, object>} */
  const byId = {}
  for (const v of data.data.videos) byId[v.video_id] = v
  return byId
}

/** @param {object} node @param {'reel'|'p'} typ @param {string} code */
function igPostUrl(node, code) {
  const isVideo = node.is_video
  const typ = isVideo ? 'reel' : 'p'
  return `https://www.instagram.com/${typ}/${code}/`
}

/** @param {object} node */
function igCaption(node) {
  const edges = node.edge_media_to_caption?.edges ?? []
  return edges[0]?.node?.text ?? ''
}

/** Curated mapping — edit shortcodes/video_ids to change featured posts */
const IG_SELECTION = [
  {
    code: 'DL4nkAavHIj',
    file: 'ig-gathering-service',
    featured: true,
    servicePath: '/layanan/group-trip',
    detailPath: '/gathering-perusahaan-cirebon',
    serviceLabel: 'Group Trip',
    waContext: 'gathering perusahaan seperti di Instagram X3',
    titleOverride: 'Company & Family Gathering — X3organizer Siap Wujudkan',
  },
  {
    code: 'DKcRDJCvaV0',
    file: 'ig-adventure-jeep',
    destination: 'Bromo & Jawa Timur',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/bromo',
    serviceLabel: 'Open Trip',
    waContext: 'pengalaman liburan outdoor seperti di Instagram X3',
    titleOverride: 'Pengalaman Baru — Jeep, VW Klasik & Jelajah Alam',
  },
  {
    code: 'DYwN60lvGcj',
    file: 'ig-karimunjawa-ypsh',
    destination: 'Karimun Jawa',
    servicePath: '/layanan/kampus-institusi',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Kampus & Institusi',
    waContext: 'trip sekolah ke Karimun Jawa seperti di Instagram X3',
    titleOverride: 'Trip Karimun Jawa Bersama YPSH — Seru & Tak Terlupakan',
  },
]

const TK_SELECTION = [
  {
    videoId: '7643724918206549255',
    file: 'tk-karimunjawa-ypsh',
    destination: 'Karimun Jawa',
    servicePath: '/layanan/kampus-institusi',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Kampus & Institusi',
    waContext: 'trip Karimun Jawa seperti di TikTok X3',
    titleOverride: 'Trip Karimun Jawa Bersama YPSH — Kebersamaan Itu Indah',
  },
  {
    videoId: '7575546960950594834',
    file: 'tk-liburan-jogja',
    destination: 'Jogja',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/jogja',
    serviceLabel: 'Open Trip',
    waContext: 'liburan ke Jogja seperti di TikTok X3',
    titleOverride: 'Liburan ke Jogja — Jangan Cuma Diem di Rumah!',
  },
  {
    videoId: '7557755355032259848',
    file: 'tk-banyuwangi-green-island',
    destination: 'Banyuwangi',
    servicePath: '/layanan/open-trip',
    detailPath: '/destinasi/banyuwangi',
    serviceLabel: 'Open Trip',
    waContext: 'rekomendasi wisata Banyuwangi seperti di TikTok X3',
    titleOverride: 'Rekomendasi Wisata Banyuwangi — Green Island & Hutan Djawatan',
  },
]

/** @param {SocialPost[]} posts */
function renderTs(posts) {
  const lines = posts.map((p) => {
    const fields = [
      `id: '${p.id}'`,
      `platform: '${p.platform}'`,
      `postUrl: '${p.postUrl}'`,
      `thumbnailUrl: '${p.thumbnailUrl}'`,
      `title: ${JSON.stringify(p.title)}`,
      `shortCaption: ${JSON.stringify(p.shortCaption)}`,
    ]
    if (p.destination) fields.push(`destination: ${JSON.stringify(p.destination)}`)
    if (p.servicePath) fields.push(`servicePath: '${p.servicePath}'`)
    if (p.detailPath) fields.push(`detailPath: '${p.detailPath}'`)
    if (p.serviceLabel) fields.push(`serviceLabel: '${p.serviceLabel}'`)
    if (p.featured) fields.push('featured: true')
    fields.push(`waContext: ${JSON.stringify(p.waContext)}`)
    return `  {\n    ${fields.join(',\n    ')},\n  }`
  })

  return `/**
 * Konten sosial @x3organizer — diperbarui otomatis via \`npm run social:fetch\`.
 * Terakhir di-fetch: ${new Date().toISOString().slice(0, 10)}
 */
export type SocialPost = {
  id: string
  platform: 'instagram' | 'tiktok'
  postUrl: string
  thumbnailUrl: string
  title: string
  shortCaption: string
  destination?: string
  servicePath?: string
  detailPath?: string
  serviceLabel?: string
  featured?: boolean
  waContext: string
}

export const SOCIAL_POSTS: SocialPost[] = [
${lines.join(',\n')},
]
`
}

await mkdir(outDir, { recursive: true })

const [igByCode, tkById] = await Promise.all([fetchInstagramPosts(), fetchTikTokVideos()])
/** @type {SocialPost[]} */
const posts = []

for (const sel of IG_SELECTION) {
  const node = igByCode[sel.code]
  if (!node) throw new Error(`Instagram post ${sel.code} not found`)
  const caption = igCaption(node)
  const thumbUrl = node.display_url || node.thumbnail_src
  const localPath = `/images/social/${sel.file}.jpg`
  await downloadImage(thumbUrl, path.join(outDir, `${sel.file}.jpg`))
  posts.push({
    id: sel.file,
    platform: 'instagram',
    postUrl: igPostUrl(node, sel.code),
    thumbnailUrl: localPath,
    title: sel.titleOverride ?? truncate(caption, 80),
    shortCaption: truncate(caption, 160),
    destination: sel.destination,
    servicePath: sel.servicePath,
    detailPath: sel.detailPath,
    serviceLabel: sel.serviceLabel,
    featured: sel.featured,
    waContext: sel.waContext,
  })
}

for (const sel of TK_SELECTION) {
  const v = tkById[sel.videoId]
  if (!v) throw new Error(`TikTok video ${sel.videoId} not found`)
  const caption = v.title || ''
  const cover = v.cover || v.origin_cover
  const localPath = `/images/social/${sel.file}.jpg`
  await downloadImage(cover, path.join(outDir, `${sel.file}.jpg`), 'https://www.tiktok.com/@x3organizer')
  posts.push({
    id: sel.file,
    platform: 'tiktok',
    postUrl: `https://www.tiktok.com/@x3organizer/video/${sel.videoId}`,
    thumbnailUrl: localPath,
    title: sel.titleOverride ?? truncate(caption, 80),
    shortCaption: truncate(caption, 160),
    destination: sel.destination,
    servicePath: sel.servicePath,
    detailPath: sel.detailPath,
    serviceLabel: sel.serviceLabel,
    waContext: sel.waContext,
  })
}

await writeFile(outFile, renderTs(posts))
console.log(`\nUpdated ${posts.length} posts → src/lib/socialPosts.ts`)
