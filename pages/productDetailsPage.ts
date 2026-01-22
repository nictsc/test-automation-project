import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductDetailsPage extends BasePage {
  // Declare what exists on the Product Details page
  readonly inventoryDetailsName: Locator;
  readonly inventoryDetailsPrice: Locator;
  readonly inventoryDetailsDescription: Locator;
  readonly removeButton: Locator;
  readonly backtToProducts:Locator;

   constructor(page: Page) {
    // Set up the Product Details page
    super(page);

    // Create unique locators on the Product Details page
    this.inventoryDetailsName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryDetailsPrice = page.locator('[data-test="inventory-item-price"]');
    this.inventoryDetailsDescription = page.locator('[data-test="inventory-item-desc"]');
    this.removeButton = page.locator('[data-test^="remove-"]');
    this.backtToProducts = page.locator('[data-test="back-to-products"]')
  }

  // Click remove button
  async clickRemoveButton() {
    await this.removeButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.removeButton.click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Click back to products
  async clickBackToProducts() {
    await this.backtToProducts.click();
  }

  // Assert item title is visible in cart
  async assertItemTitleVisible() {
    await expect(this.itemTitleLink).toBeVisible();
  }

  // Click inventory item price
  async clickInventoryPrice() {
    await this.inventoryDetailsPrice.click();
  }

  // Assert product in product details page and return name
  async assertProductInProductDetailsPage(): Promise<string | null> {
    const productNameLocator = this.itemTitleLink;
    await expect(productNameLocator).toBeVisible();
    const productName = await productNameLocator.textContent();
    return productName?.trim() || null;
  }

  
}
