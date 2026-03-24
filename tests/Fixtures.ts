import { test as base } from '@playwright/test';
import testData from './utils/testData.json';
import { LoginPage } from './pages/LoginPage';

export const test = base.extend<{ loggedInPage: any }>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(testData.login.username, testData.login.password);

    // Now the page is logged in
    await use(page);
  },
});