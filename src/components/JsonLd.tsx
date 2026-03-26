export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jasace AEC",
    description:
      "A boutique AEC consulting firm delivering architecture, construction, and engineering excellence since 2001.",
    url: "https://jasace.com",
    logo: "https://jasace.com/logo.png",
    image: "https://jasace.com/og-image.jpg",
    telephone: "(512) 555-0180",
    email: "hello@jasace.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 Congress Avenue, Suite 400",
      addressLocality: "Austin",
      addressRegion: "TX",
      postalCode: "78701",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.2672,
      longitude: -97.7431,
    },
    foundingDate: "2001",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 40,
    },
    sameAs: [
      "https://linkedin.com/company/jasace",
      "https://instagram.com/jasace_aec",
      "https://twitter.com/jasace_aec",
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Architecture Consulting",
      "Construction Management",
      "Structural Engineering",
      "Civil Engineering",
      "MEP Engineering",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
