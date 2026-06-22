export const site = {
  name: "The Sump Ledger",
  url: "https://thesumpledger.com",
  tagline:
    "Dark political thrillers about power, prophecy, and the future that's already here.",
  seriesTitle: "Baren Sump and The Last President",
  contactEmail: "hello@thesumpledger.com",
  logline:
    "When a dying inventor leaves a scorched prediction naming a monitored child and the phrase THE LAST PRESIDENT, a dynasty, a court, and a country must decide whether Baren Sump is prophecy, evidence, or simply a boy who refuses to remain available.",
} as const;

export const launchCtas = {
  startReading: "/books/the-last-president",
  pressKit: "/press",
  requestReviewCopy:
    "mailto:hello@thesumpledger.com?subject=Review%20Copy%20Request",
  joinLedger:
    "mailto:hello@thesumpledger.com?subject=Ledger%20Launch%20Updates",
} as const;

export const heroHighlights = [
  {
    label: "Not a chosen-one story",
    line: "A case file where language, law, and power fight over one child.",
  },
  {
    label: "What readers remember",
    line: "Every accusation is advertising. Children are not evidence.",
  },
  {
    label: "Why this trilogy lands",
    line: "It ends with refusal and ordinary life, not spectacle.",
  },
  {
    label: "Start here",
    line: "Book One: The Last President.",
  },
] as const;

export const startHereCards = [
  {
    title: "Start with Book One",
    description:
      "Enter through The Last President, where prophecy, media, and dynasty first converge around Baren Sump.",
    cta: "Open Book One Page",
    href: "/books/the-last-president",
  },
  {
    title: "Read the Press Brief",
    description:
      "Get the one-page series framing, approved pull quotes, and book-by-book positioning in one place.",
    cta: "Open Media Kit",
    href: "/press",
  },
  {
    title: "Request a Review Copy",
    description:
      "For reviewers, interviewers, and media partners who want full-trilogy context and launch materials.",
    cta: "Request Review Copy",
    href: "mailto:hello@thesumpledger.com?subject=Review%20Copy%20Request",
  },
] as const;

export type Book = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  status: "Entry Volume" | "Escalation Volume" | "Final Volume";
  hook: string;
  positioning: string;
  controlling: string;
  blurb: string;
  excerpt: string;
  excerptSource: string;
  arc: string;
  themes: string[];
  accent: string;
  accentMuted: string;
  coverImage: string;
  coverTitled: string;
  ogImage: string;
  sampleDownloadEpub: string;
  sampleDownloadPdf: string;
};

