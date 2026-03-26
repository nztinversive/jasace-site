import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Archivo,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Fraunces,
  Outfit,
  Syne,
  Manrope,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-mono",
  display: "swap",
});

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://jasace.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jasace ACE — Architecture, Construction & Engineering Consulting",
    template: "%s | Jasace ACE",
  },
  description:
    "Jasace is a boutique ACE consulting practice delivering architecture, construction, and engineering excellence. 25+ years, 500+ projects delivered.",
  keywords: [
    "architecture consulting",
    "construction management",
    "engineering consulting",
    "ACE consulting",
    "structural engineering",
    "commercial architecture",
    "project management",
    "Jasace",
  ],
  authors: [{ name: "Jasace ACE" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jasace ACE",
    title: "Jasace ACE — Architecture, Construction & Engineering Consulting",
    description:
      "A boutique ACE consulting practice delivering design excellence, construction expertise, and engineering precision for projects that matter.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jasace ACE — Shaping the Built Environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasace ACE — Architecture, Construction & Engineering",
    description:
      "A boutique ACE consulting practice. 25+ years, 500+ projects delivered.",
    images: ["/og-image.jpg"],
  },
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
};

const fontVars = [
  cormorant.variable,
  archivo.variable,
  ibmMono.variable,
  ibmSans.variable,
  fraunces.variable,
  outfit.variable,
  syne.variable,
  manrope.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVars} antialiased`}>
      <body className="font-body bg-stone-50 text-stone-900">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
