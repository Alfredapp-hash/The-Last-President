#!/usr/bin/env python3
"""Generate 6x9 paperback full-wrap cover files from interior page counts."""

from __future__ import annotations

import argparse
import csv
import textwrap
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path("/workspace")
EXPORT_DIR = ROOT / "production/publication-prep/exports/covers"
METADATA_CSV = ROOT / "production/publication-prep/metadata/retailer-metadata.csv"

# 6x9 paperback defaults (KDP-style assumptions for cream interior stock)
DPI = 300
TRIM_W_IN = 6.0
TRIM_H_IN = 9.0
BLEED_IN = 0.125


@dataclass(frozen=True)
class SpineProfile:
    key: str
    display_name: str
    spine_per_page_in: float
    description: str


SPINE_PROFILES: dict[str, SpineProfile] = {
    "kdp-bw-cream-6x9": SpineProfile(
        key="kdp-bw-cream-6x9",
        display_name="KDP B&W (Cream) 6x9",
        spine_per_page_in=0.0025,
        description="KDP-style cream stock factor for 6x9 B&W paperbacks.",
    ),
    "kdp-bw-white-6x9": SpineProfile(
        key="kdp-bw-white-6x9",
        display_name="KDP B&W (White) 6x9",
        spine_per_page_in=0.002252,
        description="KDP-style white stock factor for 6x9 B&W paperbacks.",
    ),
    "ingram-bw-cream-6x9": SpineProfile(
        key="ingram-bw-cream-6x9",
        display_name="Ingram B&W (Cream) 6x9",
        spine_per_page_in=0.0025,
        description="Ingram-style cream stock factor for 6x9 B&W paperbacks.",
    ),
}

PAGE_COUNTS = {
    "book-1": 375,
    "book-2": 459,
    "book-3": 364,
}

COVER_IMAGES = {
    "book-1": ROOT / "public/images/covers/cover-book-one-titled.png",
    "book-2": ROOT / "public/images/covers/cover-book-two-titled.png",
    "book-3": ROOT / "public/images/covers/cover-book-three-titled.png",
}

BOOK_KEYS = {
    "book-1": "the-last-president",
    "book-2": "children-of-tomorrow",
    "book-3": "the-black-path",
}


@dataclass
class WrapSpec:
    book_id: str
    book_slug: str
    title: str
    author: str
    description: str
    pages: int
    spine_in: float
    width_in: float
    height_in: float
    width_px: int
    height_px: int
    spine_px: int
    output_png: Path
    output_pdf: Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--profile",
        choices=sorted(SPINE_PROFILES.keys()),
        default="kdp-bw-cream-6x9",
        help="Spine profile used for page-thickness calculations.",
    )
    return parser.parse_args()


def load_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = (
        [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        ]
        if bold
        else [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        ]
    )
    for path in candidates:
        p = Path(path)
        if p.exists():
            return ImageFont.truetype(str(p), size=size)
    return ImageFont.load_default()