export type BookDossier = {
  marketPosition: string;
  readerPromise: string;
  stakes: string;
  extendedExcerpt: string;
  excerptContext: string;
  buyerSignals: string[];
  forReadersOf: string[];
  mediaAngles: string[];
  bookQuotes: Array<{ text: string; source: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const boxSet = "/images/covers/trilogy-box-set.png";

export const books: Book[] = [
  {
    id: "the-last-president",
    number: 1,
    title: "The Last President",
    subtitle: "Book One",
    status: "Entry Volume",
    hook: "A boy named like an empty field. A dynasty that treats children as receivers.",
    positioning: "The origin file",
    controlling: "Every accusation is advertising.",
    blurb:
      "When inventor Nikola Veyra dies in a storm that obeys no natural law, he leaves a prediction card scorched with impossible names. What follows is not a chosen-one fable but a case file: algorithms that preach, families that buy tomorrow, confession machines that turn numbers into names, and a child who learns that being watched is not the same as being protected.",
    excerpt:
      "It came crawling over the black river in sheets of blue-white fire, turning the windows of Nikola Veyra's laboratory into mirrors and the mirrors into doors.",
    excerptSource: "Book One · Prologue",
    arc: "Build the machine",
    themes: [
      "Prophecy as infrastructure",
      "Media spectacle vs. truth",
      "The confession machine",
      "Dynasty and control",
    ],
    accent: "#9e2b3c",
    accentMuted: "#9e2b3c22",
    coverImage: "/images/covers/cover-book-one.png",
    coverTitled: "/images/covers/cover-book-one-titled.png",
    ogImage: "/images/og/og-book-one.png",
    sampleDownloadEpub: "/downloads/the-last-president-first-3-chapters-sample.epub",
    sampleDownloadPdf: "/downloads/the-last-president-first-3-chapters-sample.pdf",
  },
  {
    id: "children-of-tomorrow",
    number: 2,
    title: "Children of Tomorrow",
    subtitle: "Book Two",
    status: "Escalation Volume",
    hook: "Protection ends. Accountability begins.",
    positioning: "The accountability file",
    controlling: "Children are not evidence.",
    blurb:
      "Baren learns about a grounded plane from a cereal box. The Look-Away Ledger, the RAF-One archive, and a map of who looked away turn one child's story into a system story. Courts without windows. Adults who were almost brave. Seven court identifiers. Never names.",
    excerpt:
      "Baren learned about the plane from a cereal box. Not because the cereal box was haunted. Everyone checked.",
    excerptSource: "Book Two · Chapter Twenty-Five",
    arc: "Who looked away",
    themes: [
      "Institutional accountability",
      "Child protection architecture",
      "Plural harm",
      "Forgiveness without currency",
    ],
    accent: "#c9a962",
    accentMuted: "#c9a96222",
    coverImage: "/images/covers/cover-book-two.png",
    coverTitled: "/images/covers/cover-book-two-titled.png",
    ogImage: "/images/og/og-book-two.png",
    sampleDownloadEpub: "/downloads/children-of-tomorrow-first-3-chapters-sample.epub",
    sampleDownloadPdf: "/downloads/children-of-tomorrow-first-3-chapters-sample.pdf",
  },
  {
    id: "the-black-path",
    number: 3,
    title: "The Black Path",
    subtitle: "Book Three",
    status: "Final Volume",
    hook: "Not as proof. Not as witness. Not as remedy.",
    positioning: "The refusal file",
    controlling: "Some days refused to become evidence.",
    blurb:
      "The black path is not a tunnel—it is a refusal. Baren will not remain available as proof, witness, remedy, or adult repair tool. Book Three compresses toward a quiet ending: ordinary remains enough. No crowned climax. No child-saving-the-world turn.",
    excerpt:
      "The black path was not a tunnel beneath the house. It was the route no machine could price because it began with a refusal.",
    excerptSource: "Book Three · Opening",
    arc: "Refusal as freedom",
    themes: [
      "Consent and availability",
      "Ordinary life as victory",
      "Legal containment",
      "Quiet refusal",
    ],
    accent: "#5a7a52",
    accentMuted: "#5a7a5222",
    coverImage: "/images/covers/cover-book-three.png",
    coverTitled: "/images/covers/cover-book-three-titled.png",
    ogImage: "/images/og/og-book-three.png",
    sampleDownloadEpub: "/downloads/the-black-path-first-3-chapters-sample.epub",
    sampleDownloadPdf: "/downloads/the-black-path-first-3-chapters-sample.pdf",
  },
];

export const bookDossiers: Record<Book["id"], BookDossier> = {
  "the-last-president": {
    marketPosition:
      "A literary political-thriller opening volume where prophecy behaves like infrastructure and surveillance becomes family policy.",
    readerPromise:
      "High-concept institutional dread with a voice-driven, child-centered narrative that rejects fantasy shortcuts.",
    stakes:
      "A scorched prediction names Baren Sump and THE LAST PRESIDENT, forcing power centers to decide whether he is prophecy, evidence, or expendable signal.",
    extendedExcerpt:
      "Lightning struck the iron towers on the roof again and again, not randomly, not naturally, but with the obedience of something summoned and now regretting the invitation. Elias Sump stood at the laboratory entrance with his hat crushed against his chest, trying to decide whether genius always smelled like burning copper or whether the great inventor had simply begun to rot before dying.",
    excerptContext: "Prologue · The Inventor's Last Storm",
    buyerSignals: [
      "Strong opening hook for premium thriller audiences",
      "Clear trilogy entry point with immediate conceptual stakes",
      "Quote-rich language designed for shareability and paid creative",
      "Institutional thriller architecture with literary cadence",
    ],
    forReadersOf: [
      "Political thrillers with speculative infrastructure",
      "Literary suspense with moral and legal tension",
      "Voice-led speculative fiction that avoids genre cliche",
    ],
    mediaAngles: [
      "Prophecy as state technology, not mysticism",
      "The ethics of making children symbolic in public narratives",
      "Language as an instrument of power in modern thrillers",
    ],
    bookQuotes: [
      {
        text: "Every accusation is advertising.",
        source: "Book One · Chapter Four",
      },
      {
        text: "The storm arrived before the priest.",
        source: "Book One · Prologue",
      },
      {
        text: "To him not knowing until morning.",
        source: "Book One · Closing sequence",
      },
    ],
    faqs: [
      {
        question: "Is this fantasy?",
        answer:
          "No. The trilogy uses speculative political mechanisms, but the narrative frame is procedural and institutional, not magical.",
      },
      {
        question: "Can this be read as a standalone?",
        answer:
          "Book One delivers a complete first movement, but it is designed to open the full trilogy arc.",
      },
    ],
  },
  "children-of-tomorrow": {
    marketPosition:
      "The escalation volume: legal pressure, system records, and accountability language tightened to breaking point.",
    readerPromise:
      "A courtroom-and-records pressure narrative where the controlling line is non-negotiable: children are not evidence.",
    stakes:
      "The Look-Away Ledger turns private harm into public architecture, and every institution touched by the case must answer for what it ignored.",
    extendedExcerpt:
      "Baren learned about the plane from a cereal box. Not because the cereal box was haunted. Everyone checked. The look-away file did not shout. It listed. It held. It made forgetting expensive.",
    excerptContext: "Chapter Twenty-Five · The Mother Key",
    buyerSignals: [
      "Powerful controlling sentence with campaign potential",
      "High retention bridge from Book One to Book Three",
      "Excellent fit for legal/political thriller crossover audiences",
      "Review-friendly thematic clarity without reducing complexity",
    ],
    forReadersOf: [
      "Institutional and legal thrillers",
      "System-accountability fiction",
      "Speculative narratives with documentary tone",
    ],
    mediaAngles: [
      "The Look-Away Ledger as a narrative accountability device",
      "Plural harm and why this story refuses single-symbol framing",
      "How the trilogy handles legal language as drama",
    ],
    bookQuotes: [
      {
        text: "Children are not evidence.",
        source: "Book Two · Controlling sentence",
      },
      {
        text: "He gets to choose his own face.",
        source: "Book Two · Interlude",
      },
      {
        text: "Some days were allowed to end without becoming part of the case.",
        source: "Book Two · Final sequence",
      },
    ],
    faqs: [
      {
        question: "Do I need Book One first?",
        answer:
          "Yes, strongly recommended. Book Two is engineered as escalation and assumes Book One context.",
      },
      {
        question: "What is the tone of Book Two?",
        answer:
          "Taut, procedural, and morally sharp—less spectacle, more reckoning.",
      },
    ],
  },
  "the-black-path": {
    marketPosition:
      "The final volume: anti-spectacle ending architecture where refusal, consent, and ordinary life replace heroic theater.",
    readerPromise:
      "A rare thriller ending that resolves through moral clarity and availability withdrawn, not escalation for escalation's sake.",
    stakes:
      "Baren's final act is to refuse every role power assigns him: proof, witness, remedy, or repair mechanism.",
    extendedExcerpt:
      "The black path was not a tunnel beneath the house. It was the route no machine could price because it began with a refusal: the child would not remain available. Not as proof. Not as witness. Not as remedy. Not as future. Only as himself.",
    excerptContext: "Opening sequence",
    buyerSignals: [
      "Distinctive trilogy closer with high critical-discussion value",
      "Strong positioning for readers tired of formula climaxes",
      "Quiet-ending differentiation for premium literary audiences",
      "Memorable closing lines for quote-based marketing",
    ],
    forReadersOf: [
      "Literary thrillers with restraint",
      "Ethical speculative fiction",
      "Character-rights-centered political narratives",
    ],
    mediaAngles: [
      "Why refusal is framed as freedom rather than defeat",
      "Designing non-spectacle endings in thriller structures",
      "Ordinary life as the trilogy's final claim",
    ],
    bookQuotes: [
      {
        text: "Some days refused to become evidence.",
        source: "Book Three · Chapter Fifty-Five",
      },
      {
        text: "Not as proof. Not as witness. Not as remedy. Not as future.",
        source: "Book Three · Opening sequence",
      },
      {
        text: "And all, for once, did not ask to be everything.",
        source: "Book Three · Final sequence",
      },
    ],
    faqs: [
      {
        question: "Is Book Three action-heavy?",
        answer:
          "It is pressure-heavy rather than action-heavy. The intensity comes from containment, language, and final moral position.",
      },
      {
        question: "Does the trilogy resolve fully?",
        answer:
          "Yes. Book Three is written as the deliberate close of the case file.",
      },
    ],
  },
};

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export const featuredExcerpts = [
  {
    bookId: "the-last-president",
    title: "Book One · The Last President",
    excerpt:
      "Lightning struck the iron towers on the roof again and again, not randomly, not naturally, but with the obedience of something summoned and now regretting the invitation.",
    source: "Prologue · The Inventor's Last Storm",
  },
  {
    bookId: "children-of-tomorrow",
    title: "Book Two · Children of Tomorrow",
    excerpt:
      "The Look-Away Ledger did not accuse. It listed. It did not shout. It held. It did not save anyone, but it made forgetting expensive.",
    source: "Middle sequence · The Ledger",
  },
  {
    bookId: "the-black-path",
    title: "Book Three · The Black Path",
    excerpt:
      "The future did not wait. It was available. That was all. And all, for once, did not ask to be everything.",
    source: "Final sequence",
  },
] as const;

export const interiorPlates = [
  { src: "/images/interior/interior-01-prediction-card.png", caption: "The prediction card", anchor: "Prologue" },
  { src: "/images/interior/interior-05-the-chair.png", caption: "The chair", anchor: "Chapter Twelve" },
  { src: "/images/interior/interior-07-windowless-courtroom.png", caption: "The windowless courtroom", anchor: "Chapter Twenty" },
  { src: "/images/interior/interior-08-grounded-aircraft.png", caption: "The grounded aircraft", anchor: "Chapter Twenty-Four" },
] as const;

export const arcPhases = [
  {
    phase: "I",
    bookId: "the-last-president",
    title: "The Machine",
    book: "Book One",
    description:
      "Prophecy arrives on scorched cards. Algorithms preach. Confession machines turn numbers into names. A child is monitored like an asset.",
  },
  {
    phase: "II",
    bookId: "children-of-tomorrow",
    title: "The Ledger",
    book: "Book Two",
    description:
      "Protection ends. The Look-Away Ledger opens. Other children appear—not as symbols, but as court identifiers. Accountability becomes architecture.",
  },
  {
    phase: "III",
    bookId: "the-black-path",
    title: "The Refusal",
    book: "Book Three",
    description:
      "The black path is not escape—it is availability withdrawn. Ordinary life makes its claim. The future does not wait. That is all.",
  },
] as const;

export const evidenceArtifacts = [
  { label: "GOLD TOWER", value: "Confirmed" },
  { label: "BOY", value: "BAREN" },
  { label: "EVENT", value: "GLASS COAST BLOOD" },
  { label: "DESIGNATION", value: "THE LAST PRESIDENT" },
  { label: "SURNAME", value: "SUMP" },
] as const;

export const pullQuotes = [
  {
    text: "Every accusation is advertising.",
    source: "Book One · Chapter Four",
  },
  {
    text: "Children are not evidence.",
    source: "Book Two · controlling sentence",
  },
  {
    text: "Some days refused to become evidence.",
    source: "Book Three · Chapter Fifty-Five",
  },
  {
    text: "Protection had saved him. Protection had also grown hands.",
    source: "Book Three · Chapter Fifty-Five",
  },
  {
    text: "He gets to choose his own face.",
    source: "Book Two · Interlude",
  },
  {
    text: "And all, for once, did not ask to be everything.",
    source: "Book Three · final chapter",
  },
] as const;

export const readerComp = [
  "Institutional dread and procedural thriller craft",
  "Prophecy as political infrastructure, not magic",
  "Child-centered narratives that refuse spectacle",
  "Near-future systems fiction with literary voice",
  "Moral architecture over twist-for-twist plotting",
] as const;

export const pressFacts = [
  { label: "Series", value: "Baren Sump and The Last President (trilogy)" },
  {
    label: "Genre",
    value: "Dark political thriller / literary speculative fiction",
  },
  { label: "Reader promise", value: "Not a chosen-one story. A case file." },
  { label: "Controlling line", value: "Children are not evidence." },
  { label: "Status", value: "Launch-ready release package" },
  { label: "Website", value: "thesumpledger.com" },
];
