"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { site, type SectionId } from "@/lib/site";
import type { NavItem } from "./IndexRail";
import { usePdfDownload } from "./PdfDownloadDialog";

type CommandCopy = {
  placeholder: string;
  empty: string;
  groupNav: string;
  groupActions: string;
  switchToEn: string;
  switchToTr: string;
  copyEmail: string;
  copied: string;
  downloadPdf: string;
  openLinkedin: string;
  close: string;
};

type Item = {
  id: string;
  group: "nav" | "actions";
  label: string;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  nav,
  copy,
  onJump,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  copy: CommandCopy;
  onJump: (id: SectionId) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const openPdfDialog = usePdfDownload();

  const items = useMemo<Item[]>(() => {
    const navItems: Item[] = nav.map((item) => ({
      id: `nav-${item.id}`,
      group: "nav",
      label: `${item.index}  ${item.label}`,
      run: () => {
        onJump(item.id);
        onClose();
      },
    }));

    const actions: Item[] = [
      {
        id: "lang",
        group: "actions",
        label: locale === "en" ? copy.switchToTr : copy.switchToEn,
        run: () => {
          router.replace(pathname, { locale: locale === "en" ? "tr" : "en" });
          onClose();
        },
      },
      {
        id: "email",
        group: "actions",
        label: copied ? copy.copied : copy.copyEmail,
        run: async () => {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        },
      },
      {
        id: "pdf",
        group: "actions",
        label: copy.downloadPdf,
        run: () => {
          onClose();
          openPdfDialog();
        },
      },
      {
        id: "linkedin",
        group: "actions",
        label: copy.openLinkedin,
        run: () => {
          window.open(site.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
    ];

    const all = [...navItems, ...actions];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((item) => item.label.toLowerCase().includes(q));
  }, [nav, copy, locale, pathname, router, onJump, onClose, openPdfDialog, query, copied]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        items[active]?.run();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, active, onClose]);

  if (!open) return null;

  const navGroup = items.filter((i) => i.group === "nav");
  const actionGroup = items.filter((i) => i.group === "actions");

  function renderGroup(title: string, group: Item[], offset: number) {
    if (group.length === 0) return null;
    return (
      <div className="px-2 py-2">
        <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {title}
        </p>
        {group.map((item, i) => {
          const index = offset + i;
          return (
            <button
              key={item.id}
              className={cn(
                "flex w-full px-2 py-2 text-left font-mono text-[13px] transition-colors",
                index === active ? "bg-amber-soft text-ink" : "text-muted",
              )}
              onMouseEnter={() => setActive(index)}
              onClick={() => item.run()}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]">
      <button
        aria-label={copy.close}
        className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div
        className="relative w-full max-w-lg overflow-hidden border border-line bg-canvas shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        role="dialog"
        aria-modal="true"
        aria-label={copy.placeholder}
      >
        <input
          ref={inputRef}
          className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm text-ink outline-none placeholder:text-faint"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.placeholder}
          value={query}
        />
        <div className="max-h-[50vh] overflow-y-auto">
          {items.length === 0 ? (
            <p className="px-4 py-6 font-mono text-sm text-faint">{copy.empty}</p>
          ) : (
            <>
              {renderGroup(copy.groupNav, navGroup, 0)}
              {renderGroup(copy.groupActions, actionGroup, navGroup.length)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
