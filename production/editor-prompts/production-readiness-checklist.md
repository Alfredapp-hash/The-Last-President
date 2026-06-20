# Production Readiness Checklist
## Baren Sump and The Last President — Trilogy Sign-Off

Use after each book-specific expert editor agent completes its pass. All three books must pass before declaring the series **publication ready**.

---

## Series-wide (complete once after all books)

| # | Check | Book 1 | Book 2 | Book 3 | Notes |
|---|-------|:------:|:------:|:------:|-------|
| S1 | Series Master rules applied | ☐ | ☐ | ☐ | |
| S2 | Character name lock table — zero variants | ☐ | ☐ | ☐ | |
| S3 | Continuous chapter numbering 1–84 verified | ☐ | ☐ | ☐ | |
| S4 | Controlling sentences intact (see below) | ☐ | ☐ | ☐ | |
| S5 | Cross-book timeline consistent | ☐ | ☐ | ☐ | |
| S6 | House style: curly quotes, em dashes, no double spaces | ☐ | ☐ | ☐ | |
| S7 | Reader copy free of production markers | ☐ | ☐ | ☐ | |
| S8 | PRODUCTION_EDITOR_LOG.txt delivered per book | ☐ | ☐ | ☐ | |

### Controlling sentences (exact or functionally exact)

- [ ] Book One: *"Every accusation is advertising."*
- [ ] Book Two: *"Children are not evidence."*
- [ ] Book Three: *"Some days refused to become evidence."* / *"Not as proof. Not as witness. Not as remedy."*

### Trilogy closing lines preserved

- [ ] Book One: *"To him not knowing until morning."*
- [ ] Book Two: *"Some days were allowed to end without becoming part of the case."*
- [ ] Book Three: *"And all, for once, did not ask to be everything."*

---

## Book One — *The Last President*

**Target word count:** ~83,000 (±500)  
**Files:** `production/books/book-one/*FINAL_READER_COPY.docx`

| # | Check | Pass |
|---|-------|:----:|
| 1.1 | Prologue prediction card text exact | ☐ |
| 1.2 | INTERLUDE styled Heading 1/2 | ☐ |
| 1.3 | All 24 chapter subtitles present | ☐ |
| 1.4 | Zero run-boundary spacing defects | ☐ |
| 1.5 | Barren/BAREN wordplay intact | ☐ |
| 1.6 | Echo paragraphs preserved (Simon declaration, etc.) | ☐ |
| 1.7 | Art Brief matches author master anchors (8 illustrations) | ☐ |
| 1.8 | No `[ILLUSTRATION PLACEMENT]` in reader copy | ☐ |
| 1.9 | END OF BOOK ONE present | ☐ |
| 1.10 | Full read-aloud sample: Prologue + Ch. 4 + Ch. 13 + Ch. 24 — no stumbles | ☐ |

---

## Book Two — *Children of Tomorrow*

**Target word count:** ~88,000 (floor 87,400)  
**Files:** `production/books/book-two/*FINAL_READER_COPY.docx`

| # | Check | Pass |
|---|-------|:----:|
| 2.1 | Ch. 25 cereal-box opening intact | ☐ |
| 2.2 | Interlude: seven identifiers, no names | ☐ |
| 2.3 | Ch. 30 subtitle: *They Carried Moral Force* | ☐ |
| 2.4 | Look-Away Ledger / RAF-One consistent | ☐ |
| 2.5 | Echo paragraph (monsters/heroes) preserved | ☐ |
| 2.6 | Compression pass not reversed (word count floor) | ☐ |
| 2.7 | Plural-children scale maintained | ☐ |
| 2.8 | Book Three hinge at Ch. 54 close | ☐ |
| 2.9 | END OF BOOK TWO present | ☐ |
| 2.10 | Full read-aloud sample: Interlude + Ch. 29 + Ch. 54 | ☐ |

---

## Book Three — *The Black Path*

**Target word count:** ~62,000 (floor 61,600)  
**Files:** `production/books/book-three/*FINAL_READER_COPY.docx`

| # | Check | Pass |
|---|-------|:----:|
| 3.1 | Opening black path thesis block intact | ☐ |
| 3.2 | Title page clean (no duplicate lines) | ☐ |
| 3.3 | Ch. 57 worksheet `0.8 = ?` preserved | ☐ |
| 3.4 | Repetition movement Ch. 68–79 intact | ☐ |
| 3.5 | Doubled words (cereal, trying) preserved | ☐ |
| 3.6 | No climax/spectacle added in Ch. 80–84 | ☐ |
| 3.7 | Compression pass not reversed (word count floor) | ☐ |
| 3.8 | Closing block Ch. 84 untouched in meaning | ☐ |
| 3.9 | END OF BOOK THREE present | ☐ |
| 3.10 | Full read-aloud sample: Ch. 55 + Ch. 74 + Ch. 84 | ☐ |

---

## Mechanical grep passes (run on each reader copy)

```bash
# Example patterns — zero matches required unless noted
writtenChildren|readTHE|circledlaughed|andstabilization  # Book One
\bTK\b|\bTODO\b|\[ILLUSTRATION                           # All books
Chronold|Moro|Veira|Dalia|Lilah|Barren\b                 # Barren except intentional B1 plot
  -- Book One Barren wordplay excepted
```

| Pattern | Expected |
|---------|----------|
| Double spaces | 0 |
| Straight `"` quotes in dialogue | 0 (curly only) |
| `--` for em dash in narrative | 0 |
| Missing chapter subtitle | 0 |

---

## Deliverables inventory

| Deliverable | B1 | B2 | B3 |
|-------------|:--:|:--:|:--:|
| FINAL_READER_COPY.docx (updated) | ☐ | ☐ | ☐ |
| AUTHOR_PRODUCTION_MASTER.docx (synced) | ☐ | ☐ | ☐ |
| PRODUCTION_EDITOR_LOG.txt | ☐ | ☐ | ☐ |
| Author flags resolved or documented | ☐ | ☐ | ☐ |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Expert editor agent (Book One) | | | |
| Expert editor agent (Book Two) | | | |
| Expert editor agent (Book Three) | | | |
| Author approval | Alfred App | | |

**Series status:** ☐ NOT READY  ☐ READY FOR QUERY/BETA  ☐ READY FOR PUBLICATION LAYOUT

---

## Recommended post-checklist steps

1. **EPUB/PDF layout** — professional book design (separate from this copyedit)
2. **Illustration commission** — Book One Art Brief (8 pieces)
3. **Beta reader cohort** — legal/thriller + literary fiction mix
4. **Query materials** — use `production/marketing/press-kit.md`
