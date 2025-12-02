import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Login Page
 * Encapsulates all login page interactions and elements
 */
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
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
  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }

  /**
   * Fill only username field
   * @param user - Username to enter
   */
  async fillUsername(user: string) {
    await this.username.fill(user);
  }

  /**
   * Fill only password field
   * @param pass - Password to enter
   */
  async fillPassword(pass: string) {
    await this.password.fill(pass);
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
    await expect(this.password).toHaveAttribute("type", "password");
  }
}
