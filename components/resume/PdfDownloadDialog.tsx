"use client";

import { createContext, useContext, useEffect, useId, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

export const PdfDownloadContext = createContext<() => void>(() => {});

export function usePdfDownload() {
  return useContext(PdfDownloadContext);
}

function downloadPdf(locale: Locale) {
  const href = site.pdf[locale];
  const link = document.createElement("a");
  link.href = href;
  link.download = href.slice(href.lastIndexOf("/") + 1);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function PdfDownloadDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("pdfDialog");
  const locale = useLocale();
  const titleId = useId();
  const firstOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => firstOptionRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const options = [
    { id: "en" as const, label: t("en"), hint: "EN" },
    { id: "tr" as const, label: t("tr"), hint: "TR" },
  ];

  function choose(next: Locale) {
    downloadPdf(next);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        aria-label={t("close")}
        className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="relative w-full max-w-md border border-line bg-canvas p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        role="dialog"
      >
        <p
          className="text-2xl font-medium tracking-tight text-ink"
          id={titleId}
        >
          {t("title")}
        </p>
        <div className="mt-6 flex flex-col gap-3 font-mono text-sm">
          {options.map((option) => (
            <button
              key={option.id}
              className="group flex w-full items-center justify-between border border-line px-4 py-3 text-left transition-colors hover:border-amber hover:bg-amber-soft"
              onClick={() => choose(option.id)}
              ref={option.id === locale ? firstOptionRef : undefined}
              type="button"
            >
              <span className={locale === option.id ? "text-amber" : "text-ink"}>
                {option.label}
              </span>
              <span className="text-muted">{option.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
