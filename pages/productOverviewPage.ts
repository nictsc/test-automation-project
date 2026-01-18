// pages/productOverviewPage.ts
import { Page, Locator, expect } from '@playwright/test';

// Creating the Product Overview Page object
export class ProductOverviewPage {
  readonly page: Page;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly productSortDropdown: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    // Setting up the Product Overview page
    this.page = page;

    // Creating locators on the Product Overview page
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productTitles = page.locator('[data-test$="-title-link"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]')
  }

  // Verify hamburger menu is visible
  async assertPageLoaded() {
    await expect(this.hamburgerMenu).toBeVisible();
  }

  // Selecting drop down menu options
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSortDropdown.selectOption(option);
  }

  // Inserting all the product titles into a sorting array
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

  // Inserting all the product prices into a sorting array
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

  // Logout
  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }

  
}