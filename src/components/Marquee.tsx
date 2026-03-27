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
    <span key={i} className="flex items-center gap-8 mx-8">
      <span className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-stone-700 whitespace-nowrap hover:text-terra transition-colors duration-500 cursor-default select-none uppercase">
        {item}
      </span>
      <span className="w-2 h-2 bg-terra/40 rotate-45 flex-shrink-0" />
    </span>
  ));

  return (
    <div className="py-10 lg:py-14 border-y border-stone-800/60 overflow-hidden bg-stone-950 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
        {track}
        {track}
      </div>
    </div>
  );
}
