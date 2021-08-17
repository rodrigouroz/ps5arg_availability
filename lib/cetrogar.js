import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import match from './console';

export default async function fetchCetrogar() {
    const name = 'Cetrogar'
    const url = 'https://www.cetrogar.com.ar/tecnologia/video-juegos/consolas.html'
    let unavailable = true

    const data = await fetch(url)
    const html = await data.text()
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const items = doc.querySelectorAll('ol.products')

    if (items.length === 0) {
        // if we can't parse the items we need to check the site because something has changed
        unavailable = false;
    } else {

        for (let item of items.values()) {
            if (!match(item.querySelector('a.product-item-link').text)) {
                unavailable = false;
                break;
            }
        }
    }

    return {
        name, url, unavailable
    }
}