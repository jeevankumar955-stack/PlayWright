import { Page, Locator } from '@playwright/test';
import { autoHealLocator } from '../utils/autoHeal';

export class LoginPage {
  readonly page: Page;
  
  // Define selector arrays as private properties
  private readonly userNameSelectors = ["//input[@name='username']", "#username", "input[name='user']"];
  private readonly passwordSelectors = ["//input[@name='password']", "#password", "input[type='password']"];
  private readonly loginBtnSelectors = ["//button[text()='Submit']", "button[type='submit']", "#loginBtn"];
  private readonly practiceLinkSelectors = [
    "//a[text()='Practice']",
    "a[href*='practice']"
  ];

  private readonly testExceptionsLinkSelectors = [
    "//a[text()='Test Exceptions']",
    "a[href*='exceptions']"
  ];

  private readonly addButtonSelectors = [
    "#add_btn",
    "//button[text()='Add']"
  ];

  private readonly inputFieldSelectors = [
    "//input[@class='input-field']",
    "input.input-field"
  ];

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string) {
    // Resolve the locator at the moment of interaction
    const userField = await autoHealLocator(this.page, this.userNameSelectors);
    const passField = await autoHealLocator(this.page, this.passwordSelectors);
    const submitBtn = await autoHealLocator(this.page, this.loginBtnSelectors);

    await userField.fill(username);
    await passField.fill(password);
    await submitBtn.click();
  }

   async clickPractice() {
    const practiceLink = await autoHealLocator(this.page, this.practiceLinkSelectors);
    await practiceLink.click();
  }

  async clickTestExceptions() {
    const testExceptionsLink = await autoHealLocator(this.page, this.testExceptionsLinkSelectors);
    await testExceptionsLink.click();
  }

  async addRow() {
    const addBtn = await autoHealLocator(this.page, this.addButtonSelectors);
    await addBtn.click();
    await this.page.waitForSelector(this.inputFieldSelectors[0], { state: 'visible' });
  }

  async fillNewRow(value: string) {
    const inputFields = await autoHealLocator(this.page, this.inputFieldSelectors);
    const newRow = inputFields.last();
    await newRow.fill(value);
  }

}