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
 * A solid slab, inverted against whatever is behind it: near-black over the
 * pink sky, ice over the deep water. The earlier translucent version sat
 * halfway between blending and standing apart, and read as neither.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isSurface = pathname === "/";
  const { scrollY } = useScroll();
  const [under, setUnder] = useState(!isSurface);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isSurface) return;
    const next =
      y > (typeof window === "undefined" ? 600 : window.innerHeight * 0.55);
    setUnder((prev) => (prev === next ? prev : next));
  });

  const submerged = isSurface ? under : true;

  const slab = submerged ? "bg-[#e9f5fa]" : "bg-[#171018]";
  const fg = submerged ? "text-[#06212f]" : "text-[#fdf2ee]";
  const dim = submerged ? "text-[#06212f]/55" : "text-[#fdf2ee]/60";
  const hot = submerged ? "text-[#0a5c7d]" : "text-[#f7b8cd]";
  const pill = submerged
    ? "bg-[#06212f] text-[#e9f5fa] hover:bg-[#0a3346]"
    : "bg-[#f7b8cd] text-[#2b0f1c] hover:bg-[#fbd0dc]";
  const rule = submerged ? "divide-[#06212f]/10" : "divide-[#fdf2ee]/12";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${slab}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`t-display text-base tracking-tight ${fg}`}
        >
          {profile.shortName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const on = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`t-rail ${on ? hot : dim}`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className={`t-rail rounded-full px-5 py-2.5 ${pill}`}
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className={`t-rail rounded-full px-4 py-2.5 md:hidden ${pill}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="site-menu" className={`md:hidden ${slab}`}>
          <ul className={`flex flex-col divide-y px-5 pb-3 ${rule}`}>
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
