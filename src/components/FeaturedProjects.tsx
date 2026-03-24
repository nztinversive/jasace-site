const projects = [
  {
    title: "Downtown Mixed-Use Tower",
    company: "Meridian Development Group",
    location: "Austin, TX",
    type: "Architecture",
    posted: "2 days ago",
  },
  {
    title: "Highway 101 Bridge Rehabilitation",
    company: "Pacific Infrastructure Co.",
    location: "San Jose, CA",
    type: "Engineering",
    posted: "3 days ago",
  },
  {
    title: "Lakefront Residential Complex",
    company: "Harborview Builders",
    location: "Chicago, IL",
    type: "Contracting",
    posted: "1 day ago",
  },
  {
    title: "Municipal Water Treatment Upgrade",
    company: "ClearFlow Engineering",
    location: "Denver, CO",
    type: "Engineering",
    posted: "4 days ago",
  },
  {
    title: "Corporate Campus Expansion",
    company: "Nexus Architecture Studio",
    location: "Nashville, TN",
    type: "Architecture",
    posted: "1 day ago",
  },
  {
    title: "Stadium Renovation Phase II",
    company: "Ironclad Construction",
    location: "Phoenix, AZ",
    type: "Contracting",
    posted: "5 days ago",
  },
];

const typeColors: Record<string, string> = {
  Architecture: "bg-purple-500/10 text-purple-400",
  Engineering: "bg-emerald-500/10 text-emerald-400",
  Contracting: "bg-amber-500/10 text-amber-400",
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Featured <span className="text-accent">Projects</span>
        </h2>
        <p className="mt-3 text-gray-400 text-center max-w-xl mx-auto">
          New opportunities added daily. Here are some of the latest.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group bg-navy-800 border border-white/5 rounded-2xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[p.type]}`}
                >
                  {p.type}
                </span>
                <span className="text-xs text-gray-500">{p.posted}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{p.company}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {p.location}
                </span>
                <button className="text-sm text-accent hover:text-blue-400 font-medium transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
