import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Dramatic display font - editorial luxury
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Clean body font - modern legibility
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.southafricanblackmastiff.com"),
  title: {
    default: "SABMA | South African Black Mastiff Association",
    template: "%s | SABMA",
  },
  description:
    "The South African Black Mastiff Association (SABMA) is dedicated to promoting responsible breeding and upholding the standards of the black mastiff breed in South Africa. Find accredited breeders, stud dogs, and resources.",
  keywords: [
    "South African Black Mastiff",
    "SABMA",
    "Black Mastiff Breeders South Africa",
    "Black Mastiff Puppies",
    "Mastiff Stud Dogs",
    "Dog Breeding Association",
    "Accredited Breeders",
    "Mastiff Health",
    "Black Mastiff Appraisal",
  ],
  authors: [{ name: "South African Black Mastiff Association" }],
  creator: "SABMA",
  publisher: "South African Black Mastiff Association",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SABMA | South African Black Mastiff Association",
    description:
      "Promoting responsible breeding and upholding the standards of the black mastiff breed in South Africa. Find accredited breeders and resources.",
    url: "https://www.southafricanblackmastiff.com",
    siteName: "SABMA - South African Black Mastiff Association",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "South African Black Mastiff Association",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SABMA | South African Black Mastiff Association",
    description:
      "Promoting responsible breeding and upholding the standards of the black mastiff breed in South Africa.",
    images: ["/images/og-image.png"],
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
  },
  alternates: {
    canonical: "https://www.southafricanblackmastiff.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-noir text-cream">
        <AuthProvider>
          {/* Film grain overlay for cinematic effect */}
          <div className="grain-overlay" aria-hidden="true" />
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
