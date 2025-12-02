import { Page, Locator, expect } from "@playwright/test";

/**
 * Page Object Model for SauceDemo Checkout Step One (Customer Info)
 * Handles customer information entry
 */
export class CheckoutStepOnePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Verify user is on Checkout Step One page
   */
  async verifyCheckoutStepOneLoaded() {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  /**
   * Fill customer information
   * @param firstName - Customer's first name
   * @param lastName - Customer's last name
   * @param postalCode - Customer's postal/zip code
   */
  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click Continue to proceed to next step
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Click Cancel to go back to cart
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Fill info and continue in one step
   * @param firstName - Customer's first name
   * @param lastName - Customer's last name
   * @param postalCode - Customer's postal/zip code
   */
  async fillInfoAndContinue(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.fillCustomerInfo(firstName, lastName, postalCode);
    await this.continue();
  }
}
