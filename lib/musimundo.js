import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

export default async function fetchMusimundo() {
    const name = 'Musimundo'
    const url = 'https://www.musimundo.com/gaming/consolas-de-video-juegos/c/14/sony?q=%3Arelevance%3Abrand%3Amarca_SONY'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const items = doc.querySelectorAll('div.searchResultsGridComponent div.productListerGridItem');

    // first check: list of consoles
    // every item has a p with a text that contains PS4
    for (let item of items.values()) {
        if (item.querySelector('p[data-test-plp="item_name"]') &&
            !match(item.querySelector('p[data-test-plp="item_name"]').textContent)) {
            unavailable = false;
            break;
        }
    }

    return {
        name, url, unavailable
    }
}