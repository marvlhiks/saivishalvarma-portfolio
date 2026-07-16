"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/#work", label: "Work", match: "work" },
  { href: "/#results", label: "Results", match: "results" },
  { href: "/about", label: "About", match: "about" },
  { href: "/#contact", label: "Contact", match: "contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onAbout = pathname === "/about";

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/8 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-tight text-foreground transition-colors hover:text-accent md:text-base"
          onClick={() => setOpen(false)}
        >
          Vishal Varma
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.match === "about" && onAbout;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : "text-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-foreground/15 px-3 py-1.5 text-xs font-bold tracking-wide text-foreground uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-foreground/8 bg-white px-5 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => {
              const active = l.match === "about" && onAbout;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                      active
                        ? "bg-accent text-white"
                        : "text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
