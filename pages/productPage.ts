// pages/productOverviewPage.ts
import { Page, Locator, expect } from '@playwright/test';

// Creating the Product Overview Page object
export class ProductOverviewPage {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly productSortDropdown: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    // Setting up the Product Overview page
    this.page = page;

    // Creating locators on the Product Overview page
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productTitles = page.locator('[data-test$="-title-link"]');
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

  async logout() {
    await this.openMenuButton.click();
    await this.logoutLink.click();
  }

  async assertPageLoaded() {
    await expect(this.openMenuButton).toBeVisible();
  }
}