const steps = [
  {
    num: "01",
    icon: "👤",
    title: "Create Your Profile",
    description:
      "Set up your professional profile with your skills, certifications, and project history in minutes.",
  },
  {
    num: "02",
    icon: "🔍",
    title: "Discover Projects",
    description:
      "Browse and filter hundreds of active projects by discipline, location, budget, and timeline.",
  },
  {
    num: "03",
    icon: "🤝",
    title: "Connect & Build",
    description:
      "Submit proposals, connect with project owners, and start building. It's that simple.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-4 bg-navy-800/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          How It <span className="text-accent">Works</span>
        </h2>
        <p className="mt-3 text-gray-400 text-center max-w-xl mx-auto">
          Three steps to your next project. No gatekeepers.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center md:text-left">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-accent/30 to-transparent" />
              )}

              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="text-xs font-mono text-accent mb-1">
                STEP {step.num}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
