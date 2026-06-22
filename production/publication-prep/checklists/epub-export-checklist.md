# EPUB Export Checklist (Per Book)

Use with each `*_FINAL_READER_COPY.docx` after inserting front/back matter templates.

## 1) Pre-export manuscript prep

- [ ] Confirm title page, copyright page, and dedication are present
- [ ] Confirm body starts at the first narrative heading
- [ ] Confirm final line still ends with `END OF BOOK [ONE/TWO/THREE]`
- [ ] Confirm no placeholder tokens (`TK`, `TODO`, `[ILLUSTRATION PLACEMENT]`)
- [ ] Confirm heading styles are consistent (`Heading 1` chapter heads, `Heading 2` subtitles)
- [ ] Remove double blank paragraphs
- [ ] Confirm scene-break marker style is consistent

## 2) Word export settings

- [ ] Save clean DOCX copy as `*_EPUB_SOURCE.docx`
- [ ] Use paragraph styles (no manual font overrides for headings)
- [ ] Ensure images are inline and have alt text (if included)
- [ ] Use hyperlink formatting for URLs in back matter

## 3) EPUB generation

Preferred tools:

- Pandoc
- Vellum
- Atticus
- Draft2Digital conversion (for distribution variants)

If using pandoc:

```bash
pandoc "BOOK_SOURCE.docx" \
  --to epub3 \
  --metadata title="BOOK TITLE" \
  --metadata creator="Alfred App" \
  --output "BOOK_TITLE.epub"
```

## 4) EPUB validation

- [ ] Run EPUBCheck and resolve all ERROR/WARN entries
- [ ] Verify table of contents entries map to all chapters
- [ ] Verify chapter breaks render cleanly on mobile and tablet
- [ ] Verify italic/bold formatting survived conversion
- [ ] Verify front matter and back matter links function
- [ ] Verify no orphan heading pages or duplicate chapter entries

## 5) Device QA pass

- [ ] Apple Books (desktop or iOS)
- [ ] Kindle Previewer (EPUB ingestion view)
- [ ] Google Play Books preview
- [ ] Kobo preview

## 6) Final EPUB package naming

- [ ] `baren-sump-book-1-the-last-president_v1.epub`
- [ ] `baren-sump-book-2-children-of-tomorrow_v1.epub`
- [ ] `baren-sump-book-3-the-black-path_v1.epub`

Record final filenames in `distribution-submission-checklist.md`.
