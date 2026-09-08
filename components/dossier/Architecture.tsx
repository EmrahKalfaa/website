type Layer = {
  id: string;
  name: string;
  items: string[];
};

export function Architecture({
  title,
  layers,
}: {
  title: string;
  layers: Layer[];
}) {
  return (
    <div>
      <p className="max-w-xl text-2xl font-medium tracking-tight text-ink md:text-3xl">
        {title}
      </p>

      <div className="mt-10 border-x border-t border-line">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="grid grid-cols-1 border-b border-line md:grid-cols-[8.5rem_1fr]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 md:border-r md:border-b-0 md:px-5">
              <span className="font-mono text-[10px] text-amber">{layer.id}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                {layer.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-3 md:px-5">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[12px] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
