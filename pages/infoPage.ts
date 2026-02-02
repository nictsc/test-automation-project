import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class InfoPage extends BasePage {
  // Declare what exists on the Info page
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;

  constructor(page: Page) {
    // Set up the Product Details page
    super(page);

    // Create unique locators on the Info page
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
  }

  // Input valid data on the first name field
  async inputValidFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName.trim());
  }

  // Input valid data on the last name field
  async inputValidLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName.trim());
  }

  // Input valid data on the zip/post code field
  async inputValidPostCode(postCode: string): Promise<void> {
    await this.postalCode.fill(postCode.trim());
  }

  // Clear all fields
  async clearCheckoutInfo(): Promise<void> {
    await this.firstName.fill('');
    await this.lastName.fill('');
    await this.postalCode.fill('');
  }

  // Fill all fields
  async fillCheckoutInfo({ firstName, lastName, postCode }: { firstName: string; lastName: string; postCode: string }): Promise<void> {
    await this.inputValidFirstName(firstName);
    await this.inputValidLastName(lastName);
    await this.inputValidPostCode(postCode);
  }

  // Fill with blank first name, valid last name and post code
  async fillWithoutFirstName({ lastName, postCode }: { lastName: string; postCode: string }): Promise<void> {
    await this.inputValidFirstName('');
    await this.inputValidLastName(lastName);
    await this.inputValidPostCode(postCode);
  }

  // Fill with blank last name, valid first name and post code
  async fillWithoutLastName({ firstName, postCode }: { firstName: string; postCode: string }): Promise<void> {
    await this.inputValidFirstName(firstName);
    await this.inputValidLastName('');
    await this.inputValidPostCode(postCode);
  }

  // Fill with blank post code, valid first name and last name
  async fillWithoutPostCode({ firstName, lastName }: { firstName: string; lastName: string }): Promise<void> {
    await this.inputValidFirstName(firstName);
    await this.inputValidLastName(lastName);
    await this.inputValidPostCode('');
  }

  // Click on Continue Button
  async clickContinueButton() {
    await this.continueButton.click();
  }

  // Click on Cancel Button
  async clickCancelButton() {
    await this.cancelButton.click();
  }
}