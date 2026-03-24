export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient + pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
          Find Your Next{" "}
          <span className="text-accent">Build</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto text-balance">
          Where architects, contractors, and engineers discover projects and
          connect with opportunities across the AEC industry.
        </p>

        {/* Search bar */}
        <div className="mt-10 mx-auto max-w-3xl bg-navy-800 border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
          <select className="flex-1 bg-navy-700 text-sm text-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent appearance-none">
            <option value="">Role</option>
            <option>Architect</option>
            <option>Contractor</option>
            <option>Engineer</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            className="flex-1 bg-navy-700 text-sm text-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-500"
          />
          <input
            type="text"
            placeholder="Keywords"
            className="flex-1 bg-navy-700 text-sm text-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-500"
          />
          <button className="bg-accent hover:bg-blue-600 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
            Search Projects
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          500+ active projects · Free to browse
        </p>
      </div>
    </section>
  );
}
