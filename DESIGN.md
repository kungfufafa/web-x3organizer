# X3 Organizer — Design System & Implementation Guide

> **Scope:** Static travel marketing website (React 19 + Vite 6 + Tailwind CSS v4 SPA).  
> **Audience:** Frontend implementers, product designs, visual QA inspectors.  
> **Source of Truth for Tokens:** `src/index.css` (`@theme` block).  
> **Last updated:** June 19, 2026
> **Composition revision:** Laravel-inspired spatial rhythm and landing-page layout discipline

---

## 1. Context and Goals

### Context
X3 Organizer is a fast, static frontend website providing search, comparison, and exploration of packages for **Open Trip**, **Private Trip**, **Corporate Outing**, and **Family Trip** services. The application uses client-side routing and contains no backend, server-side code, or admin dashboard.

### Goals
- **Conversion**: The primary call to action (CTA) must direct users to WhatsApp with package-specific text.
- **Editorial Experience**: Headings must use display serif typography (`Fraunces`) to project a premium, travel-oriented character.
- **Visual Polish**: Establish high visual spacing consistency, component uniformity, and visual balance.
- **Strict Compliance**: Satisfy visual, responsive, accessibility, SEO, performance, and code-quality gates.

---

## 2. X3 Organizer Identity

X3 Organizer is a professional travel organizer delivering clear, transparent, and trustworthy travel services. The identity must express:
- **Trustworthiness**: Precise package descriptions, clear timelines, and explicit list of inclusions and exclusions.
- **Professional Hospitality**: Clean, spacious, and elegant layout targeting both leisure travelers and corporate HR buyers.
- **Authority**: High-quality imagery focusing on iconic landscapes (Bromo, Nusa Penida, Bali) and structured itineraries.

---

## 3. Target Audience

The website serves:
1. **Solo / Group Budget Travelers**: Seeking cheap departures via Open Trips.
2. **Couples & Families**: Seeking Private or Family Trips with flexible dates and comfortable transport.
3. **Corporate HR & Office Admins**: Seeking Corporate Outings, fun team-building games, and structured invoices.
4. **Group leaders (Ketua Rombongan)**: Comparing tier prices and group discounts.

---

## 4. Design Intent

The visual identity remains inspired by **Tripvana** for its editorial and image-led travel character. The spatial composition and page rhythm take inspiration from the current **Laravel.com** landing page: strong alignment anchors, large but controlled whitespace, restrained content widths, varied section compositions, and one dominant message per section.

The result must express:
- Editorial, image-led storytelling without turning every section into a card grid.
- Spacious layouts whose whitespace is deliberate, measured, and responsive.
- Strong text hierarchy with restrained line length and predictable vertical rhythm.
- Rounded contours and pill-shaped interactive elements used selectively.
- Immersive section transitions without mechanically alternating backgrounds.
- A calm visual hierarchy: one primary focal point, one supporting visual, and one primary action per section.

The goal is **not** to copy Laravel's visual identity. The goal is to adopt its discipline in composition, spacing, alignment, pacing, and visual restraint while preserving the X3 Organizer travel identity.

---

## 5. Visual Theme

The theme is clean, spacious, and modern. It relies on a three-color brand accent strategy:
- Deep navy primary surface blocks and main headers.
- Bright amber highlights and eyebrows.
- Fresh emerald green for WhatsApp conversion actions.

---

## 6. Brand Expression

The brand X3 Organizer must be displayed consistently:
- Logo must reside on the left of the header and footer, resizing cleanly.
- Color scheme must adhere to the navy-amber-whatsapp palette.
- Copy must maintain a warm, welcoming, and transparent Indonesian tone.

---

## 7. Semantic Color Tokens

All elements must use semantic tokens from the `@theme` block in `src/index.css`. Hex values must not be hardcoded in views.

