import Link from "next/link";
import { contact, profile } from "@/data/profile";

/** The seabed. Every page ends here, in the dark, with a way to get in touch. */
export function SiteFooter() {
  return (
    <footer id="contact" className="relative z-10 border-t border-glacier/10">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="t-rail text-glacier/45">Seabed</p>

        <h2 className="t-display mt-6 max-w-[16ch] text-4xl text-sun md:text-6xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Based in {profile.location}. Open to conversations about AI product
          work, and to anything involving motorcycles.
        </p>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterLink label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <FooterLink label="LinkedIn" value="saivishalvarma" href={contact.linkedin} external />
          <FooterLink label="GitHub" value="marvlhiks" href={contact.github} external />
          <FooterLink label="Phone" value={contact.phone} href={contact.phoneHref} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-glacier/10 pt-8">
          <p className="t-rail text-glacier/30">
            {profile.shortName} · {new Date().getFullYear()}
          </p>
          <nav className="flex gap-7">
            <Link href="/portfolio" className="t-rail text-glacier/45 transition-colors hover:text-glacier">
              Portfolio
            </Link>
            <Link href="/experience" className="t-rail text-glacier/45 transition-colors hover:text-glacier">
              Experience
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="t-rail text-glacier/45 transition-colors hover:text-glacier"
            >
              Résumé
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="t-rail text-glacier/40">{label}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="mt-2.5 block text-[0.95rem] break-words text-sun/85 transition-colors hover:text-glacier"
      >
        {value}
      </a>
    </div>
  );
}
