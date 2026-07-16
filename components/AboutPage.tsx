"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  about,
  journey,
  education,
  experience,
  skillGroups,
  interests,
} from "@/data/about";
import { contact } from "@/data/work";
import { SiteNav } from "@/components/SiteNav";
import { LivingBackground } from "@/components/LivingBackground";

export function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <>
      <LivingBackground />
      <main className="relative z-10">
        <SiteNav />

        {/* Title */}
        <section className="px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12 lg:px-20">
          <motion.p
            className="text-xs tracking-[0.32em] text-accent uppercase"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>
          <motion.h1
            className="font-[family-name:var(--font-display)] mt-4 max-w-[14ch] text-4xl leading-[0.95] font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            {about.shortName}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-accent md:text-xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {about.title}
          </motion.p>
          <motion.p
            className="mt-2 text-sm tracking-[0.12em] text-muted uppercase"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Based in {about.location}
          </motion.p>
          <motion.p
            className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-foreground/85 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {about.focus}
          </motion.p>
          <motion.p
            className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-foreground md:text-base"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            {about.summary}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/Vishal_Varma_Resume_July_2026.pdf"
              download
              className="rounded-full bg-accent px-5 py-2.5 text-xs tracking-[0.18em] text-white uppercase transition-colors hover:bg-accent-neon"
            >
              Download résumé
            </a>
            <Link
              href="/#contact"
              className="rounded-full border border-accent/35 px-5 py-2.5 text-xs tracking-[0.18em] text-accent uppercase transition-colors hover:border-accent"
            >
              Contact
            </Link>
          </motion.div>
        </section>

        {/* Journey / places */}
        <section className="border-t border-accent/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <p className="text-xs tracking-[0.3em] text-accent uppercase">
            Where I&apos;ve been
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-foreground md:text-4xl">
            A path across cities
          </h2>
          <ol className="mt-12 space-y-0">
            {journey.map((j, i) => (
              <motion.li
                key={j.place}
                className="relative grid gap-2 border-l-2 border-accent/30 py-6 pl-8 md:grid-cols-[180px_1fr] md:gap-8"
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="absolute top-8 -left-[5px] h-2 w-2 rounded-full bg-accent" />
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg text-foreground">
                    {j.place}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.15em] text-muted uppercase">
                    {j.years}
                  </p>
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground/80 md:pt-1">
                  {j.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Education — Masters focus */}
        <section className="border-t border-accent/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <p className="text-xs tracking-[0.3em] text-accent uppercase">
            Education
          </p>
          <motion.div
            className="mt-8 max-w-2xl rounded-2xl border-2 border-accent/25 bg-white/85 p-8 shadow-[0_16px_50px_rgba(27,110,255,0.1)] backdrop-blur-sm md:p-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs tracking-[0.2em] text-accent uppercase">
              Master&apos;s
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl text-foreground md:text-3xl">
              {education.degree}
            </h2>
            <p className="mt-2 text-base text-foreground/90">
              {education.school}
            </p>
            <p className="mt-1 text-sm text-muted">
              {education.place} · {education.years}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {education.note}
            </p>
          </motion.div>
        </section>

        {/* Experience */}
        <section className="border-t border-accent/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <p className="text-xs tracking-[0.3em] text-accent uppercase">
            Experience
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-foreground md:text-4xl">
            What I&apos;ve done
          </h2>

          <ul className="mt-12 space-y-10">
            {experience.map((job, i) => (
              <motion.li
                key={job.company + job.dates}
                className="grid gap-4 border-t border-accent/15 pt-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.2) }}
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl text-foreground">
                    {job.company}
                  </p>
                  <p className="mt-1 text-sm text-accent">{job.role}</p>
                  <p className="mt-2 text-xs tracking-[0.12em] text-muted uppercase">
                    {job.dates}
                  </p>
                  <p className="mt-1 text-xs text-muted">{job.place}</p>
                </div>
                <ul className="space-y-2.5">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="border-l-2 border-accent/30 pl-3 text-sm font-medium leading-relaxed text-foreground/80"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="border-t border-accent/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <p className="text-xs tracking-[0.3em] text-accent uppercase">
            Skills
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-foreground md:text-4xl">
            How I work
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {skillGroups.map((g, i) => (
              <motion.li
                key={g.label}
                className="rounded-2xl border border-accent/25 bg-white p-6"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <p className="text-xs tracking-[0.2em] text-accent uppercase">
                  {g.label}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/80">
                  {g.items}
                </p>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Interests */}
        <section className="border-t border-accent/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <p className="text-xs tracking-[0.3em] text-accent uppercase">
            Off the clock
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-foreground md:text-4xl">
            Interests
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-accent/25 bg-white/80 px-4 py-2 text-sm text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Close CTA */}
        <section className="border-t border-accent/15 px-6 py-20 md:px-12 md:py-24 lg:px-20">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-foreground md:text-4xl">
            Want to go deeper?
          </h2>
          <p className="mt-3 max-w-lg text-muted">
            See the products I ship, or reach out directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-5 py-2.5 text-xs tracking-[0.18em] text-white uppercase transition-colors hover:bg-accent-neon"
            >
              My work
            </Link>
            <a
              href={`mailto:${contact.email}?subject=Hello%20from%20your%20portfolio`}
              className="rounded-full border border-accent/35 px-5 py-2.5 text-xs tracking-[0.18em] text-accent uppercase transition-colors hover:border-accent"
            >
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/35 px-5 py-2.5 text-xs tracking-[0.18em] text-accent uppercase transition-colors hover:border-accent"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-16 text-center text-xs tracking-[0.2em] text-muted/70 uppercase">
            {about.shortName} · {about.location}
          </p>
        </section>
      </main>
    </>
  );
}
