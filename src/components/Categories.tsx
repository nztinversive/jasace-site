const categories = [
  {
    icon: "🏛️",
    title: "Architecture",
    description:
      "Discover commercial, residential, and public architecture projects from top firms nationwide.",
    count: "180+ projects",
  },
  {
    icon: "⚙️",
    title: "Engineering",
    description:
      "Structural, civil, MEP, and environmental engineering opportunities across all sectors.",
    count: "210+ projects",
  },
  {
    icon: "🏗️",
    title: "Contracting",
    description:
      "General contracting, specialty trades, and construction management roles on active builds.",
    count: "150+ projects",
  },
];

export default function Categories() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Browse by <span className="text-accent">Discipline</span>
        </h2>
        <p className="mt-3 text-gray-400 text-center max-w-xl mx-auto">
          Find projects that match your expertise and interests.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group bg-navy-800 border border-white/5 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
            >
              <span className="text-4xl">{cat.icon}</span>
              <h3 className="mt-4 text-xl font-semibold">{cat.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-gray-500">{cat.count}</span>
                <span className="text-sm text-accent group-hover:translate-x-1 transition-transform">
                  Browse →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
