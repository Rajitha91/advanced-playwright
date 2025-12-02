import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Cart Page
 * Handles cart items, navigation, and checkout initiation
 */
export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
  }

  /**
   * Verify user is on Cart page
   */
  async verifyCartPageLoaded() {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.pageTitle).toHaveText("Your Cart");
  }

  /**
   * Verify number of items in cart
   * @param count - Expected number of items
   */
  async verifyCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  /**
   * Verify specific product is in cart
   * @param productName - Name of the product
   */
  async verifyProductInCart(productName: string) {
    const product = this.page.locator('[data-test="inventory-item-name"]', {
      hasText: productName,
    });
    await expect(product).toBeVisible();
  }

  /**
   * Remove product from cart
   * @param productId - Product identifier
   */
  async removeProductFromCart(productId: string) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  /**
   * Click Checkout button to proceed
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Click Continue Shopping to go back to products
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Get product price from cart
   * @param productId - Product identifier
   * @returns Price as a number
   */
  async getProductPriceInCart(productId: string): Promise<number> {
    const cartItem = this.page.locator(".cart_item").filter({
      has: this.page.locator(`[data-test="remove-${productId}"]`),
    });

    const priceText = await cartItem
      .locator('[data-test="inventory-item-price"]')
      .textContent();
    return parseFloat(priceText?.replace("$", "") || "0");
  }
}
