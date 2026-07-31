import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DepthRail } from "@/components/DepthRail";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, alsoShipped, seabed } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "AI products for legal and language services, the dashboards behind them, and the things built purely for myself.",
};

export default function PortfolioPage() {
  const work = projects.filter((p) => p.strand === "work");
  const personal = projects.filter((p) => p.strand === "personal");

  return (
    <>
      <DepthRail from={40} to={seabed} label="Portfolio" />

      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-8 md:pt-48">
        <Reveal>
          <p className="t-rail text-glacier/45">Portfolio</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="t-display mt-7 max-w-[14ch] text-[clamp(2.6rem,8vw,6.5rem)] text-sun">
            The mass below
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Shipping products first, nearest the surface where everyone can see
            them. Further down, the things I built for myself because nobody
            else was going to.
          </p>
        </Reveal>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-5 border-t border-glacier/15 pt-8">
            <h2 className="t-rail text-glacier">Work</h2>
            <span className="t-num text-[0.68rem] text-glacier/35">
              40 m to 260 m
            </span>
          </div>
        </Reveal>

        <div className="mt-16 space-y-28 md:space-y-40">
          {work.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className="mx-auto mt-32 max-w-6xl px-5 md:mt-48 md:px-8">
        <Reveal>
          <div className="flex items-center gap-5 border-t border-glacier/15 pt-8">
            <h2 className="t-rail text-glacier">Built for myself</h2>
            <span className="t-num text-[0.68rem] text-glacier/35">
              380 m to 460 m
            </span>
          </div>
        </Reveal>

        <div className="mt-16 space-y-28 md:space-y-40">
          {personal.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Everything else */}
      <section className="mx-auto mt-32 max-w-6xl px-5 pb-28 md:mt-48 md:px-8 md:pb-40">
        <Reveal>
          <div className="border-t border-glacier/15 pt-8">
            <h2 className="t-rail text-glacier">Also shipped</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {alsoShipped.map((item, i) => (
            <Reveal key={item.name} delay={Math.min(i * 0.06, 0.2)}>
              <div className="pane-submerged edge-lit h-full rounded-xl p-6 md:p-7">
                <p className="t-rail text-glacier/40">{item.kind}</p>
                <h3 className="t-display mt-3.5 text-2xl text-sun">
                  {item.name}
                </h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
