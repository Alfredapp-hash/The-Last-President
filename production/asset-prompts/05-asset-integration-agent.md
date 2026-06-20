# ASSET INTEGRATION AGENT
## Wire generated assets into the live site

> Inherit `00-visual-identity-master.md`. Runs after `01`–`04` produce images. No new art is generated here — this is the code/typesetting wiring pass.

---

## 1. PLACE FILES

Confirm all assets exist under:
```
public/images/{covers,og,interior,social,brand}/
```
Favicon files at app/public root: `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-icon-180.png`.

---

## 2. CONTENT MODEL (`src/lib/content.ts`)

Add to the `Book` type and each book object:
```ts
coverImage: string;   // /images/covers/cover-book-one.png
ogImage: string;      // /images/og/og-book-one.png
```
Add a `boxSet` constant and an `interiorPlates` array (path + caption + chapter anchor) sourced from the Art Brief.

---

## 3. COMPONENTS

- **`src/components/Hero.tsx`** — option to render the generated prediction-card / OG artifact behind or beside the existing text "Exhibit A" card (use `next/image`, lazy, with the artifact as a textured backdrop). Keep text card as foreground for crisp legibility.
- **`src/components/BookShowcase.tsx`** — add the book cover image (`next/image`) to each panel's meta column; typeset title overlay stays as live text (do not bake).
- **`src/app/press/page.tsx`** — add small cover thumbnails to each blurb; add a downloadable box-set / banner reference.
- Optional new **`src/components/CoverPlate.tsx`** — reusable titled-cover component (art image + Cormorant title overlay + mono book tag), so covers render crisp without baked text.

---

## 4. METADATA (`src/app/layout.tsx`)

- `icons`: wire favicon set.
- `openGraph.images` and `twitter.images`: `/images/og/og-default.png` (1200x630).
- Per-book OG: set in any future per-book route metadata.

Add **Book / schema.org JSON-LD** (a `<script type="application/ld+json">`) describing the series and three `Book` entities (name, author, inLanguage, numberOfPages-equivalent, image = coverImage, url). Place in `layout.tsx` or a `StructuredData` component.

---

## 5. TITLE OVERLAY (CRISP TEXT)

Covers, OG, and quote-card text are typeset as live HTML/SVG using site fonts (Cormorant Garamond display, IBM Plex Mono labels). For static social exports, composite text over the generated background (document the recommended export tool).

---

## 6. VERIFY + SHIP

- [ ] `npm run build` passes
- [ ] All `next/image` paths resolve (no 404s)
- [ ] OG image renders in metadata
- [ ] Lighthouse: images sized/lazy, no CLS regressions
- [ ] Commit on `cursor/visual-assets-f7ee`, open PR, deploy

---

## FILES TOUCHED

- Edit: `src/lib/content.ts`, `src/components/Hero.tsx`, `src/components/BookShowcase.tsx`, `src/app/layout.tsx`, `src/app/press/page.tsx`
- New: `src/components/CoverPlate.tsx` (optional), `src/components/StructuredData.tsx` (optional), `public/images/**`, favicon files
