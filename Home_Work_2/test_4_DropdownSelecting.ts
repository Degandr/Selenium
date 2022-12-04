import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";
import { Browser, Builder, WebDriver, WebElement } from "selenium-webdriver";

import { BasePage } from "./BasePage";
import assert from "assert";

async function isSelectedDropdown() {
  const service = new Chrome.ServiceBuilder(path);
  const driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).setChromeService(service).build();
  const basePage = new BasePage(driver);
  await basePage.sizeWindow();
  await basePage.getURL("https://the-internet.herokuapp.com/dropdown");
  const dropDownOption: WebElement = await basePage.findElement_XPath(
    '//*/div/select[@id="dropdown"]/option[@value="1"]',
  );
  await dropDownOption.click();
  assert.ok(await dropDownOption.isSelected());
  console.log("Dropdown option is selected");
  await basePage.closeBrouser();
  console.log("Test Passed");
}

isSelectedDropdown();
