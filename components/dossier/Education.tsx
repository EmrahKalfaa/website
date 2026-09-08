export function Education({
  degree,
  school,
  period,
}: {
  degree: string;
  school: string;
  period: string;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
      <div>
        <p className="text-xl font-medium tracking-tight text-ink">{degree}</p>
        <p className="mt-1 text-muted">{school}</p>
      </div>
      <p className="font-mono text-[11px] tracking-[0.12em] text-faint">{period}</p>
    </div>
  );
}
