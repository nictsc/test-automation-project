import { Page, Locator,expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ShoppingCartPage extends BasePage {
  // Declare what exists on the Shopping Cart page
  readonly shoppingCartItemName: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: Locator;


  constructor(page: Page) {
    // Set up the Shopping Cart page
    super(page);

    // Create unique locators on the Shopping Cart page
    this.shoppingCartItemName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButton = page.locator('[data-test^="remove-"]'); // ^- is a prefix match operator "starts with"
  }

  // Click on Checkout Button
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  // Click on Continue Shopping Button
  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  // Click on Remove Button
  async clickRemoveButton() {
    await this.removeButton.click();
  }

  // Assert item title is visible in cart
  async assertItemTitleVisible() {
    await expect(this.sauceLabsBackpackTitle).toBeVisible();
  }
  
}