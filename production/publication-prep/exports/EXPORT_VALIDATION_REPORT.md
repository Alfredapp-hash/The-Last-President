# Export Validation Report

Date: 2026-06-20 18:16 UTC

## Validation summary

| Book | EPUBCheck | PDF pages | PDF size (bytes) |
|------|-----------|----------:|-----------------:|
| book-1 | PASS | 375 | 1161215 |
| book-2 | PASS | 459 | 1320658 |
| book-3 | PASS | 364 | 997204 |

## Raw validation artifacts

- `production/publication-prep/exports/epub/book-1-epubcheck.txt`
- `production/publication-prep/exports/pdf/book-1-pdfinfo.txt`
- `production/publication-prep/exports/epub/book-2-epubcheck.txt`
- `production/publication-prep/exports/pdf/book-2-pdfinfo.txt`
- `production/publication-prep/exports/epub/book-3-epubcheck.txt`
- `production/publication-prep/exports/pdf/book-3-pdfinfo.txt`

## Cover wrap outputs

- `production/publication-prep/exports/covers/the-last-president-cover-wrap_v1.pdf`
- `production/publication-prep/exports/covers/children-of-tomorrow-cover-wrap_v1.pdf`
- `production/publication-prep/exports/covers/the-black-path-cover-wrap_v1.pdf`
- Specs: `production/publication-prep/exports/covers/COVER_WRAP_SPECS.md`

## Notes

- Book Three EPUB relies on `scripts/pandoc_unique_ids.lua` to prevent duplicate XHTML IDs.
- Cover wraps were generated from validated interior page counts using `scripts/generate_cover_wraps.py`.
