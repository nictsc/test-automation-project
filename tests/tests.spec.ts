import { expect } from '@playwright/test';
import { authTest as test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
import { ProductOverviewPage } from '../pages/productOverviewPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';
import { InfoPage } from '../pages/infoPage';
import { ShoppingCartPage } from '../pages/shoppingCartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

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

  await productOverviewPage.sortProducts('az');
  await productOverviewPage.assertProductsInAlphabeticalOrder();
});

test('Sort products overview page in reverse alphabetical order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);

  await productOverviewPage.sortProducts('za');
  await productOverviewPage.assertProductsInReverseAlphabeticalOrder();
});

test('Sort products overview page in ascending price order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);

  await productOverviewPage.sortProducts('lohi');
  await productOverviewPage.assertProductsInAscendingPriceOrder();
});

test('Sort products overview page in descending price order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);

  await productOverviewPage.sortProducts('hilo');
  await productOverviewPage.assertProductsInDescendingPriceOrder();
});

test('Add and remove item on Product Overview page as standard user', async ({ loggedInPage})=> {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);

  await productOverviewPage.addItem();
  await productOverviewPage.removeItem();
});


test('Add item on Product Overview page and remove item on Product Details page as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const productDetailsPage = new ProductDetailsPage(loggedInPage);
  
  await productOverviewPage.addItem();
  const overviewProductName = await productOverviewPage.assertProductName();
  console.log(`The product name in the Product Overview page is ${overviewProductName}.`);
  await productOverviewPage.clickProductName();
  await loggedInPage.waitForLoadState('domcontentloaded');
  
  // Checking that the item name on Product Overview page and Product Details page matches
  const detailsProductName = await productDetailsPage.assertProductNameInProductDetailsPage();
  console.log(`The product name in the Product Details page is ${detailsProductName}.`)
  expect(overviewProductName).toBe(detailsProductName);
  await productDetailsPage.assertItemInShoppingCart();
  
  await productDetailsPage.clickRemoveButton();
  await loggedInPage.waitForLoadState('domcontentloaded');
  await productDetailsPage.assertShoppingCartEmpty();
});

test('Add item on Product Overview page and remove item on Shopping Cart page as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const shoppingCartPage = new ShoppingCartPage(loggedInPage);
  
  await productOverviewPage.addItem();
  const overviewProductName = await productOverviewPage.assertProductName();
  console.log(`The product name in the Product Overview page is ${overviewProductName}.`);

  await productOverviewPage.clickShoppingCart();
  await loggedInPage.waitForLoadState('domcontentloaded');
  await shoppingCartPage.shoppingCartItemName.waitFor({ state: 'visible' });
  
  // Checking that the item name on Product Overview page and Shopping Cart page matches
  const shoppingCartProductName = await shoppingCartPage.assertProductName();
  console.log(`The product name in the Shopping Cart page is ${shoppingCartProductName}.`)
  expect(overviewProductName).toBe(shoppingCartProductName);
  await shoppingCartPage.assertItemInShoppingCart();
  
  await shoppingCartPage.clickRemoveButton();
  await loggedInPage.waitForLoadState('domcontentloaded');
  await shoppingCartPage.assertShoppingCartEmpty();
});

test('Add incomplete or blank information on Info page as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const shoppingCartPage = new ShoppingCartPage(loggedInPage);
  const infoPage = new InfoPage(loggedInPage);

  await productOverviewPage.addItem();
  await productOverviewPage.clickShoppingCart();
  await shoppingCartPage.clickCheckoutButton();
  await infoPage.blankFirstName();
  await infoPage.blankLastName();
  await infoPage.blankPostalCode();
  await infoPage.blankFields()
});

test('Buy backpack as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  const shoppingCartPage = new ShoppingCartPage(loggedInPage);
  const infoPage = new InfoPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);
  const checkoutCompletePage = new CheckoutCompletePage(loggedInPage);

  await productOverviewPage.addItem();
  const selectedItemsTotal = await productOverviewPage.getSelectedItemsTotal();
  await productOverviewPage.clickShoppingCart();
  await shoppingCartPage.clickCheckoutButton();
  await infoPage.completedFields();
  await checkoutPage.assertSubtotalMatchesSelectedItemsTotal(selectedItemsTotal);
  await checkoutPage.clickFinishButton();
  await checkoutCompletePage.expectSuccessfulOrder();
});