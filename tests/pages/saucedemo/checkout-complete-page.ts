import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Checkout Complete Page
 * Handles order confirmation
 */
export class CheckoutCompletePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Verify user is on Checkout Complete page
   */
  async verifyCheckoutCompleteLoaded() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
  }

  /**
   * Verify success message is displayed
   */
  async verifySuccessMessage() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
    await expect(this.completeText).toContainText(
      "Your order has been dispatched"
    );
  }

  /**
   * Click Back Home button
   */
  async goBackHome() {
    await this.backHomeButton.click();
  }
}