| Token | CSS Variable / Value | Purpose |
| ----- | -------------------- | ------- |
| `--color-brand-primary` | `#071e49` | Navy for buttons, display headings, dark sections |
| `--color-brand-hover` | `color-mix(in oklch, #071e49 88%, white)` | Hover state for primary buttons |
| `--color-brand-active` | `color-mix(in oklch, #071e49 78%, black)` | Pressed/Active state for primary buttons |
| `--color-brand-subtle` | `color-mix(in oklch, #071e49 8%, #fafafa)` | Muted background tints |
| `--color-brand-foreground` | `#ffffff` | Text on brand fills |
| `--color-text-primary` | `#071e49` | Main body headings |
| `--color-text-secondary` | `color-mix(in oklch, #071e49 72%, #6b7480)` | Paragraph body text |
| `--color-text-muted` | `color-mix(in oklch, #071e49 48%, #9aa0a3)` | Meta labels, captions |
| `--color-text-inverse` | `#ffffff` | Text on dark navy backgrounds |
| `--color-text-link` | `color-mix(in oklch, #071e49 85%, #2563eb)` | Inline text links |
| `--color-surface-page` | `#fafafa` | Page background |
| `--color-surface-card` | `#ffffff` | White card surfaces, header |
| `--color-surface-subtle` | `#f1f3f5` | Alternate section background |
| `--color-surface-dark` | `#071e49` | Hero headers and CTA sections background |
| `--color-border-default` | `#e5e7eb` | Divider lines, inputs, cards outline |
| `--color-border-strong` | `color-mix(in oklch, #071e49 18%, #d1d5db)` | Highlighted boundaries |
| `--color-border-focus` | `color-mix(in oklch, #071e49 70%, #92d05d)` | Focus ring outlines |
| `--color-whatsapp` | `#128c4b` | WhatsApp actions |

---

## 8. Typography Scale

Text sizes must scale responsively using CSS `clamp()` or Tailwind classes.

| Token / Class | size | weight | family | Usage |
| ------------- | ---- | ------ | ------ | ----- |
| `--font-size-display-hero` | 2.25rem - 4.25rem | 700 (Bold) | Display (`Fraunces`) | Home Page main title |
| `--font-size-display-section` | 1.875rem - 3rem | 700 (Bold) | Display (`Fraunces`) | Section headings, inner heroes |
| `--font-size-h1` | 2rem - 3.25rem | 700 (Bold) | Display (`Fraunces`) | Main prose titles |
| `--font-size-h2` | 1.625rem - 2.5rem | 700 (Bold) | Display (`Fraunces`) | Subheadings |
| `--font-size-h3` | 1.375rem - 1.875rem | 700 (Bold) | Display (`Fraunces`) | Card titles |
| `--font-size-body-large` | 1.125rem | 400 (Regular) | Sans (`Instrument Sans`) | Sub-hero lead copies |
| `--font-size-body` | 1rem | 400 (Regular) | Sans (`Instrument Sans`) | Main copy, paragraphs |
| `--font-size-body-small` | 0.875rem | 500 (Medium) | Sans (`Instrument Sans`) | Meta descriptions, listings info |
| `--font-size-label` | 0.8125rem | 600 (Semibold) | Sans (`Instrument Sans`) | Inputs labels |

---

## 9. Spacing and Rhythm System

Spacing must communicate hierarchy and relationships. Do not use one generic gap for every layout. All layout spacing must resolve to the semantic levels below.

### 9.1 Semantic spacing levels

| Level | Allowed values | Typical usage |
| ----- | -------------- | ------------- |
| Micro | `4px`, `8px`, `12px`, `16px` | Icon gaps, eyebrow-to-label, metadata, inline controls |
| Component | `20px`, `24px`, `32px` | Card padding, title-to-description, form groups, action groups |
| Layout | `40px`, `48px`, `64px`, `80px`, `96px` | Section header-to-content, split-layout columns, large media gaps |
| Section | `64px`, `80px`, `96px`, `112px`, `128px`, `144px`, `160px` | Top and bottom section padding, hero breathing room |

Arbitrary spacing values such as `mt-[73px]`, `gap-[37px]`, or per-page one-off padding are prohibited unless required to align a specific media crop and documented in code.

### 9.2 Section density presets

Every top-level landing-page section must use one of these presets instead of custom `py-*` values:

| Preset | Mobile | Tablet | Desktop | Usage |
| ------ | ------ | ------ | ------- | ----- |
| `compact` | `py-14` | `md:py-16` | `lg:py-20` | Logo strips, short trust bars, filter bands |
| `default` | `py-18` / token equivalent | `md:py-24` | `lg:py-28` | Standard feature, package, testimonial, FAQ sections |
| `spacious` | `py-22` / token equivalent | `md:py-30` | `lg:py-36` | Editorial split sections and major narrative transitions |
| `hero` | custom asymmetric token | custom asymmetric token | `pt-32 pb-28` minimum | Home hero and final high-impact CTA |

