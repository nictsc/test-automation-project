import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // Declare what exists on all pages that inherits the base page
  readonly page: Page;
  readonly shoppingCartIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly productTitles: Locator;
  readonly sauceLabsBackpackTitle: Locator;
  readonly removeButton: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.productTitles = page.locator('[data-test$="-title-link"]'); // $= operator "ends with"
    this.sauceLabsBackpackTitle = page.locator('[data-test="item-4-title-link"]');
    this.removeButton = page.locator('[data-test^="remove"]'); // ^ is a prefix match operator "starts with"
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // Assert hamburger menu is visible
  async assertPageLoaded() {
    await expect(this.hamburgerMenu).toBeVisible();
    console.log("menu is visible.")
  }

  // Assert shopping cart is visible
  async assertShoppingCartVisible() {
    await expect(this.shoppingCartIcon).toBeVisible();
  }

  // Assert item is in shopping cart (badge is visible)
  async assertItemInShoppingCart() {
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeVisible();
  }

  // Assert shopping cart is empty (badge is not visible)
  async assertShoppingCartEmpty() {
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).not.toBeVisible();
  }

  // Click shopping cart icon
  async clickShoppingCart() {
    await this.shoppingCartIcon.click();
  }

  // Get product name from Base page
  async assertProductName(): Promise<string | null> {
    const productNameLocator = this.sauceLabsBackpackTitle.first();
    await expect(productNameLocator).toBeVisible();
    const productName = await productNameLocator.textContent();
    return productName?.trim() || null;
  }
  
  // Logout
  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }
}
