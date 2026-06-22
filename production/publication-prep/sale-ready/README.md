# Sale-Ready Package — Baren Sump Trilogy

This folder contains validated deliverables for direct-to-reader sales (Gumroad).

## Start here

1. Read `FULL_MANUSCRIPT_SCAN.md` — full-text integrity scan
2. Read `SALE_SIGNOFF.md` — release decision
3. Open `gumroad/` — per-book upload folders with listing copy and files
4. Use `MANIFEST.json` — checksums for release verification

## Regenerate

```bash
python3 scripts/publication_prep_audit.py
python3 scripts/run_publication_exports.py
python3 scripts/final_manuscript_scan.py
python3 scripts/prepare_sale_package.py
```
