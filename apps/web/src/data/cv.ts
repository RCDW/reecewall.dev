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
    "Data Engineer with 5+ years in analytics and data engineering across the Boots UK supply chain, including 3+ years building and optimising ETL/ELT pipelines in Azure and Databricks. Hands-on with Databricks (PySpark / Spark SQL), Azure Data Factory and performant T-SQL, feeding a Synapse data warehouse that serves planning, forecasting and replenishment. A Mathematics graduate with a strong record of pipeline optimisation, data modelling at scale and reliable delivery on business-critical systems.",
  roles: [
    {
      title: "Systems Lead",
      org: "Supply Chain Planning, Boots UK",
      start: "Mar 2026",
      end: "Present",
      stack: ["Azure", "SQL", "Python", "Power BI", "Power Automate"],
      bullets: [
        "Led the data modelling behind major stock-policy and availability decisions, modelling ~20M item/store/site planogram records in performant SQL and Power BI to quantify the working-capital impact of 7 investment scenarios (£5–50m range) and inform a board-level capital-allocation decision.",
        "Own the stability and optimisation of core forecasting and replenishment data systems operating across the national store estate (18M item/store combinations).",
        "Lead triage and delivery of change requests, advising on system-related decisions and bridging business users and IT to turn system behaviour into actionable fixes.",
      ],
    },
    {
      title: "Data Engineer",
      org: "Supply Chain, Boots UK",
      start: "Nov 2022",
      end: "Feb 2026",
      stack: [
        "Azure Data Factory",
        "Databricks / PySpark",
        "Synapse",
        "PowerShell",
        "T-SQL",
        "Power BI",
      ],
      bullets: [
        "Built and remediated ETL/ELT pipelines in Azure Data Factory — simplifying logic, cutting load times and consolidating distinct pipelines — loading a Synapse data warehouse used across planning and replenishment.",
        "Engineered data transformations in Databricks using Python notebooks with PySpark and Spark SQL, refining raw ingested data into clean, warehouse-ready tables.",
        "Built automated monitoring and alerting that verifies expected files land in Azure Blob Storage on time, catching ingestion failures before they reached downstream reporting.",
        "Developed PowerShell tooling to map end-to-end data lineage from blob storage to warehouse target tables, accelerating root-cause analysis.",
      ],
    },
    {
      title: "Data Analyst",
      org: "Supply Chain Planning, Boots UK",
      start: "Sep 2020",
      end: "Nov 2022",
      stack: ["T-SQL", "Azure Synapse", "VBA", "Excel", "Power BI"],
      bullets: [
        "Built an outbound optimisation model that delivered c. 400,000 fewer warehouse pick operations per week during Peak 2021.",
        "Engineered a supplier-booking system (MS Access / VBA / Excel) used by the Seasonal and Online operations to manage inbound bookings into the Burton warehouse.",
        "Ran statistical analysis across 1B+ records in Azure Synapse using T-SQL window and partition functions — analysis that would otherwise have been computationally infeasible.",
      ],
    },
    {
      title: "MI Administrator",
      org: "Outbound, Boots UK",
      start: "Dec 2018",
      end: "Sep 2020",
      stack: ["VBA", "SQL", "Excel"],
      bullets: [
        "Automated the majority of daily MI reporting, freeing c. 3 hours/day for project and improvement work.",
        "Built a reusable custom JSON parser in VBA and tooling to flag inefficient stock deliveries to site.",
      ],
    },
  ],
  earlier:
    "Began in Outbound operations (2017–18), building a ground-level understanding of product flow and the end-to-end supply chain before moving into MI and analytics.",
  skills: [
    {
      group: "Cloud & Data Engineering",
      items: [
        "Azure Data Factory",
        "Databricks",
        "PySpark / Spark SQL",
        "Azure Synapse",
        "Data Warehousing",
        "ETL / ELT",
        "Data Modelling",
        "Azure Blob Storage",
        "Azure DevOps",
      ],
    },
    {
      group: "Languages",
      items: [
        "SQL / T-SQL",
        "Python",
        "PySpark",
        "PowerShell",
        "DAX",
        "M / Power Query",
        "VBA",
        "R",
      ],
    },
    {
      group: "BI & Reporting",
      items: ["Power BI", "Power Query", "Power Automate", "KPI Reporting"],
    },
    {
      group: "Tools & Practice",
      items: [
        "SSMS",
        "Git",
        "Agile",
        "Monitoring & Alerting",
        "Pipeline Optimisation",
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
  strengths: [
    "Builds reliable, performant pipelines with optimisation and observability built in.",
    "Detail-driven, with a habit of challenging data that doesn't behave as expected.",
    "Translates complex system behaviour into clear decisions for technical and non-technical audiences.",
  ],
  metrics: [
    {
      value: "£5–50m",
      label:
        "stock-investment scenarios modelled to inform an Exec OSA decision",
    },
    { value: "1B+", label: "records analysed in Azure Synapse with T-SQL" },
    {
      value: "~400k",
      label: "fewer warehouse pick operations per week (Peak 2021)",
    },
    {
      value: "18M",
      label: "item/store combinations supported across the national estate",
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
