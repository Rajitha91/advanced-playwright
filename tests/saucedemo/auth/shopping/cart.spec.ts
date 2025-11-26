import { test, expect, Locator } from "@playwright/test";
let badge: Locator;

// Credentials
const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";

// Product identifiers as constants for maintainability
const PRODUCT_BACKPACK = "sauce-labs-backpack";
const PRODUCT_BIKE_LIGHT = "sauce-labs-bike-light";
const PRODUCT_TSHIRT = "sauce-labs-bolt-t-shirt";
const PRODUCTS = [
  "sauce-labs-backpack",
  "sauce-labs-bike-light",
  "sauce-labs-bolt-t-shirt",
  "sauce-labs-fleece-jacket",
  "sauce-labs-onesie",
  "test.allthethings()-t-shirt-(red)",
];

// Selector constants and small helpers
const SELECTOR_CART_BADGE = '[data-test="shopping-cart-badge"]';
const cartBadge = (page: any) => page.locator(SELECTOR_CART_BADGE);

// selector builders and action helpers
const addSelector = (id: string) => `[data-test="add-to-cart-${id}"]`;
const removeSelector = (id: string) => `[data-test="remove-${id}"]`;
const addProduct = async (page: any, id: string) => {
  await page.locator(addSelector(id)).click();
};
const addProducts = async (page: any, ids: string[]) => {
  for (const id of ids) {
    await addProduct(page, id);
  }
};

const expectCartCount = async (page: any, n: number) => {
  const b = cartBadge(page);
  await expect(b).toBeVisible();
  await expect(b).toHaveText(String(n));
};

test.describe("Shopping Cart - Valid Scenarios", () => {
  // This runs before EACH test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".title")).toContainText("Products");
    badge = cartBadge(page);
  });

  //---------Part 1: Valid Shopping Cart Tests (8 tests)------------------

  test("verify adding single item to cart", async ({ page }) => {
    await addProduct(page, PRODUCT_BACKPACK);
    await expectCartCount(page, 1);
    await expect(
      page.locator(`[data-test="remove-${PRODUCT_BACKPACK}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`[data-test="remove-${PRODUCT_BACKPACK}"]`)
    ).toHaveText("Remove");
  });

  test("verify multiple items to cart", async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    // add items
    await addProducts(page, [
      PRODUCT_BACKPACK,
      PRODUCT_BIKE_LIGHT,
      PRODUCT_TSHIRT,
    ]);
    await expectCartCount(page, 3);
  });

  test("verify remove item from inventory page", async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    await page.locator(`[data-test="add-to-cart-${PRODUCT_BACKPACK}"]`).click();
    await expect(
      page.locator(`[data-test="remove-${PRODUCT_BACKPACK}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`[data-test="remove-${PRODUCT_BACKPACK}"]`)
    ).toHaveText("Remove");
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(badge).toHaveCount(0);
    await expect(badge).toBeHidden();
    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    ).toHaveText("Add to cart");
  });

  test("verify Continue shopping from cart", async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    await page.locator(`[data-test="add-to-cart-${PRODUCT_BACKPACK}"]`).click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  });

  test("verify Cart persists across pages", async ({ page }) => {
    // add item
    await addProduct(page, PRODUCT_BACKPACK);
    await expectCartCount(page, 1);

    // navigate to another page (example: open menu and go to About)
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="about-sidebar-link"]').click();

    // confirm navigation occurred (external or internal)
    await expect(page).not.toHaveURL("**/inventory.html");
    await page.goto("/inventory.html");

    // ensure cart persisted
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText("1");

    // extra: verify persistence after reload
    await page.reload();
    await expect(badge).toHaveText("1");
  });

  test("verify when adding all items to cart", async ({ page }) => {
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    await addProducts(page, PRODUCTS);
    await expectCartCount(page, PRODUCTS.length);
  });
});