Tailwind CSS v4 can generate numeric spacing utilities dynamically from `--spacing`, but top-level sections must still use semantic utilities in `src/index.css`—for example `.section-compact`, `.section-default`, `.section-spacious`, and `.section-hero`—so intent remains consistent and auditable.

### 9.3 Relationship spacing matrix

Use these defaults before introducing exceptions:

| Relationship | Mobile | Desktop |
| ------------ | ------ | ------- |
| Eyebrow → heading | `12px` | `16px` |
| Heading → lead paragraph | `20px` | `24px` |
| Lead paragraph → actions | `28px` | `32px` |
| Section header → first content row | `40px` | `56–64px` |
| Card media → card body | `0px` if body is padded separately | Same |
| Card title → supporting text | `10–12px` | `12–16px` |
| Supporting text → card action | `20–24px` | `24–32px` |
| Split-copy → visual | `40px` | `72–96px` |
| Final content row → section edge | Controlled by section preset | Controlled by section preset |

### 9.4 Vertical-rhythm rules

- Top-level sections use **padding**, not external `margin-top`, to establish page rhythm.
- The first and last child inside a section must not add compensating outer margins.
- Do not stack two independent section spacings at one boundary.
- A section header is a visual group; keep its eyebrow, heading, lead, and actions closer to one another than the header is to the section content.
- Dense sections must be followed by a calmer section or a stronger visual transition.
- Mobile spacing may shrink by roughly 20–35%, but relationships and hierarchy must remain unchanged.
- Never reduce desktop whitespace merely to display more cards above the fold.

---

## 10. Radius Scale

Consistent corner curvature must be maintained across all layout elements.

- `--radius-none`: `0` - Fullbleed banners, header/footer backgrounds
- `--radius-sm`: `0.375rem` - Small status labels, small tag buttons
- `--radius-md`: `0.5rem` - Form select, input boxes
- `--radius-lg`: `0.75rem` - Standard cards, detail page blocks
- `--radius-xl`: `1rem` - Large sidebar rails
- `--radius-2xl`: `1.25rem` - Trip cards, gallery elements, accordion containers
- `--radius-pill`: `9999px` - All call to action buttons (primary, accent, WhatsApp)

---

## 11. Shadow Scale

Shadow intensity must remain subtle and organic.

- `--shadow-none`: No shadow (dividers, grids)
- `--shadow-card`: `0 4px 24px -8px rgb(7 30 73 / 0.12)` - Resting cards
- `--shadow-card-hover`: `0 16px 40px -12px rgb(7 30 73 / 0.18)` - Hovered interactive elements
- `--shadow-dropdown`: `0 12px 32px -8px rgb(7 30 73 / 0.16)` - Floating navigations and mobile drawers
- `--shadow-focus`: `0 0 0 3px color-mix(in oklch, var(--color-brand-primary) 24%, transparent)` - Interactive elements focus rings

---

## 12. Motion System

Animations must be subtle, fast, and avoid layout shifts.

- Standard duration: `250ms` (`--motion-duration-normal`) with `cubic-bezier(0.4, 0, 0.2, 1)` easing.
- Entrance animations: Staggered entrance via Framer Motion/Motion (`animateIndex`) must not exceed 50ms per item.
- Reduced Motion: The motion system must respect system settings (`prefers-reduced-motion: reduce`) by neutralizing transition timings and translations.

---

## 13. Container and Alignment System

The page must use a small, named set of horizontal containers. A single `max-w-*` value is insufficient for a polished marketing page because navigation, narrative copy, card grids, and immersive media require different readable widths.

### 13.1 Container variants

| Variant | Maximum width | Usage |
| ------- | ------------- | ----- |
| `.container-wide` | `90rem` / `1440px` | Header, large image-led sections, footer, wide showcases |
| `.container-site` | `80rem` / `1280px` | Default landing-page content and card grids |
| `.container-content` | `64rem` / `1024px` | Centered section headers, testimonials, FAQ shells |
| `.container-prose` | `48rem` / `768px` | Long-form text and narrow editorial explanations |

### 13.2 Responsive page gutters

- Mobile: `1.25rem` (`20px`)
- Tablet: `2rem` (`32px`)
- Desktop: `3rem` (`48px`)
- Large desktop: up to `4rem` (`64px`) only for `.container-wide`

All variants must share the same left/right alignment formula so nested sections do not drift horizontally.

