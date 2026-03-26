import { Page, Locator, expect } from '@playwright/test';

export class TestTablePage {
  readonly page: Page;
  readonly testTableLink: Locator;
  readonly courseCells: Locator;
  readonly sortByDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testTableLink = page.locator("//a[text()='Test Table']");
    this.courseCells = page.locator("//td[@headers='col_course']");
    this.sortByDropDown = page.locator("//select[@id='sortBy']");
  }

  getLanguageInput(value: string): Locator {
    return this.page.locator(`//input[@value='${value}']`);
  }

  getCourseCell(columnHeader: string): Locator {
    return this.page.locator(`//td[@headers='${columnHeader}']`);
  }

  async clickTestTable() {
    await this.testTableLink.click();
  }

  async clickOnLanguageRadioButton(language: string) {
    await this.getLanguageInput(language).click();
  }

  async getAllSortOptions(): Promise<string[]> {
    const options = this.sortByDropDown.locator("option");
    const count = await options.count();
    const values: string[] = [];

    for (let i = 0; i < count; i++) {
      values.push(await options.nth(i).innerText());
    }

    console.log("Dropdown options:", values);
    return values;
  }

  async selectSortOption(optionLabel: string) {
    await this.sortByDropDown.selectOption({ label: optionLabel });
    console.log(`Selected '${optionLabel}' from dropdown`);
  }

  async scrollToCourseCell(columnHeader: string, index: number = 0) {
    const cell = this.getCourseCell(columnHeader).nth(index);
    await cell.scrollIntoViewIfNeeded();
    return cell;
  }

  async getCourseNames(columnHeader: string): Promise<string[]> {
    const cells = this.getCourseCell(columnHeader);
    const count = await cells.count();
    const courses: string[] = [];

    for (let i = 0; i < count; i++) {
      const cell = cells.nth(i);
      const text = await cell.innerText();
      courses.push(text);
    }

    return courses;
  }

  async assertCourseCount(expectedCount: number) {
    await expect(this.courseCells).toHaveCount(expectedCount);
  }
}