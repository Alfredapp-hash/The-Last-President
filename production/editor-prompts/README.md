# Baren Sump Trilogy — Expert Editor Agent Prompts

Production-grade prompts for finishing the trilogy manuscripts after the completed line-edit / compression passes.

## Workflow (run in this order)

| Step | Prompt file | Agent task |
|------|-------------|------------|
| **0** | [`00-series-line-edit-master.md`](./00-series-line-edit-master.md) | Establish series-wide rules, voice bible, continuity locks, and production standards. Run once before any book agent. |
| **1** | [`01-book-one-expert-editor.md`](./01-book-one-expert-editor.md) | Final production pass on *The Last President* |
| **2** | [`02-book-two-expert-editor.md`](./02-book-two-expert-editor.md) | Final production pass on *Children of Tomorrow* |
| **3** | [`03-book-three-expert-editor.md`](./03-book-three-expert-editor.md) | Final production pass on *The Black Path* |
| **4** | [`production-readiness-checklist.md`](./production-readiness-checklist.md) | Sign-off checklist for all three books |

## Source manuscripts (edit these)

| Book | Reader copy (primary) | Author master (art notes) |
|------|----------------------|---------------------------|
| Book One | `production/books/book-one/Baren_Sump_BOOK_ONE_The_Last_President_FINAL_READER_COPY.docx` | `...AUTHOR_PRODUCTION_MASTER.docx` |
| Book Two | `production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx` | `...AUTHOR_PRODUCTION_MASTER.docx` |
| Book Three | `production/books/book-three/Baren_Sump_BOOK_THREE_The_Black_Path_FINAL_READER_COPY.docx` | `...AUTHOR_PRODUCTION_MASTER.docx` |

**Rule:** All prose edits go to the **FINAL_READER_COPY** first. Mirror approved changes to AUTHOR_PRODUCTION_MASTER unless the change is art-placement only.

## How to use with Cursor / Cloud Agents

1. Paste the **Series Master** prompt as the agent system instruction (or first message).
2. Attach the relevant book's `.docx` (or extracted text).
3. Paste the **book-specific expert editor** prompt as the task message.
4. Require the agent to output:
   - A change log (chapter, issue, fix)
   - A `PRODUCTION_EDITOR_LOG.txt` appended to the book folder
   - Updated `.docx` if the agent can edit files; otherwise a marked revision manuscript

## Prior editorial work (already done — do not redo)

- **Book One:** Final packaging pass; 119+ run-boundary spacing repairs; art brief extracted; INTERLUDE heading styled
- **Book Two:** Compression/voice pass (−5.4%); procedural language tightened; structural upgrades preserved (RAF-One, Look-Away Ledger, plural children)
- **Book Three:** Compression/voice pass (−0.6%); Morro/advisory beats compressed; quiet ending preserved

These prompts target **final copyedit + production readiness**, not structural rewrites.

## What "production ready" means here

- Zero typographic / spacing / punctuation defects
- Consistent character names, timeline, and legal terminology across the trilogy
- House style applied (see Series Master)
- No leftover production markers in reader copy
- Chapter headings and subtitles complete and styled
- Endings and controlling sentences untouched unless grammatically broken
- Human-readable change log for author sign-off
