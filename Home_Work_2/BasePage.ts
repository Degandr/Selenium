import { By, WebDriver } from "selenium-webdriver";

export class BasePage {
  constructor(protected driver: WebDriver) {}

  async getURL(str: string) {
    return this.driver.get(str);
  }

  async sizeWindow() {
    return this.driver.manage().window().minimize();
  }

  async findElement_XPath(str: string) {
    return this.driver.findElement(By.xpath(str));
  }

  async findElement_Css(str: string) {
    return this.driver.findElement(By.css(str));
  }

  async findElement_ClassName(str: string) {
    return this.driver.findElement(By.className(str));
  }

  async findElement_Id(str: string) {
    return this.driver.findElement(By.id(str));
  }
  async closeBrouser() {
    return this.driver.quit();
  }
}
