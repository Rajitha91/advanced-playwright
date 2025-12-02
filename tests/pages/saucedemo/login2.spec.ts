// revised code using fixtures
// import { test, expect } from "./fixtures/saucedemo-fixtures";

// test.describe("SauceDemo - Login Tests", () => {
//   test.beforeEach(async ({ page, loginPage }) => {
//     await loginPage.goto();
//     await expect(page.locator(".login_logo")).toBeVisible();
//   });

//   test("should login successfully with standard_user", async ({
//     page,
//     loginPage,
//   }) => {
//     // Act
//     await loginPage.login("standard_user", "secret_sauce");
//     await loginPage.clickLogin();

//     // Assert
//     await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
//     await expect(page.locator(loginPage.title)).toHaveText("Products");
//   });
// });
