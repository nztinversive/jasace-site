export default function SectionDivider({ variant = "default" }: { variant?: "default" | "terra" | "dark" }) {
  const colors = {
    default: { line: "bg-stone-700", dot: "bg-stone-600" },
    terra: { line: "bg-terra/20", dot: "bg-terra/40" },
    dark: { line: "bg-stone-700", dot: "bg-stone-600" },
  };
  const c = colors[variant];

  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className={`flex-1 max-w-[120px] h-px ${c.line}`} />
      <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <div className={`flex-1 max-w-[120px] h-px ${c.line}`} />
    </div>
  );
}
