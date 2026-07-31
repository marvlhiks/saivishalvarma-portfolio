import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "@/components/ProjectVisual";

/**
 * One project, one depth. The visual sits opposite the copy and alternates
 * side down the page so the descent has a rhythm.
 */
export function ProjectCard({
  project,
  flip,
}: {
  project: Project;
  flip?: boolean;
}) {
  return (
    <article className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : undefined}>
        <div className="flex items-center gap-3">
          <span className="t-num text-[0.7rem] text-glacier/60">
            {project.depth} m
          </span>
          <span className="h-px w-8 bg-glacier/25" />
          <span className="t-rail text-glacier/40">{project.kind}</span>
        </div>

        <h3 className="t-display mt-5 text-3xl text-sun md:text-5xl">
          <Link
            href={`/portfolio/${project.slug}`}
            className="transition-colors hover:text-glacier"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-x-9 gap-y-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="t-num text-2xl font-semibold text-sun">
                {m.value}
              </div>
              <div className="t-rail mt-1.5 text-glacier/40">{m.label}</div>
            </div>
          ))}
        </div>

        <Link
          href={`/portfolio/${project.slug}`}
          className="t-rail mt-9 inline-flex items-center gap-2.5 text-glacier transition-opacity hover:opacity-70"
        >
          Go deeper
          <span aria-hidden>↓</span>
        </Link>
      </div>

      <div className={flip ? "lg:order-1" : undefined}>
        <ProjectVisual visual={project.visual} />
      </div>
    </article>
  );
}
