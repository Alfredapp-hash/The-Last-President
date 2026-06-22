# Gumroad Readiness — Baren Sump Trilogy

Date: 2026-06-22  
Status: **SALE READY**

## Full manuscript scan

**PASS** — every paragraph in all three reader copies, plus EPUB verification.

Report: `production/publication-prep/sale-ready/FULL_MANUSCRIPT_SCAN.md`  
Sign-off: `production/publication-prep/sale-ready/SALE_SIGNOFF.md`

## Sale package (upload from here)

`production/publication-prep/sale-ready/gumroad/`

| Product | Folder | Files |
|---------|--------|-------|
| Book One | `book-one-the-last-president/` | EPUB, PDF, cover, `LISTING.md` |
| Book Two | `book-two-children-of-tomorrow/` | EPUB, PDF, cover, `LISTING.md` |
| Book Three | `book-three-the-black-path/` | EPUB, PDF, cover, `LISTING.md` |
| Trilogy bundle | `trilogy-bundle/` | EPUB zip, PDF zip, cover, `LISTING.md` |

Checksums: `production/publication-prep/sale-ready/MANIFEST.json`

## Gumroad checklist

- [x] Full manuscript scan (all paragraphs)
- [x] No author notes / placeholders
- [x] EPUB exports validated (EPUBCheck)
- [x] Sale-ready package with listing copy assembled
- [ ] Create four Gumroad products (3 singles + bundle)
- [ ] Set pricing and publish

## Regenerate everything

```bash
python3 scripts/publication_prep_audit.py
python3 scripts/run_publication_exports.py
python3 scripts/final_manuscript_scan.py
python3 scripts/prepare_sale_package.py
```