### 13.3 Alignment anchors

Every page must visibly reuse these anchors:
- Global page gutter.
- Standard content left edge.
- Split-layout text edge.
- Card-grid outer edge.
- Center axis for centered headings and final CTA blocks.

Do not introduce a new horizontal start position unless the composition clearly requires an intentional inset. Intentional insets should be based on the grid, such as one 12-column track, rather than arbitrary pixels.

### 13.4 Text measure

- Hero heading: generally `10–16ch`, maximum `18ch`.
- Section heading: generally `12–22ch`.
- Lead paragraph: maximum `42rem`.
- Body paragraph: maximum `60–68ch`.
- Card descriptions: maximum 3–5 lines at the target desktop width.

Text must never expand merely because the container is wide.

---

## 14. Grid and Split-layout System

Component lists must stack through a predictable responsive grid, while editorial sections must use balanced split layouts.

### 14.1 Card grids

- Mobile: 1 column.
- Tablet: 2 columns.
- Desktop: 3 columns for content-heavy cards; 4 columns only for visually simple cards.
- Card grid gap: `24px` mobile, `28–32px` desktop.
- Cards in one row should align at the top; actions should align at the bottom only when it improves comparison.
- Avoid showing more than 4 equal-weight cards in one viewport row.

### 14.2 Split layouts

Use one of these ratios:
- `5 / 7`: concise copy beside dominant visual.
- `6 / 6`: equal narrative and media importance.
- `7 / 5`: dominant copy beside compact proof or detail rail.

Split-layout gap:
- Mobile stacked gap: `40–48px`.
- Tablet: `56–64px`.
- Desktop: `72–96px`.

Use `items-center` only when both columns have similar visual mass. Use `items-start` when copy is long, cards are stacked, or top alignment creates a cleaner reading path.

### 14.3 Composition variation

Three consecutive top-level sections must not use the same composition. Rotate among:
- Centered narrative + wide media.
- Copy left + media right.
- Media left + copy right.
- Compact trust/logos strip.
- Editorial card grid.
- Full-width dark CTA.

Variation must preserve alignment and token consistency; it must not become random.

---

## 15. Responsive Breakpoints

Visual elements must scale according to Tailwind CSS default breakpoints:
- `sm`: `640px`
- `md`: `768px` - Desktop menu becomes visible; mobile bottom menu becomes hidden.
- `lg`: `1024px`
- `xl`: `1280px`

---

## 16. Image Ratios

Images inside cards must be consistent:
- `TripCard` cover aspect ratio must be `aspect-[4/3]`.
- Blog item cover aspect ratio must be `aspect-[16/10]`.
- Destination cover aspect ratio must be `aspect-[4/3]` or `h-64`.

---

## 17. Image Treatment

Images must be visually polished:
- Set `object-cover` to prevent stretching.
- Below the fold images must use `loading="lazy"` to speed up initial rendering.
- Hover states should scale images slightly (`1.04×` scale) over `450ms` duration.
- Image overlay gradient scrims must use navy-shaded gradients (e.g. `from-slate-900/60 to-transparent`).

---

## 18. Header and Navigation Rules

Header layout and navigation must be uniform:
- Logo must always link to `/`.
- Active menu links must show `aria-current="page"` and display an amber bottom highlight.
- Header must remain sticky on scroll (`sticky top-0 bg-white/95 backdrop-blur-md`).
- Mobile menu trigger must expand a drawer (`aria-expanded` tag, close on Escape key).

---

## 19. Hero Composition Rules

Page heroes must establish a clear reading order and generous initial breathing room.

### 19.1 Home hero

- Exactly one `<h1>`.
- Use either a centered editorial hero or a `5 / 7` split hero; do not combine both structures.
- The headline must be the dominant element and generally remain within `10–16ch`.
- Supporting copy must be no wider than `42rem` and should not visually compete with the headline.
- Use one primary CTA and at most one secondary CTA.
- CTA groups use `gap-3` mobile and `gap-4` desktop; stack only when needed at narrow widths.
- Hero media must have a stable aspect ratio or minimum height to prevent layout shift.
- The home hero should use asymmetric breathing room, normally more space above the primary visual group than below it.
- The first section after the hero should feel intentionally connected through a trust strip, overlap, shared surface, or controlled reduced top padding—not an accidental gap.

### 19.2 Inner-page hero

