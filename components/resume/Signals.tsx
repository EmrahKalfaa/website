type Item = { value: string; label: string };

export function Signals({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 border border-line md:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`px-4 py-5 md:px-6 md:py-7 ${
            i % 2 === 1 ? "border-l border-line" : ""
          } ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${
            i === 2 ? "md:border-l" : ""
          } ${i === 3 ? "border-l border-line" : ""}`}
        >
          <p className="font-sans text-2xl font-medium tracking-tight text-ink md:text-3xl">
            {item.value}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
