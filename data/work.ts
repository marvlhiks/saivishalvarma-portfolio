export type WorkItem = {
  id: string;
  name: string;
  subtitle?: string;
  roles: string[];
  blurb: string;
  result: string;
  status: string;
  stories: string[];
  initiatives: string[];
};

/** Path chapters — one on screen at a time while scrolling. */
export const pathWork: WorkItem[] = [
  {
    id: "reefml",
    name: "ReefML",
    subtitle: "Legal · e-discovery",
    roles: ["Product lead", "QA", "Release manager"],
    blurb:
      "Classification API for legal review — score large matter corpora responsive / non-responsive from a small labeled set.",
    result:
      "Driving compute + quality toward market readiness; STG releases shipping, Prod validation path aligned.",
    status: "Shipping",
    stories: [
      "Up to ~2M documents can be processed per matter.",
      "Leadership 2026: start generating facilitated revenue.",
      "Stakeholder alignment for Prod testing path complete.",
    ],
    initiatives: [
      "Market-ready latency and cost",
      "Quality vs competitor benchmarks",
      "STG → Prod core-path validation",
    ],
  },
  {
    id: "mthub",
    name: "MTHub 2.0",
    subtitle: "Language · internal tooling",
    roles: ["Product lead", "Frontend engineer"],
    blurb:
      "Internal hub for MT evaluations, translations, glossaries, and new engine setup — rebuilt for large jobs and a clearer UI.",
    result:
      "About 40% increase in usage on daily operations; new React frontend live on STG.",
    status: "Active",
    stories: [
      "Q1 translations and evaluations both climbed hard day-over-day.",
      "Bulk operations as the lever for usage and time-per-job.",
      "UAPE admin and file-service API work in flight for 2.0 cutover.",
    ],
    initiatives: [
      "Large-job + multi-file processing",
      "STG smoke → prod cutover",
      "+30% unique users / daily ops (leadership)",
    ],
  },
  {
    id: "glanswers",
    name: "GLAnswers",
    subtitle: "Language · RAG platform",
    roles: ["Supporting PM", "QA", "Deployment"],
    blurb:
      "RAG platform behind internal and customer chat — GLKnowledge, Ask Nova, and shared tooling for grounded answers.",
    result:
      "Supporting RAG eval 2.0 and quality; leadership track toward 2× traces and 1k MAU.",
    status: "Active",
    stories: [
      "Same stack powers multiple assistants with different audiences.",
      "Focus: response quality, grounding, and TPAuth / QA unblocks.",
      "Incident learning from May 2026 prod outage folded into ops awareness.",
    ],
    initiatives: [
      "RAG eval 2.0 + Langfuse assets",
      "Answer / link quality fixes",
      "Teams app bridge to new experience",
    ],
  },
  {
    id: "gltranscribe",
    name: "GLTranscribe",
    subtitle: "ASR Hub · speech-to-text",
    roles: ["Product manager", "QA"],
    blurb:
      "Speech-to-text / transcription line in the portfolio — ASR Hub for language and related workflows.",
    result:
      "2026 leadership posture: move into maintenance once planned features are released.",
    status: "Maintenance track",
    stories: [
      "Branded in leadership materials as Transcribe.",
      "Exit criteria: planned new features released → maintenance support model.",
      "Part of the language-services AI surface I own with the team.",
    ],
    initiatives: [
      "Release completeness checklist",
      "Maintenance exit criteria with leadership",
      "Stable support model for operators",
    ],
  },
  {
    id: "glredact",
    name: "GL Redact",
    subtitle: "PII Redaction Service API",
    roles: ["Built end-to-end", "Handed over"],
    blurb:
      "PII redaction as a service API — strip sensitive data before content moves through language and legal pipelines.",
    result: "Stood it up end-to-end, then handed ownership to another team.",
    status: "Handed over",
    stories: [
      "Privacy gate before downstream AI and human review.",
      "Built for reuse across GL content flows.",
      "Ownership transferred — kept here as a shipped chapter.",
    ],
    initiatives: [
      "Service API shape",
      "PII coverage for target content",
      "Clean handoff to owning team",
    ],
  },
];

export type DashboardItem = {
  id: string;
  name: string;
  blurb: string;
  result: string;
  stories: string[];
};

export const dashboardRoles = [
  "BI engineer",
  "Data analyst",
  "Numbers person",
];

/** Second act — after the product path. */
export const dashboards: DashboardItem[] = [
  {
    id: "ai-usage",
    name: "AI Usage",
    blurb: "Org-wide provider spend and usage into Postgres + Metabase.",
    result:
      "OpenAI, Anthropic, Azure, AWS, Cursor and more — leadership visibility without spreadsheet archaeology.",
    stories: [
      "Built for Julien / CTO / FinOps audiences.",
      "v1 demo landed without waiting on full BU mapping.",
      "Continuous ingest for the providers that matter first.",
    ],
  },
  {
    id: "product-dashboards",
    name: "AI product dashboards",
    blurb:
      "Create and stand up dashboards for our AI products — including GLNow and GL Voice.",
    result:
      "Product-facing BI so usage, cost, and health are readable — not buried in warehouse noise.",
    stories: [
      "GLNow BI: aggregated facts from production instances into a BI store.",
      "GL Voice: leaner Metabase loads, less Snowflake spend, reliable refresh.",
      "Same muscle: turn AI product telemetry into decisions.",
    ],
  },
];

/** Extra bets — open from a product card for more depth. */
export const moreBets: WorkItem[] = [
  {
    id: "reef-validate",
    name: "Reef Validate",
    subtitle: "Legal · examination support",
    roles: ["Hackathon captain"],
    blurb:
      "Matter-aware examination support — retrieve case docs, classify witness answers, cite why.",
    result:
      "Hackathon London '26 finals; Slo-Go as a Digital Reef module.",
    status: "Slo-Go",
    stories: [
      "Built with Colin the Caterpillars at Hackathon London '26.",
      "Match / Contradiction / Needs review with cited rationale.",
      "Sibling interest: Reef Case (trial bundles) went Go.",
    ],
    initiatives: [
      "Digital Reef module fit",
      "MVP examination loop",
      "Adjacent forensics / HR investigation interest",
    ],
  },
  {
    id: "reef-wheel",
    name: "Reef Wheel",
    subtitle: "Legal · visual review POC",
    roles: ["Side project"],
    blurb:
      "Cluster-wheel UI for e-discovery — see corpus shape, tag R/NR, prioritize with CAL-style signals.",
    result:
      "Interface refresh shipped; demo corpus for TLS / legal stakeholder talks.",
    status: "Prototype",
    stories: [
      "2,000-email Jeb Bush demo corpus.",
      "Near-term interest in ReefML score integration.",
      "Exploration for Reef / TLS — not production ReefReview.",
    ],
    initiatives: [
      "Visual review UX",
      "CAL / TAR-style prioritization",
      "Stakeholder demo readiness",
    ],
  },
];

/** Two headline wins — keep this section sparse so metrics punch. */
export const highlights = [
  {
    product: "ReefML",
    value: "2M docs",
    detail: "can be processed",
  },
  {
    product: "MTHub",
    value: "40%",
    detail: "increase in usage",
  },
];

export const contact = {
  email: "iamvishal123@gmail.com",
  linkedin: "https://www.linkedin.com/in/saivishalvarma/",
  phone: "+34 677 926 350",
  phoneHref: "tel:+34677926350",
};
