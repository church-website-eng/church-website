import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Celestial Church of Christ — Goshen Cathedral",
    template: "%s | CCC Goshen Cathedral",
  },
  description:
    "Welcome to Celestial Church of Christ, Goshen Cathedral, Ayo Mother Parish. Arch Diocese of Canada | National Headquarter. Join us for worship, prayer, and fellowship.",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://goshencathedral.ca",
  ),
  openGraph: {
    title: "Celestial Church of Christ — Goshen Cathedral",
    description:
      "Ayo Mother Parish, Arch Diocese of Canada. A community of faith, prayer, and spiritual growth.",
    type: "website",
    siteName: "CCC Goshen Cathedral",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Celestial Church of Christ — Goshen Cathedral",
  alternateName: "CCC Goshen Cathedral, Ayo Mother Parish",
  description:
    "Celestial Church of Christ, Goshen Cathedral. Ayo Mother Parish, Arch Diocese of Canada | National Headquarter.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "441 Rubidge Street",
    addressLocality: "Peterborough",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "13:00",
      description: "Main Service",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "09:00",
      closes: "10:00",
      description: "Seeker Service",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "18:00",
      closes: "19:30",
      description: "Mercy Service",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "20:00",
      closes: "22:00",
      description: "Special Service",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a237e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
