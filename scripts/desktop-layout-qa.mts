import { chromium, type Browser } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, type ChildProcess } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = process.env.QA_OUTPUT_DIR ?? join(ROOT, 'artifacts/desktop-layout-qa/after');
const BASE_URL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const PORT = Number(new URL(BASE_URL).port || 4173);

const DESKTOP_VIEWPORTS = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
] as const;

const MOBILE_VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
] as const;

const ROUTES = [
  '/',
  '/layanan',
  '/produk',
  '/blog',
  '/tentang-kami',
  '/layanan/open-trip',
  '/produk/open-trip-bromo-midnight',
  '/blog/panduan-lengkap-wisata-bromo-2026',
  '/syarat-ketentuan',
  '/404-test',
] as const;

function routeSlug(route: string) {
  if (route === '/') return 'homepage';
  return route.replace(/^\//, '').replace(/\//g, '-').replace(/\?/g, '-');
}

async function waitForServer(url: string, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not ready at ${url}`);
}

async function startPreview(): Promise<ChildProcess> {
  const child = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: true,
  });
  await waitForServer(BASE_URL);
  return child;
}

async function capture(browser: Browser, viewports: readonly { width: number; height: number }[], outputDir: string) {
  mkdirSync(outputDir, { recursive: true });

  for (const route of ROUTES) {
    const slug = routeSlug(route);
    const dir = join(outputDir, slug);
    mkdirSync(dir, { recursive: true });

    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });
      const path = route === '/404-test' ? '/this-route-does-not-exist' : route;
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: join(dir, `${viewport.width}x${viewport.height}.png`),
        fullPage: true,
      });
      await page.close();
    }
  }
}

async function probeAlignment(browser: Browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

  const selectors = {
    header: 'header .container-site',
    hero: 'main .container-site',
    footer: 'footer .container-site',
  } as const;

  const offsets: Record<string, number | null> = {};
  for (const [key, selector] of Object.entries(selectors)) {
    const box = await page.locator(selector).first().boundingBox();
    offsets[key] = box ? Math.round(box.x) : null;
  }

  await page.close();
  console.log('Alignment probe (1440px homepage):', offsets);

  const values = Object.values(offsets).filter((v): v is number => v !== null);
  if (values.length >= 2) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (max - min > 2) {
      console.warn(`Alignment drift detected: ${max - min}px between rails`);
    } else {
      console.log(`Alignment OK: ${max - min}px drift`);
    }
  }
}

async function main() {
  const mode = process.argv[2] ?? 'after';
  const outputDir =
    mode === 'before'
      ? join(ROOT, 'artifacts/desktop-layout-qa/before')
      : join(ROOT, 'artifacts/desktop-layout-qa/after');

  process.env.QA_OUTPUT_DIR = outputDir;

  let preview: ChildProcess | null = null;
  const useExternal = process.env.QA_SKIP_SERVER === '1';

  try {
    if (!useExternal) {
      preview = await startPreview();
    } else {
      await waitForServer(BASE_URL);
    }

    const browser = await chromium.launch();
    await capture(browser, DESKTOP_VIEWPORTS, outputDir);
    if (mode !== 'before') {
      await capture(browser, MOBILE_VIEWPORTS.slice(0, 2), outputDir);
      await probeAlignment(browser);
    }
    await browser.close();
    console.log(`Screenshots saved to ${outputDir}`);
  } finally {
    preview?.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
