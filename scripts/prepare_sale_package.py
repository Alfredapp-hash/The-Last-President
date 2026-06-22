#!/usr/bin/env python3
"""Assemble sale-ready Gumroad package from validated exports."""

from __future__ import annotations

import csv
import hashlib
import json
import shutil
import subprocess
import zipfile
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("/workspace")
OUT = ROOT / "production" / "publication-prep" / "sale-ready"
GUMROAD = OUT / "gumroad"
METADATA_CSV = ROOT / "production/publication-prep/metadata/retailer-metadata.csv"

PRODUCTS = [
    {
        "slug": "the-last-president",
        "folder": "book-one-the-last-president",
        "series_number": 1,
        "epub_src": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-1-the-last-president_v1.epub",
        "pdf_src": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-1-interior-print_v1.pdf",
        "cover_src": ROOT / "public/images/covers/cover-book-one-titled.png",
        "epub_name": "the-last-president.epub",
        "pdf_name": "the-last-president.pdf",
        "cover_name": "cover.png",
    },
    {
        "slug": "children-of-tomorrow",
        "folder": "book-two-children-of-tomorrow",
        "series_number": 2,
        "epub_src": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-2-children-of-tomorrow_v1.epub",
        "pdf_src": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-2-interior-print_v1.pdf",
        "cover_src": ROOT / "public/images/covers/cover-book-two-titled.png",
        "epub_name": "children-of-tomorrow.epub",
        "pdf_name": "children-of-tomorrow.pdf",
        "cover_name": "cover.png",
    },
    {
        "slug": "the-black-path",
        "folder": "book-three-the-black-path",
        "series_number": 3,
        "epub_src": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-3-the-black-path_v1.epub",
        "pdf_src": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-3-interior-print_v1.pdf",
        "cover_src": ROOT / "public/images/covers/cover-book-three-titled.png",
        "epub_name": "the-black-path.epub",
        "pdf_name": "the-black-path.pdf",
        "cover_name": "cover.png",
    },
]


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def load_metadata() -> dict[str, dict[str, str]]:
    rows: dict[str, dict[str, str]] = {}
    with METADATA_CSV.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            rows[row["book_slug"]] = row
    return rows


def listing_md(row: dict[str, str], include_pdf_note: bool = True) -> str:
    pdf_line = (
        "- **PDF edition** (print-formatted interior, included as a bonus download)\n"
        if include_pdf_note
        else ""
    )
    return f"""# Gumroad Listing — {row['title']}

## Product name
{row['title']} ({row['subtitle']}) — {row['series_name']}

## Price suggestion
$9.99 USD (adjust per launch strategy)

## Short description
{row['short_description']}

## Long description
{row['long_description']}

## What the buyer gets
- **EPUB** (recommended for Apple Books, Kobo, Google Play, and most e-readers)
{pdf_line}- Cover image for library display

## Tags / keywords
{row['keywords']}

## Series position
Book {row['series_number']} of 3

## Website
{row['website']}/books/{row['book_slug']}

## Upload steps
1. Create a new digital product on Gumroad.
2. Upload `{row['book_slug']}.epub` as the primary file.
3. Add PDF as an additional file if offering a dual-format download.
4. Use `cover.png` as the product thumbnail.
5. Paste the short description into the summary field and the long description into the details field.
6. Publish when ready.
"""


def bundle_listing_md(rows: list[dict[str, str]]) -> str:
    total_words = sum(int(r["word_count"]) for r in rows)
    return f"""# Gumroad Listing — Complete Trilogy Bundle

## Product name
Baren Sump and The Last President — Complete Trilogy (Books 1–3)

## Price suggestion
$24.99 USD (bundle discount vs. three singles at $9.99)

## Short description
Three books. Eighty-four chapters. One complete case file. Not a chosen-one story — a literary political thriller where children are monitored like assets and ordinary life makes the final claim.

## Long description
**Baren Sump and The Last President** is a completed literary political-thriller trilogy (~{total_words:,} words) built as one case file.

**Book One — The Last President**
{rows[0]['short_description']}

**Book Two — Children of Tomorrow**
{rows[1]['short_description']}

**Book Three — The Black Path**
{rows[2]['short_description']}

## What the buyer gets
- All three EPUB volumes
- Optional PDF editions for each volume
- Trilogy box-set cover image

## Upload steps
1. Create a new digital bundle product on Gumroad.
2. Upload `baren-sump-trilogy-epub-bundle.zip` (or attach each EPUB separately).
3. Add PDF zip as a bonus file if desired.
4. Use `trilogy-cover.png` as the product thumbnail.
5. Publish when ready.
"""


def write_readme() -> None:
    text = """# Sale-Ready Package — Baren Sump Trilogy

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
"""
    (OUT / "README.md").write_text(text, encoding="utf-8")


def main() -> None:
    meta = load_metadata()
    if GUMROAD.exists():
        shutil.rmtree(GUMROAD)
    for stale in (OUT / "MANIFEST.json",):
        if stale.exists():
            stale.unlink()
    GUMROAD.mkdir(parents=True, exist_ok=True)

    manifest_files: list[dict[str, str]] = []

    for product in PRODUCTS:
        row = meta[product["slug"]]
        dest = GUMROAD / product["folder"]
        dest.mkdir(parents=True, exist_ok=True)

        for src_key, dest_name in [
            ("epub_src", product["epub_name"]),
            ("pdf_src", product["pdf_name"]),
            ("cover_src", product["cover_name"]),
        ]:
            src: Path = product[src_key]
            if not src.exists():
                raise FileNotFoundError(src)
            target = dest / dest_name
            shutil.copy2(src, target)
            manifest_files.append(
                {
                    "path": str(target.relative_to(ROOT)),
                    "sha256": sha256(target),
                    "bytes": str(target.stat().st_size),
                }
            )

        (dest / "LISTING.md").write_text(listing_md(row), encoding="utf-8")

    bundle_dir = GUMROAD / "trilogy-bundle"
    bundle_dir.mkdir(parents=True, exist_ok=True)
    rows = [meta[p["slug"]] for p in PRODUCTS]
    (bundle_dir / "LISTING.md").write_text(bundle_listing_md(rows), encoding="utf-8")
    shutil.copy2(
        ROOT / "public/images/covers/trilogy-box-set.png",
        bundle_dir / "trilogy-cover.png",
    )

    epub_zip = bundle_dir / "baren-sump-trilogy-epub-bundle.zip"
    pdf_zip = bundle_dir / "baren-sump-trilogy-pdf-bundle.zip"
    with zipfile.ZipFile(epub_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for product in PRODUCTS:
            zf.write(
                product["epub_src"],
                arcname=product["epub_name"],
            )
    with zipfile.ZipFile(pdf_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for product in PRODUCTS:
            zf.write(
                product["pdf_src"],
                arcname=product["pdf_name"],
            )

    for extra in (epub_zip, pdf_zip, bundle_dir / "trilogy-cover.png"):
        manifest_files.append(
            {
                "path": str(extra.relative_to(ROOT)),
                "sha256": sha256(extra),
                "bytes": str(extra.stat().st_size),
            }
        )

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    manifest = {"generated_at": now, "files": manifest_files}
    (OUT / "MANIFEST.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    write_readme()
    print(f"Sale package written to {OUT}")


if __name__ == "__main__":
    main()
