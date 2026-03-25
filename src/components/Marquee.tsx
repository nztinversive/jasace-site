export default function Marquee() {
  const items = [
    "Architecture",
    "Construction",
    "Engineering",
    "Sustainability",
    "Urban Planning",
    "Structural Design",
    "Project Delivery",
    "Design Excellence",
  ];

  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-10 mx-10">
      <span className="font-display text-2xl lg:text-4xl font-light italic tracking-tight text-stone-800/60 whitespace-nowrap hover:text-terra transition-colors duration-500 cursor-default">
        {item}
      </span>
      <span className="w-1.5 h-1.5 bg-terra/60 rounded-full flex-shrink-0" />
    </span>
  ));

  return (
    <div className="py-8 lg:py-10 border-y border-stone-200/80 overflow-hidden bg-stone-50 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
        {track}
        {track}
      </div>
    </div>
  );
}
