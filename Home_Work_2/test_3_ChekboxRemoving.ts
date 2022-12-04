import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { Browser, Builder, By, WebDriver, WebElement } from "selenium-webdriver";

import { BasePage } from "./BasePage";
import assert from "assert";

async function checkBoxRemoving() {
  const service = new Chrome.ServiceBuilder(path);
  const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
  const basePage = new BasePage(driver);
  await basePage.sizeWindow();
  await basePage.getURL("https://the-internet.herokuapp.com/dynamic_controls");
  const removeButton: WebElement = await basePage.findElement_XPath('(//*/button[@type="button"])[1]');
  const checkbox: WebElement = await basePage.findElement_XPath('//*/input[@label="blah"]');
  assert.ok((await removeButton.isEnabled()) && (await checkbox.isDisplayed()));
  console.log("Button and CheckBox look good");
  await removeButton.click();
  assert.ok(!(await removeButton.isEnabled()));
  console.log("CheckBox removing in progress");
  await driver.sleep(6000);
  const text = await driver.findElement(By.xpath('//*/p[@id="message"]')).getText();
  assert.equal(text, "It's gone!");
  console.log("All is OK. Checkbox was removed");
  await basePage.closeBrouser();
  console.log("Test Passed");
}

checkBoxRemoving();
