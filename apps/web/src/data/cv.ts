import type { CVData, ProjectCard } from "@reecewall/types";

// Baked at build time: data-driven, no runtime backend, host-agnostic.
// To move this server-side later, swap this import for a build-time fetch.
export const cv: CVData = {
  name: "Reece Wall",
  tagline: "Data Engineer · Azure · Databricks · SQL",
  location: "Nottingham, UK",
  email: "rcdwall@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/reecewall" },
    { label: "GitHub", href: "https://github.com/reecewall" },
  ],
  profile:
    "Data Engineer with 5+ years in analytics and data engineering across the Boots UK supply chain, including 3+ years building and optimising ETL/ELT pipelines in Azure and Databricks. Hands-on with Databricks (PySpark / Spark SQL), Azure Data Factory and performant T-SQL, feeding a Synapse data warehouse that serves planning, forecasting and replenishment.",
  roles: [
    {
      title: "Systems Lead",
      org: "Supply Chain Planning, Boots UK",
      start: "Mar 2026",
      end: "Present",
      stack: ["Azure", "SQL", "Python", "Power BI"],
      bullets: [
        "Modelling ~20M item/store/site planogram records in performant SQL and Power BI to quantify the working-capital impact of stock-policy scenarios, underpinning an Executive investment decision.",
        "Own the stability and optimisation of core forecasting & replenishment data systems across the national store estate.",
        "Lead triage and delivery of change requests, bridging business users and IT.",
      ],
    },
    {
      title: "Data Engineer",
      org: "Supply Chain, Boots UK",
      start: "Nov 2022",
      end: "Feb 2026",
      stack: ["Azure Data Factory", "Databricks / PySpark", "Synapse", "T-SQL"],
      bullets: [
        "Built and remediated ETL/ELT pipelines in Azure Data Factory — simplifying logic, cutting load times — loading a Synapse warehouse used across planning and replenishment.",
        "Engineered Databricks transformations in Python notebooks with PySpark and Spark SQL.",
        "Built automated monitoring & alerting verifying expected files land in Azure Blob Storage on time.",
      ],
    },
    {
      title: "Data Analyst",
      org: "Supply Chain Planning, Boots UK",
      start: "Sep 2020",
      end: "Nov 2022",
      stack: ["T-SQL", "Azure Synapse", "VBA", "Power BI"],
      bullets: [
        "Built an outbound optimisation model delivering c. 400,000 fewer warehouse pick operations per week during Peak 2021.",
        "Ran statistical analysis across 1B+ records in Azure Synapse using T-SQL window & partition functions.",
      ],
    },
  ],
  skills: [
    {
      group: "Cloud & Data Engineering",
      items: [
        "Azure Data Factory",
        "Databricks",
        "PySpark / Spark SQL",
        "Azure Synapse",
        "ETL / ELT",
        "Data Modelling",
        "dbt",
        "DuckDB",
      ],
    },
    {
      group: "Languages",
      items: ["SQL / T-SQL", "Python", "PowerShell", "DAX", "TypeScript", "R"],
    },
    {
      group: "BI & Reporting",
      items: ["Power BI", "Power Query", "Power Automate"],
    },
    {
      group: "Tooling",
      items: [
        "Git",
        "GitHub Actions",
        "Terraform",
        "AWS S3 / CloudFront",
        "Agile",
      ],
    },
  ],
  education: [
    {
      award: "BSc (Hons) Mathematics",
      place: "University of Nottingham",
      year: "2013–2016",
    },
    {
      award: "BCS Level 5 Diploma, Data Engineering",
      place: "The Chartered Institute for IT",
      year: "2025",
    },
    {
      award: "BCS Level 4 Diploma, Data Analytics",
      place: "The Chartered Institute for IT",
      year: "2022",
    },
  ],
};

export const projects: ProjectCard[] = [
  {
    slug: "river-levels",
    title: "River Levels — live pipeline",
    blurb:
      "A live Medallion pipeline over Environment Agency data for the River Trent. Click any point to trace it through bronze → silver → gold, in your browser.",
    status: "live",
    href: "https://live.reecewall.dev",
    tags: ["dbt", "DuckDB", "Azure", "DuckDB-WASM"],
  },
  {
    slug: "stitchers-tower",
    title: "Stitcher's Tower",
    blurb:
      "A server-authoritative world simulation: multi-rate idempotent tick engine, append-only economy, Wilson-score discovery. Full-stack systems design.",
    status: "in-dev",
    href: "https://github.com/reecewall/stitchers-tower",
    tags: ["TypeScript", "Postgres", "Redis", "BullMQ"],
  },
  {
    slug: "word-grid-game",
    title: "Word Grid Game",
    blurb:
      "The 2025 prototype that grew into Stitcher's Tower. A small, playable origin story.",
    status: "origin",
    href: "https://play.reecewall.dev",
    tags: ["React", "Game"],
  },
];
