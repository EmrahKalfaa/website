import { site } from "@/lib/site";

type Props = {
  role: string;
  roleAlt: string;
  location: string;
  status: string;
  emailLabel: string;
  linkedinLabel: string;
};

export function Hero({
  role,
  roleAlt,
  location,
  status,
  emailLabel,
  linkedinLabel,
}: Props) {
  const [first, last] = site.name.split(" ");

  return (
    <section
      id="overview"
      data-section="overview"
      className="scroll-mt-28 pb-16 pt-10 md:scroll-mt-12 md:pb-24 md:pt-16"
    >
      <p className="rise font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
        {first?.[0]}
        {last?.[0]} · {location}
      </p>

      <h1 className="rise mt-6 font-sans text-[clamp(3.4rem,18vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.06em] text-ink">
        <span className="block">{first}</span>
        <span className="block text-ink/80">{last}</span>
      </h1>

      <div className="rise mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-medium tracking-tight text-ink md:text-2xl">
            {role}
          </p>
          <p className="mt-1 font-mono text-sm text-muted">{roleAlt}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            {status}
          </p>
        </div>
      </div>

      <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs text-muted">
        <li>
          <a
            className="transition-colors hover:text-ink"
            href={`mailto:${site.email}`}
          >
            {emailLabel}
            <span className="ml-2 text-faint">{site.email}</span>
          </a>
        </li>
        <li>
          <a
            className="transition-colors hover:text-ink"
            href={site.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            {linkedinLabel}
            <span className="ml-2 text-faint">{site.linkedinLabel}</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
