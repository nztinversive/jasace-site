export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  category: string;
  year: string;
  heroImage: string;
  featured: boolean;
  scope: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  specs: { label: string; value: string }[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "downtown-mixed-use-tower",
    title: "Downtown Mixed-Use Tower",
    client: "Meridian Development Group",
    location: "Austin, TX",
    category: "Architecture",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop",
    featured: true,
    scope: "Full-service architecture and interior design",
    description: "A 32-story mixed-use tower combining Class A office space, luxury residences, and ground-floor retail in the heart of downtown Austin.",
    challenge: "The site demanded a design that respected the historic district context while delivering a bold, contemporary addition to the skyline. Strict zoning setbacks required creative massing solutions.",
    solution: "We developed a stepped massing strategy that transitions from the low-rise historic fabric to a slender tower form. The curtain wall features a custom terracotta-toned frit pattern that pays homage to the regional material palette.",
    result: "Delivered on schedule and 3% under budget. The project achieved LEED Gold certification and won the 2024 AIA Austin Design Award.",
    specs: [
      { label: "Size", value: "420,000 SF" },
      { label: "Stories", value: "32" },
      { label: "Budget", value: "$185M" },
      { label: "Duration", value: "36 months" },
      { label: "Certification", value: "LEED Gold" },
      { label: "Award", value: "AIA Austin 2024" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
    ],
  },
  {
    slug: "highway-101-bridge-rehabilitation",
    title: "Highway 101 Bridge Rehabilitation",
    client: "Pacific Infrastructure Co.",
    location: "San Jose, CA",
    category: "Engineering",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&fit=crop",
    featured: true,
    scope: "Structural engineering and seismic retrofit",
    description: "A comprehensive rehabilitation of a 1960s-era highway bridge serving 85,000 vehicles daily, including full seismic retrofit to current California standards.",
    challenge: "The bridge had to remain partially operational during construction. Seismic analysis revealed the original piers were inadequate for current code requirements, requiring innovative reinforcement.",
    solution: "We designed a carbon fiber wrap system for the existing piers combined with new base isolation bearings — avoiding the need for full pier replacement. Night-shift construction minimized traffic impact.",
    result: "Zero lost-time incidents over 18 months of construction. Bridge rated for 75-year service life extension with full seismic compliance.",
    specs: [
      { label: "Span", value: "1,200 ft" },
      { label: "Daily Traffic", value: "85,000 vehicles" },
      { label: "Budget", value: "$42M" },
      { label: "Duration", value: "18 months" },
      { label: "Safety", value: "Zero incidents" },
      { label: "Service Life", value: "+75 years" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop",
    ],
  },
  {
    slug: "lakefront-residential-complex",
    title: "Lakefront Residential Complex",
    client: "Harborview Builders",
    location: "Chicago, IL",
    category: "Construction",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&h=900&fit=crop",
    featured: false,
    scope: "Construction management and general contracting",
    description: "A 200-unit luxury residential complex on Chicago's lakefront featuring private marina access, rooftop amenities, and panoramic views of Lake Michigan.",
    challenge: "Lakefront construction presented unique logistical challenges including soil stabilization, strict environmental regulations for the shoreline setback, and a compressed 24-month delivery schedule.",
    solution: "Our team implemented an accelerated construction schedule using prefabricated wall panels and a just-in-time materials delivery system. Weekly coordination with environmental agencies kept the project compliant.",
    result: "Completed 6 weeks ahead of schedule. 92% of units pre-sold before completion. The project set a new benchmark for lakefront residential in the Chicago market.",
    specs: [
      { label: "Units", value: "200" },
      { label: "Size", value: "310,000 SF" },
      { label: "Budget", value: "$95M" },
      { label: "Duration", value: "22 months" },
      { label: "Pre-sold", value: "92%" },
      { label: "Type", value: "Luxury Residential" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    ],
  },
  {
    slug: "municipal-water-treatment",
    title: "Municipal Water Treatment",
    client: "ClearFlow Engineering",
    location: "Denver, CO",
    category: "Engineering",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop",
    featured: false,
    scope: "Civil and environmental engineering",
    description: "A major upgrade to Denver's municipal water treatment facility, doubling capacity while meeting new EPA standards for emerging contaminants.",
    challenge: "The existing facility had to remain fully operational during the upgrade. New EPA requirements for PFAS removal required technology that had limited precedent at this scale.",
    solution: "We designed a phased construction approach with temporary bypass systems and specified a granular activated carbon treatment train — one of the first municipal-scale PFAS removal systems in Colorado.",
    result: "Facility now serves 400,000 residents with treatment capacity doubled. Achieved full PFAS compliance 8 months ahead of the regulatory deadline.",
    specs: [
      { label: "Capacity", value: "80 MGD" },
      { label: "Residents Served", value: "400,000" },
      { label: "Budget", value: "$65M" },
      { label: "Duration", value: "30 months" },
      { label: "Compliance", value: "Full PFAS" },
      { label: "Type", value: "Municipal Infrastructure" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop",
    ],
  },
  {
    slug: "corporate-campus-expansion",
    title: "Corporate Campus Expansion",
    client: "Nexus Architecture Studio",
    location: "Nashville, TN",
    category: "Architecture",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop",
    featured: false,
    scope: "Master planning, architecture, and interior design",
    description: "A 120,000 SF campus expansion for a Fortune 500 technology company, designed to foster collaboration while respecting Nashville's urban fabric.",
    challenge: "The client wanted an open, collaborative workspace that also provided acoustic privacy for focused work — a tension that required careful spatial planning and material selection.",
    solution: "We created a 'neighborhood' concept: clusters of team zones separated by planted atriums and acoustic buffer zones. Custom-designed sound-absorbing ceiling panels integrate lighting and HVAC systems.",
    result: "Employee satisfaction scores increased 34% post-occupancy. The campus expansion accommodated 600 new positions while maintaining the company's target of 180 SF per employee.",
    specs: [
      { label: "Size", value: "120,000 SF" },
      { label: "Capacity", value: "600 seats" },
      { label: "Budget", value: "$52M" },
      { label: "Duration", value: "20 months" },
      { label: "Satisfaction", value: "+34%" },
      { label: "Certification", value: "WELL Platinum" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    ],
  },
  {
    slug: "stadium-renovation-phase-ii",
    title: "Stadium Renovation Phase II",
    client: "Ironclad Construction",
    location: "Phoenix, AZ",
    category: "Construction",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1600&h=900&fit=crop",
    featured: false,
    scope: "Construction management and specialty contracting",
    description: "The second phase of a major stadium renovation, modernizing all premium seating areas, concourse spaces, and adding a new retractable canopy structure.",
    challenge: "All construction had to occur within a 5-month off-season window. The retractable canopy structure required precise coordination between structural steel, mechanical systems, and fabric tensioning.",
    solution: "We developed a detailed 4D construction sequence model and pre-assembled major components offsite. A dedicated weather team monitored conditions for the canopy installation, which required wind speeds below 15 mph.",
    result: "Completed 2 weeks before opening day. The renovation added 2,400 premium seats and the new canopy provides shade coverage for 85% of the seating bowl.",
    specs: [
      { label: "Premium Seats", value: "2,400 added" },
      { label: "Canopy Coverage", value: "85%" },
      { label: "Budget", value: "$78M" },
      { label: "Duration", value: "5 months" },
      { label: "Type", value: "Sports & Entertainment" },
      { label: "Method", value: "Offsite prefab" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
