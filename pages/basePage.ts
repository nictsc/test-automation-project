import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  // Declare what exists on all pages that inherits the base page
  readonly page: Page;
  readonly shoppingCartIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly productTitles: Locator;
  readonly itemTitleLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.productTitles = page.locator('[data-test$="-title-link"]');
    this.itemTitleLink = page.locator('[data-test="item-4-title-link"]');
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

  // Logout
  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }
}
