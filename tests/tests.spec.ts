import { expect } from '@playwright/test';
import { authTest as test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/loginPage';
import { ProductOverviewPage } from '../pages/productPage';
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

test('Sort products page in alphabetical order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('az');
  await productOverviewPage.assertProductsInAlphabeticalOrder();
});

test('Sort products page in reverse alphabetical order as standard user', async ({ loggedInPage }) => {
  const productOverviewPage = new ProductOverviewPage(loggedInPage);
  
  await productOverviewPage.assertPageLoaded();
  await productOverviewPage.sortProducts('za');
  await productOverviewPage.assertProductsInReverseAlphabeticalOrder();
});