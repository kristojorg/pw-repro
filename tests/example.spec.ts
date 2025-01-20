import { test, expect } from "@playwright/test";

test("works in online mode", async ({ page }) => {
  await page.route("http://localhost:3000", (route) => {
    return route.fulfill({ body: "<div>Hello from routed page</div>" });
  });
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Hello from routed page")).toBeVisible();
});

test("works in offline mode", async ({ page, context }) => {
  await page.route("http://localhost:3000", (route) => {
    return route.fulfill({ body: "<div>Hello from routed page</div>" });
  });
  const listener = page.addListener("load", async () => {
    await context.setOffline(true);
  });
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Hello from routed page")).toBeVisible();
  await page.removeAllListeners();
});

test("works when set offline after startup", async ({ page, context }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // await context.setOffline(true);
});
