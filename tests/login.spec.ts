import { expect } from '@playwright/test';
import { test } from './Fixtures';
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

  await tablePage.scrollToCourseCell('col_course');
   const actualCourses = await tablePage.getCourseNames('col_course');
  console.log('Courses:', actualCourses);;
  expect(actualCourses).toEqual(testData.expectedCourses);
  expect(actualCourses).toContain('Selenium Framework');
});

test('Validate slected language values ', async ({ loggedInPage }) => {
  const loginPage = new LoginPage(loggedInPage);
  const exceptionsPage = new ExceptionsPage(loggedInPage);

  // Navigate via Practice link
    const tablePage = new TestTablePage(loggedInPage);
  await loginPage.clickPractice();
  // Click the Test Table link
  await tablePage.clickTestTable();
   await tablePage.clickOnLanguageRadioButton('Python');
   await tablePage.scrollToCourseCell('col_lang');
  // Validate course column
   const actualCourses = await tablePage.getCourseNames('col_lang');
  console.log('Courses:', actualCourses);
expect(actualCourses).not.toEqual(testData.java);
});