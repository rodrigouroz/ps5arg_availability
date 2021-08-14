import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

export default async function fetchCarrefour() {
    const name = 'Carrefour'
    const url = 'https://www.carrefour.com.ar/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks?fuzzy=0&map=category-1,category-2,category-3,brand&operator=and&query=/electro-y-tecnologia/informatica-y-gaming/consolas-y-joysticks/sony'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // first check: list of consoles
    // every item has an article with an h1 with a text that contains Play Station 4
    for (let item of doc.querySelectorAll('article h1>span').values()) {
        if (!match(item.textContent)) {
            unavailable = false;
            break;
        }
    }

    return {
        name, url, unavailable
    }
}