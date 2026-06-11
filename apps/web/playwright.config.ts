import { defineConfig, devices } from "@playwright/test";

// The smoke test runs against the *production build* served by `vite preview`,
// not the dev server: the failure class we guard against (a built bundle that
// serves 200s but never mounts) only exists in the built artifact. `pnpm build`
// must therefore run before this — CI does that in the smoke job; locally run
// `pnpm build` first.
const PORT = 4173;

export default defineConfig({
  testDir: "./e2e",
  // A flaky smoke test is worse than none — it must be deterministic, so no
  // retries and one worker. If it's red, the build is genuinely broken.
  retries: 0,
  workers: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // In CI always start a fresh server; locally reuse one if it's already up.
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
