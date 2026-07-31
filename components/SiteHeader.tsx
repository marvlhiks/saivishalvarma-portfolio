"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/data/profile";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/experience", label: "Experience" },
];

/**
 * The header has to survive the crossing: dark type on ice above the
 * waterline, pale type once the page submerges.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isSurface = pathname === "/";
  const { scrollY } = useScroll();
  const [under, setUnder] = useState(!isSurface);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isSurface) return;
    const next = y > (typeof window === "undefined" ? 600 : window.innerHeight * 0.55);
    setUnder((prev) => (prev === next ? prev : next));
  });

  const submerged = isSurface ? under : true;
  const fg = submerged ? "text-sun" : "text-[#061620]";
  const dim = submerged ? "text-sun/60" : "text-[#3d5a6b]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        submerged
          ? "border-b border-glacier/10 bg-abyss/55 backdrop-blur-xl"
          : "border-b border-[#061620]/8 bg-white/45 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`t-display text-base tracking-tight transition-colors ${fg}`}
        >
          {profile.shortName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`t-rail transition-colors hover:text-glacier ${
                  active ? "text-glacier" : dim
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className={`t-rail rounded-full border px-4 py-2 transition-colors ${
              submerged
                ? "border-glacier/35 text-glacier hover:bg-glacier/12"
                : "border-[#061620]/20 text-[#061620] hover:bg-[#061620]/6"
            }`}
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className={`t-rail rounded-full border px-3.5 py-2 md:hidden ${
            submerged
              ? "border-glacier/30 text-glacier"
              : "border-[#061620]/20 text-[#061620]"
          }`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="site-menu"
          className={`md:hidden ${
            submerged
              ? "border-t border-glacier/10 bg-abyss/95"
              : "border-t border-[#061620]/8 bg-white/95"
          }`}
        >
          <ul className="flex flex-col px-5 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`t-rail block py-4 ${fg}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className={`t-rail block py-4 ${fg}`}
              >
                Résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
