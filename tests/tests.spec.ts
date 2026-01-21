import { expect } from '@playwright/test';
import { authTest as test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
import { ProductOverviewPage } from '../pages/productOverviewPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import dotenv from 'dotenv';

dotenv.config();

test('Login and logout successfully as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productOverviewPage = new ProductOverviewPage(page);
  
  await loginPage.goto();
  await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  await loginPage.assertLoginSuccess();
  
  await productOverviewPage.logout();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('Login unsuccessfully as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('abc', 'abc');
  await loginPage.assertLoginFailure();
});

test('Sort products overview page in alphabetical order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('az');
  await productOverviewPage.assertProductsInAlphabeticalOrder();
});

test('Sort products overview page in reverse alphabetical order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('za');
  await productOverviewPage.assertProductsInReverseAlphabeticalOrder();
});

test('Sort products overview page in ascending price order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('lohi');
  await productOverviewPage.assertProductsInAscendingPriceOrder();
});

test('Sort products overview page in descending price order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('hilo');
  await productOverviewPage.assertProductsInDescendingPriceOrder();
});

test('Add item on product overview page and remove item on product details page as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const productDetailsPage = new ProductDetailsPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.addItemToShoppingCart();
  await productOverviewPage.assertItemInShoppingCart();
  const overviewProductName = await productOverviewPage.assertProductInProductOverviewPage();
  
  await productOverviewPage.clickShoppingCart();
  await loggedInPage.waitForLoadState('domcontentloaded');
  
  const detailsProductName = await productDetailsPage.assertProductInProductDetailsPage();
  expect(overviewProductName).toBe(detailsProductName);
  await productDetailsPage.assertItemInShoppingCart();
  
  await productDetailsPage.clickRemoveButton();
  await productDetailsPage.assertShoppingCartEmpty();
})
