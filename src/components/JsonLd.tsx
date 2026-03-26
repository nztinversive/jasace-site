export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jasace ACE",
    description:
      "A boutique ACE consulting practice delivering architecture, construction, and engineering excellence. Based in Las Vegas, NV.",
    url: "https://jasace.com",
    logo: "https://jasace.com/logo.png",
    image: "https://jasace.com/og-image.jpg",
    telephone: "(702) 403-5346",
    email: "jason@jasace.com",
    founder: {
      "@type": "Person",
      name: "Jason Reese",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1699,
      longitude: -115.1398,
    },
    foundingDate: "2015",
    sameAs: [
      "https://linkedin.com/company/jasace",
      "https://instagram.com/jasace_ace",
    ],
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
