"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  /** Depth at the top of the page. Surface pages start at 0. */
  from?: number;
  /** Depth at the bottom of the page. */
  to?: number;
  /** Small label under the readout saying where you are. */
  label?: string;
};

const ticks = [0, 0.25, 0.5, 0.75, 1];

/**
 * A depth gauge pinned to the right edge, reading out metres as you scroll.
 * It makes the conceit literal and gives every page a sense of where it sits
 * in the column.
 */
export function DepthRail({ from = 0, to = 520, label }: Props) {
  const pathname = usePathname();
  const isSurface = pathname === "/";
  const { scrollY, scrollYProgress } = useScroll();
  const [metres, setMetres] = useState(from);
  const viewport = useRef(900);

  useEffect(() => {
    const measure = () => {
      viewport.current = window.innerHeight || 900;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Soft and slightly heavy, so the marker settles like something in water.
  const glide = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 24,
    restDelta: 0.0005,
  });
  const markerTop = useTransform(glide, [0, 1], ["0%", "100%"]);

  // A depth gauge is meaningless in open air, so on the surface page it only
  // appears once you have gone under.
  const surfaceFade = useTransform(scrollY, (y) => {
    const p = y / (viewport.current * 0.85);
    return Math.min(1, Math.max(0, (p - 0.45) / 0.4));
  });
  const opacity = isSurface ? surfaceFade : undefined;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round((from + (to - from) * p) / 5) * 5;
    setMetres((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed top-0 right-0 z-30 hidden h-full w-28 items-center justify-end pr-6 lg:flex"
    >
      <div className="relative h-[44vh] w-full">
        {/* The column, and how far down it you have come */}
        <div className="absolute top-0 right-14 h-full w-px bg-sun/15" />
        <motion.div
          className="absolute top-0 right-14 h-full w-px origin-top bg-glacier/80"
          style={{ scaleY: glide }}
        />

        {ticks.map((t) => (
          <span
            key={t}
            className="absolute right-14 block h-px w-2 bg-sun/25"
            style={{ top: `${t * 100}%` }}
          />
        ))}

        <motion.span
          className="absolute right-14 block h-2 w-2 translate-x-[3.5px] -translate-y-1/2 rounded-full bg-glacier shadow-[0_0_12px_3px_rgba(127,227,240,0.5)]"
          style={{ top: markerTop }}
        />

        <div className="absolute top-1/2 right-0 w-12 -translate-y-1/2 text-right">
          <div className="t-num text-2xl leading-none font-semibold text-sun">
            {metres}
            <span className="ml-0.5 text-[0.65rem] text-glacier/70">m</span>
          </div>
          {label && (
            <div className="t-rail mt-2.5 leading-[1.6] text-glacier/50">
              {label}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
