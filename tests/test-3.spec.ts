import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text:  Username
    - textbox "Username"
    - text:  Password
    - textbox "Password"
    - button "Login"
    - paragraph: Forgot your password?
    `);

});