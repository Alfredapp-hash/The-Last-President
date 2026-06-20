# BRAND IDENTITY AGENT
## Wordmark, favicon, and Open Graph images

> Inherit `00-visual-identity-master.md`.

---

## 1. SERIES MARK / EMBLEM

A small, restrained emblem usable as favicon and site mark. Concept: a **wax-seal / evidence stamp** containing a minimal "S" ledger mark or a scorched-card silhouette.

**Prompt (512x512, transparent or ink-black field):**
> Minimalist emblem for a literary thriller imprint, haunted evidence aesthetic. A circular wax-seal / evidence stamp impression in cream and graphite on near-black, suggesting a sealed case file. Faint cross-hatch, archival texture, one thin blood-red ring. Centered, symmetrical, iconic, flat. No text, no face, no glow.

**Favicon outputs (from the 512 master):** `favicon.ico` (multi-size), `icon-192.png`, `icon-512.png`, `apple-icon-180.png`.

The text wordmark "THE SUMP LEDGER" is set in Cormorant Garamond as an SVG (typeset, not generated) so it stays crisp.

---

## 2. OPEN GRAPH — DEFAULT (1200x630)

**Prompt:**
> Horizontal social share image, haunted evidence aesthetic. A scorched prophecy card and sealed case-file fragments arranged on a cold archival surface under institutional light, deep ink-black with cream paper and a single blood-red stamp. Wide negative space on the right third for typeset title overlay. Graphite cross-hatch, paper grain, cinematic and cold. No text, no face, no glow.

Overlay (compositing): `BAREN SUMP AND THE LAST PRESIDENT` + tagline + `thesumpledger.com`.

---

## 3. OG PER BOOK (1200x630 each)

Reuse each cover's controlling artifact, horizontal crop, with that book's accent and quiet space for title overlay.

- **og-book-one.png** — scorched prediction card, red accent.
- **og-book-two.png** — ledger + cereal box, gold accent.
- **og-book-three.png** — black path / empty monitored room, green accent.

**Prompt pattern:**
> Horizontal 1200x630 social share image, haunted evidence aesthetic, [book artifact]. Ink-black, cream paper, single [accent] stroke. Negative space on one third for typeset title. Graphite, archival grain, cold institutional light. No text, no face, no glow.

---

## DELIVERABLES

```
public/images/brand/
├── emblem-master.png        (512x512)
public/images/og/
├── og-default.png           (1200x630)
├── og-book-one.png
├── og-book-two.png
└── og-book-three.png
src/app/  (or public/)
├── favicon.ico, icon-192.png, icon-512.png, apple-icon-180.png
```
