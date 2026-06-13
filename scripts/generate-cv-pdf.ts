#!/usr/bin/env tsx
// Renders the designed CV (/cv/print) to apps/web/public + dist as
// Reece_Wall_CV_Engineer.pdf. The page reads its data from apps/web/src/data/cv.ts
// — the single source of truth — so this PDF can never drift from the site.
//
// Needs the production build to exist first (`pnpm build`): it serves dist via
// `vite preview`, prints the page with headless Chromium (already a dependency
// via @playwright/test), and writes the PDF. The phone number is NOT in source;
// pass it as CV_PHONE and it is injected via the ?phone= param at render time.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4178; // distinct from the e2e preview port (4173) to avoid clashes
const FILENAME = "Reece_Wall_CV_Engineer.pdf";

function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const start = Date.now();
  return new Promise((resolveReady, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolveReady();
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`preview server did not start at ${url}`));
      }
      setTimeout(tick, 300);
    };
    tick();
  });
}

// Write to public/ (so `pnpm dev` serves it locally) and, if a build exists,
// dist/ (what the deploy syncs to S3).
function writeOut(buffer: Buffer) {
  for (const dir of ["apps/web/public", "apps/web/dist"]) {
    const full = resolve(repoRoot, dir);
    if (dir.endsWith("public") || existsSync(full)) {
      mkdirSync(full, { recursive: true });
      writeFileSync(resolve(full, FILENAME), buffer);
      console.log(`✓ wrote ${dir}/${FILENAME}`);
    }
  }
}

async function main() {
  const preview = spawn(
    "pnpm",
    [
      "--filter",
      "@reecewall/web",
      "exec",
      "vite",
      "preview",
      "--port",
      String(PORT),
      "--strictPort",
    ],
    { cwd: repoRoot, stdio: "inherit", shell: process.platform === "win32" },
  );

  try {
    const base = `http://localhost:${PORT}`;
    await waitForServer(base);

    const phone = process.env.CV_PHONE;
    const url = `${base}/cv/print${phone ? `?phone=${encodeURIComponent(phone)}` : ""}`;

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    await browser.close();

    writeOut(Buffer.from(pdf));
  } finally {
    stopPreview(preview.pid);
  }
}

// `vite preview` runs as a child of a shell on Windows, so preview.kill() only
// reaps the shell and orphans the server (holding the port). Kill the tree.
function stopPreview(pid: number | undefined) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/t", "/f"]);
  } else {
    process.kill(pid);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
