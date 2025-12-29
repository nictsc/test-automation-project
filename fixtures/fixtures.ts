// Import Playwright's base test
import { test as base, Page } from '@playwright/test';
// Import Page Object
import { LoginPage } from '../pages/loginPage';

// Read env vars once
const USERNAME = process.env.SAUCE_USERNAME;
const PASSWORD = process.env.SAUCE_PASSWORD;

if (!USERNAME || !PASSWORD) {
  throw new Error(
    'Missing SAUCE_USERNAME or SAUCE_PASSWORD. Check your .env file.'
  );
}


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
    await loginPage.login(USERNAME, PASSWORD);
    await loginPage.assertLoginSuccess();

    // Passing in the logged-in stage to test    
    await use(page);

    // Test clean up
    await context.close();
  },
});