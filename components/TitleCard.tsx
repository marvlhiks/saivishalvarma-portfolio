"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TitleCard() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 flex min-h-[calc(100svh-3.5rem)] flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 pb-20 md:px-12 lg:px-20">
        <motion.p
          className="mb-5 text-xs font-bold tracking-[0.32em] text-accent uppercase md:text-sm"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          AI products · Legal · Language services
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-display)] max-w-[12ch] text-5xl leading-[0.92] font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          Vishal Varma
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground/85 md:mt-8 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          I build AI products for legal and language services — and the
          dashboards that show what they actually do for the org.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.18em] text-accent uppercase"
          >
            See my work
            <motion.span
              aria-hidden
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>
          </a>
          <a
            href="/about"
            className="text-sm font-semibold tracking-[0.14em] text-foreground uppercase transition-colors hover:text-accent"
          >
            About me →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
