// tests/checkout.spec.ts
import { test, expect } from '../fixtures/fixtures.ts';

test('select an item and checkout', async ({ loggedInPage }) => {
  const page = loggedInPage;

  // Verify page loaded
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

  // Sort products and add to cart
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  // Go to cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.getByText('Continue ShoppingCheckout').click();

  // Checkout
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('Data');
  await page.locator('[data-test="postalCode"]').fill('123456');
  await page.locator('[data-test="continue"]').click();

  // Verify still logged in
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

  // Finish checkout
  await page.locator('[data-test="finish"]').click();
});
