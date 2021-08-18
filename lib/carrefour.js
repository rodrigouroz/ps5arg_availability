import { Builder, until, By } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome';
import chromium from 'chromium';
import match from './console';
require('chromedriver')

export default async function fetchCarrefour() {
    const name = 'Carrefour'
    const url = 'https://www.carrefour.com.ar/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks?fuzzy=0&map=category-1,category-2,category-3,brand&operator=and&query=/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks/sony'
    let unavailable = true
    let driver

    try {
        let options = new chrome.Options();
        options.setChromeBinaryPath(chromium.path);
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1280,960');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.get(url);
        await driver.wait(until.elementLocated(By.css('article h1>span')), 5000);
        await driver.wait(async () => {
            return (await driver.findElements(By.css('div svg.vtex__icon-spinner'))).length === 0
        }, 8000);
        const items = await driver.findElements(By.css('article h1>span'))

        // first check: list of consoles
        // every item has an article with an h1 with a text that contains Play Station 4
        for (let item of items) {

            if (!match(await item.getText())) {
                unavailable = false;
                break;
            }
        }
    } finally {
        if (driver) {

            await driver.quit();
        }
        //chromedriver.stop();
    }

    return {
        name, url, unavailable
    }
}