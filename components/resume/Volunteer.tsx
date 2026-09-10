import { volunteerMedia } from "@/lib/volunteer";
import { VolunteerGallery } from "./VolunteerGallery";

type Role = {
  title: string;
  period: string;
  bullets: string[];
};

type Org = {
  name: string;
  location: string;
  note: string;
  roles: Role[];
};

export function Volunteer({
  title,
  body,
  speakingTitle,
  speaking,
  gallery,
  orgs,
}: {
  title: string;
  body: string;
  speakingTitle: string;
  speaking: string;
  gallery: string;
  orgs: Org[];
}) {
  return (
    <div>
      <p className="max-w-xl text-2xl font-medium tracking-tight text-ink md:text-3xl">
        {title}
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{body}</p>

      <div className="mt-10">
        <VolunteerGallery gallery={gallery} media={volunteerMedia} />
      </div>

      <ol className="mt-12 space-y-0">
        {orgs.map((org) => (
          <li key={org.name} className="relative pl-6 md:pl-8">
            <span className="absolute top-2 left-0 h-2 w-2 rounded-full bg-amber" />
            <span className="absolute top-4 left-[3px] h-[calc(100%-8px)] w-px bg-line" />

            <div className="pb-12 md:pb-16">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                  {org.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {org.location}
                </p>
              </div>
              {org.note ? (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {org.note}
                </p>
              ) : null}

              <div className="mt-6 space-y-8">
                {org.roles.map((role) => (
                  <article key={`${org.name}-${role.title}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="font-medium text-ink">{role.title}</h4>
                      <p className="font-mono text-[11px] tracking-[0.08em] text-faint">
                        {role.period}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="max-w-2xl text-sm leading-relaxed text-muted"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="border border-line px-4 py-5 md:px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
          {speakingTitle}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {speaking}
        </p>
      </div>
    </div>
  );
}
