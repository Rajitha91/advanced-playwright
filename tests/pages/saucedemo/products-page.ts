import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Products/Inventory Page
 * Handles product listing, cart operations, and navigation
 */
export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator(".inventory_item");
  }

  /**
   * Verify user is on Products page
   */
  async verifyProductsPageLoaded() {
    await expect(this.pageTitle).toHaveText("Products");
  }

  /**
   * Add product to cart by product ID
   * @param productId - Product identifier (e.g., "sauce-labs-backpack")
   */
  async addProductToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  /**
   * Add multiple products to cart
   * @param productIds - Array of product identifiers
   */
  async addMultipleProductsToCart(productIds: string[]) {
    for (const productId of productIds) {
      await this.addProductToCart(productId);
    }
  }

  /**
   * Remove product from cart by product ID
   * @param productId - Product identifier
   */
  async removeProductFromCart(productId: string) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  /**
   * Verify cart badge shows correct count
   * @param count - Expected number of items in cart
   */
  async verifyCartCount(count: number) {
    await expect(this.shoppingCartBadge).toBeVisible();
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  /**
   * Verify cart badge is hidden (no items in cart)
   */
  async verifyCartIsEmpty() {
    await expect(this.shoppingCartBadge).toBeHidden();
  }

  /**
   * Click shopping cart to view cart page
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Verify Remove button is visible for a product
   * @param productId - Product identifier
   */
  async verifyRemoveButtonVisible(productId: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productId}"]`);
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText("Remove");
  }

  /**
   * Verify Add to Cart button is visible for a product
   * @param productId - Product identifier
   */
  async verifyAddToCartButtonVisible(productId: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${productId}"]`);
    await expect(addButton).toBeVisible();
    await expect(addButton).toHaveText("Add to cart");
  }

  /**
   * Verify specific product names are displayed
   * @param productNames - Array of expected product names
   */
  async verifyProductsDisplayed(productNames: string[]) {
    for (const productName of productNames) {
      const product = this.page.locator('[data-test="inventory-item-name"]', {
        hasText: productName,
      });
      await expect(product).toBeVisible();
    }
  }

  /**
   * Get product price by product ID
   * @param productId - Product identifier
   * @returns Price as a number
   */
  async getProductPrice(productId: string): Promise<number> {
    // Find the inventory item that contains this product's add button
    const inventoryItem = this.page.locator('.inventory_item').filter({
      has: this.page.locator(`[data-test="add-to-cart-${productId}"]`)
    });
    
    // Get the price from that inventory item
    const priceText = await inventoryItem.locator('[data-test="inventory-item-price"]').textContent();
    return parseFloat(priceText?.replace("$", "") || "0");
  }
}