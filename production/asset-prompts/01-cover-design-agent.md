# COVER DESIGN AGENT
## Three book covers + trilogy box set

> Inherit `00-visual-identity-master.md`. Generate **cover art only** (no baked title text). Titles are typeset as an overlay layer afterward.

---

## METHOD

For each book: generate a vertical 1600x2560 cover-art image whose central object is the book's "controlling artifact." Leave the **top third quieter** (negative space / shadow) so the typeset title sits cleanly. Single accent color per book.

After art is generated, the integration agent overlays:
- Series mark (small, top): `THE SUMP LEDGER`
- Title (serif, large): book title
- Author line: `ALFRED APP` (or final author of record)
- Book number tag (mono): `BOOK ONE` etc.

---

## COVER 1 — *The Last President* (accent: blood red `#9e2b3c`)

**Prompt:**
> Vertical book cover art, haunted evidence aesthetic. A single scorched prophecy card resting on a tarnished brass tray, photographed like a sealed exhibit under cold overhead light. Burn marks curl the card edges; faint graphite grid and redaction bars in the background. Deep ink-black field, cream paper, one stroke of blood-red like a wax seal or stamp. Archival paper grain, cross-hatch shadow, institutional and cold. Quiet negative space in the upper third. No text, no face, no glow.

**Negative:** (master negative prompt)

---

## COVER 2 — *Children of Tomorrow* (accent: antique gold `#c9a962`)

**Prompt:**
> Vertical book cover art, haunted evidence aesthetic. An open institutional ledger / archive binder photographed like sealed evidence, a single ordinary cereal box and a plastic spoon placed beside it on a cold steel table — the mundane meeting the bureaucratic. Faint rows of redacted court identifiers down the page, never names. Ink-black field, cream paper, one stroke of antique gold like fading title foil. Graphite cross-hatch, archival grain, courtroom shadow. Quiet upper third. No text, no faces, no glow.

---

## COVER 3 — *The Black Path* (accent: muted field green `#5a7a52`)

**Prompt:**
> Vertical book cover art, haunted evidence aesthetic. A narrow black path / corridor of shadow leading away from a monitored child's empty room — an open door, a hallway light, a chair left behind, no figure present. The path is refusal, not escape: cold, quiet, ordinary. Ink-black field, cream paper, one faint stroke of muted green. Pencil and charcoal, archival grain, institutional stillness. Quiet upper third. No text, no face, no glow.

---

## BOX SET / TRILOGY COMPOSITE (2560x1600)

**Prompt:**
> Three matching book spines standing together as a sealed evidence set on a cold archival shelf, haunted case-file aesthetic, graphite and cream with three faint accent strokes (red, gold, green) distinguishing the volumes. Photographed like cataloged exhibits under institutional light, shadow and paper grain. No text, no faces, no glow.

(Spine titles added in compositing.)

---

## DELIVERABLES

```
public/images/covers/
├── cover-book-one.png         (art only, 1600x2560)
├── cover-book-two.png
├── cover-book-three.png
└── trilogy-box-set.png        (2560x1600)
```

Plus a typeset/overlay step (handled by integration agent) producing optional `cover-*-titled.png` if flat composites are needed for retailers.
