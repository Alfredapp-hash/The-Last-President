# VISUAL IDENTITY MASTER
## Baren Sump and The Last President — Asset Generation Standards

> **Run first.** Every asset generation agent (`01`–`05`) inherits these rules. Paste this as shared context before any generation task.

---

## THE LOOK IN ONE LINE

Recovered evidence from a sealed case file — pencil, archival paper, institutional shadow. Never glossy fantasy. Never a chosen-one hero.

---

## CORE AESTHETIC RULES (NON-NEGOTIABLE)

1. **Haunted evidence, not illustration.** Every image should feel found, logged, photographed for a file, or sealed — not "drawn for a book."
2. **Never show Baren's face.** No identifiable child face anywhere. Use absence: empty chairs, monitored rooms, objects, shadows, the back of a head at most.
3. **No magic, no glow, no heroism.** No prophetic light beams, no chosen-one halo, no fantasy creatures. Dread is institutional and quiet.
4. **Medium:** graphite pencil, cross-hatching, charcoal smudge, archival paper grain, faint coffee-ring/stamp/redaction marks. Photoreal objects acceptable when "evidence photograph" framing is intended (e.g., the prediction card).
5. **Restraint over spectacle.** Cold, procedural, sparse. Negative space is a feature.

---

## PALETTE (HEX)

| Token | Hex | Use |
|-------|-----|-----|
| Ink black | `#070605` | Backgrounds, deepest shadow |
| Card black | `#0f0e0c` | Panels, surfaces |
| Cream | `#ece8df` | Paper, primary light/text |
| Muted stone | `#8a8578` | Secondary detail, dust |
| Blood red | `#9e2b3c` | Book One accent, stamps, redaction |
| Antique gold | `#c9a962` | Book Two accent, fading title foil |
| Field green | `#5a7a52` | Book Three accent, muted |

Overall images skew **monochrome graphite + cream**, with a single accent color used sparingly (one accent per book).

---

## NEGATIVE PROMPT (APPEND TO EVERY GENERATION)

> no faces, no children's faces, no people looking at camera, no text, no lettering, no logos, no watermark, no glowing light, no magic, no fantasy creatures, no superhero poses, no bright saturated colors, no cartoon style, no stock-photo gloss, no lens flare

(Text is added later in compositing/code — never rely on the model for legible titles.)

---

## OUTPUT CONVENTIONS

- **Format:** PNG for art/covers/illustrations; SVG for wordmark/icons where possible.
- **Naming:** kebab-case, descriptive. Examples: `cover-book-one.png`, `og-default.png`, `interior-01-prediction-card.png`, `social-quote-children-are-not-evidence.png`.
- **Output directory:** `public/images/{covers,og,interior,social,brand}/`
- **Color profile:** sRGB.

## DIMENSIONS REFERENCE

| Asset | Size (px) | Ratio |
|-------|-----------|-------|
| Book cover (art) | 1600 x 2560 | 1:1.6 |
| Box-set composite | 2560 x 1600 | 8:5 |
| OG / social share | 1200 x 630 | 1.91:1 |
| Interior illustration | 1600 x 1600 or 1600 x 2000 | 1:1 / 4:5 |
| IG quote card | 1080 x 1080 | 1:1 |
| Story template | 1080 x 1920 | 9:16 |
| Banner (X/header) | 1500 x 500 | 3:1 |
| Favicon master | 512 x 512 | 1:1 |

---

## TITLE / TYPOGRAPHY (COMPOSITING LAYER — NOT MODEL)

Site fonts to reuse for any typeset overlay:
- **Display/serif:** Cormorant Garamond
- **Mono/labels:** IBM Plex Mono (case-file metadata, ALL CAPS, wide tracking)
- **Body:** DM Sans

Covers: generate ART only (background + object). Title, author line, and series mark are added as a crisp text layer (in-page React overlay or composited PNG).

---

## ACCEPTANCE CRITERIA (ALL ASSETS)

- [ ] Reads as evidence/archival, not fantasy
- [ ] No face, no baked text, no glow
- [ ] Correct palette (mono + single accent)
- [ ] Correct dimensions and naming
- [ ] Saved to correct `public/images/` subfolder
