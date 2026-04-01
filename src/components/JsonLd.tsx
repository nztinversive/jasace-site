"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { fallbackContent } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { SiteSettings } from "@/types/cms";

export default function JsonLd() {
  if (!convexEnabled) {
    return <JsonLdContent settings={fallbackContent.siteSettings} />;
  }

  return <ConvexJsonLd />;
}

function ConvexJsonLd() {
  const records = useQuery(api.siteSettings.list, convexEnabled ? {} : "skip") as SiteSettings[] | undefined;
  const settings = records?.[0] ?? fallbackContent.siteSettings;
  return <JsonLdContent settings={settings} />;
}

function JsonLdContent({ settings }: { settings: SiteSettings }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.companyName,
    description: settings.tagline,
    url: "https://jasace.com",
    logo: "https://jasace.com/logo.png",
    image: "https://jasace.com/og-image.jpg",
    telephone: settings.phone,
    email: settings.email,
    founder: {
      "@type": "Person",
      name: "Jason Reese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1699,
      longitude: -115.1398,
    },
    foundingDate: "2015",
    sameAs: settings.socialLinks.map((link) => link.url),
    areaServed: {
      "@type": "State",
      name: "Nevada",
    },
    serviceType: [
      "Architecture Consulting",
      "Construction Management",
      "Engineering Consulting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
