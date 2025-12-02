import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Checkout Step Two (Overview)
 * Handles order review and confirmation
 */
export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator(".cart_item");
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * Verify user is on Checkout Step Two page
   */
  async verifyCheckoutStepTwoLoaded() {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
  }

  /**
   * Get subtotal amount from page
   * @returns Subtotal as a number
   */
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    const match = text?.match(/Item total: \$(\d+\.?\d*)/);
    return parseFloat(match?.[1] || "0");
  }

  /**
   * Get tax amount from page
   * @returns Tax as a number
   */
  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    const match = text?.match(/Tax: \$(\d+\.?\d*)/);
    return parseFloat(match?.[1] || "0");
  }

  /**
   * Get total amount from page
   * @returns Total as a number
   */
  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    const match = text?.match(/Total: \$(\d+\.?\d*)/);
    return parseFloat(match?.[1] || "0");
  }

  /**
   * Verify subtotal matches expected amount
   * @param expectedAmount - Expected subtotal
   */
  async verifySubtotal(expectedAmount: number) {
    const subtotal = await this.getSubtotal();
    expect(subtotal).toBe(expectedAmount);
  }

  /**
   * Verify item is displayed in overview
   * @param productName - Name of the product
   */
  async verifyProductInOverview(productName: string) {
    const product = this.page.locator('[data-test="inventory-item-name"]', {
      hasText: productName,
    });
    await expect(product).toBeVisible();
  }

  /**
   * Click Finish to complete order
   */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /**
   * Click Cancel to go back
   */
  async cancel() {
    await this.cancelButton.click();
  }
}
