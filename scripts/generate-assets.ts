import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import sharp from 'sharp';
import {
  BRAND_ASSETS,
  DEFAULT_SOCIAL_IMAGE,
  FALLBACK_IMAGE,
  RESPONSIVE_IMAGE_WIDTHS,
  SOCIAL_IMAGE_SIZE,
  SOURCE_MEDIA,
} from '../src/data/media';
import { formatBytes, getSocialRoutes, publicPath, routeSlug } from './asset-utils';

const brandPrimary = '#071e49';
const amber = '#d1b06c';
const emerald = '#128c4b';

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

function writeTextPublic(path: string, content: string) {
  const output = publicPath(path);
  ensureDir(output);
  writeFileSync(output, content, 'utf8');
  console.log(`generated ${path}`);
}

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function writePng(path: string, image: sharp.Sharp) {
  const output = publicPath(path);
  ensureDir(output);
  const info = await image.png({ compressionLevel: 9 }).toFile(output);
  console.log(`generated ${path} ${info.width}x${info.height} ${formatBytes(info.size)}`);
}

async function writeJpeg(path: string, image: sharp.Sharp, quality = 82) {
  const output = publicPath(path);
  ensureDir(output);
  const info = await image.jpeg({ quality, mozjpeg: true }).toFile(output);
  console.log(`generated ${path} ${info.width}x${info.height} ${formatBytes(info.size)}`);
}

function logoSvg(theme: 'default' | 'dark' | 'light') {
  const bg =
    theme === 'dark'
      ? `<rect width="640" height="640" rx="120" fill="${brandPrimary}"/>`
      : theme === 'light'
        ? '<rect width="640" height="640" rx="120" fill="#ffffff"/>'
        : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" role="img" aria-label="X3 Organizer">
  ${bg}
  <image href="${BRAND_ASSETS.logo}" x="80" y="80" width="480" height="480" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
}

function markSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="X3 Organizer">
  <rect width="512" height="512" rx="112" fill="${brandPrimary}"/>
  <text x="256" y="292" text-anchor="middle" font-family="Instrument Sans, Arial, sans-serif" font-size="176" font-weight="800" fill="#ffffff" letter-spacing="-8">X3</text>
  <path d="M142 342h228" stroke="${amber}" stroke-width="24" stroke-linecap="round"/>
</svg>
`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="X3 Organizer">
  <rect width="64" height="64" rx="14" fill="${brandPrimary}"/>
  <text x="32" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" fill="#ffffff">X3</text>
  <path d="M18 45h28" stroke="${amber}" stroke-width="4" stroke-linecap="round"/>
</svg>
`;
}

function fallbackSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720" role="img" aria-label="Ilustrasi fallback perjalanan X3 Organizer">
  <rect width="960" height="720" fill="#fafafa"/>
  <path d="M0 545c152-62 244-76 383-45 148 33 267 19 577-104v324H0z" fill="#071e49" opacity=".12"/>
  <path d="M0 604c156-45 282-44 409 4 132 50 297 46 551-42v154H0z" fill="#128c4b" opacity=".14"/>
  <circle cx="760" cy="166" r="70" fill="#d1b06c" opacity=".28"/>
  <path d="M193 420c82-106 143-159 183-159s78 49 114 146c49-70 91-105 126-105 40 0 91 58 153 174" fill="none" stroke="#071e49" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" opacity=".82"/>
  <path d="M245 498c126-84 281-121 467-110" fill="none" stroke="#128c4b" stroke-width="16" stroke-linecap="round" stroke-dasharray="4 34"/>
  <text x="480" y="612" text-anchor="middle" font-family="Instrument Sans, Arial, sans-serif" font-size="34" font-weight="800" fill="#071e49">X3 Organizer</text>
