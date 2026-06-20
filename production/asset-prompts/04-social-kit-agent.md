# SOCIAL KIT AGENT
## Quote cards, story templates, banner

> Inherit `00-visual-identity-master.md`. Generate textured **backgrounds**; the integration step typesets the actual quotes (crisp text) over them. Backgrounds must keep a quiet central/lower zone for text.

---

## 1. QUOTE CARD BACKGROUNDS (1080x1080) — six approved quotes

One background per quote, accent matched to source book. Same evidence aesthetic, subtle artifact motif behind a quiet text zone.

| File | Quote (typeset later) | Accent |
|------|-----------------------|--------|
| social-quote-accusation-advertising.png | "Every accusation is advertising." | red |
| social-quote-children-not-evidence.png | "Children are not evidence." | gold |
| social-quote-some-days-evidence.png | "Some days refused to become evidence." | green |
| social-quote-protection-grew-hands.png | "Protection had saved him. Protection had also grown hands." | green |
| social-quote-choose-own-face.png | "He gets to choose his own face." | gold |
| social-quote-not-everything.png | "And all, for once, did not ask to be everything." | green |

**Background prompt pattern:**
> Square 1080x1080 textured background, haunted evidence aesthetic: ink-black archival surface with faint graphite cross-hatch, a subtle [book artifact] motif in one corner, single [accent] stroke, large quiet negative space in the center-lower area for a typeset quote. Cold, restrained. No text, no face, no glow.

---

## 2. STORY TEMPLATES (1080x1920) — three, one per book

Vertical backgrounds with quiet upper and lower zones (handle/CTA goes bottom).

**Prompt pattern:**
> Vertical 1080x1920 story background, haunted evidence aesthetic, [book artifact] low in frame, ink-black with cream paper grain and a single [accent] stroke, large quiet space top and center for typeset title and quote. Cold institutional mood. No text, no face, no glow.

Files: `social-story-book-one.png`, `social-story-book-two.png`, `social-story-book-three.png`.

---

## 3. BANNER / HEADER (1500x500)

**Prompt:**
> Wide 1500x500 banner, haunted evidence aesthetic: a row of sealed case-file fragments and a scorched prediction card across a cold archival surface, graphite and cream with faint red/gold/green accent strokes, deep cinematic shadow, quiet zone right-of-center for typeset series title. No text, no face, no glow.

File: `social-banner.png`.

---

## DELIVERABLES

```
public/images/social/
├── social-quote-*.png        (6 cards)
├── social-story-book-*.png   (3 stories)
└── social-banner.png
```

Pair with copy from `production/marketing/social-copy.md`.
