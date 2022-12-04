import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { Browser, Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";

import { BasePage } from "./BasePage";
import assert from "assert";

async function checkFrame() {
  const service = new Chrome.ServiceBuilder(path);
  const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
  const basePage = new BasePage(driver);
  await basePage.sizeWindow();
  await basePage.getURL("https://the-internet.herokuapp.com/frames");
  await driver.findElement(By.css('[href="/iframe"]')).click();
  await driver.wait(until.elementLocated(By.id("content")), 6000);
  await driver.switchTo().frame(await basePage.findElement_XPath('//*/iframe[@id="mce_0_ifr"]'));
  await driver.sleep(2000);
  const inputField: WebElement = await basePage.findElement_XPath('//*/body[@id="tinymce"]/*');
  const textFromIFrame = await inputField.getText();
  assert.equal(textFromIFrame, "Your content goes here.");
  console.log(`Text form iFrame is: ${textFromIFrame}`);
  await basePage.closeBrouser();
}

checkFrame();
