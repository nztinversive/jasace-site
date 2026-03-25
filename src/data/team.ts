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
    title: "Founder & CEO",
    bio: "With over 30 years in the AEC industry, James founded Jasace on the principle that integrated design delivers better buildings. He has led over 200 projects across commercial, residential, and public sectors.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Sarah Okonkwo",
    title: "Principal Architect",
    bio: "Sarah brings 20 years of design leadership to Jasace. Her work has been recognized by the AIA, and she is passionate about sustainable design that serves communities.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "David Reeves",
    title: "Director of Engineering",
    bio: "A licensed PE with expertise in structural and seismic design, David has engineered solutions for some of the most challenging infrastructure projects in the Southwest.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    name: "Maria Torres",
    title: "VP of Construction",
    bio: "Maria oversees all construction management operations. Her 18-year track record includes delivering projects totaling over $2B in construction value, consistently on time and under budget.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
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
  { year: "2001", event: "Jasace founded as a small architecture studio in Austin, TX" },
  { year: "2006", event: "Expanded into structural and civil engineering services" },
  { year: "2010", event: "Added construction management division, becoming a full-service AEC firm" },
  { year: "2015", event: "Opened second office in Denver, CO" },
  { year: "2018", event: "Surpassed 300 completed projects milestone" },
  { year: "2022", event: "Team grew to 40+ professionals across two offices" },
  { year: "2024", event: "Celebrated 500+ projects delivered over 25 years" },
];