Inner heroes must use `PageHero` with structured parameters: `eyebrow`, `title`, `subtitle`, optional `actions`, and optional `media`.

- Use the `compact` or `default` density, never home-hero scale.
- Keep title width narrower than the home hero.
- Do not place large package grids directly inside the hero.

### 19.3 Dark hero contrast

Dark heroes must use white or tokenized inverse text. Secondary text should remain visibly subordinate but must still meet contrast requirements. Decorative imagery must never reduce title readability.

---

## 20. Section Rhythm and Page Pacing

Landing-page rhythm is created by **changes in composition, density, and focal weight**, not by mechanically alternating white and gray backgrounds.

### 20.1 Surface rhythm

- It is acceptable for 2–3 consecutive sections to share the same page surface when spacing and composition provide sufficient separation.
- Use an alternate light surface when grouping related content, introducing a new chapter, or improving card contrast.
- Use a dark surface sparingly for one major narrative or conversion moment.
- Avoid a zebra-striping effect where every section changes background.
- When two adjacent sections share a surface, use either generous whitespace, a restrained divider, or a deliberate composition change—not all three by default.

### 20.2 Visual pacing

A recommended long-page rhythm is:
1. High-focus hero.
2. Compact trust or proof strip.
3. Spacious flagship package or service story.
4. Default-density package/card grid.
5. Spacious alternating editorial feature.
6. Compact proof/statistics band.
7. Default testimonial or social-proof section.
8. Default FAQ.
9. High-focus final CTA.
10. Footer.

This order may change, but the page should alternate between **high-focus**, **informational**, and **resting** moments.

### 20.3 One-section-one-purpose rule

Each section must have:
- One primary message.
- One dominant visual hierarchy.
- One primary user action or no action.
- No more than two supporting content patterns.

If a section contains a heading, filters, statistics, cards, testimonials, and multiple CTAs simultaneously, split it into separate sections.

---

## 21. Card Composition Rules

Cards must maintain structural consistency without making the entire landing page look like a dashboard.

- All cards must use semantic border, radius, and surface tokens.
- Standard content padding: `20px` mobile and `24px` desktop.
- Feature or premium card padding: `24px` mobile and `28–32px` desktop.
- Use shadows only for elevated or interactive cards. Static editorial cards may use a border with no shadow.
- Preserve consistent image ratios within a card family.
- Keep badge, title, metadata, description, price, and action in a stable order.
- Limit the number of visually emphasized cards; one featured card per group is usually sufficient.
- Avoid nesting cards inside cards.
- Avoid putting every text block on a white rounded surface; use open editorial layouts where appropriate.
- Actions inside comparison cards may align to the bottom, but cards must not gain excessive empty space merely to force equal heights.

---

## 22. Button Rules

Button shapes and colors must be uniform:
- All primary buttons must be pill-shaped (`rounded-full`).
- WhatsApp buttons must use the emerald-green color token.
- Outline buttons on dark backgrounds must use `bg-transparent text-white border-white/30 hover:bg-white/10` to avoid white-on-white text bugs.

---

## 23. Form Rules

Form inputs (used only for quick search and filters):
- Labels must reside above input/select controls with `space-y-2`.
- Inputs must use standard borders (`border-slate-200`) and rounded-lg curvature.
- Focus outline rings must use the green-tinted navy focus token.

---

## 24. Gallery Rules

Detail galleries must display images cleanly:
- Aspect ratios must remain identical.
- Images must use descriptive `alt` tags.
- Large image viewports must support lazy loading when below the fold.

---

## 25. FAQ Rules

FAQ accordions must use the `Accordion` component:
- Questions must be wrapped in `<button>` inside `<h3>` headers.
- Open items must rotate the trailing chevron icon.
- Accordion buttons must have the `touch-target` class.

---

## 26. Footer Rules

Footer layouts must stack correctly:
- Footer columns must wrap to single column layouts on mobile.
- Legal links, services links, and contact addresses must remain readable (text contrast ≥ 4.5:1).
- Logo image must display cleanly.

---

## 27. UI State Rules

System interaction feedback:
- Hover states: Shift color, elevate shadow over `250ms`.
- Active states: Shift color immediately.
- Focus visible outlines: Clear 2px focus ring.
- Disabled states: `opacity-50`, cursor-not-allowed.

---

## 28. Accessibility Rules

