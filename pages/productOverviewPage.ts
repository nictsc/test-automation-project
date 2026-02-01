// pages/productOverviewPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

// Creating the Product Overview Page object
export class ProductOverviewPage extends BasePage {
  // Declare what exists on the Product Overview page
  readonly productSortDropdown: Locator;
  readonly productPrices: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    // Set up the Product Overview page
    super(page);

    // Create unique locators on the Product Overview page
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]')
  }

  // Verify hamburger menu is visible
  async assertPageLoaded() {
    await expect(this.hamburgerMenu).toBeVisible();
  }

  // Select drop down menu options
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSortDropdown.selectOption(option);
  }

  // Insert all the product titles into a sorting array
  async getProductTitles(): Promise<string[]> {
    const locators = await this.productTitles.all();
    const titles: string[] = [];
    for (const locator of locators) {
      const text = await locator.textContent();
      if (text) {
        titles.push(text.trim());
      }
    }
    return titles;
  }

  // Insert all the product prices into a sorting array
  async getProductPrices(): Promise<string[]> {
    const locators = await this.productPrices.all();
    const prices: string[] = [];
    for (const locator of locators) {
      const text = await locator.textContent();
      if (text) {
        prices.push(text.trim());
      }
    }
    return prices;
  }

  // Assert sorting array if it has an alphabetical order
  async assertProductsInAlphabeticalOrder() {
    const titles = await this.getProductTitles();
    const isAlphabetical = titles.every((item, i) => 
      i === 0 || item >= titles[i - 1]
    );
    expect(isAlphabetical).toBe(true);
  }

  // Assert sorting array if it has a reverse alphabetical order
  async assertProductsInReverseAlphabeticalOrder() {
    const titles = await this.getProductTitles();
    const isReverseAlphabetical = titles.every((item, i) => 
      i === 0 || item <= titles[i - 1]
    );
    expect(isReverseAlphabetical).toBe(true);
  }

  // Assert sorting array if it has an ascending price order
  async assertProductsInAscendingPriceOrder() {
    const prices = await this.getProductPrices();
    // Strip currency symbols and compare numeric values
    const numericPrices = prices.map((price) => parseFloat(price.replace(/[^0-9.]/g, '')));
    const isAscendingPrice = numericPrices.every((price, i) =>
      i === 0 || price >= numericPrices[i - 1]
    );
    expect(isAscendingPrice).toBe(true);
  }

  // Assert sorting array if it has a descending price order
  async assertProductsInDescendingPriceOrder() {
    const prices = await this.getProductPrices();
    // Strip currency symbols and compare numeric values
    const numericPrices = prices.map((price) => parseFloat(price.replace(/[^0-9.]/g, '')));
    const isAscendingPrice = numericPrices.every((price, i) =>
      i === 0 || price <= numericPrices[i - 1]
    );
    expect(isAscendingPrice).toBe(true);
  }

  // Add item to shopping cart on product overview page
  async addItemToShoppingCart() {
    await this.addToCartButton.click();
  }

  // Get product name from Product Overview page
  async getProductName(): Promise<string | null> {
    const productNameLocator = this.itemTitleLink;
    await expect(productNameLocator).toBeVisible();
    const productName = await productNameLocator.textContent();
    return productName?.trim() || null;
  }

  
}