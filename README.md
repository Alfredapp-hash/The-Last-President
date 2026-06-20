# The Sump Ledger

**Baren Sump and The Last President** — a completed literary thriller trilogy (~232,000 words, 84 chapters).

- **Website:** [thesumpledger.com](https://thesumpledger.com) (Next.js app at repo root)
- **Manuscripts:** Final production `.docx` files in `/production/books`
- **Marketing:** Press kit, social copy, and email templates in `/production/marketing`

## Deploy the site (Vercel)

This repo is configured for Vercel with Next.js at the repository root. Connect the GitHub repo and deploy—Vercel will build the landing page automatically.

```bash
npm install && npm run dev
```

## Manuscript packages

| Book | Folder | Reader copy |
|------|--------|-------------|
| Book One: *The Last President* | `production/books/book-one/` | `*_FINAL_READER_COPY.docx` |
| Book Two: *Children of Tomorrow* | `production/books/book-two/` | `*_FINAL_READER_COPY.docx` |
| Book Three: *The Black Path* | `production/books/book-three/` | `*_FINAL_READER_COPY.docx` |

See `production/books/README.md` for full details.

## Fix manuscripts (re-run)

```bash
python3 scripts/fix_manuscripts.py
```

Requires source packages in the uploads folder (or update paths in the script).
