"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/work";

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}?subject=Hello%20from%20your%20portfolio`,
    hint: "Best for intros and opportunities",
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "saivishalvarma",
    href: contact.linkedin,
    hint: "Work history and network",
    primary: false,
  },
  {
    label: "Phone",
    value: contact.phone,
    href: contact.phoneHref,
    hint: "Spain · call / WhatsApp",
    primary: false,
  },
];

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative z-10 border-t border-accent/15 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-xs tracking-[0.3em] text-accent uppercase"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.p>
        <motion.h2
          className="font-[family-name:var(--font-display)] mt-3 text-3xl text-foreground md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Let&apos;s talk
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl font-medium text-foreground/80"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Open to product conversations, AI / language / legal workflows, and
          sharp questions about what I ship.
        </motion.p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {channels.map((ch, i) => (
            <motion.li
              key={ch.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <a
                href={ch.href}
                {...(ch.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`block h-full rounded-2xl border p-5 transition-colors ${
                  ch.primary
                    ? "border-accent bg-accent text-white hover:bg-accent-neon"
                    : "border-accent/30 bg-white text-foreground hover:border-accent/70"
                }`}
              >
                <span
                  className={`text-[10px] tracking-[0.22em] uppercase ${
                    ch.primary ? "text-white/80" : "text-accent"
                  }`}
                >
                  {ch.label}
                </span>
                <p
                  className={`font-[family-name:var(--font-display)] mt-3 text-lg font-semibold break-all ${
                    ch.primary ? "text-white" : "text-foreground"
                  }`}
                >
                  {ch.value}
                </p>
                <p
                  className={`mt-2 text-xs font-medium ${
                    ch.primary ? "text-white/85" : "text-muted"
                  }`}
                >
                  {ch.hint}
                </p>
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-16 text-center text-xs tracking-[0.2em] text-muted/70 uppercase">
          Vishal Varma · 2026
        </p>
      </div>
    </section>
  );
}
