import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { CheckoutPage } from './checkoutPage';  

export class InfoPage extends BasePage {
  // Declare what exists on the Info page
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly closeErrorMessageIcon: Locator;

  constructor(page: Page) {
    // Set up the Product Details page
    super(page);

    // Create unique locators on the Info page
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
    this.closeErrorMessageIcon = page.locator('[data-icon="times"]');
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

  // Fill all fields
  async fillCheckoutInfo({ firstName, lastName, postCode }: { firstName: string; lastName: string; postCode: string }): Promise<void> {
    await this.inputValidFirstName(firstName);
    await this.inputValidLastName(lastName);
    await this.inputValidPostCode(postCode);
  }

  // Click on Continue Button
  async clickContinueButton() {
    await this.continueButton.click();
  }

  // Click on Cancel Button
  async clickCancelButton() {
    await this.cancelButton.click();
  }

  // Assert on blank first name error message
  async assertFirstNameRequiredError(expectedMessage = 'Error: First Name is required') {
    await expect(this.errorButton).toBeVisible();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  // Assert on blank last name error message
  async assertLastNameRequiredError(expectedMessage = 'Error: Last Name is required') {
    await expect(this.errorButton).toBeVisible();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
  
  // Assert on blank last name error message
  async assertPostalCodeRequiredError(expectedMessage = 'Error: Postal Code is required') {
    await expect(this.errorButton).toBeVisible();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  // Close error message
  async clickErrorMessageIcon() {
    await this.closeErrorMessageIcon.click();
  }

  async completedFields() {
    await this.fillCheckoutInfo({ firstName: 'Amy', lastName: 'Johnson', postCode: '2000' });
    await this.clickContinueButton();
    await this.assertProductName();
  }

  async blankFirstName() {
    await this.fillCheckoutInfo({ firstName: '', lastName: 'Johnson', postCode: '2000' });
    await this.clickContinueButton();
    await this.assertFirstNameRequiredError();
    await this.clickErrorMessageIcon();
  }

  async blankLastName() {
    await this.fillCheckoutInfo({ firstName: 'Amy', lastName: '', postCode: '2000' });
    await this.clickContinueButton();
    await this.assertLastNameRequiredError();
    await this.clickErrorMessageIcon();
  }

  async blankPostalCode() {
    await this.fillCheckoutInfo({ firstName: 'Amy', lastName: 'Johnson', postCode: '' });
    await this.clickContinueButton();
    await this.assertPostalCodeRequiredError();
    await this.clickErrorMessageIcon();
  }

  async blankFields() {
    await this.fillCheckoutInfo({ firstName: '', lastName: '', postCode: '' });
    await this.clickContinueButton();
    await this.assertFirstNameRequiredError();
    await this.clickErrorMessageIcon();
  }
}