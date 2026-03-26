export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const leadership: TeamMember[] = [
  {
    name: "James Acevedo",
    title: "Founder & Principal",
    bio: "With over 25 years in the ACE industry, James founded Jasace on the principle that integrated design delivers better buildings. He has led hundreds of projects across commercial, residential, and public sectors — bringing architecture, construction, and engineering expertise to every engagement.",
    image: "/team/james.jpg",
    linkedin: "#",
  },
  {
    name: "Partner",
    title: "Operations & Project Delivery",
    bio: "Bringing deep experience in construction management and project coordination, our operations lead ensures every project runs on time, on budget, and to the highest standards. Together with a trusted network of specialist collaborators, we deliver full-service ACE consulting.",
    image: "/team/partner.jpg",
    linkedin: "#",
  },
];

export const awards = [
  { year: "2024", title: "AIA Austin Design Award", project: "Downtown Mixed-Use Tower" },
  { year: "2024", title: "ENR Best Projects — Merit Award", project: "Corporate Campus Expansion" },
  { year: "2023", title: "ACEC Engineering Excellence", project: "Highway 101 Bridge Rehabilitation" },
  { year: "2023", title: "ABC Excellence in Construction", project: "Stadium Renovation Phase II" },
  { year: "2022", title: "USGBC Leadership Award", project: "Greenway Office Park" },
  { year: "2022", title: "AIA National Honor Award", project: "Civic Center Redesign" },
];

export const milestones = [
  { year: "2001", event: "Jasace founded as a boutique architecture consulting practice in Austin, TX" },
  { year: "2006", event: "Expanded into structural and civil engineering consulting" },
  { year: "2010", event: "Added construction management, becoming a full-service ACE practice" },
  { year: "2015", event: "Built a trusted network of specialist collaborators across the Southwest" },
  { year: "2018", event: "Surpassed 300 completed projects" },
  { year: "2022", event: "Celebrated over two decades of boutique ACE consulting" },
  { year: "2024", event: "500+ projects delivered, 98% client satisfaction maintained" },
];
