"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  pathWork,
  dashboards,
  dashboardRoles,
  moreBets,
  type WorkItem,
  type DashboardItem,
} from "@/data/work";
import { ProductDetail } from "./ProductDetail";

gsap.registerPlugin(ScrollTrigger);

/** Full diagonal — ends at bottom-right so the line never “dies” mid-scroll. */
const PATH_D =
  "M 70 60 C 200 140, 280 100, 400 200 S 560 340, 680 420 S 820 540, 940 740";

/** Six stops: 5 products + dashboards */
const DOT_POSITIONS = [
  { x: 120, y: 90 },
  { x: 280, y: 150 },
  { x: 420, y: 230 },
  { x: 580, y: 360 },
  { x: 740, y: 500 },
  { x: 900, y: 680 },
];

type Detail =
  | { kind: "product"; item: WorkItem }
  | { kind: "dashboard"; item: DashboardItem }
  | null;

function RoleChips({ roles, light }: { roles: string[]; light?: boolean }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {roles.map((r) => (
        <span
          key={r}
          className={`rounded-full px-2.5 py-1 text-[10px] tracking-[0.06em] ${
            light
              ? "bg-accent/12 font-semibold text-accent"
              : "border border-accent/25 bg-white/90 font-semibold text-foreground"
          }`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export function MyWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [showDashboards, setShowDashboards] = useState(false);
  const [detail, setDetail] = useState<Detail>(null);

  const chapters = pathWork;
  const totalSteps = chapters.length + 1;

  /** After first two chapters, park the card on the left so remaining path/dots stay visible. */
  const cardOnLeft = showDashboards || active >= 2;

  const progressLabel = useMemo(() => {
    if (showDashboards) return `6 / 6 · Dashboards`;
    return `${active + 1} / 6`;
  }, [active, showDashboards]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!section || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduce ? "0" : `${length}`;
    if (glow) {
      glow.style.strokeDasharray = `${length}`;
      glow.style.strokeDashoffset = reduce ? "0" : `${length}`;
    }

    if (reduce) {
      const id = requestAnimationFrame(() => {
        setActive(chapters.length - 1);
        setShowDashboards(true);
      });
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        onUpdate: (self) => {
          const p = self.progress;
          // Draw the full path through dashboards (never stop early)
          path.style.strokeDashoffset = `${length * (1 - p)}`;
          if (glow) glow.style.strokeDashoffset = `${length * (1 - p)}`;

          const productShare = 0.82;
          if (p >= productShare) {
            setShowDashboards(true);
            setActive(chapters.length - 1);
          } else {
            setShowDashboards(false);
            const idx = Math.min(
              chapters.length - 1,
              Math.floor((p / productShare) * chapters.length),
            );
            setActive(idx);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [chapters.length]);

  const current = chapters[active] ?? chapters[0];
  const activeDot = showDashboards ? 5 : active;

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="relative z-10"
        style={{ height: `${totalSteps * 105}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="absolute top-8 left-6 z-20 md:left-12">
            <p className="text-xs tracking-[0.3em] text-accent uppercase">
              My work
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-2 text-2xl text-foreground md:text-4xl">
              What I build & ship
            </h2>
            <p className="mt-2 text-xs tracking-[0.18em] text-muted uppercase">
              {progressLabel}
            </p>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-90 md:block"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1b6eff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3d8bff" stopOpacity="1" />
                <stop offset="100%" stopColor="#1b6eff" stopOpacity="0.75" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={glowRef}
              d={PATH_D}
              fill="none"
              stroke="#3d8bff"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.2"
              filter="url(#pathGlow)"
            />
            <path
              ref={pathRef}
              d={PATH_D}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {DOT_POSITIONS.map((pos, i) => {
              const lit = i <= activeDot;
              const currentDot = i === activeDot;
              return (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r={currentDot ? 8 : lit ? 5 : 4}
                  fill={
                    currentDot
                      ? "#1b6eff"
                      : lit
                        ? "rgba(27,110,255,0.55)"
                        : "rgba(27,110,255,0.22)"
                  }
                  style={{
                    filter: currentDot ? "url(#pathGlow)" : undefined,
                  }}
                />
              );
            })}
          </svg>

          <div
            className={`relative z-10 flex flex-1 items-center px-6 transition-[justify-content] duration-500 md:px-12 ${
              cardOnLeft
                ? "justify-center md:justify-start md:pl-[6%] lg:pl-[10%]"
                : "justify-center md:justify-end md:pr-[8%] lg:pr-[12%]"
            }`}
          >
            <AnimatePresence mode="wait">
              {!showDashboards && current && (
                <motion.button
                  key={current.id}
                  type="button"
                  onClick={() => setDetail({ kind: "product", item: current })}
                  className="w-full max-w-md cursor-pointer rounded-2xl border border-accent/25 bg-white/95 p-6 text-left shadow-[0_20px_60px_rgba(21,87,224,0.12)] backdrop-blur-md transition-shadow hover:border-accent/50 hover:shadow-[0_24px_70px_rgba(21,87,224,0.18)] md:p-8"
                  initial={{
                    opacity: 0,
                    x: cardOnLeft ? -24 : 24,
                    y: 12,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: 0,
                    x: cardOnLeft ? -16 : 16,
                    y: -10,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(27,110,255,0.7)]" />
                    <span className="text-[10px] tracking-[0.22em] text-accent uppercase">
                      {current.status}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] mt-4 text-3xl text-foreground md:text-4xl">
                    {current.name}
                  </h3>
                  {current.subtitle && (
                    <p className="mt-1 text-sm text-muted">{current.subtitle}</p>
                  )}
                  <RoleChips roles={current.roles} light />
                  <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/80">
                    {current.blurb}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
                    {current.result}
                  </p>
                  <p className="mt-6 text-[10px] tracking-[0.2em] text-accent uppercase">
                    Click for initiatives & stories →
                  </p>
                </motion.button>
              )}

              {showDashboards && (
                <motion.div
                  key="dashboards"
                  className="w-full max-w-2xl"
                  initial={{ opacity: 0, x: -20, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs tracking-[0.28em] text-accent uppercase">
                    Also
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] mt-2 text-3xl text-foreground md:text-5xl">
                    I build & maintain dashboards
                  </h3>
                  <RoleChips roles={dashboardRoles} light />
                  <p className="mt-3 max-w-lg text-sm font-medium text-foreground/80 md:text-base">
                    Org-wide AI usage, plus product analytics for what we ship —
                    including GLNow and GL Voice.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {dashboards.map((d, i) => (
                      <motion.button
                        key={d.id}
                        type="button"
                        onClick={() =>
                          setDetail({ kind: "dashboard", item: d })
                        }
                        className="rounded-2xl border border-accent/25 bg-white/95 p-5 text-left backdrop-blur-md transition-colors hover:border-accent/55"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.1, duration: 0.4 }}
                      >
                        <span className="text-[10px] tracking-[0.2em] text-accent uppercase">
                          Dashboard
                        </span>
                        <h4 className="font-[family-name:var(--font-display)] mt-2 text-xl text-foreground">
                          {d.name}
                        </h4>
                        <p className="mt-2 text-sm font-medium text-foreground/80">
                          {d.blurb}
                        </p>
                        <p className="mt-4 text-[10px] tracking-[0.18em] text-accent uppercase">
                          Open →
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:hidden">
            {DOT_POSITIONS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeDot ? "bg-accent" : i < activeDot ? "bg-accent/50" : "bg-accent/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetail
        detail={detail}
        onClose={() => setDetail(null)}
        moreBets={
          detail?.kind === "product" &&
          pathWork.some((p) => p.id === detail.item.id)
            ? moreBets
            : undefined
        }
        onOpenBet={(item) => setDetail({ kind: "product", item })}
      />
    </>
  );
}
