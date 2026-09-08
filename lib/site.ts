export const site = {
  name: "Emrah Kalfa",
  email: "emrahkalfakst@gmail.com",
  phone: "+905335260233",
  phoneDisplay: "+90 533 526 02 33",
  linkedin: "https://www.linkedin.com/in/emrahkalfa/",
  linkedinLabel: "linkedin.com/in/emrahkalfa",
  location: "Istanbul, 34080",
  pdf: "/Emrah_Kalfa_Resume_PO_2026_Eng.pdf",
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
