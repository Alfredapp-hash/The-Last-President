# Comprehensive Production Readiness Audit

This folder contains category-by-category "expert agent" audits plus a master scorecard.

## Files

- `00-master-scorecard.md` — consolidated decision and risk summary
- `01-editorial.md` — manuscript integrity
- `02-formatting.md` — formatting and package assembly
- `03-metadata.md` — metadata/catalog integrity
- `04-ebook.md` — EPUB compliance
- `05-print.md` — print package readiness
- `06-web.md` — site deployment readiness
- `07-marketing.md` — launch collateral completeness
- `08-ops.md` — automation/governance/release operations

## Regeneration

Run:

```bash
python3 scripts/run_comprehensive_production_audit.py
```

This re-runs build/lint and key file-level checks before regenerating all reports.
