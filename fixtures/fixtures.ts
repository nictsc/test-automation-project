// Import Playwright's base test
import { test as base, Page } from '@playwright/test';
// Import Page Object
import { LoginPage } from '../pages/loginPage';
// Load environment variables from .env if present
import 'dotenv/config';

// Read env vars once
const USERNAME = process.env.STANDARDUSERNAME;
const PASSWORD = process.env.PASSWORD;

// Add authenticated state for testing
export const authTest = base.extend<{
  loggedInPage: Page;
}>({
  // Define fixture logic
  loggedInPage: async ({ browser }, use) => {
    // Ensure credentials exist only when this fixture is used
    if (!USERNAME || !PASSWORD) {
      throw new Error('Missing STANDARDUSERNAME or PASSWORD environment variables. Check your .env file.');
    }

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