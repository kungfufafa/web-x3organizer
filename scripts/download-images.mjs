#!/usr/bin/env node
import { mkdir, writeFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'images')

/** @type {Record<string, string>} */
const ASSETS = {
  'services/group-trip.jpg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=920&fit=crop&auto=format&q=80',
  'services/team-building.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=920&fit=crop&auto=format&q=80',
  'services/kampus-institusi.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&h=920&fit=crop&auto=format&q=80',
  'services/family-trip.jpg': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&h=920&fit=crop&auto=format&q=80',
  'services/open-trip.jpg': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=920&fit=crop&auto=format&q=80',
  'packages/family-trip-batu-malang.jpg': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=920&fit=crop&auto=format&q=80',
  'packages/outing-bromo.jpg': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=920&fit=crop&auto=format&q=80',
  'packages/nusa-penida.jpg': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/batu-malang.jpg': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/bromo.jpg': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/bali-nusa-penida.jpg': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/jogja.jpg': 'https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/lombok.jpg': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&h=920&fit=crop&auto=format&q=80',
  'destinations/banyuwangi.jpg': 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1400&h=920&fit=crop&auto=format&q=80',
  'blog/tips-outing-batu-malang.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=920&fit=crop&auto=format&q=80',
  'blog/panduan-wisata-bromo.jpg': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=920&fit=crop&auto=format&q=80',
  'blog/rekomendasi-nusa-penida.jpg': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/gathering-bromo.jpg': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/team-building-batu.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/open-trip-nusa-penida.jpg': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/family-trip-bali.jpg': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/campus-trip-jogja.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&h=920&fit=crop&auto=format&q=80',
  'social/kawah-ijen.jpg': 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1400&h=920&fit=crop&auto=format&q=80',
  'hero/home-group-travel.jpg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&h=1360&fit=crop&auto=format&q=80',
  'hero/why-x3-coordinator.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=1750&fit=crop&auto=format&q=80',
  'hero/tentang-mountains.jpg': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&h=1000&fit=crop&auto=format&q=80',
  'hero/kontak-office.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&h=1000&fit=crop&auto=format&q=80',
  'experiences/gathering-perusahaan.jpg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=1040&fit=crop&auto=format&q=80',
  'experiences/family-trip-custom.jpg': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=1040&fit=crop&auto=format&q=80',
  'experiences/team-building-program.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=1040&fit=crop&auto=format&q=80',
}

async function download(relativePath, url) {
  const dest = path.join(outDir, relativePath)
  try {
    await access(dest, constants.F_OK)
    console.log(`· ${relativePath} (exists)`)
    return
  } catch {}
  await mkdir(path.dirname(dest), { recursive: true })
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${relativePath}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  console.log(`✓ ${relativePath}`)
}

await Promise.all(Object.entries(ASSETS).map(([rel, url]) => download(rel, url)))
console.log(`\nDownloaded ${Object.keys(ASSETS).length} images to public/images/`)
