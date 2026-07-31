import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { DepthRail } from "@/components/DepthRail";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects, getProject, adjacent, seabed } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Next 16: params arrives as a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { up, down } = adjacent(slug);

  return (
    <>
      <DepthRail from={project.depth} to={seabed} label={project.name} />

      <article className="mx-auto max-w-6xl px-5 pt-36 md:px-8 md:pt-48">
        <Reveal>
          <Link
            href="/portfolio"
            className="t-rail text-glacier/50 transition-colors hover:text-glacier"
          >
            ↑ Back to the surface
          </Link>
        </Reveal>

        <header className="mt-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="t-num text-[0.72rem] text-glacier/60">
                {project.depth} m
              </span>
              <span className="h-px w-8 bg-glacier/25" />
              <span className="t-rail text-glacier/40">{project.kind}</span>
              <span className="t-rail rounded-full border border-glacier/25 px-3 py-1 text-glacier/70">
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="t-display mt-7 text-[clamp(2.6rem,8vw,6rem)] text-sun">
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sun/80 md:text-xl">
              {project.summary}
            </p>
          </Reveal>
        </header>

        {/* Metrics */}
        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-8 border-y border-glacier/12 py-9 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="t-num text-3xl font-semibold text-glacier md:text-4xl">
                  {m.value}
                </div>
                <div className="t-rail mt-2.5 text-glacier/45">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Body and visual */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-base leading-[1.75] text-muted md:text-lg">
                {project.detail}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="t-rail mt-14 text-glacier/50">Detail</h2>
              <ul className="mt-6 space-y-4">
                {project.notes.map((note) => (
                  <li key={note} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-glacier/60"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-muted">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-10">
            <Reveal delay={0.1}>
              <ProjectVisual visual={project.visual} />
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <h2 className="t-rail text-glacier/50">My role</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-glacier/20 px-3.5 py-1.5 text-[0.78rem] text-sun/75"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="t-rail text-glacier/50">Built with</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="t-num rounded-md bg-sun/[0.06] px-2.5 py-1.5 text-[0.72rem] text-sun/65"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {project.repo && (
              <Reveal delay={0.24}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="t-rail inline-flex items-center gap-2.5 text-glacier transition-opacity hover:opacity-70"
                >
                  View the repo <span aria-hidden>↗</span>
                </a>
              </Reveal>
            )}
          </div>
        </div>

        {/* Keep descending */}
        <nav className="mt-28 grid gap-4 border-t border-glacier/12 pt-10 sm:grid-cols-2 md:mt-40">
          {up ? (
            <Link
              href={`/portfolio/${up.slug}`}
              className="group rounded-xl border border-glacier/12 p-6 transition-colors hover:border-glacier/30"
            >
              <p className="t-rail text-glacier/40">↑ Shallower · {up.depth} m</p>
              <p className="t-display mt-3 text-xl text-sun transition-colors group-hover:text-glacier">
                {up.name}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {down && (
            <Link
              href={`/portfolio/${down.slug}`}
              className="group rounded-xl border border-glacier/12 p-6 text-right transition-colors hover:border-glacier/30 sm:col-start-2"
            >
              <p className="t-rail text-glacier/40">
                ↓ Deeper · {down.depth} m
              </p>
              <p className="t-display mt-3 text-xl text-sun transition-colors group-hover:text-glacier">
                {down.name}
              </p>
            </Link>
          )}
        </nav>
      </article>

      <div className="h-28 md:h-40" />
    </>
  );
}
