#!/usr/bin/env python3
"""Composite crisp titles onto cover art -> retailer-ready flat covers."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

PUB = Path("/workspace/public/images/covers")
SERIF_REG = "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Regular.ttf"
SERIF_IT = "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Italic.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

CREAM = (236, 232, 223)
STONE = (150, 144, 130)
ACCENTS = {"red": (170, 52, 68), "gold": (201, 169, 98), "green": (122, 150, 110)}

COVERS = [
    ("cover-book-one.png", "BOOK ONE", "The Last President", "red"),
    ("cover-book-two.png", "BOOK TWO", "Children of Tomorrow", "gold"),
    ("cover-book-three.png", "BOOK THREE", "The Black Path", "green"),
]


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def center(draw, text, font, cx, y, fill, spaced=False):
    t = " ".join(text) if spaced else text
    w = draw.textlength(t, font=font)
    draw.text((cx - w / 2, y), t, font=font, fill=fill)
    return w


def make(fn, tag, title, accent_key):
    img = Image.open(PUB / fn).convert("RGB")
    W, H = img.size
    d = ImageDraw.Draw(img)
    cx = W / 2
    accent = ACCENTS[accent_key]

    # Series mark
    mf = ImageFont.truetype(MONO, 30)
    center(d, "THE SUMP LEDGER", mf, cx, int(H * 0.07), STONE, spaced=True)

    # Book tag
    tf = ImageFont.truetype(MONO, 34)
    center(d, tag, tf, cx, int(H * 0.12), accent, spaced=True)

    # Title
    title_font = ImageFont.truetype(SERIF_REG, 150)
    lines = wrap(d, title, title_font, int(W * 0.86))
    asc, desc = title_font.getmetrics()
    lh = int((asc + desc) * 1.04)
    y = int(H * 0.17)
    for ln in lines:
        center(d, ln, title_font, cx, y, CREAM)
        y += lh

    # Accent rule
    d.line([(cx - 90, y + 30), (cx + 90, y + 30)], fill=accent, width=3)

    # Author line near bottom
    af = ImageFont.truetype(SERIF_IT, 56)
    center(d, "Alfred App", af, cx, int(H * 0.92), CREAM)

    out = PUB / fn.replace(".png", "-titled.png")
    img.save(out, "PNG", optimize=True)
    print(f"  {out.name}")


def main():
    for args in COVERS:
        make(*args)


if __name__ == "__main__":
    main()
