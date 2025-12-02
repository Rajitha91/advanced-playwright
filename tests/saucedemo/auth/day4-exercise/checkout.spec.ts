import {
  test,
  expect,
  PRODUCTS,
  PRODUCT_NAMES,
  CUSTOMER_INFO,
} from "../../../fixtures/saucedemo-fixtures";

/**
 * Checkout Tests using Page Object Model and Custom Fixtures
 * These tests demonstrate E2E checkout flows with POM pattern
 */
test.describe("Checkout Flow Tests - Using POM", () => {
  test("should complete checkout with single product", async ({
    authenticatedPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // Arrange
    const productsPage = authenticatedPage;

    // Act - Add product to cart
    await productsPage.addProductToCart(PRODUCTS.BACKPACK);
    await productsPage.verifyCartCount(1);

    // Act - Navigate to cart
    await productsPage.goToCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyProductInCart(PRODUCT_NAMES.BACKPACK);

    // Act - Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.verifyCheckoutStepOneLoaded();

    // Act - Fill customer information
    await checkoutStepOnePage.fillInfoAndContinue(
      CUSTOMER_INFO.FIRST_NAME,
      CUSTOMER_INFO.LAST_NAME,
      CUSTOMER_INFO.POSTAL_CODE
    );

    // Assert - Verify overview
    await checkoutStepTwoPage.verifyCheckoutStepTwoLoaded();
    await checkoutStepTwoPage.verifyProductInOverview(PRODUCT_NAMES.BACKPACK);

    // Act - Complete order
    await checkoutStepTwoPage.finishCheckout();

    // Assert - Verify success
    await checkoutCompletePage.verifyCheckoutCompleteLoaded();
    await checkoutCompletePage.verifySuccessMessage();
  });

  test("should complete checkout with multiple products", async ({
    authenticatedPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // Arrange
    const productsPage = authenticatedPage;
    const productsToAdd = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT];

    // Act - Add multiple products
    await productsPage.addMultipleProductsToCart(productsToAdd);
    await productsPage.verifyCartCount(2);

    // Act - Navigate to cart
    await productsPage.goToCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartItemCount(2);
    await cartPage.verifyProductInCart(PRODUCT_NAMES.BACKPACK);
    await cartPage.verifyProductInCart(PRODUCT_NAMES.BIKE_LIGHT);

    // Act - Checkout flow
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillInfoAndContinue(
      CUSTOMER_INFO.FIRST_NAME,
      CUSTOMER_INFO.LAST_NAME,
      CUSTOMER_INFO.POSTAL_CODE
    );

    // Assert - Verify overview
    await checkoutStepTwoPage.verifyCheckoutStepTwoLoaded();
    await checkoutStepTwoPage.verifyProductInOverview(PRODUCT_NAMES.BACKPACK);
    await checkoutStepTwoPage.verifyProductInOverview(PRODUCT_NAMES.BIKE_LIGHT);

    // Act - Complete
    await checkoutStepTwoPage.finishCheckout();
    await checkoutCompletePage.verifyCheckoutCompleteLoaded();
    await checkoutCompletePage.verifySuccessMessage();
  });

  test("should add and remove product from cart", async ({
    authenticatedPage,
    cartPage,
  }) => {
    // Arrange
    const productsPage = authenticatedPage;

    // Act - Add product
    await productsPage.addProductToCart(PRODUCTS.BACKPACK);
    await productsPage.verifyCartCount(1);
    await productsPage.verifyRemoveButtonVisible(PRODUCTS.BACKPACK);

    // Act - Remove product
    await productsPage.removeProductFromCart(PRODUCTS.BACKPACK);

    // Assert
    await productsPage.verifyCartIsEmpty();
    await productsPage.verifyAddToCartButtonVisible(PRODUCTS.BACKPACK);
  });

  test("should navigate back to products from cart", async ({
    authenticatedPage,
    cartPage,
    productsPage,
  }) => {
    // Arrange
    const authProductsPage = authenticatedPage;

    // Act - Add product and go to cart
    await authProductsPage.addProductToCart(PRODUCTS.BACKPACK);
    await authProductsPage.goToCart();
    await cartPage.verifyCartPageLoaded();

    // Act - Continue shopping
    await cartPage.continueShopping();

    // Assert
    await expect(authProductsPage.page).toHaveURL(/\/inventory\.html$/);
    await authProductsPage.verifyProductsPageLoaded();
  });

  // ========== Extended Test Cases (Part 4) ==========

  test("should cancel checkout from step one and return to cart", async ({
    authenticatedPage,
    cartPage,
    checkoutStepOnePage,
  }) => {
    // Arrange
    const productsPage = authenticatedPage;

    // Act - Add product and proceed to checkout
    await productsPage.addProductToCart(PRODUCTS.BACKPACK);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.verifyCheckoutStepOneLoaded();

    // Act - Cancel checkout
    await checkoutStepOnePage.cancel();

    // Assert - Should be back at cart
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyProductInCart(PRODUCT_NAMES.BACKPACK);
  });

  test("should verify item total matches product prices", async ({
    authenticatedPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    // Arrange
    const productsPage = authenticatedPage;
    const productsToAdd = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT];

    // Act - Get product prices from products page
    const backpackPrice = await productsPage.getProductPrice(PRODUCTS.BACKPACK);
    const bikeLightPrice = await productsPage.getProductPrice(
      PRODUCTS.BIKE_LIGHT
    );
    const expectedTotal = backpackPrice + bikeLightPrice;

    // Act - Add products and proceed to checkout overview
    await productsPage.addMultipleProductsToCart(productsToAdd);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillInfoAndContinue(
      CUSTOMER_INFO.FIRST_NAME,
      CUSTOMER_INFO.LAST_NAME,
      CUSTOMER_INFO.POSTAL_CODE
    );

    // Assert - Verify subtotal matches
    await checkoutStepTwoPage.verifyCheckoutStepTwoLoaded();
    await checkoutStepTwoPage.verifySubtotal(expectedTotal);

    // Additional verification - total should be subtotal + tax
    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});
