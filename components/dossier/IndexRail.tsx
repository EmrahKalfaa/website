"use client";

import { cn } from "@/lib/cn";
import type { SectionId } from "@/lib/site";
import { LocaleSwitch } from "./LocaleSwitch";

export type NavItem = {
  id: SectionId;
  index: string;
  label: string;
};

type Props = {
  items: NavItem[];
  active: SectionId;
  kicker: string;
  year: string;
  commandHint: string;
  langEn: string;
  langTr: string;
  onJump: (id: SectionId) => void;
  onOpenCommand: () => void;
};

export function IndexRail({
  items,
  active,
  kicker,
  year,
  commandHint,
  langEn,
  langTr,
  onJump,
  onOpenCommand,
}: Props) {
  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur md:hidden">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {kicker} · {year}
        </p>
        <div className="flex items-center gap-3">
          <LocaleSwitch en={langEn} tr={langTr} />
          <button
            className="font-mono text-[10px] tracking-[0.14em] text-faint"
            onClick={onOpenCommand}
            type="button"
          >
            ⌘K
          </button>
        </div>
      </header>

      <aside className="pointer-events-none fixed top-0 left-0 z-30 hidden h-screen w-56 flex-col justify-between px-6 py-8 md:flex lg:w-64">
        <div className="pointer-events-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
            EK
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {kicker}
          </p>
          <p className="mt-1 font-mono text-[11px] text-faint">{year}</p>

          <nav aria-label="Sections" className="mt-12 space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "group flex w-full items-center gap-3 py-1.5 text-left font-mono text-[11px] tracking-[0.12em] transition-colors",
                  active === item.id ? "text-ink" : "text-faint hover:text-muted",
                )}
                onClick={() => onJump(item.id)}
                type="button"
              >
                <span
                  className={cn(
                    "w-5",
                    active === item.id ? "text-amber" : "text-faint",
                  )}
                >
                  {item.index}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pointer-events-auto space-y-4">
          <LocaleSwitch en={langEn} tr={langTr} />
          <button
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-faint transition-colors hover:text-ink"
            onClick={onOpenCommand}
            type="button"
          >
            <kbd className="border border-line px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
            <span>{commandHint}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
