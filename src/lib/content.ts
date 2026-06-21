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
  startReading: "#the-last-president",
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
    cta: "Read Book One",
    href: "#the-last-president",
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
  },
];

export const featuredExcerpts = [
  {
    title: "Book One · The Last President",
    excerpt:
      "Lightning struck the iron towers on the roof again and again, not randomly, not naturally, but with the obedience of something summoned and now regretting the invitation.",
    source: "Prologue · The Inventor's Last Storm",
  },
  {
    title: "Book Two · Children of Tomorrow",
    excerpt:
      "The Look-Away Ledger did not accuse. It listed. It did not shout. It held. It did not save anyone, but it made forgetting expensive.",
    source: "Middle sequence · The Ledger",
  },
  {
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
    title: "The Machine",
    book: "Book One",
    description:
      "Prophecy arrives on scorched cards. Algorithms preach. Confession machines turn numbers into names. A child is monitored like an asset.",
  },
  {
    phase: "II",
    title: "The Ledger",
    book: "Book Two",
    description:
      "Protection ends. The Look-Away Ledger opens. Other children appear—not as symbols, but as court identifiers. Accountability becomes architecture.",
  },
  {
    phase: "III",
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
