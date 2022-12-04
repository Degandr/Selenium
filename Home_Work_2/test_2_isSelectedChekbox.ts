import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { Browser, Builder, WebDriver, WebElement } from "selenium-webdriver";

import { BasePage } from "./BasePage";
import assert from "assert";

async function isSelectedChekbox() {
  const service = new Chrome.ServiceBuilder(path);
  const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
  const basePage = new BasePage(driver);
  await basePage.sizeWindow();
  await basePage.getURL("https://the-internet.herokuapp.com/checkboxes");
  const checkbox: WebElement = await basePage.findElement_XPath('(//*/form/input[@type="checkbox"])[2]');
  assert.ok(await checkbox.isSelected());
  console.log("Checkbox is selected");
  await basePage.closeBrouser();
  console.log("Test Passed");
}

isSelectedChekbox();
