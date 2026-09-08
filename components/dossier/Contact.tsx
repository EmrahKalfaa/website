import { site } from "@/lib/site";

type Props = {
  title: string;
  body: string;
  email: string;
  linkedin: string;
  phone: string;
  pdf: string;
};

export function Contact({ title, body, email, linkedin, phone, pdf }: Props) {
  return (
    <div>
      <p className="max-w-xl text-3xl font-medium tracking-tight text-ink md:text-4xl">
        {title}
      </p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>

      <div className="mt-10 flex flex-col gap-3 font-mono text-sm">
        <a
          className="group flex items-center justify-between border border-line px-4 py-3 transition-colors hover:border-line-strong hover:bg-amber-soft"
          href={`mailto:${site.email}`}
        >
          <span className="text-muted">{email}</span>
          <span className="text-ink">{site.email}</span>
        </a>
        <a
          className="group flex items-center justify-between border border-line px-4 py-3 transition-colors hover:border-line-strong hover:bg-amber-soft"
          href={site.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="text-muted">{linkedin}</span>
          <span className="text-ink">{site.linkedinLabel}</span>
        </a>
        <a
          className="group flex items-center justify-between border border-line px-4 py-3 transition-colors hover:border-line-strong hover:bg-amber-soft"
          href={`tel:${site.phone}`}
        >
          <span className="text-muted">{phone}</span>
          <span className="text-ink">{site.phoneDisplay}</span>
        </a>
        <a
          className="group flex items-center justify-between border border-amber/40 bg-amber-soft px-4 py-3 text-amber transition-colors hover:border-amber"
          download
          href={site.pdf}
        >
          <span>{pdf}</span>
          <span aria-hidden>↓</span>
        </a>
      </div>
    </div>
  );
}
