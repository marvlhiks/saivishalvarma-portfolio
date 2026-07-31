/**
 * The portfolio, ordered by depth. Work products sit near the surface where
 * everyone can see them. The things I built for myself sit further down.
 *
 * House style: no long dashes in visible copy.
 */

/** Which bespoke visual the card and detail page render. */
export type Visual =
  | "scoreband"
  | "waveform"
  | "pipeline"
  | "chart"
  | "phone"
  | "gauge";

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  /** Metres below the waterline. Drives ordering and the depth rail. */
  depth: number;
  strand: "work" | "personal";
  status: string;
  roles: string[];
  /** One line, used on the card. */
  summary: string;
  /** Two or three sentences, used on the detail page. */
  detail: string;
  metrics: Metric[];
  notes: string[];
  stack: string[];
  visual: Visual;
  /** Only ever set when the repo is genuinely public. */
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "reefml",
    name: "ReefML",
    kind: "Legal, e-discovery",
    depth: 40,
    strand: "work",
    status: "Shipping",
    roles: ["Product lead", "QA", "Release manager"],
    summary:
      "A classification API that reads a legal matter and scores every document for relevance, so review teams read the useful few percent instead of all of it.",
    detail:
      "Document review is the most expensive part of litigation, and most of what gets read turns out to be irrelevant. ReefML learns from a small labelled set and scores the whole corpus responsive or non responsive, so reviewers work a ranked queue instead of a flat list. I own strategy and delivery: compute and quality toward market readiness, staging releases, and the validation path into production.",
    metrics: [
      { value: "2M", label: "documents per matter" },
      { value: "87%", label: "recall, 22K doc benchmark" },
      { value: "300K", label: "docs in production validation" },
    ],
    notes: [
      "Up to 2 million documents can be processed for a single matter.",
      "Stakeholder alignment for the production testing path is complete.",
      "Benchmarked on quality against competitor tooling, not just on latency and cost.",
    ],
    stack: ["Python", "FastAPI", "Databricks", "Docker", "Azure"],
    visual: "scoreband",
  },
  {
    slug: "gltranscribe",
    name: "GLTranscribe",
    kind: "Speech to text API",
    depth: 110,
    strand: "work",
    status: "Maintenance track",
    roles: ["Product manager", "QA"],
    summary:
      "The ASR hub. Speech to text as a service for language workflows, from media transcription through to downstream translation.",
    detail:
      "GLTranscribe is the automatic speech recognition line in the portfolio. It turns audio into text that the rest of the language stack can act on, which makes it the front door for any workflow that starts with a recording rather than a document. In 2026 the leadership posture is to finish the planned feature set and then move it to a maintenance support model.",
    metrics: [
      { value: "ASR", label: "hub for the portfolio" },
      { value: "2026", label: "move to maintenance" },
    ],
    notes: [
      "Branded as Transcribe in leadership materials.",
      "Exit criteria agreed: planned features released, then a stable support model for operators.",
      "Part of the language services AI surface I own with the team.",
    ],
    stack: ["ASR models", "REST APIs", "Python", "Docker"],
    visual: "waveform",
  },
  {
    slug: "mthub",
    name: "MTHub 2.0",
    kind: "Internal product",
    depth: 180,
    strand: "work",
    status: "Active",
    roles: ["Product lead", "Frontend engineer"],
    summary:
      "The internal hub for machine translation work: evaluations, translations, glossaries, and new engine setup, rebuilt for large jobs and a clearer interface.",
    detail:
      "MTHub is where the language operations teams actually do their work. The 2.0 rebuild targeted the two things that limited it: bulk operations for large jobs, and an interface that did not fight the user. When engineering bandwidth ran short I built and shipped the new React frontend myself.",
    metrics: [
      { value: "40%", label: "increase in daily usage" },
      { value: "+30%", label: "unique user target" },
    ],
    notes: [
      "Translations and evaluations both climbed hard day over day in Q1.",
      "Bulk operations were the lever for both usage and time per job.",
      "Admin and file service API work in flight for the 2.0 cutover.",
    ],
    stack: ["React", "TypeScript", "REST APIs", "Python"],
    visual: "pipeline",
  },
  {
    slug: "ai-dashboards",
    name: "AI Dashboards & Initiatives",
    kind: "Data and BI",
    depth: 260,
    strand: "work",
    status: "Ongoing",
    roles: ["BI engineer", "Data analyst", "Numbers person"],
    summary:
      "Org wide AI spend and usage pulled from every provider into one warehouse, plus the product dashboards that make each AI product readable.",
    detail:
      "Seven providers, one place to look. I built the ingestion for OpenAI, Anthropic, Azure, AWS, Cursor and the rest into PostgreSQL, then surfaced it in Metabase so the C suite and FinOps could see AI spend without spreadsheet archaeology. The same muscle powers the product side: GLNow and GL Voice dashboards that turn telemetry into decisions.",
    metrics: [
      { value: "7", label: "providers ingested" },
      { value: "C suite", label: "audience" },
    ],
    notes: [
      "Built for the CTO and FinOps audiences.",
      "Shipped a v1 demo without waiting on a full business unit mapping.",
      "GL Voice: leaner Metabase loads, less Snowflake spend, reliable refresh.",
      "GLNow: aggregated facts from production instances into a BI store.",
    ],
    stack: ["PostgreSQL", "Metabase", "Python", "ETL", "Snowflake"],
    visual: "chart",
  },
  {
    slug: "lets-try",
    name: "Let's Try",
    kind: "iOS app, built for myself",
    depth: 380,
    strand: "personal",
    status: "In daily use",
    roles: ["Everything"],
    summary:
      "A gym and habit tracker I built because nothing on the App Store scored effort the way I wanted. Local first, no account, no server.",
    detail:
      "Around 10,700 lines of Swift across three targets: the phone app, a watch app, and widgets. SwiftUI and SwiftData, entirely local first, so there is no account and no backend. The interesting part is the scoring: instead of capping each pillar at 100, effort points are uncapped, so a punishing session actually outscores a short one. Habits are the core object, and the workout and cardio habits tick themselves from real logged activity.",
    metrics: [
      { value: "10.7K", label: "lines of Swift" },
      { value: "3", label: "targets: phone, watch, widgets" },
      { value: "84", label: "exercises seeded" },
    ],
    notes: [
      "SwiftUI and SwiftData, local first. The only optional network call is AI food analysis, using your own key from the Keychain.",
      "Uncapped effort scoring: reps times effort times load, so heavy work is worth more.",
      "Ten data models covering habits, workouts, plans, day logs, food, and weekly check ins.",
      "Seeding repairs before it creates, after a shipped bug meant a plan that lost its exercises could never recover.",
    ],
    stack: ["Swift", "SwiftUI", "SwiftData", "HealthKit", "WidgetKit"],
    visual: "phone",
  },
  {
    slug: "car-price-calculator",
    name: "USA Car Price Calculator",
    kind: "Web app",
    depth: 460,
    strand: "personal",
    status: "Built",
    roles: ["Everything"],
    summary:
      "Tell it the car and it tells you what the US used market says it is worth, plus how fast that value falls from here.",
    detail:
      "A gradient boosted price model trained on 2.4 million US listings, wrapped in a Next.js front end and a FastAPI service. It takes make, model, trim, year, mileage, region and title history, then returns a price estimate, a depreciation curve, and comparable listing statistics. On a held out test set of 267 thousand cars it lands within about 6.4% of the real asking price.",
    metrics: [
      { value: "$1,838", label: "mean absolute error" },
      { value: "0.967", label: "R squared" },
      { value: "2.4M", label: "listings trained on" },
    ],
    notes: [
      "6.35% mean absolute percentage error on 267K held out listings.",
      "Inputs: make, model, trim, year, mileage, ZIP region, accident and title history.",
      "Returns a depreciation curve, not just a single number.",
      "Next.js front end, FastAPI backend, gradient boosted trees for the model.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "XGBoost", "Python"],
    visual: "gauge",
  },
];

/** Shipped, handed over, or parked. Kept short so the six above stay in front. */
export const alsoShipped = [
  {
    name: "GLAnswers",
    kind: "RAG platform",
    note: "The retrieval platform behind internal and customer chat, including GLKnowledge and Ask Nova. I support evaluation 2.0, answer quality, and grounding.",
  },
  {
    name: "GL Redact",
    kind: "PII redaction API",
    note: "A redaction service that strips sensitive data before content moves through language and legal pipelines. Built end to end, then handed to the owning team.",
  },
  {
    name: "Reef Validate",
    kind: "Examination support",
    note: "Matter aware examination support: retrieve case documents, classify witness answers, cite the reason. Hackathon London 2026 finalist as a Digital Reef module.",
  },
  {
    name: "Reef Wheel",
    kind: "Visual review prototype",
    note: "A cluster wheel interface for e-discovery, so reviewers see the shape of a whole collection instead of a ranked list. Demoed on a 2,000 email public archive.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function adjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { up: projects[i - 1], down: projects[i + 1] };
}

/** The floor the depth rail scales against. */
export const seabed = 520;