//---------Part 2: Negative Shopping Cart Tests (5 tests)------------------
test.describe("Shopping Cart - Negative Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    // ensure we're on the base/login page so login locators are available
    await page.goto("/");
    // prepare badge locator for negative tests
    badge = cartBadge(page);
  });
  test("verify Cart without login should redirect to login page", async ({
    page,
  }) => {
    // Try to access cart directly without authenticating
    await page.goto("/cart.html");

    // Expect to be redirected to the login page: check for username field
    await expect(page.locator('[data-test="username"]')).toBeVisible();
  });

  test("verify Empty cart checkout behavior", async ({ page }) => {
    // Login
    await page.locator('[data-test="username"]').fill(USERNAME);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    // Ensure cart is empty (badge absent/hidden)
    // badge is initialized in beforeEach
    await expect(badge).toHaveCount(0);

    // Go to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Verify there are no cart items
    const items = page.locator(".cart_item");
    await expect(items).toHaveCount(0);

    // Verify checkout button is not enabled (either absent or disabled)
    const checkout = page.locator('[data-test="checkout"]');
    const checkoutCount = await checkout.count();
    if (checkoutCount === 0) {
      // no checkout button present
      await expect(checkout).toHaveCount(0);
    } else {
      // button exists — ensure it's disabled
      await expect(checkout).toBeDisabled();
    }
  });

  test("verify Invalid cart item handling", async ({ page }) => {
    // Login first
    await page.locator('[data-test="username"]').fill(USERNAME);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    // Try to access an invalid cart item URL
    await page.goto("/cart.html?item=non-existent");

    // Allow a short time for the app to react
    await page.waitForTimeout(500);

    // Check for one of expected behaviors: redirect to inventory, 404/not found text, or an error banner
    const url = page.url();
    const redirectedToInventory =
      /\/inventory\.html$/.test(url) || url.includes("/inventory.html");
    const notFoundCount = await page.locator("text=not found").count();
    const errorBannerCount = await page
      .locator('[data-test="error"], .error, .alert-danger')
      .count();

    if (
      !redirectedToInventory &&
      notFoundCount === 0 &&
      errorBannerCount === 0
    ) {
      throw new Error(
        "Invalid cart item did not produce expected error handling (no redirect, no not-found text, no error banner)."
      );
    }
  });

  test("verify problem_user has broken product images", async ({ page }) => {
    // Login as problem_user
    await page.locator('[data-test="username"]').fill("problem_user");
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");

    // Collect product images (inventory item images)
    const images = page.locator(".inventory_item img, img.inventory_item_img");
    const total = await images.count();
    await expect(total).toBeGreaterThan(0);

    // Evaluate image naturalWidth and src for each image
    const infos = await images.evaluateAll((nodes: HTMLImageElement[]) =>
      nodes.map((n) => ({
        src: n.getAttribute("src"),
        naturalWidth: n.naturalWidth,
      }))
    );

    const broken = infos.filter((i) => !i.naturalWidth || i.naturalWidth === 0);

    // Log broken image URLs for documentation / report
    if (broken.length > 0) {
      // eslint-disable-next-line no-console
      console.log("Broken images detected for problem_user:");
      for (const b of broken) console.log(` - ${b.src}`);
    }

    // Expect at least one broken image for problem_user
    await expect(broken.length).toBeGreaterThan(0);
  });

  test("verify cart badge hides when no items", async ({ page }) => {
    await page.locator('[data-test="username"]').fill(USERNAME);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();

    // Initially the cart should be empty — badge not present
    await expect(badge).toHaveCount(0);

    // Add an item then remove it
    await addProduct(page, PRODUCT_BACKPACK);
    await expectCartCount(page, 1);

    // Remove the item
    await page.locator(removeSelector(PRODUCT_BACKPACK)).click();

    // Badge should disappear (either removed from DOM or hidden)
    await expect(badge).toHaveCount(0);
    await expect(badge).toBeHidden();
  });
});
