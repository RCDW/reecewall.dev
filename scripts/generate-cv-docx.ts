#!/usr/bin/env tsx
// Builds the ATS-friendly Word document (Reece_Wall_CV_ATS.docx) from the same
// single source of truth, apps/web/src/data/cv.ts. Plain single column, standard
// font, real headings and bullet lists — the format ATS parsers read most
// reliably. The designed-only sections (Strengths, Selected Impact, stack pills)
// are deliberately omitted. Phone is injected from CV_PHONE, never from source.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
import { cv } from "../apps/web/src/data/cv";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FILENAME = "Reece_Wall_CV_ATS.docx";

function sectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" },
    },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, color: "0E5B54" }),
    ],
  });
}

function contactLine() {
  const parts = [
    cv.location,
    process.env.CV_PHONE,
    cv.email,
    ...cv.links.map((l) => l.href.replace(/^https?:\/\//, "")),
  ].filter(Boolean) as string[];
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: parts.join("  •  "), size: 18 })],
  });
}

const children: Paragraph[] = [
  new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text: cv.name, bold: true, size: 36 })],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: cv.tagline, color: "0E5B54", size: 20, bold: true }),
    ],
  }),
  contactLine(),

  sectionHeading("Profile"),
  new Paragraph({ children: [new TextRun({ text: cv.profile, size: 20 })] }),

  sectionHeading("Key Skills"),
  ...cv.skills.map(
    (s) =>
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${s.group}: `, bold: true, size: 20 }),
          new TextRun({ text: s.items.join(", "), size: 20 }),
        ],
      }),
  ),

  sectionHeading("Experience"),
  ...cv.roles.flatMap((r) => [
    new Paragraph({
      spacing: { before: 120, after: 0 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: `${r.title} — ${r.org}`, bold: true, size: 20 }),
        new TextRun({ text: `\t${r.start} – ${r.end}`, size: 18 }),
      ],
    }),
    ...r.bullets.map(
      (b) =>
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 20 },
          children: [new TextRun({ text: b, size: 20 })],
        }),
    ),
  ]),

  sectionHeading("Education & Certifications"),
  ...cv.education.map(
    (e) =>
      new Paragraph({
        spacing: { after: 40 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: `${e.award}, `, bold: true, size: 20 }),
          new TextRun({ text: e.place, size: 20 }),
          new TextRun({ text: `\t${e.year}`, size: 18 }),
        ],
      }),
  ),

  new Paragraph({
    spacing: { before: 200 },
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({
        text: "References available on request.",
        italics: true,
        size: 18,
      }),
    ],
  }),
];

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 20 } },
    },
  },
  sections: [{ children }],
});

Packer.toBuffer(doc).then((buffer) => {
  for (const dir of ["apps/web/public", "apps/web/dist"]) {
    const full = resolve(repoRoot, dir);
    if (dir.endsWith("public") || existsSync(full)) {
      mkdirSync(full, { recursive: true });
      writeFileSync(resolve(full, FILENAME), buffer);
      console.log(`✓ wrote ${dir}/${FILENAME}`);
    }
  }
});
