import { Builder, Browser, WebDriver, WebElement, By, until } from "selenium-webdriver";

import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

import assert from "assert";
import { BasePage } from "./BasePage";

async function authorization() {
  const service = new Chrome.ServiceBuilder(path);
  const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
  const basePage = new BasePage(driver);
  await basePage.sizeWindow();
  await basePage.getURL("https://the-internet.herokuapp.com/login");
  const login: WebElement = await basePage.findElement_Id("username");
  await login.sendKeys("tomsmith");
  const passwd: WebElement = await basePage.findElement_Id("password");
  await passwd.sendKeys("SuperSecretPassword!");
  await driver.findElement(By.className("radius")).click();
  await driver.wait(until.elementLocated(By.className("flash success")), 1000);
  const text = await driver.findElement(By.className("flash success")).getText();
  assert.equal(text.slice(0, text.length - 2), "You logged into a secure area!");
  console.log("Login Successful");
  await driver.findElement(By.css('[href="/logout"]')).click();
  await driver.wait(until.elementLocated(By.className("flash success")), 1000);
  const text2 = await driver.findElement(By.className("flash success")).getText();
  assert.equal(text2.slice(0, text2.length - 2), "You logged out of the secure area!");
  console.log("Logout Successful");
  await basePage.closeBrouser();
  console.log("Test Passed");
}

authorization();
