# Publication Exports

This folder contains generated distribution files and validation artifacts.

## Files

### EPUB

- `epub/baren-sump-book-1-the-last-president_v1.epub`
- `epub/baren-sump-book-2-children-of-tomorrow_v1.epub`
- `epub/baren-sump-book-3-the-black-path_v1.epub`

### Print interior PDF

- `pdf/baren-sump-book-1-interior-print_v1.pdf`
- `pdf/baren-sump-book-2-interior-print_v1.pdf`
- `pdf/baren-sump-book-3-interior-print_v1.pdf`

### Validation artifacts

- `EXPORT_VALIDATION_REPORT.md`
- `epub/book-*-epubcheck.txt`
- `pdf/book-*-pdfinfo.txt`

## Regeneration notes

EPUB generation uses Pandoc and the ID-normalization Lua filter:

- `scripts/pandoc_unique_ids.lua`

Book Three requires this filter to avoid duplicate heading IDs in EPUB XHTML output.
