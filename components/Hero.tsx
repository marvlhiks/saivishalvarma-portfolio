"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

/**
 * The tip. Deliberately close to empty: a name, a line, and an invitation to
 * go down. Everything else on the site is the other ninety percent.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // The tip sinks a little as you begin to descend.
  const lift = useTransform(scrollYProgress, [0, 0.14], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-svh flex-col justify-center px-5 pt-24 pb-32 md:px-8">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        style={reduce ? undefined : { y: lift, opacity: fade }}
      >
        <motion.p
          className="t-rail text-[#2c6f92]"
          {...rise(0)}
        >
          {profile.title}
        </motion.p>

        <motion.h1
          className="t-display mt-7 max-w-[11ch] text-[clamp(3.2rem,12vw,9.5rem)] text-[#061620]"
          {...rise(0.08)}
        >
          {profile.shortName}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-[#28485b] md:text-xl"
          {...rise(0.18)}
        >
          {profile.tagline}
        </motion.p>

        <motion.div className="mt-14 flex items-center gap-4" {...rise(0.32)}>
          <span className="t-rail text-[#3d5a6b]/70">Scroll to submerge</span>
          <motion.span
            aria-hidden
            className="text-[#2c6f92]"
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>

      {/* The waterline itself, sitting at the foot of the tip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="waterline-rule h-px w-full" />
      </div>
    </section>
  );
}
