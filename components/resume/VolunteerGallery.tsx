"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { VolunteerMedia } from "@/lib/volunteer";

export function VolunteerGallery({
  media,
  gallery,
}: {
  media: VolunteerMedia[];
  gallery: string;
}) {
  const locale = useLocale();
  const lang = locale === "tr" ? "tr" : "en";

  return (
    <ul
      aria-label={gallery}
      className="grid max-w-lg grid-cols-3 gap-2 md:max-w-xl md:gap-3"
    >
      {media.map((item) => (
        <li key={item.src} className="min-w-0">
          <div className="relative aspect-[3/4] overflow-hidden border border-line bg-canvas">
            {item.kind === "image" ? (
              <Image
                alt={item.alt[lang]}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 180px, 30vw"
                src={item.src}
              />
            ) : (
              <video
                aria-label={item.alt[lang]}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                src={item.src}
              />
            )}
          </div>
          <p className="mt-2 line-clamp-2 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted">
            {item.caption[lang]}
          </p>
        </li>
      ))}
    </ul>
  );
}
