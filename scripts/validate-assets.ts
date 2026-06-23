import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import sharp from 'sharp';
import {
  DEFAULT_SOCIAL_IMAGE,
  FALLBACK_IMAGE,
  REQUIRED_ICON_ASSETS,
  SOCIAL_IMAGE_SIZE,
  SOURCE_MEDIA,
} from '../src/data/media';
import {
  existsPublic,
  fileSize,
  formatBytes,
  getExpectedGeneratedAssets,
  getSocialRoutes,
  imageMetadata,
  publicPath,
} from './asset-utils';

const errors: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function warn(message: string) {
  warnings.push(message);
}

async function validateImage(path: string) {
  if (!existsPublic(path)) {
    fail(`Missing asset: ${path}`);
    return;
  }

  const size = fileSize(path);
  if (size === 0) fail(`Zero-byte asset: ${path}`);

  if (/\.svg$/i.test(path)) {
    const source = readFileSync(publicPath(path), 'utf8');
    if (!source.includes('<svg')) fail(`Malformed SVG: ${path}`);
    if (/<script/i.test(source)) fail(`Unsafe script tag inside SVG: ${path}`);
    return;
  }

  if (/\.(png|jpe?g|webp|ico)$/i.test(path)) {
    try {
      const meta = await sharp(publicPath(path), { pages: 1 }).metadata();
      if (!meta.width || !meta.height) fail(`Invalid image dimensions: ${path}`);
    } catch (error) {
      fail(`Unreadable image ${path}: ${(error as Error).message}`);
    }
  }
}

for (const asset of SOURCE_MEDIA) {
  if (!asset.alt && asset.category !== 'decorative') {
    fail(`Missing alt metadata for ${asset.id}`);
  }
  if (!existsPublic(asset.src)) {
    fail(`Missing source image: ${asset.src}`);
  } else if (fileSize(asset.src) > 700 * 1024) {
    warn(`Large source image ${asset.src}: ${formatBytes(fileSize(asset.src))}`);
  }
}

for (const path of [...getExpectedGeneratedAssets(), DEFAULT_SOCIAL_IMAGE, FALLBACK_IMAGE]) {
  await validateImage(path);
}

for (const icon of REQUIRED_ICON_ASSETS) {
  if (!existsPublic(icon)) fail(`Missing required icon/manifest: ${icon}`);
}

for (const route of getSocialRoutes()) {
  const seoImage = route.seo.image ?? DEFAULT_SOCIAL_IMAGE;
  if (seoImage !== route.image && route.path !== '/') {
    warn(`Route ${route.path} resolves ${seoImage}; expected generated social image ${route.image}`);
  }
  if (!existsPublic(route.image)) fail(`Missing route social image for ${route.path}: ${route.image}`);
  if (!existsPublic(route.sourceImage)) fail(`Missing route source image for ${route.path}: ${route.sourceImage}`);

  const meta = await imageMetadata(route.image).catch(() => undefined);
  if (meta && (meta.width !== SOCIAL_IMAGE_SIZE.width || meta.height !== SOCIAL_IMAGE_SIZE.height)) {
    fail(`Social image ${route.image} must be 1200x630, got ${meta.width}x${meta.height}`);
  }
}

const sitemapPath = publicPath('/sitemap.xml');
if (existsPublic('/sitemap.xml')) {
  const xml = readFileSync(sitemapPath, 'utf8');
  if (/localhost|127\.0\.0\.1/i.test(xml)) fail('Sitemap contains localhost or 127.0.0.1');
  for (const match of xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
    const url = match[1] ?? '';
    const pathname = new URL(url).pathname;
    if (!existsPublic(pathname)) fail(`Sitemap references missing image: ${url}`);
  }
} else {
  fail('Missing public/sitemap.xml');
}

const socialNames = new Set<string>();
for (const route of getSocialRoutes()) {
  const name = basename(route.image);
  if (socialNames.has(name)) fail(`Duplicate social image filename: ${name}`);
  socialNames.add(name);
}

const sourceServedAsGenerated = getExpectedGeneratedAssets().filter((path) => path.includes('/originals/'));
if (sourceServedAsGenerated.length > 0) {
  fail(`Source originals are included as generated public outputs: ${sourceServedAsGenerated.join(', ')}`);
}

if (warnings.length > 0) {
  console.warn('Asset validation warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error('Asset validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Asset validation passed for ${SOURCE_MEDIA.length} source assets and ${getSocialRoutes().length} routes.`);
