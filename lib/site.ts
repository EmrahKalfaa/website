export const site = {
  name: "Emrah Kalfa",
  email: "emrahkalfakst@gmail.com",
  linkedin: "https://www.linkedin.com/in/emrahkalfa/",
  linkedinLabel: "linkedin.com/in/emrahkalfa",
  location: "Istanbul, 34080",
  pdf: {
    en: "/Emrah_Kalfa_Resume_PO_2026_Eng.pdf",
    tr: "/Emrah_Kalfa_Resume_PO_2026_TR.pdf",
  },
} as const;

export const sectionIds = [
  "overview",
  "signals",
  "summary",
  "highlight",
  "roadmap",
  "architecture",
  "education",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
