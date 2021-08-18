import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Builder, until, By } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome';
import match from './console';

export default async function fetchCarrefour() {
    const name = 'Carrefour'
    const url = 'https://www.carrefour.com.ar/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks?fuzzy=0&map=category-1,category-2,category-3,brand&operator=and&query=/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks/sony'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();

    try {
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
        await driver.quit();
    }

    return {
        name, url, unavailable
    }
}