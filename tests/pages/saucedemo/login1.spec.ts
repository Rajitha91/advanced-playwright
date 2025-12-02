import { test, expect } from "@playwright/test";
import { LoginPage } from "./login-page";

test.describe("SauceDemo - Login Tests", () => {
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    //arrange
    // Navigate to login page
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Wait for page to load
    await expect(page.locator(".login_logo")).toBeVisible();
  });

  test("should login successfully with standard_user", async ({ page }) => {
    // You'll need to create loginPage here since it's not in scope
    const loginPage = new LoginPage(page);

    //act
    await loginPage.login("standard_user", "secret_sauce");

    // Click login button
    await loginPage.clickLogin();

    //assert
    // Verify successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(loginPage.title)).toContainText("Products");
  });
});
