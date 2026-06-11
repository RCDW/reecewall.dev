import { test, expect } from "@playwright/test";

// Guards the failure class CI otherwise can't see: the app compiles, the server
// returns 200, index.html ships an empty <div id="root">, but React never
// mounts — a blank page with no console error. This has reached production
// twice. A static check of the built HTML can't tell a healthy build from a
// blank one (both have an empty #root on disk); only a real browser executing
// the bundle can. So we load the built site and assert it actually mounted.
test("production build mounts and renders without console errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");

  // (a) React mounted: #root has rendered children, not the empty shell that
  // ships in index.html.
  await expect(page.locator("#root")).not.toBeEmpty();

  // ...and it's real UI, not a stray node: the homepage <h1> is present.
  await expect(
    page.getByRole("heading", { level: 1, name: "Reece Wall" }),
  ).toBeVisible();

  // (b) Nothing errored while mounting.
  expect(errors).toEqual([]);
});
