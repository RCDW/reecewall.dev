#!/usr/bin/env node
// Fails if react / react-dom (or their @types) resolve to different majors.
//
// Why this exists: react and react-dom must share a major. An 18 + 19 split
// builds, installs, and serves 200s, but the app never mounts (blank page) —
// it reached production once via a Dependabot bump. `strict-peer-dependencies`
// did not catch it: with autoInstallPeers the mismatch gets baked into the
// lockfile and resolved against the older react, so the strict replay passes.
// This check inspects what is actually installed, so the lockfile games above
// cannot hide the split.
import { createRequire } from "node:module";

// Resolve from apps/web, the app that actually renders react.
const require = createRequire(
  new URL("../apps/web/package.json", import.meta.url),
);
const versionOf = (pkg) => require(`${pkg}/package.json`).version;
const majorOf = (pkg) => Number(versionOf(pkg).split(".")[0]);

const pairs = [
  ["react", "react-dom"],
  ["@types/react", "@types/react-dom"],
];

const mismatches = [];
for (const [a, b] of pairs) {
  const [ma, mb] = [majorOf(a), majorOf(b)];
  if (ma !== mb) {
    mismatches.push(
      `${a}@${versionOf(a)} (major ${ma}) != ${b}@${versionOf(b)} (major ${mb})`,
    );
  }
}

if (mismatches.length > 0) {
  console.error("✕ react package majors are out of sync:");
  for (const m of mismatches) console.error(`  - ${m}`);
  console.error(
    "\nreact and react-dom must share a major (e.g. both 18 or both 19).",
  );
  process.exit(1);
}

console.log("✓ react / react-dom (and @types) majors are in sync.");
