import type {
  AboutContent,
  Category,
  HeroContent,
  ServiceContent,
  SiteSettings,
  SiteStat,
  Testimonial,
} from "@/types/cms";
import { awards, milestones } from "@/data/team";

export const heroContent: HeroContent = {
  eyebrow: "Architecture · Construction · Engineering",
  headline: "Building Beyond Limits",
  subheadline:
    "Architecture, construction, and engineering consulting delivering precision and results for projects that matter.",
  ctaText: "View Our Work",
  ctaLink: "#work",
  secondaryCtaText: "Get in Touch",
  secondaryCtaLink: "#contact",
  backgroundImage:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1200&fit=crop&crop=bottom",
};

export const aboutContent: AboutContent = {
  heading: "Great Buildings Start with Great Listening",
  subheading: "Our Philosophy",
  paragraphs: [
    "Founded in Las Vegas by Jason Reese, Jasace is an ACE consulting practice built on a simple principle: every project deserves full attention, every client deserves honest counsel, and every building should enhance the lives of the people who use it.",
    "With a trusted network of collaborators, we deliver real expertise without the overhead — direct access, honest counsel, and results.",
    "Jasace was founded by Jason Reese in Las Vegas, Nevada, built on the belief that the best projects come from people who think across disciplines, not in silos.",
    "With a background in business development and operations management in the engineering industry, Jason brings a unique perspective to ACE consulting, combining technical understanding with strong project delivery and client relationships.",
    "Today, Jasace delivers real expertise without the overhead. Every client works directly with Jason — no hand-offs, no layers, no surprises.",
  ],
  image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=900&fit=crop",
  stats: [
    { label: "Integrated Approach", value: "Architecture, construction, and engineering under one roof." },
    { label: "Client-First", value: "Your vision drives every decision we make." },
    { label: "Sustainable Design", value: "Building responsibly for the next generation." },
    { label: "Local Expertise", value: "Deep roots in the communities we serve." },
  ],
  awards,
  milestones,
};

export const serviceContent: ServiceContent[] = [
  {
    title: "Architecture",
    subtitle: "Design Excellence",
    description:
      "From concept through completion, we create spaces that inspire. Our architectural practice spans commercial, residential, and public projects with a focus on contextual design and lasting impact.",
    capabilities: ["Master Planning", "Commercial Design", "Residential Architecture", "Adaptive Reuse"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop",
    order: 1,
    details: [
      "We believe great architecture starts with listening. Every project begins with a deep understanding of the client’s needs, the site’s context, and the community’s aspirations.",
      "Our design process integrates engineering and construction expertise from day one, eliminating the costly surprises that come from designing in isolation.",
    ],
    stats: [
      { label: "Projects", value: "60+" },
      { label: "LEED Certified", value: "12+" },
    ],
    stat: "60+",
    statLabel: "projects",
  },
  {
    title: "Construction",
    subtitle: "Delivered with Integrity",
    description:
      "Construction management that keeps your project on time, on budget, and built to the highest standards. We bring field experience and a collaborative approach to every build.",
    capabilities: ["Construction Management", "Cost Estimation", "Scheduling", "Quality Assurance"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    order: 2,
    details: [
      "Our construction management doesn’t just track schedules and budgets — it solves problems before they happen. With deep field experience, we ensure design intent is preserved from groundbreaking to ribbon-cutting.",
      "We use modern project delivery methods and real-time dashboards to give clients full visibility into their project’s progress.",
    ],
    stats: [
      { label: "On-time", value: "98%" },
      { label: "Safety", value: "Zero LTI" },
    ],
    stat: "98%",
    statLabel: "on-time",
  },
  {
    title: "Engineering",
    subtitle: "Precision & Performance",
    description:
      "Structural, civil, and MEP engineering solutions that perform beautifully. We bring technical rigor and creative problem-solving to every engineering challenge.",
    capabilities: ["Structural Engineering", "Civil Engineering", "MEP Design", "Environmental"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop",
    order: 3,
    details: [
      "Engineering is the backbone of every great building. Our engineers work alongside architects and construction managers, ensuring that structural systems and building services are fully coordinated.",
      "From seismic retrofit to advanced MEP design, we combine analytical rigor with practical construction knowledge because the best engineering solution is one that can actually be built.",
    ],
    stats: [
      { label: "Structures", value: "40+" },
      { label: "Specialties", value: "8" },
    ],
    stat: "40+",
    statLabel: "structures",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Jasace completely changed how we approach our projects. They delivered a $2M commercial build ahead of schedule — and the design exceeded every expectation.",
    name: "M. Chen",
    title: "CEO, Chen Development Group",
  },
  {
    quote:
      "Every detail is considered, every decision is backed by expertise. Working with Jasace feels less like hiring a company and more like gaining a partner.",
    name: "S. Okonkwo",
    title: "Director of Facilities, Okonkwo + Partners",
  },
  {
    quote:
      "They found a retrofit solution that saved us millions. That kind of creative problem-solving is rare in this industry.",
    name: "D. Reeves",
    title: "VP of Development, Reeves Properties",
  },
];

export const siteStats: SiteStat[] = [
  { value: 10, suffix: "+", label: "Years", detail: "in the engineering industry", order: 1 },
  { value: 100, suffix: "+", label: "Projects", detail: "delivered across three disciplines", order: 2 },
  { value: 98, suffix: "%", label: "Satisfaction", detail: "client retention rate", order: 3 },
  { value: 15, suffix: "+", label: "Partners", detail: "trusted network of collaborators", order: 4 },
];

export const categories: Category[] = [
  {
    title: "Architecture",
    count: "180+",
    description: "Commercial, residential, and public architecture projects from firms across the region.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    order: 1,
  },
  {
    title: "Engineering",
    count: "210+",
    description: "Structural, civil, MEP, and environmental engineering opportunities across all sectors.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    order: 2,
  },
  {
    title: "Contracting",
    count: "150+",
    description: "General contracting, specialty trades, and construction management roles on active builds.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    order: 3,
  },
];

export const siteSettings: SiteSettings = {
  companyName: "Jasace ACE",
  tagline: "Architecture, construction, and engineering consulting delivering results since 2015.",
  email: "jason@jasace.com",
  phone: "(702) 403-5346",
  address: "Las Vegas, Nevada",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ],
  footerText: "Architecture, construction, and engineering consulting delivering results since 2015.",
};
