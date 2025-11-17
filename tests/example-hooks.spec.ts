import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log('im in the before each');
});

test.afterEach(async ({ page }) => {
  console.log('im in the after each');
});

test.beforeAll(async ({ page }) => {
  console.log('im in the before all');
});

test.afterAll(async ({ page }) => {
  console.log('im in the after all');
});

test('test1', async ({ page }) => {
  console.log('im in tes1');
});

test('test2', async ({ page }) => {
  console.log('im in tes2');
});

test('test3', async ({ page }) => {
  console.log('im in tes3');
});

test('test4', async ({ page }) => {
  console.log('im in tes4');
});

test.fail('test four', async ({ page }) => {
  expect(true).toBe(false);
  console.log('I am in the test 4');
});

test.only('test5', async ({ page }) => {
  console.log('im in tes5');
});

test.fixme('test6', async ({ page }) => {
  console.log('im in tes5');
});
