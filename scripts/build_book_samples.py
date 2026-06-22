#!/usr/bin/env python3
"""Build professional first-3-chapter reader samples (EPUB + PDF with cover)."""

from __future__ import annotations

import html
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path

from docx import Document


ROOT = Path("/workspace")
OUT_DIR = ROOT / "public" / "downloads"
WORK_DIR = ROOT / "production" / "sample-assets" / "build"
PDF_CSS = ROOT / "production" / "sample-assets" / "reader-sample.css"
EPUB_CSS = ROOT / "production" / "sample-assets" / "epub-sample.css"
SERIES_TITLE = "Baren Sump and The Last President"
CONTACT = "hello@thesumpledger.com"
WEBSITE = "https://thesumpledger.com"


@dataclass(frozen=True)
class BookSampleConfig:
    slug: str
    title: str
    subtitle: str
    accent: str
    source_docx: Path
    cover_image: Path


BOOKS = [
    BookSampleConfig(
        slug="the-last-president",
        title="The Last President",
        subtitle="Book One",
        accent="#9e2b3c",
        source_docx=ROOT
        / "production/books/book-one/Baren_Sump_BOOK_ONE_The_Last_President_FINAL_READER_COPY.docx",
        cover_image=ROOT / "public/images/covers/cover-book-one-titled.png",
    ),
    BookSampleConfig(
        slug="children-of-tomorrow",
        title="Children of Tomorrow",
        subtitle="Book Two",
        accent="#c9a962",
        source_docx=ROOT
        / "production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx",
        cover_image=ROOT / "public/images/covers/cover-book-two-titled.png",
    ),
    BookSampleConfig(
        slug="the-black-path",
        title="The Black Path",
        subtitle="Book Three",
        accent="#5a7a52",
        source_docx=ROOT
        / "production/books/book-three/Baren_Sump_BOOK_THREE_The_Black_Path_FINAL_READER_COPY.docx",
        cover_image=ROOT / "public/images/covers/cover-book-three-titled.png",
    ),
]


@dataclass
class Paragraph:
    kind: str
    text: str


@dataclass
class Section:
    heading: str
    paragraphs: list[Paragraph]


def is_narrative_heading(text: str) -> bool:
    t = text.strip().upper()
    return (
        t.startswith("CHAPTER ")
        or t in {"PROLOGUE", "INTERLUDE", "THE BLACK PATH"}
    )


def paragraph_kind(style_name: str) -> str:
    style = (style_name or "").lower()
    if style == "heading 2":
        return "h2"
    if style == "heading 1":
        return "h1"
    return "p"


def extract_sections(doc: Document) -> list[Section]:
    paras = doc.paragraphs
    heading_idxs: list[tuple[int, str]] = []
    for i, p in enumerate(paras):
        style = (p.style.name if p.style else "") or ""
        txt = p.text.strip()
        if not txt:
            continue
        if style == "Heading 1" and is_narrative_heading(txt):
            heading_idxs.append((i, txt))

    sections: list[Section] = []
    for n, (start_idx, heading) in enumerate(heading_idxs):
        end_idx = heading_idxs[n + 1][0] if n + 1 < len(heading_idxs) else len(paras)
        items: list[Paragraph] = []
        for p in paras[start_idx + 1 : end_idx]:
            txt = p.text.strip()
            if not txt:
                continue
            items.append(Paragraph(paragraph_kind(p.style.name if p.style else ""), txt))
        sections.append(Section(heading=heading, paragraphs=items))
    return sections


def select_first_three_chapters(sections: list[Section]) -> list[Section]:
    selected: list[Section] = []
    start = 0
    if sections and sections[0].heading == "PROLOGUE":
        selected.append(sections[0])
        start = 1
    chapter_sections = [s for s in sections[start:] if s.heading.startswith("CHAPTER ")]
    selected.extend(chapter_sections[:3])
    return selected


def scope_line(sections: list[Section]) -> str:
    includes_prologue = bool(sections and sections[0].heading == "PROLOGUE")
    if includes_prologue:
        return (
            "This complimentary reader sample includes the prologue and the first "
            "three chapters from the production manuscript."
        )
    return (
        "This complimentary reader sample includes the first three chapters from "
        "the production manuscript."
    )


def render_markdown(cfg: BookSampleConfig, sections: list[Section]) -> str:
    lines = [
        "---",
        f'title: "{cfg.title}"',
        f'subtitle: "{cfg.subtitle} — First 3 Chapters Reader Sample"',
        f'creator: "Alfred App"',
        f"rights: © Alfred App. Sample excerpt for reader evaluation.",
        "---",
        "",
        f"% {cfg.title}",
        "",
        f"*{cfg.subtitle} · {SERIES_TITLE}*",
        "",
        "## Reader Sample",
        "",
        scope_line(sections),
        "",
        f"Full volume and trilogy information: {WEBSITE}",
        "",
        f"Rights, review copies, and media: {CONTACT}",
        "",
        "---",
        "",
    ]

    for section in sections:
        lines.append(f"# {section.heading}")
        lines.append("")
        for para in section.paragraphs:
            if para.kind == "h2":
                lines.append(f"## {para.text}")
                lines.append("")
            elif para.kind == "h1":
                lines.append(f"## {para.text}")
                lines.append("")
            else:
                lines.append(para.text)
                lines.append("")
        lines.append("")
    return "\n".join(lines).strip() + "\n"


