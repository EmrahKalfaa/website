"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/cn";
import type { VolunteerMedia } from "@/lib/volunteer";

type Props = {
  media: VolunteerMedia[];
  empty: string;
  gallery: string;
  prev: string;
  next: string;
};

export function VolunteerSlider({ media, empty, gallery, prev, next }: Props) {
  const locale = useLocale();
  const lang = locale === "tr" ? "tr" : "en";
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const count = media.length;
  const canNavigate = count > 1;
  const item = media[index];

  const go = useCallback(
    (direction: -1 | 1) => {
      if (!canNavigate) return;
      setIndex((current) => (current + direction + count) % count);
    },
    [canNavigate, count],
  );

  function onTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    startX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX.current;
    const delta = endX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? 1 : -1);
  }

  return (
    <div
      aria-label={gallery}
      aria-roledescription="carousel"
      className="border border-line"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
      tabIndex={canNavigate ? 0 : undefined}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden bg-canvas sm:aspect-[3/4]"
        onTouchEnd={item?.kind === "image" ? onTouchEnd : undefined}
        onTouchStart={item?.kind === "image" ? onTouchStart : undefined}
      >
        {item?.kind === "image" ? (
          <Image
            alt={item.alt[lang]}
            className="object-contain"
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 28rem, 100vw"
            src={item.src}
          />
        ) : item?.kind === "video" ? (
          <video
            aria-label={item.alt[lang]}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            src={item.src}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <p className="max-w-sm font-mono text-[12px] leading-relaxed tracking-[0.08em] text-faint">
              {empty}
            </p>
          </div>
        )}
      </div>

      {item ? (
        <div className="flex items-baseline justify-between gap-4 border-t border-line px-4 py-2.5">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            {item.caption[lang]}
          </p>
          <p className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-faint">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-line px-3 py-2">
        <button
          aria-label={prev}
          className="px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-ink disabled:text-faint/50 disabled:hover:text-faint/50"
          disabled={!canNavigate}
          onClick={() => go(-1)}
          type="button"
        >
          ←
        </button>

        <div className="flex items-center gap-1.5">
          {(count > 0 ? media : [null]).map((entry, i) => (
            <button
              key={entry?.src ?? "empty"}
              aria-current={i === index}
              aria-label={`${i + 1}`}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors",
                count === 0
                  ? "bg-line-strong"
                  : i === index
                    ? "bg-amber"
                    : "bg-line-strong hover:bg-muted",
              )}
              disabled={!canNavigate}
              onClick={() => setIndex(i)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label={next}
          className="px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-ink disabled:text-faint/50 disabled:hover:text-faint/50"
          disabled={!canNavigate}
          onClick={() => go(1)}
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
}
