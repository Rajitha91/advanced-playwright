import {
  test,
  expect,
  CREDENTIALS,
  PRODUCT_NAMES,
} from "../../../fixtures/saucedemo-fixtures";

/**
 * Login Tests using Page Object Model and Custom Fixtures
 * These tests demonstrate clean test code using fixtures
 */
test.describe("Login Tests - Using POM", () => {
  test("should login successfully with standard_user", async ({
    loginPage,
    productsPage,
  }) => {
    // Arrange & Act
    await loginPage.login(
      CREDENTIALS.STANDARD_USER.username,
      CREDENTIALS.STANDARD_USER.password
    );

    // Assert
    await productsPage.verifyProductsPageLoaded();
  });

  test("should display 6 products after successful login", async ({
    loginPage,
    productsPage,
  }) => {
    // Arrange & Act
    await loginPage.login(
      CREDENTIALS.STANDARD_USER.username,
      CREDENTIALS.STANDARD_USER.password
    );

    // Assert
    await productsPage.verifyProductsPageLoaded();
    await productsPage.verifyProductsDisplayed([
      PRODUCT_NAMES.BACKPACK,
      PRODUCT_NAMES.BIKE_LIGHT,
      PRODUCT_NAMES.BOLT_TSHIRT,
      PRODUCT_NAMES.FLEECE_JACKET,
      PRODUCT_NAMES.ONESIE,
      PRODUCT_NAMES.RED_TSHIRT,
    ]);
  });

  test("should show error with empty username", async ({ loginPage }) => {
    // Arrange
    const expectedError = "Epic sadface: Username is required";

    // Act
    await loginPage.fillPassword(CREDENTIALS.STANDARD_USER.password);
    await loginPage.clickLogin();

    // Assert
    await loginPage.verifyErrorMessage(expectedError);
  });

  test("should show error with empty password", async ({ loginPage }) => {
    // Arrange
    const expectedError = "Epic sadface: Password is required";

    // Act
    await loginPage.fillUsername(CREDENTIALS.STANDARD_USER.username);
    await loginPage.clickLogin();

    // Assert
    await loginPage.verifyErrorMessage(expectedError);
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    // Arrange
    const expectedError =
      "Epic sadface: Username and password do not match any user in this service";

    // Act
    await loginPage.login("invalid_user", "wrong_password");

    // Assert
    await loginPage.verifyErrorMessage(expectedError);
  });

  test("should show error with locked_out_user", async ({ loginPage }) => {
    // Arrange
    const expectedError = "Epic sadface: Sorry, this user has been locked out.";

    // Act
    await loginPage.login(
      CREDENTIALS.LOCKED_USER.username,
      CREDENTIALS.LOCKED_USER.password
    );

    // Assert
    await loginPage.verifyErrorMessage(expectedError);
  });

  test("should be able to dismiss error message", async ({ loginPage }) => {
    // Arrange & Act
    await loginPage.login("invalid_user", CREDENTIALS.STANDARD_USER.password);
    await loginPage.verifyErrorMessage("Epic sadface");

    // Act
    await loginPage.closeErrorMessage();

    // Assert
    await loginPage.verifyErrorMessageHidden();
  });

  test("should mask password input field", async ({ loginPage }) => {
    // Arrange
    await loginPage.fillPassword(CREDENTIALS.STANDARD_USER.password);

    // Assert
    await loginPage.verifyPasswordIsMasked();
  });

  // ========== Extended Test Cases (Part 4) ==========

  test("should login successfully with problem_user", async ({
    loginPage,
    productsPage,
  }) => {
    // Arrange & Act
    await loginPage.login(
      CREDENTIALS.PROBLEM_USER.username,
      CREDENTIALS.PROBLEM_USER.password
    );

    // Assert
    await productsPage.verifyProductsPageLoaded();
    // Note: problem_user may have image issues, but login should succeed
  });
});
