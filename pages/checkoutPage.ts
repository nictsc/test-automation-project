import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  // Declare what exists on the Checkout page
  readonly finishButton: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalInfoValue: Locator;
  readonly subTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;


  constructor(page: Page) {
    // Set up the Checkout page
    super(page);

    // Create unique locators on the Checkout page
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-value"]');
    this.paymentInfoValue = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.totalInfoValue = page.locator('[data-test="total-info-label"]');
    this.subTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
  }

  // Assert the total price of selected items match the item total on checkout page
  async assertSubtotalMatchesSelectedItemsTotal(expectedTotal: number | string) {
    const actualSubtotalText = (await this.subTotalLabel.textContent()) ?? '';
    const actualSubtotal = this.parsePrice(actualSubtotalText);
    const expectedSubtotal = this.parsePrice(String(expectedTotal));

    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}