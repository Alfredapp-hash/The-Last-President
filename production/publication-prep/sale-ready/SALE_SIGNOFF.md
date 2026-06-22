# Sale Sign-Off — Baren Sump Trilogy

Date: 2026-06-22  
Decision: **GO — SALE READY (DIGITAL)**

## Full manuscript scan

- Scope: every paragraph in all three final reader copies + EPUB export verification
- Result: **PASS** (0 hard flags)
- Report: `production/publication-prep/sale-ready/FULL_MANUSCRIPT_SCAN.md`

| Book | Words | Paragraphs | End marker | Flags |
|------|------:|-----------:|:----------:|------:|
| The Last President | 82,958 | — | yes | 0 |
| Children of Tomorrow | 88,063 | — | yes | 0 |
| The Black Path | 61,558 | — | yes | 0 |

**Trilogy total:** 232,579 words · 84 chapters

## Export validation

- EPUBCheck: **PASS** (all three)
- PDF interiors: generated and bundled
- Checksums: `production/publication-prep/sale-ready/MANIFEST.json`

## Sale package location

`production/publication-prep/sale-ready/gumroad/`

| Product | Folder | Primary file |
|---------|--------|--------------|
| Book One | `book-one-the-last-president/` | `the-last-president.epub` |
| Book Two | `book-two-children-of-tomorrow/` | `children-of-tomorrow.epub` |
| Book Three | `book-three-the-black-path/` | `the-black-path.epub` |
| Trilogy bundle | `trilogy-bundle/` | `baren-sump-trilogy-epub-bundle.zip` |

Each product folder includes `LISTING.md` with Gumroad copy, cover image, EPUB, and PDF.

## Gumroad upload checklist

- [ ] Create product: **The Last President** — upload EPUB + cover from `book-one-the-last-president/`
- [ ] Create product: **Children of Tomorrow** — upload EPUB + cover from `book-two-children-of-tomorrow/`
- [ ] Create product: **The Black Path** — upload EPUB + cover from `book-three-the-black-path/`
- [ ] Create bundle product — upload `trilogy-bundle/baren-sump-trilogy-epub-bundle.zip` + `trilogy-cover.png`
- [ ] Set suggested pricing ($9.99 single / $24.99 bundle — adjust as needed)
- [ ] Paste listing copy from each `LISTING.md`
- [ ] Publish all four products
- [ ] Link Gumroad URLs on thesumpledger.com book pages (optional)

## Notes

- No author notes, placeholders, or production markers remain in reader manuscripts.
- In-story uses of "draft" in legal/editorial dialogue were reviewed and are not flags.
- Print distribution (KDP/Ingram) remains a separate upload path using PDF exports in `production/publication-prep/exports/pdf/`.
