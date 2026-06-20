export const site = {
  name: "The Sump Ledger",
  url: "https://thesumpledger.com",
  tagline: "Dark political thrillers about power, prophecy, and the future that's already here.",
  seriesTitle: "Baren Sump and The Last President",
  contactEmail: "hello@thesumpledger.com",
} as const;

export type Book = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  chapters: string;
  wordCount: string;
  status: "Available" | "Coming Soon";
  hook: string;
  blurb: string;
  themes: string[];
  accent: string;
};

export const books: Book[] = [
  {
    id: "the-last-president",
    number: 1,
    title: "The Last President",
    subtitle: "Book One",
    chapters: "Prologue + 24 chapters",
    wordCount: "~83,000 words",
    status: "Coming Soon",
    hook: "A boy named like an empty field. A dynasty that treats children as receivers.",
    blurb:
      "When inventor Nikola Veyra dies in a storm that obeys no natural law, he leaves behind a prediction card scorched with impossible names—including a boy called Baren Sump and a phrase the world is not ready to read: THE LAST PRESIDENT. What follows is not a chosen-one fable but a case file: algorithms that preach, families that buy tomorrow, confession machines that turn numbers into names, and a child who learns early that being watched is not the same as being protected.",
    themes: [
      "Prophecy as infrastructure",
      "Media spectacle vs. truth",
      "Dynasty and control",
      "The confession machine",
    ],
    accent: "#8b2635",
  },
  {
    id: "children-of-tomorrow",
    number: 2,
    title: "Children of Tomorrow",
    subtitle: "Book Two",
    chapters: "Chapters 25–54",
    wordCount: "~88,000 words",
    status: "Coming Soon",
    hook: "Children are not evidence.",
    blurb:
      "Book Two begins where protection ends and accountability begins. Baren learns about a grounded plane from a cereal box—because in this world, even breakfast can be evidence. The Look-Away Ledger, the RAF-One archive, and a map of who looked away turn one child's story into a system story. Courts without windows. Chairs that wanted a child. Adults who were almost brave. The controlling sentence of the book is simple and unbreakable: children are not evidence.",
    themes: [
      "Child protection architecture",
      "Institutional accountability",
      "Plural harm / other children",
      "Forgiveness without currency",
    ],
    accent: "#c4a35a",
  },
  {
    id: "the-black-path",
    number: 3,
    title: "The Black Path",
    subtitle: "Book Three",
    chapters: "Chapters 55–84",
    wordCount: "~62,000 words",
    status: "Coming Soon",
    hook: "Not as proof. Not as witness. Not as remedy. Only as himself.",
    blurb:
      "The Black Path is not a tunnel beneath the house. It is the route no machine can price because it begins with a refusal: the child will not remain available. Not as proof, witness, remedy, public claim, future claim, or adult repair tool. Book Three compresses the trilogy toward its quiet ending—ordinary remains enough. No crowned climax. No final spectacle. No child-saving-the-world turn. Just a boy learning that some days refuse to become evidence.",
    themes: [
      "Consent and availability",
      "Ordinary life as victory",
      "Legal containment",
      "Refusal as freedom",
    ],
    accent: "#4a6741",
  },
];

export const pullQuotes = [
  {
    text: "Every accusation is advertising.",
    source: "Book One — Chapter Four",
  },
  {
    text: "Children are not evidence.",
    source: "Book Two — controlling sentence",
  },
  {
    text: "Some days refused to become evidence.",
    source: "Book Three — Chapter Fifty-Five",
  },
  {
    text: "Protection had saved him. Protection had also grown hands.",
    source: "Book Three — Chapter Fifty-Five",
  },
];

export const pressFacts = [
  { label: "Series", value: "Baren Sump and The Last President (trilogy)" },
  { label: "Genre", value: "Dark political thriller / literary speculative fiction" },
  { label: "Total length", value: "~232,600 words across 84 chapters" },
  { label: "Website", value: "thesumpledger.com" },
  { label: "Repository", value: "github.com/Alfredapp-hash/The-Last-President" },
];
