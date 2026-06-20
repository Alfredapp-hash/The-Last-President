import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SeriesArc } from "@/components/SeriesArc";
import { BookShowcase } from "@/components/BookShowcase";
import { EvidenceGallery } from "@/components/EvidenceGallery";
import { QuoteGallery } from "@/components/QuoteGallery";
import { ReaderSection } from "@/components/ReaderSection";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SeriesArc />
        <BookShowcase />
        <EvidenceGallery />
        <QuoteGallery />
        <ReaderSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
