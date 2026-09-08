"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitch({
  en,
  tr,
}: {
  en: string;
  tr: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {(
        [
          { id: "en", label: en },
          { id: "tr", label: tr },
        ] as const
      ).map((item) => (
        <button
          key={item.id}
          className={cn(
            "px-1.5 py-0.5 font-mono text-[11px] tracking-[0.14em] transition-colors",
            locale === item.id
              ? "text-amber"
              : "text-faint hover:text-ink",
          )}
          onClick={() => switchTo(item.id)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
