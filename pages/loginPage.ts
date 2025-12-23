import { Page, Locator, expect } from '@playwright/test';

// Creating the Login Page object
export class LoginPage {
  // Declaring what exists on the Login page
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    // Setting up the Login page
    this.page = page;
    // Creating locators on the Login page
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigating to Login page
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Executing login actions
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Asserting the signs of a successful login
  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  // Asserting the signs of an unsuccessful login
  async assertLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }
}