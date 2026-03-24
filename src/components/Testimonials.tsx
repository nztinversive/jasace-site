const testimonials = [
  {
    quote:
      "Jasace completely changed how I find projects. Within two weeks of signing up, I landed a $2M commercial build.",
    name: "Marcus Chen",
    title: "General Contractor",
    company: "Chen Construction LLC",
    stars: 5,
  },
  {
    quote:
      "The quality of projects on here is unmatched. No more sifting through junk — every listing is vetted and relevant to my practice.",
    name: "Sarah Okonkwo",
    title: "Principal Architect",
    company: "Okonkwo + Partners",
    stars: 5,
  },
  {
    quote:
      "As a structural engineer, I was skeptical. But the filtering tools and direct connections to project owners make this a no-brainer.",
    name: "David Reeves",
    title: "Structural Engineer, PE",
    company: "Reeves Engineering Group",
    stars: 4,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-navy-800/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Trusted by <span className="text-accent">Professionals</span>
        </h2>
        <p className="mt-3 text-gray-400 text-center max-w-xl mx-auto">
          Hear from AEC pros who found their next project on Jasace.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-navy-900 border border-white/5 rounded-2xl p-8"
            >
              <Stars count={t.stars} />
              <p className="mt-4 text-sm text-gray-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">
                  {t.title} · {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
