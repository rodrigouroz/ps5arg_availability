import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function fetchMusimundo() {
    const name = 'Musimundo'
    const url = 'https://www.musimundo.com/gaming/consolas-de-video-juegos/c/14/sony?q=%3Arelevance%3Abrand%3Amarca_SONY'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // first check: list of consoles
    // every item has a p with a text that contains PS4
    for (let item of doc.querySelectorAll('div.searchResultsGridComponent div.productListerGridItem').values()) {
        if (item.querySelector('p[data-test-plp="item_name"]') &&
            item.querySelector('p[data-test-plp="item_name"]').textContent.indexOf('PS4') === -1) {
            unavailable = false;
            break;
        }
    }

    return {
        name, url, unavailable
    }
}