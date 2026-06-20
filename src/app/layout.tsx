import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.seriesTitle}`,
    template: `%s | ${site.name}`,
  },
  description: site.logline,
  keywords: [
    "Baren Sump",
    "The Last President",
    "The Sump Ledger",
    "Children of Tomorrow",
    "The Black Path",
    "political thriller",
    "literary fiction",
    "trilogy",
    "speculative fiction",
  ],
  openGraph: {
    title: site.seriesTitle,
    description: site.logline,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seriesTitle,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${ibmMono.variable} h-full`}
    >
      <body className="grain min-h-full antialiased">{children}</body>
    </html>
  );
}
