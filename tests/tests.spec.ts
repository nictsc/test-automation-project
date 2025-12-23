import { expect } from '@playwright/test';
import { authTest as test } from '../fixtures/fixtures';

test('Login and logout successufully as standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="password"]').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('Login unsuccessufully as standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('abc');
  await page.locator('[data-test="password"]').fill('abc');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('path').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('Select an item and checkout as standard user', async ({ loggedInPage }) => {
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
