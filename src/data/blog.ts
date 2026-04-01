import { paragraphsToHtml } from "@/lib/blog-content";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "future-of-sustainable-construction",
    title: "The Future of Sustainable Construction in 2025",
    excerpt: "How emerging materials and methods are reshaping the way we build - and why ACE firms must adapt now.",
    date: "March 12, 2025",
    category: "Sustainability",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    author: "Jason Reese",
    content: paragraphsToHtml([
      "The construction industry accounts for nearly 40% of global carbon emissions. As regulatory pressure mounts and client expectations evolve, ACE firms face a pivotal question: adapt or be left behind.",
      "At Jasace, we've been investing in sustainable design practices for over a decade. From mass timber structures to passive house principles, our approach treats sustainability not as a checkbox but as a design driver.",
      "Emerging materials like cross-laminated timber (CLT), geopolymer concrete, and bio-based insulation are moving from experimental to mainstream. Projects that once seemed cost-prohibitive now pencil out - especially when lifecycle costs are factored in.",
      "The firms that will lead the next decade are those building expertise in these methods today. Waiting for regulations to force the issue means playing catch-up in a market that rewards early movers.",
    ]),
  },
  {
    slug: "integrated-project-delivery",
    title: "Why Integrated Project Delivery Wins Every Time",
    excerpt: "Breaking down silos between architecture, construction, and engineering leads to better outcomes. Here's the data.",
    date: "February 28, 2025",
    category: "Project Delivery",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    author: "Jason Reese",
    content: paragraphsToHtml([
      "Traditional design-bid-build project delivery creates adversarial relationships. The architect designs in isolation, the contractor bids competitively, and the engineer fills in the gaps. The result? Change orders, delays, and finger-pointing.",
      "Integrated Project Delivery (IPD) flips this model. By bringing all disciplines to the table from day one, we eliminate the costly surprises that plague conventional projects.",
      "Our internal data tells the story: IPD projects at Jasace average 12% lower total cost and 18% faster delivery compared to our traditional-delivery benchmarks. Client satisfaction scores are 23% higher.",
      "The key is shared risk and shared reward. When the architect, engineer, and contractor are all invested in the project's success - not just their individual scope - better decisions happen naturally.",
    ]),
  },
  {
    slug: "seismic-retrofit-innovations",
    title: "Innovations in Seismic Retrofit Engineering",
    excerpt: "New techniques in carbon fiber wrapping and base isolation are extending the life of aging infrastructure by decades.",
    date: "February 10, 2025",
    category: "Engineering",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
    author: "Jason Reese",
    content: paragraphsToHtml([
      "California alone has over 25,000 bridges and buildings that predate modern seismic codes. Replacing them all isn't feasible - but innovative retrofit techniques are making it possible to extend their service life by 50-75 years.",
      "Carbon fiber reinforced polymer (CFRP) wrapping has emerged as a game-changer. Unlike traditional steel jacketing, CFRP is lighter, faster to install, and doesn't add significant mass to the structure - a critical advantage in seismic design.",
      "On our Highway 101 Bridge project, we combined CFRP pier wrapping with new base isolation bearings. The result was a full seismic upgrade without replacing a single pier, saving the client $15M compared to conventional approaches.",
      "As infrastructure ages nationwide, the demand for creative retrofit solutions will only grow. Engineers who can think beyond demolition and replacement will define the next era of infrastructure resilience.",
    ]),
  },
  {
    slug: "designing-for-hybrid-work",
    title: "Designing Offices for the Hybrid Work Era",
    excerpt: "The office isn't dead - but it needs to earn the commute. How we're rethinking workspace design for 2025.",
    date: "January 22, 2025",
    category: "Architecture",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    author: "Jason Reese",
    content: paragraphsToHtml([
      "The pandemic didn't kill the office - it exposed what was already broken. Rows of identical desks, fluorescent lighting, and one-size-fits-all floor plans were never great. Now, workers have a choice, and the bar for office design has never been higher.",
      "Our approach at Jasace starts with a question: what can this office offer that a home office can't? The answer is almost always about connection, collaboration, and culture.",
      "We design 'neighborhoods' within offices - clusters of team spaces separated by planted zones and casual collision areas. Private focus rooms replace open-plan desks for heads-down work. The result is a workplace that people actually want to be in.",
      "Our Corporate Campus project in Nashville demonstrated this philosophy in action. Post-occupancy surveys showed a 34% increase in employee satisfaction and a 28% improvement in self-reported productivity.",
    ]),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
