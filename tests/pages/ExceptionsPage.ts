import { Page, Locator } from '@playwright/test';

export class ExceptionsPage {
  readonly page: Page;
  readonly testExceptionsLink: Locator;
  readonly addButton: Locator;
  readonly inputFields: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testExceptionsLink = page.locator("//a[text()='Test Exceptions']");
    this.addButton = page.locator("#add_btn");
    this.inputFields = page.locator("//input[@class='input-field']");
  }

  async clickTestExceptions() {
    await this.testExceptionsLink.click();
  }

  async addRow() {
    await this.addButton.click();
    await this.page.waitForTimeout(3000); // hard wait
    await this.page.waitForSelector("//input[@class='input-field']", { state: 'visible' });
  }

  async fillNewRow(value: string) {
    const newRow = this.inputFields.last();
    await newRow.fill(value);
  }
}