import { test, expect } from '@playwright/test';

const username = 'Admin';
const password = 'admin123';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.locator('body').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
});