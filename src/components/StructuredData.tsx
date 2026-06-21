import { books, site } from "@/lib/content";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BookSeries",
    name: site.seriesTitle,
    description: site.logline,
    url: site.url,
    author: { "@type": "Person", name: "Alfred App" },
    hasPart: books.map((book) => ({
      "@type": "Book",
      name: book.title,
      bookFormat: "https://schema.org/EBook",
      position: book.number,
      inLanguage: "en",
      author: { "@type": "Person", name: "Alfred App" },
      image: `${site.url}${book.coverTitled}`,
      url: `${site.url}/books/${book.id}`,
      abstract: book.blurb,
      genre: "Literary political thriller",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
