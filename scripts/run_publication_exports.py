#!/usr/bin/env python3
"""Generate EPUB/PDF exports and validation reports for trilogy books."""

from __future__ import annotations

import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("/workspace")
BOOKS = [
    {
        "slug": "book-1",
        "title": "The Last President",
        "subtitle": "Book One",
        "docx": ROOT
        / "production/books/book-one/Baren_Sump_BOOK_ONE_The_Last_President_FINAL_READER_COPY.docx",
        "cover": ROOT / "public/images/covers/cover-book-one-titled.png",
        "epub": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-1-the-last-president_v1.epub",
        "html": ROOT
        / "production/publication-prep/exports/html/baren-sump-book-1-the-last-president_v1.html",
        "pdf": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-1-interior-print_v1.pdf",
    },
    {
        "slug": "book-2",
        "title": "Children of Tomorrow",
        "subtitle": "Book Two",
        "docx": ROOT
        / "production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx",
        "cover": ROOT / "public/images/covers/cover-book-two-titled.png",
        "epub": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-2-children-of-tomorrow_v1.epub",
        "html": ROOT
        / "production/publication-prep/exports/html/baren-sump-book-2-children-of-tomorrow_v1.html",
        "pdf": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-2-interior-print_v1.pdf",
    },
    {
        "slug": "book-3",
        "title": "The Black Path",
        "subtitle": "Book Three",
        "docx": ROOT
        / "production/books/book-three/Baren_Sump_BOOK_THREE_The_Black_Path_FINAL_READER_COPY.docx",
        "cover": ROOT / "public/images/covers/cover-book-three-titled.png",
        "epub": ROOT
        / "production/publication-prep/exports/epub/baren-sump-book-3-the-black-path_v1.epub",
        "html": ROOT
        / "production/publication-prep/exports/html/baren-sump-book-3-the-black-path_v1.html",
        "pdf": ROOT
        / "production/publication-prep/exports/pdf/baren-sump-book-3-interior-print_v1.pdf",
    },
]

UNIQUE_IDS_FILTER = ROOT / "scripts/pandoc_unique_ids.lua"
EPUBCHECK_JAR = Path("/usr/share/java/epubcheck.jar")


@dataclass
class BookResult:
    slug: str
    epub_ok: bool
    epub_report_path: Path
    pdf_report_path: Path
    pdf_pages: str
    pdf_size_bytes: str


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, check=True, text=True, capture_output=True)


def ensure_dirs() -> None:
    (ROOT / "production/publication-prep/exports/epub").mkdir(parents=True, exist_ok=True)
    (ROOT / "production/publication-prep/exports/html").mkdir(parents=True, exist_ok=True)
    (ROOT / "production/publication-prep/exports/pdf").mkdir(parents=True, exist_ok=True)


def generate_for_book(book: dict[str, Path | str]) -> BookResult:
    run(
        [
            "pandoc",
            str(book["docx"]),
            "--lua-filter",
            str(UNIQUE_IDS_FILTER),
            "--metadata",
            f"title={book['title']}",
            "--metadata",
            f"subtitle={book['subtitle']}",
            "--metadata",
            "creator=Alfred App",
            "--epub-cover-image",
            str(book["cover"]),
            "-o",
            str(book["epub"]),
        ]
    )
    run(["pandoc", str(book["docx"]), "-s", "-o", str(book["html"])])
    run(
        [
            "wkhtmltopdf",
            "--enable-local-file-access",
            str(book["html"]),
            str(book["pdf"]),
        ]
    )

    epub_report_path = (
        ROOT / f"production/publication-prep/exports/epub/{book['slug']}-epubcheck.txt"
    )
    epub = run(["java", "-jar", str(EPUBCHECK_JAR), str(book["epub"])])
    epub_report_path.write_text(epub.stdout, encoding="utf-8")

    pdf_report_path = ROOT / f"production/publication-prep/exports/pdf/{book['slug']}-pdfinfo.txt"
    pdf = run(["pdfinfo", str(book["pdf"])])
    pdf_report_path.write_text(pdf.stdout, encoding="utf-8")

    pages = "unknown"
    size_bytes = "unknown"
    for line in pdf.stdout.splitlines():
        if line.startswith("Pages:"):
            pages = line.split(":", 1)[1].strip()
        if line.startswith("File size:"):
            size_bytes = line.split(":", 1)[1].strip().split(" ")[0]

    epub_ok = "No errors or warnings detected." in epub.stdout

    return BookResult(
        slug=str(book["slug"]),
        epub_ok=epub_ok,
        epub_report_path=epub_report_path,
        pdf_report_path=pdf_report_path,
        pdf_pages=pages,
        pdf_size_bytes=size_bytes,
    )


def write_summary(results: list[BookResult]) -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    report = ROOT / "production/publication-prep/exports/EXPORT_VALIDATION_REPORT.md"
    lines = [
        "# Export Validation Report",
        "",
        f"Date: {now}",
        "",
        "## Validation summary",
        "",
        "| Book | EPUBCheck | PDF pages | PDF size (bytes) |",
        "|------|-----------|----------:|-----------------:|",
    ]
    for result in results:
        lines.append(
            f"| {result.slug} | {'PASS' if result.epub_ok else 'FAIL'} | {result.pdf_pages} | {result.pdf_size_bytes} |"
        )
    lines.extend(
        [
            "",
            "## Raw validation artifacts",
            "",
        ]
    )
    for result in results:
        lines.append(f"- `{result.epub_report_path.relative_to(ROOT)}`")
        lines.append(f"- `{result.pdf_report_path.relative_to(ROOT)}`")
    lines.extend(
        [
            "",
            "## Notes",
            "",
            "- Print cover wrap PDFs are not generated by this script and remain a manual step.",
            "- Book Three EPUB relies on `scripts/pandoc_unique_ids.lua` to prevent duplicate XHTML IDs.",
        ]
    )
    report.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    ensure_dirs()
    results = [generate_for_book(book) for book in BOOKS]
    write_summary(results)
    if not all(r.epub_ok for r in results):
        raise SystemExit(1)
    print("Exports and validation completed successfully.")


if __name__ == "__main__":
    main()
