/**
 * Everything the site says about the person.
 * House style: no long dashes anywhere in visible copy. Use commas, colons,
 * periods or parentheses instead.
 */

export const profile = {
  name: "Sai Vishal Varma Kothapalli",
  shortName: "Vishal Varma",
  title: "Product Manager, AI Products & Platforms",
  location: "Barcelona, Spain",
  tagline:
    "I build AI products for legal and language services, and the dashboards that show what they actually do.",
  intro:
    "Technical product manager who owns AI and platform products end to end: strategy and discovery through launch, metrics, and stakeholder alignment. Unusually hands on. I write the ETL, build the dashboards, and ship frontend when engineering bandwidth is thin.",
  below:
    "Most of what makes a product work never shows up in the demo. The pipelines, the evaluation harnesses, the cost model, the awkward stakeholder conversation that unblocked a release. That is the part of the iceberg this site is actually about.",
  resume: "/Vishal_Varma_Resume_July_2026.pdf",
};

export const contact = {
  email: "iamvishal123@gmail.com",
  linkedin: "https://www.linkedin.com/in/saivishalvarma/",
  github: "https://github.com/marvlhiks",
  phone: "+34 677 926 350",
  phoneHref: "tel:+34677926350",
};

/** Where I come from, in order. */
export const journey = [
  {
    place: "Hyderabad, India",
    years: "2018 to 2021",
    note: "Started in data and quality. Anvizent, then Amazon. Learned to make numbers trustworthy before making them pretty.",
  },
  {
    place: "Clermont-Ferrand & Lyon, France",
    years: "2021 to 2022",
    note: "Master's in BI and analytics, then a Sanofi internship in Commercial Excellence. The pivot from analyst to product.",
  },
  {
    place: "Barcelona, Spain",
    years: "2023 to now",
    note: "Product manager for TransPerfect's AI and machine translation portfolio.",
  },
];

export const experience = [
  {
    company: "TransPerfect",
    role: "Product Manager, AI & Machine Translation",
    place: "Barcelona, Spain",
    dates: "Oct 2023 to present",
    summary:
      "Own strategy and delivery across the AI portfolio for legal and language services.",
    highlights: [
      "Own strategy and delivery for e-discovery ML (ReefML), MTHub 2.0, and company wide AI cost analytics.",
      "Drove ReefML production validation at roughly 300K documents. Internal benchmark hit 87% recall on a 22K document matter.",
      "MTHub: contributed to a 40% usage lift, and shipped the revamped React frontend when engineering bandwidth was tight.",
      "Built org wide AI spend dashboards across 7 providers into PostgreSQL and Metabase for the C suite.",
    ],
  },
  {
    company: "Sanofi",
    role: "Business Data Explorer Analyst",
    place: "Lyon, France",
    dates: "Jun 2022 to Dec 2022",
    summary:
      "Automated vaccine business data collection for global Commercial Excellence and go to market teams.",
    highlights: [
      "Qlik Sense dashboards backed by a headless CMS.",
      "Took pipelines to near 100% accuracy, which killed manual reconciliation entirely.",
    ],
  },
  {
    company: "Amazon",
    role: "Quality Specialist",
    place: "Hyderabad, India",
    dates: "Nov 2019 to Jun 2021",
    summary: "Reliability work on internal routing and monitoring systems.",
    highlights: [
      "Improved reliability of internal routing and monitoring systems.",
      "Led Python and SQL training for a team of 8 in Amazon's internal training program.",
    ],
  },
  {
    company: "Anvizent",
    role: "Data Analyst",
    place: "Hyderabad, India",
    dates: "Jul 2018 to Feb 2019",
    summary: "BI dashboards built to org architecture standards.",
    highlights: [
      "Designed BI dashboards to org architecture standards.",
      "Cut a daily data model refresh from 54 minutes to 40, about 26% faster.",
    ],
  },
];

export const education = {
  degree: "Master's, Business Intelligence & Analytics",
  school: "ESC Clermont Business School",
  place: "Clermont-Ferrand, France",
  years: "2021 to 2023",
  note: "The pivot that deepened BI, analytics, and product minded data work. Still the foundation I use every week.",
};

export const skillGroups = [
  {
    label: "Product",
    items: [
      "Strategy",
      "Roadmapping",
      "Discovery",
      "Prioritization",
      "Launch",
      "Stakeholders",
      "OKRs",
      "RACI",
      "Beta and pilots",
      "Competitive benchmarks",
    ],
  },
  {
    label: "AI & ML",
    items: [
      "LLMs and RAG",
      "Agentic workflows",
      "ML product lifecycle",
      "E-discovery",
      "Predictive coding",
      "Speech to text",
      "Model evaluation",
      "TAR and active learning",
    ],
  },
  {
    label: "Data & technical",
    items: [
      "Python",
      "SQL",
      "PostgreSQL",
      "Databricks",
      "n8n",
      "REST APIs",
      "ETL",
      "Metabase",
      "Power BI",
      "Tableau",
      "Qlik",
      "Docker",
      "AWS",
      "Azure",
      "Git",
    ],
  },
];
