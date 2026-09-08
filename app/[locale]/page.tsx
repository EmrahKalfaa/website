import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Architecture } from "@/components/dossier/Architecture";
import { Contact } from "@/components/dossier/Contact";
import { DossierShell } from "@/components/dossier/DossierShell";
import { Education } from "@/components/dossier/Education";
import { Hero } from "@/components/dossier/Hero";
import { Highlight } from "@/components/dossier/Highlight";
import { JsonLd } from "@/components/dossier/JsonLd";
import { Roadmap } from "@/components/dossier/Roadmap";
import { Section } from "@/components/dossier/Section";
import { Signals } from "@/components/dossier/Signals";
import type { NavItem } from "@/components/dossier/IndexRail";
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
    { id: "contact", index: "08", label: t("nav.contact") },
  ];

  return (
    <DossierShell
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
          phoneLabel={t("hero.phone")}
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

        <Section id="contact" index="08" label={t("nav.contact")}>
          <Contact
            body={t("contact.body")}
            email={t("contact.email")}
            linkedin={t("contact.linkedin")}
            pdf={t("contact.pdf")}
            phone={t("contact.phone")}
            title={t("contact.title")}
          />
        </Section>
      </main>
    </DossierShell>
  );
}
