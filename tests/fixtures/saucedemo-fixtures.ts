import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/saucedemo/login-page";
import { ProductsPage } from "../pages/saucedemo/products-page";
import { CartPage } from "../pages/saucedemo/cart-page";
import { CheckoutCompletePage } from "../pages/saucedemo/checkout-complete-page";
import { CheckoutStepOnePage } from "../pages/saucedemo/checkout-step-one-page";
import { CheckoutStepTwoPage } from "../pages/saucedemo/checkout-step-two-page";

/**
 * Test credentials constants
 */
export const CREDENTIALS = {
  STANDARD_USER: { username: "standard_user", password: "secret_sauce" },
  LOCKED_USER: { username: "locked_out_user", password: "secret_sauce" },
  PROBLEM_USER: { username: "problem_user", password: "secret_sauce" },
  PERFORMANCE_GLITCH_USER: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
};

/**
 * Product identifiers constants
 */
export const PRODUCTS = {
  BACKPACK: "sauce-labs-backpack",
  BIKE_LIGHT: "sauce-labs-bike-light",
  BOLT_TSHIRT: "sauce-labs-bolt-t-shirt",
  FLEECE_JACKET: "sauce-labs-fleece-jacket",
  ONESIE: "sauce-labs-onesie",
  RED_TSHIRT: "test.allthethings()-t-shirt-(red)",
};

/**
 * Product names for verification
 */
export const PRODUCT_NAMES = {
  BACKPACK: "Sauce Labs Backpack",
  BIKE_LIGHT: "Sauce Labs Bike Light",
  BOLT_TSHIRT: "Sauce Labs Bolt T-Shirt",
  FLEECE_JACKET: "Sauce Labs Fleece Jacket",
  ONESIE: "Sauce Labs Onesie",
  RED_TSHIRT: "Test.allTheThings() T-Shirt (Red)",
};

/**
 * Customer information for checkout
 */
export const CUSTOMER_INFO = {
  FIRST_NAME: "John",
  LAST_NAME: "Doe",
  POSTAL_CODE: "12345",
};

/**
 * Extended test fixtures with page objects
 */
type SauceDemoFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  authenticatedPage: ProductsPage;
};

/**
 * Custom fixtures for SauceDemo tests
 * Automatically injects page objects into tests
 */
export const test = base.extend<SauceDemoFixtures>({
  // Login Page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Products Page fixture
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // Cart Page fixture
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Checkout Step One fixture
  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  // Checkout Step Two fixture
  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  // Checkout Complete fixture
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },

  // Authenticated Page fixture - auto-login before test
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(
      CREDENTIALS.STANDARD_USER.username,
      CREDENTIALS.STANDARD_USER.password
    );
    await productsPage.verifyProductsPageLoaded();

    await use(productsPage);
  },
});

export { expect } from "@playwright/test";
