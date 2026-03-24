import { expect } from '@playwright/test';
import { test } from './fixtures';
import { LoginPage } from './pages/LoginPage';
import { ExceptionsPage } from './pages/ExceptionsPage';
import { writeAutoHealReport } from './utils/autoHeal';
import { TestTablePage } from './pages/TestTablePage'
import testData from './utils/testData.json';
test('global login with exceptions', async ({ loggedInPage }) => {
  const loginPage = new LoginPage(loggedInPage);
  const exceptionsPage = new ExceptionsPage(loggedInPage);

  // Navigate via Practice link
  await loginPage.clickPractice();

  // Then go to Exceptions
  await exceptionsPage.clickTestExceptions();
  await exceptionsPage.addRow();

  await expect(exceptionsPage.inputFields).toHaveCount(2);
  await exceptionsPage.fillNewRow("Second row value");

  const count = await exceptionsPage.inputFields.count();
  console.log(`Row count: ${count}`);

  writeAutoHealReport();
});

test('Validate table columns values ', async ({ loggedInPage }) => {
  const loginPage = new LoginPage(loggedInPage);
  const exceptionsPage = new ExceptionsPage(loggedInPage);

  // Navigate via Practice link
    const tablePage = new TestTablePage(loggedInPage);
  await loginPage.clickPractice();
  // Click the Test Table link
  await tablePage.clickTestTable();
  const drop = await tablePage.getAllSortOptions();
   console.log('drop:', drop);
  // Validate course column
   const actualCourses = await tablePage.getCourseNames();
  console.log('Courses:', actualCourses);

  await tablePage.selectSortOption('Level');

  expect(actualCourses).toEqual(testData.expectedCourses);
   expect(actualCourses).toContain('Selenium Framework');
});