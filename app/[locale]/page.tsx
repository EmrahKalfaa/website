import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Architecture } from "@/components/resume/Architecture";
import { Contact } from "@/components/resume/Contact";
import { Education } from "@/components/resume/Education";
import { Hero } from "@/components/resume/Hero";
import { Highlight } from "@/components/resume/Highlight";
import { JsonLd } from "@/components/resume/JsonLd";
import { Roadmap } from "@/components/resume/Roadmap";
import { Section } from "@/components/resume/Section";
import { Signals } from "@/components/resume/Signals";
import { ResumeShell } from "@/components/resume/ResumeShell";
import { Volunteer } from "@/components/resume/Volunteer";
import type { NavItem } from "@/components/resume/IndexRail";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const messages = await getMessages();

  const nav: NavItem[] = [
    { id: "overview", index: "01", label: t("nav.overview") },
    { id: "signals", index: "02", label: t("nav.signals") },
    { id: "summary", index: "03", label: t("nav.summary") },
    { id: "highlight", index: "04", label: t("nav.highlight") },
    { id: "roadmap", index: "05", label: t("nav.roadmap") },
    { id: "architecture", index: "06", label: t("nav.architecture") },
    { id: "education", index: "07", label: t("nav.education") },
    { id: "volunteer", index: "08", label: t("nav.volunteer") },
    { id: "contact", index: "09", label: t("nav.contact") },
  ];

  return (
    <ResumeShell
      command={messages.command}
      commandHint={t("chrome.commandHint")}
      kicker={t("chrome.kicker")}
      langEn={t("chrome.langEn")}
      langTr={t("chrome.langTr")}
      nav={nav}
      skip={t("chrome.skip")}
      year={t("chrome.year")}
    >
      <JsonLd />
      <main className="mx-auto w-full max-w-3xl px-5 pb-24 md:max-w-4xl md:px-8 lg:px-10">
        <Hero
          emailLabel={t("hero.email")}
          linkedinLabel={t("hero.linkedin")}
          location={t("hero.location")}
          role={t("hero.role")}
          roleAlt={t("hero.roleAlt")}
          status={t("hero.status")}
        />

        <Section id="signals" index="02" label={t("nav.signals")}>
          <Signals items={messages.signals.items} />
        </Section>

        <Section id="summary" index="03" label={t("nav.summary")}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
            {t("summary.body")}
          </p>
        </Section>

        <Section id="highlight" index="04" label={t("nav.highlight")}>
          <Highlight body={t("highlight.body")} title={t("highlight.title")} />
        </Section>

        <Section id="roadmap" index="05" label={t("nav.roadmap")}>
          <Roadmap
            companies={messages.experience.companies}
            title={t("experience.title")}
          />
        </Section>

        <Section id="architecture" index="06" label={t("nav.architecture")}>
          <Architecture
            layers={messages.skills.layers}
            title={t("skills.title")}
          />
        </Section>

        <Section id="education" index="07" label={t("nav.education")}>
          <Education
            degree={t("education.degree")}
            period={t("education.period")}
            school={t("education.school")}
          />
        </Section>

        <Section id="volunteer" index="08" label={t("nav.volunteer")}>
          <Volunteer
            body={t("volunteer.body")}
            empty={t("volunteer.empty")}
            gallery={t("volunteer.gallery")}
            next={t("volunteer.next")}
            orgs={messages.volunteer.orgs}
            prev={t("volunteer.prev")}
            speaking={t("volunteer.speaking")}
            speakingTitle={t("volunteer.speakingTitle")}
            title={t("volunteer.title")}
          />
        </Section>

        <Section id="contact" index="09" label={t("nav.contact")}>
          <Contact
            body={t("contact.body")}
            email={t("contact.email")}
            linkedin={t("contact.linkedin")}
            pdf={t("contact.pdf")}
            title={t("contact.title")}
          />
        </Section>
      </main>
    </ResumeShell>
  );
}
