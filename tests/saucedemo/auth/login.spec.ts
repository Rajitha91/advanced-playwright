// import { test, expect } from "@playwright/test";

// test.describe("SauceDemo - Login Tests", () => {
//   // This runs before each test
//   test.beforeEach(async ({ page }) => {
//     // Navigate to login page
//     await page.goto("/");

//     // Wait for page to load
//     await expect(page.locator(".login_logo")).toBeVisible();
//   });

//   test("should login successfully with standard_user", async ({ page }) => {
//     // Fill username using data-test attribute
//     await page.locator('[data-test="username"]').fill("standard_user");

//     // Fill password
//     await page.locator('[data-test="password"]').fill("secret_sauce");

//     // Click login button
//     await page.locator('[data-test="login-button"]').click();

//     // Verify successful login
//     await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
//     await expect(page.locator(".title")).toContainText("Products");
//   });

//   test("should show error with empty username and password", async ({
//     page,
//   }) => {
//     // Click login without filling fields
//     await page.locator('[data-test="login-button"]').click();

//     // Verify error message
//     await expect(page.locator('[data-test="error"]')).toBeVisible();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username is required"
//     );
//   });

//   //---------Part 1: Valid Login Tests (6 tests)------------------

//   test("verify with valid standard_user", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText("Products");
//   });

//   test("verify login with problem_user", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("problem_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText("Products");
//   });

//   test("verify login with performance_glitch_user", async ({ page }) => {
//     await page
//       .locator('[data-test="username"]')
//       .fill("performance_glitch_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText("Products");
//   });

//   test("verify login with error_user", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("error_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText("Products");
//   });

//   test("verify login with visual_user", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("visual_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText("Products");
//   });

//   test("verify login with locked_out_user", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("locked_out_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Sorry, this user has been locked out."
//     );
//   });

//   //--------Part 2: Invalid Login Tests (7 tests)----------------

//   test("verify with empty username and password", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("");
//     await page.locator('[data-test="password"]').fill("");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username is required"
//     );
//   });

//   test("verify with only empty username", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username is required"
//     );
//   });

//   test("verify with only empty password", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("locked_out_user");
//     await page.locator('[data-test="password"]').fill("");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Password is required"
//     );
//   });

//   test("verify with invalid username", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("Test1");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username and password do not match any user in this service"
//     );
//   });

//   test("verify with invalid password", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("secret2323");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username and password do not match any user in this service"
//     );
//   });

//   test("verify username case sensitivity", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("Standard_User");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username and password do not match any user in this service"
//     );
//   });

//   test("verify password case sensitivity", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("Secret_Sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toContainText(
//       "Epic sadface: Username and password do not match any user in this service"
//     );
//   });

//   //--------Part 3: UI Validation Tests (3 tests)----------------

//   test("verify all login page elements", async ({ page }) => {
//     await expect(page.locator("#root")).toContainText("Swag Labs");
//     await expect(page.locator('[data-test="login-button"]')).toContainText(
//       "Login"
//     );
//     await expect(page.locator('[data-test="username"]')).toBeVisible();
//     await expect(page.locator('[data-test="username"]')).toHaveAttribute(
//       "placeholder",
//       "Username"
//     );
//     await expect(page.locator('[data-test="password"]')).toBeVisible();
//     await expect(page.locator('[data-test="password"]')).toHaveAttribute(
//       "placeholder",
//       "Password"
//     );
//     await expect(page.locator('[data-test="login-button"]')).toBeVisible();
//     await expect(page.locator('[data-test="login-button"]')).toHaveText(
//       "Login"
//     );
//     await expect(page.locator('[data-test="login-credentials"]')).toContainText(
//       "Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user"
//     );
//     await expect(page.locator('[data-test="login-password"]')).toContainText(
//       "Password for all users:secret_sauce"
//     );
//   });

//   test("verify password is masked", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await expect(page.locator('[data-test="password"]')).toHaveAttribute(
//       "type",
//       "password"
//     );
//   });

//   test("verify error message can be dismissed", async ({ page }) => {
//     await page.locator('[data-test="username"]').fill("standard_use");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();
//     await expect(page.locator('[data-test="error"]')).toBeVisible();
//     await page.locator('[data-test="error-button"]').click();
//     await expect(page.locator('[data-test="error"]')).not.toBeVisible();
//   });
// });
import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Login Page
 * Encapsulates all login page interactions and elements
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Perform login with username and password
   * @param username - Username to enter
   * @param password - Password to enter
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Fill only username field
   * @param username - Username to enter
   */
  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill only password field
   * @param password - Password to enter
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Verify error message is displayed with expected text
   * @param expectedText - Expected error message text
   */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /**
   * Close/dismiss the error message
   */
  async closeErrorMessage() {
    await this.errorCloseButton.click();
  }

  /**
   * Verify error message is hidden
   */
  async verifyErrorMessageHidden() {
    await expect(this.errorMessage).not.toBeVisible();
  }

  /**
   * Verify password field is masked (type="password")
   */
  async verifyPasswordIsMasked() {
    await expect(this.passwordInput).toHaveAttribute("type", "password");
  }
}