Target WCAG 2.2 Level AA:
- Text contrast must exceed 4.5:1.
- Interactive targets must exceed 44×44px (`touch-target` class).
- Keyboard accessibility: Navigation, links, and accordions must be fully operable without a mouse.
- Screen readers: Clean ARIA tags, landmarks, and alt texts.

---

## 29. SEO Content Rules

Per-page metadata must resolve via `resolvePageSeo`:
- Unique title tag (max 60 chars) and meta description (120-155 chars).
- Valid canonical absolute URLs.
- Schema structured JSON-LD payloads for Organization, Website, and FAQPage.
- Lowercase kebab-case URL paths.

---

## 30. Anti-patterns

The codebase must avoid:
- Hardcoded hex values in component files.
- Multiple `<h1>` elements on a single page.
- Simulating contact form submission without a real WhatsApp redirect.
- Visual elements missing focus rings.
- Large images loading without lazy loading below the fold.
- Arbitrary per-section spacing that bypasses the semantic density presets.
- Applying `py-20 lg:py-28` to every section regardless of purpose.
- Mechanically alternating section background colors.
- Center-aligning every section header and body.
- Repeating the same 3-card grid composition across consecutive sections.
- Full-width paragraphs inside wide containers.
- Excessive cards, shadows, borders, pills, and badges competing for attention.
- Using fixed heights for content sections.
- Using negative margins to repair incorrect spacing architecture.
- Hiding spacing defects with oversized decorative imagery.
- Allowing a desktop layout to become a compressed two-column layout on mobile rather than intentionally stacking it.

---

## 31. Migration Guidance

Replace legacy styling with semantic theme variables:
- Replace `bg-primary-yellow` with `bg-amber-500`.
- Replace custom `charcoal` colors with Tailwind `slate` tokens.
- Replace manual cards layout with the unified `Card` and `TripCard` components.

---

## 32. Visual QA Checklist

### Global alignment
- [ ] Header, hero, primary sections, CTA, and footer visibly reuse the approved container anchors.
- [ ] No unexplained horizontal inset appears between adjacent sections.
- [ ] Centered content is optically centered, not merely mathematically centered.

### Section rhythm
- [ ] Every top-level section uses `compact`, `default`, `spacious`, or `hero` density.
- [ ] No two spacing systems are stacked at the same section boundary.
- [ ] Three consecutive sections do not repeat the same composition.
- [ ] Background changes represent meaningful chapter transitions rather than automatic alternation.
- [ ] Dense content is followed or preceded by a calmer visual moment.

### Typography and measure
- [ ] Hero heading remains within the intended character measure and does not span an uncomfortable full width.
- [ ] Body copy remains within `60–68ch`.
- [ ] Eyebrow, heading, lead, and actions use the relationship spacing matrix.
- [ ] Heading wraps do not leave a visually isolated final word at target breakpoints.

### Grids and cards
- [ ] Card gaps are consistent inside each family.
- [ ] 4-column desktop grids are used only for simple cards.
- [ ] Cards do not dominate every section of the page.
- [ ] Card content order and padding are consistent.
- [ ] Images do not distort and retain family-specific aspect ratios.

### Responsive QA
- [ ] No horizontal overflow at `320px`, `390px`, `768px`, `1024px`, `1280px`, and `1440px`.
- [ ] Split layouts stack intentionally with `40–48px` mobile separation.
- [ ] Mobile spacing is reduced without flattening hierarchy.
- [ ] CTA groups wrap or stack cleanly.
- [ ] Touch targets remain at least `44×44px`.
- [ ] Mobile bottom navigation includes safe-area padding.

### Interaction, accessibility, and implementation
- [ ] All primary buttons are pill-shaped where required.
- [ ] Active route uses `aria-current="page"`.
- [ ] Focus-visible states are clearly visible.
- [ ] Reduced-motion settings are respected.
- [ ] No arbitrary spacing utilities are used without documented justification.
- [ ] Console displays no 404 errors or hydration/runtime errors on page load.

### Screenshot comparison gate
Capture and compare the complete landing page at:
- `390 × 844`
- `768 × 1024`
- `1280 × 900`
- `1440 × 1000`

The page passes composition QA only when the full-page screenshots show consistent alignment, readable text measure, clear section boundaries, balanced visual mass, and no accidental dead space.

---

## 33. Landing-page Composition Blueprint

The home page should use this as the default composition baseline. Content may change, but major spatial roles should remain recognizable.

