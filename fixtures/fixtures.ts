// Import Playwright's base test
import { test as base, Page } from '@playwright/test';
// Import Page Object
import { LoginPage } from '../pages/loginPage';

// Create custom test with the name authTest
export const authTest = base.extend<{
  loggedInPage: Page;
}>({

  // Define fixture logic
  loggedInPage: async ({ browser }, use) => {

    // Create new browser session
    const context = await browser.newContext();
    const page = await context.newPage();

    // Logging in using Page Object
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USERNAME || 'standard_user',
      process.env.SAUCE_PASSWORD || 'secret_sauce'
    );
    await loginPage.assertLoginSuccess();

    // Passing in the logged-in stage to test    
    await use(page);

    // Test clean up
    await context.close();
  },
});