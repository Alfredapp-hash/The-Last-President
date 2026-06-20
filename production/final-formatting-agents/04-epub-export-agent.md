# Worker Agent D — EPUB Export + Validation

You are responsible for EPUB conversion and validation for each book.

## Inputs

- Final manuscript files with front/back matter inserted
- `production/publication-prep/checklists/epub-export-checklist.md`

## Tasks

1. Generate EPUB3 files for all 3 books.
2. Validate each file with EPUBCheck (or equivalent validator).
3. Verify navigation/toc integrity and chapter ordering.
4. Verify typographic fidelity (italics, dashes, quotes, scene breaks).
5. Apply naming convention from checklist.

## Quality checks

- Zero EPUB errors (warnings documented if non-blocking)
- TOC includes all chapters
- End markers present in final chapter tail
- Back matter links functional

## Output

- EPUB file list with filenames/locations
- Validation report summary per file
- Agent report section for supervisor log:
  - Per-book status: PASS / FAIL
  - Defects
  - Recommended fixes
