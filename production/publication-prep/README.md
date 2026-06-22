# Final Publication-Prep Pass — Deliverables

This folder contains the final publication-prep package for the completed Baren Sump trilogy manuscripts.

## Current manuscript QA status

Based on the automated publication audit (`audit/SUMMARY.md`):

- **Book One — The Last President:** PASS
- **Book Two — Children of Tomorrow:** PASS
- **Book Three — The Black Path:** PASS

Checks passed for all three reader copies:

- Heading sequence and subtitle structure
- End-of-book markers
- No placeholder/editorial token leakage (`TK`, `TODO`, `[ILLUSTRATION PLACEMENT]`)

## Folder structure

- `audit/` — generated QA reports for each book + trilogy summary
- `front-matter/` — insertion-ready front-matter templates per book
- `back-matter/` — insertion-ready back-matter templates per book
- `metadata/` — retailer/distributor metadata pack (CSV + per-book sheets)
- `checklists/` — EPUB/print/distribution workflows and sign-off checklist

## Source manuscripts used

- `production/books/book-one/Baren_Sump_BOOK_ONE_The_Last_President_FINAL_READER_COPY.docx`
- `production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx`
- `production/books/book-three/Baren_Sump_BOOK_THREE_The_Black_Path_FINAL_READER_COPY.docx`

## How to apply this package

1. Insert front matter from `front-matter/` into each `*_FINAL_READER_COPY.docx`.
2. Insert back matter from `back-matter/` into each `*_FINAL_READER_COPY.docx`.
3. Fill ISBN/pricing/placeholders in `metadata/`.
4. Run export checklists in `checklists/` for EPUB and print files.
5. Complete distributor upload checklist and final sign-off.