</svg>
`;
}

async function generateBrand() {
  await writePng(BRAND_ASSETS.logo, sharp(publicPath('/logo.png')).resize(512, 512, { fit: 'contain' }));
  writeTextPublic('/images/brand/x3-organizer-logo.svg', logoSvg('default'));
  writeTextPublic('/images/brand/x3-organizer-logo-dark.svg', logoSvg('dark'));
  writeTextPublic('/images/brand/x3-organizer-logo-light.svg', logoSvg('light'));
  writeTextPublic('/images/brand/x3-organizer-mark.svg', markSvg());
  writeTextPublic('/favicon.svg', faviconSvg());
  writeTextPublic(FALLBACK_IMAGE, fallbackSvg());
}

async function generateIcons() {
  const squareSvg = (size: number, radius: number) => Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="${radius}" fill="${brandPrimary}"/>
    </svg>`,
  );

  const makeIcon = async (path: string, size: number, padding: number, maskable = false) => {
    const logoSize = size - padding * 2;
    const base = sharp(squareSvg(size, Math.round(size * (maskable ? 0.22 : 0.18))));
    await writePng(
      path,
      base.composite([
        {
          input: await sharp(publicPath('/logo.png')).resize(logoSize, logoSize, { fit: 'contain' }).png().toBuffer(),
          left: padding,
          top: padding,
        },
      ]),
    );
  };

  await writePng('/icons/favicon-16x16.png', sharp(Buffer.from(faviconSvg())).resize(16, 16));
  await writePng('/icons/favicon-32x32.png', sharp(Buffer.from(faviconSvg())).resize(32, 32));
  await makeIcon('/icons/apple-touch-icon.png', 180, 24);
  await makeIcon('/icons/icon-192.png', 192, 28);
  await makeIcon('/icons/icon-512.png', 512, 72);
  await makeIcon('/icons/icon-maskable-192.png', 192, 42, true);
  await makeIcon('/icons/icon-maskable-512.png', 512, 112, true);

  writeFileSync(publicPath('/favicon.ico'), await sharp(Buffer.from(faviconSvg())).resize(32, 32).png().toBuffer());
  console.log('generated /favicon.ico');

  writeTextPublic(
    '/site.webmanifest',
    JSON.stringify(
      {
        name: 'X3 Organizer',
        short_name: 'X3 Organizer',
        icons: [
          { src: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { src: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          { src: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        theme_color: brandPrimary,
        background_color: '#fafafa',
        display: 'browser',
      },
      null,
      2,
    ),
  );
}

async function generateResponsiveImages() {
  const sources = SOURCE_MEDIA.filter((item) => /\.(jpe?g)$/i.test(item.src));
  for (const item of sources) {
    for (const width of RESPONSIVE_IMAGE_WIDTHS) {
      const webpPath = item.src.replace(/\.jpe?g$/i, `-${width}.webp`);
      const jpgPath = item.src.replace(/\.jpe?g$/i, `-${width}.jpg`);
      const resized = sharp(publicPath(item.src)).resize({ width, withoutEnlargement: true });
      const webpOutput = publicPath(webpPath);
      ensureDir(webpOutput);
      const webp = await resized.clone().webp({ quality: 78 }).toFile(webpOutput);
      console.log(`generated ${webpPath} ${webp.width}x${webp.height} ${formatBytes(webp.size)}`);
      await writeJpeg(jpgPath, resized.clone(), 78);
    }
  }
}

function socialSvg(title: string, label: string) {
  const words = (title.length > 72 ? `${title.slice(0, 69)}...` : title).split(/\s+/);
  const lines: string[] = [];
  for (const word of words) {
    const current = lines[lines.length - 1] ?? '';
    const next = current ? `${current} ${word}` : word;
    if (next.length > 21 && lines.length < 3) {
      lines.push(word);
    } else if (lines.length === 0) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = next;
    }
  }
  const titleText = lines
    .slice(0, 3)
    .map(
      (line, index) =>
        `<text x="82" y="${292 + index * 72}" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="#ffffff">${escapeSvg(line)}</text>`,
    )
    .join('\n  ');
  const safeLabel = escapeSvg(label);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SOCIAL_IMAGE_SIZE.width}" height="${SOCIAL_IMAGE_SIZE.height}" viewBox="0 0 ${SOCIAL_IMAGE_SIZE.width} ${SOCIAL_IMAGE_SIZE.height}">
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${brandPrimary}" stop-opacity=".96"/>
      <stop offset=".52" stop-color="${brandPrimary}" stop-opacity=".72"/>
      <stop offset="1" stop-color="${brandPrimary}" stop-opacity=".08"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#overlay)"/>
  <circle cx="1010" cy="105" r="95" fill="${amber}" opacity=".38"/>
  <path d="M770 520c102-108 184-164 248-168 52-3 99 23 141 78" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="18" stroke-linecap="round"/>
  <text x="82" y="98" font-family="Instrument Sans, Arial, sans-serif" font-size="30" font-weight="800" fill="#ffffff">X3 Organizer</text>
  <rect x="82" y="132" width="214" height="5" rx="3" fill="${amber}"/>
  <text x="82" y="208" font-family="Instrument Sans, Arial, sans-serif" font-size="27" font-weight="800" fill="${amber}" letter-spacing="3">${safeLabel.toUpperCase()}</text>
  ${titleText}
  <text x="82" y="552" font-family="Instrument Sans, Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff" opacity=".9">Open Trip • Private Trip • Corporate Outing • Family Trip</text>
  <rect x="82" y="578" width="188" height="18" rx="9" fill="${emerald}"/>
</svg>`);
}

async function generateSocialImages() {
  for (const route of getSocialRoutes()) {
    const source = route.sourceImage === DEFAULT_SOCIAL_IMAGE ? '/images/destinations/bromo-sunrise-jeep.jpg' : route.sourceImage;
    const title = route.path === '/' ? 'Trip rapi, rombongan tenang' : route.seo.title.replace(' — X3 Organizer', '');
    const label = route.path.startsWith('/blog') ? 'Panduan Wisata' : route.path.startsWith('/produk') ? 'Paket Trip' : route.path.startsWith('/layanan') ? 'Layanan' : 'Travel Organizer';

    const background = await sharp(publicPath(source))
      .resize(SOCIAL_IMAGE_SIZE.width, SOCIAL_IMAGE_SIZE.height, { fit: 'cover' })
      .modulate({ brightness: 0.88, saturation: 1.04 })
      .toBuffer();

    await writeJpeg(
      route.image,
      sharp(background).composite([{ input: socialSvg(title, label), left: 0, top: 0 }]),
      84,
    );
  }

  const home = getSocialRoutes().find((route) => route.path === '/');
  if (home) {
    await writeJpeg(DEFAULT_SOCIAL_IMAGE, sharp(publicPath(home.image)), 84);
  }
}

await generateBrand();
await generateIcons();
await generateResponsiveImages();
await generateSocialImages();

console.log(`Generated assets from ${relative(process.cwd(), publicPath('/'))}`);
