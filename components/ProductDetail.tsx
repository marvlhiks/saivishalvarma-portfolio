"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WorkItem, DashboardItem } from "@/data/work";
import { dashboardRoles } from "@/data/work";

type Detail =
  | { kind: "product"; item: WorkItem }
  | { kind: "dashboard"; item: DashboardItem }
  | null;

type Props = {
  detail: Detail;
  onClose: () => void;
  moreBets?: WorkItem[];
  onOpenBet?: (item: WorkItem) => void;
};

export function ProductDetail({ detail, onClose, moreBets, onOpenBet }: Props) {
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [detail, onClose]);

  return (
    <AnimatePresence>
      {detail && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#0b1220]/45 backdrop-blur-sm"
            aria-label="Close detail"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="detail-title"
            className="relative z-10 max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-2xl border border-accent/20 bg-white p-6 shadow-2xl shadow-accent/15 md:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
            >
              Close
            </button>

            {detail.kind === "product" ? (
              <>
                <p className="text-[10px] tracking-[0.22em] text-accent uppercase">
                  {detail.item.status}
                </p>
                <h2
                  id="detail-title"
                  className="font-[family-name:var(--font-display)] mt-2 text-3xl text-foreground"
                >
                  {detail.item.name}
                </h2>
                {detail.item.subtitle && (
                  <p className="mt-1 text-sm text-muted">{detail.item.subtitle}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {detail.item.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] text-accent"
                    >
                      {r}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {detail.item.blurb}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                  {detail.item.result}
                </p>

                <h3 className="mt-8 text-xs tracking-[0.2em] text-accent uppercase">
                  Success stories
                </h3>
                <ul className="mt-3 space-y-2">
                  {detail.item.stories.map((s) => (
                    <li
                      key={s}
                      className="border-l-2 border-accent/40 pl-3 text-sm text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-xs tracking-[0.2em] text-accent uppercase">
                  Initiatives
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {detail.item.initiatives.map((ini) => (
                    <li
                      key={ini}
                      className="rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs text-foreground"
                    >
                      {ini}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-[10px] tracking-[0.22em] text-accent uppercase">
                  Dashboards
                </p>
                <h2
                  id="detail-title"
                  className="font-[family-name:var(--font-display)] mt-2 text-3xl text-foreground"
                >
                  {detail.item.name}
                </h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dashboardRoles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] text-accent"
                    >
                      {r}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {detail.item.blurb}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                  {detail.item.result}
                </p>
                <h3 className="mt-8 text-xs tracking-[0.2em] text-accent uppercase">
                  What this covers
                </h3>
                <ul className="mt-3 space-y-2">
                  {detail.item.stories.map((s) => (
                    <li
                      key={s}
                      className="border-l-2 border-accent/40 pl-3 text-sm text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {moreBets && moreBets.length > 0 && onOpenBet && (
              <div className="mt-10 border-t border-accent/15 pt-6">
                <p className="text-xs tracking-[0.2em] text-muted uppercase">
                  Also exploring
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {moreBets.map((bet) => (
                    <button
                      key={bet.id}
                      type="button"
                      onClick={() => onOpenBet(bet)}
                      className="rounded-full border border-accent/30 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      {bet.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
