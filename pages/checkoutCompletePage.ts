import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutCompletePage extends BasePage {
  // Declare what exists on the Info page
  readonly greenTick: Locator;
  readonly thankYouHeader: Locator;
  readonly confirmationText: Locator;

  constructor(page: Page) {
    // Set up the Product Details page
    super(page);

    // Create unique locators on the Info page
    this.greenTick = page.locator('[data-test="pony-express"]');
    this.thankYouHeader = page.locator('[data-test="complete-header"]');
    this.confirmationText = page.locator('[data-test="complete-text"]');
  }

  async expectSuccessfulOrder() {
    const greenTick = this.page.locator('[data-test="pony-express"]');
    const thankYouHeader = this.page.locator('[data-test="complete-header"]');
    const confirmationText = this.page.locator('[data-test="complete-text"]');
    await expect(greenTick).toBeVisible();
    await expect(thankYouHeader).toBeVisible();
    await expect(confirmationText).toBeVisible();
  }
}