def render_html(cfg: BookSampleConfig, sections: list[Section]) -> str:
    chapter_blocks: list[str] = []
    for section in sections:
        body: list[str] = []
        for para in section.paragraphs:
            safe = html.escape(para.text)
            if para.kind == "h2":
                body.append(f'<h3 class="chapter-title">{safe}</h3>')
            elif para.kind == "h1":
                body.append(f'<h3 class="chapter-title">{safe}</h3>')
            else:
                body.append(f"<p>{safe}</p>")
        chapter_blocks.append(
            f'<section class="chapter">'
            f'<h2 class="chapter-label">{html.escape(section.heading)}</h2>'
            f"{''.join(body)}"
            f"</section>"
        )

    cover_uri = cfg.cover_image.resolve().as_uri()
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>{html.escape(cfg.title)} — Reader Sample</title>
  <link rel="stylesheet" href="{PDF_CSS.resolve().as_uri()}" />
  <style>:root {{ --accent: {cfg.accent}; }}</style>
</head>
<body>
  <section class="cover-page">
    <div class="cover-frame">
      <img src="{cover_uri}" alt="{html.escape(cfg.title)} cover" />
    </div>
    <p class="cover-badge">Reader Sample · First 3 Chapters</p>
    <p class="cover-series">{html.escape(SERIES_TITLE)}</p>
  </section>

  <section class="front-matter">
    <p class="eyebrow">{html.escape(SERIES_TITLE)}</p>
    <h1 class="title">{html.escape(cfg.title)}</h1>
    <p class="subtitle">{html.escape(cfg.subtitle)}</p>
    <div class="sample-box">
      <h2>Complimentary excerpt</h2>
      <p>{html.escape(scope_line(sections))}</p>
      <p>For the complete volume, visit {WEBSITE}. Review copies and rights: {CONTACT}.</p>
    </div>
    <p class="meta-line">Alfred App Publishing · Reader Sample Edition</p>
  </section>

  {''.join(chapter_blocks)}

  <section class="back-page">
    <h2>Continue reading</h2>
    <p>The complete volume is available at launch.</p>
    <p class="back-url">{WEBSITE}/books/{html.escape(cfg.slug)}</p>
    <p class="meta-line">© Alfred App · {html.escape(SERIES_TITLE)}</p>
  </section>
</body>
</html>
"""


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, text=True, capture_output=True)


def build_sample(cfg: BookSampleConfig) -> None:
    doc = Document(str(cfg.source_docx))
    sections = select_first_three_chapters(extract_sections(doc))
    if not sections:
        raise RuntimeError(f"No narrative sections found in {cfg.source_docx}")

    WORK_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    base = cfg.slug
    md_path = WORK_DIR / f"{base}.md"
    html_path = WORK_DIR / f"{base}.html"
    epub_path = OUT_DIR / f"{base}-first-3-chapters-sample.epub"
    pdf_path = OUT_DIR / f"{base}-first-3-chapters-sample.pdf"

    md_path.write_text(render_markdown(cfg, sections), encoding="utf-8")
    html_path.write_text(render_html(cfg, sections), encoding="utf-8")

    run(
        [
            "pandoc",
            str(md_path),
            "--from=markdown",
            "--to=epub3",
            "--css",
            str(EPUB_CSS),
            "--epub-cover-image",
            str(cfg.cover_image),
            "--metadata",
            f"title={cfg.title}",
            "--metadata",
            f"subtitle={cfg.subtitle} — First 3 Chapters Reader Sample",
            "--metadata",
            "creator=Alfred App",
            "--metadata",
            f"description={scope_line(sections)}",
            "-o",
            str(epub_path),
        ]
    )

    run(
        [
            "wkhtmltopdf",
            "--enable-local-file-access",
            "--margin-top",
            "0",
            "--margin-bottom",
            "0",
            "--margin-left",
            "0",
            "--margin-right",
            "0",
            str(html_path),
            str(pdf_path),
        ]
    )

    chapter_count = sum(1 for s in sections if s.heading.startswith("CHAPTER "))
    prologue = sections[0].heading == "PROLOGUE" if sections else False
    print(
        f"Wrote {epub_path.name} and {pdf_path.name} "
        f"({chapter_count} chapters{' + prologue' if prologue else ''})"
    )


def main() -> None:
    for cfg in BOOKS:
        build_sample(cfg)


if __name__ == "__main__":
    main()
