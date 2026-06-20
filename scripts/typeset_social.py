#!/usr/bin/env python3
"""Typeset quote text onto generated social backgrounds (crisp real fonts)."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

PUB = Path("/workspace/public/images/social")
SERIF_IT = "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Italic.ttf"
SERIF_REG = "/usr/share/fonts/truetype/noto/NotoSerifDisplay-Regular.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

CREAM = (236, 232, 223)
STONE = (138, 133, 120)
ACCENTS = {"red": (158, 43, 60), "gold": (201, 169, 98), "green": (110, 138, 100)}

QUOTES = [
    ("social-quote-accusation-advertising.png", "Every accusation is advertising.", "BOOK ONE · CHAPTER FOUR", "red"),
    ("social-quote-children-not-evidence.png", "Children are not evidence.", "BOOK TWO · CONTROLLING SENTENCE", "gold"),
    ("social-quote-some-days-evidence.png", "Some days refused to become evidence.", "BOOK THREE · CHAPTER FIFTY-FIVE", "green"),
    ("social-quote-protection-grew-hands.png", "Protection had saved him. Protection had also grown hands.", "BOOK THREE · CHAPTER FIFTY-FIVE", "green"),
    ("social-quote-choose-own-face.png", "He gets to choose his own face.", "BOOK TWO · INTERLUDE", "gold"),
    ("social-quote-not-everything.png", "And all, for once, did not ask to be everything.", "BOOK THREE · FINAL CHAPTER", "green"),
]

STORIES = [
    ("social-story-book-one.png", "The Last President", "Every accusation is advertising.", "BOOK ONE", "red"),
    ("social-story-book-two.png", "Children of Tomorrow", "Children are not evidence.", "BOOK TWO", "gold"),
    ("social-story-book-three.png", "The Black Path", "Some days refused to become evidence.", "BOOK THREE", "green"),
]


def darken(img, factor=0.72):
    return ImageEnhance.Brightness(img).enhance(factor)


def wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_center(draw, lines, font, cx, top, fill, line_gap=1.25):
    asc, desc = font.getmetrics()
    lh = int((asc + desc) * line_gap)
    y = top
    for ln in lines:
        w = draw.textlength(ln, font=font)
        draw.text((cx - w / 2, y), ln, font=font, fill=fill)
        y += lh
    return y


def mark(draw, cx, y, accent):
    f = ImageFont.truetype(MONO, 22)
    t = "THE SUMP LEDGER"
    # letter-spacing
    spaced = " ".join(t)
    w = draw.textlength(spaced, font=f)
    draw.text((cx - w / 2, y), spaced, font=f, fill=STONE)
    draw.line([(cx - 40, y + 40), (cx + 40, y + 40)], fill=accent, width=2)


def quote_card(fn, quote, source, accent_key):
    img = darken(Image.open(PUB / fn).convert("RGB"), 0.66)
    d = ImageDraw.Draw(img)
    W, H = img.size
    accent = ACCENTS[accent_key]
    mark(d, W / 2, 90, accent)
    size = 86 if len(quote) < 40 else (66 if len(quote) < 70 else 54)
    font = ImageFont.truetype(SERIF_IT, size)
    lines = wrap(d, f"\u201c{quote}\u201d", font, W - 240)
    asc, desc = font.getmetrics()
    lh = int((asc + desc) * 1.25)
    block_h = lh * len(lines)
    top = (H - block_h) // 2 - 20
    draw_center(d, lines, font, W / 2, top, CREAM)
    sf = ImageFont.truetype(MONO, 24)
    sw = d.textlength(source, font=sf)
    d.text((W / 2 - sw / 2, top + block_h + 50), source, font=sf, fill=accent)
    img.save(PUB / fn, "PNG", optimize=True)
    print(f"  quote: {fn}")


def story_card(fn, title, quote, tag, accent_key):
    img = darken(Image.open(PUB / fn).convert("RGB"), 0.62)
    d = ImageDraw.Draw(img)
    W, H = img.size
    accent = ACCENTS[accent_key]
    mark(d, W / 2, 150, accent)
    tf = ImageFont.truetype(MONO, 26)
    tw = d.textlength(tag, font=tf)
    d.text((W / 2 - tw / 2, 320), tag, font=tf, fill=accent)
    title_font = ImageFont.truetype(SERIF_REG, 96)
    tlines = wrap(d, title, title_font, W - 200)
    y = draw_center(d, tlines, title_font, W / 2, 380, CREAM)
    qf = ImageFont.truetype(SERIF_IT, 52)
    qlines = wrap(d, f"\u201c{quote}\u201d", qf, W - 240)
    draw_center(d, qlines, qf, W / 2, y + 80, STONE)
    cf = ImageFont.truetype(MONO, 24)
    cta = "THESUMPLEDGER.COM"
    cw = d.textlength(cta, font=cf)
    d.text((W / 2 - cw / 2, H - 160), cta, font=cf, fill=CREAM)
    img.save(PUB / fn, "PNG", optimize=True)
    print(f"  story: {fn}")


def banner(fn):
    img = darken(Image.open(PUB / fn).convert("RGB"), 0.6)
    d = ImageDraw.Draw(img)
    W, H = img.size
    f = ImageFont.truetype(SERIF_REG, 64)
    title = "Baren Sump"
    sub_f = ImageFont.truetype(SERIF_IT, 34)
    sub = "and The Last President"
    cx = int(W * 0.68)
    d.text((cx - d.textlength(title, font=f) / 2, H / 2 - 60), title, font=f, fill=CREAM)
    d.text((cx - d.textlength(sub, font=sub_f) / 2, H / 2 + 18), sub, font=sub_f, fill=STONE)
    mf = ImageFont.truetype(MONO, 18)
    m = "THE SUMP LEDGER"
    spaced = " ".join(m)
    d.text((cx - d.textlength(spaced, font=mf) / 2, H / 2 + 78), spaced, font=mf, fill=ACCENTS["gold"])
    img.save(PUB / fn, "PNG", optimize=True)
    print(f"  banner: {fn}")


def main():
    for args in QUOTES:
        quote_card(*args)
    for args in STORIES:
        story_card(*args)
    banner("social-banner.png")


if __name__ == "__main__":
    main()
