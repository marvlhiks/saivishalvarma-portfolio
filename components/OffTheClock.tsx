"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { games, anime, quietInterests } from "@/data/interests";
import { InterestArt, type ArtKey } from "@/components/InterestArt";
import type { MediaFile } from "@/lib/media";

type Tab = "photography" | "gaming" | "anime";

/** One tile, whether it is a photograph or a drawn cover. */
type Item = {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  /** A real image, when one exists. */
  src?: string;
  /** Original artwork, used when there is no image. */
  art?: ArtKey;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "photography", label: "Photography" },
  { id: "gaming", label: "Gaming" },
  { id: "anime", label: "Anime" },
];

export function OffTheClock({
  photos,
  gamingArt,
  animeArt,
}: {
  photos: MediaFile[];
  /** Filename-keyed overrides, so a real cover can replace the drawn one. */
  gamingArt: Record<string, string>;
  animeArt: Record<string, string>;
}) {
  const [active, setActive] = useState<Tab>("photography");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const panelId = useId();

  const photoItems: Item[] = photos.map((p) => ({
    id: p.src,
    title: p.caption,
    src: p.src,
  }));

  const gameItems: Item[] = games.map((g) => ({
    id: g.key,
    title: g.title,
    subtitle: g.subtitle,
    note: g.note,
    src: gamingArt[g.key],
    art: g.key,
  }));

  const animeItems: Item[] = anime.map((a) => ({
    id: a.key,
    title: a.title,
    subtitle: a.subtitle,
    note: a.note,
    src: animeArt[a.key],
    art: a.key,
  }));

  const items =
    active === "photography"
      ? photoItems
      : active === "gaming"
        ? gameItems
        : animeItems;

  const select = (tab: Tab) => {
    setActive(tab);
    setOpen(null);
  };

  return (
    <div>
      <div role="tablist" aria-label="Off the clock" className="flex flex-wrap gap-3">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${panelId}-${t.id}`}
              onClick={() => select(t.id)}
              className={`t-rail rounded-full border px-5 py-3 ${
                selected
                  ? "border-glacier bg-glacier/15 text-glacier"
                  : "border-glacier/20 text-sun/55 hover:border-glacier/45 hover:text-sun"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/*
        Keyed on the tab so React remounts and the panel fades in. Deliberately
        no exit animation: AnimatePresence in wait mode can deadlock here and
        strand the outgoing panel on screen, and a fade in is all this needs.

        The reserved height matters as much: Gaming used to be far taller than
        the others, so switching tabs changed the page height and pulled the
        footer up into view.
      */}
      <div className="mt-10 min-h-[18rem] sm:min-h-[33rem]">
        <motion.div
          key={active}
          id={`${panelId}-${active}`}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {active === "photography" && photos.length === 0 ? (
            <EmptyGallery />
          ) : (
            <Grid
              items={items}
              onOpen={setOpen}
              showTitles={active !== "photography"}
              wide={active === "anime"}
            />
          )}
        </motion.div>
      </div>

      <p className="mt-12 text-[0.9rem] text-muted">
        Also: {quietInterests.join(", ").toLowerCase()}.
      </p>

      {open !== null && items[open] && (
        <Viewer
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </div>
  );
}

/* ── Grid ───────────────────────────────────────────────────────────────── */

function Grid({
  items,
  onOpen,
  showTitles,
  wide,
}: {
  items: Item[];
  onOpen: (i: number) => void;
  showTitles: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`grid max-w-3xl gap-4 ${wide ? "" : "grid-cols-2"}`}
    >
      {items.slice(0, 8).map((item, i) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Open ${item.title}`}
          // Covers and key art are 16:9; these photographs are 3:2.
          className={`group relative overflow-hidden rounded-xl border border-glacier/12 text-left ${
            showTitles ? "aspect-video" : "aspect-3/2"
          }`}
        >
          <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            {item.src ? (
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 384px"
                className="object-cover"
              />
            ) : (
              item.art && <InterestArt art={item.art} />
            )}
          </span>

          {showTitles ? (
            <>
              <span className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3.5">
                <span className="block text-[0.82rem] leading-tight font-medium text-sun">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="t-num mt-1.5 block text-[0.6rem] text-glacier/60">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </>
          ) : (
            <span className="absolute inset-0 bg-abyss/25 transition-opacity duration-500 group-hover:opacity-0" />
          )}
        </button>
      ))}
    </div>
  );
}

function EmptyGallery() {
  return (
    <div>
      <div className="grid max-w-3xl grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="pane-submerged shimmer aspect-3/2 rounded-xl"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>
      <p className="mt-5 max-w-lg text-[0.9rem] leading-relaxed text-muted">
        A camera goes most places I do. Prints going up here shortly.
      </p>
    </div>
  );
}

/* ── Viewer ─────────────────────────────────────────────────────────────── */

function Viewer({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const item = items[index];

  const step = useCallback(
    (delta: number) => onIndex((index + delta + items.length) % items.length),
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the overlay.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, step]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-void/92 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-8">
        <span className="t-num text-[0.7rem] text-glacier/60">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="t-rail rounded-full border border-glacier/30 px-4 py-2 text-glacier hover:bg-glacier/10"
        >
          Close
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {item.src ? (
          <Image
            key={item.src}
            src={item.src}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-contain p-2"
            priority
          />
        ) : (
          item.art && (
            <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-glacier/15">
              <InterestArt art={item.art} />
            </div>
          )
        )}
      </div>

      <div
        className="px-5 py-6 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-baseline justify-between gap-6">
            <div className="min-w-0">
              <p className="t-display truncate text-xl text-sun md:text-2xl">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="t-num mt-2 text-[0.65rem] text-glacier/55">
                  {item.subtitle}
                </p>
              )}
            </div>
            {items.length > 1 && (
              <div className="flex shrink-0 gap-5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous"
                  className="t-rail text-glacier/70 hover:text-glacier"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next"
                  className="t-rail text-glacier/70 hover:text-glacier"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
          {item.note && (
            <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-muted">
              {item.note}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
