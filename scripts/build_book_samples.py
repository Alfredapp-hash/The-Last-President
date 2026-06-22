#!/usr/bin/env python3
"""Build downloadable first-3-chapter sample files from production manuscripts."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from docx import Document


ROOT = Path("/workspace")
OUT_DIR = ROOT / "public" / "downloads"


@dataclass(frozen=True)
class BookSampleConfig:
    slug: str
    title: str
    subtitle: str
    source_docx: Path


BOOKS = [
    BookSampleConfig(
        slug="the-last-president",
        title="The Last President",
        subtitle="Book One",
        source_docx=ROOT
        / "production/books/book-one/Baren_Sump_BOOK_ONE_The_Last_President_FINAL_READER_COPY.docx",
    ),
    BookSampleConfig(
        slug="children-of-tomorrow",
        title="Children of Tomorrow",
        subtitle="Book Two",
        source_docx=ROOT
        / "production/books/book-two/Baren_Sump_BOOK_TWO_Children_of_Tomorrow_FINAL_READER_COPY.docx",
    ),
    BookSampleConfig(
        slug="the-black-path",
        title="The Black Path",
        subtitle="Book Three",
        source_docx=ROOT
        / "production/books/book-three/Baren_Sump_BOOK_THREE_The_Black_Path_FINAL_READER_COPY.docx",
    ),
]


def is_narrative_heading(text: str) -> bool:
    t = text.strip().upper()
    return (
        t.startswith("CHAPTER ")
        or t in {"PROLOGUE", "INTERLUDE", "THE BLACK PATH"}
    )


def extract_sections(doc: Document) -> list[tuple[str, list[str]]]:
    paras = doc.paragraphs
    heading_idxs: list[tuple[int, str]] = []
    for i, p in enumerate(paras):
        style = (p.style.name if p.style else "") or ""
        txt = p.text.strip()
        if not txt:
            continue
        if style == "Heading 1" and is_narrative_heading(txt):
            heading_idxs.append((i, txt))

    if not heading_idxs:
        return []

    sections: list[tuple[str, list[str]]] = []
    for n, (start_idx, heading) in enumerate(heading_idxs):
        end_idx = heading_idxs[n + 1][0] if n + 1 < len(heading_idxs) else len(paras)
        lines: list[str] = []
        for p in paras[start_idx + 1 : end_idx]:
            txt = p.text.strip()
            if txt:
                lines.append(txt)
        sections.append((heading, lines))
    return sections


def select_first_three_chapters(
    sections: list[tuple[str, list[str]]],
) -> list[tuple[str, list[str]]]:
    """Include opening prologue when present, then the first three numbered chapters."""
    selected: list[tuple[str, list[str]]] = []
    start = 0
    if sections and sections[0][0] == "PROLOGUE":
        selected.append(sections[0])
        start = 1

    chapter_sections = [s for s in sections[start:] if s[0].startswith("CHAPTER ")]
    selected.extend(chapter_sections[:3])
    return selected


def build_sample(cfg: BookSampleConfig) -> None:
    doc = Document(str(cfg.source_docx))
    sections = select_first_three_chapters(extract_sections(doc))
    if not sections:
        raise RuntimeError(f"No narrative sections found in {cfg.source_docx}")

    chapter_count = sum(1 for heading, _ in sections if heading.startswith("CHAPTER "))
    includes_prologue = sections[0][0] == "PROLOGUE"
    scope_line = (
        "This sample includes the prologue plus the first three chapters."
        if includes_prologue
        else "This sample includes the first three chapters."
    )

    header = [
        f"{cfg.title} ({cfg.subtitle})",
        "First 3 Chapters — Reader Sample",
        "",
        scope_line,
        "For review copies, rights, or media inquiries: hello@thesumpledger.com",
        "",
        "-" * 72,
        "",
    ]

    txt_lines = header.copy()
    md_lines = [
        f"# {cfg.title} ({cfg.subtitle})",
        "",
        "## First 3 Chapters — Reader Sample",
        "",
        scope_line,
        "For review copies, rights, or media inquiries: hello@thesumpledger.com",
        "",
        "---",
        "",
    ]

    for heading, lines in sections:
        txt_lines.append(heading.upper())
        txt_lines.append("")
        md_lines.append(f"## {heading}")
        md_lines.append("")
        for ln in lines:
            txt_lines.append(ln)
            txt_lines.append("")
            md_lines.append(ln)
            md_lines.append("")
        txt_lines.append("-" * 40)
        txt_lines.append("")
        md_lines.append("---")
        md_lines.append("")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    txt_path = OUT_DIR / f"{cfg.slug}-first-3-chapters.txt"
    md_path = OUT_DIR / f"{cfg.slug}-first-3-chapters.md"
    txt_path.write_text("\n".join(txt_lines).strip() + "\n", encoding="utf-8")
    md_path.write_text("\n".join(md_lines).strip() + "\n", encoding="utf-8")
    print(
        f"Wrote {txt_path.name} ({chapter_count} chapters"
        f"{', with prologue' if includes_prologue else ''})"
    )
    print(f"Wrote {md_path.name}")


def main() -> None:
    for cfg in BOOKS:
        build_sample(cfg)


if __name__ == "__main__":
    main()
