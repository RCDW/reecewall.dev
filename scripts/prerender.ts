#!/usr/bin/env tsx
// Prerenders the static routes to per-route HTML for SEO. The app is a normal
// Vite SPA; this post-build step serves the built dist with `vite preview`,
// renders each public route with headless Chromium (same approach as
// generate-cv-pdf.ts), and writes the fully-rendered HTML back into dist as
// nested index.html files:
//
//   /       -> dist/index.html        (overwritten with rendered home)
//   /cv     -> dist/cv/index.html
//   /about  -> dist/about/index.html
//
// The CloudFront router function (infra/router.js) maps clean URLs to these
// files. On the client the same bundle still boots and takes over, so the pages
// stay fully interactive — crawlers and first paint just get real content.
//
// Needs the production build to exist first (`pnpm build`).
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(repoRoot, "apps/web/dist");
const PORT = 4180; // distinct from e2e (4173) and PDF gen (4178)
const ROUTES = ["/", "/cv", "/about"];

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

function outPath(route: string) {
  // "/" -> dist/index.html ; "/cv" -> dist/cv/index.html
  return route === "/"
    ? resolve(distDir, "index.html")
    : resolve(distDir, `.${route}/index.html`);
}

// `vite preview` runs as a child of a shell on Windows, so preview.kill() only
// reaps the shell and orphans the server. Kill the tree (as in generate-cv-pdf).
function stopPreview(pid: number | undefined) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/t", "/f"]);
  } else {
    process.kill(pid);
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

    const browser = await chromium.launch();
    const page = await browser.newPage();
    for (const route of ROUTES) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      // Ensure React has rendered real UI (and the per-route title effect ran).
      await page.waitForSelector("#root h1", { timeout: 15_000 });
      const html = await page.content();
      const file = outPath(route);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      console.log(`✓ prerendered ${route} -> ${file.replace(repoRoot, ".")}`);
    }
    await browser.close();
  } finally {
    stopPreview(preview.pid);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
