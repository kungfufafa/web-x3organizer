<div align="center">
<img width="160" alt="X3 Organizer logo" src="./public/logo.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/be9c983f-53a9-4081-b08b-a6853385c0cd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Set `VITE_SITE_URL` to the canonical production URL before production builds so SEO image and sitemap URLs are absolute.
4. Run the app:
   `npm run dev`

## Asset and SEO Pipeline

- Generate brand, favicon, social, fallback, and responsive image derivatives with `npm run assets:generate`.
- Validate image dimensions, missing files, social cards, sitemap image URLs, and route SEO image references with `npm run assets:validate`.
- Generate `public/sitemap.xml` with image metadata using `npm run sitemap:generate`.
- `npm run build` runs the full production sequence: assets, sitemap, validation, then Vite build.
