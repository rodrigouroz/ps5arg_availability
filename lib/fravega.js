import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

const isAvailableInLanding = async landing => {
    let unavailable = false

    const data = await fetch(landing)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const buyButton = doc.querySelector('[data-test-id=product-buy-button]')

    if (buyButton && buyButton.disabled) {
        unavailable = true
    }

    return unavailable
}

export default async function fetchFravega() {
    const name = 'Fravega'
    const url = 'https://www.fravega.com/l/videojuegos/consolas/?categorias=videojuegos%2Fconsolas&marcas=sony'
    const url_landing = 'https://www.fravega.com/p/sony-playstation-5-ps5-342748/'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const items = doc.querySelectorAll('ul[name="itemsGrid"] article h3');

    // first check: list of consoles
    // every item has an article with an h3 with a text that contains Play Station 4
    for (let item of items.values()) {
        if (!match(item.textContent)) {
            unavailable = false;
            break;
        }
    }

    // second check: landing page
    if (unavailable) {
        unavailable = await isAvailableInLanding(url_landing)
    }

    return {
        name, url, unavailable
    }
}