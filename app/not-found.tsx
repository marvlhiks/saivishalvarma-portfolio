import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-32 md:px-8">
      <p className="t-rail text-glacier/45">Nothing at this depth</p>
      <h1 className="t-display mt-7 text-[clamp(2.6rem,9vw,6rem)] text-sun">
        404
      </h1>
      <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
        You have drifted past the edge of the shelf. There is no page here.
      </p>
      <div className="mt-12">
        <Link
          href="/"
          className="t-rail rounded-full bg-glacier px-6 py-3.5 text-abyss transition-opacity hover:opacity-85"
        >
          Back to the surface
        </Link>
      </div>
    </section>
  );
}
