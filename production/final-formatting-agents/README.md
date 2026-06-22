# Final Formatting Agent Team — Supervisor + Workers

This pack defines a **multi-agent final formatting workflow** for finishing publication files with a quality-controlled supervisor loop.

## Objective

Convert production-ready manuscripts into distributor-ready files by running specialized agents under a supervisor that enforces quality gates.

## Team topology

| Role | Prompt file | Scope |
|------|-------------|-------|
| Supervisor | [`00-supervisor-final-formatting.md`](./00-supervisor-final-formatting.md) | Plans, delegates, validates, and signs off |
| Agent A | [`01-front-matter-agent.md`](./01-front-matter-agent.md) | Inserts and styles front matter |
| Agent B | [`02-back-matter-agent.md`](./02-back-matter-agent.md) | Inserts and styles back matter |
| Agent C | [`03-metadata-normalization-agent.md`](./03-metadata-normalization-agent.md) | Finalizes retailer/distributor metadata |
| Agent D | [`04-epub-export-agent.md`](./04-epub-export-agent.md) | EPUB conversion and validation |
| Agent E | [`05-print-layout-agent.md`](./05-print-layout-agent.md) | Print interior prep and PDF export |
| Agent F | [`06-quality-gate-agent.md`](./06-quality-gate-agent.md) | Cross-book QA and defect blocking |

## Run order

1. Start Supervisor (`00-...`) and provide repo context.
2. Run Agents A/B/C in parallel (content packaging layer).
3. Supervisor performs Gate 1 review (all packaging artifacts present + coherent).
4. Run Agents D/E in parallel (distribution format layer).
5. Run Agent F (quality gate + release blocker report).
6. Supervisor writes final sign-off and launch recommendation.

## Canonical inputs

- `production/books/book-*/Baren_Sump_*_FINAL_READER_COPY.docx`
- `production/publication-prep/front-matter/*.md`
- `production/publication-prep/back-matter/*.md`
- `production/publication-prep/metadata/retailer-metadata.csv`
- `production/publication-prep/checklists/*.md`
- `production/publication-prep/audit/SUMMARY.md`

## Required outputs

- `production/publication-prep/final-formatting/SUPERVISOR_RUN_LOG.md`
- `production/publication-prep/final-formatting/QUALITY_GATE_REPORT.md`
- `production/publication-prep/final-formatting/FINAL_FORMATTING_SIGNOFF.md`

## Automation helper

Run the supervisor quality baseline script:

```bash
python3 scripts/final_formatting_supervisor.py
```

This generates/refreshes:

- `production/publication-prep/final-formatting/QUALITY_GATE_REPORT.md`

Use `--strict-metadata` to fail gate when metadata still contains placeholders (`TBD`).
