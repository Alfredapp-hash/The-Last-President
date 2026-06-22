# Gumroad Readiness — Baren Sump Trilogy

Date: 2026-06-22

## Spot-check result

**PASS** — 3 random chapters per book, seed `20260622`.

Report: `production/publication-prep/gumroad-spot-check/SPOT_CHECK_REPORT.md`

## Issue found and fixed

Book Two, end of **Chapter Forty**, contained three leaked author-planning paragraphs (chapter-count / arc-outline notes). Removed from:

- `production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx`
- `production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_AUTHOR_PRODUCTION_MASTER.docx`

Book Two word count after fix: **88,063** (was 88,144).

## Upload files (Gumroad)

| Book | EPUB (recommended) | PDF (optional) |
|------|------------------|----------------|
| The Last President | `production/publication-prep/exports/epub/baren-sump-book-1-the-last-president_v1.epub` | `production/publication-prep/exports/pdf/baren-sump-book-1-interior-print_v1.pdf` |
| Children of Tomorrow | `production/publication-prep/exports/epub/baren-sump-book-2-children-of-tomorrow_v1.epub` | `production/publication-prep/exports/pdf/baren-sump-book-2-interior-print_v1.pdf` |
| The Black Path | `production/publication-prep/exports/epub/baren-sump-book-3-the-black-path_v1.epub` | `production/publication-prep/exports/pdf/baren-sump-book-3-interior-print_v1.pdf` |

Cover images for product pages:

- `public/images/covers/cover-book-one-titled.png`
- `public/images/covers/cover-book-two-titled.png`
- `public/images/covers/cover-book-three-titled.png`
- `public/images/covers/trilogy-box-set.png` (bundle)

## Validation

- Publication audit: **PASS** (3/3)
- EPUBCheck: **PASS** (all three)
- Author-note / meta-note scan: **PASS** after remediation

## Gumroad checklist

- [x] Final reader manuscripts validated
- [x] Random chapter spot-check (3 per book)
- [x] No author notes / placeholders in checked chapters
- [x] EPUB exports regenerated after Book Two fix
- [ ] Create Gumroad product listings (manual)
- [ ] Set pricing and bundle offer (manual)
- [ ] Upload cover + EPUB per product (manual)

## Re-run spot check

```bash
python3 scripts/gumroad_spot_check.py --seed 20260622
```

To remove known author-note patterns if they reappear:

```bash
python3 scripts/gumroad_spot_check.py --fix-known-notes
```
