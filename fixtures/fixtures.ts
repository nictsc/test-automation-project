import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.ts';

type AuthFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USERNAME || 'standard_user',
      process.env.SAUCE_PASSWORD || 'secret_sauce'
    );
    await loginPage.assertLoginSuccess();

    await use(page); // pass the logged-in page to the test

    await context.close();
  }
});

export { expect } from '@playwright/test';