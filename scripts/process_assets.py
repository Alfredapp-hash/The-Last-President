#!/usr/bin/env python3
"""Crop/resize generated raw art into spec dimensions for public/images/."""

import sys
from pathlib import Path
from PIL import Image

RAW = Path("/opt/cursor/artifacts/assets")
PUB = Path("/workspace/public/images")


def crop_resize(src: str, dst: str, w: int, h: int, anchor: str = "center") -> None:
    im = Image.open(RAW / src).convert("RGB")
    sw, sh = im.size
    target = w / h
    cur = sw / sh
    if cur > target:
        nw = int(sh * target)
        if anchor == "right":
            left = sw - nw
        elif anchor == "left":
            left = 0
        else:
            left = (sw - nw) // 2
        box = (left, 0, left + nw, sh)
    else:
        nh = int(sw / target)
        top = (sh - nh) // 2
        box = (0, top, sw, top + nh)
    im = im.crop(box).resize((w, h), Image.LANCZOS)
    out = PUB / dst
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "PNG", optimize=True)
    print(f"  {src} -> {dst} ({w}x{h})")


def make_favicons(emblem_src: str) -> None:
    im = Image.open(RAW / emblem_src).convert("RGBA")
    s = min(im.size)
    left = (im.width - s) // 2
    top = (im.height - s) // 2
    im = im.crop((left, top, left + s, top + s))
    app = Path("/workspace/src/app")
    pub = Path("/workspace/public")
    im.resize((512, 512), Image.LANCZOS).save(pub / "icon-512.png", "PNG", optimize=True)
    im.resize((192, 192), Image.LANCZOS).save(pub / "icon-192.png", "PNG", optimize=True)
    im.resize((180, 180), Image.LANCZOS).save(pub / "apple-icon.png", "PNG", optimize=True)
    # multi-size ICO
    ico = im.resize((256, 256), Image.LANCZOS)
    ico.save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("  favicons: icon-512, icon-192, apple-icon, favicon.ico")


JOBS = {
    "brand": [
        ("og-default.png", "og/og-default.png", 1200, 630, "center"),
        ("og-book-one.png", "og/og-book-one.png", 1200, 630, "center"),
        ("og-book-two.png", "og/og-book-two.png", 1200, 630, "center"),
        ("og-book-three.png", "og/og-book-three.png", 1200, 630, "center"),
        ("emblem-master.png", "brand/emblem-master.png", 512, 512, "center"),
    ],
    "covers": [
        ("cover-book-one.png", "covers/cover-book-one.png", 1600, 2560, "center"),
        ("cover-book-two.png", "covers/cover-book-two.png", 1600, 2560, "center"),
        ("cover-book-three.png", "covers/cover-book-three.png", 1600, 2560, "center"),
        ("trilogy-box-set.png", "covers/trilogy-box-set.png", 2560, 1600, "center"),
    ],
    "interior": [
        (f"interior-{n}.png", f"interior/interior-{n}.png", 1600, 1600, "center")
        for n in [
            "01-prediction-card",
            "02-altered-spreadsheet",
            "03-blue-childrens-book",
            "04-barens-room",
            "05-the-chair",
            "06-confession-records",
            "07-windowless-courtroom",
            "08-grounded-aircraft",
        ]
    ],
    "social": [
        ("social-quote-accusation-advertising.png", "social/social-quote-accusation-advertising.png", 1080, 1080, "center"),
        ("social-quote-children-not-evidence.png", "social/social-quote-children-not-evidence.png", 1080, 1080, "center"),
        ("social-quote-some-days-evidence.png", "social/social-quote-some-days-evidence.png", 1080, 1080, "center"),
        ("social-quote-protection-grew-hands.png", "social/social-quote-protection-grew-hands.png", 1080, 1080, "center"),
        ("social-quote-choose-own-face.png", "social/social-quote-choose-own-face.png", 1080, 1080, "center"),
        ("social-quote-not-everything.png", "social/social-quote-not-everything.png", 1080, 1080, "center"),
        ("social-story-book-one.png", "social/social-story-book-one.png", 1080, 1920, "center"),
        ("social-story-book-two.png", "social/social-story-book-two.png", 1080, 1920, "center"),
        ("social-story-book-three.png", "social/social-story-book-three.png", 1080, 1920, "center"),
        ("social-banner.png", "social/social-banner.png", 1500, 500, "center"),
    ],
}


def main() -> None:
    groups = sys.argv[1:] or list(JOBS)
    for g in groups:
        print(f"## {g}")
        for job in JOBS[g]:
            src, dst, w, h, anchor = job
            if not (RAW / src).exists():
                print(f"  SKIP missing {src}")
                continue
            crop_resize(src, dst, w, h, anchor)
        if g == "brand" and (RAW / "emblem-master.png").exists():
            make_favicons("emblem-master.png")


if __name__ == "__main__":
    main()
