export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const leadership: TeamMember[] = [
  {
    name: "Jason Reese",
    title: "Founder",
    bio: "Experienced Business Development Manager with a demonstrated history of working in the engineering industry. Skilled in Operations Management, Sales, Team Building, and Management. Strong business development professional with a Bachelor of Business Administration (BBA) focused in International Business Management with Spanish Language Emphasis from University of Nevada-Las Vegas.",
    image: "/team/jason.jpg",
    linkedin: "#",
  },
];

export const awards = [
  { year: "2024", title: "ENR Best Projects — Merit Award", project: "Corporate Campus Expansion" },
  { year: "2023", title: "ACEC Engineering Excellence", project: "Highway 101 Bridge Rehabilitation" },
  { year: "2023", title: "ABC Excellence in Construction", project: "Stadium Renovation Phase II" },
  { year: "2022", title: "USGBC Leadership Award", project: "Greenway Office Park" },
];

export const milestones = [
  { year: "2015", event: "Jasace founded as a boutique ACE consulting practice in Las Vegas, NV" },
  { year: "2017", event: "Expanded into construction management and engineering consulting" },
  { year: "2019", event: "Built a trusted network of specialist collaborators across the Southwest" },
  { year: "2021", event: "Surpassed 100 completed projects" },
  { year: "2023", event: "Expanded service offerings to full-service ACE consulting" },
  { year: "2025", event: "Continued growth with 98% client satisfaction maintained" },
];
