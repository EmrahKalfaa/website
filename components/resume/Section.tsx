import type { SectionId } from "@/lib/site";

type Props = {
  id: SectionId;
  index: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, index, label, children, className }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      className={`scroll-mt-28 border-t border-line py-16 md:scroll-mt-12 md:py-24 ${className ?? ""}`}
    >
      <div className="mb-8 flex items-baseline gap-3 md:mb-12">
        <span className="font-mono text-[11px] tracking-[0.18em] text-amber">
          {index}
        </span>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}
