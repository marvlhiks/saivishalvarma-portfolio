import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DepthRail } from "@/components/DepthRail";
import { OffTheClock } from "@/components/OffTheClock";
import { getPhotos, getOverrides } from "@/lib/media";
import {
  profile,
  journey,
  experience,
  education,
  skillGroups,
} from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Data and quality in Hyderabad, analytics in France, AI product management in Barcelona.",
};

export default function ExperiencePage() {
  return (
    <>
      <DepthRail from={60} to={500} label="Experience" />

      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-8 md:pt-48">
        <Reveal>
          <p className="t-rail text-glacier/45">Where I come from</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="t-display mt-7 max-w-[13ch] text-[clamp(2.6rem,8vw,6.5rem)] text-sun">
            Product, by way of data
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            I did not arrive at product management through design or through
            engineering. I came in through data: making numbers trustworthy,
            then making them useful, then owning the product that produced them.
            The analytics did not stay the job, but it never stopped being an
            advantage.
          </p>
        </Reveal>
      </section>

      {/* The three cities */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <h2 className="t-rail border-t border-glacier/15 pt-8 text-glacier">
            The route
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {journey.map((leg, i) => (
            <Reveal key={leg.place} delay={i * 0.08}>
              <div className="pane-submerged edge-lit h-full rounded-xl p-6 md:p-7">
                <p className="t-num text-[0.7rem] text-glacier/60">
                  {leg.years}
                </p>
                <h3 className="t-display mt-3.5 text-xl text-sun">
                  {leg.place}
                </h3>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
                  {leg.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <h2 className="t-rail border-t border-glacier/15 pt-8 text-glacier">
            Roles
          </h2>
        </Reveal>

        <div className="mt-12 space-y-14">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={Math.min(i * 0.06, 0.2)}>
              <div className="grid gap-6 border-b border-glacier/10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                <div>
                  <h3 className="t-display text-2xl text-sun md:text-3xl">
                    {role.company}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] text-glacier/70">
                    {role.role}
                  </p>
                  <p className="t-num mt-3 text-[0.7rem] text-sun/35">
                    {role.dates}
                  </p>
                  <p className="t-num mt-1 text-[0.7rem] text-sun/35">
                    {role.place}
                  </p>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-sun/80">
                    {role.summary}
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-glacier/60"
                        />
                        <span className="text-[0.93rem] leading-relaxed text-muted">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <h2 className="t-rail border-t border-glacier/15 pt-8 text-glacier">
            Education
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 max-w-2xl">
            <h3 className="t-display text-2xl text-sun md:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-3 text-[0.95rem] text-glacier/70">
              {education.school}, {education.place}
            </p>
            <p className="t-num mt-2.5 text-[0.7rem] text-sun/35">
              {education.years}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {education.note}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-36">
        <Reveal>
          <h2 className="t-rail border-t border-glacier/15 pt-8 text-glacier">
            What I work with
          </h2>
        </Reveal>

        <div className="mt-12 space-y-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={Math.min(i * 0.07, 0.2)}>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16">
                <h3 className="t-rail pt-1 text-glacier/60">{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-glacier/15 bg-sun/[0.03] px-3.5 py-1.5 text-[0.82rem] text-sun/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Off the clock */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-8 md:pb-40">
        <Reveal>
          <h2 className="t-rail border-t border-glacier/15 pt-8 text-glacier">
            Off the clock
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10">
            <OffTheClock
              photos={getPhotos()}
              gamingArt={getOverrides("gaming")}
              animeArt={getOverrides("anime")}
            />
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="t-rail mt-16 inline-flex items-center gap-2.5 rounded-full border border-glacier/30 px-6 py-3.5 text-glacier transition-colors hover:bg-glacier/10"
          >
            Download the résumé <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </section>
    </>
  );
}
