import { defineConfig, devices } from "@playwright/test";

// Two modes, same spec:
//
//  - Default (local): build, then smoke-test the production build served by
//    `vite preview`. The failure class we guard against (a bundle that serves
//    200s but never mounts) only exists in the built artifact, so we test the
//    build, not the dev server. `pnpm build` must run first.
//
//  - SMOKE_BASE_URL set (CI preview job): smoke-test an already-deployed URL —
//    the per-PR CloudFront preview — instead of serving locally. This is the
//    real edge + S3 + routing, the last gate before prod. No local server is
//    started, and a couple of retries ride out transient runner<->CloudFront
//    network blips (the deploy waits for invalidation, so staleness is not a
//    flake source — see preview.yml).
const PORT = 4173;
const remoteTarget = process.env.SMOKE_BASE_URL;
const baseURL = remoteTarget ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  // Local: zero retries — a red is a genuinely broken build, kept deterministic.
  // Remote: 2 retries for network flake only (content is already live).
  retries: remoteTarget ? 2 : 0,
  workers: 1,
  use: {
    baseURL,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // No local server when targeting a deployed URL.
  webServer: remoteTarget
    ? undefined
    : {
        command: `pnpm preview --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        // In CI always start a fresh server; locally reuse one if it's already up.
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
