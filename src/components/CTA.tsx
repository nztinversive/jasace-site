export default function CTA() {
  return (
    <section id="cta" className="py-24 px-4">
      <div className="mx-auto max-w-4xl text-center bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/20 rounded-3xl p-12 sm:p-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-balance">
          Ready to Find Your Next Project?
        </h2>
        <p className="mt-4 text-gray-400 max-w-lg mx-auto">
          Join thousands of AEC professionals already using Jasace to discover
          opportunities and grow their business.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-accent hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
            Post a Project
          </button>
        </div>
      </div>
    </section>
  );
}
