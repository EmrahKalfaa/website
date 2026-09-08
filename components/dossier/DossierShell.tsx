"use client";

import { useCallback, useEffect, useState } from "react";
import type { SectionId } from "@/lib/site";
import { CommandPalette } from "./CommandPalette";
import { IndexRail, type NavItem } from "./IndexRail";

type Props = {
  nav: NavItem[];
  kicker: string;
  year: string;
  commandHint: string;
  skip: string;
  langEn: string;
  langTr: string;
  command: {
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
  children: React.ReactNode;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function DossierShell({
  nav,
  kicker,
  year,
  commandHint,
  skip,
  langEn,
  langTr,
  command,
  children,
}: Props) {
  const [active, setActive] = useState<SectionId>("overview");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const jump = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    setActive(id);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute("data-section");
        if (id) setActive(id as SectionId);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = paletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [paletteOpen]);

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-amber focus:px-3 focus:py-2 focus:text-canvas"
        href="#overview"
      >
        {skip}
      </a>

      <div aria-hidden className="dossier-grid pointer-events-none fixed inset-0" />
      <div aria-hidden className="dossier-grain pointer-events-none fixed inset-0" />

      <IndexRail
        active={active}
        commandHint={commandHint}
        items={nav}
        kicker={kicker}
        langEn={langEn}
        langTr={langTr}
        onJump={jump}
        onOpenCommand={() => setPaletteOpen(true)}
        year={year}
      />

      <CommandPalette
        copy={command}
        nav={nav}
        onClose={() => setPaletteOpen(false)}
        onJump={jump}
        open={paletteOpen}
      />

      <div className="relative z-10 md:pl-56 lg:pl-64">{children}</div>
    </>
  );
}
