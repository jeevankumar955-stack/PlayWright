import{test, expect, Browser,  Page, Locator} from  '@playwright/test'
import { firefox } from '@playwright/test'
test('login test', async()=>{

const browser:Browser = await  firefox.launch({headless:false});
const page:Page = await browser.newPage();
await page.goto("https://practicetestautomation.com/practice-test-login/");
const userName:Locator = await page.locator('#username');
const password:Locator = await page.locator('#password');
const login:Locator = await page.locator('#submit');
await userName.fill("student");
await password.fill("Password123");
await login.click();
const pageTitle=await page.title();
console.log(pageTitle);
await page.screenshot({path:'homepage.png'});
expect(pageTitle).toEqual("Logged In Successfully | Practice Test Automation125")
browser.close();




})  