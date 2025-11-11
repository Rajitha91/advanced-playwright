import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Expect page to have a title containing "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name "Installation"
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('check documentation link', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Click on "Docs" link
  await page.getByRole('link', { name: 'Docs' }).click();

  // Verify we're on the docs page
  await expect(page).toHaveURL(/.*docs/);
});