import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Technical Product Manager",
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      postalCode: "34080",
      addressCountry: "TR",
    },
    url: site.linkedin,
    sameAs: [site.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Maltepe University",
    },
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
