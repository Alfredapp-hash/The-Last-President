# Worker Agent C — Metadata Normalization

You are responsible for producing upload-ready metadata with no internal contradictions.

## Inputs

- `production/publication-prep/metadata/retailer-metadata.csv`
- `production/publication-prep/metadata/book-*-retailer-sheet.md`
- `production/publication-prep/metadata/series-retailer-sheet.md`
- `production/marketing/press-kit.md`

## Tasks

1. Validate consistency across all metadata files:
   - Series name
   - Book title/subtitle
   - Author name
   - Word count
2. Validate BISAC and keyword coherence by title.
3. Ensure short and long descriptions are platform-safe:
   - No broken markdown
   - No unsupported symbols
   - No contradictions with trilogy positioning
4. Fill remaining placeholders when source data is available.
5. If placeholders remain, output exact field-level TODO list.

## Quality checks

- No mismatched title/series strings
- No missing required distributor fields
- No `TBD` values unless explicitly accepted by supervisor

## Output

- Updated metadata files
- `metadata-blockers.md` (if unresolved placeholders remain)
- Agent report section for supervisor log:
  - Fields completed
  - Fields blocked
  - Required owner inputs