def fit_cover(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    ratio = max(target_w / img.width, target_h / img.height)
    resized = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def read_metadata() -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    with METADATA_CSV.open("r", encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            out[row["book_slug"]] = row
    return out


def wrap_specs(spine_profile: SpineProfile) -> list[WrapSpec]:
    metadata = read_metadata()
    specs: list[WrapSpec] = []
    for book_id, slug in BOOK_KEYS.items():
        row = metadata[slug]
        pages = PAGE_COUNTS[book_id]
        spine_in = pages * spine_profile.spine_per_page_in
        width_in = (TRIM_W_IN * 2) + spine_in + (BLEED_IN * 2)
        height_in = TRIM_H_IN + (BLEED_IN * 2)
        width_px = int(round(width_in * DPI))
        height_px = int(round(height_in * DPI))
        spine_px = int(round(spine_in * DPI))
        output_png = EXPORT_DIR / f"{slug}-cover-wrap_v1.png"
        output_pdf = EXPORT_DIR / f"{slug}-cover-wrap_v1.pdf"
        specs.append(
            WrapSpec(
                book_id=book_id,
                book_slug=slug,
                title=row["title"],
                author=row["author"],
                description=row["short_description"],
                pages=pages,
                spine_in=spine_in,
                width_in=width_in,
                height_in=height_in,
                width_px=width_px,
                height_px=height_px,
                spine_px=spine_px,
                output_png=output_png,
                output_pdf=output_pdf,
            )
        )
    return specs


def draw_back_text(draw: ImageDraw.ImageDraw, spec: WrapSpec, box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = box
    pad = int(0.35 * DPI)
    tx0, ty0, tx1, ty1 = x0 + pad, y0 + pad, x1 - pad, y1 - pad
    title_font = load_font(int(0.28 * DPI), bold=True)
    body_font = load_font(int(0.13 * DPI))
    caption_font = load_font(int(0.11 * DPI))

    draw.text((tx0, ty0), spec.title.upper(), font=title_font, fill=(245, 240, 228))
    ty = ty0 + int(0.48 * DPI)

    wrapper = textwrap.TextWrapper(width=46)
    wrapped = wrapper.wrap(spec.description)
    line_h = int(0.19 * DPI)
    for line in wrapped[:8]:
        draw.text((tx0, ty), line, font=body_font, fill=(226, 223, 214))
        ty += line_h

    by = ty1 - int(0.55 * DPI)
    draw.text((tx0, by), "BAREN SUMP AND THE LAST PRESIDENT", font=caption_font, fill=(180, 180, 172))
    draw.text((tx0, by + int(0.16 * DPI)), "thesumpledger.com", font=caption_font, fill=(180, 180, 172))

    # Barcode safe box placeholder
    bw = int(2.0 * DPI)
    bh = int(1.2 * DPI)
    bx1 = tx1
    by1 = ty1
    bx0 = bx1 - bw
    by0 = by1 - bh
    draw.rectangle((bx0, by0, bx1, by1), fill=(255, 255, 255))
    draw.rectangle((bx0, by0, bx1, by1), outline=(180, 180, 180), width=2)
    draw.text((bx0 + 14, by0 + 12), "BARCODE", font=caption_font, fill=(80, 80, 80))


def draw_spine(spec: WrapSpec, panel: Image.Image, spine_box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = spine_box
    spine_w = max(1, x1 - x0)
    spine_h = y1 - y0
    tmp = Image.new("RGBA", (spine_h, spine_w), (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    font = load_font(max(28, int(spine_w * 0.28)), bold=True)
    text = f"{spec.title}  •  {spec.author}"
    tw = d.textlength(text, font=font)
    tx = max(8, int((spine_h - tw) / 2))
    ty = max(2, int((spine_w - font.size) / 2) - 2)
    d.text((tx, ty), text, font=font, fill=(240, 236, 224, 255))
    rot = tmp.rotate(90, expand=True)
    panel.alpha_composite(rot, (x0, y0))


def build_wrap(spec: WrapSpec) -> None:
    trim_w_px = int(round(TRIM_W_IN * DPI))
    trim_h_px = int(round(TRIM_H_IN * DPI))
    bleed_px = int(round(BLEED_IN * DPI))

    base = Image.open(COVER_IMAGES[spec.book_id]).convert("RGB")
    bg = fit_cover(base, spec.width_px, spec.height_px).filter(ImageFilter.GaussianBlur(4))
    bg = ImageEnhance.Brightness(bg).enhance(0.52)
    panel = bg.convert("RGBA")

    draw = ImageDraw.Draw(panel)
    back_box = (bleed_px, bleed_px, bleed_px + trim_w_px, bleed_px + trim_h_px)
    spine_box = (back_box[2], bleed_px, back_box[2] + spec.spine_px, bleed_px + trim_h_px)
    front_box = (spine_box[2], bleed_px, spine_box[2] + trim_w_px, bleed_px + trim_h_px)

    # Front panel from titled cover
    front_img = fit_cover(base, front_box[2] - front_box[0], front_box[3] - front_box[1]).convert("RGBA")
    panel.alpha_composite(front_img, (front_box[0], front_box[1]))

    # Darken back panel for legibility
    back_overlay = Image.new("RGBA", (back_box[2] - back_box[0], back_box[3] - back_box[1]), (14, 14, 16, 170))
    panel.alpha_composite(back_overlay, (back_box[0], back_box[1]))
    draw_back_text(draw, spec, back_box)
    draw_spine(spec, panel, spine_box)

    # Guides
    guide = (168, 168, 168, 210)
    draw.rectangle(back_box, outline=guide, width=3)
    draw.rectangle(spine_box, outline=guide, width=3)
    draw.rectangle(front_box, outline=guide, width=3)

    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    panel.convert("RGB").save(spec.output_png, "PNG", optimize=True)
    panel.convert("RGB").save(spec.output_pdf, "PDF", resolution=float(DPI))


def write_specs_report(specs: list[WrapSpec], spine_profile: SpineProfile) -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    path = EXPORT_DIR / "COVER_WRAP_SPECS.md"
    lines = [
        "# Cover Wrap Specs",
        "",
        f"Generated: {now}",
        "",
        "Assumptions:",
        "",
        f"- Trim: {TRIM_W_IN} x {TRIM_H_IN} in",
        f"- Bleed: {BLEED_IN} in each outer edge",
        f"- Spine profile: {spine_profile.key} ({spine_profile.display_name})",
        f"- Spine formula: pages x {spine_profile.spine_per_page_in:.6f} in",
        f"- Profile note: {spine_profile.description}",
        f"- Resolution: {DPI} DPI",
        "",
        "| Book | Pages | Spine (in) | Total size (in) | Total size (px) | Wrap PNG | Wrap PDF |",
        "|------|------:|-----------:|----------------:|----------------:|----------|----------|",
    ]
    for s in specs:
        lines.append(
            f"| {s.book_slug} | {s.pages} | {s.spine_in:.4f} | {s.width_in:.4f} x {s.height_in:.4f} | {s.width_px} x {s.height_px} | `{s.output_png.name}` | `{s.output_pdf.name}` |"
        )
    lines.extend(
        [
            "",
            "## Notes",
            "",
            "- Replace barcode placeholder on final print platform upload if required.",
            "- Spine profile can be changed by rerunning this script with `--profile`.",
        ]
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    args = parse_args()
    spine_profile = SPINE_PROFILES[args.profile]
    specs = wrap_specs(spine_profile)
    for s in specs:
        build_wrap(s)
    write_specs_report(specs, spine_profile)
    print("Generated cover wraps:")
    for s in specs:
        print(f"- {s.output_png}")
        print(f"- {s.output_pdf}")
    print(f"Spine profile: {spine_profile.key} ({spine_profile.spine_per_page_in:.6f} in/page)")


if __name__ == "__main__":
    main()
