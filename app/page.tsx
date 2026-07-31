import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { DepthRail } from "@/components/DepthRail";
import { profile, journey } from "@/data/profile";
import { projects, seabed } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <DepthRail from={0} to={seabed} label="Surface" />

      <Hero />

      {/* Just under the surface: what this site actually is */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="t-rail text-glacier/45">Below the waterline</p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="t-display mt-8 max-w-[18ch] text-3xl leading-[1.1] text-sun md:text-5xl">
            Ten percent of a product is the demo.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {profile.below}
          </p>
        </Reveal>
      </section>

      {/* About me */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
          <Reveal>
            <p className="t-rail text-glacier/45">Who you are talking to</p>
            <div className="mt-8 space-y-5">
              <Fact label="Name" value={profile.name} />
              <Fact label="Role" value={profile.title} />
              <Fact label="Based in" value={profile.location} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-sun/85 md:text-xl">
              {profile.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="t-rail rounded-full bg-glacier px-6 py-3.5 text-abyss transition-opacity hover:opacity-85"
              >
                See the portfolio
              </Link>
              <Link
                href="/experience"
                className="t-rail rounded-full border border-glacier/30 px-6 py-3.5 text-glacier transition-colors hover:bg-glacier/10"
              >
                Where I come from
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where I come from, in brief */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <p className="t-rail text-glacier/45">Three cities</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {journey.map((leg, i) => (
            <Reveal key={leg.place} delay={i * 0.08}>
              <div className="pane-submerged edge-lit h-full rounded-xl p-6">
                <p className="t-num text-[0.7rem] text-glacier/60">{leg.years}</p>
                <h3 className="t-display mt-3 text-xl text-sun">{leg.place}</h3>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted">
                  {leg.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The portfolio, as a descent */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pb-40">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-glacier/12 pb-8">
            <div>
              <p className="t-rail text-glacier/45">The portfolio</p>
              <h2 className="t-display mt-5 text-4xl text-sun md:text-6xl">
                Six things worth showing
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="t-rail text-glacier transition-opacity hover:opacity-70"
            >
              All of it ↓
            </Link>
          </div>
        </Reveal>

        <ol className="mt-12 divide-y divide-glacier/10">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6 transition-colors hover:bg-glacier/[0.03]"
                >
                  <span className="t-num w-14 shrink-0 text-[0.72rem] text-glacier/50">
                    {p.depth} m
                  </span>
                  <span className="t-display min-w-0 flex-1 text-2xl text-sun transition-colors group-hover:text-glacier md:text-3xl">
                    {p.name}
                  </span>
                  <span className="t-rail text-glacier/40">{p.kind}</span>
                  <span
                    aria-hidden
                    className="text-glacier/50 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-glacier/20 pl-4">
      <p className="t-rail text-glacier/40">{label}</p>
      <p className="mt-1.5 text-[0.95rem] text-sun/85">{value}</p>
    </div>
  );
}