| Order | Section | Density | Recommended composition | Primary purpose |
| ----- | ------- | ------- | ----------------------- | --------------- |
| 1 | Header | Fixed shell | Wide container | Orientation and primary navigation |
| 2 | Home Hero | `hero` | Centered or `5 / 7` split | Value proposition and primary CTA |
| 3 | Trust / Proof Strip | `compact` | Logos, rating, or concise metrics | Reduce uncertainty |
| 4 | Featured Trip | `spacious` | Copy + dominant destination media | Editorial story and product focus |
| 5 | Package Categories | `default` | 3-card or asymmetric grid | Product discovery |
| 6 | Why X3 Organizer | `spacious` | Alternating split layout | Explain trust and service quality |
| 7 | Destination Showcase | `default` | Wide media grid, not dashboard cards | Inspiration and exploration |
| 8 | Corporate / Family Proof | `compact` or `default` | Statistics + concise proof | Buyer-specific confidence |
| 9 | Testimonials | `default` | Restrained 2–3 column layout | Social proof |
| 10 | FAQ | `default` | Narrow content container | Resolve objections |
| 11 | Final CTA | `hero` or `spacious` | Dark focused conversion block | WhatsApp conversion |
| 12 | Footer | Spacious shell | Wide multi-column container | Navigation and contact closure |

Do not place every possible section on the homepage. Remove sections that do not materially help discovery, trust, or conversion.

---

## 34. Reusable Layout Primitives

The implementation should expose layout primitives so page authors cannot invent spacing repeatedly.

### `Container`

Supported variants:
- `wide`
- `site`
- `content`
- `prose`

### `Section`

Supported properties:
- `density`: `compact | default | spacious | hero`
- `surface`: `page | card | subtle | dark`
- `container`: `wide | site | content | prose | none`
- `overflow`: `visible | hidden`

### `SectionHeader`

Supported alignment:
- `left`
- `center`

Supported width:
- `narrow`
- `default`
- `wide`

The component must own the internal eyebrow-to-title-to-description-to-action spacing.

### `SplitSection`

Supported ratio:
- `5-7`
- `6-6`
- `7-5`

Supported media position:
- `left`
- `right`

The component must own responsive stacking and column gaps.

### Example contract

```tsx
<Section density="spacious" surface="page" container="wide">
  <SplitSection ratio="5-7" mediaPosition="right">
    <SectionHeader
      align="left"
      eyebrow="Private Trip"
      title="Perjalanan yang terasa pribadi sejak awal"
      description="Atur waktu, kendaraan, dan pengalaman sesuai kebutuhan rombongan Anda."
    />
    <TripVisual />
  </SplitSection>
</Section>
```

Page components may compose these primitives, but must not redefine their horizontal gutters or section padding.

---

## 35. Optical Balance Rules

Mathematical equality does not always produce visual balance. Apply these optical adjustments during QA:

- A large dark image has more visual weight than the same-sized white text block; it may need more surrounding whitespace.
- Serif display headings appear denser than sans-serif text and may need slightly more space below than above.
- A section with 6–8 cards needs more top separation from its heading than a section with one large visual.
- Rounded cards with shadows appear larger than borderless blocks; avoid crowding them near section edges.
- A centered title above an asymmetric grid may appear disconnected; align the title to the grid's dominant edge when appropriate.
- When alternating media left/right, preserve the reading order on mobile: copy first, media second unless the visual is essential context.
- Whitespace should frame important content, not create unexplained empty zones.

---

## 36. Composition Acceptance Criteria

A landing page is considered compositionally complete only when:

1. All top-level sections use approved layout primitives and density presets.
2. Full-page screenshots show a deliberate sequence of high-focus, informational, and resting sections.
3. Horizontal alignment remains stable from header to footer.
4. Paragraph width remains readable on large displays.
5. No section contains more than one dominant message.
6. Card grids are not the default solution for every content type.
7. The page remains visually calm at `1440px` and structurally clear at `390px`.
8. Visual QA records concrete defects and fixes rather than subjective statements such as “make spacing nicer.”

---

## 37. Reference Boundary

Laravel.com is used as a reference for:
- Spatial rhythm.
- Alignment consistency.
- Content restraint.
- Section pacing.
- Alternating composition.
- Large but controlled whitespace.

Do not copy Laravel-specific artwork, typography, brand colors, wording, or product presentation. X3 Organizer must remain recognizably a premium Indonesian travel organizer.

