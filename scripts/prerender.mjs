/**
 * Post-build prerender — generates static HTML per route so crawlers
 * receive correct meta tags & content without waiting for JavaScript.
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const PORT = 4173
const BASE = `http://127.0.0.1:${PORT}`

const ROUTES = [
  '/',
  '/agen-travel-cirebon',
  '/gathering-perusahaan-cirebon',
  '/destinasi/bromo',
  '/destinasi/nusa-penida',
  '/destinasi/batu-malang',
  '/layanan',
  '/layanan/group-trip',
  '/layanan/team-building',
  '/layanan/kampus-institusi',
  '/layanan/family-trip',
  '/layanan/open-trip',
  '/paket',
  '/paket/family-trip-batu-malang',
  '/destinasi',
  '/inspirasi',
  '/pengalaman',
  '/tentang',
  '/blog',
  '/blog/tips-outing-kantor-batu-malang',
  '/blog/panduan-wisata-bromo-2026',
  '/blog/rekomendasi-destinasi-nusa-penida',
  '/kontak',
]

function waitForServer(ms = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const tick = async () => {
      try {
        const res = await fetch(BASE)
        if (res.ok) return resolve(undefined)
      } catch {
        /* retry */
      }
      if (Date.now() - start > ms) return reject(new Error('Preview server timeout'))
      setTimeout(tick, 300)
    }
    tick()
  })
}

function startPreview() {
  return spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

function outPath(route) {
  if (route === '/') return join(dist, 'index.html')
  return join(dist, route.slice(1), 'index.html')
}

async function main() {
  const server = startPreview()
  server.stderr?.on('data', (d) => process.stderr.write(d))

  try {
    await waitForServer()
    console.log('Preview server ready — prerendering', ROUTES.length, 'routes')

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 60000 })
      await page.waitForFunction(() => document.title && document.title.includes('X3'), { timeout: 10000 }).catch(() => {})
      const html = await page.content()
      const target = outPath(route)
      mkdirSync(dirname(target), { recursive: true })
      writeFileSync(target, html, 'utf8')
      console.log('  ✓', route)
      await page.close()
    }
    await browser.close()
    console.log('Prerender complete.')
  } finally {
    server.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
