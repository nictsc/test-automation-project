import { expect } from '@playwright/test';
import { authTest as test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
import { ProductOverviewPage } from '../pages/productOverviewPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { InfoPage } from '../pages/infoPage';
import { ShoppingCartPage } from '../pages/shoppingCartPage';
import dotenv from 'dotenv';


dotenv.config();

test('Login and logout successfully as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productOverviewPage = new ProductOverviewPage(page);
  
  await loginPage.goto();
  await loginPage.login(process.env.STANDARDUSERNAME!, process.env.PASSWORD!);
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

test('Add item on product overview page and remove item on Shopping Cart page as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const shoppingCartPage = new ShoppingCartPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.addItemToShoppingCart();
  await productOverviewPage.assertItemInShoppingCart();
  const overviewProductName = await productOverviewPage.getProductName();
  
  await productOverviewPage.clickShoppingCart();
  await loggedInPage.waitForLoadState('domcontentloaded');
  await shoppingCartPage.shoppingCartItemName.waitFor({ state: 'visible' });
  
  // Checking that the item name on Product Overview page and Shopping Cart page matches
  const shoppingCartProductName = await shoppingCartPage.getProductName();
  expect(overviewProductName).toBe(shoppingCartProductName);
  await shoppingCartPage.assertItemInShoppingCart();
  
  await shoppingCartPage.clickRemoveButton();
  await loggedInPage.waitForLoadState('domcontentloaded');
  await shoppingCartPage.assertShoppingCartEmpty();
});;
