"use client";

import { motion, useReducedMotion } from "framer-motion";
import { highlights } from "@/data/work";

export function ResultsStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      id="results"
      className="relative z-10 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-xs tracking-[0.3em] text-accent uppercase"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Success stories
        </motion.p>
        <motion.h2
          className="font-[family-name:var(--font-display)] mt-3 max-w-xl text-3xl text-foreground md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Two numbers that matter
        </motion.h2>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {highlights.map((h, i) => (
            <motion.li
              key={h.product}
              className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-white p-8 shadow-[0_16px_50px_rgba(21,87,224,0.12)] md:p-10"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.1 * i }}
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/10"
                aria-hidden
              />
              <p className="relative text-xs font-bold tracking-[0.25em] text-accent uppercase">
                {h.product}
              </p>
              <p className="font-[family-name:var(--font-display)] relative mt-4 text-5xl font-bold tracking-tight text-accent md:text-6xl lg:text-7xl">
                {h.value}
              </p>
              <p className="relative mt-3 text-lg font-semibold text-foreground md:text-xl">
                {h.detail}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
