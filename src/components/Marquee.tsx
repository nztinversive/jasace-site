export default function Marquee() {
  const items = [
    "Architecture",
    "Engineering",
    "Construction Management",
    "Structural Design",
    "Urban Planning",
    "Sustainability",
    "Project Delivery",
    "Design Excellence",
  ];

  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8 mx-8">
      <span className="font-display text-xl lg:text-2xl font-light tracking-tight text-stone-900/80 whitespace-nowrap">{item}</span>
      <span className="w-2 h-2 bg-terra rounded-full flex-shrink-0" />
    </span>
  ));

  return (
    <div className="py-6 border-y border-stone-200 overflow-hidden bg-stone-50">
      <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
        {track}
        {track}
      </div>
    </div>
  );
}
