import Image from "next/image";
import type { Visual } from "@/data/portfolio";

/**
 * Each project gets its own small piece of interface rather than a stock
 * screenshot: the shape of what the thing actually does, drawn in the site's
 * own material. Nothing here carries real customer data.
 */
export function ProjectVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case "scoreband":
      return <ScoreBand />;
    case "waveform":
      return <Waveform />;
    case "pipeline":
      return <Pipeline />;
    case "chart":
      return <SpendChart />;
    case "phone":
      return <PhoneFrame />;
    case "gauge":
      return <PriceGauge />;
  }
}

/* ── ReefML ─────────────────────────────────────────────────────────────── */

/** A review queue: documents ranked by relevance, cut by a responsiveness threshold. */
const queue = [
  { id: "DOC-04812", score: 0.97 },
  { id: "DOC-01199", score: 0.94 },
  { id: "DOC-07340", score: 0.88 },
  { id: "DOC-02615", score: 0.71 },
  { id: "DOC-09004", score: 0.34 },
  { id: "DOC-05527", score: 0.12 },
];

function ScoreBand() {
  return (
    <Frame label="Ranked review queue">
      <div className="space-y-2">
        {queue.map((d) => {
          const responsive = d.score >= 0.5;
          return (
            <div key={d.id} className="flex items-center gap-3">
              <span className="t-num w-[4.7rem] shrink-0 text-[0.6rem] text-sun/40">
                {d.id}
              </span>
              <div className="relative h-[7px] flex-1 overflow-hidden rounded-full bg-sun/8">
                <div
                  className={`h-full rounded-full ${
                    responsive ? "bg-glacier" : "bg-sun/25"
                  }`}
                  style={{ width: `${d.score * 100}%` }}
                />
              </div>
              <span
                className={`t-num w-9 shrink-0 text-right text-[0.65rem] ${
                  responsive ? "text-glacier" : "text-sun/35"
                }`}
              >
                {d.score.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-glacier/10 pt-3">
        <Legend swatch="bg-glacier" text="Responsive" />
        <Legend swatch="bg-sun/25" text="Non responsive" />
      </div>
    </Frame>
  );
}

/* ── GLTranscribe ───────────────────────────────────────────────────────── */

/** A fixed waveform so the render is deterministic between server and client. */
const wave = [
  12, 26, 44, 31, 58, 72, 49, 66, 88, 61, 40, 55, 78, 92, 70, 46, 33, 51, 67,
  84, 59, 38, 27, 45, 62, 80, 54, 36, 22, 41, 58, 73, 48, 30, 19, 35,
];

function Waveform() {
  return (
    <Frame label="Speech to text">
      <div className="flex h-24 items-center gap-[3px]">
        {wave.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-full ${
              i < 22 ? "bg-glacier/75" : "bg-sun/15"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-5 space-y-2 border-t border-glacier/10 pt-4">
        <TranscriptLine time="00:04" text="the agreement was signed in March," />
        <TranscriptLine time="00:07" text="and the amendment followed that summer." />
        <TranscriptLine time="00:11" text="both parties confirmed receipt." dim />
      </div>
    </Frame>
  );
}

function TranscriptLine({
  time,
  text,
  dim,
}: {
  time: string;
  text: string;
  dim?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="t-num shrink-0 text-[0.6rem] text-glacier/50">{time}</span>
      <span className={`text-[0.78rem] leading-snug ${dim ? "text-sun/30" : "text-sun/70"}`}>
        {text}
      </span>
    </div>
  );
}

/* ── MTHub ──────────────────────────────────────────────────────────────── */

const jobs = [
  { name: "Batch evaluation", count: "1,240 segments", state: "Running" },
  { name: "Glossary sync", count: "18 glossaries", state: "Done" },
  { name: "Engine setup", count: "DE to EN", state: "Queued" },
];

function Pipeline() {
  return (
    <Frame label="Bulk operations">
      <div className="space-y-2.5">
        {jobs.map((j) => (
          <div
            key={j.name}
            className="flex items-center justify-between gap-3 rounded-lg border border-glacier/10 bg-sun/[0.03] px-3.5 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[0.82rem] text-sun/85">{j.name}</p>
              <p className="t-num mt-1 text-[0.62rem] text-sun/35">{j.count}</p>
            </div>
            <span
              className={`t-rail shrink-0 rounded-full px-2.5 py-1 text-[0.55rem] ${
                j.state === "Running"
                  ? "bg-glacier/15 text-glacier"
                  : j.state === "Done"
                    ? "bg-sun/10 text-sun/55"
                    : "bg-sun/5 text-sun/35"
              }`}
            >
              {j.state}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── AI Dashboards ──────────────────────────────────────────────────────── */

const providers = [
  { name: "OpenAI", pct: 100 },
  { name: "Anthropic", pct: 78 },
  { name: "Azure", pct: 54 },
  { name: "AWS", pct: 37 },
  { name: "Cursor", pct: 22 },
  { name: "DeepL", pct: 14 },
  { name: "ElevenLabs", pct: 9 },
];

function SpendChart() {
  return (
    <Frame label="AI spend by provider">
      {/*
        Bars are direct children of the fixed-height row so their percentage
        heights have something definite to resolve against.
      */}
      <div className="flex h-28 items-end gap-2">
        {providers.map((p, i) => (
          <div
            key={p.name}
            className="flex-1 rounded-t-[3px]"
            style={{
              height: `${p.pct}%`,
              background: `linear-gradient(180deg, rgba(127,227,240,${0.9 - i * 0.09}), rgba(53,168,216,${0.4 - i * 0.04}))`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2 border-t border-glacier/10 pt-3">
        {providers.map((p) => (
          <span
            key={p.name}
            className="flex-1 truncate text-center text-[0.52rem] tracking-wide text-sun/35 uppercase"
          >
            {p.name}
          </span>
        ))}
      </div>
    </Frame>
  );
}

/* ── Gim ────────────────────────────────────────────────────────────────── */

const habits: [string, boolean][] = [
  ["Workout", true],
  ["Cardio", true],
  ["Protein", true],
  ["Stretch", false],
];

/**
 * The real app icon in a phone at true iPhone proportions (402 x 874 points),
 * over a mock of the Today screen.
 */
function PhoneFrame() {
  return (
    <div className="flex justify-center py-2">
      <div className="relative w-[236px] rounded-[2.6rem] border border-glacier/20 bg-[#0b0a0f] p-[9px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]">
        {/* Dynamic island */}
        <div className="absolute top-[17px] left-1/2 z-10 h-[15px] w-[62px] -translate-x-1/2 rounded-full bg-black" />

        <div
          className="relative flex flex-col overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#1b1725] via-[#121019] to-[#08070c] px-4 pt-10 pb-4"
          style={{ aspectRatio: "402 / 874" }}
        >
          <p className="t-num text-[0.58rem] tracking-wide text-white/35">
            Wednesday
          </p>

          <div className="mt-2.5 flex items-center gap-3">
            <Image
              src="/media/gim-icon.png"
              alt="Let's Try app icon: a dumbbell with a determined face"
              width={46}
              height={46}
              className="rounded-[0.8rem] shadow-lg"
            />
            <div>
              <p className="text-[0.85rem] leading-tight font-semibold text-white/90">
                Let&apos;s Try
              </p>
              <p className="text-[0.6rem] text-white/40">Push day</p>
            </div>
          </div>

          {/* Effort score */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] px-3.5 py-3">
            <div className="flex items-baseline justify-between">
              <span className="t-num text-[1.6rem] leading-none font-semibold text-[#ff9a52]">
                412
              </span>
              <span className="text-[0.52rem] tracking-[0.2em] text-white/35 uppercase">
                Effort
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#ff8a3c] to-[#ffb072]" />
            </div>
            <div className="mt-2.5 flex justify-between">
              <span className="t-num text-[0.55rem] text-white/30">Strength 268</span>
              <span className="t-num text-[0.55rem] text-white/30">Cardio 144</span>
            </div>
          </div>

          {/* Habit checklist */}
          <p className="t-num mt-4 text-[0.55rem] tracking-[0.2em] text-white/30 uppercase">
            Today
          </p>
          <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-hidden">
            {habits.map(([label, done]) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3 py-2.5"
              >
                <span
                  className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full text-[0.5rem] ${
                    done
                      ? "bg-[#ff9a52] text-black"
                      : "border border-white/20 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={`text-[0.68rem] ${done ? "text-white/75" : "text-white/40"}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="mx-auto mt-3 h-[3px] w-[86px] shrink-0 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}

/* ── Car price calculator ───────────────────────────────────────────────── */

/** Depreciation curve, drawn once. Values are illustrative of the shape. */
const curve = "M0,14 C36,26 72,44 110,62 C148,78 186,90 224,98";

function PriceGauge() {
  return (
    <Frame label="Estimate">
      <div className="flex items-baseline gap-2">
        <span className="t-num text-4xl font-semibold text-glacier">$18,400</span>
        <span className="t-num text-[0.7rem] text-sun/40">± 1,838</span>
      </div>
      <p className="t-rail mt-2 text-sun/35">2019 · 62,000 mi · clean title</p>

      {/*
        The curve has to span the full width so it lines up with the year
        labels below it, so it stretches rather than letterboxing. The stroke
        opts out of that scaling to stay an even weight.
      */}
      <svg
        viewBox="0 0 224 110"
        preserveAspectRatio="none"
        className="mt-5 h-24 w-full"
        role="img"
        aria-label="Depreciation curve falling from left to right"
      >
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fe3f0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7fe3f0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${curve} L224,110 L0,110 Z`} fill="url(#fade)" />
        <path
          d={curve}
          fill="none"
          stroke="#7fe3f0"
          strokeWidth="1.75"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="flex justify-between border-t border-glacier/10 pt-3">
        {["Now", "+2 yr", "+4 yr", "+6 yr"].map((t) => (
          <span key={t} className="t-num text-[0.58rem] text-sun/30">
            {t}
          </span>
        ))}
      </div>
    </Frame>
  );
}

/* ── Shared chrome ──────────────────────────────────────────────────────── */

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pane-submerged edge-lit rounded-xl p-4 md:p-5">
      <p className="t-rail mb-4 text-glacier/40">{label}</p>
      {children}
    </div>
  );
}

function Legend({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`block h-1.5 w-1.5 rounded-full ${swatch}`} />
      <span className="text-[0.62rem] tracking-wide text-sun/40 uppercase">{text}</span>
    </span>
  );
}
