import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

//---------Part 1: Valid Login Tests (6 tests)------------------

test("verify with valid standard_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});

test("verify login with problem_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("problem_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("verify login with performance_glitch_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("performance_glitch_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("verify login with error_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("error_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("verify login with visual_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("visual_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("verify login with locked_out_user", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

//--------Part 2: Invalid Login Tests (7 tests)----------------

test("verify with empty username and password", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("");
  await page.locator('[data-test="password"]').fill("");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username is required"
  );
});

test("verify with only empty username", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username is required"
  );
});

test("verify with only empty password", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("locked_out_user");
  await page.locator('[data-test="password"]').fill("");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Password is required"
  );
});

test("verify with invalid username", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("Test1");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("verify with invalid password", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret2323");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("verify username case sensitivity", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("Standard_User");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("verify password case sensitivity", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("Secret_Sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//--------Part 3: UI Validation Tests (3 tests)----------------

test("verify all login page elements", async ({ page }) => {
  await expect(page.locator("#root")).toContainText("Swag Labs");
  await expect(page.locator('[data-test="login-button"]')).toContainText(
    "Login"
  );
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="username"]')).toHaveAttribute(
    "placeholder",
    "Username"
  );
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toHaveAttribute(
    "placeholder",
    "Password"
  );
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toHaveText("Login");
  await expect(page.locator('[data-test="login-credentials"]')).toContainText(
    "Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user"
  );
  await expect(page.locator('[data-test="login-password"]')).toContainText(
    "Password for all users:secret_sauce"
  );
});

test("verify password is masked", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await expect(page.locator('[data-test="password"]')).toHaveAttribute(
    "type",
    "password"
  );
});

test("verify error message can be dismissed", async ({ page }) => {
  await page.locator('[data-test="username"]').fill("standard_use");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await page.locator('[data-test="error-button"]').click();
  await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});
